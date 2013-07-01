/*
 Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.html or http://ckeditor.com/license
*/
!function(){function e(e){for(var e=e.toUpperCase(),t=s.length,n=0,i=0;t>i;++i)for(var a=s[i],o=a[1].length;e.substr(0,o)==a[1];e=e.substr(o))n+=a[0];return n}function t(e){for(var e=e.toUpperCase(),t=d.length,n=1,i=1;0<e.length;i*=t)n+=d.indexOf(e.charAt(e.length-1))*i,e=e.substr(0,e.length-1);return n}var n=CKEDITOR.htmlParser.fragment.prototype,i=CKEDITOR.htmlParser.element.prototype;n.onlyChild=i.onlyChild=function(){var e=this.children;return 1==e.length&&e[0]||null},i.removeAnyChildWithName=function(e){for(var t,n=this.children,i=[],a=0;a<n.length;a++)t=n[a],t.name&&(t.name==e&&(i.push(t),n.splice(a--,1)),i=i.concat(t.removeAnyChildWithName(e)));return i},i.getAncestor=function(e){for(var t=this.parent;t&&(!t.name||!t.name.match(e));)t=t.parent;return t},n.firstChild=i.firstChild=function(e){for(var t,n=0;n<this.children.length;n++)if(t=this.children[n],e(t)||t.name&&(t=t.firstChild(e)))return t;return null},i.addStyle=function(e,t,n){var i="";if("string"==typeof t)i+=e+":"+t+";";else{if("object"==typeof e)for(var a in e)e.hasOwnProperty(a)&&(i+=a+":"+e[a]+";");else i+=e;n=t}this.attributes||(this.attributes={}),e=this.attributes.style||"",e=(n?[i,e]:[e,i]).join(";"),this.attributes.style=e.replace(/^;|;(?=;)/,"")},i.getStyle=function(e){var t=this.attributes.style;return t?(t=CKEDITOR.tools.parseCssText(t,1),t[e]):void 0},CKEDITOR.dtd.parentOf=function(e){var t,n={};for(t in this)-1==t.indexOf("$")&&this[t][e]&&(n[t]=1);return n};var a,o=/^([.\d]*)+(em|ex|px|gd|rem|vw|vh|vm|ch|mm|cm|in|pt|pc|deg|rad|ms|s|hz|khz){1}?/i,r=/^(?:\b0[^\s]*\s*){1,4}$/,l={ol:{decimal:/\d+/,"lower-roman":/^m{0,4}(cm|cd|d?c{0,3})(xc|xl|l?x{0,3})(ix|iv|v?i{0,3})$/,"upper-roman":/^M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/,"lower-alpha":/^[a-z]+$/,"upper-alpha":/^[A-Z]+$/},ul:{disc:/[l\u00B7\u2002]/,circle:/[\u006F\u00D8]/,square:/[\u006E\u25C6]/}},s=[[1e3,"M"],[900,"CM"],[500,"D"],[400,"CD"],[100,"C"],[90,"XC"],[50,"L"],[40,"XL"],[10,"X"],[9,"IX"],[5,"V"],[4,"IV"],[1,"I"]],d="ABCDEFGHIJKLMNOPQRSTUVWXYZ",c=0,u=null,m=CKEDITOR.plugins.pastefromword={utils:{createListBulletMarker:function(e,t){var n=new CKEDITOR.htmlParser.element("cke:listbullet");return n.attributes={"cke:listsymbol":e[0]},n.add(new CKEDITOR.htmlParser.text(t)),n},isListBulletIndicator:function(e){return/mso-list\s*:\s*Ignore/i.test(e.attributes&&e.attributes.style)?!0:void 0},isContainingOnlySpaces:function(e){var t;return(t=e.onlyChild())&&/^(:?\s|&nbsp;)+$/.test(t.value)},resolveList:function(e){var t,n=e.attributes;return(t=e.removeAnyChildWithName("cke:listbullet"))&&t.length&&(t=t[0])?(e.name="cke:li",n.style&&(n.style=m.filters.stylesFilter([["text-indent"],["line-height"],[/^margin(:?-left)?$/,null,function(e){e=e.split(" "),e=CKEDITOR.tools.convertToPx(e[3]||e[1]||e[0]),!c&&null!==u&&e>u&&(c=e-u),u=e,n["cke:indent"]=c&&Math.ceil(e/c)+1||1}],[/^mso-list$/,null,function(e){var e=e.split(" "),t=Number(e[0].match(/\d+/)),e=Number(e[1].match(/\d+/));1==e&&(t!==a&&(n["cke:reset"]=1),a=t),n["cke:indent"]=e}]])(n.style,e)||""),n["cke:indent"]||(u=0,n["cke:indent"]=1),CKEDITOR.tools.extend(n,t.attributes),!0):(a=u=c=null,!1)},getStyleComponents:function(){var e=CKEDITOR.dom.element.createFromHtml('<div style="position:absolute;left:-9999px;top:-9999px;"></div>',CKEDITOR.document);return CKEDITOR.document.getBody().append(e),function(t,n,i){e.setStyle(t,n);for(var t={},n=i.length,a=0;n>a;a++)t[i[a]]=e.getStyle(i[a]);return t}}(),listDtdParents:CKEDITOR.dtd.parentOf("ol")},filters:{flattenList:function(e,t){var n,t="number"==typeof t?t:1,i=e.attributes;switch(i.type){case"a":n="lower-alpha";break;case"1":n="decimal"}for(var r,l=e.children,s=0;s<l.length;s++)if(r=l[s],r.name in CKEDITOR.dtd.$listItem){var d=r.attributes,c=r.children,p=c[c.length-1];p.name in CKEDITOR.dtd.$list&&(e.add(p,s+1),--c.length||l.splice(s--,1)),r.name="cke:li",i.start&&!s&&(d.value=i.start),m.filters.stylesFilter([["tab-stops",null,function(e){(e=e.split(" ")[1].match(o))&&(u=CKEDITOR.tools.convertToPx(e[0]))}],1==t?["mso-list",null,function(e){e=e.split(" "),e=Number(e[0].match(/\d+/)),e!==a&&(d["cke:reset"]=1),a=e}]:null])(d.style),d["cke:indent"]=t,d["cke:listtype"]=e.name,d["cke:list-style-type"]=n}else if(r.name in CKEDITOR.dtd.$list)for(arguments.callee.apply(this,[r,t+1]),l=l.slice(0,s).concat(r.children).concat(l.slice(s+1)),e.children=[],r=0,c=l.length;c>r;r++)e.add(l[r]);delete e.name,i["cke:list"]=1},assembleList:function(n){for(var i,o,r,s,d,m,p,h,g,f,b,T,v=n.children,n=[],E=0;E<v.length;E++)if(i=v[E],"cke:li"==i.name)if(i.name="li",o=i.attributes,g=(g=o["cke:listsymbol"])&&g.match(/^(?:[(]?)([^\s]+?)([.)]?)$/),f=b=T=null,o["cke:ignored"])v.splice(E--,1);else{if(o["cke:reset"]&&(m=s=d=null),r=Number(o["cke:indent"]),r!=s&&(h=p=null),g){if(h&&l[h][p].test(g[1]))f=h,b=p;else for(var C in l)for(var y in l[C])if(l[C][y].test(g[1])){if("ol"!=C||!/alpha|roman/.test(y)){f=C,b=y;break}p=/roman/.test(y)?e(g[1]):t(g[1]),(!T||T>p)&&(T=p,f=C,b=y)}!f&&(f=g[2]?"ol":"ul")}else f=o["cke:listtype"]||"ol",b=o["cke:list-style-type"];if(h=f,p=b||("ol"==f?"decimal":"disc"),b&&b!=("ol"==f?"decimal":"disc")&&i.addStyle("list-style-type",b),"ol"==f&&g){switch(b){case"decimal":T=Number(g[1]);break;case"lower-roman":case"upper-roman":T=e(g[1]);break;case"lower-alpha":case"upper-alpha":T=t(g[1])}i.attributes.value=T}if(m){if(r>s)n.push(m=new CKEDITOR.htmlParser.element(f)),m.add(i),d.add(m);else{if(s>r){s-=r;for(var I;s--&&(I=m.parent);)m=I.parent}m.add(i)}v.splice(E--,1)}else n.push(m=new CKEDITOR.htmlParser.element(f)),m.add(i),v[E]=m;d=i,s=r}else m&&(m=s=d=null);for(E=0;E<n.length;E++)if(m=n[E],C=m.children,p=p=void 0,y=m.children.length,I=p=void 0,v=/list-style-type:(.*?)(?:;|$)/,s=CKEDITOR.plugins.pastefromword.filters.stylesFilter,p=m.attributes,!v.exec(p.style)){for(d=0;y>d;d++)if(p=C[d],p.attributes.value&&Number(p.attributes.value)==d+1&&delete p.attributes.value,p=v.exec(p.attributes.style)){if(p[1]!=I&&I){I=null;break}I=p[1]}if(I){for(d=0;y>d;d++)p=C[d].attributes,p.style&&(p.style=s([["list-style-type"]])(p.style)||"");m.addStyle("list-style-type",I)}}a=u=c=null},falsyFilter:function(){return!1},stylesFilter:function(e,t){return function(n,i){var a=[];(n||"").replace(/&quot;/g,'"').replace(/\s*([^ :;]+)\s*:\s*([^;]+)\s*(?=;|$)/g,function(n,o,r){o=o.toLowerCase(),"font-family"==o&&(r=r.replace(/["']/g,""));for(var l,s,d,c=0;c<e.length;c++)if(e[c]&&(n=e[c][0],l=e[c][1],s=e[c][2],d=e[c][3],o.match(n)&&(!l||r.match(l))))return o=d||o,t&&(s=s||r),"function"==typeof s&&(s=s(r,i,o)),s&&s.push&&(o=s[0],s=s[1]),"string"==typeof s&&a.push([o,s]),void 0;!t&&a.push([o,r])});for(var o=0;o<a.length;o++)a[o]=a[o].join(":");return a.length?a.join(";")+";":!1}},elementMigrateFilter:function(e,t){return e?function(n){var i=t?new CKEDITOR.style(e,t)._.definition:e;n.name=i.element,CKEDITOR.tools.extend(n.attributes,CKEDITOR.tools.clone(i.attributes)),n.addStyle(CKEDITOR.style.getStyleText(i))}:function(){}},styleMigrateFilter:function(e,t){var n=this.elementMigrateFilter;return e?function(i,a){var o=new CKEDITOR.htmlParser.element(null),r={};r[t]=i,n(e,r)(o),o.children=a.children,a.children=[o]}:function(){}},bogusAttrFilter:function(e,t){return-1==t.name.indexOf("cke:")?!1:void 0},applyStyleFilter:null},getRules:function(e,t){var n=CKEDITOR.dtd,i=CKEDITOR.tools.extend({},n.$block,n.$listItem,n.$tableContent),a=e.config,o=this.filters,l=o.falsyFilter,s=o.stylesFilter,d=o.elementMigrateFilter,c=CKEDITOR.tools.bind(this.filters.styleMigrateFilter,this.filters),u=this.utils.createListBulletMarker,m=o.flattenList,p=o.assembleList,h=this.utils.isListBulletIndicator,g=this.utils.isContainingOnlySpaces,f=this.utils.resolveList,b=function(e){return e=CKEDITOR.tools.convertToPx(e),isNaN(e)?e:e+"px"},T=this.utils.getStyleComponents,v=this.utils.listDtdParents,E=!1!==a.pasteFromWordRemoveFontStyles,C=!1!==a.pasteFromWordRemoveStyles;return{elementNames:[[/meta|link|script/,""]],root:function(e){e.filterChildren(t),p(e)},elements:{"^":function(e){var t;CKEDITOR.env.gecko&&(t=o.applyStyleFilter)&&t(e)},$:function(e){var o=e.name||"",r=e.attributes;if(o in i&&r.style&&(r.style=s([[/^(:?width|height)$/,null,b]])(r.style)||""),o.match(/h\d/)){if(e.filterChildren(t),f(e))return;d(a["format_"+o])(e)}else if(o in n.$inline)e.filterChildren(t),g(e)&&delete e.name;else if(-1!=o.indexOf(":")&&-1==o.indexOf("cke")){if(e.filterChildren(t),"v:imagedata"==o)return(o=e.attributes["o:href"])&&(e.attributes.src=o),e.name="img",void 0;delete e.name}o in v&&(e.filterChildren(t),p(e))},style:function(e){if(CKEDITOR.env.gecko){var e=(e=e.onlyChild().value.match(/\/\* Style Definitions \*\/([\s\S]*?)\/\*/))&&e[1],t={};e&&(e.replace(/[\n\r]/g,"").replace(/(.+?)\{(.+?)\}/g,function(e,n,i){for(var n=n.split(","),e=n.length,a=0;e>a;a++)CKEDITOR.tools.trim(n[a]).replace(/^(\w+)(\.[\w-]+)?$/g,function(e,n,a){n=n||"*",a=a.substring(1,a.length),a.match(/MsoNormal/)||(t[n]||(t[n]={}),a?t[n][a]=i:t[n]=i)})}),o.applyStyleFilter=function(e){var n=t["*"]?"*":e.name,i=e.attributes&&e.attributes["class"];n in t&&(n=t[n],"object"==typeof n&&(n=n[i]),n&&e.addStyle(n,!0))})}return!1},p:function(e){if(/MsoListParagraph/i.exec(e.attributes["class"])||e.getStyle("mso-list")){var n=e.firstChild(function(e){return e.type==CKEDITOR.NODE_TEXT&&!g(e.parent)});(n=n&&n.parent)&&n.addStyle("mso-list","Ignore")}e.filterChildren(t),f(e)||(a.enterMode==CKEDITOR.ENTER_BR?(delete e.name,e.add(new CKEDITOR.htmlParser.element("br"))):d(a["format_"+(a.enterMode==CKEDITOR.ENTER_P?"p":"div")])(e))},div:function(e){var t=e.onlyChild();if(t&&"table"==t.name){var n=e.attributes;t.attributes=CKEDITOR.tools.extend(t.attributes,n),n.style&&t.addStyle(n.style),t=new CKEDITOR.htmlParser.element("div"),t.addStyle("clear","both"),e.add(t),delete e.name}},td:function(e){e.getAncestor("thead")&&(e.name="th")},ol:m,ul:m,dl:m,font:function(e){if(h(e.parent))delete e.name;else{e.filterChildren(t);var n=e.attributes,i=n.style,a=e.parent;"font"==a.name?(CKEDITOR.tools.extend(a.attributes,e.attributes),i&&a.addStyle(i),delete e.name):(i=i||"",n.color&&("#000000"!=n.color&&(i+="color:"+n.color+";"),delete n.color),n.face&&(i+="font-family:"+n.face+";",delete n.face),n.size&&(i+="font-size:"+(3<n.size?"large":3>n.size?"small":"medium")+";",delete n.size),e.name="span",e.addStyle(i))}},span:function(e){if(h(e.parent))return!1;if(e.filterChildren(t),g(e))return delete e.name,null;if(h(e)){var n=e.firstChild(function(e){return e.value||"img"==e.name}),i=(n=n&&(n.value||"l."))&&n.match(/^(?:[(]?)([^\s]+?)([.)]?)$/);if(i)return n=u(i,n),(e=e.getAncestor("span"))&&/ mso-hide:\s*all|display:\s*none /.test(e.attributes.style)&&(n.attributes["cke:ignored"]=1),n}return(i=(n=e.attributes)&&n.style)&&(n.style=s([["line-height"],[/^font-family$/,null,E?null:c(a.font_style,"family")],[/^font-size$/,null,E?null:c(a.fontSize_style,"size")],[/^color$/,null,E?null:c(a.colorButton_foreStyle,"color")],[/^background-color$/,null,E?null:c(a.colorButton_backStyle,"color")]])(i,e)||""),n.style||delete n.style,CKEDITOR.tools.isEmpty(n)&&delete e.name,null},b:d(a.coreStyles_bold),i:d(a.coreStyles_italic),u:d(a.coreStyles_underline),s:d(a.coreStyles_strike),sup:d(a.coreStyles_superscript),sub:d(a.coreStyles_subscript),a:function(e){var t=e.attributes;t&&!t.href&&t.name?delete e.name:CKEDITOR.env.webkit&&t.href&&t.href.match(/file:\/\/\/[\S]+#/i)&&(t.href=t.href.replace(/file:\/\/\/[^#]+/i,""))},"cke:listbullet":function(e){e.getAncestor(/h\d/)&&!a.pasteFromWordNumberedHeadingToList&&delete e.name}},attributeNames:[[/^onmouse(:?out|over)/,""],[/^onload$/,""],[/(?:v|o):\w+/,""],[/^lang/,""]],attributes:{style:s(C?[[/^list-style-type$/,null],[/^margin$|^margin-(?!bottom|top)/,null,function(e,t,n){if(t.name in{p:1,div:1}){if(t="ltr"==a.contentsLangDirection?"margin-left":"margin-right","margin"==n)e=T(n,e,[t])[t];else if(n!=t)return null;if(e&&!r.test(e))return[t,e]}return null}],[/^clear$/],[/^border.*|margin.*|vertical-align|float$/,null,function(e,t){return"img"==t.name?e:void 0}],[/^width|height$/,null,function(e,t){return t.name in{table:1,td:1,th:1,img:1}?e:void 0}]]:[[/^mso-/],[/-color$/,null,function(e){return"transparent"==e?!1:CKEDITOR.env.gecko?e.replace(/-moz-use-text-color/g,"transparent"):void 0}],[/^margin$/,r],["text-indent","0cm"],["page-break-before"],["tab-stops"],["display","none"],E?[/font-?/]:null],C),width:function(e,t){return t.name in n.$tableContent?!1:void 0},border:function(e,t){return t.name in n.$tableContent?!1:void 0},"class":l,bgcolor:l,valign:C?l:function(e,t){return t.addStyle("vertical-align",e),!1}},comment:CKEDITOR.env.ie?l:function(e,t){var n=e.match(/<img.*?>/),i=e.match(/^\[if !supportLists\]([\s\S]*?)\[endif\]$/);return i?(i=(n=i[1]||n&&"l.")&&n.match(/>(?:[(]?)([^\s]+?)([.)]?)</),u(i,n)):CKEDITOR.env.gecko&&n?(n=CKEDITOR.htmlParser.fragment.fromHtml(n[0]).children[0],(i=(i=(i=t.previous)&&i.value.match(/<v:imagedata[^>]*o:href=['"](.*?)['"]/))&&i[1])&&(n.attributes.src=i),n):!1}}}},p=function(){this.dataFilter=new CKEDITOR.htmlParser.filter};p.prototype={toHtml:function(e){var e=CKEDITOR.htmlParser.fragment.fromHtml(e),t=new CKEDITOR.htmlParser.basicWriter;return e.writeHtml(t,this.dataFilter),t.getHtml(!0)}},CKEDITOR.cleanWord=function(e,t){CKEDITOR.env.gecko&&(e=e.replace(/(<\!--\[if[^<]*?\])--\>([\S\s]*?)<\!--(\[endif\]--\>)/gi,"$1$2$3")),CKEDITOR.env.webkit&&(e=e.replace(/(class="MsoListParagraph[^>]+><\!--\[if !supportLists\]--\>)([^<]+<span[^<]+<\/span>)(<\!--\[endif\]--\>)/gi,"$1<span>$2</span>$3"));var n=new p,i=n.dataFilter;i.addRules(CKEDITOR.plugins.pastefromword.getRules(t,i)),t.fire("beforeCleanWord",{filter:i});try{e=n.toHtml(e)}catch(a){alert(t.lang.pastefromword.error)}return e=e.replace(/cke:.*?".*?"/g,""),e=e.replace(/style=""/g,""),e=e.replace(/<span>/g,"")}}();