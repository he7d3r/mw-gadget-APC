// [[File:User:He7d3r/Tools/APC.js]] (workaround for [[phab:T35355]])
/*jslint browser: true, white: true, regexp: true, todo: true */
/**
 * Ferramenta que facilita a correção de artigos da Wikipédia
 * por meio do processamento de listas de regras do tipo "localizar e substituir"
 * (análoga à existente no AutoWikiBrowser)
 * Ver também:
 ** [[WP:Scripts/APC]] (documentação)
 ** [[w:User:!Silent/correções.js]]
 ** [[w:WP:Projetos/Check Wikipedia/AWB]]
 ** [[w:WP:Projetos/AWB]]
 ** [[m:User:TMg/autoFormatter]]
 ** [[en:User:Joeytje50/AWB.js]]
 ** [[ru:MediaWiki:Wikificator.js]]
 ** [[meta:Wikificator]]
 ** http://autowikibrowser.svn.sourceforge.net/viewvc/autowikibrowser/AWB/WikiFunctions/ReplaceSpecial/Rule.cs?view=markup
 * @author: Helder (https://github.com/he7d3r)
 * @license: CC BY-SA 3.0 <https://creativecommons.org/licenses/by-sa/3.0/>
 */
/*global jQuery, mediaWiki, APC */
if ( window.APC === undefined ) {
	window.APC = {};
}
(function ($, mw, APC) {
'use strict';

/* Translatable strings */
mw.messages.set( {
	'apc-version': '0.40',
	'apc-summary-text': ' +[[WP:Scripts/APC|correções]] [[WP:SR|semiautomáticas]] ($1/$2)',
	'apc-button-rules-all': 'Todas',
	'apc-button-rules-custom': 'Escolher regras...',
	'apc-button-bug': 'Informar um erro',
	'apc-new-bug-title': '[BUG] ($1/$2) [[$3]]',
	'apc-group': 'APC',
	'apc-button-enabled-rule': '$1',
	'apc-button-disabled-rule': '$1 ($2)',
	'apc-disabled-rule': 'desativada temporariamente',
	'apc-rules-heading': 'Correções',
	'apc-default-rule-name': 'Rule',
	'apc-find-and-replace-title': 'Localizar:\n$1\n\nSubstituir por:\n$2',
	'apc-experimental': 'Em fase experimental',
	'apc-version-info': 'Observação: esta é a versão $1 da lista de regras' +
		' (gerada pela versão $2 do script).',
	'apc-expand-all-text': 'Expandir tudo',
	'apc-expand-all-desc': 'Expandir todos os itens',
	'apc-collapse-all-text': 'Recolher tudo',
	'apc-collapse-all-desc': 'Recolher todos os itens',
	'apc-format-text': 'Formatar com APC',
	'apc-format-desc': 'Formata o código wiki da página de acordo com as' +
		' regras estabelecidas no código do script',
	'apc-invalid-value':  'Invalid value: $1.',
	'apc-no-templates': 'where=templates is not available yet',
	'apc-where': 'where=$1 on rule "$2"',
	'apc-dialog-title': 'Lista de regras',
	'apc-button-cancel': 'Cancelar',
	'apc-button-apply-selected-rules': 'Aplicar regras selecionadas',
	'apc-dialog-text': 'Por enquanto esta janela só serve para ver a lista' +
		' de regras. Futuramente, será possível ativar ou desativar' +
		' cada uma antes de aplicá-las.'
});

var loadedWikiEditor = false,
	loadedList = false,
	addedDefaultApcToolbar = false,
	targetText = '', // This will store the text to which the rules will be applied
	allowFunctionTests = false, // TODO: Do we need this?
	allowOnlyInsideTemplates = false, // TODO: Implement this
	reKeyWords,
	// See also http://autowikibrowser.svn.sourceforge.net/viewvc/autowikibrowser/AWB/WikiFunctions/Tools.cs?revision=8179&view=markup#l536
	keywords = {
		'%%title%%': mw.config.get('wgPageName').replace(/_/g, ' '),
		'%%fullpagename%%': mw.config.get('wgPageName').replace(/_/g, ' '),
		'%%pagename%%': mw.config.get('wgTitle')
	},
	applyKeyWords = function (matchedKey) {
		return keywords[matchedKey];
	},
	applyEscapedKeyWords = function (matchedKey) {
		return mw.RegExp.escape( keywords[matchedKey] );
	},
	getRegexForKeywords = function () {
		var keys = [];
		$.each(keywords, function (key) {
			keys.push(mw.RegExp.escape(key));
		});
		return new RegExp( '(' + keys.join('|') + ')', 'g' );
	},
	// names = {},
	// dup = [],
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
	 */
	rules = [],
	/**
	* Get an HTML representation of the list of rules and subrules
	* @param rules The list of rules
	* @return {jQuery} The jQuery object correspoding to the HTML of the requested
	*/
	getRulesHTML = function (rules, visible) {
		var i, length, r, $li, name, safeName,
			defaultRuleName = mw.msg( 'apc-default-rule-name' ),
			$ul = $('<ul></ul>').toggle( visible || false );

		// TODO: Implement "collapsible sublists"
		for (i = 0, length = rules.length; i < length; i += 1) {
			r = rules[i];
			name = ( r.name || defaultRuleName );
/*			if ( names[ name ] === undefined ) {
				names[ name ] = 0;
			} else {
				names[ name ] += 1;
			}
*/			safeName = name
				.replace( /[ _\-]+/g, '-' )
				.replace( /[^\-a-z0-9]+/ig, '' );
			$li = $('<li></li>')
				.attr( 'title', mw.msg( 'apc-find-and-replace-title', r.find, r.replace ) )
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
					.attr('title', mw.msg( 'apc-experimental' ) );
			}
			if ($.isArray(r.sub) && r.sub.length) {
				$li.append(getRulesHTML(r.sub))
					.addClass('apc-list-toggle');
			}
			$li.appendTo($ul);
		}
		return $ul;
	},
	updateHtmlList = function () {
		var versionHTML, $expandButton, $collapseButton, $list, $rules, onClick;
		$rules = $('#apc-search-and-replace-rules');
		if (!$rules.length) {
			$rules = $('#mw-content-text');
		}
		versionHTML = '<p>' + mw.msg( 'apc-version-info', APC.rulesVersion, mw.msg( 'apc-version' ) ) + '</p>';
		onClick = function () {
			var showOrHide = $( this ).val() === mw.msg( 'apc-expand-all-text' );
			$rules
				.find( 'ul:not(.apc-main-list)' )
					.toggle( showOrHide ).end()
				.find( 'li.apc-list-toggle' )
					.toggleClass( 'apc-expanded', showOrHide );
		};
		$expandButton = $('<input type="button" value="' + mw.msg( 'apc-expand-all-text' ) +
				'" title="' + mw.msg( 'apc-expand-all-desc' ) + '"/>')
			.click( onClick );
		$collapseButton = $('<input type="button" value="' + mw.msg( 'apc-collapse-all-text' ) +
				'" title="' + mw.msg( 'apc-collapse-all-desc' ) + '"/>')
			.click( onClick );
		$list = getRulesHTML(rules, true)
			.on('change', 'input', function (e) {
				var $target = $(e.target),
					$li = $target.parent();
				if ( $li.hasClass('apc-list-toggle') ) {
					$li.find('ul:first').find('input')
						.prop(
							'checked',
							$target.is(':checked')
						);
				}
			})
			.on('click', 'li', function (e) {
				e.stopPropagation();
				if ( $(e.target).hasClass('apc-list-toggle') ) {
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
			.append( $expandButton )
			.append( $collapseButton )
			.append( $list );
/*				$.each(names, function (n) {
			if ( names[n] > 0 ) {
				dup.push( n );
			}
		});
		console.log( dup.sort().join('\n') );
		console.warn( 'Há ' + dup.length + ' regras com nomes duplicados!' );
*/
	},
	openDialog = function () {
		var buttons = {};
		buttons[ mw.msg( 'apc-button-apply-selected-rules' ) ] = function () {
			alert( 'Ops! Este recurso ainda não foi implementado.' );
		};
		buttons[ mw.msg( 'apc-button-cancel' ) ] = function () {
			$( this ).dialog( 'close' );
		};
		$( '<div id="apc-dialog-rules"><div id="apc-search-and-replace-rules"></div></div>' )
			.prepend( mw.msg( 'apc-dialog-text' ) )
			.dialog( {
				width: 550,
				height: 350,
				modal: true,
				resizable: true,
				draggable: true,
				closeOnEscape: true,
				dialogClass: 'apc-dialog',
				title: mw.msg( 'apc-dialog-title' ),
				close: function () {
					$( this ).dialog( 'destroy' ).remove();
				},
				buttons: buttons
			} );
		updateHtmlList();
	},
	updateToolbar = function () {
		var	i,
			$textBox = $( '#wpTextbox1' ),
			summaryText = mw.msg( 'apc-summary-text', 'v' + mw.msg( 'apc-version' ), APC.rulesVersion ),
			$sumField = $( '#wpSummary' ),
			executeGroup = function ( i ) {
				return function () {
					targetText = APC.$target.val();
					APC.processRules( [ rules[i] ] );
					APC.$target.val(targetText);
					$sumField.val( $sumField.val() + summaryText );
				};
			},
			mainRules = {
				'APC-rules-all': {
					label: mw.msg( 'apc-button-rules-all' ),
					action: {
						type: 'callback',
						execute: function () {
							targetText = APC.$target.val();
							APC.processRules(rules);
							APC.$target.val(targetText);
							$sumField.val( $sumField.val() + summaryText );
						}
					}
				}
			},
			bugButton = {
				label: mw.msg( 'apc-button-bug' ),
				type: 'button',
				// Icon by [[commons:User:Medium69]]
				icon: '//upload.wikimedia.org/wikipedia/commons/1/11/Button_Nuvola_apps_edu_lang.png',
				action: {
					type: 'callback',
					execute: function () {
						var url = mw.util.getUrl( 'Wikipédia Discussão:Scripts/APC' ) + '?' +
							$.param({
								action: 'edit',
								section: 'new',
								preloadtitle: mw.msg(
									'apc-new-bug-title',
									'v' + mw.msg( 'apc-version' ),
									APC.rulesVersion,
									mw.config.get( 'wgPageName' )
										.replace( /_/g, ' ' )
								),
								preload: 'WP:Scripts/APC/Bug'
							});
						window.open( url );
					}
				}
			};
		mw.log.warn( 'MediaWiki:Gadget-APC.js/Core.js: addedDefaultApcToolbar', addedDefaultApcToolbar );
		mw.log.warn( 'MediaWiki:Gadget-APC.js/Core.js: !!$( \'div[rel=apc-rules-heading]\' ).length', !!$( 'div[rel=apc-rules-heading]' ).length );
		mw.log.warn( 'MediaWiki:Gadget-APC.js/Core.js: !!$( \'div[rel=APC]\' ).length', !!$( 'div[rel=APC]' ).length );
		if ( addedDefaultApcToolbar ) {
			// Remove existing menu
			$textBox.wikiEditor( 'removeFromToolbar', {
				'section': 'advanced',
				'group': 'APC'
			} );
		} else {
			$textBox.wikiEditor( 'addToToolbar', {
				section: 'advanced',
				groups: {
					APC: {
						label: mw.msg( 'apc-group' ),
						tools: {
							'apc-report-a-bug': bugButton
						}
					}
				}
			} );
			addedDefaultApcToolbar = true;
		}
		if ( !rules.length ) {
			return;
		}
		for (i = 0; i < rules.length; i += 1) {
			mainRules[ 'APC-rules-' + i ] = {
				label: rules[i].enabled === false
					? mw.msg( 'apc-button-disabled-rule', rules[i].name )
					: mw.msg( 'apc-button-enabled-rule', rules[i].name, mw.msg( 'apc-disabled-rule' ) ),
				action: {
					type: 'callback',
					execute: executeGroup(i)
				}
			};
		}
		mainRules[ 'APC-rules-custom' ] = {
			label: mw.msg( 'apc-button-rules-custom' ),
			action: {
				type: 'callback',
				execute: function () {
					mw.loader.using( 'jquery.ui.dialog', openDialog );
				}
			}
		};
		$textBox.wikiEditor( 'addToToolbar', {
			section: 'advanced',
			group: 'APC',
			tools: {
				'apc-rules-heading': {
					label: mw.msg( 'apc-rules-heading' ),
					type: 'select',
					list: mainRules
				}
			}
		} );
	},
	/**
	* Execute the script when in edit mode
	*/
	load = function () {
		if ($.inArray(mw.config.get('wgAction'), ['edit', 'submit']) !== -1 ) {
			APC.$target = $('#wpTextbox1');

			/* Make sure the required modules are available and then customize the toolbar */
			mw.loader.using( [ 'user.options', 'mediawiki.RegExp' ], function () {
				// This can be the string "0" if the user disabled the preference ([[phab:T54542#555387]])
				if ( mw.user.options.get( 'usebetatoolbar' ) == 1 ) {
					mw.loader.using( 'ext.wikiEditor.toolbar', function () {
						loadedWikiEditor = true;
						mw.log.warn( 'MediaWiki:Gadget-APC.js/Core.js: load > updateToolbar()' );
						// updateToolbar();
					} );
				} else {
					// TODO: Improve support for old toolbar?
					$( mw.util.addPortletLink(
						'p-tb',
						'#',
						mw.msg( 'apc-format-text' ),
						'#ca-APC',
						mw.msg( 'apc-format-desc' )
					) ).click( function (e) {
						e.preventDefault();
						targetText = APC.$target.val();
						APC.processRules(rules);
						APC.$target.val( targetText );
					} );
				}
			} );

		} else {
			loadedList = true;
			updateHtmlList();
		}
	};

// APC.Rule.prototype = '...'; // TODO: Implement default values in some prototype?

/**
 * Loop over all rules and subrules, applying those which are enabled
 * @param rules The list of rules
 * FIXME: Guardar o texto em uma variável local em vez de targetText, para otimizar
 */
APC.processRules = function (rules) {
	var i, length, r, times, temp;
	if ( !reKeyWords ) {
		reKeyWords = getRegexForKeywords();
	}
	for (i = 0, length = rules.length; i < length; i += 1) {
		r = rules[i];
		if (r.enabled !== false
			&& (
				!r.ifhas
				|| (typeof r.ifhas === 'string' && targetText.indexOf(r.ifhas) !== -1)
				|| (allowFunctionTests && $.isFunction(r.ifhas) && r.ifhas(targetText))
				|| (typeof r.ifhas === 'object' && r.ifhas.test(targetText))
			)
			&& (
				!r.ifnot
				|| (typeof r.ifnot === 'string' && targetText.indexOf(r.ifnot) === -1)
				|| (allowFunctionTests && $.isFunction(r.ifnot) && !r.ifnot(targetText))
				|| (typeof r.ifnot === 'object' && !r.ifnot.test(targetText))

			)
		) {
			if (r.where === undefined || r.where === 'anywhere') {
				if (r.find !== undefined && r.find !== '' && r.replace !== undefined) {
					if ( typeof r.find === 'string' ) {
						r.find = r.find.replace( reKeyWords, applyKeyWords );
					} else if ( r.find instanceof RegExp && r.find.source.indexOf( '%%' ) !== -1 ) {
						r.find = new RegExp(
							r.find.source.replace( reKeyWords, applyEscapedKeyWords ),
							(r.find.global ? 'g' : '') +
								(r.find.ignoreCase ? 'i' : '') +
								(r.find.multiline ? 'm' : '')
						);
					}
					r.replace = r.replace.replace( reKeyWords, applyKeyWords );
					times = r.num === undefined || r.num < 1
						? 1
						: r.num > 100
							? 100
							: r.num;
					temp = targetText;
					while ( times > 0) {
						targetText = targetText.replace( r.find, r.replace );
						times -= 1;
					}
					if ( temp !== targetText ) {
						mw.log( r.find, r.replace );
					}
				}
				if ($.isArray(r.sub) && r.sub.length) {
					APC.processRules(r.sub);
				}
			} else if (allowOnlyInsideTemplates && r.where === 'templates') {
				// TODO: Implement this for non-nested templates!
				// TODO: How to allow nested templates? E.g.: {{info|param={{format|...}}|param=...}}
				mw.log( mw.msg( 'apc-invalid-value', mw.msg( 'apc-no-templates' ) ) );
			} else {
				mw.log(
					mw.msg(
						'apc-invalid-value',
						mw.msg(
							'apc-where',
							r.where,
							r.name || mw.msg( 'apc-default-rule-name' )
						)
					)
				);
			}
		}
	}
};

/* Public Methods */

APC.addRules = function ( newRules ) {
	if ( !$.isArray( newRules ) ) {
		newRules = [ newRules ];
	}
	$.merge( rules, newRules );
/*	if ( APC.rulesVersion && APC.rulesVersion.indexOf( 'mod' ) === -1 ) {
		APC.rulesVersion += 'mod';
	}*/
	if ( loadedWikiEditor ) {
		mw.log.warn( 'MediaWiki:Gadget-APC.js/Core.js: APC.addRules > updateToolbar()' );
		updateToolbar();
	}
	if ( loadedList ) {
		updateHtmlList();
	}
};

APC.removeAllRules = function () {
	rules = [];
	if ( loadedWikiEditor ) {
		mw.log.warn( 'MediaWiki:Gadget-APC.js/Core.js: APC.removeAllRules > updateToolbar()' );
		updateToolbar();
	}
	if ( loadedList ) {
		updateHtmlList();
	}
};
$(load);

}(jQuery, mediaWiki, APC));