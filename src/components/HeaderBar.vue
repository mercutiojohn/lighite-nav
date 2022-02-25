<template>
  <div class="header">
    <div class="title-box">
      <span class="title" v-text="title"></span>
    </div>
    <div class="profile-box">
      <TinyClock class="hide-clock"/>
      <Profile />
    </div>
  </div>
</template>

<script>
import TinyClock from "@/components/widgets/TinyClock.vue";
import Profile from "@/components/utils/Profile.vue";
export default {
  name: "Header",
  components: {
    TinyClock,
    Profile,
  },
  data() {
    return {
      title: "Lightie",
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
.header {
  height: 80px;
  width: 100%;
  background: var(--bg-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 1000;
}
@media screen and (max-width: 600px) {
  .header {
    position: static;
  }
  .hide-clock{
      display: none;
  }
}
.title-box {
  height: 100%;
  /* width: 150px; */
  padding: 0 30px;
  /* background: rgb(128, 128, 128); */
  display: flex;
  align-items: center;
  justify-content: center;
}
.title {
  font-family: AtmaSerif;
  font-size: 40px;
  font-weight: 900;
}
.profile-box {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 15px;
  padding: 0 20px;
}
</style>