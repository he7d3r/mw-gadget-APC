/**
 * Carregador da ferramenta APC
 * @help: [[WP:Scripts/APC]]
 * @author: [[User:Helder.wiki]]
 * @tracking: [[Special:GlobalUsage/User:Helder.wiki/Tools/APC.js]] ([[File:User:Helder.wiki/Tools/APC.js]])
 */
/*jslint white: true, browser: true, devel: true */
/*global mediaWiki, jQuery, importScript */

(function (mw, $) {
'use strict';

var debug = mw.config.get( 'wgUserName' ) === 'Helder.wiki'
	&& ! /\.js$/.test( mw.config.get( 'wgTitle' ) );

if ( debug && new Date() >= Date.parse('November 3, 2012') ) {
	alert( 'Atualizar MediaWiki:Gadget-APC.js (resolveram o bug 40288?)' );
}

if ( $.inArray( mw.config.get( 'wgAction' ), [ 'edit', 'submit' ] ) !== -1
	|| (
		mw.config.get( 'wgPageName' ) === 'Wikipédia:Scripts/APC'
		&& $.inArray( mw.config.get( 'wgAction' ), [ 'view', 'purge' ] ) !== -1
	)
) {
	mw.loader.using( 'ext.gadget.APCList', function(){
		if ( window.APC === undefined ){
			if ( debug ) {
				alert( 'Bug 40288! https://bits.wikimedia.org/pt.wikipedia.org/load.php?modules=ext.gadget.APCList' );
			}
			$.getScript( '//pt.wikipedia.org/w/index.php?title=MediaWiki:Gadget-APC.js/List.js&action=raw&ctype=text/javascript&smaxage=21600&maxage=86400' )
			.done(function(){
				importScript( 'MediaWiki:Gadget-APC.js/Core.js' );
			});
		} else {
			mw.loader.load( 'ext.gadget.APCCore' );
		}
	} );
}

}(mediaWiki, jQuery));