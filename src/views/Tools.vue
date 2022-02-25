<template>
  <div class="tools common-page">
    <div class="navs">
      <div class="header"><span class="header-title">收藏和发现</span></div>
      <div class="navs-list">
        <router-link
          class="nav-item ef-float"
          v-for="(item, index) in navs"
          :key="index"
          :to="item.link"
        >
          <span :class="'icon iconfont icon-' + item.icon"></span>
          <span class="title" v-text="item.title"></span>
        </router-link>
      </div>
    </div>
    <div class="more-tools">
      <div class="header"><span class="header-title">工具</span></div>
      <div class="tools-list">

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Tools",
  components: {},
  data() {
    return {
      navs: [
        {
          title: "音乐",
          icon: "musicbox",
          link: "/music",
        },
        {
          title: "视频",
          icon: "VideoClip-1",
          link: "/video",
        },
        {
          title: "书籍和文章",
          icon: "book",
          link: "/books",
        },
        {
          title: "待办事项",
          icon: "richeng",
          link: "/todo",
        },
        {
          title: "网址导航",
          icon: "zhinanzhen",
          link: "/navigation",
        },
      ],
      tools: [{}],
    };
  },
  computed: {},
  watch: {},
  methods: {},
  created() {},
  mounted() {},
  beforeDestroy() {},
};
</script>

<style scoped>
.tools {

}
.header{
    margin: 10px 0;
}
.navs-list {
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  grid-auto-rows: minmax(33.33%, 60px);
}
.nav-item {
  display: flex;
  background: var(--sub-card-color);
  border-radius: var(--card-radius);
  align-items: center;
  justify-content: center;
  /* flex-direction: column; */
  gap:10px;
}
.nav-item .icon{
    font-size: var(--icon-size);
}
</style>