<template>
  <div class="tiny-nav">
    <div class="header">
      <span class="title">我的导航</span>
      <router-link to="/navigation">
        <button class="icon-button">
          <span class="label">更多 / 自定义</span>
          <span class="iconfont icon-chevron-right"></span>
        </button>
      </router-link>
    </div>
    <div class="nav-list">
      <a
        :href="item.attributes.url"
        target="_blank"
        :class="{
          'nav-item': true,
          'ef-float': true,
          'nav-item-blurred': bgPrepared && settings.useBlur,
          'nav-item-wide': checkSubsites(item.attributes),
        }"
        v-for="(item, index) in navs.favorites"
        :key="index"
      >
        <div
          :class="{
            left: true,
            'left-wide': checkSubsites(item.attributes),
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
          </div>

          <span
            class="title fix-text-overflow"
            v-text="item.attributes.title"
          ></span>
        </div>
        <div
          class="subsites-list"
          v-if="checkSubsites(item.attributes)"
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
    </div>
  </div>
</template>

<script>
export default {
  name: "TinyNavigation",
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
      },
    };
  },
  computed: {
    remoteNavs: function () {
      return this.$store.getters.getNavs;
    },
    bgPrepared: function () {
      return this.$store.getters.getBgPrepared;
    },
    settings: function(){
      return this.$store.getters.getSettings;
    }
  },
  watch: {
    navs() {
      this.$store.commit("setNavs", this.navs);
    },
  },
  methods: {
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
    checkSubsites(item){
      try {
        if(item.subsites.data[0] !== undefined){
          return true;
        }else{
          return false;
        }
      } catch (error) {
        console.info(error);
        return false;
      }
      
    }
  },
  created() {},
  mounted() {
    this.navs = this.remoteNavs;
  },
  beforeDestroy() {},
};
</script>
<style lang="css" src="../../styles/card.css" scoped>
</style>
<style scoped>
.header {
  padding: 0 0 10px 0;
}
.nav-list {
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  /* grid-auto-rows: 100px; */
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
  padding: 7px;
}
.nav-item-blurred {
  background: var(--blurred-sub-card-color);
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
}
.nav-item .icon {
  box-sizing: border-box;
  padding: 7px;
  width: 100%;
  height: 100%;
  object-fit: contain;
  overflow: hidden;
}
.nav-item .icon-no-padding {
  padding: 0;
}
.nav-item .title {
  font-size: 14px;
}
.subsites-list {
  margin-left: 7px;
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
  overflow: hidden;
}
.subsites-list:hover {
  overflow: unset;
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
  padding: 5px;
  box-sizing: border-box;
}
.subsite-item-blurred {
  background: var(--blurred-sub-card-color);
  border-color: var(--blurred-sub-card-color);
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
.left {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  gap: 10px;
}
.left-wide {
  width: 40%;
}
</style>