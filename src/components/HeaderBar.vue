<template>
  <div :class="{'header':true,'header-with-bg':ifScrolled,'header-with-bg-blurred':ifScrolled&&bgPrepared}">
    <div class="title-box">
      <span :class="{'title':true,'title-blurred':bgPrepared}" v-text="title"></span>
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
      title: "",
      ifScrolled:false
    };
  },
  computed: {
    bgPrepared: function () {
      return this.$store.getters.getBgPrepared;
    }
  },
  watch: {
    $route(to,from){
      // console.log(to.desc);
      this.title = to.name;
      // if(to.path == "/tools"){
      //   this.title = "工具"
      // } else if(to.path == "/navigation"){
      //   this.title = "导航"
      // } else if(to.path == "/"){
      //   this.title = "首页"
      // }
      // document.querySelector("body > div").scrollTop = 0;
    }
  },
  methods: {
    handleScroll(){
      // console.log(document.querySelector("body > div").scrollTop +', '+ document.documentElement.scrollTop);
      if(document.querySelector("body > div").scrollTop)
        this.ifScrolled = true;
      else
        this.ifScrolled = false;
      console.log(this.ifScrolled);
    }
  },
  created() {},
  mounted() {
    document.querySelector("body > div").addEventListener("scroll", this.handleScroll);
    this.title = this.$route.name;
  },
  beforeDestroy() {
    document.querySelector("body > div").removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<style scoped>
.header {
  height: var(--head-height);
  width: calc(100% - var(--side-width));
  margin-left:var(--side-width);
  /* background: var(--bg-color); */
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 1000;
}
@media screen and (max-width: 600px) {
  
  .header {
    width: 100%;
    margin-left:0;
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
  /* font-family: AtmaSerif; */
  font-size: 20px;
  font-weight: 900;
}
.title-blurred{
  color: var(--title-color-blurred);
  text-shadow: 0 2px 10px #00000034;
}
.profile-box {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 15px;
  padding: 0 20px;
}
.header-with-bg{
  background: var(--bg-color);
}
.header-with-bg-blurred{
  background: var(--blurred-card-color);
  backdrop-filter: blur(var(--blur-width)) saturate(280%);
}
</style>