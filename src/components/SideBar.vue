<template>
  <div class="sidebar">
    <div id="nav">
      <router-link class="ef-pudding" v-for="(item,index) in tabs" :key="index" :to="item.to" @click.native="scroll()">
        <span :class="'iconfont '+item.icon"></span>
      </router-link>
    </div>
    <div id="more">
      <router-link class="ef-pudding" v-for="(item,index) in moreTabs" :key="index" :to="item.to" @click.native="scroll()">
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
        },{
          to:"/about",
          icon:"icon-qi"
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
  computed: {},
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
  height: calc(100vh - var(--head-height));
  background: var(--bg-color);
  z-index: 11;
  flex-shrink: 0;
}
@media screen and (min-width: 600px) {
  .sidebar {
    position: fixed;
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
#nav a .iconfont {
  font-size: 30px;
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
#more a .iconfont {
  font-size: 25px;
}
#more a.router-link-exact-active {
  color: var(--accent-color);
}
</style>