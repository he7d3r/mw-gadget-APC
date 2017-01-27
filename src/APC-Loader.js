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

var config = {
	url: {
		core: 'https://meta.wikimedia.org/w/index.php?title=User:He7d3r/Tools/APC.js&action=raw&ctype=text/javascript',
		list: 'https://meta.wikimedia.org/w/index.php?title=User:He7d3r/Tools/APC-List.js&action=raw&ctype=text/javascript',
		css: 'https://meta.wikimedia.org/w/index.php?title=User:He7d3r/Tools/APC.css&action=raw&ctype=text/css'
	}
};
window.APC = $.extend( true, {}, config, window.APC );
if ( $.inArray( mw.config.get( 'wgAction' ), [ 'edit', 'submit' ] ) !== -1 ||
	(
		mw.config.get( 'wgPageName' ) === window.APC.helpPage &&
		$.inArray( mw.config.get( 'wgAction' ), [ 'view', 'purge' ] ) !== -1
	)
) {
	mw.loader.load( window.APC.url.css, 'text/css' );
	mw.loader.load( window.APC.url.list );
}

}( mediaWiki, jQuery ) );
