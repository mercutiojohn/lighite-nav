<template>
  <div
    :class="{
      settings: true,
      'common-page': true,
      'common-page-blurred': bgPrepared && settings.useBlur,
    }"
  >
    <div class="settings-list">
      <button
        ref="addBtn"
        :class="{
          'add-to-home-screen': true,
          'icon-button': true,
          'add-to-home-screen-blurred': bgPrepared,
        }"
      >
        <span class="iconfont icon-add"></span>
        <span class="tip">添加到桌面</span>
      </button>
      <div class="sub-header">
        <span class="title">卡片</span>
      </div>
      <div class="settings-sublist">
        <div class="settings-item">
          <div
            :class="{
              'settings-item-basic': true,
              'ef-fadein': true,
            }"
            @click="detailChangeLegacy()"
          >
            <div class="left">
              <span :class="'settings-icon iconfont icon-cog'"></span>
              <div class="info">
                <span class="title">卡片管理</span>
                <span class="desc">对首页卡片进行排序或隐藏</span>
              </div>
            </div>
            <div class="right">
              <button class="icon-button">
                <span
                  :class="{
                    iconfont: true,
                    'icon-chevron-down': !detailShow,
                    'icon-chevron-up': detailShow,
                  }"
                  @click.once="detailChangeLegacy()"
                ></span>
              </button>
            </div>
          </div>
          <transition name="fade">
            <div class="settings-item-more" v-if="detailShow">
              <div class="settings-sub-item">
                <button class="icon-button" @click="resetMainPageData">
                  重置
                </button>
              </div>
              <div class="settings-sub-item settings-drag">
                <transition-group name="drag" class="drag-list" tag="ul">
                  <li
                    @dragenter="dragenter($event, index)"
                    @dragover="dragover($event, index)"
                    @dragstart="dragstart(index)"
                    :draggable="!item.hide"
                    v-for="(item, index) in mainPageData"
                    :key="item.component"
                    :class="{ 'drag-item': true, 'drag-item-hide': item.hide }"
                  >
                    <span class="card-title">{{ item.title }}</span>
                    <button
                      class="card-func icon-button"
                      @click="item.hide ? showCard(index) : hideCard(index)"
                    >
                      <span
                        :class="{
                          iconfont: true,
                          'icon-circleminus': !item.hide,
                          'icon-add': item.hide,
                        }"
                      ></span>
                    </button>
                  </li>
                </transition-group>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
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
          }"
          v-for="(item_1, index_1) in item.children"
          v-if="itemExists(item_1, 'ifShow') ? settings[item_1.ifShow] : true"
          :key="index_1"
        >
          <div
            :class="{
              'settings-item-basic': true,
              'ef-fadein': item_1.inputType == 'more',
            }"
            @click="item_1.inputType == 'more' ? detailChange(item_1) : ''"
          >
            <div class="left">
              <span
                :class="
                  'settings-icon iconfont ' +
                  (itemExists(item_1, 'icon') ? item_1.icon : 'icon-cog')
                "
              ></span>
              <div class="info">
                <span class="title" v-text="item_1.title"></span>
                <span
                  class="desc"
                  v-text="item_1.desc"
                  v-if="item_1.desc"
                ></span>
              </div>
            </div>
            <div class="right">
              <input
                v-if="
                  item_1.inputType == 'checkbox' || item_1.inputType == 'text'
                "
                :type="item_1.inputType"
                :name="item_1.model"
                :id="item_1.model"
                v-model="settings[item_1.model]"
                @click="forceUpdateSettings()"
                @keyup="forceUpdateSettings()"
                @mouseout="forceUpdateSettings()"
                @mouseleave="forceUpdateSettings()"
                class="better-input"
              />
              <label
                :for="item_1.model"
                v-if="item_1.inputType == 'checkbox'"
              ></label>
              <div v-if="item_1.inputType == 'more'" class="type-more">
                <button class="icon-button">
                  <span
                    :class="{
                      iconfont: true,
                      'icon-chevron-down': !item_1.detailShow,
                      'icon-chevron-up': item_1.detailShow,
                    }"
                    @click.once="detailChange(item_1)"
                  ></span>
                </button>
              </div>
              <div v-if="item_1.inputType == 'button'" class="type-button">
                <button
                  class="common-button"
                  v-text="item_1.buttonTitle"
                  @click="execFunc(item_1)"
                ></button>
              </div>
            </div>
          </div>
          <transition name="fade">
            <div class="settings-item-more" v-if="item_1.detailShow">
              <div
                class="settings-sub-item"
                v-for="(item_2, index_2) in item_1.details"
                :key="index_2"
              >
                <div class="left">
                  <div class="info">
                    <span class="title" v-text="item_2.title"></span>
                  </div>
                </div>
                <div class="right">
                  <input
                    v-if="
                      item_2.inputType == 'checkbox' ||
                      item_2.inputType == 'text'
                    "
                    :type="item_2.inputType"
                    :name="item_2.model"
                    :id="item_2.model"
                    v-model="settings[item_1.model][item_2.model]"
                    @click="forceUpdateSettings()"
                    @keyup="forceUpdateSettings()"
                    @mouseout="forceUpdateSettings()"
                    @mouseleave="forceUpdateSettings()"
                    class="better-input"
                  />
                  <label
                    :for="item_2.model"
                    v-if="item_2.inputType == 'checkbox'"
                  ></label>
                  <div v-if="item_1.inputType == 'button'" class="type-button">
                    <button
                      class="common-button"
                      v-text="item_2.buttonTitle"
                      @click="execFunc(item_2)"
                    ></button>
                  </div>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>

    <div class="about">
      <span class="about-line" style="text-align:center;"> Built with 🧡 by Mercutio </span>
      <span class="about-line" style="text-align:center;">
        <a
          href="https://www.mercutio.club"
          class="link-button"
          target="_blank"
          title="Mercutio的博客"
        >
          MercBlog
        </a></span
      >
      <span class="about-line">来源：</span>
      <ul class="about-list">
        <li class="about-line">壁纸资源来自Unsplash</li>
        <li class="about-line">音乐内容来自网易云音乐</li>
        <li class="about-line">视频内容来自Bilibili</li>
        <li class="about-line">天气数据来自和风天气</li>
        <li class="about-line">一言数据来自Hitokoto</li>
      </ul>
      <span class="about-line">免责声明：</span>
      <ul class="about-list">
        <li class="about-line">
          壁纸内容由Unsplash实时自动随机选择，本网站不做人工筛选，亦不对壁纸内容负责。
        </li>
        <li class="about-line">
          一言内容由Hitokoto实时自动随机选择，本网站不做人工筛选，亦不对语句内容负责。
        </li>
      </ul>
      <span class="about-line">Copyright © 2021 Mercutio</span>
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
      mainPageData: [],
      dragIndex: "",
      enterIndex: "",
      settingSchema: [
        {
          title: "壁纸",
          children: [
            {
              title: "开启壁纸",
              icon: "icon-box",
              desc: "来自 Unsplash 的随机壁纸",
              model: "mode",
              inputType: "checkbox",
            },
            {
              title: "开启模糊",
              icon: "icon-box",
              desc: "低配置设备开启模糊效果可能会导致卡顿",
              model: "useBlur",
              ifShow: "mode",
              inputType: "checkbox",
            },
          ],
        },
        {
          title: "本地服务",
          children: [
            {
              title: "所在地",
              desc: "设置您所在市、直辖市或县，以查看天气和疫情信息",
              model: "weatherCity",
              inputType: "text",
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
              inputType: "checkbox",
            },
            {
              title: "12小时制",
              desc: "",
              model: "twelveFormat",
              inputType: "checkbox",
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
              inputType: "checkbox",
            },
            {
              title: "一言",
              icon: "icon-message-square",
              desc: "选择首页一句话内容分类",
              model: "hitokotoSource",
              inputType: "more",
              detailShow: false,
              details: [
                { title: "动画", inputType: "checkbox", model: "a" },
                { title: "漫画", inputType: "checkbox", model: "b" },
                { title: "游戏", inputType: "checkbox", model: "c" },
                { title: "文学", inputType: "checkbox", model: "d" },
                { title: "原创", inputType: "checkbox", model: "e" },
                { title: "影视", inputType: "checkbox", model: "h" },
                { title: "诗词", inputType: "checkbox", model: "i" },
                { title: "网易云", inputType: "checkbox", model: "j" },
                { title: "哲学", inputType: "checkbox", model: "k" },
                { title: "抖机灵", inputType: "checkbox", model: "l" },
                { title: "来自网络", inputType: "checkbox", model: "f" },
                { title: "其他", inputType: "checkbox", model: "g" },
              ],
            },
          ],
        },
        {
          title: "通用",
          children: [
            {
              title: "重置",
              icon: "icon-cog",
              desc: "将主页设置重置为初始状态",
              inputType: "button",
              buttonTitle: "重置为初始状态",
              buttonFunction: "resetSettings",
            },
          ],
        },
      ],
      detailShow: false,
    };
  },
  computed: {
    bgPrepared: function () {
      return this.$store.getters.getBgPrepared;
    },
    remoteSettings: function () {
      return this.$store.getters.getSettings;
    },
    remoteMainPageData: function () {
      return this.$store.getters.getMainPageData;
    },
  },
  watch: {
    settings() {
      this.$store.commit("setSettings", this.settings);
    },
    mainPageData() {
      this.$store.commit("setMainPageData", this.mainPageData);
    },
  },
  methods: {
    execFunc(item) {
      this[item.buttonFunction]();
    },
    resetSettings() {
      console.log("hello");
    },
    resetMainPageData() {
      this.mainPageData = this.$store.state.suggestedMainPageData;
      this.forceUpdateMainPageData();
      let arr = [];
      this.mainPageData.forEach((item) => {
        arr.push(item.title);
      });
      console.log(arr);
      arr = [];
      this.$store.state.suggestedMainPageData.forEach((item) => {
        arr.push(item.title);
      });
      console.log(arr);
    },
    addNewCards() {},
    detailChangeLegacy() {
      this.detailShow = !this.detailShow;
    },
    detailChange(item) {
      item.detailShow = !item.detailShow;
    },
    forceUpdateSettings() {
      setTimeout(() => {
        this.$store.commit("setSettings", this.settings);
      }, 10);
    },
    forceUpdateMainPageData() {
      setTimeout(() => {
        this.$store.commit("setMainPageData", this.mainPageData);
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
    dragstart(index) {
      this.dragIndex = index;
    },
    dragenter(e, index) {
      e.preventDefault();
      if (this.dragIndex !== index) {
        const moving = this.mainPageData[this.dragIndex];
        this.mainPageData.splice(this.dragIndex, 1);
        this.mainPageData.splice(index, 0, moving);
        this.dragIndex = index;
      }
    },
    dragover(e, index) {
      this.forceUpdateMainPageData();
      e.preventDefault();
    },
    hideCard(index) {
      // console.log("hide"+index)
      this.mainPageData[index].hide = true;
      const moving = this.mainPageData[index];
      this.mainPageData.splice(index, 1);
      this.mainPageData.splice(this.mainPageData.length, 0, moving);
      this.forceUpdateMainPageData();
    },
    showCard(index) {
      this.mainPageData[index].hide = false;
      const moving = this.mainPageData[index];
      this.mainPageData.splice(index, 1);
      this.mainPageData.splice(0, 0, moving);
      this.forceUpdateMainPageData();
    },
    add2Home() {
      this.$refs.addBtn.style.display = "none";
      // 显示安装提示
      deferredPrompt.prompt();
      // 等待用户反馈
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the A2HS prompt");
        } else {
          console.log("User dismissed the A2HS prompt");
        }
        deferredPrompt = null;
      });
    },
    randomNotification() {
      var notifTitle = "通知订阅成功";
      var notifBody = "当有活动时,Lightie会通知你";
      var notifImg = "img/icons/apple-touch-icon-120x120.png";
      var options = {
        body: notifBody,
        icon: notifImg,
      };
      var notif = new Notification(notifTitle, options);
      // setTimeout(this.randomNotification, 1000);
    },
  },
  created() {},
  mounted() {
    this.settings = this.remoteSettings;
    this.mainPageData = this.remoteMainPageData;

    // Notifications

    // Notification.requestPermission().then(function (result) {
    //   if (result === "granted") {
    //     this.randomNotification();
    //   }
    // });

    // A2HS
    let deferredPrompt;
    const addBtn = this.$refs.addBtn;
    addBtn.style.display = "none";

    // this.randomNotification();

    window.addEventListener("beforeinstallprompt", (e) => {
      // 防止 Chrome 67 及更早版本自动显示安装提示
      e.preventDefault();
      // 稍后再触发此事件
      deferredPrompt = e;
      // 更新 UI 以提醒用户可以将 App 安装到桌面
      addBtn.style.display = "block";

      addBtn.addEventListener("click", (e) => {
        // 隐藏显示 A2HS 按钮的界面
        addBtn.style.display = "none";
        // 显示安装提示
        deferredPrompt.prompt();
        // 等待用户反馈
        deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === "accepted") {
            console.log("User accepted the A2HS prompt");
          } else {
            console.log("User dismissed the A2HS prompt");
          }
          deferredPrompt = null;
        });
      });
    });
  },
  beforeDestroy() {},
};
</script>

