<template>
  <Scroll-Div view-class="app" width="100vw" height="100vh">
    <Header />
    <div id="main-box">
      <Sidebar />
      <router-view />
    </div>
  </Scroll-Div>
  <!-- <div id="app">
    <Header />
    <div id="main-box">
      <Sidebar />
      <router-view />
    </div>
  </div> -->
</template>
<script>
import Header from "@/components/HeaderBar.vue";
import Sidebar from "@/components/SideBar.vue";

export default {
  name: "App",
  components: {
    Header,
    Sidebar,
  },
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
@import "styles/common.css";
@import "styles/fonts.css";

#main-box {
  display: flex;
}

@media screen and (max-width: 600px) {
  #main-box {
    flex-direction: column-reverse;
  }
}
</style>
