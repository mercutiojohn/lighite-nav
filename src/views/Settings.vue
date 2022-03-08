<template>
  <div
    :class="{
      settings: true,
      'common-page': true,
      'common-page-blurred': bgPrepared && settings.useBlur,
    }"
  >

    <div
      class="settings-list"
      v-for="(item, index) in settingSchema"
      :key="index"
    >
      <div class="sub-header">
        <span class="title" v-text="item.title"></span>
      </div>
      <div class="settings-sublist">
        <div
          :class="{
            'settings-item': true,
            'settings-item-blurred': bgPrepared && settings.useBlur,
          }"
          v-show="itemExists(item_1,'ifShow') ? settings[item_1.ifShow] : true"
          v-for="(item_1, index_1) in item.children"
          :key="index_1"
        >
          <div class="left">
            <span :class="'settings-icon iconfont '+(itemExists(item_1,'icon')?item_1.icon:'icon-cog')"></span>
            <div class="info">
              <span class="title" v-text="item_1.title"></span>
              <span class="desc" v-text="item_1.desc" v-if="item_1.desc"></span>
            </div>
          </div>
          <div class="right">
            <input
              :type="item_1.inputType"
              :name="item_1.model"
              :id="item_1.model"
              v-model="settings[item_1.model]"
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
      settings: {},
      settingSchema: [
        {
          title: "壁纸",
          children: [
            {
              title: "开启壁纸",
              icon: "icon-box",
              desc: "来自 Unsplash 的精选壁纸",
              model: "mode",
              inputType:"checkbox"
            },
            {
              title: "开启模糊",
              icon: "icon-box",
              desc: "模糊效果可能会导致卡顿",
              model: "useBlur",
              ifShow: "mode",
              inputType:"checkbox"
            },
          ],
        },{
          title: "天气",
          children: [
            {
              title: "城市",
              desc: "输入天气所在市或县",
              model: "weatherCity",
              inputType:"text"
            },
          ],
        },
        {
          title: "时间",
          children: [
            {
              title: "显示秒",
              desc: "",
              model: "showSeconds",
              inputType:"checkbox"
            },
            {
              title: "12小时制",
              desc: "",
              model: "twelveFormat",
              inputType:"checkbox"
            },
          ],
        },
        {
          title: "主页",
          children: [
            {
              title: "提示",
              icon: "icon-message-square",
              desc: "会给出一些实用建议",
              model: "showTips",
              inputType:"checkbox"
            },
          ],
        }
      ],
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
    forceUpdateSettings() {
      setTimeout(() => {
        this.$store.commit("setSettings", this.settings);
      }, 10);
    },
    itemExists(item, childName) {
      try {
        if (item[childName]) return true;
        else return false;
      } catch (error) {
        return false;
      }
    },
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
.settings-item:first-child {
  border-radius: var(--item-radius) var(--item-radius) 0 0;
}
.settings-item:last-child {
  border-radius: 0 0 var(--item-radius) var(--item-radius);
  /* border-bottom: none; */
}
.settings-item:only-child {
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
  /* gap: 10px; */
}
.settings-sublist {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.sub-header{
  padding: 10px 8px;
}
</style>