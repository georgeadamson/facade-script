var __awaiter=this&&this.__awaiter||function(t,r,e,n){function i(t){return t instanceof e?t:new e((function(r){r(t)}))}return new(e||(e=Promise))((function(e,o){function a(t){try{c(n.next(t))}catch(r){o(r)}}function s(t){try{c(n["throw"](t))}catch(r){o(r)}}function c(t){t.done?e(t.value):i(t.value).then(a,s)}c((n=n.apply(t,r||[])).next())}))};var __generator=this&&this.__generator||function(t,r){var e={label:0,sent:function(){if(o[0]&1)throw o[1];return o[1]},trys:[],ops:[]},n,i,o,a;return a={next:s(0),throw:s(1),return:s(2)},typeof Symbol==="function"&&(a[Symbol.iterator]=function(){return this}),a;function s(t){return function(r){return c([t,r])}}function c(a){if(n)throw new TypeError("Generator is already executing.");while(e)try{if(n=1,i&&(o=a[0]&2?i["return"]:a[0]?i["throw"]||((o=i["return"])&&o.call(i),0):i.next)&&!(o=o.call(i,a[1])).done)return o;if(i=0,o)a=[a[0]&2,o.value];switch(a[0]){case 0:case 1:o=a;break;case 4:e.label++;return{value:a[1],done:false};case 5:e.label++;i=a[1];a=[0];continue;case 7:a=e.ops.pop();e.trys.pop();continue;default:if(!(o=e.trys,o=o.length>0&&o[o.length-1])&&(a[0]===6||a[0]===2)){e=0;continue}if(a[0]===3&&(!o||a[1]>o[0]&&a[1]<o[3])){e.label=a[1];break}if(a[0]===6&&e.label<o[1]){e.label=o[1];o=a;break}if(o&&e.label<o[2]){e.label=o[2];e.ops.push(a);break}if(o[2])e.ops.pop();e.trys.pop();continue}a=r.call(t,e)}catch(s){a=[6,s];i=0}finally{n=o=0}if(a[0]&5)throw a[1];return{value:a[0]?a[1]:void 0,done:true}}};System.register(["./index-b0ab3e9f.system.js"],(function(t){"use strict";var r,e,n,i,o;return{setters:[function(t){r=t.r;e=t.e;n=t.h;i=t.f;o=t.g}],execute:function(){var a=this;var s=window.clearTimeout;var c=window.clearInterval;var u=window.parseInt;var f="data-facadescriptid";var l={1:"Script triggered but missing src"};var h={IDLE:0,TRIGGERED_BUT_NO_SRC:.1,TRIGGERED:2,WAITING:3,LOADING:4,LOADED:5,READY:6,TIMEOUT:7};var d={};for(var p in h)d[h[p]]=p;var v={};var g=0;var b=t("facade_script",function(){function t(t){var n=this;r(this,t);this.facadescript=e(this,"facadescript",7);this.once=false;this.global=false;this.trigger="lazy";this.wait=0;this.showWhen="LOADED";this.statusMsg="IDLE";this.status=0;this.uid=g++;this.isOnPage=function(){var t=n,r=t.src,e=t.uid;var i='[src^="'+r+'"]:not(['+f+"="+e+"])";return Boolean(document.querySelector("script"+i+",iframe"+i))};this.onTrigger=function(){var t=n,r=t.once,e=t.global,i=t.iframe,o=t.wait,a=t.src,s=t.uid,c=t.props,u=t.onLoad,l=t.timeout;n.status=h.TRIGGERED;if(!a){n.error=1;n.status=h.IDLE;return}else if(n.error){n.error=undefined}if(r&&n.isOnPage()){if(m(a)<h.LOADING){v[a]=h.LOADING}n.status=m(a);return}var d=function(){var t;if(r&&n.isOnPage()){n.status=v[a]||(v[a]=h.READY);return}if(e&&!(r&&n.isOnPage())){y(i?"iframe":"script",Object.assign((t={src:a},t[f]=s,t.onLoad=u,t),O(c)),document.head)}else{}n.status=v[a]=h.LOADING;if(l){n.timeoutId=setTimeout((function(){if(n.status<h.READY){n.status=h.TIMEOUT}}),l)}};if(o){n.status=h.WAITING;setTimeout(d,o)}else{d()}};this.onLoad=function(){if(n.status!==h.TIMEOUT){var t=n,r=t.src,e=t.once,i=t.isReady,o=t.timeout,a=t.timeoutId;s(a);if(e)v[r]=h.LOADED;n.status=h.LOADED;E(i||function(){return true},o).then((function(){return n.status=h.READY})).catch((function(t){return console.error("awaitScriptReady",t)}))}}}t.prototype.onError=function(t){this.errMsg=l[t]};t.prototype.onStatus=function(t,r){if(t===r)return;var e=this,n=e.debug,i=e.error,o=e.errMsg,a=e.once,c=e.src,u=e.timeoutId,f=e.host;if(u&&t>=h.READY){s(u)}if(a&&t>=h.LOADING&&t>m(c)){v[c]=t}var l={code:t,status:d[t],error:i,errMsg:o,id:f.id,src:c};this.statusMsg=d[t];this.facadescript.emit(l);if(n){var p=this,g=p.uid,b=p.iframe,O=p.global;console.debug("facadescript:",Object.assign(Object.assign({},l),{uid:g,iframe:b,once:a,global:O}))}};t.prototype.componentWillLoad=function(){this.src=this.srcProd};t.prototype.componentDidLoad=function(){var t=this,r=t.trigger,e=t.once,n=t.onTrigger,i=t.src,o=t.host;var a=r==="now"?n:r==="lazy"?function(){return I(n).observe(o)}:typeof r==="function"?r:false;if(a){a(n)}if(e&&this.isOnPage()){if(m(i)<h.LOADING){v[i]=h.LOADING}this.status=m(i)}};t.prototype.render=function(){var t;var r=this,e=r.iframe,o=r.src,a=r.uid,s=r.global,c=r.props,u=r.trigger,l=r.onTrigger,d=r.onLoad,p=r.showWhen,v=r.status,g=r.once;var b;var y=h[String(p).toUpperCase()]||h.LOADED;var m=v<y;if(!s&&v>h.WAITING&&!(g&&this.isOnPage())){var I=e?"iframe":"script";var E=Object.assign((t={src:o,onLoad:d,hidden:m},t[f]=a,t),O(c));b=n(I,Object.assign({},E))}var D={onClick:u==="click"&&v<h.TRIGGERED&&l};var w=!m&&v!==h.TIMEOUT;return n(i,Object.assign({},D),n("div",{class:"facade-script-placeholder",hidden:w},n("slot",null)),b)};Object.defineProperty(t.prototype,"host",{get:function(){return o(this)},enumerable:false,configurable:true});Object.defineProperty(t,"watchers",{get:function(){return{error:["onError"],status:["onStatus"]}},enumerable:false,configurable:true});return t}());function O(t){try{return(typeof t==="object"?t:t&&JSON.parse(t))||{}}catch(r){console.error("Error parsing `props`",r,"JSON:",t)}}function y(t,r,e){if(r===void 0){r={}}var n;var i=document.createElement(t);Object.entries(r).forEach((function(t){var r=t[0],e=t[1];i.hasOwnProperty(r)||typeof e==="function"?i[r]=e:i.setAttribute(r,e)}));if(e)e.appendChild(i)}var m=function(t){return v[t]||h.IDLE};var I=function(t){return new IntersectionObserver((function(r,e){var n=r[0];if(n.isIntersecting){e.disconnect();t()}}))};var E=function(t,r,e){if(e===void 0){e=200}return __awaiter(a,void 0,void 0,(function(){return __generator(this,(function(n){return[2,new Promise((function(n,i){var o;var a=setInterval((function(){if(t()){s(o);c(a);n()}}),u(e)||200);if(r){o=setTimeout((function(){c(a);i("timeout")}),u(r)||3e4)}}))]}))}))}}}}));