<template>
  <div
    :class="{
      'wallpaper-trans': true,
      'wallpaper-show': bgPrepared,
      'wallpaper-hided': wallpaperDescHided,
      'wallpaper-closed': !bgPrepared,
    }"
  >
    <div class="desc" v-if="bgPrepared">
      <transition name="fade">
        <div class="wallpaper-info" v-if="!wallpaperDescHided">
          <div class="left">
            <a
              v-if="showDesc"
              :href="wallpaperData.links.html"
              target="_blank"
              class="author-info ef-fadein"
            >
              <img
                class="avatar"
                v-lazy="wallpaperData.user.profile_image.small"
                alt=""
                srcset=""
              />
              <div class="info">
                <span class="name">{{ wallpaperData.user.name }}</span>
                <span class="desc">来自 Unsplash，点击查看详情</span>
              </div>
            </a>
            <a class="author-info ef-fadein" v-else>
              <div class="info">
                <span class="name">壁纸加载失败，要不点击右边刷新试试？</span>
              </div>
            </a>
          </div>
          <div class="right">
            <a
              v-if="showDesc"
              :href="wallpaperData.links.download"
              target="_blank"
              class="download"
            >
              <button
                :class="{ 'icon-button': true, 'wallpaper-button': true }"
              >
                <span
                  :class="{
                    iconfont: true,
                    'icon-download': true,
                  }"
                ></span>
              </button>
            </a>
            <button
              :class="{
                'icon-button': true,
                'wallpaper-button': true,
              }"
              @click="changeWallpaper()"
            >
              <span
                :class="{
                  iconfont: true,
                  'icon-refresh': true,
                  spinning: spinning,
                }"
              ></span>
            </button>
          </div>
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
            'icon-chevron-down': wallpaperDescHided,
            'icon-chevron-up': !wallpaperDescHided,
            'enterd-hide': enterdHide,
            'btn-no-blur': !settings.useBlur,
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
      wallpaperDescHided: false,
      enterdHide: false,
      spinning: false,
      showDesc:false,
    };
  },
  computed: {
    bgPrepared: function () {
      return this.$store.getters.getBgPrepared;
    },
    wallpaperData: function () {
      return this.$store.getters.getWallpaperData;
    },
    settings: function () {
      return this.$store.getters.getSettings;
    },
    remoteWallpaperDescHided: function () {
      return this.$store.getters.getWallpaperDescHided;
    },
  },
  watch: {
    wallpaperDescHided() {
      this.$store.commit("setWallpaperDescHided", this.wallpaperDescHided);
    },
    wallpaperData(newStat){
      if(newStat!=={})
        this.showDesc = true;
    }
  },
  methods: {
    hideDesc() {
      this.wallpaperDescHided
        ? (this.wallpaperDescHided = false)
        : (this.wallpaperDescHided = true);
    },
    changeWallpaper() {
      this.$bus.$emit("changeWallpaper", "test");
      this.spinning = true;
    },
  },
  created() {},
  mounted() {
    this.wallpaperDescHided = this.remoteWallpaperDescHided;
    this.$bus.$on("updatedWallpaper", (data) => {
      this.spinning = false;
    });
    if(this.wallpaperData!=={})
        this.showDesc = true;
  },
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
.btn-no-blur {
  background: var(--card-color) !important;
  backdrop-filter: none !important;
}
.enterd-hide {
  background: none !important;
  backdrop-filter: unset !important;
}
.wallpaper-info {
  color: var(--content-color-blurred);
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.author-info {
  padding: 10px;
  display: flex;
  align-items: center;
  color: var(--content-color-blurred);
  gap: 10px;
  border-radius: var(--item-radius);
}
.author-info .info {
  display: flex;
  flex-direction: column;
}
.author-info .info .desc {
  color: var(--blurred-subtitle-color);
  font-size: 0.8em;
}
.wallpaper-button {
  padding: 20px;
}
.wallpaper-button span {
  color: var(--content-color-blurred);
  font-size: 25px;
}
.spinning {
  display: block;
  animation-name: turn;
  animation-duration: .3s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}
@keyframes turn {
  0% {
    transform: rotateZ(0deg);
  }

  100% {
    transform: rotateZ(360deg);
  }
}
</style>