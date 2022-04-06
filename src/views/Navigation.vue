<template>
  <div
    :class="{
      navigation: true,
      'common-page': true,
      'mask-on': addWindowShow,
      'common-page-blurred': bgPrepared && settings.useBlur,
    }"
  >
    <!-- 添加浮层 -->
    <transition name="fade">
      <div
        class="general-window-mask"
        v-if="addWindowShow"
        @click.self="showAdd()"
      >
        <div class="general-window fix-scrollbar">
          <div class="window-content">
            <div class="header"><span class="title">添加网址</span></div>
            <span class="tip">名称</span>
            <input
              type="text"
              v-model="editing.title"
              name="title"
              id="title"
              class="better-input"
              placeholder="名称"
            />
            <span class="tip">URL</span>
            <input
              type="text"
              v-model="editing.url"
              name="url"
              id="url"
              class="better-input"
              placeholder="URL"
            />
            <!-- <span class="tip">图标</span>
            <input
              type="text"
              v-model="editing.icon"
              name="icon"
              id="icon"
              class="better-input"
              placeholder="图标URL"
            /> -->
            <span class="tip">主色调</span>
            <div @click="colorInputClick">
              <input
                @click="colorInputClick"
                type="text"
                v-model="editing.color"
                name="color"
                id="icon"
                class="better-input"
                placeholder="格式:#AABBCC"
                disabled
              />
            </div>
            <div v-show="isShowColors" class="color-select-layer">
              <sketch-picker
                v-model="editing.color"
                @input="colorValueChange"
              ></sketch-picker>
            </div>
          </div>
          <div class="window-bottom">
            <button class="submit-button ef-pudding" @click="addNewFavor()">
              提交
            </button>
          </div>
        </div>
      </div>
    </transition>
    <!-- 左侧快速导航 -->
    <div class="left fix-scrollbar">
      <div class="header-list">
        <div class="list-header" ref="favorites">
          <span class="title">分类</span>
        </div>
        <div class="group">
          <div
            :class="{
              item: true,
              'item-active': currSubItem == -1,
              'item-blurred': bgPrepared,
            }"
            @click="goAnchor(-1)"
          >
            我的收藏
          </div>
        </div>
        <!-- <div class="list-header"><span class="title">精选好站</span></div> -->
        <div class="group">
          <div
            :class="{
              item: true,
              'item-active': currSubItem == index,
              'item-blurred': bgPrepared,
            }"
            v-for="(item, index) in navs.others"
            :key="index"
            @click="goAnchor(index)"
          >
            <span class="name" v-text="item.attributes.name"></span>
          </div>
        </div>
      </div>
    </div>
    <div class="right">
      <!-- 收藏 -->
      <div class="list-header">
        <span class="title">我的收藏</span>
        <div class="right">
          <transition name="fade">
            <span class="drag-tip" v-if="modifyShow">可以进行拖动排序</span>
          </transition>
          <transition name="fade">
            <button
              :class="{
                'icon-button': true,
              }"
              @click="showAdd()"
              v-if="modifyShow"
            >
              <span class="iconfont icon-add"></span>
              <span class="tip">自定义</span>
            </button>
          </transition>
          <button class="icon-button" @click="showModify()">
            <span
              :class="{
                iconfont: true,
                'icon-edit-2': !modifyShow,
                'icon-check': modifyShow,
              }"
            ></span>
            <span class="tip">{{ !modifyShow ? "编辑" : "完成" }}</span>
          </button>
        </div>
      </div>
      <div class="nav-block" ref="favorites">
        <transition-group name="drag" class="nav-list" tag="div">
          <a
            :href="item.attributes.url"
            target="_blank"
            :class="{
              'nav-item': true,
              'ef-float': true,
              'nav-item-blurred': bgPrepared && settings.useBlur,
              'nav-item-wide': testSubsites(item.attributes) && !modifyShow,
              'nav-item-drag':modifyShow
            }"
            v-for="(item, index) in navs.favorites"
            :key="item.id"
            @mouseover="navItemHovered(-1, index)"
            @mouseout="navItemLeave()"
            @dragenter="dragenter($event, index)"
            @dragover="dragover($event, index)"
            @dragstart="dragstart(index)"
            :draggable="modifyShow"
          >
            <div
              :class="{
                left: true,
                'left-wide': testSubsites(item.attributes) && !modifyShow,
              }"
            >
              <div class="top">
                <div
                  class="icon-area"
                  :style="'background-color: ' + item.attributes.color"
                >
                  <img
                    :class="{
                      icon: true,
                      'icon-no-padding': item.attributes.no_padding,
                    }"
                    :src="getIcon(item)"
                    alt=""
                    srcset=""
                  />
                </div>
                <transition name="fade">
                  <div
                    :class="{
                      'btn-modify': true,
                      'remove-favor': true,
                      'ef-pudding': true,
                      'icon-button': true,
                    }"
                    @click.prevent="removeFavor(index)"
                    v-if="modifyShow"
                  >
                    <span class="iconfont icon-trash"></span>
                  </div>
                </transition>
              </div>
              <span
                class="title fix-text-overflow"
                v-text="item.attributes.title"
              ></span>
            </div>
            <div
              class="subsites-list"
              v-if="testSubsites(item.attributes) && !modifyShow"
            >
              <a
                :href="item_2.attributes.url"
                target="_blank"
                :class="{
                  'subsite-item': true,
                  'subsite-item-blurred': bgPrepared && settings.useBlur,
                }"
                v-for="(item_2, index_2) in item.attributes.subsites.data"
                :key="index_2"
              >
                <span
                  class="title fix-text-overflow"
                  v-text="item_2.attributes.title"
                ></span>
              </a>
            </div>
          </a>

          <!-- <transition name="fade"> -->
          <!-- <div
              :class="{
                'nav-item ef-float add-nav': true,
                'nav-item-blurred': bgPrepared && settings.useBlur,
              }"
              @click="showAdd()"
              v-if="modifyShow"
            >
              <span class="iconfont icon-add"></span>
              <span class="tip">自定义</span>
            </div> -->
          <!-- </transition> -->
        </transition-group>
      </div>
      <!-- 推荐列表 -->
      <div class="list-header">
        <span class="title">站点推荐</span>
        <button class="icon-button" @click="showModify()">
          <span
            :class="{
              iconfont: true,
              'icon-add': !modifyShow,
              'icon-check': modifyShow,
            }"
          ></span>
          <span class="tip">{{ !modifyShow ? "添加到收藏" : "完成" }}</span>
        </button>
      </div>
      <div :class="{'nav-block':true,'nav-block-highlight':currSubItem == index}" v-for="(item, index) in navs.others" :key="index"> <!--  v-show="currSubItem == index" -->
        <div class="sub-header" :ref="'sublist_' + index">
          <span class="title" v-text="item.attributes.name"></span>
        </div>
        <div class="nav-list" v-if="item.attributes.sites.data != null">
          <a
            :href="item_1.attributes.url"
            target="_blank"
            :class="{
              'nav-item': true,
              'ef-float': true,
              'nav-item-blurred': bgPrepared && settings.useBlur,
              'nav-item-wide': testSubsites(item_1.attributes),
            }"
            @mouseover="navItemHovered(index, index_1)"
            @mouseout="navItemLeave()"
            v-for="(item_1, index_1) in item.attributes.sites.data"
            :key="index_1"
          >
            <div
              :class="{
                left: true,
                'left-wide': testSubsites(item_1.attributes),
              }"
            >
              <div class="top">
                <div
                  class="icon-area"
                  :style="'background-color: ' + item_1.attributes.color"
                >
                  <img
                    :class="{
                      icon: true,
                      'icon-no-padding': item_1.attributes.no_padding,
                    }"
                    v-lazy="getIcon(item_1)"
                    alt=""
                    srcset=""
                  />
                </div>
                <transition name="fade">
                  <div
                    :class="{
                      'btn-modify': true,
                      'add-favor': true,
                      'ef-pudding': true,
                      'icon-button': true,
                    }"
                    v-if="modifyShow"
                    @click.prevent="addFavor(item_1)"
                  >
                    <span class="iconfont icon-add"></span>
                  </div>
                </transition>
              </div>
              <span
                class="title fix-text-overflow"
                v-text="item_1.attributes.title"
              ></span>
              <span
                :class="{
                  desc: true,
                  'desc-show':
                    currHoverIndex[0] == index && currHoverIndex[1] == index_1,
                }"
                v-text="item_1.attributes.desc"
                v-if="item_1.attributes.desc"
              ></span>
            </div>
            <div class="subsites-list" v-if="testSubsites(item_1.attributes)">
              <a
                :href="item_2.attributes.url"
                target="_blank"
                :class="{
                  'subsite-item': true,
                  'subsite-item-blurred': bgPrepared && settings.useBlur,
                }"
                v-for="(item_2, index_2) in item_1.attributes.subsites.data"
                :key="index_2"
              >
                <span
                  class="title fix-text-overflow"
                  v-text="item_2.attributes.title"
                ></span>
              </a>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Sketch } from "vue-color";
