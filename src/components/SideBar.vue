<template>
  <div class="sidebar">
    <div id="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
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
.sidebar {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: var(--side-width);
  height: calc(100vh - var(--head-height));
  background: var(--bg-color);
  position: sticky;
  top:var(--head-height);
}
#nav {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: var(--accent-color);
}
</style>