import{p as s,w as t,d as r,N as e,a as o,H as n,b as a}from"./p-dd4d76e1.js";const i=s=>{const t=s.cloneNode;s.cloneNode=function(s){if("TEMPLATE"===this.nodeName)return t.call(this,s);const r=t.call(this,!1),e=this.childNodes;if(s)for(let t=0;t<e.length;t++)2!==e[t].nodeType&&r.appendChild(e[t].cloneNode(!0));return r}};(()=>{s.t=t.__cssshim,i(n.prototype);const a=Array.from(r.querySelectorAll("script")).find((s=>new RegExp(`/${e}(\\.esm)?\\.js($|\\?|#)`).test(s.src)||s.getAttribute("data-stencil-namespace")===e)),c={};return"onbeforeload"in a&&!history.scrollRestoration?{then(){}}:(c.resourcesUrl=new URL(".",new URL(a.getAttribute("data-resources-url")||a.src,t.location.href)).href,((s,o)=>{const n=`__sc_import_${e.replace(/\s|-/g,"_")}`;try{t[n]=new Function("w",`return import(w);//${Math.random()}`)}catch(a){const e=new Map;t[n]=a=>{const i=new URL(a,s).href;let c=e.get(i);if(!c){const s=r.createElement("script");s.type="module",s.crossOrigin=o.crossOrigin,s.src=URL.createObjectURL(new Blob([`import * as m from '${i}'; window.${n}.m = m;`],{type:"application/javascript"})),c=new Promise((r=>{s.onload=()=>{r(t[n].m),s.remove()}})),e.set(i,c),r.head.appendChild(s)}return c}}})(c.resourcesUrl,a),t.customElements?o(c):__sc_import_facade_script("./p-db46d0d3.js").then((()=>c)))})().then((s=>a([["p-902c0b72",[[4,"facade-script",{srcProd:[1,"src"],iframe:[4],once:[4],global:[4],trigger:[1],wait:[2],props:[1],showWhen:[1,"show-when"],timeout:[2],isReady:[16],errMsg:[513,"error"],statusMsg:[513,"status"],debug:[4],status:[32],error:[32]}]]]],s)));