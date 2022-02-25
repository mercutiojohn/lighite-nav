<template>
  <div class="tiny-nav">
    <div class="header">
      <span class="title">我的导航</span>
      <router-link to="/navigation">
        <button class="icon-button">
            <span class="label">更多</span>
            <span class="iconfont icon-chevron-right"></span>
        </button>
        </router-link>
    </div>
    <div class="nav-list">
      <a :href="item.url" target="_blank" class="nav-item ef-float" v-for="(item, index) in navs.favorites" :key="index">
        <img class="icon" :src="require('@/assets/images/webpage.svg')" alt="" srcset="" />
        <span class="title fix-text-overflow" v-text="item.title"></span>
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
      navs:{
        favorites:[
        {
          title: "加载中",
          color: "",
          icon: "",
          url: "",
        },
      ]
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
  methods: {},
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
  grid-auto-rows: minmax(33.33%, 90px);
}
.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: var(--card-radius);
  background: var(--sub-card-color);
  justify-content: space-evenly;
  transition: all 0.2s ease;
  cursor: pointer;
  border-width: 2px;
  border-style: solid;
  border-color: transparent;
  gap: 5px;
  color: var(--content-color);
}
.nav-item:hover {
  background: var(--card-color);
}
.nav-item:active {
  border-color: var(--accent-color);
  background: var(--sub-card-color);
}
.nav-item .icon {
  height: 50%;
}
.nav-item .title{
  font-size: 12px;
}
</style>