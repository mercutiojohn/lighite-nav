<template>
  <div
    :class="{
      settings: true,
      'common-page': true,
      'common-page-blurred': bgPrepared && settings.useBlur,
    }"
  >
    <div class="settings-list">
      <button ref="addBtn" :class="{ 'add-to-home-screen':true, 'icon-button': true, 'add-to-home-screen-blurred': bgPrepared }">
        <span class="iconfont icon-add"></span>
        <span class="tip">添加到桌面</span>
      </button>
      <div class="sub-header">
        <span class="title">首页功能</span>
      </div>
      <div class="settings-sublist">
        <div
          :class="{
            'settings-item': true,
            'settings-item-blurred': bgPrepared && settings.useBlur,
            'ef-fadein': true,
          }"
          @click="detailChange()"
        >
          <div class="left">
            <span :class="'settings-icon iconfont icon-cog'"></span>
            <div class="info">
              <span class="title">首页卡片管理</span>
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
                @click.once="detailChange()"
              ></span>
            </button>
          </div>
        </div>
        <transition name="fade">
          <div class="settings-detail" v-if="detailShow">
            <div class="reset">
              <button class="icon-button" @click="resetMainPageData">重置</button>
            </div>
            <div class="settings-drag">
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
          v-for="(item_1, index_1) in item.children"
          v-if="itemExists(item_1, 'ifShow') ? settings[item_1.ifShow] : true"
          :key="index_1"
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
              class="better-input"
            />
            <label
              :for="item_1.model"
              v-if="item_1.inputType == 'checkbox'"
            ></label>
          </div>
        </div>
      </div>
    </div>

    <div class="about">
      <span class="about-line">壁纸资源来自Unsplash</span>
      <span class="about-line">音乐内容来自网易云音乐</span>
      <span class="about-line">视频内容来自Bilibili</span>
      <span class="about-line">天气数据来自和风天气</span>
      <span class="about-line">
        Built with 🧡 by
        <a
          href="https://www.mercutio.club"
          class="link-button"
          target="_blank"
          title="Mercutio的博客"
        >
          Mercutio
        </a>
      </span>
      <span class="about-line">Copyright © 2021 Mercutio</span>
      <span class="about-line">
        免责声明：壁纸内容由Unsplash实时自动随机选择，本网站不做人工筛选，亦不对壁纸内容负责。
      </span>
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
              desc: "来自 Unsplash 的精选壁纸",
              model: "mode",
              inputType: "checkbox",
            },
            {
              title: "开启模糊",
              icon: "icon-box",
              desc: "模糊效果可能会导致卡顿",
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
              title: "城市",
              desc: "输入天气/疫情相关信息所在市或县",
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
    resetSettings(){

    },
    resetMainPageData(){
      this.mainPageData = this.$store.state.suggestedMainPageData;
      this.forceUpdateMainPageData();
      let arr = [];
      this.mainPageData.forEach((item)=>{
        arr.push(item.title);
      });
      console.log(arr);
      arr = [];
      this.$store.state.suggestedMainPageData.forEach((item)=>{
        arr.push(item.title);
      });
      console.log(arr);

    },
    addNewCards(){

    },
    detailChange() {
      this.detailShow = !this.detailShow;
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
      var notifTitle = '通知订阅成功';
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
.settings-detail {
  display: flex;
  flex-direction: column;
  gap: 3px;
  background: var(--sub-card-color);
  padding: 10px 15px;
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
input[type="text"].better-input {
  border-color: var(--line-color);
}
</style>