/*jslint browser: true, white: true, regexp: true, todo: true, plusplus: true, devel: true */
/**
 * Ferramenta que facilita a correção de artigos da Wikipédia
 * por meio do processamento de listas de regras do tipo "localizar e substituir"
 * (análoga à existente no AutoWikiBrowser)
 * Ver também:
 ** [[WP:Projetos/AWB/Script]] (documentação)
 ** [[w:User:!Silent/correções.js]]
 ** [[w:WP:Projetos/Check Wikipedia/AWB]]
 ** [[w:WP:Projetos/AWB]]
 ** http://autowikibrowser.svn.sourceforge.net/viewvc/autowikibrowser/AWB/WikiFunctions/ReplaceSpecial/Rule.cs?view=markup
 * @author: [[User:Helder.wiki]]
 * @tracking: [[Special:GlobalUsage/User:Helder.wiki/Tools/AWB/SearchAndReplace.js]] ([[File:User:Helder.wiki/Tools/AWB/SearchAndReplace.js]])
 */
/*global jQuery, mediaWiki, AWB */

if ( window.AWB === undefined ) {
	window.AWB = {};
}
(function ($, mw, AWB) {
'use strict';

$.extend( AWB, $.extend( {
	version: '0.24',
	text: '', // This will store the text to which the rules will be applied
	allowFunctionTests: false, // TODO: Do we need this?
	allowOnlyInsideTemplates: false, // TODO: Implement this
	hasUserInterface: true, // TODO: Improve the fake "special" page [[WP:Projetos/AWB/Script]]
	/**
	 * @type Array.{{
		name: {string}, // The name of the rule
		find: {string=|RegExp}, // string or /regex/ to be searched for
		replace: {string=}, // Optional replacement
		num: number, // How many times the rule should be applied
		enabled: boolean, //  Defalts to true if undefined
		ifhas: {string=|RegExp}, // string or /regex/ the page must match
		ifnot: {string=|RegExp}, // string or /regex/ the page must not match
		where: 'anywhere', // 'anywhere' (default) or 'templates'
		sub: [] // an array of objects like this
	}}
	 * The list of rules used by the tool
	 * FIXME: Convert this to a function such as AWB.addRules( {...} ),
	 * so that the list of rules can be defined inside a mw.loader.using()
	 * having this JS module as dependency (check the toolbar API for examples)
	 */
	rules: []
}, AWB ) );

// AWB.Rule.prototype = '...'; // TODO: Implement default values in some prototype?

/**
 * Loop over all rules and subrules, applying those which are enabled
 * @param rules The list of rules
 * FIXME: Guardar o texto em uma variável local em vez de AWB.text, para otimizar
 */
AWB.processRules = function (rules) {
	var	i, length, r, times, reKeyWords, temp,
		keys = [],
		// See also http://autowikibrowser.svn.sourceforge.net/viewvc/autowikibrowser/AWB/WikiFunctions/Tools.cs?revision=8179&view=markup#l536
		keywords = {
			'%%title%%': mw.config.get('wgPageName').replace(/_/g, ' '),
			'%%fullpagename%%': mw.config.get('wgPageName').replace(/_/g, ' '),
			'%%pagename%%': mw.config.get('wgTitle')
		},
		applyKeyWords = function(matchedKey){
			return keywords[matchedKey];
		},
		applyEscapedKeyWords = function(matchedKey){
			return $.escapeRE( keywords[matchedKey] );
		};
	$.each(keywords, function(key){
		keys.push($.escapeRE(key));
	});
	reKeyWords = new RegExp( '(' + keys.join('|') + ')', 'g' );
	for (i = 0, length = rules.length; i < length; i++) {
		r = rules[i];
		if (r.enabled !== false
			&& (
				!r.ifhas
				|| (typeof r.ifhas === 'string' && AWB.text.indexOf(r.ifhas) !== -1)
				|| (AWB.allowFunctionTests && $.isFunction(r.ifhas) && r.ifhas(AWB.text))
				|| (typeof r.ifhas === 'object' && r.ifhas.test(AWB.text))
			)
			&& (
				!r.ifnot
				|| (typeof r.ifnot === 'string' && AWB.text.indexOf(r.ifnot) === -1)
				|| (AWB.allowFunctionTests && $.isFunction(r.ifnot) && !r.ifnot(AWB.text))
				|| (typeof r.ifnot === 'object' && !r.ifnot.test(AWB.text))

			)
		) {
			if (r.where === undefined || r.where === 'anywhere') {
				if (r.find !== undefined && r.find !== '' && r.replace !== undefined) {
					if ( typeof r.find === 'string' ){
						r.find = r.find.replace( reKeyWords, applyKeyWords );
					} else if ( r.find instanceof RegExp ){
						r.find = new RegExp(
							r.find.source.replace( reKeyWords, applyEscapedKeyWords ),
							(r.find.global? 'g': '') +
								(r.find.ignoreCase? 'i': '') +
								(r.find.multiline? 'm': '')
						);
					}
					r.replace = r.replace.replace( reKeyWords, applyKeyWords );
					times = r.num === undefined || r.num < 1
						? 1
						: r.num > 100
							? 100
							: r.num;
					temp = AWB.text;
					while( times > 0){
						AWB.text = AWB.text.replace( r.find, r.replace );
						times--;
					}
					if( temp !== AWB.text ){
						mw.log( r.find, r.replace );
					}
				}
				if ($.isArray(r.sub) && r.sub.length) {
					AWB.processRules(r.sub);
				}
			} else if (AWB.allowOnlyInsideTemplates && r.where === 'templates') {
				// TODO: Implement this for non-nested templates!
				// TODO: How to allow nested templates? E.g.: {{info|param={{format|...}}|param=...}}
				mw.log('Invalid value: where=templates is not available yet.');
			} else {
				mw.log('Invalid value: where=' + r.where + ' on rule "' + (r.name || 'Rule') + '".');
			}
		}
	}
};

AWB.addAWBToToolbar = function () {
	var	i,
		summaryText = ' +[[WP:Projetos/AWB/Script|tarefas repetitivas]] (v' +
					AWB.version + '/' + AWB.rulesVersion + ')',
		$sumField = $('#wpSummary'),
		executeGroup = function( i ){
			return function() {
				AWB.text = AWB.$target.val();
				AWB.processRules(AWB.rules[i]);
				AWB.$target.val(AWB.text);
				$sumField.val( $sumField.val() + summaryText );
			};
		},
		mainGroupsOfFixes = { // {}
			'awb-fixes-all' : {
				label: 'Todas',
				action: {
					type: 'callback',
					execute: function() {
						AWB.text = AWB.$target.val();
						AWB.processRules(AWB.rules);
						AWB.$target.val(AWB.text);
						$sumField.val( $sumField.val() + summaryText );
					}
				}
			}
		};
	for(i=0;i<AWB.rules.length;i++){
		mainGroupsOfFixes[ 'awb-fixes-' + i ] = {
			label: AWB.rules[i].name +
				(AWB.rules[i].enabled === false? ' (desativada temporariamente)' : ''),
			action: {
				type: 'callback',
				execute: executeGroup(i)
			}
		};
	}

	mw.log( 'Serão inseridos os botões do AWB' );
	$( '#wpTextbox1' ).wikiEditor( 'addToToolbar', {
		section: 'advanced',
		groups: {
			awb: {
				label: 'AWB',
				tools: {
					'awb-fixes-heading': {
						label: 'Correções',
						type: 'select',
						list: mainGroupsOfFixes
					},
					'awb-report-a-bug' : {
						label: 'Informar um erro',
						type: 'button',
						// Icon by [[commons:User:Medium69]]
						icon: '//upload.wikimedia.org/wikipedia/commons/1/11/Button_Nuvola_apps_edu_lang.png',
						action: {
							type: 'callback',
							execute: function() {
								var url = mw.util.wikiGetlink( 'Wikipédia Discussão:Projetos/AWB/Script' ) + '?' +
									$.param({
										action: 'edit',
										section: 'new',
										preloadtitle: '[BUG] (v' + AWB.version + '/' +
											AWB.rulesVersion + ') [[' + mw.config.get('wgPageName').replace(/_/g, ' ') + ']]',
										preload: 'WP:Projetos/AWB/Script/Bug'
									});
								window.open( url );
							}
						}
					}
				}
			}
		}
	} );
};

/**
 * Get an HTML representation of the list of rules and subrules
 * @param rules The list of rules
 * @return {jQuery} The jQuery object correspoding to the HTML of the requested
 */
AWB.getRulesHTML = function (rules, visible) {
	var i, length, r, $li,
	$ul = $('<ul></ul>').toggle( visible || false );

	// TODO: Implement "collapsible sublists"
	for (i = 0, length = rules.length; i < length; i++) {
		r = rules[i];
		$li = $('<li></li>')
			.attr('title', 'Localizar:\n' + r.find + '\n\nSubstituir por:\n' + r.replace )
			.text( r.name || 'Rule' );
		if (r.enabled === false) {
			$li.addClass('awb-disabled')
				.attr('title', 'Esta regra está desativada');
		}
		if ($.isArray(r.sub) && r.sub.length) {
			$li.append(AWB.getRulesHTML(r.sub))
				.addClass('list-toggle');
		}
		$li.appendTo($ul);
	}
	return $ul;
};

/**
 * Execute the script when in edit mode
 */
AWB.run = function () {
	var $rules, $list, versionHTML, $button;

	if ($.inArray(mw.config.get('wgAction'), ['edit', 'submit']) !== -1 ) {
		AWB.$target = $('#wpTextbox1');

		/* Make sure the required modules are available and then customize the toolbar */
		mw.loader.using( 'user.options', function () {
			if ( mw.user.options.get('usebetatoolbar') ) {
				mw.loader.using( 'ext.wikiEditor.toolbar', AWB.addAWBToToolbar );
			} else{
				// TODO: Improve support for old toolbar?
				$( mw.util.addPortletLink(
					'p-tb',
					'#',
					'Formatar com AWB',
					'#ca-awb',
					'Formata o código wiki da página de acordo com as regras estabelecidas no código do script'
				) ).click( function (e) {
					e.preventDefault();
					AWB.text = AWB.$target.val();
					AWB.processRules(AWB.rules);
					AWB.$target.val( AWB.text );
				} );
			}
		} );

	} else if ( mw.config.get('wgPageName') === 'Wikipédia:Projetos/AWB/Script' && $.inArray(mw.config.get('wgAction'), ['view', 'purge']) !== -1 ) {
		// TODO: Implement a true user interface on this "special page"
		if (AWB.hasUserInterface) {
			mw.util.addCSS('.awb-disabled{ color: red;} li{cursor: default;} .list-toggle{ cursor:pointer;}');
			$rules = $('#awb-search-and-replace-rules');
			if(!$rules.length) {
				$rules = $('#mw-content-text');
			}
			versionHTML = '<p>Observação: esta é a versão ' + AWB.rulesVersion +
				' da lista de regras (gerada pela versão ' + AWB.version + ' do script).</p>';
			$button = $('<input type="button" value="Expandir tudo" title="Expandir todos os itens"/>')
				.click( function(){
					$rules.find('ul').show();
				});
			$list = AWB.getRulesHTML(AWB.rules, true)
				.on('click', '.list-toggle', function (e) {
					e.stopPropagation();
					if ( $(e.target).hasClass('list-toggle') ){
						$(this).children().filter('ul')
							.toggle();
					}
				});
			$rules
				.empty()
				.append( versionHTML )
				.append( $button )
				.append( $list );
		}
	}
};

$(AWB.run);

}(jQuery, mediaWiki, AWB));