<template>
  <!-- <Scroll-Div ref="main" view-class="app" width="100vw" height="100vh"> -->
  <div
    id="app"
    ref="main"
    style="width: 100vw; height: 100vh"
  >
    <Background />
    <Header />
    <div id="main-box">
      <Sidebar />
      <transition name="page-fade">
        <router-view class="content fix-scrollbar" />
      </transition>
    </div>
  </div>

  <!-- </Scroll-Div> -->
  <!-- <div id="app">
    <Header />
    <div id="main-box">
      <Sidebar />
      <router-view />
    </div>
  </div> -->
</template>
<script>
import Header from "@/components/HeaderBar.vue";
import Sidebar from "@/components/SideBar.vue";
import Background from "@/components/utils/Background.vue";

export default {
  name: "App",
  components: {
    Header,
    Sidebar,
    Background,
  },
  data() {
    return {};
  },
  computed: {
    // JS媒体查询
    ifDark(){
      // Create a media condition that targets viewports at least 768px wide
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      // Check if the media query is true
      if (mediaQuery.matches) {
        // Then trigger an alert
        return true;
      }else{
        return false
      }
    }
  },
  watch: {
    $route(to, from) {
      // console.log(to.path);
      document.querySelector("body > div").scrollTop = 0;
    },
  },
  methods: {},
  created() {},
  mounted() {
    // 如果夜间模式,设置标题栏颜色为黑色
    this.$nextTick(()=>{
      if(this.ifDark){
        console.log('Good Night!');
        themeColor.content = '#000';
      }
    });
  },
  beforeDestroy() {},
};
</script>
<style scoped>
@import "styles/common.css";
@import "styles/modes/default.css";
@import "styles/fonts.css";
#main-box {
  display: flex;
  flex-wrap: nowrap;
}
.content {
  width: calc(100% - var(--side-width));
  flex-shrink: 0;
  height: calc(100vh - var(--head-height));
  overflow-y: scroll;
  box-sizing: border-box;
  margin-left: var(--side-width);
}
/* .content::-webkit-scrollbar {
  width: 5px;
  background: var(--card-color);
}
.content::-webkit-scrollbar-thumb {
  background: var(--sub-card-color);
} */
@media screen and (max-width: 600px) {
  #main-box {
    flex-direction: column-reverse;
  }
  .content {
    width: 100%;
    margin-left: 0;
    margin-bottom: var(--bottom-height);
    overflow-y: unset;
    height: auto;
    min-height: calc(100vh - var(--head-height) - var(--bottom-height));
    /* 适配移动端安全区 */
    padding: 0 0 env(safe-area-inset-bottom, 0) 0;

  }
}
</style>
<style>
.loading {
  display: none;
}
</style>