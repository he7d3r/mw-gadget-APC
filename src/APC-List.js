/*jslint browser: true, white: true, regexp: true, todo: true */
/*global $, mw */
/**
 * Lista de regras para correção de artigos da Wikipédia
 * Gerada a partir da versão 3.1.1 das configurações do AWB do [[w:User:Rjclaudio]]
 * (http://code.google.com/p/rjclaudio-awb/downloads/list)
 * Ver também:
 * - [[WP:Projetos/AWB/Script]] (documentação)
 * - [[w:User:!Silent/correções.js]]
 * - [[w:WP:Projetos/Check Wikipedia/AWB]]
 * - [[w:WP:Projetos/AWB]]
 * @tracking: [[Special:GlobalUsage/User:Helder.wiki/Tools/AWB/SearchAndReplace.js]] ([[File:User:Helder.wiki/Tools/AWB/SearchAndReplace.js]])
 */
// <nowiki>, para facilitar o uso de "subst:" e assinaturas
window.AWB = {
	rulesVersion: '3.1.4'
};
window.AWB.rules = [{
	name: 'Iniciando',
	find: '',
	replace: '',
	num: 1,
	ifnot: /(\{\{desambiguação\}\}|\[\[Categoria:Desambiguaç(ão|ões))/i,
	sub: [{
		name: 'Padronização',
		find: '',
		replace: '',
		num: 1,
		sub: [{
			name: 'Caracteres',
			find: '',
			replace: '',
			num: 1,
			sub: [{
				name: 'tab',
				find: /([^ ]) *\t/i,
				replace: '$1 ',
				num: 100
			}, {
				name: '\r\n',
				find: /\r\n/,
				replace: '\n',
				num: 100
			}, {
				name: 'Rule',
				find: /\n[*#]\n/i,
				replace: '\n',
				num: 10
			}]
		}, {
			name: 'Trim h',
			find: '',
			replace: '',
			num: 1,
			sub: [{
				name: 'Trimming de DEFAULTSORT',
				find: '',
				replace: '',
				num: 1,
				sub: [{
					name: 'Trimming de DEFAULTSORT 1',
					find: /\{\{ *DEFAULTSORT *\: *(.+)\}\}\n/i,
					replace: '{{DEFAULTSORT:$1}}\n',
					num: 100
				}, {
					name: 'Trimming de DEFAULTSORT 2',
					find: /(\{\{DEFAULTSORT\:.*) +\}\}/i,
					replace: '$1}}',
					num: 100
				}]
			}, {
				name: 'Trimming em final de parágrafo',
				find: /([^ ]) +\r?\n/i,
				replace: '$1\n',
				num: 100
			}, {
				name: 'Trimming de tag',
				find: '',
				replace: '',
				num: 1,
				ifhas: /</i,
				ifnot: /(<(blockquote|code|gallery|math|timeline|pre|poem|nowiki|quote|source)|\{\{(Citação|Quim))/,
				sub: [{
					// FIXME: Remove HTML entities from rule's names
					name: 'Trimming em <tag>',
					find: /< *([^\n>]+) *\>/,
					replace: '&lt;$1&gt;',
					num: 100
				}, {
					name: 'Trimming em </tag>',
					find: /([^ ]) *<\/ *([^\n>]+) *\>/i,
					replace: '$1&lt;/$2&gt;',
					num: 100
				}, {
					name: '<ref | <br />',
					find: / +(<ref|<br \/>)/i,
					replace: '$1',
					num: 100
				}]
			}, {
				name: 'Trimming de categoria',
				find: '',
				replace: '',
				num: 1,
				ifhas: /Cat/i,
				sub: [{
					name: 'Trimming de categoria',
					find: /\[\[ *Category?í?i?a? *\: */i,
					replace: '[[Categoria:',
					num: 100
				}, {
					name: 'Trimming de categoria 2',
					find: /(\[\[Categoria\:.*\|.+) +\]\]\r?\n/i,
					replace: '$1]]\n',
					num: 100
				}, {
					name: 'Trimming de categoria 3',
					find: /(\[\[Categoria\:.*[^\|]) +\]\]\r?\n/i,
					replace: '$1]]\n',
					num: 100
				}]
			}, {
				name: 'Trim. hor. Ficheiro',
				find: /([\[\n\|\=]\[?)(Imagem?|File|Arquivo|Ficheiro) *\: *([^ ])/i,
				replace: '$1$2:$3',
				num: 100
			}, {
				name: 'Trimming de ligação',
				find: /\[ *([^\]\n]+) *\]/i,
				replace: '[$1]',
				num: 100,
				ifnot: /(<(blockquote|code|gallery|math|timeline|pre|poem|nowiki|quote|source)|\{\{(Citação|Quim))/i
			}, {
				name: 'Arrumando trimming em ligação',
				find: /(\[\[Categoria:[^\|])+\|\]\]/,
				replace: '$1 $2',
				num: 100
			}, {
				name: 'Trimming de predef',
				find: /\{\{ *(\r?\n)* */,
				replace: '{{',
				num: 100,
				ifnot: /(<(blockquote|code|gallery|math|timeline|pre|poem|nowiki|quote|source)|\{\{(Citação|Quim))/i
			}, {
				name: 'Trimming em seções',
				find: /^(==+) *([^\=\n]*?\w[^\=\n]*?) *(==+) *\r?\n[\r\n ]*/im,
				replace: '$1 $2 $3\n',
				num: 100
			}, {
				name: 'Trimming em seção destaque',
				find: /\r?\n\; {2,}(.*)\r?\n/im,
				replace: '\n; $1\n',
				num: 100
			}, {
				name: 'Trimming hor de lista',
				find: /\r?\n *([\#\*]+) */m,
				replace: '\n$1 ',
				num: 100
			}, {
				name: 'Trimming em ref',
				find: /(<ref[^\>]*>) +/,
				replace: '$1',
				num: 100
			}, {
				name: 'Trm h - aspas',
				find: '',
				replace: '',
				num: 1,
				sub: [{
					name: 'Trm h - aspas iniciais',
					find: /([ \r\n]'+) +([^'\n]*[^' \r\n]'+[ \r\n])/i,
					replace: '$1$2',
					num: 1
				}, {
					name: 'Trm h - aspas finais',
					find: /([ \r\n]'+[^' \r\n][^'\n]+) +('+[ \r\n])/i,
					replace: '$1$2',
					num: 1
				}]
			}]
		}, {
			name: 'Trim v',
			find: '',
			replace: '',
			num: 1,
			sub: [{
				name: 'Quebra de linha em Ficheiro',
				find: '',
				replace: '',
				num: 1,
				sub: [{
					name: '1 Linha antes de Ficheiro',
					find: /\.( |\r\n)╠/,
					replace: '.\n\n╠',
					num: 1
				}]
			}, {
				name: 'Quebra de linha em Infobox',
				find: '',
				replace: '',
				num: 1,
				sub: [{
					name: '}}{{Info/',
					find: /\}\}\{\{Info\//,
					replace: '}}\n{{Info/',
					num: 1
				}, {
					name: 'Antes de {{Info',
					find: /(\r?\n){2,}\{\{Info/,
					replace: '\n{{Info',
					num: 1
				}, {
					name: 'Após Infobox',
					find: /\r?\n\}\}(?:\r?\n){2,}/,
					replace: '\n}}\n',
					num: 1
				}]
			}, {
				name: 'Quebra de linha em cats',
				find: '',
				replace: '',
				num: 1,
				sub: [{
					name: 'trim v+ antes cats 1',
					find: /([^\r\n])(\[\[Categoria\:)/i,
					replace: '$1\n$2',
					num: 10
				}, {
					name: 'trim v+ antes cats 2',
					find: /([^\]\r\n])(?:\r?\n)\[\[Categoria\:/i,
					replace: '$1\n\n[[Categoria:',
					num: 1
				}, {
					name: 'trim v+ antes cats 3',
					find: /(\{\{DEFAULTSORT:[^{}\n]+\}\})(?:\r?\n){2,}(\[\[Categoria:)/i,
					replace: '$1\n$2',
					num: 1
				}, {
					name: 'trim v- entre cats',
					find: /(\[\[Categoria\:[^\[\]\n]+\]\])(?:\r?\n){2,}(\[\[Categoria\:)/i,
					replace: '$1\n$2',
					num: 1
				}, {
					name: 'trim v+ depois cats',
					find: /(\[\[Categoria\:[^\[\]\n]+\]\])([^\r\n])/i,
					replace: '$1\n$2',
					num: 1
				}]
			}, {
				name: 'Quebra de linha em iws',
				find: /([^\]])\]\r?\n(\[\[[a-z][a-z]:)/i,
				replace: '$1]\n\n$2',
				num: 1
			}, {
				name: 'Trim v- final predef',
				find: /\r?\n\r?\n\}\}/i,
				replace: '\n}}',
				num: 100
			}, {
				name: 'Trim v- após predef',
				find: /\r?\n\}\}(?:\r?\n){2,}/,
				replace: '\n}}\n',
				num: 1
			}, {
				name: 'Trim v- antes seção',
				find: /(\r?\n){3,}\=/,
				replace: '\n\n=',
				num: 100
			}, {
				name: 'Trim v+ antes seção',
				find: /([^\r\n])\r?\n\=\=/i,
				replace: '$1\n\n==',
				num: 10
			}, {
				name: 'Trim v- após seção',
				find: /\=\=(?:\r?\n){2,}/,
				replace: '==\n',
				num: 100
			}, {
				name: 'Trim v- de lista 1',
				find: /(\r?\n) *([\#\*])([^\n\r\*]*)\r?\n *(\r?\n) *([\#\*])/m,
				replace: '$1$2$3$4$5',
				num: 100
			}]
		}, {
			name: 'Destaque seções',
			find: '',
			replace: '',
			num: 1,
			sub: [{
				name: 'Destaque seções 1',
				find: /\r?\n(\=+)([^ =])/i,
				replace: '\n$1 $2',
				num: 1
			}, {
				name: 'Destaque seções 2',
				find: /([^ =])(\=+)\r?\n/i,
				replace: '$1 $2\n',
				num: 1
			}, {
				name: 'Destaque seções 3',
				find: /\r?\n\;([^ ;])/i,
				replace: '\n; $1',
				num: 1
			}]
		}, {
			name: 'Etiqueta HTML mal formatada',
			find: /<([a-z]+) *[a-z]* *\=+\>/i,
			replace: '&lt;$1&gt;',
			num: 10
		}, {
			name: 'Tags padrão',
			find: '',
			replace: '',
			num: 1,
			ifhas: '&lt;',
			sub: [{
				name: '<br /> nome do código',
				find: /< *\/? *br *\/? *.?.? *\>/i,
				replace: '&lt;br /&gt;',
				num: 100
			}, {
				name: '<h1><h2><h3>',
				find: '',
				replace: '',
				num: 1,
				ifhas: /<h[0-9]>/i,
				sub: [{
					name: '<h1>',
					find: /<h1>/i,
					replace: '=',
					num: 1
				}, {
					name: '<h2>',
					find: /<h2>/i,
					replace: '==',
					num: 1
				}, {
					name: '<h3>',
					find: /<h3>/i,
					replace: '===',
					num: 1
				}, {
					name: '<h4>',
					find: /<h4>/i,
					replace: '====',
					num: 1
				}, {
					name: '<h5>',
					find: /<h5>/i,
					replace: '=====',
					num: 1
				}, {
					name: '<h6>',
					find: /<h6>/i,
					replace: '======',
					num: 1
				}]
			}, {
				name: 'Rule',
				find: /<center\/>/i,
				replace: '&lt;/center&gt;',
				num: 10
			}]
		}, {
			name: 'Predefs padronização',
			find: '',
			replace: '',
			num: 1,
			ifhas: '{{',
			sub: [{
				name: 'Espaço após {{',
				find: /(\{\{) ([^ ])/i,
				replace: '$1$2',
				num: 1
			}, {
				name: '{{Predefinição:',
				find: /([\{\|]) *Predefinição *\:([^:\n]*\r?\n)/i,
				replace: '$1$2',
				num: 100
			}, {
				name: '{{MSG:',
				find: '{{MSG:',
				replace: '{{',
				num: 100
			}, {
				name: 'Redirect de predefs',
				find: '',
				replace: '',
				num: 1,
				ifhas: '{{',
				sub: [{
					name: 'Red Infobox',
					find: '',
					replace: '',
					num: 1,
					sub: [{
						name: 'Company',
						find: /\{\{Info(?:box)?[ _\-]Company *(\||\r?\n|╔)/i,
						replace: '{{subst:Infobox Company$1',
						num: 1
					}, {
						name: 'Red Infobox c/ Info',
						find: '',
						replace: '',
						num: 1,
						ifhas: /\{\{Info(?:box|caixa)?[ _\-\/]/i,
						sub: [{
							name: 'Red Infobox c/ Info - A',
							find: '',
							replace: '',
							num: 1,
							ifhas: /\{\{Info(?:box|caixa)?[ _\-\/:][AÁ]/i,
							sub: [{
								name: 'álbum',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]álbum *(\||\r?\n|╔)/i,
								replace: '{{Info/Álbum$1',
								num: 1
							}, {
								name: '{{Infobox animangá/',
								find: /\{\{Infobox animangá\//i,
								replace: '{{Info/Animangá/',
								num: 1
							}, {
								name: 'Acidente aéreo',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]acidente aéreo *(\||\r?\n|╔)/i,
								replace: '{{Info/Acidente aéreo$1',
								num: 1
							}, {
								name: 'Arma de fogo',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]arma de fogo *(\||\r?\n|╔)/i,
								replace: '{{Info/Arma de fogo$1',
								num: 1
							}, {
								name: 'artista musical',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Artista musical *(\||\r?\n|╔)/i,
								replace: '{{Info/música/artista$1',
								num: 1
							}, {
								name: 'Assentamento',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Assentamento *(\||\r?\n|╔)/i,
								replace: '{{Info/Assentamento$1',
								num: 1
							}, {
								name: 'astronauta',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]astronauta *(\||\r?\n|╔)/i,
								replace: '{{Info/Astronauta$1',
								num: 1
							}, {
								name: 'Ataque Civil',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Ataque Civil *(\||\r?\n|╔)/i,
								replace: '{{Info/Atentado$1',
								num: 1
							}, {
								name: 'Atentado',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]atentado *(\||\r?\n|╔)/i,
								replace: '{{Info/Atentado$1',
								num: 1
							}, {
								name: 'ator',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]ator *(\||\r?\n|╔)/i,
								replace: '{{Info/Ator$1',
								num: 1
							}, {
								name: 'Auto-estrada RUN',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Auto\-estrada RUN *(\||\r?\n|╔)/i,
								replace: '{{Info/Auto-estrada RUN$1',
								num: 1
							}, {
								name: 'autor',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]autor *(\||\r?\n|╔)/i,
								replace: '{{Info/Autor$1',
								num: 1
							}, {
								name: 'Avião',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Avião(?: Militar)? *(\||\r?\n|╔)/i,
								replace: '{{Info/Avião Militar$1',
								num: 1
							}, {
								name: 'Avião Civil',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Avião Civil *(\||\r?\n|╔)/i,
								replace: '{{Info/Avião civil$1',
								num: 1
							}, {
								name: 'Asteroide',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Asteróide *(\||\r?\n|╔)/i,
								replace: '{{Info/Asteroide$1',
								num: 1
							}, {
								name: 'Ator',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]ac?tor *(\||\r?\n|╔)/i,
								replace: '{{Info/Ator$1',
								num: 1
							}, {
								name: 'Ator',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Atriz *(\||\r?\n|╔)/i,
								replace: '{{Info/Ator$1',
								num: 1
							}]
						}, {
							name: 'Red Infobox c/ Info - B',
							find: '',
							replace: '',
							num: 1,
							ifhas: /\{\{Info(?:box|caixa)?[ _\-\/:]B/i,
							sub: [{
								name: 'Banda',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]banda *(\||\r?\n|╔)/i,
								replace: '{{Info/Banda$1',
								num: 1
							}, {
								name: 'BD',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]BD *(\||\r?\n|╔)/i,
								replace: '{{Info/Banda desenhada$1',
								num: 1
							}, {
								name: 'BD/Personagem fictícia',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]BD\/Personagem fictícia *(\||\r?\n|╔)/i,
								replace: '{{Info/Personagem fictícia$1',
								num: 1
							}, {
								name: 'Bio adulto',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]bio adulto *(\||\r?\n|╔)/i,
								replace: '{{Info/Bio adulto$1',
								num: 1
							}, {
								name: 'Biografia',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]biografia *(\||\r?\n|╔)/i,
								replace: '{{Info/Biografia$1',
								num: 1
							}, {
								name: 'Bairro de Belo Horizonte',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Bairro de (?:Belo Horizonte|Canoas) *(\||\r?\n|╔)/i,
								replace: '{{Info/Bairro do Brasil 2$1',
								num: 1
							}, {
								name: 'BairroCG',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]?Bairro(?:CG|BairroUdia| de Uberlândia) *(\||\r?\n|╔)/i,
								replace: '{{Info/Bairro do Brasil 4$1',
								num: 1
							}, {
								name: 'BD asiática',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Banda desenhada asiática *(\||\r?\n|╔)/i,
								replace: '{{Info/BD asiática$1',
								num: 1
							}, {
								name: 'Banda desenhada/Personagem fictícia',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Banda desenhada\/Personagem fictícia *(\||\r?\n|╔)/i,
								replace: '{{Info/Personagem fictícia$1',
								num: 1
							}, {
								name: 'Biografia',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]biografia *(\||\r?\n|╔)/i,
								replace: '{{Info/Biografia$1',
								num: 1
							}, {
								name: 'Bairro de Madrid',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Bairros de Madrid *(\||\r?\n|╔)/i,
								replace: '{{Info/Bairro de Madrid$1',
								num: 1
							}, {
								name: 'Banda',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]banda *(\||\r?\n|╔)/i,
								replace: '{{Info/Banda$1',
								num: 1
							}, {
								name: 'Banda desenhada',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]BandaDesenhada *(\||\r?\n|╔)/i,
								replace: '{{Info/Banda desenhada$1',
								num: 1
							}, {
								name: 'Barragem',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]barragem *(\||\r?\n|╔)/i,
								replace: '{{Info/Barragem$1',
								num: 1
							}, {
								name: 'Bebida',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Bebida *(\||\r?\n|╔)/i,
								replace: '{{Info/Bebida$1',
								num: 1
							}, {
								name: 'Biografia',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Biografia *(\||\r?\n|╔)/i,
								replace: '{{Info/Biografia$1',
								num: 1
							}, {
								name: 'blindado',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]blindado *(\||\r?\n|╔)/i,
								replace: '{{Info/Blindado$1',
								num: 1
							}, {
								name: 'Boi-Bumbá',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Boi\-Bumbá *(\||\r?\n|╔)/i,
								replace: '{{Info/Boi-Bumbá$1',
								num: 1
							}, {
								name: 'Brasão',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]brasão *(\||\r?\n|╔)/i,
								replace: '{{Info/Brasão$1',
								num: 1
							}, {
								name: 'Brinquedos',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]brinquedos *(\||\r?\n|╔)/i,
								replace: '{{Info/Brinquedos$1',
								num: 1
							}, {
								name: 'Bispado',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Bispado *(\||\r?\n|╔)/i,
								replace: '{{Info/Bispado$1',
								num: 1
							}]
						}, {
							name: 'Red Infobox c/ Info - C',
							find: '',
							replace: '',
							num: 1,
							ifhas: /\{\{Info(?:box|caixa)?[ _\-\/:]C/i,
							sub: [{
								name: 'Campeonato Mundial de Ginástica',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Campeonato Mundial de Ginástica *(\||\r?\n|╔)/i,
								replace: '{{Info/Evento ginástica$1',
								num: 1
							}, {
								name: 'Canção',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]canção *(\||\r?\n|╔)/i,
								replace: '{{Info/Canção$1',
								num: 1
							}, {
								name: 'Candidatura Jogos Olímpicos',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Candidatura JO *(\||\r?\n|╔)/i,
								replace: '{{Info/Candidatura Jogos Olímpicos$1',
								num: 1
							}, {
								name: 'Candidatura cidade dos Jogos Olímpicos',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Candidatura JO Cidade *(\||\r?\n|╔)/i,
								replace: '{{Info/Candidatura cidade dos Jogos Olímpicos$1',
								num: 1
							}, {
								name: 'Cantor',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]cantor *(\||\r?\n|╔)/i,
								replace: '{{Info/música/artista$1',
								num: 1
							}, {
								name: 'Casa de eventos',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]casa de eventos *(\||\r?\n|╔)/i,
								replace: '{{Info/Casa de eventos$1',
								num: 1
							}, {
								name: 'Carruagem',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Carruagem *(\||\r?\n|╔)/i,
								replace: '{{Info/Carruagem$1',
								num: 1
							}, {
								name: 'Cientista',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]cientista *(\||\r?\n|╔)/i,
								replace: '{{Info/Cientista$1',
								num: 1
							}, {
								name: 'Clube de futebol',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]clube de futebol *(\||\r?\n|╔)/i,
								replace: '{{Info/Clube de futebol$1',
								num: 1
							}, {
								name: 'Coleções da Recreio',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Coleções da Recreio *(\||\r?\n|╔)/i,
								replace: '{{Info/Coleções da Recreio$1',
								num: 1
							}, {
								name: 'Comitê Olímpico Nacional',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Comitê Olímpico Nacional *(\||\r?\n|╔)/i,
								replace: '{{Info/Comitê Olímpico Nacional$1',
								num: 1
							}, {
								name: 'companhia aérea',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]companhia aérea *(\||\r?\n|╔)/i,
								replace: '{{Info/Companhia aérea$1',
								num: 1
							}, {
								name: 'Companhia/Empresa',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Companhia\/Empresa *(\||\r?\n|╔)/i,
								replace: '{{Info/Empresa$1',
								num: 1
							}, {
								name: 'continente',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]continente *(\||\r?\n|╔)/i,
								replace: '{{Info/Território geográfico$1',
								num: 1
							}, {
								name: 'Corrida de F1',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Corrida F1 *(\||\r?\n|╔)/i,
								replace: '{{Info/Corrida de F1$1',
								num: 1
							}, {
								name: 'Corrida FSL',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Corrida FSL *(\||\r?\n|╔)/i,
								replace: '{{Info/Corrida FSL$1',
								num: 1
							}, {
								name: 'Corrida IRL',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Corrida IRL *(\||\r?\n|╔)/i,
								replace: '{{Info/Corrida IRL$1',
								num: 1
							}, {
								name: 'Criminoso',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]criminoso *(\||\r?\n|╔)/i,
								replace: '{{Info/Criminoso$1',
								num: 1
							}, {
								name: 'Canção',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]canção *(\||\r?\n|╔)/i,
								replace: '{{Info/Canção$1',
								num: 1
							}, {
								name: 'Características da Estrela',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Caracteríticas das Estrelas *(\||\r?\n|╔)/i,
								replace: '{{Info/Características da Estrela$1',
								num: 1
							}, {
								name: 'Castelo-br',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Castelo\-br *(\||\r?\n|╔)/i,
								replace: '{{Info/Fortificação-BR$1',
								num: 1
							}, {
								name: 'Cidade da Alemanha',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Cidades da Alemanha *(\||\r?\n|╔)/i,
								replace: '{{Info/Cidade da Alemanha$1',
								num: 1
							}, {
								name: 'Cidade da Grécia',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Cidades da Grécia *(\||\r?\n|╔)/i,
								replace: '{{Info/Cidade da Grécia$1',
								num: 1
							}, {
								name: 'Circuito da F1',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Circuito de F1 *(\||\r?\n|╔)/i,
								replace: '{{Info/Circuito da F1$1',
								num: 1
							}, {
								name: 'Condados da Escócia',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Condados da Escócia *(\||\r?\n|╔)/i,
								replace: '{{Info/Subdivisões da Escócia$1',
								num: 1
							}, {
								name: 'Condado da Inglaterra',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Condados da Inglaterra *(\||\r?\n|╔)/i,
								replace: '{{Info/Condado da Inglaterra$1',
								num: 1
							}, {
								name: 'Continente',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Continente *(\||\r?\n|╔)/i,
								replace: '{{Info/Território geográfico$1',
								num: 1
							}, {
								name: 'China-províncias',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]China\-províncias *(\||\r?\n|╔)/i,
								replace: '{{Info/Província da China$1',
								num: 1
							}, {
								name: 'Campeonato Mundial de Patinação Artística no Gelo',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Campeonato Mundial de Patinação Artística no Gelo *(\||\r?\n|╔)/i,
								replace: '{{Info/Campeonato Mundial de Patinação Artística no Gelo$1',
								num: 1
							}, {
								name: 'Canal de Televisão',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Canal de Televisão *(\||\r?\n|╔)/i,
								replace: '{{Info/Rede de televisão$1',
								num: 1
							}, {
								name: 'Casa de eventos',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]casa de eventos *(\||\r?\n|╔)/i,
								replace: '{{Info/Casa de eventos$1',
								num: 1
							}, {
								name: 'Cha',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Cha *(\||\r?\n|╔)/i,
								replace: '{{Info/Cha$1',
								num: 1
							}, {
								name: 'Cidade',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Cidade *(\||\r?\n|╔)/i,
								replace: '{{Info/Cidade$1',
								num: 1
							}, {
								name: 'Cidade da Argentina',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Cidade Argentina *(\||\r?\n|╔)/i,
								replace: '{{Info/Cidade da Argentina$1',
								num: 1
							}, {
								name: 'Cidade da Bahamas',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Cidade da Bahamas *(\||\r?\n|╔)/i,
								replace: '{{Info/Cidade da Bahamas$1',
								num: 1
							}, {
								name: 'Cidade de Israel 2',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Cidade Israelense *(\||\r?\n|╔)/i,
								replace: '{{Info/Cidade de Israel 2$1',
								num: 1
							}, {
								name: 'Cidade do Líbano',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Cidade Libanesa *(\||\r?\n|╔)/i,
								replace: '{{Info/Cidade do Líbano$1',
								num: 1
							}, {
								name: 'Cidade da Autoridade Palestina',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Cidade Sob Autoridade Palestina *(\||\r?\n|╔)/i,
								replace: '{{Info/Cidade da Autoridade Palestina$1',
								num: 1
							}, {
								name: 'Comediante',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Comediante *(\||\r?\n|╔)/i,
								replace: '{{Info/Comediante$1',
								num: 1
							}, {
								name: 'Company',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Company *(\||\r?\n|╔)/i,
								replace: '{{Info/Empresa-en$1',
								num: 1
							}, {
								name: 'Condado da Libéria',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Condado da Libéria *(\||\r?\n|╔)/i,
								replace: '{{Info/Condado da Libéria$1',
								num: 1
							}, {
								name: 'Country Olympics',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Country Olympics *(\||\r?\n|╔)/i,
								replace: '{{Info/Country Olympics$1',
								num: 1
							}, {
								name: 'Country Pan',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Country Pan *(\||\r?\n|╔)/i,
								replace: '{{Info/Country Pan$1',
								num: 1
							}, {
								name: 'Country Paralympics',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Country Paralympics *(\||\r?\n|╔)/i,
								replace: '{{Info/Country Paralympics$1',
								num: 1
							}, {
								name: 'Country Parapan',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Country Parapan *(\||\r?\n|╔)/i,
								replace: '{{Info/Country Parapan$1',
								num: 1
							}, {
								name: 'CVG',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]CVG *(\||\r?\n|╔)/i,
								replace: '{{Info/Jogo$1',
								num: 1
							}, {
								name: 'Cargo político',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Cargo Político *(\||\r?\n|╔)/i,
								replace: '{{Info/Cargo político$1',
								num: 1
							}, {
								name: 'Cantão da Suíça',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Cantão Suíço *(\||\r?\n|╔)/i,
								replace: '{{Info/Cantão da Suíça$1',
								num: 1
							}]
						}, {
							name: 'Red Infobox c/ Info - D',
							find: '',
							replace: '',
							num: 1,
							ifhas: /\{\{Info(?:box|caixa)?[ _\-\/:]D/i,
							sub: [{
								name: 'Discografia de artista',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]discografia de artista *(\||\r?\n|╔)/i,
								replace: '{{Info/Discografia de artista$1',
								num: 1
							}, {
								name: 'Departamento/Níger',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Departamento\/Níger *(\||\r?\n|╔)/i,
								replace: '{{Info/Departamento do Níger$1',
								num: 1
							}, {
								name: 'Divisão do Camboja',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Divisões do Camboja *(\||\r?\n|╔)/i,
								replace: '{{Info/Divisão do Camboja$1',
								num: 1
							}, {
								name: 'Distrito dos Países Baixos',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Distrito Países Baixos *(\||\r?\n|╔)/i,
								replace: '{{Info/Distrito dos Países Baixos$1',
								num: 1
							}, {
								name: 'Distrito de Florianópolis',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]distritos de Florianópolis *(\||\r?\n|╔)/i,
								replace: '{{Info/Distrito de Florianópolis$1',
								num: 1
							}, {
								name: 'Documento',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Documento *(\||\r?\n|╔)/i,
								replace: '{{Info/Documento$1',
								num: 1
							}, {
								name: 'Domínio de topo',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]domínio de topo *(\||\r?\n|╔)/i,
								replace: '{{Info/Domínio de topo$1',
								num: 1
							}, {
								name: 'Dramaturgo',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Dramaturgo *(\||\r?\n|╔)/i,
								replace: '{{Info/Dramaturgo$1',
								num: 1
							}]
						}, {
							name: 'Red Infobox c/ Info - E',
							find: '',
							replace: '',
							num: 1,
							ifhas: /\{\{Info(?:box|caixa)?[ _\-\/:][EÉ]/i,
							sub: [{
								name: 'Economia',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Economia *(\||\r?\n|╔)/i,
								replace: '{{Info/Economia$1',
								num: 1
							}, {
								name: 'Eleição Presidencial Brasileira',
								find: /\{\{Info(?:box|caixa)?[ _\-\/:]Eleição Presidencial Brasileira *(\||\r?\n|<!--)/i,
								replace: '{{Info/Eleição Presidencial Brasileira$1',
								num: 1
							}, {
								name: 'Empresa',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Empresa *(\||\r?\n|╔)/i,
								replace: '{{Info/Empresa$1',
								num: 1
							}, {
								name: 'Entidade',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Entidade *(\||\r?\n|╔)/i,
								replace: '{{Info/Entidade$1',
								num: 1
							}, {
								name: 'Episódio de série',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Episódio de Série *(\||\r?\n|╔)/i,
								replace: '{{Info/Episódio de série$1',
								num: 1
							}, {
								name: 'Escola',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Escola *(\||\r?\n|╔)/i,
								replace: '{{Info/Escola$1',
								num: 1
							}, {
								name: 'EscolasTecnicasBrasil',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]EscolasTecnicasBrasil *(\||\r?\n|╔)/i,
								replace: '{{Info/Escola técnica do Brasil$1',
								num: 1
							}, {
								name: 'Estação',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Estação *(\||\r?\n|╔)/i,
								replace: '{{Info/Estação$1',
								num: 1
							}, {
								name: 'Estado extinto',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]estado extinto *(\||\r?\n|╔)/i,
								replace: '{{Info/Estado extinto$1',
								num: 1
							}, {
								name: 'Estrutura alta',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Estrutura Alta *(\||\r?\n|╔)/i,
								replace: '{{Info/Estrutura alta$1',
								num: 1
							}, {
								name: 'Estúdio de quadrinhos',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Estúdio de Quadrinhos *(\||\r?\n|╔)/i,
								replace: '{{Info/Estúdio de quadrinhos$1',
								num: 1
							}, {
								name: 'Evento multiesportivo',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]evento multiesportivo *(\||\r?\n|╔)/i,
								replace: '{{Info/Evento multiesportivo$1',
								num: 1
							}, {
								name: 'Emissora de TV',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Emissora de TV *(\||\r?\n|╔)/i,
								replace: '{{Info/Rede de televisão$1',
								num: 1
							}, {
								name: 'Escola de samba',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]escola de samba *(\||\r?\n|╔)/i,
								replace: '{{Info/Escola de samba$1',
								num: 1
							}, {
								name: 'Escola do Ensino Médio',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Escola do Ensino Médio *(\||\r?\n|╔)/i,
								replace: '{{Info/Colégio do Brasil$1',
								num: 1
							}, {
								name: 'Estação Metro do Porto',
								find: /\{\{Info(?:box|caixa)?[ _\-\/:]Estação Metro do Porto *(\||\r?\n|<!--)/i,
								replace: '{{Info/Estação Metro do Porto$1',
								num: 1
							}, {
								name: 'Estação de metro',
								find: /\{\{Info(?:box|caixa)?[ _\-\/:]estação de metro *(\||\r?\n|<!--)/i,
								replace: '{{Info/Estação de metro$1',
								num: 1
							}, {
								name: 'Educação País',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Educação País *(\||\r?\n|╔)/i,
								replace: '{{Info/Educação País$1',
								num: 1
							}, {
								name: 'Emissora de televisão',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Emissora *(\||\r?\n|╔)/i,
								replace: '{{Info/Emissora de televisão$1',
								num: 1
							}, {
								name: 'Emissora de rádio',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Emissora de rádio *(\||\r?\n|╔)/i,
								replace: '{{Info/Emissora de rádio$1',
								num: 1
							}, {
								name: 'Emissora de televisão',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Emissora de televisão *(\||\r?\n|╔)/i,
								replace: '{{Info/Emissora de televisão$1',
								num: 1
							}, {
								name: 'Empresa',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]empresa *(\||\r?\n|╔)/i,
								replace: '{{Info/Empresa$1',
								num: 1
							}, {
								name: 'Empresas fictícias',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Empresas fictícias *(\||\r?\n|╔)/i,
								replace: '{{Info/Empresas fictícias$1',
								num: 1
							}, {
								name: 'Engenheiro',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Engenheiro *(\||\r?\n|╔)/i,
								replace: '{{Info/Engenheiro$1',
								num: 1
							}, {
								name: 'ESC entry',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]ESC entry *(\||\r?\n|╔)/i,
								replace: '{{Info/ESC entry$1',
								num: 1
							}, {
								name: 'Escala',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Escala *(\||\r?\n|╔)/i,
								replace: '{{Info/música/tonalidade$1',
								num: 1
							}, {
								name: 'Escola de samba',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]escola de samba *(\||\r?\n|╔)/i,
								replace: '{{Info/Escola de samba$1',
								num: 1
							}, {
								name: 'Estocolmo-distritos',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Estocolmo\-distritos *(\||\r?\n|╔)/i,
								replace: '{{Info/Distrito de Estocolmo$1',
								num: 1
							}, {
								name: 'Estúdio de quadrinhos',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Estúdio de Quadrinhos *(\||\r?\n|╔)/i,
								replace: '{{Info/Estúdio de quadrinhos$1',
								num: 1
							}, {
								name: 'Eurovisão',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Eurovisão *(\||\r?\n|╔)/i,
								replace: '{{Info/Eurovisão$1',
								num: 1
							}, {
								name: 'Eurovisão Principal',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Eurovisão Principal *(\||\r?\n|╔)/i,
								replace: '{{Info/Eurovisão Principal$1',
								num: 1
							}, {
								name: 'Evento de Wrestling',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Evento de Wrestling *(\||\r?\n|╔)/i,
								replace: '{{Info/Evento de Wrestling$1',
								num: 1
							}, {
								name: 'Evento histórico',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Evento histórico *(\||\r?\n|╔)/i,
								replace: '{{Info/Evento histórico$1',
								num: 1
							}, {
								name: 'Enxadrista',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]enxadrista *(\||\r?\n|╔)/i,
								replace: '{{Info/Enxadrista$1',
								num: 1
							}, {
								name: 'Evento',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]evento *(\||\r?\n|╔)/i,
								replace: '{{Info/Evento$1',
								num: 1
							}, {
								name: 'Equipe da NHL',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Equipe da NHL *(\||\r?\n|╔)/i,
								replace: '{{Info/Equipe da NHL$1',
								num: 1
							}]
						}, {
							name: 'Red Infobox c/ Info - F',
							find: '',
							replace: '',
							num: 1,
							ifhas: /\{\{Info(?:box|caixa)?[ _\-\/:]F/i,
							sub: [{
								name: 'faculdade',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]faculdade *(\||\r?\n|╔)/i,
								replace: '{{Info/faculdade$1',
								num: 1
							}, {
								name: 'Família linguística',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Família linguística *(\||\r?\n|╔)/i,
								replace: '{{Info/Família linguística$1',
								num: 1
							}, {
								name: 'Ferrovia',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Ferrovia *(\||\r?\n|╔)/i,
								replace: '{{Info/Ferrovia$1',
								num: 1
							}, {
								name: 'Festas',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Festas *(\||\r?\n|╔)/i,
								replace: '{{Info/Efeméride$1',
								num: 1
							}, {
								name: 'Filme',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Filme *(\||\r?\n|╔)/i,
								replace: '{{Info/Filme$1',
								num: 1
							}, {
								name: 'Furacão',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]furacão *(\||\r?\n|╔)/i,
								replace: '{{Info/Furacão$1',
								num: 1
							}, {
								name: 'Furacão pequeno',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]furacão pequeno *(\||\r?\n|╔)/i,
								replace: '{{Info/Furacão pequeno$1',
								num: 1
							}, {
								name: 'Filósofo',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Filósofos *(\||\r?\n|╔)/i,
								replace: '{{Info/Filósofo$1',
								num: 1
							}, {
								name: 'França/Região',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]França\/Região *(\||\r?\n|╔)/i,
								replace: '{{Info/Região da França$1',
								num: 1
							}, {
								name: 'faculdade',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Faculdade *(\||\r?\n|╔)/i,
								replace: '{{Info/faculdade$1',
								num: 1
							}, {
								name: 'Farol',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Farol *(\||\r?\n|╔)/i,
								replace: '{{Info/Farol$1',
								num: 1
							}, {
								name: 'Filme',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Filme *(\||\r?\n|╔)/i,
								replace: '{{Info/Filme$1',
								num: 1
							}, {
								name: 'Filósofo',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Filósofos *(\||\r?\n|╔)/i,
								replace: '{{Info/Filósofo$1',
								num: 1
							}, {
								name: 'Folclore',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Folclore *(\||\r?\n|╔)/i,
								replace: '{{Info/Folclore$1',
								num: 1
							}, {
								name: 'Forças Armadas',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Forças Armadas *(\||\r?\n|╔)/i,
								replace: '{{Info/Forças Armadas$1',
								num: 1
							}, {
								name: 'Franquia de mídia',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]franquia de mídia *(\||\r?\n|╔)/i,
								replace: '{{Info/Franquia de mídia$1',
								num: 1
							}]
						}, {
							name: 'Red Infobox c/ Info - G',
							find: '',
							replace: '',
							num: 1,
							ifhas: /\{\{Info(?:box|caixa)?[ _\-\/:]G/i,
							sub: [{
								name: 'ginasta',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]ginasta *(\||\r?\n|╔)/i,
								replace: '{{Info/esporte/atleta$1',
								num: 1
							}, {
								name: 'Governadorate da Síria',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Governadorate da Siria *(\||\r?\n|╔)/i,
								replace: '{{Info/Governadorate da Síria$1',
								num: 1
							}, {
								name: 'Gâmbia-divisões',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Gâmbia\-divisões *(\||\r?\n|╔)/i,
								replace: '{{Info/Divisão de Gâmbia$1',
								num: 1
							}, {
								name: 'Gâmbia-LGA',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Gâmbia\-LGA *(\||\r?\n|╔)/i,
								replace: '{{Info/Áreas de Governo Local da Gâmbia$1',
								num: 1
							}, {
								name: 'Governadorate da Síria',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Governadorato Siria *(\||\r?\n|╔)/i,
								replace: '{{Info/Governadorate da Síria$1',
								num: 1
							}, {
								name: 'Grupo étnico',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]grupo étnico *(\||\r?\n|╔)/i,
								replace: '{{Info/Grupo étnico$1',
								num: 1
							}, {
								name: 'Guerra',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]guerra *(\||\r?\n|╔)/i,
								replace: '{{Info/Guerra$1',
								num: 1
							}]
						}, {
							name: 'Red Infobox c/ Info - H',
							find: '',
							replace: '',
							num: 1,
							ifhas: /\{\{Info(?:box|caixa)?[ _\-\/:]H/i,
							sub: [{
								name: 'HK Distrito',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]HK Distrito *(\||\r?\n|╔)/i,
								replace: '{{Info/Distrito de Hong Kong$1',
								num: 1
							}]
						}, {
							name: 'Red Infobox c/ Info - I',
							find: '',
							replace: '',
							num: 1,
							ifhas: /\{\{Info(?:box|caixa)?[ _\-\/:]I/i,
							sub: [{
								name: 'Ilha',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Ilha *(\||\r?\n|╔)/i,
								replace: '{{Info/Ilha$1',
								num: 1
							}, {
								name: 'Instituição religiosa',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]instituição religiosa *(\||\r?\n|╔)/i,
								replace: '{{Info/Instituição religiosa$1',
								num: 1
							}, {
								name: 'Instituição religiosa',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]instituição religiosa *(\||\r?\n|╔)/i,
								replace: '{{Info/Instituição religiosa$1',
								num: 1
							}, {
								name: 'Itália/Região',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Itália\/Região *(\||\r?\n|╔)/i,
								replace: '{{Info/Região da Itália$1',
								num: 1
							}, {
								name: 'IFs',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]IFs *(\||\r?\n|╔)/i,
								replace: '{{Info/IFs$1',
								num: 1
							}, {
								name: 'Igreja',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]igreja *(\||\r?\n|╔)/i,
								replace: '{{Info/Igreja$1',
								num: 1
							}, {
								name: 'Ilha',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Ilha *(\||\r?\n|╔)/i,
								replace: '{{Info/Ilha$1',
								num: 1
							}, {
								name: 'Instrumento',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Instrumento *(\||\r?\n|╔)/i,
								replace: '{{Info/Instrumento$1',
								num: 1
							}, {
								name: 'Interstate',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Interstate *(\||\r?\n|╔)/i,
								replace: '{{Info/Interstate$1',
								num: 1
							}, {
								name: 'Itália/Província',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Itália\/Província *(\||\r?\n|╔)/i,
								replace: '{{Info/Província da Itália$1',
								num: 1
							}]
						}, {
							name: 'Red Infobox c/ Info - J',
							find: '',
							replace: '',
							num: 1,
							ifhas: /\{\{Info(?:box|caixa)?[ _\-\/:]J/i,
							sub: [{
								name: 'Jogo',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]jogo *(\||\r?\n|╔)/i,
								replace: '{{Info/Jogo$1',
								num: 1
							}, {
								name: 'Jogador de basquete',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]jogador de basquete *(\||\r?\n|╔)/i,
								replace: '{{Info/Jogador de basquete$1',
								num: 1
							}, {
								name: 'Jornal',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Jornal *(\||\r?\n|╔)/i,
								replace: '{{Info/Jornal$1',
								num: 1
							}]
						}, {
							name: 'Red Infobox c/ Info - L',
							find: '',
							replace: '',
							num: 1,
							ifhas: /\{\{Info(?:box|caixa)?[ _\-\/:]L/i,
							sub: [{
								name: 'Língua',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Língua *(\||\r?\n|╔)/i,
								replace: '{{Info/Língua$1',
								num: 1
							}, {
								name: 'Livro',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]livro *(\||\r?\n|╔)/i,
								replace: '{{Info/Livro$1',
								num: 1
							}, {
								name: 'Locomotiva',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Locomotiva *(\||\r?\n|╔)/i,
								replace: '{{Info/Locomotiva$1',
								num: 1
							}, {
								name: 'Linux',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Linux *(\||\r?\n|╔)/i,
								replace: '{{Info/distribuição de Linux$1',
								num: 1
							}, {
								name: 'Legislatura',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Legislatura *(\||\r?\n|╔)/i,
								replace: '{{Info/Legislatura$1',
								num: 1
							}, {
								name: 'Legislatura da Nigéria',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Legislatura da Nigéria *(\||\r?\n|╔)/i,
								replace: '{{Info/Legislatura da Nigéria$1',
								num: 1
							}, {
								name: 'Língua',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Língua *(\||\r?\n|╔)/i,
								replace: '{{Info/Língua$1',
								num: 1
							}, {
								name: 'Literato',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Literato *(\||\r?\n|╔)/i,
								replace: '{{Info/Literato$1',
								num: 1
							}]
						}, {
							name: 'Red Infobox c/ Info - M',
							find: '',
							replace: '',
							num: 1,
							ifhas: /\{\{Info(?:box|caixa)?[ _\-\/:]M/i,
							sub: [{
								name: 'medalhista',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]medalhista *(\||\r?\n|╔)/i,
								replace: '{{Info/esporte/atleta$1',
								num: 1
							}, {
								name: 'Modelo',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Modelo *(\||\r?\n|╔)/i,
								replace: '{{Info/Modelo$1',
								num: 1
							}, {
								name: 'Moeda',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]moeda *(\||\r?\n|╔)/i,
								replace: '{{Info/Moeda$1',
								num: 1
							}, {
								name: 'Motor de avião',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Motor de Avião *(\||\r?\n|╔)/i,
								replace: '{{Info/Motor de avião$1',
								num: 1
							}, {
								name: 'Museu',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]museus *(\||\r?\n|╔)/i,
								replace: '{{Info/Museu$1',
								num: 1
							}, {
								name: 'Música',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Música *(\||\r?\n|╔)/i,
								replace: '{{Info/Canção$1',
								num: 1
							}, {
								name: 'Mesorregião do Brasil',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Mesorregião do Brasil *(\||\r?\n|╔)/i,
								replace: '{{Info/Mesorregião$1',
								num: 1
							}, {
								name: 'Metro lisboa',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Metro lisboa *(\||\r?\n|╔)/i,
								replace: '{{Info/Metro Lisboa$1',
								num: 1
							}, {
								name: 'Microrregião do Brasil',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Microrregião do Brasil *(\||\r?\n|╔)/i,
								replace: '{{Info/Microrregião$1',
								num: 1
							}, {
								name: 'Militar',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]militar *(\||\r?\n|╔)/i,
								replace: '{{Info/Militar$1',
								num: 1
							}, {
								name: 'Motorista da F1',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Motorista de F1 *(\||\r?\n|╔)/i,
								replace: '{{Info/Motorista da F1$1',
								num: 1
							}, {
								name: 'Município ZA',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Município ZA *(\||\r?\n|╔)/i,
								replace: '{{Info/Município da África do Sul$1',
								num: 1
							}, {
								name: 'Madeira/sítio',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Madeira\/sítio *(\||\r?\n|╔)/i,
								replace: '{{Info/Localidade da Madeira$1',
								num: 1
							}, {
								name: 'Marcha Popular de Lisboa',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Marchas Populares de Lisboa *(\||\r?\n|╔)/i,
								replace: '{{Info/Marcha Popular de Lisboa$1',
								num: 1
							}, {
								name: 'Médico',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Médico *(\||\r?\n|╔)/i,
								replace: '{{Info/Médico$1',
								num: 1
							}, {
								name: 'Ministério',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Ministério *(\||\r?\n|╔)/i,
								replace: '{{Info/Ministério$1',
								num: 1
							}, {
								name: 'Monarca',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Monarca *(\||\r?\n|╔)/i,
								replace: '{{Info/Monarca$1',
								num: 1
							}, {
								name: 'Motocicleta',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Motocicleta *(\||\r?\n|╔)/i,
								replace: '{{Info/Motocicleta$1',
								num: 1
							}, {
								name: 'Museu',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Museu *(\||\r?\n|╔)/i,
								replace: '{{Info/Museu$1',
								num: 1
							}, {
								name: 'Música ESC',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Música ESC *(\||\r?\n|╔)/i,
								replace: '{{Info/Música ESC$1',
								num: 1
							}, {
								name: 'musical artist',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]musical artist *(\||\r?\n|╔)/i,
								replace: '{{Info/música/artista$1',
								num: 1
							}, {
								name: 'Município das Canárias',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Município das Canárias *(\||\r?\n|╔)/i,
								replace: '{{Info/Município das Canárias$1',
								num: 1
							}]
						}, {
							name: 'Red Infobox c/ Info - N',
							find: '',
							replace: '',
							num: 1,
							ifhas: /\{\{Info(?:box|caixa)?[ _\-\/:]N/i,
							sub: [{
								name: 'Nadador',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]nadador *(\||\r?\n|╔)/i,
								replace: '{{Info/Nadador$1',
								num: 1
							}, {
								name: 'Nárnia',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Nárnia *(\||\r?\n|╔)/i,
								replace: '{{Info/Nárnia$1',
								num: 1
							}, {
								name: 'navio',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]navio *(\||\r?\n|╔)/i,
								replace: '{{Info/navio$1',
								num: 1
							}, {
								name: 'Número',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Número *(\||\r?\n|╔)/i,
								replace: '{{Info/Número$1',
								num: 1
							}, {
								name: 'Nepal-regiões',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Nepal\-regiões *(\||\r?\n|╔)/i,
								replace: '{{Info/Região do Nepal$1',
								num: 1
							}, {
								name: 'Nepal-zonas',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Nepal\-zonas *(\||\r?\n|╔)/i,
								replace: '{{Info/Zonas do Nepal$1',
								num: 1
							}, {
								name: 'Nome',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Nome *(\||\r?\n|╔)/i,
								replace: '{{Info/Nome$1',
								num: 1
							}]
						}, {
							name: 'Red Infobox c/ Info - O',
							find: '',
							replace: '',
							num: 1,
							ifhas: /\{\{Info(?:box|caixa)?[ _\-\/:][OÓ]/i,
							sub: [{
								name: 'ONU',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]ONU *(\||\r?\n|╔)/i,
								replace: '{{Info/ONU$1',
								num: 1
							}, {
								name: 'Organização criminosa',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]organização criminosa *(\||\r?\n|╔)/i,
								replace: '{{Info/Organização criminosa$1',
								num: 1
							}, {
								name: 'Obelisco',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Obelisco *(\||\r?\n|╔)/i,
								replace: '{{Info/Obelisco$1',
								num: 1
							}, {
								name: 'Olympic Atletas Olímpicos Individuais',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Olympic Atletas Olímpicos Individuais *(\||\r?\n|╔)/i,
								replace: '{{Info/Olympic Atletas Olímpicos Individuais$1',
								num: 1
							}, {
								name: 'Olympic Atletas Olímpicos Individuais',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Olympic IOA *(\||\r?\n|╔)/i,
								replace: '{{Info/Olympic Atletas Olímpicos Individuais$1',
								num: 1
							}, {
								name: 'Olympics Afeganistão',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Olympics Afeganistão *(\||\r?\n|╔)/i,
								replace: '{{Info/Olympics Afeganistão$1',
								num: 1
							}, {
								name: 'Olympics Arábia Saudita',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Olympics Arábia Saudita *(\||\r?\n|╔)/i,
								replace: '{{Info/Olympics Arábia Saudita$1',
								num: 1
							}, {
								name: 'Olympics Bahrein',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Olympics Bahrein *(\||\r?\n|╔)/i,
								replace: '{{Info/Olympics Bahrein$1',
								num: 1
							}, {
								name: 'Olympics Bangladesh',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Olympics Bangladesh *(\||\r?\n|╔)/i,
								replace: '{{Info/Olympics Bangladesh$1',
								num: 1
							}, {
								name: 'Olympics Birmânia',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Olympics Birmânia *(\||\r?\n|╔)/i,
								replace: '{{Info/Olympics Birmânia$1',
								num: 1
							}, {
								name: 'Olympics Bornéu do Norte',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Olympics Bornéu do Norte *(\||\r?\n|╔)/i,
								replace: '{{Info/Olympics Bornéu do Norte$1',
								num: 1
							}, {
								name: 'Olympics Brunei',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Olympics Brunei *(\||\r?\n|╔)/i,
								replace: '{{Info/Olympics Brunei$1',
								num: 1
							}, {
								name: 'Olympics Laos',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Olympics Laos *(\||\r?\n|╔)/i,
								replace: '{{Info/Olympics Laos$1',
								num: 1
							}, {
								name: 'Organização militante',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]organização militante *(\||\r?\n|╔)/i,
								replace: '{{Info/Organização militante$1',
								num: 1
							}, {
								name: 'Órgão legislativo',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]órgão legislativo *(\||\r?\n|╔)/i,
								replace: '{{Info/Órgão legislativo$1',
								num: 1
							}]
						}, {
							name: 'Red Infobox c/ Info - P',
							find: '',
							replace: '',
							num: 1,
							ifhas: /\{\{Info(?:box|caixa)?[ _\-\/:]P/i,
							sub: [{
								name: 'País',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]País *(\||\r?\n|╔)/i,
								replace: '{{Info/País$1',
								num: 1
							}, {
								name: 'Personagem',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Personagem *(\||\r?\n|╔)/i,
								replace: '{{Info/Personagem fictícia$1',
								num: 1
							}, {
								name: 'Personagem (Ficção)',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Personagem \(Ficção\) *(\||\r?\n|╔)/i,
								replace: '{{Info/Personagem fictícia$1',
								num: 1
							}, {
								name: 'Planetóide',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Planetóide *(\||\r?\n|╔)/i,
								replace: '{{Info/Planetóide$1',
								num: 1
							}, {
								name: 'Ponte',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Ponte *(\||\r?\n|╔)/i,
								replace: '{{Info/Ponte$1',
								num: 1
							}, {
								name: 'Prédio',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Prédio *(\||\r?\n|╔)/i,
								replace: '{{Info/Estrutura alta$1',
								num: 1
							}, {
								name: 'Presidente',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Presidente *(\||\r?\n|╔)/i,
								replace: '{{Info/Presidente$1',
								num: 1
							}, {
								name: 'Paróquia',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Paróquia da Jamaica *(\||\r?\n|╔)/i,
								replace: '{{Info/Paróquia$1',
								num: 1
							}, {
								name: 'Paróquia',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Paróquia de Andorra *(\||\r?\n|╔)/i,
								replace: '{{Info/Paróquia$1',
								num: 1
							}, {
								name: 'Paróquia',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Paróquia de Antígua e Barbuda *(\||\r?\n|╔)/i,
								replace: '{{Info/Paróquia$1',
								num: 1
							}, {
								name: 'Paróquia',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Paróquia de Barbados *(\||\r?\n|╔)/i,
								replace: '{{Info/Paróquia$1',
								num: 1
							}, {
								name: 'Paróquia',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Paróquia de Dominica *(\||\r?\n|╔)/i,
								replace: '{{Info/Paróquia$1',
								num: 1
							}, {
								name: 'Paróquia',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Paróquia de Granada *(\||\r?\n|╔)/i,
								replace: '{{Info/Paróquia$1',
								num: 1
							}, {
								name: 'Paróquia',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Paróquia de São Cristóvão e Névis *(\||\r?\n|╔)/i,
								replace: '{{Info/Paróquia$1',
								num: 1
							}, {
								name: 'Paróquia',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Paróquia de São Vicente e Granadinas *(\||\r?\n|╔)/i,
								replace: '{{Info/Paróquia$1',
								num: 1
							}, {
								name: 'Personagem fictícia',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Personagem de ficção *(\||\r?\n|╔)/i,
								replace: '{{Info/Personagem fictícia$1',
								num: 1
							}, {
								name: 'Personagem fictícia',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Personagem de TV *(\||\r?\n|╔)/i,
								replace: '{{Info/Personagem fictícia$1',
								num: 1
							}, {
								name: 'Personagem de Winnie-the-Pooh',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Personagem de Winnie\-the\-Pooh *(\||\r?\n|╔)/i,
								replace: '{{Info/Personagem de Ursinho Puff$1',
								num: 1
							}, {
								name: 'Órgão legislativo',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Parlamento *(\||\r?\n|╔)/i,
								replace: '{{Info/Órgão legislativo$1',
								num: 1
							}, {
								name: 'Participação anual no ESC',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Participação Anual n[ao] ESC *(\||\r?\n|╔)/i,
								replace: '{{Info/Participação anual no ESC$1',
								num: 1
							}, {
								name: 'Partido político',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Partido político *(\||\r?\n|╔)/i,
								replace: '{{Info/Partido político$1',
								num: 1
							}, {
								name: 'Patinador',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]patinador *(\||\r?\n|╔)/i,
								replace: '{{Info/Patinador$1',
								num: 1
							}, {
								name: 'Personagem fictícia',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Personagem *(\||\r?\n|╔)/i,
								replace: '{{Info/Personagem fictícia$1',
								num: 1
							}, {
								name: 'Personagem animangá',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]personagem animangá *(\||\r?\n|╔)/i,
								replace: '{{Info/Personagem animangá$1',
								num: 1
							}, {
								name: 'Personagem fictícia',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Personagem de desenho animado *(\||\r?\n|╔)/i,
								replace: '{{Info/Personagem fictícia$1',
								num: 1
							}, {
								name: 'Personagem fictícia',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]personagemtv *(\||\r?\n|╔)/i,
								replace: '{{Info/Personagem fictícia$1',
								num: 1
							}, {
								name: 'Pretendente',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Pretendente *(\||\r?\n|╔)/i,
								replace: '{{Info/Pretendente$1',
								num: 1
							}, {
								name: 'Papado',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]papado *(\||\r?\n|╔)/i,
								replace: '{{Info/Papado$1',
								num: 1
							}, {
								name: 'Partido Político da Nigéria',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Partido político da Nigéria *(\||\r?\n|╔)/i,
								replace: '{{Info/Partido Político da Nigéria$1',
								num: 1
							}]
						}, {
							name: 'Red Infobox c/ Info - Q',
							find: '',
							replace: '',
							num: 1,
							ifhas: /\{\{Info(?:box|caixa)?[ _\-\/:]Q/i,
							sub: [{
								name: 'Queijo',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Queijo *(\||\r?\n|╔)/i,
								replace: '{{Info/Queijo$1',
								num: 1
							}]
						}, {
							name: 'Red Infobox c/ Info - R',
							find: '',
							replace: '',
							num: 1,
							ifhas: /\{\{Info(?:box|caixa)?[ _\-\/:]R/i,
							sub: [{
								name: 'raça de gato',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]raça de gato *(\||\r?\n|╔)/,
								replace: '{{Info/Raça de gato$1',
								num: 1
							}, {
								name: 'Região',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Região *(\||\r?\n|╔)/i,
								replace: '{{Info/Território geográfico$1',
								num: 1
							}, {
								name: 'Região da Bahia',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Região da Bahia *(\||\r?\n|╔)/i,
								replace: '{{Info/Bairro de BH$1',
								num: 1
							}, {
								name: 'Região da República do Congo',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Região da República do Congo *(\||\r?\n|╔)/i,
								replace: '{{Info/Departamento da República do Congo$1',
								num: 1
							}, {
								name: 'Rio',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]rio *(\||\r?\n|╔)/i,
								replace: '{{Info/Rio$1',
								num: 1
							}, {
								name: 'Raça de cão',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Raça de Cão *(\||\r?\n|╔)/i,
								replace: '{{Info/Raça de cão$1',
								num: 1
							}, {
								name: 'Rede de rádio',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Rede de rádio *(\||\r?\n|╔)/i,
								replace: '{{Info/Rede de rádio$1',
								num: 1
							}, {
								name: 'Rede de televisão',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Rede de televisão(?: extinta)? *(\||\r?\n|╔)/i,
								replace: '{{Info/Rede de televisão$1',
								num: 1
							}, {
								name: 'Rede de rádio',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Redes de rádio *(\||\r?\n|╔)/i,
								replace: '{{Info/Rede de rádio$1',
								num: 1
							}, {
								name: 'Revista',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Revista *(\||\r?\n|╔)/i,
								replace: '{{Info/Revista$1',
								num: 1
							}, {
								name: 'Revolucionário',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]revolucionário *(\||\r?\n|╔)/i,
								replace: '{{Info/Revolucionário$1',
								num: 1
							}, {
								name: 'Rodovia Brasil',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Rodovia Brasil *(\||\r?\n|╔)/i,
								replace: '{{Info/Rodovia Brasil$1',
								num: 1
							}]
						}, {
							name: 'Red Infobox c/ Info - S',
							find: '',
							replace: '',
							num: 1,
							ifhas: /\{\{Info(?:box|caixa)?[ _\-\/:]S/i,
							sub: [{
								name: 'Selo',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]selo *(\||\r?\n|╔)/i,
								replace: '{{Info/Selo$1',
								num: 1
							}, {
								name: 'Série de videogame',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]série de videogame *(\||\r?\n|╔)/i,
								replace: '{{Info/Série de videogame$1',
								num: 1
							}, {
								name: 'Série literária',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]série literária *(\||\r?\n|╔)/i,
								replace: '{{Info/Série literária$1',
								num: 1
							}, {
								name: 'Single',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Single *(\||\r?\n|╔)/i,
								replace: '{{Info/Single$1',
								num: 1
							}, {
								name: 'Selec?ção',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Selec?ção *(\||\r?\n|╔)/i,
								replace: '{{Info/futebol/selecção$1',
								num: 1
							}, {
								name: 'Sítio',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Sitio *(\||\r?\n|╔)/i,
								replace: '{{Info/Sítio$1',
								num: 1
							}, {
								name: 'SM RS/distritos',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]SM RS\/distritos *(\||\r?\n|╔)/i,
								replace: '{{Info/Distritos de Santa Maria$1',
								num: 1
							}, {
								name: 'Sp/distritos',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Sp\/distritos *(\||\r?\n|╔)/i,
								replace: '{{Info/Distrito de São Paulo$1',
								num: 1
							}, {
								name: 'Santos',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Santos *(\||\r?\n|╔)/i,
								replace: '{{Info/Santos$1',
								num: 1
							}, {
								name: 'serie de TV',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]serie de TV *(\||\r?\n|╔)/i,
								replace: '{{Info/Série de televisão$1',
								num: 1
							}, {
								name: 'Shopping',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]shopping *(\||\r?\n|╔)/i,
								replace: '{{Info/Shopping$1',
								num: 1
							}, {
								name: 'Single',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Single *(\||\r?\n|╔)/i,
								replace: '{{Info/Single$1',
								num: 1
							}, {
								name: 'Sítio do Patrimônio Mundial',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Sítio do Patrimônio Mundial *(\||\r?\n|╔)/i,
								replace: '{{Info/Sítio do Patrimônio Mundial$1',
								num: 1
							}, {
								name: 'Software',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Software *(\||\r?\n|╔)/i,
								replace: '{{Info/Software$1',
								num: 1
							}, {
								name: 'Sp/bairros',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Sp\/bairros *(\||\r?\n|╔)/i,
								replace: '{{Info/Bairro de São Paulo$1',
								num: 1
							}, {
								name: 'Sudão-Estados',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Sudão\-Estados *(\||\r?\n|╔)/i,
								replace: '{{Info/Estado do Sudão$1',
								num: 1
							}, {
								name: 'Sura',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Sura *(\||\r?\n|╔)/i,
								replace: '{{Info/Sura$1',
								num: 1
							}, {
								name: 'Survivor',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Survivor *(\||\r?\n|╔)/i,
								replace: '{{Info/Survivor$1',
								num: 1
							}]
						}, {
							name: 'Red Infobox c/ Info - T',
							find: '',
							replace: '',
							num: 1,
							ifhas: /\{\{Info(?:box|caixa)?[ _\-\/:]T/i,
							sub: [{
								name: 'Táxi',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Táxi *(\||\r?\n|╔)/i,
								replace: '{{Info/Táxi$1',
								num: 1
							}, {
								name: 'Televisão',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Televisão *(\||\r?\n|╔)/i,
								replace: '{{Info/Televisão$1',
								num: 1
							}, {
								name: 'Tradução da Bíblia',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Tradução da Bíblia *(\||\r?\n|╔)/i,
								replace: '{{Info/Tradução da Bíblia$1',
								num: 1
							}, {
								name: 'Templo',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Templo *(\||\r?\n|╔)/i,
								replace: '{{Info/TemploSUD$1',
								num: 1
							}, {
								name: 'Tonalidade',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Tonalidade *(\||\r?\n|╔)/i,
								replace: '{{Info/música/tonalidade$1',
								num: 1
							}, {
								name: 'Treinador',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]treinador *(\||\r?\n|╔)/i,
								replace: '{{Info/Treinador$1',
								num: 1
							}, {
								name: 'Televisão',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Televis(?:ão|ion) *(\||\r?\n|╔)/i,
								replace: '{{Info/Televisão$1',
								num: 1
							}, {
								name: 'Television episode',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Television episode *(\||\r?\n|╔)/i,
								replace: '{{Info/Episódio de série$1',
								num: 1
							}, {
								name: 'temporada futebol',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]temporada futebol *(\||\r?\n|╔)/i,
								replace: '{{Info/futebol/temporada$1',
								num: 1
							}, {
								name: 'temporada NFL',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]temporada NFL *(\||\r?\n|╔)/i,
								replace: '{{Info/Temporada NFL',
								num: 1
							}, {
								name: 'Transporte público',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Transportes Públicos *(\||\r?\n|╔)/i,
								replace: '{{Info/Transporte público$1',
								num: 1
							}, {
								name: 'Turnê',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]turnê *(\||\r?\n|╔)/i,
								replace: '{{Info/Turnê$1',
								num: 1
							}]
						}, {
							name: 'Red Infobox c/ Info - U',
							find: '',
							replace: '',
							num: 1,
							ifhas: /\{\{Info(?:box|caixa)?[ _\-\/:][UÚ]/i,
							sub: [{
								name: 'universidade',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]universidade *(\||\r?\n|╔)/i,
								replace: '{{Info/universidade$1',
								num: 1
							}, {
								name: 'Uva',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]uva *(\||\r?\n|╔)/i,
								replace: '{{Info/Uva$1',
								num: 1
							}, {
								name: 'UN',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]UN *(\||\r?\n|╔)/i,
								replace: '{{Info/ONU$1',
								num: 1
							}, {
								name: 'universidade',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]University *(\||\r?\n|╔)/i,
								replace: '{{Info/universidade$1',
								num: 1
							}, {
								name: 'U.S. Route',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]U\.S\. Route *(\||\r?\n|╔)/i,
								replace: '{{Info/U.S. Route$1',
								num: 1
							}]
						}, {
							name: 'Red Infobox c/ Info - V',
							find: '',
							replace: '',
							num: 1,
							ifhas: /\{\{Info(?:box|caixa)?[ _\-\/:]V/i,
							sub: [{
								name: 'Vilões',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Vilões *(\||\r?\n|╔)/i,
								replace: '{{Info/Personagem fictícia$1',
								num: 1
							}, {
								name: 'VG serviço online',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]VG serviço online *(\||\r?\n|╔)/i,
								replace: '{{Info/VG serviço online$1',
								num: 1
							}]
						}, {
							name: 'Red Infobox c/ Info - W',
							find: '',
							replace: '',
							num: 1,
							ifhas: /\{\{Info(?:box|caixa)?[ _\-\/:]W/i,
							sub: [{
								name: 'Webcomic',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]webcomic *(\||\r?\n|╔)/i,
								replace: '{{Info/Webcomic$1',
								num: 1
							}, {
								name: 'Wikipedista',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]wikipédia\/wikipedistas *(\||\r?\n|╔)/i,
								replace: '{{Info/Wikipedista$1',
								num: 1
							}, {
								name: 'Webcomic',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]webcomic *(\||\r?\n|╔)/i,
								replace: '{{Info/Webcomic$1',
								num: 1
							}, {
								name: 'Wrestler',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Wrestler *(\||\r?\n|╔)/i,
								replace: '{{Info/Wrestler$1',
								num: 1
							}, {
								name: 'Wrestling event',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Wrestling event *(\||\r?\n|╔)/i,
								replace: '{{Info/Evento de Wrestling$1',
								num: 1
							}]
						}]
					}, {
						name: 'Red Infobox s/ Info',
						find: '',
						replace: '',
						num: 1,
						sub: [{
							name: 'Red Infobox s/ Info - A',
							find: '',
							replace: '',
							num: 1,
							ifhas: /\{\{[AÁ]/i,
							sub: [{
								name: '{{Alemanha/cidades}}',
								find: /\{\{Alemanha\/cidades *(\||\r?\n|╔)/i,
								replace: '{{Info/Cidade da Alemanha$1',
								num: 1
							}, {
								name: '{{Arqueiro}}',
								find: /\{\{Arqueiro *(\||\r?\n|╔)/i,
								replace: '{{Info/Arqueiro$1',
								num: 1
							}, {
								name: '{{Arquidiocese}}',
								find: /\{\{Arquidiocese *(\||\r?\n|╔)/i,
								replace: '{{Info/Arquidiocese$1',
								num: 1
							}, {
								name: '{{Áustria/cidades}}',
								find: /\{\{Áustria\/cidades *(\||\r?\n|╔)/i,
								replace: '{{Info/Cidade da Áustria$1',
								num: 1
							}, {
								name: '{{Auto-estrada}}',
								find: /\{\{Auto\-estrada *(\||\r?\n|╔)/i,
								replace: '{{Info/Auto-estrada$1',
								num: 1
							}, {
								name: '{{Auto-estradas de Portugal}}',
								find: /\{\{Auto\-estradas de Portugal *(\||\r?\n|╔)/i,
								replace: '{{Info/Auto-estrada de Portugal$1',
								num: 1
							}, {
								name: '{{Avatar: A Lenda de Aang}}',
								find: /\{\{Avatar: A Lenda de Aang *(\||\r?\n|╔)/i,
								replace: '{{Info/Avatar: A Lenda de Aang$1',
								num: 1
							}]
						}, {
							name: 'Red Infobox s/ Info - B',
							find: '',
							replace: '',
							num: 1,
							ifhas: /\{\{B/i,
							sub: [{
								name: '{{Bispo da Igreja Católica}}',
								find: /\{\{Bispo da Igreja Católica *(\||\r?\n|╔)/i,
								replace: '{{Info/Bispo da Igreja Católica$1',
								num: 1
							}, {
								name: '{{Boxeador}}',
								find: /\{\{Boxeador *(\||\r?\n|╔)/i,
								replace: '{{Info/Boxeador$1',
								num: 1
							}, {
								name: '{{Boxpapa}}',
								find: /\{\{Boxpapa *(\||\r?\n|╔)/i,
								replace: '{{Info/Papa$1',
								num: 1
							}]
						}, {
							name: 'Red Infobox s/ Info - C',
							find: '',
							replace: '',
							num: 1,
							ifhas: /\{\{C/i,
							sub: [{
								name: '{{Campeonato de Futebol}}',
								find: /\{\{Campeonato de Futebol *(\||\r?\n|<!--)/i,
								replace: '{{Info/Campeonato de futebol$1',
								num: 1
							}, {
								name: '{{Cantata}}',
								find: /\{\{Cantata *(\||\r?\n|<!--)/i,
								replace: '{{Info/Cantata$1',
								num: 1
							}, {
								name: '{{Cavalo}}',
								find: /\{\{Cavalo *(\||\r?\n|<!--)/i,
								replace: '{{Info/Cavalo$1',
								num: 1
							}, {
								name: '{{Celebridades da Internet}}',
								find: /\{\{Celebridades da Internet *(\||\r?\n|<!--)/i,
								replace: '{{Info/Celebridades da Internet$1',
								num: 1
							}, {
								name: '{{Chefes da Casa Imperial do Brasil}}',
								find: /\{\{Chefes da Casa Imperial do Brasil *(\||\r?\n|<!--)/i,
								replace: '{{Info/Chefes da Casa Imperial do Brasil$1',
								num: 1
							}, {
								name: '{{Chembox new}}',
								find: /\{\{Chembox new *(\||\r?\n|<!--)/i,
								replace: '{{Info/Química$1',
								num: 1
							}, {
								name: '{{Cidade das Ilhas Faroés}}',
								find: /\{\{Cidade das Ilhas Faroés *(\||\r?\n|<!--)/i,
								replace: '{{Info/Cidade das Ilhas Faroés$1',
								num: 1
							}, {
								name: '{{CidadesIsraelitas}}',
								find: /\{\{CidadesIsraelitas *(\||\r?\n|<!--)/i,
								replace: '{{Info/Cidade de Israel$1',
								num: 1
							}, {
								name: '{{CidadesMarroquinas}}',
								find: /\{\{CidadesMarroquinas *(\||\r?\n|<!--)/i,
								replace: '{{Info/Cidade de Marrocos$1',
								num: 1
							}, {
								name: '{{Cinema/Ficha Técnica}}',
								find: /\{\{Cinema\/Ficha Técnica *(\||\r?\n|<!--)/i,
								replace: '{{Info/Filme$1',
								num: 1
							}, {
								name: '{{Cinema/Ficha Técnica Ampliada}}',
								find: /\{\{Cinema\/Ficha Técnica Ampliada *(\||\r?\n|<!--)/i,
								replace: '{{Info/Filme$1',
								num: 1
							}, {
								name: '{{Classe de navio}}',
								find: /\{\{Classe de navio *(\||\r?\n|<!--)/i,
								replace: '{{Info/Classe de navio$1',
								num: 1
							}, {
								name: '{{Concurso de beleza}}',
								find: /\{\{Concurso de beleza *(\||\r?\n|<!--)/i,
								replace: '{{Info/Concurso de beleza$1',
								num: 1
							}, {
								name: '{{Condecorações}}',
								find: /\{\{Condecorações *(\||\r?\n|<!--)/i,
								replace: '{{Info/Condecorações$1',
								num: 1
							}, {
								name: '{{Comuna Francesa}}',
								find: /\{\{Comuna Francesa *(\||\r?\n|<!--)/i,
								replace: '{{Info/Comuna da França$1',
								num: 1
							}, {
								name: '{{Console}}',
								find: /\{\{Console *(\||\r?\n|<!--)/i,
								replace: '{{Info/Console$1',
								num: 1
							}, {
								name: '{{CVG personagem}}',
								find: /\{\{CVG personagem *(\||\r?\n|<!--)/i,
								replace: '{{Info/Personagem de CVG$1',
								num: 1
							}, {
								name: '{{CVG system}}',
								find: /\{\{CVG system *(\||\r?\n|<!--)/i,
								replace: '{{Info/Console$1',
								num: 1
							}]
						}, {
							name: 'Red Infobox s/ Info - D',
							find: '',
							replace: '',
							num: 1,
							ifhas: /\{\{D/i,
							sub: [{
								name: '{{Dados Bairros Brasil}}',
								find: /\{\{Dados Bairros Brasil *(\||\r?\n|╔)/i,
								replace: '{{Info/Bairro do Brasil$1',
								num: 1
							}, {
								name: '{{DadosBairroBH}}',
								find: /\{\{DadosBairroBH *(\||\r?\n|╔)/i,
								replace: '{{Info/Bairro do Brasil 2$1',
								num: 1
							}, {
								name: '{{DadosBairrosCanoas}}',
								find: /\{\{DadosBairrosCanoas *(\||\r?\n|╔)/i,
								replace: '{{Info/Bairro do Brasil 2$1',
								num: 1
							}, {
								name: '{{DadosBatalha}}',
								find: /\{\{DadosBatalha *(\||\r?\n|╔)/i,
								replace: '{{Info/Batalha$1',
								num: 1
							}, {
								name: '{{DadosBatalha (3 lados)}}',
								find: /\{\{DadosBatalha (3 lados) *(\||\r?\n|╔)/i,
								replace: '{{Info/Batalha 3$1',
								num: 1
							}, {
								name: '{{DadosBatalha(3Lados)}}',
								find: /\{\{DadosBatalha(3Lados) *(\||\r?\n|╔)/i,
								replace: '{{Info/Batalha (3 Lados)$1',
								num: 1
							}, {
								name: '{{DadosClubeFutebol}}',
								find: /\{\{DadosClubeFutebol *(\||\r?\n|╔)/i,
								replace: '{{Info/Clube de futebol$1',
								num: 1
							}, {
								name: '{{DadosClubeFutebol/imagem}}',
								find: /\{\{DadosClubeFutebol\/imagem *(\||\r?\n|╔)/i,
								replace: '{{Info/Clube de futebol/imagem$1',
								num: 1
							}, {
								name: '{{DadosClubeFutebol/padrão}}',
								find: /\{\{DadosClubeFutebol\/padrão *(\||\r?\n|╔)/i,
								replace: '{{Info/Clube de futebol/padrão$1',
								num: 1
							}, {
								name: '{{DadosColegiosBrasil}}',
								find: /\{\{DadosColegiosBrasil *(\||\r?\n|╔)/i,
								replace: '{{Info/Colégio do Brasil$1',
								num: 1
							}, {
								name: '{{DadosColegiosMilitaresBrasil}}',
								find: /\{\{DadosColegiosMilitaresBrasil *(\||\r?\n|╔)/i,
								replace: '{{Info/Colégio militar do Brasil$1',
								num: 1
							}, {
								name: '{{DadosColégiosTécnicosBrasil}}',
								find: /\{\{DadosColégiosTécnicosBrasil *(\||\r?\n|╔)/i,
								replace: '{{Info/Colégio Técnico do Brasil$1',
								num: 1
							}, {
								name: '{{DadosComandosMilitaresBrasil}}',
								find: /\{\{DadosComandosMilitaresBrasil *(\||\r?\n|╔)/i,
								replace: '{{Info/Comando militar do Brasil$1',
								num: 1
							}, {
								name: '{{DadosDeputadoPortugal}}',
								find: /\{\{DadosDeputadoPortugal *(\||\r?\n|╔)/i,
								replace: '{{Info/Deputado de Portugal$1',
								num: 1
							}, {
								name: '{{DadosDiretoriaEB}}',
								find: /\{\{DadosDiretoriaEB *(\||\r?\n|╔)/i,
								replace: '{{Info/Diretoria do Exército Brasileiro$1',
								num: 1
							}, {
								name: '{{DadosDistritoBrasil}}',
								find: /\{\{DadosDistritoBrasil *(\||\r?\n|╔)/i,
								replace: '{{Info/Distrito do Brasil$1',
								num: 1
							}, {
								name: '{{DadosDivisãoExércitoEB}}',
								find: /\{\{DadosDivisãoExércitoEB *(\||\r?\n|╔)/i,
								replace: '{{Info/Divisão do Exército Brasileiro$1',
								num: 1
							}, {
								name: '{{DadosEntidadesEstudantis}}',
								find: /\{\{DadosEntidadesEstudantis *(\||\r?\n|╔)/i,
								replace: '{{Info/Entidade estudantil$1',
								num: 1
							}, {
								name: '{{Dados de crateras de mercúrio}}',
								find: /\{\{Dados de crateras de mercúrio *(\||\r?\n|╔)/i,
								replace: '{{Info/Cratera de Mercúrio$1',
								num: 1
							}, {
								name: '{{DadosEnsinoMedio}}',
								find: /\{\{DadosEnsinoMedio *(\||\r?\n|╔)/i,
								replace: '{{Info/Colégio do Brasil$1',
								num: 1
							}, {
								name: '{{DadosEstadoBrasil2}}',
								find: /\{\{DadosEstadoBrasil2 *(\||\r?\n|╔)/i,
								replace: '{{Info/Estado do Brasil$1',
								num: 1
							}, {
								name: '{{DadosJogo}}',
								find: /\{\{DadosJogo *(\||\r?\n|╔)/i,
								replace: '{{Info/Jogo$1',
								num: 1
							}, {
								name: '{{DadosMesorregiãoBrasil}}',
								find: /\{\{DadosMesorregiãoBrasil *(\||\r?\n|╔)/i,
								replace: '{{Info/Mesorregião$1',
								num: 1
							}, {
								name: '{{DadosMicrorregiãoBrasil}}',
								find: /\{\{DadosMicrorregiãoBrasil *(\||\r?\n|╔)/i,
								replace: '{{Info/Microrregião$1',
								num: 1
							}, {
								name: '{{DadosMunicípioBrasil}}',
								find: /\{\{DadosMunicípioBrasil *(\||\r?\n|╔)/i,
								replace: '{{Info/Município do Brasil$1',
								num: 1
							}, {
								name: '{{DadosMunicípioPortugal}}',
								find: /\{\{DadosMunicípioPortugal *(\||\r?\n|╔)/i,
								replace: '{{Info/Município de Portugal$1',
								num: 1
							}, {
								name: '{{DadosMunicípioTrinidadeTobago}}',
								find: /\{\{DadosMunicípioTrinidadeTobago *(\||\r?\n|╔)/i,
								replace: '{{Info/Município de Trinidad e Tobago$1',
								num: 1
							}, {
								name: '{{DadosRADistritoFederal}}',
								find: /\{\{DadosRADistritoFederal *(\||\r?\n|╔)/i,
								replace: '{{Info/Região Administrativa do DF-BR$1',
								num: 1
							}, {
								name: '{{DadosRegiãoBrasil}}',
								find: /\{\{DadosRegiãoBrasil *(\||\r?\n|╔)/i,
								replace: '{{Info/Região do Brasil$1',
								num: 1
							}, {
								name: '{{DadosRegiãoMetropolitanaBrasil}}',
								find: /\{\{DadosRegiãoMetropolitanaBrasil *(\||\r?\n|╔)/i,
								replace: '{{Info/Região Metropolitana do Brasil$1',
								num: 1
							}, {
								name: '{{DadosRegioesJundiai}}',
								find: /\{\{DadosRegioesJundiai *(\||\r?\n|╔)/i,
								replace: '{{Info/Região de Jundiai$1',
								num: 1
							}, {
								name: '{{DadosRegioesMilitaresEB}}',
								find: /\{\{DadosRegioesMilitaresEB *(\||\r?\n|╔)/i,
								replace: '{{Info/Regiões Militares do Exército Brasileiro$1',
								num: 1
							}, {
								name: '{{DadosRegionaisBH}}',
								find: /\{\{DadosRegionaisBH *(\||\r?\n|╔)/i,
								replace: '{{Info/Bairro de BH$1',
								num: 1
							}, {
								name: '{{DadosSubprefeiturasSãoPaulo}}',
								find: /\{\{DadosSubprefeiturasSãoPaulo *(\||\r?\n|╔)/i,
								replace: '{{Info/Subprefeitura de São Paulo$1',
								num: 1
							}, {
								name: '{{DadosUnidadesCBM}}',
								find: /\{\{DadosUnidadesCBM *(\||\r?\n|╔)/i,
								replace: '{{Info/Unidade CBM$1',
								num: 1
							}, {
								name: '{{DadosUnidadesEB}}',
								find: /\{\{DadosUnidadesEB *(\||\r?\n|╔)/i,
								replace: '{{Info/Unidades do Exército Brasileiro$1',
								num: 1
							}, {
								name: '{{DadosUnidadesFAB}}',
								find: /\{\{DadosUnidadesFAB *(\||\r?\n|╔)/i,
								replace: '{{Info/Unidades da Força Aérea Brasileira$1',
								num: 1
							}, {
								name: '{{DadosUnidadesMilitaresPortuguesas}}',
								find: /\{\{DadosUnidadesMilitaresPortuguesas *(\||\r?\n|╔)/i,
								replace: '{{Info/Unidades Militares de Portugal$1',
								num: 1
							}, {
								name: '{{DadosUnidadesPM}}',
								find: /\{\{DadosUnidadesPM *(\||\r?\n|╔)/i,
								replace: '{{Info/Unidade PM$1',
								num: 1
							}, {
								name: '{{DadosUniversidadesBrasil}}',
								find: /\{\{DadosUniversidadesBrasil *(\||\r?\n|╔)/i,
								replace: '{{Info/Universidade do Brasil$1',
								num: 1
							}, {
								name: '{{DadosUniversidadesFranca}}',
								find: /\{\{DadosUniversidadesFranca *(\||\r?\n|╔)/i,
								replace: '{{Info/Universidade da França$1',
								num: 1
							}, {
								name: '{{DadosUniversidadesNoruega}}',
								find: /\{\{DadosUniversidadesNoruega *(\||\r?\n|╔)/i,
								replace: '{{Info/Universidade da Noruega$1',
								num: 1
							}, {
								name: '{{DadosUniversidadesPortugal}}',
								find: /\{\{DadosUniversidadesPortugal *(\||\r?\n|╔)/i,
								replace: '{{Info/Universidade de Portugal$1',
								num: 1
							}, {
								name: '{{Departamentos da Colômbia2}}',
								find: /\{\{Departamentos da Colômbia2 *(\||\r?\n|╔)/i,
								replace: '{{Info/Departamentos da Colômbia$1',
								num: 1
							}, {
								name: '{{Desporto-olímpico-misto}}',
								find: /\{\{Desporto\-olímpico\-misto *(\||\r?\n|╔)/i,
								replace: '{{Info/Desporto olímpico misto$1',
								num: 1
							}, {
								name: '{{Dinastias da Armênia}}',
								find: /\{\{Dinastias da Armênia *(\||\r?\n|╔)/i,
								replace: '{{Info/Dinastia$1',
								num: 1
							}, {
								name: '{{Diocese}}',
								find: /\{\{Diocese *(\||\r?\n|╔)/i,
								replace: '{{Info/Diocese$1',
								num: 1
							}, {
								name: '{{Drugbox}}',
								find: /\{\{Drugbox *(\||\r?\n|╔)/i,
								replace: '{{Info/Droga$1',
								num: 1
							}]
						}, {
							name: 'Red Infobox s/ Info - E',
							find: '',
							replace: '',
							num: 1,
							ifhas: /\{\{E/i,
							sub: [{
								name: '{{Emissora de TV}}',
								find: /\{\{Emissora de TV *(\||\r?\n|╔)/i,
								replace: '{{Info/Rede de televisão$1',
								num: 1
							}, {
								name: '{{Empresas fictícias}}',
								find: /\{\{Empresas fictícias *(\||\r?\n|╔)/i,
								replace: '{{Info/Empresas fictícias$1',
								num: 1
							}, {
								name: '{{Episódio de Série}}',
								find: /\{\{Episódio de Série *(\||\r?\n|╔)/i,
								replace: '{{Info/Episódio de série$1',
								num: 1
							}, {
								name: '{{Episódios de Os Simpsons}}',
								find: /\{\{Episódios de Os Simpsons *(\||\r?\n|╔)/i,
								replace: '{{Info/Episódios de Os Simpsons$1',
								num: 1
							}, {
								name: '{{Epsódios de Os Simpsons}}',
								find: /\{\{Epsódios de Os Simpsons *(\||\r?\n|╔)/i,
								replace: '{{Info/Episódios de Os Simpsons$1',
								num: 1
							}, {
								name: '{{Estado EUA}}',
								find: /\{\{Estado EUA *(\||\r?\n|╔)/i,
								replace: '{{Info/Estado EUA$1',
								num: 1
							}, {
								name: '{{Estado extinto}}',
								find: /\{\{Estado extinto *(\||\r?\n|╔)/i,
								replace: '{{Info/Estado extinto$1',
								num: 1
							}, {
								name: '{{EstLut}}',
								find: /\{\{EstLut *(\||\r?\n|╔)/i,
								replace: '{{Info/Wrestler$1',
								num: 1
							}, {
								name: '{{Eventos musicais}}',
								find: /\{\{Eventos musicais *(\||\r?\n|╔)/i,
								replace: '{{Info/Evento musical$1',
								num: 1
							}]
						}, {
							name: 'Red Infobox s/ Info - F',
							find: '',
							replace: '',
							num: 1,
							ifhas: /\{\{F/i,
							sub: [{
								name: '{{F1 circuit}}',
								find: /\{\{F1 circuit *(\||\r?\n|╔)/i,
								replace: '{{Info/Circuito da F1$1',
								num: 1
							}, {
								name: '{{F1 team}}',
								find: /\{\{F1 team *(\||\r?\n|╔)/i,
								replace: '{{Info/Time de F1$1',
								num: 1
							}, {
								name: '{{F1drive}}',
								find: /\{\{F1drive *(\||\r?\n|╔)/i,
								replace: '{{Info/Motorista da F1$1',
								num: 1
							}, {
								name: '{{Família serie harry potter}}',
								find: /\{\{Família serie harry potter *(\||\r?\n|╔)/i,
								replace: '{{Info/Família da série Harry Potter$1',
								num: 1
							}, {
								name: '{{Festival de música}}',
								find: /\{\{Festival de música *(\||\r?\n|╔)/i,
								replace: '{{Info/Evento musical$1',
								num: 1
							}, {
								name: '{{Ficha harry potter}}',
								find: /\{\{Ficha harry potter *(\||\r?\n|╔)/i,
								replace: '{{Info/Harry Potter$1',
								num: 1
							}, {
								name: '{{French Comune}}',
								find: /\{\{French Comune *(\||\r?\n|╔)/i,
								replace: '{{Info/Comuna da França$1',
								num: 1
							}]
						}, {
							name: 'Red Infobox s/ Info - G',
							find: '',
							replace: '',
							num: 1,
							ifhas: /\{\{G/i,
							sub: [{
								name: '{{General CVG character}}',
								find: /\{\{General CVG character *(\||\r?\n|╔)/i,
								replace: '{{Info/Personagem de CVG$1',
								num: 1
							}, {
								name: '{{Graphic Novel}}',
								find: /\{\{Graphic Novel *(\||\r?\n|╔)/i,
								replace: '{{Info/Graphic Novel$1',
								num: 1
							}, {
								name: '{{Grupo étnico}}',
								find: /\{\{Grupo étnico *(\||\r?\n|╔)/i,
								replace: '{{Info/Grupo étnico$1',
								num: 1
							}]
						}, {
							name: 'Red Infobox s/ Info - H',
							find: '',
							replace: '',
							num: 1,
							ifhas: /\{\{H/i,
							sub: [{
								name: '{{HolandaWijk}}',
								find: /\{\{HolandaWijk *(\||\r?\n|╔)/i,
								replace: '{{Info/Distrito dos Países Baixos$1',
								num: 1
							}, {
								name: '{{HQ}}',
								find: /\{\{HQ *(\||\r?\n|╔)/i,
								replace: '{{Info/Banda desenhada$1',
								num: 1
							}]
						}, {
							name: 'Red Infobox s/ Info - I',
							find: '',
							replace: '',
							num: 1,
							ifhas: /\{\{I/i,
							sub: [{
								name: '{{Imperadores do Brasil}}',
								find: /\{\{Imperadores do Brasil *(\||\r?\n|╔)/i,
								replace: '{{Info/Imperador do Brasil$1',
								num: 1
							}, {
								name: '{{Itinerários Principais de Portugal}}',
								find: /\{\{Itinerários Principais de Portugal *(\||\r?\n|╔)/i,
								replace: '{{Info/Itinerários de Portugal$1',
								num: 1
							}]
						}, {
							name: 'Red Infobox s/ Info - J',
							find: '',
							replace: '',
							num: 1,
							ifhas: /\{\{J/i,
							sub: [{
								name: '{{Jornal}}',
								find: /\{\{Jornal *(\||\r?\n|╔)/i,
								replace: '{{Info/Jornal$1',
								num: 1
							}]
						}, {
							name: 'Red Infobox s/ Info - L',
							find: '',
							replace: '',
							num: 1,
							ifhas: /\{\{L/i,
							sub: [{
								name: '{{Localização das Unidades Residenciais de Santa Maria}}',
								find: /\{\{Localização das Unidades Residenciais de Santa Maria *(\||\r?\n|╔)/i,
								replace: '{{Info/Unidade Residencial de Santa Maria$1',
								num: 1
							}, {
								name: '{{Locomotiva (dados técnicos)}}',
								find: /\{\{Locomotiva \(dados técnicos\) *(\||\r?\n|╔)/i,
								replace: '{{Info/Locomotiva$1',
								num: 1
							}, {
								name: '{{Lutador}}',
								find: /\{\{Lutador *(\||\r?\n|╔)/i,
								replace: '{{Info/LutadorMMA$1',
								num: 1
							}, {
								name: '{{LutadorMMA}}',
								find: /\{\{LutadorMMA *(\||\r?\n|╔)/i,
								replace: '{{Info/LutadorMMA$1',
								num: 1
							}]
						}, {
							name: 'Red Infobox s/ Info - M',
							find: '',
							replace: '',
							num: 1,
							ifhas: /\{\{M/i,
							sub: [{
								name: '{{Madeira/geografia}}',
								find: /\{\{Madeira\/geografia *(\||\r?\n|╔)/i,
								replace: '{{Info/Localidade da Madeira$1',
								num: 1
							}, {
								name: '{{Mil especialidades marinha}}',
								find: /\{\{Mil especialidades marinha *(\||\r?\n|╔)/i,
								replace: '{{Info/Especialidade da marinha$1',
								num: 1
							}, {
								name: '{{Mineral}}',
								find: /\{\{Mineral *(\||\r?\n|╔)/i,
								replace: '{{Info/Mineral$1',
								num: 1
							}, {
								name: '{{Mini Info Televisão}}',
								find: /\{\{Mini Info Televisão *(\||\r?\n|╔)/i,
								replace: '{{Info/Televisão$1',
								num: 1
							}, {
								name: '{{MotoGP rider}}',
								find: /\{\{MotoGP rider *(\||\r?\n|╔)/i,
								replace: '{{Info/Motorista da MotoGP$1',
								num: 1
							}]
						}, {
							name: 'Red Infobox s/ Info - N',
							find: '',
							replace: '',
							num: 1,
							ifhas: /\{\{N/i,
							sub: [{
								name: '{{NHL Team}}',
								find: /\{\{NHL Team *(\||\r?\n|╔)/i,
								replace: '{{Info/NHL Team$1',
								num: 1
							}]
						}, {
							name: 'Red Infobox s/ Info - O',
							find: '',
							replace: '',
							num: 1,
							ifhas: /\{\{Ó/i,
							sub: [{
								name: '{{Ópera}}',
								find: /\{\{Ópera *(\||\r?\n|╔)/i,
								replace: '{{Info/Ópera$1',
								num: 1
							}]
						}, {
							name: 'Red Infobox s/ Info - P',
							find: '',
							replace: '',
							num: 1,
							ifhas: /\{\{P/i,
							sub: [{
								name: '{{Património Mundial}}',
								find: /\{\{Património Mundial *(\||\r?\n|<!--)/i,
								replace: '{{Info/Património Mundial$1',
								num: 1
							}, {
								name: '{{Personagem animangá}}',
								find: /\{\{Personagem animangá *(\||\r?\n|<!--)/i,
								replace: '{{Info/Personagem animangá$1',
								num: 1
							}, {
								name: '{{Personagem de D&amp;D}}',
								find: /\{\{Personagem de D&amp;D *(\||\r?\n|<!--)/i,
								replace: '{{Info/Personagem de D&amp;D$1',
								num: 1
							}, {
								name: '{{Personagem de Desperate Housewives}}',
								find: /\{\{Personagem de Desperate Housewives *(\||\r?\n|<!--)/i,
								replace: '{{Info/Personagem de Desperate Housewives$1',
								num: 1
							}, {
								name: '{{Personagem de Os Simpsons}}',
								find: /\{\{Personagem de Os Simpsons *(\||\r?\n|<!--)/i,
								replace: '{{Info/Personagem de Os Simpsons$1',
								num: 1
							}, {
								name: '{{Personagem de Ursinho Pooh 2}}',
								find: /\{\{Personagem de Ursinho Pooh 2 *(\||\r?\n|<!--)/i,
								replace: '{{Info/Personagem de Ursinho Pooh 2$1',
								num: 1
							}, {
								name: '{{Personagem de Ursinho Pooh HD}}',
								find: /\{\{Personagem de Ursinho Pooh HD *(\||\r?\n|<!--)/i,
								replace: '{{Info/Personagem de Ursinho Pooh HD$1',
								num: 1
							}, {
								name: '{{Personagem de Ursinho Puff}}',
								find: /\{\{Personagem de Ursinho Puff *(\||\r?\n|<!--)/i,
								replace: '{{Info/Personagem de Ursinho Puff$1',
								num: 1
							}, {
								name: '{{Personagem de Winnie-the-Pooh}}',
								find: /\{\{Personagem de Winnie\-the\-Pooh *(\||\r?\n|<!--)/i,
								replace: '{{Info/Personagem de Ursinho Puff$1',
								num: 1
							}, {
								name: '{{Personagem dos filmes Resident Evil}}',
								find: /\{\{Personagem dos filmes Resident Evil *(\||\r?\n|<!--)/i,
								replace: '{{Info/Personagem dos filmes Resident Evil$1',
								num: 1
							}, {
								name: '{{Personagem Heroes}}',
								find: /\{\{Personagem Heroes *(\||\r?\n|<!--)/i,
								replace: '{{Info/Personagem Heroes$1',
								num: 1
							}, {
								name: '{{Personagem Lost}}',
								find: /\{\{Personagem Lost *(\||\r?\n|<!--)/i,
								replace: '{{Info/Personagem Lost$1',
								num: 1
							}, {
								name: '{{Personagem Star Trek}}',
								find: /\{\{Personagem Star Trek *(\||\r?\n|<!--)/i,
								replace: '{{Info/Personagem Star Trek$1',
								num: 1
							}, {
								name: '{{Personagem Star Wars}}',
								find: /\{\{Personagem Star Wars *(\||\r?\n|<!--)/i,
								replace: '{{Info/Personagem Star Wars$1',
								num: 1
							}, {
								name: '{{Personagem-pokémon}}',
								find: /\{\{Personagem\-pokémon *(\||\r?\n|<!--)/i,
								replace: '{{Info/Personagem de Pokémon$1',
								num: 1
							}, {
								name: '{{PersonagemHQ}}',
								find: /\{\{PersonagemHQ *(\||\r?\n|<!--)/i,
								replace: '{{Info/Personagem fictícia$1',
								num: 1
							}, {
								name: '{{Personagens Charmed}}',
								find: /\{\{Personagens Charmed *(\||\r?\n|<!--)/i,
								replace: '{{Info/Personagens Charmed$1',
								num: 1
							}, {
								name: '{{Personagens da Bíblia}}',
								find: /\{\{Personagens da Bíblia *(\||\r?\n|<!--)/i,
								replace: '{{Info/Personagem da Bíblia$1',
								num: 1
							}, {
								name: '{{Personagens de Naruto}}',
								find: /\{\{Personagens de Naruto *(\||\r?\n|<!--)/i,
								replace: '{{Info/Personagem de Naruto$1',
								num: 1
							}, {
								name: '{{Peru departamento}}',
								find: /\{\{Peru departamento *(\||\r?\n|<!--)/i,
								replace: '{{Info/Região do Peru$1',
								num: 1
							}, {
								name: '{{Piloto de corrida}}',
								find: /\{\{Piloto de corrida *(\||\r?\n|<!--)/i,
								replace: '{{Info/Piloto de corrida$1',
								num: 1
							}, {
								name: '{{Pintura}}',
								find: /\{\{Pintura *(\||\r?\n|<!--)/i,
								replace: '{{Info/Pintura$1',
								num: 1
							}, {
								name: '{{Pista de aterrisagem}}',
								find: /\{\{Pista de aterrisagem *(\||\r?\n|<!--)/i,
								replace: '{{Info/Aeroporto/Pista de aterrisagem$1',
								num: 1
							}, {
								name: '{{Pokeinfo}}',
								find: /\{\{Pokeinfo *(\||\r?\n|<!--)/i,
								replace: '{{Info/Pokémon$1',
								num: 1
							}, {
								name: '{{Político}}',
								find: /\{\{Político *(\||\r?\n|<!--)/i,
								replace: '{{Info/Político$1',
								num: 1
							}, {
								name: '{{Polónia/Comuna}}',
								find: /\{\{Polónia\/Comuna *(\||\r?\n|<!--)/i,
								replace: '{{Info/Comuna da Polónia$1',
								num: 1
							}, {
								name: '{{Polónia/Condado}}',
								find: /\{\{Polónia\/Condado *(\||\r?\n|<!--)/i,
								replace: '{{Info/Condado da Polónia$1',
								num: 1
							}, {
								name: '{{Polónia/voivodia}}',
								find: /\{\{Polónia\/voivodia *(\||\r?\n|<!--)/i,
								replace: '{{Info/Voivodias da Polónia$1',
								num: 1
							}, {
								name: '{{Ponte}}',
								find: /\{\{Ponte *(\||\r?\n|<!--)/i,
								replace: '{{Info/Ponte$1',
								num: 1
							}, {
								name: '{{Portos}}',
								find: /\{\{Portos *(\||\r?\n|<!--)/i,
								replace: '{{Info/Porto$1',
								num: 1
							}]
						}, {
							name: 'Red Infobox s/ Info - R',
							find: '',
							replace: '',
							num: 1,
							ifhas: /\{\{R/i,
							sub: [{
								name: '{{Região}}',
								find: /\{\{Região *(\||\r?\n|<!--)/i,
								replace: '{{Info/Região2$1',
								num: 1
							}]
						}, {
							name: 'Red Infobox s/ Info - S',
							find: '',
							replace: '',
							num: 1,
							ifhas: /\{\{S/i,
							sub: [{
								name: '{{Sábios chineses}}',
								find: /\{\{Sábios chineses *(\||\r?\n|<!--)/i,
								replace: '{{Info/Sábio chinês$1',
								num: 1
							}, {
								name: '{{Senadores do Império do Brasil}}',
								find: /\{\{Senadores do Império do Brasil *(\||\r?\n|<!--)/i,
								replace: '{{Info/Senador do Império do Brasil$1',
								num: 1
							}, {
								name: '{{Star Trek character}}',
								find: /\{\{Star Trek character *(\||\r?\n|<!--)/i,
								replace: '{{Info/Personagem Star Trek$1',
								num: 1
							}, {
								name: '{{Super-Herói}}',
								find: /\{\{Super\-Herói *(\||\r?\n|<!--)/i,
								replace: '{{Info/Super-Herói$1',
								num: 1
							}, {
								name: '{{Supergrupo}}',
								find: /\{\{Supergrupo *(\||\r?\n|<!--)/i,
								replace: '{{Info/Supergrupo$1',
								num: 1
							}, {
								name: '{{SuperNomes}}',
								find: /\{\{SuperNomes *(\||\r?\n|<!--)/i,
								replace: '{{Info/Super-Nomes$1',
								num: 1
							}, {
								name: '{{Supercomics}}',
								find: /\{\{Supercomics *(\||\r?\n|<!--)/i,
								replace: '{{Info/Supercomics$1',
								num: 1
							}, {
								name: '{{Surfista}}',
								find: /\{\{Surfista *(\||\r?\n|<!--)/i,
								replace: '{{Info/Surfista$1',
								num: 1
							}]
						}, {
							name: 'Red Infobox s/ Info - T',
							find: '',
							replace: '',
							num: 1,
							ifhas: /\{\{T/i,
							sub: [{
								name: '{{Tabela Shurato}}',
								find: /\{\{Tabela Shurato *(\||\r?\n|<!--)/i,
								replace: '{{Info/Shurato$1',
								num: 1
							}, {
								name: '{{Tabela UNESCO}}',
								find: /\{\{Tabela UNESCO *(\||\r?\n|<!--)/i,
								replace: '{{Info/Património Mundial$1',
								num: 1
							}, {
								name: '{{Tabela-Bleach}}',
								find: /\{\{Tabela\-Bleach *(\||\r?\n|<!--)/i,
								replace: '{{Info/Bleach$1',
								num: 1
							}, {
								name: '{{Tabela-bucky}}',
								find: /\{\{Tabela\-bucky *(\||\r?\n|╔)/i,
								replace: '{{Info/Bucky$1',
								num: 1
							}, {
								name: '{{Tabela-CDZ}}',
								find: /\{\{Tabela\-CDZ *(\||\r?\n|<!--)/i,
								replace: '{{Info/Personagem CDZ$1',
								num: 1
							}, {
								name: '{{Tabela-FMA}}',
								find: /\{\{Tabela\-FMA *(\||\r?\n|<!--)/i,
								replace: '{{Info/Fullmetal Alchemist$1',
								num: 1
							}, {
								name: '{{Tabela-naruto}}',
								find: /\{\{Tabela\-naruto *(\||\r?\n|<!--)/i,
								replace: '{{Info/Personagem de Naruto$1',
								num: 1
							}, {
								name: '{{Tabela-One Piece}}',
								find: /\{\{Tabela\-One Piece *(\||\r?\n|<!--)/i,
								replace: '{{Info/Personagem One Piece$1',
								num: 1
							}, {
								name: '{{Tabela-pokémon}}',
								find: /\{\{Tabela\-pokémon *(\||\r?\n|<!--)/i,
								replace: '{{Info/Pokémon$1',
								num: 1
							}, {
								name: '{{Taxobox}}',
								find: /\{\{Taxobox *(\||\r?\n|<!--)/i,
								replace: '{{Info/Taxonomia$1',
								num: 1
							}, {
								name: '{{Taxocaixa}}',
								find: /\{\{Taxocaixa *(\||\r?\n|<!--)/i,
								replace: '{{Info/Taxonomia$1',
								num: 1
							}, {
								name: '{{Temporada de Série}}',
								find: /\{\{Temporada de Série *(\||\r?\n|<!--)/i,
								replace: '{{Info/Temporada de série$1',
								num: 1
							}, {
								name: '{{ToponímiaSãoPaulo}}',
								find: /\{\{ToponímiaSãoPaulo *(\||\r?\n|<!--)/i,
								replace: '{{Info/Toponímia de São Paulo$1',
								num: 1
							}, {
								name: '{{Tour de France class}}',
								find: /\{\{Tour de France class *(\||\r?\n|<!--)/i,
								replace: '{{Info/Tour de France$1',
								num: 1
							}]
						}, {
							name: 'Red Infobox s/ Info - U',
							find: '',
							replace: '',
							num: 1,
							ifhas: /\{\{U/i,
							sub: [{
								name: '{{UsinasHidreletricas}}',
								find: /\{\{UsinasHidreletricas *(\||\r?\n|<!--)/i,
								replace: '{{Info/Usina Hidrelétrica$1',
								num: 1
							}]
						}, {
							name: 'Red Infobox s/ Info - W',
							find: '',
							replace: '',
							num: 1,
							ifhas: /\{\{W/i,
							sub: [{
								name: '{{Winnie-the-Pooh}}',
								find: /\{\{Winnie\-the\-Pooh *(\||\r?\n|<!--)/i,
								replace: '{{Info/Personagem de Ursinho Puff$1',
								num: 1
							}]
						}, {
							name: 'Red Infobox s/ Info - X',
							find: '',
							replace: '',
							num: 1,
							ifhas: /\{\{X/i,
							sub: [{
								name: '{{Xiaolin1}}',
								find: /\{\{Xiaolin1 *(\||\r?\n|<!--)/i,
								replace: '{{Info/Personagem de Duelo Xaolin$1',
								num: 1
							}]
						}]
					}]
				}, {
					name: 'Red Tabela',
					find: '',
					replace: '',
					num: 1,
					sub: [{
						name: 'Clima',
						find: /\{\{Infobox Clima *(\||\r?\n|╔)/i,
						replace: '{{Tabela/Clima$1',
						num: 100
					}]
				}, {
					name: 'Tag man',
					find: '',
					replace: '',
					num: 1,
					sub: [{
						name: '{{Esboço-videojogos}}',
						find: '{{Esboço-videojogos}}',
						replace: '{{Esboço-videogame}}',
						num: 1
					}, {
						name: '{{Trivia}}',
						find: /\{\{Curiosidades([\|\r\n\}])/i,
						replace: '{{Trivia$1',
						num: 1
					}, {
						name: '{{Corrigir}}',
						find: /\{\{Correção([\|\r\n\}])/i,
						replace: '{{Corrigir$1',
						num: 1
					}, {
						name: '{{Contextualizar}}',
						find: /\{\{(Contexto|sem contexto|carece contexto)([\|\r\n\}])/i,
						replace: '{{Contextualizar$2',
						num: 1
					}, {
						name: '{{semft}}',
						find: /\{\{semft\}\}/i,
						replace: '{{Semfichatécnica}}',
						num: 1
					}, {
						name: '{{Sem imagem}}',
						find: /\{\{(Sem\-?imagem|semim)([\|\r\n\}])/i,
						replace: '{{Sem imagem$2',
						num: 1
					}, {
						name: '{{Seminterwiki}}',
						find: /\{\{Sem[ \-]?(iw|interwiki)([\|\r\n\}])/i,
						replace: '{{Seminterwiki$2',
						num: 1
					}, {
						name: '{{Seminterwiki}}',
						find: /\{\{Sem[\- ]interwiki([\|\r\n\}])/i,
						replace: '{{Seminterwiki$1',
						num: 1
					}, {
						name: '{{Wikificação}}',
						find: /\{\{(Wikificar|Wikify|Wkf)([\|\r\n\}])/i,
						replace: '{{Wikificação$2',
						num: 1
					}, {
						name: '{{Reciclagem}}',
						find: /\{\{(Reciclar|Suspeita|Formatação|Reciclagem2|Rec)([\|\r\n\}])/i,
						replace: '{{Reciclagem$2',
						num: 1
					}, {
						name: '{{Revisão}}',
						find: /\{\{(Especialista|Revisar)([\|\r\n\}])/i,
						replace: '{{Revisão$2',
						num: 1
					}, {
						name: '{{Carece de fontes',
						find: /\{\{(?:Carece[ _]de[ _]fontes|Sem fontes|Fact)([\|\r\n\}])/i,
						replace: '{{Carece de fontes$1',
						num: 1
					}, {
						name: '{{Fusão}}',
						find: /\{\{(Fusao|Fusão1|Fundir)([\|\r\n\}])/i,
						replace: '{{Fusão$2',
						num: 1
					}, {
						name: '{{Artigo longo}}',
						find: /\{\{(Artigo Longo|Longo)([\|\r\n\}])/i,
						replace: '{{Artigo longo$2',
						num: 1
					}, {
						name: '{{Sem-fontes}}',
						find: /\{\{(Citar fonte|Factual|Fonteprimária|Rigor|Sem\-fonte|Sem-referências|Unreferenced)([\|\r\n\}])/i,
						replace: '{{Sem-fontes$2',
						num: 10
					}, {
						name: '{{Sem infocaixa',
						find: /\{\{(?:Falta(?:\-caixa|\-info)|Sem[\- ]infobox)([\|\r\n\}])/i,
						replace: '{{Sem infocaixa$1',
						num: 10
					}, {
						name: '{{Stub}}',
						find: /\{\{Stub([\|}])/i,
						replace: '{{esboço$1',
						num: 10
					}]
				}, {
					name: 'Portais',
					find: '',
					replace: '',
					num: 1,
					sub: [{
						name: '{{Portal-administração}}',
						find: /\{\{portal\-(admin)\}\}/i,
						replace: '{{Portal-administração}}',
						num: 1
					}]
				}, {
					name: 'Outros',
					find: '',
					replace: '',
					num: 1,
					sub: [{
						name: '{{Flagicon}}',
						find: /\{\{(?:ÍconeBandeira|Bandera)(\||\}\})/i,
						replace: '{{Flagicon$1',
						num: 10
					}, {
						name: '{{Revelações sobre o enredo}}',
						find: /\{\{(Enredo|Tema|(Spoilers?([ \-]início)?))\}\}/i,
						replace: '{{Revelações sobre o enredo}}',
						num: 1,
						sub: [{
							name: '{{Enredo}}',
							find: '{{Enredo}}',
							replace: '{{Revelações sobre o enredo}}',
							num: 1
						}, {
							name: '{{Spoilers}}',
							find: /\{\{Spoilers?([ \-]início)?\}\}/i,
							replace: '{{Revelações sobre o enredo}}',
							num: 1
						}, {
							name: '{{Tema}}',
							find: '{{Tema}}',
							replace: '{{Revelações sobre o enredo}}',
							num: 1
						}]
					}, {
						name: 'REF',
						find: '',
						replace: '',
						num: 1,
						sub: [{
							name: '{{Referências}}',
							find: /\{\{(?:Referências|rodapé referências|Ref\-?section)(\||\}\})/i,
							replace: '{{Referências$1',
							num: 1
						}, {
							name: '{{Reflist}}',
							find: /\{\{(?:Refcompacta|Refs)\}\}/i,
							replace: '{{Reflist}}',
							num: 1
						}, {
							name: '{{Citar bíblia}}',
							find: /\{\{Refbíblia( *\|?[ \|\r\n])/i,
							replace: '{{Citar bíblia$1',
							num: 1
						}, {
							name: '{{ligação inativa}}',
							find: /\{\{dead link(\||\}\})/i,
							replace: '{{ligação inativa$1',
							num: 1
						}, {
							name: '{{Imdb título}}',
							find: /\{\{(?:Imdb title|Filmes Imdb)([\|}])/i,
							replace: '{{Imdb título$1',
							num: 10
						}, {
							name: '{{Imdb nome}}',
							find: /\{\{(?:IMDB nome|Imdb name|Imdb|IMDb name)([\|}])/i,
							replace: '{{Imdb nome$1',
							num: 10
						}, {
							name: '{{Citar livro}}',
							find: /\{\{Referência a livro\|/i,
							replace: '{{Citar livro|',
							num: 1
						}, {
							name: '{{Cite web}}',
							find: /\{\{Citeweb\|/i,
							replace: '{{Cite web|',
							num: 1
						}]
					}, {
						name: 'nascimentos',
						find: '',
						replace: '',
						num: 1,
						sub: [{
							name: '{{dni}}',
							find: /\{\{(?:nascimento e idade|data de nascimento)(\||\}\})/i,
							replace: '{{dni$1',
							num: 10
						}, {
							name: '{{dni|sem idade}}',
							find: /\{\{nascimento(\|[^\|\}\n]*\|[^\|\}\n]*\|[^\|\}\n]*)([\|}])/i,
							replace: '{{dni$1|si$2',
							num: 1
						}, {
							name: '{{dni|lang=br}}',
							find: /\{\{dnibr(\||\}\})/i,
							replace: '{{dni|lang=br$1',
							num: 1
						}, {
							name: '{{morte}}',
							find: /\{\{(?:falecimento|Morte e idade|Data de morte e idade|Data falecimento e idade|falecimento e idade|dmi)(\||\}\})/i,
							replace: '{{morte$1',
							num: 10
						}, {
							name: '{{morte}} -campos',
							find: /(\{\{morte[^{}\n]*)\|[dm]f=[^\|\{\}\n]+([\|}])/i,
							replace: '$1$2',
							num: 10
						}]
					}, {
						name: '{{Artigo principal}}',
						find: /\{\{(AP|Main|Ver artigo principal)\|/i,
						replace: '{{Artigo principal|',
						num: 1
					}, {
						name: '{{Ligações externas}}',
						find: /\{\{(Apontadores|Apontadores externos|Atalhos externos|Enlace externo|Enlaces externos|Elos externos|Link externo|Links|Links exteriores|Links externos|Links para o exterior|Links relacionados|Ligação exterior|Ligação externa|Ligações Externas|Ligações exteriores|Ligações para o exterior|Linque externo|Páginas externas|Página externa|Páginas da Internet|Recursos exteriores à Wikipédia|Referência externa|Referências externas|Sítios|Vínculos externos|Weblinks)\}\}/i,
						replace: 'Ligações externas',
						num: 1
					}, {
						name: '{{Ver também}}',
						find: /\{\{((Ligações|Referências|Links) intern[ao]s|(Consultar|Veja|Ver|Vide) (mais|tamb[eé]m|ainda)|(Artigos|Assuntos|Páginas|Tópicos) relacionad[ao]s|Tópicos diversos)\}\}/i,
						replace: 'Ver também',
						num: 1
					}, {
						name: '{{Biografias}}',
						find: /\{\{biografia\}\}/i,
						replace: '{{Biografias}}',
						num: 1
					}, {
						name: '{{Ciências-rodapé}}',
						find: /\{\{Ciências-rodapé\}\}/i,
						replace: '{{Ciências}}',
						num: 1
					}, {
						name: 'Meta/Persondata',
						find: /\{\{Info\/Persondata *(\||\r?\n|╔)/i,
						replace: '{{Meta/Persondata$1',
						num: 1
					}, {
						name: '{{Educação}}',
						find: /\{\{Educação\-rodapé\}\}/i,
						replace: '{{Educação}}',
						num: 1
					}, {
						name: '{{limpar}}',
						find: /\{\{(\-|clear)\}\}/i,
						replace: '{{limpar}}',
						num: 1
					}, {
						name: 'Rule',
						find: /\{\{(Start box|Comeca caixa)\}\}/i,
						replace: '{{Começa caixa}}',
						num: 10
					}]
				}, {
					name: 'Artigos em tradução',
					find: '',
					replace: '',
					num: 1,
					sub: [{
						name: '{{sp icon}}',
						find: /\{\{sp icon\}\}/i,
						replace: '{{es}}',
						num: 100
					}]
				}]
			}, {
				name: 'Quebra linha em predefs',
				find: '',
				replace: '',
				num: 1,
				sub: [{
					name: 'Quebra linha em predefs 1',
					find: /\{\{(Artigo longo|Controverso|Corrigir|Fusão|Fusão com|Fusão de|Parcial|Reciclagem|Revisão|Sem\-fontes|Sem imagem|Seminterwiki|Sem\-notas|Trivia|Wikificação)([^\n\}]*)\}\}([^\r\n])/i,
					replace: '{{$1$2}}\n$3',
					num: 10
				}, {
					name: 'Quebra linha em predefs 2',
					find: /\{\{(Artigo longo|Controverso|Corrigir|Fusão|Fusão com|Fusão de|Parcial|Reciclagem|Revisão|Sem\-fontes|Sem imagem|Seminterwiki|Sem\-notas|Trivia|Wikificação)([^\n\}]*)\}\}(\r?\n){2,}/i,
					replace: '{{$1$2}}\n',
					num: 10
				}, {
					name: 'Quebra linha em predefs 3',
					find: /([^\r\n])\{\{Portal3\|/i,
					replace: '$1\n{{Portal3|',
					num: 1
				}]
			}, {
				name: 'Último campo de predefinição',
				find: /\n( *)\| *\}\}/i,
				replace: '\n$1}}',
				num: 1
			}, {
				name: '| das predefs',
				find: '',
				replace: '',
				num: 1,
				sub: [{
					name: '| do título',
					find: /\{\{([^\|\n]*)\| *(?:\r?\n)+ *\|/i,
					replace: '{{$1\n |',
					num: 1
				}, {
					name: '| dos campos',
					find: /\r?\n\| /i,
					replace: '\n |',
					num: 1,
					where: 'templates'
				}]
			}, {
				name: 'tradução de campos',
				find: '',
				replace: '',
				num: 1,
				sub: [{
					name: '|date=',
					find: /(\{\{ligação inativa[^\|\{\}\n]+)\|date=/i,
					replace: '$1|data=',
					num: 10
				}]
			}]
		}, {
			name: 'Nome de ficheiro',
			find: /(╠[^\|\n\[\]_]*)_/i,
			replace: '$1 ',
			num: 100
		}, {
			name: 'Ligações internas',
			find: '',
			replace: '',
			num: 1,
			ifhas: /[\[\]]/i,
			sub: [{
				name: '%20',
				find: /(\[\[[^%\]]*)%20([^\]]*\]\])/i,
				replace: '$1 $2',
				num: 100
			}, {
				name: '[[w:',
				find: /\[\[w\:(..[^\:])/i,
				replace: '[[$1',
				num: 1
			}, {
				name: '[[<br />',
				find: /\[\[<br \/>/i,
				replace: '&lt;br /&gt;[[',
				num: 100
			}]
		}, {
			name: 'Começa com seção',
			find: /▓==.*==\r?\n/i,
			replace: '▓',
			num: 10
		}]
	}, {
		name: 'Marcando',
		find: '',
		replace: '',
		num: 1,
		sub: [{
			name: 'Marca meio',
			find: '',
			replace: '',
			num: 1,
			sub: [{
				name: 'Marca comentários',
				find: '',
				replace: '',
				num: 1,
				sub: [{
					name: 'Marca <!--',
					find: '&lt;!--',
					replace: '╔',
					num: 100
				}, {
					name: 'Marca -->',
					find: '--&gt;',
					replace: '╗',
					num: 100
				}, {
					name: 'Rule',
					find: /╔\-+([^\-])/i,
					replace: '╔$1',
					num: 1
				}]
			}, {
				name: 'Marca inicio de ficheiro',
				find: /\[\[(?:Imagem?|File|Arquivo|Ficheiro):/i,
				replace: '╠Imagem:',
				num: 100
			}, {
				name: 'Marca fim de ficheiro',
				find: /(╠)((([^\n\[\]]*)(\[+[^\]\n]*\]{1,2})?)+)/i,
				replace: '$1$2▒<',
				num: 1,
				ifhas: '╠' // FIXME: /╠/i ?
			}, {
				name: 'Marca seções',
				find: '',
				replace: '',
				num: 1,
				sub: [{
					name: 'Marca inicio seção',
					find: /\r?\n=/i,
					replace: '\n║=',
					num: 100
				}]
			}]
		}, {
			name: 'Marca inicio',
			find: '',
			replace: '',
			num: 1,
			sub: [{
				name: 'Marca fim infobox - regra geral',
				find: /(\{\{Info[^\{\}]*)((?:\{\{[^\{\}]*(?:(?:\{\{[^\{\}]*\}\}[^\{\}]*)*)\}\}[^\{\}]*)*)\}\}/i,
				replace: '$1$2╣}}',
				num: 1,
				ifnot: /\{\{Info\/Química/i
			}, {
				name: 'Marca fim infobox - outras infoboxes',
				find: '',
				replace: '',
				num: 1,
				ifnot: '╣',
				sub: [{
					name: 'Marca fim infobox - esportistas',
					find: /(\n\{\{Medal[^\n\{\}]+\}\}\r?\n) *\}\}/i,
					replace: '$1╣}}',
					num: 1,
					ifhas: '{{Medal'
				}, {
					name: 'Marca fim infobox - Info/Química',
					find: '',
					replace: '',
					num: 1,
					ifhas: /\{\{Info\/Química/i,
					sub: [{
						name: 'Rule',
						find: /(\n +\}\}\n)\}\}/i,
						replace: '$1╣}}',
						num: 1,
						ifhas: /\| *Section1 *= *\n* *\{\{/i
					}, {
						name: 'Rule',
						find: /(\{\{Info[^\{\}]*)((?:\{\{[^\}]*\}\}[^\{\}]*)*)\}\}/i,
						replace: '$1$2╣}}',
						num: 1,
						ifnot: /\| *Section1 *= *\n* *\{\{/i
					}]
				}]
			}, {
				name: 'Arruma fim infobox',
				find: /╣\}\}( *(?:\r?\n)* *)\{\{Info/i,
				replace: '}}$1{{Info',
				num: 1
			}, {
				name: 'Infobox para cima da introdução',
				find: /([\n▓])([^{}=\-\r\n][^{}=\r\n]*\r?\n)(\{\{Info\/[^╣]+╣\}\}\r?\n)/i,
				replace: '$1$3$2',
				num: 1
			}, {
				name: 'Rule',
				find: /([^\r\n])╣\}\}/i,
				replace: '$1\n╣}}',
				num: 1
			}, {
				name: 'Rule',
				find: /\r?\n *\r?\n╣\}\}/i,
				replace: '\n╣}}',
				num: 10
			}, {
				name: 'Marca primeira seção',
				find: '',
				replace: '',
				num: 1,
				sub: [{
					name: 'Rule',
					find: /(▓[^░║╩]*)║/,
					replace: '$1╩\n║',
					num: 1
				}, {
					name: 'Secao1 após info',
					find: '',
					replace: '',
					num: 20,
					ifhas: /╣\}\}(\r?\n)*╩/,
					sub: [{
						name: 'retira secao',
						find: /╣\}\}(?:\r?\n)*╩(?:\r?\n)*║=*[^=\n]*=*\r?\n/i,
						replace: '╣}}\n',
						num: 1
					}, {
						name: 'marca de novo',
						find: /(▓[^░║╩]*)║/i,
						replace: '$1╩\n║',
						num: 1
					}]
				}]
			}, {
				name: 'Marca parag 1 inicio',
				find: '',
				replace: '',
				num: 1,
				sub: [{
					name: 'Marca p1 inicio 1 - fim info',
					find: /(╣\}\}(?:\r?\n)+)([^\-╠<\r\n])/,
					replace: '$1╚$2',
					num: 1,
					ifnot: '╚'
				}, {
					name: 'Marca p1 inicio 2 - começa direto',
					find: /▓([^\-<╔{}\|]|\{\{(?:PBPE|PEPB))/i,
					replace: '>▓╚$1',
					num: 1,
					ifnot: '╚',
					sub: [{
						name: 'Rule',
						find: /╚(╠[^▒]+▒\]\]\r?(?:\n\r?)*)([^╠\]\n\r])/i,
						replace: '$1╚$2',
						num: 1
					}]
				}, {
					name: 'Marca p1 inicio 3 - sem apoio',
					find: '',
					replace: '',
					num: 1,
					ifnot: /╚/,
					sub: [{
						name: 'Marca todos os \n',
						find: /(▓(?:\{\{Sem[^}]*\}\})?[^\-╩░]*)\n([^╩░])/,
						replace: '$1╚$2',
						num: 100
					}, {
						name: 'retira os errados',
						find: /╚([\-{╠╚╩<\|\&amp;])/,
						replace: '\n$1',
						num: 100
					}, {
						name: 'retira em info',
						find: /(▓[^╣]*)╚/i,
						replace: '$1\n',
						num: 100,
						ifhas: '╣'
					}, {
						name: 'recoloca para PBPE',
						find: /(▓[^╩]*)\n(\{\{(?:PBPE|PEPB))/,
						replace: '$1╚$2',
						num: 1
					}, {
						name: 'deixa só o primeiro',
						find: /╚([^╚╩]*)╚/,
						replace: '╚$1\n',
						num: 100
					}, {
						name: 'quebra de linha no primeiro',
						find: '╚',
						replace: '\n╚',
						num: 1
					}]
				}, {
					name: 'Marca p1 inicio 4 - intro c 1 parag',
					find: /(▓(?:\{.*\}\r?\n)*)([^{}].*(?:\r?\n)*╩)/i,
					replace: '$1╚$2',
					num: 1,
					ifnot: '╚'
				}, {
					name: 'Marca p1 inicio 5 - imagem',
					find: '',
					replace: '',
					num: 1,
					ifnot: '[╚┼]',
					sub: [{
						name: 'Marca',
						find: /\n\r?\n/i,
						replace: '┼',
						num: 1
					}, {
						name: 'Parag 1',
						find: /(▓[^┼░]*▒\]\](?:\r?\n)*)([^╠{\r\n])/i,
						replace: '$1╚$2',
						num: 1
					}, {
						name: 'Desmarca',
						find: /┼/i,
						replace: '\n\n',
						num: 1
					}]
				}]
			}, {
				name: 'Marca parag 1 fim',
				find: '',
				replace: '',
				num: 1,
				sub: [{
					name: 'Marca tag quebra linha',
					find: /(<p>|<\/p>|<br \/>)/i,
					replace: '┬$1',
					num: 1
				}, {
					name: 'Final',
					find: /╚([^\r\n╝┬]+)([\r\n╝┬])/,
					replace: '╚$1╝$2',
					num: 1,
					ifhas: '╚'
				}, {
					name: 'Rule',
					find: /╝┬/i,
					replace: '╝\n┬',
					num: 1
				}, {
					name: 'Rule',
					find: '┬',
					replace: '',
					num: 100
				}]
			}, {
				name: 'Desmarca início sem fim',
				find: '╚',
				replace: '',
				num: 1,
				ifnot: '╝'
			}, {
				name: 'Fim intro sem seção',
				find: '',
				replace: '',
				num: 1,
				ifnot: /[╩║]/i,
				sub: [{
					name: 'marca',
					find: /(╝[^░╩]*)(\r?\n\r?\n\{)/i,
					replace: '$1\n╩$2',
					num: 1,
					ifnot: /\n║?==/i
				}, {
					name: 'remarca',
					find: /(╝[^░╩]*)(\r?\n\r?\n\{[^░╩]*)\r?\n╩/i,
					replace: '$1\n╩$2',
					num: 10
				}]
			}]
		}, {
			name: 'Marca fim',
			find: '',
			replace: '',
			num: 1
		}, {
			name: 'Marca título',
			find: /▓/,
			replace: '▓%%title%%╦\n',
			num: 1
		}, {
			name: 'Desmarca',
			find: '',
			replace: '',
			num: 1,
			sub: [{
				name: 'Rule',
				find: /[╚╝]/i,
				replace: '',
				num: 10,
				ifhas: /▓(Wikipedia|Ficheiro|MediaWiki|Predefinição|Ajuda|Categoria|Portal)( Discussão)?:/i
			}]
		}]
	}, {
		name: 'Temporário',
		find: '',
		replace: '',
		num: 1,
		sub: [{
			name: 'class="wikitable" 1',
			find: /\{\{(Tabela *bonita|Tabla *bonita|Prettytable)\}\}/i,
			replace: 'class="wikitable"',
			num: 1
		}, {
			name: 'class="wikitable" 2',
			find: /(class *= *"?)prettytable([^a-z])/,
			replace: '$1wikitable$2',
			num: 1
		}, {
			name: 'class="wikitable" 3',
			find: /\{\{(Tabela bonita\-sorteável|tabelabonita organizável)\}\}/i,
			replace: 'class="wikitable sortable"',
			num: 1
		}]
	}]
}, {
	enabled: false,
	name: 'Modo revisão',
	find: '',
	replace: '',
	num: 1,
	ifnot: /(\{\{desambiguação\}\}|\[\[Categoria:Desambiguaç(ão|ões))/i,
	sub: [{
		name: 'Categorizando',
		find: '',
		replace: '',
		num: 1,
		ifnot: '[[Categoria:', // FIXME: /[[Categoria:/i ?
		sub: [{
			name: '+cat do tipo Arte',
			find: '',
			replace: '',
			num: 1,
			sub: [{
				name: '+cat Música',
				find: '░',
				replace: '┼Categoria:Música]]\n░',
				num: 1,
				ifhas: /(\{\{Info\/(música|Single|Turnê|Álbum)|\{\{Portal3.*\|Música|'''"* *(é|foi)? *(o|a|uma?)? *([^ ]*) *\[?\[?(álbum|banda|canção|disco|dj|single|turne)|▓[^╦]+\((álbum|banda|canção|disco|dj|single|turne)|Faixas do disco|é [ao] [0-9]° (álbum|banda|canção|disco|dj|single|turne))/i,
				ifnot: /\[\[Categoria:/i
			}, {
				name: '+cat Literatura',
				find: '░',
				replace: '┼Categoria:Literatura]]\n░',
				num: 1,
				ifhas: /\{\{Info\/Livro/i,
				ifnot: /\[\[Categoria:/i
			}, {
				name: '+cat Televisão',
				find: '░',
				replace: '┼Categoria:Televisão]]\n░',
				num: 1,
				ifhas: /(\{\{Info\/Televisão|\{\{Esboço\-tv|▓[^╦]+\((novela))/i,
				ifnot: /\[\[Categoria:/i
			}, {
				name: '+cat Jogos eletrônicos',
				find: '░',
				replace: '┼Categoria:Jogos eletrônicos]]\n░',
				num: 1,
				ifhas: /(\{\{(Info\/Jogo|Infobox VG)|\{\{Portal3.*\| *Games)/,
				ifnot: /\[\[Categoria:/
			}, {
				name: '+cat Cinema',
				find: '░',
				replace: '┼Categoria:Cinema]]\n░',
				num: 1,
				ifhas: /(\{\{(Info\/Filme|Info\/Cineasta)[ \|\]\r\n]|\{\{Portal3.*\| *Cinema|▓[^╦]+\(filme|'''''\) é (um)? *filme)/i,
				ifnot: /\[\[Categoria:/i
			}, {
				name: '+cat Banda desenhada',
				find: '░',
				replace: '┼Categoria:Banda desenhada]]\n░',
				num: 1,
				ifhas: /\{\{(Info\/Graphic Novel|Esboço\-bd|Portal BD|Portal3.*\| *Banda desenhada)/i,
				ifnot: /\[\[Categoria:/i
			}, {
				name: '+cat Arte',
				find: '░',
				replace: '┼Categoria:Arte]]\n░',
				num: 1,
				ifhas: /(\{\{Info\/(Bleach|Naruto)|\{\{Portal3.*\| *Animangá|▓[^╦]+\((Lista de episódios)|Sinopse|Episódios *==|== *Atore?s?)/i,
				ifnot: /(\[\[Categoria:|┼)/i
			}]
		}, {
			name: '+cat Desportos',
			find: '░',
			replace: '┼Categoria:Desportos]]\n░',
			num: 1,
			ifhas: /(\{\{ *Portal3.*\| *(Wrestling|Desporto|Futebol)|\{\{Info\/Campeonato de futebo)/i,
			ifnot: /\[\[Categoria:/i
		}, {
			name: '+cat Biografia',
			find: '░',
			replace: '┼Categoria:Pessoas]]\n░',
			num: 1,
			ifhas: /(%%title%%(''')? [\(\,]? *\[?\[?([0-9]{1,2} de |(nascid[ao]|nasceu)|(Rio de Janeiro|São Paulo))|║== Biografia ==)/i,
			ifnot: /\[\[Categoria:/i
		}, {
			name: 'Rule',
			find: '┼',
			replace: '[[',
			num: 1
		}]
	}]
},

{
	name: 'Modo bot',
	find: '*****\nRegras bem testadas e que não possuem erros\n podendo ser usadas por bots\n\nNão necessitam de revisão\n*****',
	replace: '',
	num: 1,
	ifnot: /(\{\{desambiguação\}\}|\[\[Categoria:Desambiguaç(ão|ões))/i,
	sub: [{
		name: 'Geral 1',
		find: '',
		replace: '',
		num: 1,
		sub: [{
			name: '<br />',
			find: '',
			replace: '',
			num: 100,
			ifhas: /<\/? *br *\/?\>/i,
			sub: [{
				name: '<br /> em predef - remove br',
				find: /(\n *\| *[^=\n]+=.*)<br \/>\r?\n( *\|)/i,
				replace: '$1\n$2',
				num: 100
			}, {
				name: '<br /> em predef - remove \n',
				find: /(\n *\| *[^=\n]+=.*)<br \/>\r?\n/i,
				replace: '$1&lt;br /&gt;',
				num: 10
			}, {
				name: '<br /> duplo',
				find: /(\n *[^ \|].*)<br \/><br \/>/i,
				replace: '$1&lt;br /&gt;',
				num: 100
			}, {
				name: 'Trimming antes de <br />',
				find: / +<br \/>/i,
				replace: '&lt;br /&gt;',
				num: 100
			}, {
				name: '<br /> entre quebra de linha',
				find: /(\r?\n)+<br \/>(\r?\n)+/i,
				replace: '\n\n',
				num: 100
			}, {
				name: '<br /> entre <p>',
				find: /(<\/?p>)<br \/>(<\/?p>)/i,
				replace: '$1\n\n$2',
				num: 1
			}, {
				name: 'Rule',
				find: /<br \/>\r?\n([^\r?\n])/i,
				replace: '\n\n$1',
				num: 10
			}, {
				name: 'Rule',
				find: /<br \/>\r?\n\r?\n/i,
				replace: '\n\n',
				num: 10
			}, {
				name: '<br /> antes predef',
				find: /<br \/>(\r?\n)+\{\{/i,
				replace: '\n\n{{',
				num: 100
			}, {
				name: '<br /> antes lista',
				find: /<br \/>\r?\n([\*\#])/i,
				replace: '\n$1',
				num: 100
			}, {
				name: '<br />]]',
				find: /<br \/>(▒?)\]\]/i,
				replace: '$1]]',
				num: 1
			}, {
				name: '\n<br />',
				find: /([^\n])(\r?\n)+<br \/>/i,
				replace: '$1\n\n',
				num: 10
			}, {
				name: '<br /> fim de lista',
				find: /(\n\*.*)<br \/>(\r?\n)/,
				replace: '$1\n',
				num: 10
			}, {
				name: '<br /> no final do link / linktext',
				find: /<br \/>(\||\]\])/i,
				replace: '$1',
				num: 10
			}]
		}, {
			name: 'Tags g1',
			find: '',
			replace: '',
			num: 1,
			ifhas: '&lt;',
			sub: [{
				name: 'Fechamento errado',
				find: '',
				replace: '',
				num: 1,
				sub: [{
					name: '<small />',
					find: /<small \/>/i,
					replace: '&lt;/small&gt;',
					num: 10
				}]
			}, {
				name: 'Tag vazia',
				find: '',
				replace: '',
				num: 1,
				sub: [{
					name: 'tag abre-fecha',
					find: /<([^\>\n\/]+)> *(?:\r?\n)* *<\/\1>/i,
					replace: '',
					num: 10
				}, {
					name: '<div></div>',
					find: /<div[^<>\n\/]*> *(?:\r?\n)* *<\/div>/i,
					replace: '',
					num: 10
				}]
			}, {
				name: 'Tag duplicada',
				find: '',
				replace: '',
				num: 1,
				sub: [{
					// Nem sempre é para juntar, como em &lt;ref&gt;.
					enabled: false,
					name: 'tag fecha - abre',
					find: /<\/([^<>\n]+)> *(?:\r?\n)* *<\1>/i,
					replace: '',
					num: 10
				}, {
					name: '</small></small>',
					find: /<\/small> *(?:\r?\n)* *<\/small>/i,
					replace: '&lt;/small&gt;',
					num: 1
				}]
			}, {
				name: 'Tag sem início',
				find: '',
				replace: '',
				num: 1,
				sub: [{
					name: '</div>',
					find: /<\/div>/i,
					replace: '',
					num: 10,
					ifnot: '&lt;div' // FIXME: /&lt;div/i ?
				}, {
					name: '</gallery>',
					find: /<\/gallery>/i,
					replace: '',
					num: 10,
					ifnot: '&lt;gallery' // FIXME: /&lt;gallery/i ?
				}]
			}, {
				name: 'Tag sem fim',
				find: '',
				replace: '',
				num: 1,
				sub: [{
					name: '<center>',
					find: /(\n *\| *<center>[^<>\n]*)(\r?\n *\|)/i,
					replace: '$1&lt;/center&gt;$2',
					num: 10
				}, {
					name: '<pre>',
					find: /<pre>/i,
					replace: '',
					num: 1,
					ifnot: '&lt;/pre&gt;' // FIXME: /&lt;/pre&gt;/i ?
				}, {
					name: '</small>',
					find: '',
					replace: '',
					num: 1
				}]
			}, {
				name: '<i>',
				find: /<\/? *i *\/?\>/i,
				replace: '\'\'',
				num: 10
			}, {
				name: '<b> e <strong>',
				find: /<\/? *(b|strong) *\/?\>/i,
				replace: '\'\'\'',
				num: 10
			}, {
				name: '<p>',
				find: '',
				replace: '',
				num: 100,
				ifhas: '&lt;p&gt;', // FIXME: /&lt;p&gt;/i ?
				sub: [{
					name: '<p> 1',
					find: /<p>/i,
					replace: '&lt;br /&gt;',
					num: 10,
					where: 'templates'
				}, {
					name: '<p> 2',
					find: /<\/p>/i,
					replace: '',
					num: 9,
					where: 'templates'
				}, {
					name: '<p> 3',
					find: /<\/? *p *\/?\>/i,
					replace: '\n\n',
					num: 10
				}, {
					name: '<p align="justify">',
					find: /<p align="justify">/i,
					replace: '',
					num: 100
				}, {
					name: '\n\n\n+',
					find: /(\r?\n){3,}/i,
					replace: '\n\n',
					num: 10
				}]
			}, {
				name: '<small>',
				find: '',
				replace: '',
				num: 1,
				sub: [{
					name: 'Marca <small>',
					find: /<small>/i,
					replace: '┼',
					num: 100
				}, {
					name: 'Marca </small>',
					find: /<\/small>/i,
					replace: '┤',
					num: 100
				}, {
					name: '<small> em ref/sup/sub/ficheiro',
					find: '',
					replace: '',
					num: 10,
					ifhas: '&lt;small&gt;', // FIXME: /&lt;small&gt;/i ?
					sub: [{
						name: 'small duplo',
						find: /┼(┼[^┤]*┤)┤/i,
						replace: '$1',
						num: 100
					}, {
						name: '<small> para dentro de ref/sup/sub',
						find: /┼ *(<ref[^>]*>|<sup>|<sub>)/i,
						replace: '$1┼',
						num: 1
					}, {
						name: '</small> para dentro de ref/sup/sub',
						find: /(<ref[^>\n]*>|<sup>|<sub>)┼([^\n┤]*)(<\/ref>|<\/sup>|<\/sub&gt;)┤/i,
						replace: '$1┼$2┤$3',
						num: 1
					}, {
						name: '<small> em ref/sup/sub substitui',
						find: /(<ref[^\/\n\>]*>|<sup>|<sub>)([^┼<]*)┼([^┤<]*)┤/i,
						replace: '$1$2$3',
						num: 10
					}, {
						name: '<small> em Ficheiro',
						find: /(╠[^┼\n▒]*)┼([^┤\n▒]*)┤([^▒\n]*)▒/i,
						replace: '$1$2$3▒',
						num: 10,
						ifhas: /╠.*┼/i
					}]
				}, {
					name: 'Desmarca <small>',
					find: '┼',
					replace: '&lt;small&gt;',
					num: 10
				}, {
					name: 'Desmarca </small>',
					find: '┤',
					replace: '&lt;/small&gt;',
					num: 10
				}]
			}, {
				name: '<br />}}',
				find: / *<br \/> *(\r?\n)* *(╣?)\}\}/i,
				replace: '\n$1}}',
				num: 10,
				sub: [{
					name: 'big',
					find: '',
					replace: '',
					num: 1,
					ifhas: '&lt;big&gt;',
					sub: [{
						name: '<big> dentro predef',
						find: /<\/?big>/i,
						replace: '',
						num: 1,
						where: 'templates'
					}, {
						name: 'Rule',
						find: /; *<big>([^\r\n<>]*)<\/big>/i,
						replace: '; $1',
						num: 1
					}, {
						name: 'Rule',
						find: /'''<big>([^\r\n<>]*)<\/big>'''/i,
						replace: '\'\'\'$1\'\'\'',
						num: 1
					}, {
						name: 'Rule',
						find: /<big>'''([^\r\n<>]*)'''<\/big>/i,
						replace: '\'\'\'$1\'\'\'',
						num: 1
					}]
				}]
			}, {
				name: '<span>',
				find: '',
				replace: '',
				num: 1,
				sub: [{
					name: '<span class="plainlinks">',
					find: /<span class="plainlinks">([^\n<>]*)<\/span>/i,
					replace: '$1',
					num: 1
				}]
			}]
		}, {
			name: '----',
			find: '',
			replace: '',
			num: 1,
			sub: [{
				name: '---- antes de infobox',
				find: /\n\-{3,}\r?\n\{\{Info\//i,
				replace: '\n{{Info/',
				num: 1
			}]
		}, {
			name: 'Elemento de programação de predef',
			find: '',
			replace: '',
			num: 1,
			ifhas: '{{',
			sub: [{
				name: 'Rule',
				find: /\{\{subst:\}\}/i,
				replace: '',
				num: 1
			}, {
				name: '{{{xxx|yyy}}}',
				find: /\{\{\{[^\|\{\}\n]+\|([^\|\{\}\n]*)\}\}\}/i,
				replace: '$1',
				num: 100
			}, {
				name: '{{PAGENAME',
				find: /\{\{(PAGENAME|SUBPAGENAME|FULLPAGENAME|BASEPAGENAME|SITENAME|NAMESPACE)/,
				replace: '{{subst:$1',
				num: 1
			}, {
				name: '{{CURRENT',
				find: /\{\{CURRENT(DAY|MONTH|YEAR|MONTHNAME)\}\}/,
				replace: '{{subst:CURRENT$1}}',
				num: 1
			}, {
				name: 'ParserFunctions',
				find: /\{\{#(if|ifeq|iferror|ifexist|switch|ifexpr|expr):/i,
				replace: '{{subst:#$1:',
				num: 1
			}, {
				name: 'case',
				find: /\{\{#(lc|uc|lcfirst|ucfirst):/i,
				replace: '{{subst:#$1:',
				num: 1
			}, {
				name: '[[{{CURRENTYEAR}}|atual]]',
				find: '[[{{subst:CURRENTYEAR}}|atual]]',
				replace: 'atual',
				num: 10
			}]
		}, {
			name: '{{Sinopse}}',
			find: /\{\{Sinopse\}\}/i,
			replace: 'Sinopse',
			num: 1
		}, {
			name: 'Ligações externas',
			find: '',
			replace: '',
			num: 1,
			sub: [{
				enabled: false,
				name: 'Itálico fora',
				find: /([^'"])("|'+)\[(http:[^ \n]*) ([^\]\n]*)\]("|'+)([^'"])/i,
				replace: '$1[$3 $2$4$5]$6',
				num: 10
			}]
		}, {
			name: 'Ligações internas',
			find: '',
			replace: '',
			num: 1,
			ifhas: /\[\[/i,
			sub: [{
				name: 'Data - mês',
				find: /\[\[((?:jan|fever)eiro|março|abril|maio|ju[nl]ho|agosto|(?:setem|outu|novem|dezem)bro)\]\]/i,
				replace: '$1',
				num: 1
			}, {
				name: '[[w:pt:',
				find: /\[\[:?(?:w:)?pt:/i,
				replace: '[[',
				num: 1
			}]
		}, {
			name: 'Comentário sem fechamento',
			find: /╔([^╔╗░]*)([╔░])/,
			replace: '╔$1╗$2',
			num: 1
		}, {
			name: 'Predefs',
			find: '',
			replace: '',
			num: 1,
			sub: [{
				name: 'Rule',
				find: /<br \/>\r?\n\|/i,
				replace: '\n|',
				num: 10,
				where: 'templates'
			}]
		}, {
			name: 'Erro em { [ (',
			find: '',
			replace: '',
			num: 1,
			sub: [{
				name: 'Ligações internas',
				find: '',
				replace: '',
				num: 1,
				ifhas: '[[', // FIXME: /[[/i ?
				sub: [{
					name: '|]]',
					find: /\|(▒?)\]\]/i,
					replace: '$1]]',
					num: 10
				}, {
					name: 'Arrumando [[ ]] quebrado',
					find: '',
					replace: '',
					num: 1,
					ifnot: /(<(blockquote|code|gallery|math|timeline|pre|poem|nowiki|quote|source)|\{\{(Citação|Quim))/i,
					sub: [{
						name: '[[ ]',
						find: /([^\[])\[\[([^\[\]\{\}\r\n]+)\]([^\]])/i,
						replace: '$1[[$2]]$3',
						num: 10
					}, {
						name: '[[[',
						find: /([^\[])\[\[\[([^\[])/i,
						replace: '$1[[$2',
						num: 10
					}, {
						name: '[]',
						find: '[]',
						replace: '',
						num: 1
					}, {
						name: ']]]]',
						find: ']]]]',
						replace: ']]',
						num: 1
					}]
				}, {
					name: '[[xxx||yyy]]',
					find: /(\[\[[^\|\n\[\]]+\|) *\|([^\|\n\[\]]+\]\])/i,
					replace: '$1$2',
					num: 10
				}]
			}, {
				name: 'Parênteses errados',
				find: '',
				replace: '',
				num: 1,
				ifnot: /(<(blockquote|code|gallery|math|timeline|pre|poem|nowiki|quote|source)|\{\{(Citação|Quim))/i,
				sub: [{
					name: '()',
					find: '',
					replace: '',
					num: 1
				}]
			}, {
				name: 'Chaves erradas',
				find: '',
				replace: '',
				num: 1,
				ifhas: /\{\{/i,
				sub: [{
					name: '{{ }',
					find: /([^{])\{\{([^{}\r\n]+)\}([^}])/i,
					replace: '$1{{$2}}$3',
					num: 1
				}]
			}]
		}]
	}, {
		name: 'Parte sup',
		find: '',
		replace: '',
		num: 1,
		ifnot: /▓(Wikipedia|Ficheiro|MediaWiki|Predefinição|Ajuda|Categoria|Portal)( Discussão)?:/i,
		sub: [{
			name: 'Desambig',
			find: '',
			replace: '',
			num: 1,
			sub: [{
				name: '{{Desambigexplicada2}}',
				find: /\{\{Desambigexplicada2\|([^\|\{\}\n]+)\|([^\{\}\n]+)\}\}/i,
				replace: '{{Ver desambig| $2| este=$1}}',
				num: 1
			}, {
				name: '{{Desambigexplicada}}',
				find: /\{\{Desambigexplicada\|([^\|\{\}\n]+)\|([^\|\{\}\n]+)\}\}/i,
				replace: '{{Ver desambig|| $2| este=$1}}',
				num: 1
			}, {
				name: '{{Outrosusos|xxx}}',
				find: /\{\{Outrosusos\|([^\|\{\}\n]+)\}\}/i,
				replace: '{{Ver desambig||$1}}',
				num: 1
			}, {
				name: '{{Outrosusos}}',
				find: /\{\{Outrosusos\}\}/i,
				replace: '{{Ver desambig}}',
				num: 1
			}, {
				name: '{{Redirect|3=xxx}}',
				find: /\{\{Redirect\|([^\|\{\}\n]+)\|([^\|\{\}\n]+)\|([^\|\{\}\n]+)\}\}/i,
				replace: '{{Ver desambig |redir=$1|1=$2|2=$3}}',
				num: 1
			}, {
				name: '{{Redirect}}',
				find: /\{\{Redirect\|([^\|\{\}\n]+)\|([^\|\{\}\n]+)\}\}/i,
				replace: '{{Ver desambig |redir=$1|1=$2|2=$1 (desambiguação)}}',
				num: 1
			}, {
				name: '{{Ver desambiguação2|4=xxx}}',
				find: /\{\{Ver desambiguação2\|([^\|\{\}\n]+)\|([^\|\{\}\n]+)\|([^\|\{\}\n]+)\|([^\|\{\}\n]+)\}\}/i,
				replace: '{{Ver desambig| $2| $3| este=$1| ou=$4}}',
				num: 1
			}, {
				name: '{{Ver desambiguação2}}',
				find: /\{\{Ver desambiguação2\|([^\|\{\}\n]+)\|([^\{\}\n]+)\}\}/i,
				replace: '{{Ver desambig| $2| este=$1}}',
				num: 1
			}, {
				name: '{{Minidesambig}}',
				find: /\{\{Minidesambig\|([^\{\}\n]+)\}\}/i,
				replace: '{{Ver desambig |prefixo=Se procura|$1}}',
				num: 1
			}]
		}, {
			name: 'Predefs sup',
			find: '',
			replace: '',
			num: 1,
			sub: [{
				name: 'Desambig',
				find: '',
				replace: '',
				num: 1,
				sub: [{
					name: '{{Ver desambiguação2}}',
					find: /\:+\'+(''Nota *\: *''')?Este artigo é sobre ([^\.\n]+)\. Se procura ([^\,\n]+), consulte \[\[([^\]\.\n]+)\]\]\.( Para outros significados, consulte )?\[?\[?\n([^\]\.\n]+)?\]?\]?\.?\'+\r?\n/i,
					replace: '{{Ver desambiguação2|$2|$3|$4|$6}}\n',
					num: 1
				}, {
					name: '{{Ver desambiguação}}',
					find: /\:+\'+(''Nota *\: *''')?Para outros significados( de )?([^\,\n]+)?, (ver|veja) \[\[([^\(\[\]\'\n]+) \(desambiguação\)\]\]\'+\r?\n/i,
					replace: '{{Ver desambiguação|$3|$5 (desambiguação)}}\n',
					num: 1
				}, {
					name: '{{Desambigexplicada2}}',
					find: /\:+\'+(''Nota *\: *''')?Esta página é sobre ([^\.\n]+)\. Se procura ([^\,\n]+), consulte \[\[([^\[\]\n]+)\]\]\.?\'+\.?\r?\n/i,
					replace: '{{Desambigexplicada2|$2|$3|$4}}\n',
					num: 1
				}, {
					name: '{{Desambigexplicada}}',
					find: /\:+\'+(''Nota *\: *''')?Esta página é sobre ([^\.\n]+)\. Se procura outros significados da mesma expressão, consulte \[\[([^\[\]\n]+)\]\]\.?\'+\.?\r?\n/i,
					replace: '{{Desambigexplicada|$2|$3}}\n',
					num: 1
				}, {
					name: '{{Minidesambig}}',
					find: /\:+\'+(''Nota *\: *''')?Se procura ([^\,\n]+), consulte\: \[\[([^\[\]\n]+)\]\]. Ainda, se procura ([^\,\n]+), consulte: \[\[([^\[\]\n]+)\]\]\.?\'+\.?\r?\n/i,
					replace: '{{Minidesambig2|$2|$3|$4|$5}}\n',
					num: 1
				}, {
					name: '{{Minidesambig}}',
					find: /\:+\'+(''Nota *\: *''')?Se procura ([^\,\n]+), consulte \[\[([^\[\]\n]+)\]\]\.?\'+\.?\r?\n/i,
					replace: '{{Minidesambig|$2|$3}}\n',
					num: 1
				}, {
					name: '{{Desambiguação-redirect}}',
					find: /\:+\'+(''Nota *\: *''')?Se foi (\[\[Wikipedia\:Redirecionamento\|)?redirecionado(\]\])? para esta página e não é a que procura, consulte\: \[\[([^\[\]\n]+)\]\]\.?\'+\.?\r?\n/i,
					replace: '{{Desambiguação-redirect|$4}}\n',
					num: 1
				}, {
					name: '{{Não confundir com}}',
					find: /\:+\'+(''Nota *\: *''')?Não confundir com \[\[([^\[\]\n]+)\]\]\.?\'+\.?\r?\n/i,
					replace: '{{Não confundir com|$2}}\n',
					num: 1
				}, {
					name: '{{Outrosusos}}',
					find: /\:+\'+(''Nota *\: *''')?Para outros usos deste termo, (veja|ver) \[\[([^\[\]\n]+) \(desambiguação\)\]\]\.?\'+\.?\r?\n/i,
					replace: '{{Outrosusos|$3}}',
					num: 1
				}]
			}]
		}, {
			name: 'Tag man sup',
			find: '',
			replace: '',
			num: 1,
			sub: [{
				name: '{{Sem-fontes|Este artigo',
				find: /(\{\{Sem-fontes)\|Este artigo([\|\}])/i,
				replace: '$1$2',
				num: 1
			}, {
				name: '{{Sem infocaixa}}',
				find: /╦/i,
				replace: '╦\n{{sem infocaixa}}',
				num: 1,
				ifhas: /(\[\[Categoria:((Aldeia|Bailiado|Bairro|Beatos|Borough|Cantão|Cidade|Circunscrição|Comuna|Condado|Concelho|Departamento|Distrito|Estado|Freguesia|Município|Periferia|Posto administrativo|Povoação|Povoado|Prefeitura|Província|Território|Unidade Residencial|Vila|Voivodia)s?|Bandas|Castelos|Filmes|Jogos|Jornais|Livros|Revistas|Santos|Singles|Associaç(ão|ões))[ \|\]][^ ])/i,
				ifnot: /(\n *\| *(nome|local|país|nascimento|site)|\{\{Sem infocaixa|\| \]\]|\{\{Info\/)/i
			}, {
				name: '{{Sem infocaixa}}',
				find: '',
				replace: '',
				num: 1,
				ifhas: /\{\{sem infocaixa\}\}/i,
				ifnot: /\{\{Info/i,
				sub: [{
					name: '{{sem infocaixa|Livro}}',
					find: /\{\{Sem infocaixa\}\}/i,
					replace: '{{sem infocaixa|Livro}}',
					num: 1,
					ifhas: /\[\[Categoria:Livros[ \|\]][^ ]/i
				}, {
					name: '{{Sem infocaixa|Jogo}}',
					find: /\{\{Sem infocaixa\}\}/i,
					replace: '{{sem infocaixa|Jogo}}',
					num: 1,
					ifhas: /\[\[Categoria:Jogos[ \|\]][^ ]/i
				}, {
					name: '{{Sem infocaixa|Assentamento}}',
					find: /\{\{Sem infocaixa\}\}/i,
					replace: '{{sem infocaixa|Assentamento}}',
					num: 1,
					ifhas: /\[\[Categoria:Bairros (extintos|não oficiais)? ?d.[ \|\]][^ ]/i
				}, {
					name: '{{Sem infocaixa|Organização}}',
					find: /\{\{Sem infocaixa\}\}/i,
					replace: '{{Sem infocaixa|Organização}}',
					num: 1,
					ifhas: /\[\[Categoria:Associaç(ão|ões)[ \|\]]/i
				}, {
					name: '{{Semfichatécnica}}',
					find: /\{\{Sem infocaixa\}\}/i,
					replace: '{{semfichatécnica}}',
					num: 1,
					ifhas: /\[\[Categoria:Filmes[ \|\]]/i,
					ifnot: /\{\{Semfichatécnica/i
				}]
			}, {
				name: 'Ajustes em {{Sem-fontes}}',
				find: /(\{\{Sem\-fontes[^{}\n]*)\|este artigo/i,
				replace: '$1',
				num: 1
			}, {
				name: 'Add {{Wikificação}}',
				find: '',
				replace: '',
				num: 1,
				ifnot: /\{\{Wikificação[\|}]/i,
				sub: [{
					name: '+{{Wikificação}}',
					find: '╦',
					replace: '╦\n{{Wikificação|data={{subst:CURRENTMONTHNAME}} de {{subst:CURRENTYEAR}}}}\n',
					num: 1,
					ifnot: /[^\n]\[\[/i
				}]
			}, {
				name: '{{não-enciclopédico}}',
				find: /\{\{não\-enciclopédico\}\}\r?\n/i,
				replace: '',
				num: 1
			}, {
				name: 'Rule',
				find: 'Este artigo ou se(c)ção',
				replace: '',
				num: 1
			}]
		}, {
			name: 'Introdução',
			find: '',
			replace: '',
			num: 1,
			sub: [{
				name: 'Título na introdução',
				find: /(▓([^\(╦\n]*)(?: \([^╦\n]*)?╦\r?\n[^╚]*╚)(é|são|foi|foram|era|eram) um/i,
				replace: '$1\'\'\'$2\'\'\' {{subst:lcfirst:$3}} um',
				num: 1
			}, {
				name: 'retirando negrito da infobox',
				find: /(\{\{Info[^╣]*\| *(?:título|nome|nome_do_shopping) *= *)'+([^'\r\n]+)'+\r?\n/i,
				replace: '$1$2\n',
				num: 1,
				ifhas: '╣', // FIXME: /╣/i ?
				ifnot: '{{Info/Taxonomia' // FIXME: /\{\{Info/Taxonomia/i ?
			}, {
				name: '- nascido em',
				find: /(╚[^\(╝\n]*\()nascid[ao] (?:em|n[ao]) /i,
				replace: '$1',
				num: 1
			}, {
				name: '- falecido em',
				find: /(╚[^\(╝\n]*\([^\(\)\n]+ )falec(?:id[ao]|eu) (?:em|n[ao]) /i,
				replace: '$1',
				num: 1
			}, {
				name: 'parcial',
				find: /(╚[^╝\n]+(?:foi|é) uma? )(?:célebre|famos[ao]|grande) /i,
				replace: '$1',
				num: 1
			}, {
				name: 'Rule',
				find: /(╚[^\(╝\n]*''' \(\[\[[^\[\]\n]*\]\]) em /i,
				replace: '$1, ',
				num: 1
			}]
		}, {
			name: 'Infobox',
			find: '',
			replace: '',
			num: 1,
			ifhas: /\{\{Info/i,
			sub: [{
				name: '| dos campo',
				find: '',
				replace: '',
				num: 1,
				sub: [{
					name: '| para início da linha seguinte',
					find: /(\{\{Info[^╣]*)\|\r?\n *([a-z])/i,
					replace: '$1\n |$2',
					num: 100,
					ifhas: '╣'
				}, {
					name: '| para início da linha seguinte',
					find: /(\{\{Info[^╣]*)\|\r?\n *\|/i,
					replace: '$1\n |',
					num: 100,
					ifhas: '╣'
				}, {
					name: 'espaço antes do |',
					find: /(\{\{Info[^╣]*)\r?\n\|/,
					replace: '$1\n |',
					num: 100
				}, {
					name: '| final',
					find: / *(?:\r?\n)*\| *(\r?\n)* *╣\}\}/i,
					replace: '$1╣}}',
					num: 1
				}, {
					name: '\n no primeiro campo',
					find: /(\{\{Info\/[^\n]+)(\|[^\|\n\=]*\=)/i,
					replace: '$1\n $2',
					num: 1
				}, {
					name: '| no final do primeiro campo sem \n',
					find: /(\{\{Info\/[^\n\|\=]+\|[^\n\=]+[^\| ])\r?\n/i,
					replace: '$1 |\n',
					num: 1
				}]
			}, {
				name: 'Quebra de linha em Infobox',
				find: '',
				replace: '',
				num: 1,
				sub: [{
					name: 'Quebra de linha após infobox (-)',
					find: /╣\}\}(?:\r?\n){2,}([^\r\n])/,
					replace: '╣}}\n$1',
					num: 1
				}, {
					name: 'Quebra de linha após infobox (+)',
					find: /(╣\}\})([^\r\n])/i,
					replace: '$1\n$2',
					num: 1
				}, {
					name: '}}{{Info/',
					find: /╣\}\} *\{\{Info\//,
					replace: '}}\n{{Info/',
					num: 1
				}, {
					name: 'Antes de {{Info',
					find: /(?:\r?\n){2,}\{\{Info\//,
					replace: '\n{{Info/',
					num: 1
				}, {
					name: 'antes do final da info',
					find: /([^\r\n])(?:\r?\n){2,}╣\}\}/i,
					replace: '$1\n╣}}',
					num: 1
				}, {
					name: '{{Infobox animangá/Rodapé}}',
					find: /\{\{Infobox animangá\/Rodapé\r?\n╣\}\}/i,
					replace: '{{Infobox animangá/Rodapé╣}}',
					num: 1
				}]
			}, {
				name: 'Código em todo campo',
				find: '',
				replace: '',
				num: 1,
				sub: [{
					name: '<small> em infobox',
					find: /(\{\{Info[^╣]*\| *[^=\r\n{}]* *= *)<small>([^<>\n]*)<\/small>\r?\n/i,
					replace: '$1$2\n',
					num: 10,
					ifhas: '╣'
				}, {
					name: 'negrito em infobox',
					find: /(\{\{Info[^╣]*\| *[^=\r\n{}]* *= *)\'\'\'([^\'\n]*)\'\'\'\r?\n/i,
					replace: '$1$2\n',
					num: 10
				}]
			}, {
				name: 'padronizando campos',
				find: '',
				replace: '',
				num: 1,
				sub: [{
					name: 'minúscula',
					find: '',
					replace: '',
					num: 1,
					ifhas: /╣/i,
					sub: [{
						name: 'A',
						find: /(\{\{Info\/(?:Álbum)[^╣]*\n *\| *)A/,
						replace: '$1a',
						num: 100
					}, {
						name: 'B',
						find: /(\{\{Info\/(?:Álbum)[^╣]*\n *\| *)B/,
						replace: '$1b',
						num: 100
					}, {
						name: 'C',
						find: /(\{\{Info\/(?:Álbum)[^╣]*\n *\| *)C/,
						replace: '$1c',
						num: 100
					}, {
						name: 'D',
						find: /(\{\{Info\/(?:Álbum)[^╣]*\n *\| *)D/,
						replace: '$1d',
						num: 100
					}, {
						name: 'E',
						find: /(\{\{Info\/(?:Álbum)[^╣]*\n *\| *)E/,
						replace: '$1e',
						num: 100
					}, {
						name: 'F',
						find: /(\{\{Info\/(?:Álbum)[^╣]*\n *\| *)F/,
						replace: '$1f',
						num: 100
					}, {
						name: 'G',
						find: /(\{\{Info\/(?:Álbum)[^╣]*\n *\| *)G/,
						replace: '$1g',
						num: 100
					}, {
						name: 'I',
						find: /(\{\{Info\/(?:Álbum)[^╣]*\n *\| *)I/,
						replace: '$1i',
						num: 100
					}, {
						name: 'L',
						find: /(\{\{Info\/(?:Álbum)[^╣]*\n *\| *)L/,
						replace: '$1l',
						num: 100
					}, {
						name: 'M',
						find: /(\{\{Info\/(?:Álbum)[^╣]*\n *\| *)M/,
						replace: '$1m',
						num: 100
					}, {
						name: 'N',
						find: /(\{\{Info\/(?:Álbum)[^╣]*\n *\| *)N/,
						replace: '$1n',
						num: 100
					}, {
						name: 'P',
						find: /(\{\{Info\/(?:Álbum)[^╣]*\n *\| *)P/,
						replace: '$1p',
						num: 100
					}, {
						name: 'S',
						find: /(\{\{Info\/(?:Álbum)[^╣]*\n *\| *)S/,
						replace: '$1s',
						num: 100
					}, {
						name: 'T',
						find: /(\{\{Info\/(?:Álbum)[^╣]*\n *\| *)T/,
						replace: '$1t',
						num: 100
					}, {
						name: 'Ú',
						find: /(\{\{Info\/(?:Álbum)[^╣]*\n *\| *)Ú/,
						replace: '$1ú',
						num: 100
					}, {
						name: 'V',
						find: /(\{\{Info\/(?:Álbum)[^╣]*\n *\| *)V/,
						replace: '$1v',
						num: 100
					}, {
						name: 'específicos',
						find: '',
						replace: '',
						num: 1,
						sub: [{
							name: 'vídeo Clipes',
							find: /(\{\{Info\/(?:Álbum)[^╣]*\n *\| *)vídeo Clipes/,
							replace: '$1vídeo clipes',
							num: 1
						}]
					}]
				}, {
					name: 'padronza |imagem_tamanho=',
					find: /(\{\{Info\/[^╣]*\| *)(?:(imagem|img)[\-_ ](?:size|tamanho|tam)|tamanho[\-_ ](?:imagem|img)|res_img) *= */i,
					replace: '$1imagem_tamanho   = ',
					num: 1
				}, {
					name: 'padribuza |imagem_legenda=',
					find: /(\{\{Info\/[^╣]*\| *)((?:nome|legenda)[\-_]img|img[ \-_]des|descr) *= */i,
					replace: '$1imagem_legenda   = ',
					num: 1,
					ifhas: '╣'
				}, {
					name: 'Rule',
					find: /(\{\{Info\/[^╣]*\| *)image( *= *)/i,
					replace: '$1imagem$2',
					num: 1
				}]
			}, {
				name: 'ajustando campos',
				find: '',
				replace: '',
				num: 1,
				sub: [{
					name: '{{dni | si}}',
					find: /(\{\{Info\/[^╣]*\| *nascimento_data *= *)(?:\[\[([1-3]?[0-9]) de ([^\[\]\n]+)\]\] de )?\[\[([0-9]{3,4})\]\]\r?\n/i,
					replace: '$1{{dni|$2|{{subst:Mês2número|$3}}|$4|si}}\n<',
					num: 1,
					ifhas: '{{falecimento|' // FIXME: /\{\{falecimento|/i ?
				}, {
					name: '{{dni}}',
					find: /(\{\{Info\/[^╣]*\| *nascimento_data *= *)(?:\[\[([1-3]?[0-9]) de ([^\[\]\n]+)\]\] de )?\[\[([0-9]{3,4})\]\]\r?\n/i,
					replace: '$1{{dni|$2|{{subst:Mês2número|$3}}|$4}}\n',
					num: 1
				}, {
					name: 'url em campo imagem de predef',
					find: /((?:\r?\n)* *\| *)(imagem?|img|foto)( *\= *)\[?https?:\/\/.*\r?\n/i,
					replace: '$1$2$3\n',
					num: 10,
					where: 'templates'
				}, {
					name: '{{dni}} sem idade',
					find: /(\{\{dni[^{}]+)\}\}/i,
					replace: '$1|sem idade}}',
					num: 1,
					ifhas: /\{\{(falecimento|morte)/i,
					ifnot: /\{\{dni[^\{\}]*(sem idade|si)\}\}/i
				}, {
					name: '??? em infobox',
					find: /(\n *\|[^\=\n]+=.*)(?:\?+|Desconhecid[aos]+)([\r\n][^╣]*╣)/i,
					replace: '$1$2',
					num: 100
				}, {
					name: 'imagem = xxx|thumb',
					find: /(\| *imagem *= *[^\|\n]+)\|thumb([\|\r\n])/i,
					replace: '$1$2',
					num: 1
				}]
			}, {
				name: 'espaço dos campos',
				find: '',
				replace: '',
				num: 1,
				ifhas: '╣',
				sub: [{
					name: 'espaço 6',
					find: /(\{\{Info\/[^╣]*\n *\| *[^ ]{1,1}) {0,5}=/i,
					replace: '$1      =',
					num: 100,
					ifhas: '╣'
				}, {
					name: 'espaço 5',
					find: /(\{\{Info\/[^╣]*\n *\| *[^ ]{2,2}) {0,4}=/i,
					replace: '$1     =',
					num: 100
				}, {
					name: 'espaço 4',
					find: /(\{\{Info\/[^╣]*\n *\| *[^ ]{3,3}) {0,3}=/i,
					replace: '$1    =',
					num: 100
				}, {
					name: 'espaço 3',
					find: /(\{\{Info\/[^╣]*\n *\| *[^ ]{4,4}) {0,2}=/i,
					replace: '$1   =',
					num: 100
				}, {
					name: 'espaço 2',
					find: /(\{\{Info\/[^╣]*\n *\| *[^ ]{5,5}) {0,1}=/i,
					replace: '$1  =',
					num: 100
				}, {
					name: 'espaço 1',
					find: /(\{\{Info\/[^╣]*\n *\| *[^ ]{6,6})=/i,
					replace: '$1 =',
					num: 100
				}, {
					name: 'espaço após =',
					find: /(\{\{Info\/[^╣]*\n *\| *[^=╣]+)=([^ \r\n])/i,
					replace: '$1= $2',
					num: 100
				}]
			}]
		}]
	}, {
		name: 'Parte cen',
		find: '',
		replace: '',
		num: 1,
		sub: [{
			name: 'Ligações internas',
			find: '',
			replace: '',
			num: 1,
			sub: [{
				name: 'Redirects',
				find: '',
				replace: '',
				num: 1,
				ifhas: '[[', // FIXME: /[[/i ?
				sub: [{
					name: 'Estados Unidos da América',
					find: '[[Estados Unidos da América|',
					replace: '[[Estados Unidos|',
					num: 1
				}, {
					name: 'Rule',
					find: '[[Estados Unidos|Estados Unidos]]',
					replace: '[[Estados Unidos]]',
					num: 1
				}]
			}, {
				name: 'url pt.wikipedia -> link interno',
				find: /\[http:\/\/pt\.wikipedia\.org\/wiki\/([^ ]+) ([^\[\]\n]+)\]/i,
				replace: '[[$1|$2]]',
				num: 1
			}]
		}, {
			name: 'Msg oculta',
			find: '',
			replace: '',
			num: 1,
			ifhas: '╔', // FIXME: /╔/i ?
			sub: [{
				name: 'iw / cat',
				find: /<!\-\-+ *(Interwiki|Categorias)? *\-+\->/i,
				replace: '',
				num: 100
			}, {
				name: '<!--Escreva abaixo da linha!-->',
				find: /╔\-* *Escreva abaixo da linha! *\-*╗/i,
				replace: '',
				num: 1
			}, {
				name: 'MANUTENÇÃO',
				find: /╔\-* *MANUTENÇÃO.*\-*╗/i,
				replace: '',
				num: 1
			}, {
				name: 'Img invisível',
				find: /╔\-* *╠[^▒\n]+▒\]\] *.{0,3} *\-*╗/i,
				replace: '',
				num: 1
			}, {
				name: 'Bot generated title',
				find: /╔\-* Bot generated title *\-*╗/i,
				replace: '',
				num: 10
			}, {
				name: 'Título gerado por robô',
				find: /╔\-* Título gerado por robô *\-*╗/,
				replace: '',
				num: 1
			}, {
				name: '%%title%%',
				find: /╔\-* *%%title%% *\-*╗/i,
				replace: '',
				num: 100
			}, {
				name: 'PASSO 2',
				find: '╔ PASSO 2: Todos os artigos devem citar pelo menos uma fonte PUBLICADA,       ╗\n' + '╔         ESPECÍFICA, escrita por TERCEIROS para a informação, tais como um   ╗\n' + '╔         livro ou página de uma fonte reputada. Por favor forneça um URL ou  ╗\n' + '╔         ligação se quiser usar uma fonte da internet. NÓS PRECISAMOS DE     ╗\n' + '╔         SER CAPAZES DE VERIFICAR A SUA FONTE, por isso fontes como "Google" ╗\n' + '╔         "conhecimento pessoal" serão rejeitadas.                            ╗\n' + '╔         SE NÃO INCLUIR PELO MENOS UMA FONTE VÁLIDA,                         ╗\n' + '╔         O SEU ARTIGO SERÁ REJEITADO.                                        ╗\n' + '╔                                                                             ╗\n' + '╔         Por favor, adicione a(s) sua(s) fonte(s) abaixo desta linha.        ╗\n',
				replace: '',
				num: 1
			}]
		},

		{
			name: 'Predefs cen',
			find: '',
			replace: '',
			num: 1,
			sub: [{
				name: '{{Anexo}}',
				find: '',
				replace: '',
				num: 1,
				sub: [{
					name: '{{Anexo|[[Lista d',
					find: '{{Anexo|[[Lista d',
					replace: '{{Anexo|[[Anexo:Lista d',
					num: 1
				}, {
					name: 'Passando para {{Anexo}}',
					find: /\r?\n\:'*ver: *\[\[Anexo\:([^\]\n]+)\]\] para maior?e?s detalhes?\.?'*\r?\n/i,
					replace: '\n{{Anexo|[[Anexo:$1]]}}\n',
					num: 1
				}]
			}, {
				name: '{{Trivia}}',
				find: /(\n║\={2,} (?:Trivia|Curiosidades?) \={2,})(\r?\n)+([\*\#])/i,
				replace: '$1\n{{Trivia|data={{subst:CURRENTMONTHNAME}} de {{subst:CURRENTYEAR}}}}\n$3',
				num: 1
			}, {
				name: '<br clear="all">',
				find: /<br clear="all">/i,
				replace: '{{-}}',
				num: 1
			}, {
				name: '{{Artigo principal}}',
				find: /([^'])'*(?:Ver )?(?:no )?artigo principal:? *\[\[([^\[\]\r\n]+)\]\]'*([^'])/i,
				replace: '$1{{Artigo principal|[[$2]]}}$3',
				num: 1
			}]
		}, {
			name: 'Domínio Ficheiro',
			find: '',
			replace: '',
			num: 1,
			ifhas: /╠/i,
			sub: [{
				name: 'Flag of Germany 1933.svg',
				find: 'Flag of Germany 1933.svg',
				replace: 'Flag of Nazi Germany (1933-1945).svg',
				num: 10
			}, {
				name: '[[Ficheiro:',
				find: /╠[^:\n]*(?:\r?\n|[<>\[\]\{\}\|\r\n][^\[\]\n]*\]+([^\]]))/i,
				replace: '$1',
				num: 1
			}, {
				name: ':[[Ficheiro:',
				find: /\n:╠/i,
				replace: '\n╠',
				num: 10
			}, {
				name: 'url em Ficheiro',
				find: /╠[^:\n]*:https?:\/\/[^▒\n]*▒\]\]/i,
				replace: '',
				num: 1
			}, {
				name: '[[Ficheiro:[[Ficheiro:',
				find: /╠[^:\n]*: *╠/,
				replace: '╠',
				num: 1
			}, {
				name: '<br /> em ficheiro',
				find: /(╠[^▒\n]*)<br \/>/i,
				replace: '$1',
				num: 100
			}, {
				name: 'Flag of',
				find: '',
				replace: '',
				num: 1,
				ifhas: /╠[^:\n]*:Flag of [^\|\]\n]+ *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/,
				sub: [{
					name: 'A',
					find: '',
					replace: '',
					num: 1,
					ifhas: /╠[^:\n]*:Flag of A[^\|\]\n]+ *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/,
					sub: [{
						name: '{{ABWb}}',
						find: /╠[^:\n]*:Flag of Aruba\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{ABWb}}',
						num: 100
					}, {
						name: '{{AFGb}}',
						find: /╠[^:\n]*:Flag of Afghanistan\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{AFGb}}',
						num: 100
					}, {
						name: '{{AGOb}}',
						find: /╠[^:\n]*:Flag of Angola\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{AGOb}}',
						num: 100
					}, {
						name: '{{AHEb}}',
						find: /╠[^:\n]*:Flag of Austria-Hungary_1869-1918\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{AHEb}}',
						num: 100
					}, {
						name: '{{AIAb}}',
						find: /╠[^:\n]*:Flag of Anguilla\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{AIAb}}',
						num: 100
					}, {
						name: '{{ALAb}}',
						find: /╠[^:\n]*:Flag of Aaland\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{ALAb}}',
						num: 100
					}, {
						name: '{{ALBb}}',
						find: /╠[^:\n]*:Flag of Albania\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{ALBb}}',
						num: 100
					}, {
						name: '{{ANDb}}',
						find: /╠[^:\n]*:Flag of Andorra.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{ANDb}}',
						num: 100
					}, {
						name: '{{ANZb}}',
						find: /╠[^:\n]*:Flag of Australasian team for Olympic games.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{ANZb}}',
						num: 100
					}, {
						name: '{{ARGb}}',
						find: /╠[^:\n]*:Flag of Argentina\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{ARGb}}',
						num: 100
					}, {
						name: '{{ARMb}}',
						find: /╠[^:\n]*:Flag of Armenia.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{ARMb}}',
						num: 100
					}, {
						name: '{{ASMb}}',
						find: /╠[^:\n]*:Flag of American Samoa.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{ASMb}}',
						num: 100
					}, {
						name: '{{ATAb}}',
						find: /╠[^:\n]*:Flag of Antarctica.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{ATAb}}',
						num: 100
					}, {
						name: '{{ATGb}}',
						find: /╠[^:\n]*:Flag of Antigua and Barbuda.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{ATGb}}',
						num: 100
					}, {
						name: '{{AUSb}}',
						find: /╠[^:\n]*:Flag of Australia\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{AUSb}}',
						num: 100
					}, {
						name: '{{AUTb}}',
						find: /╠[^:\n]*:Flag of Austria\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{AUTb}}',
						num: 100
					}, {
						name: '{{AZEb}}',
						find: /╠[^:\n]*:Flag of Azerbaijan\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{AZEb}}',
						num: 100
					}, {
						name: '{{AZOb}}',
						find: /╠[^:\n]*:Flag of Azores.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{AZOb}}',
						num: 100
					}, {
						name: '{{DZAb}}',
						find: /╠[^:\n]*:Flag of Algeria\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{DZAb}}',
						num: 100
					}]
				}, {
					name: 'B',
					find: '',
					replace: '',
					num: 1,
					ifhas: /╠[^:\n]*:Flag of B[^\|\]\n]+ *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/,
					sub: [{
						name: '{{BDIb}}',
						find: /╠[^:\n]*:Flag of Burundi\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{BDIb}}',
						num: 100
					}, {
						name: '{{BELb}}',
						find: /╠[^:\n]*:Flag of Belgium( \(civil\))?\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{BELb}}',
						num: 100
					}, {
						name: '{{BENb}}',
						find: /╠[^:\n]*:Flag of Benin\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{BENb}}',
						num: 100
					}, {
						name: '{{BFAb}}',
						find: /╠[^:\n]*:Flag of Burkina Faso\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{BFAb}}',
						num: 100
					}, {
						name: '{{BGDb}}',
						find: /╠[^:\n]*:Flag of Bangladesh\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{BGDb}}',
						num: 100
					}, {
						name: '{{BGRb}}',
						find: /╠[^:\n]*:Flag of Bulgaria\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{BGRb}}',
						num: 100
					}, {
						name: '{{BHRb}}',
						find: /╠[^:\n]*:Flag of Bahrain\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{BHRb}}',
						num: 100
					}, {
						name: '{{BHSb}}',
						find: /╠[^:\n]*:Flag of Bahamas\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{BHSb}}',
						num: 100
					}, {
						name: '{{BIHb}}',
						find: /╠[^:\n]*:Flag of Bosnia and Herzegovina\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{BIHb}}',
						num: 100
					}, {
						name: '{{BLRb}}',
						find: /╠[^:\n]*:Flag of Belarus\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{BLRb}}',
						num: 100
					}, {
						name: '{{BLZb}}',
						find: /╠[^:\n]*:Flag of Belize\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{BLZb}}',
						num: 100
					}, {
						name: '{{BMUb}}',
						find: /╠[^:\n]*:Flag of Bermuda\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{BMUb}}',
						num: 100
					}, {
						name: '{{BOHb}}',
						find: /╠[^:\n]*:Flag of Bohemia\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{BOHb}}',
						num: 100
					}, {
						name: '{{BOLb}}',
						find: /╠[^:\n]*:Flag of Bolivia\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{BOLb}}',
						num: 100
					}, {
						name: '{{BRAb}}',
						find: /╠[^:\n]*:Flag of Brazil\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{BRAb}}',
						num: 100
					}, {
						name: '{{BRBb}}',
						find: /╠[^:\n]*:Flag of Barbados\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{BRBb}}',
						num: 100
					}, {
						name: '{{BRNb}}',
						find: /╠[^:\n]*:Flag of Brunei\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{BRNb}}',
						num: 100
					}, {
						name: '{{BTNb}}',
						find: /╠[^:\n]*:Flag of Bhutan\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{BTNb}}',
						num: 100
					}, {
						name: '{{BWAb}}',
						find: /╠[^:\n]*:Flag of Botswana\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{BWAb}}',
						num: 100
					}]
				}, {
					name: 'C',
					find: '',
					replace: '',
					num: 1,
					ifhas: /╠[^:\n]*:Flag of C[^\|\]\n]+ *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/,
					sub: [{
						name: '{{Catalunhab}}',
						find: /╠[^:\n]*:Flag of Catalonia\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{Catalunhab}}',
						num: 100
					}, {
						name: '{{CANb}}',
						find: /╠[^:\n]*:Flag of Canada\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{CANb}}',
						num: 100
					}, {
						name: '{{CATb}}',
						find: /╠[^:\n]*:Flag of Catalonia\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{CANb}}',
						num: 100
					}, {
						name: '{{CECb}}',
						find: /╠[^:\n]*:Flag of Czechoslovakia\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{CECb}}',
						num: 100
					}, {
						name: '{{CEYb}}',
						find: /╠[^:\n]*:Flag of Ceylon\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{CEYb}}',
						num: 100
					}, {
						name: '{{CHLb}}',
						find: /╠[^:\n]*:Flag of Chile\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{CHLb}}',
						num: 100
					}, {
						name: '{{CIVb}}',
						find: /╠[^:\n]*:Flag of Cote d'Ivoire\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{CIVb}}',
						num: 100
					}, {
						name: '{{CMRb}}',
						find: /╠[^:\n]*:Flag of Cameroon\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{CMRb}}',
						num: 100
					}, {
						name: '{{COLb}}',
						find: /╠[^:\n]*:Flag of Colombia\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{COLb}}',
						num: 100
					}, {
						name: '{{CPVb}}',
						find: /╠[^:\n]*:Flag of Cape Verde\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{CPVb}}',
						num: 100
					}, {
						name: '{{CRIb}}',
						find: /╠[^:\n]*:Flag of Costa Rica\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{CRIb}}',
						num: 100
					}, {
						name: '{{CUBb}}',
						find: /╠[^:\n]*:Flag of Cuba\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{CUBb}}',
						num: 100
					}, {
						name: '{{CURb}}',
						find: /╠[^:\n]*:Flag of Curaçao\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{CURb}}',
						num: 100
					}, {
						name: '{{CXRb}}',
						find: /╠[^:\n]*:Flag of Christmas Island\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{CXRb}}',
						num: 100
					}, {
						name: '{{CYPb}}',
						find: /╠[^:\n]*:Flag of Cyprus\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{CYPb}}',
						num: 100
					}, {
						name: '{{HRVb}}',
						find: /╠[^:\n]*:Flag of Croatia\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{HRVb}}',
						num: 1
					}, {
						name: '{{KHMb}}',
						find: /╠[^:\n]*:Flag of Cambodia\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{KHMb}}',
						num: 1
					}, {
						name: '{{TCDb}}',
						find: /╠[^:\n]*:Flag of Chad\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{TCDb}}',
						num: 100
					}, {
						name: '{{TCHb}}',
						find: /╠[^:\n]*:Flag of Czechoslovakia\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{TCHb}}',
						num: 100
					}, {
						name: '{{TPEb}}',
						find: /╠[^:\n]*:Flag of Chinese Taipei for Olympic games\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{TPEb}}',
						num: 100
					}]
				}, {
					name: 'D',
					find: '',
					replace: '',
					num: 1,
					ifhas: /╠[^:\n]*:Flag of D[^\|\]\n]+ *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/,
					sub: [{
						name: '{{DJIb}}',
						find: /╠[^:\n]*:Flag of Djibouti\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{DJIb}}',
						num: 100
					}, {
						name: '{{DMAb}}',
						find: /╠[^:\n]*:Flag of Dominica\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{DMAb}}',
						num: 100
					}, {
						name: '{{DNKb}}',
						find: /╠[^:\n]*:Flag of Denmark\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{DNKb}}',
						num: 100
					}]
				}, {
					name: 'E',
					find: '',
					replace: '',
					num: 1,
					ifhas: /╠[^:\n]*:Flag of E[^\|\]\n]+ *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/,
					sub: [{
						name: '{{TLSb}}',
						find: /╠[^:\n]*:Flag of East Timor\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{TLSb}}',
						num: 100
					}, {
						name: '{{SLVb}}',
						find: /╠[^:\n]*:Flag of El Salvador\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{SLVb}}',
						num: 100
					}, {
						name: '{{GNQb}}',
						find: /╠[^:\n]*:Flag of Equatorial Guinea\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{GNQb}}',
						num: 100
					}, {
						name: '{{DDRb}}',
						find: /╠[^:\n]*:Flag of East Germany\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{DDRb}}',
						num: 100
					}, {
						name: '{{EURb}}',
						find: /╠[^:\n]*:Flag of Europe\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{EURb}}',
						num: 100
					}, {
						name: '{{ECUb}}',
						find: /╠[^:\n]*:Flag of Ecuador\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{ECUb}}',
						num: 100
					}, {
						name: '{{EGYb}}',
						find: /╠[^:\n]*:Flag of Egypt\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{EGYb}}',
						num: 100
					}, {
						name: '{{ENGb}}',
						find: /╠[^:\n]*:Flag of England\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{ENGb}}',
						num: 100
					}, {
						name: '{{ERIb}}',
						find: /╠[^:\n]*:Flag of Eritrea\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{ERIb}}',
						num: 100
					}, {
						name: '{{ESTb}}',
						find: /╠[^:\n]*:Flag of Estonia\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{ESTb}}',
						num: 100
					}, {
						name: '{{ETHb}}',
						find: /╠[^:\n]*:Flag of Ethiopia\.(?:svg|png) *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{ETHb}}',
						num: 100
					}, {
						name: '{{ESHb}}',
						find: /╠[^:\n]*:Flag of Western Sahara\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{ESHb}}',
						num: 100
					}]
				}, {
					name: 'F',
					find: '',
					replace: '',
					num: 1,
					ifhas: /╠[^:\n]*:Flag of F[^\|\]\n]+ *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/,
					sub: [{
						name: '{{PYFb}}',
						find: /╠[^:\n]*:Flag of French Polynesia\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{PYFb}}',
						num: 100
					}, {
						name: '{{GUFb}}',
						find: /╠[^:\n]*:Flag of French Guiana\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{GUFb}}',
						num: 100
					}, {
						name: '{{FINb}}',
						find: /╠[^:\n]*:Flag of Finland\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{FINb}}',
						num: 100
					}, {
						name: '{{FJIb}}',
						find: /╠[^:\n]*:Flag of Fiji\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{FJIb}}',
						num: 100
					}, {
						name: '{{NCLb}}',
						find: /╠[^:\n]*:Flag of France\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*Nova Caledônia[^▒\n]*▒\]\]/i,
						replace: '{{NCLb}}',
						num: 100
					}, {
						name: '{{FRAb}}',
						find: /╠[^:\n]*:Flag of France\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{FRAb}}',
						num: 100
					}, {
						name: '{{FRAb|antiga}}',
						find: /╠[^:\n]*:Flag of France (XII-XIII)\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{FRAb|antiga}}',
						num: 100
					}, {
						name: '{{FRAb|moderna}}',
						find: /╠[^:\n]*:Flag of France (XIV-XVI)\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{FRAb|moderna}}',
						num: 100
					}, {
						name: '{{FRAb|livre}}',
						find: /╠[^:\n]*:Flag of Free France 1940-1944\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{FRAb|livre}}',
						num: 100
					}, {
						name: '{{FSMb}}',
						find: /╠[^:\n]*:Flag of Federated States of Micronesia\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{FSMb}}',
						num: 100
					}]
				}, {
					name: 'G',
					find: '',
					replace: '',
					num: 1,
					ifhas: /╠[^:\n]*:Flag of G[^\|\]\n]+ *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/,
					sub: [{
						name: '{{GABb}}',
						find: /╠[^:\n]*:Flag of Gabon\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{GABb}}',
						num: 100
					}, {
						name: '{{GALb}}',
						find: /╠[^:\n]*:Flag of Galicia\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{GALb}}',
						num: 100
					}, {
						name: '{{GHAb}}',
						find: /╠[^:\n]*:Flag of Ghana\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{GHAb}}',
						num: 100
					}, {
						name: '{{GEOb}}',
						find: /╠[^:\n]*:Flag of Georgia\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{GEOb}}',
						num: 100
					}, {
						name: '{{GEOb|1990}}',
						find: /╠[^:\n]*:Flag of Georgia \(1990\-2004\)\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{GEOb|1990}}',
						num: 100
					}, {
						name: '{{GIBb}}',
						find: /╠[^:\n]*:Flag of Gibraltar(?: \(bordered\))?\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{GIBb}}',
						num: 100
					}, {
						name: '{{DEUb}}',
						find: /╠[^:\n]*:Flag of Germany\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{DEUb}}',
						num: 100
					}, {
						name: '{{GLPb}}',
						find: /╠[^:\n]*:Flag of Guadeloupe \(local\)\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{GLPb}}',
						num: 100
					}, {
						name: '{{GGYb}}',
						find: /╠[^:\n]*:Flag of Guernsey\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{GGYb}}',
						num: 100
					}, {
						name: '{{GINb}}',
						find: /╠[^:\n]*:Flag of Guinea\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{GINb}}',
						num: 100
					}, {
						name: '{{GNBb}}',
						find: /╠[^:\n]*:Flag of Guinea-Bissau\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{GNBb}}',
						num: 100
					}, {
						name: '{{GRCb}}',
						find: /╠[^:\n]*:Flag of Greece\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{GRCb}}',
						num: 100
					}, {
						name: '{{GRCb|1828-1978}}',
						find: /╠[^:\n]*:Flag of Greece (1828-1978)\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{GRCb|1828-1978}}',
						num: 100
					}, {
						name: '{{GRCb|old}}',
						find: /╠[^:\n]*:Flag of Greece (1828-1978)\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{GRCb|old}}',
						num: 100
					}, {
						name: '{{GRCb|1970}}',
						find: /╠[^:\n]*:Flag of Greece (1970-1975)\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{GRCb|1970}}',
						num: 100
					}, {
						name: '{{GRDb}}',
						find: /╠[^:\n]*:Flag of Grenada\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{GRDb}}',
						num: 100
					}, {
						name: '{{GRLb}}',
						find: /╠[^:\n]*:Flag of Greenland\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{GRLb}}',
						num: 100
					}, {
						name: '{{GTMb}}',
						find: /╠[^:\n]*:Flag of Guatemala\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{GTMb}}',
						num: 100
					}, {
						name: '{{GUMb}}',
						find: /╠[^:\n]*:Flag of Guam\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{GUMb}}',
						num: 100
					}, {
						name: '{{GUYb}}',
						find: /╠[^:\n]*:Flag of Guyana\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{GUYb}}',
						num: 100
					}]
				}, {
					name: 'H',
					find: '',
					replace: '',
					num: 1,
					ifhas: /╠[^:\n]*:Flag of H[^\|\]\n]+ *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/,
					sub: [{
						name: '{{HKGb}}',
						find: /╠[^:\n]*:Flag of Hong Kong\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{HKGb}}',
						num: 1
					}, {
						name: '{{HNDb}}',
						find: /╠[^:\n]*:Flag of Honduras\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{HNDb}}',
						num: 1
					}, {
						name: '{{HTIb}}',
						find: /╠[^:\n]*:Flag of Haiti\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{HTIb}}',
						num: 1
					}, {
						name: '{{HUNb}}',
						find: /╠[^:\n]*:Flag of Hungary\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{HUNb}}',
						num: 1
					}, {
						name: '{{HAWb}}',
						find: /╠[^:\n]*:Flag of Hawaii\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{HAWb}}',
						num: 1
					}]
				}, {
					name: 'I',
					find: '',
					replace: '',
					num: 1,
					ifhas: /╠[^:\n]*:Flag of I[^\|\]\n]+ *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/,
					sub: [{
						name: '{{IDNb}}',
						find: /╠[^:\n]*:Flag of Indonesia\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{IDNb}}',
						num: 1
					}, {
						name: '{{INDb}}',
						find: /╠[^:\n]*:Flag of India\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{INDb}}',
						num: 1
					}, {
						name: '{{IRLb}}',
						find: /╠[^:\n]*:Flag of Ireland\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{IRLb}}',
						num: 100
					}, {
						name: '{{IRNb}}',
						find: /╠[^:\n]*:Flag of Iran\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{IRNb}}',
						num: 1
					}, {
						name: '{{IRQb}}',
						find: /╠[^:\n]*:Flag of Iraq\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{IRQb}}',
						num: 1
					}, {
						name: '{{ISLb}}',
						find: /╠[^:\n]*:Flag of Iceland\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{ISLb}}',
						num: 1
					}, {
						name: '{{ISRb}}',
						find: /╠[^:\n]*:Flag of Israel\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{ISRb}}',
						num: 1
					}, {
						name: '{{ITAb}}',
						find: /╠[^:\n]*:Flag of Italy\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{ITAb}}',
						num: 100
					}, {
						name: '{{Italy (1861-1946)b}}',
						find: /╠[^:\n]*:Flag of Italy (1861-1946)\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{Italy (1861-1946)b}}',
						num: 1
					}]
				}, {
					name: 'J',
					find: '',
					replace: '',
					num: 1,
					ifhas: /╠[^:\n]*:Flag of J[^\|\]\n]+ *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/,
					sub: [{
						name: '{{JAMb}}',
						find: /╠[^:\n]*:Flag of Jamaica\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{JAMb}}',
						num: 1
					}, {
						name: '{{JEYb}}',
						find: /╠[^:\n]*:Flag of Jersey\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{JEYb}}',
						num: 1
					}, {
						name: '{{JORb}}',
						find: /╠[^:\n]*:Flag of Jordan\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{JORb}}',
						num: 1
					}, {
						name: '{{JPNb}}',
						find: /╠[^:\n]*:Flag of Japan( \(bordered\))?\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{JPNb}}',
						num: 100
					}]
				}, {
					name: 'K',
					find: '',
					replace: '',
					num: 1,
					ifhas: /╠[^:\n]*:Flag of K[^\|\]\n]+ *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/,
					sub: [{
						name: '{{KAZb}}',
						find: /╠[^:\n]*:Flag of Kazakhstan\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{KAZb}}',
						num: 1
					}, {
						name: '{{KENb}}',
						find: /╠[^:\n]*:Flag of Kenya\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{KENb}}',
						num: 1
					}, {
						name: '{{KGZb}}',
						find: /╠[^:\n]*:Flag of Kyrgyzstan\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{KGZb}}',
						num: 1
					}, {
						name: '{{KIRb}}',
						find: /╠[^:\n]*:Flag of Kiribati\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{KIRb}}',
						num: 1
					}, {
						name: '{{KOSb}}',
						find: /╠[^:\n]*:Flag of Kosovo\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{KOSb}}',
						num: 1
					}, {
						name: '{{KWTb}}',
						find: /╠[^:\n]*:Flag of Kuwait\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{KWTb}}',
						num: 1
					}]
				}, {
					name: 'L',
					find: '',
					replace: '',
					num: 1,
					ifhas: /╠[^:\n]*:Flag of L[^\|\]\n]+ *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/,
					sub: [{
						name: '{{LAOb}}',
						find: /╠[^:\n]*:Flag of Laos\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{LAOb}}',
						num: 1
					}, {
						name: '{{LBNb}}',
						find: /╠[^:\n]*:Flag of Lebanon\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{LBNb}}',
						num: 1
					}, {
						name: '{{LBRb}}',
						find: /╠[^:\n]*:Flag of Liberia\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{LBRb}}',
						num: 1
					}, {
						name: '{{LBYb}}',
						find: /╠[^:\n]*:Flag of Libya\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{LBYb}}',
						num: 1
					}, {
						name: '{{LIEb}}',
						find: /╠[^:\n]*:Flag of Liechtenstein\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{LIEb}}',
						num: 1
					}, {
						name: '{{LSOb}}',
						find: /╠[^:\n]*:Flag of Lesotho\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{LSOb}}',
						num: 1
					}, {
						name: '{{LTUb}}',
						find: /╠[^:\n]*:Flag of Lithuania\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{LTUb}}',
						num: 1
					}, {
						name: '{{LUXb}}',
						find: /╠[^:\n]*:Flag of Luxembourg\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{LUXb}}',
						num: 1
					}, {
						name: '{{LVAb}}',
						find: /╠[^:\n]*:Flag of Latvia\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{LVAb}}',
						num: 1
					}]
				}, {
					name: 'M',
					find: '',
					replace: '',
					num: 1,
					ifhas: /╠[^:\n]*:Flag of M[^\|\]\n]+ *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/,
					sub: [{
						name: '{{MEXb}}',
						find: /╠[^:\n]*:Flag of Mexico\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{MEXb}}',
						num: 100
					}, {
						name: '{{MACb}}',
						find: /╠[^:\n]*:Flag of Macau\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{MACb}}',
						num: 1
					}, {
						name: '{{MARb}}',
						find: /╠[^:\n]*:Flag of Morocco\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{MARb}}',
						num: 1
					}, {
						name: '{{MCOb}}',
						find: /╠[^:\n]*:Flag of Monaco\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{MCOb}}',
						num: 1
					}, {
						name: '{{MDAb}}',
						find: /╠[^:\n]*:Flag of Moldova\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{MDAb}}',
						num: 1
					}, {
						name: '{{MDGb}}',
						find: /╠[^:\n]*:Flag of Madagascar\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{MDGb}}',
						num: 1
					}, {
						name: '{{MDRb}}',
						find: /╠[^:\n]*:Flag of Madeira\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{MDRb}}',
						num: 1
					}, {
						name: '{{MDVb}}',
						find: /╠[^:\n]*:Flag of Maldives\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{MDVb}}',
						num: 1
					}, {
						name: '{{MKDb}}',
						find: /╠[^:\n]*:Flag of Macedonia\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{MKDb}}',
						num: 1
					}, {
						name: '{{MLIb}}',
						find: /╠[^:\n]*:Flag of Mali\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{MLIb}}',
						num: 1
					}, {
						name: '{{MLTb}}',
						find: /╠[^:\n]*:Flag of Malta\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{MLTb}}',
						num: 1
					}, {
						name: '{{MMRb}}',
						find: /╠[^:\n]*:Flag of Myanmar\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{MMRb}}',
						num: 1
					}, {
						name: '{{MNEb}}',
						find: /╠[^:\n]*:Flag of Montenegro\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{MNEb}}',
						num: 1
					}, {
						name: '{{MNEb|1910}}',
						find: /╠[^:\n]*:Flag of Montenegro (1941-1944)\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{MNEb|1910}}',
						num: 1
					}, {
						name: '{{MNEb|1993}}',
						find: /╠[^:\n]*:Flag of Montenegro (1993-2004)\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{MNEb|1993}}',
						num: 1
					}, {
						name: '{{MNGb}}',
						find: /╠[^:\n]*:Flag of Mongolia\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{MNGb}}',
						num: 1
					}, {
						name: '{{MONb}}',
						find: /╠[^:\n]*:Flag of Monaco\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{MONb}}',
						num: 1
					}, {
						name: '{{MOZb}}',
						find: /╠[^:\n]*:Flag of Mozambique\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{MOZb}}',
						num: 1
					}, {
						name: '{{MRTb}}',
						find: /╠[^:\n]*:Flag of Mauritania\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{MRTb}}',
						num: 1
					}, {
						name: '{{MSRb}}',
						find: /╠[^:\n]*:Flag of Montserrat\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{MSRb}}',
						num: 1
					}, {
						name: '{{MTQb}}',
						find: /╠[^:\n]*:Flag of Martinique\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{MTQb}}',
						num: 1
					}, {
						name: '{{MUSb}}',
						find: /╠[^:\n]*:Flag of Mauritius\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{MUSb}}',
						num: 1
					}, {
						name: '{{MWIb}}',
						find: /╠[^:\n]*:Flag of Malawi\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{MWIb}}',
						num: 1
					}, {
						name: '{{MYSb}}',
						find: /╠[^:\n]*:Flag of Malaysia\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{MYSb}}',
						num: 1
					}, {
						name: '{{MYTb}}',
						find: /╠[^:\n]*:Flag of Mayotte \(local\)\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{MYTb}}',
						num: 1
					}]
				}, {
					name: 'N',
					find: '',
					replace: '',
					num: 1,
					ifhas: /╠[^:\n]*:Flag of N[^\|\]\n]+ *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/,
					sub: [{
						name: '{{DEUNb}}',
						find: /╠[^:\n]*:Flag of Nazi Germany \(1933\-1945\)\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{DEUNb}}',
						num: 100
					}, {
						name: '{{TKLb}}',
						find: /╠[^:\n]*:Flag of New Zealand\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{TKLb}}',
						num: 100
					}, {
						name: '{{SJMb}}',
						find: /╠[^:\n]*:Flag of Norway\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{SJMb}}',
						num: 100
					}, {
						name: '{{PRKb}}',
						find: /╠[^:\n]*:Flag of North Korea\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{PRKb}}',
						num: 100
					}, {
						name: '{{NAMb}}',
						find: /╠[^:\n]*:Flag of Namibia\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{NAMb}}',
						num: 1
					}, {
						name: '{{ND}}',
						find: /╠[^:\n]*:Flag of None\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{ND}}',
						num: 100
					}, {
						name: '{{NERb}}',
						find: /╠[^:\n]*:Flag of Niger(?: 3!2)?\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{NERb}}',
						num: 100
					}, {
						name: '{{NFKb}}',
						find: /╠[^:\n]*:Flag of Norfolk Island\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{NFKb}}',
						num: 100
					}, {
						name: '{{NGAb}}',
						find: /╠[^:\n]*:Flag of Nigeria\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{NGAb}}',
						num: 100
					}, {
						name: '{{NICb}}',
						find: /╠[^:\n]*:Flag of Nicaragua\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{NICb}}',
						num: 100
					}, {
						name: '{{NIUb}}',
						find: /╠[^:\n]*:Flag of Niue\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{NIUb}}',
						num: 100
					}, {
						name: '{{NKORb}}',
						find: /╠[^:\n]*:Flag of North Korea\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{NKORb}}',
						num: 100
					}, {
						name: '{{NORb}}',
						find: /╠[^:\n]*:Flag of Norway\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{NORb}}',
						num: 100
					}, {
						name: '{{NPLb}}',
						find: /╠[^:\n]*:Flag of Nepal\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{NPLb}}',
						num: 100
					}, {
						name: '{{NRUb}}',
						find: /╠[^:\n]*:Flag of Nauru\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{NRUb}}',
						num: 100
					}, {
						name: '{{NZLb}}',
						find: /╠[^:\n]*:Flag of New Zealand\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{NZLb}}',
						num: 100
					}]
				}, {
					name: 'O',
					find: '',
					replace: '',
					num: 1,
					ifhas: /╠[^:\n]*:Flag of O[^\|\]\n]+ *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/,
					sub: [{
						name: '{{OMNb}}',
						find: /╠[^:\n]*:Flag of Oman\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{OMNb}}',
						num: 100
					}]
				}, {
					name: 'P',
					find: '',
					replace: '',
					num: 1,
					ifhas: /╠[^:\n]*:Flag of P[^\|\]\n]+ *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/,
					sub: [{
						name: '{{PRTb}}',
						find: /╠[^:\n]*:Flag of Portugal*\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{PRTb}}',
						num: 100
					}, {
						name: '{{PAKb}}',
						find: /╠[^:\n]*:Flag of Pakistan\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{PAKb}}',
						num: 100
					}, {
						name: '{{PANb}}',
						find: /╠[^:\n]*:Flag of Panama\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{PANb}}',
						num: 100
					}, {
						name: '{{PERb}}',
						find: /╠[^:\n]*:Flag of Peru\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{PERb}}',
						num: 100
					}, {
						name: '{{PLWb}}',
						find: /╠[^:\n]*:Flag of Palau\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{PLWb}}',
						num: 100
					}, {
						name: '{{PNGb}}',
						find: /╠[^:\n]*:Flag of Papua New Guinea\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{PNGb}}',
						num: 100
					}, {
						name: '{{POLb}}',
						find: /╠[^:\n]*:Flag of Poland\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{POLb}}',
						num: 100
					}, {
						name: '{{PRIb}}',
						find: /╠[^:\n]*:Flag of Puerto Rico\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{PRIb}}',
						num: 100
					}, {
						name: '{{PRTb}}',
						find: /╠[^:\n]*:Flag of Portugal\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{PRTb}}',
						num: 100
					}, {
						name: '{{PRYb}}',
						find: /╠[^:\n]*:Flag of Paraguay\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{PRYb}}',
						num: 100
					}, {
						name: '{{PSEb}}',
						find: /╠[^:\n]*:Flag of Palestine\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{PSEb}}',
						num: 100
					}]
				}, {
					name: 'Q',
					find: '',
					replace: '',
					num: 1,
					ifhas: /╠[^:\n]*:Flag of Q[^\|\]\n]+ *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/,
					sub: [{
						name: '{{QATb}}',
						find: /╠[^:\n]*:Flag of Qatar\.svg*\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{QATb}}',
						num: 100
					}]
				}, {
					name: 'R',
					find: '',
					replace: '',
					num: 1,
					ifhas: /╠[^:\n]*:Flag of R[^\|\]\n]+ *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/,
					sub: [{
						name: '{{RUSb}}',
						find: /╠[^:\n]*:Flag of Russia\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{RUSb}}',
						num: 100
					}, {
						name: '{{RUSb|1991}}',
						find: /╠[^:\n]*:Flag of Russia 1991\-1993\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{RUSb|1991}}',
						num: 100
					}, {
						name: '{{RHOb}}',
						find: /╠[^:\n]*:Flag of Rhodesia\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{RHOb}}',
						num: 100
					}, {
						name: '{{ROUb}}',
						find: /╠[^:\n]*:Flag of Romania\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{ROUb}}',
						num: 100
					}, {
						name: '{{RWAb}}',
						find: /╠[^:\n]*:Flag of Rwanda\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{RWAb}}',
						num: 100
					}]
				}, {
					name: 'S',
					find: '',
					replace: '',
					num: 1,
					ifhas: /╠[^:\n]*:Flag of S[^\|\]\n]+ *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/,
					sub: [{
						name: '{{ZAFb}}',
						find: /╠[^:\n]*:Flag of South Africa\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{ZAFb}}',
						num: 100
					}, {
						name: '{{YUGb}}',
						find: /╠[^:\n]*:Flag of SFR Yugoslavia\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{YUGb}}',
						num: 100
					}, {
						name: '{{WSMb}}',
						find: /╠[^:\n]*:Flag of Samoa\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{WSMb}}',
						num: 100
					}, {
						name: '{{VCTb}}',
						find: /╠[^:\n]*:Flag of Saint Vincent and the Grenadines\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{VCTb}}',
						num: 100
					}, {
						name: '{{MNEb|1945}}',
						find: /╠[^:\n]*:Flag of SR Montenegro\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{MNEb|1945}}',
						num: 1
					}, {
						name: '{{MAFb}}',
						find: /╠[^:\n]*:Flag of Saint-Martin (local)\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{MAFb}}',
						num: 1
					}, {
						name: '{{LKAb}}',
						find: /╠[^:\n]*:Flag of Sri Lanka\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{LKAb}}',
						num: 1
					}, {
						name: '{{LCAb}}',
						find: /╠[^:\n]*:Flag of Saint Lucia\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{LCAb}}',
						num: 1
					}, {
						name: '{{KORb}}',
						find: /╠[^:\n]*:Flag of South Korea\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{KORb}}',
						num: 1
					}, {
						name: '{{KNAb}}',
						find: /╠[^:\n]*:Flag of Saint Kitts and Nevis\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{KNAb}}',
						num: 1
					}, {
						name: '{{ESPb}}',
						find: /╠[^:\n]*:Flag of Spain\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{ESPb}}',
						num: 100
					}, {
						name: '{{CHEb}}',
						find: /╠[^:\n]*:Flag of Switzerland\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{CHEb}}',
						num: 100
					}, {
						name: '{{SARKb}}',
						find: /╠[^:\n]*:Flag of Sark\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{SARKb}}',
						num: 100
					}, {
						name: '{{SARb}}',
						find: /╠[^:\n]*:Flag of Sardinia\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{SARb}}',
						num: 100
					}, {
						name: '{{SAUb}}',
						find: /╠[^:\n]*:Flag of Saudi Arabia\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{SAUb}}',
						num: 100
					}, {
						name: '{{SCGb}}',
						find: /╠[^:\n]*:Flag of Serbia and Montenegro\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{SCGb}}',
						num: 100
					}, {
						name: '{{SCOb}}',
						find: /╠[^:\n]*:Flag of Scotland\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{SCOb}}',
						num: 100
					}, {
						name: '{{SDNb}}',
						find: /╠[^:\n]*:Flag of Sudan\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{SDNb}}',
						num: 100
					}, {
						name: '{{SENb}}',
						find: /╠[^:\n]*:Flag of Senegal\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{SENb}}',
						num: 100
					}, {
						name: '{{SGPb}}',
						find: /╠[^:\n]*:Flag of Singapore\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{SGPb}}',
						num: 100
					}, {
						name: '{{SGSb}}',
						find: /╠[^:\n]*:Flag of South Georgia and the South Sandwich Islands\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{SGSb}}',
						num: 100
					}, {
						name: '{{SHNb}}',
						find: /╠[^:\n]*:Flag of Saint Helena\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{SHNb}}',
						num: 100
					}, {
						name: '{{SLEb}}',
						find: /╠[^:\n]*:Flag of Sierra Leone\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{SLEb}}',
						num: 100
					}, {
						name: '{{SXMb}}',
						find: /╠[^:\n]*:Flag of Sint Maarten\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{SXMb}}',
						num: 100
					}, {
						name: '{{SMRb}}',
						find: /╠[^:\n]*:Flag of San Marino\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{SMRb}}',
						num: 100
					}, {
						name: '{{SOMb}}',
						find: /╠[^:\n]*:Flag of Somalia\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{SOMb}}',
						num: 100
					}, {
						name: '{{SPMb}}',
						find: /╠[^:\n]*:Flag of Saint-Pierre and Miquelon\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{SPMb}}',
						num: 100
					}, {
						name: '{{STPb}}',
						find: /╠[^:\n]*:Flag of Sao Tome and Principe\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{STPb}}',
						num: 100
					}, {
						name: '{{SURb}}',
						find: /╠[^:\n]*:Flag of Suriname\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{SURb}}',
						num: 100
					}, {
						name: '{{SVKb}}',
						find: /╠[^:\n]*:Flag of Slovakia\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{SVKb}}',
						num: 100
					}, {
						name: '{{SVNb}}',
						find: /╠[^:\n]*:Flag of Slovenia\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{SVNb}}',
						num: 100
					}, {
						name: '{{SWEb}}',
						find: /╠[^:\n]*:Flag of Sweden\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{SWEb}}',
						num: 100
					}, {
						name: '{{SWZb}}',
						find: /╠[^:\n]*:Flag of Swaziland\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{SWZb}}',
						num: 100
					}, {
						name: '{{SYRb}}',
						find: /╠[^:\n]*:Flag of Syria\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{SYRb}}',
						num: 100
					}, {
						name: '{{SRBb}}',
						find: /╠[^:\n]*:Flag of Serbia\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{SRBb}}',
						num: 100
					}, {
						name: '{{SRBb|1815}}',
						find: /╠[^:\n]*:Flag of Serbia \(national\)\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{SRBb|1815}}',
						num: 100
					}, {
						name: '{{SRBb|1882}}',
						find: /╠[^:\n]*:Flag of Serbia \(1882\-1918\)\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{SRBb|1882}}',
						num: 100
					}, {
						name: '{{SRBb|1941}}',
						find: /╠[^:\n]*:Flag of Serbia \(national\)\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{SRBb|1941}}',
						num: 100
					}, {
						name: '{{SRBb|1945}}',
						find: /╠[^:\n]*:Flag of SR Serbia\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{SRBb|1945}}',
						num: 100
					}, {
						name: '{{SRBb|1991}}',
						find: /╠[^:\n]*:Flag of Serbia 1991\-2004\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{SRBb|1991}}',
						num: 100
					}, {
						name: '{{SRBb|civil}}',
						find: /╠[^:\n]*:Flag of Serbia \(national\)\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{SRBb|civil}}',
						num: 100
					}, {
						name: '{{MAFb}}',
						find: /╠[^:\n]*:Flag of Saint-Martin \(local\)\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{MAFb}}',
						num: 100
					}]
				}, {
					name: 'T',
					find: '',
					replace: '',
					num: 1,
					ifhas: /╠[^:\n]*:Flag of T[^\|\]\n]+ *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/,
					sub: [{
						name: '{{TAIb}}',
						find: /╠[^:\n]*:Flag of Taiwan\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{TAIb}}',
						num: 100
					}, {
						name: '{{TGOb}}',
						find: /╠[^:\n]*:Flag of Togo\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{TGOb}}',
						num: 100
					}, {
						name: '{{THAb}}',
						find: /╠[^:\n]*:Flag of Thailand\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{THAb}}',
						num: 100
					}, {
						name: '{{TJKb}}',
						find: /╠[^:\n]*:Flag of Tajikistan\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{TJKb}}',
						num: 100
					}, {
						name: '{{TKMb}}',
						find: /╠[^:\n]*:Flag of Turkmenistan\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{TKMb}}',
						num: 100
					}, {
						name: '{{TNDb}}',
						find: /╠[^:\n]*:Flag of Tunisia\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{TNDb}}',
						num: 100
					}, {
						name: '{{TONb}}',
						find: /╠[^:\n]*:Flag of Tonga\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{TONb}}',
						num: 100
					}, {
						name: '{{TTOb}}',
						find: /╠[^:\n]*:Flag of Trinidad and Tobago\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{TTOb}}',
						num: 100
					}, {
						name: '{{TUNb}}',
						find: /╠[^:\n]*:Flag of Tunisia\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{TUNb}}',
						num: 100
					}, {
						name: '{{TURb}}',
						find: /╠[^:\n]*:Flag of Turkey\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{TURb}}',
						num: 100
					}, {
						name: '{{TUVb}}',
						find: /╠[^:\n]*:Flag of Tuvalu\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{TUVb}}',
						num: 100
					}, {
						name: '{{TZAb}}',
						find: /╠[^:\n]*:Flag of Tanzania\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{TZAb}}',
						num: 100
					}, {
						name: '{{Texasb}}',
						find: /╠[^:\n]*:Flag of Texas\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{Texasb}}',
						num: 100
					}]
				}, {
					name: 'U',
					find: '',
					replace: '',
					num: 1,
					ifhas: /╠[^:\n]*:Flag of U[^\|\]\n]+ *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/,
					sub: [{
						name: '{{RAUb}}',
						find: /╠[^:\n]*:Flag of United Arab Republic\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{RAUb}}',
						num: 100
					}, {
						name: '{{UKRb}}',
						find: /╠[^:\n]*:Flag of Ukraine\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{UKRb}}',
						num: 100
					}, {
						name: '{{USAb}}',
						find: /╠[^:\n]*:Flag of United States\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{USAb}}',
						num: 100
					}, {
						name: '{{UGAb}}',
						find: /╠[^:\n]*:Flag of Uganda\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{UGAb}}',
						num: 100
					}, {
						name: '{{URYb}}',
						find: /╠[^:\n]*:Flag of Uruguay\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{URYb}}',
						num: 100
					}, {
						name: '{{UZBb}}',
						find: /╠[^:\n]*:Flag of Uzbekistan\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{UZBb}}',
						num: 100
					}]
				}, {
					name: 'V',
					find: '',
					replace: '',
					num: 1,
					ifhas: /╠[^:\n]*:Flag of V[^\|\]\n]+ *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/,
					sub: [{
						name: '{{VENb}}',
						find: /╠[^:\n]*:Flag of Venezuela\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{VENb}}',
						num: 100
					}, {
						name: '{{VNMb}}',
						find: /╠[^:\n]*:Flag of Vietnam\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{VNMb}}',
						num: 100
					}, {
						name: '{{VUTb}}',
						find: /╠[^:\n]*:Flag of Vanuatu\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{VUTb}}',
						num: 100
					}]
				}, {
					name: 'W',
					find: '',
					replace: '',
					num: 1,
					ifhas: /╠[^:\n]*:Flag of W[^\|\]\n]+ *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/,
					sub: [{
						name: '{{WALb}}',
						find: /╠[^:\n]*:Flag of Wales 2\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{WALb}}',
						num: 100
					}]
				}, {
					name: 'Y',
					find: '',
					replace: '',
					num: 1,
					ifhas: /╠[^:\n]*:Flag of Y[^\|\]\n]+ *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/,
					sub: [{
						name: '{{YEMb}}',
						find: /╠[^:\n]*:Flag of Yemen\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{YEMb}}',
						num: 100
					}]
				}, {
					name: 'Z',
					find: '',
					replace: '',
					num: 1,
					ifhas: /╠[^:\n]*:Flag of Z[^\|\]\n]+ *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/,
					sub: [{
						name: '{{ZAIb}}',
						find: /╠[^:\n]*:Flag of Zaire\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{ZAIb}}',
						num: 100
					}, {
						name: '{{ZANb}}',
						find: /╠[^:\n]*:Flag of Zanzibar\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{ZANb}}',
						num: 100
					}, {
						name: '{{ZMBb}}',
						find: /╠[^:\n]*:Flag of Zambia\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{ZMBb}}',
						num: 100
					}, {
						name: '{{ZWEb}}',
						find: /╠[^:\n]*:Flag of Zimbabwe\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{ZWEb}}',
						num: 100
					}]
				}, {
					name: 'The A-J',
					find: '',
					replace: '',
					num: 1,
					ifhas: /╠[^:\n]*:Flag of the [A-J][^\|\]\n]+ *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/,
					sub: [{
						name: '{{BHSb}}',
						find: /╠[^:\n]*:Flag of the Bahamas\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{BHSb}}',
						num: 100
					}, {
						name: '{{IOTb}}',
						find: /╠[^:\n]*:Flag of the British Indian Ocean Territory\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{IOTb}}',
						num: 100
					}, {
						name: '{{VGBb}}',
						find: /╠[^:\n]*:Flag of the British Virgin Islands\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{VGBb}}',
						num: 100
					}, {
						name: '{{CYMb}}',
						find: /╠[^:\n]*:Flag of the Cayman Islands\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{CYMb}}',
						num: 100
					}, {
						name: '{{CAFb}}',
						find: /╠[^:\n]*:Flag of the Central African Republic\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{CAFb}}',
						num: 100
					}, {
						name: '{{CCKb}}',
						find: /╠[^:\n]*:Flag of the Cocos (Keeling) Islands\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{CCKb}}',
						num: 100
					}, {
						name: '{{COKb}}',
						find: /╠[^:\n]*:Flag of the Cook Islands\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{COKb}}',
						num: 100
					}, {
						name: '{{COMb}}',
						find: /╠[^:\n]*:Flag of the Comoros\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{COMb}}',
						num: 100
					}, {
						name: '{{CZEb}}',
						find: /╠[^:\n]*:Flag of the Czech Republic\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{CZEb}}',
						num: 100
					}, {
						name: '{{CODb}}',
						find: /╠[^:\n]*:Flag of the Democratic Republic of the Congo\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{CODb}}',
						num: 100
					}, {
						name: '{{DOMb}}',
						find: /╠[^:\n]*:Flag of the Dominican Republic\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{DOMb}}',
						num: 100
					}, {
						name: '{{FLKb}}',
						find: /╠[^:\n]*:Flag of the Falkland Islands\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{FLKb}}',
						num: 100
					}, {
						name: '{{FROb}}',
						find: /╠[^:\n]*:Flag of the Faroe Islands\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{FROb}}',
						num: 100
					}, {
						name: '{{GMBb}}',
						find: /╠[^:\n]*:Flag of The Gambia\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{GMBb}}',
						num: 100
					}, {
						name: '{{IAb}}',
						find: /╠[^:\n]*:Flag of the German Empire\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{IAb}}',
						num: 1
					}, {
						name: '{{IMNb}}',
						find: /╠[^:\n]*:Flag of the Isle of Man\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{IMNb}}',
						num: 1
					}]
				}, {
					name: 'The K-O',
					find: '',
					replace: '',
					num: 1,
					ifhas: /╠[^:\n]*:Flag of the [K-O][^\|\]\n]+ *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/,
					sub: [{
						name: '{{NLDb}}',
						find: /╠[^:\n]*:Flag of the Netherlands\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{NLDb}}',
						num: 100
					}, {
						name: '{{ANTb}}',
						find: /╠[^:\n]*:Flag of the Netherlands Antilles.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{ANTb}}',
						num: 100
					}, {
						name: '{{IOb|1453}}',
						find: /╠[^:\n]*:Flag of the Ottoman Empire (1453-1844)\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{IOb|1453}}',
						num: 1
					}, {
						name: '{{IOb|1383}}',
						find: /╠[^:\n]*:Flag of the Ottoman Sultanate (1299-1453)\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{IOb|1383}}',
						num: 1
					}, {
						name: '{{MHLb}}',
						find: /╠[^:\n]*:Flag of the Marshall Islands\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{MHLb}}',
						num: 1
					}, {
						name: '{{MNPb}}',
						find: /╠[^:\n]*:Flag of the Northern Mariana Islands\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{MNPb}}',
						num: 1
					}, {
						name: '{{VALb}}',
						find: /╠[^:\n]*:Flag of the Land of Valencia (official)\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{VALb}}',
						num: 100
					}]
				}, {
					name: 'The P-Z',
					find: '',
					replace: '',
					num: 1,
					ifhas: /╠[^:\n]*:Flag of the [P-Z][^\|\]\n]+ *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/,
					sub: [{
						name: '{{ESPb|1977-1981}}',
						find: /╠[^:\n]*:Flag of the Spain Under Franco\.png *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{ESPb|1977-1981}}',
						num: 100
					}, {
						name: '{{CHNb}}',
						find: /╠[^:\n]*:Flag of the People's Republic of China\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{CHNb}}',
						num: 100
					}, {
						name: '{{PRCb}}',
						find: /╠[^:\n]*:Flag of the People's Republic of China\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{PRCb}}',
						num: 100
					}, {
						name: '{{PHLb}}',
						find: /╠[^:\n]*:Flag of the Philippines\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{PHLb}}',
						num: 100
					}, {
						name: '{{PCNb}}',
						find: /╠[^:\n]*:Flag of the Pitcairn Islands\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{PCNb}}',
						num: 100
					}, {
						name: '{{TWNb}}',
						find: /╠[^:\n]*:Flag of the Republic of China\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{TWNb}}',
						num: 100
					}, {
						name: '{{COGb}}',
						find: /╠[^:\n]*:Flag of the Republic of the Congo\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{COGb}}',
						num: 100
					}, {
						name: '{{SLBb}}',
						find: /╠[^:\n]*:Flag of the Solomon Islands\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{SLBb}}',
						num: 100
					}, {
						name: '{{SYCb}}',
						find: /╠[^:\n]*:Flag of the Seychelles\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{SYCb}}',
						num: 100
					}, {
						name: '{{URSb}}',
						find: /╠[^:\n]*:Flag of the Soviet Union\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{URSb}}',
						num: 100
					}, {
						name: '{{TCAb}}',
						find: /╠[^:\n]*:Flag of the Turks and Caicos Islands\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{TCAb}}',
						num: 100
					}, {
						name: '{{TRNCb}}',
						find: /╠[^:\n]*:Flag of the Turkish Republic of Northern Cyprus\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{TRNCb}}',
						num: 100
					}, {
						name: '{{AREb}}',
						find: /╠[^:\n]*:Flag of the United Arab Emirates.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{AREb}}',
						num: 100
					}, {
						name: '{{GBRb}}',
						find: /╠[^:\n]*:Flag of the United Kingdom\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{GBRb}}',
						num: 100
					}, {
						name: '{{USAb}} 2',
						find: /╠[^:\n]*:Flag of the United States\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{USAb}}',
						num: 100
					}, {
						name: '{{VIRb}}',
						find: /╠[^:\n]*:Flag of the United States Virgin Islands\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{VIRb}}',
						num: 100
					}, {
						name: '{{IVAb}}',
						find: /╠[^:\n]*:Flag of the United States Virgin Islands\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{IVAb}}',
						num: 1
					}, {
						name: '{{VATb}}',
						find: /╠[^:\n]*:Flag of the Vatican City\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{VATb}}',
						num: 100
					}]
				}]
			}, {
				name: 'Bandeira de',
				find: '',
				replace: '',
				num: 1,
				ifhas: /╠[^:\n]*:Bandeira d[aoe] [^\|\]\n]+ *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
				sub: [{
					name: 'A',
					find: '',
					replace: '',
					num: 1,
					ifhas: /╠[^:\n]*:Bandeira d[aoe] A[^\|\]\n]+ *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
					sub: [{
						name: '{{BR-ACb}}',
						find: /╠[^:\n]*:Bandeira do Acre\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{BR-ACb}}',
						num: 100
					}, {
						name: '{{BR-ALb}}',
						find: /╠[^:\n]*:Bandeira de Alagoas\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{BR-ALb}}',
						num: 100
					}, {
						name: '{{BR-AMb}}',
						find: /╠[^:\n]*:Bandeira do Amazonas\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{BR-AMb}}',
						num: 100
					}, {
						name: '{{BR-APb}}',
						find: /╠[^:\n]*:Bandeira do Amapá\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{BR-APb}}',
						num: 100
					}]
				}, {
					name: 'B',
					find: '',
					replace: '',
					num: 1,
					ifhas: /╠[^:\n]*:Bandeira d[aoe] B[^\|\]\n]+ *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
					sub: [{
						name: '{{BR-BAb}}',
						find: /╠[^:\n]*:Bandeira da Bahia\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{BR-BAb}}',
						num: 100
					}]
				}, {
					name: 'E',
					find: '',
					replace: '',
					num: 1,
					ifhas: /╠[^:\n]*:Bandeira d[aoe] E[^\|\]\n]+ *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
					sub: [{
						name: '{{BR-ESb}}',
						find: /╠[^:\n]*:Bandeira do Espírito Santo\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{BR-ESb}}',
						num: 100
					}]
				}, {
					name: 'G',
					find: '',
					replace: '',
					num: 1,
					ifhas: /╠[^:\n]*:Bandeira d[aoe] G[^\|\]\n]+ *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
					sub: [{
						name: '{{BR-GOb}}',
						find: /╠[^:\n]*:Bandeira de Goiás\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{BR-GOb}}',
						num: 100
					}]
				}, {
					name: 'M',
					find: '',
					replace: '',
					num: 1,
					ifhas: /╠[^:\n]*:Bandeira d[aoe] M[^\|\]\n]+ *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
					sub: [{
						name: '{{BR-MGb}}',
						find: /╠[^:\n]*:Bandeira de Minas Gerais\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{BR-MGb}}',
						num: 100
					}, {
						name: '{{BR-MAb}}',
						find: /╠[^:\n]*:Bandeira do Maranhão\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{BR-MAb}}',
						num: 100
					}, {
						name: '{{BR-MTb}}',
						find: /╠[^:\n]*:Bandeira de Mato Grosso\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{BR-MTb}}',
						num: 100
					}, {
						name: '{{BR-MSb}}',
						find: /╠[^:\n]*:Bandeira de Mato Grosso do Sul\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{BR-MSb}}',
						num: 100
					}]
				}, {
					name: 'P',
					find: '',
					replace: '',
					num: 1,
					ifhas: /╠[^:\n]*:Bandeira d[aoe] P[^\|\]\n]+ *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/,
					sub: [{
						name: '{{BR-PAb}}',
						find: /╠[^:\n]*:Bandeira do Pará\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{BR-PAb}}',
						num: 100
					}, {
						name: '{{BR-PBb}}',
						find: /╠[^:\n]*:Bandeira da Paraíba\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{BR-PBb}}',
						num: 100
					}, {
						name: '{{BR-PEb}}',
						find: /╠[^:\n]*:Bandeira de Pernambuco\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{BR-PEb}}',
						num: 100
					}, {
						name: '{{BR-PIb}}',
						find: /╠[^:\n]*:Bandeira do Piauí\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{BR-PIb}}',
						num: 100
					}, {
						name: '{{BR-PRb}}',
						find: /╠[^:\n]*:Bandeira do Paraná\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{BR-PRb}}',
						num: 100
					}]
				}, {
					name: 'R',
					find: '',
					replace: '',
					num: 1,
					ifhas: /╠[^:\n]*:Bandeira d[aoe] R[^\|\]\n]+ *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/,
					sub: [{
						name: '{{BR-RNb}}',
						find: /╠[^:\n]*:Bandeira do Rio Grande do Norte\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{BR-RNb}}',
						num: 100
					}, {
						name: '{{BR-ROb}}',
						find: /╠[^:\n]*:Bandeira de Rondônia\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{BR-ROb}}',
						num: 100
					}, {
						name: '{{BR-RRb}}',
						find: /╠[^:\n]*:Bandeira de Roraima\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{BR-RRb}}',
						num: 100
					}]
				}, {
					name: 'S',
					find: '',
					replace: '',
					num: 1,
					ifhas: /╠[^:\n]*:Bandeira d[aoe] S[^\|\]\n]+ *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
					sub: [{
						name: '{{BR-SCb}}',
						find: /╠[^:\n]*:Bandeira de Santa Catarina\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{BR-SCb}}',
						num: 100
					}, {
						name: '{{BR-SEb}}',
						find: /╠[^:\n]*:Bandeira de Sergipe\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{BR-SEb}}',
						num: 100
					}, {
						name: '{{BR-SPb}}',
						find: /╠[^:\n]*:Bandeira do Estado de São Paulo\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{BR-SPb}}',
						num: 100
					}]
				}, {
					name: 'T',
					find: '',
					replace: '',
					num: 1,
					ifhas: /╠[^:\n]*:Bandeira d[aoe] T[^\|\]\n]+ *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
					sub: [{
						name: '{{BR-TOb}}',
						find: /╠[^:\n]*:Bandeira do Tocantins\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
						replace: '{{BR-TOb}}',
						num: 100
					}]
				}]
			}, {
				name: 'Outras bandeiras',
				find: '',
				replace: '',
				num: 1,
				ifhas: /╠/i,
				sub: [{
					name: '{{BR-RSb}}',
					find: /╠[^:\n]*:Bandeira Estado RioGrandedoSul Brasil\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
					replace: '{{BR-RSb}}',
					num: 100
				}, {
					name: '{{BR-RJb}}',
					find: /╠[^:\n]*:Bandeira Estado RiodeJaneiro Brasil2\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
					replace: '{{BR-RJb}}',
					num: 100
				}, {
					name: '{{BR-GBb}}',
					find: /╠[^:\n]*:Bandeira Guanabara\.jpg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
					replace: '{{BR-GBb}}',
					num: 100
				}, {
					name: '{{FNb}}',
					find: /╠[^:\n]*:Bandeira-fernandodenoronha\.gif *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
					replace: '{{FNb}}',
					num: 100
				}, {
					name: '{{BR-CEb}}',
					find: /╠[^:\n]*:Bandeira Estado Ceara Brasil\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
					replace: '{{BR-CEb}}',
					num: 100
				}, {
					name: '{{TPEb|Universíada}}',
					find: /╠[^:\n]*:Chinese Taipei University Sports Flag\.PNG *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
					replace: '{{TPEb|Universíada}}',
					num: 100
				}, {
					name: '{{RUSb|naval}}',
					find: /╠[^:\n]*:Naval Ensign of Russia\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
					replace: '{{RUSb|naval}}',
					num: 100
				}, {
					name: '{{NAb}}',
					find: /╠[^:\n]*:Norteamerica\.png *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
					replace: '{{NAb}}',
					num: 100
				}, {
					name: '{{NIRb}}',
					find: /╠[^:\n]*:Ulster banner\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
					replace: '{{NIRb}}',
					num: 100
				}, {
					name: '{{MSULb}}',
					find: /╠[^:\n]*:Mercosul_flag\.png *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
					replace: '{{MSULb}}',
					num: 1
				}, {
					name: '{{BGRb|1941}}',
					find: /╠[^:\n]*:Cs-cg rs\.PNG *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
					replace: '{{BGRb|1941}}',
					num: 1
				}, {
					name: '{{BGRb|1876}}',
					find: /╠[^:\n]*:Old Flag of Montenegro\.png *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
					replace: '{{BGRb|1876}}',
					num: 1
				}, {
					name: '{{IRb|1858}}',
					find: /╠[^:\n]*:Romanov Flag\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
					replace: '{{IRb|1858}}',
					num: 1
				}, {
					name: '{{IRb|1914}}',
					find: /╠[^:\n]*:Russian Empire 1914 17\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
					replace: '{{IRb|1914}}',
					num: 1
				}, {
					name: '{{IOb}}',
					find: /╠[^:\n]*:Ottoman Flag\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
					replace: '{{IOb}}',
					num: 1
				}, {
					name: '{{IOb|1798}}',
					find: /╠[^:\n]*:Ottoman1798.png\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
					replace: '{{IOb|1798}}',
					num: 1
				}, {
					name: '{{IOb|naval}}',
					find: /╠[^:\n]*:Ottoman Naval Flag\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
					replace: '{{IOb|naval}}',
					num: 1
				}, {
					name: '{{IOPb}}',
					find: /╠[^:\n]*:Olympic flag\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
					replace: '{{IOPb}}',
					num: 1
				}, {
					name: '{{IAb|naval}}',
					find: /╠[^:\n]*:War Ensign of Germany 1903-1918.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
					replace: '{{IAb|naval}}',
					num: 1
				}, {
					name: '{{GEOb|naval}}',
					find: /╠[^:\n]*:Naval Ensign of Georgia\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
					replace: '{{GEOb|naval}}',
					num: 100
				}, {
					name: '{{GEOb|aérea}}',
					find: /╠[^:\n]*:Georgian Air Force flag\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
					replace: '{{GEOb|aérea}}',
					num: 100
				}, {
					name: '{{GRC|royal}}',
					find: /╠[^:\n]*:Kingdom of Greece Flag\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
					replace: '{{GRC|royal}}',
					num: 100
				}, {
					name: '{{GRCb|otto}}',
					find: /╠[^:\n]*:Kingdom of Greece Flag (1833-1862)\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
					replace: '{{GRCb|otto}}',
					num: 100
				}, {
					name: '{{GRCb|royalnavy}}',
					find: /╠[^:\n]*:Hellenic Naval Ensign 1935\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
					replace: '{{GRCb|royalnavy}}',
					num: 100
				}, {
					name: '{{FRAb|marinha}}',
					find: /╠[^:\n]*:Civil and Naval Ensign of France\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
					replace: '{{FRAb|marinha}}',
					num: 100
				}, {
					name: '{{FRAb|vichy}}',
					find: /╠[^:\n]*:VichyFlag\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
					replace: '{{FRAb|vichy}}',
					num: 100
				}, {
					name: '{{FRAb|restauração}}',
					find: /╠[^:\n]*:Pavillon royal de France\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
					replace: '{{FRAb|restauração}}',
					num: 100
				}, {
					name: '{{FRAb|real}}',
					find: /╠[^:\n]*:Naval Ensign of the Kingdom of France\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
					replace: '{{FRAb|real}}',
					num: 100
				}, {
					name: '{{ZZXb}}',
					find: /╠[^:\n]*:Olympic flag\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
					replace: '{{ZZXb}}',
					num: 100
				}, {
					name: '{{EUNb}}',
					find: /╠[^:\n]*:Olympic flag\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
					replace: '{{EUNb}}',
					num: 100
				}]
			}, {
				name: 'Outros símbolos',
				find: '',
				replace: '',
				num: 1,
				ifhas: /╠[^\|\n\]]+\| *(border *\| *)?[1-3]?[0-9] *px/i,
				sub: [{
					name: '{{BR-RJ-Riob}}',
					find: /╠[^:\n]*:Bandeira do Município do Rio de Janeiro\.png *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
					replace: '{{BR-RJ-Riob}}',
					num: 100
				}, {
					name: '{{BRAb}}',
					find: /╠[^:\n]*:BRAlogo1\.png *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
					replace: '{{BRAb}}',
					num: 100
				}, {
					name: '{{Ícone/Medalha Nobel}}',
					find: /╠[^:\n]*:Nobel prize medal\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
					replace: '{{Ícone/Medalha Nobel}}',
					num: 100
				}, {
					name: '{{Ícone/Golden Globe}}',
					find: /╠[^:\n]*:Golden Globe icon\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
					replace: '{{Ícone/Golden Globe}}',
					num: 100
				}]
			}, {
				name: 'Espaço final em Ficheiro',
				find: /([^ ]) +▒/i,
				replace: '$1▒',
				num: 100
			}, {
				name: 'Tradução de campos',
				find: '',
				replace: '',
				num: 1,
				sub: [{
					name: 'right',
					find: /(╠[^▒]+)\|right\|/,
					replace: '$1|direita|',
					num: 1
				}, {
					name: 'left',
					find: /(╠[^▒]+)\|left\|/,
					replace: '$1|esquerda|',
					num: 1
				}, {
					name: 'center',
					find: /(╠[^▒]+)\|center\|/,
					replace: '$1|centro|',
					num: 1
				}, {
					name: 'middle',
					find: /(╠[^▒]+)\|middle\|/,
					replace: '$1|meio|',
					num: 1
				}, {
					name: 'top',
					find: /(╠[^▒]+)\|top\|/,
					replace: '$1|acima|',
					num: 1
				}, {
					name: 'bottom',
					find: /(╠[^▒]+)\|bottom\|/,
					replace: '$1|abaixo|',
					num: 1
				}, {
					name: 'link=',
					find: /(╠[^▒]+)\|link=\n\n/,
					replace: '$1|ligação=',
					num: 1
				}]
			}]
		}, {
			name: '{{Flagicon}}',
			find: '',
			replace: '',
			num: 1,
			ifhas: /\{\{/i,
			sub: [{
				name: 'Padronizando {{Flagicon}}',
				find: '',
				replace: '',
				num: 100,
				sub: [{
					name: '{{Flagicon|text=[[abc|abc]]}}',
					find: /(\{\{Flagicon[^\(\)\n]*)\|text=\[\[[^\(\)\[\]\n]*\]\](\||\}\})/i,
					replace: '$1$2',
					num: 100
				}, {
					name: '{{Flagicon|text=}}',
					find: /(\{\{Flagicon[^\(\)\n]*)\|text=[^\{\}\n\|]*(\||\}\})/i,
					replace: '$1$2',
					num: 100
				}, {
					name: '{{Flagicon|00px}}',
					find: /(\{\{Flagicon[^\(\)\n]*)\|[0-9]+px(\||\}\})/i,
					replace: '$1$2',
					num: 100
				}]
			}, {
				name: '{{Flagicon}}',
				find: '',
				replace: '',
				num: 1,
				ifhas: '{{Flagicon|', // FIXME: /\{\{Flagicon|/i ?
				sub: [{
					name: '{{Flagicon}} A',
					find: '',
					replace: '',
					num: 1,
					ifhas: /\{\{[Ff]lagicon\|[AÁ]/,
					sub: [{
						name: '{{AHEb}} - Império Austro-Húngaro (2)',
						find: /\{\{Flagicon\|(Austria\-Hungary)\}\}/i,
						replace: '{{AHEb}}',
						num: 100
					}, {
						name: '{{DDRb}} - Alemanha Oriental (1)',
						find: /\{\{Flagicon\|(Alemanha Oriental)\}\}/i,
						replace: '{{DDRb}}',
						num: 100
					}, {
						name: '{{ASMb}} - Samoa Americana (2)',
						find: /\{\{Flagicon\|(American Samoa)\}\}/i,
						replace: '{{ASMb}}',
						num: 100
					}, {
						name: '{{DEUNb}} - Alemanha Nazi (1)',
						find: /\{\{Flagicon\|(Alemanha Nazi|Alemanha Nazista)\}\}/i,
						replace: '{{DEUNb}}',
						num: 100
					}, {
						name: '{{AFGb}} - Afeganistão',
						find: /\{\{Flagicon\|(Afghanistan|Afeganistão)\}\}/i,
						replace: '{{AFGb}}',
						num: 100
					}, {
						name: '{{ANTb}} - Antilhas Holandesas (1)',
						find: /\{\{Flagicon\|(Antilhas Holandesas)\}\}/i,
						replace: '{{ANTb}}',
						num: 100
					}, {
						name: '{{SAUb}} - Arábia Saudita (1)',
						find: /\{\{Flagicon\|(Arábia Saudita)\}\}/i,
						replace: '{{SAUb}}',
						num: 100
					}, {
						name: '{{ZAFb}} - África do Sul (1)',
						find: /\{\{Flagicon\|(África do Sul)\}\}/i,
						replace: '{{ZAFb}}',
						num: 100
					}, {
						name: '{{ALBb}} - Albânia',
						find: /\{\{Flagicon\|(Alb[aâ]nia)\}\}/i,
						replace: '{{ALBb}}',
						num: 100
					}, {
						name: '{{DEUb}} - Alemanha (1)',
						find: /\{\{Flagicon\|(Alemanha)\}\}/i,
						replace: '{{DEUb}}',
						num: 100
					}, {
						name: '{{FRGb}} - Alemanha Ocidental',
						find: /\{\{Flagicon\|(Alemanha Ocidental)\}\}/i,
						replace: '{{FRGb}}',
						num: 100
					}, {
						name: '{{ANDb}} - Andorra',
						find: /\{\{Flagicon\|(Andorra)\}\}/i,
						replace: '{{ANDb}}',
						num: 100
					}, {
						name: '{{AGOb}} - Angola',
						find: /\{\{Flagicon\|(Angola)\}\}/i,
						replace: '{{AGOb}}',
						num: 100
					}, {
						name: '{{AIAb}} - Anguilla',
						find: /\{\{Flagicon\|(Anguilla)\}\}/i,
						replace: '{{AIAb}}',
						num: 100
					}, {
						name: '{{DZAb}} - Argélia',
						find: /\{\{Flagicon\|(Argélia|Algeria)\}\}/i,
						replace: '{{DZAb}}',
						num: 100
					}, {
						name: '{{ARGb}} - Argentina',
						find: /\{\{Flagicon\|(Argentina)\}\}/i,
						replace: '{{ARGb}}',
						num: 100
					}, {
						name: '{{ARMb}} - Armenia',
						find: /\{\{Flagicon\|(Arm[eé]nia)\}\}/i,
						replace: '{{ARMb}}',
						num: 100
					}, {
						name: '{{ABWb}} - Aruba',
						find: /\{\{Flagicon\|(Aruba)\}\}/i,
						replace: '{{ABWb}}',
						num: 100
					}, {
						name: '{{AUSb}} - Austrália',
						find: /\{\{Flagicon\|(Austr[áa]lia)\}\}/i,
						replace: '{{AUSb}}',
						num: 100
					}, {
						name: '{{AUTb}} - Áustria',
						find: /\{\{Flagicon\|([AÁ]ustria)\}\}/i,
						replace: '{{AUTb}}',
						num: 100
					}, {
						name: '{{AZEb}} - Azerbaijão',
						find: /\{\{Flagicon\|(Azerbaij[aã][on])\}\}/i,
						replace: '{{AZEb}}',
						num: 100
					}]
				}, {
					name: '{{Flagicon}} B',
					find: '',
					replace: '',
					num: 1,
					ifhas: /\{\{[Ff]lagicon\|B/,
					sub: [{
						name: '{{VGBb}} - Ilhas Virgens Britânicas (2)',
						find: /\{\{Flagicon\|(British Virgin Islands)\}\}/i,
						replace: '{{VGBb}}',
						num: 100
					}, {
						name: '{{BHSb}} - Bahamas',
						find: /\{\{Flagicon\|(Bahamas)\}\}/i,
						replace: '{{BHSb}}',
						num: 100
					}, {
						name: '{{BHRb}} - Bahrein',
						find: /\{\{Flagicon\|(Bahr[ae]in)\}\}/i,
						replace: '{{BHRb}}',
						num: 100
					}, {
						name: '{{BGDb}} - Bangladesh',
						find: /\{\{Flagicon\|(Bangladesh)\}\}/i,
						replace: '{{BGDb}}',
						num: 100
					}, {
						name: '{{BRBb}} - Barbados',
						find: /\{\{Flagicon\|(Barbados)\}\}/i,
						replace: '{{BRBb}}',
						num: 100
					}, {
						name: '{{BELb}} - Bélgica',
						find: /\{\{Flagicon\|(Bélgica|Belgium(?: \(Civil\))?)\}\}/i,
						replace: '{{BELb}}',
						num: 100
					}, {
						name: '{{BLZb}} - Belize',
						find: /\{\{Flagicon\|(Belize)\}\}/i,
						replace: '{{BLZb}}',
						num: 100
					}, {
						name: '{{BENb}} - Benin',
						find: /\{\{Flagicon\|(Beni[nm])\}\}/i,
						replace: '{{BENb}}',
						num: 100
					}, {
						name: '{{BMUb}} - Bermudas',
						find: /\{\{Flagicon\|(Bermudas|Bermudas)\}\}/i,
						replace: '{{BMUb}}',
						num: 100
					}, {
						name: '{{BLRb}} - Bielorrússia',
						find: /\{\{Flagicon\|(Bielorrússia|Belarus)\}\}/i,
						replace: '{{BLRb}}',
						num: 100
					}, {
						name: '{{BOLb}} - Bolívia',
						find: /\{\{Flagicon\|(Bol[íi]via)\}\}/i,
						replace: '{{BOLb}}',
						num: 100
					}, {
						name: '{{BIHb}} - Bósnia e Herzegovina',
						find: /\{\{Flagicon\|(Bosnia and Herzegovina|Bósnia e Herzegovina)\}\}/i,
						replace: '{{BIHb}}',
						num: 100
					}, {
						name: '{{BWAb}} - Botsuana',
						find: /\{\{Flagicon\|(Bots[wu]ana)\}\}/i,
						replace: '{{BWAb}}',
						num: 100
					}, {
						name: '{{BRAb}} - Brasil',
						find: /\{\{Flagicon\|(Bra[zs]il)\}\}/i,
						replace: '{{BRAb}}',
						num: 100
					}, {
						name: '{{BRNb}} - Brunei',
						find: /\{\{Flagicon\|(Brunei)\}\}/i,
						replace: '{{BRNb}}',
						num: 100
					}, {
						name: '{{BGRb}} - Bulgaria',
						find: /\{\{Flagicon\|(Bulg[aá]ria)\}\}/i,
						replace: '{{BGRb}}',
						num: 100
					}, {
						name: '{{BFAb}} - Burkina Faso',
						find: /\{\{Flagicon\|(Burkina Faso)\}\}/i,
						replace: '{{BFAb}}',
						num: 100
					}, {
						name: '{{BDIb}} - Burundi',
						find: /\{\{Flagicon\|(Burundi)\}\}/i,
						replace: '{{BDIb}}',
						num: 100
					}, {
						name: '{{BTNb}} - Butão',
						find: /\{\{Flagicon\|(Bhutan|Butão)\}\}/i,
						replace: '{{BTNb}}',
						num: 100
					}]
				}, {
					name: '{{Flagicon}} C',
					find: '',
					replace: '',
					num: 1,
					ifhas: /\{\{[Ff]lagicon\|C/,
					sub: [{
						name: '{{COLb}} - Colômbia',
						find: /\{\{Flagicon\|(Col[oô]mbia)\}\}/i,
						replace: '{{COLb}}',
						num: 100
					}, {
						name: '{{CECb}} - Checoslováquia',
						find: /\{\{Flagicon\|(Checoslováquia|Czechoslovakia)\}\}/i,
						replace: '{{CECb}}',
						num: 100
					}, {
						name: '{{CZEb}} - República Checa (2)',
						find: /\{\{Flagicon\|(Czech Republic)\}\}/i,
						replace: '{{CZEb}}',
						num: 100
					}, {
						name: '{{CAFb}} - República Centro-Africana (2)',
						find: /\{\{Flagicon\|(Central African Republic)\}\}/i,
						replace: '{{CAFb}}',
						num: 100
					}, {
						name: '{{CODb}} - Congo',
						find: /\{\{Flagicon\|(Congo)\}\}/i,
						replace: '{{CODb}}',
						num: 100
					}, {
						name: '{{CYMb}} - Ilhas Cayman (2)',
						find: /\{\{Flagicon\|(Cayman Islands)\}\}/i,
						replace: '{{CYMb}}',
						num: 100
					}, {
						name: '{{COKb}} - Ilhas Cook (2)',
						find: /\{\{Flagicon\|(Cook Islands)\}\}/i,
						replace: '{{COKb}}',
						num: 100
					}, {
						name: '{{KAZb}} - Cazaquistão (1)',
						find: /\{\{Flagicon\|(Cazaquistão)\}\}/i,
						replace: '{{KAZb}}',
						num: 100
					}, {
						name: '{{PRKb}} - Coreia do Norte (1)',
						find: /\{\{Flagicon\|(Cor[eé]ia do Norte)\}\}/i,
						replace: '{{PRKb}}',
						num: 100
					}, {
						name: '{{KORb}} - Coreia do Sul (1)',
						find: /\{\{Flagicon\|(Cor[eé]ia do Sul)\}\}/i,
						replace: '{{KORb}}',
						num: 100
					}, {
						name: '{{CPVb}} - Cabo Verde',
						find: /\{\{Flagicon\|(Cape Verde|Cabo Verde)\}\}/i,
						replace: '{{CPVb}}',
						num: 100
					}, {
						name: '{{CMRb}} - Camarões',
						find: /\{\{Flagicon\|(Cameroon|Camarões)\}\}/i,
						replace: '{{CMRb}}',
						num: 100
					}, {
						name: '{{KHMb}} - Camboja',
						find: /\{\{Flagicon\|(Cambodia|Camboja)\}\}/i,
						replace: '{{KHMb}}',
						num: 100
					}, {
						name: '{{CANb}} - Canadá',
						find: /\{\{Flagicon\|(Canad[aá])\}\}/i,
						replace: '{{CANb}}',
						num: 100
					}, {
						name: '{{TCDb}} - Chade',
						find: /\{\{Flagicon\|(Chade?)\}\}/i,
						replace: '{{TCDb}}',
						num: 100
					}, {
						name: '{{CHLb}} - Chile',
						find: /\{\{Flagicon\|(Chile)\}\}/i,
						replace: '{{CHLb}}',
						num: 100
					}, {
						name: '{{CHNb}} - China',
						find: /\{\{Flagicon\|(China)\}\}/i,
						replace: '{{CHNb}}',
						num: 100
					}, {
						name: '{{CYPb}} - Chipre',
						find: /\{\{Flagicon\|(Cyprus|Chipre)\}\}/i,
						replace: '{{CYPb}}',
						num: 100
					}, {
						name: '{{COMb}} - Comores',
						find: /\{\{Flagicon\|(Comor[eo]s)\}\}/i,
						replace: '{{COMb}}',
						num: 100
					}, {
						name: '{{COGb}} - Congo',
						find: /\{\{Flagicon\|(Congo)\}\}/i,
						replace: '{{COGb}}',
						num: 100
					}, {
						name: '{{CIVb}} - Costa do Marfim',
						find: /\{\{Flagicon\|(Cote d'Ivoire|Costa do Marfim)\}\}/i,
						replace: '{{CIVb}}',
						num: 100
					}, {
						name: '{{CRIb}} - Costa Rica',
						find: /\{\{Flagicon\|(Costa Rica)\}\}/i,
						replace: '{{CRIb}}',
						num: 100
					}, {
						name: '{{HRVb}} - Croácia',
						find: /\{\{Flagicon\|(Croácia|Croatia)\}\}/i,
						replace: '{{HRVb}}',
						num: 100
					}, {
						name: '{{CUBb}} - Cuba',
						find: /\{\{Flagicon\|(Cuba)\}\}/i,
						replace: '{{CUBb}}',
						num: 100
					}, {
						name: '{{CURb}} - Curaçao',
						find: /\{\{Flagicon\|(Curaçao)\}\}/i,
						replace: '{{CURb}}',
						num: 100
					}]
				}, {
					name: '{{Flagicon}} D',
					find: '',
					replace: '',
					num: 1,
					ifhas: /\{\{[Ff]lagicon\|D/,
					sub: [{
						name: '{{DOMb}} - República Dominicana (2)',
						find: /\{\{Flagicon\|(Dominican Republic)\}\}/i,
						replace: '{{DOMb}}',
						num: 100
					}, {
						name: '{{DNKb}} - Dinamarca',
						find: /\{\{Flagicon\|(Dinamarca|Denmark)\}\}/i,
						replace: '{{DNKb}}',
						num: 100
					}, {
						name: '{{DJIb}} - Djibouti',
						find: /\{\{Flagicon\|(Djibouti)\}\}/i,
						replace: '{{DJIb}}',
						num: 100
					}, {
						name: '{{DMAb}} - Dominica',
						find: /\{\{Flagicon\|(Dominica)\}\}/i,
						replace: '{{DMAb}}',
						num: 100
					}]
				}, {
					name: '{{Flagicon}} E',
					find: '',
					replace: '',
					num: 1,
					ifhas: /\{\{[Ff]lagicon\|E/,
					sub: [{
						name: '{{DDRb}} - Alemanha Oriental (2)',
						find: /\{\{Flagicon\|(East Germany)\}\}/i,
						replace: '{{DDRb}}',
						num: 100
					}, {
						name: '{{TLSb}} - Timor-Leste (2)',
						find: /\{\{Flagicon\|(East Timor)\}\}/i,
						replace: '{{TLSb}}',
						num: 100
					}, {
						name: '{{ENGb}} - Inglaterra (2)',
						find: /\{\{Flagicon\|(England)\}\}/i,
						replace: '{{ENGb}}',
						num: 100
					}, {
						name: '{{GNQb}} - Guiné Equatorial (2)',
						find: /\{\{Flagicon\|(Equatorial Guinea)\}\}/i,
						replace: '{{GNQb}}',
						num: 100
					}, {
						name: '{{AREb}} - Emirados Árabes Unidos - (1)',
						find: /\{\{Flagicon\|(Emirados Árabes Unidos|United Arab Emirates)\}\}/i,
						replace: '{{AREb}}',
						num: 100
					}, {
						name: '{{SCOb}} - Escócia - (1)',
						find: /\{\{Flagicon\|(Escócia)\}\}/i,
						replace: '{{SCOb}}',
						num: 100
					}, {
						name: '{{SVKb}} - Eslováquia - (1)',
						find: /\{\{Flagicon\|(Eslováquia)\}\}/i,
						replace: '{{SVKb}}',
						num: 100
					}, {
						name: '{{SVNb}} - Eslovênia - (1)',
						find: /\{\{Flagicon\|(Eslovênia)\}\}/i,
						replace: '{{SVNb}}',
						num: 100
					}, {
						name: '{{ESPb}} - Espanha - (1)',
						find: /\{\{Flagicon\|(Espanha)\}\}/i,
						replace: '{{ESPb}}',
						num: 100
					}, {
						name: '{{FSMb}} - Estados Federados da Micronésia - (1)',
						find: /\{\{Flagicon\|(Estados Federados da Micronésia)\}\}/i,
						replace: '{{FSMb}}',
						num: 100
					}, {
						name: '{{USAb}} - Estados Unidos',
						find: /\{\{Flagicon\|(Estados Unidos( da América)?)\}\}/i,
						replace: '{{USAb}}',
						num: 100
					}, {
						name: '{{EGYb}} - Egito',
						find: /\{\{Flagicon\|(Egito|Egypt)\}\}/i,
						replace: '{{EGYb}}',
						num: 100
					}, {
						name: '{{SLVb}} - El Salvador',
						find: /\{\{Flagicon\|(El Salvador)\}\}/i,
						replace: '{{SLVb}}',
						num: 100
					}, {
						name: '{{ECUb}} - Equador',
						find: /\{\{Flagicon\|(E[cq]uador)\}\}/i,
						replace: '{{ECUb}}',
						num: 100
					}, {
						name: '{{ERIb}} - Eritreia',
						find: /\{\{Flagicon\|(Eritrei?a)\}\}/i,
						replace: '{{ERIb}}',
						num: 100
					}, {
						name: '{{ESTb}} - Estonia',
						find: /\{\{Flagicon\|(Est[ôo]nia)\}\}/i,
						replace: '{{ESTb}}',
						num: 100
					}, {
						name: '{{ETHb}} - Etiópia',
						find: /\{\{Flagicon\|(Etiópia|Ethiopia)\}\}/i,
						replace: '{{ETHb}}',
						num: 100
					}, {
						name: '{{EURb}} - Europa',
						find: /\{\{Flagicon\|(Europ[ae])\}\}/i,
						replace: '{{EURb}}',
						num: 100
					}]
				}, {
					name: '{{Flagicon}} F',
					find: '',
					replace: '',
					num: 1,
					ifhas: /\{\{[Ff]lagicon\|F/,
					sub: [{
						name: '{{PYFb}} - Polinésia Francesa (2)',
						find: /\{\{Flagicon\|(French Polynesia)\}\}/i,
						replace: '{{PYFb}}',
						num: 100
					}, {
						name: '{{FSMb}} - Estados Federados da Micronésia - (2)',
						find: /\{\{Flagicon\|(Federated States of Micronesia)\}\}/i,
						replace: '{{FSMb}}',
						num: 100
					}, {
						name: '{{FROb}} - Ilhas Feroé (2)',
						find: /\{\{Flagicon\|(Faroe Islands)\}\}/i,
						replace: '{{FROb}}',
						num: 100
					}, {
						name: '{{PHLb}} - Filipinas (1)',
						find: /\{\{Flagicon\|(Filipinas)\}\}/i,
						replace: '{{PHLb}}',
						num: 100
					}, {
						name: '{{FJIb}} - Fiji',
						find: /\{\{Flagicon\|(Fiji)\}\}/i,
						replace: '{{FJIb}}',
						num: 100
					}, {
						name: '{{FINb}} - Finlândia',
						find: /\{\{Flagicon\|(Finland|Finlândia)\}\}/i,
						replace: '{{FINb}}',
						num: 100
					}, {
						name: '{{FRAb}} - França',
						find: /\{\{Flagicon\|(Fran[cç][ea])\}\}/i,
						replace: '{{FRAb}}',
						num: 100
					}]
				}, {
					name: '{{Flagicon}} G',
					find: '',
					replace: '',
					num: 1,
					ifhas: /\{\{[Ff]lagicon\|G/,
					sub: [{
						name: '{{DEUb}} - Alemanha (2)',
						find: /\{\{Flagicon\|(Germany)\}\}/i,
						replace: '{{DEUb}}',
						num: 100
					}, {
						name: '{{GNQb}} - Guiné Equatorial (1)',
						find: /\{\{Flagicon\|(Guiné Equatorial)\}\}/i,
						replace: '{{GNQb}}',
						num: 100
					}, {
						name: '{{GABb}} - Gabão',
						find: /\{\{Flagicon\|(Gab[oã][no])\}\}/i,
						replace: '{{GABb}}',
						num: 100
					}, {
						name: '{{GMBb}} - Gâmbia',
						find: /\{\{Flagicon\|(G[aâ]mbia)\}\}/i,
						replace: '{{GMBb}}',
						num: 100
					}, {
						name: '{{GHAb}} - Gana',
						find: /\{\{Flagicon\|(Ghana|Gana)\}\}/i,
						replace: '{{GHAb}}',
						num: 100
					}, {
						name: '{{GEOb}} - Geórgia',
						find: /\{\{Flagicon\|(Ge[oó]rgia)\}\}/i,
						replace: '{{GEOb}}',
						num: 100
					}, {
						name: '{{GRDb}} - Granada',
						find: /\{\{Flagicon\|(Gr[ea]nada)\}\}/i,
						replace: '{{GRDb}}',
						num: 100
					}, {
						name: '{{GRCb}} - Grécia',
						find: /\{\{Flagicon\|(Greece|Grécia)\}\}/i,
						replace: '{{GRCb}}',
						num: 100
					}, {
						name: '{{GLPb}} - Guadalupe',
						find: /\{\{Flagicon\|(Guadalupe|Guadeloupe)\}\}/i,
						replace: '{{GLPb}}',
						num: 100
					}, {
						name: '{{GUMb}} - Guam',
						find: /\{\{Flagicon\|(Guam)\}\}/i,
						replace: '{{GUMb}}',
						num: 100
					}, {
						name: '{{GTMb}} - Guatemala',
						find: /\{\{Flagicon\|(Guatemala)\}\}/i,
						replace: '{{GTMb}}',
						num: 100
					}, {
						name: '{{GUYb}} - Guiana',
						find: /\{\{Flagicon\|(Gu[iy]ana)\}\}/i,
						replace: '{{GUYb}}',
						num: 100
					}, {
						name: '{{GUFb}} - Guiana Francesa',
						find: /\{\{Flagicon\|(Guiana Francesa)\}\}/i,
						replace: '{{GUFb}}',
						num: 100
					}, {
						name: '{{GINb}} - Guiné',
						find: /\{\{Flagicon\|(Guinea|Guiné)\}\}/i,
						replace: '{{GINb}}',
						num: 100
					}, {
						name: '{{GNBb}} - Guiné-Bissau',
						find: /\{\{Flagicon\|(Guinea\-Bissau|Guiné\-Bissau)\}\}/i,
						replace: '{{GNBb}}',
						num: 100
					}]
				}, {
					name: '{{Flagicon}} H',
					find: '',
					replace: '',
					num: 1,
					ifhas: /\{\{[Ff]lagicon\|H/,
					sub: [{
						name: '{{HTIb}} - Haiti',
						find: /\{\{Flagicon\|(Haiti)\}\}/i,
						replace: '{{HTIb}}',
						num: 100
					}, {
						name: '{{HNDb}} - Honduras',
						find: /\{\{Flagicon\|(Honduras)\}\}/i,
						replace: '{{HNDb}}',
						num: 100
					}, {
						name: '{{HKGb}} - Hong Kong',
						find: /\{\{Flagicon\|(Hong Kong)\}\}/i,
						replace: '{{HKGb}}',
						num: 100
					}, {
						name: '{{HUNb}} - Hungria',
						find: /\{\{Flagicon\|(Hungria|Hungary)\}\}/i,
						replace: '{{HUNb}}',
						num: 100
					}]
				}, {
					name: '{{Flagicon}} I',
					find: '',
					replace: '',
					num: 1,
					ifhas: /\{\{[Ff]lagicon\|[IÍ]/,
					sub: [{
						name: '{{YUGb}} - Iugoslávia (1)',
						find: /\{\{Flagicon\|(Iugoslávia)\}\}/i,
						replace: '{{YUGb}}',
						num: 100
					}, {
						name: '{{AHEb}} - Império Austro-Húngaro (1)',
						find: /\{\{Flagicon\|(Império Austro\-Húngaro)\}\}/i,
						replace: '{{AHEb}}',
						num: 100
					}, {
						name: '{{FROb}} - Ilhas Feroé (1)',
						find: /\{\{Flagicon\|(Ilhas Feroé)\}\}/i,
						replace: '{{FROb}}',
						num: 100
					}, {
						name: '{{SLBb}} - Ilhas Salomão (1)',
						find: /\{\{Flagicon\|(Ilhas Salomão)\}\}/i,
						replace: '{{SLBb}}',
						num: 100
					}, {
						name: '{{VIRb}} - Ilhas Virgens Americanas (1)',
						find: /\{\{Flagicon\|(Ilhas Virgens Americanas)\}\}/i,
						replace: '{{VIRb}}',
						num: 100
					}, {
						name: '{{VGBb}} - Ilhas Virgens Britânicas (1)',
						find: /\{\{Flagicon\|(Ilhas Virgens Britânicas)\}\}/i,
						replace: '{{VGBb}}',
						num: 100
					}, {
						name: '{{ENGb}} - Inglaterra (1)',
						find: /\{\{Flagicon\|(Inglaterra)\}\}/i,
						replace: '{{ENGb}}',
						num: 100
					}, {
						name: '{{COKb}} - Ilhas Cook (1)',
						find: /\{\{Flagicon\|(Ilhas Cook)\}\}/i,
						replace: '{{COKb}}',
						num: 100
					}, {
						name: '{{CYMb}} - Ilhas Cayman (1)',
						find: /\{\{Flagicon\|(Ilhas Cayman)\}\}/i,
						replace: '{{CYMb}}',
						num: 100
					}, {
						name: '{{YEMb}} - Iémen (1)',
						find: /\{\{Flagicon\|(I[êée]men)\}\}/i,
						replace: '{{YEMb}}',
						num: 100
					}, {
						name: '{{INDb}} - India',
						find: /\{\{Flagicon\|([IÍ]ndia)\}\}/i,
						replace: '{{INDb}}',
						num: 100
					}, {
						name: '{{DEIb}} - Índias Orientais Holandesas',
						find: /\{\{Flagicon\|(Índias Orientais Holandesas)\}\}/i,
						replace: '{{DEIb}}',
						num: 100
					}, {
						name: '{{IDNb}} - Indonésia',
						find: /\{\{Flagicon\|(Indon[ée]sia)\}\}/i,
						replace: '{{IDNb}}',
						num: 100
					}, {
						name: '{{IRNb}} - Irã',
						find: /\{\{Flagicon\|(Irã|Iran)\}\}/i,
						replace: '{{IRNb}}',
						num: 100
					}, {
						name: '{{IRQb}} - Iraque',
						find: /\{\{Flagicon\|(Iraque|Iraq)\}\}/i,
						replace: '{{IRQb}}',
						num: 100
					}, {
						name: '{{IRLb}} - Irlanda',
						find: /\{\{Flagicon\|(Irlanda|Ireland)\}\}/i,
						replace: '{{IRLb}}',
						num: 100
					}, {
						name: '{{NIRb}} - Irlanda do Norte',
						find: /\{\{Flagicon\|(Irlanda do Norte)\}\}/i,
						replace: '{{NIRb}}',
						num: 100
					}, {
						name: '{{ISLb}} - Islândia',
						find: /\{\{Flagicon\|(Iceland|Islândia)\}\}/i,
						replace: '{{ISLb}}',
						num: 100
					}, {
						name: '{{ISRb}} - Israel',
						find: /\{\{Flagicon\|(Israel)\}\}/i,
						replace: '{{ISRb}}',
						num: 100
					}, {
						name: '{{ITAb}} - Itália',
						find: /\{\{Flagicon\|(Itália|Italy)\}\}/i,
						replace: '{{ITAb}}',
						num: 100
					}]
				}, {
					name: '{{Flagicon}} J',
					find: '',
					replace: '',
					num: 1,
					ifhas: /\{\{[Ff]lagicon\|J/,
					sub: [{
						name: '{{JAMb}} - Jamaica',
						find: /\{\{Flagicon\|(Jamaica)\}\}/i,
						replace: '{{JAMb}}',
						num: 100
					}, {
						name: '{{JPNb}} - Japáo',
						find: /\{\{Flagicon\|(Jap[ãa][on])\}\}/i,
						replace: '{{JPNb}}',
						num: 100
					}, {
						name: '{{JORb}} - Jordânia',
						find: /\{\{Flagicon\|(Jordan|Jordânia)\}\}/i,
						replace: '{{JORb}}',
						num: 100
					}]
				}, {
					name: '{{Flagicon}} K',
					find: '',
					replace: '',
					num: 1,
					ifhas: /\{\{[Ff]lagicon\|K/,
					sub: [{
						name: '{{KAZb}} - Cazaquistão (2)',
						find: /\{\{Flagicon\|(Kazakhstan)\}\}/i,
						replace: '{{KAZb}}',
						num: 100
					}, {
						name: '{{KENb}} - Quênia (2)',
						find: /\{\{Flagicon\|(Kenya)\}\}/i,
						replace: '{{KENb}}',
						num: 100
					}, {
						name: '{{KGZb}} - Quirguistão (2)',
						find: /\{\{Flagicon\|(Kyrgyzstan)\}\}/i,
						replace: '{{KGZb}}',
						num: 100
					}, {
						name: '{{KIRb}} - Kiribati',
						find: /\{\{Flagicon\|(Kiribati)\}\}/i,
						replace: '{{KIRb}}',
						num: 100
					}, {
						name: '{{KOSb}} - Kosovo',
						find: /\{\{Flagicon\|(Kosovo)\}\}/i,
						replace: '{{KOSb}}',
						num: 100
					}]
				}, {
					name: '{{Flagicon}} L',
					find: '',
					replace: '',
					num: 1,
					ifhas: /\{\{[Ff]lagicon\|L/,
					sub: [{
						name: '{{LAOb}} - Laos',
						find: /\{\{Flagicon\|(Laos)\}\}/i,
						replace: '{{LAOb}}',
						num: 100
					}, {
						name: '{{LSOb}} - Lesoto',
						find: /\{\{Flagicon\|(Lesoth?o)\}\}/i,
						replace: '{{LSOb}}',
						num: 100
					}, {
						name: '{{LVAb}} - Letônia',
						find: /\{\{Flagicon\|(Latvia|Letônia)\}\}/i,
						replace: '{{LVAb}}',
						num: 100
					}, {
						name: '{{LBNb}} - Líbano',
						find: /\{\{Flagicon\|(Lebanon|Líbano)\}\}/i,
						replace: '{{LBNb}}',
						num: 100
					}, {
						name: '{{LBRb}} - Libéria',
						find: /\{\{Flagicon\|(Lib[ée]ria)\}\}/i,
						replace: '{{LBRb}}',
						num: 100
					}, {
						name: '{{LBYb}} - Líbia',
						find: /\{\{Flagicon\|(L[íi]b[iy]a)\}\}/i,
						replace: '{{LBYb}}',
						num: 100
					}, {
						name: '{{LIEb}} - Liechtenstein',
						find: /\{\{Flagicon\|(Liechtenstein)\}\}/i,
						replace: '{{LIEb}}',
						num: 100
					}, {
						name: '{{LTUb}} - Lituânia',
						find: /\{\{Flagicon\|(Lituânia|Lithuania)\}\}/i,
						replace: '{{LTUb}}',
						num: 100
					}, {
						name: '{{LUXb}} - Luxemburgo',
						find: /\{\{Flagicon\|(Luxemburgo|Luxembourg)\}\}/i,
						replace: '{{LUXb}}',
						num: 100
					}]
				}, {
					name: '{{Flagicon}} M',
					find: '',
					replace: '',
					num: 1,
					ifhas: /\{\{[Ff]lagicon\|M/,
					sub: [{
						name: '{{MACb}} - Macau',
						find: /\{\{Flagicon\|(Macau)\}\}/i,
						replace: '{{MACb}}',
						num: 100
					}, {
						name: '{{MKDb}} - Macedônia',
						find: /\{\{Flagicon\|(Maced[oóô]nia)\}\}/i,
						replace: '{{MKDb}}',
						num: 100
					}, {
						name: '{{MDGb}} - Madagascar',
						find: /\{\{Flagicon\|(Madag[áa]scar)\}\}/i,
						replace: '{{MDGb}}',
						num: 100
					}, {
						name: '{{MYSb}} - Malásia',
						find: /\{\{Flagicon\|(Malásia|Malaysia)\}\}/i,
						replace: '{{MYSb}}',
						num: 100
					}, {
						name: '{{MWIb}} - Malawi',
						find: /\{\{Flagicon\|(Malawi)\}\}/i,
						replace: '{{MWIb}}',
						num: 100
					}, {
						name: '{{MDVb}} - Maldivas',
						find: /\{\{Flagicon\|(Maldiv[ae]s)\}\}/i,
						replace: '{{MDVb}}',
						num: 100
					}, {
						name: '{{MLIb}} - Mali',
						find: /\{\{Flagicon\|(Mali)\}\}/i,
						replace: '{{MLIb}}',
						num: 100
					}, {
						name: '{{MLTb}} - Malta',
						find: /\{\{Flagicon\|(Malta)\}\}/i,
						replace: '{{MLTb}}',
						num: 100
					}, {
						name: '{{MARb}} - Marrocos',
						find: /\{\{Flagicon\|(M[ao]rocco|Marrocos)\}\}/i,
						replace: '{{MARb}}',
						num: 100
					}, {
						name: '{{MTQb}} - Martinica',
						find: /\{\{Flagicon\|(Martinica|Martinique)\}\}/i,
						replace: '{{MTQb}}',
						num: 100
					}, {
						name: '{{MUSb}} - Maurícia',
						find: /\{\{Flagicon\|(Maurícia|Mauritius)\}\}/i,
						replace: '{{MUSb}}',
						num: 100
					}, {
						name: '{{MRTb}} - Mauritania',
						find: /\{\{Flagicon\|(Maurit[aâ]nia)\}\}/i,
						replace: '{{MRTb}}',
						num: 100
					}, {
						name: '{{MEXb}} - México',
						find: /\{\{Flagicon\|(M[eé]xico)\}\}/i,
						replace: '{{MEXb}}',
						num: 100
					}, {
						name: '{{FSMb}} - Micronésia',
						find: /\{\{Flagicon\|(Micronésia)\}\}/i,
						replace: '{{FSMb}}',
						num: 100
					}, {
						name: '{{MMRb}} - Mianmar',
						find: /\{\{Flagicon\|(M[iy]anmar)\}\}/i,
						replace: '{{MMRb}}',
						num: 100
					}, {
						name: '{{MOZb}} - Moçambique',
						find: /\{\{Flagicon\|(Mo[zç]ambique)\}\}/i,
						replace: '{{MOZb}}',
						num: 100
					}, {
						name: '{{MDAb}} - Moldávia',
						find: /\{\{Flagicon\|(Moldova|Moldávia)\}\}/i,
						replace: '{{MDAb}}',
						num: 100
					}, {
						name: '{{MCOb}} - Mônaco',
						find: /\{\{Flagicon\|(M[oôó]naco)\}\}/i,
						replace: '{{MCOb}}',
						num: 100
					}, {
						name: '{{MNGb}} - Mongolia',
						find: /\{\{Flagicon\|(Mong[óo]lia)\}\}/i,
						replace: '{{MNGb}}',
						num: 100
					}, {
						name: '{{MNEb}} - Montenegro',
						find: /\{\{Flagicon\|(Montenegro)\}\}/i,
						replace: '{{MNEb}}',
						num: 100
					}, {
						name: '{{MSRb}} - Monserrate',
						find: /\{\{Flagicon\|(Monserrate|Montserrat)\}\}/i,
						replace: '{{MSRb}}',
						num: 100
					}]
				}, {
					name: '{{Flagicon}} N',
					find: '',
					replace: '',
					num: 1,
					ifhas: /\{\{[Ff]lagicon\|N/,
					sub: [{
						name: '{{DEUNb}} - Alemanha Nazi (2)',
						find: /\{\{Flagicon\|(Nazi Germany)\}\}/i,
						replace: '{{DEUNb}}',
						num: 100
					}, {
						name: '{{PRKb}} - Coreia do Norte (2)',
						find: /\{\{Flagicon\|(North Korea)\}\}/i,
						replace: '{{PRKb}}',
						num: 100
					}, {
						name: '{{ANTb}} - Antilhas Holandesas (2)',
						find: /\{\{Flagicon\|(Netherlands Antilles)\}\}/i,
						replace: '{{ANTb}}',
						num: 100
					}, {
						name: '{{NLDb}} - Netherlands',
						find: /\{\{Flagicon\|(Netherlands)\}\}/i,
						replace: '{{NLDb}}',
						num: 100
					}, {
						name: '{{NAMb}} - Namíbia',
						find: /\{\{Flagicon\|(Nam[íi]bia)\}\}/i,
						replace: '{{NAMb}}',
						num: 100
					}, {
						name: '{{NRUb}} - Nauru',
						find: /\{\{Flagicon\|(Nauru)\}\}/i,
						replace: '{{NRUb}}',
						num: 100
					}, {
						name: '{{NPLb}} - Nepal',
						find: /\{\{Flagicon\|(Nepal)\}\}/i,
						replace: '{{NPLb}}',
						num: 100
					}, {
						name: '{{NICb}} - Nicaragua',
						find: /\{\{Flagicon\|(Nicar[aá]gua)\}\}/i,
						replace: '{{NICb}}',
						num: 100
					}, {
						name: '{{NERb}} - Níger',
						find: /\{\{Flagicon\|(N[íi]ger)\}\}/i,
						replace: '{{NERb}}',
						num: 100
					}, {
						name: '{{NGAb}} - Nigéria',
						find: /\{\{Flagicon\|(Nig[ée]ria)\}\}/i,
						replace: '{{NGAb}}',
						num: 100
					}, {
						name: '{{NORb}} - Noruega',
						find: /\{\{Flagicon\|(Norway|Noruega)\}\}/i,
						replace: '{{NORb}}',
						num: 100
					}, {
						name: '{{NCLb}} - Nova Caledônia',
						find: /\{\{Flagicon\|(Nova Caledônia)\}\}/i,
						replace: '{{NCLb}}',
						num: 100
					}, {
						name: '{{NZLb}} - Nova Zelândia',
						find: /\{\{Flagicon\|(New Zealand|Nova Zelândia)\}\}/i,
						replace: '{{NZLb}}',
						num: 100
					}]
				}, {
					name: '{{Flagicon}} O',
					find: '',
					replace: '',
					num: 1,
					ifhas: /\{\{[Ff]lagicon\|O/,
					sub: [{
						name: '{{OMNb}} - Omã',
						find: /\{\{Flagicon\|(Oman|Omã)\}\}/i,
						replace: '{{OMNb}}',
						num: 100
					}]
				}, {
					name: '{{Flagicon}} P',
					find: '',
					replace: '',
					num: 1,
					ifhas: /\{\{[Ff]lagicon\|P/,
					sub: [{
						name: '{{PHLb}} - Filipinas (2)',
						find: /\{\{Flagicon\|(Philippines)\}\}/i,
						replace: '{{PHLb}}',
						num: 100
					}, {
						name: '{{WALb}} - País de Gales (1)',
						find: /\{\{Flagicon\|(País de Gales)\}\}/i,
						replace: '{{WALb}}',
						num: 100
					}, {
						name: '{{NLDb}} - Países Baixos (1)',
						find: /\{\{Flagicon\|(Países Baixos)\}\}/i,
						replace: '{{NLDb}}',
						num: 100
					}, {
						name: '{{PYFb}} - Polinésia Francesa (1)',
						find: /\{\{Flagicon\|(Polinésia Francesa)\}\}/i,
						replace: '{{PYFb}}',
						num: 100
					}, {
						name: '{{PLWb}} - Palau',
						find: /\{\{Flagicon\|(Palau)\}\}/i,
						replace: '{{PLWb}}',
						num: 100
					}, {
						name: '{{PSEb}} - Palestina',
						find: /\{\{Flagicon\|(Palestin[ea])\}\}/i,
						replace: '{{PSEb}}',
						num: 100
					}, {
						name: '{{PANb}} - Panamá',
						find: /\{\{Flagicon\|(Panam[áa])\}\}/i,
						replace: '{{PANb}}',
						num: 100
					}, {
						name: '{{PNGb}} - Papua-Nova Guiné',
						find: /\{\{Flagicon\|(Papua\-Nova Guiné|Papua New Guinea)\}\}/i,
						replace: '{{PNGb}}',
						num: 100
					}, {
						name: '{{PRYb}} - Paraguai',
						find: /\{\{Flagicon\|(Paragua[iy])\}\}/i,
						replace: '{{PRYb}}',
						num: 100
					}, {
						name: '{{PAKb}} - Paquistão',
						find: /\{\{Flagicon\|(Paquistão|Pakistan)\}\}/i,
						replace: '{{PAKb}}',
						num: 100
					}, {
						name: '{{PERb}} - Peru',
						find: /\{\{Flagicon\|(Peru)\}\}/i,
						replace: '{{PERb}}',
						num: 100
					}, {
						name: '{{POLb}} - Polônia',
						find: /\{\{Flagicon\|(Pol[oôó]nia|Poland)\}\}/i,
						replace: '{{POLb}}',
						num: 100
					}, {
						name: '{{PRIb}} - Porto Rico',
						find: /\{\{Flagicon\|(Porto Rico|Puerto Rico)\}\}/i,
						replace: '{{PRIb}}',
						num: 100
					}, {
						name: '{{PRTb}} - Portugal',
						find: /\{\{Flagicon\|(Portugal)\}\}/i,
						replace: '{{PRTb}}',
						num: 100
					}]
				}, {
					name: '{{Flagicon}} Q',
					find: '',
					replace: '',
					num: 1,
					ifhas: /\{\{[Ff]lagicon\|Q/,
					sub: [{
						name: '{{KENb}} - Quênia (1)',
						find: /\{\{Flagicon\|(Quênia)\}\}/i,
						replace: '{{KENb}}',
						num: 100
					}, {
						name: '{{KGZb}} - Quirguistão (1)',
						find: /\{\{Flagicon\|(Quirguistão)\}\}/i,
						replace: '{{KGZb}}',
						num: 100
					}, {
						name: '{{QATb}} - Qatar',
						find: /\{\{Flagicon\|(Qatar)\}\}/i,
						replace: '{{QATb}}',
						num: 100
					}]
				}, {
					name: '{{Flagicon}} R',
					find: '',
					replace: '',
					num: 1,
					ifhas: /\{\{[Ff]lagicon\|R/,
					sub: [{
						name: '{{DOMb}} - República Dominicana (1)',
						find: /\{\{Flagicon\|(República Dominicana)\}\}/i,
						replace: '{{DOMb}}',
						num: 100
					}, {
						name: '{{GBRb}} - Reino Unido',
						find: /\{\{Flagicon\|(Reino Unido)\}\}/i,
						replace: '{{GBRb}}',
						num: 100
					}, {
						name: '{{CZEb}} - República Checa (1)',
						find: /\{\{Flagicon\|(República Checa)\}\}/i,
						replace: '{{CZEb}}',
						num: 100
					}, {
						name: '{{CAFb}} - República Centro-Africana (1)',
						find: /\{\{Flagicon\|(República Centro\-Africana)\}\}/i,
						replace: '{{CAFb}}',
						num: 100
					}, {
						name: '{{ROUb}} - Romênia',
						find: /\{\{Flagicon\|(Rom[aê]nia)\}\}/i,
						replace: '{{ROUb}}',
						num: 100
					}, {
						name: '{{RWAb}} - Ruanda',
						find: /\{\{Flagicon\|(R[wu]anda)\}\}/i,
						replace: '{{RWAb}}',
						num: 100
					}, {
						name: '{{RUSb}} - Rússia',
						find: /\{\{Flagicon\|(R[úu]ssia|Russian Federation)\}\}/i,
						replace: '{{RUSb}}',
						num: 100
					}]
				}, {
					name: '{{Flagicon}} S',
					find: '',
					replace: '',
					num: 1,
					ifhas: /\{\{[Ff]lagicon\|S/,
					sub: [{
						name: '{{SCOb}} - Escócia - (2)',
						find: /\{\{Flagicon\|(Scotland)\}\}/i,
						replace: '{{SCOb}}',
						num: 100
					}, {
						name: '{{YUGb}} - SFR Yugoslavia',
						find: /\{\{Flagicon\|(SFR Yugoslavia)\}\}/i,
						replace: '{{YUGb}}',
						num: 100
					}, {
						name: '{{SVKb}} - Eslováquia - (2)',
						find: /\{\{Flagicon\|(Slovakia)\}\}/i,
						replace: '{{SVKb}}',
						num: 100
					}, {
						name: '{{SVNb}} - Eslovênia - (2)',
						find: /\{\{Flagicon\|(Slovenia)\}\}/i,
						replace: '{{SVNb}}',
						num: 100
					}, {
						name: '{{ESPb}} - Espanha - (2)',
						find: /\{\{Flagicon\|(Spain)\}\}/i,
						replace: '{{ESPb}}',
						num: 100
					}, {
						name: '{{SLBb}} - Ilhas Salomão (2)',
						find: /\{\{Flagicon\|(Solomon Islands)\}\}/i,
						replace: '{{SLBb}}',
						num: 100
					}, {
						name: '{{KORb}} - Coreia do Sul (2)',
						find: /\{\{Flagicon\|(South Korea)\}\}/i,
						replace: '{{KORb}}',
						num: 100
					}, {
						name: '{{ZAFb}} - África do Sul (2)',
						find: /\{\{Flagicon\|(South Africa)\}\}/i,
						replace: '{{ZAFb}}',
						num: 100
					}, {
						name: '{{SAUb}} - Arábia Saudita (2)',
						find: /\{\{Flagicon\|(Saudi Arabia)\}\}/i,
						replace: '{{SAUb}}',
						num: 100
					}, {
						name: '{{URSb}} - União Soviética (2)',
						find: /\{\{Flagicon\|(Soviet Union)\}\}/i,
						replace: '{{URSb}}',
						num: 100
					}, {
						name: '{{SCGb}} - Sérvia e Montenegro',
						find: /\{\{Flagicon\|(Sérvia e Montenegro|Serbia and Montenegro)\}\}/i,
						replace: '{{SCGb}}',
						num: 100
					}, {
						name: '{{ASMb}} - Samoa Americana (1)',
						find: /\{\{Flagicon\|(Samoa Americana)\}\}/i,
						replace: '{{ASMb}}',
						num: 100
					}, {
						name: '{{WSMb}} - Samoa',
						find: /\{\{Flagicon\|(Samoa)\}\}/i,
						replace: '{{WSMb}}',
						num: 100
					}, {
						name: '{{LCAb}} - Santa Lúcia',
						find: /\{\{Flagicon\|(Santa Lúcia|Saint Lucia)\}\}/i,
						replace: '{{LCAb}}',
						num: 100
					}, {
						name: '{{KNAb}} - São Cristóvão e Névis',
						find: /\{\{Flagicon\|(Saint Kitts and Nevis|São Cristóvão e Névis)\}\}/i,
						replace: '{{KNAb}}',
						num: 100
					}, {
						name: '{{SMRb}} - São Marinho',
						find: /\{\{Flagicon\|(São Marinho|San Marino)\}\}/i,
						replace: '{{SMRb}}',
						num: 100
					}, {
						name: '{{STPb}} - São Tomé e Príncipe',
						find: /\{\{Flagicon\|(São Tomé e Príncipe|Sao Tome and Principe)\}\}/i,
						replace: '{{STPb}}',
						num: 100
					}, {
						name: '{{VCTb}} - São Vicente e Granadinas',
						find: /\{\{Flagicon\|(São Vicente e Granadinas|Saint Vincent and the Grenadines)\}\}/i,
						replace: '{{VCTb}}',
						num: 100
					}, {
						name: '{{SENb}} - Senegal',
						find: /\{\{Flagicon\|(Senegal)\}\}/i,
						replace: '{{SENb}}',
						num: 100
					}, {
						name: '{{SLEb}} - Serra Leoa',
						find: /\{\{Flagicon\|(Sierra Leone|Serra Leoa)\}\}/i,
						replace: '{{SLEb}}',
						num: 100
					}, {
						name: '{{SRBb}} - Sérvia',
						find: /\{\{Flagicon\|(S[ée]r[bv]ia)\}\}/i,
						replace: '{{SRBb}}',
						num: 100
					}, {
						name: '{{SYCb}} - Seychelles',
						find: /\{\{Flagicon\|(Seychelles)\}\}/i,
						replace: '{{SYCb}}',
						num: 100
					}, {
						name: '{{SGPb}} - Singapura',
						find: /\{\{Flagicon\|(Singapura|Singapore)\}\}/i,
						replace: '{{SGPb}}',
						num: 100
					}, {
						name: '{{SXMb}} - Sint Maarten',
						find: /\{\{Flagicon\|(Sint Maarten)\}\}/i,
						replace: '{{SXMb}}',
						num: 100
					}, {
						name: '{{SYRb}} - Síria',
						find: /\{\{Flagicon\|(S[íy]ria)\}\}/i,
						replace: '{{SYRb}}',
						num: 100
					}, {
						name: '{{SOMb}} - Somália',
						find: /\{\{Flagicon\|(Som[áa]lia)\}\}/i,
						replace: '{{SOMb}}',
						num: 100
					}, {
						name: '{{LKAb}} - Sri Lanka',
						find: /\{\{Flagicon\|(Sri Lanka)\}\}/i,
						replace: '{{LKAb}}',
						num: 100
					}, {
						name: '{{SWZb}} - Suazilândia',
						find: /\{\{Flagicon\|(Suazilândia|Swaziland)\}\}/i,
						replace: '{{SWZb}}',
						num: 100
					}, {
						name: '{{SDNb}} - Sudão',
						find: /\{\{Flagicon\|(Sudan|Sudão)\}\}/i,
						replace: '{{SDNb}}',
						num: 100
					}, {
						name: '{{SWEb}} - Suécia',
						find: /\{\{Flagicon\|(Suécia|Sweden)\}\}/i,
						replace: '{{SWEb}}',
						num: 100
					}, {
						name: '{{CHEb}} - Suiça',
						find: /\{\{Flagicon\|(Switzerland|Suíça)\}\}/i,
						replace: '{{CHEb}}',
						num: 100
					}, {
						name: '{{SURb}} - Suriname',
						find: /\{\{Flagicon\|(Suriname)\}\}/i,
						replace: '{{SURb}}',
						num: 100
					}]
				}, {
					name: '{{Flagicon}} T',
					find: '',
					replace: '',
					num: 1,
					ifhas: /\{\{[Ff]lagicon\|T/,
					sub: [{
						name: '{{TLSb}} - Timor-Leste (1)',
						find: /\{\{Flagicon\|(Timor\-Leste)\}\}/i,
						replace: '{{TLSb}}',
						num: 100
					}, {
						name: '{{NLDb}} - The Netherlands',
						find: /\{\{Flagicon\|(The Netherlands)\}\}/i,
						replace: '{{NLDb}}',
						num: 100
					}, {
						name: '{{TJKb}} - Tadjiquistão',
						find: /\{\{Flagicon\|(Tadjiquistão|Tajikistan)\}\}/i,
						replace: '{{TJKb}}',
						num: 100
					}, {
						name: '{{THAb}} - Tailândia',
						find: /\{\{Flagicon\|(Thailand|Tailândia)\}\}/i,
						replace: '{{THAb}}',
						num: 100
					}, {
						name: '{{TPEb}} - Taipé Chinesa',
						find: /\{\{Flagicon\|(Taipé Chinesa)\}\}/i,
						replace: '{{TPEb}}',
						num: 100
					}, {
						name: '{{TWNb}} - Taiwan',
						find: /\{\{Flagicon\|(Taiwan)\}\}/i,
						replace: '{{TWNb}}',
						num: 100
					}, {
						name: '{{TZAb}} - Tanzânia',
						find: /\{\{Flagicon\|(Tanz[aâ]nia)\}\}/i,
						replace: '{{TZAb}}',
						num: 100
					}, {
						name: '{{TGOb}} - Togo',
						find: /\{\{Flagicon\|(Togo)\}\}/i,
						replace: '{{TGOb}}',
						num: 100
					}, {
						name: '{{TONb}} - Tonga',
						find: /\{\{Flagicon\|(Tonga)\}\}/i,
						replace: '{{TONb}}',
						num: 100
					}, {
						name: '{{TTOb}} - Trinidad e Tobago',
						find: /\{\{Flagicon\|(Trinidad e Tobago|Trinidad and Tobago)\}\}/i,
						replace: '{{TTOb}}',
						num: 100
					}, {
						name: '{{TUNb}} - Tunísia',
						find: /\{\{Flagicon\|(Tun[ií]sia)\}\}/i,
						replace: '{{TUNb}}',
						num: 100
					}, {
						name: '{{TCAb}} - Turcas e Caicos',
						find: /\{\{Flagicon\|(Turcas e Caicos)\}\}/i,
						replace: '{{TCAb}}',
						num: 100
					}, {
						name: '{{TKMb}} - Turcomenistão',
						find: /\{\{Flagicon\|(Turcomenistão|Turkmenistan)\}\}/i,
						replace: '{{TKMb}}',
						num: 100
					}, {
						name: '{{TURb}} - Turquia',
						find: /\{\{Flagicon\|(Turkey|Turquia)\}\}/i,
						replace: '{{TURb}}',
						num: 100
					}, {
						name: '{{TUVb}} - Tuvalu',
						find: /\{\{Flagicon\|(Tuvalu)\}\}/i,
						replace: '{{TUVb}}',
						num: 100
					}]
				}, {
					name: '{{Flagicon}} U',
					find: '',
					replace: '',
					num: 1,
					ifhas: /\{\{[Ff]lagicon\|U/,
					sub: [{
						name: '{{VIRb}} - Ilhas Virgens Americanas (2)',
						find: /\{\{Flagicon\|(United States Virgin Islands)\}\}/i,
						replace: '{{VIRb}}',
						num: 100
					}, {
						name: '{{GBR}} - United Kingdom',
						find: /\{\{Flagicon\|(United Kingdom)\}\}/i,
						replace: '{{GBRb}}',
						num: 100
					}, {
						name: '{{AREb}} - Emirados Árabes Unidos - (2)',
						find: /\{\{Flagicon\|(United Arab Emirates)\}\}/i,
						replace: '{{AREb}}',
						num: 100
					}, {
						name: '{{USAb}} - Estados Unidos - (2)',
						find: /\{\{Flagicon\|(United States)\}\}/i,
						replace: '{{USAb}}',
						num: 100
					}, {
						name: '{{URSb}} - União Soviética (1)',
						find: /\{\{Flagicon\|(União Soviética)\}\}/i,
						replace: '{{URSb}}',
						num: 100
					}, {
						name: '{{UKRb}} - Ucrânia',
						find: /\{\{Flagicon\|(Ucrânia|Ukraine)\}\}/i,
						replace: '{{UKRb}}',
						num: 100
					}, {
						name: '{{UGAb}} - Uganda',
						find: /\{\{Flagicon\|(Uganda)\}\}/i,
						replace: '{{UGAb}}',
						num: 100
					}, {
						name: '{{URYb}} - Uruguai',
						find: /\{\{Flagicon\|(Urugua[iy])\}\}/i,
						replace: '{{URYb}}',
						num: 100
					}, {
						name: '{{UZBb}} - Uzbequistão',
						find: /\{\{Flagicon\|(Uzbequistão|Uzbekistan)\}\}/i,
						replace: '{{UZBb}}',
						num: 100
					}]
				}, {
					name: '{{Flagicon}} V',
					find: '',
					replace: '',
					num: 1,
					ifhas: /\{\{[Ff]lagicon\|V/,
					sub: [{
						name: '{{VUTb}} - Vanuatu',
						find: /\{\{Flagicon\|(Vanuatu)\}\}/i,
						replace: '{{VUTb}}',
						num: 100
					}, {
						name: '{{VATb}} - Vaticano',
						find: /\{\{Flagicon\|(Vaticano|Vatican)\}\}/i,
						replace: '{{VATb}}',
						num: 100
					}, {
						name: '{{VENb}} - Venezuela',
						find: /\{\{Flagicon\|(Venezuela)\}\}/i,
						replace: '{{VENb}}',
						num: 100
					}, {
						name: '{{VNMb}} - Vietnã',
						find: /\{\{Flagicon\|(Vietnã|Vietname|Vietnam)\}\}/i,
						replace: '{{VNMb}}',
						num: 100
					}]
				}, {
					name: '{{Flagicon}} W',
					find: '',
					replace: '',
					num: 1,
					ifhas: /\{\{[Ff]lagicon\|W/,
					sub: [{
						name: '{{WALb}} - País de Gales (2)',
						find: /\{\{Flagicon\|(Wales)\}\}/i,
						replace: '{{WALb}}',
						num: 100
					}]
				}, {
					name: '{{Flagicon}} Y',
					find: '',
					replace: '',
					num: 1,
					ifhas: /\{\{[Ff]lagicon\|Y/,
					sub: [{
						name: '{{YEMb}} - Iémen (2)',
						find: /\{\{Flagicon\|(Y[êée]men)\}\}/i,
						replace: '{{YEMb}}',
						num: 100
					}, {
						name: '{{YUGb}} - Iugoslávia (2)',
						find: /\{\{Flagicon\|(Yugoslavia)\}\}/i,
						replace: '{{YUGb}}',
						num: 100
					}]
				}, {
					name: '{{Flagicon}} Z',
					find: '',
					replace: '',
					num: 1,
					ifhas: /\{\{[Ff]lagicon\|Z/,
					sub: [{
						name: '{{ZAIb}} - Zaire',
						find: /\{\{Flagicon\|(Zaire)\}\}/i,
						replace: '{{ZAIb}}',
						num: 100
					}, {
						name: '{{ZMBb}} - Zâmbia',
						find: /\{\{Flagicon\|(Z[aâ]mbia)\}\}/i,
						replace: '{{ZMBb}}',
						num: 100
					}, {
						name: '{{ZWEb}} - Zimbábue',
						find: /\{\{Flagicon\|(Zimbabwe|Zimbábue)\}\}/i,
						replace: '{{ZWEb}}',
						num: 100
					}]
				}]
			}, {
				name: '{{Flag}}',
				find: '',
				replace: '',
				num: 1,
				ifhas: '{{Flag|', // FIXME: /\{\{Flag|/i ?
				sub: [{
					name: '{{Flag}} A',
					find: '',
					replace: '',
					num: 1,
					ifhas: /\{\{[Ff]lag\|[AÁ]/,
					sub: [{
						name: '{{AHE}} - Império Austro-Húngaro (2)',
						find: /\{\{Flag\|(Austria\-Hungary)\}\}/i,
						replace: '{{AHE}}',
						num: 100
					}, {
						name: '{{DDR}} - Alemanha Oriental (1)',
						find: /\{\{Flag\|(Alemanha Oriental)\}\}/i,
						replace: '{{DDR}}',
						num: 100
					}, {
						name: '{{ASM}} - Samoa Americana (2)',
						find: /\{\{Flag\|(American Samoa)\}\}/i,
						replace: '{{ASM}}',
						num: 100
					}, {
						name: '{{DEUN}} - Alemanha Nazi (1)',
						find: /\{\{Flag\|(Alemanha Nazi|Alemanha Nazista)\}\}/i,
						replace: '{{DEUN}}',
						num: 100
					}, {
						name: '{{AFG}} - Afeganistão',
						find: /\{\{Flag\|(Afghanistan|Afeganistão)\}\}/i,
						replace: '{{AFG}}',
						num: 100
					}, {
						name: '{{ANT}} - Antilhas Holandesas (1)',
						find: /\{\{Flag\|(Antilhas Holandesas)\}\}/i,
						replace: '{{ANT}}',
						num: 100
					}, {
						name: '{{SAU}} - Arábia Saudita (1)',
						find: /\{\{Flag\|(Arábia Saudita)\}\}/i,
						replace: '{{SAU}}',
						num: 100
					}, {
						name: '{{ZAF}} - África do Sul (1)',
						find: /\{\{Flag\|(África do Sul)\}\}/i,
						replace: '{{ZAF}}',
						num: 100
					}, {
						name: '{{ALB}} - Albânia',
						find: /\{\{Flag\|(Alb[aâ]nia)\}\}/i,
						replace: '{{ALB}}',
						num: 100
					}, {
						name: '{{DEU}} - Alemanha (1)',
						find: /\{\{Flag\|(Alemanha)\}\}/i,
						replace: '{{DEU}}',
						num: 100
					}, {
						name: '{{FRG}} - Alemanha Ocidental',
						find: /\{\{Flag\|(Alemanha Ocidental)\}\}/i,
						replace: '{{FRG}}',
						num: 100
					}, {
						name: '{{AND}} - Andorra',
						find: /\{\{Flag\|(Andorra)\}\}/i,
						replace: '{{AND}}',
						num: 100
					}, {
						name: '{{AGO}} - Angola',
						find: /\{\{Flag\|(Angola)\}\}/i,
						replace: '{{AGO}}',
						num: 100
					}, {
						name: '{{AIA}} - Anguilla',
						find: /\{\{Flag\|(Anguilla)\}\}/i,
						replace: '{{AIA}}',
						num: 100
					}, {
						name: '{{ATG}} - Antígua e Barbuda',
						find: /\{\{Flag\|(Antigua and Barbuda)\}\}/i,
						replace: '{{ATG}}',
						num: 100
					}, {
						name: '{{DZA}} - Argélia',
						find: /\{\{Flag\|(Argélia|Algeria)\}\}/i,
						replace: '{{DZA}}',
						num: 100
					}, {
						name: '{{ARG}} - Argentina',
						find: /\{\{Flag\|(Argentina)\}\}/i,
						replace: '{{ARG}}',
						num: 100
					}, {
						name: '{{ARM}} - Armenia',
						find: /\{\{Flag\|(Arm[eé]nia)\}\}/i,
						replace: '{{ARM}}',
						num: 100
					}, {
						name: '{{ABW}} - Aruba',
						find: /\{\{Flag\|(Aruba)\}\}/i,
						replace: '{{ABW}}',
						num: 100
					}, {
						name: '{{AUS}} - Austrália',
						find: /\{\{Flag\|(Austr[áa]lia)\}\}/i,
						replace: '{{AUS}}',
						num: 100
					}, {
						name: '{{AUT}} - Áustria',
						find: /\{\{Flag\|([AÁ]ustria)\}\}/i,
						replace: '{{AUT}}',
						num: 100
					}, {
						name: '{{AZE}} - Azerbaijão',
						find: /\{\{Flag\|(Azerbaij[aã][on])\}\}/i,
						replace: '{{AZE}}',
						num: 100
					}]
				}, {
					name: '{{Flag}} B',
					find: '',
					replace: '',
					num: 1,
					ifhas: /\{\{[Ff]lag\|B/,
					sub: [{
						name: '{{VGB}} - Ilhas Virgens Britânicas (2)',
						find: /\{\{Flag\|(British Virgin Islands)\}\}/i,
						replace: '{{VGB}}',
						num: 100
					}, {
						name: '{{BHS}} - Bahamas',
						find: /\{\{Flag\|(Bahamas)\}\}/i,
						replace: '{{BHS}}',
						num: 100
					}, {
						name: '{{BHR}} - Bahrein',
						find: /\{\{Flag\|(Bahr[ae]in)\}\}/i,
						replace: '{{BHR}}',
						num: 100
					}, {
						name: '{{BGD}} - Bangladesh',
						find: /\{\{Flag\|(Bangladesh)\}\}/i,
						replace: '{{BGD}}',
						num: 100
					}, {
						name: '{{BRB}} - Barbados',
						find: /\{\{Flag\|(Barbados)\}\}/i,
						replace: '{{BRB}}',
						num: 100
					}, {
						name: '{{BEL}} - Bélgica',
						find: /\{\{Flag\|(Bélgica|Belgium(?: \(Civil\))?)\}\}/i,
						replace: '{{BEL}}',
						num: 100
					}, {
						name: '{{BLZ}} - Belize',
						find: /\{\{Flag\|(Belize)\}\}/i,
						replace: '{{BLZ}}',
						num: 100
					}, {
						name: '{{BEN}} - Benin',
						find: /\{\{Flag\|(Beni[nm])\}\}/i,
						replace: '{{BEN}}',
						num: 100
					}, {
						name: '{{BMU}} - Bermudas',
						find: /\{\{Flag\|(Bermudas?)\}\}/i,
						replace: '{{BMU}}',
						num: 100
					}, {
						name: '{{BLR}} - Bielorrússia',
						find: /\{\{Flag\|(Bielorrússia|Belarus)\}\}/i,
						replace: '{{BLR}}',
						num: 100
					}, {
						name: '{{BOL}} - Bolívia',
						find: /\{\{Flag\|(Bol[íi]via|Bolivia \(Plurinational State of\))\}\}/i,
						replace: '{{BOL}}',
						num: 100
					}, {
						name: '{{BIH}} - Bósnia e Herzegovina',
						find: /\{\{Flag\|(Bosnia and Herzegovina|Bósnia e Herzegovina)\}\}/i,
						replace: '{{BIH}}',
						num: 100
					}, {
						name: '{{BWA}} - Botsuana',
						find: /\{\{Flag\|(Bots[wu]ana)\}\}/i,
						replace: '{{BWA}}',
						num: 100
					}, {
						name: '{{BRA}} - Brasil',
						find: /\{\{Flag\|(Bra[zs]il)\}\}/i,
						replace: '{{BRA}}',
						num: 100
					}, {
						name: '{{BRN}} - Brunei',
						find: /\{\{Flag\|(Brunei|Brunei Darussalam)\}\}/i,
						replace: '{{BRN}}',
						num: 100
					}, {
						name: '{{BGR}} - Bulgaria',
						find: /\{\{Flag\|(Bulg[aá]ria)\}\}/i,
						replace: '{{BGR}}',
						num: 100
					}, {
						name: '{{BFA}} - Burkina Faso',
						find: /\{\{Flag\|(Burkina Faso)\}\}/i,
						replace: '{{BFA}}',
						num: 100
					}, {
						name: '{{BDI}} - Burundi',
						find: /\{\{Flag\|(Burundi)\}\}/i,
						replace: '{{BDI}}',
						num: 100
					}, {
						name: '{{BTN}} - Butão',
						find: /\{\{Flag\|(Bhutan|Butão)\}\}/i,
						replace: '{{BTN}}',
						num: 100
					}]
				}, {
					name: '{{Flag}} C',
					find: '',
					replace: '',
					num: 1,
					ifhas: /\{\{[Ff]lag\|C/,
					sub: [{
						name: '{{COL}} - Colômbia',
						find: /\{\{Flag\|(Col[oô]mbia)\}\}/i,
						replace: '{{COL}}',
						num: 100
					}, {
						name: '{{CEC}} - Checoslováquia',
						find: /\{\{Flag\|(Checoslováquia|Czechoslovakia)\}\}/i,
						replace: '{{CEC}}',
						num: 100
					}, {
						name: '{{CZE}} - República Checa (2)',
						find: /\{\{Flag\|(Czech Republic)\}\}/i,
						replace: '{{CZE}}',
						num: 100
					}, {
						name: '{{CAF}} - República Centro-Africana (2)',
						find: /\{\{Flag\|(Central African Republic)\}\}/i,
						replace: '{{CAF}}',
						num: 100
					}, {
						name: '{{COD}} - Congo',
						find: /\{\{Flag\|(Congo)\}\}/i,
						replace: '{{COD}}',
						num: 100
					}, {
						name: '{{CYM}} - Ilhas Cayman (2)',
						find: /\{\{Flag\|(Cayman Islands)\}\}/i,
						replace: '{{CYM}}',
						num: 100
					}, {
						name: '{{COK}} - Ilhas Cook (2)',
						find: /\{\{Flag\|(Cook Islands)\}\}/i,
						replace: '{{COK}}',
						num: 100
					}, {
						name: '{{KAZ}} - Cazaquistão (1)',
						find: /\{\{Flag\|(Cazaquistão)\}\}/i,
						replace: '{{KAZ}}',
						num: 100
					}, {
						name: '{{PRK}} - Coreia do Norte (1)',
						find: /\{\{Flag\|(Cor[eé]ia do Norte)\}\}/i,
						replace: '{{PRK}}',
						num: 100
					}, {
						name: '{{KOR}} - Coreia do Sul (1)',
						find: /\{\{Flag\|(Cor[eé]ia do Sul)\}\}/i,
						replace: '{{KOR}}',
						num: 100
					}, {
						name: '{{CPV}} - Cabo Verde',
						find: /\{\{Flag\|(Cape Verde|Cabo Verde)\}\}/i,
						replace: '{{CPV}}',
						num: 100
					}, {
						name: '{{CMR}} - Camarões',
						find: /\{\{Flag\|(Cameroon|Camarões)\}\}/i,
						replace: '{{CMR}}',
						num: 100
					}, {
						name: '{{KHM}} - Camboja',
						find: /\{\{Flag\|(Cambodia|Camboja)\}\}/i,
						replace: '{{KHM}}',
						num: 100
					}, {
						name: '{{CAN}} - Canadá',
						find: /\{\{Flag\|(Canad[aá])\}\}/i,
						replace: '{{CAN}}',
						num: 100
					}, {
						name: '{{TCD}} - Chade',
						find: /\{\{Flag\|(Chade?)\}\}/i,
						replace: '{{TCD}}',
						num: 100
					}, {
						name: '{{CHL}} - Chile',
						find: /\{\{Flag\|(Chile)\}\}/i,
						replace: '{{CHL}}',
						num: 100
					}, {
						name: '{{CHN}} - China',
						find: /\{\{Flag\|(China)\}\}/i,
						replace: '{{CHN}}',
						num: 100
					}, {
						name: '{{HKG}} - China, Hong Kong Special Administrative Region',
						find: /\{\{Flag\|(China, Hong Kong Special Administrative Region)\}\}/i,
						replace: '{{HKG}}',
						num: 10
					}, {
						name: '{{MAC}} - China, Macao Special Administrative Region',
						find: /\{\{Flag\|(China, Macao Special Administrative Region)\}\}/i,
						replace: '{{MAC}}',
						num: 100
					}, {
						name: '{{CYP}} - Chipre',
						find: /\{\{Flag\|(Cyprus|Chipre)\}\}/i,
						replace: '{{CYP}}',
						num: 100
					}, {
						name: '{{COM}} - Comores',
						find: /\{\{Flag\|(Comor[eo]s)\}\}/i,
						replace: '{{COM}}',
						num: 100
					}, {
						name: '{{COG}} - Congo',
						find: /\{\{Flag\|(Congo)\}\}/i,
						replace: '{{COG}}',
						num: 100
					}, {
						name: '{{CIV}} - Costa do Marfim',
						find: /\{\{Flag\|(Cote d'Ivoire|Costa do Marfim)\}\}/i,
						replace: '{{CIV}}',
						num: 100
					}, {
						name: '{{CRI}} - Costa Rica',
						find: /\{\{Flag\|(Costa Rica)\}\}/i,
						replace: '{{CRI}}',
						num: 100
					}, {
						name: '{{CIV}} - Côte d\'Ivoire',
						find: /\{\{Flag\|(Côte d'Ivoire)\}\}/i,
						replace: '{{CIV}}',
						num: 100
					}, {
						name: '{{HRV}} - Croácia',
						find: /\{\{Flag\|(Croácia|Croatia)\}\}/i,
						replace: '{{HRV}}',
						num: 100
					}, {
						name: '{{CUB}} - Cuba',
						find: /\{\{Flag\|(Cuba)\}\}/i,
						replace: '{{CUB}}',
						num: 100
					}, {
						name: '{{CUR}} - Curaçao',
						find: /\{\{Flag\|(Curaçao)\}\}/i,
						replace: '{{CUR}}',
						num: 100
					}]
				}, {
					name: '{{Flag}} D',
					find: '',
					replace: '',
					num: 1,
					ifhas: /\{\{[Ff]lag\|D/,
					sub: [{
						name: '{{DOM}} - República Dominicana (2)',
						find: /\{\{Flag\|(Dominican Republic)\}\}/i,
						replace: '{{DOM}}',
						num: 100
					}, {
						name: '{{DNK}} - Dinamarca',
						find: /\{\{Flag\|(Dinamarca|Denmark)\}\}/i,
						replace: '{{DNK}}',
						num: 100
					}, {
						name: '{{DJI}} - Djibouti',
						find: /\{\{Flag\|(Djibouti)\}\}/i,
						replace: '{{DJI}}',
						num: 100
					}, {
						name: '{{DMA}} - Dominica',
						find: /\{\{Flag\|(Dominica)\}\}/i,
						replace: '{{DMA}}',
						num: 100
					}, {
						name: '{{COD}} - Democratic Republic of the Congo',
						find: /\{\{Flag\|(Democratic Republic of the Congo)\}\}/i,
						replace: '{{COD}}',
						num: 100
					}, {
						name: '{{PRK}} - Democratic People\'s Republic of Korea',
						find: /\{\{Flag\|(Democratic People's Republic of Korea)\}\}/i,
						replace: '{{PRK}}',
						num: 100
					}]
				}, {
					name: '{{Flag}} E',
					find: '',
					replace: '',
					num: 1,
					ifhas: /\{\{[Ff]lag\|E/,
					sub: [{
						name: '{{DDR}} - Alemanha Oriental (2)',
						find: /\{\{Flag\|(East Germany)\}\}/i,
						replace: '{{DDR}}',
						num: 100
					}, {
						name: '{{TLS}} - Timor-Leste (2)',
						find: /\{\{Flag\|(East Timor)\}\}/i,
						replace: '{{TLS}}',
						num: 100
					}, {
						name: '{{ENG}} - Inglaterra (2)',
						find: /\{\{Flag\|(England)\}\}/i,
						replace: '{{ENG}}',
						num: 100
					}, {
						name: '{{GNQ}} - Guiné Equatorial (2)',
						find: /\{\{Flag\|(Equatorial Guinea)\}\}/i,
						replace: '{{GNQ}}',
						num: 100
					}, {
						name: '{{ARE}} - Emirados Árabes Unidos - (1)',
						find: /\{\{Flag\|(Emirados Árabes Unidos|United Arab Emirates)\}\}/i,
						replace: '{{ARE}}',
						num: 100
					}, {
						name: '{{SCO}} - Escócia - (1)',
						find: /\{\{Flag\|(Escócia)\}\}/i,
						replace: '{{SCO}}',
						num: 100
					}, {
						name: '{{SVK}} - Eslováquia - (1)',
						find: /\{\{Flag\|(Eslováquia)\}\}/i,
						replace: '{{SVK}}',
						num: 100
					}, {
						name: '{{SVN}} - Eslovênia - (1)',
						find: /\{\{Flag\|(Eslovênia)\}\}/i,
						replace: '{{SVN}}',
						num: 100
					}, {
						name: '{{ESP}} - Espanha - (1)',
						find: /\{\{Flag\|(Espanha)\}\}/i,
						replace: '{{ESP}}',
						num: 100
					}, {
						name: '{{FSM}} - Estados Federados da Micronésia - (1)',
						find: /\{\{Flag\|(Estados Federados da Micronésia)\}\}/i,
						replace: '{{FSM}}',
						num: 100
					}, {
						name: '{{USA}} - Estados Unidos',
						find: /\{\{Flag\|(Estados Unidos( da América)?)\}\}/i,
						replace: '{{USA}}',
						num: 100
					}, {
						name: '{{EGY}} - Egito',
						find: /\{\{Flag\|(Egito|Egypt)\}\}/i,
						replace: '{{EGY}}',
						num: 100
					}, {
						name: '{{SLV}} - El Salvador',
						find: /\{\{Flag\|(El Salvador)\}\}/i,
						replace: '{{SLV}}',
						num: 100
					}, {
						name: '{{ECU}} - Equador',
						find: /\{\{Flag\|(E[cq]uador)\}\}/i,
						replace: '{{ECU}}',
						num: 100
					}, {
						name: '{{ERI}} - Eritreia',
						find: /\{\{Flag\|(Eritrei?a)\}\}/i,
						replace: '{{ERI}}',
						num: 100
					}, {
						name: '{{EST}} - Estonia',
						find: /\{\{Flag\|(Est[ôo]nia)\}\}/i,
						replace: '{{EST}}',
						num: 100
					}, {
						name: '{{ETH}} - Etiópia',
						find: /\{\{Flag\|(Etiópia|Ethiopia)\}\}/i,
						replace: '{{ETH}}',
						num: 100
					}, {
						name: '{{EUR}} - Europa',
						find: /\{\{Flag\|(Europ[ae])\}\}/i,
						replace: '{{EUR}}',
						num: 100
					}]
				}, {
					name: '{{Flag}} F',
					find: '',
					replace: '',
					num: 1,
					ifhas: /\{\{[Ff]lag\|F/,
					sub: [{
						name: '{{PYF}} - Polinésia Francesa (2)',
						find: /\{\{Flag\|(French Polynesia)\}\}/i,
						replace: '{{PYF}}',
						num: 100
					}, {
						name: '{{FSM}} - Estados Federados da Micronésia - (2)',
						find: /\{\{Flag\|(Federated States of Micronesia)\}\}/i,
						replace: '{{FSM}}',
						num: 100
					}, {
						name: '{{FRO}} - Ilhas Feroé (2)',
						find: /\{\{Flag\|(Faroe Islands)\}\}/i,
						replace: '{{FRO}}',
						num: 100
					}, {
						name: '{{PHL}} - Filipinas (1)',
						find: /\{\{Flag\|(Filipinas)\}\}/i,
						replace: '{{PHL}}',
						num: 100
					}, {
						name: '{{FJI}} - Fiji',
						find: /\{\{Flag\|(Fiji)\}\}/i,
						replace: '{{FJI}}',
						num: 100
					}, {
						name: '{{FIN}} - Finlândia',
						find: /\{\{Flag\|(Finland|Finlândia)\}\}/i,
						replace: '{{FIN}}',
						num: 100
					}, {
						name: '{{FRA}} - França',
						find: /\{\{Flag\|(Fran[cç][ea])\}\}/i,
						replace: '{{FRA}}',
						num: 100
					}]
				}, {
					name: '{{Flag}} G',
					find: '',
					replace: '',
					num: 1,
					ifhas: /\{\{[Ff]lag\|G/,
					sub: [{
						name: '{{DEU}} - Alemanha (2)',
						find: /\{\{Flag\|(Germany)\}\}/i,
						replace: '{{DEU}}',
						num: 100
					}, {
						name: '{{GNQ}} - Guiné Equatorial (1)',
						find: /\{\{Flag\|(Guiné Equatorial)\}\}/i,
						replace: '{{GNQ}}',
						num: 100
					}, {
						name: '{{GAB}} - Gabão',
						find: /\{\{Flag\|(Gab[oã][no])\}\}/i,
						replace: '{{GAB}}',
						num: 100
					}, {
						name: '{{GMB}} - Gâmbia',
						find: /\{\{Flag\|(G[aâ]mbia)\}\}/i,
						replace: '{{GMB}}',
						num: 100
					}, {
						name: '{{GHA}} - Gana',
						find: /\{\{Flag\|(Ghana|Gana)\}\}/i,
						replace: '{{GHA}}',
						num: 100
					}, {
						name: '{{GEO}} - Geórgia',
						find: /\{\{Flag\|(Ge[oó]rgia)\}\}/i,
						replace: '{{GEO}}',
						num: 100
					}, {
						name: '{{GIB}} - Gibraltar',
						find: /\{\{Flag\|(Gibraltar)\}\}/i,
						replace: '{{GIB}}',
						num: 100
					}, {
						name: '{{GRD}} - Granada',
						find: /\{\{Flag\|(Gr[ea]nada)\}\}/i,
						replace: '{{GRD}}',
						num: 100
					}, {
						name: '{{GRC}} - Grécia',
						find: /\{\{Flag\|(Greece|Grécia)\}\}/i,
						replace: '{{GRC}}',
						num: 100
					}, {
						name: '{{GLP}} - Guadalupe',
						find: /\{\{Flag\|(Guadalupe|Guadeloupe)\}\}/i,
						replace: '{{GLP}}',
						num: 100
					}, {
						name: '{{GUM}} - Guam',
						find: /\{\{Flag\|(Guam)\}\}/i,
						replace: '{{GUM}}',
						num: 100
					}, {
						name: '{{GTM}} - Guatemala',
						find: /\{\{Flag\|(Guatemala)\}\}/i,
						replace: '{{GTM}}',
						num: 100
					}, {
						name: '{{GUY}} - Guiana',
						find: /\{\{Flag\|(Gu[iy]ana)\}\}/i,
						replace: '{{GUY}}',
						num: 100
					}, {
						name: '{{GUF}} - Guiana Francesa',
						find: /\{\{Flag\|(Guiana Francesa)\}\}/i,
						replace: '{{GUF}}',
						num: 100
					}, {
						name: '{{GIN}} - Guiné',
						find: /\{\{Flag\|(Guinea|Guiné)\}\}/i,
						replace: '{{GIN}}',
						num: 100
					}, {
						name: '{{GNB}} - Guiné-Bissau',
						find: /\{\{Flag\|(Guinea\-Bissau|Guiné\-Bissau)\}\}/i,
						replace: '{{GNB}}',
						num: 100
					}]
				}, {
					name: '{{Flag}} H',
					find: '',
					replace: '',
					num: 1,
					ifhas: /\{\{[Ff]lag\|H/,
					sub: [{
						name: '{{HTI}} - Haiti',
						find: /\{\{Flag\|(Haiti)\}\}/i,
						replace: '{{HTI}}',
						num: 100
					}, {
						name: '{{HND}} - Honduras',
						find: /\{\{Flag\|(Honduras)\}\}/i,
						replace: '{{HND}}',
						num: 100
					}, {
						name: '{{HKG}} - Hong Kong',
						find: /\{\{Flag\|(Hong Kong|Hong Kong\-China)\}\}/i,
						replace: '{{HKG}}',
						num: 100
					}, {
						name: '{{HUN}} - Hungria',
						find: /\{\{Flag\|(Hungria|Hungary)\}\}/i,
						replace: '{{HUN}}',
						num: 100
					}]
				}, {
					name: '{{Flag}} I',
					find: '',
					replace: '',
					num: 1,
					ifhas: /\{\{[Ff]lag\|[IÍ]/,
					sub: [{
						name: '{{YUG}} - Iugoslávia (1)',
						find: /\{\{Flag\|(Iugoslávia)\}\}/i,
						replace: '{{YUG}}',
						num: 100
					}, {
						name: '{{AHE}} - Império Austro-Húngaro (1)',
						find: /\{\{Flag\|(Império Austro\-Húngaro)\}\}/i,
						replace: '{{AHE}}',
						num: 100
					}, {
						name: '{{FRO}} - Ilhas Feroé (1)',
						find: /\{\{Flag\|(Ilhas Feroé)\}\}/i,
						replace: '{{FRO}}',
						num: 100
					}, {
						name: '{{SLB}} - Ilhas Salomão (1)',
						find: /\{\{Flag\|(Ilhas Salomão)\}\}/i,
						replace: '{{SLB}}',
						num: 100
					}, {
						name: '{{VIR}} - Ilhas Virgens Americanas (1)',
						find: /\{\{Flag\|(Ilhas Virgens Americanas)\}\}/i,
						replace: '{{VIR}}',
						num: 100
					}, {
						name: '{{VGB}} - Ilhas Virgens Britânicas (1)',
						find: /\{\{Flag\|(Ilhas Virgens Britânicas)\}\}/i,
						replace: '{{VGB}}',
						num: 100
					}, {
						name: '{{ENG}} - Inglaterra (1)',
						find: /\{\{Flag\|(Inglaterra)\}\}/i,
						replace: '{{ENG}}',
						num: 100
					}, {
						name: '{{COK}} - Ilhas Cook (1)',
						find: /\{\{Flag\|(Ilhas Cook)\}\}/i,
						replace: '{{COK}}',
						num: 100
					}, {
						name: '{{CYM}} - Ilhas Cayman (1)',
						find: /\{\{Flag\|(Ilhas Cayman)\}\}/i,
						replace: '{{CYM}}',
						num: 100
					}, {
						name: '{{YEM}} - Iémen (1)',
						find: /\{\{Flag\|(I[êée]men)\}\}/i,
						replace: '{{YEM}}',
						num: 100
					}, {
						name: '{{IND}} - India',
						find: /\{\{Flag\|([IÍ]ndia)\}\}/i,
						replace: '{{IND}}',
						num: 100
					}, {
						name: '{{DEI}} - Índias Orientais Holandesas',
						find: /\{\{Flag\|(Índias Orientais Holandesas)\}\}/i,
						replace: '{{DEI}}',
						num: 100
					}, {
						name: '{{IDN}} - Indonésia',
						find: /\{\{Flag\|(Indon[ée]sia)\}\}/i,
						replace: '{{IDN}}',
						num: 100
					}, {
						name: '{{IRN}} - Irã',
						find: /\{\{Flag\|(Irã|Iran|Iran \(Islamic Republic of\))\}\}/i,
						replace: '{{IRN}}',
						num: 100
					}, {
						name: '{{IRQ}} - Iraque',
						find: /\{\{Flag\|(Iraque|Iraq)\}\}/i,
						replace: '{{IRQ}}',
						num: 100
					}, {
						name: '{{IRL}} - Irlanda',
						find: /\{\{Flag\|(Irlanda|Ireland)\}\}/i,
						replace: '{{IRL}}',
						num: 100
					}, {
						name: '{{NIR}} - Irlanda do Norte',
						find: /\{\{Flag\|(Irlanda do Norte)\}\}/i,
						replace: '{{NIR}}',
						num: 100
					}, {
						name: '{{ISL}} - Islândia',
						find: /\{\{Flag\|(Iceland|Islândia)\}\}/i,
						replace: '{{ISL}}',
						num: 100
					}, {
						name: '{{ISR}} - Israel',
						find: /\{\{Flag\|(Israel)\}\}/i,
						replace: '{{ISR}}',
						num: 100
					}, {
						name: '{{ITA}} - Itália',
						find: /\{\{Flag\|(Itália|Italy)\}\}/i,
						replace: '{{ITA}}',
						num: 100
					}]
				}, {
					name: '{{Flag}} J',
					find: '',
					replace: '',
					num: 1,
					ifhas: /\{\{[Ff]lag\|J/,
					sub: [{
						name: '{{JAM}} - Jamaica',
						find: /\{\{Flag\|(Jamaica)\}\}/i,
						replace: '{{JAM}}',
						num: 100
					}, {
						name: '{{JPN}} - Japáo',
						find: /\{\{Flag\|(Jap[ãa][on])\}\}/i,
						replace: '{{JPN}}',
						num: 100
					}, {
						name: '{{JOR}} - Jordânia',
						find: /\{\{Flag\|(Jordan|Jordânia)\}\}/i,
						replace: '{{JOR}}',
						num: 100
					}]
				}, {
					name: '{{Flag}} K',
					find: '',
					replace: '',
					num: 1,
					ifhas: /\{\{[Ff]lag\|K/,
					sub: [{
						name: '{{KAZ}} - Cazaquistão (2)',
						find: /\{\{Flag\|(Kazakhstan)\}\}/i,
						replace: '{{KAZ}}',
						num: 100
					}, {
						name: '{{KEN}} - Quênia (2)',
						find: /\{\{Flag\|(Kenya)\}\}/i,
						replace: '{{KEN}}',
						num: 100
					}, {
						name: '{{KGZ}} - Quirguistão (2)',
						find: /\{\{Flag\|(Kyrgyzstan)\}\}/i,
						replace: '{{KGZ}}',
						num: 100
					}, {
						name: '{{KIR}} - Kiribati',
						find: /\{\{Flag\|(Kiribati)\}\}/i,
						replace: '{{KIR}}',
						num: 100
					}, {
						name: '{{KOS}} - Kosovo',
						find: /\{\{Flag\|(Kosovo)\}\}/i,
						replace: '{{KOS}}',
						num: 100
					}, {
						name: '{{KWT}} - Kuwait',
						find: /\{\{Flag\|(Kuwait)\}\}/i,
						replace: '{{KWT}}',
						num: 100
					}]
				}, {
					name: '{{Flag}} L',
					find: '',
					replace: '',
					num: 1,
					ifhas: /\{\{[Ff]lag\|L/,
					sub: [{
						name: '{{LAO}} - Laos',
						find: /\{\{Flag\|(Laos|Lao People's Democratic Republic)\}\}/i,
						replace: '{{LAO}}',
						num: 100
					}, {
						name: '{{LSO}} - Lesoto',
						find: /\{\{Flag\|(Lesoth?o)\}\}/i,
						replace: '{{LSO}}',
						num: 100
					}, {
						name: '{{LVA}} - Letônia',
						find: /\{\{Flag\|(Latvia|Letônia)\}\}/i,
						replace: '{{LVA}}',
						num: 100
					}, {
						name: '{{LBN}} - Líbano',
						find: /\{\{Flag\|(Lebanon|Líbano)\}\}/i,
						replace: '{{LBN}}',
						num: 100
					}, {
						name: '{{LBR}} - Libéria',
						find: /\{\{Flag\|(Lib[ée]ria)\}\}/i,
						replace: '{{LBR}}',
						num: 100
					}, {
						name: '{{LBY}} - Líbia',
						find: /\{\{Flag\|(L[íi]b[iy]a|Libyan Arab Jamahiriya)\}\}/i,
						replace: '{{LBY}}',
						num: 100
					}, {
						name: '{{LIE}} - Liechtenstein',
						find: /\{\{Flag\|(Liechtenstein)\}\}/i,
						replace: '{{LIE}}',
						num: 100
					}, {
						name: '{{LTU}} - Lituânia',
						find: /\{\{Flag\|(Lituânia|Lithuania)\}\}/i,
						replace: '{{LTU}}',
						num: 100
					}, {
						name: '{{LUX}} - Luxemburgo',
						find: /\{\{Flag\|(Luxemburgo|Luxembourg)\}\}/i,
						replace: '{{LUX}}',
						num: 100
					}]
				}, {
					name: '{{Flag}} M',
					find: '',
					replace: '',
					num: 1,
					ifhas: /\{\{[Ff]lag\|M/,
					sub: [{
						name: '{{MAC}} - Macau',
						find: /\{\{Flag\|(Macau)\}\}/i,
						replace: '{{MAC}}',
						num: 100
					}, {
						name: '{{MKD}} - Macedônia',
						find: /\{\{Flag\|(Maced[oóô]nia)\}\}/i,
						replace: '{{MKD}}',
						num: 100
					}, {
						name: '{{MDG}} - Madagascar',
						find: /\{\{Flag\|(Madag[áa]scar)\}\}/i,
						replace: '{{MDG}}',
						num: 100
					}, {
						name: '{{MYS}} - Malásia',
						find: /\{\{Flag\|(Malásia|Malaysia)\}\}/i,
						replace: '{{MYS}}',
						num: 100
					}, {
						name: '{{MWI}} - Malawi',
						find: /\{\{Flag\|(Malawi)\}\}/i,
						replace: '{{MWI}}',
						num: 100
					}, {
						name: '{{MDV}} - Maldivas',
						find: /\{\{Flag\|(Maldiv[ae]s)\}\}/i,
						replace: '{{MDV}}',
						num: 100
					}, {
						name: '{{MLI}} - Mali',
						find: /\{\{Flag\|(Mali)\}\}/i,
						replace: '{{MLI}}',
						num: 100
					}, {
						name: '{{MLT}} - Malta',
						find: /\{\{Flag\|(Malta)\}\}/i,
						replace: '{{MLT}}',
						num: 100
					}, {
						name: '{{MAR}} - Marrocos',
						find: /\{\{Flag\|(M[ao]rocco|Marrocos)\}\}/i,
						replace: '{{MAR}}',
						num: 100
					}, {
						name: '{{MHL}} - Marshall Islands',
						find: /\{\{Flag\|(Marshall Islands)\}\}/i,
						replace: '{{MHL}}',
						num: 100
					}, {
						name: '{{MTQ}} - Martinica',
						find: /\{\{Flag\|(Martinica|Martinique)\}\}/i,
						replace: '{{MTQ}}',
						num: 100
					}, {
						name: '{{MUS}} - Maurícia',
						find: /\{\{Flag\|(Maurícia|Mauritius)\}\}/i,
						replace: '{{MUS}}',
						num: 100
					}, {
						name: '{{MRT}} - Mauritania',
						find: /\{\{Flag\|(Maurit[aâ]nia)\}\}/i,
						replace: '{{MRT}}',
						num: 100
					}, {
						name: '{{MEX}} - México',
						find: /\{\{Flag\|(M[eé]xico)\}\}/i,
						replace: '{{MEX}}',
						num: 100
					}, {
						name: '{{FSM}} - Micronésia',
						find: /\{\{Flag\|(Micronésia|Micronesia \(Federated States of\))\}\}/i,
						replace: '{{FSM}}',
						num: 100
					}, {
						name: '{{MMR}} - Mianmar',
						find: /\{\{Flag\|(M[iy]anmar)\}\}/i,
						replace: '{{MMR}}',
						num: 100
					}, {
						name: '{{MOZ}} - Moçambique',
						find: /\{\{Flag\|(Mo[zç]ambique)\}\}/i,
						replace: '{{MOZ}}',
						num: 100
					}, {
						name: '{{MDA}} - Moldávia',
						find: /\{\{Flag\|(Moldova|Moldávia)\}\}/i,
						replace: '{{MDA}}',
						num: 100
					}, {
						name: '{{MCO}} - Mônaco',
						find: /\{\{Flag\|(M[oôó]naco)\}\}/i,
						replace: '{{MCO}}',
						num: 100
					}, {
						name: '{{MNG}} - Mongolia',
						find: /\{\{Flag\|(Mong[óo]lia)\}\}/i,
						replace: '{{MNG}}',
						num: 100
					}, {
						name: '{{MNE}} - Montenegro',
						find: /\{\{Flag\|(Montenegro)\}\}/i,
						replace: '{{MNE}}',
						num: 100
					}, {
						name: '{{MSR}} - Monserrate',
						find: /\{\{Flag\|(Monserrate|Montserrat)\}\}/i,
						replace: '{{MSR}}',
						num: 100
					}]
				}, {
					name: '{{Flag}} N',
					find: '',
					replace: '',
					num: 1,
					ifhas: /\{\{[Ff]lag\|N/,
					sub: [{
						name: '{{DEUN}} - Alemanha Nazi (2)',
						find: /\{\{Flag\|(Nazi Germany)\}\}/i,
						replace: '{{DEUN}}',
						num: 100
					}, {
						name: '{{PRK}} - Coreia do Norte (2)',
						find: /\{\{Flag\|(North Korea)\}\}/i,
						replace: '{{PRK}}',
						num: 100
					}, {
						name: '{{ANT}} - Antilhas Holandesas (2)',
						find: /\{\{Flag\|(Netherlands Antilles)\}\}/i,
						replace: '{{ANT}}',
						num: 100
					}, {
						name: '{{NLD}} - Netherlands',
						find: /\{\{Flag\|(Netherlands)\}\}/i,
						replace: '{{NLD}}',
						num: 100
					}, {
						name: '{{NAM}} - Namíbia',
						find: /\{\{Flag\|(Nam[íi]bia)\}\}/i,
						replace: '{{NAM}}',
						num: 100
					}, {
						name: '{{NRU}} - Nauru',
						find: /\{\{Flag\|(Nauru)\}\}/i,
						replace: '{{NRU}}',
						num: 100
					}, {
						name: '{{NPL}} - Nepal',
						find: /\{\{Flag\|(Nepal)\}\}/i,
						replace: '{{NPL}}',
						num: 100
					}, {
						name: '{{NIC}} - Nicaragua',
						find: /\{\{Flag\|(Nicar[aá]gua)\}\}/i,
						replace: '{{NIC}}',
						num: 100
					}, {
						name: '{{NER}} - Níger',
						find: /\{\{Flag\|(N[íi]ger)\}\}/i,
						replace: '{{NER}}',
						num: 100
					}, {
						name: '{{NGA}} - Nigéria',
						find: /\{\{Flag\|(Nig[ée]ria)\}\}/i,
						replace: '{{NGA}}',
						num: 100
					}, {
						name: '{{NIU}} - Niue',
						find: /\{\{Flag\|(Niue)\}\}/i,
						replace: '{{NIU}}',
						num: 100
					}, {
						name: '{{NOR}} - Noruega',
						find: /\{\{Flag\|(Norway|Noruega)\}\}/i,
						replace: '{{NOR}}',
						num: 100
					}, {
						name: '{{NCL}} - Nova Caledônia',
						find: /\{\{Flag\|(Nova Caledônia)\}\}/i,
						replace: '{{NCL}}',
						num: 100
					}, {
						name: '{{NZL}} - Nova Zelândia',
						find: /\{\{Flag\|(New Zealand|Nova Zelândia)\}\}/i,
						replace: '{{NZL}}',
						num: 100
					}]
				}, {
					name: '{{Flag}} O',
					find: '',
					replace: '',
					num: 1,
					ifhas: /\{\{[Ff]lag\|O/,
					sub: [{
						name: '{{OMN}} - Omã',
						find: /\{\{Flag\|(Oman|Omã)\}\}/i,
						replace: '{{OMN}}',
						num: 100
					}, {
						name: '{{PSE}} - Occupied Palestinian Territory',
						find: /\{\{Flag\|(Occupied Palestinian Territory)\}\}/i,
						replace: '{{PSE}}',
						num: 100
					}]
				}, {
					name: '{{Flag}} P',
					find: '',
					replace: '',
					num: 1,
					ifhas: /\{\{[Ff]lag\|P/,
					sub: [{
						name: '{{PHL}} - Filipinas (2)',
						find: /\{\{Flag\|(Philippines)\}\}/i,
						replace: '{{PHL}}',
						num: 100
					}, {
						name: '{{WAL}} - País de Gales (1)',
						find: /\{\{Flag\|(País de Gales)\}\}/i,
						replace: '{{WAL}}',
						num: 100
					}, {
						name: '{{NLD}} - Países Baixos (1)',
						find: /\{\{Flag\|(Países Baixos)\}\}/i,
						replace: '{{NLD}}',
						num: 100
					}, {
						name: '{{PYF}} - Polinésia Francesa (1)',
						find: /\{\{Flag\|(Polinésia Francesa)\}\}/i,
						replace: '{{PYF}}',
						num: 100
					}, {
						name: '{{PLW}} - Palau',
						find: /\{\{Flag\|(Palau)\}\}/i,
						replace: '{{PLW}}',
						num: 100
					}, {
						name: '{{PSE}} - Palestina',
						find: /\{\{Flag\|(Palestin[ea])\}\}/i,
						replace: '{{PSE}}',
						num: 100
					}, {
						name: '{{PAN}} - Panamá',
						find: /\{\{Flag\|(Panam[áa])\}\}/i,
						replace: '{{PAN}}',
						num: 100
					}, {
						name: '{{PNG}} - Papua-Nova Guiné',
						find: /\{\{Flag\|(Papua\-Nova Guiné|Papua New Guinea)\}\}/i,
						replace: '{{PNG}}',
						num: 100
					}, {
						name: '{{PRY}} - Paraguai',
						find: /\{\{Flag\|(Paragua[iy])\}\}/i,
						replace: '{{PRY}}',
						num: 100
					}, {
						name: '{{PAK}} - Paquistão',
						find: /\{\{Flag\|(Paquistão|Pakistan)\}\}/i,
						replace: '{{PAK}}',
						num: 100
					}, {
						name: '{{PER}} - Peru',
						find: /\{\{Flag\|(Peru)\}\}/i,
						replace: '{{PER}}',
						num: 100
					}, {
						name: '{{POL}} - Polônia',
						find: /\{\{Flag\|(Pol[oôó]nia|Poland)\}\}/i,
						replace: '{{POL}}',
						num: 100
					}, {
						name: '{{PRI}} - Porto Rico',
						find: /\{\{Flag\|(Porto Rico|Puerto Rico)\}\}/i,
						replace: '{{PRI}}',
						num: 100
					}, {
						name: '{{PRT}} - Portugal',
						find: /\{\{Flag\|(Portugal)\}\}/i,
						replace: '{{PRT}}',
						num: 100
					}]
				}, {
					name: '{{Flag}} Q',
					find: '',
					replace: '',
					num: 1,
					ifhas: /\{\{[Ff]lag\|Q/,
					sub: [{
						name: '{{KEN}} - Quênia (1)',
						find: /\{\{Flag\|(Quênia)\}\}/i,
						replace: '{{KEN}}',
						num: 100
					}, {
						name: '{{KGZ}} - Quirguistão (1)',
						find: /\{\{Flag\|(Quirguistão)\}\}/i,
						replace: '{{KGZ}}',
						num: 100
					}, {
						name: '{{QAT}} - Qatar',
						find: /\{\{Flag\|(Qatar)\}\}/i,
						replace: '{{QAT}}',
						num: 100
					}]
				}, {
					name: '{{Flag}} R',
					find: '',
					replace: '',
					num: 1,
					ifhas: /\{\{[Ff]lag\|R/,
					sub: [{
						name: '{{DOM}} - República Dominicana (1)',
						find: /\{\{Flag\|(República Dominicana)\}\}/i,
						replace: '{{DOM}}',
						num: 100
					}, {
						name: '{{MKD}} - Republic of Macedonia',
						find: /\{\{Flag\|(Republic of Macedonia)\}\}/i,
						replace: '{{MKD}}',
						num: 100
					}, {
						name: '{{MDA}} - Republic of Moldova',
						find: /\{\{Flag\|(Republic of Moldova)\}\}/i,
						replace: '{{MDA}}',
						num: 100
					}, {
						name: '{{GBR}} - Reino Unido',
						find: /\{\{Flag\|(Reino Unido)\}\}/i,
						replace: '{{GBR}}',
						num: 100
					}, {
						name: '{{CZE}} - República Checa (1)',
						find: /\{\{Flag\|(República Checa)\}\}/i,
						replace: '{{CZE}}',
						num: 100
					}, {
						name: '{{CAF}} - República Centro-Africana (1)',
						find: /\{\{Flag\|(República Centro\-Africana)\}\}/i,
						replace: '{{CAF}}',
						num: 100
					}, {
						name: '{{KOR}} - Coreia do Sul (2)',
						find: /\{\{Flag\|(Republic of Korea)\}\}/i,
						replace: '{{KOR}}',
						num: 100
					}, {
						name: '{{ROU}} - Romênia',
						find: /\{\{Flag\|(Rom[aê]nia)\}\}/i,
						replace: '{{ROU}}',
						num: 100
					}, {
						name: '{{RWA}} - Ruanda',
						find: /\{\{Flag\|(R[wu]anda)\}\}/i,
						replace: '{{RWA}}',
						num: 100
					}, {
						name: '{{RUS}} - Rússia',
						find: /\{\{Flag\|(R[úu]ssia|Russian Federation)\}\}/i,
						replace: '{{RUS}}',
						num: 100
					}]
				}, {
					name: '{{Flag}} S',
					find: '',
					replace: '',
					num: 1,
					ifhas: /\{\{[Ff]lag\|S/,
					sub: [{
						name: '{{SCO}} - Escócia - (2)',
						find: /\{\{Flag\|(Scotland)\}\}/i,
						replace: '{{SCO}}',
						num: 100
					}, {
						name: '{{YUG}} - SFR Yugoslavia',
						find: /\{\{Flag\|(SFR Yugoslavia)\}\}/i,
						replace: '{{YUG}}',
						num: 100
					}, {
						name: '{{SVK}} - Eslováquia - (2)',
						find: /\{\{Flag\|(Slovakia)\}\}/i,
						replace: '{{SVK}}',
						num: 100
					}, {
						name: '{{SVN}} - Eslovênia - (2)',
						find: /\{\{Flag\|(Slovenia)\}\}/i,
						replace: '{{SVN}}',
						num: 100
					}, {
						name: '{{ESP}} - Espanha - (2)',
						find: /\{\{Flag\|(Spain)\}\}/i,
						replace: '{{ESP}}',
						num: 100
					}, {
						name: '{{SLB}} - Ilhas Salomão (2)',
						find: /\{\{Flag\|(Solomon Islands)\}\}/i,
						replace: '{{SLB}}',
						num: 100
					}, {
						name: '{{KOR}} - Coreia do Sul (2)',
						find: /\{\{Flag\|(South Korea)\}\}/i,
						replace: '{{KOR}}',
						num: 100
					}, {
						name: '{{ZAF}} - África do Sul (2)',
						find: /\{\{Flag\|(South Africa)\}\}/i,
						replace: '{{ZAF}}',
						num: 100
					}, {
						name: '{{SAU}} - Arábia Saudita (2)',
						find: /\{\{Flag\|(Saudi Arabia)\}\}/i,
						replace: '{{SAU}}',
						num: 100
					}, {
						name: '{{URS}} - União Soviética (2)',
						find: /\{\{Flag\|(Soviet Union)\}\}/i,
						replace: '{{URS}}',
						num: 100
					}, {
						name: '{{SCG}} - Sérvia e Montenegro',
						find: /\{\{Flag\|(Sérvia e Montenegro|Serbia and Montenegro)\}\}/i,
						replace: '{{SCG}}',
						num: 100
					}, {
						name: '{{ASM}} - Samoa Americana (1)',
						find: /\{\{Flag\|(Samoa Americana)\}\}/i,
						replace: '{{ASM}}',
						num: 100
					}, {
						name: '{{WSM}} - Samoa',
						find: /\{\{Flag\|(Samoa)\}\}/i,
						replace: '{{WSM}}',
						num: 100
					}, {
						name: '{{LCA}} - Santa Lúcia',
						find: /\{\{Flag\|(Santa Lúcia|Saint Lucia)\}\}/i,
						replace: '{{LCA}}',
						num: 100
					}, {
						name: '{{KNA}} - São Cristóvão e Névis',
						find: /\{\{Flag\|(Saint Kitts and Nevis|São Cristóvão e Névis)\}\}/i,
						replace: '{{KNA}}',
						num: 100
					}, {
						name: '{{SMR}} - São Marinho',
						find: /\{\{Flag\|(São Marinho|San Marino)\}\}/i,
						replace: '{{SMR}}',
						num: 100
					}, {
						name: '{{STP}} - São Tomé e Príncipe',
						find: /\{\{Flag\|(São Tomé e Príncipe|Sao Tome and Principe)\}\}/i,
						replace: '{{STP}}',
						num: 100
					}, {
						name: '{{VCT}} - São Vicente e Granadinas',
						find: /\{\{Flag\|(São Vicente e Granadinas|Saint Vincent and the Grenadines)\}\}/i,
						replace: '{{VCT}}',
						num: 100
					}, {
						name: '{{SEN}} - Senegal',
						find: /\{\{Flag\|(Senegal)\}\}/i,
						replace: '{{SEN}}',
						num: 100
					}, {
						name: '{{SLE}} - Serra Leoa',
						find: /\{\{Flag\|(Sierra Leone|Serra Leoa)\}\}/i,
						replace: '{{SLE}}',
						num: 100
					}, {
						name: '{{SRB}} - Sérvia',
						find: /\{\{Flag\|(S[ée]r[bv]ia)\}\}/i,
						replace: '{{SRB}}',
						num: 100
					}, {
						name: '{{SYC}} - Seychelles',
						find: /\{\{Flag\|(Seychelles)\}\}/i,
						replace: '{{SYC}}',
						num: 100
					}, {
						name: '{{SGP}} - Singapura',
						find: /\{\{Flag\|(Singapura|Singapore)\}\}/i,
						replace: '{{SGP}}',
						num: 100
					}, {
						name: '{{SXM}} - Sint Maarten',
						find: /\{\{Flag\|(Sint Maarten)\}\}/i,
						replace: '{{SXM}}',
						num: 100
					}, {
						name: '{{SYR}} - Síria',
						find: /\{\{Flag\|(S[íy]ria)\}\}/i,
						replace: '{{SYR}}',
						num: 100
					}, {
						name: '{{SVK}} - Slovak Republic',
						find: /\{\{Flag\|(Slovak Republic)\}\}/i,
						replace: '{{SVK}}',
						num: 100
					}, {
						name: '{{SOM}} - Somália',
						find: /\{\{Flag\|(Som[áa]lia)\}\}/i,
						replace: '{{SOM}}',
						num: 100
					}, {
						name: '{{LKA}} - Sri Lanka',
						find: /\{\{Flag\|(Sri Lanka)\}\}/i,
						replace: '{{LKA}}',
						num: 100
					}, {
						name: '{{SWZ}} - Suazilândia',
						find: /\{\{Flag\|(Suazilândia|Swaziland)\}\}/i,
						replace: '{{SWZ}}',
						num: 100
					}, {
						name: '{{SDN}} - Sudão',
						find: /\{\{Flag\|(Sudan|Sudão)\}\}/i,
						replace: '{{SDN}}',
						num: 100
					}, {
						name: '{{SWE}} - Suécia',
						find: /\{\{Flag\|(Suécia|Sweden)\}\}/i,
						replace: '{{SWE}}',
						num: 100
					}, {
						name: '{{CHE}} - Suiça',
						find: /\{\{Flag\|(Switzerland|Suíça)\}\}/i,
						replace: '{{CHE}}',
						num: 100
					}, {
						name: '{{SUR}} - Suriname',
						find: /\{\{Flag\|(Suriname)\}\}/i,
						replace: '{{SUR}}',
						num: 100
					}, {
						name: '{{SYR}} - Syrian Arab Republic',
						find: /\{\{Flag\|(Syrian Arab Republic)\}\}/i,
						replace: '{{SYR}}',
						num: 100
					}]
				}, {
					name: '{{Flag}} T',
					find: '',
					replace: '',
					num: 1,
					ifhas: /\{\{[Ff]lag\|T/,
					sub: [{
						name: '{{TLS}} - Timor-Leste (1)',
						find: /\{\{Flag\|(Timor\-Leste)\}\}/i,
						replace: '{{TLS}}',
						num: 100
					}, {
						name: '{{NLD}} - The Netherlands',
						find: /\{\{Flag\|(The Netherlands)\}\}/i,
						replace: '{{NLD}}',
						num: 100
					}, {
						name: '{{TJK}} - Tadjiquistão',
						find: /\{\{Flag\|(Tadjiquistão|Tajikistan)\}\}/i,
						replace: '{{TJK}}',
						num: 100
					}, {
						name: '{{THA}} - Tailândia',
						find: /\{\{Flag\|(Thailand|Tailândia)\}\}/i,
						replace: '{{THA}}',
						num: 100
					}, {
						name: '{{TPE}} - Taipé Chinesa',
						find: /\{\{Flag\|(Taipé Chinesa)\}\}/i,
						replace: '{{TPE}}',
						num: 100
					}, {
						name: '{{TWN}} - Taiwan',
						find: /\{\{Flag\|(Taiwan)\}\}/i,
						replace: '{{TWN}}',
						num: 100
					}, {
						name: '{{TZA}} - Tanzânia',
						find: /\{\{Flag\|(Tanz[aâ]nia)\}\}/i,
						replace: '{{TZA}}',
						num: 100
					}, {
						name: '{{MKD}} - The former Yugoslav Republic of Macedonia',
						find: /\{\{Flag\|(The former Yugoslav Republic of Macedonia)\}\}/i,
						replace: '{{MKD}}',
						num: 100
					}, {
						name: '{{TGO}} - Togo',
						find: /\{\{Flag\|(Togo)\}\}/i,
						replace: '{{TGO}}',
						num: 100
					}, {
						name: '{{TKL}} - Tokelau',
						find: /\{\{Flag\|(Tokelau)\}\}/i,
						replace: '{{TKL}}',
						num: 100
					}, {
						name: '{{TON}} - Tonga',
						find: /\{\{Flag\|(Tonga)\}\}/i,
						replace: '{{TON}}',
						num: 100
					}, {
						name: '{{TTO}} - Trinidad e Tobago',
						find: /\{\{Flag\|(Trinidad e Tobago|Trinidad and Tobago)\}\}/i,
						replace: '{{TTO}}',
						num: 100
					}, {
						name: '{{TUN}} - Tunísia',
						find: /\{\{Flag\|(Tun[ií]sia)\}\}/i,
						replace: '{{TUN}}',
						num: 100
					}, {
						name: '{{TCA}} - Turcas e Caicos',
						find: /\{\{Flag\|(Turcas e Caicos|Turks and Caicos Islands)\}\}/i,
						replace: '{{TCA}}',
						num: 100
					}, {
						name: '{{TKM}} - Turcomenistão',
						find: /\{\{Flag\|(Turcomenistão|Turkmenistan)\}\}/i,
						replace: '{{TKM}}',
						num: 100
					}, {
						name: '{{TUR}} - Turquia',
						find: /\{\{Flag\|(Turkey|Turquia)\}\}/i,
						replace: '{{TUR}}',
						num: 100
					}, {
						name: '{{TUV}} - Tuvalu',
						find: /\{\{Flag\|(Tuvalu)\}\}/i,
						replace: '{{TUV}}',
						num: 100
					}]
				}, {
					name: '{{Flag}} U',
					find: '',
					replace: '',
					num: 1,
					ifhas: /\{\{[Ff]lag\|U/,
					sub: [{
						name: '{{UKR}} - Ucrânia',
						find: /\{\{Flag\|(Ucrânia|Ukraine)\}\}/i,
						replace: '{{UKR}}',
						num: 100
					}, {
						name: '{{UGA}} - Uganda',
						find: /\{\{Flag\|(Uganda)\}\}/i,
						replace: '{{UGA}}',
						num: 100
					}, {
						name: '{{URS}} - União Soviética (1)',
						find: /\{\{Flag\|(União Soviética)\}\}/i,
						replace: '{{URS}}',
						num: 100
					}, {
						name: '{{ARE}} - United Arab Emirates',
						find: /\{\{Flag\|(United Arab Emirates)\}\}/i,
						replace: '{{ARE}}',
						num: 100
					}, {
						name: '{{GBR}} - United Kingdom',
						find: /\{\{Flag\|(United Kingdom|United Kingdom of Great Britain and Northern Ireland)\}\}/i,
						replace: '{{GBR}}',
						num: 100
					}, {
						name: '{{TZA}} - United Republic of Tanzania',
						find: /\{\{Flag\|(United Republic of Tanzania)\}\}/i,
						replace: '{{TZA}}',
						num: 100
					}, {
						name: '{{USA}} - United States',
						find: /\{\{Flag\|(United States|United States of America)\}\}/i,
						replace: '{{USA}}',
						num: 100
					}, {
						name: '{{VIR}} - United States Virgin Islands',
						find: /\{\{Flag\|(United States Virgin Islands)\}\}/i,
						replace: '{{VIR}}',
						num: 100
					}, {
						name: '{{URY}} - Uruguai',
						find: /\{\{Flag\|(Urugua[iy])\}\}/i,
						replace: '{{URY}}',
						num: 100
					}, {
						name: '{{UZB}} - Uzbequistão',
						find: /\{\{Flag\|(Uzbequistão|Uzbekistan)\}\}/i,
						replace: '{{UZB}}',
						num: 100
					}]
				}, {
					name: '{{Flag}} V',
					find: '',
					replace: '',
					num: 1,
					ifhas: /\{\{[Ff]lag\|V/,
					sub: [{
						name: '{{VUT}} - Vanuatu',
						find: /\{\{Flag\|(Vanuatu)\}\}/i,
						replace: '{{VUT}}',
						num: 100
					}, {
						name: '{{VAT}} - Vaticano',
						find: /\{\{Flag\|(Vaticano|Vatican)\}\}/i,
						replace: '{{VAT}}',
						num: 100
					}, {
						name: '{{VEN}} - Venezuela',
						find: /\{\{Flag\|(Venezuela|Venezuela \(Bolivarian Republic of\))\}\}/i,
						replace: '{{VEN}}',
						num: 100
					}, {
						name: '{{VNM}} - Vietnã',
						find: /\{\{Flag\|(Vietnã|Vietname|Viet ?nam)\}\}/i,
						replace: '{{VNM}}',
						num: 100
					}]
				}, {
					name: '{{Flag}} W',
					find: '',
					replace: '',
					num: 1,
					ifhas: /\{\{[Ff]lag\|W/,
					sub: [{
						name: '{{WAL}} - País de Gales (2)',
						find: /\{\{Flag\|(Wales)\}\}/i,
						replace: '{{WAL}}',
						num: 100
					}]
				}, {
					name: '{{Flag}} Y',
					find: '',
					replace: '',
					num: 1,
					ifhas: /\{\{[Ff]lag\|Y/,
					sub: [{
						name: '{{YEM}} - Iémen (2)',
						find: /\{\{Flag\|(Y[êée]men)\}\}/i,
						replace: '{{YEM}}',
						num: 100
					}, {
						name: '{{YUG}} - Iugoslávia (2)',
						find: /\{\{Flag\|(Yugoslavia)\}\}/i,
						replace: '{{YUG}}',
						num: 100
					}]
				}, {
					name: '{{Flag}} Z',
					find: '',
					replace: '',
					num: 1,
					ifhas: /\{\{[Ff]lag\|Z/,
					sub: [{
						name: '{{ZAI}} - Zaire',
						find: /\{\{Flag\|(Zaire)\}\}/i,
						replace: '{{ZAI}}',
						num: 100
					}, {
						name: '{{ZMB}} - Zâmbia',
						find: /\{\{Flag\|(Z[aâ]mbia)\}\}/i,
						replace: '{{ZMB}}',
						num: 100
					}, {
						name: '{{ZWE}} - Zimbábue',
						find: /\{\{Flag\|(Zimbabwe|Zimbábue)\}\}/i,
						replace: '{{ZWE}}',
						num: 100
					}]
				}]
			}, {
				name: '{{Flagicon|BRA}}',
				find: /\{\{[Ff]lagicon\|([A-Z][A-Z][A-Z]?[A-Z]?)\}\}/,
				replace: '{{$1b}}',
				num: 100
			}, {
				name: '{{XXXx}}',
				find: '',
				replace: '',
				num: 1,
				ifhas: /\{\{[A-Z]{3,4}[a-z]?\}\}/,
				sub: [{
					name: 'Redirects {{BRA}}',
					find: '',
					replace: '',
					num: 1,
					ifhas: /\{\{[A-Z][A-Z]/,
					sub: [{
						name: 'A',
						find: '',
						replace: '',
						num: 1,
						ifhas: /\{\{A[A-Z][A-Z]/,
						sub: [{
							name: '{{ALG}}',
							find: /\{\{ALG(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/,
							replace: '{{DZA$1}}',
							num: 100
						}, {
							name: '{{ANG}}',
							find: /\{\{ANG(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/,
							replace: '{{AGO$1}}',
							num: 100
						}, {
							name: '{{ARU}}',
							find: /\{\{ARU(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/,
							replace: '{{ABW$1}}',
							num: 100
						}, {
							name: '{{ASA}}',
							find: /\{\{ASA(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/,
							replace: '{{ASM$1}',
							num: 100
						}, {
							name: '{{ALE}}',
							find: /\{\{ALE(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/i,
							replace: '{{DEU$1}}',
							num: 1
						}]
					}, {
						name: 'B',
						find: '',
						replace: '',
						num: 1,
						ifhas: /\{\{B[A-Z][A-Z]/,
						sub: [{
							name: '{{BAH}}',
							find: /\{\{BAH(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/,
							replace: '{{BHS$1}}',
							num: 100
						}, {
							name: '{{BAN}}',
							find: /\{\{BAN(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/,
							replace: '{{BGD$1}}',
							num: 100
						}, {
							name: '{{BER}}',
							find: /\{\{BER(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/,
							replace: '{{BMU$1}}',
							num: 100
						}, {
							name: '{{BHU}}',
							find: /\{\{BHU(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/,
							replace: '{{BTN$1}}',
							num: 100
						}, {
							name: '{{BOT}}',
							find: /\{\{BOT(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/,
							replace: '{{BWA$1}}',
							num: 100
						}, {
							name: '{{BRU}}',
							find: /\{\{BRU(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/,
							replace: '{{BRN$1}}',
							num: 100
						}, {
							name: '{{BUL}}',
							find: /\{\{BUL(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/,
							replace: '{{BGR$1}}',
							num: 100
						}]
					}, {
						name: 'C',
						find: '',
						replace: '',
						num: 1,
						ifhas: /\{\{C[A-Z][A-Z]/,
						sub: [{
							name: '{{CAY}}',
							find: /\{\{CAY(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/,
							replace: '{{CYM$1}}',
							num: 100
						}, {
							name: '{{CHA}}',
							find: /\{\{CHA(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/,
							replace: '{{TCD$1}}',
							num: 100
						}, {
							name: '{{CHI}}',
							find: /\{\{CHI(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/,
							replace: '{{CHL$1}}',
							num: 100
						}, {
							name: '{{CRC}}',
							find: /\{\{CRC(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/,
							replace: '{{CRI$1}}',
							num: 100
						}, {
							name: '{{CRO}}',
							find: /\{\{CRO(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/,
							replace: '{{HRV$1}}',
							num: 100
						}]
					}, {
						name: 'G',
						find: '',
						replace: '',
						num: 1,
						ifhas: /\{\{G[A-Z][A-Z]/,
						sub: [{
							name: '{{GBS}}',
							find: /\{\{GBS(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/,
							replace: '{{GNB$1}}',
							num: 100
						}, {
							name: '{{GEQ}}',
							find: /\{\{GEQ(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/,
							replace: '{{GNQ$1}}',
							num: 100
						}, {
							name: '{{GER}}',
							find: /\{\{GER(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/,
							replace: '{{DEU$1}}',
							num: 100
						}, {
							name: '{{GPE}}',
							find: /\{\{GPE(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/,
							replace: '{{GLP$1}}',
							num: 100
						}, {
							name: '{{GRE}}',
							find: /\{\{GRE(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/,
							replace: '{{GRC$1}}',
							num: 100
						}, {
							name: '{{GUA}}',
							find: /\{\{GUA(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/,
							replace: '{{GTM$1}}',
							num: 100
						}]
					}, {
						name: 'I',
						find: '',
						replace: '',
						num: 1,
						ifhas: /\{\{I[A-Z][A-Z]/,
						sub: [{
							name: '{{INA}}',
							find: /\{\{INA(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/,
							replace: '{{IDN$1}}',
							num: 100
						}, {
							name: '{{ING}}',
							find: /\{\{ING(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/,
							replace: '{{ENG$1}}',
							num: 100
						}, {
							name: '{{IRE}}',
							find: /\{\{IRE(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/,
							replace: '{{IRL$1}}',
							num: 10
						}, {
							name: '{{IRI}}',
							find: /\{\{IRI(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/,
							replace: '{{IRN$1}}',
							num: 100
						}, {
							name: '{{ISV}}',
							find: /\{\{ISV(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/,
							replace: '{{VIR$1}}',
							num: 100
						}, {
							name: '{{IVB}}',
							find: /\{\{IVB(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/,
							replace: '{{VGB$1}}',
							num: 100
						}]
					}, {
						name: 'L',
						find: '',
						replace: '',
						num: 1,
						ifhas: /\{\{L[A-Z][A-Z]/,
						sub: [{
							name: '{{LAT}}',
							find: /\{\{LAT(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/,
							replace: '{{LVA$1}}',
							num: 100
						}, {
							name: '{{LBA}}',
							find: /\{\{LBA(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/,
							replace: '{{LBY$1}}',
							num: 100
						}, {
							name: '{{LES}}',
							find: /\{\{LES(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/,
							replace: '{{LSO$1}}',
							num: 100
						}, {
							name: '{{LIB}}',
							find: /\{\{LIB(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/,
							replace: '{{LBN$1}}',
							num: 100
						}]
					}, {
						name: 'M',
						find: '',
						replace: '',
						num: 1,
						ifhas: /\{\{M[A-Z][A-Z]/,
						sub: [{
							name: '{{MAD}}',
							find: /\{\{MAD(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/,
							replace: '{{MDG$1}}',
							num: 100
						}, {
							name: '{{MAS}}',
							find: /\{\{MAS(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/,
							replace: '{{MYS$1}}',
							num: 100
						}, {
							name: '{{MAW}}',
							find: /\{\{MAW(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/,
							replace: '{{MWI$1}}',
							num: 100
						}, {
							name: '{{MGL}}',
							find: /\{\{MGL(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/,
							replace: '{{MNG$1}}',
							num: 100
						}, {
							name: '{{MRI}}',
							find: /\{\{MRI(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/,
							replace: '{{MUS$1}}',
							num: 100
						}, {
							name: '{{MYA}}',
							find: /\{\{MYA(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/,
							replace: '{{MMR$1}}',
							num: 100
						}]
					}, {
						name: 'N',
						find: '',
						replace: '',
						num: 1,
						ifhas: /\{\{N[A-Z][A-Z]/,
						sub: [{
							name: '{{NCA}}',
							find: /\{\{NCA(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/,
							replace: '{{NIC$1}}',
							num: 100
						}, {
							name: '{{NED}}',
							find: /\{\{NED(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/,
							replace: '{{NLD$1}}',
							num: 100
						}, {
							name: '{{NEP}}',
							find: /\{\{NEP(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/,
							replace: '{{NPL$1}}',
							num: 100
						}, {
							name: '{{NGR}}',
							find: /\{\{NGR(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/,
							replace: '{{NGA$1}}',
							num: 100
						}, {
							name: '{{NIG}}',
							find: /\{\{NIG(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/,
							replace: '{{NER$1}}',
							num: 100
						}]
					}, {
						name: 'P',
						find: '',
						replace: '',
						num: 1,
						ifhas: /\{\{P[A-Z][A-Z]/,
						sub: [{
							name: '{{PAR}}',
							find: /\{\{PAR(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/,
							replace: '{{PRY$1}}',
							num: 100
						}, {
							name: '{{PLE}}',
							find: /\{\{PLE(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/,
							replace: '{{PSE$1}}',
							num: 100
						}, {
							name: '{{POR}}',
							find: /\{\{POR(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/,
							replace: '{{PRT$1}}',
							num: 100
						}, {
							name: '{{PUR}}',
							find: /\{\{PUR(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/,
							replace: '{{PRI$1}}',
							num: 100
						}]
					}, {
						name: 'S',
						find: '',
						replace: '',
						num: 1,
						ifhas: /\{\{S[A-Z][A-Z]/,
						sub: [{
							name: '{{SAM}}',
							find: /\{\{SAM(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/,
							replace: '{{WSM$1}}',
							num: 100
						}, {
							name: '{{SEY}}',
							find: /\{\{SEY(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/,
							replace: '{{SYC$1}}',
							num: 100
						}, {
							name: '{{SIN}}',
							find: /\{\{SIN(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/,
							replace: '{{SGP$1}}',
							num: 100
						}, {
							name: '{{SKN}}',
							find: /\{\{SKN(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/,
							replace: '{{KNA$1}}',
							num: 100
						}, {
							name: '{{SOL}}',
							find: /\{\{SOL(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/,
							replace: '{{SLB$1}}',
							num: 100
						}, {
							name: '{{SRI}}',
							find: /\{\{SRI(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/,
							replace: '{{LKA$1}}',
							num: 100
						}, {
							name: '{{SUD}}',
							find: /\{\{SUD(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/,
							replace: '{{SDN$1}}',
							num: 100
						}, {
							name: '{{SUI}}',
							find: /\{\{SUI(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/,
							replace: '{{CHE$1}}',
							num: 100
						}]
					}, {
						name: 'T',
						find: '',
						replace: '',
						num: 1,
						ifhas: /\{\{T[A-Z][A-Z]/,
						sub: [{
							name: '{{TAH}}',
							find: /\{\{TAH(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/,
							replace: '{{PYF$1}}',
							num: 100
						}, {
							name: '{{TAN}}',
							find: /\{\{TAN(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/,
							replace: '{{TZA$1}}',
							num: 100
						}, {
							name: '{{TGA}}',
							find: /\{\{TGA(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/,
							replace: '{{TON$1}}',
							num: 100
						}, {
							name: '{{TRI}}',
							find: /\{\{TRI(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/,
							replace: '{{TTO$1}}',
							num: 100
						}]
					}, {
						name: 'Rule',
						find: '',
						replace: '',
						num: 1,
						ifhas: /\{\{[DEHKORUVZ][A-Z]/,
						sub: [{
							name: 'D',
							find: '',
							replace: '',
							num: 1,
							sub: [{
								name: '{{DEN}}',
								find: /\{\{DEN(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/,
								replace: '{{DNK$1}}',
								num: 100
							}]
						}, {
							name: 'E',
							find: '',
							replace: '',
							num: 1,
							sub: [{
								name: '{{EQG}}',
								find: /\{\{EQG(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/,
								replace: '{{GNQ$1}}',
								num: 100
							}, {
								name: '{{EUA}}',
								find: /\{\{EUA(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/,
								replace: '{{USA$1}}',
								num: 10
							}]
						}, {
							name: 'H',
							find: '',
							replace: '',
							num: 1,
							sub: [{
								name: '{{HAI}}',
								find: /\{\{HAI(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/,
								replace: '{{HTI$1}}',
								num: 10
							}, {
								name: '{{HON}}',
								find: /\{\{HON(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/,
								replace: '{{HND$1}}',
								num: 10
							}, {
								name: '{{HOL}}',
								find: /\{\{HOL(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/,
								replace: '{{NLD$1}}',
								num: 10
							}]
						}, {
							name: 'K',
							find: '',
							replace: '',
							num: 1,
							sub: [{
								name: '{{KSA}}',
								find: /\{\{KSA(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/,
								replace: '{{SAU$1}}',
								num: 100
							}, {
								name: '{{KUW}}',
								find: /\{\{KUW(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/,
								replace: '{{KWT$1}}',
								num: 100
							}]
						}, {
							name: 'O',
							find: '',
							replace: '',
							num: 1,
							sub: [{
								name: '{{OMA}}',
								find: /\{\{OMA(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/,
								replace: '{{OMN$1}}',
								num: 100
							}]
						}, {
							name: 'R',
							find: '',
							replace: '',
							num: 1,
							sub: [{
								name: '{{RSA}}',
								find: /\{\{RSA(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/,
								replace: '{{ZAF$1}}',
								num: 100
							}]
						}, {
							name: 'U',
							find: '',
							replace: '',
							num: 1,
							sub: [{
								name: '{{UAE}}',
								find: /\{\{UAE(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/,
								replace: '{{ARE$1}}',
								num: 100
							}, {
								name: '{{URU}}',
								find: /\{\{URU(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/,
								replace: '{{URY$1}}',
								num: 100
							}, {
								name: '{{UK}}',
								find: /\{\{UK(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/,
								replace: '{{GBR$1}}',
								num: 100
							}]
						}, {
							name: 'V',
							find: '',
							replace: '',
							num: 1,
							sub: [{
								name: '{{VAN}}',
								find: /\{\{VAN(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/,
								replace: '{{VUT$1}}',
								num: 100
							}, {
								name: '{{VIE}}',
								find: /\{\{VIE(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/,
								replace: '{{VNM$1}}',
								num: 100
							}, {
								name: '{{VIN}}',
								find: /\{\{VIN(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/,
								replace: '{{VCT$1}}',
								num: 100
							}]
						}, {
							name: 'Z',
							find: '',
							replace: '',
							num: 1,
							sub: [{
								name: '{{ZAM}}',
								find: /\{\{ZAM(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/,
								replace: '{{ZMB$1}}',
								num: 100
							}, {
								name: '{{ZIM}}',
								find: /\{\{ZIM(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/,
								replace: '{{ZWE$1}}',
								num: 100
							}]
						}]
					}]
				}, {
					name: '{{XXXb|tamanho=xxx}}',
					find: /\{\{([A-Z]{2,3}b)\|(?:imagem_tamanho|tamanho) *= *(?:2[0-2]|1[7-9])px\}\}/,
					replace: '{{$1}}',
					num: 1
				}, {
					name: 'Negrito de {{BRAb}}',
					find: /'''?(\{\{[A-Z]{3,3}b\}\})'?''/,
					replace: '$1',
					num: 1
				}, {
					name: '{{XXXn}}',
					find: '',
					replace: '',
					num: 1,
					sub: [{
						name: '{{USAn}}',
						find: '{{USAb}} [[Estadunidense]]',
						replace: '{{USAn}}',
						num: 1
					}]
				}]
			}]
		}, {
			name: '----',
			find: '',
			replace: '',
			num: 1,
			sub: [{
				name: '---- antes seção/ref-section',
				find: /(\r?\n)+\-+(\r?\n)+(║|\{\{Ref\-section|\{\{Reflist)/i,
				replace: '\n\n$3',
				num: 10
			}, {
				name: '---- depois seção/ref-section',
				find: /(\=|\{\{Ref\-section.*|\{\{Reflist.*)(?:\r?\n)+\-+(?:\r?\n)+/i,
				replace: '$1\n\n',
				num: 10
			}, {
				name: '{{Info',
				find: /\-{4,}(\r?\n)+\{\{Info/i,
				replace: '{{Info',
				num: 1
			}]
		}, {
			name: 'Texto',
			find: '',
			replace: '',
			num: 1,
			sub: [{
				name: 'Parágrafos',
				find: '',
				replace: '',
				num: 1,
				ifnot: /(<(blockquote|code|gallery|math|timeline|pre|poem|nowiki|quote|source)|\{\{(Citação|Quim))/i,
				sub: [{
					name: 'Separando . \n Maiuscula',
					find: /\.\r?\n((?:\[\[[^\|\[\]\n]\]+\|)?[A-Z])/,
					replace: '.\n\n$1',
					num: 1
				}, {
					name: 'Par. na mesma linha',
					find: /([a-záàâãéêíóôõú,])(\r?\n)([a-záàâãéêíóôõú])/,
					replace: '$1 $3',
					num: 1
				}, {
					name: 'juntando parag com .,',
					find: /([^\n])\r?\n([\.,])([^\.][^\.])/i,
					replace: '$1$2$3',
					num: 1
				}, {
					name: 'Par. inicio espaço',
					find: /\.\r?\n +([A-Z])/i,
					replace: '.\n\n$1',
					num: 1
				}]
			}, {
				name: 'kg',
				find: /([0-9]) *Kgs?([^a-z])/i,
				replace: '$1&amp;nbsp;kg$2',
				num: 100
			}, {
				name: 'Vírgula em alturas',
				find: /([0-9])[\.,]([0-9][0-9]) *m/,
				replace: '$1,$2 m',
				num: 100
			}, {
				name: 'Datas',
				find: '',
				replace: '',
				num: 1,
				sub: [{
					name: 'Vírgula em datas',
					find: /\[\[ *([0-9][0-9]? de [^\]]*) *\]\], ?\[\[ *([0-9]{0,4}) *\]\]/i,
					replace: '[[$1]] de [[$2]]',
					num: 100
				}, {
					name: 'LI em "dia de mês"',
					find: /\[\[([0-3]?[0-9])\]\] de \[\[((?:jan|fever)eiro|março|abril|maio|ju[nl]ho|agosto|(?:setem|outu|novem|dezem)bro)\]\]/i,
					replace: '[[$1 de $2]]',
					num: 1
				}]
			}, {
				name: 'Espaçamento',
				find: '',
				replace: '',
				num: 1,
				ifnot: /(<(blockquote|code|gallery|math|timeline|pre|poem|nowiki|quote|source)|\{\{(Citação|Quim))/i,
				sub: [{
					name: 'Retirar espaçamento 1',
					find: '',
					replace: '',
					num: 1,
					sub: [{
						name: '0 após \n :',
						find: /\r?\n(:+) +/i,
						replace: '\n$1',
						num: 100
					}, {
						name: '<ref | <br />',
						find: / +(<ref|<br \/>)/,
						replace: '$1',
						num: 100
					}, {
						name: '1 entre letra [',
						find: /([a-z]) {2,}(\[)/,
						replace: '$1 $2',
						num: 100
					}, {
						name: '1 após ]]',
						find: /(\]\]) {2,}/,
						replace: '$1 ',
						num: 100
					}, {
						name: 'Fim de parag',
						find: / +\r?\n/,
						replace: '\n',
						num: 100
					}]
				}, {
					name: 'Retirar espaçamento problema ficheiro',
					find: '',
					replace: '',
					num: 1,
					ifnot: /(imagem *= *[^ \r\n]|[╠▒])/i,
					sub: [{
						name: '1 entre )  e  ln',
						find: /\) {2}([a-z0-9])/i,
						replace: ') $1',
						num: 100
					}, {
						name: '0 antes de pontuação ]',
						find: / +([\,\.\?\:\;\]\)])/,
						replace: '$1',
						num: 100
					}, {
						name: '0 antes de !',
						find: / +!([^!])/i,
						replace: '!$1',
						num: 100
					}, {
						name: '0 após ([',
						find: /([\(\[]) +/,
						replace: '$1',
						num: 100
					}, {
						name: '1 após pontuacao',
						find: /(\,\.\!\?\:\;<) {2,}/,
						replace: '$1 ',
						num: 100
					}, {
						name: '1 entre letra',
						find: /([a-zA-ZàáéÉóÓúÚ\]\.]) {2,}([a-zA-ZàáéÉóÓúÚ\[\.])/i,
						replace: '$1 $2',
						num: 100
					}, {
						name: '0 após -',
						find: /(- ) +/,
						replace: '$1',
						num: 100
					}]
				}, {
					name: '|]]',
					find: '|]]',
					replace: '| ]]',
					num: 1
				}, {
					name: '{{Lang - en|',
					find: /(\{\{Lang) \- ([a-z]{2,2}\|)/i,
					replace: '$1-$2',
					num: 1
				}]
			}, {
				name: 'Entre noinclude',
				find: '',
				replace: '',
				num: 1,
				ifhas: 'noinclude&gt;', // FIXME: /noinclude&gt;/i ?
				sub: [{
					name: 'Marca </noinclude>',
					find: /<\/noinclude>/i,
					replace: '┼',
					num: 5
				}, {
					name: 'Retira',
					find: /<noinclude>[^┼]*┼/i,
					replace: '',
					num: 5
				}, {
					name: 'Desmarca </noinclude>',
					find: '┼',
					replace: '&lt;/noinclude&gt;',
					num: 1
				}]
			}, {
				name: 'Ortografia',
				find: '',
				replace: '',
				num: 1,
				sub: [{
					name: 'ç',
					find: '',
					replace: '',
					num: 1,
					ifhas: /ç/i,
					sub: [{
						name: 'ofereçe',
						find: /([^a-z])([Oo])fereçe([^a-z])/,
						replace: '$1$2ferece$3',
						num: 10
					}, {
						name: 'voçe',
						find: /([^a-z])([Vv])oçe([^a-z])/,
						replace: '$1$2ocê$3',
						num: 10
					}]
				}]
			}, {
				name: 'Não enciclopédico',
				find: '',
				replace: '',
				num: 1,
				sub: [{
					name: 'Rule',
					find: /Telefones?:┼? *([0-9]{4,4}\-[0-9]{4,4}|[0-9]{7,8}) *\/?/i,
					replace: 'Telefone:┼',
					num: 100
				}, {
					name: 'Rule',
					find: 'Telefone:┼',
					replace: '',
					num: 100
				}]
			}]
		}, {
			name: 'Seções',
			find: '',
			replace: '',
			num: 1,
			ifhas: '║=',
			sub: [{
				name: 'Mudando nível da seção',
				find: '',
				replace: '',
				num: 1,
				sub: [{
					name: 'Seção1',
					find: '',
					replace: '',
					num: 1,
					sub: [{
						name: '=\\=',
						find: /\n║=([^=\n]+)=\r?\n/i,
						replace: '\n║==$1==\n',
						num: 1
					}, {
						name: '=\\==',
						find: /\n║=([^=\n]+)==\r?\n/i,
						replace: '\n║==$1==\n',
						num: 1
					}, {
						name: '==\\=',
						find: /\n║==([^=\n]+)=\r?\n/i,
						replace: '\n║==$1==\n',
						num: 1
					}]
				}, {
					name: 'Seção5 sem seção4',
					find: /║=(={4,}.*={4,})=/i,
					replace: '║$1',
					num: 10,
					ifnot: /\n║====[^=]/i
				}, {
					name: 'Seção4 sem seção3',
					find: /║=(={3,}.*={3,})=/i,
					replace: '║$1',
					num: 10,
					ifnot: /\n║===[^=]/i
				}, {
					name: 'Seção3 sem seção2',
					find: /║=(={2,}.*={42,})=/i,
					replace: '║$1',
					num: 10,
					ifnot: /\n║==[^=]/i
				}]
			}, {
				name: 'Primeira seção',
				find: /(╩\r?\n║)=== (.*) ===\r?\n/i,
				replace: '$1== $2 ==\n',
				num: 1
			}, {
				name: 'Quebra de linha',
				find: '',
				replace: '',
				num: 1,
				sub: [{
					name: '\n antes de seção',
					find: /([^\=\n])\r?\n║/i,
					replace: '$1\n\n║',
					num: 1
				}, {
					name: '\n depois de seção',
					find: /(║==+ [^\=]+ ==+)([^ \=\r\n])/i,
					replace: '$1\n$2',
					num: 1
				}]
			}, {
				name: 'Arrumando cabeçalho',
				find: '',
				replace: '',
				num: 10,
				sub: [{
					name: 'Negrito em títulos de seções',
					find: /\r?\n(║\=+ )([^\n\=]*[^'])'{3,3}/i,
					replace: '\n$1$2',
					num: 10
				}, {
					name: 'Big em títulos de seções',
					find: /\r?\n(║\=+ )([^\n\=]*)<big>([^\n\=]*)<\/big>([^\n\=]*)( \=+)\r?\n/i,
					replace: '\n$1$2$3$4$5\n',
					num: 10
				}]
			}, {
				name: 'Retirando : e . de título',
				find: '',
				replace: '',
				num: 1,
				sub: [{
					name: 'Retirando dois pontos de título',
					find: /(║\=+ .*[^\.][^\.])[\:\.]( *=+\r?\n)/i,
					replace: '$1$2',
					num: 100
				}]
			}, {
				name: 'Nome',
				find: '',
				replace: '',
				num: 1,
				sub: [{
					name: '==Referências Bibliográficas==',
					find: '║== Referências Bibliográficas ==',
					replace: '║== Referências bibliográficas ==',
					num: 1
				}]
			}, {
				name: '== Introdução ==',
				find: /║== Introdução ==\r?\n/i,
				replace: '',
				num: 1
			}, {
				name: 'Seção duplicada',
				find: /(║== ([^\r\n]+) ==(?:\r?\n)+)║== \2 ==\r?\n/i,
				replace: '$1',
				num: 1
			}, {
				enabled: false,
				name: 'Seção sem conteúdo',
				find: '',
				replace: '',
				num: 1,
				sub: [{
					name: 'Inserindo invisível',
					find: '',
					replace: '',
					num: 1,
					sub: [{
						name: 'ocultando seção 1',
						find: /([\n╗]║=[^=\n]+=\n)(\n*║=[^=]|\n*\[\[Categoria:)([^╔╗░]+[╔░])/i,
						replace: '╔$1╗$2$3',
						num: 10
					}, {
						name: 'ocultando seção 2',
						find: /([\n╗]║==[^=\n]+==\n)(\n*║={1,2}[^=]|\n*\[\[Categoria:)([^╔╗░]+[╔░])/i,
						replace: '╔$1╗$2$3',
						num: 10
					}, {
						name: 'ocultando seção 3',
						find: /([\n╗]║===[^=\n]+===\n)(\n*║={1,3}[^=])([^╔╗░]+[╔░])/i,
						replace: '╔$1╗$2$3',
						num: 10
					}, {
						name: 'ocultando seção 4',
						find: /([\n╗]║====[^=\n]+====\n)(\n*║={1,4}[^=])([^╔╗░]+[╔░])/i,
						replace: '╔$1╗$2$3',
						num: 10
					}, {
						name: 'ocultando seção 5',
						find: /([\n╗]║=====[^=\n]+=====\n)(\n*║={1,5}[^=])([^╔╗░]+[╔░])/i,
						replace: '╔$1╗$2$3',
						num: 10
					}]
				}, {
					name: 'Rule',
					find: '╔╗',
					replace: '',
					num: 100
				}, {
					name: 'Rule',
					find: '║== Mortes ==',
					replace: '║== Falecimentos ==',
					num: 1
				}, {
					name: 'Rule',
					find: /╗║== Falecimentos ==(\n*(?:\{[^\|]|\[))/i,
					replace: '║== Falecimentos ==\n╗$1',
					num: 1
				}, {
					name: 'Rule',
					find: /╗║==/i,
					replace: '╗\n║==',
					num: 1
				}, {
					name: 'Rule',
					find: /╗(?:\r?\n)*(║=+[^=\n]+=+)╔/i,
					replace: '$1',
					num: 10
				}, {
					name: 'Rule',
					find: '╔\n║==',
					replace: '╔\n\n║==',
					num: 1
				}]
			}]
		}, {
			name: 'Seção destaque',
			find: '',
			replace: '',
			num: 100,
			sub: [{
				name: 'Retirando : final de seção destaque',
				find: /\n(;+) (.+)\:\r?\n/i,
				replace: '\n$1 $2\n',
				num: 1
			}, {
				name: 'Seção destaque com linha antes',
				find: /([^\n=])\r?\n(\; [a-z])/i,
				replace: '$1\n\n$2',
				num: 1
			}, {
				name: 'Seção destaque com linha depois',
				find: /\r?\n;(.*)(\r?\n){2,}/i,
				replace: '\n;$1\n',
				num: 1
			}]
		}, {
			name: 'Vandalismo',
			find: '',
			replace: '',
			num: 10,
			sub: [{
				name: 'Assinatura',
				find: /\-\-\[\[Special\:Contributions\/.*\(UTC\)(\r?\n)?/i,
				replace: '',
				num: 10
			}, {
				name: '== Texto de cabeçalho ==',
				find: /║\=\= *Texto de cabeçalho *\=\=(\r?\n)?/i,
				replace: '',
				num: 10
			}, {
				name: '\'\'\'Inserir texto não-formatado aqui\'\'\'',
				find: /(''+|<[^>\n]+>)Inserir texto não\-formatado aqui(<\/[^>\n]+>|''+)?(\r?\n)?/i,
				replace: '',
				num: 10
			}, {
				name: '[[Ficheiro:Exemplo.jpg]]',
				find: /\[\[(Ficheiro|Media):Exemplo\.(jpg|ogg)▒\]\](\r?\n)?/i,
				replace: '',
				num: 10
			}, {
				name: '<math>Inserir fórmula aqui</math>',
				find: /<math>Inserir fórmula aqui<\/math>(\r?\n)?/i,
				replace: '',
				num: 10
			}, {
				name: '<gallery> exemplo',
				find: /<gallery>\nFicheiro:Air\.canada\.b767-300\.c-ggfj\.2\.jpg|\[\[Avião\]\]\nFicheiro:Mona Lisa\.jpg|\[\[Mona Lisa\]\]\nFicheiro:Albert Einstein Head\.jpg|\[\[Albert Einstein \]\]\n<\/gallery>(\r?\n)?/i,
				replace: '',
				num: 10
			}, {
				name: '#REDIRECT [[Título da ligação]]',
				find: /#REDIRECT \[\[Título da ligação\]\](\r?\n)?/i,
				replace: '',
				num: 1
			}, {
				name: '[[Título do link]]',
				find: /\[\[Título do link\]\](\r?\n)?/i,
				replace: '',
				num: 10
			}, {
				name: '[http://www.example.com ligação externa]',
				find: /\[http:\/\/www.example\.com ligação externa\](\r?\n)?/i,
				replace: '',
				num: 10
			}, {
				name: '<!-- Comentário -->',
				find: /<!\-\- Comentário \-\->(\r?\n)?/i,
				replace: '',
				num: 10
			}, {
				name: '[editar]',
				find: /\[editar\] */i,
				replace: '',
				num: 1
			}]
		}]
	}, {
		name: 'Parte REF VT LE',
		find: '',
		replace: '',
		num: 1,
		ifnot: /▓(Wikipedia|Ficheiro|MediaWiki|Predefinição|Ajuda|Categoria|Portal)( Discussão)?:/i,
		sub: [{
			name: 'Colchetes em url',
			find: '',
			replace: '',
			num: 1,
			sub: [{
				name: 'Url sem título',
				find: /\n([\*\#] )?(https?\:\/\/[^ \r\n]+)\r?\n/i,
				replace: '\n$1[$2├\n',
				num: 10
			}]
		}, {
			name: 'Correlatos',
			find: '',
			replace: '',
			num: 1,
			sub: [{
				name: 'Correlatos antigos',
				find: '',
				replace: '',
				num: 1,
				sub: [{
					name: 'Rule',
					find: /\{\{Commons1\|[^{}\n]*\}\}\r?\n/i,
					replace: '',
					num: 1,
					ifhas: /[{\|] *Commons(cat)? *[\|=]/i
				}, {
					name: 'Rule',
					find: /(\{\{Commons)1(\|[^{}\n]*\}\}\r?\n)/i,
					replace: '$1$2',
					num: 1
				}]
			}, {
				name: 'Commonscat',
				find: /\{\{ *commons *\| *\:? *category *\:/i,
				replace: '{{commonscat|',
				num: 100
			}, {
				name: 'Termina correlatos',
				find: /\{\{ *termina correlatos *\}\} *\n?/i,
				replace: '}}\n',
				num: 100
			}, {
				name: 'Correlato',
				find: /\{\{ *projec?to correlato *\|([^\|]*)\| *\:? *category?i?a?\:/i,
				replace: '{{correlato|$1cat|',
				num: 100
			}, {
				name: 'Correlato item 1',
				find: /\{\{ *projec?to correlato *\|([^\|]*)\|([^\}]*)\}\} *\n?/i,
				replace: '|$1=$2\n',
				num: 100
			}, {
				name: 'Correlato categoria',
				find: /\{\{ *correlato *[\|\/]([^\|]*)\| *\:? *category?i?a?\:/i,
				replace: '{{correlato|$1cat|',
				num: 100
			}, {
				name: 'Correlato item 2',
				find: /\{\{ *correlato *[\|\/]([^\|]*)\|([^\}]*)\}\} *\n?/i,
				replace: '|$1=$2\n',
				num: 100
			}, {
				name: 'Começa correlatos',
				find: /\{\{ *começa correlatos *\}\} *\n?/i,
				replace: '{{correlatos\n',
				num: 100
			}]
		}, {
			name: 'Marcando',
			find: '',
			replace: '',
			num: 1,
			sub: [{
				name: 'Marcando </ref>',
				find: '&lt;/ref&gt;',
				replace: '┼',
				num: 1
			}, {
				name: 'Marcando ] 1',
				find: /([^\]])\]\]\]([^\]])/,
				replace: '$1]]├$2',
				num: 1
			}, {
				name: 'Marcando ] 2',
				find: /([^\]])\]([^\]])/,
				replace: '$1├$2',
				num: 1
			}]
		}, {
			name: 'Língua',
			find: '',
			replace: '',
			num: 1,
			sub: [{
				name: '([[Língua portuguesa|pt]])',
				find: /\(\[\[Língua .+\|([a-z][a-z])\]\]\)/,
				replace: '{{$1}}',
				num: 1
			}, {
				name: '({{en}})',
				find: /((?:<ref>|[\*\#])[^┼\r\n]*[^\|])\((em )?(\[\[)?inglês(\]\])?\)/i,
				replace: '$1({{en}})',
				num: 1
			}, {
				name: '({{es}})',
				find: /((?:<ref>|[\*\#])[^┼\r\n]*[^\|])\((em )?(\[\[)?espanhol(\]\])?\)/i,
				replace: '$1({{es}})',
				num: 1
			}, {
				name: '({{pt}})',
				find: /((?:<ref>|[\*\#])[^┼\r\n]*[^\|])\((em )?(\[\[)?português(\]\])?\)/i,
				replace: '$1({{pt}})',
				num: 1
			}, {
				name: '({{de}})',
				find: /((?:<ref>|[\*\#])[^┼\r\n]*[^\|])\((em )?(\[\[)?alemão(\]\])?\)/i,
				replace: '$1({{de}})',
				num: 1
			}, {
				name: '({{de}})',
				find: /((?:<ref>|[\*\#])[^┼\r\n]*[^\|])\((em )?(\[\[)?italiano(\]\])?\)/i,
				replace: '$1({{it}})',
				num: 1
			}, {
				name: 'icon}}',
				find: /\{\{([a-z][a-z]) icon\}\}/,
				replace: '{{$1}}',
				num: 1
			}, {
				name: 'retirando () de {{ (( pt )) }}',
				find: /\{\{\ *\(\( *([a-z][a-z]) *\)\) *\}\}/,
				replace: '{{$1}}',
				num: 100
			}, {
				name: 'retirando () de ( {{ pt }} )',
				find: /\( *(\{\{[a-z][a-z]\}\}) *\)/,
				replace: '$1',
				num: 100
			}]
		}, {
			name: 'Arrumando url',
			find: '',
			replace: '',
			num: 1,
			sub: [{
				name: 'Arrumando Colchetes em Links',
				find: /([^\[])\[{2,}(https?:\/\/[^\[\]}\n]+)\]{2,}([^\]])/i,
				replace: '$1[$2]$3',
				num: 1
			}, {
				name: 'http://http://',
				find: /http:\/\/ *http:\/\//,
				replace: 'http://',
				num: 100
			}]
		}, {
			name: 'Bibliografia',
			find: '',
			replace: '',
			num: 1,
			sub: [{
				name: 'Seção Bibliografia',
				find: /\= *\{\{ *Bibliografia *\}\} *\=/i,
				replace: '= Bibliografia =',
				num: 1
			}, {
				name: 'ISBN',
				find: '',
				replace: '',
				num: 10,
				sub: [{
					name: 'Rule',
					find: /\[\[ISBN\|(ISBN[^\n\]]*)\]\]/,
					replace: '$1',
					num: 1
				}, {
					name: '(ISBN-10) ISBN n',
					find: /(\(? *\[?\[?ISBN\]?\]? *[\-\:] *1[03] *\)? *\:? *)?\[?\[?ISBN?\]?\]? * *(1[03])? *?[\-\:]? *(1[03])? *[\-\:]? ([0-9\-x]{3,5})/,
					replace: 'ISBN $4',
					num: 1
				}, {
					name: 'Retirando small',
					find: /<small> *(ISBN *[^<\n]{9,17}) *<\/small>/i,
					replace: '$1',
					num: 1
				}]
			}]
		}, {
			name: 'Referências citadas',
			find: '',
			replace: '',
			num: 1,
			sub: [{
				name: 'Tag ref',
				find: '',
				replace: '',
				num: 1,
				ifhas: '&lt;ref',
				sub: [{
					name: 'Arrow <ref name==>',
					find: /<ref name=*>/i,
					replace: '&lt;ref&gt;',
					num: 100
				}, {
					name: '<ref><ref>',
					find: '&lt;ref&gt;&lt;ref&gt;',
					replace: '&lt;ref&gt;',
					num: 1
				}, {
					name: '<ref></ref>',
					find: '&lt;ref&gt;┼',
					replace: '',
					num: 1
				}, {
					name: '</ref></ref>',
					find: '┼┼',
					replace: '┼',
					num: 1
				}, {
					name: '</ref><ref>',
					find: /┼\n+(<ref>|<ref name=)/,
					replace: '┼$1',
					num: 1
				}, {
					name: 'quebra de linha 1',
					find: /<ref>(\r?\n)+/i,
					replace: '&lt;ref&gt;',
					num: 1
				}, {
					name: 'quebra de linha 2',
					find: /(\r?\n)+┼/i,
					replace: '┼',
					num: 1
				}, {
					name: 'quebra de linha 3',
					find: /(<ref[^┼\r\n]*)(?:\r?\n)+([^<>┼\r\n]*┼)/i,
					replace: '$1 $2',
					num: 100
				}, {
					name: '<ref>http',
					find: /<ref>(http[^┼]*)┼/,
					replace: '&lt;ref&gt;[$1├┼',
					num: 1
				}, {
					name: 'Ref 1 em cada linha, novo formato',
					find: /┼<ref name=/i,
					replace: '┼\n&lt;ref name=',
					num: 10,
					ifhas: /(<\/references>|\{\{Referências[^{}]*\| *refs *=)/i
				}, {
					name: '<ref name=xxx></ref>',
					find: /(<ref name=[^>\n]+)><\/ref>/i,
					replace: '$1/&gt;',
					num: 1
				}, {
					name: 'Inserindo ] no final de REF',
					find: /(<ref[^>\n]*>\[http:[^├┼\[\]\n]*)┼/i,
					replace: '$1├┼',
					num: 1
				}]
			}, {
				name: 'Espaço após ref',
				find: '',
				replace: '',
				num: 1,
				sub: [{
					name: 'Espaço após ref 1',
					find: /(<\/ref>|<ref name=[^>\n]*\/>)([^ <\r\n\.\,\!\?\:\)\]\}▒])/i,
					replace: '$1 $2',
					num: 100
				}, {
					name: 'Espaço após ref 2',
					find: /(<\/ref>|<ref name=[^>\n]*\/>) +</i,
					replace: '$1&lt;',
					num: 100
				}]
			}]
		}, {
			name: 'Referências gerais',
			find: '',
			replace: '',
			num: 1,
			sub: [{
				name: 'Padronizando Nome e Predefs',
				find: '',
				replace: '',
				num: 1,
				sub: [{
					name: 'Padronizando ==Referências==',
					find: /\= *Refer[êe]nc(?:e|ia)s? (gerais)? *\=/i,
					replace: '= Referências =',
					num: 100
				}, {
					name: 'Padronizando Reflist',
					find: /\{\{ *reflist *\}\}/i,
					replace: '{{Reflist}}',
					num: 1
				}, {
					name: 'Padronizando <references />',
					find: '&lt;references/&gt;',
					replace: '&lt;references /&gt;',
					num: 1
				}, {
					name: '== Fontes ==',
					find: /(║=+) Fontes (=+)\r?\n(<refer|\{\{Referências|\{\{Ref-section|\{\{Reflist)/i,
					replace: '$1 Referências $2\n$3',
					num: 1
				}]
			}, {
				name: 'Rule',
				find: /([^\r\n])(<references \/>|\{\{Reflist|\{\{Referências)/i,
				replace: '$1\n$2',
				num: 10
			}, {
				name: 'Passando para {{Reflist}}',
				find: '',
				replace: '',
				num: 1,
				sub: [{
					name: 'Reflist 1',
					find: /<references *\/>/i,
					replace: '{{Reflist}}',
					num: 1
				}, {
					name: 'Reflist 2',
					find: /< *small *>(?:\r?\n)*\{\{reflist\}\}(?:\r?\n)*< *\/small *>/i,
					replace: '{{reflist}}',
					num: 10
				}, {
					name: 'Reflist 3',
					find: /<div class='references-small'>(\r?\n)*\{\{reflist\}\}\n*<\/div>/i,
					replace: '{{reflist}}',
					num: 1
				}, {
					name: 'Reflist 4',
					find: /<div[^<>\n]*>(?:\r?\n)*\{\{reflist\}\}(?:\r?\n)*<\/div>/i,
					replace: '{{reflist}}',
					num: 1
				}]
			}, {
				name: 'Passando para {{Referências}}',
				find: '',
				replace: '',
				num: 1,
				ifnot: /┼(\r?\n)*<\/references>/i,
				sub: [{
					name: 'Seção com reflist',
					find: '',
					replace: '',
					num: 1,
					sub: [{
						name: '<small>{{Reflist}}</small>',
						find: /< *small *>(?:\r?\n)*\{\{reflist\}\}(?:\r?\n)*< *\/small *>/i,
						replace: '{{Reflist}}',
						num: 1
					}, {
						name: '{{ref-section|Notas}} 2',
						find: /║== Notas( e referências)? ==(?:\r?\n)*\{\{Reflist\}\}/i,
						replace: '{{Referências|Notas e referências}}',
						num: 10
					}, {
						name: '{{ref-section|Notas}} 3',
						find: /║\=+ Notas \=+ *(?:\r?\n)* *\{\{Reflist\}\}/i,
						replace: '{{Referências|Notas e referências}}',
						num: 10
					}, {
						name: '{{ref-list}}',
						find: /(?:\r?\n){2,}\{\{ref\-list\}\}/i,
						replace: '\n\n{{Referências}}',
						num: 10
					}, {
						name: '{{Reflist|1}}',
						find: /║\=\=+ *Referências? *\=+\= *(?:\r?\n)*\{\{Reflist(\|[0-9]+)?\}\}/i,
						replace: '{{Referências$1}}',
						num: 10
					}, {
						name: 'Rule',
						find: /\n║\=+ Referências \=+\r?\n(\{\{commonscat\|[^{}\n]*\}\})\r?\n\{\{Reflist\}\}/i,
						replace: '\n{{Referências}}\n$1',
						num: 1
					}, {
						name: '{{Reflist}} sem seção',
						find: /(╚[^░║]+)\{\{Reflist(.*)\}\}/i,
						replace: '$1{{Referências$2}}',
						num: 1
					}, {
						name: 'Rule',
						find: /(\{\{(?:Ref\-section|Referências)\|)([0-9]+\}\})/i,
						replace: '$1col=$2',
						num: 1
					}]
				}, {
					name: 'Seção com ref-section',
					find: '',
					replace: '',
					num: 1,
					sub: [{
						name: 'Seção de referências 3',
						find: /║== Referências == *(\r?\n)* *\{\{ref\-section\}\}/i,
						replace: '{{Ref-section}}',
						num: 1
					}]
				}, {
					name: 'Seção de referências 1',
					find: /║== *Referências? *==(\r?\n)* *< *references *\/?>/i,
					replace: '{{Ref-section}}',
					num: 10
				}]
			}, {
				name: '-small em <references group=nota/>',
				find: /(?:<small>|<div class= *"references-small">) *(?:\r?\n)* *<references group=nota *\/ *> *(?:\r?\n)*\ *(?:<\/small>|<\/div>)/i,
				replace: '&lt;references group=nota/&gt;',
				num: 1
			}, {
				name: 'Passando para {{Notas}}',
				find: /║== *Notas? *== *(?:\r?\n)* *<references group=nota\/>\n/i,
				replace: '{{Notas}}',
				num: 1
			}, {
				name: 'Arrumando {{Referências}}',
				find: '',
				replace: '',
				num: 1,
				ifhas: /\{\{ref\-section/i,
				sub: [{
					name: 'Linha antes ref-section',
					find: /([^\n])\r?\n\{\{Referências\}\}/i,
					replace: '$1\n\n{{Referências}}',
					num: 1
				}, {
					name: '{{ref-section|Referências}}',
					find: /\{\{Referências\|Referências\}\}/i,
					replace: '{{Referências}}',
					num: 1
				}, {
					name: '{{Ref-section}}=',
					find: /\{\{Referências\}\}\=+/i,
					replace: '{{Referências}}',
					num: 1
				}, {
					name: '|col= em {{Ref-section}}',
					find: /(\{\{Referências\|)([0-9])/i,
					replace: '$1|col=$2',
					num: 1
				}]
			}, {
				name: '{{Referências}} duplo',
				find: /\{\{Referências\}\}(\r?\n)*\{\{(?:Referências|Reflist)\}\}/i,
				replace: '{{Referências}}',
				num: 1
			}, {
				name: '{{Referências}} com cabeçalho padrão',
				find: /\{\{Referências\|referências?([^a-z ])/i,
				replace: '{{Referências$1',
				num: 1
			}]
		}, {
			name: 'Corrigindo ref',
			find: '',
			replace: '',
			num: 1,
			sub: [{
				name: 'Rule',
				find: /\{\{Reflist\}\}(\[http:\/\/[^\[\]]*├)/i,
				replace: '&lt;ref&gt;$1&lt;/ref&gt;',
				num: 1
			}]
		}, {
			name: 'Formatando referência',
			find: '',
			replace: '',
			num: 1,
			sub: [{
				name: 'Rule',
				find: /(<ref[^<>\n]*>) *\'* *Fontes? *'* *:? *([^ s'\:\.])/i,
				replace: '$1$2',
				num: 1
			}, {
				name: '{{Link}} para {{Citar web}}',
				find: /(<ref[^\n\/\>]*>) *\{\{Link *\| *([a-z][a-z]) *\|(2=)? *([^\n\|]+) *\|(3=)? *([^\n\}]*) *\}\}/i,
				replace: '$1{{Citar web |autor= |url=$4 |título=$6 |língua2=$2 |obra= |data= |acessodata=}}',
				num: 1,
				ifhas: /\{\{Link/i
			}, {
				name: '{{Cite web}} para {{Citar web}}',
				find: '',
				replace: '',
				num: 1,
				ifhas: '{{Cite web', // FIXME: /\{\{Cite web/i ?
				sub: [{
					name: 'Marca início',
					find: /\{\{Cite web *(\||\r?\n|╔)/i,
					replace: '┌$1',
					num: 1
				}, {
					name: 'Marca final',
					find: /(┌[^{}┘]*)\}\}/i,
					replace: '$1┘}}',
					num: 1
				}, {
					name: 'Substitui campos',
					find: '',
					replace: '',
					num: 1,
					ifhas: /┘/i,
					sub: [{
						name: 'last',
						find: /(┌[^┌┘]*\| *)last( *=[^┌┘]*┘)/,
						replace: '$1último$2',
						num: 1
					}, {
						name: 'title',
						find: /(┌[^┘]*\| *)title( *=[^┌┘]*┘)/,
						replace: '$1título$2',
						num: 1
					}, {
						name: 'accessdate',
						find: /(┌[^┘]*\| *)accessdate( *=[^┌┘]*┘)/,
						replace: '$1acessodata$2',
						num: 1
					}, {
						name: 'accessyear',
						find: /(┌[^┘]*\| *)accessyear( *=[^┌┘]*┘)/,
						replace: '$1acessoano$2',
						num: 1
					}, {
						name: 'author',
						find: /(┌[^┘]*\| *)author( *=[^┌┘]*┘)/,
						replace: '$1autor$2',
						num: 1
					}, {
						name: 'first',
						find: /(┌[^┘]*\| *)first( *=[^┌┘]*┘)/,
						replace: '$1primeiro$2',
						num: 1
					}, {
						name: 'authorlink',
						find: /(┌[^┘]*\| *)authorlink( *=[^┌┘]*┘)/,
						replace: '$1autorlink$2',
						num: 1
					}, {
						name: 'coauthors',
						find: /(┌[^┘]*\| *)coauthors( *=[^┌┘]*┘)/,
						replace: '$1coautores$2',
						num: 1
					}, {
						name: 'date',
						find: /(┌[^┘]*\| *)date( *=[^┌┘]*┘)/,
						replace: '$1data$2',
						num: 1
					}, {
						name: 'year',
						find: /(┌[^┘]*\| *)year( *=[^┌┘]*┘)/,
						replace: '$1ano$2',
						num: 1
					}, {
						name: 'month',
						find: /(┌[^┘]*\| *)month( *=[^┌┘]*┘)/,
						replace: '$1mes$2',
						num: 1
					}, {
						name: 'format',
						find: /(┌[^┘]*\| *)format( *=[^┌┘]*┘)/,
						replace: '$1formato$2',
						num: 1
					}, {
						name: 'work',
						find: /(┌[^┘]*\| *)work( *=[^┌┘]*┘)/,
						replace: '$1obra$2',
						num: 1
					}, {
						name: 'publisher',
						find: /(┌[^┘]*\| *)publisher( *=[^┌┘]*┘)/,
						replace: '$1publicado$2',
						num: 1
					}, {
						name: 'pages',
						find: /(┌[^┘]*\| *)pages( *=[^┌┘]*┘)/,
						replace: '$1paginas$2',
						num: 1
					}, {
						name: 'language',
						find: /(┌[^┘]*\| *)language( *=[^┌┘]*┘)/,
						replace: '$1língua$2',
						num: 1
					}, {
						name: 'archiveurl',
						find: /(┌[^┘]*\| *)archiveurl( *=[^┌┘]*┘)/,
						replace: '$1arquivourl$2',
						num: 1
					}, {
						name: 'archivedate',
						find: /(┌[^┘]*\| *)archivedate( *=[^┌┘]*┘)/,
						replace: '$1arquivodata$2',
						num: 1
					}, {
						name: 'quote',
						find: /(┌[^┘]*\| *)quote( *=[^┌┘]*┘)/,
						replace: '$1citação$2',
						num: 1
					}]
				}, {
					name: 'Desmarca final',
					find: '┘',
					replace: '',
					num: 10
				}, {
					name: 'Desmarca início',
					find: '┌',
					replace: '{{Citar web',
					num: 10
				}]
			}]
		}, {
			name: 'Ver também',
			find: '',
			replace: '',
			num: 1,
			sub: [{
				name: 'Nome da seção VT',
				find: /║\=+ *\{?\{? *(?:artigos? relacionados?|links? internos?|Ve(?:ja|r) (?:tamb[ée]m|ainda)|See also) *\}?\}? *\=+\r?\n/i,
				replace: '║== Ver também ==\n',
				num: 1
			}, {
				name: 'Lista em VT',
				find: /║\=+ Ver também \=+\r?\n\[\[/i,
				replace: '║== Ver também ==\n* [[',
				num: 1
			}]
		}, {
			name: 'Ligações externas',
			find: '',
			replace: '',
			num: 1,
			sub: [{
				name: 'Passando língua para depois',
				find: '',
				replace: '',
				num: 1,
				sub: [{
					name: 'Juntando línguas',
					find: /\*(.*)\{\{\(?\(?([a-z][a-z][a-z]?(?:\|[^\}\n]*)?)\)?\)?\}\} *[,e]? *\{\{\(?\(?([a-z][a-z](?:\|[^\}\n]*)?)\)?\)?\}\}/i,
					replace: '\n*$1{{$2|$3}}',
					num: 10
				}, {
					name: 'Passando línguas para depois',
					find: /(\n\*? *)(\{\{\(?\(?[a-z][a-z][a-z]?(?:\|[^\}\n]*)?\)?\)?\}\}) *\-? *(\[https?\:\/\/[^\n]+)\r?\n/i,
					replace: '$1$3 $2\n',
					num: 10
				}]
			}, {
				name: 'Quebra de linha em LE',
				find: /\r?\n(\* |\[)(https?:\/\/.*)\r?\n\r?\n([(\* |\[])/i,
				replace: '\n$1$2\n$3',
				num: 10
			}, {
				name: 'Ligações externas',
				find: '',
				replace: '',
				num: 1,
				sub: [{
					name: 'Nome da seção LE',
					find: /║\=+ *(?:\{\{)? *(?:Apontadores|apontadore?s? externos?|links|links? externos?|ligaçã?o?õ?e?s? externas?|páginas? externas?|referências? externas?|enlaces externos?|External links|Weblinks?|Fontes e ligações externas) *(?:\}\})? *\=+\r?\n/i,
					replace: '║== Ligações externas ==\n',
					num: 1
				}, {
					name: '{{le}}',
					find: /\{\{le\}\}/i,
					replace: '║== Ligações externas ==',
					num: 1
				}]
			}, {
				name: 'Passando para lista',
				find: '',
				replace: '',
				num: 1,
				sub: [{
					name: 'Passando para lista 1',
					find: /\r?\n(\[https?:\/\/.*)/,
					replace: '\n* $1\n',
					num: 10
				}, {
					name: 'Passando para lista 2',
					find: /(== Ligações externas ==\r?\n)(\{\{[a-z][a-z]\}\})/,
					replace: '$1* $2',
					num: 1
				}]
			}, {
				name: 'Padronizando {{Link}}',
				find: '',
				replace: '',
				num: 1,
				ifhas: /\{\{Link/i,
				ifnot: /\{\{Link[^\|\n]*\|[^\|\n]*\| *url *=/i,
				sub: [{
					name: '|1=',
					find: /\{\{link *\| *1= *([^ ])/i,
					replace: '{{Link|$1',
					num: 100
				}, {
					name: '|2=',
					find: /(\n\*+ \{\{link) *\| *([^\|\{\}\[\]\n]*) *\| *([^ 2][^ }\n\|]+[^ ]) *\| */i,
					replace: '$1|$2|2=$3 |',
					num: 100
				}, {
					name: '|3=',
					find: /(\n\*+ \{\{link\|[^\|\{\}\[\]\n]*\|2=[^ \}\|\n]+ )\| *([^ 3])/i,
					replace: '$1|3=$2',
					num: 100
				}, {
					name: '|4=',
					find: /(\n\*+ \{\{link\|[^\|\{\}\[\]\n]*\|2=[^ \}\|\n]+ \|3=[^┼\}\|\n]+) *\| *([^ 4])/i,
					replace: '$1 |4=$2',
					num: 100
				}]
			}, {
				name: '{{Link}}',
				find: '',
				replace: '',
				num: 1,
				sub: [{
					name: 'Lista para {{Link}}',
					find: /\r?\n(\{\{Link\|)/i,
					replace: '\n* $1',
					num: 10
				}, {
					name: '{{Link}} incompleto',
					find: '',
					replace: '',
					num: 1,
					sub: [{
						name: '{{Link}} sem lingua',
						find: /(\n[\*\#]+ *\-? *)\[(https?:\/\/[^ \n\]]+) ([^├\n]*)├(.?)/i,
						replace: '$1{{Link||2=$2 |3=$3}}$4',
						num: 10
					}, {
						name: '{{Link}} sem título',
						find: /(\n[\*\#]+ *\-? *)\[(https?:\/\/[^\n├]*) *├(.?)/,
						replace: '$1{{Link||2=$2 |3=}}$3',
						num: 10
					}, {
						name: '# {{Link',
						find: /([^\#])\#+ *\{\{Link/i,
						replace: '$1* {{Link',
						num: 1
					}]
				}, {
					name: 'Lingua na {{Link}}',
					find: '',
					replace: '',
					num: 10,
					sub: [{
						name: '{{Link}} - lingua depois',
						find: /(\n\*+ \{\{Link *\|) *(\| *[^{}\n]+\}\}.*)\{\{([a-z][a-z][a-z]?(?:\|[^\}\n]*)?)\}\}([^\)])/,
						replace: '$1$3$2$4',
						num: 1
					}, {
						name: '{{Link}} - lingua dentro',
						find: /(\n\*+ \{\{Link *\|) *(\| *[^{}\n]+) *\{\{([a-z][a-z][a-z]?)\}\} *(\}\})/,
						replace: '$1$3$2$4',
						num: 1
					}]
				}, {
					name: 'Link 4=',
					find: /(\{\{Link\|[^┼{}\n]*)\}\} *([^ ┼<\r\n][^┼\n]*)([┼\r\n])/i,
					replace: '$1 |4=$2}}$3',
					num: 10
				}, {
					name: 'Link 4= - arruma',
					find: /(\{\{Link\|[^{}\n]*\|4=)\.{1,2}\}\}/i,
					replace: '$1}}',
					num: 10
				}, {
					name: 'Rule',
					find: /(\{\{Link\|.*[^ ]) +\}\}/i,
					replace: '$1}}',
					num: 1
				}, {
					name: 'Link sem |3= com |4=',
					find: /(\{\{Link\|[^\|\n]*\|2=[^\|\n]*\|3=) *(\|4=)([^ \{\}\n]+) /i,
					replace: '$1$3 $2',
					num: 1
				}]
			}, {
				name: '{{Link2}}',
				find: '',
				replace: '',
				num: 1,
				ifhas: /\{\{Link/i,
				sub: [{
					name: 'Língua no campo 4',
					find: /(\{\{Link\|[a-z]{2,3})(\|[^\{\}\n]*)\{\{([a-z]{2,3})\}\} *\}\}\r?\n/i,
					replace: '$1|$3$2}}\n',
					num: 100
				}, {
					name: 'Campo língua',
					find: /\{\{Link(\|[a-z]{2,3}\|[a-z]{2,3}[^0-9\{\}\n]*)(\|2=.*)\}\} *\r?\n/i,
					replace: '{{Link2$2$1}}\n',
					num: 100
				}, {
					name: 'Arrumando parâmetros',
					find: /(\{\{Link2[^{}\n]*\|) *[0-9]=/i,
					replace: '$1',
					num: 10
				}]
			}, {
				name: 'Arrumando {{Link2?}}',
				find: /([^ ]) *\|4= *\}\}/i,
				/* FIXME: Singleline */
				replace: '$1}}',
				num: 10
			}, {
				name: 'Predef de LE',
				find: '',
				replace: '',
				num: 1,
				ifhas: /\{\{link/i,
				sub: [{
					name: '{{Afdb nome}}',
					find: /\{\{link\|(?: *1?=? *[a-z]{2,2})?\|? *2?= *?http:\/\/www\.adultfilmdatabase\.com\/actor\.cfm\?actorid\=([^\|\}\n]+)\/? *\| *3?=? *([^\|\}\n]*)(?: *(?:\| *4?=?|\}\}) *no \[?\[?Adult Film Database\]?\]?)?(?:\}\}\r?\n|\r?\n)/i,
					replace: '{{Afdb nome|$1|$2}}\n',
					num: 1
				}, {
					name: '{{MySpace}}',
					find: /\{\{link\|(?: *1?=? *[a-z]{2,2})?\|? *2?= *?http:\/\/www\.myspace\.com\/([^\|\}\n]+)\/? *\| *3?=? *([^\|\}\n]*)(?: *(?:\| *4?=?|\}\}) *no \[?\[?MySpace\]?\]?)?(?:\}\}\r?\n|\r?\n)/i,
					replace: '{{MySpace|$1|$2}}\n',
					num: 1
				}, {
					name: '{{Open Directory Project|User}}',
					find: /\{\{link\|(?: *1?=? *[a-z]{2,2})?\|? *2?= *?http:\/\/www\.dmoz\.org\/profiles\/([^\|\}\n ]+)\.html\/? *\| *3?=? *([^\|\}\n]*)(?: *(?:\| *4?=?|\}\}) *(?:no|at the) \[?\[?Open Directory Project\]?\]?)?(?:\}\}\r?\n|\r?\n)/i,
					replace: '{{Open Directory Project|$1|$2|User}}\n',
					num: 1
				}, {
					name: '{{Open Directory Project}}',
					find: /\{\{link\|(?: *1?=? *[a-z]{2,2})?\|? *2?= *?http:\/\/www\.dmoz\.org\/([^\|\}\n ]+)\/? *\| *3?=? *([^\|\}\n]*)(?: *(?:\| *4?=?|\}\}) *(?:no|at the) \[?\[?Open Directory Project\]?\]?)?(?:\}\}\r?\n|\r?\n)/i,
					replace: '{{Open Directory Project|$1|$2}}\n',
					num: 1
				}, {
					name: '{{Ibdb nome}}',
					find: /\{\{link\|(?: *1?=? *[a-z]{2,2})?\|? *2?=? *http:\/\/www\.ibdb\.com\/person\.asp\?ID\=([^\|\}\n]+)\/ *\| *3?=? *([^\|\}\n]*)(?: *(?:\| *4?=?|\}\}) *4?=? *no \[?\[?Internet Broadway Database\]?\]?)?(?:\}\}\r?\n|\r?\n)/i,
					replace: '{{Ibdb nome|$1|$2}}\n',
					num: 1
				}, {
					name: '{{Ibdb título}}',
					find: /\{\{link\|(?: *1?=? *[a-z]{2,2})?\|? *2?=? *http:\/\/www\.ibdb\.com\/production\.php\?id\=([^\|\}\n]+)\/ *\| *3?=? *([^\|\}\n]*)(?: *(?:\| *4?=?|\}\}) *4?=? *no \[?\[?Internet Broadway Database\]?\]?)?(?:\}\}\r?\n|\r?\n)/i,
					replace: '{{Ibdb título|$1|$2}}\n',
					num: 1
				}]
			}, {
				name: 'Lista no LE',
				find: /(?:\r?\n){2,}(\* \{\{Link)/i,
				replace: '\n$1',
				num: 10
			}]
		}, {
			name: 'Desmarcando',
			find: '',
			replace: '',
			num: 1,
			sub: [{
				name: 'Desmarcando </ref>',
				find: '┼',
				replace: '&lt;/ref&gt;',
				num: 1
			}, {
				name: 'Desmarcando ]',
				find: '├',
				replace: ']',
				num: 1
			}]
		}, {
			name: 'Rule',
			find: 'Título ainda não informado (favor adicionar)',
			replace: '',
			num: 10
		}]
	}, {
		name: 'Parte inf',
		find: '',
		replace: '',
		num: 1,
		sub: [{
			name: 'DEFAULTSORT 1',
			find: '',
			replace: '',
			num: 1,
			ifnot: /▓(Wikipedia|Ficheiro|MediaWiki|Predefinição|Ajuda|Categoria|Portal)( Discussão)?:/i,
			sub: [{
				name: 'Rule',
				find: '{{DEFAULTSORT:}}',
				replace: '',
				num: 1
			}, {
				name: 'Quebra de linha em DEFAULTSORT',
				find: '',
				replace: '',
				num: 1,
				sub: [{
					name: 'Antes DEFAULTSORT',
					find: /([^\n])\r?\n\{\{DEFAULTSORT/,
					replace: '$1\n\n{{DEFAULTSORT',
					num: 1
				}, {
					name: 'Após DEFAULTSORT',
					find: /(\{\{DEFAULTSORT:.*\}\})\n\n/i,
					replace: '$1\n',
					num: 1
				}]
			}, {
				name: '{{DEFAULTSORT em posição errada',
				find: '',
				replace: '',
				num: 1,
				sub: [{
					name: 'Marca cat',
					find: /\r?\n\[\[Categoria:/i,
					replace: '\n┼',
					num: 1
				}, {
					name: 'Posicao',
					find: /(\{\{DEFAULTSORT.*\}\})\r?\n([^┼]+)┼/m,
					replace: '$2\n$1\n┼',
					num: 1
				}, {
					name: 'Desmarca cat',
					find: '┼',
					replace: '[[Categoria:',
					num: 1
				}]
			}]
		}, {
			name: 'Categorias 2',
			find: '',
			replace: '',
			num: 1,
			sub: [{
				name: 'Retirando cats',
				find: '',
				replace: '',
				num: 1,
				ifnot: /▓(Usuário|Wikipedia|Ficheiro|MediaWiki|Predefinição|Ajuda|Categoria|Portal)( Discussão)?:/i,
				sub: [{
					name: '[[Categoria:!*]]',
					find: /\[\[Categoria\:\!.*\]\]\r?\n/,
					replace: '',
					num: 100
				}]
			}, {
				name: 'Indice',
				find: '',
				replace: '',
				num: 1,
				ifnot: /▓(Usuário|Wikipedia|Ficheiro|MediaWiki|Predefinição|Ajuda|Categoria|Portal)( Discussão)?:/i,
				sub: [{
					name: 'Indice principal 1',
					find: /(▓([^╦]*)╦[^░]*\n\[\[Categoria\:\2)\|?[*#!]?\]\]/,
					replace: '$1| ]]',
					num: 100
				}, {
					name: 'Indice principal 2',
					find: /(\[\[Categoria:.*\|)[\*#](\]\])/i,
					replace: '$1 $2',
					num: 100
				}, {
					name: 'Índice de cat = pagename',
					find: /(▓([^╦]*)╦[^░]*\n\[\[Categoria\:[^\|\]\n]+)\|\2\]\]/i,
					replace: '$1]]',
					num: 100
				}]
			}, {
				name: 'Caixa alta em categoria',
				find: /\[\[Categoria *\: *([a-z])/,
				replace: '[[Categoria:{{subst:ucfirst:$1}}',
				num: 100
			}, {
				name: 'Categorias iguais',
				find: /(\n\[\[Categoria:([^\|\]\n]+)(?:\|[^\]\n]*)?\]\](?:[^░]*))\[\[Categoria:\2(?:\|[^\]\n]*)?\]\]\r?\n/i,
				replace: '$1',
				num: 100
			}]
		}, {
			name: 'Interwikis',
			find: '',
			replace: '',
			num: 1,
			ifhas: /\[\[[a-z][a-z]:/i,
			sub: [{
				name: '- iw pt',
				find: /\n\[\[pt:[^\[\]\|\n]*\]\]\r?\n/i,
				replace: '\n',
				num: 1
			}, {
				name: 'iw duplo',
				find: /(\n\[\[([a-z][a-z][a-z]?\:[^\[\]\n]+)\]\][^░]*)\n\[\[\2\]\]\r?\n/,
				replace: '$1\n',
				num: 100
			}]
		}, {
			name: 'Sem seção REF',
			find: '',
			replace: '',
			num: 1,
			ifhas: /(<ref name|<ref>|\{\{(Colocação\-carnaval|Grupo\-carnaval)\}|\| *rankingfifa = *[^ \r\n])/i,
			ifnot: /(\{\{ref-?list|\{\{Referências|<referen|▓(Wikipedia|Ficheiro|MediaWiki|Predefinição|Ajuda|Categoria|Portal)( Discussão)?:)/i,
			sub: [{
				name: 'Sem seção REF - seção Ref',
				find: /║== Referências ==/i,
				replace: '{{Referências}}\n',
				num: 1,
				ifnot: /(\{\{(ref\-?section|ref\-?list|referências)|<referen)/i
			}, {
				name: 'Sem seção REF - VT',
				find: /║== Ver também ==/i,
				replace: '{{Referências}}\n\n║== Ver também ==',
				num: 1,
				ifnot: /(\{\{(ref\-?section|ref\-?list|referências)|<referen)/i
			}, {
				name: 'Sem seção REF - LE',
				find: /║== Ligações externas ==/i,
				replace: '{{Referências}}\n\n║== Ligações externas ==',
				num: 1,
				ifnot: /(\{\{(ref\-?section|ref\-?list|referências)|<referen)/i
			}, {
				name: 'Sem seção REF - Bloco nav',
				find: /\{\{Bloco de navegação/i,
				replace: '{{Referências}}\n\n{{Bloco de navegação',
				num: 1,
				ifnot: /(\{\{(ref\-?section|ref\-?list|referências)|<referen)/i
			}, {
				name: 'Sem seção REF - Portal3',
				find: /\{\{Portal3/i,
				replace: '{{Referências}}\n\n{{Portal3',
				num: 1,
				ifnot: /(\{\{(ref\-?section|ref\-?list|referências)|<referen)/i
			}, {
				name: 'Sem seção REF - Cat Defaultsort',
				find: /\r?\n\r?\n(\[\[Categoria\:|\{\{DEFAULTSORT\:)/i,
				replace: '\n\n{{Referências}}\n\n$1',
				num: 1,
				ifnot: /(\{\{(ref\-?section|ref\-?list|referências)|<referen)/i
			}]
		}, {
			name: 'DEFAULTSORT 2',
			find: '',
			replace: '',
			num: 1,
			ifnot: /▓(Wikipedia|Ficheiro|MediaWiki|Predefinição|Ajuda|Categoria|Portal)( Discussão)?:/i,
			sub: [{
				name: 'Trimv de cat',
				find: /([^\]])(\r?\n)\[\[Categoria\:/i,
				replace: '$1\n\n[[Categoria:',
				num: 1
			}, {
				name: 'Trimv de defaultsort+cat',
				find: /(\{\{DEFAULTSORT:.*\}\})(\r?\n){2,}(\[\[Categoria:)/i,
				replace: '$1\n$3',
				num: 1
			}, {
				enabled: false,
				name: 'Defaultsort por sobrenome',
				find: 'Só arruma se não tiver defaultsort, e se tiver {{Biografias}}\n\nDesabilitando, ainda problemas, com artigos de grupos/duplas por exemplo',
				replace: '',
				num: 1,
				ifhas: /\{\{Biografias\}\}/i,
				ifnot: /\{\{DEFAULTSORT/i,
				sub: [{
					name: 'Insere',
					find: /(?:\r?\n){2,2}\[\[Categoria\:/i,
					replace: '\n\n{{DEFAULTSORT:%%title%%}}\n[[Categoria:',
					num: 1,
					ifnot: /\{\{DEFAULTSORT:/i
				}, {
					name: 'Paisnatal nao lusofono',
					find: /\{\{DEFAULTSORT:([^,\(\){}\n]+) ([^ ,\(\){}\n]+)( \([^\(\)\{\}\n]+\))?\}\}/i,
					replace: '{{DEFAULTSORT:$2, $1$3}}',
					num: 1,
					ifhas: /\n *\| *pa[ií]s(natal)? *= *\{\{/,
					ifnot: /\n *\| *pa[ií]s(natal)? *= *\{\{(AGO|BRA|CPV|GNB|GNQ|MAC|MOZ|MUS|PRT|SEN|STP|TLS)/
				}, {
					name: 'Sem palavra luso',
					find: /\{\{DEFAULTSORT:([^,\(\){}\n]+) ([^ ,\(\){}\n]+)( \([^\(\)\{\}\n]+\))?\}\}/i,
					replace: '{{DEFAULTSORT:$2, $1$3}}',
					num: 1,
					ifnot: /((Brasil|(Acre|Alagoas|Amapá|Amazonas|Bahia|Ceará|Espírito Santo|Goiás|Maranhão|Mato Grosso|Minas Gerais|Pará|Paraíba|Paraná|Pernambuco|Piauí|Rio de Janeiro|Rio Grande|Rondônia|Roraima|Santa Catarina|São Paulo|Sergipe|Tocantins)|Portugal|(Açores|Aveiro|Beja|Braga|Bragança|Castelo Branco|Coimbra|Évora|Faro|Guarda|Leiria|Lisboa|Madeira|Portalegre|Porto|Santarém|Setúbal|Viana do Castelo|Vila Real|Viseu)|Angola|Cabo Verde|Guiné\-Bissau|Moçambique|São Tomé e Príncipe|Timor\-leste)|\{\{Info\/Personagem fictícia)/i
				}]
			}, {
				name: 'Insere defaultsort',
				find: '',
				replace: '',
				num: 1,
				ifnot: '{{DEFAULTSORT:',
				sub: [{
					name: 'Insere defaultsort',
					find: /(?:\r?\n){2,2}\[\[Categoria\:/,
					replace: '\n\n{{DEFAULTSORT:%%title%%}}\n[[Categoria:',
					num: 1,
					ifnot: /\{\{DEFAULTSORT:/i
				}, {
					enabled: false,
					name: 'Defaultsort usando índice',
					find: '',
					replace: '',
					num: 1,
					ifhas: '{{DEFAULTSORT:', // FIXME: /\{\{DEFAULTSORT:/i ?
					ifnot: /\[\[Categoria:[^\|\[\]\n]*\]\]\r?\n/, // FIXME: /\[\[Categoria:[^\|\[\]\n]*\]\]\r?\n/i ?
					sub: [{
						name: 'Insere default pelo indice',
						find: /\{\{DEFAULTSORT:.*\}\}\r?\n(\[\[[Cc]ategoria:[^\|\[\]\n]+\|([A-Z0-9][^\[\]\n]+)\]\])\r?\n/,
						replace: '{{DEFAULTSORT:$2}}\n$1\n',
						num: 1
					}, {
						name: 'Retira indice, caso tenha só 1 cat',
						find: /(\{\{DEFAULTSORT:.*\}\}\r?\n\[\[Categoria:[^\|\[\]\n]+)\|[A-Z0-9][^\[\]\n]+\]\]\r?\n/,
						replace: '$1]]\n',
						num: 1,
						ifnot: /\[\[Categoria:.*\]\]\r?\n\[\[Categoria:/i
					}]
				}]
			}, {
				name: 'Arruma DEFAULTSORT',
				find: '',
				replace: '',
				num: 1,
				ifhas: 'DEFAULTSORT',
				sub: [{
					name: 'Defaultsort - Lista',
					find: /\{\{DEFAULTSORT:Anexo:Lista d[eoa]s? /i,
					replace: '{{DEFAULTSORT:',
					num: 1
				}, {
					name: 'Defaultsort - Anexo',
					find: /\{\{DEFAULTSORT:Anexo:/i,
					replace: '{{DEFAULTSORT:',
					num: 1
				}, {
					enabled: false,
					name: 'Remove de do da',
					find: /((?:\{\{DEFAULTSORT *\:|\[\[Categoria:[^\|\]\n]+\|).* )(?:D[eao]s?|E|D'|Of) /i,
					replace: '$1',
					num: 100,
					ifnot: /▓.* (D[eao]s?|E|D'|Of) /
				}, {
					name: 'As no final do DEFAULTSORT',
					find: /(\{\{DEFAULTSORT *\:|\[\[Categoria:[^\|\]\n]+\|)(As?|Os?|The) ([^\(\)\n\]\}]+)([\}\]])/,
					replace: '$1$3, $2$4',
					num: 1,
					ifhas: '▓',
					ifnot: '▓À'
				}, {
					name: 'Arrumando espaço',
					find: /((?:\{\{DEFAULTSORT *\:|\[\[Categoria:[^\|\]\n]+\|).*,)([^ \n])/i,
					replace: '$1 $2',
					num: 100
				}, {
					enabled: false,
					name: 'Caracteres especiais',
					find: 'desab, não sei se ainda é necessário',
					replace: '',
					num: 1,
					sub: [{
						name: 'DEFAULTSORT a',
						find: /(\{\{DEFAULTSORT *\:[^\}]*|\[\[Categoria:[^\|\]\n]+\|[^\]\n]*)[ãâáâàăåäą]([^\}\]\n]*[\}\]])/,
						replace: '$1a$2',
						num: 100
					}, {
						name: 'DEFAULTSORT A',
						find: /(\{\{DEFAULTSORT *\:[^\}]*|\[\[Categoria:[^\|\]\n]+\|[^\]\n]*)[ÅÂÁÃÀÂÄĂÄÄĄ]([^\}\]\n]*[\}\]])/,
						replace: '$1A$2',
						num: 100
					}, {
						name: 'DEFAULTSORT e',
						find: /(\{\{DEFAULTSORT *\:[^\}]*|\[\[Categoria:[^\|\]\n]+\|[^\]\n]*)[éèêëě]([^\}\]\n]*[\}\]])/,
						replace: '$1e$2',
						num: 100
					}, {
						name: 'DEFAULTSORT E',
						find: /(\{\{DEFAULTSORT *\:[^\}]*|\[\[Categoria:[^\|\]\n]+\|[^\]\n]*)[ÉÊÈË]([^\}\]\n]*[\}\]])/,
						replace: '$1E$2',
						num: 100
					}, {
						name: 'DEFAULTSORT i',
						find: /(\{\{DEFAULTSORT *\:[^\}]*|\[\[Categoria:[^\|\]\n]+\|[^\]\n]*)[íïìîï]([^\}\]\n]*[\}\]])/,
						replace: '$1i$2',
						num: 100
					}, {
						name: 'DEFAULTSORT I',
						find: /(\{\{DEFAULTSORT *\:[^\}]*|\[\[Categoria:[^\|\]\n]+\|[^\]\n]*)[ÍÌÎÏ]([^\}\]\n]*[\}\]])/,
						replace: '$1I$2',
						num: 100
					}, {
						name: 'DEFAULTSORT o',
						find: /(\{\{DEFAULTSORT *\:[^\}]*|\[\[Categoria:[^\|\]\n]+\|[^\]\n]*)[óöøõôōò]([^\}\]\n]*[\}\]])/,
						replace: '$1o$2',
						num: 100
					}, {
						name: 'DEFAULTSORT O',
						find: /(\{\{DEFAULTSORT *\:[^\}]*|\[\[Categoria:[^\|\]\n]+\|[^\]\n]*)[ÓÒÔÔÕØÖŌ]([^\}\]\n]*[\}\]])/,
						replace: '$1O$2',
						num: 100
					}, {
						name: 'DEFAULTSORT u',
						find: /(\{\{DEFAULTSORT *\:[^\}]*|\[\[Categoria:[^\|\]\n]+\|[^\]\n]*)[úùûüŭū]([^\}\]\n]*[\}\]])/,
						replace: '$1u$2',
						num: 100
					}, {
						name: 'DEFAULTSORT U',
						find: /(\{\{DEFAULTSORT *\:[^\}]*|\[\[Categoria:[^\|\]\n]+\|[^\]\n]*)[ÚÙÛÜŬŪ]([^\}\]\n]*[\}\]])/,
						replace: '$1U$2',
						num: 100
					}, {
						name: 'DEFAULTSORT B',
						find: /(\{\{DEFAULTSORT *\:[^\}]*|\[\[Categoria:[^\|\]\n]+\|[^\]\n]*)[ß]([^\}\]\n]*[\}\]])/,
						replace: '$1B$2',
						num: 100
					}, {
						name: 'DEFAULTSORT c',
						find: /(\{\{DEFAULTSORT *\:[^\}]*|\[\[Categoria:[^\|\]\n]+\|[^\]\n]*)[çćčĉ]([^\}\]\n]*[\}\]])/,
						replace: '$1c$2',
						num: 100
					}, {
						name: 'DEFAULTSORT C',
						find: /(\{\{DEFAULTSORT *\:[^\}]*|\[\[Categoria:[^\|\]\n]+\|[^\]\n]*)[ÇČĆĈ]([^\}\]\n]*[\}\]])/,
						replace: '$1C$2',
						num: 100
					}, {
						name: 'DEFAULTSORT d',
						find: /(\{\{DEFAULTSORT *\:[^\}]*|\[\[Categoria:[^\|\]\n]+\|[^\]\n]*)[đď]([^\}\]\n]*[\}\]])/,
						replace: '$1d$2',
						num: 100
					}, {
						name: 'DEFAULTSORT D',
						find: /(\{\{DEFAULTSORT *\:[^\}]*|\[\[Categoria:[^\|\]\n]+\|[^\]\n]*)[ĎĐ]([^\}\]\n]*[\}\]])/,
						replace: '$1D$2',
						num: 100
					}, {
						name: 'DEFAULTSORT g',
						find: /(\{\{DEFAULTSORT *\:[^\}]*|\[\[Categoria:[^\|\]\n]+\|[^\]\n]*)[ĝ]([^\}\]\n]*[\}\]])/,
						replace: '$1g$2',
						num: 100
					}, {
						name: 'DEFAULTSORT G',
						find: /(\{\{DEFAULTSORT *\:[^\}]*|\[\[Categoria:[^\|\]\n]+\|[^\]\n]*)[Ĝ]([^\}\]\n]*[\}\]])/,
						replace: '$1G$2',
						num: 100
					}, {
						name: 'DEFAULTSORT h',
						find: /(\{\{DEFAULTSORT *\:[^\}]*|\[\[Categoria:[^\|\]\n]+\|[^\]\n]*)[ĥ]([^\}\]\n]*[\}\]])/,
						replace: '$1h$2',
						num: 100
					}, {
						name: 'DEFAULTSORT H',
						find: /(\{\{DEFAULTSORT *\:[^\}]*|\[\[Categoria:[^\|\]\n]+\|[^\]\n]*)[Ĥ]([^\}\]\n]*[\}\]])/,
						replace: '$1H$2',
						num: 100
					}, {
						name: 'DEFAULTSORT j',
						find: /(\{\{DEFAULTSORT *\:[^\}]*|\[\[Categoria:[^\|\]\n]+\|[^\]\n]*)[ĵ]([^\}\]\n]*[\}\]])/,
						replace: '$1j$2',
						num: 100
					}, {
						name: 'DEFAULTSORT J',
						find: /(\{\{DEFAULTSORT *\:[^\}]*|\[\[Categoria:[^\|\]\n]+\|[^\]\n]*)[Ĵ]([^\}\]\n]*[\}\]])/,
						replace: '$1J$2',
						num: 100
					}, {
						name: 'DEFAULTSORT l',
						find: /(\{\{DEFAULTSORT *\:[^\}]*|\[\[Categoria:[^\|\]\n]+\|[^\]\n]*)ł([^\}\]\n]*[\}\]])/,
						replace: '$1l$2',
						num: 100
					}, {
						name: 'DEFAULTSORT L',
						find: /(\{\{DEFAULTSORT *\:[^\}]*|\[\[Categoria:[^\|\]\n]+\|[^\]\n]*)Ł([^\}\]\n]*[\}\]])/,
						replace: '$1L$2',
						num: 100
					}, {
						name: 'DEFAULTSORT n',
						find: /(\{\{DEFAULTSORT *\:[^\}]*|\[\[Categoria:[^\|\]\n]+\|[^\]\n]*)[ñńňň]([^\}\]\n]*[\}\]])/,
						replace: '$1n$2',
						num: 100
					}, {
						name: 'DEFAULTSORT N',
						find: /(\{\{DEFAULTSORT *\:[^\}]*|\[\[Categoria:[^\|\]\n]+\|[^\]\n]*)[ÑŇŃŇ]([^\}\]\n]*[\}\]])/,
						replace: '$1N$2',
						num: 100
					}, {
						name: 'DEFAULTSORT r',
						find: /(\{\{DEFAULTSORT *\:[^\}]*|\[\[Categoria:[^\|\]\n]+\|[^\]\n]*)[ř]([^\}\]\n]*[\}\]])/,
						replace: '$1r$2',
						num: 100
					}, {
						name: 'DEFAULTSORT R',
						find: /(\{\{DEFAULTSORT *\:[^\}]*|\[\[Categoria:[^\|\]\n]+\|[^\]\n]*)[Ř]([^\}\]\n]*[\}\]])/,
						replace: '$1R$2',
						num: 100
					}, {
						name: 'DEFAULTSORT s',
						find: /(\{\{DEFAULTSORT *\:[^\}]*|\[\[Categoria:[^\|\]\n]+\|[^\]\n]*)[ŝšśş]([^\}\]\n]*[\}\]])/,
						replace: '$1s$2',
						num: 100
					}, {
						name: 'DEFAULTSORT S',
						find: /(\{\{DEFAULTSORT *\:[^\}]*|\[\[Categoria:[^\|\]\n]+\|[^\]\n]*)[ŠŚŞŜ]([^\}\]\n]*[\}\]])/,
						replace: '$1S$2',
						num: 100
					}, {
						name: 'DEFAULTSORT t',
						find: /(\{\{DEFAULTSORT *\:[^\}]*|\[\[Categoria:[^\|\]\n]+\|[^\]\n]*)[ťţ]([^\}\]\n]*[\}\]])/,
						replace: '$1t$2',
						num: 100
					}, {
						name: 'DEFAULTSORT T',
						find: /(\{\{DEFAULTSORT *\:[^\}]*|\[\[Categoria:[^\|\]\n]+\|[^\]\n]*)[ŤŤŢ]([^\}\]\n]*[\}\]])/,
						replace: '$1T$2',
						num: 100
					}, {
						name: 'DEFAULTSORT z',
						find: /(\{\{DEFAULTSORT *\:[^\}]*|\[\[Categoria:[^\|\]\n]+\|[^\]\n]*)[žż]([^\}\]\n]*[\}\]])/,
						replace: '$1z$2',
						num: 100
					}, {
						name: 'DEFAULTSORT Z',
						find: /(\{\{DEFAULTSORT *\:[^\}]*|\[\[Categoria:[^\|\]\n]+\|[^\]\n]*)[ŽŻ]([^\}\]\n]*[\}\]])/,
						replace: '$1Z$2',
						num: 100
					}, {
						name: 'DEFAULTSORT ae',
						find: /(\{\{DEFAULTSORT *\:[^\}]*|\[\[Categoria:[^\|\]\n]+\|[^\]\n]*)æ([^\}\]\n]*[\}\]])/,
						replace: '$1ae$2',
						num: 100
					}, {
						name: 'DEFAULTSORT AE',
						find: /(\{\{DEFAULTSORT *\:[^\}]*|\[\[Categoria:[^\|\]\n]+\|[^\]\n]*)Æ([^\}\]\n]*[\}\]])/,
						replace: '$1AE$2',
						num: 100
					}, {
						name: 'DEFAULTSORT remover',
						find: /(\{\{DEFAULTSORT *\:[^\}]*|\[\[Categoria:[^\|\]\n]+\|[^\]\n]*)[ªº"]([^\}\]\n]*[\}\]])/,
						replace: '$1$2',
						num: 100
					}]
				}, {
					enabled: false, // desab, não sei se ainda é necessário
					name: 'Trocando por espaço',
					find: /((?:\{\{DEFAULTSORT *\:|\[\[Categoria:[^\|\]\n]+\|[^\]\n]*)[^\]\}\n]*)[\-\–\—_]([^\]\}\n]*[\}\]])/i,
					replace: '$1 $2',
					num: 100
				}, {
					enabled: false,
					name: 'DEFAULTSORT para maiúscula',
					find: /atualização do mediawiki não diferencia mais Maiúscula x Minúscula/,
					replace: '',
					num: 1,
					ifhas: /((?:\{\{DEFAULTSORT *\:|\[\[Categoria:[^\|\]\n]+\|)(?:[^\[\]\{\}\n]+[ \-\(\/])?)[a-z]/,
					sub: [{
						name: 'A',
						find: /((?:\{\{DEFAULTSORT *\:|\[\[Categoria:[^\|\]\n]+\|)(?:[^\]\}\n]+[ \-\(\/])?)a/,
						replace: '$1A',
						num: 100
					}, {
						name: 'B',
						find: /((?:\{\{DEFAULTSORT *\:|\[\[Categoria:[^\|\]\n]+\|)(?:[^\[\]\{\}\n]+[ \-\(\/])?)b/,
						replace: '$1B',
						num: 100
					}, {
						name: 'C',
						find: /((?:\{\{DEFAULTSORT *\:|\[\[Categoria:[^\|\]\n]+\|)(?:[^\[\]\{\}\n]+[ \-\(\/])?)c/,
						replace: '$1C',
						num: 100
					}, {
						name: 'D',
						find: /((?:\{\{DEFAULTSORT *\:|\[\[Categoria:[^\|\]\n]+\|)(?:[^\[\]\{\}\n]+[ \-\(\/])?)d/,
						replace: '$1D',
						num: 100
					}, {
						name: 'E',
						find: /((?:\{\{DEFAULTSORT *\:|\[\[Categoria:[^\|\]\n]+\|)(?:[^\[\]\{\}\n]+[ \-\(\/])?)e/,
						replace: '$1E',
						num: 100
					}, {
						name: 'F',
						find: /((?:\{\{DEFAULTSORT *\:|\[\[Categoria:[^\|\]\n]+\|)(?:[^\[\]\{\}\n]+[ \-\(\/])?)f/,
						replace: '$1F',
						num: 100
					}, {
						name: 'G',
						find: /((?:\{\{DEFAULTSORT *\:|\[\[Categoria:[^\|\]\n]+\|)(?:[^\[\]\{\}\n]+[ \-\(\/])?)g/,
						replace: '$1G',
						num: 100
					}, {
						name: 'H',
						find: /((?:\{\{DEFAULTSORT *\:|\[\[Categoria:[^\|\]\n]+\|)(?:[^\[\]\{\}\n]+[ \-\(\/])?)h/,
						replace: '$1H',
						num: 100
					}, {
						name: 'I',
						find: /((?:\{\{DEFAULTSORT *\:|\[\[Categoria:[^\|\]\n]+\|)(?:[^\[\]\{\}\n]+[ \-\(\/])?)i/,
						replace: '$1I',
						num: 100
					}, {
						name: 'J',
						find: /((?:\{\{DEFAULTSORT *\:|\[\[Categoria:[^\|\]\n]+\|)(?:[^\[\]\{\}\n]+[ \-\(\/])?)j/,
						replace: '$1J',
						num: 100
					}, {
						name: 'K',
						find: /((?:\{\{DEFAULTSORT *\:|\[\[Categoria:[^\|\]\n]+\|)(?:[^\[\]\{\}\n]+[ \-\(\/])?)k/,
						replace: '$1K',
						num: 100
					}, {
						name: 'L',
						find: /((?:\{\{DEFAULTSORT *\:|\[\[Categoria:[^\|\]\n]+\|)(?:[^\[\]\{\}\n]+[ \-\(\/])?)l/,
						replace: '$1L',
						num: 100
					}, {
						name: 'M',
						find: /((?:\{\{DEFAULTSORT *\:|\[\[Categoria:[^\|\]\n]+\|)(?:[^\[\]\{\}\n]+[ \-\(\/])?)m/,
						replace: '$1M',
						num: 100
					}, {
						name: 'N',
						find: /((?:\{\{DEFAULTSORT *\:|\[\[Categoria:[^\|\]\n]+\|)(?:[^\[\]\{\}\n]+[ \-\(\/])?)n/,
						replace: '$1N',
						num: 100
					}, {
						name: 'O',
						find: /((?:\{\{DEFAULTSORT *\:|\[\[Categoria:[^\|\]\n]+\|)(?:[^\[\]\{\}\n]+[ \-\(\/])?)o/,
						replace: '$1O',
						num: 100
					}, {
						name: 'P',
						find: /((?:\{\{DEFAULTSORT *\:|\[\[Categoria:[^\|\]\n]+\|)(?:[^\[\]\{\}\n]+[ \-\(\/])?)p/,
						replace: '$1P',
						num: 100
					}, {
						name: 'Q',
						find: /((?:\{\{DEFAULTSORT *\:|\[\[Categoria:[^\|\]\n]+\|)(?:[^\[\]\{\}\n]+[ \-\(\/])?)q/,
						replace: '$1Q',
						num: 100
					}, {
						name: 'R',
						find: /((?:\{\{DEFAULTSORT *\:|\[\[Categoria:[^\|\]\n]+\|)(?:[^\[\]\{\}\n]+[ \-\(\/])?)r/,
						replace: '$1R',
						num: 100
					}, {
						name: 'S',
						find: /((?:\{\{DEFAULTSORT *\:|\[\[Categoria:[^\|\]\n]+\|)(?:[^\[\]\{\}\n]+[ \-\(\/])?)s/,
						replace: '$1S',
						num: 100
					}, {
						name: 'T',
						find: /((?:\{\{DEFAULTSORT *\:|\[\[Categoria:[^\|\]\n]+\|)(?:[^\[\]\{\}\n]+[ \-\(\/])?)t/,
						replace: '$1T',
						num: 100
					}, {
						name: 'U',
						find: /((?:\{\{DEFAULTSORT *\:|\[\[Categoria:[^\|\]\n]+\|)(?:.+[ \-\(\/])?)u/,
						replace: '$1U',
						num: 100
					}, {
						name: 'V',
						find: /((?:\{\{DEFAULTSORT *\:|\[\[Categoria:[^\|\]\n]+\|)(?:[^\[\]\{\}\n]+[ \-\(\/])?)v/,
						replace: '$1V',
						num: 100
					}, {
						name: 'W',
						find: /((?:\{\{DEFAULTSORT *\:|\[\[Categoria:[^\|\]\n]+\|)(?:[^\[\]\{\}\n]+[ \-\(\/])?)w/,
						replace: '$1W',
						num: 100
					}, {
						name: 'X',
						find: /((?:\{\{DEFAULTSORT *\:|\[\[Categoria:[^\|\]\n]+\|)(?:[^\[\]\{\}\n]+[ \-\(\/])?)x/,
						replace: '$1X',
						num: 100
					}, {
						name: 'Y',
						find: /((?:\{\{DEFAULTSORT *\:|\[\[Categoria:[^\|\]\n]+\|)(?:[^\[\]\{\}\n]+[ \-\(\/])?)y/,
						replace: '$1Y',
						num: 100
					}, {
						name: 'Z',
						find: /((?:\{\{DEFAULTSORT *\:|\[\[Categoria:[^\|\]\n]+\|)(?:[^\[\]\{\}\n]+[ \-\(\/])?)z/,
						replace: '$1Z',
						num: 100
					}]
				}, {
					enabled: false,
					name: 'DEFAULTSORT para minuscula',
					find: 'atualização do mediawiki não diferencia mais Maiúscula x Minúscula',
					replace: '',
					num: 1,
					ifhas: /((?:\{\{DEFAULTSORT *\:|\[\[Categoria:[^\|\]\n]+\|)(?:[^\[\]\{\}\n]+[ \-\(\/])?)[A-Z]/,
					sub: [{
						name: 'A',
						find: /((?:\{\{DEFAULTSORT *\:|\[\[Categoria:[^\|\]\n]+\|)[^\]\}\n]*[^ \-\(\/])A/,
						replace: '$1a',
						num: 100
					}, {
						name: 'B',
						find: /((?:\{\{DEFAULTSORT *\:|\[\[Categoria:[^\|\]\n]+\|)[^\[\]\{\}\n]*[^ \-\(\/])B/,
						replace: '$1b',
						num: 100
					}, {
						name: 'C',
						find: /((?:\{\{DEFAULTSORT *\:|\[\[Categoria:[^\|\]\n]+\|)[^\[\]\{\}\n]*[^ \-\(\/])C/,
						replace: '$1c',
						num: 100
					}, {
						name: 'D',
						find: /((?:\{\{DEFAULTSORT *\:|\[\[Categoria:[^\|\]\n]+\|)[^\[\]\{\}\n]*[^ \-\(\/])D/,
						replace: '$1d',
						num: 100
					}, {
						name: 'E',
						find: /((?:\{\{DEFAULTSORT *\:|\[\[Categoria:[^\|\]\n]+\|)[^\[\]\{\}\n]*[^ \-\(\/])E/,
						replace: '$1e',
						num: 100
					}, {
						name: 'F',
						find: /((?:\{\{DEFAULTSORT *\:|\[\[Categoria:[^\|\]\n]+\|)[^\[\]\{\}\n]*[^ \-\(\/])F/,
						replace: '$1f',
						num: 100
					}, {
						name: 'G',
						find: /((?:\{\{DEFAULTSORT *\:|\[\[Categoria:[^\|\]\n]+\|)[^\[\]\{\}\n]*[^ \-\(\/])G/,
						replace: '$1g',
						num: 100
					}, {
						name: 'H',
						find: /((?:\{\{DEFAULTSORT *\:|\[\[Categoria:[^\|\]\n]+\|)[^\[\]\{\}\n]*[^ \-\(\/])H/,
						replace: '$1h',
						num: 100
					}, {
						name: 'I',
						find: /((?:\{\{DEFAULTSORT *\:|\[\[Categoria:[^\|\]\n]+\|)[^\[\]\{\}\n]*[^ \-\(\/])I/,
						replace: '$1i',
						num: 100
					}, {
						name: 'J',
						find: /((?:\{\{DEFAULTSORT *\:|\[\[Categoria:[^\|\]\n]+\|)[^\[\]\{\}\n]*[^ \-\(\/])J/,
						replace: '$1j',
						num: 100
					}, {
						name: 'K',
						find: /((?:\{\{DEFAULTSORT *\:|\[\[Categoria:[^\|\]\n]+\|)[^\[\]\{\}\n]*[^ \-\(\/])K/,
						replace: '$1k',
						num: 100
					}, {
						name: 'L',
						find: /((?:\{\{DEFAULTSORT *\:|\[\[Categoria:[^\|\]\n]+\|)[^\[\]\{\}\n]*[^ \-\(\/])L/,
						replace: '$1l',
						num: 100
					}, {
						name: 'M',
						find: /((?:\{\{DEFAULTSORT *\:|\[\[Categoria:[^\|\]\n]+\|)[^\[\]\{\}\n]*[^ \-\(\/])M/,
						replace: '$1m',
						num: 100
					}, {
						name: 'N',
						find: /((?:\{\{DEFAULTSORT *\:|\[\[Categoria:[^\|\]\n]+\|)[^\[\]\{\}\n]*[^ \-\(\/])N/,
						replace: '$1n',
						num: 100
					}, {
						name: 'O',
						find: /((?:\{\{DEFAULTSORT *\:|\[\[Categoria:[^\|\]\n]+\|)[^\[\]\{\}\n]*[^ \-\(\/])O/,
						replace: '$1o',
						num: 100
					}, {
						name: 'P',
						find: /((?:\{\{DEFAULTSORT *\:|\[\[Categoria:[^\|\]\n]+\|)[^\[\]\{\}\n]*[^ \-\(\/])P/,
						replace: '$1p',
						num: 100
					}, {
						name: 'Q',
						find: /((?:\{\{DEFAULTSORT *\:|\[\[Categoria:[^\|\]\n]+\|)[^\[\]\{\}\n]*[^ \-\(\/])Q/,
						replace: '$1q',
						num: 100
					}, {
						name: 'R',
						find: /((?:\{\{DEFAULTSORT *\:|\[\[Categoria:[^\|\]\n]+\|)[^\[\]\{\}\n]*[^ \-\(\/])R/,
						replace: '$1r',
						num: 100
					}, {
						name: 'S',
						find: /((?:\{\{DEFAULTSORT *\:|\[\[Categoria:[^\|\]\n]+\|)[^\[\]\{\}\n]*[^ \-\(\/])S/,
						replace: '$1s',
						num: 100
					}, {
						name: 'T',
						find: /((?:\{\{DEFAULTSORT *\:|\[\[Categoria:[^\|\]\n]+\|)[^\[\]\{\}\n]*[^ \-\(\/])T/,
						replace: '$1t',
						num: 100
					}, {
						name: 'U',
						find: /((?:\{\{DEFAULTSORT *\:|\[\[Categoria:[^\|\]\n]+\|)[^\[\]\{\}\n]*[^ \-\(\/])U/,
						replace: '$1u',
						num: 100
					}, {
						name: 'V',
						find: /((?:\{\{DEFAULTSORT *\:|\[\[Categoria:[^\|\]\n]+\|)[^\[\]\{\}\n]*[^ \-\(\/])V/,
						replace: '$1v',
						num: 100
					}, {
						name: 'W',
						find: /((?:\{\{DEFAULTSORT *\:|\[\[Categoria:[^\|\]\n]+\|)[^\[\]\{\}\n]*[^ \-\(\/])W/,
						replace: '$1w',
						num: 100
					}, {
						name: 'X',
						find: /((?:\{\{DEFAULTSORT *\:|\[\[Categoria:[^\|\]\n]+\|)[^\[\]\{\}\n]*[^ \-\(\/])X/,
						replace: '$1x',
						num: 100
					}, {
						name: 'Y',
						find: /((?:\{\{DEFAULTSORT *\:|\[\[Categoria:[^\|\]\n]+\|)[^\[\]\{\}\n]*[^ \-\(\/])Y/,
						replace: '$1y',
						num: 100
					}, {
						name: 'Z',
						find: /((?:\{\{DEFAULTSORT *\:|\[\[Categoria:[^\|\]\n]+\|)[^\[\]\{\}\n]*[^ \-\(\/])Z/,
						replace: '$1z',
						num: 100
					}]
				}, {
					name: 'Remove \'',
					find: /((?:\{\{DEFAULTSORT *\:|\[\[Categoria:[^\|\]\n]+\|)[^\}\]\n]*)'([^\}\]\n]*[\}\]])/i,
					replace: '$1$2',
					num: 100
				}]
			}, {
				name: 'Remove defaultsort',
				find: /\{\{DEFAULTSORT:.*\}\}\r?\n/,
				replace: '',
				num: 1,
				ifhas: /▓([^╦]*)╦[^░]*\{\{DEFAULTSORT:\1\}\}/
			}, {
				name: 'Defaultsort duplo',
				find: /(\{\{DEFAULTSORT:.*\}\}[^░]*)\{\{DEFAULTSORT:.*\}\}/,
				replace: '$1',
				num: 10
			}, {
				name: '- Indice = defaultsort',
				find: /(\{\{DEFAULTSORT:(.*)\}\}[^░]*\[\[Categoria:[^\|\n]*)\|\2\]\]/,
				replace: '$1]]',
				num: 100
			}]
		}, {
			name: 'Predefs inf',
			find: '',
			replace: '',
			num: 1,
			sub: [{
				name: 'Caixa de Sucessão',
				find: '',
				replace: '',
				num: 1,
				sub: [{
					name: 'linha entre caixas',
					find: /(\{\{Termina caixa\}\})(?:\r?\n){2,}(\{\{Começa caixa\}\})/i,
					replace: '$1\n$2',
					num: 1
				}, {
					name: 'linha após {{Começa caixa}}',
					find: /(\{\{Começa caixa\}\})(?:\r?\n){2,}(\{\{Caixa de sucessão)/i,
					replace: '$1\n$2',
					num: 1
				}, {
					name: 'linha antes {{Termina caixa}}',
					find: /(\}\})(?:\r?\n){2,}(\{\{Termina caixa\}\})/i,
					replace: '$1\n$2',
					num: 1
				}]
			}, {
				name: '{{Bloco de navegação}}',
				find: '',
				replace: '',
				num: 1,
				sub: [{
					name: '{{-}}{{Bloco de navegação',
					find: /\{\{\-\}\}(\r?\n)*\{\{Bloco de navegação/i,
					replace: '{{Bloco de navegação',
					num: 1
				}]
			}, {
				name: 'Portal',
				find: '',
				replace: '',
				num: 1,
				ifnot: /▓(Wikipedia|Ficheiro|MediaWiki|Predefinição|Ajuda|Categoria|Portal)( Discussão)?:/i,
				sub: [{
					name: 'Add {{Portal}}',
					find: '',
					replace: '',
					num: 1,
					ifnot: /\{\{(Portal3|desambiguação)/i,
					sub: [{
						name: 'Geral vazia',
						find: /\r?\n\r?\n(\[\[Categoria\:|\{\{DEFAULTSORT\:)/i,
						replace: '\n\n{{Portal3|}}\n\n$1',
						num: 1,
						ifnot: /\{\{Portal3/i
					}]
				}, {
					name: 'Portal3 duplo',
					find: /(\{\{Portal3\|[^}]*\}\}[^░]*)\{\{Portal3\|\}\}/,
					replace: '$1',
					num: 1
				}, {
					name: 'Ajuste em portal',
					find: /(\{\{Portal3.*)\| *[0-9]=/i,
					replace: '$1|',
					num: 100
				}, {
					name: 'Preenchendo {{Portal}}',
					find: '',
					replace: '',
					num: 1,
					ifhas: '{{Portal3', // FIXME: /\{\{Portal3/i ?
					sub: [{
						name: 'Linguística',
						find: '{{Portal3|',
						replace: '{{Portal3|Linguística|',
						num: 1,
						ifhas: /\[\[Categoria:(.* )?(Gramática|Línguas|Linguística|Alfabeto)[ \|\]]/i,
						ifnot: /\{\{Portal3.*\|Linguística[ \|\}]/i
					}, {
						name: 'Educação',
						find: '{{Portal3|', // FIXME: /\{\{Portal3|/i ?
						replace: '{{Portal3|Educação|',
						num: 1,
						ifhas: /\[\[Categoria:(Universidade|Professores|Instituições de ensino)[ \|\]]/i,
						ifnot: /(\{\{Portal3.*\|Educação[ \|\}]|\[\[Categoria:(.* )?(Ex\-alunos)[ \|\]])\n/i
					}, {
						name: 'Sociedade',
						find: '',
						replace: '',
						num: 1,
						sub: [{
							name: 'Política',
							find: '{{Portal3|',
							replace: '{{Portal3|Política|',
							num: 1,
							ifhas: /(\[\[Categoria:(.* )?(Política|Políticos|Senadores|Deputados|Governadores|Ministros)[ \|\]]|\{\{Info\/Político)/i,
							ifnot: /\{\{Portal3.*\|Política[ \|\}]/i
						}, {
							name: 'Futebol',
							find: '{{Portal3|',
							replace: '{{Portal3|Futebol|',
							num: 1,
							ifhas: /\[\[Categoria:(.* )?(futebol|futebolistas)[ \|\]]/i,
							ifnot: /\{\{Portal3.*\|Futebol[ \|\}]/i
						}, {
							name: 'Desporto',
							find: '{{Portal3|',
							replace: '{{Portal3|Desporto|',
							num: 1,
							ifhas: /\[\[Categoria:(.* )?(Desportos|Esportes|Desportistas)[ \|\]]/i,
							ifnot: /\{\{Portal3.*\|(Desporto|Futebol)[ \|\}]/i
						}]
					}, {
						name: 'Países (com predef)',
						find: '',
						replace: '',
						num: 1,
						sub: [{
							name: '{{esboço-geofr}}',
							find: '{{Portal3|',
							replace: '{{Portal3|França|',
							num: 1,
							ifhas: /\{\{esboço-geofr\}\}/i,
							ifnot: /\{\{Portal3.*\|França/i
						}, {
							name: '{{Info/xxx do país',
							find: /(\{\{Info\/(?:Província|Cidade|Estado|Município|Comuna|Localidade)s? d[aeo]s? ([^\r\n\-\|╔]+)[\r\n\-\|╔][^░]*\{\{Portal3\|)/i,
							replace: '$1$2|',
							num: 1
						}, {
							name: 'EUA',
							find: /(\{\{Portal3.*\|)EUA/i,
							replace: '$1Estados Unidos',
							num: 1
						}]
					}, {
						name: 'Geografia',
						find: '',
						replace: '',
						num: 1,
						sub: [{
							name: 'Geografia',
							find: '{{Portal3|',
							replace: '{{Portal3|Geografia|',
							num: 1,
							ifhas: /\[\[Categoria:(.* )?(Geografia)[ \|\]]/i,
							ifnot: /\{\{Portal3.*\|Geografia[ \|\}]/i
						}]
					}, {
						name: 'Ciência',
						find: '',
						replace: '',
						num: 1,
						sub: [{
							name: 'Zoologia',
							find: '{{Portal3|',
							replace: '{{Portal3|Zoologia|',
							num: 1,
							ifhas: /\[\[Categoria:(.* )?(Zoologia|Artrópodes)[ \|\]]/i,
							ifnot: /\{\{Portal3.*\|Zoologia[ \|\}]/i
						}, {
							name: 'Tecnologias de informação',
							find: '{{Portal3|',
							replace: '{{Portal3|Tecnologias de informação|',
							num: 1,
							ifhas: /(\[\[Categoria:(.* )?(Tecnologias de informação|Informática|Computadores|Criptografia|Algoritmos)[ \|\]]|\{\{Info\/Sítio *[\|\r?\n|╔])/i,
							ifnot: /\{\{Portal3.*\|Tecnologias de informação[ \|\}]/i
						}, {
							name: 'Saúde',
							find: '{{Portal3|',
							replace: '{{Portal3|Saúde|',
							num: 1,
							ifhas: /(\[\[Categoria:(.* )?(Doenças|Médicos|Oncologia|Saúde)[ \|\]]|\{\{(Esboço\-medicina)[ \|\]\}\r\n])/i,
							ifnot: /\{\{Portal3.*\|Saúde[ \|\}]/i
						}, {
							name: 'Química',
							find: '{{Portal3|',
							replace: '{{Portal3|Química|',
							num: 1,
							ifhas: /(\[\[Categoria:(.* )?(Química?o?s?|Ácidos?|Óxidos?)[ \|\]]|\{\{Info\/Química)/i,
							ifnot: /\{\{Portal3.*\|Química[ \|\}]/i
						}, {
							name: 'Matemática',
							find: '{{Portal3|',
							replace: '{{Portal3|Matemática|',
							num: 1,
							ifhas: /\[\[Categoria:(.* )?(Matemática|Matemáticos|Números)[ \|\]]/i,
							ifnot: /\{\{Portal3.*\|Matemática[ \|\}]/i
						}, {
							name: 'Física',
							find: '{{Portal3|',
							replace: '{{Portal3|Física|',
							num: 1,
							ifhas: /\[\[Categoria:(.* )?(Física)[ \|\]]/i,
							ifnot: /(\{\{Portal3.*\|Física[ \|\}]|\[\[Categoria:(.* )?(Educação Física)[ \|\]])/i
						}, {
							name: 'Biologia',
							find: '{{Portal3|', // FIXME: /\{\{Portal3|/i ?
							replace: '{{Portal3|Biologia|',
							num: 1,
							ifhas: /\[\[Categoria:(.* )?(Biologia|Musculo|Muscular|Anatomia)[ \|\]]/i,
							ifnot: /\{\{Portal3.*\|Biologia[ \|\}]/i
						}, {
							name: 'Botânica 2',
							find: '{{Portal3|',
							replace: '{{Portal3|Botânica|',
							num: 1,
							ifhas: /\{\{Esboço\-(Botânica)\}\}/i,
							ifnot: /\{\{Portal3.*\|Botânica[ \|\}]/i
						}, {
							name: 'Botânica (cat)',
							find: '{{Portal3|',
							replace: '{{Portal3|Botânica|',
							num: 1,
							ifhas: /(\[\[Categoria:(.* )?|\{\{esboço\-)(alga|apiales|árvore|asterácea|botânica|botânicos|briófito|cacto|crassulaceae|feto|gramínea|lamiales|legume|malvales|monocotiledónea|orquídea|palmeira|planta|poales|rosales|rosídea|santalales)[ \|\]]/i,
							ifnot: /\{\{Portal3.*\|Botânica[ \|\}]/i
						}, {
							name: 'Astronomia',
							find: '{{Portal3|',
							replace: '{{Portal3|Astronomia|',
							num: 1,
							ifhas: /\[\[Categoria:(.* )?(Astronomia)[ \|\]]/i,
							ifnot: /\{\{Portal3.*\|Astronomia[ \|\}]/i
						}, {
							name: 'Administração',
							find: '{{Portal3|',
							replace: '{{Portal3|Administração|',
							num: 1,
							ifhas: /(\[\[Categoria:(.* )?(Administração)[ \|\]]|\{\{(Portal\-administração))/i,
							ifnot: /\{\{Portal3.*\|Administração[ \|\}]/i
						}]
					}, {
						name: 'Portugal (predef)',
						find: '{{Portal3|',
						replace: '{{Portal3|Portugal|',
						num: 1,
						ifhas: /\{\{(Esboço\-freguesiaspt)\}\}/i,
						ifnot: /\{\{Portal3.*\|Portugal[ \|\}]/i
					}, {
						name: 'Biografias',
						find: '{{Portal3|',
						replace: '{{Portal3|Biografias|',
						num: 1,
						ifhas: /(\{\{(Esboço\-(biografia|jornalista))\}\}|\{\{Info\/(Ator|Arquiteto|Biografia|Cientista|Comediante|Criminoso|Deputado de Portugal|Enxadrista|Filósofo|Futebolista|Goísta|Político)|\[\[Categoria:(Atores|Cantores|Escritores|Futebolistas|Matemáticos|Pessoas|Prefeitos|Cônsules) d|\[\[Categoria:(Mortos em|Pilotos de)|\{\{sem infocaixa\|(Santos)|\n *\| *(datadenascimento|nascimento_data) *=|\| *fundo *= *cantor_solo)/i,
						ifnot: /\{\{Portal3.*\|Biografias[ \|\}]/i
					}, {
						name: 'Brasil (predef)',
						find: '',
						replace: '',
						num: 1,
						sub: [{
							name: 'Brasil (predef)',
							find: '{{Portal3|', // FIXME: /\{\{Portal3|/i ?
							replace: '{{Portal3|Brasil|',
							num: 1,
							ifhas: /\{\{Info\/Município do Brasil[\r\n\|]/i,
							ifnot: /(\{\{Portal3.*\|(Brasil|Tocantins|Sergirpe|São Paulo|Santa Catarina|Roraima|Rondônia|Rio Grande do Sul|Rio Grande do Norte|Rio de Janeiro|Piauí|Pernambuco|Paraná|Paraíba|Pará|Minas Gerais|Mato Grosso do Sul|Mato Grosso|Maranhão|Goiás|Espírito Santo|Ceará|Bahia|Amazonas|Amapá|Alagoas|Acre)|\[\[Categoria:(.* )?(Mineiros))[ \|\}]/i
						}]
					}, {
						name: 'Arte',
						find: '',
						replace: '',
						num: 1,
						sub: [{
							name: 'Televisão',
							find: '{{Portal3|',
							replace: '{{Portal3|Televisão|',
							num: 1,
							ifhas: /(\[\[Categoria:(.* )?(Televisão|Desenhos? animados?|Programas de televisão|Telenovelas|Reality shows)[ \|\]]|\{\{Info\/Televisão|\{\{Info\/Episódio de série|\{\{Esboço\-tv)/i,
							ifnot: /\{\{Portal3.*\|Televisão[ \|\}]/i
						}, {
							name: 'Pintura',
							find: '{{Portal3|',
							replace: '{{Portal3|Pintura|',
							num: 1,
							ifhas: /(\[\[Categoria:(.* )?(Pintores)[ \|\]]|\{\{Info\/Pintura)/i,
							ifnot: /\{\{Portal3.*\|Pintura[ \|\}]/i
						}, {
							name: 'Música',
							find: '{{Portal3|',
							replace: '{{Portal3|Música|',
							num: 1,
							ifhas: /(\[\[Categoria:(.* )?(Música|álbum|álbuns|canção|canções|singles d|cantore?s?|musicais|bandas)[ \|\]]|\{\{Info\/(Turnê|Álbum|música|Single|Ópera|Banda)|\{esboço\-música\})/i,
							ifnot: /\{\{Portal3.*\|(Música|Eurovisão)[ \|\}]/i
						}, {
							name: 'Literatura',
							find: '{{Portal3|',
							replace: '{{Portal3|Literatura|',
							num: 1,
							ifhas: /\[\[Categoria:(.* )?(Literatura|Livros|Escritores|Poetas)[ \|\]]/i,
							ifnot: /(\{\{Portal3.*\|Literatura[ \|\}]|\[\[Categoria:.*basead[ao]s? em livros?)/i
						}, {
							name: 'Games',
							find: '{{Portal3|',
							replace: '{{Portal3|Games|',
							num: 1,
							ifhas: /(\[\[Categoria:(.* )?(jogos? eletrônicos?|videogames?|PlayStation|Jogos para computador)[ \|\]]|\{\{(Info\/Jogo|Infobox VG))/i,
							ifnot: /\{\{Portal3.*\|Games[ \|\}]/i
						}, {
							name: 'Cinema',
							find: '{{Portal3|',
							replace: '{{Portal3|Cinema|',
							num: 1,
							ifhas: /(\[\[Categoria:(.* )?(Cinema|Filmes|Ator)[ \|\]]|\{\{(Info\/Filme|Info\/Cineasta)[ \|\]\r\n])/i,
							ifnot: /\{\{Portal3.*\|Cinema[ \|\}]/i
						}, {
							name: 'Banda desenhada',
							find: '{{Portal3|',
							replace: '{{Portal3|Banda desenhada|',
							num: 1,
							ifhas: /(\[\[Categoria:(.* )?(banda desenhada|DC Comics|Marvel Comics)[ \|\]]|\{\{(Info\/Graphic Novel|Esboço-bd|Portal BD))/i,
							ifnot: /\{\{Portal3.*\|Banda desenhada[ \|\}]/i
						}, {
							name: 'Animangá',
							find: '{{Portal3|',
							replace: '{{Portal3|Animangá|',
							num: 1,
							ifhas: /(\[\[Categoria:(.* )?(Anime|Mangá|Bleach|Naruto)[ \|\]]|\{\{Info\/(Bleach|Naruto))/i,
							ifnot: /\{\{Portal3.*\|Animangá[ \|\}]/i
						}, {
							name: 'Ator',
							find: '',
							replace: '',
							num: 1,
							ifhas: /(\[\[Categoria:(.* )?(Atores|Atrizes)[ \|\]]|Info\/Ator)/i,
							sub: [{
								name: 'Ator - cinema',
								find: '{{Portal3|',
								replace: '{{Portal3|Cinema|',
								num: 1,
								ifhas: /\n║=+ (Cinema|Filmes) =+\r?\n/i,
								ifnot: /\{\{Portal3.*\|Cinema[ \|\}]/i
							}, {
								name: 'Ator - televisão',
								find: '{{Portal3|',
								replace: '{{Portal3|Televisão|',
								num: 1,
								ifhas: /\n║=+ (Novelas|Séries|Televisão) =+\r?\n/i,
								ifnot: /\{\{Portal3.*\|(Televisão|Cinema)[ \|\}]/i
							}, {
								name: 'Ator - genérico',
								find: '{{Portal3|',
								replace: '{{Portal3|Arte|',
								num: 1
							}]
						}, {
							name: 'Arte (cat)',
							find: '{{Portal3|',
							replace: '{{Portal3|Arte|',
							num: 1,
							ifhas: /\[\[Categoria:(.* )?(Arte|Artistas|Personagens|Fictícios)[ \|\]]/i,
							ifnot: /\{\{Portal3.*\|(Arte|Animangá|Banda desenhada|Cinema|Games|Literatura|Música|Pintura|Televisão)[\|\}]/i
						}]
					}]
				}, {
					name: 'Retirando {{Portal3|',
					find: '',
					replace: '',
					num: 1,
					sub: [{
						name: 'Brasil',
						find: /(\{\{Portal3.*)\|Brasil/i,
						replace: '$1',
						num: 10,
						ifhas: /\{\{Portal3.*\|(Tocantins|Sergirpe|São Paulo|Santa Catarina|Roraima|Rondônia|Rio Grande do Sul|Rio Grande do Norte|Rio de Janeiro|Piauí|Pernambuco|Paraná|Paraíba|Pará|Minas Gerais|Mato Grosso do Sul|Mato Grosso|Maranhão|Goiás|Espírito Santo|Ceará|Bahia|Amazonas|Amapá|Alagoas|Acre)[ \|\}]/i
					}, {
						name: 'Sociedade',
						find: /(\{\{Portal3.*)\|Sociedade/i,
						replace: '$1',
						num: 10,
						ifhas: /\{\{Portal3.*\|(Política|Futebol|Desporto)[\|\}]/i
					}, {
						name: 'Duplicado espaçado',
						find: /(\{\{Portal3.*)\|([^\|\n]+)(\|.*)(\|\2[\|}])/i,
						replace: '$1$3$4',
						num: 10
					}, {
						name: 'Duplicado junto',
						find: /(\{\{Portal3.*)\|([^\|\n]+)(\|\2[\|}])/i,
						replace: '$1$3',
						num: 1
					}]
				}, {
					name: 'Arrumando portal',
					find: /(\{\{Portal3.*)\|\}\}/i,
					replace: '$1}}',
					num: 10
				}, {
					name: 'Removendo portal vazio',
					find: /\{\{Portal3\}\}\r?\n\r?\n/i,
					replace: '',
					num: 1
				}, {
					name: 'Removendo portal antigo',
					find: /\{\{(portal\-(administração|cinema|química|lingüística)|Portal BD)\}\}/i,
					replace: '',
					num: 1
				}]
			}, {
				name: 'Tags man',
				find: '',
				replace: '',
				num: 1,
				sub: [{
					name: 'Inserindo',
					find: '',
					replace: '',
					num: 1,
					sub: [{
						name: '{{Reciclagem|Predefinição}}',
						find: /\r?\n\r?\n(\[\[Categoria:|\{\{DEFAULTSORT:)/i,
						replace: '\n\n{{Reciclagem|Predefinição}}\n\n$1',
						num: 1,
						ifhas: /(\{\{Navebox|\{\{#if:|\{\{#switch:|[^{]\{\{\{)/i,
						ifnot: /\{\{Reciclagem[\|}]/i
					}]
				}, {
					name: 'Retirando',
					find: '',
					replace: '',
					num: 1,
					sub: [{
						name: '{{semfichatécnica}}',
						find: /\{\{semfichatécnica\}\}/i,
						replace: '{{Revisar Info Filme}}<',
						num: 1,
						ifhas: '{{Info/Filme' // FIXME: /\{\{Info/Filme/i ?
					}, {
						name: '{{seminterwiki}}',
						find: /\{\{seminterwiki.*\}\}\r?\n/i,
						replace: '',
						num: 1,
						ifhas: /\[\[\s*[a-z][a-z]\s*\:/
					}]
				}]
			}]
		}, {
			name: 'Seções vazias',
			find: '',
			replace: '',
			num: 1,
			sub: [{
				name: 'Seção LE vazia',
				find: /║== Ligações externas ==\n*(║==[^=]|\{\{(DEFAULTSORT|Esboço|Bloco de navegação|Sucessão)|\[\[Categoria:)/i,
				replace: '$1',
				num: 1
			}, {
				name: 'Seção VT vazia',
				find: /║== Ver também ==\n*(║==[^=]|\{\{(DEFAULTSORT|Esboço|Bloco de navegação|Sucessão)|\[\[Categoria:)/i,
				replace: '$1',
				num: 1
			}]
		}]
	}, {
		name: 'Geral 2',
		find: '',
		replace: '',
		num: 1,
		sub: [{
			name: 'Tag man',
			find: '',
			replace: '',
			num: 1,
			ifhas: '{{', // FIXME: /\{\{/i ?
			sub: [{
				name: 'marcando predefs',
				find: /\{\{(Artigo longo|Carece de fontes2|Carece de fontes|Contextualizar|Controverso|Corrigir|Fusão|Fusão com|Fusão de|Mais notas|M\-notas\-bpv|Parcial|Reciclagem|Revisão|Revisão\-sobre|Sem\-fontes|Sem imagem|Seminterwiki|Sem[\- ]notas|Trivia|Wikificação)([\|}])/i,
				replace: '{{┴$1$2',
				num: 1
			}, {
				name: 'Datando predefs',
				find: '',
				replace: '',
				num: 1,
				sub: [{
					name: 'Campo data correto',
					find: /\{\{(┴[^\|{}\n]*)\|(?:Dat[ae])=/i,
					replace: '{{$1|data=',
					num: 100
				}, {
					name: 'Marcando |data=',
					find: /(\{\{┴[^{}\n]*)\| *data *\=/i,
					replace: '$1|├',
					num: 100
				}, {
					name: 'Datando 2',
					find: /\{\{(┴[^\|{}\n]*\|[^├\n]*)(janeiro|fevereiro|março|abril|maio|junho|julho|agosto|setembro|outubro|novembro|dezembro)/i,
					replace: '{{$1|├$2',
					num: 1
				}, {
					name: 'Datando',
					find: /\{\{(┴[^\|{}\n]*\|[^├{}\n]*)\}\}/i,
					replace: '{{$1|data={{subst:CURRENTMONTHNAME}} de {{subst:CURRENTYEAR}}}}',
					num: 1
				}, {
					name: 'Rule',
					find: /(\{\{(?:┴[^\|{}\n]*\|)(?:[^├{}\n]*├[^ {}\n]*)) (2[0-9])/i,
					replace: '$1 de $2',
					num: 1
				}, {
					name: 'Desmarcando |data=',
					find: '├',
					replace: 'data=',
					num: 1
				}, {
					name: 'Datando 1',
					find: /\{\{(┴[^\|{}\n]*)(\|seção)?\}\}/i,
					replace: '{{$1|data={{subst:CURRENTMONTHNAME}} de {{subst:CURRENTYEAR}}$2}}',
					num: 1
				}, {
					name: 'Datando 3',
					find: /\{\{Revisão\-sobre\|([^\|\n{}]+)\}\}/i,
					replace: '{{Revisão-sobre|$1|data={{subst:CURRENTMONTHNAME}} de {{subst:CURRENTYEAR}}}}',
					num: 1
				}]
			}, {
				name: 'Assunto em predef man',
				find: '',
				replace: '',
				num: 1,
				ifhas: '{{Portal3', // FIXME: /\{\{Portal3/i ?
				sub: [{
					enabled: false,
					name: 'Assunto em predef man Timor-Leste',
					find: '',
					replace: '',
					num: 1,
					ifhas: /\{\{Portal3.*\|Timor-Leste[ \|\}]/,
					sub: [{
						name: 'marcando Timor-Leste',
						find: /\| *Timor-Leste *\= */,
						replace: '├',
						num: 1
					}, {
						name: 'inserindo Timor-Leste',
						find: /\{\{(Artigo longo|Contextualizar|Controverso|Corrigir|Fusão|Fusão com|Fusão de|Parcial|Reciclagem|Sem\-fontes|Sem imagem|Seminterwiki|Seminterwiki\-categoria|Sem\-notas|Trivia|Wikificação)([\|}][^}\n├┼]*\})/i,
						replace: '{{$1├sim$2',
						num: 1
					}, {
						name: 'desmarcando Timor-Leste',
						find: '├',
						replace: '|Timor-Leste=',
						num: 1
					}]
				}, {
					name: 'Assunto em predef man sociedade',
					find: '',
					replace: '',
					num: 1,
					ifhas: /(\{\{Portal3.*\|(Sociedade|Política|Futebol|Desporto)[ \|\}])/,
					sub: [{
						name: 'marcando desporto',
						find: /\| *desporto\= */i,
						replace: '┼',
						num: 1
					}, {
						name: 'marcando sociedade',
						find: /\| *sociedade\= */,
						replace: '├',
						num: 1
					}, {
						name: 'inserindo sociedade',
						find: /\{\{(┴[^\|{}\n├┼]*)([\|}][^}\n├┼]*\})/i,
						replace: '{{$1├sim$2',
						num: 1,
						ifnot: /├ *[^\|}]/i
					}, {
						name: 'preenche sociedade',
						find: /(\{\{┴[^├]*├) *([\|\}])/i,
						replace: '$1sim$2',
						num: 1,
						ifhas: /├ *[\|}]/i
					}, {
						name: 'inserindo desporto',
						find: /├/i,
						replace: '┼',
						num: 1,
						ifhas: /\{\{Portal3.*\|(Desportos?|Futebol|Ginástica|Eventos multiesportivos)/i
					}, {
						name: 'desmarcando sociedade',
						find: '├',
						replace: '|sociedade=',
						num: 1
					}, {
						name: 'desmarcando desporto',
						find: '┼',
						replace: '|desporto=',
						num: 1
					}]
				}, {
					enabled: false,
					name: 'Assunto em predef man São Tomé e Príncipe',
					find: '',
					replace: '',
					num: 1,
					ifhas: /\{\{Portal3.*\|São Tomé e Príncipe[ \|\}]/,
					sub: [{
						name: 'marcando São Tomé e Príncipe',
						find: /\| *São Tomé e Príncipe *\= */,
						replace: '├',
						num: 1
					}, {
						name: 'inserindo São Tomé e Príncipe',
						find: /\{\{(Artigo longo|Contextualizar|Controverso|Corrigir|Fusão|Fusão com|Fusão de|Parcial|Reciclagem|Sem\-fontes|Sem imagem|Seminterwiki|Seminterwiki\-categoria|Sem\-notas|Trivia|Wikificação)([\|}][^}\n├┼]*\})/i,
						replace: '{{$1├sim$2',
						num: 1
					}, {
						name: 'desmarcando São Tomé e Príncipe',
						find: '├',
						replace: '|São Tomé e Príncipe=',
						num: 1
					}]
				}, {
					name: 'Assunto em predef man Portugal',
					find: '',
					replace: '',
					num: 1,
					ifhas: /(\[\[Categoria:(.* )?(Portugal)[ \|\]]|\{\{Portal3.*\|Portugal[ \|\}]|\{\{(Esboço\-freguesiaspt)\}\})/i,
					sub: [{
						name: 'marcando Portugal',
						find: /\| *Portugal\= */,
						replace: '├',
						num: 1
					}, {
						name: 'inserindo Portugal',
						find: /\{\{(┴[^\|{}\n├┼]*)([\|}][^}\n├┼]*\})/i,
						replace: '{{$1├sim$2',
						num: 1,
						ifnot: /├ *[^\|}]/i
					}, {
						name: 'preenche Portugal',
						find: /(\{\{┴[^├]*├) *([\|\}])/i,
						replace: '$1sim$2',
						num: 1,
						ifhas: /├ *[\|}]/i
					}, {
						name: 'desmarcando Portugal',
						find: '├',
						replace: '|Portugal=',
						num: 1
					}]
				}, {
					enabled: false,
					name: 'Assunto em predef man Moçambique',
					find: '',
					replace: '',
					num: 1,
					ifhas: /\{\{Portal3.*\|Moçambique[ \|\}]/,
					sub: [{
						name: 'marcando Moçambique',
						find: /\| *Moçambique *\= */,
						replace: '├',
						num: 1
					}, {
						name: 'inserindo Moçambique',
						find: /\{\{(Artigo longo|Contextualizar|Controverso|Corrigir|Fusão|Fusão com|Fusão de|Parcial|Reciclagem|Sem\-fontes|Sem imagem|Seminterwiki|Seminterwiki\-categoria|Sem\-notas|Trivia|Wikificação)([\|}][^}\n├┼]*\})/i,
						replace: '{{$1├sim$2',
						num: 1
					}, {
						name: 'desmarcando Moçambique',
						find: '├',
						replace: '|Moçambique=',
						num: 1
					}]
				}, {
					enabled: false,
					name: 'Assunto em predef man Guiné-Bissau',
					find: '',
					replace: '',
					num: 1,
					ifhas: /\{\{Portal3.*\|Guiné-Bissau[ \|\}]/,
					sub: [{
						name: 'marcando Guiné-Bissau',
						find: /\| *Guiné-Bissau *\= */,
						replace: '├',
						num: 1
					}, {
						name: 'inserindo Guiné-Bissau',
						find: /\{\{(┴[^\|{}\n]*)([\|}][^}\n├┼]*\})/i,
						replace: '{{$1├sim$2',
						num: 1
					}, {
						name: 'desmarcando Guiné-Bissau',
						find: '├',
						replace: '|Guiné-Bissau=',
						num: 1
					}]
				}, {
					name: 'Assunto em predef man geografia',
					find: '',
					replace: '',
					num: 1,
					ifhas: /\{\{Portal3.*\|Geografia[ \|\}]/,
					sub: [{
						name: 'marcando geografia',
						find: /\| *geografia\= */,
						replace: '├',
						num: 1
					}, {
						name: 'inserindo geografia',
						find: /\{\{(┴[^\|{}\n├┼]*)([\|}][^}\n├┼]*\})/i,
						replace: '{{$1├sim$2',
						num: 1,
						ifnot: /├ *[^\|}]/i
					}, {
						name: 'preenche geografia',
						find: /(\{\{┴[^├]*├) *([\|\}])/i,
						replace: '$1sim$2',
						num: 1,
						ifhas: /├ *[\|}]/i
					}, {
						name: 'desmarcando geografia',
						find: '├',
						replace: '|geografia=',
						num: 1
					}]
				}, {
					name: 'Assunto em predef man ciência',
					find: '',
					replace: '',
					num: 1,
					ifhas: /(\[\[Categoria:(.* )?(Ciência|Cientista)[ \|\]]|\{\{Portal3.*\|(Ciência|Administração|Astronomia|Botânica|Biologia|Física|Matemática|Química|Saúde|Tecnologias de informação|Zoologia)[ \|\}]|\{\{(Info\/Taxonomia))/i,
					sub: [{
						name: 'marcando ciência',
						find: /\| *ciência\= */,
						replace: '├',
						num: 1
					}, {
						name: 'inserindo ciência',
						find: /\{\{(┴[^\|{}\n├┼]*)([\|}][^}\n├┼]*\})/i,
						replace: '{{$1├sim$2',
						num: 1
					}, {
						name: 'preenche ciência',
						find: /(\{\{┴[^├]*├) *([\|\}])/i,
						replace: '$1sim$2',
						num: 1,
						ifhas: /├ *[\|}]/
					}, {
						name: 'desmarcando ciência',
						find: '├',
						replace: '|ciência=',
						num: 1
					}]
				}, {
					enabled: false,
					name: 'Assunto em predef man Cabo Verde',
					find: '',
					replace: '',
					num: 1,
					ifhas: /\{\{Portal3.*\|Cabo Verde[ \|\}]/,
					sub: [{
						name: 'marcando Cabo Verde',
						find: /\| *Cabo Verde *\= */,
						replace: '├',
						num: 1
					}, {
						name: 'inserindo Cabo Verde',
						find: /\{\{(┴[^\|{}\n]*)([\|}][^}\n├┼]*\})/i,
						replace: '{{$1├sim$2',
						num: 1,
						ifnot: /├ *[^\|}]/i
					}, {
						name: 'desmarcando Cabo Verde',
						find: '├',
						replace: '|Cabo Verde=',
						num: 1
					}]
				}, {
					name: 'Assunto em predef man Brasil',
					find: '',
					replace: '',
					num: 1,
					ifhas: /(\[\[Categoria:(.* )?(Brasil)[ \|\]]|\{\{Portal3.*\|(Brasil|Tocantins|Sergirpe|São Paulo|Santa Catarina|Roraima|Rondônia|Rio Grande do Sul|Rio Grande do Norte|Rio de Janeiro|Piauí|Pernambuco|Paraná|Paraíba|Pará|Minas Gerais|Mato Grosso do Sul|Mato Grosso|Maranhão|Goiás|Espírito Santo|Ceará|Bahia|Amazonas|Amapá|Alagoas|Acre)|\{\{Info\/Município do Brasil[\r\n\|])/i,
					sub: [{
						name: 'marcando Brasil',
						find: /\| *Brasil\= */,
						replace: '├',
						num: 1
					}, {
						name: 'inserindo Brasil',
						find: /\{\{(┴[^\|{}\n├┼]*)([\|}][^}\n├┼]*\})/i,
						replace: '{{$1├sim$2',
						num: 1,
						ifnot: /├ *[^\|}]/i
					}, {
						name: 'preenche Brasil',
						find: /(\{\{┴[^├]*├) *([\|\}])/i,
						replace: '$1sim$2',
						num: 1,
						ifhas: /├ *[\|}]/i
					}, {
						name: 'desmarcando Brasil',
						find: '├',
						replace: '|Brasil=',
						num: 1
					}]
				}, {
					name: 'Assunto em predef man biografia',
					find: '',
					replace: '',
					num: 1,
					ifhas: /\{\{Portal3.*\|Biografias[ \|\}]/i,
					sub: [{
						name: 'marcando biografia',
						find: /\| *biografia\= */i,
						replace: '├',
						num: 1
					}, {
						name: 'inserindo biografia',
						find: /\{\{(┴[^\|{}\n├┼]*)([\|}][^}\n├┼]*\})/i,
						replace: '{{$1├sim$2',
						num: 1,
						ifnot: /├ *[^\|}]/i
					}, {
						name: 'preenche biografia',
						find: /(\{\{┴[^├]*├) *([\|\}])/i,
						replace: '$1sim$2',
						num: 1,
						ifhas: /├ *[\|}]/i
					}, {
						name: 'desmarcando biografia',
						find: /├/i,
						replace: '|biografia=',
						num: 1
					}]
				}, {
					enabled: false,
					name: 'Assunto em predef man Angola',
					find: '',
					replace: '',
					num: 1,
					ifhas: /\{\{Portal3.*\|Angola[ \|\}]/,
					sub: [{
						name: 'marcando Angola',
						find: /\| *Angola *\= */,
						replace: '├',
						num: 1
					}, {
						name: 'inserindo Angola',
						find: /\{\{(┴[^\|{}\n]*)([\|}][^}\n├┼]*\})/i,
						replace: '{{$1├sim$2',
						num: 1
					}, {
						name: 'desmarcando Angola',
						find: '├',
						replace: '|Angola=',
						num: 1
					}]
				}]
			}, {
				name: 'Desmarcando predefs',
				find: '┴',
				replace: '',
				num: 1
			}]
		}, {
			name: 'Ordem geral do artigo',
			find: '',
			replace: '',
			num: 1,
			sub: [{
				name: 'Rule',
				find: /([^\r\n])(\{\{(?:Artigo longo|Contextualizar|Controverso|Corrigir|em construção|Em tradução|Fusão|Fusão com|Fusão de|Parcial|Reciclagem|revisão\-sobre|Revisão|Sem\-fontes|Sem imagem|Sem\-notas|Wikificação))/i,
				replace: '$1\n$2',
				num: 10
			}, {
				name: 'Ordem das predefs superiores',
				find: '',
				replace: '',
				num: 1,
				ifhas: /\{\{/i,
				sub: [{
					name: 'Seminfobox para topo',
					find: /(╦\r?\n)([^░]*)(\{\{(?:Falta\-caixa\-info|Sem\-infobox|Sem infocaixa|Semfichatécnica|Revisar Info Filme|Falta\-chembox|Sem\-infotaxo|Falta\-preenchercaixa).*\}\})\r?\n/i,
					replace: '$1$3\n$2',
					num: 1
				}, {
					name: 'Tag man',
					find: /(╦)\r?\n([^░╬╩]+)\r?\n([^┼]\{(?:Artigo longo|Contextualizar|Controverso|Corrigir|em construção|Em tradução|Fusão|Fusão com|Fusão de|Parcial|Reciclagem|revisão\-sobre|Revisão|Sem\-fontes|Sem imagem|Sem\-notas|Wikificação)\|.*)\r?\n/i,
					replace: '$1\n┼$3\n$2\n',
					num: 100
				}, {
					name: 'Rule',
					find: '┼',
					replace: '',
					num: 100
				}, {
					name: 'Geocoordenadas',
					find: /(╦)\r?\n([^░]+)\r?\n(\{\{(?:geocoordenadas|coor title dms)\|.*)/i,
					replace: '$1\n$3\n$2',
					num: 1
				}, {
					name: 'Desambig',
					find: /(╦)\r?\n([^░]+)\r?\n(\{\{(?:Desambiguação|Desambigexplicada2?|Minidesambig2?|Não confundir com|Outrosusos|Outrousopara|Complementação de categorias|Redirect|Desambiguação\-redirect|Ver desambiguação2?).*)/i,
					replace: '$1\n$3\n$2',
					num: 10
				}, {
					name: 'Quebra dupla antes predef man sup',
					find: /(?:\r?\n){2,}\{\{(Artigo longo|Contextualizar|Controverso|Corrigir|Fusão|Fusão com|Fusão de|Geocoordenadas|Parcial|Reciclagem|revisão\-sobre|Revisão|Sem\-fontes|Sem imagem|Seminterwiki|Sem\-notas|Wikificação)([\|}])/i,
					replace: '\n{{$1$2',
					num: 1
				}]
			}, {
				name: 'Ordem das seções inferiores',
				find: '',
				replace: '',
				num: 1,
				sub: [{
					name: 'Marca',
					find: '',
					replace: '',
					num: 1,
					sub: [{
						name: 'Marca LE',
						find: '║== Ligações externas ==',
						replace: '┬',
						num: 1
					}, {
						name: 'Marca VT',
						find: '║== Ver também ==',
						replace: '┼',
						num: 1
					}, {
						name: 'Marca Biblio',
						find: /\n║== Bibliografia ==\n/i,
						replace: '├',
						num: 1
					}, {
						name: 'Marca {{Referências}}',
						find: /\{\{Referências/i,
						replace: '┤',
						num: 1
					}, {
						name: 'Marca ref group=nota',
						find: /║== Notas? ==\n<references group=nota\/>/,
						replace: '┴',
						num: 1,
						ifnot: /┼(\r?\n)*<\/references>/i
					}, {
						name: 'Marca gallery 1',
						find: /║== (Galeria de )?image(ns|m) ==\n<gallery>/i,
						replace: '┐',
						num: 1
					}, {
						name: 'Marca gallery 2',
						find: /<\/gallery>/,
						replace: '└',
						num: 1
					}]
				}, {
					name: 'Ordem do ref group=nota',
					find: '',
					replace: '',
					num: 1,
					ifhas: /┴/i,
					sub: [{
						name: 'Nota &amp; LE',
						find: /(┬[^┴╔╗]*)\r?\n(┴.*)/i,
						replace: '$2\n\n$1',
						num: 1
					}]
				}, {
					name: 'Ordem da {{referências}} 1',
					find: '',
					replace: '',
					num: 1,
					ifhas: /┤/i,
					ifnot: /┤.*\}\}\n+===/,
					sub: [{
						name: 'REF &amp; LE 1',
						find: /(┬[^┤╔╗]*)\r?\n(┤.*\}\})/i,
						replace: '$2\n\n$1',
						num: 1
					}, {
						name: 'REF &amp; Nota 1',
						find: /(┴[^┤╔╗]*)\r?\n(┤.*\}\})/i,
						replace: '$2\n\n$1',
						num: 1
					}]
				}, {
					name: 'Ordem da {{referências}} 2',
					find: '',
					replace: '',
					num: 1,
					ifhas: /┤.*\}\}\n+===/i,
					sub: [{
						name: 'REF &amp; Nota 2',
						find: /(┴)\r?\n([^┤╔╗]*)\r?\n(┤.*\}\})\r?\n([^┼┬├╔╗]*)\r?\n([┼┬├])/i,
						replace: '$3\n$4\n$1\n$2\n$5',
						num: 1
					}]
				}, {
					name: 'Ordem gallery',
					find: '',
					replace: '',
					num: 1,
					ifhas: '┐',
					sub: [{
						name: 'Gallery &amp; LE',
						find: /(┬[^┐╔╗]*)\r?\n(┐[^└╔╗]+└)/i,
						replace: '$2\n\n$1',
						num: 1
					}, {
						name: 'Gallery &amp; VT',
						find: /(┼[^┐╔╗]*)\r?\n(┐[^└╔╗]+└)/,
						replace: '$2\n\n$1',
						num: 1
					}, {
						name: 'Gallery &amp; Biblio',
						find: /(├[^┐╔╗]*)\r?\n(┐[^└╔╗]+└)/,
						replace: '$2\n\n$1',
						num: 1
					}, {
						name: 'Gallery &amp; Nota',
						find: /(┴[^┐╔╗]*)\r?\n(┐[^└╔╗]+└)/,
						replace: '$2\n\n$1',
						num: 1
					}, {
						name: 'Gallery &amp; REF',
						find: /(┤.*\}\}[^┐╔╗]*)\r?\n(┐[^└╔╗]+└)/,
						replace: '$2\n\n$1',
						num: 1
					}]
				}, {
					name: 'Desmarca',
					find: '',
					replace: '',
					num: 1,
					sub: [{
						name: 'Desmarca ref group=nota',
						find: '┴',
						replace: '║== Notas ==\n&lt;references group=nota/&gt;',
						num: 1
					}, {
						name: 'Desmarc {{Ref-section}}',
						find: '┤', // FIXME: /┤/i ?
						replace: '{{referências',
						num: 1
					}, {
						name: 'Desmarca gallery 2',
						find: '└',
						replace: '&lt;/gallery&gt;',
						num: 1
					}, {
						name: 'Desmarca gallery 1',
						find: '┐',
						replace: '║== Galeria de imagens ==\n&lt;gallery&gt;',
						num: 1
					}, {
						name: 'Desmarca Biblio',
						find: /├/i,
						replace: '\n║== Bibliografia ==\n',
						num: 1
					}, {
						name: 'Desmarca VT',
						find: '┼',
						replace: '║== Ver também ==',
						num: 1
					}, {
						name: 'Desmarca LE',
						find: '┬',
						replace: '║== Ligações externas ==',
						num: 1
					}]
				}, {
					name: 'Arrumando quebra de linha em seção',
					find: /\=\=\n\n/,
					replace: '==\n',
					num: 1
				}]
			}, {
				name: 'Ordem do final',
				find: '',
				replace: '',
				num: 1,
				ifhas: /\{\{/i,
				sub: [{
					name: 'Marcando',
					find: '',
					replace: '',
					num: 1,
					sub: [{
						name: 'Marca Portal3',
						find: /\{\{Portal3/i,
						replace: '┬',
						num: 1
					}, {
						name: 'Marca cat1',
						find: /\n\[\[Categoria:/i,
						replace: '\n┤',
						num: 1
					}, {
						name: 'Marca Defaultsort',
						find: /\{\{DEFAULTSORT:/,
						replace: '├',
						num: 10
					}, {
						name: 'Marca correlatos',
						find: /\{\{(Commons(?:cat)?|Wiki?(?:cionário|livros|notícias|quote|species|versity))\|/i,
						replace: '{{┼$1|',
						num: 10
					}]
				}, {
					name: 'Ordenando',
					find: '',
					replace: '',
					num: 1,
					sub: [{
						name: 'predef man x Portal',
						find: /\n\{\{(Artigo destacado|Seminterwiki)(.*)\}\}(\r?\n)*([^┬╔╗]*)(┬.*\}\})/i,
						replace: '\n$4$5\n\n{{$1$2}}',
						num: 10
					}, {
						name: 'Esboço x Portal/Default/Cat',
						find: /\n(\{\{(?:Esboço|Mínimo)(?:.*)\}\})\r?\n([^╔╗┬├┤]*)([┬├┤].*[}\]])/i,
						replace: '\n$2$1\n$3',
						num: 10
					}, {
						name: 'Portal x Ref-section/Esboço',
						find: /\n(┬.*\}\})([^░]*)(\{\{(?:Referências|Esboço|Mínimo).*\}\})/i,
						replace: '\n$3\n$1$2',
						num: 10
					}, {
						name: 'Cat x predef man',
						find: /([├┤].*\r?\n[^░╔╗]*)(\{\{(?:Esboço|Mínimo)(?:.*)\}\})/i,
						replace: '$2\n$1',
						num: 10
					}, {
						name: 'Correlatos x LE',
						find: /(= Ligações externas =+\r?\n)([^┼░]*)\r?\n(\{\{┼[^{}\n]*\}\})\r?\n/,
						replace: '$1$3\n$2\n',
						num: 10
					}, {
						name: 'Sem iw',
						find: /(\{\{Seminterwiki\|.*\}\})\r?\n([^░]*)░/i,
						replace: '\n$2\n$1\n░',
						num: 1
					}]
				}, {
					name: 'Desmarca',
					find: '',
					replace: '',
					num: 1,
					sub: [{
						name: 'Desmarca Portal3',
						find: '┬',
						replace: '{{Portal3',
						num: 1
					}, {
						name: 'Desmarca Defaultsort',
						find: '├',
						replace: '{{DEFAULTSORT:',
						num: 1
					}, {
						name: 'Desmarca cat1',
						find: '┤',
						replace: '[[Categoria:',
						num: 1
					}, {
						name: 'Desmarca vários',
						find: '┼',
						replace: '',
						num: 10
					}]
				}]
			}]
		}, {
			name: 'Caracteres individuais',
			find: '',
			replace: '',
			num: 1,
			ifnot: /(<(blockquote|code|math|timeline|pre|poem|nowiki|quote|source)>|\{\{Citação)/i,
			sub: [{
				/* *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
Segundo [[Unicode]] há +100.000 códigos.
A espera de uma idéia melhor para fazer isso.
Aqui ficarão apenas os unicodes principais, que cobrirão quase todos os casos.
Unicodes raramente usados devem ser consertados manualmente.
*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-* */
				name: 'Unicode',
				find: '',
				replace: '',
				num: 1,
				ifhas: '&amp;',
				sub: [{
					name: '&amp;letra',
					find: '',
					replace: '',
					num: 1,
					ifhas: /&amp;[a-z]/i,
					sub: [{
						name: '&amp;agrave;',
						find: /&amp;agrave;/i,
						replace: 'à',
						num: 1
					}, {
						name: '&amp;auml;',
						find: /&amp;auml;/i,
						replace: 'ä',
						num: 1
					}, {
						name: '&amp;bull;',
						find: /&amp;bull;/i,
						replace: '•',
						num: 1
					}, {
						name: '&amp;ccedil;',
						find: /&amp;ccedil;/i,
						replace: 'ç',
						num: 1
					}, {
						name: '&amp;copy;',
						find: /&amp;copy;/i,
						replace: '©',
						num: 1
					}, {
						name: '&amp;dagger;',
						find: /&amp;dagger;/i,
						replace: '†',
						num: 1
					}, {
						name: '&amp;ETH;',
						find: /&amp;ETH;/i,
						replace: 'Ð',
						num: 1
					}, {
						name: '&amp;gamma;',
						find: /&amp;gamma;/i,
						replace: 'γ',
						num: 1
					}, {
						name: '&amp;hellip;',
						find: /&amp;hellip;/i,
						replace: '…',
						num: 1
					}, {
						name: '&amp;lsquo;',
						find: /&amp;lsquo;/i,
						replace: '‘',
						num: 1
					}, {
						name: '&amp;mdash;',
						find: /&amp;mdash;/i,
						replace: '—',
						num: 1
					}, {
						name: '&amp;middot;',
						find: /&amp;middot;/i,
						replace: '·',
						num: 1
					}, {
						name: '&amp;minus;',
						find: /&amp;minus;/i,
						replace: '−',
						num: 1
					}, {
						name: '&amp;ndash;',
						find: /&amp;ndash;/i,
						replace: '–',
						num: 1
					}, {
						name: '&amp;otilde;',
						find: /&amp;otilde;/i,
						replace: 'õ',
						num: 1
					}, {
						name: '&amp;ouml;',
						find: /&amp;ouml;/i,
						replace: 'ö',
						num: 1
					}, {
						name: '&amp;quot;',
						find: /&amp;quot;/i,
						replace: '"',
						num: 1
					}, {
						name: '&amp;rarr;',
						find: /&amp;rarr;/i,
						replace: '→',
						num: 1
					}, {
						name: '&amp;reg;',
						find: /&amp;reg;/i,
						replace: '®',
						num: 1
					}, {
						name: '&amp;szlig;',
						find: /&amp;szlig;/i,
						replace: 'ß',
						num: 1
					}, {
						name: '&amp;trade',
						find: /&amp;trade;/i,
						replace: '™',
						num: 1
					}, {
						name: '&amp;THORN;',
						find: /&amp;THORN;/i,
						replace: 'Þ',
						num: 1
					}, {
						name: '&amp;uuml;',
						find: '&amp;uuml;',
						replace: 'ü',
						num: 1
					}]
				}, {
					name: '&amp;#',
					find: '',
					replace: '',
					num: 1,
					ifhas: '&amp;#', // FIXME: /&amp;#/i ?
					sub: [{
						name: '&amp;#257;',
						find: '&amp;#257;',
						replace: 'ā',
						num: 1
					}, {
						name: '&amp;#265;',
						find: '&amp;#265;',
						replace: 'ĉ',
						num: 1
					}, {
						name: '&amp;#269;',
						find: '&amp;#269;',
						replace: 'č',
						num: 1
					}, {
						name: '&amp;#285;',
						find: '&amp;#285;',
						replace: 'ĝ',
						num: 1
					}, {
						name: '&amp;#293;',
						find: '&amp;#293;',
						replace: 'ĥ',
						num: 1
					}, {
						name: '&amp;#306;',
						find: '&amp;#306;',
						replace: 'Ĳ',
						num: 1
					}, {
						name: '&amp;#309;',
						find: '&amp;#309;',
						replace: 'ĵ',
						num: 1
					}, {
						name: '&amp;#349;',
						find: '&amp;#349;',
						replace: 'ŝ',
						num: 1
					}, {
						name: '&amp;#365;',
						find: '&amp;#365;',
						replace: 'ŭ',
						num: 1
					}, {
						name: '&amp;#383;',
						find: '&amp;#383;',
						replace: 'ſ',
						num: 1
					}, {
						name: '&amp;#39;',
						find: '&amp;#39;',
						replace: '\'',
						num: 1
					}]
				}]
			}, {
				name: 'Arrow',
				find: '',
				replace: '',
				num: 1,
				sub: [{
					name: 'Arrow ==>',
					find: /\=+\=\>/i,
					replace: '⇒',
					num: 100
				}, {
					name: 'Arrow <==',
					find: /<\=\=+/i,
					replace: '⇐',
					num: 100
				}, {
					name: 'Arrow -->',
					find: /([▓╗][^╔╗░]*)╗/i,
					replace: '$1→',
					num: 100
				}, {
					name: 'Arrow <--',
					find: /<\-+([^\-])/i,
					replace: '←$1',
					num: 100
				}, {
					name: 'Arrow ->',
					find: /([^\-])\-\>+/i,
					replace: '$1→',
					num: 100
				}, {
					name: 'Arrow —>',
					find: /([^\—])\—>+/i,
					replace: '$1→',
					num: 1
				}, {
					name: 'Seta com > dupla',
					find: /([↔→])>([^>])/i,
					replace: '$1$2',
					num: 1
				}, {
					name: 'Arrow com - excesso 1',
					find: /([^\-])\-+→/i,
					replace: '$1→',
					num: 1
				}, {
					name: 'Arrow com - excesso 2',
					find: /←\-+([^\-])/i,
					replace: '←$1',
					num: 1
				}, {
					name: 'Arrow <==>',
					find: /(⇐\=*>|<\=*⇒)/,
					replace: '⇐⇒',
					num: 10
				}, {
					name: 'Arrow <-->',
					find: /(←\-*\>|<\-*→)/i,
					replace: '↔',
					num: 10
				}]
			}, {
				name: 'Unicode 1',
				find: '&lt;sup&gt;1&lt;/sup&gt;',
				replace: '¹',
				num: 100
			}, {
				name: 'Unicode 2',
				find: '&lt;sup&gt;2&lt;/sup&gt;',
				replace: '²',
				num: 100
			}, {
				name: 'Unicode 4',
				find: '&amp;sup2;',
				replace: '²',
				num: 100
			}]
		}, {
			name: 'Predef duplicada',
			find: /(\{\{([^\{\}\n]+)\}\})(?:\r?\n)+\{\{\2\}\}\r?\n/i,
			replace: '$1\n',
			num: 1
		}]
	}, {
		name: 'Trimming 2',
		find: '',
		replace: '',
		num: 1,
		sub: [{
			name: 'Triming h- final',
			find: '',
			replace: '',
			num: 1,
			sub: [{
				name: 'espaço antes \n',
				find: /([^ ]) +\r?\n/,
				replace: '$1\n',
				num: 10
			}, {
				name: 'Rule',
				find: /(\r?\n){3,}/i,
				replace: '\n\n',
				num: 10
			}]
		}, {
			name: 'Triming v- final',
			find: '',
			replace: '',
			num: 1,
			sub: [{
				name: 'Quebra dupla antes predef man inf',
				find: /\{\{(Artigo destacado|Esboço|Mínimo|Reciclagem|Semfichatécnica|Seminterwiki|Sem imagem)(.*)\}\}\n\n+\{\{(Artigo destacado|Esboço|Mínimo|Reciclagem|Semfichatécnica|Seminterwiki|Sem imagem)(.*)\}\}/i,
				replace: '{{$1$2}}\n{{$3$4}}',
				num: 10
			}, {
				name: 'trim v- antes predef',
				find: /([^\r\n])(?:\r?\n){3,}\{\{/i,
				replace: '$1\n\n{{',
				num: 10
			}, {
				name: 'trim v- antes seção 1',
				find: /([^\r\n])(?:\r?\n *){1,}(╩)/i,
				replace: '$1\n$2',
				num: 1
			}, {
				name: 'trim v- antes seção',
				find: /([^ \r\n])(?:\r?\n *){3,}(║)/i,
				replace: '$1\n\n$2',
				num: 10
			}, {
				name: 'trim v- após defaultsort',
				find: /(\{\{DEFAULTSORT:.*\}\})\r?\n\r?\n/i,
				replace: '$1\n',
				num: 10
			}, {
				name: 'trim v- antes cat 1',
				find: /(\{\{DEFAULTSORT:.*\}\})(?:\r?\n){2,}(\[\[Categoria:)/i,
				replace: '$1\n$2',
				num: 10
			}, {
				name: 'trim v- antes cat 2',
				find: /([^\r\n])(?:\r?\n){3,}(\[\[Categoria:)/i,
				replace: '$1\n$2',
				num: 10
			}, {
				name: 'trim v- antes par1',
				find: /\r?\n\r?\n╚/i,
				replace: '\n╚',
				num: 1
			}, {
				name: 'trim v- \n+',
				find: /(\r?\n){3,}/i,
				replace: '\n\n',
				num: 100
			}]
		}, {
			name: 'Triming v+ final',
			find: '',
			replace: '',
			num: 1,
			sub: [{
				name: 'Rule',
				find: /([^\r\n])\r?\n(\{\{DEFAULTSORT)/,
				replace: '$1\n\n$2',
				num: 1
			}, {
				name: 'Rule',
				find: /([^\r\n])(\[\[Categoria\:)/i,
				replace: '$1\n$2',
				num: 10
			}, {
				name: 'Rule',
				find: /([^\]\r\n])(?:\r?\n)\[\[Categoria\:/i,
				replace: '$1\n\n[[Categoria:',
				num: 10
			}, {
				name: 'Rule',
				find: /(\{\{DEFAULTSORT:[^{}\n]+\}\})(?:\r?\n){2,}(\[\[Categoria:)/i,
				replace: '$1\n$2',
				num: 1
			}]
		}]
	}, {
		name: 'Temáticos',
		find: '',
		replace: '',
		num: 1,
		ifnot: /▓(Wikipedia|Ficheiro|MediaWiki|Predefinição|Ajuda|Categoria|Portal)( Discussão)?:/i,
		sub: [{
			name: 'Seções',
			find: '',
			replace: '',
			num: 1,
			sub: [{
				name: 'Breve Histórico',
				find: '= Breve Histórico =',
				replace: '= Breve histórico =',
				num: 1
			}, {
				name: 'Em Operação',
				find: '= Em Operação =',
				replace: '= Em operação =',
				num: 1
			}, {
				name: 'Contexto Histórico',
				find: /\= Contexto Histórico =/,
				replace: '= Contexto histórico =',
				num: 1
			}]
		}, {
			name: 'Biografias',
			find: '',
			replace: '',
			num: 1,
			ifhas: /\{\{Portal3.*\|Biografias/i,
			sub: [{
				name: '-{{biografias}}',
				find: /\{\{biografias\}\}\r?\n/i,
				replace: '',
				num: 1
			}, {
				name: 'Maiusculite',
				find: '',
				replace: '',
				num: 1,
				sub: [{
					name: 'Carreira Política',
					find: 'Carreira Política',
					replace: 'Carreira política',
					num: 1
				}]
			}, {
				name: 'Ajuste {{Info}}',
				find: '',
				replace: '',
				num: 1,
				ifhas: '{{Info/',
				sub: [{
					name: 'Minúscula nos campos de infobox',
					find: '',
					replace: '',
					num: 1,
					sub: [{
						name: 'Rule',
						find: /(\{\{ *Info\/[^╣]*\n *\| *)(Símbolo|Atribuições|Dependência[1-9]|Critérios|Imagem|Inscrição|Legenda|Localização|País|Preposição|Título)( *=)/,
						replace: '$1{{subst:lcfirst:$2}}$3',
						num: 100
					}]
				}, {
					name: 'padronizando campos',
					find: '',
					replace: '',
					num: 1,
					sub: [{
						name: 'Nome Completo',
						find: /(\{\{Info\/[^╣]*\| *)Nome Completo( *= *)/i,
						replace: '$1nome completo$2',
						num: 1
					}, {
						name: 'nome',
						find: /(\{\{Info\/[^╣]*\| *)nome do jogador( *= *)/i,
						replace: '$1nome$2',
						num: 1
					}, {
						name: 'local/data nascimento/morte',
						find: /(\{\{Info\/[^╣]*\| *)(data|local|cidade|país) ?(?:de|_) ?(nascimento|morte|falecimento|natal)( *= *)/i,
						replace: '$1$3_$2$4',
						num: 10
					}, {
						name: 'Rule',
						find: /(\{\{Info\/[^╣]*\| *)falecimento_data( *= *)/i,
						replace: '$1morte_data$2',
						num: 1
					}, {
						name: 'localidaden',
						find: /(\{\{Info\/[^╣]*\| *)localidaden( *= *)/i,
						replace: '$1nascimento_local$2',
						num: 1
					}, {
						name: 'localidadef',
						find: /(\{\{Info\/[^╣]*\| *)localidadef( *= *)/i,
						replace: '$1morte_local$2',
						num: 1
					}, {
						name: 'Rule',
						find: / \|Falecimento *= *!?\r?\n/i,
						replace: '',
						num: 1,
						ifhas: '{{Info/Enxadrista' // FIXME: /\{\{Info/Enxadrista/i ?
					}]
				}, {
					name: 'Espaço campos',
					find: '',
					replace: '',
					num: 1,
					ifhas: /| *nascimento_data=/i,
					sub: [{
						name: '{{Info/Político',
						find: '',
						replace: '',
						num: 1,
						ifhas: '{{Info/Político', // FIXME: /\{\{Info/Político/i ?
						sub: [{
							name: '2',
							find: /(\{\{Info\/[^╣]*\| *(nascimento_data)) *=/i,
							replace: '$1  =',
							num: 1
						}, {
							name: '6',
							find: /(\{\{Info\/[^╣]*\| *(morte_local)) *=/i,
							replace: '$1      =',
							num: 1
						}, {
							name: '7',
							find: /(\{\{Info\/[^╣]*\| *(morte_data)) *=/i,
							replace: '$1       =',
							num: 1
						}, {
							name: '8',
							find: /(\{\{Info\/[^╣]*\| *(profissão)) *=/i,
							replace: '$1        =',
							num: 1
						}, {
							name: '9',
							find: /(\{\{Info\/[^╣]*\| *(ministro|mandato2)) *=/i,
							replace: '$1         =',
							num: 1
						}, {
							name: '10',
							find: /(\{\{Info\/[^╣]*\| *(mandato|partido|título2)) *=/i,
							replace: '$1          =',
							num: 1
						}, {
							name: '11',
							find: /(\{\{Info\/[^╣]*\| *(depois|título|imagem)) *=/i,
							replace: '$1           =',
							num: 1
						}, {
							name: '12',
							find: /(\{\{Info\/[^╣]*\| *(antes)) *=/i,
							replace: '$1            =',
							num: 1
						}, {
							name: '13',
							find: /(\{\{Info\/[^╣]*\| *(nome)) *=/i,
							replace: '$1             =',
							num: 1
						}]
					}, {
						name: '{{Info/Enxadrista',
						find: '',
						replace: '',
						num: 1,
						ifhas: '{{Info/Enxadrista', // FIXME: /\{\{Info/Enxadrista/i ?
						sub: [{
							name: '1',
							find: /(\{\{Info\/[^╣]*\| *(nascimento_local)) *=/i,
							replace: '$1 =',
							num: 1
						}, {
							name: '2',
							find: /(\{\{Info\/[^╣]*\| *(nascimento_data)) *=/i,
							replace: '$1  =',
							num: 1
						}, {
							name: '3',
							find: /(\{\{Info\/[^╣]*\| *(imagem_legenda)) *=/i,
							replace: '$1   =',
							num: 1
						}, {
							name: '4',
							find: /(\{\{Info\/[^╣]*\| *(nome completo)) *=/i,
							replace: '$1    =',
							num: 1
						}, {
							name: '6',
							find: /(\{\{Info\/[^╣]*\| *(morte_local)) *=/i,
							replace: '$1      =',
							num: 1
						}, {
							name: '7',
							find: /(\{\{Info\/[^╣]*\| *(morte_data)) *=/i,
							replace: '$1       =',
							num: 1
						}, {
							name: 'conquista1',
							find: /(\{\{Info\/[^╣]*\| *(conquista1)) *=/i,
							replace: '$1       =',
							num: 1
						}, {
							name: 'conquista2',
							find: /(\{\{Info\/[^╣]*\| *(conquista2)) *=/i,
							replace: '$1       =',
							num: 1
						}, {
							name: 'conquista3',
							find: /(\{\{Info\/[^╣]*\| *(conquista3)) *=/i,
							replace: '$1       =',
							num: 1
						}, {
							name: '11',
							find: /(\{\{Info\/[^╣]*\| *(imagem)) *=/i,
							replace: '$1           =',
							num: 1
						}, {
							name: 'nome',
							find: /(\{\{Info\/[^╣]*\| *(nome)) *=/i,
							replace: '$1             =',
							num: 4
						}, {
							name: 'país',
							find: /(\{\{Info\/[^╣]*\| *(país)) *=/i,
							replace: '$1             =',
							num: 1
						}]
					}]
				}]
			}, {
				name: '{{Sem infocaixa}}',
				find: /╦/i,
				replace: '╦\n{{sem infocaixa|Biografia}}',
				num: 1,
				ifnot: /(\{\{Sem infocaixa|\{\{Info\/)/i
			}, {
				name: '{{Sem infocaixa}} +',
				find: '',
				replace: '',
				num: 1,
				ifnot: '{{Info/',
				sub: [{
					name: '{{sem infocaixa|Santos}}',
					find: /\{\{sem infocaixa\|Biografia\}\}/i,
					replace: '{{sem infocaixa|Santos}}',
					num: 1,
					ifhas: /\[\[Categoria:(Beatos|Santos)[ \|\]]/i
				}, {
					name: '{{sem infocaixa|Jornalista}}',
					find: /\{\{sem infocaixa\|Biografia\}\}/,
					replace: '{{sem infocaixa|Jornalista}}',
					num: 1,
					ifhas: /\[\[Categoria:(Jornalistas)[ \|\]]/i
				}]
			}, {
				name: '+ Info',
				find: '',
				replace: '',
				num: 1,
				ifnot: /\{\{Info\//i,
				sub: [{
					name: '+ Info/Santos',
					find: /(\{\{sem infocaixa\|Santos)(\}\}\r?\n[^╠╚]*)(╠[^▒\n]+▒\]\])?([^╚]*╚)/i,
					replace: '$1|parcial$2{{Info/Santos\n' + ' |nome               = %%title%%\n' + ' |imagem             = $3\n' + ' |imagem_tamanho     =\n' + ' |imagem_legenda     =\n' + ' |nascimento_data    =\n' + ' |nascimento_local   =\n' + ' |morte_data         =\n' + ' |morte_local        =\n' + ' |dia_consagrado     =\n' + ' |St_venerado_pela   =\n' + ' |títulos            =\n' + ' |data_beatificação  =\n' + ' |local_beatificação =\n' + ' |beatificado_por    =\n' + ' |data_canonização   =\n' + ' |local_canonização  =\n' + ' |canonizado_por     =\n' + ' |atribuições        =\n' + ' |patrono            =\n' + ' |patrona            =\n' + ' |principal_templo   =\n' + ' |data_supressão     =\n' + ' |polêmicas          =\n' + ' |passagem           =\n' + ' |autor_passagem     =\n' + '╣}}\n$4',
					num: 1,
					ifnot: '{{Info/'
				}, {
					name: '+ Info/Jornalista',
					find: /(\{\{sem infocaixa\|Jornalista)(\}\}\r?\n[^╠╚]*)(╠[^▒\n]+▒\]\])?([^╚]*╚)/i,
					replace: '$1|parcial$2{{Info/Jornalista\n' + ' |nome             = %%title%%\n' + ' |imagem           = $3\n' + ' |imagem_tamanho   =\n' + ' |imagem_legenda   =\n' + ' |nome_nascimento  =\n' + ' |nascimento_data  =\n' + ' |nascimento_local =\n' + ' |morte_data       =\n' + ' |morte_local      =\n' + ' |educação         =\n' + ' |ocupação         =\n' + ' |outros_nomes     =\n' + ' |título           =\n' + ' |parentesco       =\n' + ' |cônjuge          =\n' + ' |parceiro         =\n' + ' |filhos           =\n' + ' |etnia            =\n' + ' |nacionalidade    =\n' + ' |religião         =\n' + ' |atividade        = &lt;!-- ano – presente --&gt;' + ' |trabalhos        =\n' + ' |agente           =\n' + ' |site             =\n' + '╣}}\n$4',
					num: 1,
					ifnot: '{{Info/'
				}, {
					name: '+ Info/Biografia',
					find: /(\{\{sem infocaixa\|Biografia)(\}\}\r?\n[^╠╚]*)(╠[^▒\n]+▒\]\])?([^╚]*╚)/i,
					replace: '$1|parcial$2{{Info/Biografia\n' + ' |nome                  = %%title%%\n' + ' |imagem                = $3\n' + ' |imagem_tamanho        =\n' + ' |imagem_legenda        =\n' + ' |nome_completo         =\n' + ' |nascimento_data       =\n' + ' |nascimento_local      =\n' + ' |morte_data            =\n' + ' |morte_local           =\n' + ' |residência            =\n' + ' |nacionalidade         =\n' + ' |ocupação              =\n' + ' |influências           =\n' + ' |influenciados         =\n' + ' |prémios               =\n' + ' |principais_trabalhos  =\n' + ' |website               =\n' + '╣}}\n$4',
					num: 1,
					ifnot: '{{Info/'
				}]
			}]
		}, {
			name: 'Arte',
			find: '',
			replace: '',
			num: 1,
			ifhas: /\{\{Portal3.*\|(Arte|Animangá|Banda desenhada|Cinema|Games|Livros|Literatura|Música|Pintura|Televisão)/i,
			sub: [{
				name: '(coadjuvante/secundária)',
				find: '(coadjuvante/secundária)',
				replace: 'coadjuvante',
				num: 1
			}, {
				name: '{{Allmusic}}',
				find: /\{\{link\|(?: *1?=? *[a-z]{2,2})?\|? *2?= *?http:\/\/allmusic\.com\/cg\/amg\.dll\?p=amg\&amp;sql\=([^\|\}\n]+)\/? *\| *3?=? *([^\|\}\n]*)(?: *(?:\| *4?=?|\}\}) *no \[?\[?Allmusic\]?\]?)?(?:\}\}\r?\n|\r?\n)/i,
				replace: '{{Allmusic|$1|$2}}\n',
				num: 1
			}, {
				name: '({{Imdb',
				find: '',
				replace: '',
				num: 1,
				ifhas: /(www\.imdb\.com|\{\{imdb)/i,
				sub: [{
					name: '{{imdb nome}}',
					find: /\{\{link\|(?: *1?=? *[a-z]{2,2})?\|? *2?=? *http:\/\/www\.imdb\.com\/name\/nm([0-9]+)\/ *\| *3?=? *([^\|\}\n]*)(?: *(?:\| *4?=?|\}\}) *4?=? *no \[?\[?Internet Movie Database\]?\]?)?(?:\}\}\r?\n|\r?\n)/i,
					replace: '{{Imdb nome|$1|$2}}\n',
					num: 1
				}, {
					name: '{{Imdb título}}',
					find: /\{\{link\|(?: *1?=? *[a-z]{2,2})?\|? *2?= *?http:\/\/www\.imdb\.com\/title\/tt([0-9]+)\/ *\| *3?=? *([^\|\}\n]*)(?: *(?:\| *4?=?|\}\}) *4?=? *no \[?\[?Internet Movie Database\]?\]?)?(?:\}\}\r?\n|\r?\n)/i,
					replace: '{{Imdb título|$1|$2}}\n',
					num: 1
				}, {
					name: '({{Imdb|xxx no imdb}}',
					find: /(\{\{Imdb[^\{\}\n]*) no imdb *\}\}/i,
					replace: '$1}}',
					num: 1
				}, {
					name: '({{Imdb|\'\'\'xxx\'\'\'}}',
					find: /(\{\{Imdb[^\{\}\n]*[^\'])'+([^\'][^\{\}\n]*\})/i,
					replace: '$1$2',
					num: 2
				}]
			}, {
				name: 'Recat',
				find: '',
				replace: '',
				num: 1,
				sub: [{
					name: 'Atrizes',
					find: /\[\[Categoria:Atrizes([\|\]])/i,
					replace: '[[Categoria:Atores$1',
					num: 1
				}, {
					name: 'Atrizes premiadas',
					find: /\[\[Categoria:Atrizes premiadas([\|\]])/i,
					replace: '[[Categoria:Atores premiados$1',
					num: 1
				}]
			}, {
				name: 'Maiusculite',
				find: '',
				replace: '',
				num: 1,
				ifhas: /\==/i,
				sub: [{
					name: 'Personagens e elenco',
					find: '',
					replace: '',
					num: 1,
					sub: [{
						name: 'Participação Especial',
						find: /Participaç(ões|ão) Especia(is|l)/,
						replace: 'Participaç$1 especia$2',
						num: 1
					}, {
						name: 'Secundários',
						find: /(== )Personagens Secundários( ==)/,
						replace: '$1Personagens secundários$2',
						num: 1
					}, {
						name: 'Elenco principal',
						find: /(== )Elenco Principal( ==)/,
						replace: '$1Elenco principal$2',
						num: 10
					}, {
						name: 'Personagens Menores',
						find: /([^a-z])Personagens Menores([^a-z])/,
						replace: '$1Personagens menores$2',
						num: 1
					}, {
						name: 'Personagens Principais',
						find: /([^a-z]Personage(?:ns|m) )Principa((?:is|l)[^a-z])/i,
						replace: '$1principa$2',
						num: 1
					}]
				}, {
					name: 'Música',
					find: '',
					replace: '',
					num: 1,
					sub: [{
						name: 'Trilha sonora',
						find: /(== Trilhas? )S(onoras? ==)/,
						replace: '$1s$2',
						num: 10
					}, {
						name: 'Temas de Abertura',
						find: /([^a-z]Temas? de )Abertura([^a-z])/,
						replace: '$1abertura$2',
						num: 1
					}, {
						name: 'Temas de Encerramento',
						find: /([^a-z]Temas? de )Encerramento([^a-z])/,
						replace: '$1encerramento$2',
						num: 1
					}]
				}, {
					name: 'Ficha técnica',
					find: /(== )Ficha Técnica( ==)/,
					replace: '$1Ficha técnica$2',
					num: 10
				}, {
					name: 'Série',
					find: /([^=]) Série ==/,
					replace: '$1 série ==',
					num: 10
				}, {
					name: 'Recorrentes',
					find: /(== )Temas Recorrentes( ==)/,
					replace: '$1Temas recorrentes$2',
					num: 10
				}, {
					name: 'os Capítulos',
					find: /([^=]) C(apítulos? ==)/,
					replace: '$1 c$2',
					num: 1
				}, {
					name: 'o Personagem',
					find: /([^=]) Personagem ==\r?\n/,
					replace: '$1 personagem ==\n',
					num: 1
				}, {
					name: '= Poderes e Habilidades =',
					find: /([^=]) Habilidades =/,
					replace: '$1 habilidades =',
					num: 1
				}]
			}, {
				name: 'Seções',
				find: '',
				replace: '',
				num: 1,
				sub: [{
					name: '== Guia de episódios ==',
					find: '== Guia de episódios ==',
					replace: '== Episódios ==',
					num: 1
				}]
			}, {
				name: 'Introdução',
				find: '',
				replace: '',
				num: 1,
				sub: [{
					name: 'é um personagem',
					find: /(╚[^╝]*é um) personagem/,
					replace: '$1 [[personagem]]',
					num: 1,
					ifhas: '╚.*╝'
				}, {
					name: '[[personagem]] ficcional',
					find: '[[personagem]] ficcional',
					replace: '[[personagem]] fictício',
					num: 1
				}]
			}, {
				name: 'Jogos eletrônicos',
				find: '',
				replace: '',
				num: 1,
				ifhas: /(\{\{Portal3.*\|(Games)[\|\}])/i,
				sub: [{
					name: 'Game upgrades',
					find: 'Game Upgrades',
					replace: 'Game upgrades',
					num: 100
				}, {
					name: 'Introdução jogo',
					find: '',
					replace: '',
					num: 1,
					sub: [{
						name: '[[jogo eletrônico]]',
						find: /(╚[^╝\.]*)é (um|o)(a série de)? jogo(s)?(?: eletrônicos?)? /i,
						replace: '$1é $2$3 [[jogo$4 eletrônico$3]] ',
						num: 1,
						ifhas: '╝'
					}, {
						name: 'gêneros',
						find: '',
						replace: '',
						num: 1,
						sub: [{
							name: '[[gêneros de jogos eletrônicos]]',
							find: /(╚[^╝]*jogo[^╝]*[^\[])gênero([^\]])/,
							replace: '$1[[gêneros de jogos eletrônicos|gênero]]$2',
							num: 1
						}, {
							name: '[[jogo eletrônico de ação]]',
							find: /(\[\[jogos? eletrônicos?\]\] de )ação/,
							replace: '$1[[jogo eletrônico de ação|ação]]',
							num: 100
						}, {
							name: '[[jogo eletrônico de esporte]]',
							find: /\[\[jogo eletrônico\]\] de (\[\[)?(snowboard)/,
							replace: '[[jogo eletrônico de esporte|jogo eletrônico]] de $1$2',
							num: 100
						}, {
							name: '[[Jogo eletrônico de simulação]]',
							find: /(\[\[jogos? eletrônicos?\]\] de )(simulação)/,
							replace: '$1[[jogo eletrônico de simulação|simulação]]',
							num: 100
						}, {
							name: '[[jogo de corrida]]',
							find: /(\[\[jogos? eletrônicos?\]\] de )(corrida)/,
							replace: '$1[[jogo de corrida|corrida]]',
							num: 100
						}]
					}]
				}, {
					name: 'Seções',
					find: '',
					replace: '',
					num: 1,
					sub: [{
						name: 'Rule',
						find: '== [[Jogabilidade]] ==',
						replace: '== Jogabilidade ==',
						num: 10
					}]
				}, {
					name: 'Desambig',
					find: '',
					replace: '',
					num: 1,
					sub: [{
						name: '|gênero=',
						find: '',
						replace: '',
						num: 1,
						ifhas: /\| *g[eêé]nero *= *[^ \r\n]/i,
						sub: [{
							name: '[[Jogo eletrônico de ação]]',
							find: /(\| *g[eêé]nero *=.*)\[\[Ação\]\]/i,
							replace: '$1[[Jogo eletrônico de ação|Ação]]',
							num: 1
						}, {
							name: '[[RPG eletrônico]]',
							find: /(\| *g[eêé]nero *=.*)\[\[RPG\]\]/i,
							replace: '$1[[RPG eletrônico|RPG]]',
							num: 1
						}]
					}, {
						name: '[[PS2]]',
						find: /(\| *plataforma *= *.*)\[\[PS([23])\]\]/,
						replace: '$1[[PlayStation $2|PS$2]]',
						num: 1
					}, {
						name: '[[PC]]',
						find: /\[\[PC\]\]/i,
						replace: '[[Computador pessoal|PC]]',
						num: 1
					}, {
						name: '[[GPU]]',
						find: '[[GPU]]',
						replace: '[[Unidade de processamento gráfico|GPU]]',
						num: 100
					}, {
						name: '[[RAM]]',
						find: '[[RAM]]',
						replace: '[[Memória RAM|RAM]]',
						num: 100
					}, {
						name: '[[Ladino (RPG)]]',
						find: /\[\[([Ll])adino\]\]/,
						replace: '[[Ladino (RPG)|$1adino]]',
						num: 100
					}]
				}, {
					name: 'Links',
					find: /\* '''(PlayStation|PlayStation [23]|Xbox|GameCube|Game Boy Advance):?''':?\r?\n/i,
					replace: '* \'\'\'[[$1]]\'\'\'\n',
					num: 100
				}]
			}, {
				name: 'Filmes',
				find: '',
				replace: '',
				num: 1,
				ifhas: /(\{\{Portal3.*\|(Cinema)[\|\}])/i,
				sub: [{
					name: 'Introdução filme',
					find: /(╚[^╝]*)é um filme/,
					replace: '$1é um [[filme]]',
					num: 1,
					ifhas: '╝'
				}]
			}, {
				name: 'Música',
				find: '',
				replace: '',
				num: 1,
				ifhas: /(\{\{Portal3.*\|(Música)[\|\}])/i,
				sub: [{
					name: 'Padronizando infobox',
					find: '',
					replace: '',
					num: 1,
					sub: [{
						name: 'Rule',
						find: /(\{\{Info\/música\/artista[^╣]*\| *)Nome Completo/i,
						replace: '$1nome completo',
						num: 1
					}, {
						name: 'Rule',
						find: /(\{\{Info\/música\/artista[^╣]*\| *)legenda/i,
						replace: '$1imagem_legenda',
						num: 1
					}, {
						name: 'Rule',
						find: /(\{\{Info\/música\/artista[^╣]*\| *imagem_legenda) {11}\}/i,
						replace: '$1    ',
						num: 1
					}, {
						name: '{{Info/Single',
						find: '',
						replace: '',
						num: 1,
						ifhas: '{{Info/Single', // FIXME: /\{\{Info/Single/i ?
						sub: [{
							name: 'legenda',
							find: /(\{\{Info\/Single[^╣]*\| *)legenda( *=)/i,
							replace: '$1imagem_legenda$2',
							num: 1
						}, {
							name: 'minúsculas',
							find: '',
							replace: '',
							num: 1,
							ifhas: /(\{\{Info\/Single[^╣]*\| *)Nome( *=)/,
							sub: [{
								name: 'A',
								find: /(\{\{Info\/Single[^╣]*\| *)Artista( *=)/,
								replace: '$1artista$2',
								num: 10
							}, {
								name: 'Á',
								find: /(\{\{Info\/Single[^╣]*\| *)Álbum( *=)/,
								replace: '$1álbum$2',
								num: 1
							}, {
								name: 'D',
								find: /(\{\{Info\/Single[^╣]*\| *)D(iretor|uração)( *=)/,
								replace: '$1d$2$3',
								num: 10
							}, {
								name: 'C',
								find: /(\{\{Info\/Single[^╣]*\| *)C(apa|ompositor|ertificação|r[ií]tica)( *=)/,
								replace: '$1c$2$3',
								num: 10
							}, {
								name: 'D',
								find: /(\{\{Info\/Single[^╣]*\| *)D(irector|uração_vídeo)( *=)/,
								replace: '$1d$2$3',
								num: 10
							}, {
								name: 'E',
								find: /(\{\{Info\/Single[^╣]*\| *)E(ste single)( *=)/,
								replace: '$1e$2$3',
								num: 10
							}, {
								name: 'F',
								find: /(\{\{Info\/Single[^╣]*\| *)Formato( *=)/,
								replace: '$1formato$2',
								num: 1
							}, {
								name: 'G',
								find: /(\{\{Info\/Single[^╣]*\| *)G(ravado|ênero|ravadora|ravado_vídeo)( *=)/,
								replace: '$1g$2$3',
								num: 10
							}, {
								name: 'I',
								find: /(\{\{Info\/Single[^╣]*\| *)I(magem|magem_tamanho)( *=)/,
								replace: '$1i$2$3',
								num: 10
							}, {
								name: 'L',
								find: /(\{\{Info\/Single[^╣]*\| *)L(ançado|etrista|ançado_vídeo|ado\-B)( *=)/,
								replace: '$1l$2$3',
								num: 10
							}, {
								name: 'M',
								find: /(\{\{Info\/Single[^╣]*\| *)Miscelâneo( *=)/,
								replace: '$1miscelâneo$2',
								num: 1
							}, {
								name: 'N',
								find: /(\{\{Info\/Single[^╣]*\| *)Nome( *=)/,
								replace: '$1nome$2',
								num: 1
							}, {
								name: 'O',
								find: /(\{\{Info\/Single[^╣]*\| *)Orçamento( *=)/,
								replace: '$1orçamento$2',
								num: 1
							}, {
								name: 'P',
								find: /(\{\{Info\/Single[^╣]*\| *)P(rodutor|róximo single)( *=)/,
								replace: '$1p$2$3',
								num: 10
							}, {
								name: 'T',
								find: /(\{\{Info\/Single[^╣]*\| *)T(ipo)( *=)/,
								replace: '$1t$2$3',
								num: 10
							}, {
								name: 'Ú',
								find: /(\{\{Info\/Single[^╣]*\| *)Ú(ltimo single)( *=)/,
								replace: '$1ú$2$3',
								num: 10
							}]
						}]
					}]
				}, {
					name: 'Recat',
					find: '',
					replace: '',
					num: 1,
					sub: [{
						name: '!Artigos mínimos sobre Música',
						find: /\{\{mínimo sobre\|Música\}\}/i,
						replace: '{{mínimo sobre|música}}',
						num: 1
					}]
				}, {
					name: 'Introdução',
					find: '',
					replace: '',
					num: 1,
					sub: [{
						name: 'Intro banda',
						find: /(╚[^╝]*é (?:um|o) (?:[^ ]* )?(?:do )?)banda/,
						replace: '$1[[banda musical|banda]]',
						num: 1,
						ifhas: '╝'
					}, {
						name: 'intro álbum',
						find: /(╚[^╝]*é (?:um|o) (?:[^ ]* )?(?:do )?)álbum/,
						replace: '$1[[álbum]]',
						num: 1
					}, {
						name: 'Intro canção',
						find: /(╚[^╝]*é (?:uma|a) (?:[^ ]* )?(?:do )?)canção/,
						replace: '$1[[canção]]',
						num: 1
					}, {
						name: 'Intro composição',
						find: /(╚[^╝]*é (?:uma|a) (?:[^ ]* )?(?:do )?)composição/,
						replace: '$1[[composição musical|composição]]',
						num: 1
					}]
				}, {
					name: 'Seções',
					find: '',
					replace: '',
					num: 1,
					sub: [{
						name: 'Rule',
						find: /([^=]) Paradas ==/,
						replace: '$1 paradas ==',
						num: 1
					}]
				}, {
					name: 'Desambig',
					find: '',
					replace: '',
					num: 1,
					sub: [{
						name: '[[banda musical]]',
						find: /\[\[([Bb])anda\]\]/,
						replace: '[[$1anda musical|$1anda]]',
						num: 100
					}, {
						name: '[[Disco de vinil]]',
						find: /\[\[([Vv])inil\]\]/,
						replace: '[[Disco de vinil|$1inil]]',
						num: 100
					}, {
						name: '[[Extended play]]',
						find: /\[\[EP\]\]/,
						replace: '[[Extended play|EP]]',
						num: 100
					}, {
						name: '[[Instrumento musical]]',
						find: /\[\[([Ii])nstrumento\]\]/,
						replace: '[[$1nstrumento musical|$1nstrumento]]',
						num: 100
					}]
				}, {
					name: 'Erros de escrita',
					find: '',
					replace: '',
					num: 1,
					sub: [{
						name: 'Sérgio Mendes',
						find: 'Sergio Mendes',
						replace: 'Sérgio Mendes',
						num: 100
					}]
				}]
			}, {
				name: 'Animangá',
				find: '',
				replace: '',
				num: 1,
				ifhas: /(\{\{Portal3.*\|(Animangá)[\|\}])/i,
				sub: [{
					name: 'Introdução',
					find: '',
					replace: '',
					num: 1,
					sub: [{
						name: '[[anime]] / [[mangá]]',
						find: /(╚[^╝]*)([^\[])\[?\[?anime\]?\]? *\/ *\[?\[?mangá\]?\]?([^\]])/i,
						replace: '$1$2[[mangá]] e [[anime]]$3',
						num: 1
					}]
				}, {
					name: 'Rule',
					find: '{{Info/Animangá/Rodapé\n╣}}',
					replace: '{{Info/Animangá/Rodapé╣}}',
					num: 1
				}]
			}, {
				name: 'Tag man assunto',
				find: '',
				replace: '',
				num: 1,
				ifhas: /\{\{(Artigo longo|Carece de fontes2|Carece de fontes|Contextualizar|Controverso|Corrigir|Fusão|Fusão com|Fusão de|Mais notas|M\-notas\-bpv|Parcial|Reciclagem|Revisão|Revisão\-sobre|Sem\-fontes|Sem imagem|Seminterwiki|Sem[\- ]notas|Trivia|Wikificação)([\|}])/i,
				sub: [{
					name: 'marcando assuntos',
					find: '',
					replace: '',
					num: 1,
					sub: [{
						name: 'marcando música',
						find: /\| *música\= */i,
						replace: '├',
						num: 1
					}, {
						name: 'marcando cinema',
						find: /\| cinema\= */i,
						replace: '┌',
						num: 1
					}, {
						name: 'marcando televisão',
						find: /\| televisão\= */i,
						replace: '┬',
						num: 1
					}, {
						enabled: false,
						name: 'marcando games',
						find: /\| games\= */i,
						replace: '┐',
						num: 1
					}, {
						name: 'marcando arte',
						find: /\| *arte\= */,
						replace: '┼',
						num: 1
					}]
				}, {
					name: 'marcando predefs',
					find: /\{\{(Artigo longo|Carece de fontes2|Carece de fontes|Contextualizar|Controverso|Corrigir|Fusão|Fusão com|Fusão de|Mais notas|M\-notas\-bpv|Parcial|Reciclagem|Revisão|Revisão\-sobre|Sem\-fontes|Sem imagem|Seminterwiki|Sem[\- ]notas|Trivia|Wikificação)([\|}])/i,
					replace: '{{┴$1$2',
					num: 1
				}, {
					name: 'preenche',
					find: '',
					replace: '',
					num: 1,
					sub: [{
						name: 'preenche arte',
						find: /(\{\{┴[^┼]*┼) *([\|\}])/i,
						replace: '$1sim$2',
						num: 1,
						ifhas: /┼ *[\|}]/i
					}, {
						name: 'inserindo música',
						find: /┼([^\|\}]*)([\|\}])/i,
						replace: '┼$1├sim$2',
						num: 1,
						ifhas: /\{\{Portal3.*\|(Música)/i
					}, {
						name: 'inserindo cinema',
						find: /┼([^\|\}]*)([\|\}])/,
						replace: '┼$1┌sim$2',
						num: 1,
						ifhas: /\{\{Portal3.*\|(Cinema)/i
					}, {
						name: 'inserindo televisão',
						find: /┼([^\|\}]*)([\|\}])/,
						replace: '┼$1┬sim$2',
						num: 1,
						ifhas: /\{\{Portal3.*\|(Televisão)/i
					}, {
						enabled: false,
						name: 'inserindo games',
						find: /┼([^\|\}]*)([\|\}])/,
						replace: '┼$1┐sim$2',
						num: 1
					}, {
						name: 'remove arte',
						find: /┼([^┌┬┐├┼\|\}]*)([^a-z])/i,
						replace: '$2',
						num: 1,
						ifhas: /[├┌┬┐] *[^\|\} ]+ *[\|\}]/i
					}]
				}, {
					name: 'inserindo arte',
					find: /\{\{(┴[^\|{}\n├┼]*)([\|}][^}\n├┼]*\})/i,
					replace: '{{$1┼sim$2',
					num: 1
				}, {
					name: 'desmarcando assuntos',
					find: '',
					replace: '',
					num: 1,
					sub: [{
						name: 'desmarcando música',
						find: /├/i,
						replace: '|música=',
						num: 1
					}, {
						name: 'desmarcando cinema',
						find: /┌/i,
						replace: '|cinema=',
						num: 1
					}, {
						name: 'desmarcando televisão',
						find: '',
						replace: '',
						num: 1
					}, {
						enabled: false,
						name: 'desmarcando games',
						find: '',
						replace: '',
						num: 1
					}, {
						name: 'desmarcando arte',
						find: '┼',
						replace: '|arte=',
						num: 1
					}]
				}, {
					name: 'Desmarcando predefs',
					find: '┴',
					replace: '',
					num: 1
				}]
			}]
		}, {
			name: 'Brasil',
			find: '',
			replace: '',
			num: 1,
			ifhas: /\{\{Portal3.*\|(Brasil|Tocantins|Sergirpe|São Paulo|Santa Catarina|Roraima|Rondônia|Rio Grande do Sul|Rio Grande do Norte|Rio de Janeiro|Piauí|Pernambuco|Paraná|Paraíba|Pará|Minas Gerais|Mato Grosso do Sul|Mato Grosso|Maranhão|Goiás|Espírito Santo|Ceará|Bahia|Amazonas|Amapá|Alagoas|Acre)/i,
			sub: [{
				name: 'Recat',
				find: '',
				replace: '',
				num: 1,
				sub: [{
					name: 'Avenidas de São Paulo',
					find: /\[\[Categoria:Avenidas de São Paulo([\|\]])/i,
					replace: '[[Categoria:Ruas e avenidas de São Paulo$1',
					num: 1
				}, {
					name: 'Bairros de Natal',
					find: /\[\[Categoria:Bairros de Natal([\|\]])/i,
					replace: '[[Categoria:Bairros de Natal (Rio Grande do Norte)$1',
					num: 1
				}, {
					name: 'Bairros do Rio de Janeiro',
					find: /\[\[Categoria:Bairros do Rio de Janeiro([\|\]])/i,
					replace: '[[Categoria:Bairros da cidade do Rio de Janeiro$1',
					num: 1
				}]
			}]
		}, {
			name: 'Ciência',
			find: '',
			replace: '',
			num: 1,
			ifhas: /\{\{Portal3.*\|(Ciência|Saúde)/i,
			sub: [{
				name: '!Artigos mínimos sobre Biologia',
				find: /\{\{mínimo sobre\|Biologia\}\}/i,
				replace: '{{mínimo sobre|biologia}}',
				num: 1
			}]
		}, {
			name: 'Localidades',
			find: '',
			replace: '',
			num: 1,
			sub: [{
				name: 'Rule',
				find: /(╚'''[^'\n]+''' é uma? )(Província|Cidade|Estado|Município|Comuna)/i,
				replace: '$1[[$2]]',
				num: 1
			}]
		}]
	}]
}, {
	/* *****
Regras que passaram no teste inicial
estão razoavelmente estáveis
mas precisam de ainda mais testes
antes de passarem para
o modo bot

Necessitam de revisão mínima
***** */
	name: 'Modo semi-bot',
	find: '',
	replace: '',
	num: 1,
	ifnot: /(\{\{desambiguação\}\}|\[\[Categoria:Desambiguaç(ão|ões))/i,
	sub: [{
		name: 'Geral 1',
		find: '',
		replace: '',
		num: 1,
		sub: [{
			name: '{{lang-xx}}',
			find: '',
			replace: '',
			num: 1,
			sub: [{
				name: 'Aplicando lang-xx inicial',
				find: /(╚.*\()(em \[\[(?:[^\n\|\[\]\:\.\)]+\|([^\n\|\[\]\:\.\)]*)|([^\n\|\[\]\:\;\.\)]+))\]\][,:; ] *(''+[^\'\)\n]+''+|[^\,\:\;\n\(\)\[\]]*))/i,
				replace: '$1{{subst:Bots/Lang|$3$4|$5|$2}}',
				num: 1
			}, {
				enabled: false,
				name: 'Aplicando lang-xx seguintes',
				find: /(\}\}[\;\,] *)(em \[\[(?:[^\n\|\[\]\:\.\)]+\|([^\n\|\[\]\:\.\)]*)|([^\n\|\[\]\:\;\.\)]+))\]\][,:; ] *(''+[^\'\)\n]+''+|[^\,\:\;\n\(\)\[\]]*))/i,
				replace: '$1{{subst:Bots/Lang|$3$4|$5|$2}}',
				num: 1
			}, {
				enabled: false, // desabilitando, testando a regra acima, mais genérica, e deve ser melhor que essa
				name: 'Lang-xx para [[língua xxx|xxx]]',
				find: /(\{\{subst:Bots\/Lang\|)língua [^\|\n]+(\|''[^\|\n]+''\|em \[\[língua [^\|\n]+\|([^\|\]\n]+)\]\])/i,
				replace: '$1$3$2',
				num: 1
			}]
		}, {
			name: 'Invisível',
			find: '',
			replace: '',
			num: 1,
			sub: [{
				name: 'Rule',
				find: /<!\-\- *Legenda da imagem *-\-\>/i,
				replace: '',
				num: 1
			}]
		}]
	}, {
		name: 'Parte Sup',
		find: '',
		replace: '',
		num: 1,
		sub: [{
			name: 'Introdução',
			find: '',
			replace: '',
			num: 1,
			sub: [{
				name: 'data nasc e morte',
				find: /(╚[^\(\)\n\[\]]*\([^\(\)\n]*[^\[\]0-9])([0-3]?[0-9] de (?:(?:jan|fever)eiro|março|abril|maio|ju[nl]ho|agosto|(?:setem|outu|novem|dezem)bro)|[1-2][0-9]{3,3})/i,
				replace: '$1[[$2]]',
				num: 10
			}, {
				name: 'LI na ocupação',
				find: /(╚[^╝\n\)]*\),? (?:é|foi) uma? )([^\[\]\n\, ]+)( e)/i,
				replace: '$1[[$2]]$3',
				num: 1
			}, {
				name: 'Rule',
				find: /(╚'''[^'\n]*'''), é/i,
				replace: '$1 é',
				num: 1
			}]
		}, {
			name: 'Predef man',
			find: '',
			replace: '',
			num: 1,
			sub: [{
				// É válido?
				// Se tiver uma tag no início e outra em uma seção específica?
				// Ou as duas dentro de seções? Pode?
				enabled: false,
				name: '{{Wikificação}} duplicada',
				find: /(\{\{Wikificação\|[^\r\n]*\}\}\r?\n[^░]*)\{\{Wikificação\|[^\r\n]*\}\}\r?\n/i,
				replace: '$1',
				num: 1
			}, {
				name: '-{{Sem imagem}}',
				find: /\{\{Sem imagem.*\}\}\r?\n/i,
				replace: '',
				num: 1,
				ifhas: /((\.jpe?g|\.svg|\.bmp|\.gif)[\|\]▒]|(\{\{Desambiguação)[\|}]|\{\{Info\/)/i
			}, {
				name: '{{Sem infocaixa}}',
				find: '',
				replace: '',
				num: 1,
				ifhas: '{{Sem infocaixa}}',
				sub: [{
					name: 'Geografia',
					find: '',
					replace: '',
					num: 1,
					sub: [{
						name: 'Cidades da Suécia',
						find: /Sem infocaixa/i,
						replace: 'Sem infocaixa|Cidade da Suécia',
						num: 1,
						ifhas: /\{\{Cidades da Suécia\}\}/i
					}, {
						name: 'Comunas da França',
						find: /Sem infocaixa/i,
						replace: 'Sem infocaixa|Comuna da França',
						num: 1,
						ifhas: /\[\[comuna\]\] (no Sul )?(d[ae] )?.*?(\[\[França|francesa)/i
					}]
				}]
			}]
		}]
	}, {
		name: 'Parte cen',
		find: '',
		replace: '',
		num: 1,
		sub: [{
			name: 'Texto após cabeçalho de seção',
			find: /(║==+ [^\=\n]+=+=)([^ \=\r\n])/i,
			replace: '$1\n$2',
			num: 100
		}, {
			name: 'Aplicando {{Dn}}',
			find: '** Desambiguação de siglas **',
			replace: '',
			num: 1,
			sub: [{
				name: 'siglas',
				find: '',
				replace: '',
				num: 1,
				ifhas: /\[\[[A-Z][^ a-z]{1,}\]\]/,
				sub: [{
					name: 'sigla AA 2',
					find: /(\[\[)(AC|AE|AG|AH|AI|AJ|AL|AM|AO|AP|AQ|AT|AU|AZ|BF|BG|BK|BL|CG|CH|CL|CP|CR|CS|CT|CV|CW|CX|DA|DC|DE|DE|DI|DL|DM|DS|DV|TN|TO)(\]\]|\|[^\[\]\|\n]+\]\])( *[^{])/,
					replace: '$1$2$3{{Dn}}$4',
					num: 5,
					ifhas: /\[\[[A-Z]{2,2}\]\]/
				}, {
					name: 'sigla A-B 3',
					find: /(\[\[)(AAA|AAB|AAC|ABB|ABC|ABI|ABR|ABS|ACL|ACM|ACP|ACS|ADA|ADC|ADP|ADS|AEA|AEC|AED|AEP|AFA|AFI|AFL|AFM|AFP|AIC|AIP|AIS|ALC|ALQ|ALT|AMA|APA|ATR|AUX|BDP|BNH|BNL|BNP)(\]\]|\|[^\[\]\|\n]+\]\])( *[^{])/,
					replace: '$1$2$3{{Dn}}$4',
					num: 1,
					ifhas: /\[\[[A-B][A-Z]{2,2}\]\]/
				}, {
					name: 'sigla C-D 3',
					find: /(\[\[)(CAB|CAE|CAM|CAP|CBB|CBC|CBM|CBN|CBO|CBR|CBS|CBT|CCA|CCB|CCC|CCG|CCJ|CCR|CCW|CDC|CDE|CDL|CDP|CDT|CDU|CDZ|CEA|CEI|CEP|CET|CEV|CFA|CFC|CFM|CGD|CGT|CHF|CIO|CIP|CMB|CMF|CMG|CNB|CNE|CNT|COE|COM|CPC|CPE|CPR|CQC|CRM|CRT|CSA|CSL|CSP|CST|CSU|CSV|CTE|CTI|DAC|DAO|DCC|DDA|DDD|DDR|DEC|DEP|DER|DFS|DGS|DHA|DHM|DHT|DIC|DIP|DMB|DMT|DMZ|DOC|DOP|DPL|DSL|DST|DTM)(\]\]|\|[^\[\]\|\n]+\]\])( *[^{])/,
					replace: '$1$2$3{{Dn}}$4',
					num: 1,
					ifhas: /\[\[[C-D][A-Z]{2,2}\]\]/
				}, {
					name: 'sigla E-Z 3',
					find: /(\[\[)(FFC|FSP|NBR|Pop|PTC|RAW|SAB|TCB|UBC|USC)(\]\]|\|[^\[\]\|\n]+\]\])( *[^{])/,
					replace: '$1$2$3{{Dn}}$4',
					num: 1,
					ifhas: /\[\[[E-Z][A-Z]{2,2}\]\]/
				}, {
					name: 'sigla AAAA 4',
					find: /(\[\[)(AACS|ABCD|ACRA|AFDB|ARPA|ARTV|BOPE|CAPM|CAPS|CCCC|CCMB|CISA|CISM|CPRM|CSKA|CTBC|FIAP|IFSC|NDSL)(\]\]|\|[^\[\]\|\n]+\]\])( *[^{])/,
					replace: '$1$2$3{{Dn}}$4',
					num: 1,
					ifhas: /\[\[[A-Z]{4,4}\]\]/
				}, {
					name: 'sigla AAAAA 5',
					find: /(\[\[)(AAARL|BAFTA|CEMEP|CESUT|CETEB)(\]\]|\|[^\[\]\|\n]+\]\])( *[^{])/,
					replace: '$1$2$3{{Dn}}$4',
					num: 1,
					ifhas: /\[\[[A-Z]{5,5}\]\]/
				}]
			}]
		}, {
			name: 'Ligação dupla em mesma seção',
			find: '',
			replace: '',
			num: 1,
			sub: [{
				name: 'Marca exceções 1',
				find: /([{}╠▒║\=]|\|\|)/i,
				replace: '┼$1',
				num: 10
			}, {
				name: 'Marca exceções 2 - \n',
				find: /\n([\|\*\#])/i,
				replace: '\n┼$1',
				num: 10
			}, {
				name: 'simples',
				find: /(\[\[([^\#\[\]\|][^\[\]\|\n]*)[\|\]][^┼]*)\[\[(\2)\]\]/i,
				replace: '$1$3',
				num: 100
			}, {
				name: 'com barra',
				find: /(\[\[([^\#\[\]\|][^\[\]\|\n]+)[\|\]][^┼]*)\[\[\2\|([^\]\n]*)\]\]/i,
				replace: '$1$3',
				num: 100
			}, {
				name: 'Desmarca exceções',
				find: '┼',
				replace: '',
				num: 100
			}]
		}, {
			name: 'Maiusculite em seções',
			find: '',
			replace: '',
			num: 1,
			sub: [{
				name: '= Referências Citadas =',
				find: /(={2,} )Referências Citadas( ={2,})/,
				replace: '$1Referências citadas$2',
				num: 1
			}]
		}, {
			name: 'Quantidade por extenso',
			find: '',
			replace: '',
			num: 1,
			sub: [{
				enabled: false,
				name: 'Quantidade por extenso - após',
				find: /(\n[^\*\#].* )(1?[0-9]|[1-9]0+)( (ano|m[êe]s|dia|real|reais|jogo)e?s?[^a-z])/i,
				replace: '$1{{subst:Número2palavra2|$2}}$3',
				num: 10
			}, {
				name: 'Quantidade por extenso - antes',
				find: /(com) ([2-9]|1[1-9]|[1-9]0+) ([^0-9])/i,
				replace: '$1 {{subst:Número2palavra2|$2}} $3',
				num: 1
			}, {
				name: 'Quantidade por extenso - havia',
				find: /([\n ]haviam) ([2-9]+) ([^0-9])/i,
				replace: '$1 {{subst:Número2palavra2|$2}} $3',
				num: 1
			}]
		}, {
			name: 'Acordo Ortográfico',
			find: '',
			replace: '',
			num: 10,
			ifnot: 'acordo ortográfico', // FIXME: /acordo ortográfico/i ?
			sub: [{
				name: 'Trema',
				find: '',
				replace: '',
				num: 1,
				ifhas: 'ü', // FIXME: /ü/i ?
				sub: [{
					name: 'Güe',
					find: '',
					replace: '',
					num: 1,
					ifhas: 'güe', // FIXME: /güe/i ?
					sub: [{
						name: 'Ágüe',
						find: /([^a-z][Áá])güe((?:mos)?s?[^a-z])/,
						replace: '$1gue$2',
						num: 1
					}, {
						name: 'Agüentar',
						find: /([^a-z][Aa])güentar(s?[^a-z])/,
						replace: '$1guentar$2',
						num: 1
					}, {
						name: 'Alcagüete',
						find: /([^a-z][Aa])lcagüete(s?[^a-z])/,
						replace: '$1lcaguete$2',
						num: 1
					}, {
						name: 'Anhangüera',
						find: /([^a-z]A)nhangüera(s?[^a-z])/,
						replace: '$1nhanguera$2',
						num: 1
					}, {
						name: 'Apazigüemos',
						find: /([^a-z][Aa])pazigüemos(s?[^a-z])/,
						replace: '$1paziguemos$2',
						num: 1
					}, {
						name: 'Averigüemos',
						find: /([^a-z][Aa])verigüemos(s?[^a-z])/,
						replace: '$1veriguemos$2',
						num: 1
					}, {
						name: 'Bilíngüe',
						find: /([^a-z][Bb])ilíngüe(s?[^a-z])/,
						replace: '$1ilíngue$2',
						num: 1
					}, {
						name: 'Cangüera',
						find: /([^a-z]C)angüera(s?[^a-z])/,
						replace: '$1anguera$2',
						num: 1
					}, {
						name: 'Deságüe',
						find: /([^a-z][Dd])eságüe(s?[^a-z])/,
						replace: '$1eságue$2',
						num: 1
					}, {
						name: 'Enxágüe',
						find: /([^a-z][Ee])nxágüe(s?[^a-z])/,
						replace: '$1nxágue$2',
						num: 1
					}, {
						name: 'Enxagüemos',
						find: /([^a-z][Ee])nxagüemos(s?[^a-z])/,
						replace: '$1nxaguemos$2',
						num: 1
					}, {
						name: 'Guaratingüetá',
						find: /([^a-z]G)uaratingüetá(s?[^a-z])/,
						replace: '$1uaratinguetá$2',
						num: 1
					}, {
						name: 'Inhangüera',
						find: /([^a-z]I)nhangüera(s?[^a-z])/,
						replace: '$1nhanguera$2',
						num: 1
					}, {
						name: 'ultilíngüe',
						find: /([^a-z][Mm])ultilíngüe(s?[^a-z])/,
						replace: '$1ultilíngue$2',
						num: 1
					}, {
						name: 'Piaçagüera',
						find: /([^a-z]P)iaçagüera(s?[^a-z])/,
						replace: '$1iaçaguera$2',
						num: 1
					}, {
						name: 'Tabatingüera',
						find: /([^a-z]T)abatingüera(s?[^a-z])/,
						replace: '$1abatinguera$2',
						num: 1
					}, {
						name: 'Ungüento',
						find: /([^a-z][Uu])ngüento(s?[^a-z])/,
						replace: '$1nguento$2',
						num: 1
					}]
				}, {
					name: 'Güi',
					find: '',
					replace: '',
					num: 1,
					ifhas: /Güi/i,
					sub: [{
						name: 'Ambigüidade',
						find: /([^a-z][Aa])mbigüidade(s?[^a-z])/,
						replace: '$1mbiguidade$2',
						num: 1
					}, {
						name: 'Antigüidade',
						find: /([^a-z][Aa])ntigü((?:idade|íssimo)s?[^a-z])/,
						replace: '$1ntigu$2',
						num: 1
					}, {
						name: 'Argüição',
						find: /([^a-z][Aa])rgü((?:ição|ir)s?[^a-z])/,
						replace: '$1rgu$2',
						num: 1
					}, {
						name: 'Barigüi',
						find: /([^a-z]B)arigüi(s?[^a-z])/,
						replace: '$1arigui$2',
						num: 1
					}, {
						name: 'Bilingüismo',
						find: /([^a-z][Bb])ilingüismo(s?[^a-z])/,
						replace: '$1ilinguismo$2',
						num: 1
					}, {
						name: 'Birigüi',
						find: /([^a-z]B)irigüi(s?[^a-z])/,
						replace: '$1irigui$2',
						num: 1
					}, {
						name: 'Contigüidade',
						find: /([^a-z][Cc])ontigüidade(s?[^a-z])/,
						replace: '$1ontiguidade$2',
						num: 1
					}, {
						name: 'Desmilingüir',
						find: /([^a-z][Dd])esmilingüir(s?[^a-z])/,
						replace: '$1esmiliguir$2',
						num: 1
					}, {
						name: 'Inexeqüível',
						find: /([^a-z][Ii])nexeqüível(s?[^a-z])/,
						replace: '$1nexequível$2',
						num: 1
					}, {
						name: 'ingüística',
						find: /([^a-z][Ll])ingüística(s?[^a-z])/,
						replace: '$1inguística$2',
						num: 1
					}, {
						name: 'Lingüiça',
						find: /([^a-z][Ll])ingüiça(s?[^a-z])/,
						replace: '$1inguiça$2',
						num: 1
					}, {
						name: 'Lingüística',
						find: /([^a-z][Ll])ingüística(s?[^a-z])/,
						replace: '$1inguística$2',
						num: 1
					}, {
						name: 'Pingüim',
						find: /([^a-z][Pp])ingüim(s?[^a-z])/,
						replace: '$1inguim$2',
						num: 1
					}, {
						name: 'Redargüir',
						find: /([^a-z][Rr])edargüir(s?[^a-z])/,
						replace: '$1edarguir$2',
						num: 1
					}, {
						name: 'Sagüi',
						find: /([^a-z][Ss])agüi(s?[^a-z])/,
						replace: '$1agui$2',
						num: 1
					}, {
						name: 'Sangü',
						find: /([^a-z][Ss])angü((?:inário|íneo)s?[^a-z])/,
						replace: '$1angu$2',
						num: 1
					}]
				}, {
					name: 'Qüe',
					find: '',
					replace: '',
					num: 1,
					ifhas: 'Qüe', // FIXME: /Qüe/i ?
					sub: [{
						name: 'Apropinqüe',
						find: /([^a-z][Aa])propinqüe(s?[^a-z])/,
						replace: '$1propinque$2',
						num: 1
					}, {
						name: 'Cinqü',
						find: /([^a-z][Cc])inqü((?:enta|entenário)s?[^a-z])/,
						replace: '$1inqu$2',
						num: 1
					}, {
						name: 'Conseqü',
						find: /([^a-z][Cc])onseqü((?:ência|ente)s?[^a-z])/,
						replace: '$1onsequ$2',
						num: 1
					}, {
						name: 'Delinqü',
						find: /([^a-z][Dd])elinqü((?:em|ência|ente)s?[^a-z])/,
						replace: '$1elinqu$2',
						num: 1
					}, {
						name: 'Eqüestre',
						find: /([^a-z][Ee])qüestre(s?[^a-z])/,
						replace: '$1questre$2',
						num: 1
					}, {
						name: 'Freqü',
						find: /([^a-z][Ff])reqü([êe]n(?:tado|tar|te|cia)[^a-z])/,
						replace: '$1requ$2',
						num: 1
					}, {
						name: 'Grandiloqüência',
						find: /([^a-z][Gg])randiloqüência(s?[^a-z])/,
						replace: '$1randiloquência$2',
						num: 1
					}, {
						name: 'Pariqüera',
						find: /([^a-z]P)ariqüera(s?[^a-z])/,
						replace: '$1ariquera$2',
						num: 1
					}, {
						name: 'Qüest',
						find: /([^a-z][Qq])üest((?:ão|ionamento|ionar|ionário|iúncula)s?[^a-z])/,
						replace: '$1uest$2',
						num: 1
					}, {
						name: 'Seqüela',
						find: /([^a-z][Ss])eqüela(s?[^a-z])/,
						replace: '$1equela$2',
						num: 1
					}, {
						name: 'Seqüência',
						find: /([^a-z][Ss])eqüência(s?[^a-z])/,
						replace: '$1equência$2',
						num: 1
					}, {
						name: 'Seqü',
						find: /([^a-z][Ss])eqüestr((?:adora?|o)s?[^a-z])/,
						replace: '$1equestr$2',
						num: 1
					}]
				}, {
					name: 'Qüi',
					find: '',
					replace: '',
					num: 1,
					ifhas: 'Qüi', // FIXME: /Qüi/i ?
					sub: [{
						name: 'Aqüicultura',
						find: /([^a-z][Aa])qüicultura(s?[^a-z])/,
						replace: '$1quicultura$2',
						num: 1
					}, {
						name: 'Eqüino',
						find: /([^a-z][Ee])qüino(s?[^a-z])/,
						replace: '$1qüino$2',
						num: 1
					}, {
						name: 'Exeqüível',
						find: /([^a-z][Ee])xeqüível(s?[^a-z])/,
						replace: '$1xequível$2',
						num: 1
					}, {
						name: 'Eqüi',
						find: /([^a-z][Ee])qüi((?:distante|tativo)s?[^a-z])/,
						replace: '$1qui$2',
						num: 1
					}, {
						name: 'Inexeqüível',
						find: /([^a-z][Ii])nexeqüível(s?[^a-z])/,
						replace: '$1nexequível$2',
						num: 1
					}, {
						name: 'Iniqüidade',
						find: /([^a-z][Ii])niqüidade(s?[^a-z])/,
						replace: '$1niqüidade$2',
						num: 1
					}, {
						name: 'Liqüi',
						find: /([^a-z][Ll])iqüid((?:ar|ação|ificador)s?[^a-z])/,
						replace: '$1iquid$2',
						num: 1
					}, {
						name: 'Líqüido',
						find: /([^a-z][Ll])íqüido(s?[^a-z])/,
						replace: '$1íquido$2',
						num: 1
					}, {
						name: 'Obliqüidade',
						find: /([^a-z][Oo])bliqüidade(s?[^a-z])/,
						replace: '$1bliquidade$2',
						num: 1
					}, {
						name: 'Qüin',
						find: /([^a-z][Qq])üin((?:decágono|gentésimo)s?[^a-z])/,
						replace: '$1uin$2',
						num: 1
					}, {
						name: 'Quinqü',
						find: /([^a-z][Qq])uinqü((?:qüagésimo|enal|ênio|qüídio)s?[^a-z])/,
						replace: '$1uinqu$2',
						num: 1
					}, {
						name: 'Quinqüídio',
						find: /([^a-z][Qq])uinqüídio(s?[^a-z])/,
						replace: '$1uinquídio$2',
						num: 1
					}, {
						name: 'Qüiproquó',
						find: /([^a-z][Qq])üiproquó(s?[^a-z])/,
						replace: '$1uiproquó$2',
						num: 1
					}, {
						name: 'Tranqüi',
						find: /([^a-z][Tt])ranqüi((?:lo|lidade)s?[^a-z])/,
						replace: '$1ranqüi$2',
						num: 1
					}, {
						name: 'Ubiqüidade',
						find: /([^a-z][Uu])biqüidade(s?[^a-z])/,
						replace: '$1biquidade$2',
						num: 1
					}]
				}]
			}, {
				name: 'éia',
				find: '',
				replace: '',
				num: 1,
				ifhas: /éia/i,
				sub: [{
					name: 'Assembléia',
					find: /([^a-z][Aa])ssembléia(s?[^a-z])a/,
					replace: '$1ssembleia$2',
					num: 10
				}, {
					name: 'Coréia',
					find: /([^a-z])Coréia(s?[^a-z])/,
					replace: '$1Coreia$2',
					num: 10
				}, {
					name: 'Européia',
					find: /([^a-z][Ee])uropéia(s?[^a-z])européia/,
					replace: '$1uropeia$2',
					num: 10
				}, {
					name: 'idéia',
					find: /([^a-z][Ii])déia(s?[^a-z])/,
					replace: '$1deia$2',
					num: 10
				}]
			}, {
				name: 'ôo',
				find: /([^a-z])([Vv]|[Aa]benç|[Ee]nj)ôo([^a-z])/,
				replace: '$1$2oo$3',
				num: 1,
				ifhas: 'ôo'
			}, {
				name: 'aiú',
				find: '',
				replace: '',
				num: 1,
				ifhas: /aiú/i,
				sub: [{
					name: 'baiúca',
					find: /([^a-z][Bb])aiúca([^a-z])/,
					replace: '$1aiuca$2',
					num: 1
				}]
			}, {
				name: 'oiú',
				find: 'oiú',
				replace: '',
				num: 1,
				sub: [{
					name: 'boiúno',
					find: /([^a-z][Bb])oiúno([^a-z])/,
					replace: '$1oiúno$2',
					num: 1
				}]
			}]
		}]
	}, {
		name: 'Parte REF VT LE',
		find: '',
		replace: '',
		num: 1,
		sub: [{
			name: 'Marcando',
			find: '',
			replace: '',
			num: 1,
			sub: [{
				name: 'Marcando </ref>',
				find: /<\/ref>/,
				replace: '┼',
				num: 1
			}, {
				name: 'Marcando ] 1',
				find: /([^\]])\]\]\]([^\]])/,
				replace: '$1]]├$2',
				num: 1
			}, {
				name: 'Marcando ] 2',
				find: /([^\]])\]([^\]])/,
				replace: '$1├$2',
				num: 1
			}]
		}, {
			name: 'Seção de referência',
			find: '',
			replace: '',
			num: 1,
			sub: [{
				name: 'Reflist -> Referências, reflist longe',
				find: /(== Referências ==)\r?\n([^░║]*)(\{\{Reflist[^}\n]*\}\})\r?\n/i,
				replace: '{{referências}}\n$2\n',
				num: 1
			}, {
				name: 'Reflist -> Referências, seção != "Refer"',
				find: /\{\{Reflist([\|}])/i,
				replace: '{{Referências$1',
				num: 1,
				ifnot: /(║=+ Refer[^║░]+\{\{Reflist)/i
			}]
		}, {
			name: 'Ligações externas',
			find: '',
			replace: '',
			num: 1,
			sub: [{
				name: 'Link para url sem colchete',
				find: /(== Ligações externas ==[^░]*[^\[])(http.?:\/\/[^ \r\n\|]+)\r?\n/i,
				replace: '$1[$2├\n',
				num: 1
			}, {
				name: 'link duplicada no mesmo Link',
				find: /(\{\{Link[^\{\n]*)\{\{([a-z][a-z][a-z]?)\}\}([^\{\n]*\{\{\2\}\})/i,
				replace: '$1$3',
				num: 1
			}, {
				name: '{{Link}} com |4=língua',
				find: '',
				replace: '',
				num: 1,
				sub: [{
					name: 'inglês',
					find: /(\| *4 *= *[^\{\}\(\n]*)\(*(?:em )?(?:\[\[língua inglesa\|(?:em )?inglês\]\]|(?:em )?inglês[^\]])\)*\'*([^\{\}\n]*\}\})/i,
					replace: '$1{{en}}$2',
					num: 1
				}, {
					name: 'alemão',
					find: /(\| *4 *= *[^\{\}\(\n]*)\(*(?:em )?(?:\[\[língua alemã\|(?:em )?alemão\]\]|(?:em )?alemão[^\]])\)*\'*([^\{\}\n]*\}\})/i,
					replace: '$1{{de}}$2',
					num: 1
				}, {
					name: 'italiano',
					find: /(\| *4 *= *[^\{\}\(\n]*)\(*(?:em )?(?:\[\[língua italiana\|(?:em )?italiano\]\]|(?:em )?italiano[^\]])\)*\'*([^\{\}\n]*\}\})/i,
					replace: '$1{{it}}$2',
					num: 1
				}, {
					name: 'segunda língua',
					find: /(\| *4 *= *\{\{[a-z][a-z][a-z]?\}\} e )([^e][^m])/i,
					replace: '$1em $2',
					num: 1
				}, {
					name: '{{Link}} com |4=língua pt 2',
					find: '',
					replace: '',
					num: 1,
					sub: [{
						name: 'inglês',
						find: /(\| *4 *= *\{\{[a-z][a-z][a-z]?)\}\} e em (?:\[\[língua inglesa\|inglês\]\]|inglês\))/i,
						replace: '$1|en}}',
						num: 1
					}, {
						name: '{{Link2}}',
						find: '',
						replace: '',
						num: 1,
						sub: [{
							name: 'Língua no campo 4',
							find: /(\{\{Link\|)([^\{\}\n]*)\{\{([a-z]{2,3})\|([a-z]{2,3})\}\} *\}\}\r?\n/i,
							replace: '$1$3|$4$2}}\n',
							num: 1
						}, {
							name: 'Campo língua',
							find: /\{\{Link(\|[a-z]{2,3}\|[a-z]{2,3}[^0-9\{\}\n]*)(\|2=.*)\}\} *\r?\n/i,
							replace: '{{Link2$2$1}}\n',
							num: 1
						}, {
							name: 'Arrumando parâmetros',
							find: /(\{\{Link2[^{}\n]*\|) *[0-9]=/i,
							replace: '$1',
							num: 10
						}]
					}]
				}]
			}, {
				enabled: false,
				name: 'Lingua na {{Link}}',
				find: '',
				replace: '',
				num: 1,
				sub: [{
					name: '{{Link}} - lingua depois',
					find: /(\n\*+ \{\{Link *\|) *(\| *[^{}\n]+\}\}.*)\{\{([a-z][a-z][a-z]?(?:\|[^\}\n]*)?)\}\}([^\)])/,
					replace: '$1$3$2$4',
					num: 1
				}, {
					name: '{{Link}} - lingua dentro',
					find: /(\n\*+ \{\{Link *\|) *(\| *[^{}\n]+) *\{\{([a-z][a-z][a-z]?)\}\} *(\}\})/,
					replace: '$1$3$2$4',
					num: 100
				}]
			}, {
				name: 'Ajuste |4= pontuação dupla',
				find: /(\{\{Link[^\|\n]*\|[^\{\}\n]*\| *4 *= *[\,\.]) *[\,\.]/i,
				replace: '$1',
				num: 1
			}, {
				name: 'Remove link',
				find: /\* \{\{Link\|\|2= *([^\{\}\|┼ ]*) *\|3=([^\{\}\|┼]+)(?: \|4=([^\{\}\|┼]*))?\}\}/i,
				replace: '* [$1 $2]$3',
				num: 1
			}]
		}, {
			name: 'Desmarcando',
			find: '',
			replace: '',
			num: 1,
			sub: [{
				name: 'Desmarcando </ref>',
				find: '┼',
				replace: '&lt;/ref&gt;',
				num: 1
			}, {
				name: 'Desmarcando ]',
				find: '├',
				replace: ']',
				num: 1
			}]
		}]
	}, {
		name: 'Parte inf',
		find: '',
		replace: '',
		num: 1,
		sub: [{
			name: 'Portal3',
			find: '',
			replace: '',
			num: 1,
			sub: [{
				name: 'Add {{Portal}}',
				find: '',
				replace: '',
				num: 1,
				ifnot: /\{\{(Portal3|desambiguação)/i,
				sub: [{
					name: 'Geral vazia',
					find: /\r?\n\r?\n(\[\[Categoria\:|\{\{DEFAULTSORT\:)/i,
					replace: '\n\n{{Portal3|}}\n\n$1',
					num: 1
				}]
			}, {
				name: 'Preenchendo {{Portal}}',
				find: '',
				replace: '',
				num: 1,
				sub: [{
					name: 'Países (introd)',
					find: '',
					replace: '',
					num: 1,
					sub: [{
						name: 'Brasil',
						find: /\{\{Portal3\|/i,
						replace: '{{Portal3|Brasil|',
						num: 1,
						ifhas: /(estado d[eo] [^\,\n]*, \[\[Brasil\]\]|(município|estado)\]?\]? \[?\[?brasil\]?\]?eiro| é um \[?\[?bairro\]?\]? (não oficial )?da cidade \[?\[?brasil\]?\]?eira| é um \[?\[?bairro\]?\]? (não oficial )?da cidade de [^\,╝\n]*, no \[\[(Tocantins|Sergirpe|São Paulo|Santa Catarina|Roraima|Rondônia|Rio Grande do Sul|Rio Grande do Norte|Rio de Janeiro|Piauí|Pernambuco|Paraná|Paraíba|Pará|Minas Gerais|Mato Grosso do Sul|Mato Grosso|Maranhão|Goiás|Espírito Santo|Ceará|Bahia|Amazonas|Amapá|Alagoas|Acre)\]\]).*╝/i,
						ifnot: /\{\{Portal3.*\|(Brasil|Tocantins|Sergirpe|São Paulo|Santa Catarina|Roraima|Rondônia|Rio Grande do Sul|Rio Grande do Norte|Rio de Janeiro|Piauí|Pernambuco|Paraná|Paraíba|Pará|Minas Gerais|Mato Grosso do Sul|Mato Grosso|Maranhão|Goiás|Espírito Santo|Ceará|Bahia|Amazonas|Amapá|Alagoas|Acre)/i
					}]
				}, {
					name: 'Portal3 - via Infocaixa',
					find: '',
					replace: '',
					num: 1,
					ifhas: '{{Info/', // FIXME: /\{\{Info//i ?
					sub: [{
						name: 'Estado do Brasil',
						find: /(\{\{Info\/Município do Brasil[^╣]* \| *estado = ([^\[\]\r\n]+)\r?\n[^░]*)\{\{Portal3\|/i,
						replace: '$1{{Portal3|$2',
						num: 1,
						ifhas: '╣'
					}, {
						name: 'Localidade de país',
						find: /(\{\{Info\/(?:Condado|Comuna) da (Romênia|Suiça).*?[^░]*)\{\{Portal3\|/i, // FIXME: Singleline?
						replace: '$1{{Portal3|$2|',
						num: 1,
						ifhas: /\{\{Info\/(Condado|Comuna) da (Romênia|Suiça)/i,
						ifnot: /\{\{Portal3.*\|(Roménia|Suiça)[ \|\}]/i
					}]
				}]
			}, {
				name: 'Arrumando portal',
				find: /(\{\{Portal3.*)\|\}\}/i,
				replace: '$1}}',
				num: 1
			}, {
				name: 'Retirando {{Portal3|',
				find: '',
				replace: '',
				num: 1,
				sub: [{
					name: 'Removendo portal vazio',
					find: /\{\{Portal3\}\}\r?\n\r?\n/i,
					replace: '',
					num: 1
				}]
			}]
		}]
	}, {
		name: 'Temáticos',
		find: '',
		replace: '',
		num: 1,
		sub: [{
			name: 'Biografia',
			find: '',
			replace: '',
			num: 1,
			ifhas: /\{\{Portal3.*\|Biografias/,
			sub: [{
				name: 'Parte cen',
				find: '',
				replace: '',
				num: 1,
				sub: [{
					name: 'Links internos',
					find: '',
					replace: '',
					num: 1,
					sub: [{
						name: '- link ano em listas',
						find: '',
						replace: '',
						num: 1,
						sub: [{
							name: 'Rule',
							find: /(║==+ (?:Principais)? ?(?:Projetos|Exposições|Premiações) ==+[^║░]*)\[\[([1-2][0-9]{3,3})\]\]/i,
							replace: '$1$2',
							num: 100
						}]
					}]
				}]
			}]
		}, {
			name: 'Organização',
			find: '',
			replace: '',
			num: 1,
			ifhas: /\{\{Sem infocaixa\|Organização\}\}/i,
			sub: [{
				name: '+{{Info/Organização',
				find: /(\{\{sem infocaixa\|Organização)(\}\}\r?\n)/i,
				replace: '$1|parcial$2{{Info/Organização\n' + ' |nome            = %%title%%\n' + ' |imagem          =\n' + ' |imagem_legenda  =\n' + ' |sigla           =\n' + ' |lema            =\n' + ' |fundação        = {{dtlink|||}}\n' + ' |fundador_nome   =\n' + ' |extinção        = {{dtlink|||}}\n' + ' |filiação        =\n' + ' |tipo            = Associação\n' + ' |estado          =\n' + ' |sede            =\n' + ' |propósito       = &lt;!-- |propósito= ou |profissão= --&gt;\n' + ' |área_influência =\n' + ' |língua          =\n' + ' |membros         =\n' + ' |líder_título    =\n' + ' |líder_nome      =\n' + ' |pessoas_imp     =\n' + ' |num_empreg      =\n' + ' |voluntários     =\n' + ' |website         =\n' + '}}\n',
				num: 1,
				ifhas: /\[\[Categoria:Associaç(ão|ões)[ \|\]]/i,
				ifnot: /\{\{Info\//i
			}]
		}, {
			name: 'Arte',
			find: '',
			replace: '',
			num: 1,
			ifhas: /\{\{Portal3.*\|(Arte|Cinema|Anime|Animangá|Televisão)[\|\}]/i,
			sub: [{
				name: 'Oscar de melhor Atriz coadjuvante',
				find: /Oscar de melhor A(triz|tor) coadjuvante/i,
				replace: 'Oscar de melhor a$1 coadjuvante',
				num: 1
			}, {
				name: 'Televisão',
				find: '',
				replace: '',
				num: 1,
				ifhas: /\{\{Portal3.*\|Televisão[\|\}]/i,
				sub: [{
					name: 'Infobox',
					find: '',
					replace: '',
					num: 1,
					sub: [{
						name: '{{Info/Episódio de série',
						find: '',
						replace: '',
						num: 1,
						ifhas: '{{Info/Episódio de série', // FIXME: /\{\{Info/Episódio de série/i ?
						sub: [{
							name: 'Ano temático',
							find: /(\{\{Info\/Episódio de série[^╣]* *\| *(?:exibição_data|data original) *=.*\[\[)([0-9]{4,4})(\]\])/i,
							replace: '$1$2 na televisão|$2$3',
							num: 1
						}, {
							name: 'Rule',
							find: /(\{\{Info\/Episódio de série[^╣]* *\| *)caption( *=)/i,
							replace: '$1legenda$2',
							num: 1
						}, {
							name: 'Minuscula',
							find: /(\{\{Info\/Episódio de série[^╣]* *\| *)(Título|Série|Imagem|Caption|Temporada|Episódio|Data[ _]original|Produção|Escrito[ _]por|Diretor|Convidados|Lista[ _]de[ _]episódios|Ant|Prox)( *=)/i,
							replace: '$1{{subst:lcfirst:$2}}$3',
							num: 100
						}]
					}]
				}]
			}]
		}]
	}]
}, {
	/* *****
Regras que precisam de alguma revisão
- Nunca ficarão 100%
-- imprecisões que o awb não pode detectar
- Usadas como auxiliar de edição
-- marca alguma coisa e coloca instrução do que fazer

Podem habilitar essas regras, desde que estejam dispostos
a revisar bem o artigo pois essas regras sempre poderão dar erro.

Sempre necessitam de revisão, pois há ocasiões que sempre dará erro
***** */
	enabled: false,
	name: 'Modo revisão',
	find: '',
	replace: '',
	num: 1,
	ifnot: /(\{\{desambiguação\}\}|\[\[Categoria:Desambiguaç(ão|ões))/i,
	sub: [{
		name: 'Retirando refs',
		find: '',
		replace: '',
		num: 1,
		sub: [{
			name: 'pt.wiki',
			find: /([^\[])\[http:\/\/[a-z][a-z]\.wikipedia\.org\/wiki\/[^ ]*\]([^\]])/i,
			replace: '$1$2',
			num: 10
		}, {
			name: 'pt.wikipedia.org',
			find: /<ref[^\/\>]*>[^┼\n]*http:\/\/[a-z][a-z]\.wikipedia\.org[^┼\n]*┼/i,
			replace: '',
			num: 1
		}]
	}, {
		name: 'Retirando {{Referências}}',
		find: /\{\{Referências.*\}\}(?:r?\n)*(\{|\[|║\=+ \{\{Ver também|║\=+ \{\{Ligações)/i,
		replace: '$1',
		num: 1,
		ifnot: /(<ref name|<ref>|\{\{(Colocação\-carnaval|Grupo\-carnaval)\}|\| *rankingfifa = *[^ \r\n])/i
	}]
}, {
	/* *****
Regras em teste
- Novas regras
- Regras antigas que tiveram algum bug recentemente descoberto

Necessitam de muita revisão
***** */
	enabled: false,
	name: 'Modo teste',
	find: '',
	replace: '',
	num: 1,
	ifnot: /(\{\{desambiguação\}\}|\[\[Categoria:Desambiguaç(ão|ões))/i,
	sub: [{
		name: 'Geral',
		find: '',
		replace: '',
		num: 1,
		sub: [{
			name: '<small> em tabela',
			find: '',
			replace: '',
			num: 1,
			sub: [{
				name: 'Marca <small>',
				find: /<small>/i,
				replace: '┼',
				num: 1
			}, {
				name: 'Marca </small>',
				find: /<\/small>/i,
				replace: '┤',
				num: 1
			}, {
				name: '<small> em tabela',
				find: /(\n[\|!].*┼[^┤\n]*)\n/,
				replace: '$1┤\n',
				num: 2
			}, {
				name: 'Desmarca <small>',
				find: '┼',
				replace: '&lt;small&gt;',
				num: 1
			}, {
				name: 'Desmarca </small>',
				find: '┤',
				replace: '&lt;/small&gt;',
				num: 1
			}]
		}]
	}, {
		name: 'Parte sup',
		find: '',
		replace: '',
		num: 1,
		sub: [{
			name: 'Tag man',
			find: '',
			replace: '',
			num: 1,
			sub: [{
				name: '{{sem imagem}} para o topo',
				find: /(╦)([^╩░]*╩[^░]*)(\n\{\{Sem imagem[^\r\n]*\}\})/i,
				replace: '$1$3$2',
				num: 1
			}, {
				name: 'Multitag',
				find: '',
				replace: '',
				num: 1,
				sub: [{
					name: 'Incorpora',
					find: '',
					replace: '',
					num: 1,
					sub: [{
						name: 'Marca',
						find: /(\{\{)(Contextualizar|Contextualizar2|Controverso|Corrigir|Divisão|Expandir2|Fontes primárias|Formatar referências|Global|Global\/Brasil|Global\/Lusofonia|Global\/Portugal|Mais notas|Má introdução|Má tradução|Parcial|Parcialcontroverso|Pesquisa inédita|Problemas de acessibilidade|Publicidade|Reciclagem|Revisão|Sem cat|Sem\-fontes|Sem\-fontes\-bpv|Sem interwiki|Sem notas|Wikificação)([\|}])/i,
						replace: '$1┴$2┴$3',
						num: 1
					}, {
						name: 'Incorpora',
						find: /\{\{(┴[^┴\n]+┴)([^\r\n]*)\}\}\r?\n\{\{(┴[^┴\n]+┴)\2\}\}/i,
						replace: '{{Multitag|$1|$3$2}}',
						num: 1
					}, {
						name: 'Incorpora em Multitag',
						find: /(\{\{Multitag(?:\|┴[^┴]+┴)+)(\|[^{}\n]*)\}\}\r?\n\{\{(┴[^┴\n]+┴)\2\}\}/,
						replace: '$1|$3$2}}',
						num: 1
					}, {
						name: 'Abrevia',
						find: '',
						replace: '',
						num: 1,
						ifhas: /\{\{Multitag/i,
						sub: [{
							name: 'Wikificação',
							find: /(\{\{Multitag\|[^{}\n]*)┴Wikificação┴/i,
							replace: '$1wkf',
							num: 1
						}, {
							name: 'Contextualizar',
							find: /(\{\{Multitag\|[^{}\n]*)┴Contextualizar┴/i,
							replace: '$1contx',
							num: 1
						}, {
							name: 'Contextualizar2',
							find: /(\{\{Multitag\|[^{}\n]*)┴Contextualizar2┴/i,
							replace: '$1contx2',
							num: 1
						}, {
							name: 'Controverso',
							find: /(\{\{Multitag\|[^{}\n]*)┴Controverso┴/i,
							replace: '$1contr',
							num: 1
						}, {
							name: 'Corrigir',
							find: /(\{\{Multitag\|[^{}\n]*)┴Corrigir┴/i,
							replace: '$1corr',
							num: 1
						}, {
							name: 'Divisão',
							find: /(\{\{Multitag\|[^{}\n]*)┴Divisão┴/i,
							replace: '$1div',
							num: 1
						}, {
							name: 'Expandir2',
							find: /(\{\{Multitag\|[^{}\n]*)┴Expandir2┴/i,
							replace: '$1expand',
							num: 1
						}, {
							name: 'Fontes primárias',
							find: /(\{\{Multitag\|[^{}\n]*)┴Fontes primárias┴/i,
							replace: '$1fp',
							num: 1
						}, {
							name: 'Formatar referências',
							find: /(\{\{Multitag\|[^{}\n]*)┴Formatar referências┴/i,
							replace: '$1fref',
							num: 1
						}, {
							name: 'Global',
							find: /(\{\{Multitag\|[^{}\n]*)┴Global┴/i,
							replace: '$1glob',
							num: 1
						}, {
							name: 'Global/Brasil',
							find: /(\{\{Multitag\|[^{}\n]*)┴Global\/Brasil┴/i,
							replace: '$1glob-br',
							num: 1
						}, {
							name: 'Global/Lusofonia',
							find: /(\{\{Multitag\|[^{}\n]*)┴Global\/Lusofonia┴/i,
							replace: '$1glob-lus',
							num: 1
						}, {
							name: 'Global/Portugal',
							find: /(\{\{Multitag\|[^{}\n]*)┴Global\/Portugal┴/i,
							replace: '$1glob-pt',
							num: 1
						}, {
							name: 'Mais notas',
							find: /(\{\{Multitag\|[^{}\n]*)┴Mais notas┴/i,
							replace: '$1mnot',
							num: 1
						}, {
							name: 'Má introdução',
							find: /(\{\{Multitag\|[^{}\n]*)┴Má introdução┴/i,
							replace: '$1intro',
							num: 1
						}, {
							name: 'Má tradução',
							find: /(\{\{Multitag\|[^{}\n]*)┴Má tradução┴/i,
							replace: '$1trad',
							num: 1
						}, {
							name: 'Parcial',
							find: /(\{\{Multitag\|[^{}\n]*)┴Parcial┴/i,
							replace: '$1parcial',
							num: 1
						}, {
							name: 'Parcialcontroverso',
							find: /(\{\{Multitag\|[^{}\n]*)┴Parcialcontroverso┴/i,
							replace: '$1parcialcont',
							num: 1
						}, {
							name: 'Pesquisa inédita',
							find: /(\{\{Multitag\|[^{}\n]*)┴Pesquisa inédita┴/i,
							replace: '$1pi',
							num: 1
						}, {
							name: 'Publicidade',
							find: /(\{\{Multitag\|[^{}\n]*)┴Publicidade┴/i,
							replace: '$1pub',
							num: 1
						}, {
							name: 'Reciclagem',
							find: /(\{\{Multitag\|[^{}\n]*)┴Reciclagem┴/i,
							replace: '$1rec',
							num: 1
						}, {
							name: 'Revisão',
							find: /(\{\{Multitag\|[^{}\n]*)┴Revisão┴/i,
							replace: '$1rev$1',
							num: 1
						}, {
							name: 'Sem cat',
							find: /(\{\{Multitag\|[^{}\n]*)┴Sem cat┴/i,
							replace: '$1scat',
							num: 1
						}, {
							name: 'Sem-fontes',
							find: /(\{\{Multitag\|[^{}\n]*)┴Sem\-fontes┴/i,
							replace: '$1sfontes',
							num: 1
						}, {
							name: 'Sem-fontes-bpv',
							find: /(\{\{Multitag\|[^{}\n]*)┴Sem\-fontes\-bpv┴/i,
							replace: '$1sfontes-bpv',
							num: 1
						}, {
							name: 'Sem interwiki',
							find: /(\{\{Multitag\|[^{}\n]*)┴Sem interwiki┴/i,
							replace: '$1iw',
							num: 1
						}, {
							name: 'Sem notas',
							find: /(\{\{Multitag\|[^{}\n]*)┴Sem notas┴/i,
							replace: '$1snot',
							num: 1
						}, {
							name: 'Wikificação',
							find: /(\{\{Multitag\|[^{}\n]*)┴Wikificação┴/i,
							replace: '$1wkf',
							num: 1
						}]
					}, {
						name: 'Desmarca',
						find: /┴/i,
						replace: '',
						num: 1
					}]
				}, {
					name: 'Datar',
					find: /(\{\{Multitag[^\n]*)(\}\}\r?\n)/i,
					replace: '$1|data={{subst:CURRENTMONTHNAME}} de {{subst:CURRENTYEAR}}$2',
					num: 1,
					ifhas: /\{\{Multitag/i,
					ifnot: /\{\{Multitag[^\n]*\| *data *=/i
				}, {
					name: 'Rule',
					find: /(\{\{Multitag[^\n]*\|) *\|/i,
					replace: '$1',
					num: 10
				}]
			}]
		}, {
			name: 'Infobox',
			find: '',
			replace: '',
			num: 1,
			sub: [{
				name: 'padroniza campos',
				find: '',
				replace: '',
				num: 1,
				sub: [{
					name: 'nascimento_cidade',
					find: /(\{\{Info\/[^╣]*\| *)cidadenatal( *=)/i,
					replace: '$1nascimento_cidade$2',
					num: 1
				}, {
					name: 'nascimento_país',
					find: /(\{\{Info\/[^╣]*\| *)pa[ií]snatal( *=)/i,
					replace: '$1nascimento_país$2',
					num: 1
				}]
			}, {
				name: 'ajuste campos',
				find: '',
				replace: '',
				num: 1,
				sub: [{
					name: 'Rule',
					find: /(\| *imagem *= *\r?\n *\| *imagem_tamanho *= *)[^ \r\n]+\r?\n/i,
					replace: '$1\n',
					num: 1
				}]
			}]
		}]
	}, {
		name: 'Parte cen',
		find: '',
		replace: '',
		num: 1,
		sub: [{
			name: 'Acessibilidade',
			find: '',
			replace: '',
			num: 1,
			sub: [{
				name: 'font color para dentro do link',
				find: /<font color="#?([a-z0-9]*)">\[\[([^\[\]\n]*)\]\]<\/font>/,
				replace: '[[&lt;span style="color:#$1;"&gt;$2&lt;/span&gt;]]',
				num: 1
			}]
		}, {
			name: 'Tabelas',
			find: '',
			replace: '',
			num: 1,
			ifhas: '{|',
			sub: [{
				name: '<small> em tabela',
				find: '',
				replace: '',
				num: 1,
				sub: [{
					name: 'Marca <small>',
					find: /<small>/i,
					replace: '┼',
					num: 1
				}, {
					name: 'Marca </small>',
					find: /<\/small>/i,
					replace: '┤',
					num: 1
				}, {
					name: '<small> em tabela',
					find: /(\n[\|!].*┼[^┤\n]*)\n/,
					replace: '$1┤\n',
					num: 2
				}, {
					name: 'Desmarca <small>',
					find: '┼',
					replace: '&lt;small&gt;',
					num: 1
				}, {
					name: 'Desmarca </small>',
					find: '┤',
					replace: '&lt;/small&gt;',
					num: 1
				}]
			}, {
				name: 'ajustes na tabela',
				find: '',
				replace: '',
				num: 1,
				sub: [{
					name: 'rowspan=1',
					find: /([ \|\!])(?:row|col)span *= *" *1 *"/i,
					replace: '$1',
					num: 1
				}, {
					name: '-moz-border-radius',
					find: /\-moz\-border\-radius:[1-9]px;/i,
					replace: '',
					num: 1
				}, {
					name: '- na célula',
					find: /(\n[\!\|][^\!\|\n]+[\!\|])\-/i,
					replace: '$1 -',
					num: 1
				}, {
					name: 'Rule',
					find: /(\n[\!\|])\|/i,
					replace: '$1',
					num: 1
				}, {
					name: '|- \n |}',
					find: /\|\-\r?\n\|\}/i,
					replace: '|}',
					num: 1
				}]
			}, {
				name: 'style',
				find: '',
				replace: '',
				num: 1,
				sub: [{
					name: 'div style',
					find: ' div style',
					replace: ' style',
					num: 1
				}, {
					name: 'style sem "',
					find: /(style *=) *([^ ":]*: *[^ ";\r\n\|]*)([ ;\r\n])/i,
					replace: '$1"$2"$3',
					num: 1
				}, {
					name: 'argumentos style',
					find: '',
					replace: '',
					num: 1,
					sub: [{
						name: 'bgcolor',
						find: /((?:\n *[!\|]| \|\|) *[^\|\n]*)(?:bgcolor|background)="?([^ "\|\r\n]*)"?([ \|\r\n])/i,
						replace: '$1style="background-color:$2;"$3',
						num: 1
					}, {
						name: 'width',
						find: /((?:\n *[!\|]| \|\|) *[^\|\n]*)width *= *"?([0-9]+%)"?([ \|\r\n])/i,
						replace: '$1style="width:$2;"$3',
						num: 1
					}, {
						name: 'valign',
						find: /((?:\n *[!\|]| \|\|) *[^\|\n]*)valign="?([^";\n]*)"?([ \|\r\n])/i,
						replace: '$1style="vertical-align:$2;"$3',
						num: 1
					}, {
						name: 'align',
						find: /((?:\n *[!\|]|\|\|) *[^\|\n]*)align="?(left|center|right)"?([ \|\r\n])/,
						replace: '$1style="text-align:$2;"$3',
						num: 100
					}, {
						name: '!style="text-align:center;"|',
						find: '',
						replace: '',
						num: 1,
						sub: [{
							name: 'marca align left',
							find: /(text\-align:center)/i,
							replace: '└$1',
							num: 1
						}, {
							name: '!style="text-align:center;"|',
							find: /((?:\|\-[^└\n]*|\{\|.*)(?:\n[\|\!][^\-].*)*\n! *style="[^"\|\n]*)└text\-align:center;([^"\|\n]*")/,
							replace: '$1$2',
							num: 100
						}, {
							name: 'Rule',
							find: '└',
							replace: '',
							num: 1
						}]
					}, {
						name: 'font color',
						find: '',
						replace: '',
						num: 1,
						sub: [{
							name: '<font ... <font>[[xxx]</font>',
							find: /(<font color="?(#?[a-z0-9]*)"?>[^<>]*)<font color="?\2"?>\[\[([^\[\]\|\n]*\|)?([^\[\]\|\n]*)\]\]<\/font>/i,
							replace: '$1[[$3&lt;span style="color:$2;"&gt;$4&lt;/span&gt;]]',
							num: 1
						}, {
							name: 'marca /font',
							find: '&lt;/font&gt;',
							replace: '┼',
							num: 1
						}, {
							name: 'Rule',
							find: /(<font ([^<>\n]*)>[^<>┼\[\]\n]*)<font \2>/,
							replace: '$1',
							num: 1
						}, {
							name: 'marca fim de célula com ref',
							find: /( *(?:\{\{nota de rodapé\|[^\}\n]+\}\}|<ref>[^<>\n]*<\/ref>|<ref name=[^<>\n]*>)+\r?\n)/i,
							replace: '┘$1',
							num: 1
						}, {
							name: 'fechando fonte',
							find: /(<font [^<>┼\n]*>[^┼<>\n]*)(\r?[\n┘])/i,
							replace: '$1┼$2',
							num: 1
						}, {
							name: 'font com link dentro',
							find: /(<font color= *"?([^"<> ┼\n]*)"?>[^\[\]\n┼]*\[\[)([^<>\[\]]*)(\]\].*┼)/i,
							replace: '$1&lt;span style="color:$2;"&gt;$3&lt;/span&gt;$4',
							num: 1
						}, {
							name: 'mais de um span/font da célula',
							find: /\| *(\[\[(?:[^\|\[\]]*\|)?<span style="color:(#?[a-z0-9]*);">[^<>\]\n]*<\/span>\]\](?:(?: *(?:<br \/> *)*(?:\[\[(?:[^\|\[\]]*\|)?<span style="color:\2;">[^<>\]\n]*<\/span&gt;\]\]|&lt;font color="?\2"?&gt;[^&lt;&gt;\n┼]*┼))+))( *\r?[\n┘])/i,
							replace: '| style="color:$2;"|$1$3',
							num: 1
						}, {
							name: 'mais de um font/span da célula',
							find: /\| *(<font color *= *"?(#?[a-z0-9]*)"?>[^<>\n┼\[]*(?:┼|\[)(?:(?: *(?:\[*(?:[^\|\[\]]*\|)?<span style="color: *\2;">[^<>\]\n]*<\/span>\]\]|<font color="?\2"?>[^<&gt;\n┼]*┼))+))( *\r?[\n┘])/i,
							replace: '| style="color:$2;"|$1$3',
							num: 1
						}, {
							name: 'fonte em toda a célula',
							find: /\| *<font color="?(#?[a-z0-9]{3,6})"?>([^\n┼]*)┼?( *\r?[\n┘])/i,
							replace: '| style="color:$1;"|$2$3',
							num: 10
						}, {
							name: 'span em toda a célula (apenas 1 link)',
							find: /\|( *\[\[(?:[^\|\]\n]+\|)?<span style="color:(#?[a-z0-9]*);">[^<>\[\]\n]*<\/span>\]\])( *\r?[\n┘])/i,
							replace: '| style="color:$2;"|$1$3',
							num: 1
						}, {
							name: 'remove fonte = célula',
							find: /(style=[^\|\n]*[^\-]color:(#?[a-z0-9]*);"\| *)<font color="\2">([^┼\n]*)┼/i,
							replace: '$1$3',
							num: 1
						}, {
							name: 'desmarca fim de célula com ref',
							find: '┘',
							replace: '',
							num: 1
						}, {
							name: 'desmarca /font',
							find: '┼',
							replace: '&lt;/font&gt;',
							num: 1
						}]
					}]
				}, {
					name: 'arrumando style',
					find: '',
					replace: '',
					num: 1,
					ifhas: /style/i,
					sub: [{
						name: 'Rule',
						find: /(\n[\|\!][^\|\!\n]*)[\|\!] *(style *= *"[^\!\n]*")([\|\!])/i,
						replace: '$1 $2$3',
						num: 1
					}, {
						name: 'junta os styles',
						find: /(style="[^"\|\n]*)"([^\|\n]*)style="([^"\|\n]*)"/i,
						replace: '$1 $3"$2',
						num: 10
					}]
				}, {
					name: 'style color para links',
					find: '',
					replace: '',
					num: 1,
					ifhas: /style/i,
					sub: [{
						name: 'marca newline tab',
						find: /(\n)([\|!]\-)/i,
						replace: '$1└$2',
						num: 1
					}, {
						name: 'style na linha',
						find: /(\|\-style[^\n\|]*[^\-]color:(#?[a-f0-6]*);"[^└]*\n[!\|](?:[^\[{<\]\|]*\|)? *[^\|\n<{]*)\[\[([^\[\]<\n]+)\]\]/i,
						replace: '$1[[&lt;span style="color:$2;"&gt;$3&lt;/span&gt;]]',
						num: 1
					}, {
						name: 'style na célula',
						find: /(\n[\!\|][^\|\n]*style[^\|\n]*[^\-]color:(#?[a-z0-6]*);[^\|\n]*\|[^<\{\n]*)\[\[([^\[\]<\n]*)\]\]/i,
						replace: '$1[[&lt;span style="color:$2;"&gt;$3&lt;/span&gt;]]',
						num: 10
					}, {
						name: 'arruma o span c/ pipelink',
						find: /\[\[(<span[^>\n]*>)([^\|\[\]]*)\|([^\|\[\]]*<\/span>)\]\]/,
						replace: '[[$2|$1$3]]',
						num: 1
					}, {
						name: 'arruma o span s/ pipelink',
						find: /\[\[(<span[^>\n]*>)([^\|\[\]]*)(<\/span>)\]\]/i,
						replace: '[[$2|$1$2$3]]',
						num: 1
					}, {
						name: 'desmarca newline tab',
						find: '└',
						replace: '',
						num: 1
					}]
				}, {
					name: 'arruma # na cor',
					find: '',
					replace: '',
					num: 1,
					ifhas: 'color', // FIXME: /color/i ?
					sub: [{
						name: 'arruma cor em style - # add',
						find: /(style=".*color:)([0-9a-f]+[";>])/i,
						replace: '$1#$2',
						num: 10
					}, {
						name: 'arruma cor em style - # remove',
						find: /(style=".*color:)#([^g-z;]*[g-z]+[^g-z;]*;)/i,
						replace: '$1$2',
						num: 10
					}, {
						name: 'arruma cor em font - # add',
						find: /(<font.*color *= *)([0-9a-f]+[ >])/i,
						replace: '$1#$2',
						num: 10
					}, {
						name: 'arruma cor em font - # remove',
						find: /(<font.*color *= *)#([^g-z> ]*[g-z]+[^g-z> ]*[> ])/,
						replace: '',
						num: 10
					}]
				}]
			}, {
				name: 'Cabeçalho',
				find: '',
				replace: '',
				num: 1,
				sub: [{
					name: 'Cabeçalho indevido',
					find: /(\|\-.*\n\|[^\-].*[^\r\n ]\r?\n(?:\|[^\-].*\n)*)\!/i,
					replace: '$1|',
					num: 100
				}, {
					name: '! \'\'\'xxx\'\'\'',
					find: /(\n! *(?:[^\|\n]*\|)? *)'''([^\'\n]+)'''(\r?\n)/i,
					replace: '$1$2$3',
					num: 2
				}, {
					name: 'wikitable cabeçalho com background cel',
					find: /(\{\|.*class *= *"wikitable.*\n(?:[\|\!][^}].*\n)*![^\|\n]*)background-color *: *[^\;\|\n]*;/i,
					replace: '$1',
					num: 100
				}, {
					name: 'wikitable cabeçalho com background lin',
					find: /(\{\|.*class *= *"wikitable.*\n(?:[\|\!][^}].*\n)*\|\-.*)background\-color *:[^;"\n]*[;"](.*\n(?:\!.*\n)+\|\-)/i,
					replace: '$1$2',
					num: 1
				}]
			}, {
				name: 'formatando tabela',
				find: '',
				replace: '',
				num: 1,
				ifhas: /(style|<center)/i,
				sub: [{
					name: 'style para a linha toda',
					find: '',
					replace: '',
					num: 1,
					sub: [{
						name: 'marca 2 cel em 1 linha',
						find: '||',
						replace: '┼||',
						num: 1
					}, {
						name: 'style para a linha toda - genérico',
						find: /(\|\-[^┼┌\n]*)(\r?\n[\|\!][^\-][^┼\n]*tyle="[^"\n]*(background\-color|text\-align|font\-size) *: *([^;"\|\n]*)[;"][^┼\n]*(?:\r?\n|┬\|)(?:[\|\!][^\-][^┼\n]*tyle="[^"\n]*\3 *: *\4[;"][^┼\n]*(?:\r?\n|┼\|))*\|[\-}])/i,
						replace: '$1 ┌style="$3:$4;"$2',
						num: 100
					}, {
						name: 'text-align:xxx; na linha toda',
						find: /(\|\-[^┌\n]*)(\r?\n[\|\!][^┼\-][^\|\n]*(center)[";>].*(?:\r?\n|┼\|)(?:([\|\!][^\-].*(?:\3)[";>].*(?:\r?\n|┼\|))+)\|[\-}])/i,
						replace: '$1 ┌style="text-align:center;"$2',
						num: 100
					}, {
						name: 'marca alinhamento linha',
						find: /(\|\-.*)(text\-align:center;)/i,
						replace: '$1┬$2',
						num: 1
					}, {
						name: 'linha center com cel inicial left',
						find: /(\|\-[^┌┬\n]*)(\n\|)([^┼\n]*)(?:┼\|\||\n\|)((?:[^┼\n]*text-align:center;[^┼\n]*(?:┼\|\||\n\|))*\-)/i,
						replace: '$1┌style="text-align:center;"$2style="text-align:left;"|$3\n|$4',
						num: 2
					}, {
						name: 'desmarca',
						find: /[┌┬┼]/i,
						replace: '',
						num: 1
					}]
				}, {
					name: 'style na linha e célula',
					find: '',
					replace: '',
					num: 1,
					ifhas: /\|\-.*style= *"/i,
					sub: [{
						name: 'marca 2 cel em 1 linha',
						find: '||',
						replace: '┬||',
						num: 1
					}, {
						name: 'genérico',
						find: /(\|\-.*style="[^"\n]*((?:background\-color|text\-align)) *: *([^"\n;]*[";]).*(?:(?:\r?\n|┬|)[\|\!][^\-\}\n].*)*(?:\r?\n|┬|)[\|\!][^\-\n][^\|\!\n]*tyle *= *"[^"\|\!\n]*)\2 *: *\3/i,
						replace: '$1',
						num: 100
					}, {
						name: '<center> nas células',
						find: /(\|\-.*style="[^"\n]*text-align:center;.*\n(?:[\|\!][^\-\}].*(?:\r?\n|┬\|))*[\|\!][^\-\}](?:[^\|\!\n]*[\|\!]<)?)\/?center>([^<>\n]*)(?:<\/center>)?(?:\r?\n|┬\|)/i,
						replace: '$1└$2\n',
						num: 100,
						sub: [{
							name: 'Rule',
							find: '&lt;└',
							replace: '',
							num: 1
						}]
					}, {
						name: 'desmarca',
						find: '┬',
						replace: '',
						num: 1
					}]
				}, {
					name: 'style para a tabela toda',
					find: '',
					replace: '',
					num: 1,
					ifhas: /\|\-.*style=/i,
					sub: [{
						name: 'text-align:center',
						find: '',
						replace: '',
						num: 1,
						ifhas: 'text-align:center', // FIXME: /text-align:center/i ?
						sub: [{
							name: 'marca 2 cel em 1 linha',
							find: '||',
							replace: '┬||',
							num: 1
						}, {
							name: 'marca linha cabeçalho',
							find: /(\-.*\r?\n(?:![^┬\n]*\n)+\|\-)/i,
							replace: '┌$1',
							num: 1
						}, {
							name: 'center para tabela',
							find: /(\{\|.*)(\r?\n(?:(?:!.*|┌.*|\|\- *style="text\-align:center;".*|\|[^\-\}].*)\n)+\|\})/,
							replace: '$1 style="text-align:center;"$2',
							num: 1
						}, {
							name: 'desmarca',
							find: /[┌┬]/i,
							replace: '',
							num: 1
						}]
					}]
				}, {
					name: 'style na tabela e linha',
					find: '',
					replace: '',
					num: 1,
					ifhas: /\|\-.*style=/i,
					sub: [{
						name: 'genérico',
						find: /(\{\|.*style *= *"[^"\n]*(background\-color|text\-align) *: *([^"\;\n]*)[;"].*\n(?:[!\|][^\}].*\n)*\|\-.*style *= *"[^"\n]*)\2 *: *\3/i,
						replace: '$1',
						num: 100
					}]
				}, {
					name: 'style desnecessário',
					find: '',
					replace: '',
					num: 1,
					sub: [{
						name: 'text-align:left',
						find: '',
						replace: '',
						num: 1,
						ifhas: /text\-align *: *left/i,
						sub: [{
							name: 'marca text-align',
							find: /(text\-align)/i,
							replace: '└$1',
							num: 1
						}, {
							name: 'marca fim tabela',
							find: /\n\|\}/i,
							replace: '\n┴|}',
							num: 1
						}, {
							name: 'tabela e linha limpa',
							find: /(\{\|[^└\n]*\n[^┴]*\|\-[^└\n]*\n(?:[\|\!][^\-\}].*\n)*\|[^└\n]*)└text\-align *: *left/i,
							replace: '$1',
							num: 100
						}, {
							name: 'desmarca',
							find: /[└┴]/i,
							replace: '',
							num: 1
						}]
					}]
				}, {
					name: 'arruma style',
					find: '',
					replace: '',
					num: 1,
					sub: [{
						name: 'Rule',
						find: /(style) *= *" /i,
						replace: '="',
						num: 1
					}, {
						name: 'arruma style 1',
						find: /([\|\!]) *style=";? *" *[\|\!]/i,
						replace: '$1',
						num: 1
					}, {
						name: 'arruma style 2',
						find: /style=";? *"/,
						replace: '',
						num: 1
					}, {
						name: 'junta os styles',
						find: /(style="[^"\|\n]*)"[\| ]*style="/i,
						replace: '$1 ',
						num: 1
					}]
				}, {
					name: 'ajustes gerais',
					find: / \r?\n/i,
					replace: '\n',
					num: 3
				}]
			}]
		}, {
			name: 'Imagem',
			find: '',
			replace: '',
			num: 1,
			sub: [{
				enabled: false,
				name: 'Tamanho para imagens com thumb',
				find: /(╠[^\|▒]+\|[^0-9▒]*thumb)(\|[^0-9▒]*▒)/i,
				replace: '$1|180px$2',
				num: 1
			}]
		}, {
			name: '-link [[data]]',
			find: '',
			replace: '',
			num: 1,
			sub: [{
				name: '[[dia]] de [[mês]]',
				find: /\[\[([1-3]?[0-9])\]\] de \[?\[?((?:jan|fever)eiro|março|abril|maio|ju[nl]ho|agosto|(?:setem|outu|novem|dezem)bro)\]?\]?([^\]])/i,
				replace: '[[$1 de $2]]$3',
				num: 1
			}, {
				name: '-Link ([[ano]]) em listas',
				find: /(\n\*.*\()\[\[([0-9]{4,4})\]\]( *[\/\)])/i,
				replace: '$1$2$3',
				num: 1
			}, {
				name: 'Em seções',
				find: /(║==+ (?:Estatísticas) ==+[^║░]+)\[\[([0-3]?[0-9] de (?:(?:jan|fever)eiro|março|abril|maio|ju[nl]ho|agosto|(?:setem|outu|novem|dezem)bro)|[1-2][0-9]{3,3})\]\]/i,
				replace: '$1$2',
				num: 100
			}, {
				name: '== [[ano]] ==',
				find: /(=+= )\[\[([1-2][0-9]{3,3})\]\]( =+=)/i,
				replace: '$1$2$3',
				num: 1
			}, {
				name: 'última atualização',
				find: /(Última atualização *: *)\[\[([1-2]?[0-9] de (?:(?:jan|fever)eiro|março|abril|maio|ju[nl]ho|agosto|(?:setem|outu|novem|dezem)bro))\]\] de \[\[([1-2][0-9]{3,3})\]\]/i,
				replace: '$1$2 de $3',
				num: 1
			}]
		}]
	}, {
		name: 'Parte REF VT LE',
		find: '',
		replace: '',
		num: 1,
		sub: [{
			name: 'Marca',
			find: '',
			replace: '',
			num: 1,
			sub: [{
				name: 'Marcando </ref>',
				find: /<\/ref>/,
				replace: '┼',
				num: 1
			}, {
				name: 'Marcando ] 1',
				find: /([^\]])\]\]\]([^\]])/,
				replace: '$1]]├$2',
				num: 1
			}, {
				name: 'Marcando ] 2',
				find: /([^\]])\]([^\]])/,
				replace: '$1├$2',
				num: 1
			}]
		}, {
			name: 'Bibliografia',
			find: '',
			replace: '',
			num: 1,
			sub: [{
				name: '-link ano',
				find: /(║==+ (?:Bibliografia) ==+[^║░]*)\[\[([1-2][0-9]{3,3})\]\]/i,
				replace: '$1$2',
				num: 100
			}]
		}, {
			name: 'Formatando refs',
			find: '',
			replace: '',
			num: 1,
			ifhas: '{{Citar', // FIXME: /\{\{Citar/i ?
			sub: [{
				name: 'traduz citar',
				find: '',
				replace: '',
				num: 1,
				ifhas: /\{\{(Cit[ae]|Lien) /i,
				sub: [{
					name: 'traduzir para {{citar livro}}',
					find: '',
					replace: '',
					num: 1,
					ifhas: '{{Cita libro', // FIXME: /\{\{Cita libro/i ?
					sub: [{
						name: 'Marca início',
						find: /\{\{(?:Cita libro|Cite book) *(\||\r?\n|╔)/i,
						replace: '┌$1',
						num: 1
					}, {
						name: 'Marca final',
						find: /(┌[^{}┘]*)\}\}/i,
						replace: '$1┘}}',
						num: 1
					}, {
						name: 'Substitui campos',
						find: '',
						replace: '',
						num: 1,
						sub: [{
							name: 'ano',
							find: /(┌[^┌┘]*\| *)(?:año|year|month|date|data)( *=[^┌┘]*┘)/i,
							replace: '$1ano$2',
							num: 1
						}, {
							name: 'título',
							find: /(┌[^┌┘]*\| *)title( *=[^┌┘]*┘)/i,
							replace: '$1título$2',
							num: 1
						}, {
							name: 'url',
							find: /(┌[^┌┘]*\| *)urlcapítulo( *=[^┌┘]*┘)/i,
							replace: '$1url$2',
							num: 1
						}, {
							name: 'autor',
							find: /(┌[^┌┘]*\| *)(?:apellidos|coautores|author)( *=[^┌┘]*┘)/i,
							replace: '$1autor$2',
							num: 1
						}, {
							name: 'sobrenome',
							find: /(┌[^┌┘]*\| *)(?:cognome|last)( *=[^┌┘]*┘)/i,
							replace: '$1sobrenome$2',
							num: 1
						}, {
							name: 'nome',
							find: /(┌[^┌┘]*\| *)(?:nombre|first)( *=[^┌┘]*┘)/i,
							replace: '$1nome$2',
							num: 1
						}, {
							name: 'linkautor',
							find: /(┌[^┌┘]*\| *)enlaceautor( *=[^┌┘]*┘)/i,
							replace: '$1linkautor$2',
							num: 1
						}, {
							name: 'idioma',
							find: /(┌[^┌┘]*\| *)language( *=[^┌┘]*┘)/i,
							replace: '$1idioma$2',
							num: 1
						}, {
							name: 'edição',
							find: /(┌[^┌┘]*\| *)edition( *=[^┌┘]*┘)/i,
							replace: '$1edição$2',
							num: 1
						}, {
							name: 'local',
							find: /(┌[^┌┘]*\| *)location( *=[^┌┘]*┘)/i,
							replace: '$1local$2',
							num: 1
						}, {
							name: 'editora',
							find: /(┌[^┌┘]*\| *)(?:editor|publisher)( *=[^┌┘]*┘)\n/i,
							replace: '$1editora$2',
							num: 1
						}, {
							name: 'páginas',
							find: /(┌[^┌┘]*\| *)pages( *=[^┌┘]*┘)\n/i,
							replace: '$1páginas$2',
							num: 1
						}]
					}, {
						name: 'Desmarca final',
						find: '┘',
						replace: '',
						num: 1
					}, {
						name: 'Desmarca início',
						find: '┌',
						replace: '{{citar livro',
						num: 1
					}]
				}, {
					name: 'traduzir para {{citar periódico}}',
					find: '',
					replace: '',
					num: 1,
					ifhas: '{{Cite journal', // FIXME: /\{\{Cite journal/i ?
					sub: [{
						name: 'Marca início',
						find: /\{\{Cite journal *(\||\r?\n|╔)/i,
						replace: '┌$1',
						num: 1
					}, {
						name: 'Marca final',
						find: /(┌[^{}┘]*)\}\}/i,
						replace: '$1┘}}',
						num: 1
					}, {
						name: 'Substitui campos',
						find: '',
						replace: '',
						num: 1,
						sub: [{
							name: 'ultimo',
							find: /(┌[^┌┘]*\| *)last( *=[^┌┘]*┘)/i,
							replace: '$1ultimo$2',
							num: 1
						}, {
							name: 'primeiro',
							find: /(┌[^┌┘]*\| *)first( *=[^┌┘]*┘)/i,
							replace: '$1primeiro$2',
							num: 1
						}, {
							name: 'autorlink',
							find: /(┌[^┌┘]*\| *)authorlink( *=[^┌┘]*┘)/i,
							replace: '$1autorlink$2',
							num: 1
						}, {
							name: 'coautores',
							find: /(┌[^┌┘]*\| *)coauthors( *=[^┌┘]*┘)/i,
							replace: '$1coautores$2',
							num: 1
						}, {
							name: 'data',
							find: /(┌[^┌┘]*\| *)date( *=[^┌┘]*┘)/i,
							replace: '$1data$2',
							num: 1
						}, {
							name: 'ano',
							find: /(┌[^┌┘]*\| *)year( *=[^┌┘]*┘)/i,
							replace: '$1ano$2',
							num: 1
						}, {
							name: 'mes',
							find: /(┌[^┌┘]*\| *)month( *=[^┌┘]*┘)/i,
							replace: '$1mes$2',
							num: 1
						}, {
							name: 'titulo',
							find: /(┌[^┌┘]*\| *)title( *=[^┌┘]*┘)/i,
							replace: '$1titulo$2',
							num: 1
						}, {
							name: 'jornal',
							find: /(┌[^┌┘]*\| *)journal( *=[^┌┘]*┘)/i,
							replace: '$1jornal$2',
							num: 1
						}, {
							name: 'numero',
							find: /(┌[^┌┘]*\| *)issue( *=[^┌┘]*┘)/i,
							replace: '$1numero$2',
							num: 1
						}, {
							name: 'paginas',
							find: /(┌[^┌┘]*\| *)pages( *=[^┌┘]*┘)/i,
							replace: '$1paginas$2',
							num: 1
						}, {
							name: 'editora',
							find: /(┌[^┌┘]*\| *)publisher( *=[^┌┘]*┘)/i,
							replace: '$1editora$2',
							num: 1
						}, {
							name: 'local',
							find: /(┌[^┌┘]*\| *)location( *=[^┌┘]*┘)/i,
							replace: '$1local$2',
							num: 1
						}, {
							name: 'idioma',
							find: /(┌[^┌┘]*\| *)language( *=[^┌┘]*┘)/i,
							replace: '$1idioma$2',
							num: 1
						}, {
							name: 'formato',
							find: /(┌[^┌┘]*\| *)format( *=[^┌┘]*┘)/i,
							replace: '$1formato$2',
							num: 1
						}, {
							name: 'accessadoem',
							find: /(┌[^┌┘]*\| *)accessdate( *=[^┌┘]*┘)/i,
							replace: '$1accessadoem$2',
							num: 1
						}, {
							name: 'aspas',
							find: /(┌[^┌┘]*\| *)quotes( *=[^┌┘]*┘)/i,
							replace: '$1aspas$2',
							num: 1
						}, {
							name: 'autor',
							find: /(┌[^┌┘]*\| *)author( *=[^┌┘]*┘)/i,
							replace: '$1autor$2',
							num: 1
						}]
					}, {
						name: 'Desmarca final',
						find: '┘',
						replace: '',
						num: 1
					}, {
						name: 'Desmarca início',
						find: '┌',
						replace: '{{citar periódico',
						num: 1
					}]
				}, {
					name: 'traduzir para {{citar web}}',
					find: '',
					replace: '',
					num: 1,
					ifhas: '{{Lien web', // FIXME: /\{\{Lien web/i ?
					sub: [{
						name: 'Marca início',
						find: /\{\{Lien web *(\||\r?\n|╔)/i,
						replace: '$1┘}}',
						num: 1
					}, {
						name: 'Marca final',
						find: /(┌[^{}┘]*)\}\}/i,
						replace: '$1┘}}',
						num: 1
					}, {
						name: 'Substitui campos',
						find: '',
						replace: '',
						num: 1,
						sub: [{
							name: 'titulo',
							find: /(┌[^┌┘]*\| *)titre( *=[^┌┘]*┘)/i,
							replace: '$1titulo$2',
							num: 1
						}, {
							name: 'acessodata',
							find: /(┌[^┌┘]*\| *)consulté le( *=[^┌┘]*┘)/i,
							replace: '$1acessodata$2',
							num: 1
						}, {
							name: 'autor',
							find: /(┌[^┌┘]*\| *)auteur( *=[^┌┘]*┘)/i,
							replace: '$1autor$2',
							num: 1
						}, {
							name: 'autorlink',
							find: /(┌[^┌┘]*\| *)lien auteur( *=[^┌┘]*┘)/i,
							replace: '$1autorlink$2',
							num: 1
						}, {
							name: 'coautores',
							find: /(┌[^┌┘]*\| *)coauteurs( *=[^┌┘]*┘)/i,
							replace: '$1coautores$2',
							num: 1
						}, {
							name: 'data',
							find: /(┌[^┌┘]*\| *)date( *=[^┌┘]*┘)/i,
							replace: '$1date$2',
							num: 1
						}, {
							name: 'ano',
							find: /(┌[^┌┘]*\| *)année( *=[^┌┘]*┘)/i,
							replace: '$1ano$2',
							num: 1
						}, {
							name: 'mes',
							find: /(┌[^┌┘]*\| *)mois( *=[^┌┘]*┘)/i,
							replace: '$1mes$2',
							num: 1
						}, {
							name: 'publicado',
							find: /(┌[^┌┘]*\| *)site( *=[^┌┘]*┘)/i,
							replace: '$1publicado$2',
							num: 1
						}]
					}, {
						name: 'Desmarca final',
						find: '┘',
						replace: '',
						num: 1
					}, {
						name: 'Desmarca início',
						find: '┌',
						replace: '{{citar web',
						num: 1
					}]
				}, {
					name: 'traduzir para {{citar vídeo}}',
					find: '',
					replace: '',
					num: 1,
					ifhas: '{{Cite video', // FIXME: /\{\{Cite video/i ?
					sub: [{
						name: 'Marca início',
						find: /\{\{Cite video *(\||\r?\n|╔)/i,
						replace: '┌$1',
						num: 1
					}, {
						name: 'Marca final',
						find: /(┌[^{}┘]*)\}\}/i,
						replace: '$1┘}}',
						num: 1
					}, {
						name: 'Substitui campos',
						find: ' |pessoas        = {{{people|}}}\n' + ' |data2          = {{{date2|}}}\n' + ' |mês2           = {{{month2|}}}\n' + ' |ano2           = {{{year2|}}}\n' + ' |título         = {{{title|}}}\n' + ' |formato        = {{{format|}}}\n' + ' |tipo           = {{{medium|}}}\n' + ' |publicado por  = {{{publisher|}}}\n' + ' |localização    = {{{location|}}}\n' + ' |data de acesso = {{{accessdate|}}}\n' + ' |mês de acesso  = {{{accessmonth|}}}\n' + ' |ano de acesso  = {{{accessyear|}}}\n' + ' |hora           = {{{time|}}}\n' + ' |citação        = {{{quote|}}}',
						replace: '',
						num: 1,
						sub: [{
							name: 'pessoas',
							find: /(┌[^┌┘]*\| *)last( *=[^┌┘]*┘)/i,
							replace: '$1pessoas$2',
							num: 1
						}, {
							name: 'data2',
							find: /(┌[^┌┘]*\| *)last( *=[^┌┘]*┘)/i,
							replace: '$1data2$2',
							num: 1
						}, {
							name: 'mês2',
							find: /(┌[^┌┘]*\| *)last( *=[^┌┘]*┘)/i,
							replace: '$1mês2$2',
							num: 1
						}, {
							name: 'ano2',
							find: /(┌[^┌┘]*\| *)last( *=[^┌┘]*┘)/i,
							replace: '$1ano2$2',
							num: 1
						}, {
							name: 'título',
							find: /(┌[^┌┘]*\| *)last( *=[^┌┘]*┘)/i,
							replace: '$1título$2',
							num: 1
						}, {
							name: 'formato',
							find: /(┌[^┌┘]*\| *)last( *=[^┌┘]*┘)/i,
							replace: '$1formato$2',
							num: 1
						}, {
							name: 'tipo',
							find: /(┌[^┌┘]*\| *)last( *=[^┌┘]*┘)/i,
							replace: '$1tipo$2',
							num: 1
						}, {
							name: 'publicado por',
							find: /(┌[^┌┘]*\| *)last( *=[^┌┘]*┘)/i,
							replace: '$1publicado por$2',
							num: 1
						}, {
							name: 'Rule',
							find: /(┌[^┌┘]*\| *)last( *=[^┌┘]*┘)/i,
							replace: '$1ultimo$2',
							num: 1
						}, {
							name: 'Rule',
							find: /(┌[^┌┘]*\| *)last( *=[^┌┘]*┘)/i,
							replace: '$1ultimo$2',
							num: 1
						}, {
							name: 'Rule',
							find: /(┌[^┌┘]*\| *)last( *=[^┌┘]*┘)/i,
							replace: '$1ultimo$2',
							num: 1
						}, {
							name: 'Rule',
							find: /(┌[^┌┘]*\| *)last( *=[^┌┘]*┘)/i,
							replace: '$1ultimo$2',
							num: 1
						}, {
							name: 'Rule',
							find: /(┌[^┌┘]*\| *)last( *=[^┌┘]*┘)/i,
							replace: '$1ultimo$2',
							num: 1
						}, {
							name: 'Rule',
							find: /(┌[^┌┘]*\| *)last( *=[^┌┘]*┘)/i,
							replace: '$1ultimo$2',
							num: 1
						}]
					}, {
						name: 'Desmarca final',
						find: '┘',
						replace: '',
						num: 1
					}, {
						name: 'Desmarca início',
						find: '┌',
						replace: '{{citar vídeo',
						num: 1
					}]
				}]
			}, {
				name: 'Marca todas citar',
				find: /\{\{(Citar (?:web|notícia|entrevista|periódico|vídeo|livro|enciclopédia))/i,
				replace: '{{┌$1',
				num: 1,
				sub: [{
					name: 'Marcando todas citar',
					find: '',
					replace: '',
					num: 1,
					sub: [{
						name: 'Marca |língua=',
						find: /(\{\{┌[^{}]*)\| *(?:l[ií]ngua|idioma) *=/i,
						replace: '$1┴=',
						num: 1
					}, {
						name: 'Marca |acessodata=',
						find: /(\{\{┌[^{}]*)\| *acessodata *=/i,
						replace: '$1└=',
						num: 1
					}, {
						name: 'Marca |data=',
						find: /(\{\{┌[^{}]*)\| *data *=/i,
						replace: '$1┘=',
						num: 1
					}, {
						name: 'Marca |arquivodata=',
						find: /(\{\{┌[^{}]*)\| *arquivodata *=/i,
						replace: '$1┤=',
						num: 1
					}, {
						name: 'Marca |título=',
						find: /(\{\{┌[^{}]*)\| *título *=/i,
						replace: '$1┐=',
						num: 1
					}]
				}]
			}, {
				name: 'Ajustes todas citar',
				find: '',
				replace: '',
				num: 1,
				sub: [{
					name: 'data',
					find: '',
					replace: '',
					num: 1,
					sub: [{
						name: '-link data',
						find: /(<ref[^<>\n]*>[^┼]*)\[\[([1-2][0-9]{3,3}|[1-3]?[0-9] de (?:(?:jan|fever)eiro|março|abril|maio|ju[nl]ho|agosto|(?:setem|outu|novem|dezem)bro))\]\]/i,
						replace: '$1$2',
						num: 100
					}, {
						name: 'traduzindo data 1st',
						find: /([└┘┤] *= *[^\|\}\n]*[0-9]+)(?:st|nd|rd)([^a-z])/i,
						replace: '$1$2',
						num: 1
					}, {
						name: 'data para pt',
						find: '',
						replace: '',
						num: 1,
						ifhas: /(?:[└┘┤]|\| *(?:accessdate|date|data|mês|month) *)/i,
						sub: [{
							name: 'data com mês',
							find: '',
							replace: '',
							num: 1,
							sub: [{
								name: 'janeiro',
								find: /((?:[└┘┤]|\| *(?:accessdate|date|data|mês|month) *)= *[0-9]* *(?:de )?)(?:January|Enero|Janvier|Gennaio|Jan)([^a-z])/i,
								replace: '$1janeiro$2',
								num: 100
							}, {
								name: 'fevereiro',
								find: /((?:[└┘┤]|\| *(?:accessdate|date|data|mês|month) *)= *[0-9]* *(?:de )?)(?:February|Febrero|Février|Febbraio|Fev)([^a-z])/i,
								replace: '$1fevereiro$2',
								num: 100
							}, {
								name: 'março',
								find: /((?:[└┘┤]|\| *(?:accessdate|date|data|mês|month) *)= *[0-9]* *(?:de )?)(?:March|Marzo|Mars|Mar)([^a-zç])/i,
								replace: '$1março$2',
								num: 100
							}, {
								name: 'abril',
								find: /((?:[└┘┤]|\| *(?:accessdate|date|data|mês|month) *)= *[0-9]* *(?:de )?)(?:A[pv]ril|Aprile|Abr|Apr)([^a-z])/i,
								replace: '$1abril$2',
								num: 100
							}, {
								name: 'maio',
								find: /((?:[└┘┤]|\| *(?:accessdate|date|data|mês|month) *)= *[0-9]* *(?:de )?)(?:Mayo?|Mai|Maggio)([^a-z])/i,
								replace: '$1maio$2',
								num: 100
							}, {
								name: 'junho',
								find: /((?:[└┘┤]|\| *(?:accessdate|date|data|mês|month) *)= *[0-9]* *(?:de )?)(?:June|Junio|Juin|Giugno|Jun)([^a-z])/i,
								replace: '$1junho$2',
								num: 100
							}, {
								name: 'julho',
								find: /((?:[└┘┤]|\| *(?:accessdate|date|data|mês|month) *)= *[0-9]* *(?:de )?)(?:July|Julio|Juillet|Luglio|Jul)([^a-z])/i,
								replace: '$1julho$2',
								num: 100
							}, {
								name: 'agosto',
								find: /((?:[└┘┤]|\| *(?:accessdate|date|data|mês|month) *)= *[0-9]* *(?:de )?)(?:August|Août|Ago|Aug)([^a-z])/i,
								replace: '$1agosto$2',
								num: 100
							}, {
								name: 'setembro',
								find: /((?:[└┘┤]|\| *(?:accessdate|date|data|mês|month) *)= *[0-9]* *(?:de )?)(?:Septi?ember|Se[pt]tembre|Sep|Set)([^a-z])/i,
								replace: '$1setembro$2',
								num: 100
							}, {
								name: 'outubro',
								find: /((?:[└┘┤]|\| *(?:accessdate|date|data|mês|month) *)= *[0-9]* *(?:de )?)(?:October|Oct[ou]bre|Ottobre|Out|Oct)([^a-z])/i,
								replace: '$1outubro$2',
								num: 100
							}, {
								name: 'novembro',
								find: /((?:[└┘┤]|\| *(?:accessdate|date|data|mês|month) *)= *[0-9]* *(?:de )?)(?:November|Novi?embre|Nov)([^a-z])/i,
								replace: '$1novembro$2',
								num: 100
							}, {
								name: 'dezembro',
								find: /((?:[└┘┤]|\| *(?:accessdate|date|data|mês|month) *)= *[0-9]* *(?:de )?)(?:D[eé]cember|Dici?embre|Dez|Dec)([^a-z])/i,
								replace: '$1dezembro$2',
								num: 100
							}, {
								name: 'Arrumando',
								find: /([└┘┤]=|\| *(?:accessdate|date|data) *= *)([^ \|\n\}\/\-└=]+) ([1-3]?[0-9]) *.? *([1-2][0-9]{3,3})/i,
								replace: '$1$3 de $2 de $4',
								num: 1
							}]
						}, {
							name: 'data com numero',
							find: '',
							replace: '',
							num: 100,
							sub: [{
								name: 'mm-dd-aaaa',
								find: /([└┘┤]|\| *(?:accessdate|date|data|mês|month) *= *)([0-1]?[0-9]).(1[3-9]|[2-3][0-9]).([1-2][0-9]{3,3})/i,
								replace: '$1$3/$2/$4',
								num: 100
							}, {
								name: 'dd-mm-aaaa',
								find: /([└┘┤]|\| *(?:accessdate|date|data|mês|month) *= *)(1[3-9]|[2-3][0-9]).([0-1]?[0-9]).([1-2][0-9]{3,3})/i,
								replace: '$1$2/$3/$4',
								num: 100
							}, {
								name: 'aaaa-dd-mm',
								find: /([└┘┤]|\| *(?:accessdate|date|data|mês|month) *= *)([1-2][0-9]{3,3}).(1[3-9]|[2-3][0-9]).([0-1]?[0-9])/i,
								replace: '$1$3/$4/$2',
								num: 100
							}, {
								name: 'aaaa-mm-dd',
								find: /([└┘┤]|\| *(?:accessdate|date|data|mês|month) *= *)([1-2][0-9]{3,3}).([0-1]?[0-9]).(1[3-9]|[2-3][0-9])/i,
								replace: '$1$4/$3/$2',
								num: 100
							}]
						}, {
							name: 'data para mês',
							find: '',
							replace: '',
							num: 100,
							ifhas: /((?:[└┘┤]|\| *(?:accessdate|date|data|mês|month) *= *)1[3-9]|[2-3][0-9])\/[0-1]?[0-9]\/([1-2][0-9]{3,3})/i,
							sub: [{
								name: 'janeiro',
								find: /((?:[└┘┤]|\| *(?:accessdate|date|data|mês|month) *= *)(?:1[3-9]|[2-3][0-9]))\/0?1\/([1-2][0-9]{3,3})/i,
								replace: '$1 de janeiro de $2',
								num: 1
							}, {
								name: 'fevereiro',
								find: /((?:[└┘┤]|\| *(?:accessdate|date|data|mês|month) *= *)(?:1[3-9]|[2-3][0-9]))\/0?2\/([1-2][0-9]{3,3})/i,
								replace: '$1 de fevereiro de $2',
								num: 1
							}, {
								name: 'março',
								find: /((?:[└┘┤]|\| *(?:accessdate|date|data|mês|month) *= *)(?:1[3-9]|[2-3][0-9]))\/0?3\/([1-2][0-9]{3,3})/i,
								replace: '$1 de março de $2',
								num: 1
							}, {
								name: 'abril',
								find: /((?:[└┘┤]|\| *(?:accessdate|date|data|mês|month) *= *)(?:1[3-9]|[2-3][0-9]))\/0?4\/([1-2][0-9]{3,3})/i,
								replace: '$1 de abril de $2',
								num: 1
							}, {
								name: 'maio',
								find: /((?:[└┘┤]|\| *(?:accessdate|date|data|mês|month) *= *)(?:1[3-9]|[2-3][0-9]))\/0?5\/([1-2][0-9]{3,3})/i,
								replace: '$1 de maio de $2',
								num: 1
							}, {
								name: 'junho',
								find: /((?:[└┘┤]|\| *(?:accessdate|date|data|mês|month) *= *)(?:1[3-9]|[2-3][0-9]))\/0?6\/([1-2][0-9]{3,3})/i,
								replace: '$1 de junho de $2',
								num: 1
							}, {
								name: 'julho',
								find: /((?:[└┘┤]|\| *(?:accessdate|date|data|mês|month) *= *)(?:1[3-9]|[2-3][0-9]))\/0?7\/([1-2][0-9]{3,3})/i,
								replace: '$1 de julho de $2',
								num: 10
							}, {
								name: 'agosto',
								find: /((?:[└┘┤]|\| *(?:accessdate|date|data|mês|month) *= *)(?:1[3-9]|[2-3][0-9]))\/0?8\/([1-2][0-9]{3,3})/i,
								replace: '$1 de agosto de $2',
								num: 1
							}, {
								name: 'setembro',
								find: /((?:[└┘┤]|\| *(?:accessdate|date|data|mês|month) *= *)(?:1[3-9]|[2-3][0-9]))\/0?9\/([1-2][0-9]{3,3})/i,
								replace: '$1 de setembro de $2',
								num: 1
							}, {
								name: 'outubro',
								find: /((?:[└┘┤]|\| *(?:accessdate|date|data|mês|month) *= *)(?:1[3-9]|[2-3][0-9]))\/10\/([1-2][0-9]{3,3})/i,
								replace: '$1 de outubro de $2',
								num: 1
							}, {
								name: 'novembro',
								find: /((?:[└┘┤]|\| *(?:accessdate|date|data|mês|month) *= *)(?:1[3-9]|[2-3][0-9]))\/11\/([1-2][0-9]{3,3})/i,
								replace: '$1 de novembro de $2',
								num: 1
							}, {
								name: 'dezembro',
								find: /((?:[└┘┤]|\| *(?:accessdate|date|data|mês|month) *= *)(?:1[3-9]|[2-3][0-9]))\/12\/([1-2][0-9]{3,3})/i,
								replace: '$1 de dezembro de $2',
								num: 1
							}]
						}, {
							name: 'dia e mes igual',
							find: '',
							replace: '',
							num: 1,
							ifhas: /[└┘┤]|\| *(?:accessdate|date|data|mês|month) *= *([1-2][0-9]{3,3}[^0-9][0-9]{2,2}[^0-9][0-9]{2,2}|[0-9]{2,2}[^0-9][0-9]{2,2}[^0-9][1-2][0-9]{3,3})/i,
							sub: [{
								name: '2010-01-01',
								find: /([└┘┤]|\| *(?:accessdate|date|data|mês|month) *= *)([1-2][0-9]{3,3})[^0-9]0?1[^0-9]0?(1)/i,
								replace: '$1$3 de janeiro de $2',
								num: 1
							}, {
								name: '2010-02-02',
								find: /([└┘┤]|\| *(?:accessdate|date|data|mês|month) *= *)([1-2][0-9]{3,3})[^0-9]0?2[^0-9]0?(2)/i,
								replace: '$1$3 de fevereiro de $2',
								num: 1
							}, {
								name: '2010-03-03',
								find: /([└┘┤]|\| *(?:accessdate|date|data|mês|month) *= *)([1-2][0-9]{3,3})[^0-9]0?3[^0-9]0?(3)/i,
								replace: '$1$3 de março de $2',
								num: 1
							}, {
								name: '2010-04-04',
								find: /([└┘┤]|\| *(?:accessdate|date|data|mês|month) *= *)([1-2][0-9]{3,3})[^0-9]0?4[^0-9]0?(4)/i,
								replace: '$1$3 de abril de $2',
								num: 1
							}, {
								name: '2010-05-05',
								find: /([└┘┤]|\| *(?:accessdate|date|data|mês|month) *= *)([1-2][0-9]{3,3})[^0-9]0?5[^0-9]0?(5)/i,
								replace: '$1$3 de maio de $2',
								num: 1
							}, {
								name: '2010-06-06',
								find: /([└┘┤]|\| *(?:accessdate|date|data|mês|month) *= *)([1-2][0-9]{3,3})[^0-9]0?6[^0-9]0?(6)/i,
								replace: '$1$3 de junho de $2',
								num: 1
							}, {
								name: '2010-07-07',
								find: /([└┘┤]|\| *(?:accessdate|date|data|mês|month) *= *)([1-2][0-9]{3,3})[^0-9]0?7[^0-9]0?(7)/i,
								replace: '$1$3 de julho de $2',
								num: 1
							}, {
								name: '2010-08-08',
								find: /([└┘┤]|\| *(?:accessdate|date|data|mês|month) *= *)([1-2][0-9]{3,3})[^0-9]0?8[^0-9]0?(8)/i,
								replace: '$1$3 de agosto de $2',
								num: 1
							}, {
								name: '2010-09-09',
								find: /([└┘┤]|\| *(?:accessdate|date|data|mês|month) *= *)([1-2][0-9]{3,3})[^0-9]0?9[^0-9]0?(9)/i,
								replace: '$1$3 de setembro de $2',
								num: 1
							}, {
								name: '2010-10-10',
								find: /([└┘┤]|\| *(?:accessdate|date|data|mês|month) *= *)([1-2][0-9]{3,3})[^0-9]10[^0-9](10)/i,
								replace: '$1$3 de outubro de $2',
								num: 1
							}, {
								name: '2010-11-11',
								find: /([└┘┤]|\| *(?:accessdate|date|data|mês|month) *= *)([1-2][0-9]{3,3})[^0-9]11[^0-9](11)/i,
								replace: '$1$3 de novembro de $2',
								num: 1
							}, {
								name: '2010-12-12',
								find: /([└┘┤]|\| *(?:accessdate|date|data|mês|month) *= *)([1-2][0-9]{3,3})[^0-9]12[^0-9](12)/i,
								replace: '$1$3 de dezembro de $2',
								num: 1
							}, {
								name: '01-01-2010',
								find: /([└┘┤]|\| *(?:accessdate|date|data|mês|month) *= *)0?(1)[^0-9]0?1[^0-9]([1-2][0-9]{3,3})/i,
								replace: '$1$2 de janeiro de $3',
								num: 1
							}, {
								name: '02-02-2010',
								find: /([└┘┤]|\| *(?:accessdate|date|data|mês|month) *= *)0?(2)[^0-9]0?2[^0-9]([1-2][0-9]{3,3})/i,
								replace: '$1$2 de fevereiro de $3',
								num: 1
							}, {
								name: '03-03-2010',
								find: /([└┘┤]|\| *(?:accessdate|date|data|mês|month) *= *)0?(3)[^0-9]0?3[^0-9]([1-2][0-9]{3,3})/i,
								replace: '$1$2 de março de $3',
								num: 1
							}, {
								name: '04-04-2010',
								find: /([└┘┤]|\| *(?:accessdate|date|data|mês|month) *= *)0?(4)[^0-9]0?4[^0-9]([1-2][0-9]{3,3})/i,
								replace: '$1$2 de abril de $3',
								num: 1
							}, {
								name: '05-05-2010',
								find: /([└┘┤]|\| *(?:accessdate|date|data|mês|month) *= *)0?(5)[^0-9]0?5[^0-9]([1-2][0-9]{3,3})/i,
								replace: '$1$2 de maio de $3',
								num: 1
							}, {
								name: '06-06-2010',
								find: /([└┘┤]|\| *(?:accessdate|date|data|mês|month) *= *)0?(6)[^0-9]0?6[^0-9]([1-2][0-9]{3,3})/i,
								replace: '$1$2 de junho de $3',
								num: 1
							}, {
								name: '07-07-2010',
								find: /([└┘┤]|\| *(?:accessdate|date|data|mês|month) *= *)0?(7)[^0-9]0?7[^0-9]([1-2][0-9]{3,3})/i,
								replace: '$1$2 de julho de $3',
								num: 1
							}, {
								name: '08-08-2010',
								find: /([└┘┤]|\| *(?:accessdate|date|data|mês|month) *= *)0?(8)[^0-9]0?8[^0-9]([1-2][0-9]{3,3})/i,
								replace: '$1$2 de agosto de $3',
								num: 1
							}, {
								name: '09-09-2010',
								find: /([└┘┤]|\| *(?:accessdate|date|data|mês|month) *= *)0?(9)[^0-9]0?9[^0-9]([1-2][0-9]{3,3})/i,
								replace: '$1$2 de setembro de $3',
								num: 1
							}, {
								name: '10-10-2010',
								find: /([└┘┤]|\| *(?:accessdate|date|data|mês|month) *= *)(10)[^0-9]10[^0-9]([1-2][0-9]{3,3})/i,
								replace: '$1$2 de outubro de $3',
								num: 1
							}, {
								name: '11-11-2010',
								find: /([└┘┤]|\| *(?:accessdate|date|data|mês|month) *= *)(11)[^0-9]11[^0-9]([1-2][0-9]{3,3})/i,
								replace: '$1$2 de novembro de $3',
								num: 1
							}, {
								name: '12-12-2010',
								find: /([└┘┤]|\| *(?:accessdate|date|data|mês|month) *= *)(12)[^0-9]12[^0-9]([1-2][0-9]{3,3})/i,
								replace: '$1$2 de dezembro de $3',
								num: 1
							}]
						}, {
							name: 'data de mmmm dd aaaa',
							find: /([└┘┤])= *([^ 0-9└┘][^ \,\.\-\/└┘]*) *. *([0-9]{1,2}) *. *([0-9]{4,4})/i,
							replace: '$1=$3 de $2 de $4',
							num: 10
						}, {
							name: 'data de dd mmmm aaaa',
							find: /([└┘┤]= *[0-9]{1,2}) ([^ 0-9\}\|\n]+) ([0-9]{4,4})/i,
							replace: '$1 de $2 de $3',
							num: 1
						}]
					}]
				}, {
					name: 'acesso',
					find: '',
					replace: '',
					num: 1,
					sub: [{
						name: 'Link de acessodata',
						find: /(└=)([^\[\]\{\}\|\n]*)\[\[([^\[\]\{\}\|\n]+)\]\]/,
						replace: '$1$2$3',
						num: 10
					}, {
						name: 'Página visitada -> Visitada',
						find: /(\{\{┌[^{}]*)(?:Página visitada)/i,
						replace: '$1Visitada',
						num: 100
					}, {
						name: 'Coloca |acessodata=',
						find: /(┐= *[^{}]*) *\(?(?:acesso|acessado|consultado|obtido|retirado|retrieved|visitad[ao]) (?:em|a|on)? *(\[?\[?[0-3]?[0-9] (?:de)? *[^ \n{}]*\]?\]? (?:de)? *\[?\[?[1-2][0-9]{1,3}\]?\]?\.?|[0-3]?[0-9][^0-9][0-3]?[0-9][^0-9][1-2]?[0-9]?[0-9]{1,2})\)? *([^└}\n]*(?:\{\{[a-z][a-z]\}\}[^└}\n]*)?)└= *([\|}])/i,
						replace: '$1$3└=$2 $4',
						num: 1
					}, {
						name: 'Coloca |acessodata= 2',
						find: /(┐= *[^{}]*) *(?:retrieved|accessed) *(?:on)? *((?:[^ \n{}]*\]?\]? \[?\[?[0-3]?[0-9] *.? *\[?\[?[1-2][0-9]{1,3}\]?\]?\.?)|[1-2]?[0-9]{1,3}[^0-9][0-3]?[0-9][^0-9][1-2]?[0-9]{1,3}) *([^└}\n]*(?:\{\{[a-z][a-z]\}\}[^└}\n]*)?)└= *([\|}])/i,
						replace: '$1$3└=$2 $4',
						num: 1
					}]
				}, {
					name: 'língua',
					find: '',
					replace: '',
					num: 1,
					sub: [{
						name: 'língua com {{Código língua}}',
						find: /┴=\{\{Código língua\|([a-z]{2,2})=1\}\}([\|\}])/i,
						replace: '┴2=$1$2',
						num: 1
					}, {
						name: 'Coloca |língua2=',
						find: '',
						replace: '',
						num: 1,
						ifhas: /┴/i,
						sub: [{
							name: 'língua= em',
							find: /┴= *em /i,
							replace: '┴=',
							num: 1
						}, {
							name: 'Coloca |língua2= com {{en}}',
							find: /┴=([^\{\}┼]*)\{\{\(?\(?([a-z]{2,3})\)?\)?\}\}/i,
							replace: '┴2=$2$1',
							num: 10
						}, {
							name: 'Coloca |língua2=en',
							find: /┴=(?:em )?(?:\[?\[?Inglês\]?\]?|\[\[Língua inglesa\|inglês\]\])( *[└┘┐\|}])/i,
							replace: '┴2=en$1',
							num: 10
						}, {
							name: 'Coloca |língua2=pt',
							find: /┴=(?:em )?\[?\[?(?:língua portuguesa\|)?portugu[eê]s\]?\]?( *[└┘┐\|}])/i,
							replace: '┴2=pt$1',
							num: 10
						}, {
							name: 'Coloca |língua2=es',
							find: /┴=(?:em )?\[?\[?(?:língua espanhola\|)?espanhol\]?\]?( *[└┘┐\|}])/i,
							replace: '┴2=es$1',
							num: 10
						}]
					}]
				}, {
					name: 'Retira ponto final 1',
					find: /([┘┴└][^\|\{\}]+)\. *([\|\}])/i,
					replace: '$1$2',
					num: 100
				}]
			}, {
				name: 'Citar específica',
				find: '',
				replace: '',
				num: 1,
				sub: [{
					name: 'Preenchendo Citar web',
					find: '',
					replace: '',
					num: 1,
					ifhas: /\{\{Citar web/i,
					sub: [{
						name: 'Coloca |língua= final {{Citar web}}',
						find: /(\{\{Citar web)([^\{\}┼]*)\{\{\(?\(?([a-z][a-z])\)?\)?\}\}([^\{\}┼]*)\}\}/i,
						replace: '$1$2$4{{$3}}}}',
						num: 10
					}, {
						name: 'Preenchendo',
						find: '',
						replace: '',
						num: 1,
						sub: [{
							name: '|data=',
							find: '',
							replace: '',
							num: 1,
							ifhas: /┘/i,
							sub: [{
								name: 'Colocando |data=',
								find: /(┐= *[^└┘}]*) ([^ └┘{}\.\,]{3,} \[?\[?[0-3]?[0-9] *.? *\[?\[?[1-2][0-9]{1,3}\]?\]?\.?|[1-2]?[0-9]{1,3}[^0-9][0-3]?[0-9][^0-9][1-2]?[0-9]{1,3})([^0-9][^└┘}]*┘=)/,
								replace: '$1$3$2',
								num: 1
							}]
						}, {
							name: 'Ajustes',
							find: /(?:\(\)|\() *([┘┴└])/i,
							replace: '$1',
							num: 100
						}, {
							name: 'Retira ponto final',
							find: '',
							replace: '',
							num: 1,
							sub: [{
								name: 'Retira ponto final 2',
								find: /\. *([┘┴└])/i,
								replace: '$1',
								num: 100
							}, {
								name: 'Retira ponto final 3',
								find: /([^ ])([┘┴└])/,
								replace: '$1 $2',
								num: 10
							}]
						}]
					}]
				}]
			}, {
				name: 'Ajustes nas Citar',
				find: '',
				replace: '',
				num: 1,
				sub: [{
					name: 'Itálico em título',
					find: /(\{\{┌[^{}\n]*\|título=)''([^'{}\|\n]*)''/i,
					replace: '$1$2',
					num: 1
				}, {
					name: 'espaço duplo',
					find: /(\{\{┌[^{}\n]* ) /i,
					replace: '$1',
					num: 100
				}, {
					name: '2 língua2',
					find: /(┴2 *= *[a-z]*[^{}\n]*)\| *língua[23] *=/i,
					replace: '$1',
					num: 10
				}, {
					name: 'língua2 -> língua3',
					find: /(┴2 *= *([a-z]+)[^a-z][^░]*)┴2( *= *\2)/i,
					replace: '$1┴3$3',
					num: 100
				}]
			}, {
				name: 'Desmarca todas citar',
				find: '┌',
				replace: '',
				num: 1,
				sub: [{
					name: 'Desmarca |língua=',
					find: '┴',
					replace: '|língua',
					num: 1
				}, {
					name: 'Desmarca |acessodata=',
					find: '└',
					replace: '|acessodata',
					num: 1
				}, {
					name: 'Desmarca |data=',
					find: '┘',
					replace: '|data',
					num: 1
				}, {
					name: 'Desmarca |arquivodata=',
					find: '┤',
					replace: '|arquivodata',
					num: 1
				}, {
					name: 'Desmarca |título=',
					find: '┐',
					replace: '|título',
					num: 1
				}]
			}]
		}, {
			name: 'Desmarca',
			find: '',
			replace: '',
			num: 1,
			sub: [{
				name: 'Desmarcando </ref>',
				find: '┼',
				replace: '&lt;/ref&gt;',
				num: 1
			}, {
				name: 'Desmarcando ]',
				find: '├',
				replace: ']',
				num: 1
			}]
		}]
	}, {
		name: 'Parte inf',
		find: '',
		replace: '',
		num: 1,
		sub: [{
			name: 'Defaultsort sobrenome',
			find: '',
			replace: '',
			num: 1,
			ifhas: '{{Biografias}}', // FIXME: /\{\{Biografias}}/i ?
			sub: [{
				name: 'Paisnatal nao lusofono',
				find: /\{\{DEFAULTSORT:([^,\(\){}\n]+) ([^ ,\(\){}\n]+)( \([^\(\)\{\}\n]+\))?\}\}/i,
				replace: '{{DEFAULTSORT:$2, $1$3}}',
				num: 1,
				ifhas: /\n *\| *pa[ií]s(natal)? *= *\{\{/,
				ifnot: /\n *\| *pa[ií]s(natal)? *= *\{\{(AGO|BRA|CPV|GNB|GNQ|MAC|MOZ|MUS|PRT|SEN|STP|TLS)/
			}]
		}, {
			name: 'Portal3',
			find: '',
			replace: '',
			num: 1,
			sub: [{
				name: 'Add {{Portal}}',
				find: '',
				replace: '',
				num: 1,
				ifnot: /\{\{(Portal3|desambiguação)/i,
				sub: [{
					name: 'Geral vazia',
					find: /\r?\n\r?\n(\[\[Categoria\:|\{\{DEFAULTSORT\:)/i,
					replace: '\n\n{{Portal3|}}\n\n$1',
					num: 1
				}]
			}, {
				name: 'Preenchendo {{Portal}}',
				find: '',
				replace: '',
				num: 1,
				sub: [{
					name: 'Portal3 - via Esboço',
					find: '',
					replace: '',
					num: 1,
					ifhas: /\{\{Esboço/i,
					sub: [{
						name: 'Portal3 - esboço Brasil',
						find: '{{Portal3|',
						replace: '{{Portal3|Brasil|',
						num: 1,
						ifhas: /\{esboço\-(geo)?\-?(a[clpm]|br|ce|df|es|go|m[atsg]|p[rbaei]|r[jnso]|s[cpe])\}/i,
						ifnot: /\{\{Portal3.*\|(Brasil|Tocantins|Sergirpe|São Paulo|Santa Catarina|Roraima|Rondônia|Rio Grande do Sul|Rio Grande do Norte|Rio de Janeiro|Piauí|Pernambuco|Paraná|Paraíba|Pará|Minas Gerais|Mato Grosso do Sul|Mato Grosso|Maranhão|Goiás|Espírito Santo|Ceará|Bahia|Amazonas|Amapá|Alagoas|Acre)/i,
						sub: [{
							enabled: false,
							name: 'Geral',
							find: /(Esboço\-geo([a-z][a-z])\}\}.*[^░]*)\{\{Portal3\|\}\}/i, // FIXME: Singleline?
							replace: '$1{{Portal3|{{subst:Iso2país2|{{subst:uc:$2}} }}|}}',
							num: 1,
							ifhas: /Esboço\-geo(ar|ao|cl|fr|ht|lx|sw)\}/i,
							ifnot: /\{\{Portal3.*\|(Argentina|Angola|Chile|França|Haiti|Luxemburgo|Suécia)[ \|\}]/i
						}]
					}, {
						enabled: false,
						name: 'Geral',
						find: /(Esboço\-geo([a-z][a-z])\}\}.*[^░]*)\{\{Portal3\|\}\}/i, // FIXME: Singleline?
						replace: '$1{{Portal3|{{subst:Iso2país2|{{subst:uc:$2}} }}|}}',
						num: 1,
						ifhas: /Esboço\-geo(ar|ao|cl|fr|ht|lx|sw)\}/i,
						ifnot: /\{\{Portal3.*\|(Argentina|Angola|Chile|França|Haiti|Luxemburgo|Suécia)[ \|\}]/i
					}]
				}, {
					name: 'Portal3 - via Infocaixa',
					find: '',
					replace: '',
					num: 1,
					ifhas: '{{Info/',
					sub: [{
						// A espera de uma predef de subst para Iso2país
						enabled: false,
						name: 'Campo |país=',
						find: /(\{\{Info\/[^╣]*\| *pa[ií]s *= *\{\{([A-Z]+)[a-z]{0,2}\}\}[^░]*)(\{\{Portal3\|)\}\}/,
						replace: '$1$3$2}}',
						num: 1
					}]
				}, {
					/* Usar cat para países
pega mts artigos que
não estão tão próximos
do Portal */
					enabled: false,
					name: 'Países (com cat)',
					find: '',
					replace: '',
					num: 1,
					ifnot: '{{Info/Armamento', // FIXME: /\{\{Info/Armamento/i ?
					sub: [{
						name: 'Brasil (cat)',
						find: '{{Portal3|',
						replace: '{{Portal3|Brasil|',
						num: 1,
						ifhas: /\[\[Categoria:((.*o )?(Brasil)|Bairros .* de Manaus)[ \|\]]/i,
						ifnot: /(\{\{Portal3.*\|(Brasil|Tocantins|Sergirpe|São Paulo|Santa Catarina|Roraima|Rondônia|Rio Grande do Sul|Rio Grande do Norte|Rio de Janeiro|Piauí|Pernambuco|Paraná|Paraíba|Pará|Minas Gerais|Mato Grosso do Sul|Mato Grosso|Maranhão|Goiás|Espírito Santo|Ceará|Bahia|Amazonas|Amapá|Alagoas|Acre)|\[\[Categoria:(.* )?(Mineiros))[ \|\}]/i
					}, {
						name: 'Portugal (cat)',
						find: '{{Portal3|', // FIXME: /\{\{Portal3|/i ?
						replace: '{{Portal3|Portugal|',
						num: 1,
						ifhas: /(\[\[Categoria:(.* )?(Portugal)[ \|\]]|\{\{(Esboço\-freguesiaspt)\}\})/i,
						ifnot: /\{\{Portal3.*\|Portugal[ \|\}]/i
					}, {
						name: 'Venezuela',
						find: '{{Portal3|', // FIXME: /\{\{Portal3|/i ?
						replace: '{{Portal3|Venezuela|',
						num: 1,
						ifhas: /\[\[Categoria:(.* )?(Venezuela)[ \|\]]/i,
						ifnot: /\{\{Portal3.*\|Venezuela[ \|\}]/i
					}, {
						name: 'Suíça',
						find: '{{Portal3|',
						replace: '{{Portal3|Suíça|',
						num: 1,
						ifhas: /\[\[Categoria:(.* )?(Suíça)[ \|\]]/i,
						ifnot: /\{\{Portal3.*\|Suíça[ \|\}]/i
					}, {
						name: 'Suécia',
						find: '{{Portal3|',
						replace: '{{Portal3|Suécia|',
						num: 1,
						ifhas: /\[\[Categoria:(.* )?(Suécia|Sueca)[ \|\]]/i,
						ifnot: /\{\{Portal3.*\|Suécia[ \|\}]/i
					}, {
						name: 'Rússia',
						find: '{{Portal3|',
						replace: '{{Portal3|Rússia|',
						num: 1,
						ifhas: /\[\[Categoria:(.* )?(Rússia)[ \|\]]/i,
						ifnot: /\{\{Portal3.*\|Rússia[ \|\}]/i
					}, {
						name: 'República Checa',
						find: '{{Portal3|',
						replace: '{{Portal3|República Checa|',
						num: 1,
						ifhas: /\[\[Categoria:(.* )?(República Checa)[ \|\]]/,
						ifnot: /\{\{Portal3.*\|República Checa[ \|\}]/
					}, {
						name: 'Reino Unido',
						find: '{{Portal3|',
						replace: '{{Portal3|Reino Unido|',
						num: 1,
						ifhas: /\[\[Categoria:(.* )?(Reino Unido)[ \|\]]/i,
						ifnot: /\{\{Portal3.*\|Reino Unido[ \|\}]/i
					}, {
						name: 'Polónia',
						find: '{{Portal3|',
						replace: '{{Portal3|Polónia|',
						num: 1,
						ifhas: /\[\[Categoria:(.* )?(Polónia|Polônia)[ \|\]]/i,
						ifnot: /\{\{Portal3.*\|Polónia[ \|\}]/i
					}, {
						name: 'Japão',
						find: '{{Portal3|',
						replace: '{{Portal3|Japão|',
						num: 1,
						ifhas: /\[\[Categoria:(.* )?(Japão)[ \|\]]/i,
						ifnot: /\{\{Portal3.*\|Japão[ \|\}]/i
					}, {
						name: 'Itália',
						find: '{{Portal3|',
						replace: '{{Portal3|Itália|',
						num: 1,
						ifhas: /\[\[Categoria:(.* )?(Itália)[ \|\]]/i,
						ifnot: /\{\{Portal3.*\|Itália[ \|\}]/i
					}, {
						name: 'Israel',
						find: '{{Portal3|',
						replace: '{{Portal3|Israel|',
						num: 1,
						ifhas: /\[\[Categoria:(.* )?(Israel)[ \|\]]/i,
						ifnot: /\{\{Portal3.*\|Israel[ \|\}]/i
					}, {
						name: 'Irlanda',
						find: '{{Portal3|',
						replace: '{{Portal3|Irlanda|',
						num: 1,
						ifhas: /\[\[Categoria:(.* )?(Irlanda)[ \|\]]/i,
						ifnot: /\{\{Portal3.*\|Irlanda[ \|\}]/i
					}, {
						name: 'Inglaterra',
						find: '{{Portal3|',
						replace: '{{Portal3|Inglaterra|',
						num: 1,
						ifhas: /\[\[Categoria:(.* )?(Inglaterra|Britânica?o?s?)[ \|\]]/i,
						ifnot: /\{\{Portal3.*\|Inglaterra[ \|\}]/i
					}, {
						name: 'Hungria',
						find: '{{Portal3|',
						replace: '{{Portal3|Hungria|',
						num: 1,
						ifhas: /\[\[Categoria:(.* )?(Hungria)[ \|\]]/i,
						ifnot: /\{\{Portal3.*\|Inglaterra[ \|\}]/i
					}, {
						name: 'Grécia',
						find: '{{Portal3|',
						replace: '{{Portal3|Grécia|',
						num: 1,
						ifhas: /\[\[Categoria:(.* )?(Grécia)[ \|\]]/i,
						ifnot: /\{\{Portal3.*\|Grécia[ \|\}]/i
					}, {
						name: 'França',
						find: '{{Portal3|',
						replace: '{{Portal3|França|',
						num: 1,
						ifhas: /\[\[Categoria:(.* )?(França)[ \|\]]/i,
						ifnot: /\{\{Portal3.*\|França[ \|\}]/i
					}, {
						name: 'Estónia',
						find: '{{Portal3|',
						replace: '{{Portal3|Estónia|',
						num: 1,
						ifhas: /\[\[Categoria:(.* )?(Estónia|Estônia)[ \|\]]/i,
						ifnot: /\{\{Portal3.*\|Estónia[ \|\}]/i
					}, {
						name: 'Estados Unidos',
						find: '{{Portal3|',
						replace: '{{Portal3|Estados Unidos|',
						num: 1,
						ifhas: /\[\[Categoria:(.* )?(Estados Unidos|Estadunidense|Norte-americano)[ \|\]]/i,
						ifnot: /\{\{Portal3.*\|Estados Unidos[ \|\}]/i
					}, {
						name: 'Espanha',
						find: '{{Portal3|',
						replace: '{{Portal3|Espanha|',
						num: 1,
						ifhas: /\[\[Categoria:(.* )?(Espanha)[ \|\]]/i,
						ifnot: /\{\{Portal3.*\|Espanha[ \|\}]/i
					}, {
						name: 'Chile',
						find: '{{Portal3|',
						replace: '{{Portal3|Chile|',
						num: 1,
						ifhas: /\[\[Categoria:(.* )?(Chile)[ \|\]]/i,
						ifnot: /\{\{Portal3.*\|Chile[ \|\}]/i
					}, {
						name: 'Canadá',
						find: '{{Portal3|',
						replace: '{{Portal3|Canadá|',
						num: 1,
						ifhas: /\[\[Categoria:(.* )?(Canadá)[ \|\]]/i,
						ifnot: /\{\{Portal3.*\|Canadá[ \|\}]/i
					}, {
						name: 'Bélgica',
						find: '{{Portal3|',
						replace: '{{Portal3|Bélgica|',
						num: 1,
						ifhas: /\[\[Categoria:(.* )?(Bélgica)[ \|\]]/i,
						ifnot: /\{\{Portal3.*\|Bélgica[ \|\}]/i
					}, {
						name: 'Áustria',
						find: '{{Portal3|',
						replace: '{{Portal3|Áustria|',
						num: 1,
						ifhas: /\[\[Categoria:(.* )?(Áustria)[ \|\]]/i,
						ifnot: /\{\{Portal3.*\|Áustria[ \|\}]/i
					}, {
						name: 'Alemanha',
						find: '{{Portal3|',
						replace: '{{Portal3|Alemanha|',
						num: 1,
						ifhas: /\[\[Categoria:(.* )?(Alemanha)[ \|\]]/i,
						ifnot: /\{\{Portal3.*\|Alemanha[ \|\}]/i
					}]
				}]
			}, {
				name: 'Arrumando portal',
				find: /(\{\{Portal3.*)\|\}\}/i,
				replace: '$1}}',
				num: 1
			}, {
				name: 'Retirando {{Portal3|',
				find: '',
				replace: '',
				num: 1,
				sub: [{
					name: 'Removendo portal vazio',
					find: /\{\{Portal3\}\}\r?\n\r?\n/i,
					replace: '',
					num: 1
				}]
			}]
		}, {
			name: '{{Caixa de sucessão}} e Link data',
			find: /(\{\{Caixa de sucessão[^{}]*\n *\| *anos *=.*)\[\[([0-9]+ de (?:janeiro|fevereiro|março|abril|maio|junho|julho|agosto|setembro|outubro|novembro|dezembro)|[1-2][0-9]{3,3})\]\]/i,
			replace: '$1$2',
			num: 10
		}]
	}, {
		name: 'Geral',
		find: '',
		replace: '',
		num: 1,
		sub: [{
			name: 'Ordem das seções inferiores',
			find: '',
			replace: '',
			num: 1,
			ifhas: /║/i,
			sub: [{
				name: 'Marca final da última seção',
				find: '',
				replace: '',
				num: 1,
				sub: [{
					name: 'Rule',
					find: /\n\r?\n/i,
					replace: '┼',
					num: 1
				}, {
					name: 'Rule',
					find: /((?:║== Ver também ==|║== Referências? ==)\r?\n[^║░\*]*\*[^┼║░]*)┼([^║░]*░)/i,
					replace: '$1\n\n┴$2',
					num: 1
				}, {
					name: 'Rule',
					find: /┼/i,
					replace: '\n\n',
					num: 1
				}]
			}, {
				name: 'Marca seções',
				find: '',
				replace: '',
				num: 1,
				sub: [{
					name: 'Marca LE',
					find: '║== Ligações externas ==',
					replace: '┬',
					num: 1
				}, {
					name: 'Marca VT',
					find: '║== Ver também ==',
					replace: '┼',
					num: 1
				}, {
					name: 'Marca REF',
					find: /║== Referências? ==/i,
					replace: '├',
					num: 1
				}]
			}, {
				name: 'Ordem LE VT',
				find: /(┬[^┼├╔╗]*)(┼[^├┴╔╗]*)┴/i,
				replace: '$2$1┴',
				num: 1
			}, {
				name: 'Ordem LE REF',
				find: /(┬[^┼├╔╗]*)(├[^┼┴╔╗]*)┴/i,
				replace: '$2$1┴',
				num: 1
			}, {
				name: 'Desmarca seções',
				find: '',
				replace: '',
				num: 1,
				sub: [{
					name: 'Desmarca REF',
					find: '├',
					replace: '║== Referências ==',
					num: 1
				}, {
					name: 'Desmarca VT',
					find: '┼',
					replace: '║== Ver também ==',
					num: 1
				}, {
					name: 'Desmarca LE',
					find: '┬',
					replace: '║== Ligações externas ==',
					num: 1
				}]
			}, {
				name: 'Desmarca final da última seção',
				find: '┴',
				replace: '',
				num: 1
			}]
		}]
	}, {
		name: 'Temáticos',
		find: '',
		replace: '',
		num: 1,
		sub: [{
			name: 'Biografia',
			find: '',
			replace: '',
			num: 1,
			ifhas: /\{\{Portal3.*\|Biografias/i,
			sub: [{
				name: 'Parte Sup',
				find: '',
				replace: '',
				num: 1,
				sub: [{
					name: 'Campos infobox',
					find: '',
					replace: '',
					num: 1,
					ifhas: '{{Info/', // FIXME: /\{\{Info//i ?
					sub: [{
						name: 'padrao nascimento e morte',
						find: '',
						replace: '',
						num: 1,
						sub: [{
							name: 'nascimento_data',
							find: /(\{\{Info\/[^╣]*\| *)(?:data_nascimento|datadenascimento|nasceu)( *=)/i,
							replace: '$1nascimento_data$2',
							num: 1
						}, {
							name: 'nascimento_local',
							find: /(\{\{Info\/[^╣]*\| *)(?:localidaden|local_nascimento|localnasc)( *=)/i,
							replace: '$1nascimento_local$2',
							num: 1
						}, {
							name: 'nascimento_cidade',
							find: /(\{\{Info\/[^╣]*\| *)cidadenatal( *=)/i,
							replace: '$1nascimento_cidade$2',
							num: 1
						}, {
							name: 'nascimento_país',
							find: /(\{\{Info\/[^╣]*\| *)pa[ií]snatal( *=)/i,
							replace: '$1nascimento_país$2',
							num: 1
						}, {
							name: 'morte_data',
							find: /(\{\{Info\/[^╣]*\| *)(?:data_falecimento|falecimento_data|data_morte|faleceu|datadefalecimento)( *=)/i,
							replace: '$1morte_data$2',
							num: 1
						}, {
							name: 'morte_local',
							find: /(\{\{Info\/[^╣]*\| *)(?:localidadef|local_morte|falecimento_local|local_falecimento|localfaleceu)( *=)/i,
							replace: '$1morte_local$2',
							num: 1
						}, {
							name: 'morte_cidade',
							find: /(\{\{Info\/[^╣]*\| *)(?:cidadedamorte)( *=)/i,
							replace: '$1morte_cidade$2',
							num: 1
						}, {
							name: 'morte_país',
							find: /(\{\{Info\/[^╣]*\| *)(?:paisdamorte)( *=)/i,
							replace: '$1morte_país$2',
							num: 1
						}]
					}, {
						name: 'nascimento_local',
						find: /(\{\{Info\/[^╣]*\| *nascimento_local *=) *(\r?\n[^╚]+╚[^╝\(\)]+\((\[\[[^\[\]\n]+\]\]),)/i,
						replace: '$1 $3$2',
						num: 1
					}, {
						name: 'nascimento_data',
						find: /(\{\{Info\/[^╣]*\| *nascimento_data *=) *(?:\{\{dni\|[^0-9\n]+\}\})?(\r?\n[^╚]+╚[^╝\(\)]+\((?:[^\,\n\(\)]+(?:\([^\(\)\n]+\)\|[^\(\)\]]+\]\][^\,\n\(\)]*)?, )?([^\-\–\—\,\n\(\)]+) ?[\-\–\—\n\)])/i,
						replace: '$1 $3$2',
						num: 1
					}, {
						name: 'morte_local',
						find: /(\{\{Info\/[^╣]*\| *morte_local *=) *(\r?\n[^╚]+╚[^╝\(\)]+\([^\-\–\—\n\(\)]+ [\-\–\—] ([^\,\n\(\)]+(?:\([^\(\)\n]+\)\|[^\(\)\]]+\]\][^\,\n\(\)]*)?),)/i,
						replace: '$1 $3$2',
						num: 1
					}, {
						name: 'morte_data',
						find: /(\{\{Info\/[^╣]*\| *morte_data *=) *(\r?\n[^╚]+╚[^╝\(\)]+\([^\-\–\—\(\)\n]+ [\-\–\—] (?:[^\,\n\(\)]+(?:\([^\(\)\n]+\)\|[^\(\)\]]+\]\][^\,\n\(\)]*)?, )?([^\(\)\n]+)\))/i,
						replace: '$1 $3$2',
						num: 1
					}, {
						name: 'Profissão',
						find: /(\{\{Info\/[^╣]*\| *ocupação *=) *(\r?\n[^╚]+╚[^╝\)]+\) é (?:uma?)? (\[\[[^\[\]\n]+\]\]))/i,
						replace: '$1 $3$2',
						num: 1
					}, {
						name: '{{morte}}',
						find: /(\{\{Info\/[^╣]*\| *morte_data *= *)\[\[([1-3]?[0-9]) de ([^\[\]\n]+)\]\] de \[\[([0-9]{3,4})\]\]\r?\n/i,
						replace: '$1{{morte|$2|{{subst:Mês2número|$3}}|$4}}\n',
						num: 1,
						sub: [{
							name: '{{morte}} ano',
							find: /(\{\{Info\/[^╣]*\| *morte_data *= *)\[\[([0-9]{3,4})\]\]\r?\n/i,
							replace: '$1{{morte|||$2}}\n',
							num: 1
						}]
					}, {
						name: '{{nascimento}}',
						find: /(\{\{Info\/[^╣]*\| *nascimento_data *= *)\[\[([1-3]?[0-9]) de ([^\[\]\n]+)\]\] de \[\[([0-9]{3,4})\]\]\r?\n/i,
						replace: '$1{{dni|$2|{{subst:Mês2número|$3}}|$4}}\n',
						num: 1,
						sub: [{
							name: '{{nascimento}} ano',
							find: /(\{\{Info\/[^╣]*\| *nascimento_data *= *)\[\[([0-9]{3,4})\]\]\r?\n/i,
							replace: '$1{{dni|||$2}}\n',
							num: 1
						}]
					}, {
						name: '{{morte}} com nasc',
						find: /(\| *nascimento_data *= *\{\{(?:nascimento|dni)(\|[0-9]*\|[0-9]*\|[0-9]*)[\|\}][^\r\n]*(?:si|sem idade)?\}\r?\n[^╣]*\| *morte_data *= *\{\{morte\|[0-9]*\|[0-9]*\|[0-9]*)\}\}/i,
						replace: '$1$2}}',
						num: 1,
						sub: [{
							name: 'morte sem si',
							find: /(\{\{morte[^\r\n]+)\|(?:si|sem idade)/i,
							replace: '$1',
							num: 1
						}]
					}, {
						name: '{{dni}} com morte',
						find: /(\{\{dni[^\r\n]+)\}\}/i,
						replace: '$1|si}}',
						num: 1,
						ifhas: /\| *morte_data *= *[^ \r\n╔]/i,
						ifnot: /\{\{dni[^\r\n]+\|(?:si|sem idade)/i
					}, {
						name: 'nacionalidade',
						find: '',
						replace: '',
						num: 1,
						ifhas: /nacionalidade *= */i,
						sub: [{
							name: '{{BRAn}}',
							find: /(nacionalidade *= *)\[?\[?(?:brasil|brasileiro|\{\{BRA\}\}|\{\{BRAb\}\})\]?\]?\r?\n/i,
							replace: '$1{{BRAn}}\n',
							num: 1
						}]
					}]
				}, {
					name: '-links data na infobox',
					find: '',
					replace: '',
					num: 1,
					ifhas: '{{Info/',
					sub: [{
						name: 'Rule',
						find: /(\| *mandatos?[1-3]? *=.*)\[\[([0-9]+ de [^ \|\]]+)\]\]( de \[\[[0-9]{4,4}\]\])/i,
						replace: '$1$2$3',
						num: 3
					}, {
						name: 'Info/Futebolista',
						find: /(\{\{Info\/(?:Futebolista|Treinador)[^╣]*\n *\| *(?:jovemanos|ano|anoselecao|(?:pc|t|nt)update) *=.*)\[\[([0-9]{1,2} de ((?:jan|fever)eiro|março|abril|maio|ju[nl]ho|agosto|(?:setem|outu|novem|dezem)bro)|[1-2][0-9]{3,3})\]\]/i,
						replace: '$1$2',
						num: 100
					}, {
						name: 'Info/Tenista',
						find: /(\{\{Info\/Tenista[^╣]*\n *\| *(?:melhorrankingsimples|melhorrankingduplas|tennishofano|atualizado) *=.*)\[\[([0-9]{1,2} de ((?:jan|fever)eiro|março|abril|maio|ju[nl]ho|agosto|(?:setem|outu|novem|dezem)bro)|[1-2][0-9]{3,3})\]\]/i,
						replace: '$1$2',
						num: 100
					}]
				}]
			}, {
				name: 'Assunto em multitag',
				find: '',
				replace: '',
				num: 1,
				ifhas: '{{Multitag', // FIXME: /\{\{Multitag/i ?
				sub: [{
					name: 'marcando biografia',
					find: /\|biografia\= */,
					replace: '├',
					num: 1
				}, {
					name: 'inserindo biografia',
					find: /\{\{(Multitag[^├\n]*)(\| *data *=[^├\n]*\}\})/i,
					replace: '{{$1├sim$2',
					num: 1
				}, {
					name: 'desmarcando biografia',
					find: '├',
					replace: '|biografia=',
					num: 1
				}]
			}, {
				name: 'Parte cen',
				find: '',
				replace: '',
				num: 1,
				sub: [{
					name: '-links data',
					find: '',
					replace: '',
					num: 1,
					sub: [{
						name: 'em listas de trabalhos e prêmios',
						find: /(║==+ *(?:Filmografia|Prêmios|Livros|Obras).*==+[^║░]+)\[\[([1-2][0-9]{3,3})\]\]/i,
						replace: '$1$2',
						num: 100
					}]
				}]
			}]
		}, {
			name: 'Arte',
			find: '',
			replace: '',
			num: 1,
			ifhas: /\{\{Portal3.*\|(Arte|Animangá|Banda desenhada|Cinema|Games|Livros|Literatura|Música|Pintura|Televisão)/i,
			sub: [{
				name: 'Criando lista',
				find: '',
				replace: '',
				num: 1,
				sub: [{
					name: 'Elenco',
					find: /(║== Elenco ==[^║]*\n)([^\*\n]* \.\.\. )/i,
					replace: '$1* $2',
					num: 100
				}, {
					name: 'Prêmios e indicações',
					find: '',
					replace: '',
					num: 1,
					sub: [{
						name: 'Rule',
						find: /(║== Prêmios e indicações ==\r?\n)(\[\[[^\[\]\n]+\]\])(?:\r?\n)+([^\r\n])/i,
						replace: '$1; $2\n$3',
						num: 1
					}, {
						name: 'Rule',
						find: /(║== Prêmios e indicações ==[^║]*\n; \[.*(?:\r?\n)+)(\[?\[?[0-9]{4,4})/i,
						replace: '$1* $2',
						num: 1
					}, {
						name: 'Rule',
						find: /(\n\* [0-9]{4,4}.*)(?:\r?\n)+([0-9]{4,4})/i,
						replace: '$1\n* $2',
						num: 10
					}]
				}, {
					name: 'Trm v- lista',
					find: /(\n\*.*)(?:\r?\n){2,}(\*)/i,
					replace: '$1\n$2',
					num: 100
				}]
			}, {
				name: 'Cinema',
				find: '',
				replace: '',
				num: 1,
				ifhas: /\{\{Portal3.*\|Cinema[ \|\}]/i,
				sub: [{
					enabled: false,
					name: 'Info espaço =',
					find: '',
					replace: '',
					num: 1,
					ifhas: /\{\{Info\/Filme/i,
					sub: [{
						name: '1',
						find: /(\| *(código\-IMDB)) *=\n$1 =/i,
						replace: '$1 =',
						num: 1
					}, {
						name: '3',
						find: /(\| *título\-(pt|br)) *=/i,
						replace: '$1   =',
						num: 1
					}, {
						name: '5',
						find: /(\| *(duração|direção|roteiro)) *=/i,
						replace: '$1     =',
						num: 1
					}, {
						name: '6',
						find: /(\| *(título|imagem|idioma|género|elenco|cor\-pb)) *=/i,
						replace: '$1      =',
						num: 1
					}, {
						name: '8',
						find: /(\| *(país|tipo)) *=/i,
						replace: '$1        =',
						num: 1
					}, {
						name: '9',
						find: /(\| *(ano|país)) *=/i,
						replace: '$1         =',
						num: 1
					}]
				}, {
					name: 'espaço elenco',
					find: ']].... ',
					replace: ']] .... ',
					num: 1
				}]
			}, {
				name: 'Anime',
				find: '',
				replace: '',
				num: 1,
				ifhas: /\{\{Portal3.*\|Animangá[ \|\}]/i,
				sub: [{
					name: 'Sem episódios',
					find: /╩/i,
					replace: '╩\n\n== Episódios ==\n{{Anime/Manutenção|episódios=n}}',
					num: 1,
					ifhas: /(\{\{Info\/Animangá|\{\{Sem infocaixa\|Animangá)/i,
					ifnot: /(== Episódios ==|Lista de episódios)/i
				}, {
					name: 'uma série ([[)?anime',
					find: / uma série (\[\[)?anime/i,
					replace: ' um $1anime',
					num: 1
				}, {
					name: '[[mangá|manga]]',
					find: '[[mangá|manga]]',
					replace: '[[mangá]]',
					num: 1
				}, {
					name: 'séries de mang[aá]s',
					find: / séries de mang[aá]s/i,
					replace: ' mangás',
					num: 1
				}, {
					name: 'Categoria:Mangás de ANO',
					find: /(\{\{Info\/Animangá\/Mangá[^{}]+\| *data_inicio *= *.*([0-9]{4,4})[^░]+)(\n\[\[Categoria)/i,
					replace: '$1\n[[Categoria:Mangás de $2]]$3',
					num: 1,
					ifnot: /Categoria:Mangás de [0-9]{4,4}/i
				}, {
					name: 'Categoria:Animes de ANO',
					find: /(\{\{Info\/Animangá\/Anime[^{}]+\| *data_inicio *= *.*([0-9]{4,4})[^░]+)(\n\[\[Categoria)/i,
					replace: '$1\n[[Categoria:Animes de $2]]$3',
					num: 1,
					ifnot: /Categoria:Animes de [0-9]{4,4}/i
				}, {
					name: 'Maiusculite',
					find: '',
					replace: '',
					num: 1,
					sub: [{
						name: 'Rule',
						find: '= Missões Completadas =',
						replace: '= Missões completadas =',
						num: 1
					}]
				}, {
					name: 'espaço campos info',
					find: '',
					replace: '',
					num: 1,
					ifhas: '{{Info/Personagem de Naruto', // FIXME: /\{\{Info/Personagem de Naruto/i ?
					sub: [{
						name: 'espaço para campo 1',
						find: /(\n *\| *[^=\n ]) {0,5}=([^╣]*╣)/i,
						replace: '$1      =$2',
						num: 100
					}, {
						name: 'espaço para campo 2',
						find: /(\n *\| *[^=\n][^=\n ]) {0,4}=([^╣]*╣)/i,
						replace: '$1     =$2',
						num: 100
					}, {
						name: 'espaço para campo 3',
						find: /(\n *\| *[^=\n ]{2,2}[^=\n ]) {0,3}=([^╣]*╣)/i,
						replace: '$1    =$2',
						num: 100
					}, {
						name: 'espaço para campo 4',
						find: /(\n *\| *[^=\n ]{3,3}[^=\n ]) {0,2}=([^╣]*╣)/i,
						replace: '$1   =$2',
						num: 100
					}, {
						name: 'espaço para campo 5',
						find: /(\n *\| *[^=\n ]{4,4}[^=\n ]) {0,1}=([^╣]*╣)/i,
						replace: '$1  =$2',
						num: 100
					}, {
						name: 'espaço para campo 6',
						find: /(\n *\| *[^=\n ]{5,5}[^=\n ])=([^╣]*╣)/i,
						replace: '$1 =$2',
						num: 100
					}, {
						name: 'espaço antes de =',
						find: /(\n *\| *[^=\n]*[^=\n ])=([^╣]*╣)/i,
						replace: '$1 =$2',
						num: 100
					}, {
						name: 'espaço após =',
						find: /(\n *\| *[^=\n]*)=([^ \r\n][^╣]*╣)/i,
						replace: '$1= $2',
						num: 100
					}]
				}]
			}, {
				name: 'Televisão',
				find: '',
				replace: '',
				num: 1,
				ifhas: /\{\{Portal3.*\|Televisão[ \|\}]/i,
				sub: [{
					name: 'Listas de episódios',
					find: '',
					replace: '',
					num: 1,
					ifhas: /\[\[Categoria:Listas de episódios[ \|\]]/i,
					sub: [{
						name: '{{Sem infobox}}',
						find: '╦',
						replace: '╦\n{{sem infocaixa}}',
						num: 1,
						ifnot: /(\{\{Info|\{\{Sem infocaixa)/i
					}, {
						name: 'Televisão/Manutenção|episodelist',
						find: /╦/i,
						replace: '╦\n{{Televisão/Manutenção|episodelist}}',
						num: 1,
						ifnot: /\{\{episode list/i
					}]
				}]
			}, {
				name: 'Música',
				find: '',
				replace: '',
				num: 1,
				ifhas: /\{\{Portal3.*\|Música[ \|\}]/i,
				sub: [{
					name: 'Tags man',
					find: '',
					replace: '',
					num: 1,
					sub: [{
						name: 'Tema',
						find: /(\{\{(?:Sem-fontes-bpv)[^{}\n]+\| *música *= *)([\|\}])/i,
						replace: '$1s$2',
						num: 1
					}]
				}, {
					name: '- link de data em listas',
					find: '',
					replace: '',
					num: 1,
					sub: [{
						name: 'Rule',
						find: /(║==+ *(?:Principais|Outros)? *(?:Álbu(?:m|ns)|Compacto|Compilaç(?:ão|ões)|Discografia|DVD|EP|Lançamento|Participaç(?:ão|ões)|Single|Split|Trilhas? sonora|Vídeo|Videografia|Videoclipe|Prêmios e nomeações|Histórico de lançamento).*==+[^║░]+)\[\[([0-3]?[0-9] de (?:(?:jan|fever)eiro|março|abril|maio|ju[nl]ho|agosto|(?:setem|outu|novem|dezem)bro)|[1-2][0-9]{3,3})\]\]/i,
						replace: '$1$2',
						num: 100
					}]
				}, {
					name: 'Infobox',
					find: '',
					replace: '',
					num: 1,
					ifhas: '{{Info/', // FIXME: /\{\{Info//i ?
					sub: [{
						name: 'campos {{Info/Música/artista',
						find: '',
						replace: '',
						num: 1,
						ifhas: '{{Info/Música/artista', // FIXME: /\{\{Info/Música/artista/i ?
						sub: [{
							name: '|nascimento_cidade',
							find: /(\{\{Info\/Música\/artista[^╣]*\| *)origem( *=)/i,
							replace: '$1nascimento_cidade  =',
							num: 1
						}, {
							name: '|nascimento_país',
							find: /(\{\{Info\/Música\/artista[^╣]*\| *)país( *=)/i,
							replace: '$1nascimento_país    =',
							num: 1
						}, {
							name: '|nascimento_data',
							find: /(\{\{Info\/Música\/artista[^╣]*\| *)nascimento( *=)/i,
							replace: '$1nascimento_data    =',
							num: 1
						}, {
							name: 'morte_data',
							find: /(\{\{Info\/Música\/artista[^╣]*\| *)falecimento( *=)/i,
							replace: '$1morte_data         =',
							num: 1
						}, {
							name: 'morte_local',
							find: /(\{\{Info\/Música\/artista[^╣]*\| *morte_data( *= *)\{\{[^{}\n]+\}\})(?:<br \/>)?(.+)\r?\n/i,
							replace: '$1\n |morte_local        =$3',
							num: 1
						}, {
							name: '- link de data',
							find: /(\{\{Info\/Música\/artista[^╣]*\n *\| *(?:gravadora|exintegrantes) *=.*)\[\[([0-9]{1,2} de ((?:jan|fever)eiro|março|abril|maio|ju[nl]ho|agosto|(?:setem|outu|novem|dezem)bro)|[1-2][0-9]{3,3})\]\]/i,
							replace: '$1$2',
							num: 10
						}]
					}, {
						name: '- link de data em info',
						find: '',
						replace: '',
						num: 1,
						sub: [{
							name: 'Rule',
							find: /(\n *\| *(?:este|próximo|último) (?:álbum|single) *=.*)\[\[([1-2][0-9]{3,3})\]\]/,
							replace: '$1$2',
							num: 1
						}]
					}, {
						name: 'Rule',
						find: '',
						replace: '',
						num: 1
					}]
				}, {
					name: 'Desambig',
					find: '',
					replace: '',
					num: 1,
					sub: [{
						name: '[[teclado]]',
						find: /\[\[([Tt]eclado)\]\]/,
						replace: '[[Teclado (instrumento musical)|$1]]',
						num: 1,
						ifhas: '╣'
					}, {
						name: '[[bateria]]',
						find: /\[\[([Bb]ateria)\]\]/,
						replace: '[[Bateria (instrumento musical)|$1]]',
						num: 1
					}, {
						name: '|genero=',
						find: '',
						replace: '',
						num: 1,
						ifhas: /g[êé]nero *= *[^ \r\n]/i,
						sub: [{
							name: '[[Música pop]]',
							find: /(\| *g[êé]nero *=.*)\[\[(Pop)\]\](?:\{\{Dn\}\})?/i,
							replace: '$1[[Música pop|$2]]',
							num: 10
						}]
					}]
				}]
			}, {
				name: 'Games',
				find: '',
				replace: '',
				num: 1,
				ifhas: /(\{\{Portal3.*\|(Games)[\|\}])/i,
				sub: [{
					name: '- link de data em listas',
					find: /(║==+ *(?:Principais|Outr[ao]s)? *(?:Versões).*==+[^║░]+)\[\[([0-3]?[0-9] de (?:(?:jan|fever)eiro|março|abril|maio|ju[nl]ho|agosto|(?:setem|outu|novem|dezem)bro)|[1-2][0-9]{3,3})\]\]/i,
					replace: '$1$2',
					num: 100
				}]
			}]
		}, {
			name: 'Assentamento',
			find: '',
			replace: '',
			num: 1,
			ifhas: /(\{\{Info\/(Assentamento|Município)|\{\{sem infocaixa\|assentamento)/i,
			sub: [{
				name: 'Brasil',
				find: '',
				replace: '',
				num: 1,
				ifhas: /\{\{Portal3.*\|(Brasil|Tocantins|Sergirpe|São Paulo|Santa Catarina|Roraima|Rondônia|Rio Grande do Sul|Rio Grande do Norte|Rio de Janeiro|Piauí|Pernambuco|Paraná|Paraíba|Pará|Minas Gerais|Mato Grosso do Sul|Mato Grosso|Maranhão|Goiás|Espírito Santo|Ceará|Bahia|Amazonas|Amapá|Alagoas|Acre)/i,
				sub: [{
					name: '+Info/Assentamento/Brasil',
					find: /(\{\{sem infocaixa\|Assentamento)(\}\}\r?\n[^╠╚]*)(╠[^▒\n]+▒\]\])?([^╚]*╚)/i,
					replace: '$1|parcial$2{{Info/Assentamento/Brasil\n' + '|bai\n' + '|nome           = %%title%%\n' + '|outro_nome     =\n' + '|imagem         = $3\n' + '|imagem_legenda =\n' + '|mapa_imagem    =\n' + '|mapa_legenda   =\n' + '|mapa_alfinete  =\n' + '|latd= |latm= |lats= |latNS=N |longd= |longm= |longs= |longEW=E\n' + '|unidade federativa =\n' + '|município          =\n' + '|zona               =\n' + '|bairro             =\n' + '|governador  =\n' + '|prefeito    =\n' + '|fundação    =\n' + '|área_total_km2   =\n' + '|elevação_m       =\n' + '|elevação_max_m   =\n' + '|população_total  =\n' + '|população_urbana =\n' + '|população_em     =\n' + '|população_notas  =\n' + '|código_postal =\n' + '|código_área   =\n' + '|site       =\n' + '|site_nome  =\n' + '|site_nogov =\n' + '|site_nobel =\n' + '╣}}\n$4╚',
					num: 1,
					ifhas: /\{\{Portal3.*\|Brasil/i,
					ifnot: /\{\{Info\//i
				}, {
					name: '{{Info/Assentamento/Brasil}}',
					find: '',
					replace: '',
					num: 1,
					ifhas: /\{\{Info\/Assentamento\/Brasil/i,
					sub: [{
						name: 'ajuste nome',
						find: /(\{\{Info\/Assentamento\/Brasil[^╣]*\|nome *= *[^\(\n]*) \([^\n]*\n/i,
						replace: '$1\n',
						num: 1
					}, {
						name: '+município',
						find: /(\{\{Info\/Assentamento\/Brasil[^╣]*\| *município *= *)([\r\n][^░]*\[\[Categoria:Bairros (?:extintos|não oficiais)? ?de ([^\|\]]*)[\|\]])/i,
						replace: '$1[[$3]]$2',
						num: 1
					}, {
						name: '+estado',
						find: /(\{\{Info\/Assentamento\/Brasil[^╣]*\| *unidade federativa *= *)(\r?\n\| *município *= *\[\[([^\]\n]*)\]\](?:[^░]*(?:\3\]?\]?, (?:\[?\[?capital\]?\]? do )?(?:\[\[estado \(subdivisão\)\|estado\]\]|\[?\[?estado\]?\]?) (?:\[?\[?brasil\]?\]?eiro )?(?:d[eo]|em|no)? ?\[\[([^\]\n]*)\]\][^a-z]|, localizado na cidade de \[?\[?\3\]?\]?\-\[\[([^\[\]\.\n]+)\]\]).*╝))/i,
						replace: '$1[[$4$5]]$2',
						num: 1
					}, {
						name: '+estado individual',
						find: '',
						replace: '',
						num: 1,
						ifhas: /(\{\{Info\/Assentamento\/Brasil[^╣]*\| *unidade federativa *= *)\r?\n/i,
						sub: [{
							name: 'Rio Grande do Norte',
							find: /(\{\{Info\/Assentamento\/Brasil[^╣]*\| *unidade federativa *= *)\r?\n/i,
							replace: '$1[[Rio Grande do Norte]]\n',
							num: 1,
							ifhas: /\{\{esboço\-rn\}\}/i
						}]
					}, {
						name: '+zona',
						find: /(\{\{Info\/Assentamento\/Brasil[^╣]*\| *município *= *\[\[([^\]\n]*)\]\]\r?\n[^╣]*\| *zona *= )([\r\n][^░]*(?:[\[\|]?Zona (Sul)\]?\]? da \[?\[?cidade\]?\]? de \[\[\2|Pertence à Região (Sul) de \[?\[?\2|(?:(?:Está )?localizado|Surgiu[^\.\n]*) (?:à|em|na) \[?\[?zona (sul|norte|leste|oeste))[^╝╩]*[╝╩])/i,
						replace: '$1$4$5$6$3',
						num: 1
					}, {
						name: '+área_total_km2',
						find: /(\{\{Info\/Assentamento\/Brasil[^╣]*\| *município *= *\[\[([^\]\n]*)\]\]\r?\n[^╣]*\| *área_total_km2 *= )([\r\n][^░]*O \[\[bairro\]\] tem um território de ([0-9\.,])+&amp;nbsp;km²\.)/i,
						replace: '$1$4$3',
						num: 1
					}, {
						name: '+população_total',
						find: /(\{\{Info\/Assentamento\/Brasil[^╣]*\| *município *= *\[\[([^\]\n]*)\]\]\r?\n[^╣]*\| *população_total *= )([\r?\n][^╣]*\| *população_em *= )([\r\n][^░]*(?:Em \[\[([1-9][0-9]{3,3})\]\], possuía ([0-9]+) \[?\[?habitante\]?\]?s[,\.].*╝|[^░]*\n\* *(?:Total da )?População \(([1-2][0-9]{3,3})\): ([0-9\.]+)[\r\n]|O bairro possui [^\.\n]* ([0-9\.]+) moradores))/i,
						replace: '$1$6$8$3$5$7$4',
						num: 1
					}, {
						name: '+fundação',
						find: /(\{\{Info\/Assentamento\/Brasil[^╣]*\| *município *= *\[\[([^\]\n]*)\]\]\r?\n[^╣]*\| *fundação *= )([\r\n][^░]*Surgiu (?:a partir da divisão do bairro [^\.\n]* )?em \[?\[?([1-2][0-9]{3,3}).*╝)/i,
						replace: '$1$4$3',
						num: 1
					}, {
						name: 'ajuste pontuacao com decim',
						find: '',
						replace: '',
						num: 1,
						sub: [{
							name: 'ponto ponto',
							find: /(\{\{Info\/Assentamento\/Brasil[^╣]*\| *\| *(?:área_total_km2) *)([0-9]+)\.([0-9]{3,3})\.([0-9]{3,3})/i,
							replace: '$1$2$3.$4',
							num: 1
						}, {
							name: 'ponto e virgula',
							find: /(\{\{Info\/Assentamento\/Brasil[^╣]*\| *\| *(?:área_total_km2) *)([0-9]+)\.([0-9]{3,3})\,([0-9]+)[\r\n]/i,
							replace: '$1$2$3.$4\n',
							num: 1
						}, {
							name: 'só virgula',
							find: /(\{\{Info\/Assentamento\/Brasil[^╣]*\| *\| *(?:área_total_km2) *)([0-9]+)\,([0-9]+)[\r\n]/i,
							replace: '$1$2.$3\n',
							num: 1
						}]
					}, {
						name: 'ajuste pontuacao sem decim',
						find: /(\{\{Info\/Assentamento\/Brasil[^╣]*\| *(?:população_total) *= *[0-9]+)\./i,
						replace: '$1',
						num: 10
					}, {
						name: '+Portal3 Estado',
						find: /(\{\{Info\/Assentamento\/Brasil[^╣]*\| *unidade federativa *= *\[\[([^\[\]\n]+)\]\][\r\n][^░]*\{\{Portal3\|)Brasil(\}\})/i,
						replace: '$1$2$3',
						num: 1,
						ifnot: /\{\{Portal3.*\|(Tocantins|Sergirpe|São Paulo|Santa Catarina|Roraima|Rondônia|Rio Grande do Sul|Rio Grande do Norte|Rio de Janeiro|Piauí|Pernambuco|Paraná|Paraíba|Pará|Minas Gerais|Mato Grosso do Sul|Mato Grosso|Maranhão|Goiás|Espírito Santo|Ceará|Bahia|Amazonas|Amapá|Alagoas|Acre)[\|}]/i
					}, {
						name: '+coord',
						find: /(\{\{geocoordenadas\|([0-9]+)_([0-9]+)_([0-9]+)_([NS])_([0-9]+)_([0-9]+)_([0-9]+)_([EW])\|[^\|\n]*\}\}\r?\n)(\{\{Info\/Assentamento\/Brasil[^╣]+\|latd=)( \|latm=)( \|lats=)( \|latNS=)N?( \|longd=)( \|longm=)( \|longs=)( \|longEW=)E?([\r\n])/i,
						replace: '$10$2$11$3$12$4$13$5$14$6$15$7$16$8$17$9$18',
						num: 1
					}]
				}, {
					name: 'Padronizando introd',
					find: '',
					replace: '',
					num: 1,
					sub: [{
						name: '\'\'\'xxx\'\'\' é um [[bairro]]',
						find: /(╚O? ?'''[^\'\n]*''' é um )bairro/i,
						replace: '$1[[bairro]]',
						num: 1
					}, {
						name: '\'\'\'xxx\'\'\' é um [[bairro]] [[brasil]]eiro',
						find: /(╚'''[^\'\n]*''' é um \[\[bairro\]\] )/i,
						replace: '$1[[brasil]]eiro ',
						num: 1,
						ifnot: /╚'''[^\'\n]*''' é um \[\[bairro\]\] \[?\[?brasil\]?\]?eiro/i
					}, {
						name: 'xxx é ... cidade, estado',
						find: /(\{\{Info\/Assentamento\/Brasil[^╣]*\| *unidade federativa *= *(\[\[[^\]\n]*\]\])[^╚]*\| *município *= *\[\[([^\]\n]*)\]\][^╚]*╚'''[^\'\n]+''' é um \[\[bairro\]\] \[\[brasil\]\]eiro [^ \n]+ (?:em) \[\[\3\]\], )(com)/i,
						replace: '$1$2, $4',
						num: 1
					}]
				}]
			}, {
				name: 'padr campo: assunto_característica',
				find: /(\n *\| *)(início|fim|data|link|leg|legenda|tamanho)_(foto|imagem|mapa|mesorregião|microrregião|pop|idh|pib|pib_per_capita|bandeira|brasão|hino|mandato)( *=)/i,
				replace: '$1$3_$2$4',
				num: 1
			}, {
				name: 'url em link interno',
				find: /(\n *\| *(?:brasão|bandeira|hino)_link *= *)http:\/\/.*\r?\n/i,
				replace: '$1\n',
				num: 10
			}]
		}, {
			name: 'Assentamento',
			find: '',
			replace: '',
			num: 1,
			ifhas: /\{\{Info\/(País)/,
			sub: [{
				name: 'Rule',
				find: /(╚.*(?:,|do) )estado( d)/i,
				replace: '$1[[estado (subdivisão)|estado]]$2',
				num: 1,
				ifhas: '{{Info/Assentamento',
				sub: [{
					name: 'Rule',
					find: /(╚.*\[\[estado \(subdivisão\)\|estado\]\][^╝]*)\[\[estado \(subdivisão\)\|(estado)\]\]/i,
					replace: '$1$2',
					num: 1
				}]
			}, {
				name: '-link em Filhos ilustres',
				find: /\= *[^ \n]* ilustres *=+=\r?\n[^║]*\[\[([0-9]{1,2} de ((?:jan|fever)eiro|março|abril|maio|ju[nl]ho|agosto|(?:setem|outu|novem|dezem)bro)|[1-2][0-9]{3,3})\]\]/i,
				replace: '',
				num: 10
			}]
		}, {
			name: 'Ciência',
			find: '',
			replace: '',
			num: 1,
			ifhas: /\{\{Portal3.*\|(Ciência|Saúde)/i,
			sub: [{
				name: 'Assunto em multitag',
				find: '',
				replace: '',
				num: 1,
				ifhas: /\{\{Multitag/i,
				sub: [{
					name: 'marcando ciência',
					find: /\|ciência\= */,
					replace: '├',
					num: 1
				}, {
					name: 'inserindo ciência',
					find: /\{\{(Multitag[^├\n]*)(\| *data *=[^├\n]*\}\})/i,
					replace: '{{$1├sim$2',
					num: 1
				}, {
					name: 'desmarcando ciência',
					find: '├',
					replace: '|ciência=',
					num: 1
				}]
			}]
		}, {
			name: 'Sociedade',
			find: '',
			replace: '',
			num: 1,
			sub: [{
				name: 'Futebol',
				find: '',
				replace: '',
				num: 1,
				ifhas: /(\{\{Portal3.*\|(Futebol)[\|\}]|\{\{Info\/Futebolista)/i,
				sub: [{
					name: 'Info/Futebolista',
					find: '',
					replace: '',
					num: 1,
					ifhas: '{{Info/Futebolista', // FIXME: /\{\{Info/Futebolista/i ?
					sub: [{
						name: 'imagem',
						find: '',
						replace: '',
						num: 1,
						ifhas: /\| *imagem *= *╠/,
						sub: [{
							name: 'padronizando imagem',
							find: /(\n *\| *imagem *= *╠[^▒\n]*)\|(?:thumb|right|left)/i,
							replace: '$1',
							num: 10
						}, {
							name: '-tamanho/legenda',
							find: /(\| *(imagem_tamanho|imagem_legenda)) *= *\r?\n/i,
							replace: '',
							num: 5,
							ifhas: /(\n *\| *)imagem( *)=( *)╠/i
						}, {
							name: 'Imagem',
							find: /(\n *\| *)imagem( *)=( *)╠([^\|\n]*)(?:\|([0-9]*px))?(?:\|([^\|\n]+))?▒\]\]/,
							replace: '$1imagem$2=$3$4$1imagem_tamanho$2=$3$5$1imagem_legenda$2=$3$6',
							num: 10
						}, {
							name: 'Imagem (tamanho)',
							find: /(\n *\| *imagem_tamanho *=) *\r?\n/i,
							replace: '$1 200px\n',
							num: 1,
							ifhas: /\n *\| *imagem *= *[^\[\r\n]/i,
							ifnot: /\n *\| *imagem_tamanho *= *[^ \r\n]/i
						}, {
							name: 'retirando <br /> do início do campo',
							find: /(\| *imagem_legenda *= *)<br \/>/i,
							replace: '$1',
							num: 10
						}, {
							name: 'arrumando espaçamento',
							find: /(\| *(?:imagem_tamanho|imagem_legenda)) {13}= /i,
							replace: '$1     = ',
							num: 1,
							ifhas: /\| *nome {15}= /i
						}]
					}, {
						name: 'posição',
						find: '',
						replace: '',
						num: 1,
						ifhas: /\| *posição *= *[^ \r\n]/i,
						sub: [{
							name: 'Padronização do nome das posições',
							find: '',
							replace: '',
							num: 1,
							sub: [{
								name: 'Atacante',
								find: /(\| *posição *= *)(?:\[\[)?[Cc]entroavante(?:\]\])?([^\]][^\(a-z])/,
								replace: '$1[[Atacante (futebol)|atacante]]$2',
								num: 1
							}, {
								name: 'Meia',
								find: /(\| *posição *= *)(?:\[\[)?(?:[Mm]eio\-de\-[Cc]ampo|[Mm]eio\-[Cc]ampista|[Mm]édio)(?:\]\])?([^\]][^\(a-z])/,
								replace: '$1[[Meia (futebol)|meio-de-campo]]$2',
								num: 1
							}, {
								name: 'Zagueiro',
								find: /(\| *posição *= *)(?:\[\[)?[Dd]efe(?:nsor|sa)(?: central)?(?:\]\])?([^\]][^\(a-z])/,
								replace: '$1[[zagueiro]]$2',
								num: 1
							}]
						}, {
							name: 'Incluir link',
							find: '',
							replace: '',
							num: 1,
							sub: [{
								name: 'Generico',
								find: /(\| *posição *= *)([^ \[][^\n]*)\r?\n/,
								replace: '$1[[$2]]\n',
								num: 1
							}, {
								name: 'Guarda-redes',
								find: /(\| *posição *= *)[Gg]uarda\-redes([ \]\r?\n])/,
								replace: '$1[[goleiro|guarda-redes]]$2',
								num: 1
							}, {
								name: 'Zagueiro',
								find: /(\| *posição *= *)(?:\[\[)?[Zz]agueiro(?:\]\])?([ \]\r?\n])/,
								replace: '$1[[zagueiro]]$2',
								num: 1
							}, {
								name: 'Volante',
								find: /(\| *posição *= *)(?:\[\[)?[Vv]olante(?:\]\])?([ \]\r?\n][^\(])/,
								replace: '$1[[Volante (futebol)|volante]]$2',
								num: 1
							}, {
								name: 'Ala',
								find: /(\| *posição *= *)(?:\[\[)?[Aa]la( [a-zA-Z]*)?(?:\]\])?([ \]\r?\n][^\(])/,
								replace: '$1[[Ala (futebol)|ala$2]]$3',
								num: 1
							}, {
								name: 'Lateral',
								find: /(\| *posição *= *)(?:\[\[)?[Ll]ateral(\-*[a-zA-Z]*)?(?:\]\])?([ \]\r?\n][^\(])/,
								replace: '$1[[Lateral (futebol)|lateral$2]]$3',
								num: 1
							}, {
								name: 'Meia',
								find: /(\| *posição *= *)(?:\[\[)?[Mm]eia(?:\]\])?([ \]\r?\n][^\(])/,
								replace: '$1[[Meia (futebol)|meia]]$2',
								num: 1
							}, {
								name: 'Atacante',
								find: /(\| *posição *= *)(?:\[\[)?[Aa]tacante(?:\]\])? *([ \]\r?\n][^\(])/,
								replace: '$1[[Atacante (futebol)|atacante]]$2',
								num: 1
							}, {
								name: 'Líbero',
								find: /(\| *posição *= *)(?:\[\[)?[Ll]íbero(?:\]\])?([ \]\r?\n][^\(])/,
								replace: '$1[[Líbero (futebol)|líbero]]$2',
								num: 1
							}]
						}, {
							name: 'aposentado',
							find: /(\| *posição *= *\[\[[^\[\]\n]+) (\(\'*aposentado\'*\))\]\]/i,
							replace: '$1]] $2',
							num: 1
						}]
					}, {
						name: 'cidadenatal',
						find: /(\| *cidadenatal *= *)([^ \[\]\r\n][^\[\]\r\n]+)\r?\n/i,
						replace: '$1[[$2]]\n',
						num: 1
					}, {
						name: 'paísnatal',
						find: '',
						replace: '',
						num: 1,
						sub: [{
							name: 'iconebandeira em paisnatal',
							find: /(\| *paisnatal *= *)(?:\[\[)?([^ {}\[\]\r\n][^{}\[\]\r\n]*)(?:\]\])?\r?\n/,
							replace: '$1{{subst:chaves-abre}}{{subst:ISO2|$2}}{{subst:chaves-fecha}}\n',
							num: 1
						}, {
							name: '{{BRAb}} -> {{BRA}} em paisnatal',
							find: /(\| *paisnatal *= *)\{\{([A-Z]+)b\}\}\r?\n/,
							replace: '$1{{$2}}\n',
							num: 1
						}]
					}, {
						name: 'pé',
						find: '',
						replace: '',
						num: 1,
						ifhas: /\| *pé *= *[^ \r\n]/,
						sub: [{
							name: 'direito -> destro',
							find: /( \| *pé *= *)(?:\[\[)?[Dd]ireito(?:\]\])?\r?\n/,
							replace: '$1[[destro]]\n',
							num: 1
						}, {
							name: 'esquerdo -> canhoto',
							find: /( \| *pé *= *)(?:\[\[)?[Ee]squerdo(?:\]\])?\r?\n/,
							replace: '$1[[canhoto]]\n',
							num: 1
						}, {
							name: 'colchetes no pé',
							find: /( \| *pé *= *)([^\[\n]*)\r?\n/,
							replace: '$1[[$2]]\n',
							num: 1
						}]
					}, {
						name: '{{Seta fut}}',
						find: '[[Empréstimo (futebol)|→]]',
						replace: '{{Seta fut}}',
						num: 100
					}, {
						name: '{{Seta fut}}',
						find: '→',
						replace: '{{Seta fut}}',
						num: 100
					}, {
						name: '{{emp fut}}',
						find: /\[\[Empréstimo \(futebol\)\|\(E\)\]\]/i,
						replace: '{{emp fut}}',
						num: 10
					}, {
						name: '{{emp fut}}',
						find: '(E)',
						replace: '{{emp fut}}',
						num: 100
					}]
				}, {
					name: 'Introdução',
					find: '',
					replace: '',
					num: 1,
					ifhas: '╚',
					sub: [{
						name: 'mais conhecido como',
						find: /(╚[^╝]*conhecido )(?:no mundo de futebol|apenas) (?:como|por) /,
						replace: '$1como ',
						num: 1
					}, {
						name: 'conhecido antes de nascido',
						find: /(╚[^╝]*''') (\([^\(\)\n]*\)).*(, mais conhecido como[^\,\n]*)\,/,
						replace: '$1$3 $2,',
						num: 1
					}, {
						name: 'nascido em',
						find: /(╚[^╝]*\()nascido em /i,
						replace: '$1',
						num: 1
					}, {
						name: 'cidade natal',
						find: /(\| *cidadenatal *= *([^\r\n]+)\r?\n[^╚]+╚[^╝]+)\((\[\[[0-9])/,
						replace: '$1($2, $3',
						num: 1,
						ifhas: /\| *cidadenatal *= *[^\r\n ]/i,
						ifnot: /╚[^╝]*\(\[\[[^0-9]/i
					}, {
						name: 'jogador de futebol',
						find: /(╚[^╝]*)jogador de futebol/,
						replace: '$1futebolista',
						num: 1
					}, {
						name: 'que atua',
						find: /(╚[^╝]*)que joga(va)? /,
						replace: '$1que atua$2 ',
						num: 1
					}, {
						name: 'atuava como',
						find: /(╚[^╝]*atua(?:va)?) na posição de /,
						replace: '$1 como ',
						num: 10
					}, {
						name: 'joga pelo',
						find: /(╚[^╝]*)defende o /,
						replace: '$1joga pelo ',
						num: 1
					}, {
						name: 'Atualmente, joga pelo',
						find: /(╚[^╝]*futebolista[^\,\n]*\, que atua como [^\,\n]*) (no|pelo)/,
						replace: '$1. Atualmente, joga pelo',
						num: 1
					}, {
						name: 'que atualmente joga como',
						find: /(╚[^╝]*)que atualmente joga como ([^╝]*) pelo (\[\[[^\]\n]*\]\])/,
						replace: '$1que atua como $2. Atualmente, joga pelo $3',
						num: 1
					}, {
						name: 'colocando clube atual',
						find: /(\| *actualclube *= *(?:\{\{[A-Z]*b\}\})? *(\[\[[^\[\]\{\}\r\n]*\]\]))([^╝]*)(\.╝)/,
						replace: '$1$3. Atualmente, joga pelo $2$4',
						num: 1,
						ifhas: /\| *actualclube *= *[^\r\n]/i,
						ifnot: /╚[^╝]*Atualmente/i
					}, {
						name: 'link interno na introdução',
						find: '',
						replace: '',
						num: 1,
						ifhas: '╚',
						sub: [{
							name: '[[futebolista]] na introd',
							find: /(╚[^╝]*[^\[])futebolista([^\]])/,
							replace: '$1[[futebolista]]$2',
							num: 1
						}, {
							name: '[[nacionalidade]] na introd',
							find: /(╚[^╝]*\[\[futebolista\]\]) ([^\[][^ \n\,]*), /,
							replace: '$1 [[$2]], ',
							num: 1
						}, {
							name: '[[posição]] na introdução',
							find: /(╚[^╝]*que atua(?:va)? como )([^\[\]\n\,\.]+)( do |\.\,)/,
							replace: '$1[[$2]]$3',
							num: 1
						}]
					}, {
						name: 'retirando',
						find: '',
						replace: '',
						num: 1,
						sub: [{
							name: 'atua como [[posição]] do [[clube]]',
							find: /(╚[^╝]*atua como (?:\[\[[^\[\]\n]+\]\])) do \[\[[^\[\]\n]+\]\]/i,
							replace: '$1',
							num: 1
						}]
					}]
				}, {
					name: 'Ligações internas',
					find: '',
					replace: '',
					num: 1,
					ifhas: /\[\[/i,
					sub: [{
						name: '[[guarda-redes]]',
						find: /\[\[([Gg])uarda\-redes\]\]/,
						replace: '[[Goleiro|$1uarda-redes]]',
						num: 100
					}, {
						name: '[[volante]]',
						find: /\[\[([Vv])olante\]\]/,
						replace: '[[$1olante (futebol)|$1olante]]',
						num: 100
					}, {
						name: '[[ala]]',
						find: /\[\[([Aa])la\]\]/,
						replace: '[[$1la (futebol)|$1la]]',
						num: 100
					}, {
						name: '[[lateral]]',
						find: /\[\[([Ll])ateral\]\]/,
						replace: '[[$1ateral (futebol)|$1ateral]]',
						num: 1
					}, {
						name: '[[atacante]]',
						find: /\[\[([Aa])tacante\]\]/,
						replace: '[[$1tacante (futebol)|$1tacante]]',
						num: 100
					}, {
						name: '[[líbero]]',
						find: /\[\[([Ll])íbero\]\]/,
						replace: '[[$1íbero (futebol)|$1íbero]]',
						num: 100
					}, {
						name: '[[futebol]]ista',
						find: /\[\[([Ff])utebol\]\]ista(s?[^a-z])/,
						replace: '[[$1utebolista]]$2',
						num: 1
					}, {
						name: '-LI em {footballbox |data=',
						find: /(\{\{footballbox[^{}]*\| *data *=[^\|\n]*)\[\[([1-3]?[0-9] de ((?:jan|fever)eiro|março|abril|maio|ju[nl]ho|agosto|(?:setem|outu|novem|dezem)bro)|[1-2][0-9]{3,3})\]\]/i,
						replace: '$1$2',
						num: 2
					}, {
						name: '- atualização',
						find: /(<small> *'* *Até )\[\[([1-3]?[0-9] de (?:(?:jan|fever)eiro|março|abril|maio|ju[nl]ho|agosto|(?:setem|outu|novem|dezem)bro))\]\] de \[\[([1-2][0-9]{3,3})\]\]/i,
						replace: '$1$2 de $3',
						num: 10
					}]
				}, {
					name: '-atual',
					find: /\-(?:atual|atualmente|presente)([^a-z])/i,
					replace: '–$1',
					num: 10
				}, {
					name: 'Seções',
					find: '',
					replace: '',
					num: 1,
					sub: [{
						name: '= Carreira internacional =',
						find: '= Carreira Internacional =',
						replace: '= Carreira internacional =',
						num: 1
					}, {
						name: '= Títulos =',
						find: '= Títulos e Honras =', // FIXME: /= Títulos e Honras =/i ?
						replace: '= Títulos =',
						num: 1
					}, {
						name: 'Rule',
						find: '= Classificação Final =',
						replace: '= Classificação final =',
						num: 1
					}]
				}, {
					enabled: false,
					name: 'Títulos',
					find: '',
					replace: '',
					num: 1,
					sub: [{
						name: '; Clube',
						find: /(= Títulos \=+[^║]*)║\={3,} (.*) \={3,}\r?\n/i,
						replace: '$1; $2\n',
						num: 97
					}, {
						name: '[[Competição]]: Ano',
						find: /(= Títulos \=+[^║]*\* \[\[[^\[\]\n]*\]\]) \- /i,
						replace: '$1: ',
						num: 100
					}]
				}, {
					// FIXME: Arrumar regras de |posição=, agora que temos regras de Ligações internas
					enabled: false,
					name: 'Melhorias',
					find: '',
					replace: '',
					num: 1
				}]
			}]
		}]
	}, {
		name: 'Parte Sup 2',
		find: '',
		replace: '',
		num: 1,
		sub: [{
			name: 'Ajuste Infobox',
			find: '',
			replace: '',
			num: 1,
			ifhas: /\{\{Info\//i,
			sub: [{
				name: 'Ajuste em nome (xxx)',
				find: /(\{\{Info\/[^╣]*\| *nome *= [^\(\)\n]*)\([^\(\)\n]*\)\r?\n/i,
				replace: '$1\n',
				num: 1,
				ifhas: '╣'
			}, {
				name: 'Campos infobox',
				find: '',
				replace: '',
				num: 1,
				sub: [{
					name: 'imagem desmembrada',
					find: '',
					replace: '',
					num: 1,
					ifhas: /╣/i,
					sub: [{
						name: 'padronizando imagem',
						find: /(\n *\| *imagem *= *╠[^▒\n]*)\|(?:thumb|right|center|left|direita|centrp|esquerda)/i,
						replace: '$1',
						num: 10
					}, {
						name: 'preenche os campos',
						find: /(\n *\| *)imagem( *)=( *)╠(?:Imagem?|File|Arquivo|Ficheiro):([^\|\n]*)(?:\|([0-9]*px))?(?:\|([^\|\n]+))?▒\]\]/i,
						replace: '$1imagem$2=$3$4$1imagem_tamanho$2=$3$5$1imagem_legenda$2=$3$6',
						num: 1
					}, {
						name: 'espaçamento',
						find: /(\{\{Info\/[^╣]*\n *\| *imagem {8,8})( +)(= .*\r?\n *\| *imagem_tamanho) *(=.*\r?\n *\| *imagem_legenda) *(= )/i,
						replace: '$1$2$3$2$4$2$5',
						num: 1,
						ifhas: /\{\{Info\/[^╣]*\n *\| *imagem {9,}= /i
					}, {
						name: 'Rule',
						find: /\| *imagem_legenda *= *\r?\n *(\| *imagem_legenda *= *[^ \r\n])/i,
						replace: '$1',
						num: 1
					}, {
						name: 'imagem_legenda tag',
						find: /(imagem_legenda *= *)<center>([^\n]+)<\/center>\r?\n/i,
						replace: '$1$2\n',
						num: 1
					}, {
						name: '-tamanho',
						find: /(\r?\n *\| *imagem_legenda *=.*[^╣]*)\| *imagem_tamanho *= *\r?\n/i,
						replace: '$1\n',
						num: 10,
						ifhas: /\r?\n *\| *imagem_tamanho *= *[^\r\n]/i
					}, {
						name: '-legenda',
						find: /(\r?\n *\| *imagem_legenda *=.*[^╣]*)\| *imagem_legenda *= *\r?\n/i,
						replace: '$1\n',
						num: 10
					}, {
						name: 'Rule',
						find: /\r?\n *\| *imagem_legenda *= *\r?(\n[^╣]*\| *imagem_legenda *= *[^ \r\n].*\r?\n)/i,
						replace: '$1',
						num: 10
					}]
				}]
			}]
		}]
	}, {
		/* *****
só foi criada, é uma versão antiga, não cheguei a testar.
está desabilitada pq deve ter mais bugs q as regras de teste normais
quem quiser pode habilitar e ajudar a testar
***** */
		enabled: false,
		name: 'Erro em colchetes',
		find: '',
		replace: '',
		num: 1,
		ifnot: /(<(blockquote|code|math|timeline|pre|poem|nowiki|quote|source)|\{\{(Citação|Quim))/i,
		sub: [{
			name: 'sequencia 1',
			find: /(\[\[[^\[\]\n▒]*\]\], )([^\[\] \n▒]+\]\])/,
			replace: '$1[[$2',
			num: 1
		}, {
			name: 'sequencia 2',
			find: /(, \[\[[^\[\] \n▒]+)( \([0-9]{4,4}\),)/,
			replace: '$1]]$2',
			num: 1
		}, {
			name: '[[Ano]] / [[Ano',
			find: /(\[\[[0-9]{4,4}\]\] *\/ *\[\[[0-9]{4,4})( *[^ \|\]])/,
			replace: '$1]]$2',
			num: 1
		}, {
			name: '[[dia de mes]] de [[ano',
			find: /(\[\[[1-3]?[0-9] de [^\[\] \n]+\]\] de \[\[[0-9]{4,4})([^\]\|])/,
			replace: '$1]]$2',
			num: 1
		}, {
			name: ']] de ano]]',
			find: /(\]\] de )([0-9]{4,4}\]\])/,
			replace: '$1[[$2]]',
			num: 1
		}]
	}]
}, {
	// Regras específicas para outros domínios sem ser o principal
	// Ainda em teste
	enabled: false,
	name: 'Outros domínios',
	find: '',
	replace: '',
	num: 1,
	sub: [{
		enabled: false,
		name: 'Desambiguação',
		find: '',
		replace: '',
		num: 1,
		ifhas: /(\{\{desambiguação[\|}]|\[\[Categoria:Desambiguaç(ão|ões))/i,
		sub: [{
			name: 'Padronizando',
			find: '',
			replace: '',
			num: 1,
			sub: [{
				name: 'Rule',
				find: /\{\{desambig([\|}])/i,
				replace: '{{desambiguação$1',
				num: 1
			}]
		}, {
			name: 'Marcando',
			find: '',
			replace: '',
			num: 1,
			sub: [{
				name: 'marca título',
				find: '▓',
				replace: '▓%%title%%╦\n',
				num: 1,
				sub: [{
					name: 'retira (desambiguação) do título',
					find: ' (desambiguação)╦',
					replace: '╦',
					num: 1
				}]
			}]
		}, {
			name: '+ {{desambiguação}}',
			find: /╦/i,
			replace: '╦\n{{Desambiguação}}',
			num: 1,
			ifhas: /\[\[Categoria:Desambiguaç(ão|ões)/i,
			ifnot: /\{\{desambiguação.*\}\}/i
		}, {
			name: '+Cat',
			find: '░',
			replace: '[[Categoria:Desambiguação]]\n░',
			num: 1,
			ifhas: '{{desambiguação', // FIXME: /\{\{desambiguação/i ?
			ifnot: '[[Categoria:Desambiguaç' // FIXME: /[[Categoria:Desambiguaç/i ?
		}, {
			name: 'Recat',
			find: '',
			replace: '',
			num: 1,
			ifhas: /\[\[Categoria:Desambiguação([\]\|])/i,
			sub: [{
				name: 'recat siglas',
				find: /\[\[Categoria:Desambiguação([\]\|])/i,
				replace: '[[Categoria:Desambiguações de siglas$1',
				num: 1,
				ifhas: /▓[A-Z][^a-z╦]+╦/
			}]
		}, {
			name: 'Geral',
			find: '',
			replace: '',
			num: 1,
			sub: [{
				name: 'quebra de linha',
				find: /(\r?\n){3,}/i,
				replace: '\n\n',
				num: 100
			}, {
				name: '{{TOC}}',
				find: /\{\{TOC\}\}\r?\n/i,
				replace: '',
				num: 1,
				ifnot: /\n==/i
			}, {
				name: 'espaço no início',
				find: /\n +([^ ])/i,
				replace: '\n$1',
				num: 100
			}, {
				name: 'espaço no final',
				find: /([^ ]) +\r?\n/i,
				replace: '$1\n',
				num: 1
			}]
		}, {
			name: 'Rule',
			find: /\n#([^#])/,
			replace: '\n*$1',
			num: 1
		}, {
			name: 'quebra após {{desambiguação}}',
			find: /(\{\{desambiguação\}\})\r?\n([^\r\n])/i,
			replace: '$1\n\n$2',
			num: 1
		}, {
			name: 'Rule',
			find: /([^\]\r\n])\r?\n\[\[Categoria:/i,
			replace: '$1\n\n[[Categoria:',
			num: 1
		}, {
			name: 'introdução',
			find: '',
			replace: '',
			num: 1,
			sub: [{
				name: 'Negrito do termo',
				find: /(▓([^\n╦]+)╦[^░]*\{\{desambiguação\}\}\r?\n\r?\n(?:.* )?)\2 /i,
				replace: '$1\'\'\'$2\'\'\' ',
				num: 1,
				ifnot: /\{\{desambiguação\}\}\r?\n\r?\n[^\*\n]*'''/i
			}, {
				name: 'Ao procurar',
				find: /\n'*(?:Ao procurar por|Pela sigla) '*([^'\n]+)'*,? (?:você )?pode estar à procura de:?'*\r?\n/i,
				replace: '\n\'\'\'$1\'\'\' pode referir-se a:\n',
				num: 1
			}, {
				name: 'Texto antes da ocorrência do termo',
				find: /\n(?:O termo|A palavra|Por) ('''[^'\n]+''')/,
				replace: '\n$1',
				num: 1
			}, {
				name: 'é um [[acrónimo',
				find: /''' é um (\[\[)?acrónimo(\]\])? (para|que pode significar):\r?\n/i,
				replace: '\'\'\' pode referir-se a:\n',
				num: 1
			}, {
				name: 'pode referir-se a',
				find: /'',?(?: também)? (?:pode|possui)(m)? (?:definir|se referir|referir\-se|remeter|ser|ser uma sigla|significar|estar a referir-se|ser|ter diversos significados|ter os seguintes significados) *(às diferentes entradas|aos seguintes artigos)?( [dn]a Wikip[eé]dia)?( ao?|para)?\:?\r?\n/i,
				replace: '\'\' pode$1 referir-se a:\n',
				num: 1,
				sub: [{
					name: 'sigla',
					find: /\nA sigla (''+[^\'\n\[\]]+''+ pode referir-se a:)/i,
					replace: '\n$1',
					num: 1
				}]
			}, {
				name: 'criando introdução',
				find: /\{\{desambiguação\}\}((?:\r?\n)*(?:[=;]|\* *\[\[))/i,
				replace: '{{desambiguação|%%title%%}}$1',
				num: 1,
				sub: [{
					name: '- (desambiguação)',
					find: /(\{\{desambiguação\|[^{}]*) \(desambiguação\)\}\}/i,
					/* FIXME: Singleline */
					replace: '$1}}',
					num: 1
				}]
			}, {
				name: '- (desambiguação)',
				find: ' (desambiguação)\'\'\' pode referir-se a:',
				replace: '\'\'\' pode referir-se a:',
				num: 1
			}, {
				name: 'inserindo termo na {{desambiguação}}',
				find: '',
				replace: '',
				num: 1,
				sub: [{
					name: 'inserindo termo na {{desambiguação}} 1',
					find: /\{\{desambiguação\}\}\r?\n\r?\n''+([^\'\n]+)''+ pode referir-se a:\r?\n/i,
					replace: '{{Desambiguação|$1}}\n\n',
					num: 1
				}, {
					name: 'inserindo termo na {{desambiguação}} 2',
					find: /\{\{desambiguação\}\}\r?\n\r?\n''+([^\'\n]+)''+ (?:e|ou) ''+([^\'\n]+)''+ podem referir-se a:\r?\n/i,
					replace: '{{desambiguação|$1|$2}}\n\n',
					num: 1
				}, {
					name: 'inserindo termo na {{desambiguação}} 3',
					find: /\{\{desambiguação\}\}\r?\n\r?\n''+([^\'\n]+)''+, ''+([^\'\n]+)''+ (?:e|ou) ''+([^\'\n]+)''+ podem? referir-se a:\r?\n/i,
					replace: '{{desambiguação|$1|$2|$3}}\n\n',
					num: 1
				}, {
					name: 'inserindo termo na {{desambiguação}} 4',
					find: /\{\{desambiguação\}\}\r?\n\r?\n''+([^\'\n]+)''+, ''+([^\'\n]+)''+, ''+([^\'\n]+)''+ (?:e|ou) ''+([^\'\n]+)''+ podem? referir-se a:\r?\n/i,
					replace: '{{desambiguação|$1|$2|$3|$4}}\n\n',
					num: 1
				}]
			}, {
				name: 'Rule',
				find: /\n\r?\n\r?\n/i,
				replace: '\n\n',
				num: 1
			}]
		}, {
			name: 'Entradas da lista',
			find: '',
			replace: '',
			num: 1,
			sub: [{
				name: 'tirando ponto final das entradas',
				find: /(\n\*[^\r\n]+[^\.\:\;])[\.\:\;\,]\r?\n/i,
				replace: '$1\n',
				num: 10
			}, {
				name: '* Pode ser',
				find: /\n\* *Pode ser /i,
				replace: '\n* ',
				num: 1
			}, {
				name: '* um',
				find: /\n\* *(?:uma?|[ao]) /i,
				replace: '\n* ',
				num: 1
			}, {
				name: 'xxx é',
				find: /(\n\* *\[\[[^\[\]\n]+\]\]) é /i,
				replace: '$1, ',
				num: 1
			}, {
				name: 'xxx é',
				find: /(\]\]( - |, ))é /i,
				replace: '$1',
				num: 1
			}, {
				name: '—',
				find: '—',
				replace: '-',
				num: 1
			}, {
				name: '* [[xxx]]:',
				find: /(\n\* *\[\[[^\[\]\n]*\]\]): /i,
				replace: '$1, ',
				num: 1
			}]
		}, {
			enabled: false,
			name: 'ligações internas (modo revisão)',
			find: '',
			replace: '',
			num: 1,
			sub: [{
				name: 'tirando link com pipeline',
				find: /(▓([^╦\n]+)╦\n[^▓]*\[\[[^\[\]\|\n]+)\|\2\]\]/i,
				replace: '$1]]',
				num: 100
			}, {
				name: 'um link por entrada',
				find: /(\n\*[^\[\]\n]*\[\[[^\[\]\n]*\]\]\'*[^\[\]\'\n]*)\[\[(?:[^\[\]\|\n]+\|)?([^\[\]\|\n]*)\]\]/i,
				replace: '$1$2',
				num: 10
			}, {
				name: 'pipeline no início da entrada',
				find: /(\* *\[\[[^\[\]\|\n]+)\|[^\[\]\|\n]+(\]\] *[,\-])/,
				replace: '$1$2',
				num: 1
			}]
		}, {
			enabled: false,
			name: '; Termo 1 (modo revisão)',
			find: /\n\* *\'+([^\'\n]+)\'+\r?\n/i,
			replace: '\n; $1\n',
			num: 1
		}, {
			name: 'termos impróprios',
			find: /(uma?) famos[ao] /i,
			replace: '$1 ',
			num: 1
		}, {
			name: 'manutenção de desambig',
			find: '',
			replace: '',
			num: 1,
			sub: [{
				name: 'Insere',
				find: /(\{\{desambiguação.*\}\})/i,
				replace: '{{Manutenção de desambiguação|}}\n$1',
				num: 1
			}, {
				name: 'um termo',
				find: /\{\{Manutenção de desambiguação\|/i,
				replace: '{{Manutenção de desambiguação|1|',
				num: 1,
				ifhas: /▓[^\*░]*\n\*[^\*░]*░/i,
				ifnot: /\{\{Manutenção de desambiguação[^\{\}\n]*\|1[\|}]/i
			}, {
				name: 'dois termos',
				find: /\{\{Manutenção de desambiguação\|/i,
				replace: '{{Manutenção de desambiguação|2|',
				num: 1,
				ifhas: /▓[^\*░]*\n\*[^\*░]*\n\*[^\*░]*░/i,
				ifnot: /\{\{Manutenção de desambiguação[^\{\}\n]*\|2[\|}]/i
			}, {
				enabled: false,
				name: 'sem descrição',
				find: /\{\{Manutenção de desambiguação\|/i,
				replace: '{{Manutenção de desambiguação|descrição|',
				num: 1,
				ifhas: /\n\* *\'*\[\[[^\[\]\n]+\]\]\'*\r?\n/i,
				ifnot: /\{\{Manutenção de desambiguação[^\{\}\n]*\|(desc|descrição)[\|}]/i
			}, {
				enabled: false,
				name: 'pipelink (modo revisão)',
				find: /\{\{Manutenção de desambiguação\|/i,
				replace: '{{Manutenção de desambiguação|pipe|',
				num: 1,
				ifhas: /\n\* *'*\[\[[^\[\|\]\n]+\|/i,
				ifnot: /(\{\{Manutenção de desambiguação[^\{\}\n]*\|(pipe)[\|}]|Ver também)/i
			}, {
				enabled: false,
				name: 'sem link (modo revisão)',
				find: /\{\{Manutenção de desambiguação\|/i,
				replace: '{{Manutenção de desambiguação|sem link|',
				num: 1,
				ifhas: /\n\*[^\[\]\n]*\n/i,
				ifnot: /\{\{Manutenção de desambiguação[^\{\}\n]*\|(link|sem link)[\|}]/i
			}, {
				name: 'Remove',
				find: /\{\{Manutenção de desambiguação\|\}\}\r?\n/i,
				replace: '',
				num: 1
			}, {
				name: 'Ajuste',
				find: /(\{\{Manutenção de desambiguação[^{}\n]*)\|\}\}/i,
				replace: '$1}}',
				num: 1
			}]
		}, {
			name: 'Desmarcando',
			find: '',
			replace: '',
			num: 1,
			sub: [{
				name: 'Desmarca título',
				find: /▓[^╦]+╦\n/i,
				replace: '',
				num: 1
			}]
		}]
	}, {
		enabled: false,
		name: 'Predefinição',
		find: '',
		replace: '',
		num: 1,
		sub: [{
			name: 'Minúscula para campos',
			find: '',
			replace: '',
			num: 1,
			ifhas: /\{\{\{[A-Z][a-z]/,
			sub: [{
				name: '{{{A',
				find: /([^{])\{\{\{A([a-z][^\|\{\}\n]+)\|?\}\}\}/,
				replace: '$1{{{A$2|}}}{{{a$2|}}}',
				num: 1
			}, {
				name: '{{{B',
				find: /([^{])\{\{\{B([a-z][^\|\{\}\n]+)\|?\}\}\}/,
				replace: '$1{{{B$2|}}}{{{b$2|}}}',
				num: 1
			}, {
				name: '{{{C',
				find: /([^{])\{\{\{C([a-z][^\|\{\}\n]+)\|?\}\}\}/,
				replace: '$1{{{C$2|}}}{{{c$2|}}}',
				num: 1
			}, {
				name: '{{{D',
				find: /([^{])\{\{\{D([a-z][^\|\{\}\n]+)\|?\}\}\}/,
				replace: '$1{{{D$2|}}}{{{d$2|}}}',
				num: 1
			}, {
				name: '{{{E',
				find: /([^{])\{\{\{E([a-z][^\|\{\}\n]+)\|?\}\}\}/,
				replace: '$1{{{E$2|}}}{{{e$2|}}}',
				num: 1
			}, {
				name: '{{{F',
				find: /([^{])\{\{\{F([a-z][^\|\{\}\n]+)\|?\}\}\}/,
				replace: '$1{{{F$2|}}}{{{f$2|}}}',
				num: 1
			}, {
				name: '{{{G',
				find: /([^{])\{\{\{G([a-z][^\|\{\}\n]+)\|?\}\}\}/,
				replace: '$1{{{G$2|}}}{{{g$2|}}}',
				num: 1
			}, {
				name: '{{{H',
				find: /([^{])\{\{\{H([a-z][^\|\{\}\n]+)\|?\}\}\}/,
				replace: '$1{{{H$2|}}}{{{h$2|}}}',
				num: 1
			}, {
				name: '{{{I',
				find: /([^{])\{\{\{I([a-z][^\|\{\}\n]+)\|?\}\}\}/,
				replace: '$1{{{I$2|}}}{{{i$2|}}}',
				num: 1
			}, {
				name: '{{{J',
				find: /([^{])\{\{\{J([a-z][^\|\{\}\n]+)\|?\}\}\}/,
				replace: '$1{{{J$2|}}}{{{j$2|}}}',
				num: 1
			}, {
				name: '{{{K',
				find: /([^{])\{\{\{K([a-z][^\|\{\}\n]+)\|?\}\}\}/,
				replace: '$1{{{K$2|}}}{{{k$2|}}}',
				num: 1
			}, {
				name: '{{{L',
				find: /([^{])\{\{\{L([a-z][^\|\{\}\n]+)\|?\}\}\}/,
				replace: '$1{{{L$2|}}}{{{l$2|}}}',
				num: 1
			}, {
				name: '{{{M',
				find: /([^{])\{\{\{M([a-z][^\|\{\}\n]+)\|?\}\}\}/,
				replace: '$1{{{M$2|}}}{{{m$2|}}}',
				num: 1
			}, {
				name: '{{{N',
				find: /([^{])\{\{\{N([a-z][^\|\{\}\n]+)\|?\}\}\}/,
				replace: '$1{{{N$2|}}}{{{n$2|}}}',
				num: 1
			}, {
				name: '{{{O',
				find: /([^{])\{\{\{O([a-z][^\|\{\}\n]+)\|?\}\}\}/,
				replace: '$1{{{O$2|}}}{{{o$2|}}}',
				num: 1
			}, {
				name: '{{{P',
				find: /([^{])\{\{\{P([a-z][^\|\{\}\n]+)\|?\}\}\}/,
				replace: '$1{{{P$2|}}}{{{p$2|}}}',
				num: 1
			}, {
				name: '{{{Q',
				find: /([^{])\{\{\{Q([a-z][^\|\{\}\n]+)\|?\}\}\}/,
				replace: '$1{{{Q$2|}}}{{{q$2|}}}',
				num: 1
			}, {
				name: '{{{R',
				find: /([^{])\{\{\{R([a-z][^\|\{\}\n]+)\|?\}\}\}/,
				replace: '$1{{{R$2|}}}{{{r$2|}}}',
				num: 1
			}, {
				name: '{{{S',
				find: /([^{])\{\{\{S([a-z][^\|\{\}\n]+)\|?\}\}\}/,
				replace: '$1{{{S$2|}}}{{{s$2|}}}',
				num: 1
			}, {
				name: '{{{T',
				find: /([^{])\{\{\{T([a-z][^\|\{\}\n]+)\|?\}\}\}/,
				replace: '$1{{{T$2|}}}{{{t$2|}}}',
				num: 1
			}, {
				name: '{{{U',
				find: /([^{])\{\{\{U([a-z][^\|\{\}\n]+)\|?\}\}\}/,
				replace: '$1{{{U$2|}}}{{{u$2|}}}',
				num: 1
			}, {
				name: '{{{V',
				find: /([^{])\{\{\{V([a-z][^\|\{\}\n]+)\|?\}\}\}/,
				replace: '$1{{{V$2|}}}{{{v$2|}}}',
				num: 1
			}, {
				name: '{{{W',
				find: /([^{])\{\{\{W([a-z][^\|\{\}\n]+)\|?\}\}\}/,
				replace: '$1{{{W$2|}}}{{{w$2|}}}',
				num: 1
			}, {
				name: '{{{X',
				find: /([^{])\{\{\{X([a-z][^\|\{\}\n]+)\|?\}\}\}/,
				replace: '$1{{{X$2|}}}{{{x$2|}}}',
				num: 1
			}, {
				name: '{{{Y',
				find: /([^{])\{\{\{Y([a-z][^\|\{\}\n]+)\|?\}\}\}/,
				replace: '$1{{{Y$2|}}}{{{y$2|}}}',
				num: 1
			}, {
				name: '{{{Z',
				find: /([^{])\{\{\{Z([a-z][^\|\{\}\n]+)\|?\}\}\}/,
				replace: '$1{{{Z$2|}}}{{{z$2|}}}',
				num: 1
			}]
		}]
	}]
}, {
	enabled: false,
	name: 'Regras pessoais',
	find: '',
	replace: '',
	num: 1,
	sub: [{
		enabled: false,
		name: '{{subst:Páginas curtas}}',
		find: /\n\[\[Categoria:Desambiguaç/i,
		replace: '\n\n{{subst:Páginas curtas}}\n[[Categoria:Desambiguaç',
		num: 1,
		ifnot: /Páginas curtas\}\}/i,
		sub: [{
			name: 'Rule',
			find: /(\{\{subst:Páginas curtas\}\}[^░]*)\{\{subst:Páginas curtas\}\}\r?\n/i,
			replace: '$1',
			num: 1
		}]
	}, {
		enabled: false,
		name: 'Extrair lista de campos de uma predef',
		find: '',
		replace: '',
		num: 1,
		sub: [{
			name: 'Rule',
			find: /(\{\{\{)([^\{\}\|]+)([\{\}\|])/i,
			replace: '$1╔$2╗$3',
			num: 1
		}, {
			name: 'Rule',
			find: /╗[^╔╗]+╔/i,
			replace: '╗\n╔',
			num: 1
		}, {
			name: 'Rule',
			find: /(╔([^╔╗]*)╗[^░]*)\n╔\2╗/i,
			replace: '$1',
			num: 100
		}, {
			name: 'Rule',
			find: /▓[^╔]+╔/i,
			replace: '╔',
			num: 1
		}, {
			name: 'Rule',
			find: /╗[^╗░]*░/i,
			replace: '╗',
			num: 1
		}, {
			name: 'Rule',
			find: /[╔╗]/i,
			replace: '',
			num: 1
		}]
	}, {
		enabled: false,
		name: 'Rule',
		find: /(\n *\| *atividade *= .*)\[\[([12][089][0-9]{2,2})\]\]/i,
		replace: '$1[[$2 na música|$2]]',
		num: 10
	}, {
		enabled: false,
		name: 'Arrumando infobox',
		find: '',
		replace: '',
		num: 1,
		ifhas: '╣}}', // FIXME: /╣}}/i ?
		sub: [{
			name: 'imagem_legenda',
			find: /(\{\{Info\/[^╣]*\n *\| *)(?:legenda_imagem|legenda|descrição)( *=)/i,
			replace: '$1imagem_legenda$2',
			num: 10
		}, {
			name: '_ no lugar de espaço',
			find: /(\{\{Info\/[^╣]*\n *\| *[^ =\n]+) ([^ \n=]+[ =\r\n])/i,
			replace: '$1_$2',
			num: 100
		}, {
			name: '| no final',
			find: /(\{\{Info\/[^╣]*\n *\| *[^\=\r\n]+\= *.*)\| *\r?\n/i,
			replace: '$1\n',
			num: 100
		}, {
			name: 'Rule',
			find: /(\{\{Info\/[^╣]*\n *\| *[^ _=\n]+)_d[aeo]s?_([^ \n=]+[ =\r\n])/i,
			replace: '$1_$2',
			num: 100
		}, {
			name: 'Info/Cinema',
			find: '',
			replace: '',
			num: 1,
			sub: [{
				name: 'ano',
				find: /(\{\{Info\/Filme[^╣]*\n *\| *ano *= *)\[\[([0-9]+)\]\]\r?(\n)/i,
				replace: '$1$2$3',
				num: 1
			}, {
				name: 'produção_executiva',
				find: /(\{\{Info\/[^╣]*\n *\| *)(?:produtor_executivo|produção_executivo)( *=)\n/i,
				replace: '$1produção_executiva$2',
				num: 1
			}, {
				name: 'lançamento',
				find: /(\{\{Info\/[^╣]*\n *\| *)(?:data\(s\) de lançamento)( *=)\n/i,
				replace: '$1lançamento$2',
				num: 1
			}]
		}, {
			name: 'Rule',
			find: /(\{\{Info\/[^╣]*\n *\| *[^\=\r\n]+ *=)\r?\n/i,
			replace: '$1 \n',
			num: 100
		}]
	}, {
		name: 'Sem-fontes-bpv',
		find: /\{\{Sem\-fontes([^{}]*)\|biografia=sim([^\n]*)\|data=[^\|\}]*([|}])/i,
		replace: '{{Sem-fontes-bpv$1$2|data={{subst:CURRENTMONTHNAME}} de {{subst:CURRENTYEAR}}$3',
		num: 1
	}]
}, {
	/* Ajuste nas regras para se adequar a nova padronização.
É feito no final para facilitar, mas o correto é mudar todas as regras.
Mas como estou com preguiça de revisar tudo, deixo por aqui por enquanto */
	name: 'Temporário',
	find: '',
	replace: '',
	num: 1,
	sub: [{
		name: 'Predef VT / LE',
		find: /\{\{(Bibliografia)\}\}/i,
		replace: '$1',
		num: 1
	}]
}, {
	/* *****
Finaliza a edição, preparando para salvar o artigo
- Retira os simbolo usados em marcações
- Lista de Ícones Usados nas marcações
- Regras antigas e futuras
*****

erro no style:
style="text-align:left;"|;"
*/
	name: 'Finalizando',
	find: '',
	replace: '',
	num: 1,
	sub: [{
		name: 'Desmarcando',
		find: '',
		replace: '',
		num: 1,
		sub: [{
			name: 'Desmarca Topo / Fim',
			find: '',
			replace: '',
			num: 1,
			sub: [{
				name: 'Desmarca fim de artigo',
				find: /\n░/i,
				replace: '',
				num: 1
			}, {
				name: 'Desmarca topo 1',
				find: /▓[^╦]*╦\r?\n/i,
				replace: '',
				num: 10
			}, {
				name: 'Desmarca topo 2',
				find: '▓',
				replace: '',
				num: 1
			}]
		}, {
			name: 'Desmarca meio',
			find: '',
			replace: '',
			num: 1,
			sub: [{
				name: 'Desmarca Comentários',
				find: '',
				replace: '',
				num: 1,
				sub: [{
					name: 'Desmarca <!--',
					find: '╔',
					replace: '&lt;!--',
					num: 1
				}, {
					name: 'Desmarca -->',
					find: '╗',
					replace: '--&gt;',
					num: 1
				}]
			}, {
				name: 'Desmarca início Ficheiro',
				find: '╠',
				replace: '[[',
				num: 100
			}, {
				name: 'Desmarca fim de ficheiro',
				find: '▒', // FIXME: /▒/i ?
				replace: '',
				num: 1
			}, {
				name: 'Desmarca primeira seção',
				find: /╩\n/i,
				replace: '',
				num: 1
			}, {
				name: 'Desmarca seções',
				find: '║',
				replace: '',
				num: 10
			}]
		}, {
			name: 'Desmarca inicio',
			find: '',
			replace: '',
			num: 1,
			sub: [{
				name: 'Desmarca fim info',
				find: '╣}}',
				replace: '}}',
				num: 1
			}, {
				name: 'Desmarca parag 1 inicio',
				find: /╚/,
				replace: '',
				num: 1
			}, {
				name: 'Desmarca parag 1 fim',
				find: '╝',
				replace: '',
				num: 1
			}]
		}, {
			name: 'Desmarca fim',
			find: '',
			replace: '',
			num: 1,
			sub: [{
				name: 'Desmarca fim de artigo',
				find: /░/i,
				replace: '',
				num: 1
			}, {
				// regra não utilizada por enquanto
				enabled: false,
				name: 'Desmarca fim última seção',
				find: /╬/i,
				replace: '',
				num: 1
			}]
		}]
	}, {
		enabled: false,
		name: 'Removidas',
		find: '',
		replace: '',
		num: 1,
		sub: [{
			enabled: false,
			name: 'Ponto final em ficheiro',
			find: 'removendo, está adicionando ponto final em legendas curtas, o que não é desejado.',
			replace: '',
			num: 1,
			sub: [{
				name: 'Ponto final em ficheiro 1',
				find: /(╠[^:\n]*:|Ficheiro:)([^\|\]▒\n]+\|[^▒\n]*[^\.][^\|\.>}])(\]\])? *▒/i,
				replace: '$1$2$3.▒',
				num: 1
			}, {
				name: 'Ponto final em ficheiro 2',
				find: /(px|thumb|thumbnail|right|left|center|border|esquerda|direita)\.▒\]\]/i,
				replace: '$1▒]]',
				num: 1
			}, {
				name: 'Ponto final em ficheiro 3',
				find: /(\.'+)\.(▒\]\])/i,
				replace: '$1$2',
				num: 1
			}]
		}]
	}, {
		name: '\r\n',
		find: /\r\n/i,
		replace: '\n',
		num: 100
	}, {
		/*
▓  ┌┬┐    ╔╦╗
▒  ├┼┤─   ╠╬╣═
░  └┴┘│   ╚╩╝║

= Marcações gerais (aplicadas no início e retiradas no final =
▓ BOF Begin of File

╣Fim de Infobox
╩primeira secao
║inicio secao
╚parag 1 inicio
╝parag 1 fim

╔ Início Comentário
╗ Fim Comentário
╠ Início Ficheiro
▒ Fim Ficheiro

╬ Final da última seção (não utilizado por enquanto)
░ EOF End of File

= Marcações temporárias (aplicadas apenas a um grupo de regras =
== Marcando ==
┼ Marca início/Marca parag 1 início / inicio5

== Geral 1 ==
┼ Tags1/small em/Marca small
┤ Tags1/small em/Marca /small

== Parte sup ==
├ Infoboxes/Marca campos na predef
┤ Infoboxes/Marca conteúdo pros campos

┼ Predefs superior/Marca [[Categoria

┴ Tag man/Multitag  -  marca predefs q serão incorporadas

== Parte cen ==
┼ Texto/Entre noinclude/Marca

== Parte inf ==
┼ REF VT LE/Marcando &lt;/ref&gt;
├ REF VT LE/Marcando ]
└ REF VT LE/Format ref/Preenchendo Citar web/Marca |língua=
┘ REF VT LE/Format ref/Preenchendo Citar web/Marca |data=
┐ REF VT LE/Format ref/Preenchendo Citar web/Marca |título=
┴ REF VT LE/Format ref/Preenchendo Citar web/Marca |acessodata=
┤ REF VT LE/Format ref/Preenchendo Citar web/Marca |arquivodata=

┼ DEFAULTSORT 1/pos errada/Marca cat

== Geral2 ==
┬ Ordem/Predef inf/Marca Portal3
└ Ordem/Seções inf/Algum
┐ Ordem/Seções inf/Algum
┴ Ordem/Seções inf/Algum
┤ Ordem/Seções inf/Algum
├ Ordem/Seções inf/Algum
┼ Ordem/Seções inf/Algum
┬ Ordem/Seções inf/Algum
┤ Ordem/Predef sup/Marca Infobox
┬ Ordem/Predef inf/Portal3
┤ Ordem/Predef inf/Categoria

├ Predefs2/Assunto
┼ Predefs2/Assunto/Arte

== Temáticos/Brasil ==
║ Brasil por Estado

== Teste ==
=== Parte REF VT LE ===
┤ -
*/
		enabled: false,
		name: 'Ícones usados',
		find: '',
		replace: '',
		num: 1
	}]
}];
// </nowiki>, para facilitar o uso de "subst:" e assinaturas