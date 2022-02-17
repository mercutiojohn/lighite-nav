<template>
  <div id="app">
    <Header />
    <div id="main-box">
      <Sidebar />

      <router-view />
    </div>
  </div>
</template>
<script>
import Header from "@/components/HeaderBar.vue";
import Sidebar from "@/components/SideBar.vue";

export default {
  name: "App",
  components: {
    Header,
    Sidebar
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

#main-box{
  display:flex;
}
</style>
