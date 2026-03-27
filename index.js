import{a as L,S as w,i}from"./assets/vendor-SA7bT8CU.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const n of e)if(n.type==="childList")for(const c of n.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&l(c)}).observe(document,{childList:!0,subtree:!0});function o(e){const n={};return e.integrity&&(n.integrity=e.integrity),e.referrerPolicy&&(n.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?n.credentials="include":e.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function l(e){if(e.ep)return;e.ep=!0;const n=o(e);fetch(e.href,n)}})();const S="55202338-7fca1a1810bad0a3b47ced76b";function u(r){return L.get("https://pixabay.com/api/",{params:{key:S,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0}}).then(t=>t.data)}const f=document.querySelector(".gallery"),m=document.querySelector(".loader"),v=new w(".gallery a");function h(r){const t=r.map(o=>`
      <li class="gallery-item">
        <a href="${o.largeImageURL}">
          <img src="${o.webformatURL}" alt="${o.tags}" />
        </a>
        <div class="info">
          <p><b>Likes</b> ${o.likes}</p>
          <p><b>Views</b> ${o.views}</p>
          <p><b>Comments</b> ${o.comments}</p>
          <p><b>Downloads</b> ${o.downloads}</p>
        </div>
      </li>
    `).join("");f.insertAdjacentHTML("beforeend",t),v.refresh()}function q(){f.innerHTML=""}function y(){m.classList.remove("hidden")}function p(){m.classList.add("hidden")}function B(){document.querySelector(".load-more").classList.remove("hidden")}function g(){document.querySelector(".load-more").classList.add("hidden")}const d=document.querySelector(".form"),M=document.querySelector(".load-more");let a="",s=1,b=0;d.addEventListener("submit",async r=>{if(r.preventDefault(),a=r.target.elements["search-text"].value.trim(),!!a){s=1,q(),g(),y();try{const t=await u(a,s);if(t.hits.length===0){i.error({message:"Sorry, there are no images matching your search query. Please try again!"});return}b=t.totalHits,h(t.hits),B()}catch{i.error({message:"Something went wrong!"})}finally{p(),d.reset()}}});M.addEventListener("click",async()=>{s+=1,y();try{const r=await u(a,s);h(r.hits),s*15>=b&&(g(),i.info({message:"We're sorry, but you've reached the end of search results."}));const t=document.querySelector(".gallery-item"),{height:o}=t.getBoundingClientRect();window.scrollBy({top:o*2,behavior:"smooth"})}catch{i.error({message:"Something went wrong!"})}finally{p()}});
//# sourceMappingURL=index.js.map
