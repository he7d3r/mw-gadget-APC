Installation as a gadget
===========================
```javascript
var siteConf = {
	siteRulesVersion: '0.1',
	helpPage: 'Project:Scripts/APC'
};
siteConf.siteRules = [ {
	name: 'Site rules',
	sub: [
		// https://regex101.com/r/CJjYd4/1
		{ name: 'Simplify links', find: /\[\[(.+?)\|\1\]\]/g, replace: '[[$1]]' },
		// https://regex101.com/r/32MAsQ/1
		{ name: 'Fix double protocol', find: /https?:\/\/(https?:\/\/)/g, replace: '$1' }
	]
} ];
// Site config can be override by user configs
window.APC = $.extend( {}, siteConf, window.APC );
// [[File:User:He7d3r/Tools/APC.js]] (workaround for [[phab:T35355]])
mw.loader.load( 'https://meta.wikimedia.org/w/index.php?title=User:He7d3r/Tools/APC-Loader.js&action=raw&ctype=text/javascript' );
```
Installation as a user script
===========================
```javascript
var userConf = { userRulesVersion: '0.1' };
userConf.userRules = [ {
	name: 'My rules',
	sub: [
		// https://regex101.com/r/CJjYd4/1
		{ name: 'Simplify internal links', find: /\[\[(.+?)\|\1\]\]/g, replace: '[[$1]]' },
		// https://regex101.com/r/32MAsQ/1
		{ name: 'Fix double protocol', find: /https?:\/\/(https?:\/\/)/g, replace: '$1' }
	]
} ];
// User config overrides site config
window.APC = $.extend( {}, window.APC, userConf );
// [[File:User:He7d3r/Tools/APC.js]] (workaround for [[phab:T35355]])
mw.loader.load( 'https://meta.wikimedia.org/w/index.php?title=User:He7d3r/Tools/APC-Loader.js&action=raw&ctype=text/javascript' );
```
