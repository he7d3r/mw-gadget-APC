/*jslint browser: true, white: true, regexp: true, todo: true */
/*global $, mw, APC */
/**
 * Lista de regras para correção de artigos da Wikipédia
 * Gerada a partir da versão 3.1.1 das configurações do AWB do [[w:User:Rjclaudio]]
 * (http://code.google.com/p/rjclaudio-awb/downloads/list)
 * Ver também:
 * - [[WP:Scripts/APC]] (documentação)
 * - [[w:User:!Silent/correções.js]]
 * - [[w:WP:Projetos/Check Wikipedia/AWB]]
 * - [[w:WP:Projetos/AWB]]
 * @tracking: [[Special:GlobalUsage/User:Helder.wiki/Tools/APC.js]] ([[File:User:Helder.wiki/Tools/APC.js]])
 */
// <nowiki>, para facilitar o uso de "subst:" e assinaturas

var addDefaultRules = function(){
'use strict';

APC.rulesVersion = '3.1.29';
APC.addRules( [{
	name: 'Iniciando',
	ifnot: /(\{\{desambiguação\}\}|\[\[Categor(?:[ií]a|y):Desambiguaç(ão|ões))/i,
	sub: [{
		name: 'Padronização',
		sub: [{
			name: 'Remoção de caracteres desnecessários',
			sub: [{
				name: 'Tabulação',
				find: /([^ ])[ \t]*\t+/ig,
				replace: '$1 '
			}, {
				name: 'Carriage return (\\r)',
				find: /\r\n/g,
				replace: '\n'
			}, {
				name: 'Itens sem conteúdo (nas listas)',
				find: /^[*#]+\n/igm,
				replace: ''
			}]
		}, {
			name: 'Trim h',
			sub: [{
				name: 'Trimming de DEFAULTSORT',
				sub: [{
					name: 'Trimming de DEFAULTSORT 1',
					find: /\{\{ *DEFAULTSORT *: *(.+)\}\}\n/g,
					replace: '{{DEFAULTSORT:$1}}\n',
					num: 100
				}, {
					name: 'Trimming de DEFAULTSORT 2',
					find: /(\{\{DEFAULTSORT:.*) +\}\}/g,
					replace: '$1}}',
					num: 100
				}]
			}, {
				name: 'Trimming em final de parágrafo',
				find: /([^ ]) +\r?\n/ig,
				replace: '$1\n',
				num: 100
			}, {
				name: 'Trimming de tag',
				ifhas: /</i,
				ifnot: /(<(blockquote|code|gallery|math|timeline|pre|poem|nowiki|quote|source)|\{\{(Citação|Quim))/,
				sub: [{
					name: 'Trimming em <tag>',
					find: /< *([^\n>]+) *\>/g,
					replace: '<$1>',
					num: 100
				}, {
					name: 'Trimming em </tag>',
					find: /([^ ]) *<\/ *([^\n>]+) *\>/ig,
					replace: '$1</$2>',
					num: 100
				}, {
					name: '<ref | <br />',
					find: / +(<ref|<br \/>)/ig,
					replace: '$1',
					num: 100
				}]
			}, {
				name: 'Trimming de categoria',
				ifhas: /Cat/i,
				sub: [{
					name: 'Trimming e tradução de categoria',
					find: /\[\[ *Categor(?:[ií]a|y) *: */ig,
					replace: '[[Categoria:',
					num: 100
				}, {
					name: 'Trimming de categoria 2',
					find: /(\[\[Categoria:.*\|.+[^ ]) +\]\]\r?\n/ig,
					replace: '$1]]\n'
				}, {
					name: 'Trimming de categoria 3',
					find: /(\[\[Categoria:.*[^\|]) +\]\]\r?\n/ig,
					replace: '$1]]\n',
					num: 100
				}]
			}, {
				name: 'Trim. hor. Ficheiro',
				find: /([\[\n\|\=]\[?)(Imagem?|File|Arquivo|Ficheiro) *: *([^ ])/ig,
				replace: '$1$2:$3',
				num: 100
			}, {
				name: 'Trimming de ligação',
				find: /\[ *([^\]\n]+) *\]/ig,
				replace: '[$1]',
				num: 100,
				ifnot: /(<(blockquote|code|gallery|math|timeline|pre|poem|nowiki|quote|source)|\{\{(Citação|Quim))/i
			}, {
				name: 'Arrumando trimming em ligação',
				find: /(\[\[Categoria:[^\|])+\|\]\]/g,
				replace: '$1 $2',
				num: 100
			}, {
				name: 'Trimming de predef',
				find: /\{\{ *(\r?\n)* */g,
				replace: '{{',
				num: 100,
				ifnot: /(<(blockquote|code|gallery|math|timeline|pre|poem|nowiki|quote|source)|\{\{(Citação|Quim))/i
			}, {
				name: 'Trimming em seções',
				find: /^(==+) *([^\=\n]*?\w[^\=\n]*?) *(==+) *\r?\n[\r\n ]*/img,
				replace: '$1 $2 $3\n',
				num: 100
			}, {
				name: 'Trimming em seção destaque',
				find: /\r?\n\; {2,}(.*)\r?\n/img,
				replace: '\n; $1\n',
				num: 100
			}, {
				name: 'Trimming hor de lista',
				find: /\r?\n *([\#\*]+) */mg,
				replace: '\n$1 ',
				num: 100
			}, {
				name: 'Trimming em ref',
				find: /(<ref[^\>]*>) +/g,
				replace: '$1',
				num: 100
			}, {
				name: 'Trm h - aspas',
				sub: [{
					name: 'Trm h - aspas iniciais',
					find: /([ \r\n]'+) +([^'\n]*[^' \r\n]'+[ \r\n])/ig,
					replace: '$1$2'
				}, {
					name: 'Trm h - aspas finais',
					find: /([ \r\n]'+[^' \r\n][^'\n]+) +('+[ \r\n])/ig,
					replace: '$1$2'
				}]
			}]
		}, {
			name: 'Trim v',
			sub: [{
				name: 'Quebra de linha em Ficheiro',
				sub: [{
					name: '1 Linha antes de Ficheiro',
					find: /\.( |\r\n)╠/g,
					replace: '.\n\n╠'
				}]
			}, {
				name: 'Quebra de linha em Infobox',
				sub: [{
					name: '}}{{Info/',
					find: /\}\}\{\{Info\//g,
					replace: '}}\n{{Info/'
				}, {
					name: 'Antes de {{Info',
					find: /(\r?\n){2,}\{\{Info/g,
					replace: '\n{{Info'
				}, {
					name: 'Após Infobox',
					find: /\r?\n\}\}(?:\r?\n){2,}/g,
					replace: '\n}}\n'
				}]
			}, {
				name: 'Quebra de linha em cats',
				sub: [{
					name: 'trim v+ antes cats 1',
					find: /([^\r\n])(\[\[Categoria:)/ig,
					replace: '$1\n$2',
					num: 10
				}, {
					name: 'trim v+ antes cats 2',
					find: /([^\]\r\n])(?:\r?\n)\[\[Categoria:/ig,
					replace: '$1\n\n[[Categoria:'
				}, {
					name: 'trim v+ antes cats 3',
					find: /(\{\{DEFAULTSORT:[^{}\n]+\}\})(?:\r?\n){2,}(\[\[Categoria:)/g,
					replace: '$1\n$2'
				}, {
					name: 'trim v- entre cats',
					find: /(\[\[Categoria:[^\[\]\n]+\]\])(?:\r?\n){2,}(\[\[Categoria:)/ig,
					replace: '$1\n$2'
				}, {
					name: 'trim v+ depois cats',
					find: /(\[\[Categoria:[^\[\]\n]+\]\])([^\r\n])/ig,
					replace: '$1\n$2'
				}]
			}, {
				name: 'Quebra de linha em iws',
				find: /([^\]])\]\r?\n(\[\[[a-z][a-z]:)/ig,
				replace: '$1]\n\n$2'
			}, {
				name: 'Trim v- final predef',
				find: /\r?\n\r?\n\}\}/ig,
				replace: '\n}}',
				num: 100
			}, {
				name: 'Trim v- após predef',
				find: /\r?\n\}\}(?:\r?\n){2,}/g,
				replace: '\n}}\n'
			}, {
				name: 'Trim v- antes seção',
				find: /(\r?\n){3,}\=/g,
				replace: '\n\n=',
				num: 100
			}, {
				name: 'Trim v+ antes seção',
				find: /([^\r\n])\r?\n\=\=/ig,
				replace: '$1\n\n==',
				num: 10
			}, {
				name: 'Trim v- após seção',
				find: /\=\=(?:\r?\n){2,}/g,
				replace: '==\n',
				num: 100
			}, {
				name: 'Trim v- de lista 1',
				find: /(\r?\n) *([\#\*])([^\n\r\*]*)\r?\n *(\r?\n) *([\#\*])/mg,
				replace: '$1$2$3$4$5',
				num: 100
			}]
		}, {
			name: 'Destaque seções',
			sub: [{
				name: 'Destaque seções 1',
				find: /\r?\n(\=+)([^ =])/ig,
				replace: '\n$1 $2'
			}, {
				name: 'Destaque seções 2',
				find: /([^ =])(\=+)\r?\n/ig,
				replace: '$1 $2\n'
			}, {
				name: 'Destaque seções 3',
				find: /\r?\n\;([^ ;])/ig,
				replace: '\n; $1'
			}]
		}, {
			name: 'Etiqueta HTML mal formatada',
			find: /<([a-z]+) *[a-z]* *\=+\>/ig,
			replace: '<$1>',
			num: 10
		}, {
			name: 'Tags padrão',
			ifhas: '<',
			sub: [{
				name: '<br /> nome do código',
				find: /< *\/? *br *\/? *.?.? *\>/ig,
				replace: '<br />',
				num: 100
			}, {
				name: '<h1><h2><h3>',
				ifhas: /<h[0-9]>/i,
				sub: [{
					name: '<h1>',
					find: /<h1>/ig,
					replace: '='
				}, {
					name: '<h2>',
					find: /<h2>/ig,
					replace: '=='
				}, {
					name: '<h3>',
					find: /<h3>/ig,
					replace: '==='
				}, {
					name: '<h4>',
					find: /<h4>/ig,
					replace: '===='
				}, {
					name: '<h5>',
					find: /<h5>/ig,
					replace: '====='
				}, {
					name: '<h6>',
					find: /<h6>/ig,
					replace: '======'
				}]
			}, {
				name: 'Rule',
				find: /<center\/>/ig,
				replace: '</center>',
				num: 10
			}]
		}, {
			name: 'Predefs padronização',
			ifhas: '{{',
			sub: [{
				name: 'Espaço após {{',
				find: /(\{\{) ([^ ])/ig,
				replace: '$1$2'
			}, {
				name: '{{Predefinição:',
				find: /([\{\|]) *Predefinição *:([^:\n]*\r?\n)/ig,
				replace: '$1$2',
				num: 100
			}, {
				name: '{{MSG:',
				find: /\{\{MSG:/g,
				replace: '{{',
				num: 100
			}, {
				name: 'Redirect de predefs',
				ifhas: '{{',
				sub: [{
					name: 'Red Infobox',
					sub: [{
						name: 'Company',
						find: /\{\{Info(?:box)?[ _\-]Company *(\||\r?\n|╔)/ig,
						replace: '{{subst:Infobox Company$1'
					}, {
						name: 'Red Infobox c/ Info',
						ifhas: /\{\{Info(?:box|caixa)?[ _\-\/]/i,
						sub: [{
							name: 'Red Infobox c/ Info - A',
							ifhas: /\{\{Info(?:box|caixa)?[ _\-\/:][AÁ]/i,
							sub: [{
								name: 'álbum',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]álbum *(\||\r?\n|╔)/ig,
								replace: '{{Info/Álbum$1'
							}, {
								name: '{{Infobox animangá/',
								find: /\{\{Infobox animangá\//ig,
								replace: '{{Info/Animangá/'
							}, {
								name: 'Acidente aéreo',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]acidente aéreo *(\||\r?\n|╔)/ig,
								replace: '{{Info/Acidente aéreo$1'
							}, {
								name: 'Arma de fogo',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]arma de fogo *(\||\r?\n|╔)/ig,
								replace: '{{Info/Arma de fogo$1'
							}, {
								name: 'artista musical',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Artista musical *(\||\r?\n|╔)/ig,
								replace: '{{Info/música/artista$1'
							}, {
								name: 'Assentamento',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Assentamento *(\||\r?\n|╔)/ig,
								replace: '{{Info/Assentamento$1'
							}, {
								name: 'astronauta',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]astronauta *(\||\r?\n|╔)/ig,
								replace: '{{Info/Astronauta$1'
							}, {
								name: 'Ataque Civil',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Ataque Civil *(\||\r?\n|╔)/ig,
								replace: '{{Info/Atentado$1'
							}, {
								name: 'Atentado',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]atentado *(\||\r?\n|╔)/ig,
								replace: '{{Info/Atentado$1'
							}, {
								name: 'ator',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]ator *(\||\r?\n|╔)/ig,
								replace: '{{Info/Ator$1'
							}, {
								name: 'Auto-estrada RUN',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Auto\-estrada RUN *(\||\r?\n|╔)/ig,
								replace: '{{Info/Auto-estrada RUN$1'
							}, {
								name: 'autor',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]autor *(\||\r?\n|╔)/ig,
								replace: '{{Info/Autor$1'
							}, {
								name: 'Avião',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Avião(?: Militar)? *(\||\r?\n|╔)/ig,
								replace: '{{Info/Avião Militar$1'
							}, {
								name: 'Avião Civil',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Avião Civil *(\||\r?\n|╔)/ig,
								replace: '{{Info/Avião civil$1'
							}, {
								name: 'Asteroide',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Asteróide *(\||\r?\n|╔)/ig,
								replace: '{{Info/Asteroide$1'
							}, {
								name: 'Ator',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]ac?tor *(\||\r?\n|╔)/ig,
								replace: '{{Info/Ator$1'
							}, {
								name: 'Ator',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Atriz *(\||\r?\n|╔)/ig,
								replace: '{{Info/Ator$1'
							}]
						}, {
							name: 'Red Infobox c/ Info - B',
							ifhas: /\{\{Info(?:box|caixa)?[ _\-\/:]B/i,
							sub: [{
								name: 'Banda',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]banda *(\||\r?\n|╔)/ig,
								replace: '{{Info/Banda$1'
							}, {
								name: 'BD',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]BD *(\||\r?\n|╔)/ig,
								replace: '{{Info/Banda desenhada$1'
							}, {
								name: 'BD/Personagem fictícia',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]BD\/Personagem fictícia *(\||\r?\n|╔)/ig,
								replace: '{{Info/Personagem fictícia$1'
							}, {
								name: 'Bio adulto',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]bio adulto *(\||\r?\n|╔)/ig,
								replace: '{{Info/Bio adulto$1'
							}, {
								name: 'Biografia',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]biografia *(\||\r?\n|╔)/ig,
								replace: '{{Info/Biografia$1'
							}, {
								name: 'Bairro de Belo Horizonte',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Bairro de (?:Belo Horizonte|Canoas) *(\||\r?\n|╔)/ig,
								replace: '{{Info/Bairro do Brasil 2$1'
							}, {
								name: 'BairroCG',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]?Bairro(?:CG|BairroUdia| de Uberlândia) *(\||\r?\n|╔)/ig,
								replace: '{{Info/Bairro do Brasil 4$1'
							}, {
								name: 'BD asiática',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Banda desenhada asiática *(\||\r?\n|╔)/ig,
								replace: '{{Info/BD asiática$1'
							}, {
								name: 'Banda desenhada/Personagem fictícia',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Banda desenhada\/Personagem fictícia *(\||\r?\n|╔)/ig,
								replace: '{{Info/Personagem fictícia$1'
							}, {
								name: 'Biografia',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]biografia *(\||\r?\n|╔)/ig,
								replace: '{{Info/Biografia$1'
							}, {
								name: 'Bairro de Madrid',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Bairros de Madrid *(\||\r?\n|╔)/ig,
								replace: '{{Info/Bairro de Madrid$1'
							}, {
								name: 'Banda',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]banda *(\||\r?\n|╔)/ig,
								replace: '{{Info/Banda$1'
							}, {
								name: 'Banda desenhada',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]BandaDesenhada *(\||\r?\n|╔)/ig,
								replace: '{{Info/Banda desenhada$1'
							}, {
								name: 'Barragem',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]barragem *(\||\r?\n|╔)/ig,
								replace: '{{Info/Barragem$1'
							}, {
								name: 'Bebida',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Bebida *(\||\r?\n|╔)/ig,
								replace: '{{Info/Bebida$1'
							}, {
								name: 'Biografia',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Biografia *(\||\r?\n|╔)/ig,
								replace: '{{Info/Biografia$1'
							}, {
								name: 'blindado',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]blindado *(\||\r?\n|╔)/ig,
								replace: '{{Info/Blindado$1'
							}, {
								name: 'Boi-Bumbá',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Boi\-Bumbá *(\||\r?\n|╔)/ig,
								replace: '{{Info/Boi-Bumbá$1'
							}, {
								name: 'Brasão',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]brasão *(\||\r?\n|╔)/ig,
								replace: '{{Info/Brasão$1'
							}, {
								name: 'Brinquedos',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]brinquedos *(\||\r?\n|╔)/ig,
								replace: '{{Info/Brinquedos$1'
							}, {
								name: 'Bispado',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Bispado *(\||\r?\n|╔)/ig,
								replace: '{{Info/Bispado$1'
							}]
						}, {
							name: 'Red Infobox c/ Info - C',
							ifhas: /\{\{Info(?:box|caixa)?[ _\-\/:]C/i,
							sub: [{
								name: 'Campeonato Mundial de Ginástica',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Campeonato Mundial de Ginástica *(\||\r?\n|╔)/ig,
								replace: '{{Info/Evento ginástica$1'
							}, {
								name: 'Canção',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]canção *(\||\r?\n|╔)/ig,
								replace: '{{Info/Canção$1'
							}, {
								name: 'Candidatura Jogos Olímpicos',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Candidatura JO *(\||\r?\n|╔)/ig,
								replace: '{{Info/Candidatura Jogos Olímpicos$1'
							}, {
								name: 'Candidatura cidade dos Jogos Olímpicos',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Candidatura JO Cidade *(\||\r?\n|╔)/ig,
								replace: '{{Info/Candidatura cidade dos Jogos Olímpicos$1'
							}, {
								name: 'Cantor',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]cantor *(\||\r?\n|╔)/ig,
								replace: '{{Info/música/artista$1'
							}, {
								name: 'Casa de eventos',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]casa de eventos *(\||\r?\n|╔)/ig,
								replace: '{{Info/Casa de eventos$1'
							}, {
								name: 'Carruagem',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Carruagem *(\||\r?\n|╔)/ig,
								replace: '{{Info/Carruagem$1'
							}, {
								name: 'Cientista',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]cientista *(\||\r?\n|╔)/ig,
								replace: '{{Info/Cientista$1'
							}, {
								name: 'Clube de futebol',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]clube de futebol *(\||\r?\n|╔)/ig,
								replace: '{{Info/Clube de futebol$1'
							}, {
								name: 'Coleções da Recreio',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Coleções da Recreio *(\||\r?\n|╔)/ig,
								replace: '{{Info/Coleções da Recreio$1'
							}, {
								name: 'Comitê Olímpico Nacional',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Comitê Olímpico Nacional *(\||\r?\n|╔)/ig,
								replace: '{{Info/Comitê Olímpico Nacional$1'
							}, {
								name: 'companhia aérea',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]companhia aérea *(\||\r?\n|╔)/ig,
								replace: '{{Info/Companhia aérea$1'
							}, {
								name: 'Companhia/Empresa',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Companhia\/Empresa *(\||\r?\n|╔)/ig,
								replace: '{{Info/Empresa$1'
							}, {
								name: 'continente',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]continente *(\||\r?\n|╔)/ig,
								replace: '{{Info/Território geográfico$1'
							}, {
								name: 'Corrida de F1',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Corrida F1 *(\||\r?\n|╔)/ig,
								replace: '{{Info/Corrida de F1$1'
							}, {
								name: 'Corrida FSL',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Corrida FSL *(\||\r?\n|╔)/ig,
								replace: '{{Info/Corrida FSL$1'
							}, {
								name: 'Corrida IRL',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Corrida IRL *(\||\r?\n|╔)/ig,
								replace: '{{Info/Corrida IRL$1'
							}, {
								name: 'Criminoso',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]criminoso *(\||\r?\n|╔)/ig,
								replace: '{{Info/Criminoso$1'
							}, {
								name: 'Canção',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]canção *(\||\r?\n|╔)/ig,
								replace: '{{Info/Canção$1'
							}, {
								name: 'Características da Estrela',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Caracteríticas das Estrelas *(\||\r?\n|╔)/ig,
								replace: '{{Info/Características da Estrela$1'
							}, {
								name: 'Castelo-br',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Castelo\-br *(\||\r?\n|╔)/ig,
								replace: '{{Info/Fortificação-BR$1'
							}, {
								name: 'Cidade da Alemanha',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Cidades da Alemanha *(\||\r?\n|╔)/ig,
								replace: '{{Info/Cidade da Alemanha$1'
							}, {
								name: 'Cidade da Grécia',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Cidades da Grécia *(\||\r?\n|╔)/ig,
								replace: '{{Info/Cidade da Grécia$1'
							}, {
								name: 'Circuito da F1',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Circuito de F1 *(\||\r?\n|╔)/ig,
								replace: '{{Info/Circuito da F1$1'
							}, {
								name: 'Condados da Escócia',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Condados da Escócia *(\||\r?\n|╔)/ig,
								replace: '{{Info/Subdivisões da Escócia$1'
							}, {
								name: 'Condado da Inglaterra',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Condados da Inglaterra *(\||\r?\n|╔)/ig,
								replace: '{{Info/Condado da Inglaterra$1'
							}, {
								name: 'Continente',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Continente *(\||\r?\n|╔)/ig,
								replace: '{{Info/Território geográfico$1'
							}, {
								name: 'China-províncias',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]China\-províncias *(\||\r?\n|╔)/ig,
								replace: '{{Info/Província da China$1'
							}, {
								name: 'Campeonato Mundial de Patinação Artística no Gelo',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Campeonato Mundial de Patinação Artística no Gelo *(\||\r?\n|╔)/ig,
								replace: '{{Info/Campeonato Mundial de Patinação Artística no Gelo$1'
							}, {
								name: 'Canal de Televisão',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Canal de Televisão *(\||\r?\n|╔)/ig,
								replace: '{{Info/Rede de televisão$1'
							}, {
								name: 'Casa de eventos',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]casa de eventos *(\||\r?\n|╔)/ig,
								replace: '{{Info/Casa de eventos$1'
							}, {
								name: 'Cha',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Cha *(\||\r?\n|╔)/ig,
								replace: '{{Info/Cha$1'
							}, {
								name: 'Cidade',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Cidade *(\||\r?\n|╔)/ig,
								replace: '{{Info/Cidade$1'
							}, {
								name: 'Cidade da Argentina',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Cidade Argentina *(\||\r?\n|╔)/ig,
								replace: '{{Info/Cidade da Argentina$1'
							}, {
								name: 'Cidade da Bahamas',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Cidade da Bahamas *(\||\r?\n|╔)/ig,
								replace: '{{Info/Cidade da Bahamas$1'
							}, {
								name: 'Cidade de Israel 2',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Cidade Israelense *(\||\r?\n|╔)/ig,
								replace: '{{Info/Cidade de Israel 2$1'
							}, {
								name: 'Cidade do Líbano',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Cidade Libanesa *(\||\r?\n|╔)/ig,
								replace: '{{Info/Cidade do Líbano$1'
							}, {
								name: 'Cidade da Autoridade Palestina',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Cidade Sob Autoridade Palestina *(\||\r?\n|╔)/ig,
								replace: '{{Info/Cidade da Autoridade Palestina$1'
							}, {
								name: 'Comediante',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Comediante *(\||\r?\n|╔)/ig,
								replace: '{{Info/Comediante$1'
							}, {
								name: 'Company',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Company *(\||\r?\n|╔)/ig,
								replace: '{{Info/Empresa-en$1'
							}, {
								name: 'Condado da Libéria',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Condado da Libéria *(\||\r?\n|╔)/ig,
								replace: '{{Info/Condado da Libéria$1'
							}, {
								name: 'Country Olympics',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Country Olympics *(\||\r?\n|╔)/ig,
								replace: '{{Info/Country Olympics$1'
							}, {
								name: 'Country Pan',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Country Pan *(\||\r?\n|╔)/ig,
								replace: '{{Info/Country Pan$1'
							}, {
								name: 'Country Paralympics',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Country Paralympics *(\||\r?\n|╔)/ig,
								replace: '{{Info/Country Paralympics$1'
							}, {
								name: 'Country Parapan',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Country Parapan *(\||\r?\n|╔)/ig,
								replace: '{{Info/Country Parapan$1'
							}, {
								name: 'CVG',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]CVG *(\||\r?\n|╔)/ig,
								replace: '{{Info/Jogo$1'
							}, {
								name: 'Cargo político',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Cargo Político *(\||\r?\n|╔)/ig,
								replace: '{{Info/Cargo político$1'
							}, {
								name: 'Cantão da Suíça',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Cantão Suíço *(\||\r?\n|╔)/ig,
								replace: '{{Info/Cantão da Suíça$1'
							}]
						}, {
							name: 'Red Infobox c/ Info - D',
							ifhas: /\{\{Info(?:box|caixa)?[ _\-\/:]D/i,
							sub: [{
								name: 'Discografia de artista',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]discografia de artista *(\||\r?\n|╔)/ig,
								replace: '{{Info/Discografia de artista$1'
							}, {
								name: 'Departamento/Níger',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Departamento\/Níger *(\||\r?\n|╔)/ig,
								replace: '{{Info/Departamento do Níger$1'
							}, {
								name: 'Divisão do Camboja',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Divisões do Camboja *(\||\r?\n|╔)/ig,
								replace: '{{Info/Divisão do Camboja$1'
							}, {
								name: 'Distrito dos Países Baixos',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Distrito Países Baixos *(\||\r?\n|╔)/ig,
								replace: '{{Info/Distrito dos Países Baixos$1'
							}, {
								name: 'Distrito de Florianópolis',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]distritos de Florianópolis *(\||\r?\n|╔)/ig,
								replace: '{{Info/Distrito de Florianópolis$1'
							}, {
								name: 'Documento',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Documento *(\||\r?\n|╔)/ig,
								replace: '{{Info/Documento$1'
							}, {
								name: 'Domínio de topo',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]domínio de topo *(\||\r?\n|╔)/ig,
								replace: '{{Info/Domínio de topo$1'
							}, {
								name: 'Dramaturgo',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Dramaturgo *(\||\r?\n|╔)/ig,
								replace: '{{Info/Dramaturgo$1'
							}]
						}, {
							name: 'Red Infobox c/ Info - E',
							ifhas: /\{\{Info(?:box|caixa)?[ _\-\/:][EÉ]/i,
							sub: [{
								name: 'Economia',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Economia *(\||\r?\n|╔)/ig,
								replace: '{{Info/Economia$1'
							}, {
								name: 'Eleição Presidencial Brasileira',
								find: /\{\{Info(?:box|caixa)?[ _\-\/:]Eleição Presidencial Brasileira *(\||\r?\n|<!--)/ig,
								replace: '{{Info/Eleição Presidencial Brasileira$1'
							}, {
								name: 'Empresa',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Empresa *(\||\r?\n|╔)/ig,
								replace: '{{Info/Empresa$1'
							}, {
								name: 'Entidade',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Entidade *(\||\r?\n|╔)/ig,
								replace: '{{Info/Entidade$1'
							}, {
								name: 'Episódio de série',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Episódio de Série *(\||\r?\n|╔)/ig,
								replace: '{{Info/Episódio de série$1'
							}, {
								name: 'Escola',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Escola *(\||\r?\n|╔)/ig,
								replace: '{{Info/Escola$1'
							}, {
								name: 'EscolasTecnicasBrasil',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]EscolasTecnicasBrasil *(\||\r?\n|╔)/ig,
								replace: '{{Info/Escola técnica do Brasil$1'
							}, {
								name: 'Estação',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Estação *(\||\r?\n|╔)/ig,
								replace: '{{Info/Estação$1'
							}, {
								name: 'Estado extinto',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]estado extinto *(\||\r?\n|╔)/ig,
								replace: '{{Info/Estado extinto$1'
							}, {
								name: 'Estrutura alta',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Estrutura Alta *(\||\r?\n|╔)/ig,
								replace: '{{Info/Estrutura alta$1'
							}, {
								name: 'Estúdio de quadrinhos',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Estúdio de Quadrinhos *(\||\r?\n|╔)/ig,
								replace: '{{Info/Estúdio de quadrinhos$1'
							}, {
								name: 'Evento multiesportivo',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]evento multiesportivo *(\||\r?\n|╔)/ig,
								replace: '{{Info/Evento multiesportivo$1'
							}, {
								name: 'Emissora de TV',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Emissora de TV *(\||\r?\n|╔)/ig,
								replace: '{{Info/Rede de televisão$1'
							}, {
								name: 'Escola de samba',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]escola de samba *(\||\r?\n|╔)/ig,
								replace: '{{Info/Escola de samba$1'
							}, {
								name: 'Escola do Ensino Médio',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Escola do Ensino Médio *(\||\r?\n|╔)/ig,
								replace: '{{Info/Colégio do Brasil$1'
							}, {
								name: 'Estação Metro do Porto',
								find: /\{\{Info(?:box|caixa)?[ _\-\/:]Estação Metro do Porto *(\||\r?\n|<!--)/ig,
								replace: '{{Info/Estação Metro do Porto$1'
							}, {
								name: 'Estação de metro',
								find: /\{\{Info(?:box|caixa)?[ _\-\/:]estação de metro *(\||\r?\n|<!--)/ig,
								replace: '{{Info/Estação de metro$1'
							}, {
								name: 'Educação País',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Educação País *(\||\r?\n|╔)/ig,
								replace: '{{Info/Educação País$1'
							}, {
								name: 'Emissora de televisão',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Emissora *(\||\r?\n|╔)/ig,
								replace: '{{Info/Emissora de televisão$1'
							}, {
								name: 'Emissora de rádio',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Emissora de rádio *(\||\r?\n|╔)/ig,
								replace: '{{Info/Emissora de rádio$1'
							}, {
								name: 'Emissora de televisão',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Emissora de televisão *(\||\r?\n|╔)/ig,
								replace: '{{Info/Emissora de televisão$1'
							}, {
								name: 'Empresa',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]empresa *(\||\r?\n|╔)/ig,
								replace: '{{Info/Empresa$1'
							}, {
								name: 'Empresas fictícias',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Empresas fictícias *(\||\r?\n|╔)/ig,
								replace: '{{Info/Empresas fictícias$1'
							}, {
								name: 'Engenheiro',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Engenheiro *(\||\r?\n|╔)/ig,
								replace: '{{Info/Engenheiro$1'
							}, {
								name: 'ESC entry',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]ESC entry *(\||\r?\n|╔)/ig,
								replace: '{{Info/ESC entry$1'
							}, {
								name: 'Escala',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Escala *(\||\r?\n|╔)/ig,
								replace: '{{Info/música/tonalidade$1'
							}, {
								name: 'Escola de samba',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]escola de samba *(\||\r?\n|╔)/ig,
								replace: '{{Info/Escola de samba$1'
							}, {
								name: 'Estocolmo-distritos',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Estocolmo\-distritos *(\||\r?\n|╔)/ig,
								replace: '{{Info/Distrito de Estocolmo$1'
							}, {
								name: 'Estúdio de quadrinhos',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Estúdio de Quadrinhos *(\||\r?\n|╔)/ig,
								replace: '{{Info/Estúdio de quadrinhos$1'
							}, {
								name: 'Eurovisão',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Eurovisão *(\||\r?\n|╔)/ig,
								replace: '{{Info/Eurovisão$1'
							}, {
								name: 'Eurovisão Principal',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Eurovisão Principal *(\||\r?\n|╔)/ig,
								replace: '{{Info/Eurovisão Principal$1'
							}, {
								name: 'Evento de Wrestling',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Evento de Wrestling *(\||\r?\n|╔)/ig,
								replace: '{{Info/Evento de Wrestling$1'
							}, {
								name: 'Evento histórico',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Evento histórico *(\||\r?\n|╔)/ig,
								replace: '{{Info/Evento histórico$1'
							}, {
								name: 'Enxadrista',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]enxadrista *(\||\r?\n|╔)/ig,
								replace: '{{Info/Enxadrista$1'
							}, {
								name: 'Evento',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]evento *(\||\r?\n|╔)/ig,
								replace: '{{Info/Evento$1'
							}, {
								name: 'Equipe da NHL',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Equipe da NHL *(\||\r?\n|╔)/ig,
								replace: '{{Info/Equipe da NHL$1'
							}]
						}, {
							name: 'Red Infobox c/ Info - F',
							ifhas: /\{\{Info(?:box|caixa)?[ _\-\/:]F/i,
							sub: [{
								name: 'faculdade',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]faculdade *(\||\r?\n|╔)/ig,
								replace: '{{Info/faculdade$1'
							}, {
								name: 'Família linguística',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Família linguística *(\||\r?\n|╔)/ig,
								replace: '{{Info/Família linguística$1'
							}, {
								name: 'Ferrovia',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Ferrovia *(\||\r?\n|╔)/ig,
								replace: '{{Info/Ferrovia$1'
							}, {
								name: 'Festas',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Festas *(\||\r?\n|╔)/ig,
								replace: '{{Info/Efeméride$1'
							}, {
								name: 'Filme',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Filme *(\||\r?\n|╔)/ig,
								replace: '{{Info/Filme$1'
							}, {
								name: 'Furacão',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]furacão *(\||\r?\n|╔)/ig,
								replace: '{{Info/Furacão$1'
							}, {
								name: 'Furacão pequeno',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]furacão pequeno *(\||\r?\n|╔)/ig,
								replace: '{{Info/Furacão pequeno$1'
							}, {
								name: 'Filósofo',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Filósofos *(\||\r?\n|╔)/ig,
								replace: '{{Info/Filósofo$1'
							}, {
								name: 'França/Região',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]França\/Região *(\||\r?\n|╔)/ig,
								replace: '{{Info/Região da França$1'
							}, {
								name: 'faculdade',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Faculdade *(\||\r?\n|╔)/ig,
								replace: '{{Info/faculdade$1'
							}, {
								name: 'Farol',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Farol *(\||\r?\n|╔)/ig,
								replace: '{{Info/Farol$1'
							}, {
								name: 'Filme',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Filme *(\||\r?\n|╔)/ig,
								replace: '{{Info/Filme$1'
							}, {
								name: 'Filósofo',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Filósofos *(\||\r?\n|╔)/ig,
								replace: '{{Info/Filósofo$1'
							}, {
								name: 'Folclore',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Folclore *(\||\r?\n|╔)/ig,
								replace: '{{Info/Folclore$1'
							}, {
								name: 'Forças Armadas',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Forças Armadas *(\||\r?\n|╔)/ig,
								replace: '{{Info/Forças Armadas$1'
							}, {
								name: 'Franquia de mídia',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]franquia de mídia *(\||\r?\n|╔)/ig,
								replace: '{{Info/Franquia de mídia$1'
							}]
						}, {
							name: 'Red Infobox c/ Info - G',
							ifhas: /\{\{Info(?:box|caixa)?[ _\-\/:]G/i,
							sub: [{
								name: 'ginasta',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]ginasta *(\||\r?\n|╔)/ig,
								replace: '{{Info/esporte/atleta$1'
							}, {
								name: 'Governadorate da Síria',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Governadorate da Siria *(\||\r?\n|╔)/ig,
								replace: '{{Info/Governadorate da Síria$1'
							}, {
								name: 'Gâmbia-divisões',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Gâmbia\-divisões *(\||\r?\n|╔)/ig,
								replace: '{{Info/Divisão de Gâmbia$1'
							}, {
								name: 'Gâmbia-LGA',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Gâmbia\-LGA *(\||\r?\n|╔)/ig,
								replace: '{{Info/Áreas de Governo Local da Gâmbia$1'
							}, {
								name: 'Governadorate da Síria',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Governadorato Siria *(\||\r?\n|╔)/ig,
								replace: '{{Info/Governadorate da Síria$1'
							}, {
								name: 'Grupo étnico',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]grupo étnico *(\||\r?\n|╔)/ig,
								replace: '{{Info/Grupo étnico$1'
							}, {
								name: 'Guerra',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]guerra *(\||\r?\n|╔)/ig,
								replace: '{{Info/Guerra$1'
							}]
						}, {
							name: 'Red Infobox c/ Info - H',
							ifhas: /\{\{Info(?:box|caixa)?[ _\-\/:]H/i,
							sub: [{
								name: 'HK Distrito',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]HK Distrito *(\||\r?\n|╔)/ig,
								replace: '{{Info/Distrito de Hong Kong$1'
							}]
						}, {
							name: 'Red Infobox c/ Info - I',
							ifhas: /\{\{Info(?:box|caixa)?[ _\-\/:]I/i,
							sub: [{
								name: 'Ilha',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Ilha *(\||\r?\n|╔)/ig,
								replace: '{{Info/Ilha$1'
							}, {
								name: 'Instituição religiosa',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]instituição religiosa *(\||\r?\n|╔)/ig,
								replace: '{{Info/Instituição religiosa$1'
							}, {
								name: 'Instituição religiosa',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]instituição religiosa *(\||\r?\n|╔)/ig,
								replace: '{{Info/Instituição religiosa$1'
							}, {
								name: 'Itália/Região',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Itália\/Região *(\||\r?\n|╔)/ig,
								replace: '{{Info/Região da Itália$1'
							}, {
								name: 'IFs',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]IFs *(\||\r?\n|╔)/ig,
								replace: '{{Info/IFs$1'
							}, {
								name: 'Igreja',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]igreja *(\||\r?\n|╔)/ig,
								replace: '{{Info/Igreja$1'
							}, {
								name: 'Ilha',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Ilha *(\||\r?\n|╔)/ig,
								replace: '{{Info/Ilha$1'
							}, {
								name: 'Instrumento',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Instrumento *(\||\r?\n|╔)/ig,
								replace: '{{Info/Instrumento$1'
							}, {
								name: 'Interstate',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Interstate *(\||\r?\n|╔)/ig,
								replace: '{{Info/Interstate$1'
							}, {
								name: 'Itália/Província',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Itália\/Província *(\||\r?\n|╔)/ig,
								replace: '{{Info/Província da Itália$1'
							}]
						}, {
							name: 'Red Infobox c/ Info - J',
							ifhas: /\{\{Info(?:box|caixa)?[ _\-\/:]J/i,
							sub: [{
								name: 'Jogo',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]jogo *(\||\r?\n|╔)/ig,
								replace: '{{Info/Jogo$1'
							}, {
								name: 'Jogador de basquete',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]jogador de basquete *(\||\r?\n|╔)/ig,
								replace: '{{Info/Jogador de basquete$1'
							}, {
								name: 'Jornal',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Jornal *(\||\r?\n|╔)/ig,
								replace: '{{Info/Jornal$1'
							}]
						}, {
							name: 'Red Infobox c/ Info - L',
							ifhas: /\{\{Info(?:box|caixa)?[ _\-\/:]L/i,
							sub: [{
								name: 'Língua',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Língua *(\||\r?\n|╔)/ig,
								replace: '{{Info/Língua$1'
							}, {
								name: 'Livro',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]livro *(\||\r?\n|╔)/ig,
								replace: '{{Info/Livro$1'
							}, {
								name: 'Locomotiva',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Locomotiva *(\||\r?\n|╔)/ig,
								replace: '{{Info/Locomotiva$1'
							}, {
								name: 'Linux',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Linux *(\||\r?\n|╔)/ig,
								replace: '{{Info/distribuição de Linux$1'
							}, {
								name: 'Legislatura',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Legislatura *(\||\r?\n|╔)/ig,
								replace: '{{Info/Legislatura$1'
							}, {
								name: 'Legislatura da Nigéria',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Legislatura da Nigéria *(\||\r?\n|╔)/ig,
								replace: '{{Info/Legislatura da Nigéria$1'
							}, {
								name: 'Língua',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Língua *(\||\r?\n|╔)/ig,
								replace: '{{Info/Língua$1'
							}, {
								name: 'Literato',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Literato *(\||\r?\n|╔)/ig,
								replace: '{{Info/Literato$1'
							}]
						}, {
							name: 'Red Infobox c/ Info - M',
							ifhas: /\{\{Info(?:box|caixa)?[ _\-\/:]M/i,
							sub: [{
								name: 'medalhista',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]medalhista *(\||\r?\n|╔)/ig,
								replace: '{{Info/esporte/atleta$1'
							}, {
								name: 'Modelo',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Modelo *(\||\r?\n|╔)/ig,
								replace: '{{Info/Modelo$1'
							}, {
								name: 'Moeda',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]moeda *(\||\r?\n|╔)/ig,
								replace: '{{Info/Moeda$1'
							}, {
								name: 'Motor de avião',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Motor de Avião *(\||\r?\n|╔)/ig,
								replace: '{{Info/Motor de avião$1'
							}, {
								name: 'Museu',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]museus *(\||\r?\n|╔)/ig,
								replace: '{{Info/Museu$1'
							}, {
								name: 'Música',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Música *(\||\r?\n|╔)/ig,
								replace: '{{Info/Canção$1'
							}, {
								name: 'Mesorregião do Brasil',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Mesorregião do Brasil *(\||\r?\n|╔)/ig,
								replace: '{{Info/Mesorregião$1'
							}, {
								name: 'Metro lisboa',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Metro lisboa *(\||\r?\n|╔)/ig,
								replace: '{{Info/Metro Lisboa$1'
							}, {
								name: 'Microrregião do Brasil',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Microrregião do Brasil *(\||\r?\n|╔)/ig,
								replace: '{{Info/Microrregião$1'
							}, {
								name: 'Militar',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]militar *(\||\r?\n|╔)/ig,
								replace: '{{Info/Militar$1'
							}, {
								name: 'Motorista da F1',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Motorista de F1 *(\||\r?\n|╔)/ig,
								replace: '{{Info/Motorista da F1$1'
							}, {
								name: 'Município ZA',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Município ZA *(\||\r?\n|╔)/ig,
								replace: '{{Info/Município da África do Sul$1'
							}, {
								name: 'Madeira/sítio',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Madeira\/sítio *(\||\r?\n|╔)/ig,
								replace: '{{Info/Localidade da Madeira$1'
							}, {
								name: 'Marcha Popular de Lisboa',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Marchas Populares de Lisboa *(\||\r?\n|╔)/ig,
								replace: '{{Info/Marcha Popular de Lisboa$1'
							}, {
								name: 'Médico',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Médico *(\||\r?\n|╔)/ig,
								replace: '{{Info/Médico$1'
							}, {
								name: 'Ministério',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Ministério *(\||\r?\n|╔)/ig,
								replace: '{{Info/Ministério$1'
							}, {
								name: 'Monarca',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Monarca *(\||\r?\n|╔)/ig,
								replace: '{{Info/Monarca$1'
							}, {
								name: 'Motocicleta',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Motocicleta *(\||\r?\n|╔)/ig,
								replace: '{{Info/Motocicleta$1'
							}, {
								name: 'Museu',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Museu *(\||\r?\n|╔)/ig,
								replace: '{{Info/Museu$1'
							}, {
								name: 'Música ESC',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Música ESC *(\||\r?\n|╔)/ig,
								replace: '{{Info/Música ESC$1'
							}, {
								name: 'musical artist',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]musical artist *(\||\r?\n|╔)/ig,
								replace: '{{Info/música/artista$1'
							}, {
								name: 'Município das Canárias',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Município das Canárias *(\||\r?\n|╔)/ig,
								replace: '{{Info/Município das Canárias$1'
							}]
						}, {
							name: 'Red Infobox c/ Info - N',
							ifhas: /\{\{Info(?:box|caixa)?[ _\-\/:]N/i,
							sub: [{
								name: 'Nadador',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]nadador *(\||\r?\n|╔)/ig,
								replace: '{{Info/Nadador$1'
							}, {
								name: 'Nárnia',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Nárnia *(\||\r?\n|╔)/ig,
								replace: '{{Info/Nárnia$1'
							}, {
								name: 'navio',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]navio *(\||\r?\n|╔)/ig,
								replace: '{{Info/navio$1'
							}, {
								name: 'Número',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Número *(\||\r?\n|╔)/ig,
								replace: '{{Info/Número$1'
							}, {
								name: 'Nepal-regiões',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Nepal\-regiões *(\||\r?\n|╔)/ig,
								replace: '{{Info/Região do Nepal$1'
							}, {
								name: 'Nepal-zonas',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Nepal\-zonas *(\||\r?\n|╔)/ig,
								replace: '{{Info/Zonas do Nepal$1'
							}, {
								name: 'Nome',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Nome *(\||\r?\n|╔)/ig,
								replace: '{{Info/Nome$1'
							}]
						}, {
							name: 'Red Infobox c/ Info - O',
							ifhas: /\{\{Info(?:box|caixa)?[ _\-\/:][OÓ]/i,
							sub: [{
								name: 'ONU',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]ONU *(\||\r?\n|╔)/ig,
								replace: '{{Info/ONU$1'
							}, {
								name: 'Organização criminosa',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]organização criminosa *(\||\r?\n|╔)/ig,
								replace: '{{Info/Organização criminosa$1'
							}, {
								name: 'Obelisco',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Obelisco *(\||\r?\n|╔)/ig,
								replace: '{{Info/Obelisco$1'
							}, {
								name: 'Olympic Atletas Olímpicos Individuais',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Olympic Atletas Olímpicos Individuais *(\||\r?\n|╔)/ig,
								replace: '{{Info/Olympic Atletas Olímpicos Individuais$1'
							}, {
								name: 'Olympic Atletas Olímpicos Individuais',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Olympic IOA *(\||\r?\n|╔)/ig,
								replace: '{{Info/Olympic Atletas Olímpicos Individuais$1'
							}, {
								name: 'Olympics Afeganistão',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Olympics Afeganistão *(\||\r?\n|╔)/ig,
								replace: '{{Info/Olympics Afeganistão$1'
							}, {
								name: 'Olympics Arábia Saudita',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Olympics Arábia Saudita *(\||\r?\n|╔)/ig,
								replace: '{{Info/Olympics Arábia Saudita$1'
							}, {
								name: 'Olympics Bahrein',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Olympics Bahrein *(\||\r?\n|╔)/ig,
								replace: '{{Info/Olympics Bahrein$1'
							}, {
								name: 'Olympics Bangladesh',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Olympics Bangladesh *(\||\r?\n|╔)/ig,
								replace: '{{Info/Olympics Bangladesh$1'
							}, {
								name: 'Olympics Birmânia',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Olympics Birmânia *(\||\r?\n|╔)/ig,
								replace: '{{Info/Olympics Birmânia$1'
							}, {
								name: 'Olympics Bornéu do Norte',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Olympics Bornéu do Norte *(\||\r?\n|╔)/ig,
								replace: '{{Info/Olympics Bornéu do Norte$1'
							}, {
								name: 'Olympics Brunei',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Olympics Brunei *(\||\r?\n|╔)/ig,
								replace: '{{Info/Olympics Brunei$1'
							}, {
								name: 'Olympics Laos',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Olympics Laos *(\||\r?\n|╔)/ig,
								replace: '{{Info/Olympics Laos$1'
							}, {
								name: 'Organização militante',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]organização militante *(\||\r?\n|╔)/ig,
								replace: '{{Info/Organização militante$1'
							}, {
								name: 'Órgão legislativo',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]órgão legislativo *(\||\r?\n|╔)/ig,
								replace: '{{Info/Órgão legislativo$1'
							}]
						}, {
							name: 'Red Infobox c/ Info - P',
							ifhas: /\{\{Info(?:box|caixa)?[ _\-\/:]P/i,
							sub: [{
								name: 'País',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]País *(\||\r?\n|╔)/ig,
								replace: '{{Info/País$1'
							}, {
								name: 'Personagem',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Personagem *(\||\r?\n|╔)/ig,
								replace: '{{Info/Personagem fictícia$1'
							}, {
								name: 'Personagem (Ficção)',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Personagem \(Ficção\) *(\||\r?\n|╔)/ig,
								replace: '{{Info/Personagem fictícia$1'
							}, {
								name: 'Planetóide',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Planetóide *(\||\r?\n|╔)/ig,
								replace: '{{Info/Planetóide$1'
							}, {
								name: 'Ponte',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Ponte *(\||\r?\n|╔)/ig,
								replace: '{{Info/Ponte$1'
							}, {
								name: 'Prédio',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Prédio *(\||\r?\n|╔)/ig,
								replace: '{{Info/Estrutura alta$1'
							}, {
								name: 'Presidente',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Presidente *(\||\r?\n|╔)/ig,
								replace: '{{Info/Presidente$1'
							}, {
								name: 'Paróquia',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Paróquia da Jamaica *(\||\r?\n|╔)/ig,
								replace: '{{Info/Paróquia$1'
							}, {
								name: 'Paróquia',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Paróquia de Andorra *(\||\r?\n|╔)/ig,
								replace: '{{Info/Paróquia$1'
							}, {
								name: 'Paróquia',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Paróquia de Antígua e Barbuda *(\||\r?\n|╔)/ig,
								replace: '{{Info/Paróquia$1'
							}, {
								name: 'Paróquia',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Paróquia de Barbados *(\||\r?\n|╔)/ig,
								replace: '{{Info/Paróquia$1'
							}, {
								name: 'Paróquia',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Paróquia de Dominica *(\||\r?\n|╔)/ig,
								replace: '{{Info/Paróquia$1'
							}, {
								name: 'Paróquia',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Paróquia de Granada *(\||\r?\n|╔)/ig,
								replace: '{{Info/Paróquia$1'
							}, {
								name: 'Paróquia',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Paróquia de São Cristóvão e Névis *(\||\r?\n|╔)/ig,
								replace: '{{Info/Paróquia$1'
							}, {
								name: 'Paróquia',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Paróquia de São Vicente e Granadinas *(\||\r?\n|╔)/ig,
								replace: '{{Info/Paróquia$1'
							}, {
								name: 'Personagem fictícia',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Personagem de ficção *(\||\r?\n|╔)/ig,
								replace: '{{Info/Personagem fictícia$1'
							}, {
								name: 'Personagem fictícia',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Personagem de TV *(\||\r?\n|╔)/ig,
								replace: '{{Info/Personagem fictícia$1'
							}, {
								name: 'Personagem de Winnie-the-Pooh',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Personagem de Winnie\-the\-Pooh *(\||\r?\n|╔)/ig,
								replace: '{{Info/Personagem de Ursinho Puff$1'
							}, {
								name: 'Órgão legislativo',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Parlamento *(\||\r?\n|╔)/ig,
								replace: '{{Info/Órgão legislativo$1'
							}, {
								name: 'Participação anual no ESC',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Participação Anual n[ao] ESC *(\||\r?\n|╔)/ig,
								replace: '{{Info/Participação anual no ESC$1'
							}, {
								name: 'Partido político',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Partido político *(\||\r?\n|╔)/ig,
								replace: '{{Info/Partido político$1'
							}, {
								name: 'Patinador',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]patinador *(\||\r?\n|╔)/ig,
								replace: '{{Info/Patinador$1'
							}, {
								name: 'Personagem fictícia',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Personagem *(\||\r?\n|╔)/ig,
								replace: '{{Info/Personagem fictícia$1'
							}, {
								name: 'Personagem animangá',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]personagem animangá *(\||\r?\n|╔)/ig,
								replace: '{{Info/Personagem animangá$1'
							}, {
								name: 'Personagem fictícia',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Personagem de desenho animado *(\||\r?\n|╔)/ig,
								replace: '{{Info/Personagem fictícia$1'
							}, {
								name: 'Personagem fictícia',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]personagemtv *(\||\r?\n|╔)/ig,
								replace: '{{Info/Personagem fictícia$1'
							}, {
								name: 'Pretendente',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Pretendente *(\||\r?\n|╔)/ig,
								replace: '{{Info/Pretendente$1'
							}, {
								name: 'Papado',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]papado *(\||\r?\n|╔)/ig,
								replace: '{{Info/Papado$1'
							}, {
								name: 'Partido Político da Nigéria',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Partido político da Nigéria *(\||\r?\n|╔)/ig,
								replace: '{{Info/Partido Político da Nigéria$1'
							}]
						}, {
							name: 'Red Infobox c/ Info - Q',
							ifhas: /\{\{Info(?:box|caixa)?[ _\-\/:]Q/i,
							sub: [{
								name: 'Queijo',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Queijo *(\||\r?\n|╔)/ig,
								replace: '{{Info/Queijo$1'
							}]
						}, {
							name: 'Red Infobox c/ Info - R',
							ifhas: /\{\{Info(?:box|caixa)?[ _\-\/:]R/i,
							sub: [{
								name: 'raça de gato',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]raça de gato *(\||\r?\n|╔)/g,
								replace: '{{Info/Raça de gato$1'
							}, {
								name: 'Região',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Região *(\||\r?\n|╔)/ig,
								replace: '{{Info/Território geográfico$1'
							}, {
								name: 'Região da Bahia',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Região da Bahia *(\||\r?\n|╔)/ig,
								replace: '{{Info/Bairro de BH$1'
							}, {
								name: 'Região da República do Congo',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Região da República do Congo *(\||\r?\n|╔)/ig,
								replace: '{{Info/Departamento da República do Congo$1'
							}, {
								name: 'Rio',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]rio *(\||\r?\n|╔)/ig,
								replace: '{{Info/Rio$1'
							}, {
								name: 'Raça de cão',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Raça de Cão *(\||\r?\n|╔)/ig,
								replace: '{{Info/Raça de cão$1'
							}, {
								name: 'Rede de rádio',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Rede de rádio *(\||\r?\n|╔)/ig,
								replace: '{{Info/Rede de rádio$1'
							}, {
								name: 'Rede de televisão',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Rede de televisão(?: extinta)? *(\||\r?\n|╔)/ig,
								replace: '{{Info/Rede de televisão$1'
							}, {
								name: 'Rede de rádio',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Redes de rádio *(\||\r?\n|╔)/ig,
								replace: '{{Info/Rede de rádio$1'
							}, {
								name: 'Revista',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Revista *(\||\r?\n|╔)/ig,
								replace: '{{Info/Revista$1'
							}, {
								name: 'Revolucionário',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]revolucionário *(\||\r?\n|╔)/ig,
								replace: '{{Info/Revolucionário$1'
							}, {
								name: 'Rodovia Brasil',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Rodovia Brasil *(\||\r?\n|╔)/ig,
								replace: '{{Info/Rodovia Brasil$1'
							}]
						}, {
							name: 'Red Infobox c/ Info - S',
							ifhas: /\{\{Info(?:box|caixa)?[ _\-\/:]S/i,
							sub: [{
								name: 'Selo',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]selo *(\||\r?\n|╔)/ig,
								replace: '{{Info/Selo$1'
							}, {
								name: 'Série de videogame',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]série de videogame *(\||\r?\n|╔)/ig,
								replace: '{{Info/Série de videogame$1'
							}, {
								name: 'Série literária',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]série literária *(\||\r?\n|╔)/ig,
								replace: '{{Info/Série literária$1'
							}, {
								name: 'Single',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Single *(\||\r?\n|╔)/ig,
								replace: '{{Info/Single$1'
							}, {
								name: 'Selec?ção',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Selec?ção *(\||\r?\n|╔)/ig,
								replace: '{{Info/futebol/selecção$1'
							}, {
								name: 'Sítio',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Sitio *(\||\r?\n|╔)/ig,
								replace: '{{Info/Sítio$1'
							}, {
								name: 'SM RS/distritos',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]SM RS\/distritos *(\||\r?\n|╔)/ig,
								replace: '{{Info/Distritos de Santa Maria$1'
							}, {
								name: 'Sp/distritos',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Sp\/distritos *(\||\r?\n|╔)/ig,
								replace: '{{Info/Distrito de São Paulo$1'
							}, {
								name: 'Santos',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Santos *(\||\r?\n|╔)/ig,
								replace: '{{Info/Santos$1'
							}, {
								name: 'serie de TV',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]serie de TV *(\||\r?\n|╔)/ig,
								replace: '{{Info/Série de televisão$1'
							}, {
								name: 'Shopping',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]shopping *(\||\r?\n|╔)/ig,
								replace: '{{Info/Shopping$1'
							}, {
								name: 'Single',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Single *(\||\r?\n|╔)/ig,
								replace: '{{Info/Single$1'
							}, {
								name: 'Sítio do Patrimônio Mundial',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Sítio do Patrimônio Mundial *(\||\r?\n|╔)/ig,
								replace: '{{Info/Sítio do Patrimônio Mundial$1'
							}, {
								name: 'Software',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Software *(\||\r?\n|╔)/ig,
								replace: '{{Info/Software$1'
							}, {
								name: 'Sp/bairros',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Sp\/bairros *(\||\r?\n|╔)/ig,
								replace: '{{Info/Bairro de São Paulo$1'
							}, {
								name: 'Sudão-Estados',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Sudão\-Estados *(\||\r?\n|╔)/ig,
								replace: '{{Info/Estado do Sudão$1'
							}, {
								name: 'Sura',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Sura *(\||\r?\n|╔)/ig,
								replace: '{{Info/Sura$1'
							}, {
								name: 'Survivor',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Survivor *(\||\r?\n|╔)/ig,
								replace: '{{Info/Survivor$1'
							}]
						}, {
							name: 'Red Infobox c/ Info - T',
							ifhas: /\{\{Info(?:box|caixa)?[ _\-\/:]T/i,
							sub: [{
								name: 'Táxi',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Táxi *(\||\r?\n|╔)/ig,
								replace: '{{Info/Táxi$1'
							}, {
								name: 'Televisão',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Televisão *(\||\r?\n|╔)/ig,
								replace: '{{Info/Televisão$1'
							}, {
								name: 'Tradução da Bíblia',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Tradução da Bíblia *(\||\r?\n|╔)/ig,
								replace: '{{Info/Tradução da Bíblia$1'
							}, {
								name: 'Templo',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Templo *(\||\r?\n|╔)/ig,
								replace: '{{Info/TemploSUD$1'
							}, {
								name: 'Tonalidade',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Tonalidade *(\||\r?\n|╔)/ig,
								replace: '{{Info/música/tonalidade$1'
							}, {
								name: 'Treinador',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]treinador *(\||\r?\n|╔)/ig,
								replace: '{{Info/Treinador$1'
							}, {
								name: 'Televisão',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Televis(?:ão|ion) *(\||\r?\n|╔)/ig,
								replace: '{{Info/Televisão$1'
							}, {
								name: 'Television episode',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Television episode *(\||\r?\n|╔)/ig,
								replace: '{{Info/Episódio de série$1'
							}, {
								name: 'temporada futebol',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]temporada futebol *(\||\r?\n|╔)/ig,
								replace: '{{Info/futebol/temporada$1'
							}, {
								name: 'temporada NFL',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]temporada NFL *(\||\r?\n|╔)/ig,
								replace: '{{Info/Temporada NFL'
							}, {
								name: 'Transporte público',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Transportes Públicos *(\||\r?\n|╔)/ig,
								replace: '{{Info/Transporte público$1'
							}, {
								name: 'Turnê',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]turnê *(\||\r?\n|╔)/ig,
								replace: '{{Info/Turnê$1'
							}]
						}, {
							name: 'Red Infobox c/ Info - U',
							ifhas: /\{\{Info(?:box|caixa)?[ _\-\/:][UÚ]/i,
							sub: [{
								name: 'universidade',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]universidade *(\||\r?\n|╔)/ig,
								replace: '{{Info/universidade$1'
							}, {
								name: 'Uva',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]uva *(\||\r?\n|╔)/ig,
								replace: '{{Info/Uva$1'
							}, {
								name: 'UN',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]UN *(\||\r?\n|╔)/ig,
								replace: '{{Info/ONU$1'
							}, {
								name: 'universidade',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]University *(\||\r?\n|╔)/ig,
								replace: '{{Info/universidade$1'
							}, {
								name: 'U.S. Route',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]U\.S\. Route *(\||\r?\n|╔)/ig,
								replace: '{{Info/U.S. Route$1'
							}]
						}, {
							name: 'Red Infobox c/ Info - V',
							ifhas: /\{\{Info(?:box|caixa)?[ _\-\/:]V/i,
							sub: [{
								name: 'Vilões',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Vilões *(\||\r?\n|╔)/ig,
								replace: '{{Info/Personagem fictícia$1'
							}, {
								name: 'VG serviço online',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]VG serviço online *(\||\r?\n|╔)/ig,
								replace: '{{Info/VG serviço online$1'
							}]
						}, {
							name: 'Red Infobox c/ Info - W',
							ifhas: /\{\{Info(?:box|caixa)?[ _\-\/:]W/i,
							sub: [{
								name: 'Webcomic',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]webcomic *(\||\r?\n|╔)/ig,
								replace: '{{Info/Webcomic$1'
							}, {
								name: 'Wikipedista',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]wikipédia\/wikipedistas *(\||\r?\n|╔)/ig,
								replace: '{{Info/Wikipedista$1'
							}, {
								name: 'Webcomic',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]webcomic *(\||\r?\n|╔)/ig,
								replace: '{{Info/Webcomic$1'
							}, {
								name: 'Wrestler',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Wrestler *(\||\r?\n|╔)/ig,
								replace: '{{Info/Wrestler$1'
							}, {
								name: 'Wrestling event',
								find: /\{\{Info(?:box|caixa)?[ _\-\/]Wrestling event *(\||\r?\n|╔)/ig,
								replace: '{{Info/Evento de Wrestling$1'
							}]
						}]
					}, {
						name: 'Red Infobox s/ Info',
						sub: [{
							name: 'Red Infobox s/ Info - A',
							ifhas: /\{\{[AÁ]/i,
							sub: [{
								name: '{{Alemanha/cidades}}',
								find: /\{\{Alemanha\/cidades *(\||\r?\n|╔)/ig,
								replace: '{{Info/Cidade da Alemanha$1'
							}, {
								name: '{{Arqueiro}}',
								find: /\{\{Arqueiro *(\||\r?\n|╔)/ig,
								replace: '{{Info/Arqueiro$1'
							}, {
								name: '{{Arquidiocese}}',
								find: /\{\{Arquidiocese *(\||\r?\n|╔)/ig,
								replace: '{{Info/Arquidiocese$1'
							}, {
								name: '{{Áustria/cidades}}',
								find: /\{\{Áustria\/cidades *(\||\r?\n|╔)/ig,
								replace: '{{Info/Cidade da Áustria$1'
							}, {
								name: '{{Auto-estrada}}',
								find: /\{\{Auto\-estrada *(\||\r?\n|╔)/ig,
								replace: '{{Info/Auto-estrada$1'
							}, {
								name: '{{Auto-estradas de Portugal}}',
								find: /\{\{Auto\-estradas de Portugal *(\||\r?\n|╔)/ig,
								replace: '{{Info/Auto-estrada de Portugal$1'
							}, {
								name: '{{Avatar: A Lenda de Aang}}',
								find: /\{\{Avatar: A Lenda de Aang *(\||\r?\n|╔)/ig,
								replace: '{{Info/Avatar: A Lenda de Aang$1'
							}]
						}, {
							name: 'Red Infobox s/ Info - B',
							ifhas: /\{\{B/i,
							sub: [{
								name: '{{Bispo da Igreja Católica}}',
								find: /\{\{Bispo da Igreja Católica *(\||\r?\n|╔)/ig,
								replace: '{{Info/Bispo da Igreja Católica$1'
							}, {
								name: '{{Boxeador}}',
								find: /\{\{Boxeador *(\||\r?\n|╔)/ig,
								replace: '{{Info/Boxeador$1'
							}, {
								name: '{{Boxpapa}}',
								find: /\{\{Boxpapa *(\||\r?\n|╔)/ig,
								replace: '{{Info/Papa$1'
							}]
						}, {
							name: 'Red Infobox s/ Info - C',
							ifhas: /\{\{C/i,
							sub: [{
								name: '{{Campeonato de Futebol}}',
								find: /\{\{Campeonato de Futebol *(\||\r?\n|<!--)/ig,
								replace: '{{Info/Campeonato de futebol$1'
							}, {
								name: '{{Cantata}}',
								find: /\{\{Cantata *(\||\r?\n|<!--)/ig,
								replace: '{{Info/Cantata$1'
							}, {
								name: '{{Cavalo}}',
								find: /\{\{Cavalo *(\||\r?\n|<!--)/ig,
								replace: '{{Info/Cavalo$1'
							}, {
								name: '{{Celebridades da Internet}}',
								find: /\{\{Celebridades da Internet *(\||\r?\n|<!--)/ig,
								replace: '{{Info/Celebridades da Internet$1'
							}, {
								name: '{{Chefes da Casa Imperial do Brasil}}',
								find: /\{\{Chefes da Casa Imperial do Brasil *(\||\r?\n|<!--)/ig,
								replace: '{{Info/Chefes da Casa Imperial do Brasil$1'
							}, {
								name: '{{Chembox new}}',
								find: /\{\{Chembox new *(\||\r?\n|<!--)/ig,
								replace: '{{Info/Química$1'
							}, {
								name: '{{Cidade das Ilhas Faroés}}',
								find: /\{\{Cidade das Ilhas Faroés *(\||\r?\n|<!--)/ig,
								replace: '{{Info/Cidade das Ilhas Faroés$1'
							}, {
								name: '{{CidadesIsraelitas}}',
								find: /\{\{CidadesIsraelitas *(\||\r?\n|<!--)/ig,
								replace: '{{Info/Cidade de Israel$1'
							}, {
								name: '{{CidadesMarroquinas}}',
								find: /\{\{CidadesMarroquinas *(\||\r?\n|<!--)/ig,
								replace: '{{Info/Cidade de Marrocos$1'
							}, {
								name: '{{Cinema/Ficha Técnica}}',
								find: /\{\{Cinema\/Ficha Técnica *(\||\r?\n|<!--)/ig,
								replace: '{{Info/Filme$1'
							}, {
								name: '{{Cinema/Ficha Técnica Ampliada}}',
								find: /\{\{Cinema\/Ficha Técnica Ampliada *(\||\r?\n|<!--)/ig,
								replace: '{{Info/Filme$1'
							}, {
								name: '{{Classe de navio}}',
								find: /\{\{Classe de navio *(\||\r?\n|<!--)/ig,
								replace: '{{Info/Classe de navio$1'
							}, {
								name: '{{Concurso de beleza}}',
								find: /\{\{Concurso de beleza *(\||\r?\n|<!--)/ig,
								replace: '{{Info/Concurso de beleza$1'
							}, {
								name: '{{Condecorações}}',
								find: /\{\{Condecorações *(\||\r?\n|<!--)/ig,
								replace: '{{Info/Condecorações$1'
							}, {
								name: '{{Comuna Francesa}}',
								find: /\{\{Comuna Francesa *(\||\r?\n|<!--)/ig,
								replace: '{{Info/Comuna da França$1'
							}, {
								name: '{{Console}}',
								find: /\{\{Console *(\||\r?\n|<!--)/ig,
								replace: '{{Info/Console$1'
							}, {
								name: '{{CVG personagem}}',
								find: /\{\{CVG personagem *(\||\r?\n|<!--)/ig,
								replace: '{{Info/Personagem de CVG$1'
							}, {
								name: '{{CVG system}}',
								find: /\{\{CVG system *(\||\r?\n|<!--)/ig,
								replace: '{{Info/Console$1'
							}]
						}, {
							name: 'Red Infobox s/ Info - D',
							ifhas: /\{\{D/i,
							sub: [{
								name: '{{Dados Bairros Brasil}}',
								find: /\{\{Dados Bairros Brasil *(\||\r?\n|╔)/ig,
								replace: '{{Info/Bairro do Brasil$1'
							}, {
								name: '{{DadosBairroBH}}',
								find: /\{\{DadosBairroBH *(\||\r?\n|╔)/ig,
								replace: '{{Info/Bairro do Brasil 2$1'
							}, {
								name: '{{DadosBairrosCanoas}}',
								find: /\{\{DadosBairrosCanoas *(\||\r?\n|╔)/ig,
								replace: '{{Info/Bairro do Brasil 2$1'
							}, {
								name: '{{DadosBatalha}}',
								find: /\{\{DadosBatalha *(\||\r?\n|╔)/ig,
								replace: '{{Info/Batalha$1'
							}, {
								name: '{{DadosBatalha (3 lados)}}',
								find: /\{\{DadosBatalha (3 lados) *(\||\r?\n|╔)/ig,
								replace: '{{Info/Batalha 3$1'
							}, {
								name: '{{DadosBatalha(3Lados)}}',
								find: /\{\{DadosBatalha(3Lados) *(\||\r?\n|╔)/ig,
								replace: '{{Info/Batalha (3 Lados)$1'
							}, {
								name: '{{DadosClubeFutebol}}',
								find: /\{\{DadosClubeFutebol *(\||\r?\n|╔)/ig,
								replace: '{{Info/Clube de futebol$1'
							}, {
								name: '{{DadosClubeFutebol/imagem}}',
								find: /\{\{DadosClubeFutebol\/imagem *(\||\r?\n|╔)/ig,
								replace: '{{Info/Clube de futebol/imagem$1'
							}, {
								name: '{{DadosClubeFutebol/padrão}}',
								find: /\{\{DadosClubeFutebol\/padrão *(\||\r?\n|╔)/ig,
								replace: '{{Info/Clube de futebol/padrão$1'
							}, {
								name: '{{DadosColegiosBrasil}}',
								find: /\{\{DadosColegiosBrasil *(\||\r?\n|╔)/ig,
								replace: '{{Info/Colégio do Brasil$1'
							}, {
								name: '{{DadosColegiosMilitaresBrasil}}',
								find: /\{\{DadosColegiosMilitaresBrasil *(\||\r?\n|╔)/ig,
								replace: '{{Info/Colégio militar do Brasil$1'
							}, {
								name: '{{DadosColégiosTécnicosBrasil}}',
								find: /\{\{DadosColégiosTécnicosBrasil *(\||\r?\n|╔)/ig,
								replace: '{{Info/Colégio Técnico do Brasil$1'
							}, {
								name: '{{DadosComandosMilitaresBrasil}}',
								find: /\{\{DadosComandosMilitaresBrasil *(\||\r?\n|╔)/ig,
								replace: '{{Info/Comando militar do Brasil$1'
							}, {
								name: '{{DadosDeputadoPortugal}}',
								find: /\{\{DadosDeputadoPortugal *(\||\r?\n|╔)/ig,
								replace: '{{Info/Deputado de Portugal$1'
							}, {
								name: '{{DadosDiretoriaEB}}',
								find: /\{\{DadosDiretoriaEB *(\||\r?\n|╔)/ig,
								replace: '{{Info/Diretoria do Exército Brasileiro$1'
							}, {
								name: '{{DadosDistritoBrasil}}',
								find: /\{\{DadosDistritoBrasil *(\||\r?\n|╔)/ig,
								replace: '{{Info/Distrito do Brasil$1'
							}, {
								name: '{{DadosDivisãoExércitoEB}}',
								find: /\{\{DadosDivisãoExércitoEB *(\||\r?\n|╔)/ig,
								replace: '{{Info/Divisão do Exército Brasileiro$1'
							}, {
								name: '{{DadosEntidadesEstudantis}}',
								find: /\{\{DadosEntidadesEstudantis *(\||\r?\n|╔)/ig,
								replace: '{{Info/Entidade estudantil$1'
							}, {
								name: '{{Dados de crateras de mercúrio}}',
								find: /\{\{Dados de crateras de mercúrio *(\||\r?\n|╔)/ig,
								replace: '{{Info/Cratera de Mercúrio$1'
							}, {
								name: '{{DadosEnsinoMedio}}',
								find: /\{\{DadosEnsinoMedio *(\||\r?\n|╔)/ig,
								replace: '{{Info/Colégio do Brasil$1'
							}, {
								name: '{{DadosEstadoBrasil2}}',
								find: /\{\{DadosEstadoBrasil2 *(\||\r?\n|╔)/ig,
								replace: '{{Info/Estado do Brasil$1'
							}, {
								name: '{{DadosJogo}}',
								find: /\{\{DadosJogo *(\||\r?\n|╔)/ig,
								replace: '{{Info/Jogo$1'
							}, {
								name: '{{DadosMesorregiãoBrasil}}',
								find: /\{\{DadosMesorregiãoBrasil *(\||\r?\n|╔)/ig,
								replace: '{{Info/Mesorregião$1'
							}, {
								name: '{{DadosMicrorregiãoBrasil}}',
								find: /\{\{DadosMicrorregiãoBrasil *(\||\r?\n|╔)/ig,
								replace: '{{Info/Microrregião$1'
							}, {
								name: '{{DadosMunicípioBrasil}}',
								find: /\{\{DadosMunicípioBrasil *(\||\r?\n|╔)/ig,
								replace: '{{Info/Município do Brasil$1'
							}, {
								name: '{{DadosMunicípioPortugal}}',
								find: /\{\{DadosMunicípioPortugal *(\||\r?\n|╔)/ig,
								replace: '{{Info/Município de Portugal$1'
							}, {
								name: '{{DadosMunicípioTrinidadeTobago}}',
								find: /\{\{DadosMunicípioTrinidadeTobago *(\||\r?\n|╔)/ig,
								replace: '{{Info/Município de Trinidad e Tobago$1'
							}, {
								name: '{{DadosRADistritoFederal}}',
								find: /\{\{DadosRADistritoFederal *(\||\r?\n|╔)/ig,
								replace: '{{Info/Região Administrativa do DF-BR$1'
							}, {
								name: '{{DadosRegiãoBrasil}}',
								find: /\{\{DadosRegiãoBrasil *(\||\r?\n|╔)/ig,
								replace: '{{Info/Região do Brasil$1'
							}, {
								name: '{{DadosRegiãoMetropolitanaBrasil}}',
								find: /\{\{DadosRegiãoMetropolitanaBrasil *(\||\r?\n|╔)/ig,
								replace: '{{Info/Região Metropolitana do Brasil$1'
							}, {
								name: '{{DadosRegioesJundiai}}',
								find: /\{\{DadosRegioesJundiai *(\||\r?\n|╔)/ig,
								replace: '{{Info/Região de Jundiai$1'
							}, {
								name: '{{DadosRegioesMilitaresEB}}',
								find: /\{\{DadosRegioesMilitaresEB *(\||\r?\n|╔)/ig,
								replace: '{{Info/Regiões Militares do Exército Brasileiro$1'
							}, {
								name: '{{DadosRegionaisBH}}',
								find: /\{\{DadosRegionaisBH *(\||\r?\n|╔)/ig,
								replace: '{{Info/Bairro de BH$1'
							}, {
								name: '{{DadosSubprefeiturasSãoPaulo}}',
								find: /\{\{DadosSubprefeiturasSãoPaulo *(\||\r?\n|╔)/ig,
								replace: '{{Info/Subprefeitura de São Paulo$1'
							}, {
								name: '{{DadosUnidadesCBM}}',
								find: /\{\{DadosUnidadesCBM *(\||\r?\n|╔)/ig,
								replace: '{{Info/Unidade CBM$1'
							}, {
								name: '{{DadosUnidadesEB}}',
								find: /\{\{DadosUnidadesEB *(\||\r?\n|╔)/ig,
								replace: '{{Info/Unidades do Exército Brasileiro$1'
							}, {
								name: '{{DadosUnidadesFAB}}',
								find: /\{\{DadosUnidadesFAB *(\||\r?\n|╔)/ig,
								replace: '{{Info/Unidades da Força Aérea Brasileira$1'
							}, {
								name: '{{DadosUnidadesMilitaresPortuguesas}}',
								find: /\{\{DadosUnidadesMilitaresPortuguesas *(\||\r?\n|╔)/ig,
								replace: '{{Info/Unidades Militares de Portugal$1'
							}, {
								name: '{{DadosUnidadesPM}}',
								find: /\{\{DadosUnidadesPM *(\||\r?\n|╔)/ig,
								replace: '{{Info/Unidade PM$1'
							}, {
								name: '{{DadosUniversidadesBrasil}}',
								find: /\{\{DadosUniversidadesBrasil *(\||\r?\n|╔)/ig,
								replace: '{{Info/Universidade do Brasil$1'
							}, {
								name: '{{DadosUniversidadesFranca}}',
								find: /\{\{DadosUniversidadesFranca *(\||\r?\n|╔)/ig,
								replace: '{{Info/Universidade da França$1'
							}, {
								name: '{{DadosUniversidadesNoruega}}',
								find: /\{\{DadosUniversidadesNoruega *(\||\r?\n|╔)/ig,
								replace: '{{Info/Universidade da Noruega$1'
							}, {
								name: '{{DadosUniversidadesPortugal}}',
								find: /\{\{DadosUniversidadesPortugal *(\||\r?\n|╔)/ig,
								replace: '{{Info/Universidade de Portugal$1'
							}, {
								name: '{{Departamentos da Colômbia2}}',
								find: /\{\{Departamentos da Colômbia2 *(\||\r?\n|╔)/ig,
								replace: '{{Info/Departamentos da Colômbia$1'
							}, {
								name: '{{Desporto-olímpico-misto}}',
								find: /\{\{Desporto\-olímpico\-misto *(\||\r?\n|╔)/ig,
								replace: '{{Info/Desporto olímpico misto$1'
							}, {
								name: '{{Dinastias da Armênia}}',
								find: /\{\{Dinastias da Armênia *(\||\r?\n|╔)/ig,
								replace: '{{Info/Dinastia$1'
							}, {
								name: '{{Diocese}}',
								find: /\{\{Diocese *(\||\r?\n|╔)/ig,
								replace: '{{Info/Diocese$1'
							}, {
								name: '{{Drugbox}}',
								find: /\{\{Drugbox *(\||\r?\n|╔)/ig,
								replace: '{{Info/Droga$1'
							}]
						}, {
							name: 'Red Infobox s/ Info - E',
							ifhas: /\{\{E/i,
							sub: [{
								name: '{{Emissora de TV}}',
								find: /\{\{Emissora de TV *(\||\r?\n|╔)/ig,
								replace: '{{Info/Rede de televisão$1'
							}, {
								name: '{{Empresas fictícias}}',
								find: /\{\{Empresas fictícias *(\||\r?\n|╔)/ig,
								replace: '{{Info/Empresas fictícias$1'
							}, {
								name: '{{Episódio de Série}}',
								find: /\{\{Episódio de Série *(\||\r?\n|╔)/ig,
								replace: '{{Info/Episódio de série$1'
							}, {
								name: '{{Episódios de Os Simpsons}}',
								find: /\{\{Episódios de Os Simpsons *(\||\r?\n|╔)/ig,
								replace: '{{Info/Episódios de Os Simpsons$1'
							}, {
								name: '{{Epsódios de Os Simpsons}}',
								find: /\{\{Epsódios de Os Simpsons *(\||\r?\n|╔)/ig,
								replace: '{{Info/Episódios de Os Simpsons$1'
							}, {
								name: '{{Estado EUA}}',
								find: /\{\{Estado EUA *(\||\r?\n|╔)/ig,
								replace: '{{Info/Estado EUA$1'
							}, {
								name: '{{Estado extinto}}',
								find: /\{\{Estado extinto *(\||\r?\n|╔)/ig,
								replace: '{{Info/Estado extinto$1'
							}, {
								name: '{{EstLut}}',
								find: /\{\{EstLut *(\||\r?\n|╔)/ig,
								replace: '{{Info/Wrestler$1'
							}, {
								name: '{{Eventos musicais}}',
								find: /\{\{Eventos musicais *(\||\r?\n|╔)/ig,
								replace: '{{Info/Evento musical$1'
							}]
						}, {
							name: 'Red Infobox s/ Info - F',
							ifhas: /\{\{F/i,
							sub: [{
								name: '{{F1 circuit}}',
								find: /\{\{F1 circuit *(\||\r?\n|╔)/ig,
								replace: '{{Info/Circuito da F1$1'
							}, {
								name: '{{F1 team}}',
								find: /\{\{F1 team *(\||\r?\n|╔)/ig,
								replace: '{{Info/Time de F1$1'
							}, {
								name: '{{F1drive}}',
								find: /\{\{F1drive *(\||\r?\n|╔)/ig,
								replace: '{{Info/Motorista da F1$1'
							}, {
								name: '{{Família serie harry potter}}',
								find: /\{\{Família serie harry potter *(\||\r?\n|╔)/ig,
								replace: '{{Info/Família da série Harry Potter$1'
							}, {
								name: '{{Festival de música}}',
								find: /\{\{Festival de música *(\||\r?\n|╔)/ig,
								replace: '{{Info/Evento musical$1'
							}, {
								name: '{{Ficha harry potter}}',
								find: /\{\{Ficha harry potter *(\||\r?\n|╔)/ig,
								replace: '{{Info/Harry Potter$1'
							}, {
								name: '{{French Comune}}',
								find: /\{\{French Comune *(\||\r?\n|╔)/ig,
								replace: '{{Info/Comuna da França$1'
							}]
						}, {
							name: 'Red Infobox s/ Info - G',
							ifhas: /\{\{G/i,
							sub: [{
								name: '{{General CVG character}}',
								find: /\{\{General CVG character *(\||\r?\n|╔)/ig,
								replace: '{{Info/Personagem de CVG$1'
							}, {
								name: '{{Graphic Novel}}',
								find: /\{\{Graphic Novel *(\||\r?\n|╔)/ig,
								replace: '{{Info/Graphic Novel$1'
							}, {
								name: '{{Grupo étnico}}',
								find: /\{\{Grupo étnico *(\||\r?\n|╔)/ig,
								replace: '{{Info/Grupo étnico$1'
							}]
						}, {
							name: 'Red Infobox s/ Info - H',
							ifhas: /\{\{H/i,
							sub: [{
								name: '{{HolandaWijk}}',
								find: /\{\{HolandaWijk *(\||\r?\n|╔)/ig,
								replace: '{{Info/Distrito dos Países Baixos$1'
							}, {
								name: '{{HQ}}',
								find: /\{\{HQ *(\||\r?\n|╔)/ig,
								replace: '{{Info/Banda desenhada$1'
							}]
						}, {
							name: 'Red Infobox s/ Info - I',
							ifhas: /\{\{I/i,
							sub: [{
								name: '{{Imperadores do Brasil}}',
								find: /\{\{Imperadores do Brasil *(\||\r?\n|╔)/ig,
								replace: '{{Info/Imperador do Brasil$1'
							}, {
								name: '{{Itinerários Principais de Portugal}}',
								find: /\{\{Itinerários Principais de Portugal *(\||\r?\n|╔)/ig,
								replace: '{{Info/Itinerários de Portugal$1'
							}]
						}, {
							name: 'Red Infobox s/ Info - J',
							ifhas: /\{\{J/i,
							sub: [{
								name: '{{Jornal}}',
								find: /\{\{Jornal *(\||\r?\n|╔)/ig,
								replace: '{{Info/Jornal$1'
							}]
						}, {
							name: 'Red Infobox s/ Info - L',
							ifhas: /\{\{L/i,
							sub: [{
								name: '{{Localização das Unidades Residenciais de Santa Maria}}',
								find: /\{\{Localização das Unidades Residenciais de Santa Maria *(\||\r?\n|╔)/ig,
								replace: '{{Info/Unidade Residencial de Santa Maria$1'
							}, {
								name: '{{Locomotiva (dados técnicos)}}',
								find: /\{\{Locomotiva \(dados técnicos\) *(\||\r?\n|╔)/ig,
								replace: '{{Info/Locomotiva$1'
							}, {
								name: '{{Lutador}}',
								find: /\{\{Lutador *(\||\r?\n|╔)/ig,
								replace: '{{Info/LutadorMMA$1'
							}, {
								name: '{{LutadorMMA}}',
								find: /\{\{LutadorMMA *(\||\r?\n|╔)/ig,
								replace: '{{Info/LutadorMMA$1'
							}]
						}, {
							name: 'Red Infobox s/ Info - M',
							ifhas: /\{\{M/i,
							sub: [{
								name: '{{Madeira/geografia}}',
								find: /\{\{Madeira\/geografia *(\||\r?\n|╔)/ig,
								replace: '{{Info/Localidade da Madeira$1'
							}, {
								name: '{{Mil especialidades marinha}}',
								find: /\{\{Mil especialidades marinha *(\||\r?\n|╔)/ig,
								replace: '{{Info/Especialidade da marinha$1'
							}, {
								name: '{{Mineral}}',
								find: /\{\{Mineral *(\||\r?\n|╔)/ig,
								replace: '{{Info/Mineral$1'
							}, {
								name: '{{Mini Info Televisão}}',
								find: /\{\{Mini Info Televisão *(\||\r?\n|╔)/ig,
								replace: '{{Info/Televisão$1'
							}, {
								name: '{{MotoGP rider}}',
								find: /\{\{MotoGP rider *(\||\r?\n|╔)/ig,
								replace: '{{Info/Motorista da MotoGP$1'
							}]
						}, {
							name: 'Red Infobox s/ Info - N',
							ifhas: /\{\{N/i,
							sub: [{
								name: '{{NHL Team}}',
								find: /\{\{NHL Team *(\||\r?\n|╔)/ig,
								replace: '{{Info/NHL Team$1'
							}]
						}, {
							name: 'Red Infobox s/ Info - O',
							ifhas: /\{\{Ó/i,
							sub: [{
								name: '{{Ópera}}',
								find: /\{\{Ópera *(\||\r?\n|╔)/ig,
								replace: '{{Info/Ópera$1'
							}]
						}, {
							name: 'Red Infobox s/ Info - P',
							ifhas: /\{\{P/i,
							sub: [{
								name: '{{Património Mundial}}',
								find: /\{\{Património Mundial *(\||\r?\n|<!--)/ig,
								replace: '{{Info/Património Mundial$1'
							}, {
								name: '{{Personagem animangá}}',
								find: /\{\{Personagem animangá *(\||\r?\n|<!--)/ig,
								replace: '{{Info/Personagem animangá$1'
							}, {
								name: '{{Personagem de D&D}}',
								find: /\{\{Personagem de D&D *(\||\r?\n|<!--)/ig,
								replace: '{{Info/Personagem de D&D$1'
							}, {
								name: '{{Personagem de Desperate Housewives}}',
								find: /\{\{Personagem de Desperate Housewives *(\||\r?\n|<!--)/ig,
								replace: '{{Info/Personagem de Desperate Housewives$1'
							}, {
								name: '{{Personagem de Os Simpsons}}',
								find: /\{\{Personagem de Os Simpsons *(\||\r?\n|<!--)/ig,
								replace: '{{Info/Personagem de Os Simpsons$1'
							}, {
								name: '{{Personagem de Ursinho Pooh 2}}',
								find: /\{\{Personagem de Ursinho Pooh 2 *(\||\r?\n|<!--)/ig,
								replace: '{{Info/Personagem de Ursinho Pooh 2$1'
							}, {
								name: '{{Personagem de Ursinho Pooh HD}}',
								find: /\{\{Personagem de Ursinho Pooh HD *(\||\r?\n|<!--)/ig,
								replace: '{{Info/Personagem de Ursinho Pooh HD$1'
							}, {
								name: '{{Personagem de Ursinho Puff}}',
								find: /\{\{Personagem de Ursinho Puff *(\||\r?\n|<!--)/ig,
								replace: '{{Info/Personagem de Ursinho Puff$1'
							}, {
								name: '{{Personagem de Winnie-the-Pooh}}',
								find: /\{\{Personagem de Winnie\-the\-Pooh *(\||\r?\n|<!--)/ig,
								replace: '{{Info/Personagem de Ursinho Puff$1'
							}, {
								name: '{{Personagem dos filmes Resident Evil}}',
								find: /\{\{Personagem dos filmes Resident Evil *(\||\r?\n|<!--)/ig,
								replace: '{{Info/Personagem dos filmes Resident Evil$1'
							}, {
								name: '{{Personagem Heroes}}',
								find: /\{\{Personagem Heroes *(\||\r?\n|<!--)/ig,
								replace: '{{Info/Personagem Heroes$1'
							}, {
								name: '{{Personagem Lost}}',
								find: /\{\{Personagem Lost *(\||\r?\n|<!--)/ig,
								replace: '{{Info/Personagem Lost$1'
							}, {
								name: '{{Personagem Star Trek}}',
								find: /\{\{Personagem Star Trek *(\||\r?\n|<!--)/ig,
								replace: '{{Info/Personagem Star Trek$1'
							}, {
								name: '{{Personagem Star Wars}}',
								find: /\{\{Personagem Star Wars *(\||\r?\n|<!--)/ig,
								replace: '{{Info/Personagem Star Wars$1'
							}, {
								name: '{{Personagem-pokémon}}',
								find: /\{\{Personagem\-pokémon *(\||\r?\n|<!--)/ig,
								replace: '{{Info/Personagem de Pokémon$1'
							}, {
								name: '{{PersonagemHQ}}',
								find: /\{\{PersonagemHQ *(\||\r?\n|<!--)/ig,
								replace: '{{Info/Personagem fictícia$1'
							}, {
								name: '{{Personagens Charmed}}',
								find: /\{\{Personagens Charmed *(\||\r?\n|<!--)/ig,
								replace: '{{Info/Personagens Charmed$1'
							}, {
								name: '{{Personagens da Bíblia}}',
								find: /\{\{Personagens da Bíblia *(\||\r?\n|<!--)/ig,
								replace: '{{Info/Personagem da Bíblia$1'
							}, {
								name: '{{Personagens de Naruto}}',
								find: /\{\{Personagens de Naruto *(\||\r?\n|<!--)/ig,
								replace: '{{Info/Personagem de Naruto$1'
							}, {
								name: '{{Peru departamento}}',
								find: /\{\{Peru departamento *(\||\r?\n|<!--)/ig,
								replace: '{{Info/Região do Peru$1'
							}, {
								name: '{{Piloto de corrida}}',
								find: /\{\{Piloto de corrida *(\||\r?\n|<!--)/ig,
								replace: '{{Info/Piloto de corrida$1'
							}, {
								name: '{{Pintura}}',
								find: /\{\{Pintura *(\||\r?\n|<!--)/ig,
								replace: '{{Info/Pintura$1'
							}, {
								name: '{{Pista de aterrisagem}}',
								find: /\{\{Pista de aterrisagem *(\||\r?\n|<!--)/ig,
								replace: '{{Info/Aeroporto/Pista de aterrisagem$1'
							}, {
								name: '{{Pokeinfo}}',
								find: /\{\{Pokeinfo *(\||\r?\n|<!--)/ig,
								replace: '{{Info/Pokémon$1'
							}, {
								name: '{{Político}}',
								find: /\{\{Político *(\||\r?\n|<!--)/ig,
								replace: '{{Info/Político$1'
							}, {
								name: '{{Polónia/Comuna}}',
								find: /\{\{Polónia\/Comuna *(\||\r?\n|<!--)/ig,
								replace: '{{Info/Comuna da Polónia$1'
							}, {
								name: '{{Polónia/Condado}}',
								find: /\{\{Polónia\/Condado *(\||\r?\n|<!--)/ig,
								replace: '{{Info/Condado da Polónia$1'
							}, {
								name: '{{Polónia/voivodia}}',
								find: /\{\{Polónia\/voivodia *(\||\r?\n|<!--)/ig,
								replace: '{{Info/Voivodias da Polónia$1'
							}, {
								name: '{{Ponte}}',
								find: /\{\{Ponte *(\||\r?\n|<!--)/ig,
								replace: '{{Info/Ponte$1'
							}, {
								name: '{{Portos}}',
								find: /\{\{Portos *(\||\r?\n|<!--)/ig,
								replace: '{{Info/Porto$1'
							}]
						}, {
							name: 'Red Infobox s/ Info - R',
							ifhas: /\{\{R/i,
							sub: [{
								name: '{{Região}}',
								find: /\{\{Região *(\||\r?\n|<!--)/ig,
								replace: '{{Info/Região2$1'
							}]
						}, {
							name: 'Red Infobox s/ Info - S',
							ifhas: /\{\{S/i,
							sub: [{
								name: '{{Sábios chineses}}',
								find: /\{\{Sábios chineses *(\||\r?\n|<!--)/ig,
								replace: '{{Info/Sábio chinês$1'
							}, {
								name: '{{Senadores do Império do Brasil}}',
								find: /\{\{Senadores do Império do Brasil *(\||\r?\n|<!--)/ig,
								replace: '{{Info/Senador do Império do Brasil$1'
							}, {
								name: '{{Star Trek character}}',
								find: /\{\{Star Trek character *(\||\r?\n|<!--)/ig,
								replace: '{{Info/Personagem Star Trek$1'
							}, {
								name: '{{Super-Herói}}',
								find: /\{\{Super\-Herói *(\||\r?\n|<!--)/ig,
								replace: '{{Info/Super-Herói$1'
							}, {
								name: '{{Supergrupo}}',
								find: /\{\{Supergrupo *(\||\r?\n|<!--)/ig,
								replace: '{{Info/Supergrupo$1'
							}, {
								name: '{{SuperNomes}}',
								find: /\{\{SuperNomes *(\||\r?\n|<!--)/ig,
								replace: '{{Info/Super-Nomes$1'
							}, {
								name: '{{Supercomics}}',
								find: /\{\{Supercomics *(\||\r?\n|<!--)/ig,
								replace: '{{Info/Supercomics$1'
							}, {
								name: '{{Surfista}}',
								find: /\{\{Surfista *(\||\r?\n|<!--)/ig,
								replace: '{{Info/Surfista$1'
							}]
						}, {
							name: 'Red Infobox s/ Info - T',
							ifhas: /\{\{T/i,
							sub: [{
								name: '{{Tabela Shurato}}',
								find: /\{\{Tabela Shurato *(\||\r?\n|<!--)/ig,
								replace: '{{Info/Shurato$1'
							}, {
								name: '{{Tabela UNESCO}}',
								find: /\{\{Tabela UNESCO *(\||\r?\n|<!--)/ig,
								replace: '{{Info/Património Mundial$1'
							}, {
								name: '{{Tabela-Bleach}}',
								find: /\{\{Tabela\-Bleach *(\||\r?\n|<!--)/ig,
								replace: '{{Info/Bleach$1'
							}, {
								name: '{{Tabela-bucky}}',
								find: /\{\{Tabela\-bucky *(\||\r?\n|╔)/ig,
								replace: '{{Info/Bucky$1'
							}, {
								name: '{{Tabela-CDZ}}',
								find: /\{\{Tabela\-CDZ *(\||\r?\n|<!--)/ig,
								replace: '{{Info/Personagem CDZ$1'
							}, {
								name: '{{Tabela-FMA}}',
								find: /\{\{Tabela\-FMA *(\||\r?\n|<!--)/ig,
								replace: '{{Info/Fullmetal Alchemist$1'
							}, {
								name: '{{Tabela-naruto}}',
								find: /\{\{Tabela\-naruto *(\||\r?\n|<!--)/ig,
								replace: '{{Info/Personagem de Naruto$1'
							}, {
								name: '{{Tabela-One Piece}}',
								find: /\{\{Tabela\-One Piece *(\||\r?\n|<!--)/ig,
								replace: '{{Info/Personagem One Piece$1'
							}, {
								name: '{{Tabela-pokémon}}',
								find: /\{\{Tabela\-pokémon *(\||\r?\n|<!--)/ig,
								replace: '{{Info/Pokémon$1'
							}, {
								name: '{{Taxobox}}',
								find: /\{\{Taxobox *(\||\r?\n|<!--)/ig,
								replace: '{{Info/Taxonomia$1'
							}, {
								name: '{{Taxocaixa}}',
								find: /\{\{Taxocaixa *(\||\r?\n|<!--)/ig,
								replace: '{{Info/Taxonomia$1'
							}, {
								name: '{{Temporada de Série}}',
								find: /\{\{Temporada de Série *(\||\r?\n|<!--)/ig,
								replace: '{{Info/Temporada de série$1'
							}, {
								name: '{{ToponímiaSãoPaulo}}',
								find: /\{\{ToponímiaSãoPaulo *(\||\r?\n|<!--)/ig,
								replace: '{{Info/Toponímia de São Paulo$1'
							}, {
								name: '{{Tour de France class}}',
								find: /\{\{Tour de France class *(\||\r?\n|<!--)/ig,
								replace: '{{Info/Tour de France$1'
							}]
						}, {
							name: 'Red Infobox s/ Info - U',
							ifhas: /\{\{U/i,
							sub: [{
								name: '{{UsinasHidreletricas}}',
								find: /\{\{UsinasHidreletricas *(\||\r?\n|<!--)/ig,
								replace: '{{Info/Usina Hidrelétrica$1'
							}]
						}, {
							name: 'Red Infobox s/ Info - W',
							ifhas: /\{\{W/i,
							sub: [{
								name: '{{Winnie-the-Pooh}}',
								find: /\{\{Winnie\-the\-Pooh *(\||\r?\n|<!--)/ig,
								replace: '{{Info/Personagem de Ursinho Puff$1'
							}]
						}, {
							name: 'Red Infobox s/ Info - X',
							ifhas: /\{\{X/i,
							sub: [{
								name: '{{Xiaolin1}}',
								find: /\{\{Xiaolin1 *(\||\r?\n|<!--)/ig,
								replace: '{{Info/Personagem de Duelo Xaolin$1'
							}]
						}]
					}]
				}, {
					name: 'Red Tabela',
					sub: [{
						name: 'Clima',
						find: /\{\{Infobox Clima *(\||\r?\n|╔)/ig,
						replace: '{{Tabela/Clima$1',
						num: 100
					}]
				}, {
					name: 'Tag man',
					sub: [{
						name: '{{Esboço-videojogos}}',
						find: /\{\{Esboço-videojogos\}\}/g,
						replace: '{{Esboço-videogame}}'
					}, {
						name: '{{Trivia}}',
						find: /\{\{Curiosidades([\|\r\n\}])/ig,
						replace: '{{Trivia$1'
					}, {
						name: '{{Corrigir}}',
						find: /\{\{Correção([\|\r\n\}])/ig,
						replace: '{{Corrigir$1'
					}, {
						name: '{{Contextualizar}}',
						find: /\{\{(Contexto|sem contexto|carece contexto)([\|\r\n\}])/ig,
						replace: '{{Contextualizar$2'
					}, {
						name: '{{semft}}',
						find: /\{\{semft\}\}/ig,
						replace: '{{Semfichatécnica}}'
					}, {
						name: '{{Sem imagem}}',
						find: /\{\{(Sem\-?imagem|semim)([\|\r\n\}])/ig,
						replace: '{{Sem imagem$2'
					}, {
						name: '{{Seminterwiki}}',
						find: /\{\{Sem[ \-]?(iw|interwiki)([\|\r\n\}])/ig,
						replace: '{{Seminterwiki$2'
					}, {
						name: '{{Seminterwiki}}',
						find: /\{\{Sem[\- ]interwiki([\|\r\n\}])/ig,
						replace: '{{Seminterwiki$1'
					}, {
						name: '{{Wikificação}}',
						find: /\{\{(Wikificar|Wikify|Wkf)([\|\r\n\}])/ig,
						replace: '{{Wikificação$2'
					}, {
						name: '{{Reciclagem}}',
						find: /\{\{(Reciclar|Suspeita|Formatação|Reciclagem2|Rec)([\|\r\n\}])/ig,
						replace: '{{Reciclagem$2'
					}, {
						name: '{{Revisão}}',
						find: /\{\{(Especialista|Revisar)([\|\r\n\}])/ig,
						replace: '{{Revisão$2'
					}, {
						name: '{{Carece de fontes',
						find: /\{\{(?:Carece[ _]de[ _]fontes|Sem fontes|Fact)([\|\r\n\}])/ig,
						replace: '{{Carece de fontes$1'
					}, {
						name: '{{Fusão}}',
						find: /\{\{(?:Fu(?:s(?:ao|ão1)|ndir))([\|\r\n\}])/ig,
						replace: '{{Fusão$1'
					}, {
						name: '{{Artigo longo}}',
						find: /\{\{(Artigo Longo|Longo)([\|\r\n\}])/ig,
						replace: '{{Artigo longo$2'
					}, {
						name: '{{Sem-fontes}}',
						find: /\{\{(Citar fonte|Factual|Fonteprimária|Rigor|Sem\-fonte|Sem-referências|Unreferenced)([\|\r\n\}])/ig,
						replace: '{{Sem-fontes$2',
						num: 10
					}, {
						name: '{{Sem infocaixa',
						find: /\{\{(?:Falta(?:\-caixa|\-info)|Sem[\- ]infobox)([\|\r\n\}])/ig,
						replace: '{{Sem infocaixa$1',
						num: 10
					}, {
						name: '{{Stub}}',
						find: /\{\{Stub([\|}])/ig,
						replace: '{{esboço$1',
						num: 10
					}]
				}, {
					name: 'Portais',
					sub: [{
						name: '{{Portal-administração}}',
						find: /\{\{portal\-(admin)\}\}/ig,
						replace: '{{Portal-administração}}'
					}]
				}, {
					name: 'Outros',
					sub: [{
						name: '{{Flagicon}}',
						find: /\{\{(?:ÍconeBandeira|Bandera)(\||\}\})/ig,
						replace: '{{Flagicon$1',
						num: 10
					}, {
						name: '{{Revelações sobre o enredo}}',
						find: /\{\{(Enredo|Tema|(Spoilers?([ \-]início)?))\}\}/ig,
						replace: '{{Revelações sobre o enredo}}',
						sub: [{
							name: '{{Enredo}}',
							find: /\{\{Enredo\}\}/g,
							replace: '{{Revelações sobre o enredo}}'
						}, {
							name: '{{Spoilers}}',
							find: /\{\{Spoilers?([ \-]início)?\}\}/ig,
							replace: '{{Revelações sobre o enredo}}'
						}, {
							name: '{{Tema}}',
							find: /\{\{Tema\}\}/g,
							replace: '{{Revelações sobre o enredo}}'
						}]
					}, {
						name: 'REF',
						sub: [{
							name: '{{Referências}}',
							find: /\{\{(?:Referências|rodapé referências|Ref\-?section)(\||\}\})/ig,
							replace: '{{Referências$1'
						}, {
							name: '{{Reflist}}',
							find: /\{\{(?:Refcompacta|Refs)\}\}/ig,
							replace: '{{Reflist}}'
						}, {
							name: '{{Citar bíblia}}',
							find: /\{\{Refbíblia( *\|?[ \|\r\n])/ig,
							replace: '{{Citar bíblia$1'
						}, {
							name: '{{ligação inativa}}',
							find: /\{\{dead link(\||\}\})/ig,
							replace: '{{ligação inativa$1'
						}, {
							name: '{{Imdb título}}',
							find: /\{\{(?:Imdb title|Filmes Imdb)([\|}])/ig,
							replace: '{{Imdb título$1',
							num: 10
						}, {
							name: '{{Imdb nome}}',
							find: /\{\{(?:IMDB nome|Imdb name|Imdb|IMDb name)([\|}])/ig,
							replace: '{{Imdb nome$1',
							num: 10
						}, {
							name: '{{Citar livro}}',
							find: /\{\{Referência a livro\|/ig,
							replace: '{{Citar livro|'
						}, {
							name: '{{Cite web}}',
							find: /\{\{Citeweb\|/ig,
							replace: '{{Cite web|'
						}]
					}, {
						name: 'nascimentos',
						sub: [{
							name: '{{dni}}',
							find: /\{\{(?:nascimento e idade|data de nascimento)(\||\}\})/ig,
							replace: '{{dni$1',
							num: 10
						}, {
							name: '{{dni|sem idade}}',
							find: /\{\{nascimento(\|[^\|\}\n]*\|[^\|\}\n]*\|[^\|\}\n]*)([\|}])/ig,
							replace: '{{dni$1|si$2'
						}, {
							name: '{{dni|lang=br}}',
							find: /\{\{dnibr(\||\}\})/ig,
							replace: '{{dni|lang=br$1'
						}, {
							name: '{{morte}}',
							find: /\{\{(?:falecimento|Morte e idade|Data de morte e idade|Data falecimento e idade|falecimento e idade|dmi)(\||\}\})/ig,
							replace: '{{morte$1',
							num: 10
						}, {
							name: '{{morte}} -campos',
							find: /(\{\{morte[^{}\n]*)\|[dm]f=[^\|\{\}\n]+([\|}])/ig,
							replace: '$1$2',
							num: 10
						}]
					}, {
						name: '{{Artigo principal}}',
						find: /\{\{(AP|Main|Ver artigo principal)\|/ig,
						replace: '{{Artigo principal|'
					}, {
						name: '{{Ligações externas}}',
						find: /\{\{(?:Apontadores(?: externos)?|Atalhos externos|Enlace externo|Enlaces externos|Elos externos|Link externo|Links|Links exteriores|Links externos|Links para o exterior|Links relacionados|Ligação exterior|Ligação externa|Ligações Externas|Ligações exteriores|Ligações para o exterior|Linque externo|Páginas externas|Página externa|Páginas da Internet|Recursos exteriores à Wikipédia|Referência externa|Referências externas|Sítios|Vínculos externos|Weblinks)\}\}/ig,
						replace: 'Ligações externas'
					}, {
						name: '{{Ver também}}',
						find: /\{\{((Ligações|Referências|Links) intern[ao]s|(Consultar|Veja|Ver|Vide) (mais|tamb[eé]m|ainda)|(Artigos|Assuntos|Páginas|Tópicos) relacionad[ao]s|Tópicos diversos)\}\}/ig,
						replace: 'Ver também'
					}, {
						name: '{{Biografias}}',
						find: /\{\{biografia\}\}/ig,
						replace: '{{Biografias}}'
					}, {
						name: '{{Ciências-rodapé}}',
						find: /\{\{Ciências-rodapé\}\}/ig,
						replace: '{{Ciências}}'
					}, {
						name: 'Meta/Persondata',
						find: /\{\{Info\/Persondata *(\||\r?\n|╔)/ig,
						replace: '{{Meta/Persondata$1'
					}, {
						name: '{{Educação}}',
						find: /\{\{Educação\-rodapé\}\}/ig,
						replace: '{{Educação}}'
					}, {
						name: '{{limpar}}',
						find: /\{\{(\-|clear)\}\}/ig,
						replace: '{{limpar}}'
					}, {
						name: 'Rule',
						find: /\{\{(Start box|Comeca caixa)\}\}/ig,
						replace: '{{Começa caixa}}',
						num: 10
					}]
				}, {
					name: 'Artigos em tradução',
					sub: [{
						name: '{{sp icon}}',
						find: /\{\{sp icon\}\}/ig,
						replace: '{{es}}',
						num: 100
					}]
				}]
			}, {
				name: 'Quebra linha em predefs',
				sub: [{
					name: 'Quebra linha em predefs 1',
					find: /\{\{(Artigo longo|Controverso|Corrigir|Fusão|Fusão com|Fusão de|Parcial|Reciclagem|Revisão|Sem\-fontes|Sem imagem|Seminterwiki|Sem\-notas|Trivia|Wikificação)([^\n\}]*)\}\}([^\r\n])/ig,
					replace: '{{$1$2}}\n$3',
					num: 10
				}, {
					name: 'Quebra linha em predefs 2',
					find: /\{\{(Artigo longo|Controverso|Corrigir|Fusão|Fusão com|Fusão de|Parcial|Reciclagem|Revisão|Sem\-fontes|Sem imagem|Seminterwiki|Sem\-notas|Trivia|Wikificação)([^\n\}]*)\}\}(\r?\n){2,}/ig,
					replace: '{{$1$2}}\n',
					num: 10
				}, {
					name: 'Quebra linha em predefs 3',
					find: /([^\r\n])\{\{Portal3\|/ig,
					replace: '$1\n{{Portal3|'
				}]
			}, {
				name: 'Último campo de predefinição',
				find: /\n( *)\| *\}\}/ig,
				replace: '\n$1}}'
			}, {
				name: '| das predefs',
				sub: [{
					name: '| do título',
					find: /\{\{([^\|\n]*)\| *(?:\r?\n)+ *\|/ig,
					replace: '{{$1\n |'
				}, {
					name: '| dos campos',
					find: /\r?\n\| /ig,
					replace: '\n |',
					where: 'templates'
				}]
			}, {
				name: 'tradução de campos',
				sub: [{
					name: '|date=',
					find: /(\{\{ligação inativa[^\|\{\}\n]+)\|date=/ig,
					replace: '$1|data=',
					num: 10
				}]
			}]
		}, {
			name: 'Nome de ficheiro',
			find: /(╠[^\|\n\[\]_]*)_/ig,
			replace: '$1 ',
			num: 100
		}, {
			name: 'Ligações internas',
			ifhas: /[\[\]]/i,
			sub: [{
				name: '%20',
				find: /(\[\[[^%\]]*)%20([^\]]*\]\])/ig,
				replace: '$1 $2',
				num: 100
			}, {
				name: '[[w:',
				find: /\[\[w:(..[^:])/ig,
				replace: '[[$1'
			}, {
				name: '[[<br />',
				find: /\[\[<br \/>/ig,
				replace: '<br />[[',
				num: 100
			}]
		}, {
			name: 'Começa com seção',
			find: /▓==.*==\r?\n/ig,
			replace: '▓',
			num: 10
		}]
	}, {
		name: 'Marcando',
		sub: [{
			name: 'Marca meio',
			sub: [{
				name: 'Marca comentários',
				sub: [{
					name: 'Marca <!--',
					find: /<!--/g,
					replace: '╔',
					num: 100
				}, {
					name: 'Marca -->',
					find: /-->/g,
					replace: '╗',
					num: 100
				}, {
					name: 'Rule',
					find: /╔\-+([^\-])/ig,
					replace: '╔$1'
				}]
			}, {
				name: 'Marca inicio de ficheiro',
				find: /\[\[(?:Imagem?|File|Arquivo|Ficheiro):/ig,
				replace: '╠Imagem:',
				num: 100
			}, {
				name: 'Marca fim de ficheiro',
				find: /(╠)((([^\n\[\]]*)(\[+[^\]\n]*\]{1,2})?)+)/ig,
				replace: '$1$2▒',
				ifhas: '╠'
			}, {
				name: 'Marca seções',
				sub: [{
					name: 'Marca inicio seção',
					find: /\r?\n=/ig,
					replace: '\n║=',
					num: 100
				}]
			}]
		}, {
			name: 'Marca inicio',
			sub: [{
				name: 'Marca fim infobox - regra geral',
				find: /(\{\{Info[^\{\}]*)((?:\{\{[^\{\}]*(?:(?:\{\{[^\{\}]*\}\}[^\{\}]*)*)\}\}[^\{\}]*)*)\}\}/ig,
				replace: '$1$2╣}}',
				ifnot: /\{\{Info\/Química/i
			}, {
				name: 'Marca fim infobox - outras infoboxes',
				ifnot: '╣',
				sub: [{
					name: 'Marca fim infobox - esportistas',
					find: /(\n\{\{Medal[^\n\{\}]+\}\}\r?\n) *\}\}/ig,
					replace: '$1╣}}',
					ifhas: '{{Medal'
				}, {
					name: 'Marca fim infobox - Info/Química',
					ifhas: /\{\{Info\/Química/i,
					sub: [{
						name: 'Rule',
						find: /(\n +\}\}\n)\}\}/ig,
						replace: '$1╣}}',
						ifhas: /\| *Section1 *= *\n* *\{\{/i
					}, {
						name: 'Rule',
						find: /(\{\{Info[^\{\}]*)((?:\{\{[^\}]*\}\}[^\{\}]*)*)\}\}/ig,
						replace: '$1$2╣}}',
						ifnot: /\| *Section1 *= *\n* *\{\{/i
					}]
				}]
			}, {
				name: 'Arruma fim infobox',
				find: /╣\}\}( *(?:\r?\n)* *)\{\{Info/ig,
				replace: '}}$1{{Info'
			}, {
				name: 'Infobox para cima da introdução',
				find: /([\n▓])([^{}=\-\r\n][^{}=\r\n]*\r?\n)(\{\{Info\/[^╣]+╣\}\}\r?\n)/ig,
				replace: '$1$3$2'
			}, {
				name: 'Rule',
				find: /([^\r\n])╣\}\}/ig,
				replace: '$1\n╣}}'
			}, {
				name: 'Rule',
				find: /\r?\n *\r?\n╣\}\}/ig,
				replace: '\n╣}}',
				num: 10
			}, {
				name: 'Marca primeira seção',
				sub: [{
					name: 'Rule',
					find: /(▓[^░║╩]*)║/g,
					replace: '$1╩\n║'
				}, {
					name: 'Secao1 após info',
					num: 20,
					ifhas: /╣\}\}(\r?\n)*╩/,
					sub: [{
						name: 'retira secao',
						find: /╣\}\}(?:\r?\n)*╩(?:\r?\n)*║=*[^=\n]*=*\r?\n/ig,
						replace: '╣}}\n'
					}, {
						name: 'marca de novo',
						find: /(▓[^░║╩]*)║/ig,
						replace: '$1╩\n║'
					}]
				}]
			}, {
				name: 'Marca parag 1 inicio',
				sub: [{
					name: 'Marca p1 inicio 1 - fim info',
					find: /(╣\}\}(?:\r?\n)+)([^\-╠<\r\n])/g,
					replace: '$1╚$2',
					ifnot: '╚'
				}, {
					name: 'Marca p1 inicio 2 - começa direto',
					find: /▓([^\-<╔{}\|]|\{\{(?:PBPE|PEPB))/ig,
					replace: '>▓╚$1',
					ifnot: '╚',
					sub: [{
						name: 'Rule',
						find: /╚(╠[^▒]+▒\]\]\r?(?:\n\r?)*)([^╠\]\n\r])/ig,
						replace: '$1╚$2'
					}]
				}, {
					name: 'Marca p1 inicio 3 - sem apoio',
					ifnot: /╚/,
					sub: [{
						name: 'Marca todos os \n',
						find: /(▓(?:\{\{Sem[^}]*\}\})?[^\-╩░]*)\n([^╩░])/g,
						replace: '$1╚$2',
						num: 100
					}, {
						name: 'retira os errados',
						find: /╚([\-{╠╚╩<\|\&])/g,
						replace: '\n$1',
						num: 100
					}, {
						name: 'retira em info',
						find: /(▓[^╣]*)╚/ig,
						replace: '$1\n',
						num: 100,
						ifhas: '╣'
					}, {
						name: 'recoloca para PBPE',
						find: /(▓[^╩]*)\n(\{\{(?:PBPE|PEPB))/g,
						replace: '$1╚$2'
					}, {
						name: 'deixa só o primeiro',
						find: /╚([^╚╩]*)╚/g,
						replace: '╚$1\n',
						num: 100
					}, {
						name: 'quebra de linha no primeiro',
						find: /╚/g,
						replace: '\n╚'
					}]
				}, {
					name: 'Marca p1 inicio 4 - intro c 1 parag',
					find: /(▓(?:\{.*\}\r?\n)*)([^{}].*(?:\r?\n)*╩)/ig,
					replace: '$1╚$2',
					ifnot: '╚'
				}, {
					name: 'Marca p1 inicio 5 - imagem',
					ifnot: '[╚┼]',
					sub: [{
						name: 'Marca',
						find: /\n\r?\n/ig,
						replace: '┼'
					}, {
						name: 'Parag 1',
						find: /(▓[^┼░]*▒\]\](?:\r?\n)*)([^╠{\r\n])/ig,
						replace: '$1╚$2'
					}, {
						name: 'Desmarca',
						find: /┼/ig,
						replace: '\n\n'
					}]
				}]
			}, {
				name: 'Marca parag 1 fim',
				sub: [{
					name: 'Marca tag quebra linha',
					find: /(<p>|<\/p>|<br \/>)/ig,
					replace: '┬$1'
				}, {
					name: 'Final',
					find: /╚([^\r\n╝┬]+)([\r\n╝┬])/g,
					replace: '╚$1╝$2',
					ifhas: '╚'
				}, {
					name: 'Rule',
					find: /╝┬/ig,
					replace: '╝\n┬'
				}, {
					name: 'Rule',
					find: /┬/g,
					replace: '',
					num: 100
				}]
			}, {
				name: 'Desmarca início sem fim',
				find: /╚/g,
				replace: '',
				ifnot: '╝'
			}, {
				name: 'Fim intro sem seção',
				ifnot: /[╩║]/i,
				sub: [{
					name: 'marca',
					find: /(╝[^░╩]*)(\r?\n\r?\n\{)/ig,
					replace: '$1\n╩$2',
					ifnot: /\n║?==/i
				}, {
					name: 'remarca',
					find: /(╝[^░╩]*)(\r?\n\r?\n\{[^░╩]*)\r?\n╩/ig,
					replace: '$1\n╩$2',
					num: 10
				}]
			}]
		}, {
			name: 'Marca fim'
		}, {
			name: 'Marca título',
			find: /▓/g,
			replace: '▓%%title%%╦\n'
		}, {
			name: 'Desmarca',
			sub: [{
				name: 'Rule',
				find: /[╚╝]/ig,
				replace: '',
				num: 10,
				ifhas: /▓(Wikipedia|Ficheiro|MediaWiki|Predefinição|Ajuda|Categoria|Portal)( Discussão)?:/i
			}]
		}]
	}, {
		name: 'Temporário',
		sub: [{
			name: 'class="wikitable" 1',
			find: /\{\{(Tabela *bonita|Tabla *bonita|Prettytable)\}\}/ig,
			replace: 'class="wikitable"'
		}, {
			name: 'class="wikitable" 2',
			find: /(class *= *"?)prettytable([^a-z])/g,
			replace: '$1wikitable$2'
		}, {
			name: 'class="wikitable" 3',
			find: /\{\{(Tabela bonita\-sorteável|tabelabonita organizável)\}\}/ig,
			replace: 'class="wikitable sortable"'
		}]
	}]
},

{
	/*Regras bem testadas e que não possuem erros
	* podendo ser usadas por bots
	* Não necessitam de revisão
	*/
	name: 'Modo bot',
	ifnot: /(\{\{desambiguação\}\}|\[\[Categoria:Desambiguaç(ão|ões))/i,
	sub: [{
		name: 'Geral 1',
		sub: [{
			name: '<br />',
			num: 100,
			ifhas: /<\/? *br *\/?\>/i,
			sub: [{
				name: '<br /> em predef - remove br',
				find: /(\n *\| *[^=\n]+=.*)<br \/>\r?\n( *\|)/ig,
				replace: '$1\n$2',
				num: 100
			}, {
				name: '<br /> em predef - remove \n',
				find: /(\n *\| *[^=\n]+=.*)<br \/>\r?\n/ig,
				replace: '$1<br />',
				num: 10
			}, {
				name: '<br /> duplo',
				find: /(\n *[^ \|].*)<br \/><br \/>/ig,
				replace: '$1<br />',
				num: 100
			}, {
				name: 'Trimming antes de <br />',
				find: / +<br \/>/ig,
				replace: '<br />',
				num: 100
			}, {
				name: '<br /> entre quebra de linha',
				find: /(\r?\n)+<br \/>(\r?\n)+/ig,
				replace: '\n\n',
				num: 100
			}, {
				name: '<br /> entre <p>',
				find: /(<\/?p>)<br \/>(<\/?p>)/ig,
				replace: '$1\n\n$2'
			}, {
				name: 'Rule',
				find: /<br \/>\r?\n([^\r?\n])/ig,
				replace: '\n\n$1',
				num: 10
			}, {
				name: 'Rule',
				find: /<br \/>\r?\n\r?\n/ig,
				replace: '\n\n',
				num: 10
			}, {
				name: '<br /> antes predef',
				find: /<br \/>(\r?\n)+\{\{/ig,
				replace: '\n\n{{',
				num: 100
			}, {
				name: '<br /> antes lista',
				find: /<br \/>\r?\n([\*\#])/ig,
				replace: '\n$1',
				num: 100
			}, {
				name: '<br />]]',
				find: /<br \/>(▒?)\]\]/ig,
				replace: '$1]]'
			}, {
				name: '\n<br />',
				find: /([^\n])(\r?\n)+<br \/>/ig,
				replace: '$1\n\n',
				num: 10
			}, {
				name: '<br /> fim de lista',
				find: /(\n\*.*)<br \/>(\r?\n)/g,
				replace: '$1\n',
				num: 10
			}, {
				name: '<br /> no final do link / linktext',
				find: /<br \/>(\||\]\])/ig,
				replace: '$1',
				num: 10
			}]
		}, {
			name: 'Tags g1',
			ifhas: '<',
			sub: [{
				name: 'Fechamento errado',
				sub: [{
					name: '<small />',
					find: /<small \/>/ig,
					replace: '</small>',
					num: 10
				}]
			}, {
				name: 'Tag vazia',
				sub: [{
					name: 'tag abre-fecha',
					find: /<([^\>\n\/]+)> *(?:\r?\n)* *<\/\1>/ig,
					replace: '',
					num: 10
				}, {
					name: '<div></div>',
					find: /<div[^<>\n\/]*> *(?:\r?\n)* *<\/div>/ig,
					replace: '',
					num: 10
				}]
			}, {
				name: 'Tag duplicada',
				sub: [{
					// Nem sempre é para juntar, como em <ref>.
					enabled: false,
					name: 'tag fecha - abre',
					find: /<\/([^<>\n]+)> *(?:\r?\n)* *<\1>/ig,
					replace: '',
					num: 10
				}, {
					name: '</small></small>',
					find: /<\/small> *(?:\r?\n)* *<\/small>/ig,
					replace: '</small>'
				}]
			}, {
				name: 'Tag sem início',
				sub: [{
					name: '</div>',
					find: /<\/div>/ig,
					replace: '',
					num: 10,
					ifnot: '<div' // FIXME: /<div/i ?
				}, {
					name: '</gallery>',
					find: /<\/gallery>/ig,
					replace: '',
					num: 10,
					ifnot: '<gallery' // FIXME: /<gallery/i ?
				}]
			}, {
				name: 'Tag sem fim',
				sub: [{
					name: '<center>',
					find: /(\n *\| *<center>[^<>\n]*)(\r?\n *\|)/ig,
					replace: '$1</center>$2',
					num: 10
				}, {
					name: '<pre>',
					find: /<pre>/ig,
					replace: '',
					ifnot: '</pre>' // FIXME: /</pre>/i ?
				}, {
					name: '</small>'
				}]
			}, {
				name: '<i>',
				find: /<\/? *i *\/?\>/ig,
				replace: '\'\'',
				num: 10
			}, {
				name: '<b> e <strong>',
				find: /<\/? *(b|strong) *\/?\>/ig,
				replace: '\'\'\'',
				num: 10
			}, {
				name: '<p>',
				num: 100,
				ifhas: '<p>', // FIXME: /<p>/i ?
				sub: [{
					name: '<p> 1',
					find: /<p>/ig,
					replace: '<br />',
					num: 10,
					where: 'templates'
				}, {
					name: '<p> 2',
					find: /<\/p>/ig,
					replace: '',
					num: 9,
					where: 'templates'
				}, {
					name: '<p> 3',
					find: /<\/? *p *\/?\>/ig,
					replace: '\n\n',
					num: 10
				}, {
					name: '<p align="justify">',
					find: /<p align="justify">/ig,
					replace: '',
					num: 100
				}, {
					name: '\n\n\n+',
					find: /(\r?\n){3,}/ig,
					replace: '\n\n',
					num: 10
				}]
			}, {
				name: '<small>',
				sub: [{
					name: 'Marca <small>',
					find: /<small>/ig,
					replace: '┼',
					num: 100
				}, {
					name: 'Marca </small>',
					find: /<\/small>/ig,
					replace: '┤',
					num: 100
				}, {
					name: '<small> em ref/sup/sub/ficheiro',
					num: 10,
					ifhas: '<small>', // FIXME: /<small>/i ?
					sub: [{
						name: 'small duplo',
						find: /┼(┼[^┤]*┤)┤/ig,
						replace: '$1',
						num: 100
					}, {
						name: '<small> para dentro de ref/sup/sub',
						find: /┼ *(<ref[^>]*>|<sup>|<sub>)/ig,
						replace: '$1┼'
					}, {
						name: '</small> para dentro de ref/sup/sub',
						find: /(<ref[^>\n]*>|<sup>|<sub>)┼([^\n┤]*)(<\/ref>|<\/sup>|<\/sub>)┤/ig,
						replace: '$1┼$2┤$3'
					}, {
						name: '<small> em ref/sup/sub substitui',
						find: /(<ref[^\/\n\>]*>|<sup>|<sub>)([^┼<]*)┼([^┤<]*)┤/ig,
						replace: '$1$2$3',
						num: 10
					}, {
						name: '<small> em Ficheiro',
						find: /(╠[^┼\n▒]*)┼([^┤\n▒]*)┤([^▒\n]*)▒/ig,
						replace: '$1$2$3▒',
						num: 10,
						ifhas: /╠.*┼/i
					}]
				}, {
					name: 'Desmarca <small>',
					find: /┼/g,
					replace: '<small>',
					num: 10
				}, {
					name: 'Desmarca </small>',
					find: /┤/g,
					replace: '</small>',
					num: 10
				}]
			}, {
				name: '<br />}}',
				find: / *<br \/> *(\r?\n)* *(╣?)\}\}/ig,
				replace: '\n$1}}',
				num: 10,
				sub: [{
					name: 'big',
					ifhas: '<big>',
					sub: [{
						name: '<big> dentro predef',
						find: /<\/?big>/ig,
						replace: '',
						where: 'templates'
					}, {
						name: 'Rule',
						find: /; *<big>([^\r\n<>]*)<\/big>/ig,
						replace: '; $1'
					}, {
						name: 'Rule',
						find: /'''<big>([^\r\n<>]*)<\/big>'''/ig,
						replace: '\'\'\'$1\'\'\''
					}, {
						name: 'Rule',
						find: /<big>'''([^\r\n<>]*)'''<\/big>/ig,
						replace: '\'\'\'$1\'\'\''
					}]
				}]
			}, {
				name: '<span>',
				sub: [{
					name: '<span class="plainlinks">',
					find: /<span class="plainlinks">([^\n<>]*)<\/span>/ig,
					replace: '$1'
				}]
			}]
		}, {
			name: '----',
			sub: [{
				name: '---- antes de infobox',
				find: /\n-{3,}\r?\n\{\{Info\//ig,
				replace: '\n{{Info/'
			}]
		}, {
			name: 'Elemento de programação de predef',
			ifhas: '{{',
			sub: [{
				name: 'Rule',
				find: /\{\{subst:\}\}/ig,
				replace: ''
			}, {
				name: '{{{xxx|yyy}}}',
				find: /\{\{\{[^\|\{\}\n]+\|([^\|\{\}\n]*)\}\}\}/ig,
				replace: '$1',
				num: 100
			}, {
				name: '{{PAGENAME',
				find: /\{\{(PAGENAME|SUBPAGENAME|FULLPAGENAME|BASEPAGENAME|SITENAME|NAMESPACE)/g,
				replace: '{{subst:$1'
			}, {
				name: '{{CURRENT',
				find: /\{\{CURRENT(DAY|MONTH|YEAR|MONTHNAME)\}\}/g,
				replace: '{{subst:CURRENT$1}}'
			}, {
				name: 'ParserFunctions',
				find: /\{\{#(if|ifeq|iferror|ifexist|switch|ifexpr|expr):/ig,
				replace: '{{subst:#$1:'
			}, {
				name: 'case',
				find: /\{\{#(lc|uc|lcfirst|ucfirst):/ig,
				replace: '{{subst:#$1:'
			}, {
				name: '[[{{CURRENTYEAR}}|atual]]',
				find: /\[\[\{\{subst:CURRENTYEAR\}\}\|atual\]\]/g,
				replace: 'atual',
				num: 10
			}]
		}, {
			name: '{{Sinopse}}',
			find: /\{\{Sinopse\}\}/ig,
			replace: 'Sinopse'
		}, {
			name: 'Ligações externas',
			sub: [{
				enabled: false,
				name: 'Itálico fora',
				find: /([^'"])("|'+)\[(https?:[^ \n]*) ([^\]\n]*)\]("|'+)([^'"])/ig,
				replace: '$1[$3 $2$4$5]$6',
				num: 10
			}]
		}, {
			name: 'Ligações internas',
			ifhas: /\[\[/i,
			sub: [{
				name: 'Data - mês',
				find: /\[\[((?:jan|fever)eiro|março|abril|maio|ju[nl]ho|agosto|(?:setem|outu|novem|dezem)bro)\]\]/ig,
				replace: '$1'
			}, {
				name: '[[w:pt:',
				find: /\[\[:?(?:w:)?pt:/ig,
				replace: '[['
			}]
		}, {
			name: 'Comentário sem fechamento',
			find: /╔([^╔╗░]*)([╔░])/g,
			replace: '╔$1╗$2'
		}, {
			name: 'Predefs',
			sub: [{
				name: 'Rule',
				find: /<br \/>\r?\n\|/ig,
				replace: '\n|',
				num: 10,
				where: 'templates'
			}]
		}, {
			name: 'Erro em { [ (',
			sub: [{
				name: 'Ligações internas',
				ifhas: '[[',
				sub: [{
					name: '|]]',
					find: /\|(▒?)\]\]/ig,
					replace: '$1]]',
					num: 10
				}, {
					name: 'Arrumando [[ ]] quebrado',
					ifnot: /(<(blockquote|code|gallery|math|timeline|pre|poem|nowiki|quote|source)|\{\{(Citação|Quim))/i,
					sub: [{
						name: '[[ ]',
						find: /([^\[])\[\[([^\[\]\{\}\r\n]+)\]([^\]])/ig,
						replace: '$1[[$2]]$3',
						num: 10
					}, {
						name: '[[[',
						find: /([^\[])\[\[\[([^\[])/ig,
						replace: '$1[[$2',
						num: 10
					}, {
						name: '[]',
						find: /\[\]/g,
						replace: ''
					}, {
						name: ']]]]',
						find: /\]\]\]\]/g,
						replace: ']]'
					}]
				}, {
					name: '[[xxx||yyy]]',
					find: /(\[\[[^\|\n\[\]]+\|) *\|([^\|\n\[\]]+\]\])/ig,
					replace: '$1$2',
					num: 10
				}]
			}, {
				name: 'Parênteses errados',
				ifnot: /(<(blockquote|code|gallery|math|timeline|pre|poem|nowiki|quote|source)|\{\{(Citação|Quim))/i,
				sub: [{
					name: '()'
				}]
			}, {
				name: 'Chaves erradas',
				ifhas: /\{\{/i,
				sub: [{
					name: '{{ }',
					find: /([^{])\{\{([^{}\r\n]+)\}([^}])/ig,
					replace: '$1{{$2}}$3'
				}]
			}]
		}]
	}, {
		name: 'Parte sup',
		ifnot: /▓(Wikipedia|Ficheiro|MediaWiki|Predefinição|Ajuda|Categoria|Portal)( Discussão)?:/i,
		sub: [{
			name: 'Desambig',
			sub: [{
				name: '{{Desambigexplicada2}}',
				find: /\{\{Desambigexplicada2\|([^\|\{\}\n]+)\|([^\{\}\n]+)\}\}/ig,
				replace: '{{Ver desambig| $2| este=$1}}'
			}, {
				name: '{{Desambigexplicada}}',
				find: /\{\{Desambigexplicada\|([^\|\{\}\n]+)\|([^\|\{\}\n]+)\}\}/ig,
				replace: '{{Ver desambig|| $2| este=$1}}'
			}, {
				name: '{{Outrosusos|xxx}}',
				find: /\{\{Outrosusos\|([^\|\{\}\n]+)\}\}/ig,
				replace: '{{Ver desambig||$1}}'
			}, {
				name: '{{Outrosusos}}',
				find: /\{\{Outrosusos\}\}/ig,
				replace: '{{Ver desambig}}'
			}, {
				name: '{{Redirect|3=xxx}}',
				find: /\{\{Redirect\|([^\|\{\}\n]+)\|([^\|\{\}\n]+)\|([^\|\{\}\n]+)\}\}/ig,
				replace: '{{Ver desambig |redir=$1|1=$2|2=$3}}'
			}, {
				name: '{{Redirect}}',
				find: /\{\{Redirect\|([^\|\{\}\n]+)\|([^\|\{\}\n]+)\}\}/ig,
				replace: '{{Ver desambig |redir=$1|1=$2|2=$1 (desambiguação)}}'
			}, {
				name: '{{Ver desambiguação2|4=xxx}}',
				find: /\{\{Ver desambiguação2\|([^\|\{\}\n]+)\|([^\|\{\}\n]+)\|([^\|\{\}\n]+)\|([^\|\{\}\n]+)\}\}/ig,
				replace: '{{Ver desambig| $2| $3| este=$1| ou=$4}}'
			}, {
				name: '{{Ver desambiguação2}}',
				find: /\{\{Ver desambiguação2\|([^\|\{\}\n]+)\|([^\{\}\n]+)\}\}/ig,
				replace: '{{Ver desambig| $2| este=$1}}'
			}, {
				name: '{{Minidesambig}}',
				find: /\{\{Minidesambig\|([^\{\}\n]+)\}\}/ig,
				replace: '{{Ver desambig |prefixo=Se procura|$1}}'
			}]
		}, {
			name: 'Predefs sup',
			sub: [{
				name: 'Desambig',
				sub: [{
					name: '{{Ver desambiguação2}}',
					find: /:+\'+(''Nota *: *''')?Este artigo é sobre ([^\.\n]+)\. Se procura ([^\,\n]+), consulte \[\[([^\]\.\n]+)\]\]\.( Para outros significados, consulte )?\[?\[?\n([^\]\.\n]+)?\]?\]?\.?\'+\r?\n/ig,
					replace: '{{Ver desambiguação2|$2|$3|$4|$6}}\n'
				}, {
					name: '{{Ver desambiguação}}',
					find: /:+\'+(''Nota *: *''')?Para outros significados( de )?([^\,\n]+)?, (ver|veja) \[\[([^\(\[\]\'\n]+) \(desambiguação\)\]\]\'+\r?\n/ig,
					replace: '{{Ver desambiguação|$3|$5 (desambiguação)}}\n'
				}, {
					name: '{{Desambigexplicada2}}',
					find: /:+\'+(''Nota *: *''')?Esta página é sobre ([^\.\n]+)\. Se procura ([^\,\n]+), consulte \[\[([^\[\]\n]+)\]\]\.?\'+\.?\r?\n/ig,
					replace: '{{Desambigexplicada2|$2|$3|$4}}\n'
				}, {
					name: '{{Desambigexplicada}}',
					find: /:+\'+(''Nota *: *''')?Esta página é sobre ([^\.\n]+)\. Se procura outros significados da mesma expressão, consulte \[\[([^\[\]\n]+)\]\]\.?\'+\.?\r?\n/ig,
					replace: '{{Desambigexplicada|$2|$3}}\n'
				}, {
					name: '{{Minidesambig}}',
					find: /:+\'+(''Nota *: *''')?Se procura ([^\,\n]+), consulte: \[\[([^\[\]\n]+)\]\]. Ainda, se procura ([^\,\n]+), consulte: \[\[([^\[\]\n]+)\]\]\.?\'+\.?\r?\n/ig,
					replace: '{{Minidesambig2|$2|$3|$4|$5}}\n'
				}, {
					name: '{{Minidesambig}}',
					find: /:+\'+(''Nota *: *''')?Se procura ([^\,\n]+), consulte \[\[([^\[\]\n]+)\]\]\.?\'+\.?\r?\n/ig,
					replace: '{{Minidesambig|$2|$3}}\n'
				}, {
					name: '{{Desambiguação-redirect}}',
					find: /:+\'+(''Nota *: *''')?Se foi (\[\[Wikipedia:Redirecionamento\|)?redirecionado(\]\])? para esta página e não é a que procura, consulte: \[\[([^\[\]\n]+)\]\]\.?\'+\.?\r?\n/ig,
					replace: '{{Desambiguação-redirect|$4}}\n'
				}, {
					name: '{{Não confundir com}}',
					find: /:+\'+(''Nota *: *''')?Não confundir com \[\[([^\[\]\n]+)\]\]\.?\'+\.?\r?\n/ig,
					replace: '{{Não confundir com|$2}}\n'
				}, {
					name: '{{Outrosusos}}',
					find: /:+\'+(?:''Nota *: *''')?Para outros usos deste termo, ve(?:ja|r) \[\[([^\[\]\n]+) \(desambiguação\)\]\]\.?\'+\.?\r?\n/ig,
					replace: '{{Outrosusos|$1}}'
				}]
			}]
		}, {
			name: 'Tag man sup',
			sub: [{
				name: '{{Sem-fontes|Este artigo',
				find: /(\{\{Sem-fontes)\|Este artigo([\|\}])/ig,
				replace: '$1$2'
			}, {
				name: '{{Sem infocaixa}}',
				find: /╦/ig,
				replace: '╦\n{{sem infocaixa}}',
				ifhas: /(\[\[Categoria:((Aldeia|Bailiado|Bairro|Beatos|Borough|Cantão|Cidade|Circunscrição|Comuna|Condado|Concelho|Departamento|Distrito|Estado|Freguesia|Município|Periferia|Posto administrativo|Povoação|Povoado|Prefeitura|Província|Território|Unidade Residencial|Vila|Voivodia)s?|Bandas|Castelos|Filmes|Jogos|Jornais|Livros|Revistas|Santos|Singles|Associaç(ão|ões))[ \|\]][^ ])/i,
				ifnot: /(\n *\| *(nome|local|país|nascimento|site)|\{\{Sem infocaixa|\| \]\]|\{\{Info\/)/i
			}, {
				name: '{{Sem infocaixa}}',
				ifhas: /\{\{sem infocaixa\}\}/i,
				ifnot: /\{\{Info/i,
				sub: [{
					name: '{{sem infocaixa|Livro}}',
					find: /\{\{Sem infocaixa\}\}/ig,
					replace: '{{sem infocaixa|Livro}}',
					ifhas: /\[\[Categoria:Livros[ \|\]][^ ]/i
				}, {
					name: '{{Sem infocaixa|Jogo}}',
					find: /\{\{Sem infocaixa\}\}/ig,
					replace: '{{sem infocaixa|Jogo}}',
					ifhas: /\[\[Categoria:Jogos[ \|\]][^ ]/i
				}, {
					name: '{{Sem infocaixa|Assentamento}}',
					find: /\{\{Sem infocaixa\}\}/ig,
					replace: '{{sem infocaixa|Assentamento}}',
					ifhas: /\[\[Categoria:Bairros (extintos|não oficiais)? ?d.[ \|\]][^ ]/i
				}, {
					name: '{{Sem infocaixa|Organização}}',
					find: /\{\{Sem infocaixa\}\}/ig,
					replace: '{{Sem infocaixa|Organização}}',
					ifhas: /\[\[Categoria:Associaç(ão|ões)[ \|\]]/i
				}, {
					name: '{{Semfichatécnica}}',
					find: /\{\{Sem infocaixa\}\}/ig,
					replace: '{{semfichatécnica}}',
					ifhas: /\[\[Categoria:Filmes[ \|\]]/i,
					ifnot: /\{\{Semfichatécnica/i
				}]
			}, {
				name: 'Ajustes em {{Sem-fontes}}',
				find: /(\{\{Sem\-fontes[^{}\n]*)\|este artigo/ig,
				replace: '$1'
			}, {
				name: 'Add {{Wikificação}}',
				ifnot: /\{\{Wikificação[\|}]/i,
				sub: [{
					name: '+{{Wikificação}}',
					find: /╦/g,
					replace: '╦\n{{Wikificação|data={{subst:CURRENTMONTHNAME}} de {{subst:CURRENTYEAR}}}}\n',
					ifnot: /[^\n]\[\[/i
				}]
			}, {
				name: '{{não-enciclopédico}}',
				find: /\{\{não\-enciclopédico\}\}\r?\n/ig,
				replace: ''
			}, {
				name: 'Rule',
				find: /Este artigo ou se\(c\)ção/g,
				replace: ''
			}]
		}, {
			name: 'Introdução',
			sub: [{
				name: 'Título na introdução',
				find: /(▓([^\(╦\n]*)(?: \([^╦\n]*)?╦\r?\n[^╚]*╚)(é|são|foi|foram|era|eram) um/ig,
				replace: '$1\'\'\'$2\'\'\' {{subst:lcfirst:$3}} um'
			}, {
				name: 'retirando negrito da infobox',
				find: /(\{\{Info[^╣]*\| *(?:título|nome|nome_do_shopping) *= *)'+([^'\r\n]+)'+\r?\n/ig,
				replace: '$1$2\n',
				ifhas: '╣',
				ifnot: '{{Info/Taxonomia' // FIXME: /\{\{Info/Taxonomia/i ?
			}, {
				name: '- nascido em',
				find: /(╚[^\(╝\n]*\()nascid[ao] (?:em|n[ao]) /ig,
				replace: '$1'
			}, {
				name: '- falecido em',
				find: /(╚[^\(╝\n]*\([^\(\)\n]+ )falec(?:id[ao]|eu) (?:em|n[ao]) /ig,
				replace: '$1'
			}, {
				name: 'parcial',
				find: /(╚[^╝\n]+(?:foi|é) uma? )(?:célebre|famos[ao]|grande) /ig,
				replace: '$1'
			}, {
				name: 'Rule',
				find: /(╚[^\(╝\n]*''' \(\[\[[^\[\]\n]*\]\]) em /ig,
				replace: '$1, '
			}]
		}, {
			name: 'Infobox',
			ifhas: /\{\{Info/i,
			sub: [{
				name: '| dos campo',
				sub: [{
					name: '| para início da linha seguinte',
					find: /(\{\{Info[^╣]*)\|\r?\n *([a-z])/ig,
					replace: '$1\n |$2',
					num: 100,
					ifhas: '╣'
				}, {
					name: '| para início da linha seguinte',
					find: /(\{\{Info[^╣]*)\|\r?\n *\|/ig,
					replace: '$1\n |',
					num: 100,
					ifhas: '╣'
				}, {
					name: 'espaço antes do |',
					find: /(\{\{Info[^╣]*)\r?\n\|/g,
					replace: '$1\n |',
					num: 100
				}, {
					name: '| final',
					find: / *(?:\r?\n)*\| *(\r?\n)* *╣\}\}/ig,
					replace: '$1╣}}'
				}, {
					name: '\n no primeiro campo',
					find: /(\{\{Info\/[^\n]+)(\|[^\|\n\=]*\=)/ig,
					replace: '$1\n $2'
				}, {
					name: '| no final do primeiro campo sem \n',
					find: /(\{\{Info\/[^\n\|\=]+\|[^\n\=]+[^\| ])\r?\n/ig,
					replace: '$1 |\n'
				}]
			}, {
				name: 'Quebra de linha em Infobox',
				sub: [{
					name: 'Quebra de linha após infobox (-)',
					find: /╣\}\}(?:\r?\n){2,}([^\r\n])/g,
					replace: '╣}}\n$1'
				}, {
					name: 'Quebra de linha após infobox (+)',
					find: /(╣\}\})([^\r\n])/ig,
					replace: '$1\n$2'
				}, {
					name: '}}{{Info/',
					find: /╣\}\} *\{\{Info\//g,
					replace: '}}\n{{Info/'
				}, {
					name: 'Antes de {{Info',
					find: /(?:\r?\n){2,}\{\{Info\//g,
					replace: '\n{{Info/'
				}, {
					name: 'antes do final da info',
					find: /([^\r\n])(?:\r?\n){2,}╣\}\}/ig,
					replace: '$1\n╣}}'
				}, {
					name: '{{Infobox animangá/Rodapé}}',
					find: /\{\{Infobox animangá\/Rodapé\r?\n╣\}\}/ig,
					replace: '{{Infobox animangá/Rodapé╣}}'
				}]
			}, {
				name: 'Código em todo campo',
				sub: [{
					name: '<small> em infobox',
					find: /(\{\{Info[^╣]*\| *[^=\r\n{}]* *= *)<small>([^<>\n]*)<\/small>\r?\n/ig,
					replace: '$1$2\n',
					num: 10,
					ifhas: '╣'
				}, {
					name: 'negrito em infobox',
					find: /(\{\{Info[^╣]*\| *[^=\r\n{}]* *= *)\'\'\'([^\'\n]*)\'\'\'\r?\n/ig,
					replace: '$1$2\n',
					num: 10
				}]
			}, {
				name: 'padronizando campos',
				sub: [{
					name: 'minúscula',
					ifhas: /╣/i,
					sub: [{
						name: 'A',
						find: /(\{\{Info\/(?:Álbum)[^╣]*\n *\| *)A/g,
						replace: '$1a',
						num: 100
					}, {
						name: 'B',
						find: /(\{\{Info\/(?:Álbum)[^╣]*\n *\| *)B/g,
						replace: '$1b',
						num: 100
					}, {
						name: 'C',
						find: /(\{\{Info\/(?:Álbum)[^╣]*\n *\| *)C/g,
						replace: '$1c',
						num: 100
					}, {
						name: 'D',
						find: /(\{\{Info\/(?:Álbum)[^╣]*\n *\| *)D/g,
						replace: '$1d',
						num: 100
					}, {
						name: 'E',
						find: /(\{\{Info\/(?:Álbum)[^╣]*\n *\| *)E/g,
						replace: '$1e',
						num: 100
					}, {
						name: 'F',
						find: /(\{\{Info\/(?:Álbum)[^╣]*\n *\| *)F/g,
						replace: '$1f',
						num: 100
					}, {
						name: 'G',
						find: /(\{\{Info\/(?:Álbum)[^╣]*\n *\| *)G/g,
						replace: '$1g',
						num: 100
					}, {
						name: 'I',
						find: /(\{\{Info\/(?:Álbum)[^╣]*\n *\| *)I/g,
						replace: '$1i',
						num: 100
					}, {
						name: 'L',
						find: /(\{\{Info\/(?:Álbum)[^╣]*\n *\| *)L/g,
						replace: '$1l',
						num: 100
					}, {
						name: 'M',
						find: /(\{\{Info\/(?:Álbum)[^╣]*\n *\| *)M/g,
						replace: '$1m',
						num: 100
					}, {
						name: 'N',
						find: /(\{\{Info\/(?:Álbum)[^╣]*\n *\| *)N/g,
						replace: '$1n',
						num: 100
					}, {
						name: 'P',
						find: /(\{\{Info\/(?:Álbum)[^╣]*\n *\| *)P/g,
						replace: '$1p',
						num: 100
					}, {
						name: 'S',
						find: /(\{\{Info\/(?:Álbum)[^╣]*\n *\| *)S/g,
						replace: '$1s',
						num: 100
					}, {
						name: 'T',
						find: /(\{\{Info\/(?:Álbum)[^╣]*\n *\| *)T/g,
						replace: '$1t',
						num: 100
					}, {
						name: 'Ú',
						find: /(\{\{Info\/(?:Álbum)[^╣]*\n *\| *)Ú/g,
						replace: '$1ú',
						num: 100
					}, {
						name: 'V',
						find: /(\{\{Info\/(?:Álbum)[^╣]*\n *\| *)V/g,
						replace: '$1v',
						num: 100
					}, {
						name: 'específicos',
						sub: [{
							name: 'vídeo Clipes',
							find: /(\{\{Info\/(?:Álbum)[^╣]*\n *\| *)vídeo Clipes/g,
							replace: '$1vídeo clipes'
						}]
					}]
				}, {
					name: 'padronza |imagem_tamanho=',
					find: /(\{\{Info\/[^╣]*\| *)(?:(im(?:agem|g))[\-_ ](?:size|tam(?:anho)?)|tamanho[\-_ ](?:im(?:agem|g))|res_img) *= */ig,
					replace: '$1imagem_tamanho   = '
				}, {
					name: 'padroniza |imagem_legenda=',
					find: /(\{\{Info\/[^╣]*\| *)((?:nome|legenda)[\-_]img|img[ \-_]des|descr) *= */ig,
					replace: '$1imagem_legenda   = ',
					ifhas: '╣'
				}, {
					name: 'Rule',
					find: /(\{\{Info\/[^╣]*\| *)image( *= *)/ig,
					replace: '$1imagem$2'
				}]
			}, {
				name: 'ajustando campos',
				sub: [{
					name: '{{dni | si}}',
					find: /(\{\{Info\/[^╣]*\| *nascimento_data *= *)(?:\[\[([1-3]?[0-9]) de ([^\[\]\n]+)\]\] de )?\[\[([0-9]{3,4})\]\]\r?\n/ig,
					replace: '$1{{dni|$2|{{subst:Mês2número|$3}}|$4|si}}\n',
					ifhas: '{{falecimento|' // FIXME: /\{\{falecimento|/i ?
				}, {
					name: '{{dni}}',
					find: /(\{\{Info\/[^╣]*\| *nascimento_data *= *)(?:\[\[([1-3]?[0-9]) de ([^\[\]\n]+)\]\] de )?\[\[([0-9]{3,4})\]\]\r?\n/ig,
					replace: '$1{{dni|$2|{{subst:Mês2número|$3}}|$4}}\n'
				}, {
					name: 'url em campo imagem de predef',
					find: /((?:\r?\n)* *\| *)(imagem?|img|foto)( *\= *)\[?https?:\/\/.*\r?\n/ig,
					replace: '$1$2$3\n',
					num: 10,
					where: 'templates'
				}, {
					name: '{{dni}} sem idade',
					find: /(\{\{dni[^{}]+)\}\}/ig,
					replace: '$1|sem idade}}',
					ifhas: /\{\{(falecimento|morte)/i,
					ifnot: /\{\{dni[^\{\}]*(sem idade|si)\}\}/i
				}, {
					name: '??? em infobox',
					find: /(\n *\|[^\=\n]+=.*)(?:\?+|Desconhecid[aos]+)([\r\n][^╣]*╣)/ig,
					replace: '$1$2',
					num: 100
				}, {
					name: 'imagem = xxx|thumb',
					find: /(\| *imagem *= *[^\|\n]+)\|thumb([\|\r\n])/ig,
					replace: '$1$2'
				}]
			}, {
				name: 'espaço dos campos',
				ifhas: '╣',
				sub: [{
					name: 'espaço 6',
					find: /(\{\{Info\/[^╣]*\n *\| *[^ ]{1,1}) {0,5}=/ig,
					replace: '$1      =',
					num: 100,
					ifhas: '╣'
				}, {
					name: 'espaço 5',
					find: /(\{\{Info\/[^╣]*\n *\| *[^ ]{2,2}) {0,4}=/ig,
					replace: '$1     =',
					num: 100
				}, {
					name: 'espaço 4',
					find: /(\{\{Info\/[^╣]*\n *\| *[^ ]{3,3}) {0,3}=/ig,
					replace: '$1    =',
					num: 100
				}, {
					name: 'espaço 3',
					find: /(\{\{Info\/[^╣]*\n *\| *[^ ]{4,4}) {0,2}=/ig,
					replace: '$1   =',
					num: 100
				}, {
					name: 'espaço 2',
					find: /(\{\{Info\/[^╣]*\n *\| *[^ ]{5,5}) {0,1}=/ig,
					replace: '$1  =',
					num: 100
				}, {
					name: 'espaço 1',
					find: /(\{\{Info\/[^╣]*\n *\| *[^ ]{6,6})=/ig,
					replace: '$1 =',
					num: 100
				}, {
					name: 'espaço após =',
					find: /(\{\{Info\/[^╣]*\n *\| *[^=╣]+)=([^ \r\n])/ig,
					replace: '$1= $2',
					num: 100
				}]
			}]
		}]
	}, {
		name: 'Parte cen',
		sub: [{
			name: 'Ligações internas',
			sub: [{
				name: 'Redirects',
				ifhas: '[[',
				sub: [{
					name: 'Estados Unidos da América',
					find: /\[\[Estados Unidos da América\|/g,
					replace: '[[Estados Unidos|'
				}, {
					name: 'Rule',
					find: /\[\[Estados Unidos\|Estados Unidos\]\]/g,
					replace: '[[Estados Unidos]]'
				}]
			}, {
				name: 'url pt.wikipedia -> link interno',
				find: /\[(?:https?:)\/\/pt\.wikipedia\.org\/wiki\/([^ ]+) ([^\[\]\n]+)\]/ig,
				replace: '[[$1|$2]]'
			}]
		}, {
			name: 'Msg oculta',
			ifhas: '╔',
			sub: [{
				name: 'iw / cat',
				find: /<!\-\-+ *(Interwiki|Categorias)? *\-+\->/ig,
				replace: '',
				num: 100
			}, {
				name: '<!--Escreva abaixo da linha!-->',
				find: /╔\-* *Escreva abaixo da linha! *\-*╗/ig,
				replace: ''
			}, {
				name: 'MANUTENÇÃO',
				find: /╔\-* *MANUTENÇÃO.*\-*╗/ig,
				replace: ''
			}, {
				name: 'Img invisível',
				find: /╔\-* *╠[^▒\n]+▒\]\] *.{0,3} *\-*╗/ig,
				replace: ''
			}, {
				name: 'Bot generated title',
				find: /╔\-* Bot generated title *\-*╗/ig,
				replace: '',
				num: 10
			}, {
				name: 'Título gerado por robô',
				find: /╔\-* Título gerado por robô *\-*╗/g,
				replace: ''
			}, {
				name: '%%title%%',
				find: /╔\-* *%%title%% *\-*╗/ig,
				replace: '',
				num: 100
			}, {
				name: 'PASSO 2',
				find: /╔ PASSO 2: Todos os artigos devem citar pelo menos uma fonte PUBLICADA, +╗\n╔ +ESPECÍFICA, escrita por TERCEIROS para a informação, tais como um +╗\n╔ +livro ou página de uma fonte reputada\. Por favor forneça um URL ou +╗\n╔ +ligação se quiser usar uma fonte da internet\. NÓS PRECISAMOS DE +╗\n╔ +SER CAPAZES DE VERIFICAR A SUA FONTE, por isso fontes como "Google" ╗\n╔ +"conhecimento pessoal" serão rejeitadas\. +╗\n╔ +SE NÃO INCLUIR PELO MENOS UMA FONTE VÁLIDA, +╗\n╔ +O SEU ARTIGO SERÁ REJEITADO. +╗\n╔ +╗\n╔ +Por favor, adicione a\(s\) sua\(s\) fonte\(s\) abaixo desta linha\. +╗\n/g,
				replace: ''
			}]
		},

		{
			name: 'Predefs cen',
			sub: [{
				name: '{{Anexo}}',
				sub: [{
					name: '{{Anexo|[[Lista d',
					find: /\{\{Anexo\|\[\[Lista d/g,
					replace: '{{Anexo|[[Anexo:Lista d'
				}, {
					name: 'Passando para {{Anexo}}',
					find: /\r?\n:'*ver: *\[\[Anexo:([^\]\n]+)\]\] para maior?e?s detalhes?\.?'*\r?\n/ig,
					replace: '\n{{Anexo|[[Anexo:$1]]}}\n'
				}]
			}, {
				name: '{{Trivia}}',
				find: /(\n║\={2,} (?:Trivia|Curiosidades?) \={2,})(\r?\n)+([\*\#])/ig,
				replace: '$1\n{{Trivia|data={{subst:CURRENTMONTHNAME}} de {{subst:CURRENTYEAR}}}}\n$3'
			}, {
				name: '<br clear="all">',
				find: /<br clear="all">/ig,
				replace: '{{-}}'
			}, {
				name: '{{Artigo principal}}',
				find: /([^'])'*(?:Ver )?(?:no )?artigo principal:? *\[\[([^\[\]\r\n]+)\]\]'*([^'])/ig,
				replace: '$1{{Artigo principal|[[$2]]}}$3'
			}]
		}, {
			name: 'Domínio Ficheiro',
			ifhas: /╠/i,
			sub: [{
				name: 'Flag of Germany 1933.svg',
				find: /Flag of Germany 1933\.svg/g,
				replace: 'Flag of Nazi Germany (1933-1945).svg',
				num: 10
			}, {
				name: '[[Ficheiro:',
				find: /╠[^:\n]*(?:\r?\n|[<>\[\]\{\}\|\r\n][^\[\]\n]*\]+([^\]]))/ig,
				replace: '$1'
			}, {
				name: ':[[Ficheiro:',
				find: /\n:╠/ig,
				replace: '\n╠',
				num: 10
			}, {
				name: 'url em Ficheiro',
				find: /╠[^:\n]*:https?:\/\/[^▒\n]*▒\]\]/ig,
				replace: ''
			}, {
				name: '[[Ficheiro:[[Ficheiro:',
				find: /╠[^:\n]*: *╠/g,
				replace: '╠'
			}, {
				name: '<br /> em ficheiro',
				find: /(╠[^▒\n]*)<br \/>/ig,
				replace: '$1',
				num: 100
			}, {
				name: 'Flag of',
				ifhas: /╠[^:\n]*:Flag of [^\|\]\n]+ *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/,
				sub: [{
					name: 'A',
					ifhas: /╠[^:\n]*:Flag of A[^\|\]\n]+ *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/,
					sub: [{
						name: '{{ABWb}}',
						find: /╠[^:\n]*:Flag of Aruba\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{ABWb}}',
						num: 100
					}, {
						name: '{{AFGb}}',
						find: /╠[^:\n]*:Flag of Afghanistan\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{AFGb}}',
						num: 100
					}, {
						name: '{{AGOb}}',
						find: /╠[^:\n]*:Flag of Angola\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{AGOb}}',
						num: 100
					}, {
						name: '{{AHEb}}',
						find: /╠[^:\n]*:Flag of Austria-Hungary_1869-1918\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{AHEb}}',
						num: 100
					}, {
						name: '{{AIAb}}',
						find: /╠[^:\n]*:Flag of Anguilla\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{AIAb}}',
						num: 100
					}, {
						name: '{{ALAb}}',
						find: /╠[^:\n]*:Flag of Aaland\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{ALAb}}',
						num: 100
					}, {
						name: '{{ALBb}}',
						find: /╠[^:\n]*:Flag of Albania\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{ALBb}}',
						num: 100
					}, {
						name: '{{ANDb}}',
						find: /╠[^:\n]*:Flag of Andorra.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{ANDb}}',
						num: 100
					}, {
						name: '{{ANZb}}',
						find: /╠[^:\n]*:Flag of Australasian team for Olympic games.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{ANZb}}',
						num: 100
					}, {
						name: '{{ARGb}}',
						find: /╠[^:\n]*:Flag of Argentina\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{ARGb}}',
						num: 100
					}, {
						name: '{{ARMb}}',
						find: /╠[^:\n]*:Flag of Armenia.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{ARMb}}',
						num: 100
					}, {
						name: '{{ASMb}}',
						find: /╠[^:\n]*:Flag of American Samoa.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{ASMb}}',
						num: 100
					}, {
						name: '{{ATAb}}',
						find: /╠[^:\n]*:Flag of Antarctica.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{ATAb}}',
						num: 100
					}, {
						name: '{{ATGb}}',
						find: /╠[^:\n]*:Flag of Antigua and Barbuda.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{ATGb}}',
						num: 100
					}, {
						name: '{{AUSb}}',
						find: /╠[^:\n]*:Flag of Australia\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{AUSb}}',
						num: 100
					}, {
						name: '{{AUTb}}',
						find: /╠[^:\n]*:Flag of Austria\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{AUTb}}',
						num: 100
					}, {
						name: '{{AZEb}}',
						find: /╠[^:\n]*:Flag of Azerbaijan\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{AZEb}}',
						num: 100
					}, {
						name: '{{AZOb}}',
						find: /╠[^:\n]*:Flag of Azores.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{AZOb}}',
						num: 100
					}, {
						name: '{{DZAb}}',
						find: /╠[^:\n]*:Flag of Algeria\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{DZAb}}',
						num: 100
					}]
				}, {
					name: 'B',
					ifhas: /╠[^:\n]*:Flag of B[^\|\]\n]+ *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/,
					sub: [{
						name: '{{BDIb}}',
						find: /╠[^:\n]*:Flag of Burundi\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{BDIb}}',
						num: 100
					}, {
						name: '{{BELb}}',
						find: /╠[^:\n]*:Flag of Belgium( \(civil\))?\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{BELb}}',
						num: 100
					}, {
						name: '{{BENb}}',
						find: /╠[^:\n]*:Flag of Benin\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{BENb}}',
						num: 100
					}, {
						name: '{{BFAb}}',
						find: /╠[^:\n]*:Flag of Burkina Faso\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{BFAb}}',
						num: 100
					}, {
						name: '{{BGDb}}',
						find: /╠[^:\n]*:Flag of Bangladesh\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{BGDb}}',
						num: 100
					}, {
						name: '{{BGRb}}',
						find: /╠[^:\n]*:Flag of Bulgaria\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{BGRb}}',
						num: 100
					}, {
						name: '{{BHRb}}',
						find: /╠[^:\n]*:Flag of Bahrain\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{BHRb}}',
						num: 100
					}, {
						name: '{{BHSb}}',
						find: /╠[^:\n]*:Flag of Bahamas\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{BHSb}}',
						num: 100
					}, {
						name: '{{BIHb}}',
						find: /╠[^:\n]*:Flag of Bosnia and Herzegovina\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{BIHb}}',
						num: 100
					}, {
						name: '{{BLRb}}',
						find: /╠[^:\n]*:Flag of Belarus\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{BLRb}}',
						num: 100
					}, {
						name: '{{BLZb}}',
						find: /╠[^:\n]*:Flag of Belize\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{BLZb}}',
						num: 100
					}, {
						name: '{{BMUb}}',
						find: /╠[^:\n]*:Flag of Bermuda\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{BMUb}}',
						num: 100
					}, {
						name: '{{BOHb}}',
						find: /╠[^:\n]*:Flag of Bohemia\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{BOHb}}',
						num: 100
					}, {
						name: '{{BOLb}}',
						find: /╠[^:\n]*:Flag of Bolivia\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{BOLb}}',
						num: 100
					}, {
						name: '{{BRAb}}',
						find: /╠[^:\n]*:Flag of Brazil\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{BRAb}}',
						num: 100
					}, {
						name: '{{BRBb}}',
						find: /╠[^:\n]*:Flag of Barbados\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{BRBb}}',
						num: 100
					}, {
						name: '{{BRNb}}',
						find: /╠[^:\n]*:Flag of Brunei\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{BRNb}}',
						num: 100
					}, {
						name: '{{BTNb}}',
						find: /╠[^:\n]*:Flag of Bhutan\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{BTNb}}',
						num: 100
					}, {
						name: '{{BWAb}}',
						find: /╠[^:\n]*:Flag of Botswana\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{BWAb}}',
						num: 100
					}]
				}, {
					name: 'C',
					ifhas: /╠[^:\n]*:Flag of C[^\|\]\n]+ *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/,
					sub: [{
						name: '{{Catalunhab}}',
						find: /╠[^:\n]*:Flag of Catalonia\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{Catalunhab}}',
						num: 100
					}, {
						name: '{{CANb}}',
						find: /╠[^:\n]*:Flag of Canada\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{CANb}}',
						num: 100
					}, {
						name: '{{CATb}}',
						find: /╠[^:\n]*:Flag of Catalonia\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{CANb}}',
						num: 100
					}, {
						name: '{{CECb}}',
						find: /╠[^:\n]*:Flag of Czechoslovakia\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{CECb}}',
						num: 100
					}, {
						name: '{{CEYb}}',
						find: /╠[^:\n]*:Flag of Ceylon\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{CEYb}}',
						num: 100
					}, {
						name: '{{CHLb}}',
						find: /╠[^:\n]*:Flag of Chile\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{CHLb}}',
						num: 100
					}, {
						name: '{{CIVb}}',
						find: /╠[^:\n]*:Flag of Cote d'Ivoire\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{CIVb}}',
						num: 100
					}, {
						name: '{{CMRb}}',
						find: /╠[^:\n]*:Flag of Cameroon\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{CMRb}}',
						num: 100
					}, {
						name: '{{COLb}}',
						find: /╠[^:\n]*:Flag of Colombia\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{COLb}}',
						num: 100
					}, {
						name: '{{CPVb}}',
						find: /╠[^:\n]*:Flag of Cape Verde\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{CPVb}}',
						num: 100
					}, {
						name: '{{CRIb}}',
						find: /╠[^:\n]*:Flag of Costa Rica\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{CRIb}}',
						num: 100
					}, {
						name: '{{CUBb}}',
						find: /╠[^:\n]*:Flag of Cuba\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{CUBb}}',
						num: 100
					}, {
						name: '{{CURb}}',
						find: /╠[^:\n]*:Flag of Curaçao\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{CURb}}',
						num: 100
					}, {
						name: '{{CXRb}}',
						find: /╠[^:\n]*:Flag of Christmas Island\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{CXRb}}',
						num: 100
					}, {
						name: '{{CYPb}}',
						find: /╠[^:\n]*:Flag of Cyprus\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{CYPb}}',
						num: 100
					}, {
						name: '{{HRVb}}',
						find: /╠[^:\n]*:Flag of Croatia\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{HRVb}}'
					}, {
						name: '{{KHMb}}',
						find: /╠[^:\n]*:Flag of Cambodia\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{KHMb}}'
					}, {
						name: '{{TCDb}}',
						find: /╠[^:\n]*:Flag of Chad\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{TCDb}}',
						num: 100
					}, {
						name: '{{TCHb}}',
						find: /╠[^:\n]*:Flag of Czechoslovakia\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{TCHb}}',
						num: 100
					}, {
						name: '{{TPEb}}',
						find: /╠[^:\n]*:Flag of Chinese Taipei for Olympic games\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{TPEb}}',
						num: 100
					}]
				}, {
					name: 'D',
					ifhas: /╠[^:\n]*:Flag of D[^\|\]\n]+ *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/,
					sub: [{
						name: '{{DJIb}}',
						find: /╠[^:\n]*:Flag of Djibouti\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{DJIb}}',
						num: 100
					}, {
						name: '{{DMAb}}',
						find: /╠[^:\n]*:Flag of Dominica\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{DMAb}}',
						num: 100
					}, {
						name: '{{DNKb}}',
						find: /╠[^:\n]*:Flag of Denmark\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{DNKb}}',
						num: 100
					}]
				}, {
					name: 'E',
					ifhas: /╠[^:\n]*:Flag of E[^\|\]\n]+ *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/,
					sub: [{
						name: '{{TLSb}}',
						find: /╠[^:\n]*:Flag of East Timor\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{TLSb}}',
						num: 100
					}, {
						name: '{{SLVb}}',
						find: /╠[^:\n]*:Flag of El Salvador\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{SLVb}}',
						num: 100
					}, {
						name: '{{GNQb}}',
						find: /╠[^:\n]*:Flag of Equatorial Guinea\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{GNQb}}',
						num: 100
					}, {
						name: '{{DDRb}}',
						find: /╠[^:\n]*:Flag of East Germany\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{DDRb}}',
						num: 100
					}, {
						name: '{{EURb}}',
						find: /╠[^:\n]*:Flag of Europe\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{EURb}}',
						num: 100
					}, {
						name: '{{ECUb}}',
						find: /╠[^:\n]*:Flag of Ecuador\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{ECUb}}',
						num: 100
					}, {
						name: '{{EGYb}}',
						find: /╠[^:\n]*:Flag of Egypt\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{EGYb}}',
						num: 100
					}, {
						name: '{{ENGb}}',
						find: /╠[^:\n]*:Flag of England\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{ENGb}}',
						num: 100
					}, {
						name: '{{ERIb}}',
						find: /╠[^:\n]*:Flag of Eritrea\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{ERIb}}',
						num: 100
					}, {
						name: '{{ESTb}}',
						find: /╠[^:\n]*:Flag of Estonia\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{ESTb}}',
						num: 100
					}, {
						name: '{{ETHb}}',
						find: /╠[^:\n]*:Flag of Ethiopia\.(?:svg|png) *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{ETHb}}',
						num: 100
					}, {
						name: '{{ESHb}}',
						find: /╠[^:\n]*:Flag of Western Sahara\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{ESHb}}',
						num: 100
					}]
				}, {
					name: 'F',
					ifhas: /╠[^:\n]*:Flag of F[^\|\]\n]+ *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/,
					sub: [{
						name: '{{PYFb}}',
						find: /╠[^:\n]*:Flag of French Polynesia\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{PYFb}}',
						num: 100
					}, {
						name: '{{GUFb}}',
						find: /╠[^:\n]*:Flag of French Guiana\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{GUFb}}',
						num: 100
					}, {
						name: '{{FINb}}',
						find: /╠[^:\n]*:Flag of Finland\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{FINb}}',
						num: 100
					}, {
						name: '{{FJIb}}',
						find: /╠[^:\n]*:Flag of Fiji\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{FJIb}}',
						num: 100
					}, {
						name: '{{NCLb}}',
						find: /╠[^:\n]*:Flag of France\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*Nova Caledônia[^▒\n]*▒\]\]/ig,
						replace: '{{NCLb}}',
						num: 100
					}, {
						name: '{{FRAb}}',
						find: /╠[^:\n]*:Flag of France\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{FRAb}}',
						num: 100
					}, {
						name: '{{FRAb|antiga}}',
						find: /╠[^:\n]*:Flag of France (XII-XIII)\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{FRAb|antiga}}',
						num: 100
					}, {
						name: '{{FRAb|moderna}}',
						find: /╠[^:\n]*:Flag of France (XIV-XVI)\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{FRAb|moderna}}',
						num: 100
					}, {
						name: '{{FRAb|livre}}',
						find: /╠[^:\n]*:Flag of Free France 1940-1944\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{FRAb|livre}}',
						num: 100
					}, {
						name: '{{FSMb}}',
						find: /╠[^:\n]*:Flag of Federated States of Micronesia\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{FSMb}}',
						num: 100
					}]
				}, {
					name: 'G',
					ifhas: /╠[^:\n]*:Flag of G[^\|\]\n]+ *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/,
					sub: [{
						name: '{{GABb}}',
						find: /╠[^:\n]*:Flag of Gabon\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{GABb}}',
						num: 100
					}, {
						name: '{{GALb}}',
						find: /╠[^:\n]*:Flag of Galicia\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{GALb}}',
						num: 100
					}, {
						name: '{{GHAb}}',
						find: /╠[^:\n]*:Flag of Ghana\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{GHAb}}',
						num: 100
					}, {
						name: '{{GEOb}}',
						find: /╠[^:\n]*:Flag of Georgia\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{GEOb}}',
						num: 100
					}, {
						name: '{{GEOb|1990}}',
						find: /╠[^:\n]*:Flag of Georgia \(1990\-2004\)\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{GEOb|1990}}',
						num: 100
					}, {
						name: '{{GIBb}}',
						find: /╠[^:\n]*:Flag of Gibraltar(?: \(bordered\))?\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{GIBb}}',
						num: 100
					}, {
						name: '{{DEUb}}',
						find: /╠[^:\n]*:Flag of Germany\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{DEUb}}',
						num: 100
					}, {
						name: '{{GLPb}}',
						find: /╠[^:\n]*:Flag of Guadeloupe \(local\)\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{GLPb}}',
						num: 100
					}, {
						name: '{{GGYb}}',
						find: /╠[^:\n]*:Flag of Guernsey\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{GGYb}}',
						num: 100
					}, {
						name: '{{GINb}}',
						find: /╠[^:\n]*:Flag of Guinea\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{GINb}}',
						num: 100
					}, {
						name: '{{GNBb}}',
						find: /╠[^:\n]*:Flag of Guinea-Bissau\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{GNBb}}',
						num: 100
					}, {
						name: '{{GRCb}}',
						find: /╠[^:\n]*:Flag of Greece\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{GRCb}}',
						num: 100
					}, {
						name: '{{GRCb|1828-1978}}',
						find: /╠[^:\n]*:Flag of Greece (1828-1978)\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{GRCb|1828-1978}}',
						num: 100
					}, {
						name: '{{GRCb|old}}',
						find: /╠[^:\n]*:Flag of Greece (1828-1978)\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{GRCb|old}}',
						num: 100
					}, {
						name: '{{GRCb|1970}}',
						find: /╠[^:\n]*:Flag of Greece (1970-1975)\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{GRCb|1970}}',
						num: 100
					}, {
						name: '{{GRDb}}',
						find: /╠[^:\n]*:Flag of Grenada\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{GRDb}}',
						num: 100
					}, {
						name: '{{GRLb}}',
						find: /╠[^:\n]*:Flag of Greenland\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{GRLb}}',
						num: 100
					}, {
						name: '{{GTMb}}',
						find: /╠[^:\n]*:Flag of Guatemala\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{GTMb}}',
						num: 100
					}, {
						name: '{{GUMb}}',
						find: /╠[^:\n]*:Flag of Guam\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{GUMb}}',
						num: 100
					}, {
						name: '{{GUYb}}',
						find: /╠[^:\n]*:Flag of Guyana\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{GUYb}}',
						num: 100
					}]
				}, {
					name: 'H',
					ifhas: /╠[^:\n]*:Flag of H[^\|\]\n]+ *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/,
					sub: [{
						name: '{{HKGb}}',
						find: /╠[^:\n]*:Flag of Hong Kong\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{HKGb}}'
					}, {
						name: '{{HNDb}}',
						find: /╠[^:\n]*:Flag of Honduras\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{HNDb}}'
					}, {
						name: '{{HTIb}}',
						find: /╠[^:\n]*:Flag of Haiti\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{HTIb}}'
					}, {
						name: '{{HUNb}}',
						find: /╠[^:\n]*:Flag of Hungary\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{HUNb}}'
					}, {
						name: '{{HAWb}}',
						find: /╠[^:\n]*:Flag of Hawaii\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{HAWb}}'
					}]
				}, {
					name: 'I',
					ifhas: /╠[^:\n]*:Flag of I[^\|\]\n]+ *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/,
					sub: [{
						name: '{{IDNb}}',
						find: /╠[^:\n]*:Flag of Indonesia\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{IDNb}}'
					}, {
						name: '{{INDb}}',
						find: /╠[^:\n]*:Flag of India\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{INDb}}'
					}, {
						name: '{{IRLb}}',
						find: /╠[^:\n]*:Flag of Ireland\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{IRLb}}',
						num: 100
					}, {
						name: '{{IRNb}}',
						find: /╠[^:\n]*:Flag of Iran\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{IRNb}}'
					}, {
						name: '{{IRQb}}',
						find: /╠[^:\n]*:Flag of Iraq\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{IRQb}}'
					}, {
						name: '{{ISLb}}',
						find: /╠[^:\n]*:Flag of Iceland\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{ISLb}}'
					}, {
						name: '{{ISRb}}',
						find: /╠[^:\n]*:Flag of Israel\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{ISRb}}'
					}, {
						name: '{{ITAb}}',
						find: /╠[^:\n]*:Flag of Italy\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{ITAb}}',
						num: 100
					}, {
						name: '{{Italy (1861-1946)b}}',
						find: /╠[^:\n]*:Flag of Italy (1861-1946)\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{Italy (1861-1946)b}}'
					}]
				}, {
					name: 'J',
					ifhas: /╠[^:\n]*:Flag of J[^\|\]\n]+ *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/,
					sub: [{
						name: '{{JAMb}}',
						find: /╠[^:\n]*:Flag of Jamaica\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{JAMb}}'
					}, {
						name: '{{JEYb}}',
						find: /╠[^:\n]*:Flag of Jersey\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{JEYb}}'
					}, {
						name: '{{JORb}}',
						find: /╠[^:\n]*:Flag of Jordan\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{JORb}}'
					}, {
						name: '{{JPNb}}',
						find: /╠[^:\n]*:Flag of Japan( \(bordered\))?\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{JPNb}}',
						num: 100
					}]
				}, {
					name: 'K',
					ifhas: /╠[^:\n]*:Flag of K[^\|\]\n]+ *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/,
					sub: [{
						name: '{{KAZb}}',
						find: /╠[^:\n]*:Flag of Kazakhstan\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{KAZb}}'
					}, {
						name: '{{KENb}}',
						find: /╠[^:\n]*:Flag of Kenya\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{KENb}}'
					}, {
						name: '{{KGZb}}',
						find: /╠[^:\n]*:Flag of Kyrgyzstan\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{KGZb}}'
					}, {
						name: '{{KIRb}}',
						find: /╠[^:\n]*:Flag of Kiribati\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{KIRb}}'
					}, {
						name: '{{KOSb}}',
						find: /╠[^:\n]*:Flag of Kosovo\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{KOSb}}'
					}, {
						name: '{{KWTb}}',
						find: /╠[^:\n]*:Flag of Kuwait\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{KWTb}}'
					}]
				}, {
					name: 'L',
					ifhas: /╠[^:\n]*:Flag of L[^\|\]\n]+ *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/,
					sub: [{
						name: '{{LAOb}}',
						find: /╠[^:\n]*:Flag of Laos\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{LAOb}}'
					}, {
						name: '{{LBNb}}',
						find: /╠[^:\n]*:Flag of Lebanon\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{LBNb}}'
					}, {
						name: '{{LBRb}}',
						find: /╠[^:\n]*:Flag of Liberia\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{LBRb}}'
					}, {
						name: '{{LBYb}}',
						find: /╠[^:\n]*:Flag of Libya\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{LBYb}}'
					}, {
						name: '{{LIEb}}',
						find: /╠[^:\n]*:Flag of Liechtenstein\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{LIEb}}'
					}, {
						name: '{{LSOb}}',
						find: /╠[^:\n]*:Flag of Lesotho\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{LSOb}}'
					}, {
						name: '{{LTUb}}',
						find: /╠[^:\n]*:Flag of Lithuania\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{LTUb}}'
					}, {
						name: '{{LUXb}}',
						find: /╠[^:\n]*:Flag of Luxembourg\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{LUXb}}'
					}, {
						name: '{{LVAb}}',
						find: /╠[^:\n]*:Flag of Latvia\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{LVAb}}'
					}]
				}, {
					name: 'M',
					ifhas: /╠[^:\n]*:Flag of M[^\|\]\n]+ *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/,
					sub: [{
						name: '{{MEXb}}',
						find: /╠[^:\n]*:Flag of Mexico\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{MEXb}}',
						num: 100
					}, {
						name: '{{MACb}}',
						find: /╠[^:\n]*:Flag of Macau\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{MACb}}'
					}, {
						name: '{{MARb}}',
						find: /╠[^:\n]*:Flag of Morocco\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{MARb}}'
					}, {
						name: '{{MCOb}}',
						find: /╠[^:\n]*:Flag of Monaco\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{MCOb}}'
					}, {
						name: '{{MDAb}}',
						find: /╠[^:\n]*:Flag of Moldova\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{MDAb}}'
					}, {
						name: '{{MDGb}}',
						find: /╠[^:\n]*:Flag of Madagascar\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{MDGb}}'
					}, {
						name: '{{MDRb}}',
						find: /╠[^:\n]*:Flag of Madeira\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{MDRb}}'
					}, {
						name: '{{MDVb}}',
						find: /╠[^:\n]*:Flag of Maldives\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{MDVb}}'
					}, {
						name: '{{MKDb}}',
						find: /╠[^:\n]*:Flag of Macedonia\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{MKDb}}'
					}, {
						name: '{{MLIb}}',
						find: /╠[^:\n]*:Flag of Mali\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{MLIb}}'
					}, {
						name: '{{MLTb}}',
						find: /╠[^:\n]*:Flag of Malta\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{MLTb}}'
					}, {
						name: '{{MMRb}}',
						find: /╠[^:\n]*:Flag of Myanmar\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{MMRb}}'
					}, {
						name: '{{MNEb}}',
						find: /╠[^:\n]*:Flag of Montenegro\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{MNEb}}'
					}, {
						name: '{{MNEb|1910}}',
						find: /╠[^:\n]*:Flag of Montenegro (1941-1944)\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{MNEb|1910}}'
					}, {
						name: '{{MNEb|1993}}',
						find: /╠[^:\n]*:Flag of Montenegro (1993-2004)\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{MNEb|1993}}'
					}, {
						name: '{{MNGb}}',
						find: /╠[^:\n]*:Flag of Mongolia\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{MNGb}}'
					}, {
						name: '{{MONb}}',
						find: /╠[^:\n]*:Flag of Monaco\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{MONb}}'
					}, {
						name: '{{MOZb}}',
						find: /╠[^:\n]*:Flag of Mozambique\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{MOZb}}'
					}, {
						name: '{{MRTb}}',
						find: /╠[^:\n]*:Flag of Mauritania\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{MRTb}}'
					}, {
						name: '{{MSRb}}',
						find: /╠[^:\n]*:Flag of Montserrat\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{MSRb}}'
					}, {
						name: '{{MTQb}}',
						find: /╠[^:\n]*:Flag of Martinique\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{MTQb}}'
					}, {
						name: '{{MUSb}}',
						find: /╠[^:\n]*:Flag of Mauritius\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{MUSb}}'
					}, {
						name: '{{MWIb}}',
						find: /╠[^:\n]*:Flag of Malawi\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{MWIb}}'
					}, {
						name: '{{MYSb}}',
						find: /╠[^:\n]*:Flag of Malaysia\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{MYSb}}'
					}, {
						name: '{{MYTb}}',
						find: /╠[^:\n]*:Flag of Mayotte \(local\)\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{MYTb}}'
					}]
				}, {
					name: 'N',
					ifhas: /╠[^:\n]*:Flag of N[^\|\]\n]+ *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/,
					sub: [{
						name: '{{DEUNb}}',
						find: /╠[^:\n]*:Flag of Nazi Germany \(1933\-1945\)\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{DEUNb}}',
						num: 100
					}, {
						name: '{{TKLb}}',
						find: /╠[^:\n]*:Flag of New Zealand\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{TKLb}}',
						num: 100
					}, {
						name: '{{SJMb}}',
						find: /╠[^:\n]*:Flag of Norway\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{SJMb}}',
						num: 100
					}, {
						name: '{{PRKb}}',
						find: /╠[^:\n]*:Flag of North Korea\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{PRKb}}',
						num: 100
					}, {
						name: '{{NAMb}}',
						find: /╠[^:\n]*:Flag of Namibia\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{NAMb}}'
					}, {
						name: '{{ND}}',
						find: /╠[^:\n]*:Flag of None\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{ND}}',
						num: 100
					}, {
						name: '{{NERb}}',
						find: /╠[^:\n]*:Flag of Niger(?: 3!2)?\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{NERb}}',
						num: 100
					}, {
						name: '{{NFKb}}',
						find: /╠[^:\n]*:Flag of Norfolk Island\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{NFKb}}',
						num: 100
					}, {
						name: '{{NGAb}}',
						find: /╠[^:\n]*:Flag of Nigeria\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{NGAb}}',
						num: 100
					}, {
						name: '{{NICb}}',
						find: /╠[^:\n]*:Flag of Nicaragua\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{NICb}}',
						num: 100
					}, {
						name: '{{NIUb}}',
						find: /╠[^:\n]*:Flag of Niue\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{NIUb}}',
						num: 100
					}, {
						name: '{{NKORb}}',
						find: /╠[^:\n]*:Flag of North Korea\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{NKORb}}',
						num: 100
					}, {
						name: '{{NORb}}',
						find: /╠[^:\n]*:Flag of Norway\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{NORb}}',
						num: 100
					}, {
						name: '{{NPLb}}',
						find: /╠[^:\n]*:Flag of Nepal\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{NPLb}}',
						num: 100
					}, {
						name: '{{NRUb}}',
						find: /╠[^:\n]*:Flag of Nauru\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{NRUb}}',
						num: 100
					}, {
						name: '{{NZLb}}',
						find: /╠[^:\n]*:Flag of New Zealand\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{NZLb}}',
						num: 100
					}]
				}, {
					name: 'O',
					ifhas: /╠[^:\n]*:Flag of O[^\|\]\n]+ *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/,
					sub: [{
						name: '{{OMNb}}',
						find: /╠[^:\n]*:Flag of Oman\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{OMNb}}',
						num: 100
					}]
				}, {
					name: 'P',
					ifhas: /╠[^:\n]*:Flag of P[^\|\]\n]+ *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/,
					sub: [{
						name: '{{PRTb}}',
						find: /╠[^:\n]*:Flag of Portugal*\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{PRTb}}',
						num: 100
					}, {
						name: '{{PAKb}}',
						find: /╠[^:\n]*:Flag of Pakistan\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{PAKb}}',
						num: 100
					}, {
						name: '{{PANb}}',
						find: /╠[^:\n]*:Flag of Panama\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{PANb}}',
						num: 100
					}, {
						name: '{{PERb}}',
						find: /╠[^:\n]*:Flag of Peru\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{PERb}}',
						num: 100
					}, {
						name: '{{PLWb}}',
						find: /╠[^:\n]*:Flag of Palau\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{PLWb}}',
						num: 100
					}, {
						name: '{{PNGb}}',
						find: /╠[^:\n]*:Flag of Papua New Guinea\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{PNGb}}',
						num: 100
					}, {
						name: '{{POLb}}',
						find: /╠[^:\n]*:Flag of Poland\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{POLb}}',
						num: 100
					}, {
						name: '{{PRIb}}',
						find: /╠[^:\n]*:Flag of Puerto Rico\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{PRIb}}',
						num: 100
					}, {
						name: '{{PRTb}}',
						find: /╠[^:\n]*:Flag of Portugal\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{PRTb}}',
						num: 100
					}, {
						name: '{{PRYb}}',
						find: /╠[^:\n]*:Flag of Paraguay\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{PRYb}}',
						num: 100
					}, {
						name: '{{PSEb}}',
						find: /╠[^:\n]*:Flag of Palestine\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{PSEb}}',
						num: 100
					}]
				}, {
					name: 'Q',
					ifhas: /╠[^:\n]*:Flag of Q[^\|\]\n]+ *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/,
					sub: [{
						name: '{{QATb}}',
						find: /╠[^:\n]*:Flag of Qatar\.svg*\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{QATb}}',
						num: 100
					}]
				}, {
					name: 'R',
					ifhas: /╠[^:\n]*:Flag of R[^\|\]\n]+ *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/,
					sub: [{
						name: '{{RUSb}}',
						find: /╠[^:\n]*:Flag of Russia\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{RUSb}}',
						num: 100
					}, {
						name: '{{RUSb|1991}}',
						find: /╠[^:\n]*:Flag of Russia 1991\-1993\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{RUSb|1991}}',
						num: 100
					}, {
						name: '{{RHOb}}',
						find: /╠[^:\n]*:Flag of Rhodesia\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{RHOb}}',
						num: 100
					}, {
						name: '{{ROUb}}',
						find: /╠[^:\n]*:Flag of Romania\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{ROUb}}',
						num: 100
					}, {
						name: '{{RWAb}}',
						find: /╠[^:\n]*:Flag of Rwanda\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{RWAb}}',
						num: 100
					}]
				}, {
					name: 'S',
					ifhas: /╠[^:\n]*:Flag of S[^\|\]\n]+ *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/,
					sub: [{
						name: '{{ZAFb}}',
						find: /╠[^:\n]*:Flag of South Africa\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{ZAFb}}',
						num: 100
					}, {
						name: '{{YUGb}}',
						find: /╠[^:\n]*:Flag of SFR Yugoslavia\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{YUGb}}',
						num: 100
					}, {
						name: '{{WSMb}}',
						find: /╠[^:\n]*:Flag of Samoa\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{WSMb}}',
						num: 100
					}, {
						name: '{{VCTb}}',
						find: /╠[^:\n]*:Flag of Saint Vincent and the Grenadines\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{VCTb}}',
						num: 100
					}, {
						name: '{{MNEb|1945}}',
						find: /╠[^:\n]*:Flag of SR Montenegro\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{MNEb|1945}}'
					}, {
						name: '{{MAFb}}',
						find: /╠[^:\n]*:Flag of Saint-Martin (local)\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{MAFb}}'
					}, {
						name: '{{LKAb}}',
						find: /╠[^:\n]*:Flag of Sri Lanka\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{LKAb}}'
					}, {
						name: '{{LCAb}}',
						find: /╠[^:\n]*:Flag of Saint Lucia\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{LCAb}}'
					}, {
						name: '{{KORb}}',
						find: /╠[^:\n]*:Flag of South Korea\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{KORb}}'
					}, {
						name: '{{KNAb}}',
						find: /╠[^:\n]*:Flag of Saint Kitts and Nevis\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{KNAb}}'
					}, {
						name: '{{ESPb}}',
						find: /╠[^:\n]*:Flag of Spain\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{ESPb}}',
						num: 100
					}, {
						name: '{{CHEb}}',
						find: /╠[^:\n]*:Flag of Switzerland\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{CHEb}}',
						num: 100
					}, {
						name: '{{SARKb}}',
						find: /╠[^:\n]*:Flag of Sark\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{SARKb}}',
						num: 100
					}, {
						name: '{{SARb}}',
						find: /╠[^:\n]*:Flag of Sardinia\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{SARb}}',
						num: 100
					}, {
						name: '{{SAUb}}',
						find: /╠[^:\n]*:Flag of Saudi Arabia\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{SAUb}}',
						num: 100
					}, {
						name: '{{SCGb}}',
						find: /╠[^:\n]*:Flag of Serbia and Montenegro\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{SCGb}}',
						num: 100
					}, {
						name: '{{SCOb}}',
						find: /╠[^:\n]*:Flag of Scotland\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{SCOb}}',
						num: 100
					}, {
						name: '{{SDNb}}',
						find: /╠[^:\n]*:Flag of Sudan\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{SDNb}}',
						num: 100
					}, {
						name: '{{SENb}}',
						find: /╠[^:\n]*:Flag of Senegal\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{SENb}}',
						num: 100
					}, {
						name: '{{SGPb}}',
						find: /╠[^:\n]*:Flag of Singapore\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{SGPb}}',
						num: 100
					}, {
						name: '{{SGSb}}',
						find: /╠[^:\n]*:Flag of South Georgia and the South Sandwich Islands\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{SGSb}}',
						num: 100
					}, {
						name: '{{SHNb}}',
						find: /╠[^:\n]*:Flag of Saint Helena\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{SHNb}}',
						num: 100
					}, {
						name: '{{SLEb}}',
						find: /╠[^:\n]*:Flag of Sierra Leone\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{SLEb}}',
						num: 100
					}, {
						name: '{{SXMb}}',
						find: /╠[^:\n]*:Flag of Sint Maarten\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{SXMb}}',
						num: 100
					}, {
						name: '{{SMRb}}',
						find: /╠[^:\n]*:Flag of San Marino\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{SMRb}}',
						num: 100
					}, {
						name: '{{SOMb}}',
						find: /╠[^:\n]*:Flag of Somalia\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{SOMb}}',
						num: 100
					}, {
						name: '{{SPMb}}',
						find: /╠[^:\n]*:Flag of Saint-Pierre and Miquelon\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{SPMb}}',
						num: 100
					}, {
						name: '{{STPb}}',
						find: /╠[^:\n]*:Flag of Sao Tome and Principe\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{STPb}}',
						num: 100
					}, {
						name: '{{SURb}}',
						find: /╠[^:\n]*:Flag of Suriname\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{SURb}}',
						num: 100
					}, {
						name: '{{SVKb}}',
						find: /╠[^:\n]*:Flag of Slovakia\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{SVKb}}',
						num: 100
					}, {
						name: '{{SVNb}}',
						find: /╠[^:\n]*:Flag of Slovenia\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{SVNb}}',
						num: 100
					}, {
						name: '{{SWEb}}',
						find: /╠[^:\n]*:Flag of Sweden\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{SWEb}}',
						num: 100
					}, {
						name: '{{SWZb}}',
						find: /╠[^:\n]*:Flag of Swaziland\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{SWZb}}',
						num: 100
					}, {
						name: '{{SYRb}}',
						find: /╠[^:\n]*:Flag of Syria\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{SYRb}}',
						num: 100
					}, {
						name: '{{SRBb}}',
						find: /╠[^:\n]*:Flag of Serbia\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{SRBb}}',
						num: 100
					}, {
						name: '{{SRBb|1815}}',
						find: /╠[^:\n]*:Flag of Serbia \(national\)\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{SRBb|1815}}',
						num: 100
					}, {
						name: '{{SRBb|1882}}',
						find: /╠[^:\n]*:Flag of Serbia \(1882\-1918\)\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{SRBb|1882}}',
						num: 100
					}, {
						name: '{{SRBb|1941}}',
						find: /╠[^:\n]*:Flag of Serbia \(national\)\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{SRBb|1941}}',
						num: 100
					}, {
						name: '{{SRBb|1945}}',
						find: /╠[^:\n]*:Flag of SR Serbia\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{SRBb|1945}}',
						num: 100
					}, {
						name: '{{SRBb|1991}}',
						find: /╠[^:\n]*:Flag of Serbia 1991\-2004\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{SRBb|1991}}',
						num: 100
					}, {
						name: '{{SRBb|civil}}',
						find: /╠[^:\n]*:Flag of Serbia \(national\)\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{SRBb|civil}}',
						num: 100
					}, {
						name: '{{MAFb}}',
						find: /╠[^:\n]*:Flag of Saint-Martin \(local\)\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{MAFb}}',
						num: 100
					}]
				}, {
					name: 'T',
					ifhas: /╠[^:\n]*:Flag of T[^\|\]\n]+ *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/,
					sub: [{
						name: '{{TAIb}}',
						find: /╠[^:\n]*:Flag of Taiwan\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{TAIb}}',
						num: 100
					}, {
						name: '{{TGOb}}',
						find: /╠[^:\n]*:Flag of Togo\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{TGOb}}',
						num: 100
					}, {
						name: '{{THAb}}',
						find: /╠[^:\n]*:Flag of Thailand\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{THAb}}',
						num: 100
					}, {
						name: '{{TJKb}}',
						find: /╠[^:\n]*:Flag of Tajikistan\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{TJKb}}',
						num: 100
					}, {
						name: '{{TKMb}}',
						find: /╠[^:\n]*:Flag of Turkmenistan\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{TKMb}}',
						num: 100
					}, {
						name: '{{TNDb}}',
						find: /╠[^:\n]*:Flag of Tunisia\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{TNDb}}',
						num: 100
					}, {
						name: '{{TONb}}',
						find: /╠[^:\n]*:Flag of Tonga\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{TONb}}',
						num: 100
					}, {
						name: '{{TTOb}}',
						find: /╠[^:\n]*:Flag of Trinidad and Tobago\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{TTOb}}',
						num: 100
					}, {
						name: '{{TUNb}}',
						find: /╠[^:\n]*:Flag of Tunisia\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{TUNb}}',
						num: 100
					}, {
						name: '{{TURb}}',
						find: /╠[^:\n]*:Flag of Turkey\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{TURb}}',
						num: 100
					}, {
						name: '{{TUVb}}',
						find: /╠[^:\n]*:Flag of Tuvalu\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{TUVb}}',
						num: 100
					}, {
						name: '{{TZAb}}',
						find: /╠[^:\n]*:Flag of Tanzania\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{TZAb}}',
						num: 100
					}, {
						name: '{{Texasb}}',
						find: /╠[^:\n]*:Flag of Texas\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{Texasb}}',
						num: 100
					}]
				}, {
					name: 'U',
					ifhas: /╠[^:\n]*:Flag of U[^\|\]\n]+ *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/,
					sub: [{
						name: '{{RAUb}}',
						find: /╠[^:\n]*:Flag of United Arab Republic\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{RAUb}}',
						num: 100
					}, {
						name: '{{UKRb}}',
						find: /╠[^:\n]*:Flag of Ukraine\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{UKRb}}',
						num: 100
					}, {
						name: '{{USAb}}',
						find: /╠[^:\n]*:Flag of United States\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{USAb}}',
						num: 100
					}, {
						name: '{{UGAb}}',
						find: /╠[^:\n]*:Flag of Uganda\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{UGAb}}',
						num: 100
					}, {
						name: '{{URYb}}',
						find: /╠[^:\n]*:Flag of Uruguay\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{URYb}}',
						num: 100
					}, {
						name: '{{UZBb}}',
						find: /╠[^:\n]*:Flag of Uzbekistan\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{UZBb}}',
						num: 100
					}]
				}, {
					name: 'V',
					ifhas: /╠[^:\n]*:Flag of V[^\|\]\n]+ *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/,
					sub: [{
						name: '{{VENb}}',
						find: /╠[^:\n]*:Flag of Venezuela\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{VENb}}',
						num: 100
					}, {
						name: '{{VNMb}}',
						find: /╠[^:\n]*:Flag of Vietnam\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{VNMb}}',
						num: 100
					}, {
						name: '{{VUTb}}',
						find: /╠[^:\n]*:Flag of Vanuatu\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{VUTb}}',
						num: 100
					}]
				}, {
					name: 'W',
					ifhas: /╠[^:\n]*:Flag of W[^\|\]\n]+ *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/,
					sub: [{
						name: '{{WALb}}',
						find: /╠[^:\n]*:Flag of Wales 2\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{WALb}}',
						num: 100
					}]
				}, {
					name: 'Y',
					ifhas: /╠[^:\n]*:Flag of Y[^\|\]\n]+ *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/,
					sub: [{
						name: '{{YEMb}}',
						find: /╠[^:\n]*:Flag of Yemen\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{YEMb}}',
						num: 100
					}]
				}, {
					name: 'Z',
					ifhas: /╠[^:\n]*:Flag of Z[^\|\]\n]+ *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/,
					sub: [{
						name: '{{ZAIb}}',
						find: /╠[^:\n]*:Flag of Zaire\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{ZAIb}}',
						num: 100
					}, {
						name: '{{ZANb}}',
						find: /╠[^:\n]*:Flag of Zanzibar\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{ZANb}}',
						num: 100
					}, {
						name: '{{ZMBb}}',
						find: /╠[^:\n]*:Flag of Zambia\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{ZMBb}}',
						num: 100
					}, {
						name: '{{ZWEb}}',
						find: /╠[^:\n]*:Flag of Zimbabwe\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{ZWEb}}',
						num: 100
					}]
				}, {
					name: 'The A-J',
					ifhas: /╠[^:\n]*:Flag of the [A-J][^\|\]\n]+ *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/,
					sub: [{
						name: '{{BHSb}}',
						find: /╠[^:\n]*:Flag of the Bahamas\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{BHSb}}',
						num: 100
					}, {
						name: '{{IOTb}}',
						find: /╠[^:\n]*:Flag of the British Indian Ocean Territory\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{IOTb}}',
						num: 100
					}, {
						name: '{{VGBb}}',
						find: /╠[^:\n]*:Flag of the British Virgin Islands\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{VGBb}}',
						num: 100
					}, {
						name: '{{CYMb}}',
						find: /╠[^:\n]*:Flag of the Cayman Islands\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{CYMb}}',
						num: 100
					}, {
						name: '{{CAFb}}',
						find: /╠[^:\n]*:Flag of the Central African Republic\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{CAFb}}',
						num: 100
					}, {
						name: '{{CCKb}}',
						find: /╠[^:\n]*:Flag of the Cocos (Keeling) Islands\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{CCKb}}',
						num: 100
					}, {
						name: '{{COKb}}',
						find: /╠[^:\n]*:Flag of the Cook Islands\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{COKb}}',
						num: 100
					}, {
						name: '{{COMb}}',
						find: /╠[^:\n]*:Flag of the Comoros\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{COMb}}',
						num: 100
					}, {
						name: '{{CZEb}}',
						find: /╠[^:\n]*:Flag of the Czech Republic\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{CZEb}}',
						num: 100
					}, {
						name: '{{CODb}}',
						find: /╠[^:\n]*:Flag of the Democratic Republic of the Congo\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{CODb}}',
						num: 100
					}, {
						name: '{{DOMb}}',
						find: /╠[^:\n]*:Flag of the Dominican Republic\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{DOMb}}',
						num: 100
					}, {
						name: '{{FLKb}}',
						find: /╠[^:\n]*:Flag of the Falkland Islands\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{FLKb}}',
						num: 100
					}, {
						name: '{{FROb}}',
						find: /╠[^:\n]*:Flag of the Faroe Islands\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{FROb}}',
						num: 100
					}, {
						name: '{{GMBb}}',
						find: /╠[^:\n]*:Flag of The Gambia\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{GMBb}}',
						num: 100
					}, {
						name: '{{IAb}}',
						find: /╠[^:\n]*:Flag of the German Empire\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{IAb}}'
					}, {
						name: '{{IMNb}}',
						find: /╠[^:\n]*:Flag of the Isle of Man\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{IMNb}}'
					}]
				}, {
					name: 'The K-O',
					ifhas: /╠[^:\n]*:Flag of the [K-O][^\|\]\n]+ *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/,
					sub: [{
						name: '{{NLDb}}',
						find: /╠[^:\n]*:Flag of the Netherlands\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{NLDb}}',
						num: 100
					}, {
						name: '{{ANTb}}',
						find: /╠[^:\n]*:Flag of the Netherlands Antilles.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{ANTb}}',
						num: 100
					}, {
						name: '{{IOb|1453}}',
						find: /╠[^:\n]*:Flag of the Ottoman Empire (1453-1844)\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{IOb|1453}}'
					}, {
						name: '{{IOb|1383}}',
						find: /╠[^:\n]*:Flag of the Ottoman Sultanate (1299-1453)\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{IOb|1383}}'
					}, {
						name: '{{MHLb}}',
						find: /╠[^:\n]*:Flag of the Marshall Islands\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{MHLb}}'
					}, {
						name: '{{MNPb}}',
						find: /╠[^:\n]*:Flag of the Northern Mariana Islands\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{MNPb}}'
					}, {
						name: '{{VALb}}',
						find: /╠[^:\n]*:Flag of the Land of Valencia (official)\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{VALb}}',
						num: 100
					}]
				}, {
					name: 'The P-Z',
					ifhas: /╠[^:\n]*:Flag of the [P-Z][^\|\]\n]+ *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/,
					sub: [{
						name: '{{ESPb|1977-1981}}',
						find: /╠[^:\n]*:Flag of the Spain Under Franco\.png *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{ESPb|1977-1981}}',
						num: 100
					}, {
						name: '{{CHNb}}',
						find: /╠[^:\n]*:Flag of the People's Republic of China\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{CHNb}}',
						num: 100
					}, {
						name: '{{PRCb}}',
						find: /╠[^:\n]*:Flag of the People's Republic of China\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{PRCb}}',
						num: 100
					}, {
						name: '{{PHLb}}',
						find: /╠[^:\n]*:Flag of the Philippines\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{PHLb}}',
						num: 100
					}, {
						name: '{{PCNb}}',
						find: /╠[^:\n]*:Flag of the Pitcairn Islands\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{PCNb}}',
						num: 100
					}, {
						name: '{{TWNb}}',
						find: /╠[^:\n]*:Flag of the Republic of China\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{TWNb}}',
						num: 100
					}, {
						name: '{{COGb}}',
						find: /╠[^:\n]*:Flag of the Republic of the Congo\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{COGb}}',
						num: 100
					}, {
						name: '{{SLBb}}',
						find: /╠[^:\n]*:Flag of the Solomon Islands\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{SLBb}}',
						num: 100
					}, {
						name: '{{SYCb}}',
						find: /╠[^:\n]*:Flag of the Seychelles\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{SYCb}}',
						num: 100
					}, {
						name: '{{URSb}}',
						find: /╠[^:\n]*:Flag of the Soviet Union\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{URSb}}',
						num: 100
					}, {
						name: '{{TCAb}}',
						find: /╠[^:\n]*:Flag of the Turks and Caicos Islands\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{TCAb}}',
						num: 100
					}, {
						name: '{{TRNCb}}',
						find: /╠[^:\n]*:Flag of the Turkish Republic of Northern Cyprus\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{TRNCb}}',
						num: 100
					}, {
						name: '{{AREb}}',
						find: /╠[^:\n]*:Flag of the United Arab Emirates.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{AREb}}',
						num: 100
					}, {
						name: '{{GBRb}}',
						find: /╠[^:\n]*:Flag of the United Kingdom\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{GBRb}}',
						num: 100
					}, {
						name: '{{USAb}} 2',
						find: /╠[^:\n]*:Flag of the United States\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{USAb}}',
						num: 100
					}, {
						name: '{{VIRb}}',
						find: /╠[^:\n]*:Flag of the United States Virgin Islands\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{VIRb}}',
						num: 100
					}, {
						name: '{{IVAb}}',
						find: /╠[^:\n]*:Flag of the United States Virgin Islands\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{IVAb}}'
					}, {
						name: '{{VATb}}',
						find: /╠[^:\n]*:Flag of the Vatican City\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{VATb}}',
						num: 100
					}]
				}]
			}, {
				name: 'Bandeira de',
				ifhas: /╠[^:\n]*:Bandeira d[aoe] [^\|\]\n]+ *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
				sub: [{
					name: 'A',
					ifhas: /╠[^:\n]*:Bandeira d[aoe] A[^\|\]\n]+ *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
					sub: [{
						name: '{{BR-ACb}}',
						find: /╠[^:\n]*:Bandeira do Acre\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{BR-ACb}}',
						num: 100
					}, {
						name: '{{BR-ALb}}',
						find: /╠[^:\n]*:Bandeira de Alagoas\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{BR-ALb}}',
						num: 100
					}, {
						name: '{{BR-AMb}}',
						find: /╠[^:\n]*:Bandeira do Amazonas\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{BR-AMb}}',
						num: 100
					}, {
						name: '{{BR-APb}}',
						find: /╠[^:\n]*:Bandeira do Amapá\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{BR-APb}}',
						num: 100
					}]
				}, {
					name: 'B',
					ifhas: /╠[^:\n]*:Bandeira d[aoe] B[^\|\]\n]+ *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
					sub: [{
						name: '{{BR-BAb}}',
						find: /╠[^:\n]*:Bandeira da Bahia\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{BR-BAb}}',
						num: 100
					}]
				}, {
					name: 'E',
					ifhas: /╠[^:\n]*:Bandeira d[aoe] E[^\|\]\n]+ *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
					sub: [{
						name: '{{BR-ESb}}',
						find: /╠[^:\n]*:Bandeira do Espírito Santo\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{BR-ESb}}',
						num: 100
					}]
				}, {
					name: 'G',
					ifhas: /╠[^:\n]*:Bandeira d[aoe] G[^\|\]\n]+ *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
					sub: [{
						name: '{{BR-GOb}}',
						find: /╠[^:\n]*:Bandeira de Goiás\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{BR-GOb}}',
						num: 100
					}]
				}, {
					name: 'M',
					ifhas: /╠[^:\n]*:Bandeira d[aoe] M[^\|\]\n]+ *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
					sub: [{
						name: '{{BR-MGb}}',
						find: /╠[^:\n]*:Bandeira de Minas Gerais\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{BR-MGb}}',
						num: 100
					}, {
						name: '{{BR-MAb}}',
						find: /╠[^:\n]*:Bandeira do Maranhão\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{BR-MAb}}',
						num: 100
					}, {
						name: '{{BR-MTb}}',
						find: /╠[^:\n]*:Bandeira de Mato Grosso\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{BR-MTb}}',
						num: 100
					}, {
						name: '{{BR-MSb}}',
						find: /╠[^:\n]*:Bandeira de Mato Grosso do Sul\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{BR-MSb}}',
						num: 100
					}]
				}, {
					name: 'P',
					ifhas: /╠[^:\n]*:Bandeira d[aoe] P[^\|\]\n]+ *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/,
					sub: [{
						name: '{{BR-PAb}}',
						find: /╠[^:\n]*:Bandeira do Pará\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{BR-PAb}}',
						num: 100
					}, {
						name: '{{BR-PBb}}',
						find: /╠[^:\n]*:Bandeira da Paraíba\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{BR-PBb}}',
						num: 100
					}, {
						name: '{{BR-PEb}}',
						find: /╠[^:\n]*:Bandeira de Pernambuco\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{BR-PEb}}',
						num: 100
					}, {
						name: '{{BR-PIb}}',
						find: /╠[^:\n]*:Bandeira do Piauí\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{BR-PIb}}',
						num: 100
					}, {
						name: '{{BR-PRb}}',
						find: /╠[^:\n]*:Bandeira do Paraná\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{BR-PRb}}',
						num: 100
					}]
				}, {
					name: 'R',
					ifhas: /╠[^:\n]*:Bandeira d[aoe] R[^\|\]\n]+ *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/,
					sub: [{
						name: '{{BR-RNb}}',
						find: /╠[^:\n]*:Bandeira do Rio Grande do Norte\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{BR-RNb}}',
						num: 100
					}, {
						name: '{{BR-ROb}}',
						find: /╠[^:\n]*:Bandeira de Rondônia\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{BR-ROb}}',
						num: 100
					}, {
						name: '{{BR-RRb}}',
						find: /╠[^:\n]*:Bandeira de Roraima\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{BR-RRb}}',
						num: 100
					}]
				}, {
					name: 'S',
					ifhas: /╠[^:\n]*:Bandeira d[aoe] S[^\|\]\n]+ *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
					sub: [{
						name: '{{BR-SCb}}',
						find: /╠[^:\n]*:Bandeira de Santa Catarina\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{BR-SCb}}',
						num: 100
					}, {
						name: '{{BR-SEb}}',
						find: /╠[^:\n]*:Bandeira de Sergipe\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{BR-SEb}}',
						num: 100
					}, {
						name: '{{BR-SPb}}',
						find: /╠[^:\n]*:Bandeira do Estado de São Paulo\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{BR-SPb}}',
						num: 100
					}]
				}, {
					name: 'T',
					ifhas: /╠[^:\n]*:Bandeira d[aoe] T[^\|\]\n]+ *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/i,
					sub: [{
						name: '{{BR-TOb}}',
						find: /╠[^:\n]*:Bandeira do Tocantins\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
						replace: '{{BR-TOb}}',
						num: 100
					}]
				}]
			}, {
				name: 'Outras bandeiras',
				ifhas: /╠/i,
				sub: [{
					name: '{{BR-RSb}}',
					find: /╠[^:\n]*:Bandeira Estado RioGrandedoSul Brasil\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
					replace: '{{BR-RSb}}',
					num: 100
				}, {
					name: '{{BR-RJb}}',
					find: /╠[^:\n]*:Bandeira Estado RiodeJaneiro Brasil2\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
					replace: '{{BR-RJb}}',
					num: 100
				}, {
					name: '{{BR-GBb}}',
					find: /╠[^:\n]*:Bandeira Guanabara\.jpg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
					replace: '{{BR-GBb}}',
					num: 100
				}, {
					name: '{{FNb}}',
					find: /╠[^:\n]*:Bandeira-fernandodenoronha\.gif *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
					replace: '{{FNb}}',
					num: 100
				}, {
					name: '{{BR-CEb}}',
					find: /╠[^:\n]*:Bandeira Estado Ceara Brasil\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
					replace: '{{BR-CEb}}',
					num: 100
				}, {
					name: '{{TPEb|Universíada}}',
					find: /╠[^:\n]*:Chinese Taipei University Sports Flag\.PNG *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
					replace: '{{TPEb|Universíada}}',
					num: 100
				}, {
					name: '{{RUSb|naval}}',
					find: /╠[^:\n]*:Naval Ensign of Russia\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
					replace: '{{RUSb|naval}}',
					num: 100
				}, {
					name: '{{NAb}}',
					find: /╠[^:\n]*:Norteamerica\.png *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
					replace: '{{NAb}}',
					num: 100
				}, {
					name: '{{NIRb}}',
					find: /╠[^:\n]*:Ulster banner\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
					replace: '{{NIRb}}',
					num: 100
				}, {
					name: '{{MSULb}}',
					find: /╠[^:\n]*:Mercosul_flag\.png *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
					replace: '{{MSULb}}'
				}, {
					name: '{{BGRb|1941}}',
					find: /╠[^:\n]*:Cs-cg rs\.PNG *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
					replace: '{{BGRb|1941}}'
				}, {
					name: '{{BGRb|1876}}',
					find: /╠[^:\n]*:Old Flag of Montenegro\.png *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
					replace: '{{BGRb|1876}}'
				}, {
					name: '{{IRb|1858}}',
					find: /╠[^:\n]*:Romanov Flag\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
					replace: '{{IRb|1858}}'
				}, {
					name: '{{IRb|1914}}',
					find: /╠[^:\n]*:Russian Empire 1914 17\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
					replace: '{{IRb|1914}}'
				}, {
					name: '{{IOb}}',
					find: /╠[^:\n]*:Ottoman Flag\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
					replace: '{{IOb}}'
				}, {
					name: '{{IOb|1798}}',
					find: /╠[^:\n]*:Ottoman1798.png\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
					replace: '{{IOb|1798}}'
				}, {
					name: '{{IOb|naval}}',
					find: /╠[^:\n]*:Ottoman Naval Flag\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
					replace: '{{IOb|naval}}'
				}, {
					name: '{{IOPb}}',
					find: /╠[^:\n]*:Olympic flag\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
					replace: '{{IOPb}}'
				}, {
					name: '{{IAb|naval}}',
					find: /╠[^:\n]*:War Ensign of Germany 1903-1918.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
					replace: '{{IAb|naval}}'
				}, {
					name: '{{GEOb|naval}}',
					find: /╠[^:\n]*:Naval Ensign of Georgia\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
					replace: '{{GEOb|naval}}',
					num: 100
				}, {
					name: '{{GEOb|aérea}}',
					find: /╠[^:\n]*:Georgian Air Force flag\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
					replace: '{{GEOb|aérea}}',
					num: 100
				}, {
					name: '{{GRC|royal}}',
					find: /╠[^:\n]*:Kingdom of Greece Flag\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
					replace: '{{GRC|royal}}',
					num: 100
				}, {
					name: '{{GRCb|otto}}',
					find: /╠[^:\n]*:Kingdom of Greece Flag (1833-1862)\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
					replace: '{{GRCb|otto}}',
					num: 100
				}, {
					name: '{{GRCb|royalnavy}}',
					find: /╠[^:\n]*:Hellenic Naval Ensign 1935\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
					replace: '{{GRCb|royalnavy}}',
					num: 100
				}, {
					name: '{{FRAb|marinha}}',
					find: /╠[^:\n]*:Civil and Naval Ensign of France\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
					replace: '{{FRAb|marinha}}',
					num: 100
				}, {
					name: '{{FRAb|vichy}}',
					find: /╠[^:\n]*:VichyFlag\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
					replace: '{{FRAb|vichy}}',
					num: 100
				}, {
					name: '{{FRAb|restauração}}',
					find: /╠[^:\n]*:Pavillon royal de France\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
					replace: '{{FRAb|restauração}}',
					num: 100
				}, {
					name: '{{FRAb|real}}',
					find: /╠[^:\n]*:Naval Ensign of the Kingdom of France\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
					replace: '{{FRAb|real}}',
					num: 100
				}, {
					name: '{{ZZXb}}',
					find: /╠[^:\n]*:Olympic flag\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
					replace: '{{ZZXb}}',
					num: 100
				}, {
					name: '{{EUNb}}',
					find: /╠[^:\n]*:Olympic flag\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
					replace: '{{EUNb}}',
					num: 100
				}]
			}, {
				name: 'Outros símbolos',
				ifhas: /╠[^\|\n\]]+\| *(border *\| *)?[1-3]?[0-9] *px/i,
				sub: [{
					name: '{{BR-RJ-Riob}}',
					find: /╠[^:\n]*:Bandeira do Município do Rio de Janeiro\.png *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
					replace: '{{BR-RJ-Riob}}',
					num: 100
				}, {
					name: '{{BRAb}}',
					find: /╠[^:\n]*:BRAlogo1\.png *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
					replace: '{{BRAb}}',
					num: 100
				}, {
					name: '{{Ícone/Medalha Nobel}}',
					find: /╠[^:\n]*:Nobel prize medal\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
					replace: '{{Ícone/Medalha Nobel}}',
					num: 100
				}, {
					name: '{{Ícone/Golden Globe}}',
					find: /╠[^:\n]*:Golden Globe icon\.svg *\| *(border *\| *)?[1-3]?[0-9] *px[^▒\n]*▒\]\]/ig,
					replace: '{{Ícone/Golden Globe}}',
					num: 100
				}]
			}, {
				name: 'Espaço final em Ficheiro',
				find: /([^ ]) +▒/ig,
				replace: '$1▒',
				num: 100
			}, {
				name: 'Tradução de campos',
				sub: [{
					name: 'right',
					find: /(╠[^▒]+)\|right\|/g,
					replace: '$1|direita|'
				}, {
					name: 'left',
					find: /(╠[^▒]+)\|left\|/g,
					replace: '$1|esquerda|'
				}, {
					name: 'center',
					find: /(╠[^▒]+)\|center\|/g,
					replace: '$1|centro|'
				}, {
					name: 'middle',
					find: /(╠[^▒]+)\|middle\|/g,
					replace: '$1|meio|'
				}, {
					name: 'top',
					find: /(╠[^▒]+)\|top\|/g,
					replace: '$1|acima|'
				}, {
					name: 'bottom',
					find: /(╠[^▒]+)\|bottom\|/g,
					replace: '$1|abaixo|'
				}, {
					name: 'link=',
					find: /(╠[^▒]+)\|link=\n\n/g,
					replace: '$1|ligação='
				}]
			}]
		}, {
			name: '{{Flagicon}}',
			ifhas: /\{\{/i,
			sub: [{
				name: 'Padronizando {{Flagicon}}',
				num: 100,
				sub: [{
					name: '{{Flagicon|text=[[abc|abc]]}}',
					find: /(\{\{Flagicon[^\(\)\n]*)\|text=\[\[[^\(\)\[\]\n]*\]\](\||\}\})/ig,
					replace: '$1$2',
					num: 100
				}, {
					name: '{{Flagicon|text=}}',
					find: /(\{\{Flagicon[^\(\)\n]*)\|text=[^\{\}\n\|]*(\||\}\})/ig,
					replace: '$1$2',
					num: 100
				}, {
					name: '{{Flagicon|00px}}',
					find: /(\{\{Flagicon[^\(\)\n]*)\|[0-9]+px(\||\}\})/ig,
					replace: '$1$2',
					num: 100
				}]
			}, {
				name: '{{Flagicon}}',
				ifhas: '{{Flagicon|', // FIXME: /\{\{Flagicon|/i ?
				sub: [{
					name: '{{Flagicon}} A',
					ifhas: /\{\{[Ff]lagicon\|[AÁ]/,
					sub: [{
						name: '{{AHEb}} - Império Austro-Húngaro (2)',
						find: /\{\{Flagicon\|(Austria\-Hungary)\}\}/ig,
						replace: '{{AHEb}}',
						num: 100
					}, {
						name: '{{DDRb}} - Alemanha Oriental (1)',
						find: /\{\{Flagicon\|(Alemanha Oriental)\}\}/ig,
						replace: '{{DDRb}}',
						num: 100
					}, {
						name: '{{ASMb}} - Samoa Americana (2)',
						find: /\{\{Flagicon\|(American Samoa)\}\}/ig,
						replace: '{{ASMb}}',
						num: 100
					}, {
						name: '{{DEUNb}} - Alemanha Nazi (1)',
						find: /\{\{Flagicon\|(Alemanha Nazi(?:sta)?)\}\}/ig,
						replace: '{{DEUNb}}',
						num: 100
					}, {
						name: '{{AFGb}} - Afeganistão',
						find: /\{\{Flagicon\|(Afghanistan|Afeganistão)\}\}/ig,
						replace: '{{AFGb}}',
						num: 100
					}, {
						name: '{{ANTb}} - Antilhas Holandesas (1)',
						find: /\{\{Flagicon\|(Antilhas Holandesas)\}\}/ig,
						replace: '{{ANTb}}',
						num: 100
					}, {
						name: '{{SAUb}} - Arábia Saudita (1)',
						find: /\{\{Flagicon\|(Arábia Saudita)\}\}/ig,
						replace: '{{SAUb}}',
						num: 100
					}, {
						name: '{{ZAFb}} - África do Sul (1)',
						find: /\{\{Flagicon\|(África do Sul)\}\}/ig,
						replace: '{{ZAFb}}',
						num: 100
					}, {
						name: '{{ALBb}} - Albânia',
						find: /\{\{Flagicon\|(Alb[aâ]nia)\}\}/ig,
						replace: '{{ALBb}}',
						num: 100
					}, {
						name: '{{DEUb}} - Alemanha (1)',
						find: /\{\{Flagicon\|(Alemanha)\}\}/ig,
						replace: '{{DEUb}}',
						num: 100
					}, {
						name: '{{FRGb}} - Alemanha Ocidental',
						find: /\{\{Flagicon\|(Alemanha Ocidental)\}\}/ig,
						replace: '{{FRGb}}',
						num: 100
					}, {
						name: '{{ANDb}} - Andorra',
						find: /\{\{Flagicon\|(Andorra)\}\}/ig,
						replace: '{{ANDb}}',
						num: 100
					}, {
						name: '{{AGOb}} - Angola',
						find: /\{\{Flagicon\|(Angola)\}\}/ig,
						replace: '{{AGOb}}',
						num: 100
					}, {
						name: '{{AIAb}} - Anguilla',
						find: /\{\{Flagicon\|(Anguilla)\}\}/ig,
						replace: '{{AIAb}}',
						num: 100
					}, {
						name: '{{DZAb}} - Argélia',
						find: /\{\{Flagicon\|(Argélia|Algeria)\}\}/ig,
						replace: '{{DZAb}}',
						num: 100
					}, {
						name: '{{ARGb}} - Argentina',
						find: /\{\{Flagicon\|(Argentina)\}\}/ig,
						replace: '{{ARGb}}',
						num: 100
					}, {
						name: '{{ARMb}} - Armenia',
						find: /\{\{Flagicon\|(Arm[eé]nia)\}\}/ig,
						replace: '{{ARMb}}',
						num: 100
					}, {
						name: '{{ABWb}} - Aruba',
						find: /\{\{Flagicon\|(Aruba)\}\}/ig,
						replace: '{{ABWb}}',
						num: 100
					}, {
						name: '{{AUSb}} - Austrália',
						find: /\{\{Flagicon\|(Austr[áa]lia)\}\}/ig,
						replace: '{{AUSb}}',
						num: 100
					}, {
						name: '{{AUTb}} - Áustria',
						find: /\{\{Flagicon\|([AÁ]ustria)\}\}/ig,
						replace: '{{AUTb}}',
						num: 100
					}, {
						name: '{{AZEb}} - Azerbaijão',
						find: /\{\{Flagicon\|(Azerbaij[aã][on])\}\}/ig,
						replace: '{{AZEb}}',
						num: 100
					}]
				}, {
					name: '{{Flagicon}} B',
					ifhas: /\{\{[Ff]lagicon\|B/,
					sub: [{
						name: '{{VGBb}} - Ilhas Virgens Britânicas (2)',
						find: /\{\{Flagicon\|(British Virgin Islands)\}\}/ig,
						replace: '{{VGBb}}',
						num: 100
					}, {
						name: '{{BHSb}} - Bahamas',
						find: /\{\{Flagicon\|(Bahamas)\}\}/ig,
						replace: '{{BHSb}}',
						num: 100
					}, {
						name: '{{BHRb}} - Bahrein',
						find: /\{\{Flagicon\|(Bahr[ae]in)\}\}/ig,
						replace: '{{BHRb}}',
						num: 100
					}, {
						name: '{{BGDb}} - Bangladesh',
						find: /\{\{Flagicon\|(Bangladesh)\}\}/ig,
						replace: '{{BGDb}}',
						num: 100
					}, {
						name: '{{BRBb}} - Barbados',
						find: /\{\{Flagicon\|(Barbados)\}\}/ig,
						replace: '{{BRBb}}',
						num: 100
					}, {
						name: '{{BELb}} - Bélgica',
						find: /\{\{Flagicon\|(Bélgica|Belgium(?: \(Civil\))?)\}\}/ig,
						replace: '{{BELb}}',
						num: 100
					}, {
						name: '{{BLZb}} - Belize',
						find: /\{\{Flagicon\|(Belize)\}\}/ig,
						replace: '{{BLZb}}',
						num: 100
					}, {
						name: '{{BENb}} - Benin',
						find: /\{\{Flagicon\|(Beni[nm])\}\}/ig,
						replace: '{{BENb}}',
						num: 100
					}, {
						name: '{{BMUb}} - Bermudas',
						find: /\{\{Flagicon\|Bermudas\}\}/ig,
						replace: '{{BMUb}}',
						num: 100
					}, {
						name: '{{BLRb}} - Bielorrússia',
						find: /\{\{Flagicon\|(Bielorrússia|Belarus)\}\}/ig,
						replace: '{{BLRb}}',
						num: 100
					}, {
						name: '{{BOLb}} - Bolívia',
						find: /\{\{Flagicon\|(Bol[íi]via)\}\}/ig,
						replace: '{{BOLb}}',
						num: 100
					}, {
						name: '{{BIHb}} - Bósnia e Herzegovina',
						find: /\{\{Flagicon\|(Bosnia and Herzegovina|Bósnia e Herzegovina)\}\}/ig,
						replace: '{{BIHb}}',
						num: 100
					}, {
						name: '{{BWAb}} - Botsuana',
						find: /\{\{Flagicon\|(Bots[wu]ana)\}\}/ig,
						replace: '{{BWAb}}',
						num: 100
					}, {
						name: '{{BRAb}} - Brasil',
						find: /\{\{Flagicon\|(Bra[zs]il)\}\}/ig,
						replace: '{{BRAb}}',
						num: 100
					}, {
						name: '{{BRNb}} - Brunei',
						find: /\{\{Flagicon\|(Brunei)\}\}/ig,
						replace: '{{BRNb}}',
						num: 100
					}, {
						name: '{{BGRb}} - Bulgaria',
						find: /\{\{Flagicon\|(Bulg[aá]ria)\}\}/ig,
						replace: '{{BGRb}}',
						num: 100
					}, {
						name: '{{BFAb}} - Burkina Faso',
						find: /\{\{Flagicon\|(Burkina Faso)\}\}/ig,
						replace: '{{BFAb}}',
						num: 100
					}, {
						name: '{{BDIb}} - Burundi',
						find: /\{\{Flagicon\|(Burundi)\}\}/ig,
						replace: '{{BDIb}}',
						num: 100
					}, {
						name: '{{BTNb}} - Butão',
						find: /\{\{Flagicon\|(Bhutan|Butão)\}\}/ig,
						replace: '{{BTNb}}',
						num: 100
					}]
				}, {
					name: '{{Flagicon}} C',
					ifhas: /\{\{[Ff]lagicon\|C/,
					sub: [{
						name: '{{COLb}} - Colômbia',
						find: /\{\{Flagicon\|(Col[oô]mbia)\}\}/ig,
						replace: '{{COLb}}',
						num: 100
					}, {
						name: '{{CECb}} - Checoslováquia',
						find: /\{\{Flagicon\|(Checoslováquia|Czechoslovakia)\}\}/ig,
						replace: '{{CECb}}',
						num: 100
					}, {
						name: '{{CZEb}} - República Checa (2)',
						find: /\{\{Flagicon\|(Czech Republic)\}\}/ig,
						replace: '{{CZEb}}',
						num: 100
					}, {
						name: '{{CAFb}} - República Centro-Africana (2)',
						find: /\{\{Flagicon\|(Central African Republic)\}\}/ig,
						replace: '{{CAFb}}',
						num: 100
					}, {
						name: '{{CODb}} - Congo',
						find: /\{\{Flagicon\|(Congo)\}\}/ig,
						replace: '{{CODb}}',
						num: 100
					}, {
						name: '{{CYMb}} - Ilhas Cayman (2)',
						find: /\{\{Flagicon\|(Cayman Islands)\}\}/ig,
						replace: '{{CYMb}}',
						num: 100
					}, {
						name: '{{COKb}} - Ilhas Cook (2)',
						find: /\{\{Flagicon\|(Cook Islands)\}\}/ig,
						replace: '{{COKb}}',
						num: 100
					}, {
						name: '{{KAZb}} - Cazaquistão (1)',
						find: /\{\{Flagicon\|(Cazaquistão)\}\}/ig,
						replace: '{{KAZb}}',
						num: 100
					}, {
						name: '{{PRKb}} - Coreia do Norte (1)',
						find: /\{\{Flagicon\|(Cor[eé]ia do Norte)\}\}/ig,
						replace: '{{PRKb}}',
						num: 100
					}, {
						name: '{{KORb}} - Coreia do Sul (1)',
						find: /\{\{Flagicon\|(Cor[eé]ia do Sul)\}\}/ig,
						replace: '{{KORb}}',
						num: 100
					}, {
						name: '{{CPVb}} - Cabo Verde',
						find: /\{\{Flagicon\|(Cape Verde|Cabo Verde)\}\}/ig,
						replace: '{{CPVb}}',
						num: 100
					}, {
						name: '{{CMRb}} - Camarões',
						find: /\{\{Flagicon\|(Cameroon|Camarões)\}\}/ig,
						replace: '{{CMRb}}',
						num: 100
					}, {
						name: '{{KHMb}} - Camboja',
						find: /\{\{Flagicon\|(Cambodia|Camboja)\}\}/ig,
						replace: '{{KHMb}}',
						num: 100
					}, {
						name: '{{CANb}} - Canadá',
						find: /\{\{Flagicon\|(Canad[aá])\}\}/ig,
						replace: '{{CANb}}',
						num: 100
					}, {
						name: '{{TCDb}} - Chade',
						find: /\{\{Flagicon\|(Chade?)\}\}/ig,
						replace: '{{TCDb}}',
						num: 100
					}, {
						name: '{{CHLb}} - Chile',
						find: /\{\{Flagicon\|(Chile)\}\}/ig,
						replace: '{{CHLb}}',
						num: 100
					}, {
						name: '{{CHNb}} - China',
						find: /\{\{Flagicon\|(China)\}\}/ig,
						replace: '{{CHNb}}',
						num: 100
					}, {
						name: '{{CYPb}} - Chipre',
						find: /\{\{Flagicon\|(Cyprus|Chipre)\}\}/ig,
						replace: '{{CYPb}}',
						num: 100
					}, {
						name: '{{COMb}} - Comores',
						find: /\{\{Flagicon\|(Comor[eo]s)\}\}/ig,
						replace: '{{COMb}}',
						num: 100
					}, {
						name: '{{COGb}} - Congo',
						find: /\{\{Flagicon\|(Congo)\}\}/ig,
						replace: '{{COGb}}',
						num: 100
					}, {
						name: '{{CIVb}} - Costa do Marfim',
						find: /\{\{Flagicon\|(Cote d'Ivoire|Costa do Marfim)\}\}/ig,
						replace: '{{CIVb}}',
						num: 100
					}, {
						name: '{{CRIb}} - Costa Rica',
						find: /\{\{Flagicon\|(Costa Rica)\}\}/ig,
						replace: '{{CRIb}}',
						num: 100
					}, {
						name: '{{HRVb}} - Croácia',
						find: /\{\{Flagicon\|(Croácia|Croatia)\}\}/ig,
						replace: '{{HRVb}}',
						num: 100
					}, {
						name: '{{CUBb}} - Cuba',
						find: /\{\{Flagicon\|(Cuba)\}\}/ig,
						replace: '{{CUBb}}',
						num: 100
					}, {
						name: '{{CURb}} - Curaçao',
						find: /\{\{Flagicon\|(Curaçao)\}\}/ig,
						replace: '{{CURb}}',
						num: 100
					}]
				}, {
					name: '{{Flagicon}} D',
					ifhas: /\{\{[Ff]lagicon\|D/,
					sub: [{
						name: '{{DOMb}} - República Dominicana (2)',
						find: /\{\{Flagicon\|(Dominican Republic)\}\}/ig,
						replace: '{{DOMb}}',
						num: 100
					}, {
						name: '{{DNKb}} - Dinamarca',
						find: /\{\{Flagicon\|(Dinamarca|Denmark)\}\}/ig,
						replace: '{{DNKb}}',
						num: 100
					}, {
						name: '{{DJIb}} - Djibouti',
						find: /\{\{Flagicon\|(Djibouti)\}\}/ig,
						replace: '{{DJIb}}',
						num: 100
					}, {
						name: '{{DMAb}} - Dominica',
						find: /\{\{Flagicon\|(Dominica)\}\}/ig,
						replace: '{{DMAb}}',
						num: 100
					}]
				}, {
					name: '{{Flagicon}} E',
					ifhas: /\{\{[Ff]lagicon\|E/,
					sub: [{
						name: '{{DDRb}} - Alemanha Oriental (2)',
						find: /\{\{Flagicon\|(East Germany)\}\}/ig,
						replace: '{{DDRb}}',
						num: 100
					}, {
						name: '{{TLSb}} - Timor-Leste (2)',
						find: /\{\{Flagicon\|(East Timor)\}\}/ig,
						replace: '{{TLSb}}',
						num: 100
					}, {
						name: '{{ENGb}} - Inglaterra (2)',
						find: /\{\{Flagicon\|(England)\}\}/ig,
						replace: '{{ENGb}}',
						num: 100
					}, {
						name: '{{GNQb}} - Guiné Equatorial (2)',
						find: /\{\{Flagicon\|(Equatorial Guinea)\}\}/ig,
						replace: '{{GNQb}}',
						num: 100
					}, {
						name: '{{AREb}} - Emirados Árabes Unidos - (1)',
						find: /\{\{Flagicon\|(Emirados Árabes Unidos|United Arab Emirates)\}\}/ig,
						replace: '{{AREb}}',
						num: 100
					}, {
						name: '{{SCOb}} - Escócia - (1)',
						find: /\{\{Flagicon\|(Escócia)\}\}/ig,
						replace: '{{SCOb}}',
						num: 100
					}, {
						name: '{{SVKb}} - Eslováquia - (1)',
						find: /\{\{Flagicon\|(Eslováquia)\}\}/ig,
						replace: '{{SVKb}}',
						num: 100
					}, {
						name: '{{SVNb}} - Eslovênia - (1)',
						find: /\{\{Flagicon\|(Eslovênia)\}\}/ig,
						replace: '{{SVNb}}',
						num: 100
					}, {
						name: '{{ESPb}} - Espanha - (1)',
						find: /\{\{Flagicon\|(Espanha)\}\}/ig,
						replace: '{{ESPb}}',
						num: 100
					}, {
						name: '{{FSMb}} - Estados Federados da Micronésia - (1)',
						find: /\{\{Flagicon\|(Estados Federados da Micronésia)\}\}/ig,
						replace: '{{FSMb}}',
						num: 100
					}, {
						name: '{{USAb}} - Estados Unidos',
						find: /\{\{Flagicon\|(Estados Unidos( da América)?)\}\}/ig,
						replace: '{{USAb}}',
						num: 100
					}, {
						name: '{{EGYb}} - Egito',
						find: /\{\{Flagicon\|(Egito|Egypt)\}\}/ig,
						replace: '{{EGYb}}',
						num: 100
					}, {
						name: '{{SLVb}} - El Salvador',
						find: /\{\{Flagicon\|(El Salvador)\}\}/ig,
						replace: '{{SLVb}}',
						num: 100
					}, {
						name: '{{ECUb}} - Equador',
						find: /\{\{Flagicon\|(E[cq]uador)\}\}/ig,
						replace: '{{ECUb}}',
						num: 100
					}, {
						name: '{{ERIb}} - Eritreia',
						find: /\{\{Flagicon\|(Eritrei?a)\}\}/ig,
						replace: '{{ERIb}}',
						num: 100
					}, {
						name: '{{ESTb}} - Estonia',
						find: /\{\{Flagicon\|(Est[ôo]nia)\}\}/ig,
						replace: '{{ESTb}}',
						num: 100
					}, {
						name: '{{ETHb}} - Etiópia',
						find: /\{\{Flagicon\|(Etiópia|Ethiopia)\}\}/ig,
						replace: '{{ETHb}}',
						num: 100
					}, {
						name: '{{EURb}} - Europa',
						find: /\{\{Flagicon\|(Europ[ae])\}\}/ig,
						replace: '{{EURb}}',
						num: 100
					}]
				}, {
					name: '{{Flagicon}} F',
					ifhas: /\{\{[Ff]lagicon\|F/,
					sub: [{
						name: '{{PYFb}} - Polinésia Francesa (2)',
						find: /\{\{Flagicon\|(French Polynesia)\}\}/ig,
						replace: '{{PYFb}}',
						num: 100
					}, {
						name: '{{FSMb}} - Estados Federados da Micronésia - (2)',
						find: /\{\{Flagicon\|(Federated States of Micronesia)\}\}/ig,
						replace: '{{FSMb}}',
						num: 100
					}, {
						name: '{{FROb}} - Ilhas Feroé (2)',
						find: /\{\{Flagicon\|(Faroe Islands)\}\}/ig,
						replace: '{{FROb}}',
						num: 100
					}, {
						name: '{{PHLb}} - Filipinas (1)',
						find: /\{\{Flagicon\|(Filipinas)\}\}/ig,
						replace: '{{PHLb}}',
						num: 100
					}, {
						name: '{{FJIb}} - Fiji',
						find: /\{\{Flagicon\|(Fiji)\}\}/ig,
						replace: '{{FJIb}}',
						num: 100
					}, {
						name: '{{FINb}} - Finlândia',
						find: /\{\{Flagicon\|(Finland|Finlândia)\}\}/ig,
						replace: '{{FINb}}',
						num: 100
					}, {
						name: '{{FRAb}} - França',
						find: /\{\{Flagicon\|(Fran[cç][ea])\}\}/ig,
						replace: '{{FRAb}}',
						num: 100
					}]
				}, {
					name: '{{Flagicon}} G',
					ifhas: /\{\{[Ff]lagicon\|G/,
					sub: [{
						name: '{{DEUb}} - Alemanha (2)',
						find: /\{\{Flagicon\|(Germany)\}\}/ig,
						replace: '{{DEUb}}',
						num: 100
					}, {
						name: '{{GNQb}} - Guiné Equatorial (1)',
						find: /\{\{Flagicon\|(Guiné Equatorial)\}\}/ig,
						replace: '{{GNQb}}',
						num: 100
					}, {
						name: '{{GABb}} - Gabão',
						find: /\{\{Flagicon\|(Gab[oã][no])\}\}/ig,
						replace: '{{GABb}}',
						num: 100
					}, {
						name: '{{GMBb}} - Gâmbia',
						find: /\{\{Flagicon\|(G[aâ]mbia)\}\}/ig,
						replace: '{{GMBb}}',
						num: 100
					}, {
						name: '{{GHAb}} - Gana',
						find: /\{\{Flagicon\|(Ghana|Gana)\}\}/ig,
						replace: '{{GHAb}}',
						num: 100
					}, {
						name: '{{GEOb}} - Geórgia',
						find: /\{\{Flagicon\|(Ge[oó]rgia)\}\}/ig,
						replace: '{{GEOb}}',
						num: 100
					}, {
						name: '{{GRDb}} - Granada',
						find: /\{\{Flagicon\|(Gr[ea]nada)\}\}/ig,
						replace: '{{GRDb}}',
						num: 100
					}, {
						name: '{{GRCb}} - Grécia',
						find: /\{\{Flagicon\|(Greece|Grécia)\}\}/ig,
						replace: '{{GRCb}}',
						num: 100
					}, {
						name: '{{GLPb}} - Guadalupe',
						find: /\{\{Flagicon\|(Guadalupe|Guadeloupe)\}\}/ig,
						replace: '{{GLPb}}',
						num: 100
					}, {
						name: '{{GUMb}} - Guam',
						find: /\{\{Flagicon\|(Guam)\}\}/ig,
						replace: '{{GUMb}}',
						num: 100
					}, {
						name: '{{GTMb}} - Guatemala',
						find: /\{\{Flagicon\|(Guatemala)\}\}/ig,
						replace: '{{GTMb}}',
						num: 100
					}, {
						name: '{{GUYb}} - Guiana',
						find: /\{\{Flagicon\|(Gu[iy]ana)\}\}/ig,
						replace: '{{GUYb}}',
						num: 100
					}, {
						name: '{{GUFb}} - Guiana Francesa',
						find: /\{\{Flagicon\|(Guiana Francesa)\}\}/ig,
						replace: '{{GUFb}}',
						num: 100
					}, {
						name: '{{GINb}} - Guiné',
						find: /\{\{Flagicon\|Guin(?:ea|é)\}\}/ig,
						replace: '{{GINb}}',
						num: 100
					}, {
						name: '{{GNBb}} - Guiné-Bissau',
						find: /\{\{Flagicon\|(Guinea\-Bissau|Guiné\-Bissau)\}\}/ig,
						replace: '{{GNBb}}',
						num: 100
					}]
				}, {
					name: '{{Flagicon}} H',
					ifhas: /\{\{[Ff]lagicon\|H/,
					sub: [{
						name: '{{HTIb}} - Haiti',
						find: /\{\{Flagicon\|(Haiti)\}\}/ig,
						replace: '{{HTIb}}',
						num: 100
					}, {
						name: '{{HNDb}} - Honduras',
						find: /\{\{Flagicon\|(Honduras)\}\}/ig,
						replace: '{{HNDb}}',
						num: 100
					}, {
						name: '{{HKGb}} - Hong Kong',
						find: /\{\{Flagicon\|(Hong Kong)\}\}/ig,
						replace: '{{HKGb}}',
						num: 100
					}, {
						name: '{{HUNb}} - Hungria',
						find: /\{\{Flagicon\|(Hungria|Hungary)\}\}/ig,
						replace: '{{HUNb}}',
						num: 100
					}]
				}, {
					name: '{{Flagicon}} I',
					ifhas: /\{\{[Ff]lagicon\|[IÍ]/,
					sub: [{
						name: '{{YUGb}} - Iugoslávia (1)',
						find: /\{\{Flagicon\|(Iugoslávia)\}\}/ig,
						replace: '{{YUGb}}',
						num: 100
					}, {
						name: '{{AHEb}} - Império Austro-Húngaro (1)',
						find: /\{\{Flagicon\|(Império Austro\-Húngaro)\}\}/ig,
						replace: '{{AHEb}}',
						num: 100
					}, {
						name: '{{FROb}} - Ilhas Feroé (1)',
						find: /\{\{Flagicon\|(Ilhas Feroé)\}\}/ig,
						replace: '{{FROb}}',
						num: 100
					}, {
						name: '{{SLBb}} - Ilhas Salomão (1)',
						find: /\{\{Flagicon\|(Ilhas Salomão)\}\}/ig,
						replace: '{{SLBb}}',
						num: 100
					}, {
						name: '{{VIRb}} - Ilhas Virgens Americanas (1)',
						find: /\{\{Flagicon\|(Ilhas Virgens Americanas)\}\}/ig,
						replace: '{{VIRb}}',
						num: 100
					}, {
						name: '{{VGBb}} - Ilhas Virgens Britânicas (1)',
						find: /\{\{Flagicon\|(Ilhas Virgens Britânicas)\}\}/ig,
						replace: '{{VGBb}}',
						num: 100
					}, {
						name: '{{ENGb}} - Inglaterra (1)',
						find: /\{\{Flagicon\|(Inglaterra)\}\}/ig,
						replace: '{{ENGb}}',
						num: 100
					}, {
						name: '{{COKb}} - Ilhas Cook (1)',
						find: /\{\{Flagicon\|(Ilhas Cook)\}\}/ig,
						replace: '{{COKb}}',
						num: 100
					}, {
						name: '{{CYMb}} - Ilhas Cayman (1)',
						find: /\{\{Flagicon\|(Ilhas Cayman)\}\}/ig,
						replace: '{{CYMb}}',
						num: 100
					}, {
						name: '{{YEMb}} - Iémen (1)',
						find: /\{\{Flagicon\|(I[êée]men)\}\}/ig,
						replace: '{{YEMb}}',
						num: 100
					}, {
						name: '{{INDb}} - India',
						find: /\{\{Flagicon\|([IÍ]ndia)\}\}/ig,
						replace: '{{INDb}}',
						num: 100
					}, {
						name: '{{DEIb}} - Índias Orientais Holandesas',
						find: /\{\{Flagicon\|(Índias Orientais Holandesas)\}\}/ig,
						replace: '{{DEIb}}',
						num: 100
					}, {
						name: '{{IDNb}} - Indonésia',
						find: /\{\{Flagicon\|(Indon[ée]sia)\}\}/ig,
						replace: '{{IDNb}}',
						num: 100
					}, {
						name: '{{IRNb}} - Irã',
						find: /\{\{Flagicon\|(Irã|Iran)\}\}/ig,
						replace: '{{IRNb}}',
						num: 100
					}, {
						name: '{{IRQb}} - Iraque',
						find: /\{\{Flagicon\|(Iraque|Iraq)\}\}/ig,
						replace: '{{IRQb}}',
						num: 100
					}, {
						name: '{{IRLb}} - Irlanda',
						find: /\{\{Flagicon\|(Irlanda|Ireland)\}\}/ig,
						replace: '{{IRLb}}',
						num: 100
					}, {
						name: '{{NIRb}} - Irlanda do Norte',
						find: /\{\{Flagicon\|(Irlanda do Norte)\}\}/ig,
						replace: '{{NIRb}}',
						num: 100
					}, {
						name: '{{ISLb}} - Islândia',
						find: /\{\{Flagicon\|(Iceland|Islândia)\}\}/ig,
						replace: '{{ISLb}}',
						num: 100
					}, {
						name: '{{ISRb}} - Israel',
						find: /\{\{Flagicon\|(Israel)\}\}/ig,
						replace: '{{ISRb}}',
						num: 100
					}, {
						name: '{{ITAb}} - Itália',
						find: /\{\{Flagicon\|(Itália|Italy)\}\}/ig,
						replace: '{{ITAb}}',
						num: 100
					}]
				}, {
					name: '{{Flagicon}} J',
					ifhas: /\{\{[Ff]lagicon\|J/,
					sub: [{
						name: '{{JAMb}} - Jamaica',
						find: /\{\{Flagicon\|(Jamaica)\}\}/ig,
						replace: '{{JAMb}}',
						num: 100
					}, {
						name: '{{JPNb}} - Japáo',
						find: /\{\{Flagicon\|(Jap[ãa][on])\}\}/ig,
						replace: '{{JPNb}}',
						num: 100
					}, {
						name: '{{JORb}} - Jordânia',
						find: /\{\{Flagicon\|Jord(?:an|ânia)\}\}/ig,
						replace: '{{JORb}}',
						num: 100
					}]
				}, {
					name: '{{Flagicon}} K',
					ifhas: /\{\{[Ff]lagicon\|K/,
					sub: [{
						name: '{{KAZb}} - Cazaquistão (2)',
						find: /\{\{Flagicon\|(Kazakhstan)\}\}/ig,
						replace: '{{KAZb}}',
						num: 100
					}, {
						name: '{{KENb}} - Quênia (2)',
						find: /\{\{Flagicon\|(Kenya)\}\}/ig,
						replace: '{{KENb}}',
						num: 100
					}, {
						name: '{{KGZb}} - Quirguistão (2)',
						find: /\{\{Flagicon\|(Kyrgyzstan)\}\}/ig,
						replace: '{{KGZb}}',
						num: 100
					}, {
						name: '{{KIRb}} - Kiribati',
						find: /\{\{Flagicon\|(Kiribati)\}\}/ig,
						replace: '{{KIRb}}',
						num: 100
					}, {
						name: '{{KOSb}} - Kosovo',
						find: /\{\{Flagicon\|(Kosovo)\}\}/ig,
						replace: '{{KOSb}}',
						num: 100
					}]
				}, {
					name: '{{Flagicon}} L',
					ifhas: /\{\{[Ff]lagicon\|L/,
					sub: [{
						name: '{{LAOb}} - Laos',
						find: /\{\{Flagicon\|(Laos)\}\}/ig,
						replace: '{{LAOb}}',
						num: 100
					}, {
						name: '{{LSOb}} - Lesoto',
						find: /\{\{Flagicon\|(Lesoth?o)\}\}/ig,
						replace: '{{LSOb}}',
						num: 100
					}, {
						name: '{{LVAb}} - Letônia',
						find: /\{\{Flagicon\|(Latvia|Letônia)\}\}/ig,
						replace: '{{LVAb}}',
						num: 100
					}, {
						name: '{{LBNb}} - Líbano',
						find: /\{\{Flagicon\|(Lebanon|Líbano)\}\}/ig,
						replace: '{{LBNb}}',
						num: 100
					}, {
						name: '{{LBRb}} - Libéria',
						find: /\{\{Flagicon\|(Lib[ée]ria)\}\}/ig,
						replace: '{{LBRb}}',
						num: 100
					}, {
						name: '{{LBYb}} - Líbia',
						find: /\{\{Flagicon\|(L[íi]b[iy]a)\}\}/ig,
						replace: '{{LBYb}}',
						num: 100
					}, {
						name: '{{LIEb}} - Liechtenstein',
						find: /\{\{Flagicon\|(Liechtenstein)\}\}/ig,
						replace: '{{LIEb}}',
						num: 100
					}, {
						name: '{{LTUb}} - Lituânia',
						find: /\{\{Flagicon\|(Lituânia|Lithuania)\}\}/ig,
						replace: '{{LTUb}}',
						num: 100
					}, {
						name: '{{LUXb}} - Luxemburgo',
						find: /\{\{Flagicon\|(Luxemburgo|Luxembourg)\}\}/ig,
						replace: '{{LUXb}}',
						num: 100
					}]
				}, {
					name: '{{Flagicon}} M',
					ifhas: /\{\{[Ff]lagicon\|M/,
					sub: [{
						name: '{{MACb}} - Macau',
						find: /\{\{Flagicon\|(Macau)\}\}/ig,
						replace: '{{MACb}}',
						num: 100
					}, {
						name: '{{MKDb}} - Macedônia',
						find: /\{\{Flagicon\|(Maced[oóô]nia)\}\}/ig,
						replace: '{{MKDb}}',
						num: 100
					}, {
						name: '{{MDGb}} - Madagascar',
						find: /\{\{Flagicon\|(Madag[áa]scar)\}\}/ig,
						replace: '{{MDGb}}',
						num: 100
					}, {
						name: '{{MYSb}} - Malásia',
						find: /\{\{Flagicon\|(Malásia|Malaysia)\}\}/ig,
						replace: '{{MYSb}}',
						num: 100
					}, {
						name: '{{MWIb}} - Malawi',
						find: /\{\{Flagicon\|(Malawi)\}\}/ig,
						replace: '{{MWIb}}',
						num: 100
					}, {
						name: '{{MDVb}} - Maldivas',
						find: /\{\{Flagicon\|(Maldiv[ae]s)\}\}/ig,
						replace: '{{MDVb}}',
						num: 100
					}, {
						name: '{{MLIb}} - Mali',
						find: /\{\{Flagicon\|(Mali)\}\}/ig,
						replace: '{{MLIb}}',
						num: 100
					}, {
						name: '{{MLTb}} - Malta',
						find: /\{\{Flagicon\|(Malta)\}\}/ig,
						replace: '{{MLTb}}',
						num: 100
					}, {
						name: '{{MARb}} - Marrocos',
						find: /\{\{Flagicon\|(M[ao]rocco|Marrocos)\}\}/ig,
						replace: '{{MARb}}',
						num: 100
					}, {
						name: '{{MTQb}} - Martinica',
						find: /\{\{Flagicon\|Martini(?:ca|que)\}\}/ig,
						replace: '{{MTQb}}',
						num: 100
					}, {
						name: '{{MUSb}} - Maurícia',
						find: /\{\{Flagicon\|(Maurícia|Mauritius)\}\}/ig,
						replace: '{{MUSb}}',
						num: 100
					}, {
						name: '{{MRTb}} - Mauritania',
						find: /\{\{Flagicon\|(Maurit[aâ]nia)\}\}/ig,
						replace: '{{MRTb}}',
						num: 100
					}, {
						name: '{{MEXb}} - México',
						find: /\{\{Flagicon\|(M[eé]xico)\}\}/ig,
						replace: '{{MEXb}}',
						num: 100
					}, {
						name: '{{FSMb}} - Micronésia',
						find: /\{\{Flagicon\|(Micronésia)\}\}/ig,
						replace: '{{FSMb}}',
						num: 100
					}, {
						name: '{{MMRb}} - Mianmar',
						find: /\{\{Flagicon\|(M[iy]anmar)\}\}/ig,
						replace: '{{MMRb}}',
						num: 100
					}, {
						name: '{{MOZb}} - Moçambique',
						find: /\{\{Flagicon\|(Mo[zç]ambique)\}\}/ig,
						replace: '{{MOZb}}',
						num: 100
					}, {
						name: '{{MDAb}} - Moldávia',
						find: /\{\{Flagicon\|(Moldova|Moldávia)\}\}/ig,
						replace: '{{MDAb}}',
						num: 100
					}, {
						name: '{{MCOb}} - Mônaco',
						find: /\{\{Flagicon\|(M[oôó]naco)\}\}/ig,
						replace: '{{MCOb}}',
						num: 100
					}, {
						name: '{{MNGb}} - Mongolia',
						find: /\{\{Flagicon\|(Mong[óo]lia)\}\}/ig,
						replace: '{{MNGb}}',
						num: 100
					}, {
						name: '{{MNEb}} - Montenegro',
						find: /\{\{Flagicon\|(Montenegro)\}\}/ig,
						replace: '{{MNEb}}',
						num: 100
					}, {
						name: '{{MSRb}} - Monserrate',
						find: /\{\{Flagicon\|(Monserrate|Montserrat)\}\}/ig,
						replace: '{{MSRb}}',
						num: 100
					}]
				}, {
					name: '{{Flagicon}} N',
					ifhas: /\{\{[Ff]lagicon\|N/,
					sub: [{
						name: '{{DEUNb}} - Alemanha Nazi (2)',
						find: /\{\{Flagicon\|(Nazi Germany)\}\}/ig,
						replace: '{{DEUNb}}',
						num: 100
					}, {
						name: '{{PRKb}} - Coreia do Norte (2)',
						find: /\{\{Flagicon\|(North Korea)\}\}/ig,
						replace: '{{PRKb}}',
						num: 100
					}, {
						name: '{{ANTb}} - Antilhas Holandesas (2)',
						find: /\{\{Flagicon\|(Netherlands Antilles)\}\}/ig,
						replace: '{{ANTb}}',
						num: 100
					}, {
						name: '{{NLDb}} - Netherlands',
						find: /\{\{Flagicon\|(Netherlands)\}\}/ig,
						replace: '{{NLDb}}',
						num: 100
					}, {
						name: '{{NAMb}} - Namíbia',
						find: /\{\{Flagicon\|(Nam[íi]bia)\}\}/ig,
						replace: '{{NAMb}}',
						num: 100
					}, {
						name: '{{NRUb}} - Nauru',
						find: /\{\{Flagicon\|(Nauru)\}\}/ig,
						replace: '{{NRUb}}',
						num: 100
					}, {
						name: '{{NPLb}} - Nepal',
						find: /\{\{Flagicon\|(Nepal)\}\}/ig,
						replace: '{{NPLb}}',
						num: 100
					}, {
						name: '{{NICb}} - Nicaragua',
						find: /\{\{Flagicon\|(Nicar[aá]gua)\}\}/ig,
						replace: '{{NICb}}',
						num: 100
					}, {
						name: '{{NERb}} - Níger',
						find: /\{\{Flagicon\|(N[íi]ger)\}\}/ig,
						replace: '{{NERb}}',
						num: 100
					}, {
						name: '{{NGAb}} - Nigéria',
						find: /\{\{Flagicon\|(Nig[ée]ria)\}\}/ig,
						replace: '{{NGAb}}',
						num: 100
					}, {
						name: '{{NORb}} - Noruega',
						find: /\{\{Flagicon\|(Norway|Noruega)\}\}/ig,
						replace: '{{NORb}}',
						num: 100
					}, {
						name: '{{NCLb}} - Nova Caledônia',
						find: /\{\{Flagicon\|(Nova Caledônia)\}\}/ig,
						replace: '{{NCLb}}',
						num: 100
					}, {
						name: '{{NZLb}} - Nova Zelândia',
						find: /\{\{Flagicon\|(New Zealand|Nova Zelândia)\}\}/ig,
						replace: '{{NZLb}}',
						num: 100
					}]
				}, {
					name: '{{Flagicon}} O',
					ifhas: /\{\{[Ff]lagicon\|O/,
					sub: [{
						name: '{{OMNb}} - Omã',
						find: /\{\{Flagicon\|Om(?:an|ã)\}\}/ig,
						replace: '{{OMNb}}',
						num: 100
					}]
				}, {
					name: '{{Flagicon}} P',
					ifhas: /\{\{[Ff]lagicon\|P/,
					sub: [{
						name: '{{PHLb}} - Filipinas (2)',
						find: /\{\{Flagicon\|(Philippines)\}\}/ig,
						replace: '{{PHLb}}',
						num: 100
					}, {
						name: '{{WALb}} - País de Gales (1)',
						find: /\{\{Flagicon\|(País de Gales)\}\}/ig,
						replace: '{{WALb}}',
						num: 100
					}, {
						name: '{{NLDb}} - Países Baixos (1)',
						find: /\{\{Flagicon\|(Países Baixos)\}\}/ig,
						replace: '{{NLDb}}',
						num: 100
					}, {
						name: '{{PYFb}} - Polinésia Francesa (1)',
						find: /\{\{Flagicon\|(Polinésia Francesa)\}\}/ig,
						replace: '{{PYFb}}',
						num: 100
					}, {
						name: '{{PLWb}} - Palau',
						find: /\{\{Flagicon\|(Palau)\}\}/ig,
						replace: '{{PLWb}}',
						num: 100
					}, {
						name: '{{PSEb}} - Palestina',
						find: /\{\{Flagicon\|(Palestin[ea])\}\}/ig,
						replace: '{{PSEb}}',
						num: 100
					}, {
						name: '{{PANb}} - Panamá',
						find: /\{\{Flagicon\|(Panam[áa])\}\}/ig,
						replace: '{{PANb}}',
						num: 100
					}, {
						name: '{{PNGb}} - Papua-Nova Guiné',
						find: /\{\{Flagicon\|(Papua\-Nova Guiné|Papua New Guinea)\}\}/ig,
						replace: '{{PNGb}}',
						num: 100
					}, {
						name: '{{PRYb}} - Paraguai',
						find: /\{\{Flagicon\|(Paragua[iy])\}\}/ig,
						replace: '{{PRYb}}',
						num: 100
					}, {
						name: '{{PAKb}} - Paquistão',
						find: /\{\{Flagicon\|(Paquistão|Pakistan)\}\}/ig,
						replace: '{{PAKb}}',
						num: 100
					}, {
						name: '{{PERb}} - Peru',
						find: /\{\{Flagicon\|(Peru)\}\}/ig,
						replace: '{{PERb}}',
						num: 100
					}, {
						name: '{{POLb}} - Polônia',
						find: /\{\{Flagicon\|(Pol[oôó]nia|Poland)\}\}/ig,
						replace: '{{POLb}}',
						num: 100
					}, {
						name: '{{PRIb}} - Porto Rico',
						find: /\{\{Flagicon\|(Porto Rico|Puerto Rico)\}\}/ig,
						replace: '{{PRIb}}',
						num: 100
					}, {
						name: '{{PRTb}} - Portugal',
						find: /\{\{Flagicon\|(Portugal)\}\}/ig,
						replace: '{{PRTb}}',
						num: 100
					}]
				}, {
					name: '{{Flagicon}} Q',
					ifhas: /\{\{[Ff]lagicon\|Q/,
					sub: [{
						name: '{{KENb}} - Quênia (1)',
						find: /\{\{Flagicon\|(Quênia)\}\}/ig,
						replace: '{{KENb}}',
						num: 100
					}, {
						name: '{{KGZb}} - Quirguistão (1)',
						find: /\{\{Flagicon\|(Quirguistão)\}\}/ig,
						replace: '{{KGZb}}',
						num: 100
					}, {
						name: '{{QATb}} - Qatar',
						find: /\{\{Flagicon\|(Qatar)\}\}/ig,
						replace: '{{QATb}}',
						num: 100
					}]
				}, {
					name: '{{Flagicon}} R',
					ifhas: /\{\{[Ff]lagicon\|R/,
					sub: [{
						name: '{{DOMb}} - República Dominicana (1)',
						find: /\{\{Flagicon\|(República Dominicana)\}\}/ig,
						replace: '{{DOMb}}',
						num: 100
					}, {
						name: '{{GBRb}} - Reino Unido',
						find: /\{\{Flagicon\|(Reino Unido)\}\}/ig,
						replace: '{{GBRb}}',
						num: 100
					}, {
						name: '{{CZEb}} - República Checa (1)',
						find: /\{\{Flagicon\|(República Checa)\}\}/ig,
						replace: '{{CZEb}}',
						num: 100
					}, {
						name: '{{CAFb}} - República Centro-Africana (1)',
						find: /\{\{Flagicon\|(República Centro\-Africana)\}\}/ig,
						replace: '{{CAFb}}',
						num: 100
					}, {
						name: '{{ROUb}} - Romênia',
						find: /\{\{Flagicon\|(Rom[aê]nia)\}\}/ig,
						replace: '{{ROUb}}',
						num: 100
					}, {
						name: '{{RWAb}} - Ruanda',
						find: /\{\{Flagicon\|(R[wu]anda)\}\}/ig,
						replace: '{{RWAb}}',
						num: 100
					}, {
						name: '{{RUSb}} - Rússia',
						find: /\{\{Flagicon\|(R[úu]ssia|Russian Federation)\}\}/ig,
						replace: '{{RUSb}}',
						num: 100
					}]
				}, {
					name: '{{Flagicon}} S',
					ifhas: /\{\{[Ff]lagicon\|S/,
					sub: [{
						name: '{{SCOb}} - Escócia - (2)',
						find: /\{\{Flagicon\|(Scotland)\}\}/ig,
						replace: '{{SCOb}}',
						num: 100
					}, {
						name: '{{YUGb}} - SFR Yugoslavia',
						find: /\{\{Flagicon\|(SFR Yugoslavia)\}\}/ig,
						replace: '{{YUGb}}',
						num: 100
					}, {
						name: '{{SVKb}} - Eslováquia - (2)',
						find: /\{\{Flagicon\|(Slovakia)\}\}/ig,
						replace: '{{SVKb}}',
						num: 100
					}, {
						name: '{{SVNb}} - Eslovênia - (2)',
						find: /\{\{Flagicon\|(Slovenia)\}\}/ig,
						replace: '{{SVNb}}',
						num: 100
					}, {
						name: '{{ESPb}} - Espanha - (2)',
						find: /\{\{Flagicon\|(Spain)\}\}/ig,
						replace: '{{ESPb}}',
						num: 100
					}, {
						name: '{{SLBb}} - Ilhas Salomão (2)',
						find: /\{\{Flagicon\|(Solomon Islands)\}\}/ig,
						replace: '{{SLBb}}',
						num: 100
					}, {
						name: '{{KORb}} - Coreia do Sul (2)',
						find: /\{\{Flagicon\|(South Korea)\}\}/ig,
						replace: '{{KORb}}',
						num: 100
					}, {
						name: '{{ZAFb}} - África do Sul (2)',
						find: /\{\{Flagicon\|(South Africa)\}\}/ig,
						replace: '{{ZAFb}}',
						num: 100
					}, {
						name: '{{SAUb}} - Arábia Saudita (2)',
						find: /\{\{Flagicon\|(Saudi Arabia)\}\}/ig,
						replace: '{{SAUb}}',
						num: 100
					}, {
						name: '{{URSb}} - União Soviética (2)',
						find: /\{\{Flagicon\|(Soviet Union)\}\}/ig,
						replace: '{{URSb}}',
						num: 100
					}, {
						name: '{{SCGb}} - Sérvia e Montenegro',
						find: /\{\{Flagicon\|(Sérvia e Montenegro|Serbia and Montenegro)\}\}/ig,
						replace: '{{SCGb}}',
						num: 100
					}, {
						name: '{{ASMb}} - Samoa Americana (1)',
						find: /\{\{Flagicon\|(Samoa Americana)\}\}/ig,
						replace: '{{ASMb}}',
						num: 100
					}, {
						name: '{{WSMb}} - Samoa',
						find: /\{\{Flagicon\|(Samoa)\}\}/ig,
						replace: '{{WSMb}}',
						num: 100
					}, {
						name: '{{LCAb}} - Santa Lúcia',
						find: /\{\{Flagicon\|(Santa Lúcia|Saint Lucia)\}\}/ig,
						replace: '{{LCAb}}',
						num: 100
					}, {
						name: '{{KNAb}} - São Cristóvão e Névis',
						find: /\{\{Flagicon\|(Saint Kitts and Nevis|São Cristóvão e Névis)\}\}/ig,
						replace: '{{KNAb}}',
						num: 100
					}, {
						name: '{{SMRb}} - São Marinho',
						find: /\{\{Flagicon\|(São Marinho|San Marino)\}\}/ig,
						replace: '{{SMRb}}',
						num: 100
					}, {
						name: '{{STPb}} - São Tomé e Príncipe',
						find: /\{\{Flagicon\|(São Tomé e Príncipe|Sao Tome and Principe)\}\}/ig,
						replace: '{{STPb}}',
						num: 100
					}, {
						name: '{{VCTb}} - São Vicente e Granadinas',
						find: /\{\{Flagicon\|(São Vicente e Granadinas|Saint Vincent and the Grenadines)\}\}/ig,
						replace: '{{VCTb}}',
						num: 100
					}, {
						name: '{{SENb}} - Senegal',
						find: /\{\{Flagicon\|(Senegal)\}\}/ig,
						replace: '{{SENb}}',
						num: 100
					}, {
						name: '{{SLEb}} - Serra Leoa',
						find: /\{\{Flagicon\|(Sierra Leone|Serra Leoa)\}\}/ig,
						replace: '{{SLEb}}',
						num: 100
					}, {
						name: '{{SRBb}} - Sérvia',
						find: /\{\{Flagicon\|(S[ée]r[bv]ia)\}\}/ig,
						replace: '{{SRBb}}',
						num: 100
					}, {
						name: '{{SYCb}} - Seychelles',
						find: /\{\{Flagicon\|(Seychelles)\}\}/ig,
						replace: '{{SYCb}}',
						num: 100
					}, {
						name: '{{SGPb}} - Singapura',
						find: /\{\{Flagicon\|(Singapura|Singapore)\}\}/ig,
						replace: '{{SGPb}}',
						num: 100
					}, {
						name: '{{SXMb}} - Sint Maarten',
						find: /\{\{Flagicon\|(Sint Maarten)\}\}/ig,
						replace: '{{SXMb}}',
						num: 100
					}, {
						name: '{{SYRb}} - Síria',
						find: /\{\{Flagicon\|(S[íy]ria)\}\}/ig,
						replace: '{{SYRb}}',
						num: 100
					}, {
						name: '{{SOMb}} - Somália',
						find: /\{\{Flagicon\|(Som[áa]lia)\}\}/ig,
						replace: '{{SOMb}}',
						num: 100
					}, {
						name: '{{LKAb}} - Sri Lanka',
						find: /\{\{Flagicon\|(Sri Lanka)\}\}/ig,
						replace: '{{LKAb}}',
						num: 100
					}, {
						name: '{{SWZb}} - Suazilândia',
						find: /\{\{Flagicon\|(Suazilândia|Swaziland)\}\}/ig,
						replace: '{{SWZb}}',
						num: 100
					}, {
						name: '{{SDNb}} - Sudão',
						find: /\{\{Flagicon\|Sud(?:an|ão)\}\}/ig,
						replace: '{{SDNb}}',
						num: 100
					}, {
						name: '{{SWEb}} - Suécia',
						find: /\{\{Flagicon\|(Suécia|Sweden)\}\}/ig,
						replace: '{{SWEb}}',
						num: 100
					}, {
						name: '{{CHEb}} - Suiça',
						find: /\{\{Flagicon\|(Switzerland|Suíça)\}\}/ig,
						replace: '{{CHEb}}',
						num: 100
					}, {
						name: '{{SURb}} - Suriname',
						find: /\{\{Flagicon\|(Suriname)\}\}/ig,
						replace: '{{SURb}}',
						num: 100
					}]
				}, {
					name: '{{Flagicon}} T',
					ifhas: /\{\{[Ff]lagicon\|T/,
					sub: [{
						name: '{{TLSb}} - Timor-Leste (1)',
						find: /\{\{Flagicon\|(Timor\-Leste)\}\}/ig,
						replace: '{{TLSb}}',
						num: 100
					}, {
						name: '{{NLDb}} - The Netherlands',
						find: /\{\{Flagicon\|(The Netherlands)\}\}/ig,
						replace: '{{NLDb}}',
						num: 100
					}, {
						name: '{{TJKb}} - Tadjiquistão',
						find: /\{\{Flagicon\|(Tadjiquistão|Tajikistan)\}\}/ig,
						replace: '{{TJKb}}',
						num: 100
					}, {
						name: '{{THAb}} - Tailândia',
						find: /\{\{Flagicon\|(Thailand|Tailândia)\}\}/ig,
						replace: '{{THAb}}',
						num: 100
					}, {
						name: '{{TPEb}} - Taipé Chinesa',
						find: /\{\{Flagicon\|(Taipé Chinesa)\}\}/ig,
						replace: '{{TPEb}}',
						num: 100
					}, {
						name: '{{TWNb}} - Taiwan',
						find: /\{\{Flagicon\|(Taiwan)\}\}/ig,
						replace: '{{TWNb}}',
						num: 100
					}, {
						name: '{{TZAb}} - Tanzânia',
						find: /\{\{Flagicon\|(Tanz[aâ]nia)\}\}/ig,
						replace: '{{TZAb}}',
						num: 100
					}, {
						name: '{{TGOb}} - Togo',
						find: /\{\{Flagicon\|(Togo)\}\}/ig,
						replace: '{{TGOb}}',
						num: 100
					}, {
						name: '{{TONb}} - Tonga',
						find: /\{\{Flagicon\|(Tonga)\}\}/ig,
						replace: '{{TONb}}',
						num: 100
					}, {
						name: '{{TTOb}} - Trinidad e Tobago',
						find: /\{\{Flagicon\|(Trinidad e Tobago|Trinidad and Tobago)\}\}/ig,
						replace: '{{TTOb}}',
						num: 100
					}, {
						name: '{{TUNb}} - Tunísia',
						find: /\{\{Flagicon\|(Tun[ií]sia)\}\}/ig,
						replace: '{{TUNb}}',
						num: 100
					}, {
						name: '{{TCAb}} - Turcas e Caicos',
						find: /\{\{Flagicon\|(Turcas e Caicos)\}\}/ig,
						replace: '{{TCAb}}',
						num: 100
					}, {
						name: '{{TKMb}} - Turcomenistão',
						find: /\{\{Flagicon\|(Turcomenistão|Turkmenistan)\}\}/ig,
						replace: '{{TKMb}}',
						num: 100
					}, {
						name: '{{TURb}} - Turquia',
						find: /\{\{Flagicon\|(Turkey|Turquia)\}\}/ig,
						replace: '{{TURb}}',
						num: 100
					}, {
						name: '{{TUVb}} - Tuvalu',
						find: /\{\{Flagicon\|(Tuvalu)\}\}/ig,
						replace: '{{TUVb}}',
						num: 100
					}]
				}, {
					name: '{{Flagicon}} U',
					ifhas: /\{\{[Ff]lagicon\|U/,
					sub: [{
						name: '{{VIRb}} - Ilhas Virgens Americanas (2)',
						find: /\{\{Flagicon\|(United States Virgin Islands)\}\}/ig,
						replace: '{{VIRb}}',
						num: 100
					}, {
						name: '{{GBR}} - United Kingdom',
						find: /\{\{Flagicon\|(United Kingdom)\}\}/ig,
						replace: '{{GBRb}}',
						num: 100
					}, {
						name: '{{AREb}} - Emirados Árabes Unidos - (2)',
						find: /\{\{Flagicon\|(United Arab Emirates)\}\}/ig,
						replace: '{{AREb}}',
						num: 100
					}, {
						name: '{{USAb}} - Estados Unidos - (2)',
						find: /\{\{Flagicon\|(United States)\}\}/ig,
						replace: '{{USAb}}',
						num: 100
					}, {
						name: '{{URSb}} - União Soviética (1)',
						find: /\{\{Flagicon\|(União Soviética)\}\}/ig,
						replace: '{{URSb}}',
						num: 100
					}, {
						name: '{{UKRb}} - Ucrânia',
						find: /\{\{Flagicon\|(Ucrânia|Ukraine)\}\}/ig,
						replace: '{{UKRb}}',
						num: 100
					}, {
						name: '{{UGAb}} - Uganda',
						find: /\{\{Flagicon\|(Uganda)\}\}/ig,
						replace: '{{UGAb}}',
						num: 100
					}, {
						name: '{{URYb}} - Uruguai',
						find: /\{\{Flagicon\|(Urugua[iy])\}\}/ig,
						replace: '{{URYb}}',
						num: 100
					}, {
						name: '{{UZBb}} - Uzbequistão',
						find: /\{\{Flagicon\|(Uzbequistão|Uzbekistan)\}\}/ig,
						replace: '{{UZBb}}',
						num: 100
					}]
				}, {
					name: '{{Flagicon}} V',
					ifhas: /\{\{[Ff]lagicon\|V/,
					sub: [{
						name: '{{VUTb}} - Vanuatu',
						find: /\{\{Flagicon\|(Vanuatu)\}\}/ig,
						replace: '{{VUTb}}',
						num: 100
					}, {
						name: '{{VATb}} - Vaticano',
						find: /\{\{Flagicon\|Vaticano?\}\}/ig,
						replace: '{{VATb}}',
						num: 100
					}, {
						name: '{{VENb}} - Venezuela',
						find: /\{\{Flagicon\|(Venezuela)\}\}/ig,
						replace: '{{VENb}}',
						num: 100
					}, {
						name: '{{VNMb}} - Vietnã',
						find: /\{\{Flagicon\|Vietn(?:ã|ame|am)\}\}/ig,
						replace: '{{VNMb}}',
						num: 100
					}]
				}, {
					name: '{{Flagicon}} W',
					ifhas: /\{\{[Ff]lagicon\|W/,
					sub: [{
						name: '{{WALb}} - País de Gales (2)',
						find: /\{\{Flagicon\|(Wales)\}\}/ig,
						replace: '{{WALb}}',
						num: 100
					}]
				}, {
					name: '{{Flagicon}} Y',
					ifhas: /\{\{[Ff]lagicon\|Y/,
					sub: [{
						name: '{{YEMb}} - Iémen (2)',
						find: /\{\{Flagicon\|(Y[êée]men)\}\}/ig,
						replace: '{{YEMb}}',
						num: 100
					}, {
						name: '{{YUGb}} - Iugoslávia (2)',
						find: /\{\{Flagicon\|(Yugoslavia)\}\}/ig,
						replace: '{{YUGb}}',
						num: 100
					}]
				}, {
					name: '{{Flagicon}} Z',
					ifhas: /\{\{[Ff]lagicon\|Z/,
					sub: [{
						name: '{{ZAIb}} - Zaire',
						find: /\{\{Flagicon\|(Zaire)\}\}/ig,
						replace: '{{ZAIb}}',
						num: 100
					}, {
						name: '{{ZMBb}} - Zâmbia',
						find: /\{\{Flagicon\|(Z[aâ]mbia)\}\}/ig,
						replace: '{{ZMBb}}',
						num: 100
					}, {
						name: '{{ZWEb}} - Zimbábue',
						find: /\{\{Flagicon\|(Zimbabwe|Zimbábue)\}\}/ig,
						replace: '{{ZWEb}}',
						num: 100
					}]
				}]
			}, {
				name: '{{Flag}}',
				ifhas: '{{Flag|', // FIXME: /\{\{Flag|/i ?
				sub: [{
					name: '{{Flag}} A',
					ifhas: /\{\{[Ff]lag\|[AÁ]/,
					sub: [{
						name: '{{AHE}} - Império Austro-Húngaro (2)',
						find: /\{\{Flag\|(Austria\-Hungary)\}\}/ig,
						replace: '{{AHE}}',
						num: 100
					}, {
						name: '{{DDR}} - Alemanha Oriental (1)',
						find: /\{\{Flag\|(Alemanha Oriental)\}\}/ig,
						replace: '{{DDR}}',
						num: 100
					}, {
						name: '{{ASM}} - Samoa Americana (2)',
						find: /\{\{Flag\|(American Samoa)\}\}/ig,
						replace: '{{ASM}}',
						num: 100
					}, {
						name: '{{DEUN}} - Alemanha Nazi (1)',
						find: /\{\{Flag\|(Alemanha Nazi(?:sta)?)\}\}/ig,
						replace: '{{DEUN}}',
						num: 100
					}, {
						name: '{{AFG}} - Afeganistão',
						find: /\{\{Flag\|(Afghanistan|Afeganistão)\}\}/ig,
						replace: '{{AFG}}',
						num: 100
					}, {
						name: '{{ANT}} - Antilhas Holandesas (1)',
						find: /\{\{Flag\|(Antilhas Holandesas)\}\}/ig,
						replace: '{{ANT}}',
						num: 100
					}, {
						name: '{{SAU}} - Arábia Saudita (1)',
						find: /\{\{Flag\|(Arábia Saudita)\}\}/ig,
						replace: '{{SAU}}',
						num: 100
					}, {
						name: '{{ZAF}} - África do Sul (1)',
						find: /\{\{Flag\|(África do Sul)\}\}/ig,
						replace: '{{ZAF}}',
						num: 100
					}, {
						name: '{{ALB}} - Albânia',
						find: /\{\{Flag\|(Alb[aâ]nia)\}\}/ig,
						replace: '{{ALB}}',
						num: 100
					}, {
						name: '{{DEU}} - Alemanha (1)',
						find: /\{\{Flag\|(Alemanha)\}\}/ig,
						replace: '{{DEU}}',
						num: 100
					}, {
						name: '{{FRG}} - Alemanha Ocidental',
						find: /\{\{Flag\|(Alemanha Ocidental)\}\}/ig,
						replace: '{{FRG}}',
						num: 100
					}, {
						name: '{{AND}} - Andorra',
						find: /\{\{Flag\|(Andorra)\}\}/ig,
						replace: '{{AND}}',
						num: 100
					}, {
						name: '{{AGO}} - Angola',
						find: /\{\{Flag\|(Angola)\}\}/ig,
						replace: '{{AGO}}',
						num: 100
					}, {
						name: '{{AIA}} - Anguilla',
						find: /\{\{Flag\|(Anguilla)\}\}/ig,
						replace: '{{AIA}}',
						num: 100
					}, {
						name: '{{ATG}} - Antígua e Barbuda',
						find: /\{\{Flag\|(Antigua and Barbuda)\}\}/ig,
						replace: '{{ATG}}',
						num: 100
					}, {
						name: '{{DZA}} - Argélia',
						find: /\{\{Flag\|(Argélia|Algeria)\}\}/ig,
						replace: '{{DZA}}',
						num: 100
					}, {
						name: '{{ARG}} - Argentina',
						find: /\{\{Flag\|(Argentina)\}\}/ig,
						replace: '{{ARG}}',
						num: 100
					}, {
						name: '{{ARM}} - Armenia',
						find: /\{\{Flag\|(Arm[eé]nia)\}\}/ig,
						replace: '{{ARM}}',
						num: 100
					}, {
						name: '{{ABW}} - Aruba',
						find: /\{\{Flag\|(Aruba)\}\}/ig,
						replace: '{{ABW}}',
						num: 100
					}, {
						name: '{{AUS}} - Austrália',
						find: /\{\{Flag\|(Austr[áa]lia)\}\}/ig,
						replace: '{{AUS}}',
						num: 100
					}, {
						name: '{{AUT}} - Áustria',
						find: /\{\{Flag\|([AÁ]ustria)\}\}/ig,
						replace: '{{AUT}}',
						num: 100
					}, {
						name: '{{AZE}} - Azerbaijão',
						find: /\{\{Flag\|(Azerbaij[aã][on])\}\}/ig,
						replace: '{{AZE}}',
						num: 100
					}]
				}, {
					name: '{{Flag}} B',
					ifhas: /\{\{[Ff]lag\|B/,
					sub: [{
						name: '{{VGB}} - Ilhas Virgens Britânicas (2)',
						find: /\{\{Flag\|(British Virgin Islands)\}\}/ig,
						replace: '{{VGB}}',
						num: 100
					}, {
						name: '{{BHS}} - Bahamas',
						find: /\{\{Flag\|(Bahamas)\}\}/ig,
						replace: '{{BHS}}',
						num: 100
					}, {
						name: '{{BHR}} - Bahrein',
						find: /\{\{Flag\|(Bahr[ae]in)\}\}/ig,
						replace: '{{BHR}}',
						num: 100
					}, {
						name: '{{BGD}} - Bangladesh',
						find: /\{\{Flag\|(Bangladesh)\}\}/ig,
						replace: '{{BGD}}',
						num: 100
					}, {
						name: '{{BRB}} - Barbados',
						find: /\{\{Flag\|(Barbados)\}\}/ig,
						replace: '{{BRB}}',
						num: 100
					}, {
						name: '{{BEL}} - Bélgica',
						find: /\{\{Flag\|(Bélgica|Belgium(?: \(Civil\))?)\}\}/ig,
						replace: '{{BEL}}',
						num: 100
					}, {
						name: '{{BLZ}} - Belize',
						find: /\{\{Flag\|(Belize)\}\}/ig,
						replace: '{{BLZ}}',
						num: 100
					}, {
						name: '{{BEN}} - Benin',
						find: /\{\{Flag\|(Beni[nm])\}\}/ig,
						replace: '{{BEN}}',
						num: 100
					}, {
						name: '{{BMU}} - Bermudas',
						find: /\{\{Flag\|(Bermudas?)\}\}/ig,
						replace: '{{BMU}}',
						num: 100
					}, {
						name: '{{BLR}} - Bielorrússia',
						find: /\{\{Flag\|(Bielorrússia|Belarus)\}\}/ig,
						replace: '{{BLR}}',
						num: 100
					}, {
						name: '{{BOL}} - Bolívia',
						find: /\{\{Flag\|(Bol[íi]via|Bolivia \(Plurinational State of\))\}\}/ig,
						replace: '{{BOL}}',
						num: 100
					}, {
						name: '{{BIH}} - Bósnia e Herzegovina',
						find: /\{\{Flag\|(Bosnia and Herzegovina|Bósnia e Herzegovina)\}\}/ig,
						replace: '{{BIH}}',
						num: 100
					}, {
						name: '{{BWA}} - Botsuana',
						find: /\{\{Flag\|(Bots[wu]ana)\}\}/ig,
						replace: '{{BWA}}',
						num: 100
					}, {
						name: '{{BRA}} - Brasil',
						find: /\{\{Flag\|(Bra[zs]il)\}\}/ig,
						replace: '{{BRA}}',
						num: 100
					}, {
						name: '{{BRN}} - Brunei',
						find: /\{\{Flag\|Brunei(?: Darussalam)?\}\}/ig,
						replace: '{{BRN}}',
						num: 100
					}, {
						name: '{{BGR}} - Bulgaria',
						find: /\{\{Flag\|(Bulg[aá]ria)\}\}/ig,
						replace: '{{BGR}}',
						num: 100
					}, {
						name: '{{BFA}} - Burkina Faso',
						find: /\{\{Flag\|(Burkina Faso)\}\}/ig,
						replace: '{{BFA}}',
						num: 100
					}, {
						name: '{{BDI}} - Burundi',
						find: /\{\{Flag\|(Burundi)\}\}/ig,
						replace: '{{BDI}}',
						num: 100
					}, {
						name: '{{BTN}} - Butão',
						find: /\{\{Flag\|(Bhutan|Butão)\}\}/ig,
						replace: '{{BTN}}',
						num: 100
					}]
				}, {
					name: '{{Flag}} C',
					ifhas: /\{\{[Ff]lag\|C/,
					sub: [{
						name: '{{COL}} - Colômbia',
						find: /\{\{Flag\|(Col[oô]mbia)\}\}/ig,
						replace: '{{COL}}',
						num: 100
					}, {
						name: '{{CEC}} - Checoslováquia',
						find: /\{\{Flag\|(Checoslováquia|Czechoslovakia)\}\}/ig,
						replace: '{{CEC}}',
						num: 100
					}, {
						name: '{{CZE}} - República Checa (2)',
						find: /\{\{Flag\|(Czech Republic)\}\}/ig,
						replace: '{{CZE}}',
						num: 100
					}, {
						name: '{{CAF}} - República Centro-Africana (2)',
						find: /\{\{Flag\|(Central African Republic)\}\}/ig,
						replace: '{{CAF}}',
						num: 100
					}, {
						name: '{{COD}} - Congo',
						find: /\{\{Flag\|(Congo)\}\}/ig,
						replace: '{{COD}}',
						num: 100
					}, {
						name: '{{CYM}} - Ilhas Cayman (2)',
						find: /\{\{Flag\|(Cayman Islands)\}\}/ig,
						replace: '{{CYM}}',
						num: 100
					}, {
						name: '{{COK}} - Ilhas Cook (2)',
						find: /\{\{Flag\|(Cook Islands)\}\}/ig,
						replace: '{{COK}}',
						num: 100
					}, {
						name: '{{KAZ}} - Cazaquistão (1)',
						find: /\{\{Flag\|(Cazaquistão)\}\}/ig,
						replace: '{{KAZ}}',
						num: 100
					}, {
						name: '{{PRK}} - Coreia do Norte (1)',
						find: /\{\{Flag\|(Cor[eé]ia do Norte)\}\}/ig,
						replace: '{{PRK}}',
						num: 100
					}, {
						name: '{{KOR}} - Coreia do Sul (1)',
						find: /\{\{Flag\|(Cor[eé]ia do Sul)\}\}/ig,
						replace: '{{KOR}}',
						num: 100
					}, {
						name: '{{CPV}} - Cabo Verde',
						find: /\{\{Flag\|(Cape Verde|Cabo Verde)\}\}/ig,
						replace: '{{CPV}}',
						num: 100
					}, {
						name: '{{CMR}} - Camarões',
						find: /\{\{Flag\|(Cameroon|Camarões)\}\}/ig,
						replace: '{{CMR}}',
						num: 100
					}, {
						name: '{{KHM}} - Camboja',
						find: /\{\{Flag\|(Cambodia|Camboja)\}\}/ig,
						replace: '{{KHM}}',
						num: 100
					}, {
						name: '{{CAN}} - Canadá',
						find: /\{\{Flag\|(Canad[aá])\}\}/ig,
						replace: '{{CAN}}',
						num: 100
					}, {
						name: '{{TCD}} - Chade',
						find: /\{\{Flag\|(Chade?)\}\}/ig,
						replace: '{{TCD}}',
						num: 100
					}, {
						name: '{{CHL}} - Chile',
						find: /\{\{Flag\|(Chile)\}\}/ig,
						replace: '{{CHL}}',
						num: 100
					}, {
						name: '{{CHN}} - China',
						find: /\{\{Flag\|(China)\}\}/ig,
						replace: '{{CHN}}',
						num: 100
					}, {
						name: '{{HKG}} - China, Hong Kong Special Administrative Region',
						find: /\{\{Flag\|(China, Hong Kong Special Administrative Region)\}\}/ig,
						replace: '{{HKG}}',
						num: 10
					}, {
						name: '{{MAC}} - China, Macao Special Administrative Region',
						find: /\{\{Flag\|(China, Macao Special Administrative Region)\}\}/ig,
						replace: '{{MAC}}',
						num: 100
					}, {
						name: '{{CYP}} - Chipre',
						find: /\{\{Flag\|(Cyprus|Chipre)\}\}/ig,
						replace: '{{CYP}}',
						num: 100
					}, {
						name: '{{COM}} - Comores',
						find: /\{\{Flag\|(Comor[eo]s)\}\}/ig,
						replace: '{{COM}}',
						num: 100
					}, {
						name: '{{COG}} - Congo',
						find: /\{\{Flag\|(Congo)\}\}/ig,
						replace: '{{COG}}',
						num: 100
					}, {
						name: '{{CIV}} - Costa do Marfim',
						find: /\{\{Flag\|(Cote d'Ivoire|Costa do Marfim)\}\}/ig,
						replace: '{{CIV}}',
						num: 100
					}, {
						name: '{{CRI}} - Costa Rica',
						find: /\{\{Flag\|(Costa Rica)\}\}/ig,
						replace: '{{CRI}}',
						num: 100
					}, {
						name: '{{CIV}} - Côte d\'Ivoire',
						find: /\{\{Flag\|(Côte d'Ivoire)\}\}/ig,
						replace: '{{CIV}}',
						num: 100
					}, {
						name: '{{HRV}} - Croácia',
						find: /\{\{Flag\|(Croácia|Croatia)\}\}/ig,
						replace: '{{HRV}}',
						num: 100
					}, {
						name: '{{CUB}} - Cuba',
						find: /\{\{Flag\|(Cuba)\}\}/ig,
						replace: '{{CUB}}',
						num: 100
					}, {
						name: '{{CUR}} - Curaçao',
						find: /\{\{Flag\|(Curaçao)\}\}/ig,
						replace: '{{CUR}}',
						num: 100
					}]
				}, {
					name: '{{Flag}} D',
					ifhas: /\{\{[Ff]lag\|D/,
					sub: [{
						name: '{{DOM}} - República Dominicana (2)',
						find: /\{\{Flag\|(Dominican Republic)\}\}/ig,
						replace: '{{DOM}}',
						num: 100
					}, {
						name: '{{DNK}} - Dinamarca',
						find: /\{\{Flag\|(Dinamarca|Denmark)\}\}/ig,
						replace: '{{DNK}}',
						num: 100
					}, {
						name: '{{DJI}} - Djibouti',
						find: /\{\{Flag\|(Djibouti)\}\}/ig,
						replace: '{{DJI}}',
						num: 100
					}, {
						name: '{{DMA}} - Dominica',
						find: /\{\{Flag\|(Dominica)\}\}/ig,
						replace: '{{DMA}}',
						num: 100
					}, {
						name: '{{COD}} - Democratic Republic of the Congo',
						find: /\{\{Flag\|(Democratic Republic of the Congo)\}\}/ig,
						replace: '{{COD}}',
						num: 100
					}, {
						name: '{{PRK}} - Democratic People\'s Republic of Korea',
						find: /\{\{Flag\|(Democratic People's Republic of Korea)\}\}/ig,
						replace: '{{PRK}}',
						num: 100
					}]
				}, {
					name: '{{Flag}} E',
					ifhas: /\{\{[Ff]lag\|E/,
					sub: [{
						name: '{{DDR}} - Alemanha Oriental (2)',
						find: /\{\{Flag\|(East Germany)\}\}/ig,
						replace: '{{DDR}}',
						num: 100
					}, {
						name: '{{TLS}} - Timor-Leste (2)',
						find: /\{\{Flag\|(East Timor)\}\}/ig,
						replace: '{{TLS}}',
						num: 100
					}, {
						name: '{{ENG}} - Inglaterra (2)',
						find: /\{\{Flag\|(England)\}\}/ig,
						replace: '{{ENG}}',
						num: 100
					}, {
						name: '{{GNQ}} - Guiné Equatorial (2)',
						find: /\{\{Flag\|(Equatorial Guinea)\}\}/ig,
						replace: '{{GNQ}}',
						num: 100
					}, {
						name: '{{ARE}} - Emirados Árabes Unidos - (1)',
						find: /\{\{Flag\|(Emirados Árabes Unidos|United Arab Emirates)\}\}/ig,
						replace: '{{ARE}}',
						num: 100
					}, {
						name: '{{SCO}} - Escócia - (1)',
						find: /\{\{Flag\|(Escócia)\}\}/ig,
						replace: '{{SCO}}',
						num: 100
					}, {
						name: '{{SVK}} - Eslováquia - (1)',
						find: /\{\{Flag\|(Eslováquia)\}\}/ig,
						replace: '{{SVK}}',
						num: 100
					}, {
						name: '{{SVN}} - Eslovênia - (1)',
						find: /\{\{Flag\|(Eslovênia)\}\}/ig,
						replace: '{{SVN}}',
						num: 100
					}, {
						name: '{{ESP}} - Espanha - (1)',
						find: /\{\{Flag\|(Espanha)\}\}/ig,
						replace: '{{ESP}}',
						num: 100
					}, {
						name: '{{FSM}} - Estados Federados da Micronésia - (1)',
						find: /\{\{Flag\|(Estados Federados da Micronésia)\}\}/ig,
						replace: '{{FSM}}',
						num: 100
					}, {
						name: '{{USA}} - Estados Unidos',
						find: /\{\{Flag\|(Estados Unidos( da América)?)\}\}/ig,
						replace: '{{USA}}',
						num: 100
					}, {
						name: '{{EGY}} - Egito',
						find: /\{\{Flag\|(Egito|Egypt)\}\}/ig,
						replace: '{{EGY}}',
						num: 100
					}, {
						name: '{{SLV}} - El Salvador',
						find: /\{\{Flag\|(El Salvador)\}\}/ig,
						replace: '{{SLV}}',
						num: 100
					}, {
						name: '{{ECU}} - Equador',
						find: /\{\{Flag\|(E[cq]uador)\}\}/ig,
						replace: '{{ECU}}',
						num: 100
					}, {
						name: '{{ERI}} - Eritreia',
						find: /\{\{Flag\|(Eritrei?a)\}\}/ig,
						replace: '{{ERI}}',
						num: 100
					}, {
						name: '{{EST}} - Estonia',
						find: /\{\{Flag\|(Est[ôo]nia)\}\}/ig,
						replace: '{{EST}}',
						num: 100
					}, {
						name: '{{ETH}} - Etiópia',
						find: /\{\{Flag\|(Etiópia|Ethiopia)\}\}/ig,
						replace: '{{ETH}}',
						num: 100
					}, {
						name: '{{EUR}} - Europa',
						find: /\{\{Flag\|(Europ[ae])\}\}/ig,
						replace: '{{EUR}}',
						num: 100
					}]
				}, {
					name: '{{Flag}} F',
					ifhas: /\{\{[Ff]lag\|F/,
					sub: [{
						name: '{{PYF}} - Polinésia Francesa (2)',
						find: /\{\{Flag\|(French Polynesia)\}\}/ig,
						replace: '{{PYF}}',
						num: 100
					}, {
						name: '{{FSM}} - Estados Federados da Micronésia - (2)',
						find: /\{\{Flag\|(Federated States of Micronesia)\}\}/ig,
						replace: '{{FSM}}',
						num: 100
					}, {
						name: '{{FRO}} - Ilhas Feroé (2)',
						find: /\{\{Flag\|(Faroe Islands)\}\}/ig,
						replace: '{{FRO}}',
						num: 100
					}, {
						name: '{{PHL}} - Filipinas (1)',
						find: /\{\{Flag\|(Filipinas)\}\}/ig,
						replace: '{{PHL}}',
						num: 100
					}, {
						name: '{{FJI}} - Fiji',
						find: /\{\{Flag\|(Fiji)\}\}/ig,
						replace: '{{FJI}}',
						num: 100
					}, {
						name: '{{FIN}} - Finlândia',
						find: /\{\{Flag\|(Finland|Finlândia)\}\}/ig,
						replace: '{{FIN}}',
						num: 100
					}, {
						name: '{{FRA}} - França',
						find: /\{\{Flag\|(Fran[cç][ea])\}\}/ig,
						replace: '{{FRA}}',
						num: 100
					}]
				}, {
					name: '{{Flag}} G',
					ifhas: /\{\{[Ff]lag\|G/,
					sub: [{
						name: '{{DEU}} - Alemanha (2)',
						find: /\{\{Flag\|(Germany)\}\}/ig,
						replace: '{{DEU}}',
						num: 100
					}, {
						name: '{{GNQ}} - Guiné Equatorial (1)',
						find: /\{\{Flag\|(Guiné Equatorial)\}\}/ig,
						replace: '{{GNQ}}',
						num: 100
					}, {
						name: '{{GAB}} - Gabão',
						find: /\{\{Flag\|(Gab[oã][no])\}\}/ig,
						replace: '{{GAB}}',
						num: 100
					}, {
						name: '{{GMB}} - Gâmbia',
						find: /\{\{Flag\|(G[aâ]mbia)\}\}/ig,
						replace: '{{GMB}}',
						num: 100
					}, {
						name: '{{GHA}} - Gana',
						find: /\{\{Flag\|(Ghana|Gana)\}\}/ig,
						replace: '{{GHA}}',
						num: 100
					}, {
						name: '{{GEO}} - Geórgia',
						find: /\{\{Flag\|(Ge[oó]rgia)\}\}/ig,
						replace: '{{GEO}}',
						num: 100
					}, {
						name: '{{GIB}} - Gibraltar',
						find: /\{\{Flag\|(Gibraltar)\}\}/ig,
						replace: '{{GIB}}',
						num: 100
					}, {
						name: '{{GRD}} - Granada',
						find: /\{\{Flag\|(Gr[ea]nada)\}\}/ig,
						replace: '{{GRD}}',
						num: 100
					}, {
						name: '{{GRC}} - Grécia',
						find: /\{\{Flag\|(Greece|Grécia)\}\}/ig,
						replace: '{{GRC}}',
						num: 100
					}, {
						name: '{{GLP}} - Guadalupe',
						find: /\{\{Flag\|(Guadalupe|Guadeloupe)\}\}/ig,
						replace: '{{GLP}}',
						num: 100
					}, {
						name: '{{GUM}} - Guam',
						find: /\{\{Flag\|(Guam)\}\}/ig,
						replace: '{{GUM}}',
						num: 100
					}, {
						name: '{{GTM}} - Guatemala',
						find: /\{\{Flag\|(Guatemala)\}\}/ig,
						replace: '{{GTM}}',
						num: 100
					}, {
						name: '{{GUY}} - Guiana',
						find: /\{\{Flag\|(Gu[iy]ana)\}\}/ig,
						replace: '{{GUY}}',
						num: 100
					}, {
						name: '{{GUF}} - Guiana Francesa',
						find: /\{\{Flag\|(Guiana Francesa)\}\}/ig,
						replace: '{{GUF}}',
						num: 100
					}, {
						name: '{{GIN}} - Guiné',
						find: /\{\{Flag\|Guin(?:ea|é)\}\}/ig,
						replace: '{{GIN}}',
						num: 100
					}, {
						name: '{{GNB}} - Guiné-Bissau',
						find: /\{\{Flag\|(Guinea\-Bissau|Guiné\-Bissau)\}\}/ig,
						replace: '{{GNB}}',
						num: 100
					}]
				}, {
					name: '{{Flag}} H',
					ifhas: /\{\{[Ff]lag\|H/,
					sub: [{
						name: '{{HTI}} - Haiti',
						find: /\{\{Flag\|(Haiti)\}\}/ig,
						replace: '{{HTI}}',
						num: 100
					}, {
						name: '{{HND}} - Honduras',
						find: /\{\{Flag\|(Honduras)\}\}/ig,
						replace: '{{HND}}',
						num: 100
					}, {
						name: '{{HKG}} - Hong Kong',
						find: /\{\{Flag\|(Hong Kong(?:\-China)?)\}\}/ig,
						replace: '{{HKG}}',
						num: 100
					}, {
						name: '{{HUN}} - Hungria',
						find: /\{\{Flag\|(Hungria|Hungary)\}\}/ig,
						replace: '{{HUN}}',
						num: 100
					}]
				}, {
					name: '{{Flag}} I',
					ifhas: /\{\{[Ff]lag\|[IÍ]/,
					sub: [{
						name: '{{YUG}} - Iugoslávia (1)',
						find: /\{\{Flag\|(Iugoslávia)\}\}/ig,
						replace: '{{YUG}}',
						num: 100
					}, {
						name: '{{AHE}} - Império Austro-Húngaro (1)',
						find: /\{\{Flag\|(Império Austro\-Húngaro)\}\}/ig,
						replace: '{{AHE}}',
						num: 100
					}, {
						name: '{{FRO}} - Ilhas Feroé (1)',
						find: /\{\{Flag\|(Ilhas Feroé)\}\}/ig,
						replace: '{{FRO}}',
						num: 100
					}, {
						name: '{{SLB}} - Ilhas Salomão (1)',
						find: /\{\{Flag\|(Ilhas Salomão)\}\}/ig,
						replace: '{{SLB}}',
						num: 100
					}, {
						name: '{{VIR}} - Ilhas Virgens Americanas (1)',
						find: /\{\{Flag\|(Ilhas Virgens Americanas)\}\}/ig,
						replace: '{{VIR}}',
						num: 100
					}, {
						name: '{{VGB}} - Ilhas Virgens Britânicas (1)',
						find: /\{\{Flag\|(Ilhas Virgens Britânicas)\}\}/ig,
						replace: '{{VGB}}',
						num: 100
					}, {
						name: '{{ENG}} - Inglaterra (1)',
						find: /\{\{Flag\|(Inglaterra)\}\}/ig,
						replace: '{{ENG}}',
						num: 100
					}, {
						name: '{{COK}} - Ilhas Cook (1)',
						find: /\{\{Flag\|(Ilhas Cook)\}\}/ig,
						replace: '{{COK}}',
						num: 100
					}, {
						name: '{{CYM}} - Ilhas Cayman (1)',
						find: /\{\{Flag\|(Ilhas Cayman)\}\}/ig,
						replace: '{{CYM}}',
						num: 100
					}, {
						name: '{{YEM}} - Iémen (1)',
						find: /\{\{Flag\|(I[êée]men)\}\}/ig,
						replace: '{{YEM}}',
						num: 100
					}, {
						name: '{{IND}} - India',
						find: /\{\{Flag\|([IÍ]ndia)\}\}/ig,
						replace: '{{IND}}',
						num: 100
					}, {
						name: '{{DEI}} - Índias Orientais Holandesas',
						find: /\{\{Flag\|(Índias Orientais Holandesas)\}\}/ig,
						replace: '{{DEI}}',
						num: 100
					}, {
						name: '{{IDN}} - Indonésia',
						find: /\{\{Flag\|(Indon[ée]sia)\}\}/ig,
						replace: '{{IDN}}',
						num: 100
					}, {
						name: '{{IRN}} - Irã',
						find: /\{\{Flag\|(Irã|Iran|Iran \(Islamic Republic of\))\}\}/ig,
						replace: '{{IRN}}',
						num: 100
					}, {
						name: '{{IRQ}} - Iraque',
						find: /\{\{Flag\|(Iraque|Iraq)\}\}/ig,
						replace: '{{IRQ}}',
						num: 100
					}, {
						name: '{{IRL}} - Irlanda',
						find: /\{\{Flag\|(Irlanda|Ireland)\}\}/ig,
						replace: '{{IRL}}',
						num: 100
					}, {
						name: '{{NIR}} - Irlanda do Norte',
						find: /\{\{Flag\|(Irlanda do Norte)\}\}/ig,
						replace: '{{NIR}}',
						num: 100
					}, {
						name: '{{ISL}} - Islândia',
						find: /\{\{Flag\|(Iceland|Islândia)\}\}/ig,
						replace: '{{ISL}}',
						num: 100
					}, {
						name: '{{ISR}} - Israel',
						find: /\{\{Flag\|(Israel)\}\}/ig,
						replace: '{{ISR}}',
						num: 100
					}, {
						name: '{{ITA}} - Itália',
						find: /\{\{Flag\|(Itália|Italy)\}\}/ig,
						replace: '{{ITA}}',
						num: 100
					}]
				}, {
					name: '{{Flag}} J',
					ifhas: /\{\{[Ff]lag\|J/,
					sub: [{
						name: '{{JAM}} - Jamaica',
						find: /\{\{Flag\|(Jamaica)\}\}/ig,
						replace: '{{JAM}}',
						num: 100
					}, {
						name: '{{JPN}} - Japáo',
						find: /\{\{Flag\|(Jap[ãa][on])\}\}/ig,
						replace: '{{JPN}}',
						num: 100
					}, {
						name: '{{JOR}} - Jordânia',
						find: /\{\{Flag\|Jord(?:an|ânia)\}\}/ig,
						replace: '{{JOR}}',
						num: 100
					}]
				}, {
					name: '{{Flag}} K',
					ifhas: /\{\{[Ff]lag\|K/,
					sub: [{
						name: '{{KAZ}} - Cazaquistão (2)',
						find: /\{\{Flag\|(Kazakhstan)\}\}/ig,
						replace: '{{KAZ}}',
						num: 100
					}, {
						name: '{{KEN}} - Quênia (2)',
						find: /\{\{Flag\|(Kenya)\}\}/ig,
						replace: '{{KEN}}',
						num: 100
					}, {
						name: '{{KGZ}} - Quirguistão (2)',
						find: /\{\{Flag\|(Kyrgyzstan)\}\}/ig,
						replace: '{{KGZ}}',
						num: 100
					}, {
						name: '{{KIR}} - Kiribati',
						find: /\{\{Flag\|(Kiribati)\}\}/ig,
						replace: '{{KIR}}',
						num: 100
					}, {
						name: '{{KOS}} - Kosovo',
						find: /\{\{Flag\|(Kosovo)\}\}/ig,
						replace: '{{KOS}}',
						num: 100
					}, {
						name: '{{KWT}} - Kuwait',
						find: /\{\{Flag\|(Kuwait)\}\}/ig,
						replace: '{{KWT}}',
						num: 100
					}]
				}, {
					name: '{{Flag}} L',
					ifhas: /\{\{[Ff]lag\|L/,
					sub: [{
						name: '{{LAO}} - Laos',
						find: /\{\{Flag\|Lao(?:s| People's Democratic Republic)\}\}/ig,
						replace: '{{LAO}}',
						num: 100
					}, {
						name: '{{LSO}} - Lesoto',
						find: /\{\{Flag\|(Lesoth?o)\}\}/ig,
						replace: '{{LSO}}',
						num: 100
					}, {
						name: '{{LVA}} - Letônia',
						find: /\{\{Flag\|(Latvia|Letônia)\}\}/ig,
						replace: '{{LVA}}',
						num: 100
					}, {
						name: '{{LBN}} - Líbano',
						find: /\{\{Flag\|(Lebanon|Líbano)\}\}/ig,
						replace: '{{LBN}}',
						num: 100
					}, {
						name: '{{LBR}} - Libéria',
						find: /\{\{Flag\|(Lib[ée]ria)\}\}/ig,
						replace: '{{LBR}}',
						num: 100
					}, {
						name: '{{LBY}} - Líbia',
						find: /\{\{Flag\|(L[íi]b[iy]a|Libyan Arab Jamahiriya)\}\}/ig,
						replace: '{{LBY}}',
						num: 100
					}, {
						name: '{{LIE}} - Liechtenstein',
						find: /\{\{Flag\|(Liechtenstein)\}\}/ig,
						replace: '{{LIE}}',
						num: 100
					}, {
						name: '{{LTU}} - Lituânia',
						find: /\{\{Flag\|(Lituânia|Lithuania)\}\}/ig,
						replace: '{{LTU}}',
						num: 100
					}, {
						name: '{{LUX}} - Luxemburgo',
						find: /\{\{Flag\|(Luxemburgo|Luxembourg)\}\}/ig,
						replace: '{{LUX}}',
						num: 100
					}]
				}, {
					name: '{{Flag}} M',
					ifhas: /\{\{[Ff]lag\|M/,
					sub: [{
						name: '{{MAC}} - Macau',
						find: /\{\{Flag\|(Macau)\}\}/ig,
						replace: '{{MAC}}',
						num: 100
					}, {
						name: '{{MKD}} - Macedônia',
						find: /\{\{Flag\|(Maced[oóô]nia)\}\}/ig,
						replace: '{{MKD}}',
						num: 100
					}, {
						name: '{{MDG}} - Madagascar',
						find: /\{\{Flag\|(Madag[áa]scar)\}\}/ig,
						replace: '{{MDG}}',
						num: 100
					}, {
						name: '{{MYS}} - Malásia',
						find: /\{\{Flag\|(Malásia|Malaysia)\}\}/ig,
						replace: '{{MYS}}',
						num: 100
					}, {
						name: '{{MWI}} - Malawi',
						find: /\{\{Flag\|(Malawi)\}\}/ig,
						replace: '{{MWI}}',
						num: 100
					}, {
						name: '{{MDV}} - Maldivas',
						find: /\{\{Flag\|(Maldiv[ae]s)\}\}/ig,
						replace: '{{MDV}}',
						num: 100
					}, {
						name: '{{MLI}} - Mali',
						find: /\{\{Flag\|(Mali)\}\}/ig,
						replace: '{{MLI}}',
						num: 100
					}, {
						name: '{{MLT}} - Malta',
						find: /\{\{Flag\|(Malta)\}\}/ig,
						replace: '{{MLT}}',
						num: 100
					}, {
						name: '{{MAR}} - Marrocos',
						find: /\{\{Flag\|(M[ao]rocco|Marrocos)\}\}/ig,
						replace: '{{MAR}}',
						num: 100
					}, {
						name: '{{MHL}} - Marshall Islands',
						find: /\{\{Flag\|(Marshall Islands)\}\}/ig,
						replace: '{{MHL}}',
						num: 100
					}, {
						name: '{{MTQ}} - Martinica',
						find: /\{\{Flag\|(Martini(?:ca|que))\}\}/ig,
						replace: '{{MTQ}}',
						num: 100
					}, {
						name: '{{MUS}} - Maurícia',
						find: /\{\{Flag\|(Maurícia|Mauritius)\}\}/ig,
						replace: '{{MUS}}',
						num: 100
					}, {
						name: '{{MRT}} - Mauritania',
						find: /\{\{Flag\|(Maurit[aâ]nia)\}\}/ig,
						replace: '{{MRT}}',
						num: 100
					}, {
						name: '{{MEX}} - México',
						find: /\{\{Flag\|(M[eé]xico)\}\}/ig,
						replace: '{{MEX}}',
						num: 100
					}, {
						name: '{{FSM}} - Micronésia',
						find: /\{\{Flag\|(Micronésia|Micronesia \(Federated States of\))\}\}/ig,
						replace: '{{FSM}}',
						num: 100
					}, {
						name: '{{MMR}} - Mianmar',
						find: /\{\{Flag\|(M[iy]anmar)\}\}/ig,
						replace: '{{MMR}}',
						num: 100
					}, {
						name: '{{MOZ}} - Moçambique',
						find: /\{\{Flag\|(Mo[zç]ambique)\}\}/ig,
						replace: '{{MOZ}}',
						num: 100
					}, {
						name: '{{MDA}} - Moldávia',
						find: /\{\{Flag\|(Moldova|Moldávia)\}\}/ig,
						replace: '{{MDA}}',
						num: 100
					}, {
						name: '{{MCO}} - Mônaco',
						find: /\{\{Flag\|(M[oôó]naco)\}\}/ig,
						replace: '{{MCO}}',
						num: 100
					}, {
						name: '{{MNG}} - Mongolia',
						find: /\{\{Flag\|(Mong[óo]lia)\}\}/ig,
						replace: '{{MNG}}',
						num: 100
					}, {
						name: '{{MNE}} - Montenegro',
						find: /\{\{Flag\|(Montenegro)\}\}/ig,
						replace: '{{MNE}}',
						num: 100
					}, {
						name: '{{MSR}} - Monserrate',
						find: /\{\{Flag\|(Monserrate|Montserrat)\}\}/ig,
						replace: '{{MSR}}',
						num: 100
					}]
				}, {
					name: '{{Flag}} N',
					ifhas: /\{\{[Ff]lag\|N/,
					sub: [{
						name: '{{DEUN}} - Alemanha Nazi (2)',
						find: /\{\{Flag\|(Nazi Germany)\}\}/ig,
						replace: '{{DEUN}}',
						num: 100
					}, {
						name: '{{PRK}} - Coreia do Norte (2)',
						find: /\{\{Flag\|(North Korea)\}\}/ig,
						replace: '{{PRK}}',
						num: 100
					}, {
						name: '{{ANT}} - Antilhas Holandesas (2)',
						find: /\{\{Flag\|(Netherlands Antilles)\}\}/ig,
						replace: '{{ANT}}',
						num: 100
					}, {
						name: '{{NLD}} - Netherlands',
						find: /\{\{Flag\|(Netherlands)\}\}/ig,
						replace: '{{NLD}}',
						num: 100
					}, {
						name: '{{NAM}} - Namíbia',
						find: /\{\{Flag\|(Nam[íi]bia)\}\}/ig,
						replace: '{{NAM}}',
						num: 100
					}, {
						name: '{{NRU}} - Nauru',
						find: /\{\{Flag\|(Nauru)\}\}/ig,
						replace: '{{NRU}}',
						num: 100
					}, {
						name: '{{NPL}} - Nepal',
						find: /\{\{Flag\|(Nepal)\}\}/ig,
						replace: '{{NPL}}',
						num: 100
					}, {
						name: '{{NIC}} - Nicaragua',
						find: /\{\{Flag\|(Nicar[aá]gua)\}\}/ig,
						replace: '{{NIC}}',
						num: 100
					}, {
						name: '{{NER}} - Níger',
						find: /\{\{Flag\|(N[íi]ger)\}\}/ig,
						replace: '{{NER}}',
						num: 100
					}, {
						name: '{{NGA}} - Nigéria',
						find: /\{\{Flag\|(Nig[ée]ria)\}\}/ig,
						replace: '{{NGA}}',
						num: 100
					}, {
						name: '{{NIU}} - Niue',
						find: /\{\{Flag\|(Niue)\}\}/ig,
						replace: '{{NIU}}',
						num: 100
					}, {
						name: '{{NOR}} - Noruega',
						find: /\{\{Flag\|(Norway|Noruega)\}\}/ig,
						replace: '{{NOR}}',
						num: 100
					}, {
						name: '{{NCL}} - Nova Caledônia',
						find: /\{\{Flag\|(Nova Caledônia)\}\}/ig,
						replace: '{{NCL}}',
						num: 100
					}, {
						name: '{{NZL}} - Nova Zelândia',
						find: /\{\{Flag\|(New Zealand|Nova Zelândia)\}\}/ig,
						replace: '{{NZL}}',
						num: 100
					}]
				}, {
					name: '{{Flag}} O',
					ifhas: /\{\{[Ff]lag\|O/,
					sub: [{
						name: '{{OMN}} - Omã',
						find: /\{\{Flag\|Om(?:an|ã)\}\}/ig,
						replace: '{{OMN}}',
						num: 100
					}, {
						name: '{{PSE}} - Occupied Palestinian Territory',
						find: /\{\{Flag\|(Occupied Palestinian Territory)\}\}/ig,
						replace: '{{PSE}}',
						num: 100
					}]
				}, {
					name: '{{Flag}} P',
					ifhas: /\{\{[Ff]lag\|P/,
					sub: [{
						name: '{{PHL}} - Filipinas (2)',
						find: /\{\{Flag\|(Philippines)\}\}/ig,
						replace: '{{PHL}}',
						num: 100
					}, {
						name: '{{WAL}} - País de Gales (1)',
						find: /\{\{Flag\|(País de Gales)\}\}/ig,
						replace: '{{WAL}}',
						num: 100
					}, {
						name: '{{NLD}} - Países Baixos (1)',
						find: /\{\{Flag\|(Países Baixos)\}\}/ig,
						replace: '{{NLD}}',
						num: 100
					}, {
						name: '{{PYF}} - Polinésia Francesa (1)',
						find: /\{\{Flag\|(Polinésia Francesa)\}\}/ig,
						replace: '{{PYF}}',
						num: 100
					}, {
						name: '{{PLW}} - Palau',
						find: /\{\{Flag\|(Palau)\}\}/ig,
						replace: '{{PLW}}',
						num: 100
					}, {
						name: '{{PSE}} - Palestina',
						find: /\{\{Flag\|(Palestin[ea])\}\}/ig,
						replace: '{{PSE}}',
						num: 100
					}, {
						name: '{{PAN}} - Panamá',
						find: /\{\{Flag\|(Panam[áa])\}\}/ig,
						replace: '{{PAN}}',
						num: 100
					}, {
						name: '{{PNG}} - Papua-Nova Guiné',
						find: /\{\{Flag\|(Papua\-Nova Guiné|Papua New Guinea)\}\}/ig,
						replace: '{{PNG}}',
						num: 100
					}, {
						name: '{{PRY}} - Paraguai',
						find: /\{\{Flag\|(Paragua[iy])\}\}/ig,
						replace: '{{PRY}}',
						num: 100
					}, {
						name: '{{PAK}} - Paquistão',
						find: /\{\{Flag\|(Paquistão|Pakistan)\}\}/ig,
						replace: '{{PAK}}',
						num: 100
					}, {
						name: '{{PER}} - Peru',
						find: /\{\{Flag\|(Peru)\}\}/ig,
						replace: '{{PER}}',
						num: 100
					}, {
						name: '{{POL}} - Polônia',
						find: /\{\{Flag\|(Pol[oôó]nia|Poland)\}\}/ig,
						replace: '{{POL}}',
						num: 100
					}, {
						name: '{{PRI}} - Porto Rico',
						find: /\{\{Flag\|(Porto Rico|Puerto Rico)\}\}/ig,
						replace: '{{PRI}}',
						num: 100
					}, {
						name: '{{PRT}} - Portugal',
						find: /\{\{Flag\|(Portugal)\}\}/ig,
						replace: '{{PRT}}',
						num: 100
					}]
				}, {
					name: '{{Flag}} Q',
					ifhas: /\{\{[Ff]lag\|Q/,
					sub: [{
						name: '{{KEN}} - Quênia (1)',
						find: /\{\{Flag\|(Quênia)\}\}/ig,
						replace: '{{KEN}}',
						num: 100
					}, {
						name: '{{KGZ}} - Quirguistão (1)',
						find: /\{\{Flag\|(Quirguistão)\}\}/ig,
						replace: '{{KGZ}}',
						num: 100
					}, {
						name: '{{QAT}} - Qatar',
						find: /\{\{Flag\|(Qatar)\}\}/ig,
						replace: '{{QAT}}',
						num: 100
					}]
				}, {
					name: '{{Flag}} R',
					ifhas: /\{\{[Ff]lag\|R/,
					sub: [{
						name: '{{DOM}} - República Dominicana (1)',
						find: /\{\{Flag\|(República Dominicana)\}\}/ig,
						replace: '{{DOM}}',
						num: 100
					}, {
						name: '{{MKD}} - Republic of Macedonia',
						find: /\{\{Flag\|(Republic of Macedonia)\}\}/ig,
						replace: '{{MKD}}',
						num: 100
					}, {
						name: '{{MDA}} - Republic of Moldova',
						find: /\{\{Flag\|(Republic of Moldova)\}\}/ig,
						replace: '{{MDA}}',
						num: 100
					}, {
						name: '{{GBR}} - Reino Unido',
						find: /\{\{Flag\|(Reino Unido)\}\}/ig,
						replace: '{{GBR}}',
						num: 100
					}, {
						name: '{{CZE}} - República Checa (1)',
						find: /\{\{Flag\|(República Checa)\}\}/ig,
						replace: '{{CZE}}',
						num: 100
					}, {
						name: '{{CAF}} - República Centro-Africana (1)',
						find: /\{\{Flag\|(República Centro\-Africana)\}\}/ig,
						replace: '{{CAF}}',
						num: 100
					}, {
						name: '{{KOR}} - Coreia do Sul (2)',
						find: /\{\{Flag\|(Republic of Korea)\}\}/ig,
						replace: '{{KOR}}',
						num: 100
					}, {
						name: '{{ROU}} - Romênia',
						find: /\{\{Flag\|(Rom[aê]nia)\}\}/ig,
						replace: '{{ROU}}',
						num: 100
					}, {
						name: '{{RWA}} - Ruanda',
						find: /\{\{Flag\|(R[wu]anda)\}\}/ig,
						replace: '{{RWA}}',
						num: 100
					}, {
						name: '{{RUS}} - Rússia',
						find: /\{\{Flag\|(R[úu]ssia|Russian Federation)\}\}/ig,
						replace: '{{RUS}}',
						num: 100
					}]
				}, {
					name: '{{Flag}} S',
					ifhas: /\{\{[Ff]lag\|S/,
					sub: [{
						name: '{{SCO}} - Escócia - (2)',
						find: /\{\{Flag\|(Scotland)\}\}/ig,
						replace: '{{SCO}}',
						num: 100
					}, {
						name: '{{YUG}} - SFR Yugoslavia',
						find: /\{\{Flag\|(SFR Yugoslavia)\}\}/ig,
						replace: '{{YUG}}',
						num: 100
					}, {
						name: '{{SVK}} - Eslováquia - (2)',
						find: /\{\{Flag\|(Slovakia)\}\}/ig,
						replace: '{{SVK}}',
						num: 100
					}, {
						name: '{{SVN}} - Eslovênia - (2)',
						find: /\{\{Flag\|(Slovenia)\}\}/ig,
						replace: '{{SVN}}',
						num: 100
					}, {
						name: '{{ESP}} - Espanha - (2)',
						find: /\{\{Flag\|(Spain)\}\}/ig,
						replace: '{{ESP}}',
						num: 100
					}, {
						name: '{{SLB}} - Ilhas Salomão (2)',
						find: /\{\{Flag\|(Solomon Islands)\}\}/ig,
						replace: '{{SLB}}',
						num: 100
					}, {
						name: '{{KOR}} - Coreia do Sul (2)',
						find: /\{\{Flag\|(South Korea)\}\}/ig,
						replace: '{{KOR}}',
						num: 100
					}, {
						name: '{{ZAF}} - África do Sul (2)',
						find: /\{\{Flag\|(South Africa)\}\}/ig,
						replace: '{{ZAF}}',
						num: 100
					}, {
						name: '{{SAU}} - Arábia Saudita (2)',
						find: /\{\{Flag\|(Saudi Arabia)\}\}/ig,
						replace: '{{SAU}}',
						num: 100
					}, {
						name: '{{URS}} - União Soviética (2)',
						find: /\{\{Flag\|(Soviet Union)\}\}/ig,
						replace: '{{URS}}',
						num: 100
					}, {
						name: '{{SCG}} - Sérvia e Montenegro',
						find: /\{\{Flag\|(Sérvia e Montenegro|Serbia and Montenegro)\}\}/ig,
						replace: '{{SCG}}',
						num: 100
					}, {
						name: '{{ASM}} - Samoa Americana (1)',
						find: /\{\{Flag\|(Samoa Americana)\}\}/ig,
						replace: '{{ASM}}',
						num: 100
					}, {
						name: '{{WSM}} - Samoa',
						find: /\{\{Flag\|(Samoa)\}\}/ig,
						replace: '{{WSM}}',
						num: 100
					}, {
						name: '{{LCA}} - Santa Lúcia',
						find: /\{\{Flag\|(Santa Lúcia|Saint Lucia)\}\}/ig,
						replace: '{{LCA}}',
						num: 100
					}, {
						name: '{{KNA}} - São Cristóvão e Névis',
						find: /\{\{Flag\|(Saint Kitts and Nevis|São Cristóvão e Névis)\}\}/ig,
						replace: '{{KNA}}',
						num: 100
					}, {
						name: '{{SMR}} - São Marinho',
						find: /\{\{Flag\|(São Marinho|San Marino)\}\}/ig,
						replace: '{{SMR}}',
						num: 100
					}, {
						name: '{{STP}} - São Tomé e Príncipe',
						find: /\{\{Flag\|(São Tomé e Príncipe|Sao Tome and Principe)\}\}/ig,
						replace: '{{STP}}',
						num: 100
					}, {
						name: '{{VCT}} - São Vicente e Granadinas',
						find: /\{\{Flag\|(São Vicente e Granadinas|Saint Vincent and the Grenadines)\}\}/ig,
						replace: '{{VCT}}',
						num: 100
					}, {
						name: '{{SEN}} - Senegal',
						find: /\{\{Flag\|(Senegal)\}\}/ig,
						replace: '{{SEN}}',
						num: 100
					}, {
						name: '{{SLE}} - Serra Leoa',
						find: /\{\{Flag\|(Sierra Leone|Serra Leoa)\}\}/ig,
						replace: '{{SLE}}',
						num: 100
					}, {
						name: '{{SRB}} - Sérvia',
						find: /\{\{Flag\|(S[ée]r[bv]ia)\}\}/ig,
						replace: '{{SRB}}',
						num: 100
					}, {
						name: '{{SYC}} - Seychelles',
						find: /\{\{Flag\|(Seychelles)\}\}/ig,
						replace: '{{SYC}}',
						num: 100
					}, {
						name: '{{SGP}} - Singapura',
						find: /\{\{Flag\|(Singapura|Singapore)\}\}/ig,
						replace: '{{SGP}}',
						num: 100
					}, {
						name: '{{SXM}} - Sint Maarten',
						find: /\{\{Flag\|(Sint Maarten)\}\}/ig,
						replace: '{{SXM}}',
						num: 100
					}, {
						name: '{{SYR}} - Síria',
						find: /\{\{Flag\|(S[íy]ria)\}\}/ig,
						replace: '{{SYR}}',
						num: 100
					}, {
						name: '{{SVK}} - Slovak Republic',
						find: /\{\{Flag\|(Slovak Republic)\}\}/ig,
						replace: '{{SVK}}',
						num: 100
					}, {
						name: '{{SOM}} - Somália',
						find: /\{\{Flag\|(Som[áa]lia)\}\}/ig,
						replace: '{{SOM}}',
						num: 100
					}, {
						name: '{{LKA}} - Sri Lanka',
						find: /\{\{Flag\|(Sri Lanka)\}\}/ig,
						replace: '{{LKA}}',
						num: 100
					}, {
						name: '{{SWZ}} - Suazilândia',
						find: /\{\{Flag\|(Suazilândia|Swaziland)\}\}/ig,
						replace: '{{SWZ}}',
						num: 100
					}, {
						name: '{{SDN}} - Sudão',
						find: /\{\{Flag\|Sud(?:an|ão)\}\}/ig,
						replace: '{{SDN}}',
						num: 100
					}, {
						name: '{{SWE}} - Suécia',
						find: /\{\{Flag\|(Suécia|Sweden)\}\}/ig,
						replace: '{{SWE}}',
						num: 100
					}, {
						name: '{{CHE}} - Suiça',
						find: /\{\{Flag\|(Switzerland|Suíça)\}\}/ig,
						replace: '{{CHE}}',
						num: 100
					}, {
						name: '{{SUR}} - Suriname',
						find: /\{\{Flag\|(Suriname)\}\}/ig,
						replace: '{{SUR}}',
						num: 100
					}, {
						name: '{{SYR}} - Syrian Arab Republic',
						find: /\{\{Flag\|(Syrian Arab Republic)\}\}/ig,
						replace: '{{SYR}}',
						num: 100
					}]
				}, {
					name: '{{Flag}} T',
					ifhas: /\{\{[Ff]lag\|T/,
					sub: [{
						name: '{{TLS}} - Timor-Leste (1)',
						find: /\{\{Flag\|(Timor\-Leste)\}\}/ig,
						replace: '{{TLS}}',
						num: 100
					}, {
						name: '{{NLD}} - The Netherlands',
						find: /\{\{Flag\|(The Netherlands)\}\}/ig,
						replace: '{{NLD}}',
						num: 100
					}, {
						name: '{{TJK}} - Tadjiquistão',
						find: /\{\{Flag\|(Tadjiquistão|Tajikistan)\}\}/ig,
						replace: '{{TJK}}',
						num: 100
					}, {
						name: '{{THA}} - Tailândia',
						find: /\{\{Flag\|(Thailand|Tailândia)\}\}/ig,
						replace: '{{THA}}',
						num: 100
					}, {
						name: '{{TPE}} - Taipé Chinesa',
						find: /\{\{Flag\|(Taipé Chinesa)\}\}/ig,
						replace: '{{TPE}}',
						num: 100
					}, {
						name: '{{TWN}} - Taiwan',
						find: /\{\{Flag\|(Taiwan)\}\}/ig,
						replace: '{{TWN}}',
						num: 100
					}, {
						name: '{{TZA}} - Tanzânia',
						find: /\{\{Flag\|(Tanz[aâ]nia)\}\}/ig,
						replace: '{{TZA}}',
						num: 100
					}, {
						name: '{{MKD}} - The former Yugoslav Republic of Macedonia',
						find: /\{\{Flag\|(The former Yugoslav Republic of Macedonia)\}\}/ig,
						replace: '{{MKD}}',
						num: 100
					}, {
						name: '{{TGO}} - Togo',
						find: /\{\{Flag\|(Togo)\}\}/ig,
						replace: '{{TGO}}',
						num: 100
					}, {
						name: '{{TKL}} - Tokelau',
						find: /\{\{Flag\|(Tokelau)\}\}/ig,
						replace: '{{TKL}}',
						num: 100
					}, {
						name: '{{TON}} - Tonga',
						find: /\{\{Flag\|(Tonga)\}\}/ig,
						replace: '{{TON}}',
						num: 100
					}, {
						name: '{{TTO}} - Trinidad e Tobago',
						find: /\{\{Flag\|(Trinidad e Tobago|Trinidad and Tobago)\}\}/ig,
						replace: '{{TTO}}',
						num: 100
					}, {
						name: '{{TUN}} - Tunísia',
						find: /\{\{Flag\|(Tun[ií]sia)\}\}/ig,
						replace: '{{TUN}}',
						num: 100
					}, {
						name: '{{TCA}} - Turcas e Caicos',
						find: /\{\{Flag\|(Turcas e Caicos|Turks and Caicos Islands)\}\}/ig,
						replace: '{{TCA}}',
						num: 100
					}, {
						name: '{{TKM}} - Turcomenistão',
						find: /\{\{Flag\|(Turcomenistão|Turkmenistan)\}\}/ig,
						replace: '{{TKM}}',
						num: 100
					}, {
						name: '{{TUR}} - Turquia',
						find: /\{\{Flag\|(Turkey|Turquia)\}\}/ig,
						replace: '{{TUR}}',
						num: 100
					}, {
						name: '{{TUV}} - Tuvalu',
						find: /\{\{Flag\|(Tuvalu)\}\}/ig,
						replace: '{{TUV}}',
						num: 100
					}]
				}, {
					name: '{{Flag}} U',
					ifhas: /\{\{[Ff]lag\|U/,
					sub: [{
						name: '{{UKR}} - Ucrânia',
						find: /\{\{Flag\|(Ucrânia|Ukraine)\}\}/ig,
						replace: '{{UKR}}',
						num: 100
					}, {
						name: '{{UGA}} - Uganda',
						find: /\{\{Flag\|(Uganda)\}\}/ig,
						replace: '{{UGA}}',
						num: 100
					}, {
						name: '{{URS}} - União Soviética (1)',
						find: /\{\{Flag\|(União Soviética)\}\}/ig,
						replace: '{{URS}}',
						num: 100
					}, {
						name: '{{ARE}} - United Arab Emirates',
						find: /\{\{Flag\|(United Arab Emirates)\}\}/ig,
						replace: '{{ARE}}',
						num: 100
					}, {
						name: '{{GBR}} - United Kingdom',
						find: /\{\{Flag\|(United Kingdom(?: of Great Britain and Northern Ireland)?)\}\}/ig,
						replace: '{{GBR}}',
						num: 100
					}, {
						name: '{{TZA}} - United Republic of Tanzania',
						find: /\{\{Flag\|(United Republic of Tanzania)\}\}/ig,
						replace: '{{TZA}}',
						num: 100
					}, {
						name: '{{USA}} - United States',
						find: /\{\{Flag\|(United States(?: of America)?)\}\}/ig,
						replace: '{{USA}}',
						num: 100
					}, {
						name: '{{VIR}} - United States Virgin Islands',
						find: /\{\{Flag\|(United States Virgin Islands)\}\}/ig,
						replace: '{{VIR}}',
						num: 100
					}, {
						name: '{{URY}} - Uruguai',
						find: /\{\{Flag\|(Urugua[iy])\}\}/ig,
						replace: '{{URY}}',
						num: 100
					}, {
						name: '{{UZB}} - Uzbequistão',
						find: /\{\{Flag\|(Uzbequistão|Uzbekistan)\}\}/ig,
						replace: '{{UZB}}',
						num: 100
					}]
				}, {
					name: '{{Flag}} V',
					ifhas: /\{\{[Ff]lag\|V/,
					sub: [{
						name: '{{VUT}} - Vanuatu',
						find: /\{\{Flag\|(Vanuatu)\}\}/ig,
						replace: '{{VUT}}',
						num: 100
					}, {
						name: '{{VAT}} - Vaticano',
						find: /\{\{Flag\|Vaticano?\}\}/ig,
						replace: '{{VAT}}',
						num: 100
					}, {
						name: '{{VEN}} - Venezuela',
						find: /\{\{Flag\|(Venezuela(?: \(Bolivarian Republic of\))?)\}\}/ig,
						replace: '{{VEN}}',
						num: 100
					}, {
						name: '{{VNM}} - Vietnã',
						find: /\{\{Flag\|Viet(?:nã|name| ?nam)\}\}/ig,
						replace: '{{VNM}}',
						num: 100
					}]
				}, {
					name: '{{Flag}} W',
					ifhas: /\{\{[Ff]lag\|W/,
					sub: [{
						name: '{{WAL}} - País de Gales (2)',
						find: /\{\{Flag\|(Wales)\}\}/ig,
						replace: '{{WAL}}',
						num: 100
					}]
				}, {
					name: '{{Flag}} Y',
					ifhas: /\{\{[Ff]lag\|Y/,
					sub: [{
						name: '{{YEM}} - Iémen (2)',
						find: /\{\{Flag\|(Y[êée]men)\}\}/ig,
						replace: '{{YEM}}',
						num: 100
					}, {
						name: '{{YUG}} - Iugoslávia (2)',
						find: /\{\{Flag\|(Yugoslavia)\}\}/ig,
						replace: '{{YUG}}',
						num: 100
					}]
				}, {
					name: '{{Flag}} Z',
					ifhas: /\{\{[Ff]lag\|Z/,
					sub: [{
						name: '{{ZAI}} - Zaire',
						find: /\{\{Flag\|(Zaire)\}\}/ig,
						replace: '{{ZAI}}',
						num: 100
					}, {
						name: '{{ZMB}} - Zâmbia',
						find: /\{\{Flag\|(Z[aâ]mbia)\}\}/ig,
						replace: '{{ZMB}}',
						num: 100
					}, {
						name: '{{ZWE}} - Zimbábue',
						find: /\{\{Flag\|(Zimbabwe|Zimbábue)\}\}/ig,
						replace: '{{ZWE}}',
						num: 100
					}]
				}]
			}, {
				name: '{{Flagicon|BRA}}',
				find: /\{\{[Ff]lagicon\|([A-Z][A-Z][A-Z]?[A-Z]?)\}\}/g,
				replace: '{{$1b}}',
				num: 100
			}, {
				name: '{{XXXx}}',
				ifhas: /\{\{[A-Z]{3,4}[a-z]?\}\}/,
				sub: [{
					name: 'Redirects {{BRA}}',
					ifhas: /\{\{[A-Z][A-Z]/,
					sub: [{
						name: 'A',
						ifhas: /\{\{A[A-Z][A-Z]/,
						sub: [{
							name: '{{ALG}}',
							find: /\{\{ALG(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/g,
							replace: '{{DZA$1}}',
							num: 100
						}, {
							name: '{{ANG}}',
							find: /\{\{ANG(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/g,
							replace: '{{AGO$1}}',
							num: 100
						}, {
							name: '{{ARU}}',
							find: /\{\{ARU(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/g,
							replace: '{{ABW$1}}',
							num: 100
						}, {
							name: '{{ASA}}',
							find: /\{\{ASA(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/g,
							replace: '{{ASM$1}',
							num: 100
						}, {
							name: '{{ALE}}',
							find: /\{\{ALE(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/ig,
							replace: '{{DEU$1}}'
						}]
					}, {
						name: 'B',
						ifhas: /\{\{B[A-Z][A-Z]/,
						sub: [{
							name: '{{BAH}}',
							find: /\{\{BAH(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/g,
							replace: '{{BHS$1}}',
							num: 100
						}, {
							name: '{{BAN}}',
							find: /\{\{BAN(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/g,
							replace: '{{BGD$1}}',
							num: 100
						}, {
							name: '{{BER}}',
							find: /\{\{BER(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/g,
							replace: '{{BMU$1}}',
							num: 100
						}, {
							name: '{{BHU}}',
							find: /\{\{BHU(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/g,
							replace: '{{BTN$1}}',
							num: 100
						}, {
							name: '{{BOT}}',
							find: /\{\{BOT(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/g,
							replace: '{{BWA$1}}',
							num: 100
						}, {
							name: '{{BRU}}',
							find: /\{\{BRU(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/g,
							replace: '{{BRN$1}}',
							num: 100
						}, {
							name: '{{BUL}}',
							find: /\{\{BUL(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/g,
							replace: '{{BGR$1}}',
							num: 100
						}]
					}, {
						name: 'C',
						ifhas: /\{\{C[A-Z][A-Z]/,
						sub: [{
							name: '{{CAY}}',
							find: /\{\{CAY(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/g,
							replace: '{{CYM$1}}',
							num: 100
						}, {
							name: '{{CHA}}',
							find: /\{\{CHA(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/g,
							replace: '{{TCD$1}}',
							num: 100
						}, {
							name: '{{CHI}}',
							find: /\{\{CHI(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/g,
							replace: '{{CHL$1}}',
							num: 100
						}, {
							name: '{{CRC}}',
							find: /\{\{CRC(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/g,
							replace: '{{CRI$1}}',
							num: 100
						}, {
							name: '{{CRO}}',
							find: /\{\{CRO(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/g,
							replace: '{{HRV$1}}',
							num: 100
						}]
					}, {
						name: 'G',
						ifhas: /\{\{G[A-Z][A-Z]/,
						sub: [{
							name: '{{GBS}}',
							find: /\{\{GBS(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/g,
							replace: '{{GNB$1}}',
							num: 100
						}, {
							name: '{{GEQ}}',
							find: /\{\{GEQ(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/g,
							replace: '{{GNQ$1}}',
							num: 100
						}, {
							name: '{{GER}}',
							find: /\{\{GER(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/g,
							replace: '{{DEU$1}}',
							num: 100
						}, {
							name: '{{GPE}}',
							find: /\{\{GPE(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/g,
							replace: '{{GLP$1}}',
							num: 100
						}, {
							name: '{{GRE}}',
							find: /\{\{GRE(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/g,
							replace: '{{GRC$1}}',
							num: 100
						}, {
							name: '{{GUA}}',
							find: /\{\{GUA(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/g,
							replace: '{{GTM$1}}',
							num: 100
						}]
					}, {
						name: 'I',
						ifhas: /\{\{I[A-Z][A-Z]/,
						sub: [{
							name: '{{INA}}',
							find: /\{\{INA(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/g,
							replace: '{{IDN$1}}',
							num: 100
						}, {
							name: '{{ING}}',
							find: /\{\{ING(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/g,
							replace: '{{ENG$1}}',
							num: 100
						}, {
							name: '{{IRE}}',
							find: /\{\{IRE(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/g,
							replace: '{{IRL$1}}',
							num: 10
						}, {
							name: '{{IRI}}',
							find: /\{\{IRI(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/g,
							replace: '{{IRN$1}}',
							num: 100
						}, {
							name: '{{ISV}}',
							find: /\{\{ISV(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/g,
							replace: '{{VIR$1}}',
							num: 100
						}, {
							name: '{{IVB}}',
							find: /\{\{IVB(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/g,
							replace: '{{VGB$1}}',
							num: 100
						}]
					}, {
						name: 'L',
						ifhas: /\{\{L[A-Z][A-Z]/,
						sub: [{
							name: '{{LAT}}',
							find: /\{\{LAT(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/g,
							replace: '{{LVA$1}}',
							num: 100
						}, {
							name: '{{LBA}}',
							find: /\{\{LBA(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/g,
							replace: '{{LBY$1}}',
							num: 100
						}, {
							name: '{{LES}}',
							find: /\{\{LES(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/g,
							replace: '{{LSO$1}}',
							num: 100
						}, {
							name: '{{LIB}}',
							find: /\{\{LIB(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/g,
							replace: '{{LBN$1}}',
							num: 100
						}]
					}, {
						name: 'M',
						ifhas: /\{\{M[A-Z][A-Z]/,
						sub: [{
							name: '{{MAD}}',
							find: /\{\{MAD(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/g,
							replace: '{{MDG$1}}',
							num: 100
						}, {
							name: '{{MAS}}',
							find: /\{\{MAS(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/g,
							replace: '{{MYS$1}}',
							num: 100
						}, {
							name: '{{MAW}}',
							find: /\{\{MAW(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/g,
							replace: '{{MWI$1}}',
							num: 100
						}, {
							name: '{{MGL}}',
							find: /\{\{MGL(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/g,
							replace: '{{MNG$1}}',
							num: 100
						}, {
							name: '{{MRI}}',
							find: /\{\{MRI(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/g,
							replace: '{{MUS$1}}',
							num: 100
						}, {
							name: '{{MYA}}',
							find: /\{\{MYA(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/g,
							replace: '{{MMR$1}}',
							num: 100
						}]
					}, {
						name: 'N',
						ifhas: /\{\{N[A-Z][A-Z]/,
						sub: [{
							name: '{{NCA}}',
							find: /\{\{NCA(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/g,
							replace: '{{NIC$1}}',
							num: 100
						}, {
							name: '{{NED}}',
							find: /\{\{NED(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/g,
							replace: '{{NLD$1}}',
							num: 100
						}, {
							name: '{{NEP}}',
							find: /\{\{NEP(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/g,
							replace: '{{NPL$1}}',
							num: 100
						}, {
							name: '{{NGR}}',
							find: /\{\{NGR(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/g,
							replace: '{{NGA$1}}',
							num: 100
						}, {
							name: '{{NIG}}',
							find: /\{\{NIG(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/g,
							replace: '{{NER$1}}',
							num: 100
						}]
					}, {
						name: 'P',
						ifhas: /\{\{P[A-Z][A-Z]/,
						sub: [{
							name: '{{PAR}}',
							find: /\{\{PAR(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/g,
							replace: '{{PRY$1}}',
							num: 100
						}, {
							name: '{{PLE}}',
							find: /\{\{PLE(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/g,
							replace: '{{PSE$1}}',
							num: 100
						}, {
							name: '{{POR}}',
							find: /\{\{POR(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/g,
							replace: '{{PRT$1}}',
							num: 100
						}, {
							name: '{{PUR}}',
							find: /\{\{PUR(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/g,
							replace: '{{PRI$1}}',
							num: 100
						}]
					}, {
						name: 'S',
						ifhas: /\{\{S[A-Z][A-Z]/,
						sub: [{
							name: '{{SAM}}',
							find: /\{\{SAM(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/g,
							replace: '{{WSM$1}}',
							num: 100
						}, {
							name: '{{SEY}}',
							find: /\{\{SEY(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/g,
							replace: '{{SYC$1}}',
							num: 100
						}, {
							name: '{{SIN}}',
							find: /\{\{SIN(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/g,
							replace: '{{SGP$1}}',
							num: 100
						}, {
							name: '{{SKN}}',
							find: /\{\{SKN(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/g,
							replace: '{{KNA$1}}',
							num: 100
						}, {
							name: '{{SOL}}',
							find: /\{\{SOL(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/g,
							replace: '{{SLB$1}}',
							num: 100
						}, {
							name: '{{SRI}}',
							find: /\{\{SRI(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/g,
							replace: '{{LKA$1}}',
							num: 100
						}, {
							name: '{{SUD}}',
							find: /\{\{SUD(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/g,
							replace: '{{SDN$1}}',
							num: 100
						}, {
							name: '{{SUI}}',
							find: /\{\{SUI(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/g,
							replace: '{{CHE$1}}',
							num: 100
						}]
					}, {
						name: 'T',
						ifhas: /\{\{T[A-Z][A-Z]/,
						sub: [{
							name: '{{TAH}}',
							find: /\{\{TAH(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/g,
							replace: '{{PYF$1}}',
							num: 100
						}, {
							name: '{{TAN}}',
							find: /\{\{TAN(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/g,
							replace: '{{TZA$1}}',
							num: 100
						}, {
							name: '{{TGA}}',
							find: /\{\{TGA(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/g,
							replace: '{{TON$1}}',
							num: 100
						}, {
							name: '{{TRI}}',
							find: /\{\{TRI(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/g,
							replace: '{{TTO$1}}',
							num: 100
						}]
					}, {
						name: 'Rule',
						ifhas: /\{\{[DEHKORUVZ][A-Z]/,
						sub: [{
							name: 'D',
							sub: [{
								name: '{{DEN}}',
								find: /\{\{DEN(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/g,
								replace: '{{DNK$1}}',
								num: 100
							}]
						}, {
							name: 'E',
							sub: [{
								name: '{{EQG}}',
								find: /\{\{EQG(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/g,
								replace: '{{GNQ$1}}',
								num: 100
							}, {
								name: '{{EUA}}',
								find: /\{\{EUA(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/g,
								replace: '{{USA$1}}',
								num: 10
							}]
						}, {
							name: 'H',
							sub: [{
								name: '{{HAI}}',
								find: /\{\{HAI(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/g,
								replace: '{{HTI$1}}',
								num: 10
							}, {
								name: '{{HON}}',
								find: /\{\{HON(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/g,
								replace: '{{HND$1}}',
								num: 10
							}, {
								name: '{{HOL}}',
								find: /\{\{HOL(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/g,
								replace: '{{NLD$1}}',
								num: 10
							}]
						}, {
							name: 'K',
							sub: [{
								name: '{{KSA}}',
								find: /\{\{KSA(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/g,
								replace: '{{SAU$1}}',
								num: 100
							}, {
								name: '{{KUW}}',
								find: /\{\{KUW(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/g,
								replace: '{{KWT$1}}',
								num: 100
							}]
						}, {
							name: 'O',
							sub: [{
								name: '{{OMA}}',
								find: /\{\{OMA(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/g,
								replace: '{{OMN$1}}',
								num: 100
							}]
						}, {
							name: 'R',
							sub: [{
								name: '{{RSA}}',
								find: /\{\{RSA(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/g,
								replace: '{{ZAF$1}}',
								num: 100
							}]
						}, {
							name: 'U',
							sub: [{
								name: '{{UAE}}',
								find: /\{\{UAE(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/g,
								replace: '{{ARE$1}}',
								num: 100
							}, {
								name: '{{URU}}',
								find: /\{\{URU(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/g,
								replace: '{{URY$1}}',
								num: 100
							}, {
								name: '{{UK}}',
								find: /\{\{UK(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/g,
								replace: '{{GBR$1}}',
								num: 100
							}]
						}, {
							name: 'V',
							sub: [{
								name: '{{VAN}}',
								find: /\{\{VAN(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/g,
								replace: '{{VUT$1}}',
								num: 100
							}, {
								name: '{{VIE}}',
								find: /\{\{VIE(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/g,
								replace: '{{VNM$1}}',
								num: 100
							}, {
								name: '{{VIN}}',
								find: /\{\{VIN(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/g,
								replace: '{{VCT$1}}',
								num: 100
							}]
						}, {
							name: 'Z',
							sub: [{
								name: '{{ZAM}}',
								find: /\{\{ZAM(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/g,
								replace: '{{ZMB$1}}',
								num: 100
							}, {
								name: '{{ZIM}}',
								find: /\{\{ZIM(b[bk]?|f[hs]?|ih|r7?|vb|wf)?\}\}/g,
								replace: '{{ZWE$1}}',
								num: 100
							}]
						}]
					}]
				}, {
					name: '{{XXXb|tamanho=xxx}}',
					find: /\{\{([A-Z]{2,3}b)\|(?:imagem_tamanho|tamanho) *= *(?:2[0-2]|1[7-9])px\}\}/g,
					replace: '{{$1}}'
				}, {
					name: 'Negrito de {{BRAb}}',
					find: /'''?(\{\{[A-Z]{3,3}b\}\})'?''/g,
					replace: '$1'
				}, {
					name: '{{XXXn}}',
					sub: [{
						name: '{{USAn}}',
						find: /\{\{USAb\}\} \[\[Estadunidense\]\]/g,
						replace: '{{USAn}}'
					}]
				}]
			}]
		}, {
			name: '----',
			sub: [{
				name: '---- antes seção/ref-section',
				find: /(\r?\n)+\-+(\r?\n)+(║|\{\{Ref\-section|\{\{Reflist)/ig,
				replace: '\n\n$3',
				num: 10
			}, {
				name: '---- depois seção/ref-section',
				find: /(\=|\{\{Ref\-section.*|\{\{Reflist.*)(?:\r?\n)+\-+(?:\r?\n)+/ig,
				replace: '$1\n\n',
				num: 10
			}, {
				name: '{{Info',
				find: /\-{4,}(\r?\n)+\{\{Info/ig,
				replace: '{{Info'
			}]
		}, {
			name: 'Texto',
			sub: [{
				name: 'Parágrafos',
				ifnot: /(<(blockquote|code|gallery|math|timeline|pre|poem|nowiki|quote|source)|\{\{(Citação|Quim))/i,
				sub: [{
					name: 'Separando . \n Maiuscula',
					find: /\.\r?\n((?:\[\[[^\|\[\]\n]\]+\|)?[A-Z])/g,
					replace: '.\n\n$1'
				}, {
					name: 'Par. na mesma linha',
					find: /([a-záàâãéêíóôõú,])(\r?\n)([a-záàâãéêíóôõú])/g,
					replace: '$1 $3'
				}, {
					name: 'juntando parag com .,',
					find: /([^\n])\r?\n([\.,])([^\.][^\.])/ig,
					replace: '$1$2$3'
				}, {
					name: 'Par. inicio espaço',
					find: /\.\r?\n +([A-Z])/ig,
					replace: '.\n\n$1'
				}]
			}, {
				name: 'kg',
				find: /([0-9]) *Kgs?([^a-z])/ig,
				replace: '$1&nbsp;kg$2',
				num: 100
			}, {
				name: 'Vírgula em alturas',
				find: /([0-9])[\.,]([0-9][0-9]) *m/g,
				replace: '$1,$2 m',
				num: 100
			}, {
				name: 'Datas',
				sub: [{
					name: 'Vírgula em datas',
					find: /\[\[ *([0-9][0-9]? de [^\]]*) *\]\], ?\[\[ *([0-9]{0,4}) *\]\]/ig,
					replace: '[[$1]] de [[$2]]',
					num: 100
				}, {
					name: 'LI em "dia de mês"',
					find: /\[\[([0-3]?[0-9])\]\] de \[\[((?:jan|fever)eiro|março|abril|maio|ju[nl]ho|agosto|(?:setem|outu|novem|dezem)bro)\]\]/ig,
					replace: '[[$1 de $2]]'
				}]
			}, {
				name: 'Espaçamento',
				ifnot: /(<(blockquote|code|gallery|math|timeline|pre|poem|nowiki|quote|source)|\{\{(Citação|Quim))/i,
				sub: [{
					name: 'Retirar espaçamento 1',
					sub: [{
						name: '0 após \n :',
						find: /\r?\n(:+) +/ig,
						replace: '\n$1',
						num: 100
					}, {
						name: '<ref | <br />',
						find: / +(<ref|<br \/>)/g,
						replace: '$1',
						num: 100
					}, {
						name: '1 entre letra [',
						find: /([a-z]) {2,}(\[)/g,
						replace: '$1 $2',
						num: 100
					}, {
						name: '1 após ]]',
						find: /(\]\]) {2,}/g,
						replace: '$1 ',
						num: 100
					}, {
						name: 'Fim de parag',
						find: / +\r?\n/g,
						replace: '\n',
						num: 100
					}]
				}, {
					name: 'Retirar espaçamento problema ficheiro',
					ifnot: /(imagem *= *[^ \r\n]|[╠▒])/i,
					sub: [{
						name: '1 entre )  e  ln',
						find: /\) {2}([a-z0-9])/ig,
						replace: ') $1',
						num: 100
					}, {
						name: '0 antes de pontuação ]',
						find: / +([\,\.\?:\;\]\)])/g,
						replace: '$1',
						num: 100
					}, {
						name: '0 antes de !',
						find: / +!([^!])/ig,
						replace: '!$1',
						num: 100
					}, {
						name: '0 após ([',
						find: /([\(\[]) +/g,
						replace: '$1',
						num: 100
					}, {
						name: '1 após pontuacao',
						find: /(\,\.\!\?:\;<) {2,}/g, // FIXME: /([,.!?:;<]) {2,}/ ?
						replace: '$1 ',
						num: 100
					}, {
						name: '1 entre letra',
						find: /([a-zA-ZàáéÉóÓúÚ\]\.]) {2,}([a-zA-ZàáéÉóÓúÚ\[\.])/ig,
						replace: '$1 $2',
						num: 100
					}, {
						name: '0 após -',
						find: /(- ) +/g,
						replace: '$1',
						num: 100
					}]
				}, {
					name: '|]]',
					find: /\|\]\]/g,
					replace: '| ]]'
				}, {
					name: '{{Lang - en|',
					find: /(\{\{Lang) \- ([a-z]{2,2}\|)/ig,
					replace: '$1-$2'
				}]
			}, {
				name: 'Entre noinclude',
				ifhas: 'noinclude>', // FIXME: /noinclude>/i ?
				sub: [{
					name: 'Marca </noinclude>',
					find: /<\/noinclude>/ig,
					replace: '┼',
					num: 5
				}, {
					name: 'Retira',
					find: /<noinclude>[^┼]*┼/ig,
					replace: '',
					num: 5
				}, {
					name: 'Desmarca </noinclude>',
					find: /┼/g,
					replace: '</noinclude>'
				}]
			}, {
				name: 'Ortografia',
				sub: [{
					name: 'ç',
					ifhas: /ç/i,
					sub: [{
						name: 'ofereçe',
						find: /([^a-z])([Oo])fereçe([^a-z])/g,
						replace: '$1$2ferece$3',
						num: 10
					}, {
						name: 'voçe',
						find: /([^a-z])([Vv])oçe([^a-z])/g,
						replace: '$1$2ocê$3',
						num: 10
					}]
				}]
			}, {
				name: 'Não enciclopédico',
				sub: [{
					name: 'Rule',
					find: /Telefones?:┼? *([0-9]{4,4}\-[0-9]{4,4}|[0-9]{7,8}) *\/?/ig,
					replace: 'Telefone:┼',
					num: 100
				}, {
					name: 'Rule',
					find: /Telefone:┼/g,
					replace: '',
					num: 100
				}]
			}]
		}, {
			name: 'Seções',
			ifhas: '║=',
			sub: [{
				name: 'Mudando nível da seção',
				sub: [{
					name: 'Seção1',
					sub: [{
						name: '=\\=',
						find: /\n║=([^=\n]+)=\r?\n/ig,
						replace: '\n║==$1==\n'
					}, {
						name: '=\\==',
						find: /\n║=([^=\n]+)==\r?\n/ig,
						replace: '\n║==$1==\n'
					}, {
						name: '==\\=',
						find: /\n║==([^=\n]+)=\r?\n/ig,
						replace: '\n║==$1==\n'
					}]
				}, {
					name: 'Seção5 sem seção4',
					find: /║=(={4,}.*={4,})=/ig,
					replace: '║$1',
					num: 10,
					ifnot: /\n║====[^=]/i
				}, {
					name: 'Seção4 sem seção3',
					find: /║=(={3,}.*={3,})=/ig,
					replace: '║$1',
					num: 10,
					ifnot: /\n║===[^=]/i
				}, {
					name: 'Seção3 sem seção2',
					find: /║=(={2,}.*={42,})=/ig,
					replace: '║$1',
					num: 10,
					ifnot: /\n║==[^=]/i
				}]
			}, {
				name: 'Primeira seção',
				find: /(╩\r?\n║)=== (.*) ===\r?\n/ig,
				replace: '$1== $2 ==\n'
			}, {
				name: 'Quebra de linha',
				sub: [{
					name: '\n antes de seção',
					find: /([^\=\n])\r?\n║/ig,
					replace: '$1\n\n║'
				}, {
					name: '\n depois de seção',
					find: /(║==+ [^\=]+ ==+)([^ \=\r\n])/ig,
					replace: '$1\n$2'
				}]
			}, {
				name: 'Arrumando cabeçalho',
				num: 10,
				sub: [{
					name: 'Negrito em títulos de seções',
					find: /\r?\n(║\=+ )([^\n\=]*[^'])'{3,3}/ig,
					replace: '\n$1$2',
					num: 10
				}, {
					name: 'Big em títulos de seções',
					find: /\r?\n(║\=+ )([^\n\=]*)<big>([^\n\=]*)<\/big>([^\n\=]*)( \=+)\r?\n/ig,
					replace: '\n$1$2$3$4$5\n',
					num: 10
				}]
			}, {
				name: 'Retirando : e . de título',
				sub: [{
					name: 'Retirando dois pontos de título',
					find: /(║\=+ .*[^\.][^\.])[:\.]( *=+\r?\n)/ig,
					replace: '$1$2',
					num: 100
				}]
			}, {
				name: 'Nome',
				sub: [{
					name: '==Referências Bibliográficas==',
					find: /║== Referências Bibliográficas ==/g,
					replace: '║== Referências bibliográficas =='
				}]
			}, {
				name: '== Introdução ==',
				find: /║== Introdução ==\r?\n/ig,
				replace: ''
			}, {
				name: 'Seção duplicada',
				find: /(║== ([^\r\n]+) ==(?:\r?\n)+)║== \2 ==\r?\n/ig,
				replace: '$1'
			}, {
				enabled: false,
				name: 'Seção sem conteúdo',
				sub: [{
					name: 'Inserindo invisível',
					sub: [{
						name: 'ocultando seção 1',
						find: /([\n╗]║=[^=\n]+=\n)(\n*║=[^=]|\n*\[\[Categoria:)([^╔╗░]+[╔░])/ig,
						replace: '╔$1╗$2$3',
						num: 10
					}, {
						name: 'ocultando seção 2',
						find: /([\n╗]║==[^=\n]+==\n)(\n*║={1,2}[^=]|\n*\[\[Categoria:)([^╔╗░]+[╔░])/ig,
						replace: '╔$1╗$2$3',
						num: 10
					}, {
						name: 'ocultando seção 3',
						find: /([\n╗]║===[^=\n]+===\n)(\n*║={1,3}[^=])([^╔╗░]+[╔░])/ig,
						replace: '╔$1╗$2$3',
						num: 10
					}, {
						name: 'ocultando seção 4',
						find: /([\n╗]║====[^=\n]+====\n)(\n*║={1,4}[^=])([^╔╗░]+[╔░])/ig,
						replace: '╔$1╗$2$3',
						num: 10
					}, {
						name: 'ocultando seção 5',
						find: /([\n╗]║=====[^=\n]+=====\n)(\n*║={1,5}[^=])([^╔╗░]+[╔░])/ig,
						replace: '╔$1╗$2$3',
						num: 10
					}]
				}, {
					name: 'Rule',
					find: /╔╗/g,
					replace: '',
					num: 100
				}, {
					name: 'Rule',
					find: /║== Mortes ==/g,
					replace: '║== Falecimentos =='
				}, {
					name: 'Rule',
					find: /╗║== Falecimentos ==(\n*(?:\{[^\|]|\[))/ig,
					replace: '║== Falecimentos ==\n╗$1'
				}, {
					name: 'Rule',
					find: /╗║==/ig,
					replace: '╗\n║=='
				}, {
					name: 'Rule',
					find: /╗(?:\r?\n)*(║=+[^=\n]+=+)╔/ig,
					replace: '$1',
					num: 10
				}, {
					name: 'Rule',
					find: /╔\n║==/g,
					replace: '╔\n\n║=='
				}]
			}]
		}, {
			name: 'Seção destaque',
			num: 100,
			sub: [{
				name: 'Retirando : final de seção destaque',
				find: /\n(;+) (.+):\r?\n/ig,
				replace: '\n$1 $2\n'
			}, {
				name: 'Seção destaque com linha antes',
				find: /([^\n=])\r?\n(\; [a-z])/ig,
				replace: '$1\n\n$2'
			}, {
				name: 'Seção destaque com linha depois',
				find: /\r?\n;(.*)(\r?\n){2,}/ig,
				replace: '\n;$1\n'
			}]
		}, {
			name: 'Vandalismo',
			num: 10,
			sub: [{
				name: 'Assinatura',
				find: /\-\-\[\[Special:Contributions\/.*\(UTC\)(\r?\n)?/ig,
				replace: '',
				num: 10
			}, {
				name: '== Texto de cabeçalho ==',
				find: /║\=\= *Texto de cabeçalho *\=\=(\r?\n)?/ig,
				replace: '',
				num: 10
			}, {
				name: '\'\'\'Inserir texto não-formatado aqui\'\'\'',
				find: /(''+|<[^>\n]+>)Inserir texto não\-formatado aqui(<\/[^>\n]+>|''+)?(\r?\n)?/ig,
				replace: '',
				num: 10
			}, {
				name: '[[Ficheiro:Exemplo.jpg]]',
				find: /\[\[(Ficheiro|Media):Exemplo\.(jpg|ogg)▒\]\](\r?\n)?/ig,
				replace: '',
				num: 10
			}, {
				name: '<math>Inserir fórmula aqui</math>',
				find: /<math>Inserir fórmula aqui<\/math>(\r?\n)?/ig,
				replace: '',
				num: 10
			}, {
				name: '<gallery> exemplo',
				find: /<gallery>\nFicheiro:Air\.canada\.b767-300\.c-ggfj\.2\.jpg|\[\[Avião\]\]\nFicheiro:Mona Lisa\.jpg|\[\[Mona Lisa\]\]\nFicheiro:Albert Einstein Head\.jpg|\[\[Albert Einstein \]\]\n<\/gallery>(\r?\n)?/ig,
				replace: '',
				num: 10
			}, {
				name: '#REDIRECT [[Título da ligação]]',
				find: /#REDIRECT \[\[Título da ligação\]\](\r?\n)?/ig,
				replace: ''
			}, {
				name: '[[Título do link]]',
				find: /\[\[Título do link\]\](\r?\n)?/ig,
				replace: '',
				num: 10
			}, {
				name: '[http://www.example.com ligação externa]',
				find: /\[http:\/\/www.example\.com ligação externa\](\r?\n)?/ig,
				replace: '',
				num: 10
			}, {
				name: '<!-- Comentário -->',
				find: /<!\-\- Comentário \-\->(\r?\n)?/ig,
				replace: '',
				num: 10
			}, {
				name: '[editar]',
				find: /\[editar\] */ig,
				replace: ''
			}]
		}]
	}, {
		name: 'Parte REF VT LE',
		ifnot: /▓(Wikipedia|Ficheiro|MediaWiki|Predefinição|Ajuda|Categoria|Portal)( Discussão)?:/i,
		sub: [{
			name: 'Colchetes em url',
			sub: [{
				name: 'Url sem título',
				find: /\n([\*\#] )?(https?:\/\/[^ \r\n]+)\r?\n/ig,
				replace: '\n$1[$2├\n',
				num: 10
			}]
		}, {
			name: 'Correlatos',
			sub: [{
				name: 'Correlatos antigos',
				sub: [{
					name: 'Rule',
					find: /\{\{Commons1\|[^{}\n]*\}\}\r?\n/ig,
					replace: '',
					ifhas: /[{\|] *Commons(cat)? *[\|=]/i
				}, {
					name: 'Rule',
					find: /(\{\{Commons)1(\|[^{}\n]*\}\}\r?\n)/ig,
					replace: '$1$2'
				}]
			}, {
				name: 'Commonscat',
				find: /\{\{ *commons *\| *:? *category *:/ig,
				replace: '{{commonscat|',
				num: 100
			}, {
				name: 'Termina correlatos',
				find: /\{\{ *termina correlatos *\}\} *\n?/ig,
				replace: '}}\n',
				num: 100
			}, {
				name: 'Correlato',
				find: /\{\{ *projec?to correlato *\|([^\|]*)\| *:? *category?i?a?:/ig,
				replace: '{{correlato|$1cat|',
				num: 100
			}, {
				name: 'Correlato item 1',
				find: /\{\{ *projec?to correlato *\|([^\|]*)\|([^\}]*)\}\} *\n?/ig,
				replace: '|$1=$2\n',
				num: 100
			}, {
				name: 'Correlato categoria',
				find: /\{\{ *correlato *[\|\/]([^\|]*)\| *:? *category?i?a?:/ig,
				replace: '{{correlato|$1cat|',
				num: 100
			}, {
				name: 'Correlato item 2',
				find: /\{\{ *correlato *[\|\/]([^\|]*)\|([^\}]*)\}\} *\n?/ig,
				replace: '|$1=$2\n',
				num: 100
			}, {
				name: 'Começa correlatos',
				find: /\{\{ *começa correlatos *\}\} *\n?/ig,
				replace: '{{correlatos\n',
				num: 100
			}]
		}, {
			name: 'Marcando',
			sub: [{
				name: 'Marcando </ref>',
				find: /<\/ref>/g,
				replace: '┼'
			}, {
				name: 'Marcando ] 1',
				find: /([^\]])\]\]\]([^\]])/g,
				replace: '$1]]├$2'
			}, {
				name: 'Marcando ] 2',
				find: /([^\]])\]([^\]])/g,
				replace: '$1├$2'
			}]
		}, {
			name: 'Língua',
			sub: [{
				name: '([[Língua portuguesa|pt]])',
				find: /\(\[\[Língua .+\|([a-z][a-z])\]\]\)/g,
				replace: '{{$1}}'
			}, {
				name: '({{en}})',
				find: /((?:<ref>|[\*\#])[^┼\r\n]*[^\|])\((em )?(\[\[)?inglês(\]\])?\)/ig,
				replace: '$1({{en}})'
			}, {
				name: '({{es}})',
				find: /((?:<ref>|[\*\#])[^┼\r\n]*[^\|])\((em )?(\[\[)?espanhol(\]\])?\)/ig,
				replace: '$1({{es}})'
			}, {
				name: '({{pt}})',
				find: /((?:<ref>|[\*\#])[^┼\r\n]*[^\|])\((em )?(\[\[)?português(\]\])?\)/ig,
				replace: '$1({{pt}})'
			}, {
				name: '({{de}})',
				find: /((?:<ref>|[\*\#])[^┼\r\n]*[^\|])\((em )?(\[\[)?alemão(\]\])?\)/ig,
				replace: '$1({{de}})'
			}, {
				name: '({{de}})',
				find: /((?:<ref>|[\*\#])[^┼\r\n]*[^\|])\((em )?(\[\[)?italiano(\]\])?\)/ig,
				replace: '$1({{it}})'
			}, {
				name: 'icon}}',
				find: /\{\{([a-z][a-z]) icon\}\}/g,
				replace: '{{$1}}'
			}, {
				name: 'retirando () de {{ (( pt )) }}',
				find: /\{\{\ *\(\( *([a-z][a-z]) *\)\) *\}\}/g,
				replace: '{{$1}}',
				num: 100
			}, {
				name: 'retirando () de ( {{ pt }} )',
				find: /\( *(\{\{[a-z][a-z]\}\}) *\)/g,
				replace: '$1',
				num: 100
			}]
		}, {
			name: 'Arrumando url',
			sub: [{
				name: 'Arrumando Colchetes em Links',
				find: /([^\[])\[{2,}(https?:\/\/[^\[\]}\n]+)\]{2,}([^\]])/ig,
				replace: '$1[$2]$3'
			}, {
				name: 'http://http://',
				find: /(?:https?:)?\/\/ *(https?:)?\/\//g,
				replace: '$1//',
				num: 100
			}]
		}, {
			name: 'Bibliografia',
			sub: [{
				name: 'Seção Bibliografia',
				find: /\= *\{\{ *Bibliografia *\}\} *\=/ig,
				replace: '= Bibliografia ='
			}, {
				name: 'ISBN',
				num: 10,
				sub: [{
					name: 'Rule',
					find: /\[\[ISBN\|(ISBN[^\n\]]*)\]\]/g,
					replace: '$1'
				}, {
					name: '(ISBN-10) ISBN n',
					find: /(\(? *\[?\[?ISBN\]?\]? *[\-:] *1[03] *\)? *:? *)?\[?\[?ISBN?\]?\]? * *(1[03])? *?[\-:]? *(1[03])? *[\-:]? ([0-9\-x]{3,5})/g,
					replace: 'ISBN $4'
				}, {
					name: 'Retirando small',
					find: /<small> *(ISBN *[^<\n]{9,17}) *<\/small>/ig,
					replace: '$1'
				}]
			}]
		}, {
			name: 'Referências citadas',
			sub: [{
				name: 'Tag ref',
				ifhas: '<ref',
				sub: [{
					name: 'Arrow <ref name==>',
					find: /<ref name=*>/ig,
					replace: '<ref>',
					num: 100
				}, {
					name: '<ref><ref>',
					find: /<ref><ref>/g,
					replace: '<ref>'
				}, {
					name: '<ref></ref>',
					find: /<ref>┼/g,
					replace: ''
				}, {
					name: '</ref></ref>',
					find: /┼┼/g,
					replace: '┼'
				}, {
					name: '</ref><ref>',
					find: /┼\n+(<ref(?:>| name=))/g,
					replace: '┼$1'
				}, {
					name: 'quebra de linha 1',
					find: /<ref>(\r?\n)+/ig,
					replace: '<ref>'
				}, {
					name: 'quebra de linha 2',
					find: /(\r?\n)+┼/ig,
					replace: '┼'
				}, {
					name: 'quebra de linha 3',
					find: /(<ref[^┼\r\n]*)(?:\r?\n)+([^<>┼\r\n]*┼)/ig,
					replace: '$1 $2',
					num: 100
				}, {
					name: '<ref>http',
					find: /<ref>(http[^┼]*)┼/g,
					replace: '<ref>[$1├┼'
				}, {
					name: 'Ref 1 em cada linha, novo formato',
					find: /┼<ref name=/ig,
					replace: '┼\n<ref name=',
					num: 10,
					ifhas: /(<\/references>|\{\{Referências[^{}]*\| *refs *=)/i
				}, {
					name: '<ref name=xxx></ref>',
					find: /(<ref name=[^>\n]+)><\/ref>/ig,
					replace: '$1/>'
				}, {
					name: 'Inserindo ] no final de REF',
					find: /(<ref[^>\n]*>\[https?:[^├┼\[\]\n]*)┼/ig,
					replace: '$1├┼'
				}]
			}, {
				name: 'Espaço após ref',
				sub: [{
					name: 'Espaço após ref 1',
					find: /(<\/ref>|<ref name=[^>\n]*\/>)([^ <\r\n\.\,\!\?:\)\]\}▒])/ig,
					replace: '$1 $2',
					num: 100
				}, {
					name: 'Espaço após ref 2',
					find: /(<\/ref>|<ref name=[^>\n]*\/>) +</ig,
					replace: '$1<',
					num: 100
				}]
			}]
		}, {
			name: 'Referências gerais',
			sub: [{
				name: 'Padronizando Nome e Predefs',
				sub: [{
					name: 'Padronizando ==Referências==',
					find: /\= *Refer[êe]nc(?:e|ia)s? (gerais)? *\=/ig,
					replace: '= Referências =',
					num: 100
				}, {
					name: 'Padronizando Reflist',
					find: /\{\{ *reflist *\}\}/ig,
					replace: '{{Reflist}}'
				}, {
					name: 'Padronizando <references />',
					find: /<references\/>/g,
					replace: '<references />'
				}, {
					name: '== Fontes ==',
					find: /(║=+) Fontes (=+)\r?\n(<refer|\{\{Referências|\{\{Ref-section|\{\{Reflist)/ig,
					replace: '$1 Referências $2\n$3'
				}]
			}, {
				name: 'Rule',
				find: /([^\r\n])(<references \/>|\{\{Reflist|\{\{Referências)/ig,
				replace: '$1\n$2',
				num: 10
			}, {
				name: 'Passando para {{Reflist}}',
				sub: [{
					name: 'Reflist 1',
					find: /<references *\/>/ig,
					replace: '{{Reflist}}'
				}, {
					name: 'Reflist 2',
					find: /< *small *>(?:\r?\n)*\{\{reflist\}\}(?:\r?\n)*< *\/small *>/ig,
					replace: '{{reflist}}',
					num: 10
				}, {
					name: 'Reflist 3',
					find: /<div class='references-small'>(\r?\n)*\{\{reflist\}\}\n*<\/div>/ig,
					replace: '{{reflist}}'
				}, {
					name: 'Reflist 4',
					find: /<div[^<>\n]*>(?:\r?\n)*\{\{reflist\}\}(?:\r?\n)*<\/div>/ig,
					replace: '{{reflist}}'
				}]
			}, {
				name: 'Passando para {{Referências}}',
				ifnot: /┼(\r?\n)*<\/references>/i,
				sub: [{
					name: 'Seção com reflist',
					sub: [{
						name: '<small>{{Reflist}}</small>',
						find: /< *small *>(?:\r?\n)*\{\{reflist\}\}(?:\r?\n)*< *\/small *>/ig,
						replace: '{{Reflist}}'
					}, {
						name: '{{ref-section|Notas}} 2',
						find: /║== Notas( e referências)? ==(?:\r?\n)*\{\{Reflist\}\}/ig,
						replace: '{{Referências|Notas e referências}}',
						num: 10
					}, {
						name: '{{ref-section|Notas}} 3',
						find: /║\=+ Notas \=+ *(?:\r?\n)* *\{\{Reflist\}\}/ig,
						replace: '{{Referências|Notas e referências}}',
						num: 10
					}, {
						name: '{{ref-list}}',
						find: /(?:\r?\n){2,}\{\{ref\-list\}\}/ig,
						replace: '\n\n{{Referências}}',
						num: 10
					}, {
						name: '{{Reflist|1}}',
						find: /║\=\=+ *Referências? *\=+\= *(?:\r?\n)*\{\{Reflist(\|[0-9]+)?\}\}/ig,
						replace: '{{Referências$1}}',
						num: 10
					}, {
						name: 'Rule',
						find: /\n║\=+ Referências \=+\r?\n(\{\{commonscat\|[^{}\n]*\}\})\r?\n\{\{Reflist\}\}/ig,
						replace: '\n{{Referências}}\n$1'
					}, {
						name: '{{Reflist}} sem seção',
						find: /(╚[^░║]+)\{\{Reflist(.*)\}\}/ig,
						replace: '$1{{Referências$2}}'
					}, {
						name: 'Rule',
						find: /(\{\{(?:Ref\-section|Referências)\|)([0-9]+\}\})/ig,
						replace: '$1col=$2'
					}]
				}, {
					name: 'Seção com ref-section',
					sub: [{
						name: 'Seção de referências 3',
						find: /║== Referências == *(\r?\n)* *\{\{ref\-section\}\}/ig,
						replace: '{{Ref-section}}'
					}]
				}, {
					name: 'Seção de referências 1',
					find: /║== *Referências? *==(\r?\n)* *< *references *\/?>/ig,
					replace: '{{Ref-section}}',
					num: 10
				}]
			}, {
				name: '-small em <references group=nota/>',
				find: /(?:<small>|<div class= *"references-small">) *(?:\r?\n)* *<references group=nota *\/ *> *(?:\r?\n)*\ *(?:<\/small>|<\/div>)/ig,
				replace: '<references group=nota/>'
			}, {
				name: 'Passando para {{Notas}}',
				find: /║== *Notas? *== *(?:\r?\n)* *<references group=nota\/>\n/ig,
				replace: '{{Notas}}'
			}, {
				name: 'Arrumando {{Referências}}',
				ifhas: /\{\{ref\-section/i,
				sub: [{
					name: 'Linha antes ref-section',
					find: /([^\n])\r?\n\{\{Referências\}\}/ig,
					replace: '$1\n\n{{Referências}}'
				}, {
					name: '{{ref-section|Referências}}',
					find: /\{\{Referências\|Referências\}\}/ig,
					replace: '{{Referências}}'
				}, {
					name: '{{Ref-section}}=',
					find: /\{\{Referências\}\}\=+/ig,
					replace: '{{Referências}}'
				}, {
					name: '|col= em {{Ref-section}}',
					find: /(\{\{Referências\|)([0-9])/ig,
					replace: '$1|col=$2'
				}]
			}, {
				name: '{{Referências}} duplo',
				find: /\{\{Referências\}\}(\r?\n)*\{\{(?:Referências|Reflist)\}\}/ig,
				replace: '{{Referências}}'
			}, {
				name: '{{Referências}} com cabeçalho padrão',
				find: /\{\{Referências\|referências?([^a-z ])/ig,
				replace: '{{Referências$1'
			}]
		}, {
			name: 'Corrigindo ref',
			sub: [{
				name: 'Rule',
				find: /\{\{Reflist\}\}(\[(?:https?:)?\/\/[^\[\]]*├)/ig,
				replace: '<ref>$1</ref>'
			}]
		}, {
			name: 'Formatando referência',
			sub: [{
				name: 'Rule',
				find: /(<ref[^<>\n]*>) *\'* *Fontes? *'* *:? *([^ s':\.])/ig,
				replace: '$1$2'
			}, {
				name: '{{Link}} para {{Citar web}}',
				find: /(<ref[^\n\/\>]*>) *\{\{Link *\| *([a-z][a-z]) *\|(2=)? *([^\n\|]+) *\|(3=)? *([^\n\}]*) *\}\}/ig,
				replace: '$1{{Citar web |autor= |url=$4 |título=$6 |língua2=$2 |obra= |data= |acessodata=}}',
				ifhas: /\{\{Link/i
			}, {
				name: '{{Cite web}} para {{Citar web}}',
				ifhas: '{{Cite web', // FIXME: /\{\{Cite web/i ?
				sub: [{
					name: 'Marca início',
					find: /\{\{Cite web *(\||\r?\n|╔)/ig,
					replace: '┌$1'
				}, {
					name: 'Marca final',
					find: /(┌[^{}┘]*)\}\}/ig,
					replace: '$1┘}}'
				}, {
					name: 'Substitui campos',
					ifhas: /┘/i,
					sub: [{
						name: 'last',
						find: /(┌[^┌┘]*\| *)last( *=[^┌┘]*┘)/g,
						replace: '$1último$2'
					}, {
						name: 'title',
						find: /(┌[^┘]*\| *)title( *=[^┌┘]*┘)/g,
						replace: '$1título$2'
					}, {
						name: 'accessdate',
						find: /(┌[^┘]*\| *)accessdate( *=[^┌┘]*┘)/g,
						replace: '$1acessodata$2'
					}, {
						name: 'accessyear',
						find: /(┌[^┘]*\| *)accessyear( *=[^┌┘]*┘)/g,
						replace: '$1acessoano$2'
					}, {
						name: 'author',
						find: /(┌[^┘]*\| *)author( *=[^┌┘]*┘)/g,
						replace: '$1autor$2'
					}, {
						name: 'first',
						find: /(┌[^┘]*\| *)first( *=[^┌┘]*┘)/g,
						replace: '$1primeiro$2'
					}, {
						name: 'authorlink',
						find: /(┌[^┘]*\| *)authorlink( *=[^┌┘]*┘)/g,
						replace: '$1autorlink$2'
					}, {
						name: 'coauthors',
						find: /(┌[^┘]*\| *)coauthors( *=[^┌┘]*┘)/g,
						replace: '$1coautores$2'
					}, {
						name: 'date',
						find: /(┌[^┘]*\| *)date( *=[^┌┘]*┘)/g,
						replace: '$1data$2'
					}, {
						name: 'year',
						find: /(┌[^┘]*\| *)year( *=[^┌┘]*┘)/g,
						replace: '$1ano$2'
					}, {
						name: 'month',
						find: /(┌[^┘]*\| *)month( *=[^┌┘]*┘)/g,
						replace: '$1mes$2'
					}, {
						name: 'format',
						find: /(┌[^┘]*\| *)format( *=[^┌┘]*┘)/g,
						replace: '$1formato$2'
					}, {
						name: 'work',
						find: /(┌[^┘]*\| *)work( *=[^┌┘]*┘)/g,
						replace: '$1obra$2'
					}, {
						name: 'publisher',
						find: /(┌[^┘]*\| *)publisher( *=[^┌┘]*┘)/g,
						replace: '$1publicado$2'
					}, {
						name: 'pages',
						find: /(┌[^┘]*\| *)pages( *=[^┌┘]*┘)/g,
						replace: '$1paginas$2'
					}, {
						name: 'language',
						find: /(┌[^┘]*\| *)language( *=[^┌┘]*┘)/g,
						replace: '$1língua$2'
					}, {
						name: 'archiveurl',
						find: /(┌[^┘]*\| *)archiveurl( *=[^┌┘]*┘)/g,
						replace: '$1arquivourl$2'
					}, {
						name: 'archivedate',
						find: /(┌[^┘]*\| *)archivedate( *=[^┌┘]*┘)/g,
						replace: '$1arquivodata$2'
					}, {
						name: 'quote',
						find: /(┌[^┘]*\| *)quote( *=[^┌┘]*┘)/g,
						replace: '$1citação$2'
					}]
				}, {
					name: 'Desmarca final',
					find: /┘/g,
					replace: '',
					num: 10
				}, {
					name: 'Desmarca início',
					find: /┌/g,
					replace: '{{Citar web',
					num: 10
				}]
			}]
		}, {
			name: 'Ver também',
			sub: [{
				name: 'Nome da seção VT',
				find: /║\=+ *\{?\{? *(?:artigos? relacionados?|links? internos?|Ve(?:ja|r) (?:tamb[ée]m|ainda)|See also) *\}?\}? *\=+\r?\n/ig,
				replace: '║== Ver também ==\n'
			}, {
				name: 'Lista em VT',
				find: /║\=+ Ver também \=+\r?\n\[\[/ig,
				replace: '║== Ver também ==\n* [['
			}]
		}, {
			name: 'Ligações externas',
			sub: [{
				name: 'Passando língua para depois',
				sub: [{
					name: 'Juntando línguas',
					find: /\*(.*)\{\{\(?\(?([a-z][a-z][a-z]?(?:\|[^\}\n]*)?)\)?\)?\}\} *[,e]? *\{\{\(?\(?([a-z][a-z](?:\|[^\}\n]*)?)\)?\)?\}\}/ig,
					replace: '\n*$1{{$2|$3}}',
					num: 10
				}, {
					name: 'Passando línguas para depois',
					find: /(\n\*? *)(\{\{\(?\(?[a-z][a-z][a-z]?(?:\|[^\}\n]*)?\)?\)?\}\}) *\-? *(\[https?:\/\/[^\n]+)\r?\n/ig,
					replace: '$1$3 $2\n',
					num: 10
				}]
			}, {
				name: 'Quebra de linha em LE',
				find: /\r?\n(\* |\[)(https?:\/\/.*)\r?\n\r?\n([(\* |\[])/ig,
				replace: '\n$1$2\n$3',
				num: 10
			}, {
				name: 'Ligações externas',
				sub: [{
					name: 'Nome da seção LE',
					find: /║\=+ *(?:\{\{)? *(?:Apontadores|apontadore?s? externos?|links|links? externos?|ligaçã?o?õ?e?s? externas?|páginas? externas?|referências? externas?|enlaces externos?|External links|Weblinks?|Fontes e ligações externas) *(?:\}\})? *\=+\r?\n/ig,
					replace: '║== Ligações externas ==\n'
				}, {
					name: '{{le}}',
					find: /\{\{le\}\}/ig,
					replace: '║== Ligações externas =='
				}]
			}, {
				name: 'Passando para lista',
				sub: [{
					name: 'Passando para lista 1',
					find: /\r?\n(\[https?:\/\/.*)/g,
					replace: '\n* $1\n',
					num: 10
				}, {
					name: 'Passando para lista 2',
					find: /(== Ligações externas ==\r?\n)(\{\{[a-z][a-z]\}\})/g,
					replace: '$1* $2'
				}]
			}, {
				name: 'Padronizando {{Link}}',
				ifhas: /\{\{Link/i,
				ifnot: /\{\{Link[^\|\n]*\|[^\|\n]*\| *url *=/i,
				sub: [{
					name: '|1=',
					find: /\{\{link *\| *1= *([^ ])/ig,
					replace: '{{Link|$1',
					num: 100
				}, {
					name: '|2=',
					find: /(\n\*+ \{\{link) *\| *([^\|\{\}\[\]\n]*) *\| *([^ 2][^ }\n\|]+[^ ]) *\| */ig,
					replace: '$1|$2|2=$3 |',
					num: 100
				}, {
					name: '|3=',
					find: /(\n\*+ \{\{link\|[^\|\{\}\[\]\n]*\|2=[^ \}\|\n]+ )\| *([^ 3])/ig,
					replace: '$1|3=$2',
					num: 100
				}, {
					name: '|4=',
					find: /(\n\*+ \{\{link\|[^\|\{\}\[\]\n]*\|2=[^ \}\|\n]+ \|3=[^┼\}\|\n]+) *\| *([^ 4])/ig,
					replace: '$1 |4=$2',
					num: 100
				}]
			}, {
				name: '{{Link}}',
				sub: [{
					name: 'Lista para {{Link}}',
					find: /\r?\n(\{\{Link\|)/ig,
					replace: '\n* $1',
					num: 10
				}, {
					name: '{{Link}} incompleto',
					sub: [{
						name: '{{Link}} sem lingua',
						find: /(\n[\*\#]+ *\-? *)\[(https?:\/\/[^ \n\]]+) ([^├\n]*)├(.?)/ig,
						replace: '$1{{Link||2=$2 |3=$3}}$4',
						num: 10
					}, {
						name: '{{Link}} sem título',
						find: /(\n[\*\#]+ *\-? *)\[(https?:\/\/[^\n├]*) *├(.?)/g,
						replace: '$1{{Link||2=$2 |3=}}$3',
						num: 10
					}, {
						name: '# {{Link',
						find: /([^\#])\#+ *\{\{Link/ig,
						replace: '$1* {{Link'
					}]
				}, {
					name: 'Lingua na {{Link}}',
					num: 10,
					sub: [{
						name: '{{Link}} - lingua depois',
						find: /(\n\*+ \{\{Link *\|) *(\| *[^{}\n]+\}\}.*)\{\{([a-z][a-z][a-z]?(?:\|[^\}\n]*)?)\}\}([^\)])/g,
						replace: '$1$3$2$4'
					}, {
						name: '{{Link}} - lingua dentro',
						find: /(\n\*+ \{\{Link *\|) *(\| *[^{}\n]+) *\{\{([a-z][a-z][a-z]?)\}\} *(\}\})/g,
						replace: '$1$3$2$4'
					}]
				}, {
					name: 'Link 4=',
					find: /(\{\{Link\|[^┼{}\n]*)\}\} *([^ ┼<\r\n][^┼\n]*)([┼\r\n])/ig,
					replace: '$1 |4=$2}}$3',
					num: 10
				}, {
					name: 'Link 4= - arruma',
					find: /(\{\{Link\|[^{}\n]*\|4=)\.{1,2}\}\}/ig,
					replace: '$1}}',
					num: 10
				}, {
					name: 'Rule',
					find: /(\{\{Link\|.*[^ ]) +\}\}/ig,
					replace: '$1}}'
				}, {
					name: 'Link sem |3= com |4=',
					find: /(\{\{Link\|[^\|\n]*\|2=[^\|\n]*\|3=) *(\|4=)([^ \{\}\n]+) /ig,
					replace: '$1$3 $2'
				}]
			}, {
				name: '{{Link2}}',
				ifhas: /\{\{Link/i,
				sub: [{
					name: 'Língua no campo 4',
					find: /(\{\{Link\|[a-z]{2,3})(\|[^\{\}\n]*)\{\{([a-z]{2,3})\}\} *\}\}\r?\n/ig,
					replace: '$1|$3$2}}\n',
					num: 100
				}, {
					name: 'Campo língua',
					find: /\{\{Link(\|[a-z]{2,3}\|[a-z]{2,3}[^0-9\{\}\n]*)(\|2=.*)\}\} *\r?\n/ig,
					replace: '{{Link2$2$1}}\n',
					num: 100
				}, {
					name: 'Arrumando parâmetros',
					find: /(\{\{Link2[^{}\n]*\|) *[0-9]=/ig,
					replace: '$1',
					num: 10
				}]
			}, {
				name: 'Arrumando {{Link2?}}',
				find: /([^ ]) *\|4= *\}\}/ig,
				/* FIXME: Singleline */
				replace: '$1}}',
				num: 10
			}, {
				name: 'Predef de LE',
				ifhas: /\{\{link/i,
				sub: [{
					name: '{{Afdb nome}}',
					find: /\{\{link\|(?: *1?=? *[a-z]{2,2})?\|? *2?= *?http:\/\/www\.adultfilmdatabase\.com\/actor\.cfm\?actorid\=([^\|\}\n]+)\/? *\| *3?=? *([^\|\}\n]*)(?: *(?:\| *4?=?|\}\}) *no \[?\[?Adult Film Database\]?\]?)?(?:\}\}\r?\n|\r?\n)/ig,
					replace: '{{Afdb nome|$1|$2}}\n'
				}, {
					name: '{{MySpace}}',
					find: /\{\{link\|(?: *1?=? *[a-z]{2,2})?\|? *2?= *?http:\/\/www\.myspace\.com\/([^\|\}\n]+)\/? *\| *3?=? *([^\|\}\n]*)(?: *(?:\| *4?=?|\}\}) *no \[?\[?MySpace\]?\]?)?(?:\}\}\r?\n|\r?\n)/ig,
					replace: '{{MySpace|$1|$2}}\n'
				}, {
					name: '{{Open Directory Project|User}}',
					find: /\{\{link\|(?: *1?=? *[a-z]{2,2})?\|? *2?= *?http:\/\/www\.dmoz\.org\/profiles\/([^\|\}\n ]+)\.html\/? *\| *3?=? *([^\|\}\n]*)(?: *(?:\| *4?=?|\}\}) *(?:no|at the) \[?\[?Open Directory Project\]?\]?)?(?:\}\}\r?\n|\r?\n)/ig,
					replace: '{{Open Directory Project|$1|$2|User}}\n'
				}, {
					name: '{{Open Directory Project}}',
					find: /\{\{link\|(?: *1?=? *[a-z]{2,2})?\|? *2?= *?http:\/\/www\.dmoz\.org\/([^\|\}\n ]+)\/? *\| *3?=? *([^\|\}\n]*)(?: *(?:\| *4?=?|\}\}) *(?:no|at the) \[?\[?Open Directory Project\]?\]?)?(?:\}\}\r?\n|\r?\n)/ig,
					replace: '{{Open Directory Project|$1|$2}}\n'
				}, {
					name: '{{Ibdb nome}}',
					find: /\{\{link\|(?: *1?=? *[a-z]{2,2})?\|? *2?=? *http:\/\/www\.ibdb\.com\/person\.asp\?ID\=([^\|\}\n]+)\/ *\| *3?=? *([^\|\}\n]*)(?: *(?:\| *4?=?|\}\}) *4?=? *no \[?\[?Internet Broadway Database\]?\]?)?(?:\}\}\r?\n|\r?\n)/ig,
					replace: '{{Ibdb nome|$1|$2}}\n'
				}, {
					name: '{{Ibdb título}}',
					find: /\{\{link\|(?: *1?=? *[a-z]{2,2})?\|? *2?=? *http:\/\/www\.ibdb\.com\/production\.php\?id\=([^\|\}\n]+)\/ *\| *3?=? *([^\|\}\n]*)(?: *(?:\| *4?=?|\}\}) *4?=? *no \[?\[?Internet Broadway Database\]?\]?)?(?:\}\}\r?\n|\r?\n)/ig,
					replace: '{{Ibdb título|$1|$2}}\n'
				}]
			}, {
				name: 'Lista no LE',
				find: /(?:\r?\n){2,}(\* \{\{Link)/ig,
				replace: '\n$1',
				num: 10
			}]
		}, {
			name: 'Desmarcando',
			sub: [{
				name: 'Desmarcando </ref>',
				find: /┼/g,
				replace: '</ref>'
			}, {
				name: 'Desmarcando ]',
				find: /├/g,
				replace: ']'
			}]
		}, {
			name: 'Rule',
			find: /Título ainda não informado \(favor adicionar\)/g,
			replace: '',
			num: 10
		}]
	}, {
		name: 'Parte inf',
		sub: [{
			name: 'DEFAULTSORT 1',
			ifnot: /▓(Wikipedia|Ficheiro|MediaWiki|Predefinição|Ajuda|Categoria|Portal)( Discussão)?:/i,
			sub: [{
				name: 'Rule',
				find: /\{\{DEFAULTSORT:\}\}/g,
				replace: ''
			}, {
				name: 'Quebra de linha em DEFAULTSORT',
				sub: [{
					name: 'Antes DEFAULTSORT',
					find: /([^\n])\r?\n\{\{DEFAULTSORT/g,
					replace: '$1\n\n{{DEFAULTSORT'
				}, {
					name: 'Após DEFAULTSORT',
					find: /(\{\{DEFAULTSORT:.*\}\})\n\n/g,
					replace: '$1\n'
				}]
			}, {
				name: '{{DEFAULTSORT em posição errada',
				sub: [{
					name: 'Marca cat',
					find: /\r?\n\[\[Categoria:/ig,
					replace: '\n┼'
				}, {
					name: 'Posicao',
					find: /(\{\{DEFAULTSORT.*\}\})\r?\n([^┼]+)┼/mg,
					replace: '$2\n$1\n┼'
				}, {
					name: 'Desmarca cat',
					find: /┼/g,
					replace: '[[Categoria:'
				}]
			}]
		}, {
			name: 'Categorias 2',
			sub: [{
				name: 'Retirando cats',
				ifnot: /▓(Usuário|Wikipedia|Ficheiro|MediaWiki|Predefinição|Ajuda|Categoria|Portal)( Discussão)?:/i,
				sub: [{
					name: '[[Categoria:!*]]',
					find: /\[\[Categoria:\!.*\]\]\r?\n/g,
					replace: '',
					num: 100
				}]
			}, {
				name: 'Indice',
				ifnot: /▓(Usuário|Wikipedia|Ficheiro|MediaWiki|Predefinição|Ajuda|Categoria|Portal)( Discussão)?:/i,
				sub: [{
					name: 'Indice principal 1',
					find: /(▓([^╦]*)╦[^░]*\n\[\[Categoria:\2)\|?[*#!]?\]\]/g,
					replace: '$1| ]]',
					num: 100
				}, {
					name: 'Indice principal 2',
					find: /(\[\[Categoria:.*\|)[\*#](\]\])/ig,
					replace: '$1 $2',
					num: 100
				}, {
					name: 'Índice de cat = pagename',
					find: /(▓([^╦]*)╦[^░]*\n\[\[Categoria:[^\|\]\n]+)\|\2\]\]/ig,
					replace: '$1]]',
					num: 100
				}]
			}, {
				name: 'Caixa alta em categoria',
				find: /\[\[Categoria *: *([a-z])/g,
				replace: '[[Categoria:{{subst:ucfirst:$1}}',
				num: 100
			}, {
				name: 'Categorias iguais',
				find: /(\n\[\[Categoria:([^\|\]\n]+)(?:\|[^\]\n]*)?\]\](?:[^░]*))\[\[Categoria:\2(?:\|[^\]\n]*)?\]\]\r?\n/ig,
				replace: '$1',
				num: 100
			}]
		}, {
			name: 'Interwikis',
			ifhas: /\[\[[a-z][a-z]:/i,
			sub: [{
				name: '- iw pt',
				find: /\n\[\[pt:[^\[\]\|\n]*\]\]\r?\n/ig,
				replace: '\n'
			}, {
				name: 'iw duplo',
				find: /(\n\[\[([a-z][a-z][a-z]?:[^\[\]\n]+)\]\][^░]*)\n\[\[\2\]\]\r?\n/g,
				replace: '$1\n',
				num: 100
			}]
		}, {
			name: 'Sem seção REF',
			ifhas: /(<ref name|<ref>|\{\{(Colocação\-carnaval|Grupo\-carnaval)\}|\| *rankingfifa = *[^ \r\n])/i,
			ifnot: /(\{\{ref-?list|\{\{Referências|<referen|▓(Wikipedia|Ficheiro|MediaWiki|Predefinição|Ajuda|Categoria|Portal)( Discussão)?:)/i,
			sub: [{
				name: 'Sem seção REF - seção Ref',
				find: /║== Referências ==/ig,
				replace: '{{Referências}}\n',
				ifnot: /(\{\{(ref\-?section|ref\-?list|referências)|<referen)/i
			}, {
				name: 'Sem seção REF - VT',
				find: /║== Ver também ==/ig,
				replace: '{{Referências}}\n\n║== Ver também ==',
				ifnot: /(\{\{(ref\-?section|ref\-?list|referências)|<referen)/i
			}, {
				name: 'Sem seção REF - LE',
				find: /║== Ligações externas ==/ig,
				replace: '{{Referências}}\n\n║== Ligações externas ==',
				ifnot: /(\{\{(ref\-?section|ref\-?list|referências)|<referen)/i
			}, {
				name: 'Sem seção REF - Bloco nav',
				find: /\{\{Bloco de navegação/ig,
				replace: '{{Referências}}\n\n{{Bloco de navegação',
				ifnot: /(\{\{(ref\-?section|ref\-?list|referências)|<referen)/i
			}, {
				name: 'Sem seção REF - Portal3',
				find: /\{\{Portal3/ig,
				replace: '{{Referências}}\n\n{{Portal3',
				ifnot: /(\{\{(ref\-?section|ref\-?list|referências)|<referen)/i
			}, {
				name: 'Sem seção REF - Cat Defaultsort',
				find: /\r?\n\r?\n(\[\[Categoria:|\{\{DEFAULTSORT:)/g,
				replace: '\n\n{{Referências}}\n\n$1',
				ifnot: /(\{\{(ref\-?section|ref\-?list|referências)|<referen)/i
			}]
		}, {
			name: 'DEFAULTSORT 2',
			ifnot: /▓(Wikipedia|Ficheiro|MediaWiki|Predefinição|Ajuda|Categoria|Portal)( Discussão)?:/i,
			sub: [{
				name: 'Trimv de cat',
				find: /([^\]])(\r?\n)\[\[Categoria:/ig,
				replace: '$1\n\n[[Categoria:'
			}, {
				name: 'Trimv de defaultsort+cat',
				find: /(\{\{DEFAULTSORT:.*\}\})(\r?\n){2,}(\[\[Categoria:)/g,
				replace: '$1\n$3'
			}, {
				/* Só arruma se não tiver defaultsort, e se tiver {{Biografias}}
				* Desabilitando, ainda problemas, com artigos de grupos/duplas por exemplo
				*/
				enabled: false,
				name: 'Defaultsort por sobrenome',
				ifhas: /\{\{Biografias\}\}/i,
				ifnot: /\{\{DEFAULTSORT/i,
				sub: [{
					name: 'Insere',
					find: /(?:\r?\n){2,2}\[\[Categoria:/ig,
					replace: '\n\n{{DEFAULTSORT:%%title%%}}\n[[Categoria:',
					ifnot: /\{\{DEFAULTSORT:/i
				}, {
					name: 'Paisnatal nao lusofono',
					find: /\{\{DEFAULTSORT:([^,\(\){}\n]+) ([^ ,\(\){}\n]+)( \([^\(\)\{\}\n]+\))?\}\}/g,
					replace: '{{DEFAULTSORT:$2, $1$3}}',
					ifhas: /\n *\| *pa[ií]s(natal)? *= *\{\{/,
					ifnot: /\n *\| *pa[ií]s(natal)? *= *\{\{(AGO|BRA|CPV|GNB|GNQ|MAC|MOZ|MUS|PRT|SEN|STP|TLS)/
				}, {
					name: 'Sem palavra luso',
					find: /\{\{DEFAULTSORT:([^,\(\){}\n]+) ([^ ,\(\){}\n]+)( \([^\(\)\{\}\n]+\))?\}\}/g,
					replace: '{{DEFAULTSORT:$2, $1$3}}',
					ifnot: /((Brasil|(Acre|Alagoas|Amapá|Amazonas|Bahia|Ceará|Espírito Santo|Goiás|Maranhão|Mato Grosso|Minas Gerais|Pará|Paraíba|Paraná|Pernambuco|Piauí|Rio de Janeiro|Rio Grande|Rondônia|Roraima|Santa Catarina|São Paulo|Sergipe|Tocantins)|Portugal|(Açores|Aveiro|Beja|Braga|Bragança|Castelo Branco|Coimbra|Évora|Faro|Guarda|Leiria|Lisboa|Madeira|Portalegre|Porto|Santarém|Setúbal|Viana do Castelo|Vila Real|Viseu)|Angola|Cabo Verde|Guiné\-Bissau|Moçambique|São Tomé e Príncipe|Timor\-leste)|\{\{Info\/Personagem fictícia)/i
				}]
			}, {
				name: 'Insere defaultsort',
				enabled: false,
				ifnot: '{{DEFAULTSORT:',
				sub: [{
					name: 'Insere defaultsort',
					find: /(?:\r?\n){2,2}\[\[Categoria:/g,
					replace: '\n\n{{DEFAULTSORT:%%title%%}}\n[[Categoria:',
					ifnot: /\{\{DEFAULTSORT:/i
				}, {
					name: 'Defaultsort usando índice',
					ifhas: '{{DEFAULTSORT:',
					ifnot: /\[\[Categoria:[^\|\[\]\n]*\]\]\r?\n/, // FIXME: /\[\[Categoria:[^\|\[\]\n]*\]\]\r?\n/i ?
					sub: [{
						name: 'Insere default pelo indice',
						find: /\{\{DEFAULTSORT:.*\}\}\r?\n(\[\[[Cc]ategoria:[^\|\[\]\n]+\|([A-Z0-9][^\[\]\n]+)\]\])\r?\n/g,
						replace: '{{DEFAULTSORT:$2}}\n$1\n'
					}, {
						name: 'Retira indice, caso tenha só 1 cat',
						find: /(\{\{DEFAULTSORT:.*\}\}\r?\n\[\[Categoria:[^\|\[\]\n]+)\|[A-Z0-9][^\[\]\n]+\]\]\r?\n/g,
						replace: '$1]]\n',
						ifnot: /\[\[Categoria:.*\]\]\r?\n\[\[Categoria:/i
					}]
				}]
			}, {
				name: 'Arruma DEFAULTSORT',
				ifhas: 'DEFAULTSORT',
				sub: [{
					name: 'Defaultsort - Lista',
					find: /\{\{DEFAULTSORT:Anexo:Lista d[eoa]s? /ig,
					replace: '{{DEFAULTSORT:'
				}, {
					name: 'Defaultsort - Anexo',
					find: /\{\{DEFAULTSORT:Anexo:/ig,
					replace: '{{DEFAULTSORT:'
				}, {
					enabled: false,
					name: 'Remove de do da',
					find: /((?:\{\{DEFAULTSORT *:|\[\[Categoria:[^\|\]\n]+\|).* )(?:D[eao]s?|E|D'|Of) /ig,
					replace: '$1',
					num: 100,
					ifnot: /▓.* (D[eao]s?|E|D'|Of) /
				}, {
					name: 'As no final do DEFAULTSORT',
					find: /(\{\{DEFAULTSORT *:|\[\[Categoria:[^\|\]\n]+\|)(As?|Os?|The) ([^\(\)\n\]\}]+)([\}\]])/g,
					replace: '$1$3, $2$4',
					ifhas: '▓',
					ifnot: '▓À'
				}, {
					name: 'Arrumando espaço',
					find: /((?:\{\{DEFAULTSORT *:|\[\[Categoria:[^\|\]\n]+\|).*,)([^ \n])/g,
					replace: '$1 $2',
					num: 100
				}, {
					// desab, não sei se ainda é necessário
					enabled: false,
					name: 'Caracteres especiais',
					sub: [{
						name: 'DEFAULTSORT a',
						find: /(\{\{DEFAULTSORT *:[^\}]*|\[\[Categoria:[^\|\]\n]+\|[^\]\n]*)[ãâáâàăåäą]([^\}\]\n]*[\}\]])/g,
						replace: '$1a$2',
						num: 100
					}, {
						name: 'DEFAULTSORT A',
						find: /(\{\{DEFAULTSORT *:[^\}]*|\[\[Categoria:[^\|\]\n]+\|[^\]\n]*)[ÅÂÁÃÀÂÄĂÄÄĄ]([^\}\]\n]*[\}\]])/g,
						replace: '$1A$2',
						num: 100
					}, {
						name: 'DEFAULTSORT e',
						find: /(\{\{DEFAULTSORT *:[^\}]*|\[\[Categoria:[^\|\]\n]+\|[^\]\n]*)[éèêëě]([^\}\]\n]*[\}\]])/g,
						replace: '$1e$2',
						num: 100
					}, {
						name: 'DEFAULTSORT E',
						find: /(\{\{DEFAULTSORT *:[^\}]*|\[\[Categoria:[^\|\]\n]+\|[^\]\n]*)[ÉÊÈË]([^\}\]\n]*[\}\]])/g,
						replace: '$1E$2',
						num: 100
					}, {
						name: 'DEFAULTSORT i',
						find: /(\{\{DEFAULTSORT *:[^\}]*|\[\[Categoria:[^\|\]\n]+\|[^\]\n]*)[íïìîï]([^\}\]\n]*[\}\]])/g,
						replace: '$1i$2',
						num: 100
					}, {
						name: 'DEFAULTSORT I',
						find: /(\{\{DEFAULTSORT *:[^\}]*|\[\[Categoria:[^\|\]\n]+\|[^\]\n]*)[ÍÌÎÏ]([^\}\]\n]*[\}\]])/g,
						replace: '$1I$2',
						num: 100
					}, {
						name: 'DEFAULTSORT o',
						find: /(\{\{DEFAULTSORT *:[^\}]*|\[\[Categoria:[^\|\]\n]+\|[^\]\n]*)[óöøõôōò]([^\}\]\n]*[\}\]])/g,
						replace: '$1o$2',
						num: 100
					}, {
						name: 'DEFAULTSORT O',
						find: /(\{\{DEFAULTSORT *:[^\}]*|\[\[Categoria:[^\|\]\n]+\|[^\]\n]*)[ÓÒÔÔÕØÖŌ]([^\}\]\n]*[\}\]])/g,
						replace: '$1O$2',
						num: 100
					}, {
						name: 'DEFAULTSORT u',
						find: /(\{\{DEFAULTSORT *:[^\}]*|\[\[Categoria:[^\|\]\n]+\|[^\]\n]*)[úùûüŭū]([^\}\]\n]*[\}\]])/g,
						replace: '$1u$2',
						num: 100
					}, {
						name: 'DEFAULTSORT U',
						find: /(\{\{DEFAULTSORT *:[^\}]*|\[\[Categoria:[^\|\]\n]+\|[^\]\n]*)[ÚÙÛÜŬŪ]([^\}\]\n]*[\}\]])/g,
						replace: '$1U$2',
						num: 100
					}, {
						name: 'DEFAULTSORT B',
						find: /(\{\{DEFAULTSORT *:[^\}]*|\[\[Categoria:[^\|\]\n]+\|[^\]\n]*)[ß]([^\}\]\n]*[\}\]])/g,
						replace: '$1B$2',
						num: 100
					}, {
						name: 'DEFAULTSORT c',
						find: /(\{\{DEFAULTSORT *:[^\}]*|\[\[Categoria:[^\|\]\n]+\|[^\]\n]*)[çćčĉ]([^\}\]\n]*[\}\]])/g,
						replace: '$1c$2',
						num: 100
					}, {
						name: 'DEFAULTSORT C',
						find: /(\{\{DEFAULTSORT *:[^\}]*|\[\[Categoria:[^\|\]\n]+\|[^\]\n]*)[ÇČĆĈ]([^\}\]\n]*[\}\]])/g,
						replace: '$1C$2',
						num: 100
					}, {
						name: 'DEFAULTSORT d',
						find: /(\{\{DEFAULTSORT *:[^\}]*|\[\[Categoria:[^\|\]\n]+\|[^\]\n]*)[đď]([^\}\]\n]*[\}\]])/g,
						replace: '$1d$2',
						num: 100
					}, {
						name: 'DEFAULTSORT D',
						find: /(\{\{DEFAULTSORT *:[^\}]*|\[\[Categoria:[^\|\]\n]+\|[^\]\n]*)[ĎĐ]([^\}\]\n]*[\}\]])/g,
						replace: '$1D$2',
						num: 100
					}, {
						name: 'DEFAULTSORT g',
						find: /(\{\{DEFAULTSORT *:[^\}]*|\[\[Categoria:[^\|\]\n]+\|[^\]\n]*)[ĝ]([^\}\]\n]*[\}\]])/g,
						replace: '$1g$2',
						num: 100
					}, {
						name: 'DEFAULTSORT G',
						find: /(\{\{DEFAULTSORT *:[^\}]*|\[\[Categoria:[^\|\]\n]+\|[^\]\n]*)[Ĝ]([^\}\]\n]*[\}\]])/g,
						replace: '$1G$2',
						num: 100
					}, {
						name: 'DEFAULTSORT h',
						find: /(\{\{DEFAULTSORT *:[^\}]*|\[\[Categoria:[^\|\]\n]+\|[^\]\n]*)[ĥ]([^\}\]\n]*[\}\]])/g,
						replace: '$1h$2',
						num: 100
					}, {
						name: 'DEFAULTSORT H',
						find: /(\{\{DEFAULTSORT *:[^\}]*|\[\[Categoria:[^\|\]\n]+\|[^\]\n]*)[Ĥ]([^\}\]\n]*[\}\]])/g,
						replace: '$1H$2',
						num: 100
					}, {
						name: 'DEFAULTSORT j',
						find: /(\{\{DEFAULTSORT *:[^\}]*|\[\[Categoria:[^\|\]\n]+\|[^\]\n]*)[ĵ]([^\}\]\n]*[\}\]])/g,
						replace: '$1j$2',
						num: 100
					}, {
						name: 'DEFAULTSORT J',
						find: /(\{\{DEFAULTSORT *:[^\}]*|\[\[Categoria:[^\|\]\n]+\|[^\]\n]*)[Ĵ]([^\}\]\n]*[\}\]])/g,
						replace: '$1J$2',
						num: 100
					}, {
						name: 'DEFAULTSORT l',
						find: /(\{\{DEFAULTSORT *:[^\}]*|\[\[Categoria:[^\|\]\n]+\|[^\]\n]*)ł([^\}\]\n]*[\}\]])/g,
						replace: '$1l$2',
						num: 100
					}, {
						name: 'DEFAULTSORT L',
						find: /(\{\{DEFAULTSORT *:[^\}]*|\[\[Categoria:[^\|\]\n]+\|[^\]\n]*)Ł([^\}\]\n]*[\}\]])/g,
						replace: '$1L$2',
						num: 100
					}, {
						name: 'DEFAULTSORT n',
						find: /(\{\{DEFAULTSORT *:[^\}]*|\[\[Categoria:[^\|\]\n]+\|[^\]\n]*)[ñńňň]([^\}\]\n]*[\}\]])/g,
						replace: '$1n$2',
						num: 100
					}, {
						name: 'DEFAULTSORT N',
						find: /(\{\{DEFAULTSORT *:[^\}]*|\[\[Categoria:[^\|\]\n]+\|[^\]\n]*)[ÑŇŃŇ]([^\}\]\n]*[\}\]])/g,
						replace: '$1N$2',
						num: 100
					}, {
						name: 'DEFAULTSORT r',
						find: /(\{\{DEFAULTSORT *:[^\}]*|\[\[Categoria:[^\|\]\n]+\|[^\]\n]*)[ř]([^\}\]\n]*[\}\]])/g,
						replace: '$1r$2',
						num: 100
					}, {
						name: 'DEFAULTSORT R',
						find: /(\{\{DEFAULTSORT *:[^\}]*|\[\[Categoria:[^\|\]\n]+\|[^\]\n]*)[Ř]([^\}\]\n]*[\}\]])/g,
						replace: '$1R$2',
						num: 100
					}, {
						name: 'DEFAULTSORT s',
						find: /(\{\{DEFAULTSORT *:[^\}]*|\[\[Categoria:[^\|\]\n]+\|[^\]\n]*)[ŝšśş]([^\}\]\n]*[\}\]])/g,
						replace: '$1s$2',
						num: 100
					}, {
						name: 'DEFAULTSORT S',
						find: /(\{\{DEFAULTSORT *:[^\}]*|\[\[Categoria:[^\|\]\n]+\|[^\]\n]*)[ŠŚŞŜ]([^\}\]\n]*[\}\]])/g,
						replace: '$1S$2',
						num: 100
					}, {
						name: 'DEFAULTSORT t',
						find: /(\{\{DEFAULTSORT *:[^\}]*|\[\[Categoria:[^\|\]\n]+\|[^\]\n]*)[ťţ]([^\}\]\n]*[\}\]])/g,
						replace: '$1t$2',
						num: 100
					}, {
						name: 'DEFAULTSORT T',
						find: /(\{\{DEFAULTSORT *:[^\}]*|\[\[Categoria:[^\|\]\n]+\|[^\]\n]*)[ŤŤŢ]([^\}\]\n]*[\}\]])/g,
						replace: '$1T$2',
						num: 100
					}, {
						name: 'DEFAULTSORT z',
						find: /(\{\{DEFAULTSORT *:[^\}]*|\[\[Categoria:[^\|\]\n]+\|[^\]\n]*)[žż]([^\}\]\n]*[\}\]])/g,
						replace: '$1z$2',
						num: 100
					}, {
						name: 'DEFAULTSORT Z',
						find: /(\{\{DEFAULTSORT *:[^\}]*|\[\[Categoria:[^\|\]\n]+\|[^\]\n]*)[ŽŻ]([^\}\]\n]*[\}\]])/g,
						replace: '$1Z$2',
						num: 100
					}, {
						name: 'DEFAULTSORT ae',
						find: /(\{\{DEFAULTSORT *:[^\}]*|\[\[Categoria:[^\|\]\n]+\|[^\]\n]*)æ([^\}\]\n]*[\}\]])/g,
						replace: '$1ae$2',
						num: 100
					}, {
						name: 'DEFAULTSORT AE',
						find: /(\{\{DEFAULTSORT *:[^\}]*|\[\[Categoria:[^\|\]\n]+\|[^\]\n]*)Æ([^\}\]\n]*[\}\]])/g,
						replace: '$1AE$2',
						num: 100
					}, {
						name: 'DEFAULTSORT remover',
						find: /(\{\{DEFAULTSORT *:[^\}]*|\[\[Categoria:[^\|\]\n]+\|[^\]\n]*)[ªº"]([^\}\]\n]*[\}\]])/g,
						replace: '$1$2',
						num: 100
					}]
				}, {
					enabled: false, // desab, não sei se ainda é necessário
					name: 'Trocando por espaço',
					find: /((?:\{\{DEFAULTSORT *:|\[\[Categoria:[^\|\]\n]+\|[^\]\n]*)[^\]\}\n]*)[\-\–\—_]([^\]\}\n]*[\}\]])/g,
					replace: '$1 $2',
					num: 100
				}, {
					// Desde o mediawiki 1.17 faz diferença usar maiúscula ou minúscula
					// [[WP:Café dos programadores/Arquivo/2011/1#Categorias]]
					enabled: false,
					name: 'DEFAULTSORT para maiúscula',
					ifhas: /((?:\{\{DEFAULTSORT *:|\[\[Categoria:[^\|\]\n]+\|)(?:[^\[\]\{\}\n]+[ \-\(\/])?)[a-z]/,
					sub: [{
						name: 'A',
						find: /((?:\{\{DEFAULTSORT *:|\[\[Categoria:[^\|\]\n]+\|)(?:[^\]\}\n]+[ \-\(\/])?)a/g,
						replace: '$1A',
						num: 100
					}, {
						name: 'B',
						find: /((?:\{\{DEFAULTSORT *:|\[\[Categoria:[^\|\]\n]+\|)(?:[^\[\]\{\}\n]+[ \-\(\/])?)b/g,
						replace: '$1B',
						num: 100
					}, {
						name: 'C',
						find: /((?:\{\{DEFAULTSORT *:|\[\[Categoria:[^\|\]\n]+\|)(?:[^\[\]\{\}\n]+[ \-\(\/])?)c/g,
						replace: '$1C',
						num: 100
					}, {
						name: 'D',
						find: /((?:\{\{DEFAULTSORT *:|\[\[Categoria:[^\|\]\n]+\|)(?:[^\[\]\{\}\n]+[ \-\(\/])?)d/g,
						replace: '$1D',
						num: 100
					}, {
						name: 'E',
						find: /((?:\{\{DEFAULTSORT *:|\[\[Categoria:[^\|\]\n]+\|)(?:[^\[\]\{\}\n]+[ \-\(\/])?)e/g,
						replace: '$1E',
						num: 100
					}, {
						name: 'F',
						find: /((?:\{\{DEFAULTSORT *:|\[\[Categoria:[^\|\]\n]+\|)(?:[^\[\]\{\}\n]+[ \-\(\/])?)f/g,
						replace: '$1F',
						num: 100
					}, {
						name: 'G',
						find: /((?:\{\{DEFAULTSORT *:|\[\[Categoria:[^\|\]\n]+\|)(?:[^\[\]\{\}\n]+[ \-\(\/])?)g/g,
						replace: '$1G',
						num: 100
					}, {
						name: 'H',
						find: /((?:\{\{DEFAULTSORT *:|\[\[Categoria:[^\|\]\n]+\|)(?:[^\[\]\{\}\n]+[ \-\(\/])?)h/g,
						replace: '$1H',
						num: 100
					}, {
						name: 'I',
						find: /((?:\{\{DEFAULTSORT *:|\[\[Categoria:[^\|\]\n]+\|)(?:[^\[\]\{\}\n]+[ \-\(\/])?)/g,
						replace: '$1I',
						num: 100
					}, {
						name: 'J',
						find: /((?:\{\{DEFAULTSORT *:|\[\[Categoria:[^\|\]\n]+\|)(?:[^\[\]\{\}\n]+[ \-\(\/])?)j/g,
						replace: '$1J',
						num: 100
					}, {
						name: 'K',
						find: /((?:\{\{DEFAULTSORT *:|\[\[Categoria:[^\|\]\n]+\|)(?:[^\[\]\{\}\n]+[ \-\(\/])?)k/g,
						replace: '$1K',
						num: 100
					}, {
						name: 'L',
						find: /((?:\{\{DEFAULTSORT *:|\[\[Categoria:[^\|\]\n]+\|)(?:[^\[\]\{\}\n]+[ \-\(\/])?)l/g,
						replace: '$1L',
						num: 100
					}, {
						name: 'M',
						find: /((?:\{\{DEFAULTSORT *:|\[\[Categoria:[^\|\]\n]+\|)(?:[^\[\]\{\}\n]+[ \-\(\/])?)m/g,
						replace: '$1M',
						num: 100
					}, {
						name: 'N',
						find: /((?:\{\{DEFAULTSORT *:|\[\[Categoria:[^\|\]\n]+\|)(?:[^\[\]\{\}\n]+[ \-\(\/])?)n/g,
						replace: '$1N',
						num: 100
					}, {
						name: 'O',
						find: /((?:\{\{DEFAULTSORT *:|\[\[Categoria:[^\|\]\n]+\|)(?:[^\[\]\{\}\n]+[ \-\(\/])?)o/g,
						replace: '$1O',
						num: 100
					}, {
						name: 'P',
						find: /((?:\{\{DEFAULTSORT *:|\[\[Categoria:[^\|\]\n]+\|)(?:[^\[\]\{\}\n]+[ \-\(\/])?)p/g,
						replace: '$1P',
						num: 100
					}, {
						name: 'Q',
						find: /((?:\{\{DEFAULTSORT *:|\[\[Categoria:[^\|\]\n]+\|)(?:[^\[\]\{\}\n]+[ \-\(\/])?)q/g,
						replace: '$1Q',
						num: 100
					}, {
						name: 'R',
						find: /((?:\{\{DEFAULTSORT *:|\[\[Categoria:[^\|\]\n]+\|)(?:[^\[\]\{\}\n]+[ \-\(\/])?)r/g,
						replace: '$1R',
						num: 100
					}, {
						name: 'S',
						find: /((?:\{\{DEFAULTSORT *:|\[\[Categoria:[^\|\]\n]+\|)(?:[^\[\]\{\}\n]+[ \-\(\/])?)s/g,
						replace: '$1S',
						num: 100
					}, {
						name: 'T',
						find: /((?:\{\{DEFAULTSORT *:|\[\[Categoria:[^\|\]\n]+\|)(?:[^\[\]\{\}\n]+[ \-\(\/])?)t/g,
						replace: '$1T',
						num: 100
					}, {
						name: 'U',
						find: /((?:\{\{DEFAULTSORT *:|\[\[Categoria:[^\|\]\n]+\|)(?:.+[ \-\(\/])?)u/g,
						replace: '$1U',
						num: 100
					}, {
						name: 'V',
						find: /((?:\{\{DEFAULTSORT *:|\[\[Categoria:[^\|\]\n]+\|)(?:[^\[\]\{\}\n]+[ \-\(\/])?)v/g,
						replace: '$1V',
						num: 100
					}, {
						name: 'W',
						find: /((?:\{\{DEFAULTSORT *:|\[\[Categoria:[^\|\]\n]+\|)(?:[^\[\]\{\}\n]+[ \-\(\/])?)w/g,
						replace: '$1W',
						num: 100
					}, {
						name: 'X',
						find: /((?:\{\{DEFAULTSORT *:|\[\[Categoria:[^\|\]\n]+\|)(?:[^\[\]\{\}\n]+[ \-\(\/])?)x/g,
						replace: '$1X',
						num: 100
					}, {
						name: 'Y',
						find: /((?:\{\{DEFAULTSORT *:|\[\[Categoria:[^\|\]\n]+\|)(?:[^\[\]\{\}\n]+[ \-\(\/])?)y/g,
						replace: '$1Y',
						num: 100
					}, {
						name: 'Z',
						find: /((?:\{\{DEFAULTSORT *:|\[\[Categoria:[^\|\]\n]+\|)(?:[^\[\]\{\}\n]+[ \-\(\/])?)z/g,
						replace: '$1Z',
						num: 100
					}]
				}, {
					// Desde o mediawiki 1.17 faz diferença usar maiúscula ou minúscula
					// [[WP:Café dos programadores/Arquivo/2011/1#Categorias]]
					enabled: false,
					name: 'DEFAULTSORT para minuscula',
					ifhas: /((?:\{\{DEFAULTSORT *:|\[\[Categoria:[^\|\]\n]+\|)(?:[^\[\]\{\}\n]+[ \-\(\/])?)[A-Z]/,
					sub: [{
						name: 'A',
						find: /((?:\{\{DEFAULTSORT *:|\[\[Categoria:[^\|\]\n]+\|)[^\]\}\n]*[^ \-\(\/])A/g,
						replace: '$1a',
						num: 100
					}, {
						name: 'B',
						find: /((?:\{\{DEFAULTSORT *:|\[\[Categoria:[^\|\]\n]+\|)[^\[\]\{\}\n]*[^ \-\(\/])B/g,
						replace: '$1b',
						num: 100
					}, {
						name: 'C',
						find: /((?:\{\{DEFAULTSORT *:|\[\[Categoria:[^\|\]\n]+\|)[^\[\]\{\}\n]*[^ \-\(\/])C/g,
						replace: '$1c',
						num: 100
					}, {
						name: 'D',
						find: /((?:\{\{DEFAULTSORT *:|\[\[Categoria:[^\|\]\n]+\|)[^\[\]\{\}\n]*[^ \-\(\/])D/g,
						replace: '$1d',
						num: 100
					}, {
						name: 'E',
						find: /((?:\{\{DEFAULTSORT *:|\[\[Categoria:[^\|\]\n]+\|)[^\[\]\{\}\n]*[^ \-\(\/])E/g,
						replace: '$1e',
						num: 100
					}, {
						name: 'F',
						find: /((?:\{\{DEFAULTSORT *:|\[\[Categoria:[^\|\]\n]+\|)[^\[\]\{\}\n]*[^ \-\(\/])F/g,
						replace: '$1f',
						num: 100
					}, {
						name: 'G',
						find: /((?:\{\{DEFAULTSORT *:|\[\[Categoria:[^\|\]\n]+\|)[^\[\]\{\}\n]*[^ \-\(\/])G/g,
						replace: '$1g',
						num: 100
					}, {
						name: 'H',
						find: /((?:\{\{DEFAULTSORT *:|\[\[Categoria:[^\|\]\n]+\|)[^\[\]\{\}\n]*[^ \-\(\/])H/g,
						replace: '$1h',
						num: 100
					}, {
						name: 'I',
						find: /((?:\{\{DEFAULTSORT *:|\[\[Categoria:[^\|\]\n]+\|)[^\[\]\{\}\n]*[^ \-\(\/])I/g,
						replace: '$1i',
						num: 100
					}, {
						name: 'J',
						find: /((?:\{\{DEFAULTSORT *:|\[\[Categoria:[^\|\]\n]+\|)[^\[\]\{\}\n]*[^ \-\(\/])J/g,
						replace: '$1j',
						num: 100
					}, {
						name: 'K',
						find: /((?:\{\{DEFAULTSORT *:|\[\[Categoria:[^\|\]\n]+\|)[^\[\]\{\}\n]*[^ \-\(\/])K/g,
						replace: '$1k',
						num: 100
					}, {
						name: 'L',
						find: /((?:\{\{DEFAULTSORT *:|\[\[Categoria:[^\|\]\n]+\|)[^\[\]\{\}\n]*[^ \-\(\/])L/g,
						replace: '$1l',
						num: 100
					}, {
						name: 'M',
						find: /((?:\{\{DEFAULTSORT *:|\[\[Categoria:[^\|\]\n]+\|)[^\[\]\{\}\n]*[^ \-\(\/])M/g,
						replace: '$1m',
						num: 100
					}, {
						name: 'N',
						find: /((?:\{\{DEFAULTSORT *:|\[\[Categoria:[^\|\]\n]+\|)[^\[\]\{\}\n]*[^ \-\(\/])N/g,
						replace: '$1n',
						num: 100
					}, {
						name: 'O',
						find: /((?:\{\{DEFAULTSORT *:|\[\[Categoria:[^\|\]\n]+\|)[^\[\]\{\}\n]*[^ \-\(\/])O/g,
						replace: '$1o',
						num: 100
					}, {
						name: 'P',
						find: /((?:\{\{DEFAULTSORT *:|\[\[Categoria:[^\|\]\n]+\|)[^\[\]\{\}\n]*[^ \-\(\/])P/g,
						replace: '$1p',
						num: 100
					}, {
						name: 'Q',
						find: /((?:\{\{DEFAULTSORT *:|\[\[Categoria:[^\|\]\n]+\|)[^\[\]\{\}\n]*[^ \-\(\/])Q/g,
						replace: '$1q',
						num: 100
					}, {
						name: 'R',
						find: /((?:\{\{DEFAULTSORT *:|\[\[Categoria:[^\|\]\n]+\|)[^\[\]\{\}\n]*[^ \-\(\/])R/g,
						replace: '$1r',
						num: 100
					}, {
						name: 'S',
						find: /((?:\{\{DEFAULTSORT *:|\[\[Categoria:[^\|\]\n]+\|)[^\[\]\{\}\n]*[^ \-\(\/])S/g,
						replace: '$1s',
						num: 100
					}, {
						name: 'T',
						find: /((?:\{\{DEFAULTSORT *:|\[\[Categoria:[^\|\]\n]+\|)[^\[\]\{\}\n]*[^ \-\(\/])T/g,
						replace: '$1t',
						num: 100
					}, {
						name: 'U',
						find: /((?:\{\{DEFAULTSORT *:|\[\[Categoria:[^\|\]\n]+\|)[^\[\]\{\}\n]*[^ \-\(\/])U/g,
						replace: '$1u',
						num: 100
					}, {
						name: 'V',
						find: /((?:\{\{DEFAULTSORT *:|\[\[Categoria:[^\|\]\n]+\|)[^\[\]\{\}\n]*[^ \-\(\/])V/g,
						replace: '$1v',
						num: 100
					}, {
						name: 'W',
						find: /((?:\{\{DEFAULTSORT *:|\[\[Categoria:[^\|\]\n]+\|)[^\[\]\{\}\n]*[^ \-\(\/])W/g,
						replace: '$1w',
						num: 100
					}, {
						name: 'X',
						find: /((?:\{\{DEFAULTSORT *:|\[\[Categoria:[^\|\]\n]+\|)[^\[\]\{\}\n]*[^ \-\(\/])X/g,
						replace: '$1x',
						num: 100
					}, {
						name: 'Y',
						find: /((?:\{\{DEFAULTSORT *:|\[\[Categoria:[^\|\]\n]+\|)[^\[\]\{\}\n]*[^ \-\(\/])Y/g,
						replace: '$1y',
						num: 100
					}, {
						name: 'Z',
						find: /((?:\{\{DEFAULTSORT *:|\[\[Categoria:[^\|\]\n]+\|)[^\[\]\{\}\n]*[^ \-\(\/])Z/g,
						replace: '$1z',
						num: 100
					}]
				}, {
					name: 'Remove \'',
					find: /((?:\{\{DEFAULTSORT *:|\[\[Categoria:[^\|\]\n]+\|)[^\}\]\n]*)'([^\}\]\n]*[\}\]])/g,
					replace: '$1$2',
					num: 100
				}]
			}, {
				name: 'Remove defaultsort',
				find: /\{\{DEFAULTSORT:.*\}\}\r?\n/g,
				replace: '',
				ifhas: /▓([^╦]*)╦[^░]*\{\{DEFAULTSORT:\1\}\}/
			}, {
				name: 'Defaultsort duplo',
				find: /(\{\{DEFAULTSORT:.*\}\}[^░]*)\{\{DEFAULTSORT:.*\}\}/g,
				replace: '$1',
				num: 10
			}, {
				name: '- Indice = defaultsort',
				find: /(\{\{DEFAULTSORT:(.*)\}\}[^░]*\[\[Categoria:[^\|\n]*)\|\2\]\]/g,
				replace: '$1]]',
				num: 100
			}]
		}, {
			name: 'Predefs inf',
			sub: [{
				name: 'Caixa de Sucessão',
				sub: [{
					name: 'linha entre caixas',
					find: /(\{\{Termina caixa\}\})(?:\r?\n){2,}(\{\{Começa caixa\}\})/ig,
					replace: '$1\n$2'
				}, {
					name: 'linha após {{Começa caixa}}',
					find: /(\{\{Começa caixa\}\})(?:\r?\n){2,}(\{\{Caixa de sucessão)/ig,
					replace: '$1\n$2'
				}, {
					name: 'linha antes {{Termina caixa}}',
					find: /(\}\})(?:\r?\n){2,}(\{\{Termina caixa\}\})/ig,
					replace: '$1\n$2'
				}]
			}, {
				name: '{{Bloco de navegação}}',
				sub: [{
					name: '{{-}}{{Bloco de navegação',
					find: /\{\{\-\}\}(\r?\n)*\{\{Bloco de navegação/ig,
					replace: '{{Bloco de navegação'
				}]
			}, {
				name: 'Portal',
				ifnot: /▓(Wikipedia|Ficheiro|MediaWiki|Predefinição|Ajuda|Categoria|Portal)( Discussão)?:/i,
				sub: [{
					name: 'Add {{Portal}}',
					ifnot: /\{\{(Portal3|desambiguação)/i,
					sub: [{
						name: 'Geral vazia',
						find: /\r?\n\r?\n(\[\[Categoria:|\{\{DEFAULTSORT:)/g,
						replace: '\n\n{{Portal3|}}\n\n$1',
						ifnot: /\{\{Portal3/i
					}]
				}, {
					name: 'Portal3 duplo',
					find: /(\{\{Portal3\|[^}]*\}\}[^░]*)\{\{Portal3\|\}\}/g,
					replace: '$1'
				}, {
					name: 'Ajuste em portal',
					find: /(\{\{Portal3.*)\| *[0-9]=/ig,
					replace: '$1|',
					num: 100
				}, {
					name: 'Preenchendo {{Portal}}',
					ifhas: '{{Portal3', // FIXME: /\{\{Portal3/i ?
					sub: [{
						name: 'Linguística',
      find: /\{\{Portal3\|/g,
						replace: '{{Portal3|Linguística|',
						ifhas: /\[\[Categoria:(.* )?(Gramática|Línguas|Linguística|Alfabeto)[ \|\]]/i,
						ifnot: /\{\{Portal3.*\|Linguística[ \|\}]/i
					}, {
						name: 'Educação',
						find: /\{\{Portal3\|/g, // FIXME: /\{\{Portal3|/gi ?
						replace: '{{Portal3|Educação|',
						ifhas: /\[\[Categoria:(Universidade|Professores|Instituições de ensino)[ \|\]]/i,
						ifnot: /(\{\{Portal3.*\|Educação[ \|\}]|\[\[Categoria:(.* )?(Ex\-alunos)[ \|\]])\n/i
					}, {
						name: 'Sociedade',
						sub: [{
							name: 'Política',
       find: /\{\{Portal3\|/g,
							replace: '{{Portal3|Política|',
							ifhas: /(\[\[Categoria:(.* )?(Política|Políticos|Senadores|Deputados|Governadores|Ministros)[ \|\]]|\{\{Info\/Político)/i,
							ifnot: /\{\{Portal3.*\|Política[ \|\}]/i
						}, {
							name: 'Futebol',
       find: /\{\{Portal3\|/g,
							replace: '{{Portal3|Futebol|',
							ifhas: /\[\[Categoria:(.* )?(futebol|futebolistas)[ \|\]]/i,
							ifnot: /\{\{Portal3.*\|Futebol[ \|\}]/i
						}, {
							name: 'Desporto',
       find: /\{\{Portal3\|/g,
							replace: '{{Portal3|Desporto|',
							ifhas: /\[\[Categoria:(.* )?(Desportos|Esportes|Desportistas)[ \|\]]/i,
							ifnot: /\{\{Portal3.*\|(Desporto|Futebol)[ \|\}]/i
						}]
					}, {
						name: 'Países (com predef)',
						sub: [{
							name: '{{esboço-geofr}}',
       find: /\{\{Portal3\|/g,
							replace: '{{Portal3|França|',
							ifhas: /\{\{esboço-geofr\}\}/i,
							ifnot: /\{\{Portal3.*\|França/i
						}, {
							name: '{{Info/xxx do país',
							find: /(\{\{Info\/(?:Província|Cidade|Estado|Município|Comuna|Localidade)s? d[aeo]s? ([^\r\n\-\|╔]+)[\r\n\-\|╔][^░]*\{\{Portal3\|)/ig,
							replace: '$1$2|'
						}, {
							name: 'EUA',
							find: /(\{\{Portal3.*\|)EUA/ig,
							replace: '$1Estados Unidos'
						}]
					}, {
						name: 'Geografia',
						sub: [{
							name: 'Geografia',
       find: /\{\{Portal3\|/g,
							replace: '{{Portal3|Geografia|',
							ifhas: /\[\[Categoria:(.* )?(Geografia)[ \|\]]/i,
							ifnot: /\{\{Portal3.*\|Geografia[ \|\}]/i
						}]
					}, {
						name: 'Ciência',
						sub: [{
							name: 'Zoologia',
       find: /\{\{Portal3\|/g,
							replace: '{{Portal3|Zoologia|',
							ifhas: /\[\[Categoria:(.* )?(Zoologia|Artrópodes)[ \|\]]/i,
							ifnot: /\{\{Portal3.*\|Zoologia[ \|\}]/i
						}, {
							name: 'Tecnologias de informação',
       find: /\{\{Portal3\|/g,
							replace: '{{Portal3|Tecnologias de informação|',
							ifhas: /(\[\[Categoria:(.* )?(Tecnologias de informação|Informática|Computadores|Criptografia|Algoritmos)[ \|\]]|\{\{Info\/Sítio *[\|\r?\n|╔])/i,
							ifnot: /\{\{Portal3.*\|Tecnologias de informação[ \|\}]/i
						}, {
							name: 'Saúde',
       find: /\{\{Portal3\|/g,
							replace: '{{Portal3|Saúde|',
							ifhas: /(\[\[Categoria:(.* )?(Doenças|Médicos|Oncologia|Saúde)[ \|\]]|\{\{(Esboço\-medicina)[ \|\]\}\r\n])/i,
							ifnot: /\{\{Portal3.*\|Saúde[ \|\}]/i
						}, {
							name: 'Química',
       find: /\{\{Portal3\|/g,
							replace: '{{Portal3|Química|',
							ifhas: /(\[\[Categoria:(.* )?(Química?o?s?|Ácidos?|Óxidos?)[ \|\]]|\{\{Info\/Química)/i,
							ifnot: /\{\{Portal3.*\|Química[ \|\}]/i
						}, {
							name: 'Matemática',
       find: /\{\{Portal3\|/g,
							replace: '{{Portal3|Matemática|',
							ifhas: /\[\[Categoria:(.* )?(Matemática|Matemáticos|Números)[ \|\]]/i,
							ifnot: /\{\{Portal3.*\|Matemática[ \|\}]/i
						}, {
							name: 'Física',
       find: /\{\{Portal3\|/g,
							replace: '{{Portal3|Física|',
							ifhas: /\[\[Categoria:(.* )?(Física)[ \|\]]/i,
							ifnot: /(\{\{Portal3.*\|Física[ \|\}]|\[\[Categoria:(.* )?(Educação Física)[ \|\]])/i
						}, {
							name: 'Biologia',
							find: /\{\{Portal3\|/g, // FIXME: /\{\{Portal3|/gi ?
							replace: '{{Portal3|Biologia|',
							ifhas: /\[\[Categoria:(.* )?(Biologia|Musculo|Muscular|Anatomia)[ \|\]]/i,
							ifnot: /\{\{Portal3.*\|Biologia[ \|\}]/i
						}, {
							name: 'Botânica 2',
       find: /\{\{Portal3\|/g,
							replace: '{{Portal3|Botânica|',
							ifhas: /\{\{Esboço\-(Botânica)\}\}/i,
							ifnot: /\{\{Portal3.*\|Botânica[ \|\}]/i
						}, {
							name: 'Botânica (cat)',
       find: /\{\{Portal3\|/g,
							replace: '{{Portal3|Botânica|',
							ifhas: /(\[\[Categoria:(.* )?|\{\{esboço\-)(alga|apiales|árvore|asterácea|botânica|botânicos|briófito|cacto|crassulaceae|feto|gramínea|lamiales|legume|malvales|monocotiledónea|orquídea|palmeira|planta|poales|rosales|rosídea|santalales)[ \|\]]/i,
							ifnot: /\{\{Portal3.*\|Botânica[ \|\}]/i
						}, {
							name: 'Astronomia',
       find: /\{\{Portal3\|/g,
							replace: '{{Portal3|Astronomia|',
							ifhas: /\[\[Categoria:(.* )?(Astronomia)[ \|\]]/i,
							ifnot: /\{\{Portal3.*\|Astronomia[ \|\}]/i
						}, {
							name: 'Administração',
       find: /\{\{Portal3\|/g,
							replace: '{{Portal3|Administração|',
							ifhas: /(\[\[Categoria:(.* )?(Administração)[ \|\]]|\{\{(Portal\-administração))/i,
							ifnot: /\{\{Portal3.*\|Administração[ \|\}]/i
						}]
					}, {
						name: 'Portugal (predef)',
      find: /\{\{Portal3\|/g,
						replace: '{{Portal3|Portugal|',
						ifhas: /\{\{(Esboço\-freguesiaspt)\}\}/i,
						ifnot: /\{\{Portal3.*\|Portugal[ \|\}]/i
					}, {
						name: 'Biografias',
      find: /\{\{Portal3\|/g,
						replace: '{{Portal3|Biografias|',
						ifhas: /(\{\{(Esboço\-(biografia|jornalista))\}\}|\{\{Info\/(Ator|Arquiteto|Biografia|Cientista|Comediante|Criminoso|Deputado de Portugal|Enxadrista|Filósofo|Futebolista|Goísta|Político)|\[\[Categoria:(Atores|Cantores|Escritores|Futebolistas|Matemáticos|Pessoas|Prefeitos|Cônsules) d|\[\[Categoria:(Mortos em|Pilotos de)|\{\{sem infocaixa\|(Santos)|\n *\| *(datadenascimento|nascimento_data) *=|\| *fundo *= *cantor_solo)/i,
						ifnot: /\{\{Portal3.*\|Biografias[ \|\}]/i
					}, {
						name: 'Brasil (predef)',
						sub: [{
							name: 'Brasil (predef)',
							find: /\{\{Portal3\|/g, // FIXME: /\{\{Portal3|/gi ?
							replace: '{{Portal3|Brasil|',
							ifhas: /\{\{Info\/Município do Brasil[\r\n\|]/i,
							ifnot: /(\{\{Portal3.*\|(Brasil|Tocantins|Sergirpe|São Paulo|Santa Catarina|Roraima|Rondônia|Rio Grande do Sul|Rio Grande do Norte|Rio de Janeiro|Piauí|Pernambuco|Paraná|Paraíba|Pará|Minas Gerais|Mato Grosso do Sul|Mato Grosso|Maranhão|Goiás|Espírito Santo|Ceará|Bahia|Amazonas|Amapá|Alagoas|Acre)|\[\[Categoria:(.* )?(Mineiros))[ \|\}]/i
						}]
					}, {
						name: 'Arte',
						sub: [{
							name: 'Televisão',
       find: /\{\{Portal3\|/g,
							replace: '{{Portal3|Televisão|',
							ifhas: /(\[\[Categoria:(.* )?(Televisão|Desenhos? animados?|Programas de televisão|Telenovelas|Reality shows)[ \|\]]|\{\{Info\/Televisão|\{\{Info\/Episódio de série|\{\{Esboço\-tv)/i,
							ifnot: /\{\{Portal3.*\|Televisão[ \|\}]/i
						}, {
							name: 'Pintura',
       find: /\{\{Portal3\|/g,
							replace: '{{Portal3|Pintura|',
							ifhas: /(\[\[Categoria:(.* )?(Pintores)[ \|\]]|\{\{Info\/Pintura)/i,
							ifnot: /\{\{Portal3.*\|Pintura[ \|\}]/i
						}, {
							name: 'Música',
       find: /\{\{Portal3\|/g,
							replace: '{{Portal3|Música|',
							ifhas: /(\[\[Categoria:(.* )?(Música|álbum|álbuns|canção|canções|singles d|cantore?s?|musicais|bandas)[ \|\]]|\{\{Info\/(Turnê|Álbum|música|Single|Ópera|Banda)|\{esboço\-música\})/i,
							ifnot: /\{\{Portal3.*\|(Música|Eurovisão)[ \|\}]/i
						}, {
							name: 'Literatura',
       find: /\{\{Portal3\|/g,
							replace: '{{Portal3|Literatura|',
							ifhas: /\[\[Categoria:(.* )?(Literatura|Livros|Escritores|Poetas)[ \|\]]/i,
							ifnot: /(\{\{Portal3.*\|Literatura[ \|\}]|\[\[Categoria:.*basead[ao]s? em livros?)/i
						}, {
							name: 'Games',
       find: /\{\{Portal3\|/g,
							replace: '{{Portal3|Games|',
							ifhas: /(\[\[Categoria:(.* )?(jogos? eletrônicos?|videogames?|PlayStation|Jogos para computador)[ \|\]]|\{\{(Info\/Jogo|Infobox VG))/i,
							ifnot: /\{\{Portal3.*\|Games[ \|\}]/i
						}, {
							name: 'Cinema',
       find: /\{\{Portal3\|/g,
							replace: '{{Portal3|Cinema|',
							ifhas: /(\[\[Categoria:(.* )?(Cinema|Filmes|Ator)[ \|\]]|\{\{(Info\/Filme|Info\/Cineasta)[ \|\]\r\n])/i,
							ifnot: /\{\{Portal3.*\|Cinema[ \|\}]/i
						}, {
							name: 'Banda desenhada',
       find: /\{\{Portal3\|/g,
							replace: '{{Portal3|Banda desenhada|',
							ifhas: /(\[\[Categoria:(.* )?(banda desenhada|DC Comics|Marvel Comics)[ \|\]]|\{\{(Info\/Graphic Novel|Esboço-bd|Portal BD))/i,
							ifnot: /\{\{Portal3.*\|Banda desenhada[ \|\}]/i
						}, {
							name: 'Animangá',
       find: /\{\{Portal3\|/g,
							replace: '{{Portal3|Animangá|',
							ifhas: /(\[\[Categoria:(.* )?(Anime|Mangá|Bleach|Naruto)[ \|\]]|\{\{Info\/(Bleach|Naruto))/i,
							ifnot: /\{\{Portal3.*\|Animangá[ \|\}]/i
						}, {
							name: 'Ator',
							ifhas: /(\[\[Categoria:(.* )?(Atores|Atrizes)[ \|\]]|Info\/Ator)/i,
							sub: [{
								name: 'Ator - cinema',
        find: /\{\{Portal3\|/g,
								replace: '{{Portal3|Cinema|',
								ifhas: /\n║=+ (Cinema|Filmes) =+\r?\n/i,
								ifnot: /\{\{Portal3.*\|Cinema[ \|\}]/i
							}, {
								name: 'Ator - televisão',
        find: /\{\{Portal3\|/g,
								replace: '{{Portal3|Televisão|',
								ifhas: /\n║=+ (Novelas|Séries|Televisão) =+\r?\n/i,
								ifnot: /\{\{Portal3.*\|(Televisão|Cinema)[ \|\}]/i
							}, {
								name: 'Ator - genérico',
        find: /\{\{Portal3\|/g,
								replace: '{{Portal3|Arte|'
							}]
						}, {
							name: 'Arte (cat)',
       find: /\{\{Portal3\|/g,
							replace: '{{Portal3|Arte|',
							ifhas: /\[\[Categoria:(.* )?(Arte|Artistas|Personagens|Fictícios)[ \|\]]/i,
							ifnot: /\{\{Portal3.*\|(Arte|Animangá|Banda desenhada|Cinema|Games|Literatura|Música|Pintura|Televisão)[\|\}]/i
						}]
					}]
				}, {
					name: 'Retirando {{Portal3|',
					sub: [{
						name: 'Brasil',
						find: /(\{\{Portal3.*)\|Brasil/ig,
						replace: '$1',
						num: 10,
						ifhas: /\{\{Portal3.*\|(Tocantins|Sergirpe|São Paulo|Santa Catarina|Roraima|Rondônia|Rio Grande do Sul|Rio Grande do Norte|Rio de Janeiro|Piauí|Pernambuco|Paraná|Paraíba|Pará|Minas Gerais|Mato Grosso do Sul|Mato Grosso|Maranhão|Goiás|Espírito Santo|Ceará|Bahia|Amazonas|Amapá|Alagoas|Acre)[ \|\}]/i
					}, {
						name: 'Sociedade',
						find: /(\{\{Portal3.*)\|Sociedade/ig,
						replace: '$1',
						num: 10,
						ifhas: /\{\{Portal3.*\|(Política|Futebol|Desporto)[\|\}]/i
					}, {
						name: 'Duplicado espaçado',
						find: /(\{\{Portal3.*)\|([^\|\n]+)(\|.*)(\|\2[\|}])/ig,
						replace: '$1$3$4',
						num: 10
					}, {
						name: 'Duplicado junto',
						find: /(\{\{Portal3.*)\|([^\|\n]+)(\|\2[\|}])/ig,
						replace: '$1$3'
					}]
				}, {
					name: 'Arrumando portal',
					find: /(\{\{Portal3.*)\|\}\}/ig,
					replace: '$1}}',
					num: 10
				}, {
					name: 'Removendo portal vazio',
					find: /\{\{Portal3\}\}\r?\n\r?\n/ig,
					replace: ''
				}, {
					name: 'Removendo portal antigo',
					find: /\{\{(portal\-(administração|cinema|química|lingüística)|Portal BD)\}\}/ig,
					replace: ''
				}]
			}, {
				name: 'Tags man',
				sub: [{
					name: 'Inserindo',
					sub: [{
						name: '{{Reciclagem|Predefinição}}',
						find: /\r?\n\r?\n(\[\[Categoria:|\{\{DEFAULTSORT:)/g,
						replace: '\n\n{{Reciclagem|Predefinição}}\n\n$1',
						ifhas: /(\{\{Navebox|\{\{#if:|\{\{#switch:|[^{]\{\{\{)/i,
						ifnot: /\{\{Reciclagem[\|}]/i
					}]
				}, {
					name: 'Retirando',
					sub: [{
						name: '{{semfichatécnica}}',
						find: /\{\{semfichatécnica\}\}/ig,
						replace: '{{Revisar Info Filme}}',
						ifhas: '{{Info/Filme' // FIXME: /\{\{Info/Filme/i ?
					}, {
						name: '{{seminterwiki}}',
						find: /\{\{seminterwiki.*\}\}\r?\n/ig,
						replace: '',
						ifhas: /\[\[\s*[a-z][a-z]\s*:/
					}]
				}]
			}]
		}, {
			name: 'Seções vazias',
			sub: [{
				name: 'Seção LE vazia',
				find: /║== Ligações externas ==\n*(║==[^=]|\{\{(DEFAULTSORT|Esboço|Bloco de navegação|Sucessão)|\[\[Categoria:)/ig,
				replace: '$1'
			}, {
				name: 'Seção VT vazia',
				find: /║== Ver também ==\n*(║==[^=]|\{\{(DEFAULTSORT|Esboço|Bloco de navegação|Sucessão)|\[\[Categoria:)/ig,
				replace: '$1'
			}]
		}]
	}, {
		name: 'Geral 2',
		sub: [{
			name: 'Tag man',
			ifhas: '{{', // FIXME: /\{\{/i ?
			sub: [{
				name: 'marcando predefs',
				find: /\{\{(Artigo longo|Carece de fontes2|Carece de fontes|Contextualizar|Controverso|Corrigir|Fusão|Fusão com|Fusão de|Mais notas|M\-notas\-bpv|Parcial|Reciclagem|Revisão|Revisão\-sobre|Sem\-fontes|Sem imagem|Seminterwiki|Sem[\- ]notas|Trivia|Wikificação)([\|}])/ig,
				replace: '{{┴$1$2'
			}, {
				name: 'Datando predefs',
				sub: [{
					name: 'Campo data correto',
					find: /\{\{(┴[^\|{}\n]*)\|(?:Dat[ae])=/ig,
					replace: '{{$1|data=',
					num: 100
				}, {
					name: 'Marcando |data=',
					find: /(\{\{┴[^{}\n]*)\| *data *\=/ig,
					replace: '$1|├',
					num: 100
				}, {
					name: 'Datando 2',
					find: /\{\{(┴[^\|{}\n]*\|[^├\n]*)(janeiro|fevereiro|março|abril|maio|junho|julho|agosto|setembro|outubro|novembro|dezembro)/ig,
					replace: '{{$1|├$2'
				}, {
					name: 'Datando',
					find: /\{\{(┴[^\|{}\n]*\|[^├{}\n]*)\}\}/ig,
					replace: '{{$1|data={{subst:CURRENTMONTHNAME}} de {{subst:CURRENTYEAR}}}}'
				}, {
					name: 'Rule',
					find: /(\{\{(?:┴[^\|{}\n]*\|)(?:[^├{}\n]*├[^ {}\n]*)) (2[0-9])/ig,
					replace: '$1 de $2'
				}, {
					name: 'Desmarcando |data=',
					find: /├/g,
					replace: 'data='
				}, {
					name: 'Datando 1',
					find: /\{\{(┴[^\|{}\n]*)(\|seção)?\}\}/ig,
					replace: '{{$1|data={{subst:CURRENTMONTHNAME}} de {{subst:CURRENTYEAR}}$2}}'
				}, {
					name: 'Datando 3',
					find: /\{\{Revisão\-sobre\|([^\|\n{}]+)\}\}/ig,
					replace: '{{Revisão-sobre|$1|data={{subst:CURRENTMONTHNAME}} de {{subst:CURRENTYEAR}}}}'
				}]
			}, {
				name: 'Assunto em predef man',
				ifhas: '{{Portal3', // FIXME: /\{\{Portal3/i ?
				sub: [{
					enabled: false,
					name: 'Assunto em predef man Timor-Leste',
					ifhas: /\{\{Portal3.*\|Timor-Leste[ \|\}]/,
					sub: [{
						name: 'marcando Timor-Leste',
						find: /\| *Timor-Leste *\= */g,
						replace: '├'
					}, {
						name: 'inserindo Timor-Leste',
						find: /\{\{(Artigo longo|Contextualizar|Controverso|Corrigir|Fusão|Fusão com|Fusão de|Parcial|Reciclagem|Sem\-fontes|Sem imagem|Seminterwiki|Seminterwiki\-categoria|Sem\-notas|Trivia|Wikificação)([\|}][^}\n├┼]*\})/ig,
						replace: '{{$1├sim$2'
					}, {
						name: 'desmarcando Timor-Leste',
						find: /├/g,
						replace: '|Timor-Leste='
					}]
				}, {
					name: 'Assunto em predef man sociedade',
					ifhas: /(\{\{Portal3.*\|(Sociedade|Política|Futebol|Desporto)[ \|\}])/,
					sub: [{
						name: 'marcando desporto',
						find: /\| *desporto\= */ig,
						replace: '┼'
					}, {
						name: 'marcando sociedade',
						find: /\| *sociedade\= */g,
						replace: '├'
					}, {
						name: 'inserindo sociedade',
						find: /\{\{(┴[^\|{}\n├┼]*)([\|}][^}\n├┼]*\})/ig,
						replace: '{{$1├sim$2',
						ifnot: /├ *[^\|}]/i
					}, {
						name: 'preenche sociedade',
						find: /(\{\{┴[^├]*├) *([\|\}])/ig,
						replace: '$1sim$2',
						ifhas: /├ *[\|}]/i
					}, {
						name: 'inserindo desporto',
						find: /├/ig,
						replace: '┼',
						ifhas: /\{\{Portal3.*\|(Desportos?|Futebol|Ginástica|Eventos multiesportivos)/i
					}, {
						name: 'desmarcando sociedade',
						find: /├/g,
						replace: '|sociedade='
					}, {
						name: 'desmarcando desporto',
						find: /┼/g,
						replace: '|desporto='
					}]
				}, {
					enabled: false,
					name: 'Assunto em predef man São Tomé e Príncipe',
					ifhas: /\{\{Portal3.*\|São Tomé e Príncipe[ \|\}]/,
					sub: [{
						name: 'marcando São Tomé e Príncipe',
						find: /\| *São Tomé e Príncipe *\= */g,
						replace: '├'
					}, {
						name: 'inserindo São Tomé e Príncipe',
						find: /\{\{(Artigo longo|Contextualizar|Controverso|Corrigir|Fusão|Fusão com|Fusão de|Parcial|Reciclagem|Sem\-fontes|Sem imagem|Seminterwiki|Seminterwiki\-categoria|Sem\-notas|Trivia|Wikificação)([\|}][^}\n├┼]*\})/ig,
						replace: '{{$1├sim$2'
					}, {
						name: 'desmarcando São Tomé e Príncipe',
						find: /├/g,
						replace: '|São Tomé e Príncipe='
					}]
				}, {
					name: 'Assunto em predef man Portugal',
					ifhas: /(\[\[Categoria:(.* )?(Portugal)[ \|\]]|\{\{Portal3.*\|Portugal[ \|\}]|\{\{(Esboço\-freguesiaspt)\}\})/i,
					sub: [{
						name: 'marcando Portugal',
						find: /\| *Portugal\= */g,
						replace: '├'
					}, {
						name: 'inserindo Portugal',
						find: /\{\{(┴[^\|{}\n├┼]*)([\|}][^}\n├┼]*\})/ig,
						replace: '{{$1├sim$2',
						ifnot: /├ *[^\|}]/i
					}, {
						name: 'preenche Portugal',
						find: /(\{\{┴[^├]*├) *([\|\}])/ig,
						replace: '$1sim$2',
						ifhas: /├ *[\|}]/i
					}, {
						name: 'desmarcando Portugal',
						find: /├/g,
						replace: '|Portugal='
					}]
				}, {
					enabled: false,
					name: 'Assunto em predef man Moçambique',
					ifhas: /\{\{Portal3.*\|Moçambique[ \|\}]/,
					sub: [{
						name: 'marcando Moçambique',
						find: /\| *Moçambique *\= */g,
						replace: '├'
					}, {
						name: 'inserindo Moçambique',
						find: /\{\{(Artigo longo|Contextualizar|Controverso|Corrigir|Fusão|Fusão com|Fusão de|Parcial|Reciclagem|Sem\-fontes|Sem imagem|Seminterwiki|Seminterwiki\-categoria|Sem\-notas|Trivia|Wikificação)([\|}][^}\n├┼]*\})/ig,
						replace: '{{$1├sim$2'
					}, {
						name: 'desmarcando Moçambique',
						find: /├/g,
						replace: '|Moçambique='
					}]
				}, {
					enabled: false,
					name: 'Assunto em predef man Guiné-Bissau',
					ifhas: /\{\{Portal3.*\|Guiné-Bissau[ \|\}]/,
					sub: [{
						name: 'marcando Guiné-Bissau',
						find: /\| *Guiné-Bissau *\= */g,
						replace: '├'
					}, {
						name: 'inserindo Guiné-Bissau',
						find: /\{\{(┴[^\|{}\n]*)([\|}][^}\n├┼]*\})/ig,
						replace: '{{$1├sim$2'
					}, {
						name: 'desmarcando Guiné-Bissau',
						find: /├/g,
						replace: '|Guiné-Bissau='
					}]
				}, {
					name: 'Assunto em predef man geografia',
					ifhas: /\{\{Portal3.*\|Geografia[ \|\}]/,
					sub: [{
						name: 'marcando geografia',
						find: /\| *geografia\= */g,
						replace: '├'
					}, {
						name: 'inserindo geografia',
						find: /\{\{(┴[^\|{}\n├┼]*)([\|}][^}\n├┼]*\})/ig,
						replace: '{{$1├sim$2',
						ifnot: /├ *[^\|}]/i
					}, {
						name: 'preenche geografia',
						find: /(\{\{┴[^├]*├) *([\|\}])/ig,
						replace: '$1sim$2',
						ifhas: /├ *[\|}]/i
					}, {
						name: 'desmarcando geografia',
						find: /├/g,
						replace: '|geografia='
					}]
				}, {
					name: 'Assunto em predef man ciência',
					ifhas: /(\[\[Categoria:(.* )?(Ciência|Cientista)[ \|\]]|\{\{Portal3.*\|(Ciência|Administração|Astronomia|Botânica|Biologia|Física|Matemática|Química|Saúde|Tecnologias de informação|Zoologia)[ \|\}]|\{\{(Info\/Taxonomia))/i,
					sub: [{
						name: 'marcando ciência',
						find: /\| *ciência\= */g,
						replace: '├'
					}, {
						name: 'inserindo ciência',
						find: /\{\{(┴[^\|{}\n├┼]*)([\|}][^}\n├┼]*\})/ig,
						replace: '{{$1├sim$2'
					}, {
						name: 'preenche ciência',
						find: /(\{\{┴[^├]*├) *([\|\}])/ig,
						replace: '$1sim$2',
						ifhas: /├ *[\|}]/
					}, {
						name: 'desmarcando ciência',
						find: /├/g,
						replace: '|ciência='
					}]
				}, {
					enabled: false,
					name: 'Assunto em predef man Cabo Verde',
					ifhas: /\{\{Portal3.*\|Cabo Verde[ \|\}]/,
					sub: [{
						name: 'marcando Cabo Verde',
						find: /\| *Cabo Verde *\= */g,
						replace: '├'
					}, {
						name: 'inserindo Cabo Verde',
						find: /\{\{(┴[^\|{}\n]*)([\|}][^}\n├┼]*\})/ig,
						replace: '{{$1├sim$2',
						ifnot: /├ *[^\|}]/i
					}, {
						name: 'desmarcando Cabo Verde',
						find: /├/g,
						replace: '|Cabo Verde='
					}]
				}, {
					name: 'Assunto em predef man Brasil',
					ifhas: /(\[\[Categoria:(.* )?(Brasil)[ \|\]]|\{\{Portal3.*\|(Brasil|Tocantins|Sergirpe|São Paulo|Santa Catarina|Roraima|Rondônia|Rio Grande do Sul|Rio Grande do Norte|Rio de Janeiro|Piauí|Pernambuco|Paraná|Paraíba|Pará|Minas Gerais|Mato Grosso do Sul|Mato Grosso|Maranhão|Goiás|Espírito Santo|Ceará|Bahia|Amazonas|Amapá|Alagoas|Acre)|\{\{Info\/Município do Brasil[\r\n\|])/i,
					sub: [{
						name: 'marcando Brasil',
						find: /\| *Brasil\= */g,
						replace: '├'
					}, {
						name: 'inserindo Brasil',
						find: /\{\{(┴[^\|{}\n├┼]*)([\|}][^}\n├┼]*\})/ig,
						replace: '{{$1├sim$2',
						ifnot: /├ *[^\|}]/i
					}, {
						name: 'preenche Brasil',
						find: /(\{\{┴[^├]*├) *([\|\}])/ig,
						replace: '$1sim$2',
						ifhas: /├ *[\|}]/i
					}, {
						name: 'desmarcando Brasil',
						find: /├/g,
						replace: '|Brasil='
					}]
				}, {
					name: 'Assunto em predef man biografia',
					ifhas: /\{\{Portal3.*\|Biografias[ \|\}]/i,
					sub: [{
						name: 'marcando biografia',
						find: /\| *biografia\= */ig,
						replace: '├'
					}, {
						name: 'inserindo biografia',
						find: /\{\{(┴[^\|{}\n├┼]*)([\|}][^}\n├┼]*\})/ig,
						replace: '{{$1├sim$2',
						ifnot: /├ *[^\|}]/i
					}, {
						name: 'preenche biografia',
						find: /(\{\{┴[^├]*├) *([\|\}])/ig,
						replace: '$1sim$2',
						ifhas: /├ *[\|}]/i
					}, {
						name: 'desmarcando biografia',
						find: /├/ig,
						replace: '|biografia='
					}]
				}, {
					enabled: false,
					name: 'Assunto em predef man Angola',
					ifhas: /\{\{Portal3.*\|Angola[ \|\}]/,
					sub: [{
						name: 'marcando Angola',
						find: /\| *Angola *\= */g,
						replace: '├'
					}, {
						name: 'inserindo Angola',
						find: /\{\{(┴[^\|{}\n]*)([\|}][^}\n├┼]*\})/ig,
						replace: '{{$1├sim$2'
					}, {
						name: 'desmarcando Angola',
						find: /├/g,
						replace: '|Angola='
					}]
				}]
			}, {
				name: 'Desmarcando predefs',
				find: /┴/g,
				replace: ''
			}]
		}, {
			name: 'Ordem geral do artigo',
			sub: [{
				name: 'Rule',
				find: /([^\r\n])(\{\{(?:Artigo longo|Contextualizar|Controverso|Corrigir|em construção|Em tradução|Fusão|Fusão com|Fusão de|Parcial|Reciclagem|revisão\-sobre|Revisão|Sem\-fontes|Sem imagem|Sem\-notas|Wikificação))/ig,
				replace: '$1\n$2',
				num: 10
			}, {
				name: 'Ordem das predefs superiores',
				ifhas: /\{\{/i,
				sub: [{
					name: 'Seminfobox para topo',
					find: /(╦\r?\n)([^░]*)(\{\{(?:Falta\-caixa\-info|Sem\-infobox|Sem infocaixa|Semfichatécnica|Revisar Info Filme|Falta\-chembox|Sem\-infotaxo|Falta\-preenchercaixa).*\}\})\r?\n/ig,
					replace: '$1$3\n$2'
				}, {
					name: 'Tag man',
					find: /(╦)\r?\n([^░╬╩]+)\r?\n([^┼]\{(?:Artigo longo|Contextualizar|Controverso|Corrigir|em construção|Em tradução|Fusão|Fusão com|Fusão de|Parcial|Reciclagem|revisão\-sobre|Revisão|Sem\-fontes|Sem imagem|Sem\-notas|Wikificação)\|.*)\r?\n/ig,
					replace: '$1\n┼$3\n$2\n',
					num: 100
				}, {
					name: 'Rule',
					find: /┼/g,
					replace: '',
					num: 100
				}, {
					name: 'Geocoordenadas',
					find: /(╦)\r?\n([^░]+)\r?\n(\{\{(?:geocoordenadas|coor title dms)\|.*)/ig,
					replace: '$1\n$3\n$2'
				}, {
					name: 'Desambig',
					find: /(╦)\r?\n([^░]+)\r?\n(\{\{(?:Desambiguação|Desambigexplicada2?|Minidesambig2?|Não confundir com|Outrosusos|Outrousopara|Complementação de categorias|Redirect|Desambiguação\-redirect|Ver desambiguação2?).*)/ig,
					replace: '$1\n$3\n$2',
					num: 10
				}, {
					name: 'Quebra dupla antes predef man sup',
					find: /(?:\r?\n){2,}\{\{(Artigo longo|Contextualizar|Controverso|Corrigir|Fusão|Fusão com|Fusão de|Geocoordenadas|Parcial|Reciclagem|revisão\-sobre|Revisão|Sem\-fontes|Sem imagem|Seminterwiki|Sem\-notas|Wikificação)([\|}])/ig,
					replace: '\n{{$1$2'
				}]
			}, {
				name: 'Ordem das seções inferiores',
				sub: [{
					name: 'Marca',
					sub: [{
						name: 'Marca LE',
						find: /║== Ligações externas ==/g,
						replace: '┬'
					}, {
						name: 'Marca VT',
						find: /║== Ver também ==/g,
						replace: '┼'
					}, {
						name: 'Marca Biblio',
						find: /\n║== Bibliografia ==\n/ig,
						replace: '├'
					}, {
						name: 'Marca {{Referências}}',
						find: /\{\{Referências/ig,
						replace: '┤'
					}, {
						name: 'Marca ref group=nota',
						find: /║== Notas? ==\n<references group=nota\/>/g,
						replace: '┴',
						ifnot: /┼(\r?\n)*<\/references>/i
					}, {
						name: 'Marca gallery 1',
						find: /║== (Galeria de )?image(ns|m) ==\n<gallery>/ig,
						replace: '┐'
					}, {
						name: 'Marca gallery 2',
						find: /<\/gallery>/g,
						replace: '└'
					}]
				}, {
					name: 'Ordem do ref group=nota',
					ifhas: /┴/i,
					sub: [{
						name: 'Nota & LE',
						find: /(┬[^┴╔╗]*)\r?\n(┴.*)/ig,
						replace: '$2\n\n$1'
					}]
				}, {
					name: 'Ordem da {{referências}} 1',
					ifhas: /┤/i,
					ifnot: /┤.*\}\}\n+===/,
					sub: [{
						name: 'REF & LE 1',
						find: /(┬[^┤╔╗]*)\r?\n(┤.*\}\})/ig,
						replace: '$2\n\n$1'
					}, {
						name: 'REF & Nota 1',
						find: /(┴[^┤╔╗]*)\r?\n(┤.*\}\})/ig,
						replace: '$2\n\n$1'
					}]
				}, {
					name: 'Ordem da {{referências}} 2',
					ifhas: /┤.*\}\}\n+===/i,
					sub: [{
						name: 'REF & Nota 2',
						find: /(┴)\r?\n([^┤╔╗]*)\r?\n(┤.*\}\})\r?\n([^┼┬├╔╗]*)\r?\n([┼┬├])/ig,
						replace: '$3\n$4\n$1\n$2\n$5'
					}]
				}, {
					name: 'Ordem gallery',
					ifhas: '┐',
					sub: [{
						name: 'Gallery & LE',
						find: /(┬[^┐╔╗]*)\r?\n(┐[^└╔╗]+└)/ig,
						replace: '$2\n\n$1'
					}, {
						name: 'Gallery & VT',
						find: /(┼[^┐╔╗]*)\r?\n(┐[^└╔╗]+└)/g,
						replace: '$2\n\n$1'
					}, {
						name: 'Gallery & Biblio',
						find: /(├[^┐╔╗]*)\r?\n(┐[^└╔╗]+└)/g,
						replace: '$2\n\n$1'
					}, {
						name: 'Gallery & Nota',
						find: /(┴[^┐╔╗]*)\r?\n(┐[^└╔╗]+└)/g,
						replace: '$2\n\n$1'
					}, {
						name: 'Gallery & REF',
						find: /(┤.*\}\}[^┐╔╗]*)\r?\n(┐[^└╔╗]+└)/g,
						replace: '$2\n\n$1'
					}]
				}, {
					name: 'Desmarca',
					sub: [{
						name: 'Desmarca ref group=nota',
						find: /┴/g,
						replace: '║== Notas ==\n<references group=nota/>'
					}, {
						name: 'Desmarc {{Ref-section}}',
						find: /┤/g, // FIXME: /┤/gi ?
						replace: '{{referências'
					}, {
						name: 'Desmarca gallery 2',
						find: /└/g,
						replace: '</gallery>'
					}, {
						name: 'Desmarca gallery 1',
						find: /┐/g,
						replace: '║== Galeria de imagens ==\n<gallery>'
					}, {
						name: 'Desmarca Biblio',
						find: /├/ig,
						replace: '\n║== Bibliografia ==\n'
					}, {
						name: 'Desmarca VT',
						find: /┼/g,
						replace: '║== Ver também =='
					}, {
						name: 'Desmarca LE',
						find: /┬/g,
						replace: '║== Ligações externas =='
					}]
				}, {
					name: 'Arrumando quebra de linha em seção',
					find: /\=\=\n\n/g,
					replace: '==\n'
				}]
			}, {
				name: 'Ordem do final',
				ifhas: /\{\{/i,
				sub: [{
					name: 'Marcando',
					sub: [{
						name: 'Marca Portal3',
						find: /\{\{Portal3/ig,
						replace: '┬'
					}, {
						name: 'Marca cat1',
						find: /\n\[\[Categoria:/ig,
						replace: '\n┤'
					}, {
						name: 'Marca Defaultsort',
						find: /\{\{DEFAULTSORT:/g,
						replace: '├',
						num: 10
					}, {
						name: 'Marca correlatos',
						find: /\{\{(Commons(?:cat)?|Wiki?(?:cionário|livros|notícias|quote|species|versity))\|/ig,
						replace: '{{┼$1|',
						num: 10
					}]
				}, {
					name: 'Ordenando',
					sub: [{
						name: 'predef man x Portal',
						find: /\n\{\{(Artigo destacado|Seminterwiki)(.*)\}\}(\r?\n)*([^┬╔╗]*)(┬.*\}\})/ig,
						replace: '\n$4$5\n\n{{$1$2}}',
						num: 10
					}, {
						name: 'Esboço x Portal/Default/Cat',
						find: /\n(\{\{(?:Esboço|Mínimo)(?:.*)\}\})\r?\n([^╔╗┬├┤]*)([┬├┤].*[}\]])/ig,
						replace: '\n$2$1\n$3',
						num: 10
					}, {
						name: 'Portal x Ref-section/Esboço',
						find: /\n(┬.*\}\})([^░]*)(\{\{(?:Referências|Esboço|Mínimo).*\}\})/ig,
						replace: '\n$3\n$1$2',
						num: 10
					}, {
						name: 'Cat x predef man',
						find: /([├┤].*\r?\n[^░╔╗]*)(\{\{(?:Esboço|Mínimo)(?:.*)\}\})/ig,
						replace: '$2\n$1',
						num: 10
					}, {
						name: 'Correlatos x LE',
						find: /(= Ligações externas =+\r?\n)([^┼░]*)\r?\n(\{\{┼[^{}\n]*\}\})\r?\n/g,
						replace: '$1$3\n$2\n',
						num: 10
					}, {
						name: 'Sem iw',
						find: /(\{\{Seminterwiki\|.*\}\})\r?\n([^░]*)░/ig,
						replace: '\n$2\n$1\n░'
					}]
				}, {
					name: 'Desmarca',
					sub: [{
						name: 'Desmarca Portal3',
						find: /┬/g,
						replace: '{{Portal3'
					}, {
						name: 'Desmarca Defaultsort',
						find: /├/g,
						replace: '{{DEFAULTSORT:'
					}, {
						name: 'Desmarca cat1',
						find: /┤/g,
						replace: '[[Categoria:'
					}, {
						name: 'Desmarca vários',
						find: /┼/g,
						replace: '',
						num: 10
					}]
				}]
			}]
		}, {
			name: 'Caracteres individuais',
			ifnot: /(<(blockquote|code|math|timeline|pre|poem|nowiki|quote|source)>|\{\{Citação)/i,
			sub: [{
				/*
				* Segundo [[Unicode]] há +100.000 códigos.
				* A espera de uma idéia melhor para fazer isso.
				* Aqui ficarão apenas os unicodes principais, que cobrirão quase todos os casos.
				* Unicodes raramente usados devem ser consertados manualmente.
				**/
				name: 'Unicode',
				ifhas: '&',
				sub: [{
					name: '&letra',
					ifhas: /&[a-z]/i,
					sub: [{
						name: '&agrave;',
						find: /&agrave;/ig,
						replace: 'à'
					}, {
						name: '&auml;',
						find: /&auml;/ig,
						replace: 'ä'
					}, {
						name: '&bull;',
						find: /&bull;/ig,
						replace: '•'
					}, {
						name: '&ccedil;',
						find: /&ccedil;/ig,
						replace: 'ç'
					}, {
						name: '&copy;',
						find: /&copy;/ig,
						replace: '©'
					}, {
						name: '&dagger;',
						find: /&dagger;/ig,
						replace: '†'
					}, {
						name: '&ETH;',
						find: /&ETH;/ig,
						replace: 'Ð'
					}, {
						name: '&gamma;',
						find: /&gamma;/ig,
						replace: 'γ'
					}, {
						name: '&hellip;',
						find: /&hellip;/ig,
						replace: '…'
					}, {
						name: '&lsquo;',
						find: /&lsquo;/ig,
						replace: '‘'
					}, {
						name: '&mdash;',
						find: /&mdash;/ig,
						replace: '—'
					}, {
						name: '&middot;',
						find: /&middot;/ig,
						replace: '·'
					}, {
						name: '&minus;',
						find: /&minus;/ig,
						replace: '−'
					}, {
						name: '&ndash;',
						find: /&ndash;/ig,
						replace: '–'
					}, {
						name: '&otilde;',
						find: /&otilde;/ig,
						replace: 'õ'
					}, {
						name: '&ouml;',
						find: /&ouml;/ig,
						replace: 'ö'
					}, {
						name: '&quot;',
						find: /&quot;/ig,
						replace: '"'
					}, {
						name: '&rarr;',
						find: /&rarr;/ig,
						replace: '→'
					}, {
						name: '&reg;',
						find: /&reg;/ig,
						replace: '®'
					}, {
						name: '&szlig;',
						find: /&szlig;/ig,
						replace: 'ß'
					}, {
						name: '&trade',
						find: /&trade;/ig,
						replace: '™'
					}, {
						name: '&THORN;',
						find: /&THORN;/ig,
						replace: 'Þ'
					}, {
						name: '&uuml;',
						find: /&uuml;/g,
						replace: 'ü'
					}]
				}, {
					name: '&#',
					ifhas: '&#',
					sub: [{
						name: '&#257;',
						find: /&#257;/g,
						replace: 'ā'
					}, {
						name: '&#265;',
						find: /&#265;/g,
						replace: 'ĉ'
					}, {
						name: '&#269;',
						find: /&#269;/g,
						replace: 'č'
					}, {
						name: '&#285;',
						find: /&#285;/g,
						replace: 'ĝ'
					}, {
						name: '&#293;',
						find: /&#293;/g,
						replace: 'ĥ'
					}, {
						name: '&#306;',
						find: /&#306;/g,
						replace: 'Ĳ'
					}, {
						name: '&#309;',
						find: /&#309;/g,
						replace: 'ĵ'
					}, {
						name: '&#349;',
						find: /&#349;/g,
						replace: 'ŝ'
					}, {
						name: '&#365;',
						find: /&#365;/g,
						replace: 'ŭ'
					}, {
						name: '&#383;',
						find: /&#383;/g,
						replace: 'ſ'
					}, {
						name: '&#39;',
						find: /&#39;/g,
						replace: '\''
					}]
				}]
			}, {
				name: 'Arrow',
				sub: [{
					name: 'Arrow ==>',
					find: /\=+\=\>/ig,
					replace: '⇒',
					num: 100
				}, {
					name: 'Arrow <==',
					find: /<\=\=+/ig,
					replace: '⇐',
					num: 100
				}, {
					name: 'Arrow -->',
					find: /([▓╗][^╔╗░]*)╗/ig,
					replace: '$1→',
					num: 100
				}, {
					name: 'Arrow <--',
					find: /<\-+([^\-])/ig,
					replace: '←$1',
					num: 100
				}, {
					name: 'Arrow ->',
					find: /([^\-])\-\>+/ig,
					replace: '$1→',
					num: 100
				}, {
					name: 'Arrow —>',
					find: /([^\—])\—>+/ig,
					replace: '$1→'
				}, {
					name: 'Seta com > dupla',
					find: /([↔→])>([^>])/ig,
					replace: '$1$2'
				}, {
					name: 'Arrow com - excesso 1',
					find: /([^\-])\-+→/ig,
					replace: '$1→'
				}, {
					name: 'Arrow com - excesso 2',
					find: /←\-+([^\-])/ig,
					replace: '←$1'
				}, {
					name: 'Arrow <==>',
					find: /(⇐\=*>|<\=*⇒)/g,
					replace: '⇐⇒',
					num: 10
				}, {
					name: 'Arrow <-->',
					find: /(←\-*\>|<\-*→)/ig,
					replace: '↔',
					num: 10
				}]
			}, {
				name: 'Unicode 1',
				find: /<sup>1<\/sup>/g,
				replace: '¹',
				num: 100
			}, {
				name: 'Unicode 2',
				find: /<sup>2<\/sup>/g,
				replace: '²',
				num: 100
			}, {
				name: 'Unicode 4',
				find: /&sup2;/g,
				replace: '²',
				num: 100
			}]
		}, {
			name: 'Predef duplicada',
			find: /(\{\{([^\{\}\n]+)\}\})(?:\r?\n)+\{\{\2\}\}\r?\n/ig,
			replace: '$1\n'
		}]
	}, {
		name: 'Trimming 2',
		sub: [{
			name: 'Triming h- final',
			sub: [{
				name: 'espaço antes \n',
				find: /([^ ]) +\r?\n/g,
				replace: '$1\n',
				num: 10
			}, {
				name: 'Rule',
				find: /(\r?\n){3,}/ig,
				replace: '\n\n',
				num: 10
			}]
		}, {
			name: 'Triming v- final',
			sub: [{
				name: 'Quebra dupla antes predef man inf',
				find: /\{\{(Artigo destacado|Esboço|Mínimo|Reciclagem|Semfichatécnica|Seminterwiki|Sem imagem)(.*)\}\}\n\n+\{\{(Artigo destacado|Esboço|Mínimo|Reciclagem|Semfichatécnica|Seminterwiki|Sem imagem)(.*)\}\}/ig,
				replace: '{{$1$2}}\n{{$3$4}}',
				num: 10
			}, {
				name: 'trim v- antes predef',
				find: /([^\r\n])(?:\r?\n){3,}\{\{/ig,
				replace: '$1\n\n{{',
				num: 10
			}, {
				name: 'trim v- antes seção 1',
				find: /([^\r\n])(?:\r?\n *){1,}(╩)/ig,
				replace: '$1\n$2'
			}, {
				name: 'trim v- antes seção',
				find: /([^ \r\n])(?:\r?\n *){3,}(║)/ig,
				replace: '$1\n\n$2',
				num: 10
			}, {
				name: 'trim v- após defaultsort',
				find: /(\{\{DEFAULTSORT:.*\}\})\r?\n\r?\n/g,
				replace: '$1\n',
				num: 10
			}, {
				name: 'trim v- antes cat 1',
				find: /(\{\{DEFAULTSORT:.*\}\})(?:\r?\n){2,}(\[\[Categoria:)/g,
				replace: '$1\n$2',
				num: 10
			}, {
				name: 'trim v- antes cat 2',
				find: /([^\r\n])(?:\r?\n){3,}(\[\[Categoria:)/ig,
				replace: '$1\n$2',
				num: 10
			}, {
				name: 'trim v- antes par1',
				find: /\r?\n\r?\n╚/ig,
				replace: '\n╚'
			}, {
				name: 'trim v- \n+',
				find: /(\r?\n){3,}/ig,
				replace: '\n\n',
				num: 100
			}]
		}, {
			name: 'Triming v+ final',
			sub: [{
				name: 'Rule',
				find: /([^\r\n])\r?\n(\{\{DEFAULTSORT)/g,
				replace: '$1\n\n$2'
			}, {
				name: 'Rule',
				find: /([^\r\n])(\[\[Categoria:)/ig,
				replace: '$1\n$2',
				num: 10
			}, {
				name: 'Rule',
				find: /([^\]\r\n])(?:\r?\n)\[\[Categoria:/ig,
				replace: '$1\n\n[[Categoria:',
				num: 10
			}, {
				name: 'Rule',
				find: /(\{\{DEFAULTSORT:[^{}\n]+\}\})(?:\r?\n){2,}(\[\[Categoria:)/g,
				replace: '$1\n$2'
			}]
		}]
	}, {
		name: 'Temáticos',
		ifnot: /▓(Wikipedia|Ficheiro|MediaWiki|Predefinição|Ajuda|Categoria|Portal)( Discussão)?:/i,
		sub: [{
			name: 'Seções',
			sub: [{
				name: 'Breve Histórico',
				find: /\= Breve Histórico =/g,
				replace: '= Breve histórico ='
			}, {
				name: 'Em Operação',
				find: /\= Em Operação =/g,
				replace: '= Em operação ='
			}, {
				name: 'Contexto Histórico',
				find: /\= Contexto Histórico =/g,
				replace: '= Contexto histórico ='
			}]
		}, {
			name: 'Biografias',
			ifhas: /\{\{Portal3.*\|Biografias/i,
			sub: [{
				name: '-{{biografias}}',
				find: /\{\{biografias\}\}\r?\n/ig,
				replace: ''
			}, {
				name: 'Maiusculite',
				sub: [{
					name: 'Carreira Política',
					find: /Carreira Política/g,
					replace: 'Carreira política'
				}]
			}, {
				name: 'Ajuste {{Info}}',
				ifhas: '{{Info/',
				sub: [{
					name: 'Minúscula nos campos de infobox',
					sub: [{
						name: 'Rule',
						find: /(\{\{ *Info\/[^╣]*\n *\| *)(Símbolo|Atribuições|Dependência[1-9]|Critérios|Imagem|Inscrição|Legenda|Localização|País|Preposição|Título)( *=)/g,
						replace: '$1{{subst:lcfirst:$2}}$3',
						num: 100
					}]
				}, {
					name: 'padronizando campos',
					sub: [{
						name: 'Nome Completo',
						find: /(\{\{Info\/[^╣]*\| *)Nome Completo( *= *)/ig,
						replace: '$1nome completo$2'
					}, {
						name: 'nome',
						find: /(\{\{Info\/[^╣]*\| *)nome do jogador( *= *)/ig,
						replace: '$1nome$2'
					}, {
						name: 'local/data nascimento/morte',
						find: /(\{\{Info\/[^╣]*\| *)(data|local|cidade|país) ?(?:de|_) ?(nascimento|morte|falecimento|natal)( *= *)/ig,
						replace: '$1$3_$2$4',
						num: 10
					}, {
						name: 'Rule',
						find: /(\{\{Info\/[^╣]*\| *)falecimento_data( *= *)/ig,
						replace: '$1morte_data$2'
					}, {
						name: 'localidaden',
						find: /(\{\{Info\/[^╣]*\| *)localidaden( *= *)/ig,
						replace: '$1nascimento_local$2'
					}, {
						name: 'localidadef',
						find: /(\{\{Info\/[^╣]*\| *)localidadef( *= *)/ig,
						replace: '$1morte_local$2'
					}, {
						name: 'Rule',
						find: / \|Falecimento *= *!?\r?\n/ig,
						replace: '',
						ifhas: '{{Info/Enxadrista' // FIXME: /\{\{Info/Enxadrista/i ?
					}]
				}, {
					name: 'Espaço campos',
					ifhas: /| *nascimento_data=/i,
					sub: [{
						name: '{{Info/Político',
						ifhas: '{{Info/Político', // FIXME: /\{\{Info/Político/i ?
						sub: [{
							name: '2',
							find: /(\{\{Info\/[^╣]*\| *(nascimento_data)) *=/ig,
							replace: '$1  ='
						}, {
							name: '6',
							find: /(\{\{Info\/[^╣]*\| *(morte_local)) *=/ig,
							replace: '$1      ='
						}, {
							name: '7',
							find: /(\{\{Info\/[^╣]*\| *(morte_data)) *=/ig,
							replace: '$1       ='
						}, {
							name: '8',
							find: /(\{\{Info\/[^╣]*\| *(profissão)) *=/ig,
							replace: '$1        ='
						}, {
							name: '9',
							find: /(\{\{Info\/[^╣]*\| *(ministro|mandato2)) *=/ig,
							replace: '$1         ='
						}, {
							name: '10',
							find: /(\{\{Info\/[^╣]*\| *(mandato|partido|título2)) *=/ig,
							replace: '$1          ='
						}, {
							name: '11',
							find: /(\{\{Info\/[^╣]*\| *(depois|título|imagem)) *=/ig,
							replace: '$1           ='
						}, {
							name: '12',
							find: /(\{\{Info\/[^╣]*\| *(antes)) *=/ig,
							replace: '$1            ='
						}, {
							name: '13',
							find: /(\{\{Info\/[^╣]*\| *(nome)) *=/ig,
							replace: '$1             ='
						}]
					}, {
						name: '{{Info/Enxadrista',
						ifhas: '{{Info/Enxadrista', // FIXME: /\{\{Info/Enxadrista/i ?
						sub: [{
							name: '1',
							find: /(\{\{Info\/[^╣]*\| *(nascimento_local)) *=/ig,
							replace: '$1 ='
						}, {
							name: '2',
							find: /(\{\{Info\/[^╣]*\| *(nascimento_data)) *=/ig,
							replace: '$1  ='
						}, {
							name: '3',
							find: /(\{\{Info\/[^╣]*\| *(imagem_legenda)) *=/ig,
							replace: '$1   ='
						}, {
							name: '4',
							find: /(\{\{Info\/[^╣]*\| *(nome completo)) *=/ig,
							replace: '$1    ='
						}, {
							name: '6',
							find: /(\{\{Info\/[^╣]*\| *(morte_local)) *=/ig,
							replace: '$1      ='
						}, {
							name: '7',
							find: /(\{\{Info\/[^╣]*\| *(morte_data)) *=/ig,
							replace: '$1       ='
						}, {
							name: 'conquista1',
							find: /(\{\{Info\/[^╣]*\| *(conquista1)) *=/ig,
							replace: '$1       ='
						}, {
							name: 'conquista2',
							find: /(\{\{Info\/[^╣]*\| *(conquista2)) *=/ig,
							replace: '$1       ='
						}, {
							name: 'conquista3',
							find: /(\{\{Info\/[^╣]*\| *(conquista3)) *=/ig,
							replace: '$1       ='
						}, {
							name: '11',
							find: /(\{\{Info\/[^╣]*\| *(imagem)) *=/ig,
							replace: '$1           ='
						}, {
							name: 'nome',
							find: /(\{\{Info\/[^╣]*\| *(nome)) *=/ig,
							replace: '$1             =',
							num: 4
						}, {
							name: 'país',
							find: /(\{\{Info\/[^╣]*\| *(país)) *=/ig,
							replace: '$1             ='
						}]
					}]
				}]
			}, {
				name: '{{Sem infocaixa}}',
				find: /╦/ig,
				replace: '╦\n{{sem infocaixa|Biografia}}',
				ifnot: /(\{\{Sem infocaixa|\{\{Info\/)/i
			}, {
				name: '{{Sem infocaixa}} +',
				ifnot: '{{Info/',
				sub: [{
					name: '{{sem infocaixa|Santos}}',
					find: /\{\{sem infocaixa\|Biografia\}\}/ig,
					replace: '{{sem infocaixa|Santos}}',
					ifhas: /\[\[Categoria:(Beatos|Santos)[ \|\]]/i
				}, {
					name: '{{sem infocaixa|Jornalista}}',
					find: /\{\{sem infocaixa\|Biografia\}\}/g,
					replace: '{{sem infocaixa|Jornalista}}',
					ifhas: /\[\[Categoria:(Jornalistas)[ \|\]]/i
				}]
			}, {
				name: '+ Info',
				ifnot: /\{\{Info\//i,
				sub: [{
					name: '+ Info/Santos',
					find: /(\{\{sem infocaixa\|Santos)(\}\}\r?\n[^╠╚]*)(╠[^▒\n]+▒\]\])?([^╚]*╚)/ig,
					replace: '$1|parcial$2{{Info/Santos\n' + ' |nome               = %%title%%\n' + ' |imagem             = $3\n' + ' |imagem_tamanho     =\n' + ' |imagem_legenda     =\n' + ' |nascimento_data    =\n' + ' |nascimento_local   =\n' + ' |morte_data         =\n' + ' |morte_local        =\n' + ' |dia_consagrado     =\n' + ' |St_venerado_pela   =\n' + ' |títulos            =\n' + ' |data_beatificação  =\n' + ' |local_beatificação =\n' + ' |beatificado_por    =\n' + ' |data_canonização   =\n' + ' |local_canonização  =\n' + ' |canonizado_por     =\n' + ' |atribuições        =\n' + ' |patrono            =\n' + ' |patrona            =\n' + ' |principal_templo   =\n' + ' |data_supressão     =\n' + ' |polêmicas          =\n' + ' |passagem           =\n' + ' |autor_passagem     =\n' + '╣}}\n$4',
					ifnot: '{{Info/'
				}, {
					name: '+ Info/Jornalista',
					find: /(\{\{sem infocaixa\|Jornalista)(\}\}\r?\n[^╠╚]*)(╠[^▒\n]+▒\]\])?([^╚]*╚)/ig,
					replace: '$1|parcial$2{{Info/Jornalista\n' + ' |nome             = %%title%%\n' + ' |imagem           = $3\n' + ' |imagem_tamanho   =\n' + ' |imagem_legenda   =\n' + ' |nome_nascimento  =\n' + ' |nascimento_data  =\n' + ' |nascimento_local =\n' + ' |morte_data       =\n' + ' |morte_local      =\n' + ' |educação         =\n' + ' |ocupação         =\n' + ' |outros_nomes     =\n' + ' |título           =\n' + ' |parentesco       =\n' + ' |cônjuge          =\n' + ' |parceiro         =\n' + ' |filhos           =\n' + ' |etnia            =\n' + ' |nacionalidade    =\n' + ' |religião         =\n' + ' |atividade        = <!-- ano – presente -->' + ' |trabalhos        =\n' + ' |agente           =\n' + ' |site             =\n' + '╣}}\n$4',
					ifnot: '{{Info/'
				}, {
					name: '+ Info/Biografia',
					find: /(\{\{sem infocaixa\|Biografia)(\}\}\r?\n[^╠╚]*)(╠[^▒\n]+▒\]\])?([^╚]*╚)/ig,
					replace: '$1|parcial$2{{Info/Biografia\n' + ' |nome                  = %%title%%\n' + ' |imagem                = $3\n' + ' |imagem_tamanho        =\n' + ' |imagem_legenda        =\n' + ' |nome_completo         =\n' + ' |nascimento_data       =\n' + ' |nascimento_local      =\n' + ' |morte_data            =\n' + ' |morte_local           =\n' + ' |residência            =\n' + ' |nacionalidade         =\n' + ' |ocupação              =\n' + ' |influências           =\n' + ' |influenciados         =\n' + ' |prémios               =\n' + ' |principais_trabalhos  =\n' + ' |website               =\n' + '╣}}\n$4',
					ifnot: '{{Info/'
				}]
			}]
		}, {
			name: 'Arte',
			ifhas: /\{\{Portal3.*\|(Arte|Animangá|Banda desenhada|Cinema|Games|Livros|Literatura|Música|Pintura|Televisão)/i,
			sub: [{
				name: '(coadjuvante/secundária)',
				find: /\(coadjuvante\/secundária\)/g,
				replace: 'coadjuvante'
			}, {
				name: '{{Allmusic}}',
				find: /\{\{link\|(?: *1?=? *[a-z]{2,2})?\|? *2?= *?http:\/\/allmusic\.com\/cg\/amg\.dll\?p=amg\&sql\=([^\|\}\n]+)\/? *\| *3?=? *([^\|\}\n]*)(?: *(?:\| *4?=?|\}\}) *no \[?\[?Allmusic\]?\]?)?(?:\}\}\r?\n|\r?\n)/ig,
				replace: '{{Allmusic|$1|$2}}\n'
			}, {
				name: '({{Imdb',
				ifhas: /(www\.imdb\.com|\{\{imdb)/i,
				sub: [{
					name: '{{imdb nome}}',
					find: /\{\{link\|(?: *1?=? *[a-z]{2,2})?\|? *2?=? *http:\/\/www\.imdb\.com\/name\/nm([0-9]+)\/ *\| *3?=? *([^\|\}\n]*)(?: *(?:\| *4?=?|\}\}) *4?=? *no \[?\[?Internet Movie Database\]?\]?)?(?:\}\}\r?\n|\r?\n)/ig,
					replace: '{{Imdb nome|$1|$2}}\n'
				}, {
					name: '{{Imdb título}}',
					find: /\{\{link\|(?: *1?=? *[a-z]{2,2})?\|? *2?= *?http:\/\/www\.imdb\.com\/title\/tt([0-9]+)\/ *\| *3?=? *([^\|\}\n]*)(?: *(?:\| *4?=?|\}\}) *4?=? *no \[?\[?Internet Movie Database\]?\]?)?(?:\}\}\r?\n|\r?\n)/ig,
					replace: '{{Imdb título|$1|$2}}\n'
				}, {
					name: '({{Imdb|xxx no imdb}}',
					find: /(\{\{Imdb[^\{\}\n]*) no imdb *\}\}/ig,
					replace: '$1}}'
				}, {
					name: '({{Imdb|\'\'\'xxx\'\'\'}}',
					find: /(\{\{Imdb[^\{\}\n]*[^\'])'+([^\'][^\{\}\n]*\})/ig,
					replace: '$1$2',
					num: 2
				}]
			}, {
				name: 'Recat',
				sub: [{
					name: 'Atrizes',
					find: /\[\[Categoria:Atrizes([\|\]])/ig,
					replace: '[[Categoria:Atores$1'
				}, {
					name: 'Atrizes premiadas',
					find: /\[\[Categoria:Atrizes premiadas([\|\]])/ig,
					replace: '[[Categoria:Atores premiados$1'
				}]
			}, {
				name: 'Maiusculite',
				ifhas: /\==/i,
				sub: [{
					name: 'Personagens e elenco',
					sub: [{
						name: 'Participação Especial',
						find: /Participaç(ões|ão) Especia(is|l)/g,
						replace: 'Participaç$1 especia$2'
					}, {
						name: 'Secundários',
						find: /(== )Personagens Secundários( ==)/g,
						replace: '$1Personagens secundários$2'
					}, {
						name: 'Elenco principal',
						find: /(== )Elenco Principal( ==)/g,
						replace: '$1Elenco principal$2',
						num: 10
					}, {
						name: 'Personagens Menores',
						find: /([^a-z])Personagens Menores([^a-z])/g,
						replace: '$1Personagens menores$2'
					}, {
						name: 'Personagens Principais',
						find: /([^a-z]Personage(?:ns|m) )Principa((?:is|l)[^a-z])/ig,
						replace: '$1principa$2'
					}]
				}, {
					name: 'Música',
					sub: [{
						name: 'Trilha sonora',
						find: /(== Trilhas? )S(onoras? ==)/g,
						replace: '$1s$2',
						num: 10
					}, {
						name: 'Temas de Abertura',
						find: /([^a-z]Temas? de )Abertura([^a-z])/g,
						replace: '$1abertura$2'
					}, {
						name: 'Temas de Encerramento',
						find: /([^a-z]Temas? de )Encerramento([^a-z])/g,
						replace: '$1encerramento$2'
					}]
				}, {
					name: 'Ficha técnica',
					find: /(== )Ficha Técnica( ==)/g,
					replace: '$1Ficha técnica$2',
					num: 10
				}, {
					name: 'Série',
					find: /([^=]) Série ==/g,
					replace: '$1 série ==',
					num: 10
				}, {
					name: 'Recorrentes',
					find: /(== )Temas Recorrentes( ==)/g,
					replace: '$1Temas recorrentes$2',
					num: 10
				}, {
					name: 'os Capítulos',
					find: /([^=]) C(apítulos? ==)/g,
					replace: '$1 c$2'
				}, {
					name: 'o Personagem',
					find: /([^=]) Personagem ==\r?\n/g,
					replace: '$1 personagem ==\n'
				}, {
					name: '= Poderes e Habilidades =',
					find: /([^=]) Habilidades =/g,
					replace: '$1 habilidades ='
				}]
			}, {
				name: 'Seções',
				sub: [{
					name: '== Guia de episódios ==',
					find: /\== Guia de episódios ==/g,
					replace: '== Episódios =='
				}]
			}, {
				name: 'Introdução',
				sub: [{
					name: 'é um personagem',
					find: /(╚[^╝]*é um) personagem/g,
					replace: '$1 [[personagem]]',
					ifhas: '╚.*╝'
				}, {
					name: '[[personagem]] ficcional',
					find: /\[\[personagem\]\] ficcional/g,
					replace: '[[personagem]] fictício'
				}]
			}, {
				name: 'Jogos eletrônicos',
				ifhas: /(\{\{Portal3.*\|(Games)[\|\}])/i,
				sub: [{
					name: 'Game upgrades',
					find: /Game Upgrades/g,
					replace: 'Game upgrades',
					num: 100
				}, {
					name: 'Introdução jogo',
					sub: [{
						name: '[[jogo eletrônico]]',
						find: /(╚[^╝\.]*)é (um|o)(a série de)? jogo(s)?(?: eletrônicos?)? /ig,
						replace: '$1é $2$3 [[jogo$4 eletrônico$3]] ',
						ifhas: '╝'
					}, {
						name: 'gêneros',
						sub: [{
							name: '[[gêneros de jogos eletrônicos]]',
							find: /(╚[^╝]*jogo[^╝]*[^\[])gênero([^\]])/g,
							replace: '$1[[gêneros de jogos eletrônicos|gênero]]$2'
						}, {
							name: '[[jogo eletrônico de ação]]',
							find: /(\[\[jogos? eletrônicos?\]\] de )ação/g,
							replace: '$1[[jogo eletrônico de ação|ação]]',
							num: 100
						}, {
							name: '[[jogo eletrônico de esporte]]',
							find: /\[\[jogo eletrônico\]\] de (\[\[)?(snowboard)/g,
							replace: '[[jogo eletrônico de esporte|jogo eletrônico]] de $1$2',
							num: 100
						}, {
							name: '[[Jogo eletrônico de simulação]]',
							find: /(\[\[jogos? eletrônicos?\]\] de )(simulação)/g,
							replace: '$1[[jogo eletrônico de simulação|simulação]]',
							num: 100
						}, {
							name: '[[jogo de corrida]]',
							find: /(\[\[jogos? eletrônicos?\]\] de )(corrida)/g,
							replace: '$1[[jogo de corrida|corrida]]',
							num: 100
						}]
					}]
				}, {
					name: 'Seções',
					sub: [{
						name: 'Rule',
						find: /\== \[\[Jogabilidade\]\] ==/g,
						replace: '== Jogabilidade ==',
						num: 10
					}]
				}, {
					name: 'Desambig',
					sub: [{
						name: '|gênero=',
						ifhas: /\| *g[eêé]nero *= *[^ \r\n]/i,
						sub: [{
							name: '[[Jogo eletrônico de ação]]',
							find: /(\| *g[eêé]nero *=.*)\[\[Ação\]\]/ig,
							replace: '$1[[Jogo eletrônico de ação|Ação]]'
						}, {
							name: '[[RPG eletrônico]]',
							find: /(\| *g[eêé]nero *=.*)\[\[RPG\]\]/ig,
							replace: '$1[[RPG eletrônico|RPG]]'
						}]
					}, {
						name: '[[PS2]]',
						find: /(\| *plataforma *= *.*)\[\[PS([23])\]\]/g,
						replace: '$1[[PlayStation $2|PS$2]]'
					}, {
						name: '[[PC]]',
						find: /\[\[PC\]\]/ig,
						replace: '[[Computador pessoal|PC]]'
					}, {
						name: '[[GPU]]',
						find: /\[\[GPU\]\]/g,
						replace: '[[Unidade de processamento gráfico|GPU]]',
						num: 100
					}, {
						name: '[[RAM]]',
						find: /\[\[RAM\]\]/g,
						replace: '[[Memória RAM|RAM]]',
						num: 100
					}, {
						name: '[[Ladino (RPG)]]',
						find: /\[\[([Ll])adino\]\]/g,
						replace: '[[Ladino (RPG)|$1adino]]',
						num: 100
					}]
				}, {
					name: 'Links',
					find: /\* '''(PlayStation(?: [23])?|Xbox|Game(?:Cube| Boy Advance)):?''':?\r?\n/ig,
					replace: '* \'\'\'[[$1]]\'\'\'\n',
					num: 100
				}]
			}, {
				name: 'Filmes',
				ifhas: /(\{\{Portal3.*\|(Cinema)[\|\}])/i,
				sub: [{
					name: 'Introdução filme',
					find: /(╚[^╝]*)é um filme/g,
					replace: '$1é um [[filme]]',
					ifhas: '╝'
				}]
			}, {
				name: 'Música',
				ifhas: /(\{\{Portal3.*\|(Música)[\|\}])/i,
				sub: [{
					name: 'Padronizando infobox',
					sub: [{
						name: 'Rule',
						find: /(\{\{Info\/música\/artista[^╣]*\| *)Nome Completo/ig,
						replace: '$1nome completo'
					}, {
						name: 'Rule',
						find: /(\{\{Info\/música\/artista[^╣]*\| *)legenda/ig,
						replace: '$1imagem_legenda'
					}, {
						name: 'Rule',
						find: /(\{\{Info\/música\/artista[^╣]*\| *imagem_legenda) {11}\}/ig,
						replace: '$1    '
					}, {
						name: '{{Info/Single',
						ifhas: '{{Info/Single', // FIXME: /\{\{Info/Single/i ?
						sub: [{
							name: 'legenda',
							find: /(\{\{Info\/Single[^╣]*\| *)legenda( *=)/ig,
							replace: '$1imagem_legenda$2'
						}, {
							name: 'minúsculas',
							ifhas: /(\{\{Info\/Single[^╣]*\| *)Nome( *=)/,
							sub: [{
								name: 'A',
								find: /(\{\{Info\/Single[^╣]*\| *)Artista( *=)/g,
								replace: '$1artista$2',
								num: 10
							}, {
								name: 'Á',
								find: /(\{\{Info\/Single[^╣]*\| *)Álbum( *=)/g,
								replace: '$1álbum$2'
							}, {
								name: 'D',
								find: /(\{\{Info\/Single[^╣]*\| *)D(iretor|uração)( *=)/g,
								replace: '$1d$2$3',
								num: 10
							}, {
								name: 'C',
								find: /(\{\{Info\/Single[^╣]*\| *)C(apa|ompositor|ertificação|r[ií]tica)( *=)/g,
								replace: '$1c$2$3',
								num: 10
							}, {
								name: 'D',
								find: /(\{\{Info\/Single[^╣]*\| *)D(irector|uração_vídeo)( *=)/g,
								replace: '$1d$2$3',
								num: 10
							}, {
								name: 'E',
								find: /(\{\{Info\/Single[^╣]*\| *)E(ste single)( *=)/g,
								replace: '$1e$2$3',
								num: 10
							}, {
								name: 'F',
								find: /(\{\{Info\/Single[^╣]*\| *)Formato( *=)/g,
								replace: '$1formato$2'
							}, {
								name: 'G',
								find: /(\{\{Info\/Single[^╣]*\| *)G(ravado|ênero|ravadora|ravado_vídeo)( *=)/g,
								replace: '$1g$2$3',
								num: 10
							}, {
								name: 'I',
								find: /(\{\{Info\/Single[^╣]*\| *)Imagem(|_tamanho)( *=)/g,
								replace: '$1imagem$2$3',
								num: 10
							}, {
								name: 'L',
								find: /(\{\{Info\/Single[^╣]*\| *)L(ançado|etrista|ançado_vídeo|ado\-B)( *=)/g,
								replace: '$1l$2$3',
								num: 10
							}, {
								name: 'M',
								find: /(\{\{Info\/Single[^╣]*\| *)Miscelâneo( *=)/g,
								replace: '$1miscelâneo$2'
							}, {
								name: 'N',
								find: /(\{\{Info\/Single[^╣]*\| *)Nome( *=)/g,
								replace: '$1nome$2'
							}, {
								name: 'O',
								find: /(\{\{Info\/Single[^╣]*\| *)Orçamento( *=)/g,
								replace: '$1orçamento$2'
							}, {
								name: 'P',
								find: /(\{\{Info\/Single[^╣]*\| *)P(rodutor|róximo single)( *=)/g,
								replace: '$1p$2$3',
								num: 10
							}, {
								name: 'T',
								find: /(\{\{Info\/Single[^╣]*\| *)T(ipo)( *=)/g,
								replace: '$1t$2$3',
								num: 10
							}, {
								name: 'Ú',
								find: /(\{\{Info\/Single[^╣]*\| *)Ú(ltimo single)( *=)/g,
								replace: '$1ú$2$3',
								num: 10
							}]
						}]
					}]
				}, {
					name: 'Recat',
					sub: [{
						name: '!Artigos mínimos sobre Música',
						find: /\{\{mínimo sobre\|Música\}\}/ig,
						replace: '{{mínimo sobre|música}}'
					}]
				}, {
					name: 'Introdução',
					sub: [{
						name: 'Intro banda',
						find: /(╚[^╝]*é (?:um|o) (?:[^ ]* )?(?:do )?)banda/g,
						replace: '$1[[banda musical|banda]]',
						ifhas: '╝'
					}, {
						name: 'intro álbum',
						find: /(╚[^╝]*é (?:um|o) (?:[^ ]* )?(?:do )?)álbum/g,
						replace: '$1[[álbum]]'
					}, {
						name: 'Intro canção',
						find: /(╚[^╝]*é (?:uma|a) (?:[^ ]* )?(?:do )?)canção/g,
						replace: '$1[[canção]]'
					}, {
						name: 'Intro composição',
						find: /(╚[^╝]*é (?:uma|a) (?:[^ ]* )?(?:do )?)composição/g,
						replace: '$1[[composição musical|composição]]'
					}]
				}, {
					name: 'Seções',
					sub: [{
						name: 'Rule',
						find: /([^=]) Paradas ==/g,
						replace: '$1 paradas =='
					}]
				}, {
					name: 'Desambig',
					sub: [{
						name: '[[banda musical]]',
						find: /\[\[([Bb])anda\]\]/g,
						replace: '[[$1anda musical|$1anda]]',
						num: 100
					}, {
						name: '[[Disco de vinil]]',
						find: /\[\[([Vv])inil\]\]/g,
						replace: '[[Disco de vinil|$1inil]]',
						num: 100
					}, {
						name: '[[Extended play]]',
						find: /\[\[EP\]\]/g,
						replace: '[[Extended play|EP]]',
						num: 100
					}, {
						name: '[[Instrumento musical]]',
						find: /\[\[([Ii])nstrumento\]\]/g,
						replace: '[[$1nstrumento musical|$1nstrumento]]',
						num: 100
					}]
				}, {
					name: 'Erros de escrita',
					sub: [{
						name: 'Sérgio Mendes',
						find: /Sergio Mendes/g,
						replace: 'Sérgio Mendes',
						num: 100
					}]
				}]
			}, {
				name: 'Animangá',
				ifhas: /(\{\{Portal3.*\|(Animangá)[\|\}])/i,
				sub: [{
					name: 'Introdução',
					sub: [{
						name: '[[anime]] / [[mangá]]',
						find: /(╚[^╝]*)([^\[])\[?\[?anime\]?\]? *\/ *\[?\[?mangá\]?\]?([^\]])/ig,
						replace: '$1$2[[mangá]] e [[anime]]$3'
					}]
				}, {
					name: 'Rule',
					find: /\{\{Info\/Animangá\/Rodapé\n╣\}\}/g,
					replace: '{{Info/Animangá/Rodapé╣}}'
				}]
			}, {
				name: 'Tag man assunto',
				ifhas: /\{\{(Artigo longo|Carece de fontes2|Carece de fontes|Contextualizar|Controverso|Corrigir|Fusão|Fusão com|Fusão de|Mais notas|M\-notas\-bpv|Parcial|Reciclagem|Revisão|Revisão\-sobre|Sem\-fontes|Sem imagem|Seminterwiki|Sem[\- ]notas|Trivia|Wikificação)([\|}])/i,
				sub: [{
					name: 'marcando assuntos',
					sub: [{
						name: 'marcando música',
						find: /\| *música\= */ig,
						replace: '├'
					}, {
						name: 'marcando cinema',
						find: /\| cinema\= */ig,
						replace: '┌'
					}, {
						name: 'marcando televisão',
						find: /\| televisão\= */ig,
						replace: '┬'
					}, {
						enabled: false,
						name: 'marcando games',
						find: /\| games\= */ig,
						replace: '┐'
					}, {
						name: 'marcando arte',
						find: /\| *arte\= */g,
						replace: '┼'
					}]
				}, {
					name: 'marcando predefs',
					find: /\{\{(Artigo longo|Carece de fontes2|Carece de fontes|Contextualizar|Controverso|Corrigir|Fusão|Fusão com|Fusão de|Mais notas|M\-notas\-bpv|Parcial|Reciclagem|Revisão|Revisão\-sobre|Sem\-fontes|Sem imagem|Seminterwiki|Sem[\- ]notas|Trivia|Wikificação)([\|}])/ig,
					replace: '{{┴$1$2'
				}, {
					name: 'preenche',
					sub: [{
						name: 'preenche arte',
						find: /(\{\{┴[^┼]*┼) *([\|\}])/ig,
						replace: '$1sim$2',
						ifhas: /┼ *[\|}]/i
					}, {
						name: 'inserindo música',
						find: /┼([^\|\}]*)([\|\}])/ig,
						replace: '┼$1├sim$2',
						ifhas: /\{\{Portal3.*\|(Música)/i
					}, {
						name: 'inserindo cinema',
						find: /┼([^\|\}]*)([\|\}])/g,
						replace: '┼$1┌sim$2',
						ifhas: /\{\{Portal3.*\|(Cinema)/i
					}, {
						name: 'inserindo televisão',
						find: /┼([^\|\}]*)([\|\}])/g,
						replace: '┼$1┬sim$2',
						ifhas: /\{\{Portal3.*\|(Televisão)/i
					}, {
						enabled: false,
						name: 'inserindo games',
						find: /┼([^\|\}]*)([\|\}])/g,
						replace: '┼$1┐sim$2'
					}, {
						name: 'remove arte',
						find: /┼([^┌┬┐├┼\|\}]*)([^a-z])/ig,
						replace: '$2',
						ifhas: /[├┌┬┐] *[^\|\} ]+ *[\|\}]/i
					}]
				}, {
					name: 'inserindo arte',
					find: /\{\{(┴[^\|{}\n├┼]*)([\|}][^}\n├┼]*\})/ig,
					replace: '{{$1┼sim$2'
				}, {
					name: 'desmarcando assuntos',
					sub: [{
						name: 'desmarcando música',
						find: /├/ig,
						replace: '|música='
					}, {
						name: 'desmarcando cinema',
						find: /┌/ig,
						replace: '|cinema='
					}, {
						name: 'desmarcando televisão'
					}, {
						enabled: false,
						name: 'desmarcando games'
					}, {
						name: 'desmarcando arte',
						find: /┼/g,
						replace: '|arte='
					}]
				}, {
					name: 'Desmarcando predefs',
					find: /┴/g,
					replace: ''
				}]
			}]
		}, {
			name: 'Brasil',
			ifhas: /\{\{Portal3.*\|(Brasil|Tocantins|Sergirpe|São Paulo|Santa Catarina|Roraima|Rondônia|Rio Grande do Sul|Rio Grande do Norte|Rio de Janeiro|Piauí|Pernambuco|Paraná|Paraíba|Pará|Minas Gerais|Mato Grosso do Sul|Mato Grosso|Maranhão|Goiás|Espírito Santo|Ceará|Bahia|Amazonas|Amapá|Alagoas|Acre)/i,
			sub: [{
				name: 'Recat',
				sub: [{
					name: 'Avenidas de São Paulo',
					find: /\[\[Categoria:Avenidas de São Paulo([\|\]])/ig,
					replace: '[[Categoria:Ruas e avenidas de São Paulo$1'
				}, {
					name: 'Bairros de Natal',
					find: /\[\[Categoria:Bairros de Natal([\|\]])/ig,
					replace: '[[Categoria:Bairros de Natal (Rio Grande do Norte)$1'
				}, {
					name: 'Bairros do Rio de Janeiro',
					find: /\[\[Categoria:Bairros do Rio de Janeiro([\|\]])/ig,
					replace: '[[Categoria:Bairros da cidade do Rio de Janeiro$1'
				}]
			}]
		}, {
			name: 'Ciência',
			ifhas: /\{\{Portal3.*\|(Ciência|Saúde)/i,
			sub: [{
				name: '!Artigos mínimos sobre Biologia',
				find: /\{\{mínimo sobre\|Biologia\}\}/ig,
				replace: '{{mínimo sobre|biologia}}'
			}]
		}, {
			name: 'Localidades',
			sub: [{
				name: 'Rule',
				find: /(╚'''[^'\n]+''' é uma? )(Província|Cidade|Estado|Município|Comuna)/ig,
				replace: '$1[[$2]]'
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
	ifnot: /(\{\{desambiguação\}\}|\[\[Categoria:Desambiguaç(ão|ões))/i,
	sub: [{
		name: 'Geral 1',
		sub: [{
			name: '{{lang-xx}}',
			sub: [{
				name: 'Aplicando lang-xx inicial',
				find: /(╚.*\()(em \[\[(?:[^\n\|\[\]:\.\)]+\|([^\n\|\[\]:\.\)]*)|([^\n\|\[\]:\;\.\)]+))\]\][,:; ] *(''+[^\'\)\n]+''+|[^\,:\;\n\(\)\[\]]*))/ig,
				replace: '$1{{subst:Bots/Lang|$3$4|$5|$2}}'
			}, {
				enabled: false,
				name: 'Aplicando lang-xx seguintes',
				find: /(\}\}[\;\,] *)(em \[\[(?:[^\n\|\[\]:\.\)]+\|([^\n\|\[\]:\.\)]*)|([^\n\|\[\]:\;\.\)]+))\]\][,:; ] *(''+[^\'\)\n]+''+|[^\,:\;\n\(\)\[\]]*))/ig,
				replace: '$1{{subst:Bots/Lang|$3$4|$5|$2}}'
			}, {
				enabled: false, // desabilitando, testando a regra acima, mais genérica, e deve ser melhor que essa
				name: 'Lang-xx para [[língua xxx|xxx]]',
				find: /(\{\{subst:Bots\/Lang\|)língua [^\|\n]+(\|''[^\|\n]+''\|em \[\[língua [^\|\n]+\|([^\|\]\n]+)\]\])/ig,
				replace: '$1$3$2'
			}]
		}, {
			name: 'Invisível',
			sub: [{
				name: 'Rule',
				find: /<!\-\- *Legenda da imagem *-\-\>/ig,
				replace: ''
			}]
		}]
	}, {
		name: 'Parte Sup',
		sub: [{
			name: 'Introdução',
			sub: [{
				name: 'data nasc e morte',
				find: /(╚[^\(\)\n\[\]]*\([^\(\)\n]*[^\[\]0-9])([0-3]?[0-9] de (?:(?:jan|fever)eiro|março|abril|maio|ju[nl]ho|agosto|(?:setem|outu|novem|dezem)bro)|[1-2][0-9]{3,3})/ig,
				replace: '$1[[$2]]',
				num: 10
			}, {
				name: 'LI na ocupação',
				find: /(╚[^╝\n\)]*\),? (?:é|foi) uma? )([^\[\]\n\, ]+)( e)/ig,
				replace: '$1[[$2]]$3'
			}, {
				name: 'Rule',
				find: /(╚'''[^'\n]*'''), é/ig,
				replace: '$1 é'
			}]
		}, {
			name: 'Predef man',
			sub: [{
				// É válido?
				// Se tiver uma tag no início e outra em uma seção específica?
				// Ou as duas dentro de seções? Pode?
				enabled: false,
				name: '{{Wikificação}} duplicada',
				find: /(\{\{Wikificação\|[^\r\n]*\}\}\r?\n[^░]*)\{\{Wikificação\|[^\r\n]*\}\}\r?\n/ig,
				replace: '$1'
			}, {
				name: '-{{Sem imagem}}',
				find: /\{\{Sem imagem.*\}\}\r?\n/ig,
				replace: '',
				ifhas: /((\.jpe?g|\.svg|\.bmp|\.gif)[\|\]▒]|(\{\{Desambiguação)[\|}]|\{\{Info\/)/i
			}, {
				name: '{{Sem infocaixa}}',
				ifhas: '{{Sem infocaixa}}',
				sub: [{
					name: 'Geografia',
					sub: [{
						name: 'Cidades da Suécia',
						find: /Sem infocaixa/ig,
						replace: 'Sem infocaixa|Cidade da Suécia',
						ifhas: /\{\{Cidades da Suécia\}\}/i
					}, {
						name: 'Comunas da França',
						find: /Sem infocaixa/ig,
						replace: 'Sem infocaixa|Comuna da França',
						ifhas: /\[\[comuna\]\] (no Sul )?(d[ae] )?.*?(\[\[França|francesa)/i
					}]
				}]
			}]
		}]
	}, {
		name: 'Parte cen',
		sub: [{
			name: 'Texto após cabeçalho de seção',
			find: /(║==+ [^\=\n]+=+=)([^ \=\r\n])/ig,
			replace: '$1\n$2',
			num: 100
		}, {
			// Desambiguação de siglas
			name: 'Aplicando {{Dn}}',
			sub: [{
				name: 'siglas',
				ifhas: /\[\[[A-Z][^ a-z]{1,}\]\]/,
				sub: [{
					name: 'sigla AA 2',
					find: /(\[\[)(AC|AE|AG|AH|AI|AJ|AL|AM|AO|AP|AQ|AT|AU|AZ|BF|BG|BK|BL|CG|CH|CL|CP|CR|CS|CT|CV|CW|CX|DA|DC|DE|DE|DI|DL|DM|DS|DV|TN|TO)(\]\]|\|[^\[\]\|\n]+\]\])( *[^{])/g,
					replace: '$1$2$3{{Dn}}$4',
					num: 5,
					ifhas: /\[\[[A-Z]{2,2}\]\]/
				}, {
					name: 'sigla A-B 3',
					find: /(\[\[)(AAA|AAB|AAC|ABB|ABC|ABI|ABR|ABS|ACL|ACM|ACP|ACS|ADA|ADC|ADP|ADS|AEA|AEC|AED|AEP|AFA|AFI|AFL|AFM|AFP|AIC|AIP|AIS|ALC|ALQ|ALT|AMA|APA|ATR|AUX|BDP|BNH|BNL|BNP)(\]\]|\|[^\[\]\|\n]+\]\])( *[^{])/g,
					replace: '$1$2$3{{Dn}}$4',
					ifhas: /\[\[[A-B][A-Z]{2,2}\]\]/
				}, {
					name: 'sigla C-D 3',
					find: /(\[\[)(CAB|CAE|CAM|CAP|CBB|CBC|CBM|CBN|CBO|CBR|CBS|CBT|CCA|CCB|CCC|CCG|CCJ|CCR|CCW|CDC|CDE|CDL|CDP|CDT|CDU|CDZ|CEA|CEI|CEP|CET|CEV|CFA|CFC|CFM|CGD|CGT|CHF|CIO|CIP|CMB|CMF|CMG|CNB|CNE|CNT|COE|COM|CPC|CPE|CPR|CQC|CRM|CRT|CSA|CSL|CSP|CST|CSU|CSV|CTE|CTI|DAC|DAO|DCC|DDA|DDD|DDR|DEC|DEP|DER|DFS|DGS|DHA|DHM|DHT|DIC|DIP|DMB|DMT|DMZ|DOC|DOP|DPL|DSL|DST|DTM)(\]\]|\|[^\[\]\|\n]+\]\])( *[^{])/g,
					replace: '$1$2$3{{Dn}}$4',
					ifhas: /\[\[[C-D][A-Z]{2,2}\]\]/
				}, {
					name: 'sigla E-Z 3',
					find: /(\[\[)(FFC|FSP|NBR|Pop|PTC|RAW|SAB|TCB|UBC|USC)(\]\]|\|[^\[\]\|\n]+\]\])( *[^{])/g,
					replace: '$1$2$3{{Dn}}$4',
					ifhas: /\[\[[E-Z][A-Z]{2,2}\]\]/
				}, {
					name: 'sigla AAAA 4',
					find: /(\[\[)(AACS|ABCD|ACRA|AFDB|ARPA|ARTV|BOPE|CAPM|CAPS|CCCC|CCMB|CISA|CISM|CPRM|CSKA|CTBC|FIAP|IFSC|NDSL)(\]\]|\|[^\[\]\|\n]+\]\])( *[^{])/g,
					replace: '$1$2$3{{Dn}}$4',
					ifhas: /\[\[[A-Z]{4,4}\]\]/
				}, {
					name: 'sigla AAAAA 5',
					find: /(\[\[)(AAARL|BAFTA|CEMEP|CESUT|CETEB)(\]\]|\|[^\[\]\|\n]+\]\])( *[^{])/g,
					replace: '$1$2$3{{Dn}}$4',
					ifhas: /\[\[[A-Z]{5,5}\]\]/
				}]
			}]
		}, {
			name: 'Ligação dupla em mesma seção',
			sub: [{
				name: 'Marca exceções 1',
				find: /([{}╠▒║\=]|\|\|)/ig,
				replace: '┼$1',
				num: 10
			}, {
				name: 'Marca exceções 2 - \n',
				find: /\n([\|\*\#])/ig,
				replace: '\n┼$1',
				num: 10
			}, {
				name: 'simples',
				find: /(\[\[([^\#\[\]\|][^\[\]\|\n]*)[\|\]][^┼]*)\[\[(\2)\]\]/ig,
				replace: '$1$3',
				num: 100
			}, {
				name: 'com barra',
				find: /(\[\[([^\#\[\]\|][^\[\]\|\n]+)[\|\]][^┼]*)\[\[\2\|([^\]\n]*)\]\]/ig,
				replace: '$1$3',
				num: 100
			}, {
				name: 'Desmarca exceções',
				find: /┼/g,
				replace: '',
				num: 100
			}]
		}, {
			name: 'Maiusculite em seções',
			sub: [{
				name: '= Referências Citadas =',
				find: /(={2,} )Referências Citadas( ={2,})/g,
				replace: '$1Referências citadas$2'
			}]
		}, {
			name: 'Quantidade por extenso',
			sub: [{
				enabled: false,
				name: 'Quantidade por extenso - após',
				find: /(\n[^\*\#].* )(1?[0-9]|[1-9]0+)( (ano|m[êe]s|dia|real|reais|jogo)e?s?[^a-z])/ig,
				replace: '$1{{subst:Número2palavra2|$2}}$3',
				num: 10
			}, {
				name: 'Quantidade por extenso - antes',
				find: /(com) ([2-9]|1[1-9]|[1-9]0+) ([^0-9])/ig,
				replace: '$1 {{subst:Número2palavra2|$2}} $3'
			}, {
				name: 'Quantidade por extenso - havia',
				find: /([\n ]haviam) ([2-9]+) ([^0-9])/ig,
				replace: '$1 {{subst:Número2palavra2|$2}} $3'
			}]
		}, {
			name: 'Acordo Ortográfico',
			num: 10,
			ifnot: 'acordo ortográfico', // FIXME: /acordo ortográfico/i ?
			sub: [{
				name: 'Trema',
				ifhas: 'ü', // FIXME: /ü/i ?
				sub: [{
					name: 'Güe',
					ifhas: 'güe', // FIXME: /güe/i ?
					sub: [{
						name: 'Ágüe',
						find: /([^a-z][Áá])güe((?:mos)?s?[^a-z])/g,
						replace: '$1gue$2'
					}, {
						name: 'Agüentar',
						find: /([^a-z][Aa])güentar(s?[^a-z])/g,
						replace: '$1guentar$2'
					}, {
						name: 'Alcagüete',
						find: /([^a-z][Aa])lcagüete(s?[^a-z])/g,
						replace: '$1lcaguete$2'
					}, {
						name: 'Anhangüera',
						find: /([^a-z]A)nhangüera(s?[^a-z])/g,
						replace: '$1nhanguera$2'
					}, {
						name: 'Apazigüemos',
						find: /([^a-z][Aa])pazigüemos(s?[^a-z])/g,
						replace: '$1paziguemos$2'
					}, {
						name: 'Averigüemos',
						find: /([^a-z][Aa])verigüemos(s?[^a-z])/g,
						replace: '$1veriguemos$2'
					}, {
						name: 'Bilíngüe',
						find: /([^a-z][Bb])ilíngüe(s?[^a-z])/g,
						replace: '$1ilíngue$2'
					}, {
						name: 'Cangüera',
						find: /([^a-z]C)angüera(s?[^a-z])/g,
						replace: '$1anguera$2'
					}, {
						name: 'Deságüe',
						find: /([^a-z][Dd])eságüe(s?[^a-z])/g,
						replace: '$1eságue$2'
					}, {
						name: 'Enxágüe',
						find: /([^a-z][Ee])nxágüe(s?[^a-z])/g,
						replace: '$1nxágue$2'
					}, {
						name: 'Enxagüemos',
						find: /([^a-z][Ee])nxagüemos(s?[^a-z])/g,
						replace: '$1nxaguemos$2'
					}, {
						name: 'Guaratingüetá',
						find: /([^a-z]G)uaratingüetá(s?[^a-z])/g,
						replace: '$1uaratinguetá$2'
					}, {
						name: 'Inhangüera',
						find: /([^a-z]I)nhangüera(s?[^a-z])/g,
						replace: '$1nhanguera$2'
					}, {
						name: 'ultilíngüe',
						find: /([^a-z][Mm])ultilíngüe(s?[^a-z])/g,
						replace: '$1ultilíngue$2'
					}, {
						name: 'Piaçagüera',
						find: /([^a-z]P)iaçagüera(s?[^a-z])/g,
						replace: '$1iaçaguera$2'
					}, {
						name: 'Tabatingüera',
						find: /([^a-z]T)abatingüera(s?[^a-z])/g,
						replace: '$1abatinguera$2'
					}, {
						name: 'Ungüento',
						find: /([^a-z][Uu])ngüento(s?[^a-z])/g,
						replace: '$1nguento$2'
					}]
				}, {
					name: 'Güi',
					ifhas: /Güi/i,
					sub: [{
						name: 'Ambigüidade',
						find: /([^a-z][Aa])mbigüidade(s?[^a-z])/g,
						replace: '$1mbiguidade$2'
					}, {
						name: 'Antigüidade',
						find: /([^a-z][Aa])ntigü((?:idade|íssimo)s?[^a-z])/g,
						replace: '$1ntigu$2'
					}, {
						name: 'Argüição',
						find: /([^a-z][Aa])rgü((?:ição|ir)s?[^a-z])/g,
						replace: '$1rgu$2'
					}, {
						name: 'Barigüi',
						find: /([^a-z]B)arigüi(s?[^a-z])/g,
						replace: '$1arigui$2'
					}, {
						name: 'Bilingüismo',
						find: /([^a-z][Bb])ilingüismo(s?[^a-z])/g,
						replace: '$1ilinguismo$2'
					}, {
						name: 'Birigüi',
						find: /([^a-z]B)irigüi(s?[^a-z])/g,
						replace: '$1irigui$2'
					}, {
						name: 'Contigüidade',
						find: /([^a-z][Cc])ontigüidade(s?[^a-z])/g,
						replace: '$1ontiguidade$2'
					}, {
						name: 'Desmilingüir',
						find: /([^a-z][Dd])esmilingüir(s?[^a-z])/g,
						replace: '$1esmiliguir$2'
					}, {
						name: 'Inexeqüível',
						find: /([^a-z][Ii])nexeqüível(s?[^a-z])/g,
						replace: '$1nexequível$2'
					}, {
						name: 'ingüística',
						find: /([^a-z][Ll])ingüística(s?[^a-z])/g,
						replace: '$1inguística$2'
					}, {
						name: 'Lingüiça',
						find: /([^a-z][Ll])ingüiça(s?[^a-z])/g,
						replace: '$1inguiça$2'
					}, {
						name: 'Lingüística',
						find: /([^a-z][Ll])ingüística(s?[^a-z])/g,
						replace: '$1inguística$2'
					}, {
						name: 'Pingüim',
						find: /([^a-z][Pp])ingüim(s?[^a-z])/g,
						replace: '$1inguim$2'
					}, {
						name: 'Redargüir',
						find: /([^a-z][Rr])edargüir(s?[^a-z])/g,
						replace: '$1edarguir$2'
					}, {
						name: 'Sagüi',
						find: /([^a-z][Ss])agüi(s?[^a-z])/g,
						replace: '$1agui$2'
					}, {
						name: 'Sangü',
						find: /([^a-z][Ss])angü((?:inário|íneo)s?[^a-z])/g,
						replace: '$1angu$2'
					}]
				}, {
					name: 'Qüe',
					ifhas: 'Qüe', // FIXME: /Qüe/i ?
					sub: [{
						name: 'Apropinqüe',
						find: /([^a-z][Aa])propinqüe(s?[^a-z])/g,
						replace: '$1propinque$2'
					}, {
						name: 'Cinqü',
						find: /([^a-z][Cc])inqü((?:enta|entenário)s?[^a-z])/g,
						replace: '$1inqu$2'
					}, {
						name: 'Conseqü',
						find: /([^a-z][Cc])onseqü((?:ência|ente)s?[^a-z])/g,
						replace: '$1onsequ$2'
					}, {
						name: 'Delinqü',
						find: /([^a-z][Dd])elinqü((?:em|ência|ente)s?[^a-z])/g,
						replace: '$1elinqu$2'
					}, {
						name: 'Eqüestre',
						find: /([^a-z][Ee])qüestre(s?[^a-z])/g,
						replace: '$1questre$2'
					}, {
						name: 'Freqü',
						find: /([^a-z][Ff])reqü([êe]n(?:tado|tar|te|cia)[^a-z])/g,
						replace: '$1requ$2'
					}, {
						name: 'Grandiloqüência',
						find: /([^a-z][Gg])randiloqüência(s?[^a-z])/g,
						replace: '$1randiloquência$2'
					}, {
						name: 'Pariqüera',
						find: /([^a-z]P)ariqüera(s?[^a-z])/g,
						replace: '$1ariquera$2'
					}, {
						name: 'Qüest',
						find: /([^a-z][Qq])üest((?:ão|ionamento|ionar|ionário|iúncula)s?[^a-z])/g,
						replace: '$1uest$2'
					}, {
						name: 'Seqüela',
						find: /([^a-z][Ss])eqüela(s?[^a-z])/g,
						replace: '$1equela$2'
					}, {
						name: 'Seqüência',
						find: /([^a-z][Ss])eqüência(s?[^a-z])/g,
						replace: '$1equência$2'
					}, {
						name: 'Seqü',
						find: /([^a-z][Ss])eqüestr((?:adora?|o)s?[^a-z])/g,
						replace: '$1equestr$2'
					}]
				}, {
					name: 'Qüi',
					ifhas: 'Qüi', // FIXME: /Qüi/i ?
					sub: [{
						name: 'Aqüicultura',
						find: /([^a-z][Aa])qüicultura(s?[^a-z])/g,
						replace: '$1quicultura$2'
					}, {
						name: 'Eqüino',
						find: /([^a-z][Ee])qüino(s?[^a-z])/g,
						replace: '$1qüino$2'
					}, {
						name: 'Exeqüível',
						find: /([^a-z][Ee])xeqüível(s?[^a-z])/g,
						replace: '$1xequível$2'
					}, {
						name: 'Eqüi',
						find: /([^a-z][Ee])qüi((?:distante|tativo)s?[^a-z])/g,
						replace: '$1qui$2'
					}, {
						name: 'Inexeqüível',
						find: /([^a-z][Ii])nexeqüível(s?[^a-z])/g,
						replace: '$1nexequível$2'
					}, {
						name: 'Iniqüidade',
						find: /([^a-z][Ii])niqüidade(s?[^a-z])/g,
						replace: '$1niqüidade$2'
					}, {
						name: 'Liqüi',
						find: /([^a-z][Ll])iqüid((?:ar|ação|ificador)s?[^a-z])/g,
						replace: '$1iquid$2'
					}, {
						name: 'Líqüido',
						find: /([^a-z][Ll])íqüido(s?[^a-z])/g,
						replace: '$1íquido$2'
					}, {
						name: 'Obliqüidade',
						find: /([^a-z][Oo])bliqüidade(s?[^a-z])/g,
						replace: '$1bliquidade$2'
					}, {
						name: 'Qüin',
						find: /([^a-z][Qq])üin((?:decágono|gentésimo)s?[^a-z])/g,
						replace: '$1uin$2'
					}, {
						name: 'Quinqü',
						find: /([^a-z][Qq])uinqü((?:qüagésimo|enal|ênio|qüídio)s?[^a-z])/g,
						replace: '$1uinqu$2'
					}, {
						name: 'Quinqüídio',
						find: /([^a-z][Qq])uinqüídio(s?[^a-z])/g,
						replace: '$1uinquídio$2'
					}, {
						name: 'Qüiproquó',
						find: /([^a-z][Qq])üiproquó(s?[^a-z])/g,
						replace: '$1uiproquó$2'
					}, {
						name: 'Tranqüi',
						find: /([^a-z][Tt])ranqüi((?:lo|lidade)s?[^a-z])/g,
						replace: '$1ranqüi$2'
					}, {
						name: 'Ubiqüidade',
						find: /([^a-z][Uu])biqüidade(s?[^a-z])/g,
						replace: '$1biquidade$2'
					}]
				}]
			}, {
				name: 'éia',
				ifhas: /éia/i,
				sub: [{
					name: 'Assembléia',
					find: /([^a-z][Aa])ssembléia(s?[^a-z])a/g,
					replace: '$1ssembleia$2',
					num: 10
				}, {
					name: 'Coréia',
					find: /([^a-z])Coréia(s?[^a-z])/g,
					replace: '$1Coreia$2',
					num: 10
				}, {
					name: 'Européia',
					find: /([^a-z][Ee])uropéia(s?[^a-z])européia/g,
					replace: '$1uropeia$2',
					num: 10
				}, {
					name: 'idéia',
					find: /([^a-z][Ii])déia(s?[^a-z])/g,
					replace: '$1deia$2',
					num: 10
				}]
			}, {
				name: 'ôo',
				find: /([^a-z])([Vv]|[Aa]benç|[Ee]nj)ôo([^a-z])/g,
				replace: '$1$2oo$3',
				ifhas: 'ôo'
			}, {
				name: 'aiú',
				ifhas: /aiú/i,
				sub: [{
					name: 'baiúca',
					find: /([^a-z][Bb])aiúca([^a-z])/g,
					replace: '$1aiuca$2'
				}]
			}, {
				name: 'oiú',
				find: /oiú/g,
				replace: '',
				sub: [{
					name: 'boiúno',
					find: /([^a-z][Bb])oiúno([^a-z])/g,
					replace: '$1oiúno$2'
				}]
			}]
		}]
	}, {
		name: 'Parte REF VT LE',
		sub: [{
			name: 'Marcando',
			sub: [{
				name: 'Marcando </ref>',
				find: /<\/ref>/g,
				replace: '┼'
			}, {
				name: 'Marcando ] 1',
				find: /([^\]])\]\]\]([^\]])/g,
				replace: '$1]]├$2'
			}, {
				name: 'Marcando ] 2',
				find: /([^\]])\]([^\]])/g,
				replace: '$1├$2'
			}]
		}, {
			name: 'Seção de referência',
			sub: [{
				name: 'Reflist -> Referências, reflist longe',
				find: /(== Referências ==)\r?\n([^░║]*)(\{\{Reflist[^}\n]*\}\})\r?\n/ig,
				replace: '{{referências}}\n$2\n'
			}, {
				name: 'Reflist -> Referências, seção != "Refer"',
				find: /\{\{Reflist([\|}])/ig,
				replace: '{{Referências$1',
				ifnot: /(║=+ Refer[^║░]+\{\{Reflist)/i
			}]
		}, {
			name: 'Ligações externas',
			sub: [{
				name: 'Link para url sem colchete',
				find: /(== Ligações externas ==[^░]*[^\[])(http.?:\/\/[^ \r\n\|]+)\r?\n/ig,
				replace: '$1[$2├\n'
			}, {
				name: 'link duplicada no mesmo Link',
				find: /(\{\{Link[^\{\n]*)\{\{([a-z][a-z][a-z]?)\}\}([^\{\n]*\{\{\2\}\})/ig,
				replace: '$1$3'
			}, {
				name: '{{Link}} com |4=língua',
				sub: [{
					name: 'inglês',
					find: /(\| *4 *= *[^\{\}\(\n]*)\(*(?:em )?(?:\[\[língua inglesa\|(?:em )?inglês\]\]|(?:em )?inglês[^\]])\)*\'*([^\{\}\n]*\}\})/ig,
					replace: '$1{{en}}$2'
				}, {
					name: 'alemão',
					find: /(\| *4 *= *[^\{\}\(\n]*)\(*(?:em )?(?:\[\[língua alemã\|(?:em )?alemão\]\]|(?:em )?alemão[^\]])\)*\'*([^\{\}\n]*\}\})/ig,
					replace: '$1{{de}}$2'
				}, {
					name: 'italiano',
					find: /(\| *4 *= *[^\{\}\(\n]*)\(*(?:em )?(?:\[\[língua italiana\|(?:em )?italiano\]\]|(?:em )?italiano[^\]])\)*\'*([^\{\}\n]*\}\})/ig,
					replace: '$1{{it}}$2'
				}, {
					name: 'segunda língua',
					find: /(\| *4 *= *\{\{[a-z][a-z][a-z]?\}\} e )([^e][^m])/ig,
					replace: '$1em $2'
				}, {
					name: '{{Link}} com |4=língua pt 2',
					sub: [{
						name: 'inglês',
						find: /(\| *4 *= *\{\{[a-z][a-z][a-z]?)\}\} e em (?:\[\[língua inglesa\|inglês\]\]|inglês\))/ig,
						replace: '$1|en}}'
					}, {
						name: '{{Link2}}',
						sub: [{
							name: 'Língua no campo 4',
							find: /(\{\{Link\|)([^\{\}\n]*)\{\{([a-z]{2,3})\|([a-z]{2,3})\}\} *\}\}\r?\n/ig,
							replace: '$1$3|$4$2}}\n'
						}, {
							name: 'Campo língua',
							find: /\{\{Link(\|[a-z]{2,3}\|[a-z]{2,3}[^0-9\{\}\n]*)(\|2=.*)\}\} *\r?\n/ig,
							replace: '{{Link2$2$1}}\n'
						}, {
							name: 'Arrumando parâmetros',
							find: /(\{\{Link2[^{}\n]*\|) *[0-9]=/ig,
							replace: '$1',
							num: 10
						}]
					}]
				}]
			}, {
				enabled: false,
				name: 'Lingua na {{Link}}',
				sub: [{
					name: '{{Link}} - lingua depois',
					find: /(\n\*+ \{\{Link *\|) *(\| *[^{}\n]+\}\}.*)\{\{([a-z][a-z][a-z]?(?:\|[^\}\n]*)?)\}\}([^\)])/g,
					replace: '$1$3$2$4'
				}, {
					name: '{{Link}} - lingua dentro',
					find: /(\n\*+ \{\{Link *\|) *(\| *[^{}\n]+) *\{\{([a-z][a-z][a-z]?)\}\} *(\}\})/g,
					replace: '$1$3$2$4',
					num: 100
				}]
			}, {
				name: 'Ajuste |4= pontuação dupla',
				find: /(\{\{Link[^\|\n]*\|[^\{\}\n]*\| *4 *= *[\,\.]) *[\,\.]/ig,
				replace: '$1'
			}, {
				name: 'Remove link',
				find: /\* \{\{Link\|\|2= *([^\{\}\|┼ ]*) *\|3=([^\{\}\|┼]+)(?: \|4=([^\{\}\|┼]*))?\}\}/ig,
				replace: '* [$1 $2]$3'
			}]
		}, {
			name: 'Desmarcando',
			sub: [{
				name: 'Desmarcando </ref>',
				find: /┼/g,
				replace: '</ref>'
			}, {
				name: 'Desmarcando ]',
				find: /├/g,
				replace: ']'
			}]
		}]
	}, {
		name: 'Parte inf',
		sub: [{
			name: 'Portal3',
			sub: [{
				name: 'Add {{Portal}}',
				ifnot: /\{\{(Portal3|desambiguação)/i,
				sub: [{
					name: 'Geral vazia',
					find: /\r?\n\r?\n(\[\[Categoria:|\{\{DEFAULTSORT:)/g,
					replace: '\n\n{{Portal3|}}\n\n$1'
				}]
			}, {
				name: 'Preenchendo {{Portal}}',
				sub: [{
					name: 'Países (introd)',
					sub: [{
						name: 'Brasil',
						find: /\{\{Portal3\|/ig,
						replace: '{{Portal3|Brasil|',
						ifhas: /(estado d[eo] [^\,\n]*, \[\[Brasil\]\]|(município|estado)\]?\]? \[?\[?brasil\]?\]?eiro| é um \[?\[?bairro\]?\]? (não oficial )?da cidade \[?\[?brasil\]?\]?eira| é um \[?\[?bairro\]?\]? (não oficial )?da cidade de [^\,╝\n]*, no \[\[(Tocantins|Sergirpe|São Paulo|Santa Catarina|Roraima|Rondônia|Rio Grande do Sul|Rio Grande do Norte|Rio de Janeiro|Piauí|Pernambuco|Paraná|Paraíba|Pará|Minas Gerais|Mato Grosso do Sul|Mato Grosso|Maranhão|Goiás|Espírito Santo|Ceará|Bahia|Amazonas|Amapá|Alagoas|Acre)\]\]).*╝/i,
						ifnot: /\{\{Portal3.*\|(Brasil|Tocantins|Sergirpe|São Paulo|Santa Catarina|Roraima|Rondônia|Rio Grande do Sul|Rio Grande do Norte|Rio de Janeiro|Piauí|Pernambuco|Paraná|Paraíba|Pará|Minas Gerais|Mato Grosso do Sul|Mato Grosso|Maranhão|Goiás|Espírito Santo|Ceará|Bahia|Amazonas|Amapá|Alagoas|Acre)/i
					}]
				}, {
					name: 'Portal3 - via Infocaixa',
					ifhas: '{{Info/', // FIXME: /\{\{Info//i ?
					sub: [{
						name: 'Estado do Brasil',
						find: /(\{\{Info\/Município do Brasil[^╣]* \| *estado = ([^\[\]\r\n]+)\r?\n[^░]*)\{\{Portal3\|/ig,
						replace: '$1{{Portal3|$2',
						ifhas: '╣'
					}, {
						name: 'Localidade de país',
						find: /(\{\{Info\/(?:Condado|Comuna) da (Romênia|Suiça).*?[^░]*)\{\{Portal3\|/ig, // FIXME: Singleline?
						replace: '$1{{Portal3|$2|',
						ifhas: /\{\{Info\/(Condado|Comuna) da (Romênia|Suiça)/i,
						ifnot: /\{\{Portal3.*\|(Roménia|Suiça)[ \|\}]/i
					}]
				}]
			}, {
				name: 'Arrumando portal',
				find: /(\{\{Portal3.*)\|\}\}/ig,
				replace: '$1}}'
			}, {
				name: 'Retirando {{Portal3|',
				sub: [{
					name: 'Removendo portal vazio',
					find: /\{\{Portal3\}\}\r?\n\r?\n/ig,
					replace: ''
				}]
			}]
		}]
	}, {
		name: 'Temáticos',
		sub: [{
			name: 'Biografia',
			ifhas: /\{\{Portal3.*\|Biografias/,
			sub: [{
				name: 'Parte cen',
				sub: [{
					name: 'Links internos',
					sub: [{
						name: '- link ano em listas',
						sub: [{
							name: 'Rule',
							find: /(║==+ (?:Principais)? ?(?:Projetos|Exposições|Premiações) ==+[^║░]*)\[\[([1-2][0-9]{3,3})\]\]/ig,
							replace: '$1$2',
							num: 100
						}]
					}]
				}]
			}]
		}, {
			name: 'Organização',
			ifhas: /\{\{Sem infocaixa\|Organização\}\}/i,
			sub: [{
				name: '+{{Info/Organização',
				find: /(\{\{sem infocaixa\|Organização)(\}\}\r?\n)/ig,
				replace: '$1|parcial$2{{Info/Organização\n' + ' |nome            = %%title%%\n' + ' |imagem          =\n' + ' |imagem_legenda  =\n' + ' |sigla           =\n' + ' |lema            =\n' + ' |fundação        = {{dtlink|||}}\n' + ' |fundador_nome   =\n' + ' |extinção        = {{dtlink|||}}\n' + ' |filiação        =\n' + ' |tipo            = Associação\n' + ' |estado          =\n' + ' |sede            =\n' + ' |propósito       = <!-- |propósito= ou |profissão= -->\n' + ' |área_influência =\n' + ' |língua          =\n' + ' |membros         =\n' + ' |líder_título    =\n' + ' |líder_nome      =\n' + ' |pessoas_imp     =\n' + ' |num_empreg      =\n' + ' |voluntários     =\n' + ' |website         =\n' + '}}\n',
				ifhas: /\[\[Categoria:Associaç(ão|ões)[ \|\]]/i,
				ifnot: /\{\{Info\//i
			}]
		}, {
			name: 'Arte',
			ifhas: /\{\{Portal3.*\|(Arte|Cinema|Anime|Animangá|Televisão)[\|\}]/i,
			sub: [{
				name: 'Oscar de melhor Atriz coadjuvante',
				find: /Oscar de melhor A(triz|tor) coadjuvante/ig,
				replace: 'Oscar de melhor a$1 coadjuvante'
			}, {
				name: 'Televisão',
				ifhas: /\{\{Portal3.*\|Televisão[\|\}]/i,
				sub: [{
					name: 'Infobox',
					sub: [{
						name: '{{Info/Episódio de série',
						ifhas: '{{Info/Episódio de série', // FIXME: /\{\{Info/Episódio de série/i ?
						sub: [{
							name: 'Ano temático',
							find: /(\{\{Info\/Episódio de série[^╣]* *\| *(?:exibição_data|data original) *=.*\[\[)([0-9]{4,4})(\]\])/ig,
							replace: '$1$2 na televisão|$2$3'
						}, {
							name: 'Rule',
							find: /(\{\{Info\/Episódio de série[^╣]* *\| *)caption( *=)/ig,
							replace: '$1legenda$2'
						}, {
							name: 'Minuscula',
							find: /(\{\{Info\/Episódio de série[^╣]* *\| *)(Título|Série|Imagem|Caption|Temporada|Episódio|Data[ _]original|Produção|Escrito[ _]por|Diretor|Convidados|Lista[ _]de[ _]episódios|Ant|Prox)( *=)/ig,
							replace: '$1{{subst:lcfirst:$2}}$3',
							num: 100
						}]
					}]
				}]
			}]
		}]
	}]
}, {
	/* Ajuste nas regras para se adequar a nova padronização.
É feito no final para facilitar, mas o correto é mudar todas as regras.
Mas como estou com preguiça de revisar tudo, deixo por aqui por enquanto */
	name: 'Temporário',
	sub: [{
		name: 'Predef VT / LE',
		find: /\{\{(Bibliografia)\}\}/ig,
		replace: '$1'
	}]
}, {
/******
Finaliza a edição, preparando para salvar o artigo
- Retira os simbolo usados em marcações
- Lista de Ícones Usados nas marcações
- Regras antigas e futuras
*****

erro no style:
style="text-align:left;"|;"

== Ícones usados ==

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
┼ REF VT LE/Marcando </ref>
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
	name: 'Finalizando',
	sub: [{
		name: 'Desmarcando',
		sub: [{
			name: 'Desmarca Topo / Fim',
			sub: [{
				name: 'Desmarca fim de artigo',
				find: /\n░/g,
				replace: ''
			}, {
				name: 'Desmarca topo 1',
				find: /▓[^╦]*╦\r?\n/ig,
				replace: '',
				num: 10
			}, {
				name: 'Desmarca topo 2',
				find: /▓/g,
				replace: ''
			}]
		}, {
			name: 'Desmarca meio',
			sub: [{
				name: 'Desmarca Comentários',
				sub: [{
					name: 'Desmarca <!--',
					find: /╔/g,
					replace: '<!--'
				}, {
					name: 'Desmarca -->',
					find: /╗/g,
					replace: '-->'
				}]
			}, {
				name: 'Desmarca início Ficheiro',
				find: /╠/g,
				replace: '[[',
				num: 100
			}, {
				name: 'Desmarca fim de ficheiro',
				find: /▒/g,
				replace: ''
			}, {
				name: 'Desmarca primeira seção',
				find: /╩\n/g,
				replace: ''
			}, {
				name: 'Desmarca seções',
				find: /║/g,
				replace: ''
			}]
		}, {
			name: 'Desmarca inicio',
			sub: [{
				name: 'Desmarca fim info',
				find: /╣\}\}/g,
				replace: '}}'
			}, {
				name: 'Desmarca parag 1 inicio',
				find: /╚/g,
				replace: ''
			}, {
				name: 'Desmarca parag 1 fim',
				find: /╝/g,
				replace: ''
			}]
		}, {
			name: 'Desmarca fim',
			sub: [{
				name: 'Desmarca fim de artigo',
				find: /░/g,
				replace: ''
			}, {
				// regra não utilizada por enquanto
				enabled: false,
				name: 'Desmarca fim última seção',
				find: /╬/g,
				replace: ''
			}]
		}]
	}, {
		enabled: false,
		name: 'Removidas',
		sub: [{
			// Removendo, está adicionando ponto final em legendas curtas, o que não é desejado.
			enabled: false,
			name: 'Ponto final em ficheiro',
			sub: [{
				name: 'Ponto final em ficheiro 1',
				find: /(╠[^:\n]*:|Ficheiro:)([^\|\]▒\n]+\|[^▒\n]*[^\.][^\|\.>}])(\]\])? *▒/ig,
				replace: '$1$2$3.▒'
			}, {
				name: 'Ponto final em ficheiro 2',
				find: /(px|thumb|thumbnail|right|left|center|border|esquerda|direita)\.▒\]\]/ig,
				replace: '$1▒]]'
			}, {
				name: 'Ponto final em ficheiro 3',
				find: /(\.'+)\.(▒\]\])/ig,
				replace: '$1$2'
			}]
		}]
	}, {
		name: '\r\n',
		find: /\r\n/ig,
		replace: '\n',
		num: 100
	}]
}] ); // End of APC.addRules()

};

if( window.APC && window.APC.addRules ){
	addDefaultRules();
} else {
	$.getScript( '//pt.wikipedia.org/w/load.php?modules=ext.gadget.APCCore&only=scripts&debug=' + mw.config.get( 'debug' ) )
	.done( addDefaultRules );
}

// </nowiki>, para facilitar o uso de "subst:" e assinaturas