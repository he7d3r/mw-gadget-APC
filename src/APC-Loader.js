/**
 * APC loader
 * @help: [[WP:Scripts/APC]]
 * @author: Helder (https://github.com/he7d3r)
 * @license: CC BY-SA 3.0 <https://creativecommons.org/licenses/by-sa/3.0/>
 */
/*jslint white: true */
/*global mediaWiki, jQuery */

( function ( mw, $ ) {
'use strict';

var defaultConf = {
		// TODO: globalRulesUrl: 'https://meta.wikimedia.org/w/index.php?title=User:He7d3r/Tools/APC-List.js&action=raw&ctype=text/javascript',
		// TODO: globalRulesVersion: '0.1',
		coreUrl: 'https://meta.wikimedia.org/w/index.php?title=User:He7d3r/Tools/APC.js&action=raw&ctype=text/javascript',
		cssUrl: 'https://meta.wikimedia.org/w/index.php?title=User:He7d3r/Tools/APC.css&action=raw&ctype=text/css',
		helpPage: 'm:pt:Project:Scripts/APC'
	},
	addRules = function () {
		if ( window.APC.userRules ) {
			APC.addRules( window.APC.userRules );
			delete window.APC.userRules;
		}
		if ( window.APC.siteRules ) {
			APC.addRules( window.APC.siteRules );
			delete window.APC.siteRules;
		}
	};

window.APC = $.extend( {}, defaultConf, window.APC );

if ( $.inArray( mw.config.get( 'wgAction' ), [ 'edit', 'submit' ] ) !== -1 ||
	(
		mw.config.get( 'wgPageName' ) === window.APC.helpPage &&
		$.inArray( mw.config.get( 'wgAction' ), [ 'view', 'purge' ] ) !== -1
	)
) {
	if ( window.APC && window.APC.addRules ) {
		addRules();
	} else {
		if ( !window.APC.loadedCore ) {
			window.APC.loadedCore = true;
			mw.loader.load( window.APC.cssUrl, 'text/css' );
			$.getScript( window.APC.coreUrl )
				.done( addRules );
		}
	}
}

}( mediaWiki, jQuery ) );
