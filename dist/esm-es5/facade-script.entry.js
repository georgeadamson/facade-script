var __awaiter=this&&this.__awaiter||function(t,e,r,n){function i(t){return t instanceof r?t:new r((function(e){e(t)}))}return new(r||(r=Promise))((function(r,s){function a(t){try{c(n.next(t))}catch(e){s(e)}}function o(t){try{c(n["throw"](t))}catch(e){s(e)}}function c(t){t.done?r(t.value):i(t.value).then(a,o)}c((n=n.apply(t,e||[])).next())}))};var __generator=this&&this.__generator||function(t,e){var r={label:0,sent:function(){if(s[0]&1)throw s[1];return s[1]},trys:[],ops:[]},n,i,s,a;return a={next:o(0),throw:o(1),return:o(2)},typeof Symbol==="function"&&(a[Symbol.iterator]=function(){return this}),a;function o(t){return function(e){return c([t,e])}}function c(a){if(n)throw new TypeError("Generator is already executing.");while(r)try{if(n=1,i&&(s=a[0]&2?i["return"]:a[0]?i["throw"]||((s=i["return"])&&s.call(i),0):i.next)&&!(s=s.call(i,a[1])).done)return s;if(i=0,s)a=[a[0]&2,s.value];switch(a[0]){case 0:case 1:s=a;break;case 4:r.label++;return{value:a[1],done:false};case 5:r.label++;i=a[1];a=[0];continue;case 7:a=r.ops.pop();r.trys.pop();continue;default:if(!(s=r.trys,s=s.length>0&&s[s.length-1])&&(a[0]===6||a[0]===2)){r=0;continue}if(a[0]===3&&(!s||a[1]>s[0]&&a[1]<s[3])){r.label=a[1];break}if(a[0]===6&&r.label<s[1]){r.label=s[1];s=a;break}if(s&&r.label<s[2]){r.label=s[2];r.ops.push(a);break}if(s[2])r.ops.pop();r.trys.pop();continue}a=e.call(t,r)}catch(o){a=[6,o];i=0}finally{n=s=0}if(a[0]&5)throw a[1];return{value:a[0]?a[1]:void 0,done:true}}};import{r as registerInstance,c as createEvent,h,e as Host,g as getElement}from"./index-d373a0aa.js";var ERROR_MESSAGE={1:"Script triggered but missing src"};var STATUS={IDLE:0,TRIGGERED_BUT_NO_SRC:.1,TRIGGERED:2,WAITING:3,LOADING:4,LOADED:5,READY:6,TIMEOUT:7};var STATUS_NAME={};for(var key in STATUS)STATUS_NAME[STATUS[key]]=key;var globalStatusCode={};var FacadeScript=function(){function t(t){var e=this;registerInstance(this,t);this.pengscript=createEvent(this,"pengscript",7);this.isOnce=false;this.isGlobal=false;this.trigger="lazy";this.wait=0;this.showWhen="LOADED";this.statusMsg="IDLE";this.status=0;this.onTrigger=function(){var t=e,r=t.isOnce,n=t.isGlobal,i=t.isIframe,s=t.wait,a=t.src,o=t.props,c=t.onLoad,u=t.timeout;e.status=STATUS.TRIGGERED;if(!a){e.error=1;e.status=STATUS.IDLE;return}else if(e.error){e.error=undefined}if(r&&isScriptOnPage(a)){if(statusOfGlobalScript(a)<STATUS.LOADING){globalStatusCode[a]=STATUS.LOADING}e.status=statusOfGlobalScript(a);return}var f=function(){if(n&&!(r&&isScriptOnPage(a))){createElement(i?"iframe":"script",Object.assign({src:a,onLoad:c},parseJSON(o)),document.head)}e.status=globalStatusCode[a]=STATUS.LOADING;if(u){e.timeoutId=setTimeout((function(){if(e.status<STATUS.READY){e.status=STATUS.TIMEOUT}}),u)}};if(s){e.status=STATUS.WAITING;setTimeout(f,s)}else{f()}};this.onLoad=function(){if(e.status!==STATUS.TIMEOUT){var t=e,r=t.src,n=t.isOnce,i=t.isReady,s=t.timeout,a=t.timeoutId;clearTimeout(a);if(n)globalStatusCode[r]=STATUS.LOADED;e.status=STATUS.LOADED;awaitScriptReady(i||function(){return true},s).then((function(){return e.status=STATUS.READY})).catch((function(t){return console.error("awaitScriptReady",t)}))}}}t.prototype.onError=function(t){this.errorMsg=ERROR_MESSAGE[t]};t.prototype.onStatus=function(t,e){if(t===e)return;var r=this,n=r.error,i=r.errorMsg,s=r.isOnce,a=r.src,o=r.timeoutId,c=r.host;if(o&&t>=STATUS.READY){clearTimeout(o)}if(s&&t>=STATUS.LOADING&&t>statusOfGlobalScript(a)){globalStatusCode[a]=t}var u={status:STATUS_NAME[t],code:t,error:n,errorMsg:i,id:c.id,src:a};this.statusMsg=STATUS_NAME[t];this.pengscript.emit(u)};t.prototype.componentWillLoad=function(){this.src=this.srcProd};t.prototype.componentDidLoad=function(){var t=this,e=t.trigger,r=t.isOnce,n=t.onTrigger,i=t.src,s=t.host;var a;switch(true){case e==="now":{a=n;break}case e==="lazy":{a=function(){return newIntersectionObserver(n).observe(s)};break}case typeof e==="function":{a=e;break}}if(a){a(n)}if(r&&isScriptOnPage(i)){if(statusOfGlobalScript(i)<STATUS.LOADING){globalStatusCode[i]=STATUS.LOADING}this.status=statusOfGlobalScript(i)}};t.prototype.render=function(){var t=this,e=t.isIframe,r=t.src,n=t.isGlobal,i=t.props,s=t.trigger,a=t.onLoad,o=t.showWhen,c=t.status,u=t.statusMsg,f=t.isOnce;var l;var S=STATUS[String(o).toUpperCase()]||STATUS.LOADED;if(!n&&c>STATUS.WAITING&&!(f&&isScriptOnPage(r))){var p=e?"iframe":"script";var T=Object.assign({src:r,onLoad:a},parseJSON(i));l=h(p,Object.assign({},T))}var d={onClick:s==="click"&&this.onTrigger};var g=c>=S&&c!==STATUS.TIMEOUT;return h(Host,Object.assign({},d),h("div",{"data-script-status":u,class:"facade-placeholder-content",hidden:g},h("slot",null)),h("div",{"data-script-status":u,class:"facade-scripted-content",hidden:!g},l))};Object.defineProperty(t.prototype,"host",{get:function(){return getElement(this)},enumerable:false,configurable:true});Object.defineProperty(t,"watchers",{get:function(){return{error:["onError"],status:["onStatus"]}},enumerable:false,configurable:true});return t}();function isScriptOnPage(t){return statusOfGlobalScript(t)>=STATUS.TRIGGERED||Boolean(document.querySelector('script[src^="'+t+'"]'))}function parseJSON(t){try{return(typeof t==="object"?t:t&&JSON.parse(t))||{}}catch(e){console.error("Error parsing props JSON",e,"JSON:",t);return undefined}}function createElement(t,e,r){if(e===void 0){e={}}var n=document.createElement(t);Object.keys(e).forEach((function(t){var r=e[t];n.hasOwnProperty(t)||typeof r==="function"||(r=typeof r==="object"&&i(r)||r)?n[t]=r:n.setAttribute(t,r)}));if(r)r.appendChild(n);function i(t){try{return JSON.stringify(t)}catch(e){return undefined}}}function statusOfGlobalScript(t){return globalStatusCode[t]||STATUS.IDLE}function newIntersectionObserver(t){return new IntersectionObserver((function(e,r){var n=e[0];if(n.isIntersecting){r.disconnect();t()}}))}function awaitScriptReady(t,e,r){if(r===void 0){r=200}return __awaiter(this,void 0,void 0,(function(){return __generator(this,(function(n){return[2,new Promise((function(n,i){var s;var a=setInterval((function(){if(t()){clearTimeout(s);clearInterval(a);n()}}),parseInt(r)||200);if(e){s=setTimeout((function(){clearInterval(a);i("timeout")}),parseInt(e)||3e4)}}))]}))}))}export{FacadeScript as facade_script};