<style scoped>
.settings-item {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  /* background: var(--sub-card-color); */
  /* padding: 18px 15px; */
}
.settings-item-basic {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--sub-card-color);
  padding: 18px 15px;
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
  /* background: var(--blurred-sub-card-color); */
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
.settings-item .right {
  display: flex;
  align-items: center;
  justify-content: center;
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
.settings-item-more {
  display: flex;
  flex-direction: column;
}
.settings-detail:first-child {
  border-radius: var(--item-radius) var(--item-radius) 0 0;
}
.settings-detail:last-child {
  border-radius: 0 0 var(--item-radius) var(--item-radius);
  /* border-bottom: none; */
}
.settings-detail:only-child {
  border-radius: var(--item-radius);
}
.settings-drag {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.settings-drag .drag-list {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.drag-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: move;
  width: 200px;
  background: var(--card-color);
  border-radius: var(--item-radius);
  /* color: #fff; */
  /* margin-bottom: 6px; */
  /* height: 50px; */
  padding: 10px;
  /* line-height: 50px; */
  /* text-align: center; */
  border: 2px solid transparent;
  transition: background 0.2s ease;
}
.drag-item-hide {
  background: transparent;
  cursor: default;
  border: 2px solid var(--card-color);
}
.drag-move {
  transition: transform 0.3s;
}
.sub-header {
  padding: 10px 8px;
}
.about {
  font-size: 0.7em;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 10px 8px;
  margin-top: 20px;
  color: var(--subtitle-color);
}
.about-list {
  list-style-type: disc;
  padding-inline-start: 15px;
}
input[type="text"].better-input {
  border-color: var(--line-color);
}
.settings-sub-item {
  background: var(--sub-card-color);
  padding: 10px 15px;
  border-top: 1px solid var(--line-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>