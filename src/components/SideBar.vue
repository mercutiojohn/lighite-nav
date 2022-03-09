<template>
  <div :class="{'sidebar':true,'sidebar-blurred':bgPrepared}">
    <div class="title-box">
      <span :class="{'title':true,'title-blurred':bgPrepared}" v-text="title"></span>
    </div>
    <div id="nav">
      <router-link :class="{'ef-pudding':true,'blurred':bgPrepared}" v-for="(item,index) in tabs" :key="index" :to="item.to" @click.native="scroll()">
        <span :class="'iconfont '+item.icon"></span>
      </router-link>
    </div>
    <div id="more">
      <router-link :class="{'ef-pudding':true,'blurred':bgPrepared}" v-for="(item,index) in moreTabs" :key="index" :to="item.to" @click.native="scroll()">
        <span :class="'iconfont '+item.icon"></span>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
  components: {},
  data() {
    return {
      title: "Lightie",
      tabs:[
        {
          to:"/",
          icon:"icon-apps-fill"
        },{
          to:"/navigation",
          icon:"icon-zhinanzhen"
        // },{
        //   to:"/music",
        //   icon:"icon-musicbox"
        // },{
        //   to:"/video",
        //   icon:"icon-VideoClip-1"
        // },{
        //   to:"/books",
        //   icon:"icon-book"
        },{
          to:"/tools",
          icon:"icon-app"
        // },{
        //   to:"/about",
        //   icon:"icon-qi"
        },
      ],
      moreTabs:[
        {
          to:"/settings",
          icon:"icon-cog"
        },
      ]
    };
  },
  computed: {
    bgPrepared: function () {
      return this.$store.getters.getBgPrepared;
    }
  },
  watch: {},
  methods: {
    scroll() {
      // console.log(document.querySelector("body > div").scrollTop);
      // document.querySelector("body > div").scrollTop = document.documentElement.scrollTop = 0;
    },
  },
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
  height:100vh;
  z-index: 11;
  flex-shrink: 0;
}
@media screen and (min-width: 600px) {
  .sidebar {
    position: fixed;
    top: 0;

  }
}
@media screen and (max-width: 600px) {
  .sidebar {
    background: var(--bg-color);
    flex-direction: row;
    height: var(--bottom-height);
    width: 100%;
    position: fixed;
    bottom: 0;
    top: none;
  }
  .sidebar-blurred{
    background: var(--blurred-card-color);
    backdrop-filter: blur(var(--blur-width)) saturate(280%);
  }
}
#nav {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
}
@media screen and (max-width: 600px) {
  #nav {
    height: auto;
    width: 100%;
    flex-direction: row;
  }
}
#nav a {
  border-radius: 14px;
  padding: 10px;
  text-decoration: none;
  color: var(--title-color);
  transition: transform 0.2s ease, color 0.2s ease, background-color 0.2s ease;
}
#nav a.blurred{
  color: var(--title-color-blurred);
  text-shadow: 0 2px 10px #00000034;
}
#nav a .iconfont {
  font-size: var(--icon-size);
}

#nav a.router-link-exact-active {
  color: var(--accent-color);
}
#more {
  height: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap:10px;
  flex-shrink: 0;
}
#more a {
  border-radius: 14px;
  padding: 10px;
  text-decoration: none;
  color: var(--title-color);
  transition: transform 0.2s ease, color 0.2s ease, background-color 0.2s ease;
}
#more a.blurred{
  color: var(--title-color-blurred);
  text-shadow: 0 2px 10px #00000034;
}
#more a .iconfont {
  font-size: 25px;
}
#more a.router-link-exact-active {
  color: var(--accent-color);
}
.title-box {
  height: var(--head-height);
  /* width: 150px; */
  padding: 10px;
  box-sizing: border-box;
  /* background: rgb(128, 128, 128); */
  display: flex;
  align-items: center;
  justify-content: center;
}
.title-blurred{
  color: var(--title-color-blurred);
  text-shadow: 0 2px 10px #00000034;
}
@media screen and (max-width: 700px) {
  .title-box {
    display: none;
  }
  #more a.blurred{
    text-shadow: unset;
  }
}
.title {
  font-family: AtmaSerif;
  font-size: 30px;
  font-weight: 900;
}
</style>