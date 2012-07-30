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
	version: '0.6',
	text: '', // This will store the text to which the rules will be applied
	allowFunctionTests: false, // TODO: Do we need this?
	allowOnlyInsideTemplates: false, // TODO: Implement this
	hasUserInterface: true, // TODO: Implement this on some fake "special" page (e.g.: [[WP:Projetos/AWB/Script]])
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
 */
AWB.processRules = function (rules) {
	var i, length, r, times;
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
					times = r.num === undefined || r.num < 1
						? 1
						: r.num > 100
							? 100
							: r.num;
					while( times > 0){
						AWB.text = AWB.text.replace(r.find, r.replace);
						times--;
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
	var	// i,
		mainGroupsOfFixes = { // {}
			'awb-fixes-all' : {
				'label': 'Todas',
				'action': {
					'type': 'callback',
					'execute': function() {
						console.debug( 'Serão realizadas todas as correções.' );
						AWB.processRules(AWB.rules);
						AWB.$target.val(AWB.text);
						console.debug( 'Pronto!' );
					}
				}
			}
		};
	/*
	for(i=0;i<AWB.rules.length;i++){
		mainGroupsOfFixes[ 'awb-fixes-' + i ] = {
			'label': AWB.rules.length[i].name,
			'action': {
				'type': 'callback',
				'execute': function() {
					// FIXME: isso provavelmente executa sempre o último grupo de correções da lista
					console.debug( 'Serão realizadas as correções do grupo ' + i );
					AWB.processRules(AWB.rules[i]);
					AWB.$target.val(AWB.text);
				}
			}
		}
	}
	*/
	console.debug( 'Serão inseridos os botoes' );
	$( '#wpTextbox1' ).wikiEditor( 'addToToolbar', {
		'section': 'advanced',
		'groups': {
			'awb': {
				'label': 'AWB',
				'tools': {
					'awb-fixes-geometry-heading': {
						'label': 'Correções',
						'type': 'select',
						'list': mainGroupsOfFixes
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
AWB.getRulesHTML = function (rules) {
	var i, length, r, $li,
	$ul = $('<ul></ul>');

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
			$li.append(AWB.getRulesHTML(r.sub));
		}
		$li.appendTo($ul);
	}
	return $ul;
};

/**
 * Execute the script when in edit mode
 */
AWB.run = function () {
	var $someWhere;

	if (mw.config.get('wgAction') === 'edit') {
		AWB.$target = $('#wpTextbox1');
		AWB.text = AWB.$target.val();

		/* Check if we are in edit mode and the required modules are available and then customize the toolbar */
		if ($.inArray(mw.config.get('wgAction'), ['edit', 'submit']) !== -1 ) {
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
						AWB.processRules(AWB.rules);
						AWB.$target.val( AWB.text );
					} );
				}
			} );
		}
	} else if (mw.config.get('wgAction') === 'view' && mw.config.get('wgPageName') === 'Wikipédia:Projetos/AWB/Script' ) {
		// TODO: Implement a true user interface on this "special page"
		if (AWB.hasUserInterface) {
			mw.util.addCSS('.awb-disabled{ color: red;}');
			$someWhere = $('#awb-search-and-replace-rules');
			if(!$someWhere.length) {
				$someWhere = $('#mw-content-text');
			}
			$someWhere.html(AWB.getRulesHTML(AWB.rules));
		}
	}
};

$(AWB.run);

}(jQuery, mediaWiki, AWB));