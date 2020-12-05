function isMobile(){return window.screen.width<=720}function createSnackbar(){$(document.body).append('\n    <div class="mdc-snackbar">\n      <div class="mdc-snackbar__surface">\n        <div class="mdc-snackbar__label" role="status" aria-live="polite"></div>\n        <div class="mdc-snackbar__actions">\n          <button type="button" class="mdc-button mdc-snackbar__action">\n            <div class="mdc-button__ripple"></div>\n            <span class="mdc-button__label">关闭</span>\n          </button>\n        </div>\n      </div>\n    </div>\n  ');const e=new mdc.snackbar.MDCSnackbar($(".mdc-snackbar")[0]);return(t,a=2e3)=>{e.labelText=t,e.open(),setTimeout(()=>e.close(),a)}}function initAppBar(){if(new mdc.topAppBar.MDCTopAppBar($(".mdc-top-app-bar")[0]),isMobile()){$(".mdc-top-app-bar").css("transition","all 0.2s");let e=0;$(window).on("scroll",()=>{window.scrollY<100?$(".mdc-top-app-bar").css("transform","translateY(0)"):e<window.scrollY?$(".mdc-top-app-bar").css("transform","translateY(-66px)"):$(".mdc-top-app-bar").css("transform","translateY(0)"),e=window.scrollY})}}$(()=>{!isMobile()&&$(document.body).css("min-width",1100);const e=createSnackbar(),t=createDrawer();initAppBar(),$(".headerSearchBar > input").on("focus",()=>$(".headerSearchBar").addClass("is-focused")).on("blur",()=>$(".headerSearchBar").removeClass("is-focused")),$(".materialRipple").addClass("mdc-ripple-surface").each((e,t)=>mdc.ripple.MDCRipple.attachTo(t)),$("#drawerButton").click(()=>t.source.opened?t.close():t.open()),$(".mdc-tab-bar").each((e,t)=>new mdc.tabBar.MDCTabBar(t)),initContents(),(()=>{const e=$(".katakoto-items"),t=e.find(".katakoto-item").length-1;let a=0;setInterval(()=>{a++,a>t&&(a=0),e.css("transform",`translateX(-${270*a}px)`)},4e3)})(),$(".mdc-tooltip").each((e,t)=>{new mdc.tooltip.MDCTooltip(t).foundation.hideDelayMs=0}),$("#articleLink").click(()=>{const t=$("<input>").val($("#articleLink").text());t.css("position","fixed").css("left","-9999px"),$(document.body).append(t),t.focus(),document.execCommand("selectAll"),document.execCommand("copy"),setTimeout(()=>t.remove(),1e3),e("已复制链接")}),initSearchModal(),$(".backTopButton").click(()=>window.scrollTo({top:0,behavior:"smooth"})),$(window).on("scroll",()=>{window.scrollY>300?$(".backTopButton").removeClass("is-hide"):$(".backTopButton").addClass("is-hide")}),new Valine({el:"#post-comments",appId:"Ul5NbwoIVOstKoK9Bwv36u4D-gzGzoHsz",appKey:"FMzTWsKMYHIu83jzJwUkLwgQ",placeholder:"说点什么吧..."}),setTimeout(()=>{location.hash&&window.scrollTo(0,window.scrollY-60)},1e3),document.querySelector(".page-post").querySelectorAll("img").forEach(e=>{const t=Object.fromEntries(["zoomIn","zoomOut","oneToOne","reset","rotateLeft","rotateRight","flipHorizontal","flipVertical"].map(e=>[e,3]));new Viewer(e,{title:!1,navbar:!1,toolbar:t})})});class MyDrawer{constructor(e,t={}){this.opened=!1,this.el=e,this.options=t,this.el.style.transition="all 0.3s"}open(){this.opened=!0,this.el.style.marginLeft=0}close(){this.opened=!1,this.el.style.marginLeft="-265px"}}function createDrawer(){const e=new MyDrawer($(".drawer-body")[0]),t=new MyDrawer($(".drawer-placeholder")[0]);function a(){e.close(),t.close(),isMobile()&&o.removeClass("is-active")}const o=$('<div class="drawer-mask">').click(a);$(".page-drawer").append(o);return{source:e,open:function(){e.open(),t.open(),isMobile()&&o.addClass("is-active")},close:a}}function initContents(){if(0!==$(".page-post").length){const t=[],a=[0,0];let o=2;$(".post-body--content > .contentContainer > h2, .post-body--content > .contentContainer > h3").each((e,n)=>{const s=parseInt(n.tagName.replace("H",""));2===s&&(a[0]++,a[1]=0),3===s&&a[1]++,o=s,t.push({id:n.id,name:$(n).text(),level:parseInt(n.tagName.replace("H","")),number:a.join(".").replace(".0",""),offset:n.getBoundingClientRect().top})}),t.forEach(e=>{const t=$(`<a class="articleContents-item com-textLimit" data-level="${e.level}" href="${"#"+e.id}">- ${e.number} ${e.name}</a>`).click(t=>{t.preventDefault(),document.getElementById(e.id).scrollIntoView(),window.scrollTo(0,window.scrollY-56),window.history.replaceState({},"",location.href.replace(/#[^\/]+$/,"")+"#"+e.id)});$(".articleContents").append(t)});const n=$(".articleContents > .articleContents-item");function e(){n.removeClass("is-active"),window.scrollY<t[0].offset?n.eq(0).addClass("is-active"):window.scrollY>t[t.length-1].offset?n.eq(n.length-1).addClass("is-active"):t.forEach((e,a)=>{window.scrollY>e.offset&&window.scrollY<t[a+1].offset&&n.eq(a).addClass("is-active")})}e(),$(window).on("scroll",e)}}function initSearchModal(){let e=[];const t=()=>0===e.length&&$.get("/search.json").then(t=>e=t.posts.map(e=>({...e,categories:e.categories.map(e=>e.name),tags:e.tags.map(e=>e.name)})));t(),$("#searchButton").click(()=>{$(".page-search").fadeIn(300),$(".search-body").animate({top:40,opacity:1},300),t()}),$(".page-search").click((function(e){e.target===this&&($(".search-body").animate({top:0,opacity:0},300,()=>$(".page-search").hide()),setTimeout(()=>{$(".search-result").empty(),$(".search-input").val("")},300))})),$(".search-input").on("input",t=>{$(".search-result").attr("data-dirty","true");const a=t.target.value.trim().toLowerCase(),o=e.filter(e=>""!==a&&(e.title.toLowerCase().indexOf(a)>=0||(!!(e.excerpt&&e.excerpt.toLowerCase().indexOf(a)>=0)||(!!(e.categories&&e.categories.join("|").toLowerCase().indexOf(a)>=0)||!!(e.tags&&e.tags.join("|").toLowerCase().indexOf(a)>=0)))));$(".search-result").attr("data-emptyResult",(0===o.length).toString());const n=o.map(e=>`\n      <a class="search-result--item" href="/${e.path}">\n        <div class="title">${e.title}</div>\n        <div class="excerpt">${e.excerpt}</div>\n        <div class="footer flex-row flex-cross-center">\n          ${e.categories,""}\n          ${e.tags?`\n            <div class="tags">\n              ${e.tags.map(e=>`\n                <div class="tag flex-row-inline flex-cross-center">\n                  <i class="material-icons">local_offer</i>\n                  <span>${e}</span>\n                </div>\n              `).join("")}\n            </div>\n          `:""}\n        </div>\n      </a>\n    `);$(".search-result").empty().append(n)})}