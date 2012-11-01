/**
 * Carregador da ferramenta APC
 * @help: [[WP:Scripts/APC]]
 * @author: [[User:Helder.wiki]]
 * @tracking: [[Special:GlobalUsage/User:Helder.wiki/Tools/APC.js]] ([[File:User:Helder.wiki/Tools/APC.js]])
 */
/*jslint white: true */
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
		mw.loader.load( 'ext.gadget.APCCore' );
	} );
}

}(mediaWiki, jQuery));