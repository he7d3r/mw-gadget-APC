/**
 * Carregador da ferramenta APC
 * @help: [[WP:Scripts/APC]]
 * @author: [[User:Helder.wiki]]
 * @tracking: [[Special:GlobalUsage/User:Helder.wiki/Tools/APC.js]] ([[File:User:Helder.wiki/Tools/APC.js]])
 */
/*jslint white: true, browser: true */
/*global mediaWiki, jQuery */

(function (mw, $) {
'use strict';
var url = '//pt.wikipedia.org/w/index.php?title=User:Helder.wiki/Tools/APC.js/List.js&action=raw&ctype=text/javascript&smaxage=21600&maxage=86400';

if ( $.inArray(mw.config.get('wgAction'), ['edit', 'submit']) !== -1
	|| (
		mw.config.get('wgPageName') === 'Wikipédia:Scripts/APC'
		&& $.inArray(mw.config.get('wgAction'), ['view', 'purge']) !== -1
	)
) {
	$.getScript( url ).done(function(){
		mw.loader.load( url.replace('List.js', 'Core.js') );
	});
}

}(mediaWiki, jQuery));