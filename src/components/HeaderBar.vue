<template>
  <div
    :class="{
      header: true,
      //'header-with-bg': ifScrolled,
      //'header-with-bg-blurred': ifScrolled && bgPrepared,
    }"
  >
    <div class="left">
      
    </div>
    <div :class="{'center':true,'big-clock':!ifScrolled && !title && bgPrepared && !wallpaperDescHided, 'big-clock-smaller':!ifScrolled && !title && !bgPrepared}">
      <transition name="fade">
        <div class="title-box" v-if="title">
          <span
            :class="{ title: true, 'title-blurred': bgPrepared }"
            v-text="title"
          ></span>
        </div>
        <div class="profile-box" v-else>
          <TinyClock :class="{'clock':true }"/>
        </div>
      </transition>
    </div>
    <div class="right">
        <!-- <Profile /> -->
    </div>
  </div>
</template>

<script>
import TinyClock from "@/components/widgets/TinyClock.vue";
// import Profile from "@/components/utils/Profile.vue";
export default {
  name: "Header",
  components: {
    TinyClock,
  },
  data() {
    return {
      title: "",
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
  width: calc(100% - var(--side-width));
  margin-left: var(--side-width);
  /* background: var(--bg-color); */
  display: flex;
  align-items: center;
  justify-content: center;
  position: sticky;
  top: 0;
  z-index: 1000;
}
.center{
  transition: transform .5s ease, font-weight .5s ease;
  font-weight: 500;
}
.big-clock{
  transform: scale(3) translateY(30px);
  font-weight: 100;
}
.big-clock-smaller{
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
.add-to-home-screen-blurred{
  color: var(--title-color-blurred);
  text-shadow: 0 2px 10px #00000034;
}
</style>