export default {
  name: "Navigation",
  components: {
    "sketch-picker": Sketch,
  },
  data() {
    return {
      isShowColors: false,
      navs: {
        favorites: [
          {
            title: "加载中",
            color: "",
            icon: "",
            url: "",
          },
        ],
        others: [],
      },
      addWindowShow: false,
      modifyShow: false,
      editing: {
        title: "",
        color: "#ffffff",
        icon: "",
        url: "",
        subsites: {
          data: [],
        },
      },
      currHoverIndex: [-2, -1],
      currSubItem: -1,
      dragIndex: "",
      enterIndex: "",
    };
  },
  computed: {
    remoteNavs: function () {
      return this.$store.getters.getNavs;
    },
    bgPrepared: function () {
      return this.$store.getters.getBgPrepared;
    },
    settings: function () {
      return this.$store.getters.getSettings;
    },
  },
  watch: {
    navs() {
      this.$store.commit("setNavs", this.navs);
    },
    addWindowShow(newStat) {
      if (!newStat) this.isShowColors = false;
      else {
        this.editing = {
          title: "",
          color: "#ffffff",
          icon: "",
          url: "",
          subsites: {
            data: [],
          },
        };
      }
    },
  },
  methods: {
    dragstart(index) {
      this.dragIndex = index;
    },
    dragenter(e, index) {
      e.preventDefault();
      if (this.dragIndex !== index) {
        const moving = this.navs.favorites[this.dragIndex];
        this.navs.favorites.splice(this.dragIndex, 1);
        this.navs.favorites.splice(index, 0, moving);
        this.dragIndex = index;
      }
    },
    dragover(e, index) {
      // this.forceUpdateMainPageData();
      e.preventDefault();
    },
    goAnchor(index) {
      if (index == -1) {
        this.currSubItem = -1;
        this.$refs.favorites.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
        // this.$refs.favorites.scrollTop = this.$refs.favorites.offsetTop;
      } else {
        this.currSubItem = index;
        let tag = "sublist_" + index;
        this.$refs[tag][0].scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
        // this.$refs[tag][0].scrollTop = this.$refs[tag][0].offsetTop;
        // setTimeout(()=>{
        //   this.currSubItem = -1;
        // },10000);
      }
    },
    navItemHovered(list, item) {
      this.currHoverIndex = [list, item];
    },
    navItemLeave() {
      this.currHoverIndex = [-2, -1];
    },
    colorValueChange(val) {
      this.editing.color = val.hex;
    },
    colorInputClick() {
      this.isShowColors = !this.isShowColors;
    },
    testSubsites(attrs) {
      try {
        if (attrs.subsites.data[0] !== undefined) return true;
        else return false;
      } catch (error) {
        console.info(error);
        return false;
      }
    },
    addNewFavor() {
      const model = {
        id: Date.now(),
        attributes: this.deepClone(this.editing),
      };
      console.log(model);
      this.navs.favorites.unshift(model);
      this.editing.title = "";
      this.editing.url = "";
      this.editing.icon = "";
      this.editing.color = "";
      this.addWindowShow = false;
    },
    showModify() {
      this.modifyShow  = !this.modifyShow;
    },
    showAdd() {
      this.addWindowShow = !this.addWindowShow;
    },
    getRemoteNavs() {
      try {
        this.$api
          .get(
            "/collections?populate[0]=sites&populate[1]=sites.icon&populate[2]=sites.subsites"
          )
          .then((response) => {
            // console.log(response.data.data);
            this.navs.others = response.data.data;
          });
      } catch (error) {
        console.log(error);
      }
    },
    getIcon(icon) {
      try {
        let url = icon.attributes.icon.data.attributes.url;
        return "https://navapi.mercutio.club" + url;
      } catch (error) {
        const template = `<svg width="140" height="140" xmlns="http://www.w3.org/2000/svg"><g><text font-family="MiSans,sans" font-weight="800" font-size="120" y="120" x="9" fill="${
          icon.attributes.color == "#ffffff" ? "#000" : "#fff"
        }">${icon.attributes.title.slice(0, 1)}</text></g></svg>`;
        const based = "data:image/svg+xml," + encodeURIComponent(template);
        return based;
      }
    },
    addFavor(item) {
      this.navs.favorites.unshift(item);
      this.updateNavs();
    },
    removeFavor(index) {
      this.navs.favorites.splice(index, 1);
      this.updateNavs();
    },
    updateNavs() {
      setTimeout(() => {
        this.$store.commit("setNavs", this.navs);
      }, 5);
    },
    deepClone(obj) {
      let _obj = JSON.stringify(obj);
      let objClone = JSON.parse(_obj);
      return objClone;
    },
  },
  created() {},
  mounted() {
    this.navs = this.remoteNavs;
    this.getRemoteNavs();
  },
  beforeDestroy() {},
};
</script>
<style lang="css" src="../styles/list.css" scoped>
</style>
<style lang="css" src="../styles/window.css" scoped>
</style>
<style scoped>
hr {
  width: 100%;
  border: none;
  border-bottom: 2px solid var(--line-color);
}
.navigation {
  display: flex;
  padding: 0;
  --hlist-width: 250px;
}
.navigation > .left {
  position: sticky;
  top: 0;
  width: var(--hlist-width);
  border-right: 1px solid var(--line-color);
}
.list-header .right {
  display: flex;
  gap: 10px;
  align-items: center;
}
.header-list {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-sizing: border-box;
  border-radius: 0 0 var(--item-radius) var(--item-radius);
  padding-bottom: 20px;
}
.header-list .item {
  margin: 0 20px;
  padding: 10px 8px;
  background: var(--sub-card-color);
  /* border-radius: var(--item-radius); */
  border-bottom: 1px solid var(--line-color);
  cursor: pointer;
  transition: all 0.2s ease;
}
.header-list .item-blurred {
  /* background: var(--blurred-sub-card-color); */
}
.header-list .item:first-child {
  border-radius: var(--item-radius) var(--item-radius) 0 0;
}
.header-list .item:last-child {
  border-radius: 0 0 var(--item-radius) var(--item-radius);
  border-bottom: none;
}
.header-list .item:only-child {
  border-radius: var(--item-radius);
  border-bottom: none;
}
.header-list .item-active {
  background: var(--accent-color);
  color: #fff;
}
.header-list .item:hover {
  background: var(--hover-color);
  color: var(--content-color);
}
.navigation > .right {
  width: calc(100% - var(--hlist-width));
  height: max-content;
}
@media screen and (max-width: 800px) {
  .navigation {
    --hlist-width: 0;
  }
  .header-list {
    display: none;
  }
  .navigation > .right {
    width: 100%;
    height: max-content;
  }
}
.nav-block {
  display: flex;
  flex-direction: column;
  margin: 5px 10px;
  padding: 10px 10px;
  box-sizing: border-box;
}
.nav-block-highlight{
  background: var(--hover-color);
  border-radius: var(--card-radius);
}
.nav-list {
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  /* grid-auto-rows: minmax(33.33%, 100px); */
}
.nav-item {
  display: flex;
  align-items: flex-start;
  justify-content: stretch;
  border-radius: var(--card-radius);
  background: var(--sub-card-color);
  transition: all 0.2s ease;
  cursor: pointer;
  border-width: 2px;
  border-style: solid;
  border-color: transparent;
  color: var(--content-color);
  padding: 10px;
}
.nav-item-blurred {
  /* background: var(--blurred-sub-card-color); */
}
.nav-item:hover {
  background: var(--card-color);
}
.nav-item:active {
  border-color: var(--accent-color);
  background: var(--card-color);
  box-shadow: 0 10px 20px 3px #00000024;
  transform: translateY(-3px);
}
.nav-item-drag {
  cursor: move;
}
.nav-item-drag:hover,
.nav-item-drag:active {
  background: var(--sub-card-color);
  box-shadow: none;
  transform: none;
}
.nav-item-wide {
  grid-column-start: span 2;
}
.nav-item .icon-area {
  border-radius: var(--icon-radius);
  /* width: 30px; */
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  overflow: hidden;
}
.nav-item .icon {
  box-sizing: border-box;
  padding: 7px;
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.nav-item .icon-no-padding {
  padding: 0;
}
.nav-item .left .title {
  font-size: 0.9em;
}
.nav-item .left .desc {
  display: none;
}
.nav-item .left .desc-show {
  display: block;
  position: absolute;
  bottom: calc(-1em - 20px);
  left: 0;
  width: max-content;
  /* display: block; */
  padding: 5px 15px;
  background: var(--card-color);
  border-radius: var(--item-radius);
  max-width: 300px;
  box-shadow: 0 10px 20px 3px #00000024;
}
.subsites-list {
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
}
.subsite-item {
  border-radius: var(--item-radius);
  background: var(--card-color);
  transition: all 0.2s ease;
  cursor: pointer;
  border-width: 2px;
  border-style: solid;
  border-color: var(--sub-card-color);
  color: var(--content-color);
  padding: 10px;
  box-sizing: border-box;
}
.subsite-item-blurred {
  /* background: var(--blurred-sub-card-color); */
  /* border-color: var(--blurred-sub-card-color); */
}
.subsite-item:hover {
  background: var(--sub-card-color);
}
.subsite-item:active {
  background-color: var(--accent-color);
  color: #fff;
  border-color: transparent;
}
.subsite-item .title {
  font-size: 16px;
}
.top {
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
}
.btn-modify {
  padding: 5px 7px;
  background: var(--card-color);
  border-radius: var(--item-radius);
  border: 2px solid var(--sub-card-color);
}
.btn-modify .iconfont {
  font-size: 20px;
}

.btn-modify:hover {
  background: var(--sub-card-color);
  border-color: transparent;
}
.add-favor:active {
  background: var(--accent-color);
  color: #fff;
}
.remove-favor:active {
  background: var(--warn-color);
  color: #fff;
}
.add-nav {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.add-nav .iconfont {
  font-size: 30px;
}
.mask-on {
  height: calc(100vh - var(--head-height));
  overflow: hidden;
}
.nav-list .left {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  gap: 10px;
}
.nav-list .left-wide {
  width: 50%;
}
/* list */
.list-header {
  padding: 20px 20px 8px 20px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  border-bottom: 1px solid var(--line-color);
  position: sticky;
  top: 0;
  background: var(--blurred-card-color);
  backdrop-filter: blur(30px) saturate(180%);
  z-index: 300;
}
.list-header .title {
  font-weight: 900;
  font-size: 1.4em;
}
.sub-header {
  padding: 15px 0 10px 5px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  /* position: sticky; */
  /* top:var(--head-height); */
}
.sub-header .title {
  font-size: 1.3em;
}
.list-header .icon-button {
  border: 2px solid var(--line-color);
  display: flex;
  justify-content: center;
  gap: 5px;
}
.list-header .icon-button:hover {
  border-color: transparent;
}
.list-header .icon-button .iconfont {
  font-size: 20px;
}
.list-header .icon-button .tip {
  font-size: 14px;
}

.hide {
  display: none;
}
.general-window {
  gap: 10px;
}
.drag-move {
  transition: transform 0.3s;
}
.drag-tip{
  font-size: .8em;
  color: var(--subtitle-color);
}
</style>