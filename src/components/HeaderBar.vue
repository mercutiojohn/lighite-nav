<template>
  <div
    :class="{
      header: true,
      'header-pwa-colored': pwaHeaderBarColored,
      //'header-with-bg': ifScrolled,
      //'header-with-bg-blurred': ifScrolled && bgPrepared,
    }"
  >
  <div class="header-content">
    <!-- <div :class="{'left':true,'left-big-padding':!title}">
    </div> -->
    <div class="logo-box">
      <span
        :class="{ logo: true, 'logo-blurred': bgPrepared && !pwaHeaderBarColored, 'logo-pwa-colored':pwaHeaderBarColored}"
        v-text="logoText"
      ></span>
    </div>
    <div
      :class="{
        center: true,
        'big-clock': !ifScrolled && !title && bgPrepared && !wallpaperDescHided,
        'big-clock-smaller': !ifScrolled && !title && !bgPrepared,
      }"
    >
      <transition name="fade">
        <div class="title-box" v-if="title">
          <span
            :class="{ title: true, 'title-blurred': bgPrepared && !pwaHeaderBarColored, 'title-pwa-colored':pwaHeaderBarColored }"
            v-text="title"
          ></span>
        </div>
        <div class="profile-box" v-else>
          <TinyClock :class="{ clock: true }" />
        </div>
      </transition>
    </div>
    <div class="right">
      <!-- <Profile /> -->
      <OneSentence />
    </div>
  </div>
  </div>
</template>

<script>
import TinyClock from "@/components/widgets/TinyClock.vue";
import OneSentence from "@/components/widgets/OneSentence.vue";
// import Profile from "@/components/utils/Profile.vue";
export default {
  name: "Header",
  components: {
    TinyClock,
    OneSentence,
  },
  data() {
    return {
      title: "",
      logoText: "Lightie",
      // ifScrolled: false,
    };
  },
  computed: {
    wallpaperDescHided: function () {
      return this.$store.getters.getWallpaperDescHided;
    },
    bgPrepared: function () {
      return this.$store.getters.getBgPrepared;
    },
    ifScrolled: function () {
      return this.$store.getters.getIfScrolled;
    },
    pwaHeaderBarColored() {
      if ("windowControlsOverlay" in navigator) {
        if(navigator.windowControlsOverlay.visible){
          return true;
        }else{
          return false;
        }
      }else{
        return false;
      }
    },
  },
  watch: {
    $route(to, from) {
      // console.log(to.desc);
      this.title = to.name;
      // if(to.path == "/tools"){
      //   this.title = "工具"
      // } else if(to.path == "/navigation"){
      //   this.title = "导航"
      // } else if(to.path == "/"){
      //   this.title = "首页"
      // }
      // document.querySelector("body > div").scrollTop = 0;
    },
  },
  methods: {
    // handleScroll() {
    //   if (document.querySelector("body > div").scrollTop)
    //     this.ifScrolled = true;
    //   else this.ifScrolled = false;
    //   console.log(this.ifScrolled);
    // },
  },
  created() {},
  mounted() {
    // document
    //   .querySelector("body > div")
    //   .addEventListener("scroll", this.handleScroll);
    this.title = this.$route.name;
  },
  beforeDestroy() {
    // document
    //   .querySelector("body > div")
    //   .removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<style scoped>
.header {
  height: var(--head-height);
  width: 100%;
  /* width: calc(100% - var(--side-width)); */
  /* margin-left: var(--side-width); */
  /* background: var(--bg-color); */
  position: sticky;
  top: 0;
  z-index: 1000;
  -webkit-app-region: drag;
}
.header-pwa-colored{
  /* background-image: linear-gradient(#eee 60%,transparent); */
  /* background: #eee; */
}
.header-content{
  height: var(--head-height);
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* Use the environment variable for the left anchoring with a fallback. */
  padding-left: env(titlebar-area-x, 0);
  /* Use the environment variable for the top anchoring with a fallback. */
  padding-top: env(titlebar-area-y, 0);
  /* Use the environment variable for setting the width with a fallback. */
  width: env(titlebar-area-width, 100%);
  /* Use the environment variable for setting the height with a fallback. */
  /* height: env(titlebar-area-height, var(--head-height)); */
}
.left {
  /* width: calc((100vw - var(--side-width) - 200px) / 2);
  transition: padding-left .2s ease,width .2s ease;
  overflow: hidden;
  background: #fff; */
}
.left-big-padding {
  /* width: calc((100vw - var(--side-width) - 200px - 50px)/2);
  padding-left: 50px; */
}
.logo-box {
  height: env(titlebar-area-height, var(--head-height));
  /* width: 150px; */
  padding: 10px;
  box-sizing: border-box;
  /* background: rgb(128, 128, 128); */
  display: flex;
  align-items: center;
  justify-content: center;
}
.logo-blurred {
  color: var(--title-color-blurred);
  text-shadow: 0 2px 10px #00000034;
}
.logo {
  font-family: AtmaSerif;
  font-size: 30px;
  font-weight: 900;
}
.logo-pwa-colored{
  /* color:#000; */
}
.center {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  height: var(--head-height);
  top: 0;
  left: var(--side-width);
  width: calc(100% - var(--side-width));
  transition: transform 0.5s ease, font-weight 0.5s ease;
  font-weight: 500;
  z-index: -1;
}
.right {
  margin-right: 10px;
}
.big-clock {
  transform: scale(3) translateY(30px);
  font-weight: 100;
}
.big-clock-smaller {
  transform: scale(2) translateY(10px);
  font-weight: 200;
}
@media screen and (max-width: 600px) {
  .header {
    width: 100%;
    margin-left: 0;
    position: static;
  }
  .clock {
    display: none;
  }
}
.title-box {
  height: 100%;
  /* width: 150px; */
  padding: 0 30px;
  /* background: rgb(128, 128, 128); */
  display: flex;
  align-items: center;
  justify-content: center;
}
.title {
  /* font-family: AtmaSerif; */
  font-size: 20px;
  font-weight: 900;
}
.title-pwa-colored{
  /* color: #000; */
}
.title-blurred {
  color: var(--title-color-blurred);
  text-shadow: 0 2px 10px #00000034;
}
.profile-box {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 15px;
  padding: 0 20px;
}
.header-with-bg {
  background: var(--bg-color);
}
.header-with-bg-blurred {
  background: var(--blurred-card-color);
  backdrop-filter: blur(var(--blur-width)) saturate(280%);
}
.add-to-home-screen-blurred {
  color: var(--title-color-blurred);
  text-shadow: 0 2px 10px #00000034;
}
</style>