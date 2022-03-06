<template>
  <div
    :class="{
      settings: true,
      'common-page': true,
      'common-page-blurred': bgPrepared,
    }"
  >
    <div class="settings-list">
      <div class="sub-header">
        <span class="title">壁纸</span>
      </div>
      <div
        :class="{ 'settings-item': true, 'settings-item-blurred': bgPrepared }"
      >
        <div class="left">
          <span class="settings-icon iconfont icon-box"></span>
          <div class="info">
            <span class="title">开启壁纸</span>
            <span class="desc">模糊效果可能会导致卡顿</span>
          </div>
        </div>
        <div class="right">
          <input
            type="checkbox"
            name=""
            id=""
            v-model="settings.mode"
            @click="forceUpdateSettings()"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Settings",
  components: {},
  data() {
    return {
        settings:{

        }
    };
  },
  computed: {
    bgPrepared: function () {
      return this.$store.getters.getBgPrepared;
    },
    remoteSettings: function () {
      return this.$store.getters.getSettings;
    },
  },
  watch: {
    settings() {
      this.$store.commit("setSettings", this.settings);
    },
  },
  methods: {
      forceUpdateSettings(){
          setTimeout(()=>{
              this.$store.commit("setSettings", this.settings);
          },10)
      }
  },
  created() {},
  mounted() {
    this.settings = this.remoteSettings;
  },
  beforeDestroy() {},
};
</script>

<style scoped>
.settings-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--sub-card-color);
  border-radius: var(--item-radius);
  padding: 8px 15px;
}
.settings-item-blurred {
  background: var(--blurred-sub-card-color);
}
.settings-item .left {
  display: flex;
  align-items: center;
  gap: 10px;
}
.settings-item .left .info {
  display: flex;
  flex-direction: column;
  /* gap:2px; */
}
.settings-item .left .info .desc {
  font-size: 0.8em;
  color: var(--subtitle-color);
}
.settings-icon {
  font-size: 24px;
}
.settings-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
</style>