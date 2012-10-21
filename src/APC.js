/**
 * Carregador da ferramenta APC
 * @help: [[WP:Scripts/APC]]
 * @author: [[User:Helder.wiki]]
 * @tracking: [[Special:GlobalUsage/User:Helder.wiki/Tools/APC.js]] ([[File:User:Helder.wiki/Tools/APC.js]])
 */
/*jslint white: true, browser: true */
/*global mediaWiki, jQuery, importScript */

(function (mw, $) {
'use strict';
 
if ( $.inArray( mw.config.get( 'wgAction' ), [ 'edit', 'submit' ] ) !== -1
	|| (
		mw.config.get( 'wgPageName' ) === 'Wikipédia:Scripts/APC'
		&& $.inArray( mw.config.get( 'wgAction' ), [ 'view', 'purge' ] ) !== -1
	)
) {
	// FIXME: Usar esta versão em vez da próxima assim que o [[bugzilla:40288]] for corrigido
	/*
	mw.loader.using( 'ext.gadget.APCList', function(){
		mw.loader.load( 'ext.gadget.APCCore' );
	} );
	*/
	$.getScript( '//pt.wikipedia.org/w/index.php?title=MediaWiki:Gadget-APC.js/List.js&action=raw&ctype=text/javascript&smaxage=21600&maxage=86400' )
	.done(function(){
		importScript( 'MediaWiki:Gadget-APC.js/Core.js' );
	});

}

}(mediaWiki, jQuery));