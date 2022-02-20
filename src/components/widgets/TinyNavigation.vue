<template>
  <div class="tiny-nav">
    <div class="header">
      <span class="title">我的导航</span>
    </div>
    <div class="nav-list">
      <div class="nav-item ef-float" v-for="(item, index) in 5" :key="index">
        <img :src="require('@/assets/images/webpage.svg')" alt="" srcset="" />
        <span>名称</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
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
  border-radius: var(--card-radius);
  background: var(--bg-color);
  align-items: center;
  justify-content: space-evenly;
  transition: all 0.2s ease;
  cursor: pointer;
  border-width: 2px;
  border-style: solid;
  border-color: transparent;
  gap: 5px;
}
.nav-item:hover {
  background: var(--card-color);
}
.nav-item:active {
  border-color: var(--accent-color);
  background: var(--bg-color);
}
.nav-item img {
  height: 50%;
}
</style>