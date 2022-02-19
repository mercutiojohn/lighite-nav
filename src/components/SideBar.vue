<template>
  <div class="sidebar">
    <div id="nav">
      <router-link to="/"><span class="iconfont icon-zhinanzhen"></span></router-link>
      <router-link to="/about"><span class="iconfont icon-qi"></span></router-link>
    </div>
  </div>
</template>

<script>


export default {
  name: "Sidebar",
  components: {},
  data() {
    return {};
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
@import "../assets/iconfont/iconfont.css";

.sidebar {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: var(--side-width);
  height: calc(100vh - var(--head-height));
  background: var(--bg-color);
}
@media screen and (min-width: 600px) {
  .sidebar {
    position: sticky;
    top: var(--head-height);
  }
}
@media screen and (max-width: 600px) {
  .sidebar {
    flex-direction: row;
    height: var(--bottom-height);
    width: 100%;
    position: fixed;
    bottom: 0;
    top: none;
  }
}
#nav {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
}
@media screen and (max-width: 600px) {
  #nav {
    height: auto;
    width: 100%;
    flex-direction: row;
  }
}
#nav a{
  border-radius: 14px;
  padding: 10px;
  text-decoration: none;
  color:var(--title-color);
  transition: transform .2s ease,color .2s ease,background-color .2s ease;
}
#nav a:hover{
  background: var(--hover-color);
  transform: scale(1.1);
}
#nav a:active{
  background: var(--active-color);
  transform: scale(0.95);

}
#nav a .iconfont {
  font-size: 30px;
}

#nav a.router-link-exact-active {
  color: var(--accent-color);
}

</style>