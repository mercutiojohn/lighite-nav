<template>
  <div
    :class="{
      'wallpaper-trans': true,
      'wallpaper-show': bgPrepared,
      'wallpaper-hided': hided,
      'wallpaper-closed': !bgPrepared,
    }"
  >
    <div class="desc" v-if="bgPrepared">
      <transition name="fade">
        <div class="wallpaper-info" v-if="!hided">
          <a
            :href="wallpaperData.links.html"
            target="_blank"
            class="author-info ef-fadein"
          >
            <img
              class="avatar"
              :src="wallpaperData.user.profile_image.small"
              alt=""
              srcset=""
            />
            <span class="name">{{ wallpaperData.user.name }}</span>
          </a>
          <a
            :href="wallpaperData.links.download"
            target="_blank"
            class="download"
          >
            <button class="icon-button">
              <span class="iconfont icon-download"></span>
            </button>
          </a>
        </div>
      </transition>
      <div
        class="hide"
        @click="hideDesc()"
        @mouseover="enterdHide = true"
        @mouseout="enterdHide = false"
      >
        <span
          :class="{
            iconfont: true,
            'icon-chevron-down': hided,
            'icon-chevron-up': !hided,
            'enterd-hide': enterdHide,
          }"
        ></span>
      </div>
    </div>
    <!-- <div class="tip" v-else>开启壁纸</div> -->
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  data() {
    return {
      hided: false,
      enterdHide: false,
    };
  },
  computed: {
    bgPrepared: function () {
      return this.$store.getters.getBgPrepared;
    },
    wallpaperData: function () {
      console.log(this.$store.getters.getWallpaperData);
      return this.$store.getters.getWallpaperData;
    },
  },
  watch: {},
  methods: {
    hideDesc() {
      this.hided ? (this.hided = false) : (this.hided = true);
    },
  },
  created() {},
  mounted() {},
  beforeDestroy() {},
};
</script>

<style scoped>
.wallpaper-show {
  height: calc(100vh - 14rem);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  transition: height 0.4s ease;
  padding: 0 0 20px 0;
}
.wallpaper-closed {
  /* height: 40px; */
  /* background: var(--card-color); */
  /* border-radius: var(--card-radius); */
  /* margin: 0 50px; */
}
.wallpaper-trans {
  transition: height 0.4s ease;
}
.wallpaper-hided {
  height: 50px;
}
.desc .hide {
  width: 100%;
  height: 50px;
  background: transparent;
  border-radius: var(--card-radius);
  box-sizing: border-box;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease;
}
.desc .hide:hover {
  background: var(--card-color);
  /* backdrop-filter: blur(var(--blur-width)) saturate(280%); */
}
.hide span {
  background: var(--blurred-card-color);
  backdrop-filter: blur(var(--blur-width)) saturate(280%);
  color: var(--content-color);
  border-radius: var(--item-radius);
  padding: 10px;
  font-size: 23px;
}
.enterd-hide {
  background: none !important;
  backdrop-filter: unset !important;
}
.author-info {
  padding: 10px;
  display: flex;
  align-items: center;
  color: var(--content-color-blurred);
  gap: 10px;
  border-radius: var(--item-radius);
}
.wallpaper-info {
  color: var(--content-color-blurred);
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.download button {
  padding: 20px;
}
.download button span {
  color: var(--content-color-blurred);
  font-size: 25px;
}
</style>