import{a as v,r as h,c as p}from"./index-DCPXjMI8.js";const g={some:0,all:1};function k(n,o,{root:c,margin:a,amount:t="some"}={}){const i=v(n),s=new WeakMap,u=f=>{f.forEach(e=>{const d=s.get(e.target);if(e.isIntersecting!==!!d)if(e.isIntersecting){const l=o(e);typeof l=="function"?s.set(e.target,l):r.unobserve(e.target)}else typeof d=="function"&&(d(e),s.delete(e.target))})},r=new IntersectionObserver(u,{root:c,rootMargin:a,threshold:typeof t=="number"?t:g[t]});return i.forEach(f=>r.observe(f)),()=>r.disconnect()}function I(n,{root:o,margin:c,amount:a,once:t=!1}={}){const[i,s]=h.useState(!1);return h.useEffect(()=>{if(!n.current||t&&i)return;const u=()=>(s(!0),t?void 0:()=>s(!1)),r={root:o&&o.current||void 0,margin:c,amount:a};return k(n.current,u,r)},[o,n,c,t,a]),i}/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const E=p("House",[["path",{d:"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8",key:"5wwlr5"}],["path",{d:"M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",key:"1d0kgt"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const M=p("Stethoscope",[["path",{d:"M11 2v2",key:"1539x4"}],["path",{d:"M5 2v2",key:"1yf1q8"}],["path",{d:"M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1",key:"rb5t3r"}],["path",{d:"M8 15a6 6 0 0 0 12 0v-3",key:"x18d4x"}],["circle",{cx:"20",cy:"10",r:"2",key:"ts1r5v"}]]);export{E as H,M as S,I as u};
