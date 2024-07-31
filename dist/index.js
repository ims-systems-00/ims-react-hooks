var e=require("react"),t=require("yup");function n(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}function r(e){if(e&&e.__esModule)return e;var t=Object.create(null);return e&&Object.keys(e).forEach(function(n){if("default"!==n){var r=Object.getOwnPropertyDescriptor(e,n);Object.defineProperty(t,n,r.get?r:{enumerable:!0,get:function(){return e[n]}})}}),t.default=e,t}var o=/*#__PURE__*/n(e),i=/*#__PURE__*/r(t);function u(e,t){try{var n=e()}catch(e){return t(e)}return n&&n.then?n.then(void 0,t):n}Object.byString=function(e,t){let n=(t=(t=t.replace(/\[(\w+)\]/g,".$1")).replace(/^\./,"")).split(".");for(let t=0,r=n.length;t<r;++t){let r=n[t];if(!(r in e))return;e=e[r]}return e};const a={currentPage:1,hasNextPage:!1,hasPrevPage:!1,nextPage:null,prevPage:null,size:10,totalPages:0,totalResults:0};exports.useBuildQueryString=function(e){const t={required:s(e).required,filter:s(e).filter,search:s(e).search,pagination:s(e).pagination},n={filter:e&&e.filter||{},required:e&&e.required||{},search:e&&e.search||{},pagination:e&&e.pagination||{page:1,size:10}};let[r,i]=o.default.useState(t),[u,a]=o.default.useState(n);function s(e){return{required:e&&e.required?c(e.required.value):"",filter:e&&e.filter?c(e.filter.value):"",search:e&&e.search?c(e.search.value):"",pagination:c(e&&e.pagination?e.pagination:{page:1,size:10})}}function l(e){return null!==e&&"object"==typeof e}function c(e){if(!e)return"";const t=[];return function e(n,r){if(void 0===r&&(r=""),!l(n))return t.push(r+"="+encodeURIComponent(n));const o=Object.keys(n);for(let t of o)if(l(n)){let o=r?Array.isArray(n)?"[]":"["+t+"]":""+t;e(n[t],r+o)}return n}(e),t.join("&")}function f(){let e="",t=Object.keys(r);for(let o of t)e=e?e+((n=r[o])?"&"+n:n):r[o];var n;return e}function g(e){a(t=>({...JSON.parse(JSON.stringify(t)),pagination:e}))}return{query:r,toolState:u,fullReset:function(){i(t),a(n)},getQuery:f,getQueryString:function(){return f()},handleFilter:function(e){var t,n;i(t=>{var n;return{...JSON.parse(JSON.stringify(t)),filter:c(e.value),pagination:c({page:1,size:null==u||null==(n=u.pagination)?void 0:n.size})}}),n=e,a(e=>({...JSON.parse(JSON.stringify(e)),filter:n})),g({page:1,size:null==u||null==(t=u.pagination)?void 0:t.size})},handlePagination:function(e,t){void 0===e&&(e=1),void 0===t&&(t=10),i(n=>({...JSON.parse(JSON.stringify(n)),pagination:c({page:e,size:t})})),g({page:e,size:t})},handleSearch:function(e){var t,n;i(t=>{var n;return{...JSON.parse(JSON.stringify(t)),search:c(e.value),pagination:c({page:1,size:null==u||null==(n=u.pagination)?void 0:n.size})}}),n=e,a(e=>({...JSON.parse(JSON.stringify(e)),search:n})),g({page:1,size:null==u||null==(t=u.pagination)?void 0:t.size})},handleRequired:function(e){var t;i(t=>{var n;return{...JSON.parse(JSON.stringify(t)),required:c(e.value),pagination:c({page:1,size:null==u||null==(n=u.pagination)?void 0:n.size})}}),t=e,a(e=>({...JSON.parse(JSON.stringify(e)),required:t})),g({page:1,size:10})}}},exports.useClipboard=()=>{const[e,t]=o.default.useState(!1),n=o.default.useRef(null);return{contentElementReference:n,copySuccess:e,copyFormatedToClipboard:function(){try{const e=function(){if(n.current){const e=function(){if(navigator.clipboard){function e(){setTimeout(()=>t(!1),2500)}const r=function(e,r){try{var o=Promise.resolve(navigator.clipboard.write([new ClipboardItem({"text/html":new Blob([n.current.innerHTML],{type:"text/html"})})])).then(function(){t(!0),console.log("Contentns copied.")})}catch(e){return r(e)}return o&&o.then?o.then(void 0,r):o}(0,function(e){console.log("Error copying to clipboard."),console.log(e)});return r&&r.then?r.then(e):e()}}();if(e&&e.then)return e.then(function(){})}}();return Promise.resolve(e&&e.then?e.then(function(){}):void 0)}catch(e){return Promise.reject(e)}},copyPlainTextToClipBoard:function(e,n){try{const n=function(){if(navigator.clipboard)return t(!0),Promise.resolve(navigator.clipboard.writeText(e)).then(function(){setTimeout(()=>t(!1),2500)})}();return Promise.resolve(n&&n.then?n.then(function(){}):void 0)}catch(e){return Promise.reject(e)}}}},exports.useDualStateController=()=>{const[e,t]=o.default.useState(!1);return{isOpen:e,toggle:()=>{t(e=>!e)}}},exports.useForm=(e,t)=>{const[n,r]=o.default.useState(e),[a,s]=o.default.useState({}),[l,c]=o.default.useState(!1),f=()=>{r(e),s({})},g=(e,t)=>{const n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(const r of n){const n=e[r],i=t[r],u=null!==(o=n)&&"object"==typeof o;if(!u&&n!==i)return!1;if(u&&!g(n,i))return!1}var o;return!0};return o.default.useEffect(()=>{console.log("datamodel",n),console.log("validation error:",a)},[n,a]),o.default.useEffect(()=>{},[]),{dataModel:n,validationErrors:a,isBusy:l,handleChange:e=>{let{field:o,value:l}=e;const c={...n};c[o]=l,r(c),function(e,n){try{const r={...a},o=function(o,a){try{var s=u(function(){const o=i.reach(t,e);return Promise.resolve(o.validate(n)).then(function(){delete r[e]})},function(t){r[e]=t.message})}catch(e){return a(!0,e)}return s&&s.then?s.then(a.bind(null,!1),a.bind(null,!0)):a(!1,s)}(0,function(e,t){if(s(r),e)throw t;return t});return Promise.resolve(o&&o.then?o.then(function(){}):void 0)}catch(e){return Promise.reject(e)}}(o,l)},handleSubmit:function(e,r,o,i){void 0===o&&(o=!0);try{return e.preventDefault(),Promise.resolve(function(){try{const e={abortEarly:!1},r={};return Promise.resolve(u(function(){return Promise.resolve(t.validate(n,e)).then(function(){return null})},function(e){return e.inner.forEach(e=>{r[e.path]=e.message}),r}))}catch(e){return Promise.reject(e)}}()).then(function(t){function i(){c(!1)}if(t)return s(t);const a=u(function(){return c(!0),Promise.resolve(new Promise(function(t,i){try{return Promise.resolve(u(function(){return Promise.resolve(r(n,e)).then(function(){return o&&f(),t()})},function(e){return i(e)}))}catch(e){return Promise.reject(e)}})).then(function(){})},function(e){console.log(e)});return a&&a.then?a.then(i):i()})}catch(e){return Promise.reject(e)}},initiateDataModel:function(e){r(e)},isFormValid:()=>0===Object.keys(a).length,resetForm:f,hasUnsavedData:()=>!g(e,n)}},exports.usePaginationState=()=>{const[t,n]=e.useState(a);return{pagination:t,updatePaginaion:function(e){if(void 0===e&&(e=a),"number"!=typeof e.currentPage)throw new Error("currentPage must be a number");if("boolean"!=typeof e.hasNextPage)throw new Error("currentPage must be a number");if("boolean"!=typeof e.hasPrevPage)throw new Error("hasPrevPage must be a boolean");if("number"!=typeof e.nextPage&&null!==e.nextPage)throw new Error("nextPage must be a number or null");if("number"!=typeof e.prevPage&&null!==e.prevPage)throw new Error("prevPage must be a number or null");if("number"!=typeof e.size)throw new Error("size must be a number");if("number"!=typeof e.totalPages)throw new Error("totalPages must be a number");if("number"!=typeof e.totalResults)throw new Error("totalResults must be a number");n(e)}}},exports.useProcessing=e=>{let t={};e.forEach(e=>{t[e.action]={status:e.status,id:null}});let[n,r]=o.default.useState(t);return{processing:n,dispatch:e=>{r(t=>{let n=Object.keys(e)[0],r=Object.values(e)[0],o={...t};return o[n]=r,o})}}};
//# sourceMappingURL=index.js.map
