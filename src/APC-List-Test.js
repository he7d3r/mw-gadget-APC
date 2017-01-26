/*jslint browser: true, white: true, regexp: true */
/*global $, mw, APC */
// Lista personalizada
var insertBetaRules = function(){
'use strict';
APC.addRules( [ {
	enabled: false,
	name: 'Modo revisão',
	ifnot: /(\{\{desambiguação\}\}|\[\[Categoria:Desambiguaç(ão|ões))/i,
	sub: [{
		name: 'Categorizando',
		ifnot: '[[Categoria:', // FIXME: /[[Categoria:/i ?
		sub: [{
			name: '+cat do tipo Arte',
			sub: [{
				name: '+cat Música',
				find: /░/g,
				replace: '┼Categoria:Música]]\n░',
				ifhas: /(\{\{Info\/(música|Single|Turnê|Álbum)|\{\{Portal3.*\|Música|'''"* *(é|foi)? *(o|a|uma?)? *([^ ]*) *\[?\[?(álbum|banda|canção|disco|dj|single|turne)|▓[^╦]+\((álbum|banda|canção|disco|dj|single|turne)|Faixas do disco|é [ao] [0-9]° (álbum|banda|canção|disco|dj|single|turne))/i,
				ifnot: /\[\[Categoria:/i
			}, {
				name: '+cat Literatura',
				find: /░/g,
				replace: '┼Categoria:Literatura]]\n░',
				ifhas: /\{\{Info\/Livro/i,
				ifnot: /\[\[Categoria:/i
			}, {
				name: '+cat Televisão',
				find: /░/g,
				replace: '┼Categoria:Televisão]]\n░',
				ifhas: /(\{\{Info\/Televisão|\{\{Esboço\-tv|▓[^╦]+\((novela))/i,
				ifnot: /\[\[Categoria:/i
			}, {
				name: '+cat Jogos eletrônicos',
				find: /░/g,
				replace: '┼Categoria:Jogos eletrônicos]]\n░',
				ifhas: /(\{\{(Info\/Jogo|Infobox VG)|\{\{Portal3.*\| *Games)/,
				ifnot: /\[\[Categoria:/
			}, {
				name: '+cat Cinema',
				find: /░/g,
				replace: '┼Categoria:Cinema]]\n░',
				ifhas: /(\{\{(Info\/Filme|Info\/Cineasta)[ \|\]\r\n]|\{\{Portal3.*\| *Cinema|▓[^╦]+\(filme|'''''\) é (um)? *filme)/i,
				ifnot: /\[\[Categoria:/i
			}, {
				name: '+cat Banda desenhada',
				find: /░/g,
				replace: '┼Categoria:Banda desenhada]]\n░',
				ifhas: /\{\{(Info\/Graphic Novel|Esboço\-bd|Portal BD|Portal3.*\| *Banda desenhada)/i,
				ifnot: /\[\[Categoria:/i
			}, {
				name: '+cat Arte',
				find: /░/g,
				replace: '┼Categoria:Arte]]\n░',
				ifhas: /(\{\{Info\/(Bleach|Naruto)|\{\{Portal3.*\| *Animangá|▓[^╦]+\((Lista de episódios)|Sinopse|Episódios *==|== *Atore?s?)/i,
				ifnot: /(\[\[Categoria:|┼)/i
			}]
		}, {
			name: '+cat Desportos',
			find: /░/g,
			replace: '┼Categoria:Desportos]]\n░',
			ifhas: /(\{\{ *Portal3.*\| *(Wrestling|Desporto|Futebol)|\{\{Info\/Campeonato de futebo)/i,
			ifnot: /\[\[Categoria:/i
		}, {
			name: '+cat Biografia',
			find: /░/g,
			replace: '┼Categoria:Pessoas]]\n░',
			ifhas: /(%%title%%(''')? [\(\,]? *\[?\[?([0-9]{1,2} de |(nascid[ao]|nasceu)|(Rio de Janeiro|São Paulo))|║== Biografia ==)/i,
			ifnot: /\[\[Categoria:/i
		}, {
			name: 'Desmarcação das categorias',
			find: /┼/g,
			replace: '[['
		}]
	}]
}, {
	/* *****
Regras que precisam de alguma revisão
- Nunca ficarão 100%
-- imprecisões que o APC não pode detectar
- Usadas como auxiliar de edição
-- marca alguma coisa e coloca instrução do que fazer

Podem habilitar essas regras, desde que estejam dispostos
a revisar bem o artigo pois essas regras sempre poderão dar erro.

Sempre necessitam de revisão, pois há ocasiões que sempre dará erro
***** */
	enabled: false,
	name: 'Modo revisão',
	ifnot: /(\{\{desambiguação\}\}|\[\[Categoria:Desambiguaç(ão|ões))/i,
	sub: [{
		name: 'Retirando refs',
		sub: [{
			name: 'pt.wiki',
			find: /([^\[])\[http:\/\/[a-z][a-z]\.wikipedia\.org\/wiki\/[^ ]*\]([^\]])/ig,
			replace: '$1$2',
			num: 10
		}, {
			name: 'pt.wikipedia.org',
			find: /<ref[^\/\>]*>[^┼\n]*http:\/\/[a-z][a-z]\.wikipedia\.org[^┼\n]*┼/ig,
			replace: ''
		}]
	}, {
		name: 'Retirando {{Referências}}',
		find: /\{\{Referências.*\}\}(?:r?\n)*(\{|\[|║\=+ \{\{Ver também|║\=+ \{\{Ligações)/ig,
		replace: '$1',
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
	ifnot: /(\{\{desambiguação\}\}|\[\[Categoria:Desambiguaç(ão|ões))/i,
	sub: [{
		name: 'Geral',
		sub: [{
			name: '<small> em tabela',
			sub: [{
				name: 'Marca <small>',
				find: /<small>/ig,
				replace: '┼'
			}, {
				name: 'Marca </small>',
				find: /<\/small>/ig,
				replace: '┤'
			}, {
				name: '<small> em tabela',
				find: /(\n[\|!].*┼[^┤\n]*)\n/g,
				replace: '$1┤\n',
				num: 2
			}, {
				name: 'Desmarca <small>',
				find: /┼/g,
				replace: '<small>'
			}, {
				name: 'Desmarca </small>',
				find: /┤/g,
				replace: '</small>'
			}]
		}]
	}, {
		name: 'Parte sup',
		sub: [{
			name: 'Tag man',
			sub: [{
				name: '{{sem imagem}} para o topo',
				find: /(╦)([^╩░]*╩[^░]*)(\n\{\{Sem imagem[^\r\n]*\}\})/ig,
				replace: '$1$3$2'
			}, {
				name: 'Multitag',
				sub: [{
					name: 'Incorpora',
					sub: [{
						name: 'Marca',
						find: /(\{\{)(Contextualizar2?|Controverso|Corrigir|Divisão|Expandir2|Fontes primárias|Formatar referências|Global|Global\/Brasil|Global\/Lusofonia|Global\/Portugal|Mais notas|Má introdução|Má tradução|Parcial|Parcialcontroverso|Pesquisa inédita|Problemas de acessibilidade|Publicidade|Reciclagem|Revisão|Sem cat|Sem\-fontes|Sem\-fontes\-bpv|Sem interwiki|Sem notas|Wikificação)([\|}])/ig,
						replace: '$1┴$2┴$3'
					}, {
						name: 'Incorpora',
						find: /\{\{(┴[^┴\n]+┴)([^\r\n]*)\}\}\r?\n\{\{(┴[^┴\n]+┴)\2\}\}/ig,
						replace: '{{Multitag|$1|$3$2}}'
					}, {
						name: 'Incorpora em Multitag',
						find: /(\{\{Multitag(?:\|┴[^┴]+┴)+)(\|[^{}\n]*)\}\}\r?\n\{\{(┴[^┴\n]+┴)\2\}\}/g,
						replace: '$1|$3$2}}'
					}, {
						name: 'Abrevia',
						ifhas: /\{\{Multitag/i,
						sub: [{
							name: 'Wikificação',
							find: /(\{\{Multitag\|[^{}\n]*)┴Wikificação┴/ig,
							replace: '$1wkf'
						}, {
							name: 'Contextualizar',
							find: /(\{\{Multitag\|[^{}\n]*)┴Contextualizar┴/ig,
							replace: '$1contx'
						}, {
							name: 'Contextualizar2',
							find: /(\{\{Multitag\|[^{}\n]*)┴Contextualizar2┴/ig,
							replace: '$1contx2'
						}, {
							name: 'Controverso',
							find: /(\{\{Multitag\|[^{}\n]*)┴Controverso┴/ig,
							replace: '$1contr'
						}, {
							name: 'Corrigir',
							find: /(\{\{Multitag\|[^{}\n]*)┴Corrigir┴/ig,
							replace: '$1corr'
						}, {
							name: 'Divisão',
							find: /(\{\{Multitag\|[^{}\n]*)┴Divisão┴/ig,
							replace: '$1div'
						}, {
							name: 'Expandir2',
							find: /(\{\{Multitag\|[^{}\n]*)┴Expandir2┴/ig,
							replace: '$1expand'
						}, {
							name: 'Fontes primárias',
							find: /(\{\{Multitag\|[^{}\n]*)┴Fontes primárias┴/ig,
							replace: '$1fp'
						}, {
							name: 'Formatar referências',
							find: /(\{\{Multitag\|[^{}\n]*)┴Formatar referências┴/ig,
							replace: '$1fref'
						}, {
							name: 'Global',
							find: /(\{\{Multitag\|[^{}\n]*)┴Global┴/ig,
							replace: '$1glob'
						}, {
							name: 'Global/Brasil',
							find: /(\{\{Multitag\|[^{}\n]*)┴Global\/Brasil┴/ig,
							replace: '$1glob-br'
						}, {
							name: 'Global/Lusofonia',
							find: /(\{\{Multitag\|[^{}\n]*)┴Global\/Lusofonia┴/ig,
							replace: '$1glob-lus'
						}, {
							name: 'Global/Portugal',
							find: /(\{\{Multitag\|[^{}\n]*)┴Global\/Portugal┴/ig,
							replace: '$1glob-pt'
						}, {
							name: 'Mais notas',
							find: /(\{\{Multitag\|[^{}\n]*)┴Mais notas┴/ig,
							replace: '$1mnot'
						}, {
							name: 'Má introdução',
							find: /(\{\{Multitag\|[^{}\n]*)┴Má introdução┴/ig,
							replace: '$1intro'
						}, {
							name: 'Má tradução',
							find: /(\{\{Multitag\|[^{}\n]*)┴Má tradução┴/ig,
							replace: '$1trad'
						}, {
							name: 'Parcial',
							find: /(\{\{Multitag\|[^{}\n]*)┴Parcial┴/ig,
							replace: '$1parcial'
						}, {
							name: 'Parcialcontroverso',
							find: /(\{\{Multitag\|[^{}\n]*)┴Parcialcontroverso┴/ig,
							replace: '$1parcialcont'
						}, {
							name: 'Pesquisa inédita',
							find: /(\{\{Multitag\|[^{}\n]*)┴Pesquisa inédita┴/ig,
							replace: '$1pi'
						}, {
							name: 'Publicidade',
							find: /(\{\{Multitag\|[^{}\n]*)┴Publicidade┴/ig,
							replace: '$1pub'
						}, {
							name: 'Reciclagem',
							find: /(\{\{Multitag\|[^{}\n]*)┴Reciclagem┴/ig,
							replace: '$1rec'
						}, {
							name: 'Revisão',
							find: /(\{\{Multitag\|[^{}\n]*)┴Revisão┴/ig,
							replace: '$1rev$1'
						}, {
							name: 'Sem cat',
							find: /(\{\{Multitag\|[^{}\n]*)┴Sem cat┴/ig,
							replace: '$1scat'
						}, {
							name: 'Sem-fontes',
							find: /(\{\{Multitag\|[^{}\n]*)┴Sem\-fontes┴/ig,
							replace: '$1sfontes'
						}, {
							name: 'Sem-fontes-bpv',
							find: /(\{\{Multitag\|[^{}\n]*)┴Sem\-fontes\-bpv┴/ig,
							replace: '$1sfontes-bpv'
						}, {
							name: 'Sem interwiki',
							find: /(\{\{Multitag\|[^{}\n]*)┴Sem interwiki┴/ig,
							replace: '$1iw'
						}, {
							name: 'Sem notas',
							find: /(\{\{Multitag\|[^{}\n]*)┴Sem notas┴/ig,
							replace: '$1snot'
						}, {
							name: 'Wikificação',
							find: /(\{\{Multitag\|[^{}\n]*)┴Wikificação┴/ig,
							replace: '$1wkf'
						}]
					}, {
						name: 'Desmarca',
						find: /┴/ig,
						replace: ''
					}]
				}, {
					name: 'Datar',
					find: /(\{\{Multitag[^\n]*)(\}\}\r?\n)/ig,
					replace: '$1|data={{subst:CURRENTMONTHNAME}} de {{subst:CURRENTYEAR}}$2',
					ifhas: /\{\{Multitag/i,
					ifnot: /\{\{Multitag[^\n]*\| *data *=/i
				}, {
					name: 'Remoção de barra vertical',
					find: /(\{\{Multitag[^\n]*\|) *\|/ig,
					replace: '$1',
					num: 10
				}]
			}]
		}, {
			name: 'Infobox',
			sub: [{
				name: 'padroniza campos',
				sub: [{
					name: 'nascimento_cidade',
					find: /(\{\{Info\/[^╣]*\| *)cidadenatal( *=)/ig,
					replace: '$1nascimento_cidade$2'
				}, {
					name: 'nascimento_país',
					find: /(\{\{Info\/[^╣]*\| *)pa[ií]snatal( *=)/ig,
					replace: '$1nascimento_país$2'
				}]
			}, {
				name: 'ajuste campos',
				sub: [{
					name: 'Rule',
					find: /(\| *imagem *= *\r?\n *\| *imagem_tamanho *= *)[^ \r\n]+\r?\n/ig,
					replace: '$1\n'
				}]
			}]
		}]
	}, {
		name: 'Parte cen',
		sub: [{
			name: 'Acessibilidade',
			sub: [{
				name: 'font color para dentro do link',
				find: /<font color="#?([a-z0-9]*)">\[\[([^\[\]\n]*)\]\]<\/font>/g,
				replace: '[[<span style="color:#$1;">$2</span>]]'
			}]
		}, {
			name: 'Tabelas',
			ifhas: '{|',
			sub: [{
				name: '<small> em tabela',
				sub: [{
					name: 'Marca <small>',
					find: /<small>/ig,
					replace: '┼'
				}, {
					name: 'Marca </small>',
					find: /<\/small>/ig,
					replace: '┤'
				}, {
					name: 'Fecha <small> em tabela',
					find: /(\n[\|!].*┼[^┤\n]*)\n/g,
					replace: '$1┤\n',
					num: 2
				}, {
					name: 'Desmarca <small>',
					find: /┼/g,
					replace: '<small>'
				}, {
					name: 'Desmarca </small>',
					find: /┤/g,
					replace: '</small>'
				}]
			}, {
				name: 'ajustes na tabela',
				sub: [{
					name: 'rowspan=1',
					find: /([ \|\!])(?:row|col)span\s*=\s*"\s*1\s*"/ig,
					replace: '$1'
				}, {
					name: '-moz-border-radius',
					find: /\-moz\-border\-radius:[1-9]px;/ig,
					replace: ''
				}, {
					name: '- na célula',
					find: /(\n[\!\|][^\!\|\n]+[\!\|])\-/ig,
					replace: '$1 -'
				}, {
					name: 'Rule',
					find: /(\n[\!\|])\|/ig,
					replace: '$1'
				}, {
					name: '|- \n |}',
					find: /\|\-\r?\n\|\}/ig,
					replace: '|}'
				}]
			}, {
				name: 'style',
				sub: [{
					name: 'div style',
					find: / div style/g,
					replace: ' style'
				}, {
					name: 'style sem "',
					find: /(style\s*=)\s*([^ ":]*:\s*[^ ";\r\n\|]*)([ ;\r\n])/ig,
					replace: '$1"$2"$3'
				}, {
					name: 'Migração de HTML obsoleto para CSS no atributo style',
					sub: [{
						name: 'bgcolor',
						find: /((?:\n\s*[!\|]| \|\|)\s*[^\|\n]*)(?:bgcolor|background)="?([^ "\|\r\n]*)"?([ \|\r\n])/ig,
						replace: '$1style="background: $2;"$3'
					}, {
						name: 'width',
						find: /((?:\n\s*[!\|]| \|\|)\s*[^\|\n]*)width\s*=\s*"?([0-9]+%)"?([ \|\r\n])/ig,
						replace: '$1style="width: $2;"$3'
					}, {
						name: 'valign',
						find: /((?:\n\s*[!\|]| \|\|)\s*[^\|\n]*)valign="?([^";\n]*)"?([ \|\r\n])/ig,
						replace: '$1style="vertical-align: $2;"$3'
					}, {
						name: 'align',
						find: /((?:\n\s*[!\|]|\|\|)\s*[^\|\n]*)align="?(left|center|right)"?([ \|\r\n])/g,
						replace: '$1style="text-align: $2;"$3',
						num: 100
					}, {
						name: '!style="text-align: center;"|',
						sub: [{
							name: 'marca align left',
							find: /(text\-align:\s*center)/ig,
							replace: '└$1'
						}, {
							name: '!style="text-align: center;"|',
							find: /((?:\|\-[^└\n]*|\{\|.*)(?:\n[\|\!][^\-].*)*\n! *style="[^"\|\n]*)└text\-align:center;([^"\|\n]*")/g,
							replace: '$1$2',
							num: 100
						}, {
							name: 'Desmarca align left',
							find: /└/g,
							replace: ''
						}]
					}, {
						name: 'font color',
						sub: [{
							name: '<font ... <font>[[xxx]</font>',
							find: /(<font color="?(#?[a-z0-9]*)"?>[^<>]*)<font color="?\2"?>\[\[([^\[\]\|\n]*\|)?([^\[\]\|\n]*)\]\]<\/font>/ig,
							replace: '$1[[$3<span style="color:$2;">$4</span>]]'
						}, {
							name: 'marca /font',
							find: /<\/font>/g,
							replace: '┼'
						}, {
							name: 'Remoção de <font> duplicado',
							find: /(<font ([^<>\n]*)>[^<>┼\[\]\n]*)<font \2>/g,
							replace: '$1'
						}, {
							name: 'marca fim de célula com ref',
							find: /( *(?:\{\{nota de rodapé\|[^\}\n]+\}\}|<ref>[^<>\n]*<\/ref>|<ref name=[^<>\n]*>)+\r?\n)/ig,
							replace: '┘$1'
						}, {
							name: 'fechando fonte',
							find: /(<font [^<>┼\n]*>[^┼<>\n]*)(\r?[\n┘])/ig,
							replace: '$1┼$2'
						}, {
							name: 'font com link dentro',
							find: /(<font color= *"?([^"<> ┼\n]*)"?>[^\[\]\n┼]*\[\[)([^<>\[\]]*)(\]\].*┼)/ig,
							replace: '$1<span style="color:$2;">$3</span>$4'
						}, {
							name: 'mais de um span/font da célula',
							find: /\| *(\[\[(?:[^\|\[\]]*\|)?<span style="color:(#?[a-z0-9]*);">[^<>\]\n]*<\/span>\]\](?:(?: *(?:<br \/> *)*(?:\[\[(?:[^\|\[\]]*\|)?<span style="color:\2;">[^<>\]\n]*<\/span>\]\]|<font color="?\2"?>[^<>\n┼]*┼))+))( *\r?[\n┘])/ig,
							replace: '| style="color:$2;"|$1$3'
						}, {
							name: 'mais de um font/span da célula',
							find: /\| *(<font color *= *"?(#?[a-z0-9]*)"?>[^<>\n┼\[]*(?:┼|\[)(?:(?: *(?:\[*(?:[^\|\[\]]*\|)?<span style="color: *\2;">[^<>\]\n]*<\/span>\]\]|<font color="?\2"?>[^<>\n┼]*┼))+))( *\r?[\n┘])/ig,
							replace: '| style="color:$2;"|$1$3'
						}, {
							name: 'fonte em toda a célula',
							find: /\| *<font color="?(#?[a-z0-9]{3,6})"?>([^\n┼]*)┼?( *\r?[\n┘])/ig,
							replace: '| style="color:$1;"|$2$3',
							num: 10
						}, {
							name: 'span em toda a célula (apenas 1 link)',
							find: /\|( *\[\[(?:[^\|\]\n]+\|)?<span style="color:(#?[a-z0-9]*);">[^<>\[\]\n]*<\/span>\]\])( *\r?[\n┘])/ig,
							replace: '| style="color:$2;"|$1$3'
						}, {
							name: 'remove fonte = célula',
							find: /(style=[^\|\n]*[^\-]color:(#?[a-z0-9]*);"\| *)<font color="\2">([^┼\n]*)┼/ig,
							replace: '$1$3'
						}, {
							name: 'desmarca fim de célula com ref',
							find: /┘/g,
							replace: ''
						}, {
							name: 'desmarca /font',
							find: /┼/g,
							replace: '</font>'
						}]
					}]
				}, {
					name: 'arrumando style',
					ifhas: /style/i,
					sub: [{
						name: 'Remoção de caracteres antes do atributo',
						find: /(\n[\|\!][^\|\!\n]*)[\|\!] *(style *= *"[^\!\n]*")([\|\!])/ig,
						replace: '$1 $2$3'
					}, {
						name: 'junta os styles',
						find: /(style="[^"\|\n]*)"([^\|\n]*)style="([^"\|\n]*)"/ig,
						replace: '$1 $3"$2',
						num: 10
					}]
				}, {
					name: 'style color para links',
					ifhas: /style/i,
					sub: [{
						name: 'marca newline tab',
						find: /(\n)([\|!]\-)/ig,
						replace: '$1└$2'
					}, {
						name: 'style na linha',
						find: /(\|\-style[^\n\|]*[^\-]color:(#?[a-f0-6]*);"[^└]*\n[!\|](?:[^\[{<\]\|]*\|)? *[^\|\n<{]*)\[\[([^\[\]<\n]+)\]\]/ig,
						replace: '$1[[<span style="color:$2;">$3</span>]]'
					}, {
						name: 'style na célula',
						find: /(\n[\!\|][^\|\n]*style[^\|\n]*[^\-]color:(#?[a-z0-6]*);[^\|\n]*\|[^<\{\n]*)\[\[([^\[\]<\n]*)\]\]/ig,
						replace: '$1[[<span style="color:$2;">$3</span>]]',
						num: 10
					}, {
						name: 'arruma o span c/ pipelink',
						find: /\[\[(<span[^>\n]*>)([^\|\[\]]*)\|([^\|\[\]]*<\/span>)\]\]/g,
						replace: '[[$2|$1$3]]'
					}, {
						name: 'arruma o span s/ pipelink',
						find: /\[\[(<span[^>\n]*>)([^\|\[\]]*)(<\/span>)\]\]/ig,
						replace: '[[$2|$1$2$3]]'
					}, {
						name: 'desmarca newline tab',
						find: /└/g,
						replace: ''
					}]
				}, {
					name: 'arruma # na cor',
					ifhas: 'color', // FIXME: /color/i ?
					sub: [{
						name: 'arruma cor em style - # add',
						find: /(style=".*color:)([0-9a-f]+[";>])/ig,
						replace: '$1#$2',
						num: 10
					}, {
						name: 'arruma cor em style - # remove',
						find: /(style=".*color:)#([^g-z;]*[g-z]+[^g-z;]*;)/ig,
						replace: '$1$2',
						num: 10
					}, {
						name: 'arruma cor em font - # add',
						find: /(<font.*color *= *)([0-9a-f]+[ >])/ig,
						replace: '$1#$2',
						num: 10
					}, {
						name: 'arruma cor em font - # remove',
						find: /(<font.*color *= *)#([^g-z> ]*[g-z]+[^g-z> ]*[> ])/g,
						replace: '',
						num: 10
					}]
				}]
			}, {
				name: 'Cabeçalho',
				sub: [{
					name: 'Cabeçalho indevido',
					find: /(\|\-.*\n\|[^\-].*[^\r\n ]\r?\n(?:\|[^\-].*\n)*)\!/ig,
					replace: '$1|',
					num: 100
				}, {
					name: '! \'\'\'xxx\'\'\'',
					find: /(\n! *(?:[^\|\n]*\|)? *)'''([^\'\n]+)'''(\r?\n)/ig,
					replace: '$1$2$3',
					num: 2
				}, {
					name: 'wikitable cabeçalho com background cel',
					find: /(\{\|.*class *= *"wikitable.*\n(?:[\|\!][^}].*\n)*![^\|\n]*)background-color *: *[^\;\|\n]*;/ig,
					replace: '$1',
					num: 100
				}, {
					name: 'wikitable cabeçalho com background lin',
					find: /(\{\|.*class *= *"wikitable.*\n(?:[\|\!][^}].*\n)*\|\-.*)background\-color *:[^;"\n]*[;"](.*\n(?:\!.*\n)+\|\-)/ig,
					replace: '$1$2'
				}]
			}, {
				name: 'formatando tabela',
				ifhas: /(style|<center)/i,
				sub: [{
					name: 'style para a linha toda',
					sub: [{
						name: 'marca 2 cel em 1 linha',
						find: /\|\|/g,
						replace: '┼||'
					}, {
						name: 'style para a linha toda - genérico',
						find: /(\|\-[^┼┌\n]*)(\r?\n[\|\!][^\-][^┼\n]*tyle="[^"\n]*(background\-color|text\-align|font\-size) *: *([^;"\|\n]*)[;"][^┼\n]*(?:\r?\n|┬\|)(?:[\|\!][^\-][^┼\n]*tyle="[^"\n]*\3 *: *\4[;"][^┼\n]*(?:\r?\n|┼\|))*\|[\-}])/ig,
						replace: '$1 ┌style="$3:$4;"$2',
						num: 100
					}, {
						name: 'text-align:xxx; na linha toda',
						find: /(\|\-[^┌\n]*)(\r?\n[\|\!][^┼\-][^\|\n]*(center)[";>].*(?:\r?\n|┼\|)(?:([\|\!][^\-].*(?:\3)[";>].*(?:\r?\n|┼\|))+)\|[\-}])/ig,
						replace: '$1 ┌style="text-align:center;"$2',
						num: 100
					}, {
						name: 'marca alinhamento linha',
						find: /(\|\-.*)(text\-align:center;)/ig,
						replace: '$1┬$2'
					}, {
						name: 'linha center com cel inicial left',
						find: /(\|\-[^┌┬\n]*)(\n\|)([^┼\n]*)(?:┼\|\||\n\|)((?:[^┼\n]*text-align:center;[^┼\n]*(?:┼\|\||\n\|))*\-)/ig,
						replace: '$1┌style="text-align:center;"$2style="text-align:left;"|$3\n|$4',
						num: 2
					}, {
						name: 'desmarca',
						find: /[┌┬┼]/ig,
						replace: ''
					}]
				}, {
					name: 'style na linha e célula',
					ifhas: /\|\-.*style= *"/i,
					sub: [{
						name: 'marca 2 cel em 1 linha',
						find: /\|\|/g,
						replace: '┬||'
					}, {
						name: 'genérico',
						find: /(\|\-.*style="[^"\n]*((?:background\-color|text\-align)) *: *([^"\n;]*[";]).*(?:(?:\r?\n|┬|)[\|\!][^\-\}\n].*)*(?:\r?\n|┬|)[\|\!][^\-\n][^\|\!\n]*tyle *= *"[^"\|\!\n]*)\2 *: *\3/ig,
						replace: '$1',
						num: 100
					}, {
						name: '<center> nas células',
						find: /(\|\-.*style="[^"\n]*text-align:center;.*\n(?:[\|\!][^\-\}].*(?:\r?\n|┬\|))*[\|\!][^\-\}](?:[^\|\!\n]*[\|\!]<)?)\/?center>([^<>\n]*)(?:<\/center>)?(?:\r?\n|┬\|)/ig,
						replace: '$1└$2\n',
						num: 100,
						sub: [{
							name: 'Rule',
							find: /<└/g,
							replace: ''
						}]
					}, {
						name: 'desmarca',
						find: /┬/g,
						replace: ''
					}]
				}, {
					name: 'style para a tabela toda',
					ifhas: /\|\-.*style=/i,
					sub: [{
						name: 'text-align:center',
						ifhas: 'text-align:center', // FIXME: /text-align:center/i ?
						sub: [{
							name: 'marca 2 cel em 1 linha',
							find: /\|\|/g,
							replace: '┬||'
						}, {
							name: 'marca linha cabeçalho',
							find: /(\-.*\r?\n(?:![^┬\n]*\n)+\|\-)/ig,
							replace: '┌$1'
						}, {
							name: 'center para tabela',
							find: /(\{\|.*)(\r?\n(?:(?:!.*|┌.*|\|\- *style="text\-align:center;".*|\|[^\-\}].*)\n)+\|\})/g,
							replace: '$1 style="text-align:center;"$2'
						}, {
							name: 'desmarca',
							find: /[┌┬]/ig,
							replace: ''
						}]
					}]
				}, {
					name: 'style na tabela e linha',
					ifhas: /\|\-.*style=/i,
					sub: [{
						name: 'genérico',
						find: /(\{\|.*style *= *"[^"\n]*(background\-color|text\-align) *: *([^"\;\n]*)[;"].*\n(?:[!\|][^\}].*\n)*\|\-.*style *= *"[^"\n]*)\2 *: *\3/ig,
						replace: '$1',
						num: 100
					}]
				}, {
					name: 'style desnecessário',
					sub: [{
						name: 'text-align:left',
						ifhas: /text\-align *: *left/i,
						sub: [{
							name: 'marca text-align',
							find: /(text\-align)/ig,
							replace: '└$1'
						}, {
							name: 'marca fim tabela',
							find: /\n\|\}/ig,
							replace: '\n┴|}'
						}, {
							name: 'tabela e linha limpa',
							find: /(\{\|[^└\n]*\n[^┴]*\|\-[^└\n]*\n(?:[\|\!][^\-\}].*\n)*\|[^└\n]*)└text\-align *: *left/ig,
							replace: '$1',
							num: 100
						}, {
							name: 'desmarca',
							find: /[└┴]/ig,
							replace: ''
						}]
					}]
				}, {
					name: 'arruma style',
					sub: [{
						name: 'Rule',
						find: /(style) *= *" /ig,
						replace: '="'
					}, {
						name: 'arruma style 1',
						find: /([\|\!]) *style=";? *" *[\|\!]/ig,
						replace: '$1'
					}, {
						name: 'arruma style 2',
						find: /style=";? *"/g,
						replace: ''
					}, {
						name: 'junta os styles',
						find: /(style="[^"\|\n]*)"[\| ]*style="/ig,
						replace: '$1 '
					}]
				}, {
					name: 'ajustes gerais',
					find: / \r?\n/ig,
					replace: '\n',
					num: 3
				}]
			}]
		}, {
			name: 'Imagem',
			sub: [{
				enabled: false,
				name: 'Tamanho para imagens com thumb',
				find: /(╠[^\|▒]+\|[^0-9▒]*thumb)(\|[^0-9▒]*▒)/ig,
				replace: '$1|180px$2'
			}]
		}, {
			name: '-link [[data]]',
			sub: [{
				name: '[[dia]] de [[mês]]',
				find: /\[\[([1-3]?[0-9])\]\] de \[?\[?((?:jan|fever)eiro|março|abril|maio|ju[nl]ho|agosto|(?:setem|outu|novem|dezem)bro)\]?\]?([^\]])/ig,
				replace: '[[$1 de $2]]$3'
			}, {
				name: '-Link ([[ano]]) em listas',
				find: /(\n\*.*\()\[\[([0-9]{4,4})\]\]( *[\/\)])/ig,
				replace: '$1$2$3'
			}, {
				name: 'Em seções',
				find: /(║==+ (?:Estatísticas) ==+[^║░]+)\[\[([0-3]?[0-9] de (?:(?:jan|fever)eiro|março|abril|maio|ju[nl]ho|agosto|(?:setem|outu|novem|dezem)bro)|[1-2][0-9]{3,3})\]\]/ig,
				replace: '$1$2',
				num: 100
			}, {
				name: '== [[ano]] ==',
				find: /(=+= )\[\[([1-2][0-9]{3,3})\]\]( =+=)/ig,
				replace: '$1$2$3'
			}, {
				name: 'última atualização',
				find: /(Última atualização *: *)\[\[([1-2]?[0-9] de (?:(?:jan|fever)eiro|março|abril|maio|ju[nl]ho|agosto|(?:setem|outu|novem|dezem)bro))\]\] de \[\[([1-2][0-9]{3,3})\]\]/ig,
				replace: '$1$2 de $3'
			}]
		}]
	}, {
		name: 'Parte REF VT LE',
		sub: [{
			name: 'Marca',
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
			name: 'Bibliografia',
			sub: [{
				name: '-link ano',
				find: /(║==+ (?:Bibliografia) ==+[^║░]*)\[\[([1-2][0-9]{3,3})\]\]/ig,
				replace: '$1$2',
				num: 100
			}]
		}, {
			name: 'Formatando refs',
			ifhas: '{{Citar', // FIXME: /\{\{Citar/i ?
			sub: [{
				name: 'traduz citar',
				ifhas: /\{\{(Cit[ae]|Lien) /i,
				sub: [{
					name: 'traduzir para {{citar livro}}',
					ifhas: '{{Cita libro', // FIXME: /\{\{Cita libro/i ?
					sub: [{
						name: 'Marca início',
						find: /\{\{(?:Cita libro|Cite book) *(\||\r?\n|╔)/ig,
						replace: '┌$1'
					}, {
						name: 'Marca final',
						find: /(┌[^{}┘]*)\}\}/ig,
						replace: '$1┘}}'
					}, {
						name: 'Substitui campos',
						sub: [{
							name: 'ano',
							find: /(┌[^┌┘]*\| *)(?:año|year|month|date|data)( *=[^┌┘]*┘)/ig,
							replace: '$1ano$2'
						}, {
							name: 'título',
							find: /(┌[^┌┘]*\| *)title( *=[^┌┘]*┘)/ig,
							replace: '$1título$2'
						}, {
							name: 'url',
							find: /(┌[^┌┘]*\| *)urlcapítulo( *=[^┌┘]*┘)/ig,
							replace: '$1url$2'
						}, {
							name: 'autor',
							find: /(┌[^┌┘]*\| *)(?:apellidos|coautores|author)( *=[^┌┘]*┘)/ig,
							replace: '$1autor$2'
						}, {
							name: 'sobrenome',
							find: /(┌[^┌┘]*\| *)(?:cognome|last)( *=[^┌┘]*┘)/ig,
							replace: '$1sobrenome$2'
						}, {
							name: 'nome',
							find: /(┌[^┌┘]*\| *)(?:nombre|first)( *=[^┌┘]*┘)/ig,
							replace: '$1nome$2'
						}, {
							name: 'linkautor',
							find: /(┌[^┌┘]*\| *)enlaceautor( *=[^┌┘]*┘)/ig,
							replace: '$1linkautor$2'
						}, {
							name: 'idioma',
							find: /(┌[^┌┘]*\| *)language( *=[^┌┘]*┘)/ig,
							replace: '$1idioma$2'
						}, {
							name: 'edição',
							find: /(┌[^┌┘]*\| *)edition( *=[^┌┘]*┘)/ig,
							replace: '$1edição$2'
						}, {
							name: 'local',
							find: /(┌[^┌┘]*\| *)location( *=[^┌┘]*┘)/ig,
							replace: '$1local$2'
						}, {
							name: 'editora',
							find: /(┌[^┌┘]*\| *)(?:editor|publisher)( *=[^┌┘]*┘)\n/ig,
							replace: '$1editora$2'
						}, {
							name: 'páginas',
							find: /(┌[^┌┘]*\| *)pages( *=[^┌┘]*┘)\n/ig,
							replace: '$1páginas$2'
						}]
					}, {
						name: 'Desmarca final',
						find: /┘/g,
						replace: ''
					}, {
						name: 'Desmarca início',
						find: /┌/g,
						replace: '{{citar livro'
					}]
				}, {
					name: 'traduzir para {{citar periódico}}',
					ifhas: '{{Cite journal', // FIXME: /\{\{Cite journal/i ?
					sub: [{
						name: 'Marca início',
						find: /\{\{Cite journal *(\||\r?\n|╔)/ig,
						replace: '┌$1'
					}, {
						name: 'Marca final',
						find: /(┌[^{}┘]*)\}\}/ig,
						replace: '$1┘}}'
					}, {
						name: 'Substitui campos',
						sub: [{
							name: 'ultimo',
							find: /(┌[^┌┘]*\| *)last( *=[^┌┘]*┘)/ig,
							replace: '$1ultimo$2'
						}, {
							name: 'primeiro',
							find: /(┌[^┌┘]*\| *)first( *=[^┌┘]*┘)/ig,
							replace: '$1primeiro$2'
						}, {
							name: 'autorlink',
							find: /(┌[^┌┘]*\| *)authorlink( *=[^┌┘]*┘)/ig,
							replace: '$1autorlink$2'
						}, {
							name: 'coautores',
							find: /(┌[^┌┘]*\| *)coauthors( *=[^┌┘]*┘)/ig,
							replace: '$1coautores$2'
						}, {
							name: 'data',
							find: /(┌[^┌┘]*\| *)date( *=[^┌┘]*┘)/ig,
							replace: '$1data$2'
						}, {
							name: 'ano',
							find: /(┌[^┌┘]*\| *)year( *=[^┌┘]*┘)/ig,
							replace: '$1ano$2'
						}, {
							name: 'mes',
							find: /(┌[^┌┘]*\| *)month( *=[^┌┘]*┘)/ig,
							replace: '$1mes$2'
						}, {
							name: 'titulo',
							find: /(┌[^┌┘]*\| *)title( *=[^┌┘]*┘)/ig,
							replace: '$1titulo$2'
						}, {
							name: 'jornal',
							find: /(┌[^┌┘]*\| *)journal( *=[^┌┘]*┘)/ig,
							replace: '$1jornal$2'
						}, {
							name: 'numero',
							find: /(┌[^┌┘]*\| *)issue( *=[^┌┘]*┘)/ig,
							replace: '$1numero$2'
						}, {
							name: 'paginas',
							find: /(┌[^┌┘]*\| *)pages( *=[^┌┘]*┘)/ig,
							replace: '$1paginas$2'
						}, {
							name: 'editora',
							find: /(┌[^┌┘]*\| *)publisher( *=[^┌┘]*┘)/ig,
							replace: '$1editora$2'
						}, {
							name: 'local',
							find: /(┌[^┌┘]*\| *)location( *=[^┌┘]*┘)/ig,
							replace: '$1local$2'
						}, {
							name: 'idioma',
							find: /(┌[^┌┘]*\| *)language( *=[^┌┘]*┘)/ig,
							replace: '$1idioma$2'
						}, {
							name: 'formato',
							find: /(┌[^┌┘]*\| *)format( *=[^┌┘]*┘)/ig,
							replace: '$1formato$2'
						}, {
							name: 'accessadoem',
							find: /(┌[^┌┘]*\| *)accessdate( *=[^┌┘]*┘)/ig,
							replace: '$1accessadoem$2'
						}, {
							name: 'aspas',
							find: /(┌[^┌┘]*\| *)quotes( *=[^┌┘]*┘)/ig,
							replace: '$1aspas$2'
						}, {
							name: 'autor',
							find: /(┌[^┌┘]*\| *)author( *=[^┌┘]*┘)/ig,
							replace: '$1autor$2'
						}]
					}, {
						name: 'Desmarca final',
						find: /┘/g,
						replace: ''
					}, {
						name: 'Desmarca início',
						find: /┌/g,
						replace: '{{citar periódico'
					}]
				}, {
					name: 'traduzir para {{citar web}}',
					ifhas: '{{Lien web', // FIXME: /\{\{Lien web/i ?
					sub: [{
						name: 'Marca início',
						find: /\{\{Lien web *(\||\r?\n|╔)/ig,
						replace: '$1┘}}'
					}, {
						name: 'Marca final',
						find: /(┌[^{}┘]*)\}\}/ig,
						replace: '$1┘}}'
					}, {
						name: 'Substitui campos',
						sub: [{
							name: 'titulo',
							find: /(┌[^┌┘]*\| *)titre( *=[^┌┘]*┘)/ig,
							replace: '$1titulo$2'
						}, {
							name: 'acessodata',
							find: /(┌[^┌┘]*\| *)consulté le( *=[^┌┘]*┘)/ig,
							replace: '$1acessodata$2'
						}, {
							name: 'autor',
							find: /(┌[^┌┘]*\| *)auteur( *=[^┌┘]*┘)/ig,
							replace: '$1autor$2'
						}, {
							name: 'autorlink',
							find: /(┌[^┌┘]*\| *)lien auteur( *=[^┌┘]*┘)/ig,
							replace: '$1autorlink$2'
						}, {
							name: 'coautores',
							find: /(┌[^┌┘]*\| *)coauteurs( *=[^┌┘]*┘)/ig,
							replace: '$1coautores$2'
						}, {
							name: 'data',
							find: /(┌[^┌┘]*\| *)date( *=[^┌┘]*┘)/ig,
							replace: '$1date$2'
						}, {
							name: 'ano',
							find: /(┌[^┌┘]*\| *)année( *=[^┌┘]*┘)/ig,
							replace: '$1ano$2'
						}, {
							name: 'mes',
							find: /(┌[^┌┘]*\| *)mois( *=[^┌┘]*┘)/ig,
							replace: '$1mes$2'
						}, {
							name: 'publicado',
							find: /(┌[^┌┘]*\| *)site( *=[^┌┘]*┘)/ig,
							replace: '$1publicado$2'
						}]
					}, {
						name: 'Desmarca final',
						find: /┘/g,
						replace: ''
					}, {
						name: 'Desmarca início',
						find: /┌/g,
						replace: '{{citar web'
					}]
				}, {
					name: 'traduzir para {{citar vídeo}}',
					ifhas: '{{Cite video', // FIXME: /\{\{Cite video/i ?
					sub: [{
						name: 'Marca início',
						find: /\{\{Cite video *(\||\r?\n|╔)/ig,
						replace: '┌$1'
					}, {
						name: 'Marca final',
						find: /(┌[^{}┘]*)\}\}/ig,
						replace: '$1┘}}'
					}, {
						name: 'Substitui campos',
						find: / \|pessoas *= *\{\{\{people\|\}\}\}\n \|data2 *= *\{\{\{date2\|\}\}\}\n \|mês2 *= *\{\{\{month2\|\}\}\}\n \|ano2 *= *\{\{\{year2\|\}\}\}\n \|título *= *\{\{\{title\|\}\}\}\n \|formato *= *\{\{\{format\|\}\}\}\n \|tipo *= *\{\{\{medium\|\}\}\}\n \|publicado por *= *\{\{\{publisher\|\}\}\}\n \|localização *= *\{\{\{location\|\}\}\}\n \|data de acesso *= *\{\{\{accessdate\|\}\}\}\n \|mês de acesso *= *\{\{\{accessmonth\|\}\}\}\n \|ano de acesso *= *\{\{\{accessyear\|\}\}\}\n \|hora *= *\{\{\{time\|\}\}\}\n \|citação *= *\{\{\{quote\|\}\}\}/g,
						replace: '',
						sub: [{
							name: 'pessoas',
							find: /(┌[^┌┘]*\| *)last( *=[^┌┘]*┘)/ig,
							replace: '$1pessoas$2'
						}, {
							name: 'data2',
							find: /(┌[^┌┘]*\| *)last( *=[^┌┘]*┘)/ig,
							replace: '$1data2$2'
						}, {
							name: 'mês2',
							find: /(┌[^┌┘]*\| *)last( *=[^┌┘]*┘)/ig,
							replace: '$1mês2$2'
						}, {
							name: 'ano2',
							find: /(┌[^┌┘]*\| *)last( *=[^┌┘]*┘)/ig,
							replace: '$1ano2$2'
						}, {
							name: 'título',
							find: /(┌[^┌┘]*\| *)last( *=[^┌┘]*┘)/ig,
							replace: '$1título$2'
						}, {
							name: 'formato',
							find: /(┌[^┌┘]*\| *)last( *=[^┌┘]*┘)/ig,
							replace: '$1formato$2'
						}, {
							name: 'tipo',
							find: /(┌[^┌┘]*\| *)last( *=[^┌┘]*┘)/ig,
							replace: '$1tipo$2'
						}, {
							name: 'publicado por',
							find: /(┌[^┌┘]*\| *)last( *=[^┌┘]*┘)/ig,
							replace: '$1publicado por$2'
						}, {
							name: 'Rule',
							find: /(┌[^┌┘]*\| *)last( *=[^┌┘]*┘)/ig,
							replace: '$1ultimo$2'
						}, {
							name: 'Rule',
							find: /(┌[^┌┘]*\| *)last( *=[^┌┘]*┘)/ig,
							replace: '$1ultimo$2'
						}, {
							name: 'Rule',
							find: /(┌[^┌┘]*\| *)last( *=[^┌┘]*┘)/ig,
							replace: '$1ultimo$2'
						}, {
							name: 'Rule',
							find: /(┌[^┌┘]*\| *)last( *=[^┌┘]*┘)/ig,
							replace: '$1ultimo$2'
						}, {
							name: 'Rule',
							find: /(┌[^┌┘]*\| *)last( *=[^┌┘]*┘)/ig,
							replace: '$1ultimo$2'
						}, {
							name: 'Rule',
							find: /(┌[^┌┘]*\| *)last( *=[^┌┘]*┘)/ig,
							replace: '$1ultimo$2'
						}]
					}, {
						name: 'Desmarca final',
						find: /┘/g,
						replace: ''
					}, {
						name: 'Desmarca início',
						find: /┌/g,
						replace: '{{citar vídeo'
					}]
				}]
			}, {
				name: 'Marca todas citar',
				find: /\{\{(Citar (?:web|notícia|entrevista|periódico|vídeo|livro|enciclopédia))/ig,
				replace: '{{┌$1',
				sub: [{
					name: 'Marcando todas citar',
					sub: [{
						name: 'Marca |língua=',
						find: /(\{\{┌[^{}]*)\| *(?:l[ií]ngua|idioma) *=/ig,
						replace: '$1┴='
					}, {
						name: 'Marca |acessodata=',
						find: /(\{\{┌[^{}]*)\| *acessodata *=/ig,
						replace: '$1└='
					}, {
						name: 'Marca |data=',
						find: /(\{\{┌[^{}]*)\| *data *=/ig,
						replace: '$1┘='
					}, {
						name: 'Marca |arquivodata=',
						find: /(\{\{┌[^{}]*)\| *arquivodata *=/ig,
						replace: '$1┤='
					}, {
						name: 'Marca |título=',
						find: /(\{\{┌[^{}]*)\| *título *=/ig,
						replace: '$1┐='
					}]
				}]
			}, {
				name: 'Ajustes todas citar',
				sub: [{
					name: 'data',
					sub: [{
						name: '-link data',
						find: /(<ref[^<>\n]*>[^┼]*)\[\[([1-2][0-9]{3,3}|[1-3]?[0-9] de (?:(?:jan|fever)eiro|março|abril|maio|ju[nl]ho|agosto|(?:setem|outu|novem|dezem)bro))\]\]/ig,
						replace: '$1$2',
						num: 100
					}, {
						name: 'traduzindo data 1st',
						find: /([└┘┤] *= *[^\|\}\n]*[0-9]+)(?:st|nd|rd)([^a-z])/ig,
						replace: '$1$2'
					}, {
						name: 'data para pt',
						ifhas: /(?:[└┘┤]|\| *(?:accessdate|date|data|mês|month) *)/i,
						sub: [{
							name: 'data com mês',
							sub: [{
								name: 'janeiro',
								find: /((?:[└┘┤]|\| *(?:accessdate|date|data|mês|month) *)= *[0-9]* *(?:de )?)(?:January|Enero|Janvier|Gennaio|Jan)([^a-z])/ig,
								replace: '$1janeiro$2',
								num: 100
							}, {
								name: 'fevereiro',
								find: /((?:[└┘┤]|\| *(?:accessdate|date|data|mês|month) *)= *[0-9]* *(?:de )?)(?:February|Febrero|Février|Febbraio|Fev)([^a-z])/ig,
								replace: '$1fevereiro$2',
								num: 100
							}, {
								name: 'março',
								find: /((?:[└┘┤]|\| *(?:accessdate|date|data|mês|month) *)= *[0-9]* *(?:de )?)(?:March|Marzo|Mars|Mar)([^a-zç])/ig,
								replace: '$1março$2',
								num: 100
							}, {
								name: 'abril',
								find: /((?:[└┘┤]|\| *(?:accessdate|date|data|mês|month) *)= *[0-9]* *(?:de )?)(?:A[pv]ril|Aprile|Abr|Apr)([^a-z])/ig,
								replace: '$1abril$2',
								num: 100
							}, {
								name: 'maio',
								find: /((?:[└┘┤]|\| *(?:accessdate|date|data|mês|month) *)= *[0-9]* *(?:de )?)(?:Mayo?|Mai|Maggio)([^a-z])/ig,
								replace: '$1maio$2',
								num: 100
							}, {
								name: 'junho',
								find: /((?:[└┘┤]|\| *(?:accessdate|date|data|mês|month) *)= *[0-9]* *(?:de )?)(?:June|Junio|Juin|Giugno|Jun)([^a-z])/ig,
								replace: '$1junho$2',
								num: 100
							}, {
								name: 'julho',
								find: /((?:[└┘┤]|\| *(?:accessdate|date|data|mês|month) *)= *[0-9]* *(?:de )?)(?:July|Julio|Juillet|Luglio|Jul)([^a-z])/ig,
								replace: '$1julho$2',
								num: 100
							}, {
								name: 'agosto',
								find: /((?:[└┘┤]|\| *(?:accessdate|date|data|mês|month) *)= *[0-9]* *(?:de )?)(?:August|Août|Ago|Aug)([^a-z])/ig,
								replace: '$1agosto$2',
								num: 100
							}, {
								name: 'setembro',
								find: /((?:[└┘┤]|\| *(?:accessdate|date|data|mês|month) *)= *[0-9]* *(?:de )?)(?:Septi?ember|Se[pt]tembre|Sep|Set)([^a-z])/ig,
								replace: '$1setembro$2',
								num: 100
							}, {
								name: 'outubro',
								find: /((?:[└┘┤]|\| *(?:accessdate|date|data|mês|month) *)= *[0-9]* *(?:de )?)(?:October|Oct[ou]bre|Ottobre|Out|Oct)([^a-z])/ig,
								replace: '$1outubro$2',
								num: 100
							}, {
								name: 'novembro',
								find: /((?:[└┘┤]|\| *(?:accessdate|date|data|mês|month) *)= *[0-9]* *(?:de )?)(?:November|Novi?embre|Nov)([^a-z])/ig,
								replace: '$1novembro$2',
								num: 100
							}, {
								name: 'dezembro',
								find: /((?:[└┘┤]|\| *(?:accessdate|date|data|mês|month) *)= *[0-9]* *(?:de )?)(?:D[eé]cember|Dici?embre|Dez|Dec)([^a-z])/ig,
								replace: '$1dezembro$2',
								num: 100
							}, {
								name: 'Arrumando',
								find: /([└┘┤]=|\| *(?:accessdate|date|data) *= *)([^ \|\n\}\/\-└=]+) ([1-3]?[0-9]) *.? *([1-2][0-9]{3,3})/ig,
								replace: '$1$3 de $2 de $4'
							}]
						}, {
							name: 'data com numero',
							num: 100,
							sub: [{
								name: 'mm-dd-aaaa',
								find: /([└┘┤]|\| *(?:accessdate|date|data|mês|month) *= *)([0-1]?[0-9]).(1[3-9]|[2-3][0-9]).([1-2][0-9]{3,3})/ig,
								replace: '$1$3/$2/$4',
								num: 100
							}, {
								name: 'dd-mm-aaaa',
								find: /([└┘┤]|\| *(?:accessdate|date|data|mês|month) *= *)(1[3-9]|[2-3][0-9]).([0-1]?[0-9]).([1-2][0-9]{3,3})/ig,
								replace: '$1$2/$3/$4',
								num: 100
							}, {
								name: 'aaaa-dd-mm',
								find: /([└┘┤]|\| *(?:accessdate|date|data|mês|month) *= *)([1-2][0-9]{3,3}).(1[3-9]|[2-3][0-9]).([0-1]?[0-9])/ig,
								replace: '$1$3/$4/$2',
								num: 100
							}, {
								name: 'aaaa-mm-dd',
								find: /([└┘┤]|\| *(?:accessdate|date|data|mês|month) *= *)([1-2][0-9]{3,3}).([0-1]?[0-9]).(1[3-9]|[2-3][0-9])/ig,
								replace: '$1$4/$3/$2',
								num: 100
							}]
						}, {
							name: 'data para mês',
							num: 100,
							ifhas: /((?:[└┘┤]|\| *(?:accessdate|date|data|mês|month) *= *)1[3-9]|[2-3][0-9])\/[0-1]?[0-9]\/([1-2][0-9]{3,3})/i,
							sub: [{
								name: 'janeiro',
								find: /((?:[└┘┤]|\| *(?:accessdate|date|data|mês|month) *= *)(?:1[3-9]|[2-3][0-9]))\/0?1\/([1-2][0-9]{3,3})/ig,
								replace: '$1 de janeiro de $2'
							}, {
								name: 'fevereiro',
								find: /((?:[└┘┤]|\| *(?:accessdate|date|data|mês|month) *= *)(?:1[3-9]|[2-3][0-9]))\/0?2\/([1-2][0-9]{3,3})/ig,
								replace: '$1 de fevereiro de $2'
							}, {
								name: 'março',
								find: /((?:[└┘┤]|\| *(?:accessdate|date|data|mês|month) *= *)(?:1[3-9]|[2-3][0-9]))\/0?3\/([1-2][0-9]{3,3})/ig,
								replace: '$1 de março de $2'
							}, {
								name: 'abril',
								find: /((?:[└┘┤]|\| *(?:accessdate|date|data|mês|month) *= *)(?:1[3-9]|[2-3][0-9]))\/0?4\/([1-2][0-9]{3,3})/ig,
								replace: '$1 de abril de $2'
							}, {
								name: 'maio',
								find: /((?:[└┘┤]|\| *(?:accessdate|date|data|mês|month) *= *)(?:1[3-9]|[2-3][0-9]))\/0?5\/([1-2][0-9]{3,3})/ig,
								replace: '$1 de maio de $2'
							}, {
								name: 'junho',
								find: /((?:[└┘┤]|\| *(?:accessdate|date|data|mês|month) *= *)(?:1[3-9]|[2-3][0-9]))\/0?6\/([1-2][0-9]{3,3})/ig,
								replace: '$1 de junho de $2'
							}, {
								name: 'julho',
								find: /((?:[└┘┤]|\| *(?:accessdate|date|data|mês|month) *= *)(?:1[3-9]|[2-3][0-9]))\/0?7\/([1-2][0-9]{3,3})/ig,
								replace: '$1 de julho de $2',
								num: 10
							}, {
								name: 'agosto',
								find: /((?:[└┘┤]|\| *(?:accessdate|date|data|mês|month) *= *)(?:1[3-9]|[2-3][0-9]))\/0?8\/([1-2][0-9]{3,3})/ig,
								replace: '$1 de agosto de $2'
							}, {
								name: 'setembro',
								find: /((?:[└┘┤]|\| *(?:accessdate|date|data|mês|month) *= *)(?:1[3-9]|[2-3][0-9]))\/0?9\/([1-2][0-9]{3,3})/ig,
								replace: '$1 de setembro de $2'
							}, {
								name: 'outubro',
								find: /((?:[└┘┤]|\| *(?:accessdate|date|data|mês|month) *= *)(?:1[3-9]|[2-3][0-9]))\/10\/([1-2][0-9]{3,3})/ig,
								replace: '$1 de outubro de $2'
							}, {
								name: 'novembro',
								find: /((?:[└┘┤]|\| *(?:accessdate|date|data|mês|month) *= *)(?:1[3-9]|[2-3][0-9]))\/11\/([1-2][0-9]{3,3})/ig,
								replace: '$1 de novembro de $2'
							}, {
								name: 'dezembro',
								find: /((?:[└┘┤]|\| *(?:accessdate|date|data|mês|month) *= *)(?:1[3-9]|[2-3][0-9]))\/12\/([1-2][0-9]{3,3})/ig,
								replace: '$1 de dezembro de $2'
							}]
						}, {
							name: 'dia e mes igual',
							ifhas: /[└┘┤]|\| *(?:accessdate|date|data|mês|month) *= *([1-2][0-9]{3,3}[^0-9][0-9]{2,2}[^0-9][0-9]{2,2}|[0-9]{2,2}[^0-9][0-9]{2,2}[^0-9][1-2][0-9]{3,3})/i,
							sub: [{
								name: '2010-01-01',
								find: /([└┘┤]|\| *(?:accessdate|date|data|mês|month) *= *)([1-2][0-9]{3,3})[^0-9]0?1[^0-9]0?(1)/ig,
								replace: '$1$3 de janeiro de $2'
							}, {
								name: '2010-02-02',
								find: /([└┘┤]|\| *(?:accessdate|date|data|mês|month) *= *)([1-2][0-9]{3,3})[^0-9]0?2[^0-9]0?(2)/ig,
								replace: '$1$3 de fevereiro de $2'
							}, {
								name: '2010-03-03',
								find: /([└┘┤]|\| *(?:accessdate|date|data|mês|month) *= *)([1-2][0-9]{3,3})[^0-9]0?3[^0-9]0?(3)/ig,
								replace: '$1$3 de março de $2'
							}, {
								name: '2010-04-04',
								find: /([└┘┤]|\| *(?:accessdate|date|data|mês|month) *= *)([1-2][0-9]{3,3})[^0-9]0?4[^0-9]0?(4)/ig,
								replace: '$1$3 de abril de $2'
							}, {
								name: '2010-05-05',
								find: /([└┘┤]|\| *(?:accessdate|date|data|mês|month) *= *)([1-2][0-9]{3,3})[^0-9]0?5[^0-9]0?(5)/ig,
								replace: '$1$3 de maio de $2'
							}, {
								name: '2010-06-06',
								find: /([└┘┤]|\| *(?:accessdate|date|data|mês|month) *= *)([1-2][0-9]{3,3})[^0-9]0?6[^0-9]0?(6)/ig,
								replace: '$1$3 de junho de $2'
							}, {
								name: '2010-07-07',
								find: /([└┘┤]|\| *(?:accessdate|date|data|mês|month) *= *)([1-2][0-9]{3,3})[^0-9]0?7[^0-9]0?(7)/ig,
								replace: '$1$3 de julho de $2'
							}, {
								name: '2010-08-08',
								find: /([└┘┤]|\| *(?:accessdate|date|data|mês|month) *= *)([1-2][0-9]{3,3})[^0-9]0?8[^0-9]0?(8)/ig,
								replace: '$1$3 de agosto de $2'
							}, {
								name: '2010-09-09',
								find: /([└┘┤]|\| *(?:accessdate|date|data|mês|month) *= *)([1-2][0-9]{3,3})[^0-9]0?9[^0-9]0?(9)/ig,
								replace: '$1$3 de setembro de $2'
							}, {
								name: '2010-10-10',
								find: /([└┘┤]|\| *(?:accessdate|date|data|mês|month) *= *)([1-2][0-9]{3,3})[^0-9]10[^0-9](10)/ig,
								replace: '$1$3 de outubro de $2'
							}, {
								name: '2010-11-11',
								find: /([└┘┤]|\| *(?:accessdate|date|data|mês|month) *= *)([1-2][0-9]{3,3})[^0-9]11[^0-9](11)/ig,
								replace: '$1$3 de novembro de $2'
							}, {
								name: '2010-12-12',
								find: /([└┘┤]|\| *(?:accessdate|date|data|mês|month) *= *)([1-2][0-9]{3,3})[^0-9]12[^0-9](12)/ig,
								replace: '$1$3 de dezembro de $2'
							}, {
								name: '01-01-2010',
								find: /([└┘┤]|\| *(?:accessdate|date|data|mês|month) *= *)0?(1)[^0-9]0?1[^0-9]([1-2][0-9]{3,3})/ig,
								replace: '$1$2 de janeiro de $3'
							}, {
								name: '02-02-2010',
								find: /([└┘┤]|\| *(?:accessdate|date|data|mês|month) *= *)0?(2)[^0-9]0?2[^0-9]([1-2][0-9]{3,3})/ig,
								replace: '$1$2 de fevereiro de $3'
							}, {
								name: '03-03-2010',
								find: /([└┘┤]|\| *(?:accessdate|date|data|mês|month) *= *)0?(3)[^0-9]0?3[^0-9]([1-2][0-9]{3,3})/ig,
								replace: '$1$2 de março de $3'
							}, {
								name: '04-04-2010',
								find: /([└┘┤]|\| *(?:accessdate|date|data|mês|month) *= *)0?(4)[^0-9]0?4[^0-9]([1-2][0-9]{3,3})/ig,
								replace: '$1$2 de abril de $3'
							}, {
								name: '05-05-2010',
								find: /([└┘┤]|\| *(?:accessdate|date|data|mês|month) *= *)0?(5)[^0-9]0?5[^0-9]([1-2][0-9]{3,3})/ig,
								replace: '$1$2 de maio de $3'
							}, {
								name: '06-06-2010',
								find: /([└┘┤]|\| *(?:accessdate|date|data|mês|month) *= *)0?(6)[^0-9]0?6[^0-9]([1-2][0-9]{3,3})/ig,
								replace: '$1$2 de junho de $3'
							}, {
								name: '07-07-2010',
								find: /([└┘┤]|\| *(?:accessdate|date|data|mês|month) *= *)0?(7)[^0-9]0?7[^0-9]([1-2][0-9]{3,3})/ig,
								replace: '$1$2 de julho de $3'
							}, {
								name: '08-08-2010',
								find: /([└┘┤]|\| *(?:accessdate|date|data|mês|month) *= *)0?(8)[^0-9]0?8[^0-9]([1-2][0-9]{3,3})/ig,
								replace: '$1$2 de agosto de $3'
							}, {
								name: '09-09-2010',
								find: /([└┘┤]|\| *(?:accessdate|date|data|mês|month) *= *)0?(9)[^0-9]0?9[^0-9]([1-2][0-9]{3,3})/ig,
								replace: '$1$2 de setembro de $3'
							}, {
								name: '10-10-2010',
								find: /([└┘┤]|\| *(?:accessdate|date|data|mês|month) *= *)(10)[^0-9]10[^0-9]([1-2][0-9]{3,3})/ig,
								replace: '$1$2 de outubro de $3'
							}, {
								name: '11-11-2010',
								find: /([└┘┤]|\| *(?:accessdate|date|data|mês|month) *= *)(11)[^0-9]11[^0-9]([1-2][0-9]{3,3})/ig,
								replace: '$1$2 de novembro de $3'
							}, {
								name: '12-12-2010',
								find: /([└┘┤]|\| *(?:accessdate|date|data|mês|month) *= *)(12)[^0-9]12[^0-9]([1-2][0-9]{3,3})/ig,
								replace: '$1$2 de dezembro de $3'
							}]
						}, {
							name: 'data de mmmm dd aaaa',
							find: /([└┘┤])= *([^ 0-9└┘][^ \,\.\-\/└┘]*) *. *([0-9]{1,2}) *. *([0-9]{4,4})/ig,
							replace: '$1=$3 de $2 de $4',
							num: 10
						}, {
							name: 'data de dd mmmm aaaa',
							find: /([└┘┤]= *[0-9]{1,2}) ([^ 0-9\}\|\n]+) ([0-9]{4,4})/ig,
							replace: '$1 de $2 de $3'
						}]
					}]
				}, {
					name: 'acesso',
					sub: [{
						name: 'Link de acessodata',
						find: /(└=)([^\[\]\{\}\|\n]*)\[\[([^\[\]\{\}\|\n]+)\]\]/g,
						replace: '$1$2$3',
						num: 10
					}, {
						name: 'Página visitada -> Visitada',
						find: /(\{\{┌[^{}]*)(?:Página visitada)/ig,
						replace: '$1Visitada',
						num: 100
					}, {
						name: 'Coloca |acessodata=',
						find: /(┐= *[^{}]*) *\(?(?:acesso|acessado|consultado|obtido|retirado|retrieved|visitad[ao]) (?:em|a|on)? *(\[?\[?[0-3]?[0-9] (?:de)? *[^ \n{}]*\]?\]? (?:de)? *\[?\[?[1-2][0-9]{1,3}\]?\]?\.?|[0-3]?[0-9][^0-9][0-3]?[0-9][^0-9][1-2]?[0-9]?[0-9]{1,2})\)? *([^└}\n]*(?:\{\{[a-z][a-z]\}\}[^└}\n]*)?)└= *([\|}])/ig,
						replace: '$1$3└=$2 $4'
					}, {
						name: 'Coloca |acessodata= 2',
						find: /(┐= *[^{}]*) *(?:retrieved|accessed) *(?:on)? *((?:[^ \n{}]*\]?\]? \[?\[?[0-3]?[0-9] *.? *\[?\[?[1-2][0-9]{1,3}\]?\]?\.?)|[1-2]?[0-9]{1,3}[^0-9][0-3]?[0-9][^0-9][1-2]?[0-9]{1,3}) *([^└}\n]*(?:\{\{[a-z][a-z]\}\}[^└}\n]*)?)└= *([\|}])/ig,
						replace: '$1$3└=$2 $4'
					}]
				}, {
					name: 'língua',
					sub: [{
						name: 'língua com {{Código língua}}',
						find: /┴=\{\{Código língua\|([a-z]{2,2})=1\}\}([\|\}])/ig,
						replace: '┴2=$1$2'
					}, {
						name: 'Coloca |língua2=',
						ifhas: /┴/i,
						sub: [{
							name: 'língua= em',
							find: /┴= *em /ig,
							replace: '┴='
						}, {
							name: 'Coloca |língua2= com {{en}}',
							find: /┴=([^\{\}┼]*)\{\{\(?\(?([a-z]{2,3})\)?\)?\}\}/ig,
							replace: '┴2=$2$1',
							num: 10
						}, {
							name: 'Coloca |língua2=en',
							find: /┴=(?:em )?(?:\[?\[?Inglês\]?\]?|\[\[Língua inglesa\|inglês\]\])( *[└┘┐\|}])/ig,
							replace: '┴2=en$1',
							num: 10
						}, {
							name: 'Coloca |língua2=pt',
							find: /┴=(?:em )?\[?\[?(?:língua portuguesa\|)?portugu[eê]s\]?\]?( *[└┘┐\|}])/ig,
							replace: '┴2=pt$1',
							num: 10
						}, {
							name: 'Coloca |língua2=es',
							find: /┴=(?:em )?\[?\[?(?:língua espanhola\|)?espanhol\]?\]?( *[└┘┐\|}])/ig,
							replace: '┴2=es$1',
							num: 10
						}]
					}]
				}, {
					name: 'Retira ponto final 1',
					find: /([┘┴└][^\|\{\}]+)\. *([\|\}])/ig,
					replace: '$1$2',
					num: 100
				}]
			}, {
				name: 'Citar específica',
				sub: [{
					name: 'Preenchendo Citar web',
					ifhas: /\{\{Citar web/i,
					sub: [{
						name: 'Coloca |língua= final {{Citar web}}',
						find: /(\{\{Citar web)([^\{\}┼]*)\{\{\(?\(?([a-z][a-z])\)?\)?\}\}([^\{\}┼]*)\}\}/ig,
						replace: '$1$2$4{{$3}}}}',
						num: 10
					}, {
						name: 'Preenchendo',
						sub: [{
							name: '|data=',
							ifhas: /┘/i,
							sub: [{
								name: 'Colocando |data=',
								find: /(┐= *[^└┘}]*) ([^ └┘{}\.\,]{3,} \[?\[?[0-3]?[0-9] *.? *\[?\[?[1-2][0-9]{1,3}\]?\]?\.?|[1-2]?[0-9]{1,3}[^0-9][0-3]?[0-9][^0-9][1-2]?[0-9]{1,3})([^0-9][^└┘}]*┘=)/g,
								replace: '$1$3$2'
							}]
						}, {
							name: 'Ajustes',
							find: /(?:\(\)|\() *([┘┴└])/ig,
							replace: '$1',
							num: 100
						}, {
							name: 'Retira ponto final',
							sub: [{
								name: 'Retira ponto final 2',
								find: /\. *([┘┴└])/ig,
								replace: '$1',
								num: 100
							}, {
								name: 'Retira ponto final 3',
								find: /([^ ])([┘┴└])/g,
								replace: '$1 $2',
								num: 10
							}]
						}]
					}]
				}]
			}, {
				name: 'Ajustes nas Citar',
				sub: [{
					name: 'Itálico em título',
					find: /(\{\{┌[^{}\n]*\|título=)''([^'{}\|\n]*)''/ig,
					replace: '$1$2'
				}, {
					name: 'espaço duplo',
					find: /(\{\{┌[^{}\n]* ) /ig,
					replace: '$1',
					num: 100
				}, {
					name: '2 língua2',
					find: /(┴2 *= *[a-z]*[^{}\n]*)\| *língua[23] *=/ig,
					replace: '$1',
					num: 10
				}, {
					name: 'língua2 -> língua3',
					find: /(┴2 *= *([a-z]+)[^a-z][^░]*)┴2( *= *\2)/ig,
					replace: '$1┴3$3',
					num: 100
				}]
			}, {
				name: 'Desmarca todas citar',
				find: /┌/g,
				replace: '',
				sub: [{
					name: 'Desmarca |língua=',
					find: /┴/g,
					replace: '|língua'
				}, {
					name: 'Desmarca |acessodata=',
					find: /└/g,
					replace: '|acessodata'
				}, {
					name: 'Desmarca |data=',
					find: /┘/g,
					replace: '|data'
				}, {
					name: 'Desmarca |arquivodata=',
					find: /┤/g,
					replace: '|arquivodata'
				}, {
					name: 'Desmarca |título=',
					find: /┐/g,
					replace: '|título'
				}]
			}]
		}, {
			name: 'Desmarca',
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
			name: 'Defaultsort sobrenome',
			ifhas: '{{Biografias}}', // FIXME: /\{\{Biografias}}/i ?
			sub: [{
				name: 'Paisnatal nao lusofono',
				find: /\{\{DEFAULTSORT:([^,\(\){}\n]+) ([^ ,\(\){}\n]+)( \([^\(\)\{\}\n]+\))?\}\}/g,
				replace: '{{DEFAULTSORT:$2, $1$3}}',
				ifhas: /\n *\| *pa[ií]s(natal)? *= *\{\{/,
				ifnot: /\n *\| *pa[ií]s(natal)? *= *\{\{(AGO|BRA|CPV|GNB|GNQ|MAC|MOZ|MUS|PRT|SEN|STP|TLS)/
			}]
		}, {
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
					name: 'Portal3 - via Esboço',
					ifhas: /\{\{Esboço/i,
					sub: [{
						name: 'Portal3 - esboço Brasil',
      find: /\{\{Portal3\|/g,
						replace: '{{Portal3|Brasil|',
						ifhas: /\{esboço\-(geo)?\-?(a[clpm]|br|ce|df|es|go|m[atsg]|p[rbaei]|r[jnso]|s[cpe])\}/i,
						ifnot: /\{\{Portal3.*\|(Brasil|Tocantins|Sergirpe|São Paulo|Santa Catarina|Roraima|Rondônia|Rio Grande do Sul|Rio Grande do Norte|Rio de Janeiro|Piauí|Pernambuco|Paraná|Paraíba|Pará|Minas Gerais|Mato Grosso do Sul|Mato Grosso|Maranhão|Goiás|Espírito Santo|Ceará|Bahia|Amazonas|Amapá|Alagoas|Acre)/i,
						sub: [{
							enabled: false,
							name: 'Geral',
							find: /(Esboço\-geo([a-z][a-z])\}\}.*[^░]*)\{\{Portal3\|\}\}/ig, // FIXME: Singleline?
							replace: '$1{{Portal3|$2|}}',
							ifhas: /Esboço\-geo(ar|ao|cl|fr|ht|lx|sw)\}/i,
							ifnot: /\{\{Portal3.*\|(Argentina|Angola|Chile|França|Haiti|Luxemburgo|Suécia)[ \|\}]/i
						}]
					}, {
						enabled: false,
						name: 'Geral',
						find: /(Esboço\-geo([a-z][a-z])\}\}.*[^░]*)\{\{Portal3\|\}\}/ig, // FIXME: Singleline?
						replace: '$1{{Portal3|$2|}}',
						ifhas: /Esboço\-geo(ar|ao|cl|fr|ht|lx|sw)\}/i,
						ifnot: /\{\{Portal3.*\|(Argentina|Angola|Chile|França|Haiti|Luxemburgo|Suécia)[ \|\}]/i
					}]
				}, {
					name: 'Portal3 - via Infocaixa',
					ifhas: '{{Info/',
					sub: [{
						// A espera de uma predef de subst para Iso2país
						enabled: false,
						name: 'Campo |país=',
						find: /(\{\{Info\/[^╣]*\| *pa[ií]s *= *\{\{([A-Z]+)[a-z]{0,2}\}\}[^░]*)(\{\{Portal3\|)\}\}/g,
						replace: '$1$3$2}}'
					}]
				}, {
					/* Usar cat para países
pega mts artigos que
não estão tão próximos
do Portal */
					enabled: false,
					name: 'Países (com cat)',
					ifnot: '{{Info/Armamento', // FIXME: /\{\{Info/Armamento/i ?
					sub: [{
						name: 'Brasil (cat)',
      find: /\{\{Portal3\|/g,
						replace: '{{Portal3|Brasil|',
						ifhas: /\[\[Categoria:((.*o )?(Brasil)|Bairros .* de Manaus)[ \|\]]/i,
						ifnot: /(\{\{Portal3.*\|(Brasil|Tocantins|Sergirpe|São Paulo|Santa Catarina|Roraima|Rondônia|Rio Grande do Sul|Rio Grande do Norte|Rio de Janeiro|Piauí|Pernambuco|Paraná|Paraíba|Pará|Minas Gerais|Mato Grosso do Sul|Mato Grosso|Maranhão|Goiás|Espírito Santo|Ceará|Bahia|Amazonas|Amapá|Alagoas|Acre)|\[\[Categoria:(.* )?(Mineiros))[ \|\}]/i
					}, {
						name: 'Portugal (cat)',
						find: /\{\{Portal3\|/g, // FIXME: /\{\{Portal3|/gi ?
						replace: '{{Portal3|Portugal|',
						ifhas: /(\[\[Categoria:(.* )?(Portugal)[ \|\]]|\{\{(Esboço\-freguesiaspt)\}\})/i,
						ifnot: /\{\{Portal3.*\|Portugal[ \|\}]/i
					}, {
						name: 'Venezuela',
						find: /\{\{Portal3\|/g, // FIXME: /\{\{Portal3|/gi ?
						replace: '{{Portal3|Venezuela|',
						ifhas: /\[\[Categoria:(.* )?(Venezuela)[ \|\]]/i,
						ifnot: /\{\{Portal3.*\|Venezuela[ \|\}]/i
					}, {
						name: 'Suíça',
      find: /\{\{Portal3\|/g,
						replace: '{{Portal3|Suíça|',
						ifhas: /\[\[Categoria:(.* )?(Suíça)[ \|\]]/i,
						ifnot: /\{\{Portal3.*\|Suíça[ \|\}]/i
					}, {
						name: 'Suécia',
      find: /\{\{Portal3\|/g,
						replace: '{{Portal3|Suécia|',
						ifhas: /\[\[Categoria:(.* )?(Suécia|Sueca)[ \|\]]/i,
						ifnot: /\{\{Portal3.*\|Suécia[ \|\}]/i
					}, {
						name: 'Rússia',
      find: /\{\{Portal3\|/g,
						replace: '{{Portal3|Rússia|',
						ifhas: /\[\[Categoria:(.* )?(Rússia)[ \|\]]/i,
						ifnot: /\{\{Portal3.*\|Rússia[ \|\}]/i
					}, {
						name: 'República Checa',
      find: /\{\{Portal3\|/g,
						replace: '{{Portal3|República Checa|',
						ifhas: /\[\[Categoria:(.* )?(República Checa)[ \|\]]/,
						ifnot: /\{\{Portal3.*\|República Checa[ \|\}]/
					}, {
						name: 'Reino Unido',
      find: /\{\{Portal3\|/g,
						replace: '{{Portal3|Reino Unido|',
						ifhas: /\[\[Categoria:(.* )?(Reino Unido)[ \|\]]/i,
						ifnot: /\{\{Portal3.*\|Reino Unido[ \|\}]/i
					}, {
						name: 'Polónia',
      find: /\{\{Portal3\|/g,
						replace: '{{Portal3|Polónia|',
						ifhas: /\[\[Categoria:(.* )?(Polónia|Polônia)[ \|\]]/i,
						ifnot: /\{\{Portal3.*\|Polónia[ \|\}]/i
					}, {
						name: 'Japão',
      find: /\{\{Portal3\|/g,
						replace: '{{Portal3|Japão|',
						ifhas: /\[\[Categoria:(.* )?(Japão)[ \|\]]/i,
						ifnot: /\{\{Portal3.*\|Japão[ \|\}]/i
					}, {
						name: 'Itália',
      find: /\{\{Portal3\|/g,
						replace: '{{Portal3|Itália|',
						ifhas: /\[\[Categoria:(.* )?(Itália)[ \|\]]/i,
						ifnot: /\{\{Portal3.*\|Itália[ \|\}]/i
					}, {
						name: 'Israel',
      find: /\{\{Portal3\|/g,
						replace: '{{Portal3|Israel|',
						ifhas: /\[\[Categoria:(.* )?(Israel)[ \|\]]/i,
						ifnot: /\{\{Portal3.*\|Israel[ \|\}]/i
					}, {
						name: 'Irlanda',
      find: /\{\{Portal3\|/g,
						replace: '{{Portal3|Irlanda|',
						ifhas: /\[\[Categoria:(.* )?(Irlanda)[ \|\]]/i,
						ifnot: /\{\{Portal3.*\|Irlanda[ \|\}]/i
					}, {
						name: 'Inglaterra',
      find: /\{\{Portal3\|/g,
						replace: '{{Portal3|Inglaterra|',
						ifhas: /\[\[Categoria:(.* )?(Inglaterra|Britânica?o?s?)[ \|\]]/i,
						ifnot: /\{\{Portal3.*\|Inglaterra[ \|\}]/i
					}, {
						name: 'Hungria',
      find: /\{\{Portal3\|/g,
						replace: '{{Portal3|Hungria|',
						ifhas: /\[\[Categoria:(.* )?(Hungria)[ \|\]]/i,
						ifnot: /\{\{Portal3.*\|Inglaterra[ \|\}]/i
					}, {
						name: 'Grécia',
      find: /\{\{Portal3\|/g,
						replace: '{{Portal3|Grécia|',
						ifhas: /\[\[Categoria:(.* )?(Grécia)[ \|\]]/i,
						ifnot: /\{\{Portal3.*\|Grécia[ \|\}]/i
					}, {
						name: 'França',
      find: /\{\{Portal3\|/g,
						replace: '{{Portal3|França|',
						ifhas: /\[\[Categoria:(.* )?(França)[ \|\]]/i,
						ifnot: /\{\{Portal3.*\|França[ \|\}]/i
					}, {
						name: 'Estónia',
      find: /\{\{Portal3\|/g,
						replace: '{{Portal3|Estónia|',
						ifhas: /\[\[Categoria:(.* )?(Estónia|Estônia)[ \|\]]/i,
						ifnot: /\{\{Portal3.*\|Estónia[ \|\}]/i
					}, {
						name: 'Estados Unidos',
      find: /\{\{Portal3\|/g,
						replace: '{{Portal3|Estados Unidos|',
						ifhas: /\[\[Categoria:(.* )?(Estados Unidos|Estadunidense|Norte-americano)[ \|\]]/i,
						ifnot: /\{\{Portal3.*\|Estados Unidos[ \|\}]/i
					}, {
						name: 'Espanha',
      find: /\{\{Portal3\|/g,
						replace: '{{Portal3|Espanha|',
						ifhas: /\[\[Categoria:(.* )?(Espanha)[ \|\]]/i,
						ifnot: /\{\{Portal3.*\|Espanha[ \|\}]/i
					}, {
						name: 'Chile',
      find: /\{\{Portal3\|/g,
						replace: '{{Portal3|Chile|',
						ifhas: /\[\[Categoria:(.* )?(Chile)[ \|\]]/i,
						ifnot: /\{\{Portal3.*\|Chile[ \|\}]/i
					}, {
						name: 'Canadá',
      find: /\{\{Portal3\|/g,
						replace: '{{Portal3|Canadá|',
						ifhas: /\[\[Categoria:(.* )?(Canadá)[ \|\]]/i,
						ifnot: /\{\{Portal3.*\|Canadá[ \|\}]/i
					}, {
						name: 'Bélgica',
      find: /\{\{Portal3\|/g,
						replace: '{{Portal3|Bélgica|',
						ifhas: /\[\[Categoria:(.* )?(Bélgica)[ \|\]]/i,
						ifnot: /\{\{Portal3.*\|Bélgica[ \|\}]/i
					}, {
						name: 'Áustria',
      find: /\{\{Portal3\|/g,
						replace: '{{Portal3|Áustria|',
						ifhas: /\[\[Categoria:(.* )?(Áustria)[ \|\]]/i,
						ifnot: /\{\{Portal3.*\|Áustria[ \|\}]/i
					}, {
						name: 'Alemanha',
      find: /\{\{Portal3\|/g,
						replace: '{{Portal3|Alemanha|',
						ifhas: /\[\[Categoria:(.* )?(Alemanha)[ \|\]]/i,
						ifnot: /\{\{Portal3.*\|Alemanha[ \|\}]/i
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
		}, {
			name: '{{Caixa de sucessão}} e Link data',
			find: /(\{\{Caixa de sucessão[^{}]*\n *\| *anos *=.*)\[\[([0-9]+ de (?:janeiro|fevereiro|março|abril|maio|junho|julho|agosto|setembro|outubro|novembro|dezembro)|[1-2][0-9]{3,3})\]\]/ig,
			replace: '$1$2',
			num: 10
		}]
	}, {
		name: 'Geral',
		sub: [{
			name: 'Ordem das seções inferiores',
			ifhas: /║/i,
			sub: [{
				name: 'Marca final da última seção',
				sub: [{
					name: 'Rule',
					find: /\n\r?\n/ig,
					replace: '┼'
				}, {
					name: 'Rule',
					find: /((?:║== Ver também ==|║== Referências? ==)\r?\n[^║░\*]*\*[^┼║░]*)┼([^║░]*░)/ig,
					replace: '$1\n\n┴$2'
				}, {
					name: 'Rule',
					find: /┼/ig,
					replace: '\n\n'
				}]
			}, {
				name: 'Marca seções',
				sub: [{
					name: 'Marca LE',
					find: /║== Ligações externas ==/g,
					replace: '┬'
				}, {
					name: 'Marca VT',
					find: /║== Ver também ==/g,
					replace: '┼'
				}, {
					name: 'Marca REF',
					find: /║== Referências? ==/ig,
					replace: '├'
				}]
			}, {
				name: 'Ordem LE VT',
				find: /(┬[^┼├╔╗]*)(┼[^├┴╔╗]*)┴/ig,
				replace: '$2$1┴'
			}, {
				name: 'Ordem LE REF',
				find: /(┬[^┼├╔╗]*)(├[^┼┴╔╗]*)┴/ig,
				replace: '$2$1┴'
			}, {
				name: 'Desmarca seções',
				sub: [{
					name: 'Desmarca REF',
					find: /├/g,
					replace: '║== Referências =='
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
				name: 'Desmarca final da última seção',
				find: /┴/g,
				replace: ''
			}]
		}]
	}, {
		name: 'Temáticos',
		sub: [{
			name: 'Biografia',
			ifhas: /\{\{Portal3.*\|Biografias/i,
			sub: [{
				name: 'Parte Sup',
				sub: [{
					name: 'Campos infobox',
					ifhas: '{{Info/', // FIXME: /\{\{Info//i ?
					sub: [{
						name: 'padrao nascimento e morte',
						sub: [{
							name: 'nascimento_data',
							find: /(\{\{Info\/[^╣]*\| *)(?:data_nascimento|datadenascimento|nasceu)( *=)/ig,
							replace: '$1nascimento_data$2'
						}, {
							name: 'nascimento_local',
							find: /(\{\{Info\/[^╣]*\| *)(?:localidaden|local_nascimento|localnasc)( *=)/ig,
							replace: '$1nascimento_local$2'
						}, {
							name: 'nascimento_cidade',
							find: /(\{\{Info\/[^╣]*\| *)cidadenatal( *=)/ig,
							replace: '$1nascimento_cidade$2'
						}, {
							name: 'nascimento_país',
							find: /(\{\{Info\/[^╣]*\| *)pa[ií]snatal( *=)/ig,
							replace: '$1nascimento_país$2'
						}, {
							name: 'morte_data',
							find: /(\{\{Info\/[^╣]*\| *)(?:data_falecimento|falecimento_data|data_morte|faleceu|datadefalecimento)( *=)/ig,
							replace: '$1morte_data$2'
						}, {
							name: 'morte_local',
							find: /(\{\{Info\/[^╣]*\| *)(?:localidadef|local_morte|falecimento_local|local_falecimento|localfaleceu)( *=)/ig,
							replace: '$1morte_local$2'
						}, {
							name: 'morte_cidade',
							find: /(\{\{Info\/[^╣]*\| *)(?:cidadedamorte)( *=)/ig,
							replace: '$1morte_cidade$2'
						}, {
							name: 'morte_país',
							find: /(\{\{Info\/[^╣]*\| *)(?:paisdamorte)( *=)/ig,
							replace: '$1morte_país$2'
						}]
					}, {
						name: 'nascimento_local',
						find: /(\{\{Info\/[^╣]*\| *nascimento_local *=) *(\r?\n[^╚]+╚[^╝\(\)]+\((\[\[[^\[\]\n]+\]\]),)/ig,
						replace: '$1 $3$2'
					}, {
						name: 'nascimento_data',
						find: /(\{\{Info\/[^╣]*\| *nascimento_data *=) *(?:\{\{dni\|[^0-9\n]+\}\})?(\r?\n[^╚]+╚[^╝\(\)]+\((?:[^\,\n\(\)]+(?:\([^\(\)\n]+\)\|[^\(\)\]]+\]\][^\,\n\(\)]*)?, )?([^\-\–\—\,\n\(\)]+) ?[\-\–\—\n\)])/ig,
						replace: '$1 $3$2'
					}, {
						name: 'morte_local',
						find: /(\{\{Info\/[^╣]*\| *morte_local *=) *(\r?\n[^╚]+╚[^╝\(\)]+\([^\-\–\—\n\(\)]+ [\-\–\—] ([^\,\n\(\)]+(?:\([^\(\)\n]+\)\|[^\(\)\]]+\]\][^\,\n\(\)]*)?),)/ig,
						replace: '$1 $3$2'
					}, {
						name: 'morte_data',
						find: /(\{\{Info\/[^╣]*\| *morte_data *=) *(\r?\n[^╚]+╚[^╝\(\)]+\([^\-\–\—\(\)\n]+ [\-\–\—] (?:[^\,\n\(\)]+(?:\([^\(\)\n]+\)\|[^\(\)\]]+\]\][^\,\n\(\)]*)?, )?([^\(\)\n]+)\))/ig,
						replace: '$1 $3$2'
					}, {
						name: 'Profissão',
						find: /(\{\{Info\/[^╣]*\| *ocupação *=) *(\r?\n[^╚]+╚[^╝\)]+\) é (?:uma?)? (\[\[[^\[\]\n]+\]\]))/ig,
						replace: '$1 $3$2'
					}, {
						name: '{{morte}}',
						find: /(\{\{Info\/[^╣]*\| *morte_data *= *)\[\[([1-3]?[0-9]) de ([^\[\]\n]+)\]\] de \[\[([0-9]{3,4})\]\]\r?\n/ig,
						replace: '$1{{morte|$2||$4}}\n',
						sub: [{
							name: '{{morte}} ano',
							find: /(\{\{Info\/[^╣]*\| *morte_data *= *)\[\[([0-9]{3,4})\]\]\r?\n/ig,
							replace: '$1{{morte|||$2}}\n'
						}]
					}, {
						name: '{{nascimento}}',
						find: /(\{\{Info\/[^╣]*\| *nascimento_data *= *)\[\[([1-3]?[0-9]) de ([^\[\]\n]+)\]\] de \[\[([0-9]{3,4})\]\]\r?\n/ig,
						replace: '$1{{dni|$2||$4}}\n',
						sub: [{
							name: '{{nascimento}} ano',
							find: /(\{\{Info\/[^╣]*\| *nascimento_data *= *)\[\[([0-9]{3,4})\]\]\r?\n/ig,
							replace: '$1{{dni|||$2}}\n'
						}]
					}, {
						name: '{{morte}} com nasc',
						find: /(\| *nascimento_data *= *\{\{(?:nascimento|dni)(\|[0-9]*\|[0-9]*\|[0-9]*)[\|\}][^\r\n]*(?:si|sem idade)?\}\r?\n[^╣]*\| *morte_data *= *\{\{morte\|[0-9]*\|[0-9]*\|[0-9]*)\}\}/ig,
						replace: '$1$2}}',
						sub: [{
							name: 'morte sem si',
							find: /(\{\{morte[^\r\n]+)\|(?:si|sem idade)/ig,
							replace: '$1'
						}]
					}, {
						name: '{{dni}} com morte',
						find: /(\{\{dni[^\r\n]+)\}\}/ig,
						replace: '$1|si}}',
						ifhas: /\| *morte_data *= *[^ \r\n╔]/i,
						ifnot: /\{\{dni[^\r\n]+\|(?:si|sem idade)/i
					}, {
						name: 'nacionalidade',
						ifhas: /nacionalidade *= */i,
						sub: [{
							name: '{{BRAn}}',
							find: /(nacionalidade *= *)\[?\[?(?:brasil|brasileiro|\{\{BRA\}\}|\{\{BRAb\}\})\]?\]?\r?\n/ig,
							replace: '$1{{BRAn}}\n'
						}]
					}]
				}, {
					name: '-links data na infobox',
					ifhas: '{{Info/',
					sub: [{
						name: 'Rule',
						find: /(\| *mandatos?[1-3]? *=.*)\[\[([0-9]+ de [^ \|\]]+)\]\]( de \[\[[0-9]{4,4}\]\])/ig,
						replace: '$1$2$3',
						num: 3
					}, {
						name: 'Info/Futebolista',
						find: /(\{\{Info\/(?:Futebolista|Treinador)[^╣]*\n *\| *(?:jovemanos|ano|anoselecao|(?:pc|t|nt)update) *=.*)\[\[([0-9]{1,2} de ((?:jan|fever)eiro|março|abril|maio|ju[nl]ho|agosto|(?:setem|outu|novem|dezem)bro)|[1-2][0-9]{3,3})\]\]/ig,
						replace: '$1$2',
						num: 100
					}, {
						name: 'Info/Tenista',
						find: /(\{\{Info\/Tenista[^╣]*\n *\| *(?:melhorrankingsimples|melhorrankingduplas|tennishofano|atualizado) *=.*)\[\[([0-9]{1,2} de ((?:jan|fever)eiro|março|abril|maio|ju[nl]ho|agosto|(?:setem|outu|novem|dezem)bro)|[1-2][0-9]{3,3})\]\]/ig,
						replace: '$1$2',
						num: 100
					}]
				}]
			}, {
				name: 'Assunto em multitag',
				ifhas: '{{Multitag', // FIXME: /\{\{Multitag/i ?
				sub: [{
					name: 'marcando biografia',
					find: /\|biografia\= */g,
					replace: '├'
				}, {
					name: 'inserindo biografia',
					find: /\{\{(Multitag[^├\n]*)(\| *data *=[^├\n]*\}\})/ig,
					replace: '{{$1├sim$2'
				}, {
					name: 'desmarcando biografia',
					find: /├/g,
					replace: '|biografia='
				}]
			}, {
				name: 'Parte cen',
				sub: [{
					name: '-links data',
					sub: [{
						name: 'em listas de trabalhos e prêmios',
						find: /(║==+ *(?:Filmografia|Prêmios|Livros|Obras).*==+[^║░]+)\[\[([1-2][0-9]{3,3})\]\]/ig,
						replace: '$1$2',
						num: 100
					}]
				}]
			}]
		}, {
			name: 'Arte',
			ifhas: /\{\{Portal3.*\|(Arte|Animangá|Banda desenhada|Cinema|Games|Livros|Literatura|Música|Pintura|Televisão)/i,
			sub: [{
				name: 'Criando lista',
				sub: [{
					name: 'Elenco',
					find: /(║== Elenco ==[^║]*\n)([^\*\n]* \.\.\. )/ig,
					replace: '$1* $2',
					num: 100
				}, {
					name: 'Prêmios e indicações',
					sub: [{
						name: 'Rule',
						find: /(║== Prêmios e indicações ==\r?\n)(\[\[[^\[\]\n]+\]\])(?:\r?\n)+([^\r\n])/ig,
						replace: '$1; $2\n$3'
					}, {
						name: 'Rule',
						find: /(║== Prêmios e indicações ==[^║]*\n; \[.*(?:\r?\n)+)(\[?\[?[0-9]{4,4})/ig,
						replace: '$1* $2'
					}, {
						name: 'Rule',
						find: /(\n\* [0-9]{4,4}.*)(?:\r?\n)+([0-9]{4,4})/ig,
						replace: '$1\n* $2',
						num: 10
					}]
				}, {
					name: 'Trm v- lista',
					find: /(\n\*.*)(?:\r?\n){2,}(\*)/ig,
					replace: '$1\n$2',
					num: 100
				}]
			}, {
				name: 'Cinema',
				ifhas: /\{\{Portal3.*\|Cinema[ \|\}]/i,
				sub: [{
					enabled: false,
					name: 'Info espaço =',
					ifhas: /\{\{Info\/Filme/i,
					sub: [{
						name: '1',
						find: /(\| *(código\-IMDB)) *=\n$1 =/ig,
						replace: '$1 ='
					}, {
						name: '3',
						find: /(\| *título\-(pt|br)) *=/ig,
						replace: '$1   ='
					}, {
						name: '5',
						find: /(\| *(duração|direção|roteiro)) *=/ig,
						replace: '$1     ='
					}, {
						name: '6',
						find: /(\| *(título|imagem|idioma|género|elenco|cor\-pb)) *=/ig,
						replace: '$1      ='
					}, {
						name: '8',
						find: /(\| *(país|tipo)) *=/ig,
						replace: '$1        ='
					}, {
						name: '9',
						find: /(\| *(ano|país)) *=/ig,
						replace: '$1         ='
					}]
				}, {
					name: 'espaço elenco',
					find: /\]\]\.{4} /g,
					replace: ']] .... '
				}]
			}, {
				name: 'Anime',
				ifhas: /\{\{Portal3.*\|Animangá[ \|\}]/i,
				sub: [{
					name: 'Sem episódios',
					find: /╩/ig,
					replace: '╩\n\n== Episódios ==\n{{Anime/Manutenção|episódios=n}}',
					ifhas: /(\{\{Info\/Animangá|\{\{Sem infocaixa\|Animangá)/i,
					ifnot: /(== Episódios ==|Lista de episódios)/i
				}, {
					name: 'uma série ([[)?anime',
					find: / uma série (\[\[)?anime/ig,
					replace: ' um $1anime'
				}, {
					name: '[[mangá|manga]]',
					find: /\[\[mangá\|manga\]\]/g,
					replace: '[[mangá]]'
				}, {
					name: 'séries de mang[aá]s',
					find: / séries de mang[aá]s/ig,
					replace: ' mangás'
				}, {
					name: 'Categoria:Mangás de ANO',
					find: /(\{\{Info\/Animangá\/Mangá[^{}]+\| *data_inicio *= *.*([0-9]{4,4})[^░]+)(\n\[\[Categoria)/ig,
					replace: '$1\n[[Categoria:Mangás de $2]]$3',
					ifnot: /Categoria:Mangás de [0-9]{4,4}/i
				}, {
					name: 'Categoria:Animes de ANO',
					find: /(\{\{Info\/Animangá\/Anime[^{}]+\| *data_inicio *= *.*([0-9]{4,4})[^░]+)(\n\[\[Categoria)/ig,
					replace: '$1\n[[Categoria:Animes de $2]]$3',
					ifnot: /Categoria:Animes de [0-9]{4,4}/i
				}, {
					name: 'Maiusculite',
					sub: [{
						name: 'Rule',
						find: /\= Missões Completadas =/g,
						replace: '= Missões completadas ='
					}]
				}, {
					name: 'espaço campos info',
					ifhas: '{{Info/Personagem de Naruto', // FIXME: /\{\{Info/Personagem de Naruto/i ?
					sub: [{
						name: 'espaço para campo 1',
						find: /(\n *\| *[^=\n ]) {0,5}=([^╣]*╣)/ig,
						replace: '$1      =$2',
						num: 100
					}, {
						name: 'espaço para campo 2',
						find: /(\n *\| *[^=\n][^=\n ]) {0,4}=([^╣]*╣)/ig,
						replace: '$1     =$2',
						num: 100
					}, {
						name: 'espaço para campo 3',
						find: /(\n *\| *[^=\n ]{2,2}[^=\n ]) {0,3}=([^╣]*╣)/ig,
						replace: '$1    =$2',
						num: 100
					}, {
						name: 'espaço para campo 4',
						find: /(\n *\| *[^=\n ]{3,3}[^=\n ]) {0,2}=([^╣]*╣)/ig,
						replace: '$1   =$2',
						num: 100
					}, {
						name: 'espaço para campo 5',
						find: /(\n *\| *[^=\n ]{4,4}[^=\n ]) {0,1}=([^╣]*╣)/ig,
						replace: '$1  =$2',
						num: 100
					}, {
						name: 'espaço para campo 6',
						find: /(\n *\| *[^=\n ]{5,5}[^=\n ])=([^╣]*╣)/ig,
						replace: '$1 =$2',
						num: 100
					}, {
						name: 'espaço antes de =',
						find: /(\n *\| *[^=\n]*[^=\n ])=([^╣]*╣)/ig,
						replace: '$1 =$2',
						num: 100
					}, {
						name: 'espaço após =',
						find: /(\n *\| *[^=\n]*)=([^ \r\n][^╣]*╣)/ig,
						replace: '$1= $2',
						num: 100
					}]
				}]
			}, {
				name: 'Televisão',
				ifhas: /\{\{Portal3.*\|Televisão[ \|\}]/i,
				sub: [{
					name: 'Listas de episódios',
					ifhas: /\[\[Categoria:Listas de episódios[ \|\]]/i,
					sub: [{
						name: '{{Sem infobox}}',
						find: /╦/g,
						replace: '╦\n{{sem infocaixa}}',
						ifnot: /(\{\{Info|\{\{Sem infocaixa)/i
					}, {
						name: 'Televisão/Manutenção|episodelist',
						find: /╦/ig,
						replace: '╦\n{{Televisão/Manutenção|episodelist}}',
						ifnot: /\{\{episode list/i
					}]
				}]
			}, {
				name: 'Música',
				ifhas: /\{\{Portal3.*\|Música[ \|\}]/i,
				sub: [{
					name: 'Tags man',
					sub: [{
						name: 'Tema',
						find: /(\{\{(?:Sem-fontes-bpv)[^{}\n]+\| *música *= *)([\|\}])/ig,
						replace: '$1s$2'
					}]
				}, {
					name: '- link de data em listas',
					sub: [{
						name: 'Rule',
						find: /(║==+ *(?:Principais|Outros)? *(?:Álbu(?:m|ns)|Compacto|Compilaç(?:ão|ões)|Discografia|DVD|EP|Lançamento|Participaç(?:ão|ões)|Single|Split|Trilhas? sonora|Vídeo|Videografia|Videoclipe|Prêmios e nomeações|Histórico de lançamento).*==+[^║░]+)\[\[([0-3]?[0-9] de (?:(?:jan|fever)eiro|março|abril|maio|ju[nl]ho|agosto|(?:setem|outu|novem|dezem)bro)|[1-2][0-9]{3,3})\]\]/ig,
						replace: '$1$2',
						num: 100
					}]
				}, {
					name: 'Infobox',
					ifhas: '{{Info/', // FIXME: /\{\{Info//i ?
					sub: [{
						name: 'campos {{Info/Música/artista',
						ifhas: '{{Info/Música/artista', // FIXME: /\{\{Info/Música/artista/i ?
						sub: [{
							name: '|nascimento_cidade',
							find: /(\{\{Info\/Música\/artista[^╣]*\| *)origem( *=)/ig,
							replace: '$1nascimento_cidade  ='
						}, {
							name: '|nascimento_país',
							find: /(\{\{Info\/Música\/artista[^╣]*\| *)país( *=)/ig,
							replace: '$1nascimento_país    ='
						}, {
							name: '|nascimento_data',
							find: /(\{\{Info\/Música\/artista[^╣]*\| *)nascimento( *=)/ig,
							replace: '$1nascimento_data    ='
						}, {
							name: 'morte_data',
							find: /(\{\{Info\/Música\/artista[^╣]*\| *)falecimento( *=)/ig,
							replace: '$1morte_data         ='
						}, {
							name: 'morte_local',
							find: /(\{\{Info\/Música\/artista[^╣]*\| *morte_data( *= *)\{\{[^{}\n]+\}\})(?:<br \/>)?(.+)\r?\n/ig,
							replace: '$1\n |morte_local        =$3'
						}, {
							name: '- link de data',
							find: /(\{\{Info\/Música\/artista[^╣]*\n *\| *(?:gravadora|exintegrantes) *=.*)\[\[([0-9]{1,2} de ((?:jan|fever)eiro|março|abril|maio|ju[nl]ho|agosto|(?:setem|outu|novem|dezem)bro)|[1-2][0-9]{3,3})\]\]/ig,
							replace: '$1$2',
							num: 10
						}]
					}, {
						name: '- link de data em info',
						sub: [{
							name: 'Rule',
							find: /(\n *\| *(?:este|próximo|último) (?:álbum|single) *=.*)\[\[([1-2][0-9]{3,3})\]\]/g,
							replace: '$1$2'
						}]
					}, {
						name: 'Rule'
					}]
				}, {
					name: 'Desambig',
					sub: [{
						name: '[[teclado]]',
						find: /\[\[([Tt]eclado)\]\]/g,
						replace: '[[Teclado (instrumento musical)|$1]]',
						ifhas: '╣'
					}, {
						name: '[[bateria]]',
						find: /\[\[([Bb]ateria)\]\]/g,
						replace: '[[Bateria (instrumento musical)|$1]]'
					}, {
						name: '|genero=',
						ifhas: /g[êé]nero *= *[^ \r\n]/i,
						sub: [{
							name: '[[Música pop]]',
							find: /(\| *g[êé]nero *=.*)\[\[(Pop)\]\](?:\{\{Dn\}\})?/ig,
							replace: '$1[[Música pop|$2]]',
							num: 10
						}]
					}]
				}]
			}, {
				name: 'Games',
				ifhas: /(\{\{Portal3.*\|(Games)[\|\}])/i,
				sub: [{
					name: '- link de data em listas',
					find: /(║==+ *(?:Principais|Outr[ao]s)? *(?:Versões).*==+[^║░]+)\[\[([0-3]?[0-9] de (?:(?:jan|fever)eiro|março|abril|maio|ju[nl]ho|agosto|(?:setem|outu|novem|dezem)bro)|[1-2][0-9]{3,3})\]\]/ig,
					replace: '$1$2',
					num: 100
				}]
			}]
		}, {
			name: 'Assentamento',
			ifhas: /(\{\{Info\/(Assentamento|Município)|\{\{sem infocaixa\|assentamento)/i,
			sub: [{
				name: 'Brasil',
				ifhas: /\{\{Portal3.*\|(Brasil|Tocantins|Sergirpe|São Paulo|Santa Catarina|Roraima|Rondônia|Rio Grande do Sul|Rio Grande do Norte|Rio de Janeiro|Piauí|Pernambuco|Paraná|Paraíba|Pará|Minas Gerais|Mato Grosso do Sul|Mato Grosso|Maranhão|Goiás|Espírito Santo|Ceará|Bahia|Amazonas|Amapá|Alagoas|Acre)/i,
				sub: [{
					name: '+Info/Assentamento/Brasil',
					find: /(\{\{sem infocaixa\|Assentamento)(\}\}\r?\n[^╠╚]*)(╠[^▒\n]+▒\]\])?([^╚]*╚)/ig,
					replace: '$1|parcial$2{{Info/Assentamento/Brasil\n' + '|bai\n' + '|nome           = %%title%%\n' + '|outro_nome     =\n' + '|imagem         = $3\n' + '|imagem_legenda =\n' + '|mapa_imagem    =\n' + '|mapa_legenda   =\n' + '|mapa_alfinete  =\n' + '|latd= |latm= |lats= |latNS=N |longd= |longm= |longs= |longEW=E\n' + '|unidade federativa =\n' + '|município          =\n' + '|zona               =\n' + '|bairro             =\n' + '|governador  =\n' + '|prefeito    =\n' + '|fundação    =\n' + '|área_total_km2   =\n' + '|elevação_m       =\n' + '|elevação_max_m   =\n' + '|população_total  =\n' + '|população_urbana =\n' + '|população_em     =\n' + '|população_notas  =\n' + '|código_postal =\n' + '|código_área   =\n' + '|site       =\n' + '|site_nome  =\n' + '|site_nogov =\n' + '|site_nobel =\n' + '╣}}\n$4╚',
					ifhas: /\{\{Portal3.*\|Brasil/i,
					ifnot: /\{\{Info\//i
				}, {
					name: '{{Info/Assentamento/Brasil}}',
					ifhas: /\{\{Info\/Assentamento\/Brasil/i,
					sub: [{
						name: 'ajuste nome',
						find: /(\{\{Info\/Assentamento\/Brasil[^╣]*\|nome *= *[^\(\n]*) \([^\n]*\n/ig,
						replace: '$1\n'
					}, {
						name: '+município',
						find: /(\{\{Info\/Assentamento\/Brasil[^╣]*\| *município *= *)([\r\n][^░]*\[\[Categoria:Bairros (?:extintos|não oficiais)? ?de ([^\|\]]*)[\|\]])/ig,
						replace: '$1[[$3]]$2'
					}, {
						name: '+estado',
						find: /(\{\{Info\/Assentamento\/Brasil[^╣]*\| *unidade federativa *= *)(\r?\n\| *município *= *\[\[([^\]\n]*)\]\](?:[^░]*(?:\3\]?\]?, (?:\[?\[?capital\]?\]? do )?(?:\[\[estado \(subdivisão\)\|estado\]\]|\[?\[?estado\]?\]?) (?:\[?\[?brasil\]?\]?eiro )?(?:d[eo]|em|no)? ?\[\[([^\]\n]*)\]\][^a-z]|, localizado na cidade de \[?\[?\3\]?\]?\-\[\[([^\[\]\.\n]+)\]\]).*╝))/ig,
						replace: '$1[[$4$5]]$2'
					}, {
						name: '+estado individual',
						ifhas: /(\{\{Info\/Assentamento\/Brasil[^╣]*\| *unidade federativa *= *)\r?\n/i,
						sub: [{
							name: 'Rio Grande do Norte',
							find: /(\{\{Info\/Assentamento\/Brasil[^╣]*\| *unidade federativa *= *)\r?\n/ig,
							replace: '$1[[Rio Grande do Norte]]\n',
							ifhas: /\{\{esboço\-rn\}\}/i
						}]
					}, {
						name: '+zona',
						find: /(\{\{Info\/Assentamento\/Brasil[^╣]*\| *município *= *\[\[([^\]\n]*)\]\]\r?\n[^╣]*\| *zona *= )([\r\n][^░]*(?:[\[\|]?Zona (Sul)\]?\]? da \[?\[?cidade\]?\]? de \[\[\2|Pertence à Região (Sul) de \[?\[?\2|(?:(?:Está )?localizado|Surgiu[^\.\n]*) (?:à|em|na) \[?\[?zona (sul|norte|leste|oeste))[^╝╩]*[╝╩])/ig,
						replace: '$1$4$5$6$3'
					}, {
						name: '+área_total_km2',
						find: /(\{\{Info\/Assentamento\/Brasil[^╣]*\| *município *= *\[\[([^\]\n]*)\]\]\r?\n[^╣]*\| *área_total_km2 *= )([\r\n][^░]*O \[\[bairro\]\] tem um território de ([0-9\.,])+&nbsp;km²\.)/ig,
						replace: '$1$4$3'
					}, {
						name: '+população_total',
						find: /(\{\{Info\/Assentamento\/Brasil[^╣]*\| *município *= *\[\[([^\]\n]*)\]\]\r?\n[^╣]*\| *população_total *= )([\r?\n][^╣]*\| *população_em *= )([\r\n][^░]*(?:Em \[\[([1-9][0-9]{3,3})\]\], possuía ([0-9]+) \[?\[?habitante\]?\]?s[,\.].*╝|[^░]*\n\* *(?:Total da )?População \(([1-2][0-9]{3,3})\): ([0-9\.]+)[\r\n]|O bairro possui [^\.\n]* ([0-9\.]+) moradores))/ig,
						replace: '$1$6$8$3$5$7$4'
					}, {
						name: '+fundação',
						find: /(\{\{Info\/Assentamento\/Brasil[^╣]*\| *município *= *\[\[([^\]\n]*)\]\]\r?\n[^╣]*\| *fundação *= )([\r\n][^░]*Surgiu (?:a partir da divisão do bairro [^\.\n]* )?em \[?\[?([1-2][0-9]{3,3}).*╝)/ig,
						replace: '$1$4$3'
					}, {
						name: 'ajuste pontuacao com decim',
						sub: [{
							name: 'ponto ponto',
							find: /(\{\{Info\/Assentamento\/Brasil[^╣]*\| *\| *(?:área_total_km2) *)([0-9]+)\.([0-9]{3,3})\.([0-9]{3,3})/ig,
							replace: '$1$2$3.$4'
						}, {
							name: 'ponto e virgula',
							find: /(\{\{Info\/Assentamento\/Brasil[^╣]*\| *\| *(?:área_total_km2) *)([0-9]+)\.([0-9]{3,3})\,([0-9]+)[\r\n]/ig,
							replace: '$1$2$3.$4\n'
						}, {
							name: 'só virgula',
							find: /(\{\{Info\/Assentamento\/Brasil[^╣]*\| *\| *(?:área_total_km2) *)([0-9]+)\,([0-9]+)[\r\n]/ig,
							replace: '$1$2.$3\n'
						}]
					}, {
						name: 'ajuste pontuacao sem decim',
						find: /(\{\{Info\/Assentamento\/Brasil[^╣]*\| *(?:população_total) *= *[0-9]+)\./ig,
						replace: '$1',
						num: 10
					}, {
						name: '+Portal3 Estado',
						find: /(\{\{Info\/Assentamento\/Brasil[^╣]*\| *unidade federativa *= *\[\[([^\[\]\n]+)\]\][\r\n][^░]*\{\{Portal3\|)Brasil(\}\})/ig,
						replace: '$1$2$3',
						ifnot: /\{\{Portal3.*\|(Tocantins|Sergirpe|São Paulo|Santa Catarina|Roraima|Rondônia|Rio Grande do Sul|Rio Grande do Norte|Rio de Janeiro|Piauí|Pernambuco|Paraná|Paraíba|Pará|Minas Gerais|Mato Grosso do Sul|Mato Grosso|Maranhão|Goiás|Espírito Santo|Ceará|Bahia|Amazonas|Amapá|Alagoas|Acre)[\|}]/i
					}, {
						name: '+coord',
						find: /(\{\{geocoordenadas\|([0-9]+)_([0-9]+)_([0-9]+)_([NS])_([0-9]+)_([0-9]+)_([0-9]+)_([EW])\|[^\|\n]*\}\}\r?\n)(\{\{Info\/Assentamento\/Brasil[^╣]+\|latd=)( \|latm=)( \|lats=)( \|latNS=)N?( \|longd=)( \|longm=)( \|longs=)( \|longEW=)E?([\r\n])/ig,
						replace: '$10$2$11$3$12$4$13$5$14$6$15$7$16$8$17$9$18'
					}]
				}, {
					name: 'Padronizando introd',
					sub: [{
						name: '\'\'\'xxx\'\'\' é um [[bairro]]',
						find: /(╚O? ?'''[^\'\n]*''' é um )bairro/ig,
						replace: '$1[[bairro]]'
					}, {
						name: '\'\'\'xxx\'\'\' é um [[bairro]] [[brasil]]eiro',
						find: /(╚'''[^\'\n]*''' é um \[\[bairro\]\] )/ig,
						replace: '$1[[brasil]]eiro ',
						ifnot: /╚'''[^\'\n]*''' é um \[\[bairro\]\] \[?\[?brasil\]?\]?eiro/i
					}, {
						name: 'xxx é ... cidade, estado',
						find: /(\{\{Info\/Assentamento\/Brasil[^╣]*\| *unidade federativa *= *(\[\[[^\]\n]*\]\])[^╚]*\| *município *= *\[\[([^\]\n]*)\]\][^╚]*╚'''[^\'\n]+''' é um \[\[bairro\]\] \[\[brasil\]\]eiro [^ \n]+ (?:em) \[\[\3\]\], )(com)/ig,
						replace: '$1$2, $4'
					}]
				}]
			}, {
				name: 'padr campo: assunto_característica',
				find: /(\n *\| *)(início|fim|data|link|leg|legenda|tamanho)_(foto|imagem|mapa|mesorregião|microrregião|pop|idh|pib|pib_per_capita|bandeira|brasão|hino|mandato)( *=)/ig,
				replace: '$1$3_$2$4'
			}, {
				name: 'url em link interno',
				find: /(\n *\| *(?:brasão|bandeira|hino)_link *= *)http:\/\/.*\r?\n/ig,
				replace: '$1\n',
				num: 10
			}]
		}, {
			name: 'Assentamento',
			ifhas: /\{\{Info\/(País)/,
			sub: [{
				name: 'Rule',
				find: /(╚.*(?:,|do) )estado( d)/ig,
				replace: '$1[[estado (subdivisão)|estado]]$2',
				ifhas: '{{Info/Assentamento',
				sub: [{
					name: 'Rule',
					find: /(╚.*\[\[estado \(subdivisão\)\|estado\]\][^╝]*)\[\[estado \(subdivisão\)\|(estado)\]\]/ig,
					replace: '$1$2'
				}]
			}, {
				name: '-link em Filhos ilustres',
				find: /\= *[^ \n]* ilustres *=+=\r?\n[^║]*\[\[([0-9]{1,2} de ((?:jan|fever)eiro|março|abril|maio|ju[nl]ho|agosto|(?:setem|outu|novem|dezem)bro)|[1-2][0-9]{3,3})\]\]/ig,
				replace: '',
				num: 10
			}]
		}, {
			name: 'Ciência',
			ifhas: /\{\{Portal3.*\|(Ciência|Saúde)/i,
			sub: [{
				name: 'Assunto em multitag',
				ifhas: /\{\{Multitag/i,
				sub: [{
					name: 'marcando ciência',
					find: /\|ciência\= */g,
					replace: '├'
				}, {
					name: 'inserindo ciência',
					find: /\{\{(Multitag[^├\n]*)(\| *data *=[^├\n]*\}\})/ig,
					replace: '{{$1├sim$2'
				}, {
					name: 'desmarcando ciência',
					find: /├/g,
					replace: '|ciência='
				}]
			}]
		}, {
			name: 'Sociedade',
			sub: [{
				name: 'Futebol',
				ifhas: /(\{\{Portal3.*\|(Futebol)[\|\}]|\{\{Info\/Futebolista)/i,
				sub: [{
					name: 'Info/Futebolista',
					ifhas: '{{Info/Futebolista', // FIXME: /\{\{Info/Futebolista/i ?
					sub: [{
						name: 'imagem',
						ifhas: /\| *imagem *= *╠/,
						sub: [{
							name: 'padronizando imagem',
							find: /(\n *\| *imagem *= *╠[^▒\n]*)\|(?:thumb|right|left)/ig,
							replace: '$1',
							num: 10
						}, {
							name: '-tamanho/legenda',
							find: /(\| *(imagem_tamanho|imagem_legenda)) *= *\r?\n/ig,
							replace: '',
							num: 5,
							ifhas: /(\n *\| *)imagem( *)=( *)╠/i
						}, {
							name: 'Imagem',
							find: /(\n *\| *)imagem( *)=( *)╠([^\|\n]*)(?:\|([0-9]*px))?(?:\|([^\|\n]+))?▒\]\]/g,
							replace: '$1imagem$2=$3$4$1imagem_tamanho$2=$3$5$1imagem_legenda$2=$3$6',
							num: 10
						}, {
							name: 'Imagem (tamanho)',
							find: /(\n *\| *imagem_tamanho *=) *\r?\n/ig,
							replace: '$1 200px\n',
							ifhas: /\n *\| *imagem *= *[^\[\r\n]/i,
							ifnot: /\n *\| *imagem_tamanho *= *[^ \r\n]/i
						}, {
							name: 'retirando <br /> do início do campo',
							find: /(\| *imagem_legenda *= *)<br \/>/ig,
							replace: '$1',
							num: 10
						}, {
							name: 'arrumando espaçamento',
							find: /(\| *(?:imagem_tamanho|imagem_legenda)) {13}= /ig,
							replace: '$1     = ',
							ifhas: /\| *nome {15}= /i
						}]
					}, {
						name: 'posição',
						ifhas: /\| *posição *= *[^ \r\n]/i,
						sub: [{
							name: 'Padronização do nome das posições',
							sub: [{
								name: 'Atacante',
								find: /(\| *posição *= *)(?:\[\[)?[Cc]entroavante(?:\]\])?([^\]][^\(a-z])/g,
								replace: '$1[[Atacante (futebol)|atacante]]$2'
							}, {
								name: 'Meia',
								find: /(\| *posição *= *)(?:\[\[)?(?:[Mm]eio\-de\-[Cc]ampo|[Mm]eio\-[Cc]ampista|[Mm]édio)(?:\]\])?([^\]][^\(a-z])/g,
								replace: '$1[[Meia (futebol)|meio-de-campo]]$2'
							}, {
								name: 'Zagueiro',
								find: /(\| *posição *= *)(?:\[\[)?[Dd]efe(?:nsor|sa)(?: central)?(?:\]\])?([^\]][^\(a-z])/g,
								replace: '$1[[zagueiro]]$2'
							}]
						}, {
							name: 'Incluir link',
							sub: [{
								name: 'Generico',
								find: /(\| *posição *= *)([^ \[][^\n]*)\r?\n/g,
								replace: '$1[[$2]]\n'
							}, {
								name: 'Guarda-redes',
								find: /(\| *posição *= *)[Gg]uarda\-redes([ \]\r?\n])/g,
								replace: '$1[[goleiro|guarda-redes]]$2'
							}, {
								name: 'Zagueiro',
								find: /(\| *posição *= *)(?:\[\[)?[Zz]agueiro(?:\]\])?([ \]\r?\n])/g,
								replace: '$1[[zagueiro]]$2'
							}, {
								name: 'Volante',
								find: /(\| *posição *= *)(?:\[\[)?[Vv]olante(?:\]\])?([ \]\r?\n][^\(])/g,
								replace: '$1[[Volante (futebol)|volante]]$2'
							}, {
								name: 'Ala',
								find: /(\| *posição *= *)(?:\[\[)?[Aa]la( [a-zA-Z]*)?(?:\]\])?([ \]\r?\n][^\(])/g,
								replace: '$1[[Ala (futebol)|ala$2]]$3'
							}, {
								name: 'Lateral',
								find: /(\| *posição *= *)(?:\[\[)?[Ll]ateral(\-*[a-zA-Z]*)?(?:\]\])?([ \]\r?\n][^\(])/g,
								replace: '$1[[Lateral (futebol)|lateral$2]]$3'
							}, {
								name: 'Meia',
								find: /(\| *posição *= *)(?:\[\[)?[Mm]eia(?:\]\])?([ \]\r?\n][^\(])/g,
								replace: '$1[[Meia (futebol)|meia]]$2'
							}, {
								name: 'Atacante',
								find: /(\| *posição *= *)(?:\[\[)?[Aa]tacante(?:\]\])? *([ \]\r?\n][^\(])/g,
								replace: '$1[[Atacante (futebol)|atacante]]$2'
							}, {
								name: 'Líbero',
								find: /(\| *posição *= *)(?:\[\[)?[Ll]íbero(?:\]\])?([ \]\r?\n][^\(])/g,
								replace: '$1[[Líbero (futebol)|líbero]]$2'
							}]
						}, {
							name: 'aposentado',
							find: /(\| *posição *= *\[\[[^\[\]\n]+) (\(\'*aposentado\'*\))\]\]/ig,
							replace: '$1]] $2'
						}]
					}, {
						name: 'cidadenatal',
						find: /(\| *cidadenatal *= *)([^ \[\]\r\n][^\[\]\r\n]+)\r?\n/ig,
						replace: '$1[[$2]]\n'
					}, {
						name: 'paísnatal',
						sub: [{
							name: 'iconebandeira em paisnatal',
							find: /(\| *paisnatal *= *)(?:\[\[)?([^ {}\[\]\r\n][^{}\[\]\r\n]*)(?:\]\])?\r?\n/g,
							replace: '$1{{$2}}\n'
						}, {
							name: '{{BRAb}} -> {{BRA}} em paisnatal',
							find: /(\| *paisnatal *= *)\{\{([A-Z]+)b\}\}\r?\n/g,
							replace: '$1{{$2}}\n'
						}]
					}, {
						name: 'pé',
						ifhas: /\| *pé *= *[^ \r\n]/,
						sub: [{
							name: 'direito -> destro',
							find: /( \| *pé *= *)(?:\[\[)?[Dd]ireito(?:\]\])?\r?\n/g,
							replace: '$1[[destro]]\n'
						}, {
							name: 'esquerdo -> canhoto',
							find: /( \| *pé *= *)(?:\[\[)?[Ee]squerdo(?:\]\])?\r?\n/g,
							replace: '$1[[canhoto]]\n'
						}, {
							name: 'colchetes no pé',
							find: /( \| *pé *= *)([^\[\n]*)\r?\n/g,
							replace: '$1[[$2]]\n'
						}]
					}, {
						name: '{{Seta fut}}',
						find: /\[\[Empréstimo \(futebol\)\|→\]\]/g,
						replace: '{{Seta fut}}',
						num: 100
					}, {
						name: '{{Seta fut}}',
						find: /→/g,
						replace: '{{Seta fut}}',
						num: 100
					}, {
						name: '{{emp fut}}',
						find: /\[\[Empréstimo \(futebol\)\|\(E\)\]\]/ig,
						replace: '{{emp fut}}',
						num: 10
					}, {
						name: '{{emp fut}}',
						find: /\(E\)/g,
						replace: '{{emp fut}}',
						num: 100
					}]
				}, {
					name: 'Introdução',
					ifhas: '╚',
					sub: [{
						name: 'mais conhecido como',
						find: /(╚[^╝]*conhecido )(?:no mundo de futebol|apenas) (?:como|por) /g,
						replace: '$1como '
					}, {
						name: 'conhecido antes de nascido',
						find: /(╚[^╝]*''') (\([^\(\)\n]*\)).*(, mais conhecido como[^\,\n]*)\,/g,
						replace: '$1$3 $2,'
					}, {
						name: 'nascido em',
						find: /(╚[^╝]*\()nascido em /ig,
						replace: '$1'
					}, {
						name: 'cidade natal',
						find: /(\| *cidadenatal *= *([^\r\n]+)\r?\n[^╚]+╚[^╝]+)\((\[\[[0-9])/g,
						replace: '$1($2, $3',
						ifhas: /\| *cidadenatal *= *[^\r\n ]/i,
						ifnot: /╚[^╝]*\(\[\[[^0-9]/i
					}, {
						name: 'jogador de futebol',
						find: /(╚[^╝]*)jogador de futebol/g,
						replace: '$1futebolista'
					}, {
						name: 'que atua',
						find: /(╚[^╝]*)que joga(va)? /g,
						replace: '$1que atua$2 '
					}, {
						name: 'atuava como',
						find: /(╚[^╝]*atua(?:va)?) na posição de /g,
						replace: '$1 como ',
						num: 10
					}, {
						name: 'joga pelo',
						find: /(╚[^╝]*)defende o /g,
						replace: '$1joga pelo '
					}, {
						name: 'Atualmente, joga pelo',
						find: /(╚[^╝]*futebolista[^\,\n]*\, que atua como [^\,\n]*) (no|pelo)/g,
						replace: '$1. Atualmente, joga pelo'
					}, {
						name: 'que atualmente joga como',
						find: /(╚[^╝]*)que atualmente joga como ([^╝]*) pelo (\[\[[^\]\n]*\]\])/g,
						replace: '$1que atua como $2. Atualmente, joga pelo $3'
					}, {
						name: 'colocando clube atual',
						find: /(\| *actualclube *= *(?:\{\{[A-Z]*b\}\})? *(\[\[[^\[\]\{\}\r\n]*\]\]))([^╝]*)(\.╝)/g,
						replace: '$1$3. Atualmente, joga pelo $2$4',
						ifhas: /\| *actualclube *= *[^\r\n]/i,
						ifnot: /╚[^╝]*Atualmente/i
					}, {
						name: 'link interno na introdução',
						ifhas: '╚',
						sub: [{
							name: '[[futebolista]] na introd',
							find: /(╚[^╝]*[^\[])futebolista([^\]])/g,
							replace: '$1[[futebolista]]$2'
						}, {
							name: '[[nacionalidade]] na introd',
							find: /(╚[^╝]*\[\[futebolista\]\]) ([^\[][^ \n\,]*), /g,
							replace: '$1 [[$2]], '
						}, {
							name: '[[posição]] na introdução',
							find: /(╚[^╝]*que atua(?:va)? como )([^\[\]\n\,\.]+)( do |\.\,)/g,
							replace: '$1[[$2]]$3'
						}]
					}, {
						name: 'retirando',
						sub: [{
							name: 'atua como [[posição]] do [[clube]]',
							find: /(╚[^╝]*atua como (?:\[\[[^\[\]\n]+\]\])) do \[\[[^\[\]\n]+\]\]/ig,
							replace: '$1'
						}]
					}]
				}, {
					name: 'Ligações internas',
					ifhas: /\[\[/i,
					sub: [{
						name: '[[guarda-redes]]',
						find: /\[\[([Gg])uarda\-redes\]\]/g,
						replace: '[[Goleiro|$1uarda-redes]]',
						num: 100
					}, {
						name: '[[volante]]',
						find: /\[\[([Vv])olante\]\]/g,
						replace: '[[$1olante (futebol)|$1olante]]',
						num: 100
					}, {
						name: '[[ala]]',
						find: /\[\[([Aa])la\]\]/g,
						replace: '[[$1la (futebol)|$1la]]',
						num: 100
					}, {
						name: '[[lateral]]',
						find: /\[\[([Ll])ateral\]\]/g,
						replace: '[[$1ateral (futebol)|$1ateral]]'
					}, {
						name: '[[atacante]]',
						find: /\[\[([Aa])tacante\]\]/g,
						replace: '[[$1tacante (futebol)|$1tacante]]',
						num: 100
					}, {
						name: '[[líbero]]',
						find: /\[\[([Ll])íbero\]\]/g,
						replace: '[[$1íbero (futebol)|$1íbero]]',
						num: 100
					}, {
						name: '[[futebol]]ista',
						find: /\[\[([Ff])utebol\]\]ista(s?[^a-z])/g,
						replace: '[[$1utebolista]]$2'
					}, {
						name: '-LI em {footballbox |data=',
						find: /(\{\{footballbox[^{}]*\| *data *=[^\|\n]*)\[\[([1-3]?[0-9] de ((?:jan|fever)eiro|março|abril|maio|ju[nl]ho|agosto|(?:setem|outu|novem|dezem)bro)|[1-2][0-9]{3,3})\]\]/ig,
						replace: '$1$2',
						num: 2
					}, {
						name: '- atualização',
						find: /(<small> *'* *Até )\[\[([1-3]?[0-9] de (?:(?:jan|fever)eiro|março|abril|maio|ju[nl]ho|agosto|(?:setem|outu|novem|dezem)bro))\]\] de \[\[([1-2][0-9]{3,3})\]\]/ig,
						replace: '$1$2 de $3',
						num: 10
					}]
				}, {
					name: '-atual',
					find: /\-(?:atual|atualmente|presente)([^a-z])/ig,
					replace: '–$1',
					num: 10
				}, {
					name: 'Seções',
					sub: [{
						name: '= Carreira internacional =',
						find: /\= Carreira Internacional =/g,
						replace: '= Carreira internacional ='
					}, {
						name: '= Títulos =',
						find: /\= Títulos e Honras =/g, // FIXME: /= Títulos e Honras =/gi ?
						replace: '= Títulos ='
					}, {
						name: 'Rule',
						find: /\= Classificação Final =/g,
						replace: '= Classificação final ='
					}]
				}, {
					enabled: false,
					name: 'Títulos',
					sub: [{
						name: '; Clube',
						find: /(= Títulos \=+[^║]*)║\={3,} (.*) \={3,}\r?\n/ig,
						replace: '$1; $2\n',
						num: 97
					}, {
						name: '[[Competição]]: Ano',
						find: /(= Títulos \=+[^║]*\* \[\[[^\[\]\n]*\]\]) \- /ig,
						replace: '$1: ',
						num: 100
					}]
				}, {
					// FIXME: Arrumar regras de |posição=, agora que temos regras de Ligações internas
					enabled: false,
					name: 'Melhorias'
				}]
			}]
		}]
	}, {
		name: 'Parte Sup 2',
		sub: [{
			name: 'Ajuste Infobox',
			ifhas: /\{\{Info\//i,
			sub: [{
				name: 'Ajuste em nome (xxx)',
				find: /(\{\{Info\/[^╣]*\| *nome *= [^\(\)\n]*)\([^\(\)\n]*\)\r?\n/ig,
				replace: '$1\n',
				ifhas: '╣'
			}, {
				name: 'Campos infobox',
				sub: [{
					name: 'imagem desmembrada',
					ifhas: /╣/i,
					sub: [{
						name: 'padronizando imagem',
						find: /(\n *\| *imagem *= *╠[^▒\n]*)\|(?:thumb|right|center|left|direita|centrp|esquerda)/ig,
						replace: '$1',
						num: 10
					}, {
						name: 'preenche os campos',
						find: /(\n *\| *)imagem( *)=( *)╠(?:Imagem?|File|Arquivo|Ficheiro):([^\|\n]*)(?:\|([0-9]*px))?(?:\|([^\|\n]+))?▒\]\]/ig,
						replace: '$1imagem$2=$3$4$1imagem_tamanho$2=$3$5$1imagem_legenda$2=$3$6'
					}, {
						name: 'espaçamento',
						find: /(\{\{Info\/[^╣]*\n *\| *imagem {8,8})( +)(= .*\r?\n *\| *imagem_tamanho) *(=.*\r?\n *\| *imagem_legenda) *(= )/ig,
						replace: '$1$2$3$2$4$2$5',
						ifhas: /\{\{Info\/[^╣]*\n *\| *imagem {9,}= /i
					}, {
						name: 'Rule',
						find: /\| *imagem_legenda *= *\r?\n *(\| *imagem_legenda *= *[^ \r\n])/ig,
						replace: '$1'
					}, {
						name: 'imagem_legenda tag',
						find: /(imagem_legenda *= *)<center>([^\n]+)<\/center>\r?\n/ig,
						replace: '$1$2\n'
					}, {
						name: '-tamanho',
						find: /(\r?\n *\| *imagem_legenda *=.*[^╣]*)\| *imagem_tamanho *= *\r?\n/ig,
						replace: '$1\n',
						num: 10,
						ifhas: /\r?\n *\| *imagem_tamanho *= *[^\r\n]/i
					}, {
						name: '-legenda',
						find: /(\r?\n *\| *imagem_legenda *=.*[^╣]*)\| *imagem_legenda *= *\r?\n/ig,
						replace: '$1\n',
						num: 10
					}, {
						name: 'Rule',
						find: /\r?\n *\| *imagem_legenda *= *\r?(\n[^╣]*\| *imagem_legenda *= *[^ \r\n].*\r?\n)/ig,
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
		ifnot: /(<(blockquote|code|math|timeline|pre|poem|nowiki|quote|source)|\{\{(Citação|Quim))/i,
		sub: [{
			name: 'sequencia 1',
			find: /(\[\[[^\[\]\n▒]*\]\], )([^\[\] \n▒]+\]\])/g,
			replace: '$1[[$2'
		}, {
			name: 'sequencia 2',
			find: /(, \[\[[^\[\] \n▒]+)( \([0-9]{4,4}\),)/g,
			replace: '$1]]$2'
		}, {
			name: '[[Ano]] / [[Ano',
			find: /(\[\[[0-9]{4,4}\]\] *\/ *\[\[[0-9]{4,4})( *[^ \|\]])/g,
			replace: '$1]]$2'
		}, {
			name: '[[dia de mes]] de [[ano',
			find: /(\[\[[1-3]?[0-9] de [^\[\] \n]+\]\] de \[\[[0-9]{4,4})([^\]\|])/g,
			replace: '$1]]$2'
		}, {
			name: ']] de ano]]',
			find: /(\]\] de )([0-9]{4,4}\]\])/g,
			replace: '$1[[$2]]'
		}]
	}]
}, {
	// Regras específicas para outros domínios sem ser o principal
	// Ainda em teste
	enabled: false,
	name: 'Outros domínios',
	sub: [{
		enabled: false,
		name: 'Desambiguação',
		ifhas: /(\{\{desambiguação[\|}]|\[\[Categoria:Desambiguaç(ão|ões))/i,
		sub: [{
			name: 'Padronizando',
			sub: [{
				name: 'Rule',
				find: /\{\{desambig([\|}])/ig,
				replace: '{{desambiguação$1'
			}]
		}, {
			name: 'Marcando',
			sub: [{
				name: 'marca título',
				find: /▓/g,
				replace: '▓%%title%%╦\n',
				sub: [{
					name: 'retira (desambiguação) do título',
					find: / \(desambiguação\)╦/g,
					replace: '╦'
				}]
			}]
		}, {
			name: '+ {{desambiguação}}',
			find: /╦/ig,
			replace: '╦\n{{Desambiguação}}',
			ifhas: /\[\[Categoria:Desambiguaç(ão|ões)/i,
			ifnot: /\{\{desambiguação.*\}\}/i
		}, {
			name: '+Cat',
			find: /░/g,
			replace: '[[Categoria:Desambiguação]]\n░',
			ifhas: '{{desambiguação', // FIXME: /\{\{desambiguação/i ?
			ifnot: '[[Categoria:Desambiguaç' // FIXME: /[[Categoria:Desambiguaç/i ?
		}, {
			name: 'Recat',
			ifhas: /\[\[Categoria:Desambiguação([\]\|])/i,
			sub: [{
				name: 'recat siglas',
				find: /\[\[Categoria:Desambiguação([\]\|])/ig,
				replace: '[[Categoria:Desambiguações de siglas$1',
				ifhas: /▓[A-Z][^a-z╦]+╦/
			}]
		}, {
			name: 'Geral',
			sub: [{
				name: 'quebra de linha',
				find: /(\r?\n){3,}/ig,
				replace: '\n\n',
				num: 100
			}, {
				name: '{{TOC}}',
				find: /\{\{TOC\}\}\r?\n/ig,
				replace: '',
				ifnot: /\n==/i
			}, {
				name: 'espaço no início',
				find: /\n +([^ ])/ig,
				replace: '\n$1',
				num: 100
			}, {
				name: 'espaço no final',
				find: /([^ ]) +\r?\n/ig,
				replace: '$1\n'
			}]
		}, {
			name: 'Rule',
			find: /\n#([^#])/g,
			replace: '\n*$1'
		}, {
			name: 'quebra após {{desambiguação}}',
			find: /(\{\{desambiguação\}\})\r?\n([^\r\n])/ig,
			replace: '$1\n\n$2'
		}, {
			name: 'Rule',
			find: /([^\]\r\n])\r?\n\[\[Categoria:/ig,
			replace: '$1\n\n[[Categoria:'
		}, {
			name: 'introdução',
			sub: [{
				name: 'Negrito do termo',
				find: /(▓([^\n╦]+)╦[^░]*\{\{desambiguação\}\}\r?\n\r?\n(?:.* )?)\2 /ig,
				replace: '$1\'\'\'$2\'\'\' ',
				ifnot: /\{\{desambiguação\}\}\r?\n\r?\n[^\*\n]*'''/i
			}, {
				name: 'Ao procurar',
				find: /\n'*(?:Ao procurar por|Pela sigla) '*([^'\n]+)'*,? (?:você )?pode estar à procura de:?'*\r?\n/ig,
				replace: '\n\'\'\'$1\'\'\' pode referir-se a:\n'
			}, {
				name: 'Texto antes da ocorrência do termo',
				find: /\n(?:O termo|A palavra|Por) ('''[^'\n]+''')/g,
				replace: '\n$1'
			}, {
				name: 'é um [[acrónimo',
				find: /''' é um (\[\[)?acrónimo(\]\])? (para|que pode significar):\r?\n/ig,
				replace: '\'\'\' pode referir-se a:\n'
			}, {
				name: 'pode referir-se a',
				find: /'',?(?: também)? (?:pode|possui)(m)? (?:definir|se referir|referir\-se|remeter|ser|ser uma sigla|significar|estar a referir-se|ser|ter diversos significados|ter os seguintes significados) *(às diferentes entradas|aos seguintes artigos)?( [dn]a Wikip[eé]dia)?( ao?|para)?:?\r?\n/ig,
				replace: '\'\' pode$1 referir-se a:\n',
				sub: [{
					name: 'sigla',
					find: /\nA sigla (''+[^\'\n\[\]]+''+ pode referir-se a:)/ig,
					replace: '\n$1'
				}]
			}, {
				name: 'criando introdução',
				find: /\{\{desambiguação\}\}((?:\r?\n)*(?:[=;]|\* *\[\[))/ig,
				replace: '{{desambiguação|%%title%%}}$1',
				sub: [{
					name: '- (desambiguação)',
					find: /(\{\{desambiguação\|[^{}]*) \(desambiguação\)\}\}/ig,
					/* FIXME: Singleline */
					replace: '$1}}'
				}]
			}, {
				name: '- (desambiguação)',
				find: / \(desambiguação\)''' pode referir-se a:/g,
				replace: '\'\'\' pode referir-se a:'
			}, {
				name: 'inserindo termo na {{desambiguação}}',
				sub: [{
					name: 'inserindo termo na {{desambiguação}} 1',
					find: /\{\{desambiguação\}\}\r?\n\r?\n''+([^\'\n]+)''+ pode referir-se a:\r?\n/ig,
					replace: '{{Desambiguação|$1}}\n\n'
				}, {
					name: 'inserindo termo na {{desambiguação}} 2',
					find: /\{\{desambiguação\}\}\r?\n\r?\n''+([^\'\n]+)''+ (?:e|ou) ''+([^\'\n]+)''+ podem referir-se a:\r?\n/ig,
					replace: '{{desambiguação|$1|$2}}\n\n'
				}, {
					name: 'inserindo termo na {{desambiguação}} 3',
					find: /\{\{desambiguação\}\}\r?\n\r?\n''+([^\'\n]+)''+, ''+([^\'\n]+)''+ (?:e|ou) ''+([^\'\n]+)''+ podem? referir-se a:\r?\n/ig,
					replace: '{{desambiguação|$1|$2|$3}}\n\n'
				}, {
					name: 'inserindo termo na {{desambiguação}} 4',
					find: /\{\{desambiguação\}\}\r?\n\r?\n''+([^\'\n]+)''+, ''+([^\'\n]+)''+, ''+([^\'\n]+)''+ (?:e|ou) ''+([^\'\n]+)''+ podem? referir-se a:\r?\n/ig,
					replace: '{{desambiguação|$1|$2|$3|$4}}\n\n'
				}]
			}, {
				name: 'Rule',
				find: /\n\r?\n\r?\n/ig,
				replace: '\n\n'
			}]
		}, {
			name: 'Entradas da lista',
			sub: [{
				name: 'tirando ponto final das entradas',
				find: /(\n\*[^\r\n]+[^\.:\;])[\.:\;\,]\r?\n/ig,
				replace: '$1\n',
				num: 10
			}, {
				name: '* Pode ser',
				find: /\n\* *Pode ser /ig,
				replace: '\n* '
			}, {
				name: '* um',
				find: /\n\* *(?:uma?|[ao]) /ig,
				replace: '\n* '
			}, {
				name: 'xxx é',
				find: /(\n\* *\[\[[^\[\]\n]+\]\]) é /ig,
				replace: '$1, '
			}, {
				name: 'xxx é',
				find: /(\]\]( - |, ))é /ig,
				replace: '$1'
			}, {
				name: '—',
				find: /—/g,
				replace: '-'
			}, {
				name: '* [[xxx]]:',
				find: /(\n\* *\[\[[^\[\]\n]*\]\]): /ig,
				replace: '$1, '
			}]
		}, {
			enabled: false,
			name: 'ligações internas (modo revisão)',
			sub: [{
				name: 'tirando link com pipeline',
				find: /(▓([^╦\n]+)╦\n[^▓]*\[\[[^\[\]\|\n]+)\|\2\]\]/ig,
				replace: '$1]]',
				num: 100
			}, {
				name: 'um link por entrada',
				find: /(\n\*[^\[\]\n]*\[\[[^\[\]\n]*\]\]\'*[^\[\]\'\n]*)\[\[(?:[^\[\]\|\n]+\|)?([^\[\]\|\n]*)\]\]/ig,
				replace: '$1$2',
				num: 10
			}, {
				name: 'pipeline no início da entrada',
				find: /(\* *\[\[[^\[\]\|\n]+)\|[^\[\]\|\n]+(\]\] *[,\-])/g,
				replace: '$1$2'
			}]
		}, {
			enabled: false,
			name: '; Termo 1 (modo revisão)',
			find: /\n\* *\'+([^\'\n]+)\'+\r?\n/ig,
			replace: '\n; $1\n'
		}, {
			name: 'termos impróprios',
			find: /(uma?) famos[ao] /ig,
			replace: '$1 '
		}, {
			name: 'manutenção de desambig',
			sub: [{
				name: 'Insere',
				find: /(\{\{desambiguação.*\}\})/ig,
				replace: '{{Manutenção de desambiguação|}}\n$1'
			}, {
				name: 'um termo',
				find: /\{\{Manutenção de desambiguação\|/ig,
				replace: '{{Manutenção de desambiguação|1|',
				ifhas: /▓[^\*░]*\n\*[^\*░]*░/i,
				ifnot: /\{\{Manutenção de desambiguação[^\{\}\n]*\|1[\|}]/i
			}, {
				name: 'dois termos',
				find: /\{\{Manutenção de desambiguação\|/ig,
				replace: '{{Manutenção de desambiguação|2|',
				ifhas: /▓[^\*░]*\n\*[^\*░]*\n\*[^\*░]*░/i,
				ifnot: /\{\{Manutenção de desambiguação[^\{\}\n]*\|2[\|}]/i
			}, {
				enabled: false,
				name: 'sem descrição',
				find: /\{\{Manutenção de desambiguação\|/ig,
				replace: '{{Manutenção de desambiguação|descrição|',
				ifhas: /\n\* *\'*\[\[[^\[\]\n]+\]\]\'*\r?\n/i,
				ifnot: /\{\{Manutenção de desambiguação[^\{\}\n]*\|(desc|descrição)[\|}]/i
			}, {
				enabled: false,
				name: 'pipelink (modo revisão)',
				find: /\{\{Manutenção de desambiguação\|/ig,
				replace: '{{Manutenção de desambiguação|pipe|',
				ifhas: /\n\* *'*\[\[[^\[\|\]\n]+\|/i,
				ifnot: /(\{\{Manutenção de desambiguação[^\{\}\n]*\|(pipe)[\|}]|Ver também)/i
			}, {
				enabled: false,
				name: 'sem link (modo revisão)',
				find: /\{\{Manutenção de desambiguação\|/ig,
				replace: '{{Manutenção de desambiguação|sem link|',
				ifhas: /\n\*[^\[\]\n]*\n/i,
				ifnot: /\{\{Manutenção de desambiguação[^\{\}\n]*\|(link|sem link)[\|}]/i
			}, {
				name: 'Remove',
				find: /\{\{Manutenção de desambiguação\|\}\}\r?\n/ig,
				replace: ''
			}, {
				name: 'Ajuste',
				find: /(\{\{Manutenção de desambiguação[^{}\n]*)\|\}\}/ig,
				replace: '$1}}'
			}]
		}, {
			name: 'Desmarcando',
			sub: [{
				name: 'Desmarca título',
				find: /▓[^╦]+╦\n/ig,
				replace: ''
			}]
		}]
	}, {
		enabled: false,
		name: 'Predefinição',
		sub: [{
			name: 'Minúscula para campos',
			ifhas: /\{\{\{[A-Z][a-z]/,
			sub: [{
				name: '{{{A',
				find: /([^{])\{\{\{A([a-z][^\|\{\}\n]+)\|?\}\}\}/g,
				replace: '$1{{{A$2|}}}{{{a$2|}}}'
			}, {
				name: '{{{B',
				find: /([^{])\{\{\{B([a-z][^\|\{\}\n]+)\|?\}\}\}/g,
				replace: '$1{{{B$2|}}}{{{b$2|}}}'
			}, {
				name: '{{{C',
				find: /([^{])\{\{\{C([a-z][^\|\{\}\n]+)\|?\}\}\}/g,
				replace: '$1{{{C$2|}}}{{{c$2|}}}'
			}, {
				name: '{{{D',
				find: /([^{])\{\{\{D([a-z][^\|\{\}\n]+)\|?\}\}\}/g,
				replace: '$1{{{D$2|}}}{{{d$2|}}}'
			}, {
				name: '{{{E',
				find: /([^{])\{\{\{E([a-z][^\|\{\}\n]+)\|?\}\}\}/g,
				replace: '$1{{{E$2|}}}{{{e$2|}}}'
			}, {
				name: '{{{F',
				find: /([^{])\{\{\{F([a-z][^\|\{\}\n]+)\|?\}\}\}/g,
				replace: '$1{{{F$2|}}}{{{f$2|}}}'
			}, {
				name: '{{{G',
				find: /([^{])\{\{\{G([a-z][^\|\{\}\n]+)\|?\}\}\}/g,
				replace: '$1{{{G$2|}}}{{{g$2|}}}'
			}, {
				name: '{{{H',
				find: /([^{])\{\{\{H([a-z][^\|\{\}\n]+)\|?\}\}\}/g,
				replace: '$1{{{H$2|}}}{{{h$2|}}}'
			}, {
				name: '{{{I',
				find: /([^{])\{\{\{I([a-z][^\|\{\}\n]+)\|?\}\}\}/g,
				replace: '$1{{{I$2|}}}{{{i$2|}}}'
			}, {
				name: '{{{J',
				find: /([^{])\{\{\{J([a-z][^\|\{\}\n]+)\|?\}\}\}/g,
				replace: '$1{{{J$2|}}}{{{j$2|}}}'
			}, {
				name: '{{{K',
				find: /([^{])\{\{\{K([a-z][^\|\{\}\n]+)\|?\}\}\}/g,
				replace: '$1{{{K$2|}}}{{{k$2|}}}'
			}, {
				name: '{{{L',
				find: /([^{])\{\{\{L([a-z][^\|\{\}\n]+)\|?\}\}\}/g,
				replace: '$1{{{L$2|}}}{{{l$2|}}}'
			}, {
				name: '{{{M',
				find: /([^{])\{\{\{M([a-z][^\|\{\}\n]+)\|?\}\}\}/g,
				replace: '$1{{{M$2|}}}{{{m$2|}}}'
			}, {
				name: '{{{N',
				find: /([^{])\{\{\{N([a-z][^\|\{\}\n]+)\|?\}\}\}/g,
				replace: '$1{{{N$2|}}}{{{n$2|}}}'
			}, {
				name: '{{{O',
				find: /([^{])\{\{\{O([a-z][^\|\{\}\n]+)\|?\}\}\}/g,
				replace: '$1{{{O$2|}}}{{{o$2|}}}'
			}, {
				name: '{{{P',
				find: /([^{])\{\{\{P([a-z][^\|\{\}\n]+)\|?\}\}\}/g,
				replace: '$1{{{P$2|}}}{{{p$2|}}}'
			}, {
				name: '{{{Q',
				find: /([^{])\{\{\{Q([a-z][^\|\{\}\n]+)\|?\}\}\}/g,
				replace: '$1{{{Q$2|}}}{{{q$2|}}}'
			}, {
				name: '{{{R',
				find: /([^{])\{\{\{R([a-z][^\|\{\}\n]+)\|?\}\}\}/g,
				replace: '$1{{{R$2|}}}{{{r$2|}}}'
			}, {
				name: '{{{S',
				find: /([^{])\{\{\{S([a-z][^\|\{\}\n]+)\|?\}\}\}/g,
				replace: '$1{{{S$2|}}}{{{s$2|}}}'
			}, {
				name: '{{{T',
				find: /([^{])\{\{\{T([a-z][^\|\{\}\n]+)\|?\}\}\}/g,
				replace: '$1{{{T$2|}}}{{{t$2|}}}'
			}, {
				name: '{{{U',
				find: /([^{])\{\{\{U([a-z][^\|\{\}\n]+)\|?\}\}\}/g,
				replace: '$1{{{U$2|}}}{{{u$2|}}}'
			}, {
				name: '{{{V',
				find: /([^{])\{\{\{V([a-z][^\|\{\}\n]+)\|?\}\}\}/g,
				replace: '$1{{{V$2|}}}{{{v$2|}}}'
			}, {
				name: '{{{W',
				find: /([^{])\{\{\{W([a-z][^\|\{\}\n]+)\|?\}\}\}/g,
				replace: '$1{{{W$2|}}}{{{w$2|}}}'
			}, {
				name: '{{{X',
				find: /([^{])\{\{\{X([a-z][^\|\{\}\n]+)\|?\}\}\}/g,
				replace: '$1{{{X$2|}}}{{{x$2|}}}'
			}, {
				name: '{{{Y',
				find: /([^{])\{\{\{Y([a-z][^\|\{\}\n]+)\|?\}\}\}/g,
				replace: '$1{{{Y$2|}}}{{{y$2|}}}'
			}, {
				name: '{{{Z',
				find: /([^{])\{\{\{Z([a-z][^\|\{\}\n]+)\|?\}\}\}/g,
				replace: '$1{{{Z$2|}}}{{{z$2|}}}'
			}]
		}]
	}]
} ] );
};

if ($.inArray(mw.config.get('wgAction'), ['edit', 'submit']) !== -1 ) {
        if( window.APC && window.APC.addRules ){
                insertBetaRules();
        } else {
                $.getScript( '//pt.wikipedia.org/w/load.php?modules=ext.gadget.APCCore&only=scripts&debug=' + mw.config.get( 'debug' ) )
                .done( insertBetaRules );
        }
}
