import e,{useState as t}from"react";import*as n from"yup";function r(t){const n={required:s(t).required,filter:s(t).filter,search:s(t).search,pagination:s(t).pagination},r={filter:t&&t.filter||{},required:t&&t.required||{},search:"",pagination:t&&t.pagination||{page:1,size:10}};let[o,i]=e.useState(n),[a,u]=e.useState(r);function s(e){return{required:e&&e.required?l(e.required.value):"",filter:e&&e.filter?l(e.filter.value):"",search:e&&e.search?l(e.search.value):"",pagination:e&&e.pagination?l(e.pagination):"page=1&size=10"}}function c(e){return null!==e&&"object"==typeof e}function l(e){if(!e)return"";const t=[];return function e(n,r){if(void 0===r&&(r=""),!c(n))return t.push(r+"="+encodeURIComponent(n));const o=Object.keys(n);for(let t of o)if(c(n)){let o=r?Array.isArray(n)?"[]":"["+t+"]":""+t;e(n[t],r+o)}return n}(e),t.join("&")}function f(){let e="",t=Object.keys(o);for(let r of t)e=e?e+((n=o[r])?"&"+n:n):o[r];var n;return e}function g(e){u(t=>({...JSON.parse(JSON.stringify(t)),pagination:e}))}return{query:o,toolState:a,fullReset:function(){i(n),u(r)},getQuery:f,getQueryString:function(){return f()},handleFilter:function(e){var t;i(t=>({...JSON.parse(JSON.stringify(t)),filter:l(e.value),pagination:"page=1&size=10"})),t=e,u(e=>({...JSON.parse(JSON.stringify(e)),filter:t})),g({page:1,size:10})},handlePagination:function(e,t){void 0===e&&(e=1),void 0===t&&(t=10),i(n=>({...JSON.parse(JSON.stringify(n)),pagination:l({page:e,size:t})})),g({page:e,size:t})},handleSearch:function(e){i(t=>({...JSON.parse(JSON.stringify(t)),search:l(e.value),pagination:"page=1&size=10"})),g({page:1,size:10})},handleRequired:function(e){var t;i(t=>({...JSON.parse(JSON.stringify(t)),required:l(e.value),pagination:"page=1&size=10"})),t=e,u(e=>({...JSON.parse(JSON.stringify(e)),required:t})),g({page:1,size:10})}}}function o(e,t){try{var n=e()}catch(e){return t(e)}return n&&n.then?n.then(void 0,t):n}Object.byString=function(e,t){let n=(t=(t=t.replace(/\[(\w+)\]/g,".$1")).replace(/^\./,"")).split(".");for(let t=0,r=n.length;t<r;++t){let r=n[t];if(!(r in e))return;e=e[r]}return e};const i=(t,r)=>{const[i,a]=e.useState(t),[u,s]=e.useState({}),[c,l]=e.useState(!1),f=()=>{a(t),s({})},g=(e,t)=>{const n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(const r of n){const n=e[r],i=t[r],a=null!==(o=n)&&"object"==typeof o;if(!a&&n!==i)return!1;if(a&&!g(n,i))return!1}var o;return!0};return e.useEffect(()=>{console.log("datamodel",i),console.log("validation error:",u)},[i,u]),e.useEffect(()=>{},[]),{dataModel:i,validationErrors:u,isBusy:c,handleChange:e=>{let{field:t,value:c}=e;const l={...i};l[t]=c,a(l),function(e,t){try{const i={...u},a=function(a,u){try{var s=o(function(){const o=n.reach(r,e);return Promise.resolve(o.validate(t)).then(function(){delete i[e]})},function(t){i[e]=t.message})}catch(e){return u(!0,e)}return s&&s.then?s.then(u.bind(null,!1),u.bind(null,!0)):u(!1,s)}(0,function(e,t){if(s(i),e)throw t;return t});return Promise.resolve(a&&a.then?a.then(function(){}):void 0)}catch(e){return Promise.reject(e)}}(t,c)},handleSubmit:function(e,t,n,a){void 0===n&&(n=!0);try{return e.preventDefault(),Promise.resolve(function(){try{const e={abortEarly:!1},t={};return Promise.resolve(o(function(){return Promise.resolve(r.validate(i,e)).then(function(){return null})},function(e){return e.inner.forEach(e=>{t[e.path]=e.message}),t}))}catch(e){return Promise.reject(e)}}()).then(function(r){function a(){l(!1)}if(r)return s(r);const u=o(function(){return l(!0),Promise.resolve(new Promise(function(r,a){try{return Promise.resolve(o(function(){return Promise.resolve(t(i,e)).then(function(){return n&&f(),r()})},function(e){return a(e)}))}catch(e){return Promise.reject(e)}})).then(function(){})},function(e){console.log(e)});return u&&u.then?u.then(a):a()})}catch(e){return Promise.reject(e)}},initiateDataModel:function(e){a(e)},isFormValid:()=>0===Object.keys(u).length,resetForm:f,hasUnsavedData:()=>!g(t,i)}},a=()=>{const[t,n]=e.useState(!1);return{isOpen:t,toggle:()=>{n(e=>!e)}}},u={currentPage:1,hasNextPage:!1,hasPrevPage:!1,nextPage:null,prevPage:null,size:10,totalPages:0,totalResults:0},s=()=>{const[e,n]=t(u);return{pagination:e,updatePaginaion:function(e){if(void 0===e&&(e=u),"number"!=typeof e.currentPage)throw new Error("currentPage must be a number");if("boolean"!=typeof e.hasNextPage)throw new Error("currentPage must be a number");if("boolean"!=typeof e.hasPrevPage)throw new Error("hasPrevPage must be a boolean");if("number"!=typeof e.nextPage&&null!==e.nextPage)throw new Error("nextPage must be a number or null");if("number"!=typeof e.prevPage&&null!==e.prevPage)throw new Error("prevPage must be a number or null");if("number"!=typeof e.size)throw new Error("size must be a number");if("number"!=typeof e.totalPages)throw new Error("totalPages must be a number");if("number"!=typeof e.totalResults)throw new Error("totalResults must be a number");n(e)}}},c=t=>{let n={};t.forEach(e=>{n[e.action]={status:e.status,id:null}});let[r,o]=e.useState(n);return{processing:r,dispatch:e=>{o(t=>{let n=Object.keys(e)[0],r=Object.values(e)[0],o={...t};return o[n]=r,o})}}},l=()=>{const[t,n]=e.useState(!1),r=e.useRef(null);return{contentElementReference:r,copySuccess:t,copyFormatedToClipboard:function(){try{const e=function(){if(r.current){const e=function(){if(navigator.clipboard){function e(){setTimeout(()=>n(!1),2500)}const t=function(e,t){try{var o=Promise.resolve(navigator.clipboard.write([new ClipboardItem({"text/html":new Blob([r.current.innerHTML],{type:"text/html"})})])).then(function(){n(!0),console.log("Contentns copied.")})}catch(e){return t(e)}return o&&o.then?o.then(void 0,t):o}(0,function(e){console.log("Error copying to clipboard."),console.log(e)});return t&&t.then?t.then(e):e()}}();if(e&&e.then)return e.then(function(){})}}();return Promise.resolve(e&&e.then?e.then(function(){}):void 0)}catch(e){return Promise.reject(e)}},copyPlainTextToClipBoard:function(e,t){try{const t=function(){if(navigator.clipboard)return n(!0),Promise.resolve(navigator.clipboard.writeText(e)).then(function(){setTimeout(()=>n(!1),2500)})}();return Promise.resolve(t&&t.then?t.then(function(){}):void 0)}catch(e){return Promise.reject(e)}}}};export{r as useBuildQueryString,l as useClipboard,a as useDualStateController,i as useForm,s as usePaginationState,c as useProcessing};
//# sourceMappingURL=index.modern.js.map
