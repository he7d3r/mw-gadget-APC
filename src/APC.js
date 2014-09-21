// [[File:User:He7d3r/Tools/APC.js]] (workaround for [[bugzilla:33355]])
/**
 * Carregador da ferramenta APC
 * @help: [[WP:Scripts/APC]]
 * @author: [[User:Helder.wiki]]
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
	$.getScript( '//pt.wikipedia.org/w/load.php?modules=ext.gadget.APCList&only=scripts&debug=' + mw.config.get( 'debug' ) );
}

}(mediaWiki, jQuery));