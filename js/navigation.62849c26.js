(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["navigation"],{"05ad":function(t,i,s){"use strict";s("2647")},1600:function(t,i,s){"use strict";s("34de")},1878:function(t,i,s){},2647:function(t,i,s){},"34de":function(t,i,s){},"74ae":function(t,i,s){"use strict";s.r(i);var e=function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("div",{class:{navigation:!0,"common-page":!0,"mask-on":t.addWindowShow}},[s("transition",{attrs:{name:"fade"}},[t.addWindowShow?s("div",{staticClass:"general-window-mask",on:{click:function(i){return i.target!==i.currentTarget?null:t.showAdd()}}},[s("div",{staticClass:"general-window"},[s("span",{staticClass:"header-title"},[t._v("添加网址")]),s("span",{staticClass:"tip"},[t._v("名称")]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.editing.title,expression:"editing.title"}],attrs:{type:"text",name:"title",id:"title",placeholder:"名称"},domProps:{value:t.editing.title},on:{input:function(i){i.target.composing||t.$set(t.editing,"title",i.target.value)}}}),s("span",{staticClass:"tip"},[t._v("URL")]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.editing.url,expression:"editing.url"}],attrs:{type:"text",name:"url",id:"url",placeholder:"URL"},domProps:{value:t.editing.url},on:{input:function(i){i.target.composing||t.$set(t.editing,"url",i.target.value)}}}),s("span",{staticClass:"tip"},[t._v("图标")]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.editing.icon,expression:"editing.icon"}],attrs:{type:"text",name:"icon",id:"icon",placeholder:"图标URL"},domProps:{value:t.editing.icon},on:{input:function(i){i.target.composing||t.$set(t.editing,"icon",i.target.value)}}}),s("span",{staticClass:"tip"},[t._v("主色调")]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.editing.color,expression:"editing.color"}],attrs:{type:"text",name:"color",id:"icon",placeholder:"格式:#AABBCC"},domProps:{value:t.editing.color},on:{input:function(i){i.target.composing||t.$set(t.editing,"color",i.target.value)}}}),s("button",{staticClass:"submit-button",on:{click:function(i){return t.addNewFavor()}}},[t._v("提交")])])]):t._e()]),s("div",{staticClass:"list-header"},[s("span",{staticClass:"title"},[t._v("我的收藏")]),s("button",{staticClass:"icon-button",on:{click:function(i){return t.showModify()}}},[s("span",{class:{iconfont:!0,"icon-edit-2":!t.modifyShow,"icon-check":t.modifyShow}}),s("span",{staticClass:"tip"},[t._v(t._s(t.modifyShow?"完成":"编辑"))])])]),s("div",{staticClass:"nav-list"},[t._l(t.navs.favorites,(function(i,e){return s("a",{key:e,class:{"nav-item":!0,"ef-float":!0,"nav-item-wide":t.testSubsites(i.attributes)},attrs:{href:i.attributes.url,target:"_blank"}},[s("div",{class:{left:!0,"left-wide":t.testSubsites(i.attributes)}},[s("div",{staticClass:"top"},[s("div",{staticClass:"icon-area",style:"background-color: "+i.attributes.color},[s("img",{class:{icon:!0,"icon-no-padding":i.attributes.no_padding},attrs:{src:t.getIcon(i),alt:"",srcset:""}})]),s("transition",{attrs:{name:"fade"}},[t.modifyShow?s("div",{class:{"btn-modify":!0,"remove-favor":!0,"ef-pudding":!0,"icon-button":!0},on:{click:function(i){return i.preventDefault(),t.removeFavor(e)}}},[s("span",{staticClass:"iconfont icon-trash"})]):t._e()])],1),s("span",{staticClass:"title fix-text-overflow",domProps:{textContent:t._s(i.attributes.title)}})]),t.testSubsites(i.attributes)?s("div",{staticClass:"subsites-list"},t._l(i.attributes.subsites.data,(function(i,e){return s("a",{key:e,staticClass:"subsite-item",attrs:{href:i.attributes.url,target:"_blank"}},[s("span",{staticClass:"title fix-text-overflow",domProps:{textContent:t._s(i.attributes.title)}})])})),0):t._e()])})),s("transition",{attrs:{name:"fade"}},[t.modifyShow?s("div",{staticClass:"nav-item ef-float add-nav",on:{click:function(i){return t.showAdd()}}},[s("span",{staticClass:"iconfont icon-add"}),s("span",{staticClass:"tip"},[t._v("自定义")])]):t._e()])],2),t._l(t.navs.others,(function(i,e){return s("div",{key:e,staticClass:"nav-block"},[s("div",{staticClass:"list-header"},[s("span",{staticClass:"title",domProps:{textContent:t._s(i.attributes.name)}})]),null!=i.attributes.sites.data?s("div",{staticClass:"nav-list"},t._l(i.attributes.sites.data,(function(i,e){return s("a",{key:e,class:{"nav-item":!0,"ef-float":!0,"nav-item-wide":t.testSubsites(i.attributes)},attrs:{href:i.attributes.url,target:"_blank"}},[s("div",{class:{left:!0,"left-wide":t.testSubsites(i.attributes)}},[s("div",{staticClass:"top"},[s("div",{staticClass:"icon-area",style:"background-color: "+i.attributes.color},[s("img",{class:{icon:!0,"icon-no-padding":i.attributes.no_padding},attrs:{src:t.getIcon(i),alt:"",srcset:""}})]),s("transition",{attrs:{name:"fade"}},[t.modifyShow?s("div",{class:{"btn-modify":!0,"add-favor":!0,"ef-pudding":!0,"icon-button":!0},on:{click:function(s){return s.preventDefault(),t.addFavor(i)}}},[s("span",{staticClass:"iconfont icon-add"})]):t._e()])],1),s("span",{staticClass:"title fix-text-overflow",domProps:{textContent:t._s(i.attributes.title)}})]),t.testSubsites(i.attributes)?s("div",{staticClass:"subsites-list"},t._l(i.attributes.subsites.data,(function(i,e){return s("a",{key:e,staticClass:"subsite-item",attrs:{href:i.attributes.url,target:"_blank"}},[s("span",{staticClass:"title fix-text-overflow",domProps:{textContent:t._s(i.attributes.title)}})])})),0):t._e()])})),0):t._e()])}))],2)},a=[],n=(s("99af"),s("fb6a"),s("a434"),s("e9c4"),{name:"Navigation",components:{},data:function(){return{navs:{favorites:[{title:"加载中",color:"",icon:"",url:""}],others:[]},addWindowShow:!1,modifyShow:!1,editing:{title:"",color:"",icon:"",url:"",subsites:{data:[]}}}},computed:{remoteNavs:function(){return this.$store.getters.getNavs}},watch:{navs:function(){this.$store.commit("setNavs",this.navs)}},methods:{testSubsites:function(t){try{return void 0!==t.subsites.data[0]}catch(i){return console.log(i),!1}},addNewFavor:function(){var t={id:Date.now(),attributes:this.deepClone(this.editing)};console.log(t),this.navs.favorites.unshift(t),this.editing.title="",this.editing.url="",this.editing.icon="",this.editing.color="",this.addWindowShow=!1},showModify:function(){this.modifyShow?this.modifyShow=!1:this.modifyShow=!0},showAdd:function(){this.addWindowShow?this.addWindowShow=!1:this.addWindowShow=!0},getRemoteNavs:function(){var t=this;try{this.$api.get("/collections?populate[0]=sites&populate[1]=sites.icon&populate[2]=sites.subsites").then((function(i){t.navs.others=i.data.data}))}catch(i){console.log(i)}},getIcon:function(t){try{var i=t.attributes.icon.data.attributes.url;return"http://navapi.mercutio.club"+i}catch(a){var s='<svg width="140" height="140" xmlns="http://www.w3.org/2000/svg"><g><text font-family="MiSans,sans" font-weight="800" font-size="120" y="120" x="9" fill="'.concat("#ffffff"==t.attributes.color?"#000":"#fff",'">').concat(t.attributes.title.slice(0,1),"</text></g></svg>"),e="data:image/svg+xml,"+encodeURIComponent(s);return e}},addFavor:function(t){this.navs.favorites.unshift(t),this.updateNavs()},removeFavor:function(t){this.navs.favorites.splice(t,1),this.updateNavs()},updateNavs:function(){var t=this;setTimeout((function(){t.$store.commit("setNavs",t.navs)}),5)},deepClone:function(t){var i=JSON.stringify(t),s=JSON.parse(i);return s}},created:function(){},mounted:function(){this.navs=this.remoteNavs,this.getRemoteNavs()},beforeDestroy:function(){}}),o=n,r=(s("1600"),s("05ad"),s("d5d6"),s("2877")),c=Object(r["a"])(o,e,a,!1,null,"764488aa",null);i["default"]=c.exports},d5d6:function(t,i,s){"use strict";s("1878")}}]);
//# sourceMappingURL=navigation.62849c26.js.map