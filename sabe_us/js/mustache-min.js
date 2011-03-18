var Mustache=function(){var k=function(){};k.prototype={otag:"{{",ctag:"}}",pragmas:{},buffer:[],pragmas_implemented:{"IMPLICIT-ITERATOR":true},context:{},render:function(a,b,c,d){if(!d){this.context=b;this.buffer=[]}if(!this.includes("",a))if(d)return a;else{this.send(a);return}a=this.render_pragmas(a);a=this.render_section(a,b,c);if(d)return this.render_tags(a,b,c,d);this.render_tags(a,b,c,d)},send:function(a){a!=""&&this.buffer.push(a)},render_pragmas:function(a){if(!this.includes("%",a))return a;
var b=this;return a.replace(RegExp(this.otag+"%([\\w-]+) ?([\\w]+=[\\w]+)?"+this.ctag),function(c,d,e){if(!b.pragmas_implemented[d])throw{message:"This implementation of mustache doesn't understand the '"+d+"' pragma"};b.pragmas[d]={};if(e){c=e.split("=");b.pragmas[d][c[0]]=c[1]}return""})},render_partial:function(a,b,c){a=this.trim(a);if(!c||c[a]===undefined)throw{message:"unknown_partial '"+a+"'"};if(typeof b[a]!="object")return this.render(c[a],b,c,true);return this.render(c[a],b[a],c,true)},render_section:function(a,
b,c){if(!this.includes("#",a)&&!this.includes("^",a))return a;var d=this;return a.replace(RegExp(this.otag+"(\\^|\\#)\\s*(.+)\\s*"+this.ctag+"\n*([\\s\\S]+?)"+this.otag+"\\/\\s*\\2\\s*"+this.ctag+"\\s*","mg"),function(e,h,i,g){e=d.find(i,b);if(h=="^")return!e||d.is_array(e)&&e.length===0?d.render(g,b,c,true):"";else if(h=="#")return d.is_array(e)?d.map(e,function(f){return d.render(g,d.create_context(f),c,true)}).join(""):d.is_object(e)?d.render(g,d.create_context(e),c,true):typeof e==="function"?
e.call(b,g,function(f){return d.render(f,b,c,true)}):e?d.render(g,b,c,true):""})},render_tags:function(a,b,c,d){var e=this,h=function(){return RegExp(e.otag+"(=|!|>|\\{|%)?([^\\/#\\^]+?)\\1?"+e.ctag+"+","g")},i=h(),g=function(m,l,j){switch(l){case "!":return"";case "=":e.set_delimiters(j);i=h();return"";case ">":return e.render_partial(j,b,c);case "{":return e.find(j,b);default:return e.escape(e.find(j,b))}};a=a.split("\n");for(var f=0;f<a.length;f++){a[f]=a[f].replace(i,g,this);d||this.send(a[f])}if(d)return a.join("\n")},
set_delimiters:function(a){a=a.split(" ");this.otag=this.escape_regex(a[0]);this.ctag=this.escape_regex(a[1])},escape_regex:function(a){if(!arguments.callee.sRE)arguments.callee.sRE=RegExp("(\\/|\\.|\\*|\\+|\\?|\\||\\(|\\)|\\[|\\]|\\{|\\}|\\\\)","g");return a.replace(arguments.callee.sRE,"\\$1")},find:function(a,b){a=this.trim(a);var c;if(b[a]===false||b[a]===0||b[a])c=b[a];else if(this.context[a]===false||this.context[a]===0||this.context[a])c=this.context[a];if(typeof c==="function")return c.apply(b);
if(c!==undefined)return c;return""},includes:function(a,b){return b.indexOf(this.otag+a)!=-1},escape:function(a){a=String(a===null?"":a);return a.replace(/&(?!\w+;)|["'<>\\]/g,function(b){switch(b){case "&":return"&amp;";case "\\":return"\\\\";case '"':return"&quot;";case "'":return"&#39;";case "<":return"&lt;";case ">":return"&gt;";default:return b}})},create_context:function(a){if(this.is_object(a))return a;else{var b=".";if(this.pragmas["IMPLICIT-ITERATOR"])b=this.pragmas["IMPLICIT-ITERATOR"].iterator;
var c={};c[b]=a;return c}},is_object:function(a){return a&&typeof a=="object"},is_array:function(a){return Object.prototype.toString.call(a)==="[object Array]"},trim:function(a){return a.replace(/^\s*|\s*$/g,"")},map:function(a,b){if(typeof a.map=="function")return a.map(b);else{for(var c=[],d=a.length,e=0;e<d;e++)c.push(b(a[e]));return c}}};return{name:"mustache.js",version:"0.3.1-dev",to_html:function(a,b,c,d){var e=new k;if(d)e.send=d;e.render(a,b,c);if(!d)return e.buffer.join("\n")}}}();