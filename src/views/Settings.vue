<template>
  <div
    :class="{
      settings: true,
      'common-page': true,
      'common-page-blurred': bgPrepared && settings.useBlur,
    }"
  >
    <div class="settings-list">
      <div class="sub-header">
        <span class="title">壁纸</span>
      </div>
      <div class="settings-sublist">
        <div
          :class="{ 'settings-item': true, 'settings-item-blurred': bgPrepared && settings.useBlur }"
        >
          <div class="left">
            <span class="settings-icon iconfont icon-box"></span>
            <div class="info">
              <span class="title">开启壁纸</span>
              <span class="desc">来自 Unsplash 的精选壁纸</span>
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
        <div
          :class="{ 'settings-item': true, 'settings-item-blurred': bgPrepared && settings.useBlur }"
          v-if="settings.mode"
        >
          <div class="left">
            <span class="settings-icon iconfont icon-drop"></span>
            <div class="info">
              <span class="title">开启模糊</span>
              <span class="desc">模糊效果可能会导致卡顿</span>
            </div>
          </div>
          <div class="right">
            <input
              type="checkbox"
              name=""
              id=""
              v-model="settings.useBlur"
              @click="forceUpdateSettings()"
            />
          </div>
        </div>
      </div>
      <div class="sub-header">
        <span class="title">时间</span>
      </div>
      <div class="settings-sublist">
        <div
          :class="{ 'settings-item': true, 'settings-item-blurred': bgPrepared && settings.useBlur }"
        >
          <div class="left">
            <span class="settings-icon iconfont icon-cog"></span>
            <div class="info">
              <span class="title">显示秒</span>
              <!-- <span class="desc"></span> -->
            </div>
          </div>
          <div class="right">
            <input
              type="checkbox"
              name=""
              id=""
              v-model="settings.showSeconds"
              @click="forceUpdateSettings()"
            />
          </div>
        </div>
        <div
          :class="{ 'settings-item': true, 'settings-item-blurred': bgPrepared && settings.useBlur }"
        >
          <div class="left">
            <span class="settings-icon iconfont icon-cog"></span>
            <div class="info">
              <span class="title">12小时制</span>
              <!-- <span class="desc">模糊效果可能会导致卡顿</span> -->
            </div>
          </div>
          <div class="right">
            <input
              type="checkbox"
              name=""
              id=""
              v-model="settings.twelveFormat"
              @click="forceUpdateSettings()"
            />
          </div>
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
  padding: 18px 15px;
  /* border-bottom: 1px solid var(--line-color); */
}
.settings-item:first-child{
  border-radius: var(--item-radius) var(--item-radius) 0 0;
}
.settings-item:last-child{
  border-radius: 0 0 var(--item-radius) var(--item-radius);
  /* border-bottom: none; */
}
.settings-item:only-child{
  border-radius: var(--item-radius);
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
  gap:10px;
}
.settings-sublist{
  display: flex;
  flex-direction: column;
  gap:2px;
}
</style>