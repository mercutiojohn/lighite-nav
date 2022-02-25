<template>
  <div class="navigation common-page">
    <div class="list-header">
      <span class="title">我的收藏</span>
    </div>

    <div class="nav-list">
      <a
        :href="item.url"
        target="_blank"
        class="nav-item ef-float"
        v-for="(item, index) in navs.favorites"
        :key="index"
      >
        <img
          class="icon"
          :src="require('@/assets/images/webpage.svg')"
          alt=""
          srcset=""
        />
        <span class="title fix-text-overflow" v-text="item.title"></span>
      </a>
    </div>
    <div class="nav-block" v-for="(item, index) in navs.others" :key="index">
      <div class="list-header">
        <span class="title" v-text="item.title"></span>
      </div>
      <div class="nav-list">
        <a
          :href="item_1.url"
          class="nav-item ef-float"
          v-for="(item_1, index_1) in item.list"
          :key="index_1"
        >
          <img
            class="icon"
            :src="require('@/assets/images/webpage.svg')"
            alt=""
            srcset=""
          />
          <span class="title fix-text-overflow-multiline" v-text="item_1.title"></span>
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
<style lang="css" src="../styles/list.css" scoped>
</style>
<style scoped>
.navigation {
}

.nav-list {
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  grid-auto-rows: minmax(33.33%, 70px);
}
.nav-item {
  display: flex;
  /* flex-direction: column; */
  align-items: center;
  border-radius: var(--card-radius);
  background: var(--sub-card-color);
  justify-content:flex-start;
  transition: all 0.2s ease;
  cursor: pointer;
  border-width: 2px;
  border-style: solid;
  border-color: transparent;
  gap: 10px;
  color: var(--content-color);
  padding: 10px;
}
.nav-item:hover {
  background: var(--card-color);
}
.nav-item:active {
  border-color: var(--accent-color);
  background: var(--sub-card-color);
}
.nav-item .icon {
  height: 80%;
}
.nav-item .title {
  font-size: 16px;
}
</style>