import{r as t,c as s,h as i,e,g as r}from"./p-dd4d76e1.js";const o={1:"Script triggered but missing src"},c={IDLE:0,TRIGGERED_BUT_NO_SRC:.1,TRIGGERED:2,WAITING:3,LOADING:4,LOADED:5,READY:6,TIMEOUT:7},n={};for(const m in c)n[c[m]]=m;const a={};let h=0;const d=class{constructor(i){t(this,i),this.facadescript=s(this,"facadescript",7),this.once=!1,this.global=!1,this.trigger="lazy",this.showWhen="LOADED",this.statusMsg="IDLE",this.status=0,this.uid=h++,this.isOnPage=()=>{const{src:t,uid:s}=this,i=`[src^="${t}"]:not([data-facadescriptid=${s}])`;return Boolean(document.querySelector(`script${i},iframe${i}`))},this.onTrigger=()=>{const{once:t,global:s,iframe:i,wait:e,src:r,uid:o,props:c,onLoad:n,timeout:h}=this;if(this.status=2,!r)return this.error=1,void(this.status=0);if(this.error&&(this.error=void 0),t&&this.isOnPage())return l(r)<4&&(a[r]=4),void(this.status=l(r));const d=()=>{t&&this.isOnPage()?this.status=a[r]||(a[r]=6):(!s||t&&this.isOnPage()||function(t,s={},i){const e=document.createElement(t);Object.entries(s).forEach((([t,s])=>{e.hasOwnProperty(t)||"function"==typeof s?e[t]=s:e.setAttribute(t,s)})),i&&i.appendChild(e)}(i?"iframe":"script",Object.assign({src:r,"data-facadescriptid":o,onLoad:n},u(c)),document.head),this.status=a[r]=4,h&&(this.timeoutId=setTimeout((()=>{this.status<6&&(this.status=7)}),h)))};e?(this.status=3,setTimeout(d,e)):d()},this.onLoad=()=>{if(7!==this.status){const{src:t,once:s,ready:i,timeout:e,timeoutId:r}=this;clearTimeout(r),s&&(a[t]=5),this.status=5,f(i||(()=>!0),e).then((()=>this.status=6)).catch((t=>console.error("awaitScriptReady",t)))}}}onError(t){this.errMsg=o[t]}onStatus(t,s){if(t===s)return;const{debug:i,error:e,errMsg:r,once:o,src:c,timeoutId:h,host:{id:d}}=this;h&&t>=6&&clearTimeout(h),o&&t>=4&&t>l(c)&&(a[c]=t);const u={code:t,status:n[t],error:e,errMsg:r,id:d,src:c};if(this.statusMsg=n[t],this.facadescript.emit(u),i){const{uid:t,iframe:s,global:i}=this;console.debug("facadescript:",Object.assign(Object.assign({},u),{uid:t,iframe:s,once:o,global:i}))}}componentWillLoad(){this.src=this.srcProd}componentDidLoad(){const{trigger:t,once:s,onTrigger:i,src:e,host:r}=this,o="now"===t?i:"lazy"===t?()=>p(i).observe(r):"function"==typeof t&&t;o&&o(i),s&&this.isOnPage()&&(l(e)<4&&(a[e]=4),this.status=l(e))}render(){const{iframe:t,src:s,uid:r,global:o,props:n,trigger:a,onTrigger:h,onLoad:d,showWhen:l,status:p,once:f}=this;let m;const g=p<(c[String(l).toUpperCase()]||5);if(!o&&p>3&&(!f||!this.isOnPage())){const e=t?"iframe":"script",o=Object.assign({src:s,onLoad:d,hidden:g,"data-facadescriptid":r},u(n));m=i(e,Object.assign({},o))}const I=!g&&7!==p;return i(e,Object.assign({},{onClick:"click"===a&&p<2&&h}),i("div",{class:"facade-script-placeholder",hidden:I},i("slot",null)),m)}get host(){return r(this)}static get watchers(){return{error:["onError"],status:["onStatus"]}}};function u(t){try{return("object"==typeof t?t:t&&JSON.parse(t))||{}}catch(s){console.error("Error parsing `props`",s,"JSON:",t)}}const l=t=>a[t]||0,p=t=>new IntersectionObserver((([s],i)=>{s.isIntersecting&&(i.disconnect(),t())})),f=async(t,s,i=200)=>new Promise(((e,r)=>{let o;const c=setInterval((()=>{t()&&(clearTimeout(o),clearInterval(c),e(!0))}),parseInt(i)||200);s&&(o=setTimeout((()=>{clearInterval(c),r("timeout")}),parseInt(s)||3e4))}));export{d as facade_script}