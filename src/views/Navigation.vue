<template>
  <div
    :class="{ navigation: true, 'common-page': true, 'mask-on': addWindowShow }"
  >
    <transition name="fade">
      <div
        class="general-window-mask"
        v-if="addWindowShow"
        @click.self="showAdd()"
      >
        <div class="general-window">
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
          />
          <span class="tip">主色调</span>
          <input
            type="text"
            v-model="editing.color"
            name="color"
            id="icon"
            class="better-input"
            placeholder="格式:#AABBCC"
          /> -->
          <button class="submit-button ef-pudding" @click="addNewFavor()">提交</button>
        </div>
      </div>
    </transition>
    <div class="list-header">
      <span class="title">我的收藏</span>
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
    <div class="nav-list">
      <a
        :href="item.attributes.url"
        target="_blank"
        :class="{
          'nav-item': true,
          'ef-float': true,
          'nav-item-wide': testSubsites(item.attributes),
        }"
        v-for="(item, index) in navs.favorites"
        :key="index"
      >
        <div
          :class="{
            left: true,
            'left-wide': testSubsites(item.attributes),
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
        <div class="subsites-list" v-if="testSubsites(item.attributes)">
          <a
            :href="item_2.attributes.url"
            target="_blank"
            class="subsite-item"
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
      <transition name="fade">
        <div
          class="nav-item ef-float add-nav"
          @click="showAdd()"
          v-if="modifyShow"
        >
          <span class="iconfont icon-add"></span>
          <span class="tip">自定义</span>
        </div>
      </transition>
    </div>
    <div class="nav-block" v-for="(item, index) in navs.others" :key="index">
      <div class="list-header">
        <span class="title" v-text="item.attributes.name"></span>
      </div>
      <div class="nav-list" v-if="item.attributes.sites.data != null">
        <a
          :href="item_1.attributes.url"
          target="_blank"
          :class="{
            'nav-item': true,
            'ef-float': true,
            'nav-item-wide': testSubsites(item_1.attributes),
          }"
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
                  :src="getIcon(item_1)"
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
          </div>
          <div class="subsites-list" v-if="testSubsites(item_1.attributes)">
            <a
              :href="item_2.attributes.url"
              target="_blank"
              class="subsite-item"
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
</template>

<script>
export default {
  name: "Navigation",
  components: {},
  data() {
    return {
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
    };
  },
  computed: {
    remoteNavs: function () {
      return this.$store.getters.getNavs;
    },
  },
  watch: {
    navs() {
      this.$store.commit("setNavs", this.navs);
    },
  },
  methods: {
    testSubsites(attrs) {
      try {
        if (attrs.subsites.data[0] !== undefined) return true;
        else return false;
      } catch (error) {
        console.log(error);
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
      this.modifyShow ? (this.modifyShow = false) : (this.modifyShow = true);
    },
    showAdd() {
      this.addWindowShow
        ? (this.addWindowShow = false)
        : (this.addWindowShow = true);
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
        return "http://navapi.mercutio.club" + url;
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
.navigation {
  /* overflow: hidden; */
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
.nav-item:hover {
  background: var(--card-color);
}
.nav-item:active {
  border-color: var(--accent-color);
  background: var(--card-color);
  box-shadow: 0 10px 20px 3px #00000024;
  transform: translateY(-3px);
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
.nav-item .title {
  font-size: 16px;
}

.subsites-list {
  margin-left: 10px;
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
.left {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  gap: 10px;
}
.left-wide {
  width: 50%;
}
/* list */
.list-header {
  padding: 10px 0 5px 0;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  /* position: sticky; */
  /* top:var(--head-height); */
}
.list-header .title {
  font-weight: 900;
  font-size: 20px;
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
.general-window{
  gap:10px;
}
</style>