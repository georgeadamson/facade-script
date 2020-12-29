import{r as t,c as s,h as i,e as o,g as e}from"./p-2559a26d.js";const r=window.clearTimeout,c=window.clearInterval,n=window.parseInt,a={1:"Script triggered but missing src"},h={IDLE:0,TRIGGERED_BUT_NO_SRC:.1,TRIGGERED:2,WAITING:3,LOADING:4,LOADED:5,READY:6,TIMEOUT:7},d={};for(const O in h)d[h[O]]=O;const u={};let f=0;const l=class{constructor(i){t(this,i),this.facadescript=s(this,"facadescript",7),this.once=!1,this.global=!1,this.trigger="lazy",this.wait=0,this.showWhen="LOADED",this.statusMsg="IDLE",this.status=0,this.uid=f++,this.isOnPage=()=>{const{src:t,uid:s}=this,i=`[src^="${t}"]:not([data-facadescriptid=${s}])`;return Boolean(document.querySelector(`script${i},iframe${i}`))},this.onTrigger=()=>{const{once:t,global:s,iframe:i,wait:o,src:e,uid:r,props:c,onLoad:n,timeout:a}=this;if(this.status=h.TRIGGERED,!e)return this.error=1,void(this.status=h.IDLE);if(this.error&&(this.error=void 0),t&&this.isOnPage())return m(e)<h.LOADING&&(u[e]=h.LOADING),void(this.status=m(e));const d=()=>{t&&this.isOnPage()?this.status=u[e]||(u[e]=h.READY):(!s||t&&this.isOnPage()||function(t,s={},i){let o;const e=document.createElement(t);Object.entries(s).forEach((([t,s])=>{e.hasOwnProperty(t)||"function"==typeof s||"object"==typeof s&&(o=r(s))&&(s=o)?e[t]=s:e.setAttribute(t,s)})),i&&i.appendChild(e);const r=t=>{try{return JSON.stringify(t)}catch(s){}}}(i?"iframe":"script",Object.assign({src:e,"data-facadescriptid":r,onLoad:n},p(c)),document.head),this.status=u[e]=h.LOADING,a&&(this.timeoutId=setTimeout((()=>{this.status<h.READY&&(this.status=h.TIMEOUT)}),a)))};o?(this.status=h.WAITING,setTimeout(d,o)):d()},this.onLoad=()=>{if(this.status!==h.TIMEOUT){const{src:t,once:s,isReady:i,timeout:o,timeoutId:e}=this;r(e),s&&(u[t]=h.LOADED),this.status=h.LOADED,b(i||(()=>!0),o).then((()=>this.status=h.READY)).catch((t=>console.error("awaitScriptReady",t)))}}}onError(t){this.errMsg=a[t]}onStatus(t,s){if(t===s)return;const{debug:i,error:o,errMsg:e,once:c,src:n,timeoutId:a,host:f}=this;a&&t>=h.READY&&r(a),c&&t>=h.LOADING&&t>m(n)&&(u[n]=t);const l={code:t,status:d[t],error:o,errMsg:e,id:f.id,src:n};if(this.statusMsg=d[t],this.facadescript.emit(l),i){const{uid:t,iframe:s,global:i}=this;console.debug("facadescript:",Object.assign(Object.assign({},l),{uid:t,iframe:s,once:c,global:i}))}}componentWillLoad(){this.src=this.srcProd}componentDidLoad(){const{trigger:t,once:s,onTrigger:i,src:o,host:e}=this,r="now"===t?i:"lazy"===t?()=>g(i).observe(e):"function"==typeof t&&t;r&&r(i),s&&this.isOnPage()&&(m(o)<h.LOADING&&(u[o]=h.LOADING),this.status=m(o))}render(){const{iframe:t,src:s,uid:e,global:r,props:c,trigger:n,onTrigger:a,onLoad:d,showWhen:u,status:f,once:l}=this;let m;const g=f<(h[String(u).toUpperCase()]||h.LOADED);if(!r&&f>h.WAITING&&(!l||!this.isOnPage())){const o=t?"iframe":"script",r=Object.assign({src:s,onLoad:d,hidden:g,"data-facadescriptid":e},p(c));m=i(o,Object.assign({},r))}const b=!g&&f!==h.TIMEOUT;return i(o,Object.assign({},{onClick:"click"===n&&f<h.TRIGGERED&&a}),i("div",{class:"facade-script-placeholder",hidden:b},i("slot",null)),m)}get host(){return e(this)}static get watchers(){return{error:["onError"],status:["onStatus"]}}};function p(t){try{return("object"==typeof t?t:t&&JSON.parse(t))||{}}catch(s){console.error("Error parsing `props`",s,"JSON:",t)}}const m=t=>u[t]||h.IDLE,g=t=>new IntersectionObserver((([s],i)=>{s.isIntersecting&&(i.disconnect(),t())})),b=async(t,s,i=200)=>new Promise(((o,e)=>{let a;const h=setInterval((()=>{t()&&(r(a),c(h),o())}),n(i)||200);s&&(a=setTimeout((()=>{c(h),e("timeout")}),n(s)||3e4))}));export{l as facade_script}