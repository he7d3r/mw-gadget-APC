/*jslint browser: true, white: true, regexp: true, todo: true, devel: true */
/**
 * Ferramenta que facilita a correção de artigos da Wikipédia
 * por meio do processamento de listas de regras do tipo "localizar e substituir"
 * (análoga à existente no AutoWikiBrowser)
 * Ver também:
 ** [[WP:Scripts/APC]] (documentação)
 ** [[w:User:!Silent/correções.js]]
 ** [[w:WP:Projetos/Check Wikipedia/AWB]]
 ** [[w:WP:Projetos/AWB]]
 ** http://autowikibrowser.svn.sourceforge.net/viewvc/autowikibrowser/AWB/WikiFunctions/ReplaceSpecial/Rule.cs?view=markup
 * @author: [[User:Helder.wiki]]
 * @tracking: [[Special:GlobalUsage/User:Helder.wiki/Tools/APC.js]] ([[File:User:Helder.wiki/Tools/APC.js]])
 */
/*global jQuery, mediaWiki, APC */

if ( window.APC === undefined ) {
	window.APC = {};
}
(function ($, mw, APC) {
'use strict';

// var names = {}, dup = [];

$.extend( APC, $.extend( {
	version: '0.27',
	text: '', // This will store the text to which the rules will be applied
	allowFunctionTests: false, // TODO: Do we need this?
	allowOnlyInsideTemplates: false, // TODO: Implement this
	hasUserInterface: true, // TODO: Improve the fake "special" page [[WP:Scripts/APC]]
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
	 * FIXME: Convert this to a function such as APC.addRules( {...} ),
	 * so that the list of rules can be defined inside a mw.loader.using()
	 * having this JS module as dependency (check the toolbar API for examples)
	 */
	rules: []
}, APC ) );

// APC.Rule.prototype = '...'; // TODO: Implement default values in some prototype?

/**
 * Loop over all rules and subrules, applying those which are enabled
 * @param rules The list of rules
 * FIXME: Guardar o texto em uma variável local em vez de APC.text, para otimizar
 */
APC.processRules = function (rules) {
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
	for (i = 0, length = rules.length; i < length; i += 1) {
		r = rules[i];
		if (r.enabled !== false
			&& (
				!r.ifhas
				|| (typeof r.ifhas === 'string' && APC.text.indexOf(r.ifhas) !== -1)
				|| (APC.allowFunctionTests && $.isFunction(r.ifhas) && r.ifhas(APC.text))
				|| (typeof r.ifhas === 'object' && r.ifhas.test(APC.text))
			)
			&& (
				!r.ifnot
				|| (typeof r.ifnot === 'string' && APC.text.indexOf(r.ifnot) === -1)
				|| (APC.allowFunctionTests && $.isFunction(r.ifnot) && !r.ifnot(APC.text))
				|| (typeof r.ifnot === 'object' && !r.ifnot.test(APC.text))

			)
		) {
			if (r.where === undefined || r.where === 'anywhere') {
				if (r.find !== undefined && r.find !== '' && r.replace !== undefined) {
					if ( typeof r.find === 'string' ){
						r.find = r.find.replace( reKeyWords, applyKeyWords );
					} else if ( r.find instanceof RegExp && r.find.source.indexOf( '%%' ) !== -1 ){
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
					temp = APC.text;
					while( times > 0){
						APC.text = APC.text.replace( r.find, r.replace );
						times -= 1;
					}
					if( temp !== APC.text ){
						mw.log( r.find, r.replace );
					}
				}
				if ($.isArray(r.sub) && r.sub.length) {
					APC.processRules(r.sub);
				}
			} else if (APC.allowOnlyInsideTemplates && r.where === 'templates') {
				// TODO: Implement this for non-nested templates!
				// TODO: How to allow nested templates? E.g.: {{info|param={{format|...}}|param=...}}
				mw.log('Invalid value: where=templates is not available yet.');
			} else {
				mw.log('Invalid value: where=' + r.where + ' on rule "' + (r.name || 'Rule') + '".');
			}
		}
	}
};

APC.addAPCToToolbar = function () {
	var	i,
		summaryText = ' +[[WP:Scripts/APC|correções automáticas]] (v' +
					APC.version + '/' + APC.rulesVersion + ')',
		$sumField = $('#wpSummary'),
		executeGroup = function( i ){
			return function() {
				APC.text = APC.$target.val();
				APC.processRules(APC.rules[i]);
				APC.$target.val(APC.text);
				$sumField.val( $sumField.val() + summaryText );
			};
		},
		mainGroupsOfFixes = { // {}
			'APC-fixes-all' : {
				label: 'Todas',
				action: {
					type: 'callback',
					execute: function() {
						APC.text = APC.$target.val();
						APC.processRules(APC.rules);
						APC.$target.val(APC.text);
						$sumField.val( $sumField.val() + summaryText );
					}
				}
			}
		};
	for(i=0;i<APC.rules.length;i += 1){
		mainGroupsOfFixes[ 'APC-fixes-' + i ] = {
			label: APC.rules[i].name +
				(APC.rules[i].enabled === false? ' (desativada temporariamente)' : ''),
			action: {
				type: 'callback',
				execute: executeGroup(i)
			}
		};
	}

	$( '#wpTextbox1' ).wikiEditor( 'addToToolbar', {
		section: 'advanced',
		groups: {
			APC: {
				label: 'APC',
				tools: {
					'apc-fixes-heading': {
						label: 'Correções',
						type: 'select',
						list: mainGroupsOfFixes
					},
					'apc-report-a-bug' : {
						label: 'Informar um erro',
						type: 'button',
						// Icon by [[commons:User:Medium69]]
						icon: '//upload.wikimedia.org/wikipedia/commons/1/11/Button_Nuvola_apps_edu_lang.png',
						action: {
							type: 'callback',
							execute: function() {
								var url = mw.util.wikiGetlink( 'Wikipédia Discussão:Scripts/APC' ) + '?' +
									$.param({
										action: 'edit',
										section: 'new',
										preloadtitle: '[BUG] (v' + APC.version + '/' +
											APC.rulesVersion + ') [[' + mw.config.get('wgPageName').replace(/_/g, ' ') + ']]',
										preload: 'WP:Scripts/APC/Bug'
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
APC.getRulesHTML = function (rules, visible) {
	var i, length, r, $li, name, safeName,
		$ul = $('<ul></ul>').toggle( visible || false );

	// TODO: Implement "collapsible sublists"
	for (i = 0, length = rules.length; i < length; i+=1) {
		r = rules[i];
		name = (r.name || 'Rule');
/*		if( names[ name ] === undefined ){
			names[ name ] = 0;
		} else {
			names[ name ] += 1;
		}
*/		safeName = name
			.replace( /[ _\-]+/g, '-' )
			.replace( /[^\-a-z0-9]+/ig, '' );
		$li = $('<li></li>')
			.attr('title', 'Localizar:\n' + r.find + '\n\nSubstituir por:\n' + r.replace )
			.append(
				$( '<input>', {
					type: 'checkbox',
					name: 'corrections',
					id: 'correction-' + safeName,
					value: safeName,
					checked: 'checked'
				} ),
				$( '<label>', {
					'for': 'correction-' + safeName,
					text: name
				} )
			);
		if (r.enabled === false) {
			$li.addClass('apc-disabled')
				.attr('title', 'Em fase experimental');
		}
		if ($.isArray(r.sub) && r.sub.length) {
			$li.append(APC.getRulesHTML(r.sub))
				.addClass('apc-list-toggle');
		}
		$li.appendTo($ul);
	}
	return $ul;
};

/**
 * Execute the script when in edit mode
 */
APC.run = function () {
	var $rules, $list, versionHTML, $button;

	if ($.inArray(mw.config.get('wgAction'), ['edit', 'submit']) !== -1 ) {
		APC.$target = $('#wpTextbox1');

		/* Make sure the required modules are available and then customize the toolbar */
		mw.loader.using( 'user.options', function () {
			if ( mw.user.options.get('usebetatoolbar') ) {
				mw.loader.using( 'ext.wikiEditor.toolbar', APC.addAPCToToolbar );
			} else{
				// TODO: Improve support for old toolbar?
				$( mw.util.addPortletLink(
					'p-tb',
					'#',
					'Formatar com APC',
					'#ca-APC',
					'Formata o código wiki da página de acordo com as regras estabelecidas no código do script'
				) ).click( function (e) {
					e.preventDefault();
					APC.text = APC.$target.val();
					APC.processRules(APC.rules);
					APC.$target.val( APC.text );
				} );
			}
		} );

	} else if ( mw.config.get('wgPageName') === 'Wikipédia:Scripts/APC' && $.inArray(mw.config.get('wgAction'), ['view', 'purge']) !== -1 ) {
		// TODO: Implement a true user interface on this "special page"
		if (APC.hasUserInterface) {
			$rules = $('#apc-search-and-replace-rules');
			if(!$rules.length) {
				$rules = $('#mw-content-text');
			}
			versionHTML = '<p>Observação: esta é a versão ' + APC.rulesVersion +
				' da lista de regras (gerada pela versão ' + APC.version + ' do script).</p>';
			$button = $('<input type="button" value="Expandir tudo" title="Expandir todos os itens"/>')
				.click( function(){
					$rules.find('ul').show();
				});
			$list = APC.getRulesHTML(APC.rules, true)
				.on('change', 'input', function (e) {
					var $target = $(e.target),
						$li = $target.parent(),
						isChecked = $target.is(':checked');
					if ( $li.hasClass('apc-list-toggle') ){
						$li.find('ul:first').find('input')
							.prop(
								'checked',
								isChecked
							);
					}
				})
				.on('click', 'li', function (e) {
					e.stopPropagation();
					if ( $(e.target).hasClass('apc-list-toggle') ){
						$(this)
							.toggleClass('apc-expanded')
							.children().filter('ul')
								.toggle();
					}
				})
				.addClass('apc-main-list')
				.find('.apc-disabled input')
					.prop('checked', false).end();
			$rules
				.empty()
				.append( versionHTML )
				.append( $button )
				.append( $list );
/*			$.each(names, function(n){
				if( names[n] > 0 ){
					dup.push( n );
				}
			});
			console.log( dup.sort().join('\n') );
			console.warn( 'Há ' + dup.length + ' regras com nomes duplicados!' );
*/		}
	}
};

$(APC.run);

}(jQuery, mediaWiki, APC));