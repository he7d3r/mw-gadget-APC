/**
 * Carregador da ferramenta APC
 * @help: [[WP:Scripts/APC]]
 * @author: [[User:Helder.wiki]]
 * @tracking: [[Special:GlobalUsage/User:Helder.wiki/Tools/APC.js]] ([[File:User:Helder.wiki/Tools/APC.js]])
 */
/*jslint white: true, browser: true, devel: true */
/*global mediaWiki, jQuery */

(function (mw, $) {
'use strict';
 
if ( $.inArray( mw.config.get( 'wgAction' ), [ 'edit', 'submit' ] ) !== -1
	|| (
		mw.config.get( 'wgPageName' ) === 'Wikipédia:Scripts/APC'
		&& $.inArray( mw.config.get( 'wgAction' ), [ 'view', 'purge' ] ) !== -1
	)
) {
	mw.loader.using( 'ext.gadget.APCList', function(){
		if ( window.APC === undefined ){
			if ( console !== undefined && $.isFunction( console.warn ) ) {
				console.warn( 'Aparentemente o bug 40288 impediu o carregamento da lista do APC.' );
			}
		}
		mw.loader.load( 'ext.gadget.APCCore' );
	} );
}

}(mediaWiki, jQuery));