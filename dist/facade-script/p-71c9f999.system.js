System.register(["./p-963adacc.system.js"],(function(e,r){"use strict";var t,n,s,o,i,c,a;return{setters:[function(e){t=e.p;n=e.w;s=e.d;o=e.N;i=e.a;c=e.H;a=e.b}],execute:function(){var e=function(e){return"__sc_import_"+e.replace(/\s|-/g,"_")};var u=function(){{t.$cssShim$=n.__cssshim}{l(c.prototype)}var e=Array.from(s.querySelectorAll("script")).find((function(e){return new RegExp("/"+o+"(\\.esm)?\\.js($|\\?|#)").test(e.src)||e.getAttribute("data-stencil-namespace")===o}));var a={};if("onbeforeload"in e&&!history.scrollRestoration){return{then:function(){}}}{a.resourcesUrl=new URL(".",new URL(e.getAttribute("data-resources-url")||e.src,n.location.href)).href;{f(a.resourcesUrl,e)}if(!n.customElements){return r.import("./p-9b1d8162.system.js").then((function(){return a}))}}return i(a)};var f=function(r,t){var i=e(o);try{n[i]=new Function("w","return import(w);//"+Math.random())}catch(a){var c=new Map;n[i]=function(e){var o=new URL(e,r).href;var a=c.get(o);if(!a){var u=s.createElement("script");u.type="module";u.crossOrigin=t.crossOrigin;u.src=URL.createObjectURL(new Blob(["import * as m from '"+o+"'; window."+i+".m = m;"],{type:"application/javascript"}));a=new Promise((function(e){u.onload=function(){e(n[i].m);u.remove()}}));c.set(o,a);s.head.appendChild(u)}return a}}};var l=function(e){var r=e.cloneNode;e.cloneNode=function(e){if(this.nodeName==="TEMPLATE"){return r.call(this,e)}var t=r.call(this,false);var n=this.childNodes;if(e){for(var s=0;s<n.length;s++){if(n[s].nodeType!==2){t.appendChild(n[s].cloneNode(true))}}}return t}};u().then((function(e){return a([["p-cf12ac23.system",[[4,"facade-script",{srcProd:[1,"src"],iframe:[4],once:[4],global:[4],trigger:[1],wait:[2],props:[1],showWhen:[1,"show-when"],timeout:[2],ready:[16],errMsg:[513,"error"],statusMsg:[513,"status"],debug:[4],status:[32],error:[32]}]]]],e)}))}}}));