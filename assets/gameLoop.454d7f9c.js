import{_ as d,s as u,p as e,a as f,l as T,D as a,b as m,g as p}from"./index.45a84f66.js";import"./vue.22e8a43a.js";import{b2 as c}from"./@vue.6f8187b0.js";/* empty css                    */import"./lz-string.bfbf8ec3.js";import"./nanoevents.1080beb7.js";import"./vue-next-select.a1cf2b05.js";import"./vuedraggable.5c0b18ba.js";import"./sortablejs.7b372b24.js";import"./vue-textarea-autosize.35804eaf.js";import"./vue-toastification.c0cb95b5.js";let n=null,l=null;function o(){const t=Date.now();let i=(t-e.time)/1e3;e.time=t;const r=i;if(f.lastTenTicks.push(r),f.lastTenTicks.length>10&&(f.lastTenTicks=f.lastTenTicks.slice(1)),!((l==null?void 0:l.value)&&!e.keepGoing)&&!f.hasNaN&&(i=Math.max(i,0),e.devSpeed!==0)){if(T.value=!1,e.offlineTime!=null){if(a.gt(e.offlineTime,m.offlineLimit*3600)&&(e.offlineTime=m.offlineLimit*3600),a.gt(e.offlineTime,0)&&e.devSpeed!==0){const s=Math.max(e.offlineTime/10,i);e.offlineTime=e.offlineTime-s,i+=s}else e.devSpeed===0&&(e.offlineTime+=i);(!e.offlineProd||a.lt(e.offlineTime,0))&&(e.offlineTime=null)}i=Math.min(i,m.maxTickLength),e.devSpeed!=null&&(i*=e.devSpeed),Number.isFinite(i)||(i=1e308),!a.eq(i,0)&&(e.timePlayed+=i,Number.isFinite(e.timePlayed)||(e.timePlayed=1e308),p.emit("update",i,r),u.unthrottled?(requestAnimationFrame(o),n!=null&&(clearInterval(n),n=null)):n==null&&(n=setInterval(o,50)))}}async function L(){l=(await d(()=>import("./index.45a84f66.js").then(function(t){return t.c}),["assets/index.45a84f66.js","assets/index.0082bab1.css","assets/@fontsource.f66d05e7.css","assets/vue.22e8a43a.js","assets/lz-string.bfbf8ec3.js","assets/@vue.6f8187b0.js","assets/nanoevents.1080beb7.js","assets/vue-next-select.a1cf2b05.js","assets/vue-next-select.9e6f4164.css","assets/vuedraggable.5c0b18ba.js","assets/sortablejs.7b372b24.js","assets/vue-textarea-autosize.35804eaf.js","assets/vue-toastification.c0cb95b5.js","assets/vue-toastification.4b5f8ac8.css"])).hasWon,c(l,t=>{t&&p.emit("gameWon")}),u.unthrottled?requestAnimationFrame(o):n=setInterval(o,50)}export{L as startGameLoop};