<template>
  <div class="background">
    <transition name="fade">
      <div :class="{ 'bg-box': true }" v-if="bgPrepared == true">
        <img class="bg-image" v-lazy="srcs.regular" alt="" srcset="" />
        <div
          :class="{
            'bg-blur': settings.useBlur,
            'bg-blur-blurred': wallpaperDescHided,
            'bg-blur-opacity': ifScrolled || wallpaperDescHided,
          }"
          :style="'--bg-blurred-width:' + getBlurWidth() + 'px'"
        ></div>
        <div :class="{ 'bg-mask': true }"></div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  data() {
    return {
      token: "it2DXjurbHmXNPRVjpG25eKJkkGk06_Ocln-QlIBmFg",
      srcs: {
        // full: "https://images.unsplash.com/photo-1644952720775-c769200e6b67?crop=entropy&cs=srgb&fm=jpg&ixid=MnwzMDU3MzR8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NDU5NjA2NjU&ixlib=rb-1.2.1&q=85",
        // raw: "https://images.unsplash.com/photo-1644952720775-c769200e6b67?ixid=MnwzMDU3MzR8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NDU5NjA2NjU&ixlib=rb-1.2.1",
        // regular:
        //   "https://images.unsplash.com/photo-1644952720775-c769200e6b67?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMDU3MzR8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NDU5NjA2NjU&ixlib=rb-1.2.1&q=80&w=1080",
        // small:
        //   "https://images.unsplash.com/photo-1644952720775-c769200e6b67?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMDU3MzR8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NDU5NjA2NjU&ixlib=rb-1.2.1&q=80&w=400",
        // small_s3:
        //   "https://s3.us-west-2.amazonaws.com/images.unsplash.com/photo-1644952720775-c769200e6b67",
        // thumb:
        //   "https://images.unsplash.com/photo-1644952720775-c769200e6b67?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMDU3MzR8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NDU5NjA2NjU&ixlib=rb-1.2.1&q=80&w=200",
      },
      data: {},
    };
  },
  computed: {
    mode: function () {
      return this.$store.getters.getMode;
    },
    bgPrepared: function () {
      return this.$store.getters.getBgPrepared;
    },
    ifScrolled: function () {
      return this.$store.getters.getIfScrolled;
    },
    homeScrollTop: function () {
      return this.$store.getters.getHomeScrollTop;
    },
    wallpaperDescHided: function () {
      return this.$store.getters.getWallpaperDescHided;
    },
    settings: function(){
      return this.$store.getters.getSettings;
    }
  },
  watch: {
    mode(newStat) {
      if (newStat) {
        this.getPic();
      } else {
        this.setBgState(false);
      }
    },
    data() {
      this.$store.commit("setWallpaperData", this.data);
    },
  },
  methods: {
    getBlurWidth() {
      const width = this.homeScrollTop / 10;
      if (width > 100) return 100;
      else return width;
    },
    setBgState(state) {
      this.$store.commit("setBgPrepared", state);
    },
    getFallbackPic() {
      this.srcs = {
        regular: require("../../assets/images/wallpaper/fallback.jpg"),
      };
      this.setBgState(true);
    },
    getPic() {
      let _this = this;
      this.setBgState(false);
      this.$axios({
        baseURL: "https://api.unsplash.com",
        url: "/photos/random",
        method: "get",
        headers: { Authorization: "Client-ID " + this.token },
      })
        .catch(function (error) {
          // 处理错误情况
          console.log(error);
          _this.getFallbackPic();
        })
        .then((response) => {
          this.setBgState(true);
          // console.log(response.data);
          this.data = response.data;
          this.srcs = response.data.urls;
        });
    },
    updatePic() {
      this.setBgState(false);
      this.$axios({
        baseURL: "https://api.unsplash.com",
        url: "/photos/random",
        method: "get",
        headers: { Authorization: "Client-ID " + this.token },
      }).then((response) => {
        this.data = response.data;
        this.srcs = response.data.urls;
        setTimeout(() => {
          this.setBgState(true);
          this.$bus.$emit("updatedWallpaper", "test");
        }, 1000);
      });
    },
  },
  created() {},
  mounted() {
    setTimeout(() => {
      if (this.mode) {
        this.getPic();
      } else {
        // this.getFallbackPic();
      }
    }, 10);
    this.$bus.$on("changeWallpaper", (data) => {
      this.updatePic();
    });
  },
  beforeDestroy() {},
};
</script>

<style scoped>
.bg-box {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: -1;
  background: #00000056;
  overflow: hidden;
}
.bg-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.bg-blur {
  /* will-change: transform; */
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  pointer-events: none;
  transition: opacity 0.2s ease;
  backdrop-filter: blur(var(--bg-blurred-width));
  opacity: 0;
  transform: translate3d(0,0,0);
}
.bg-mask {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  background-image: radial-gradient(
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.1) 100%
    ),
    radial-gradient(rgba(0, 0, 0, 0) 33%, rgba(0, 0, 0, 0.2) 166%),
    linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0) 0% 75%,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.2) 100%
    );
  pointer-events: none;
  /* transition: opacity 0.2s ease; */
}
.bg-blur-opacity {
  opacity: 1;
}
.bg-blur-blurred {
  backdrop-filter: blur(100px);
}
</style>