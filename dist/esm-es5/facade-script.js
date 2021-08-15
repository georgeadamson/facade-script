import{p as plt,w as win,d as doc,N as NAMESPACE,a as promiseResolve,H,b as bootstrapLazy}from"./index-1aedce71.js";var getDynamicImportFunction=function(r){return"__sc_import_"+r.replace(/\s|-/g,"_")};var patchBrowser=function(){{plt.$cssShim$=win.__cssshim}{patchCloneNodeFix(H.prototype)}var r=Array.from(doc.querySelectorAll("script")).find((function(r){return new RegExp("/"+NAMESPACE+"(\\.esm)?\\.js($|\\?|#)").test(r.src)||r.getAttribute("data-stencil-namespace")===NAMESPACE}));var e={};if("onbeforeload"in r&&!history.scrollRestoration){return{then:function(){}}}{e.resourcesUrl=new URL(".",new URL(r.getAttribute("data-resources-url")||r.src,win.location.href)).href;{patchDynamicImport(e.resourcesUrl,r)}if(!win.customElements){return import("./dom-1b195079.js").then((function(){return e}))}}return promiseResolve(e)};var patchDynamicImport=function(r,e){var t=getDynamicImportFunction(NAMESPACE);try{win[t]=new Function("w","return import(w);//"+Math.random())}catch(o){var n=new Map;win[t]=function(o){var a=new URL(o,r).href;var i=n.get(a);if(!i){var s=doc.createElement("script");s.type="module";s.crossOrigin=e.crossOrigin;s.src=URL.createObjectURL(new Blob(["import * as m from '"+a+"'; window."+t+".m = m;"],{type:"application/javascript"}));i=new Promise((function(r){s.onload=function(){r(win[t].m);s.remove()}}));n.set(a,i);doc.head.appendChild(s)}return i}}};var patchCloneNodeFix=function(r){var e=r.cloneNode;r.cloneNode=function(r){if(this.nodeName==="TEMPLATE"){return e.call(this,r)}var t=e.call(this,false);var n=this.childNodes;if(r){for(var o=0;o<n.length;o++){if(n[o].nodeType!==2){t.appendChild(n[o].cloneNode(true))}}}return t}};patchBrowser().then((function(r){return bootstrapLazy([["facade-script",[[4,"facade-script",{srcProd:[1,"src"],iframe:[4],once:[4],global:[4],trigger:[1],wait:[2],props:[1],showWhen:[1,"show-when"],timeout:[2],isReady:[16],errMsg:[513,"error"],statusMsg:[513,"status"],debug:[4],status:[32],error:[32]}]]]],r)}));