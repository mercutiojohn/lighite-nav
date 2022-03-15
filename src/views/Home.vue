<template>
  <div
    ref="home"
    :class="{ home: true, 'home-with-bg': bgPrepared, 'fix-scrollbar': true }"
  >
    <WallpaperShow />
    <div :class="{ blocks: true }">
      <div
        v-for="(item, index) in fixedCards"
        :key="index"
        :class="{
          card: true,
          'fix-scrollbar': item.ifFixScrollbar,
          'card-blurred': bgPrepared && settings.useBlur,
          'card-main': item.card == 'main',
          'card-long': item.card == 'long',
          'card-small': item.card == 'small',
          'card-new-1': item.card == 'new-1',
          'card-new-2': item.card == 'new-2'
        }"
      >
        <component v-bind:is="item.component"></component>
      </div>
      <div
        v-for="(item, index) in cards"
        :key="index"
        :class="{
          card: true,
          'fix-scrollbar': item.ifFixScrollbar,
          'card-blurred': bgPrepared && settings.useBlur,
          'card-main': item.card == 'main',
          'card-long': item.card == 'long',
          'card-small': item.card == 'small',
          'card-new-1': item.card == 'new-1',
          'card-new-2': item.card == 'new-2'
        }"
        v-if="!item.hide"
      >
        <component v-bind:is="item.component"></component>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import TinyBook from "@/components/widgets/TinyBook.vue";
// import TinyVideo from "@/components/widgets/TinyVideo.vue";
import TinyBiliRank from "@/components/widgets/TinyBiliRank.vue";
import TinyAnimeChart from "@/components/widgets/TinyAnimeChart.vue";
import TinyMusic from "@/components/widgets/TinyMusic.vue";
import TinyMusicChart from "@/components/widgets/TinyMusicChart.vue";
import WeiboHot from "@/components/widgets/WeiboHot.vue";
import GreetingBox from "@/components/widgets/GreetingBox.vue";
import Weather from "@/components/widgets/Weather.vue";
import TinyToDo from "@/components/widgets/TinyToDo.vue";
import WallpaperShow from "@/components/utils/WallpaperShow.vue";
// import { component } from "vue/types/umd";
// import OneSentence from '@/components/widgets/OneSentence.vue';

export default {
  name: "Home",
  components: {
    // TinyBook,
    // TinyVideo,
    TinyMusic,
    TinyMusicChart,
    TinyAnimeChart,
    GreetingBox,
    Weather,
    TinyToDo,
    WallpaperShow,
    TinyBiliRank,
    WeiboHot
    // OneSentence,
  },
  data() {
    return {
      ifScrolled: false,
      fixedCards:[
        { 
          component: "GreetingBox", 
          ifMainCard: true,
          ifFixScrollbar:true, 
          title: "网址导航",
          card:"main"
        },{ 
          component: "Weather", 
          title: "天气",
          card:"small"
        },{ 
          component: "TinyToDo", 
          title: "待办清单",
          card:"long"
        },{ 
          component: "TinyMusic", 
          title: "歌词",
          card:"small"
        }
      ],
      cards: [
        { 
          component: "TinyBiliRank", 
          title: "热门视频",
          card:"new-1"
        },{ 
          component: "WeiboHot", 
          title: "微博热搜",
          card:"new-1"
        },{ 
          component: "TinyMusicChart", 
          title: "音乐排行",
          card:"new-1"
        },{ 
          component: "TinyAnimeChart", 
          title: "番剧排行",
          card:"new-1"
        }
        ],
    };
  },
  computed: {
    mode: function () {
      return this.$store.getters.getMode;
    },
    bgPrepared: function () {
      return this.$store.getters.getBgPrepared;
    },
    settings: function () {
      return this.$store.getters.getSettings;
    },
    remoteMainPageData: function () {
      return this.$store.getters.getMainPageData;
    },
  },
  watch:{
    cards() {
      this.$store.commit("setMainPageData", this.cards);
    },
  },
  methods: {
    handleScroll() {
      // console.log(this.$refs.home)
      // console.log(document.querySelector("body > div").scrollTop +', '+ document.documentElement.scrollTop);
      if (this.$refs.home.scrollTop) this.ifScrolled = true;
      else this.ifScrolled = false;
      this.$store.commit("setIfScrolled", this.ifScrolled);
      this.$store.commit("setHomeScrollTop", this.$refs.home.scrollTop);
    },
  },
  created() {},
  mounted() {
    this.cards = this.remoteMainPageData;
    this.$refs.home.addEventListener("scroll", this.handleScroll);
    this.title = this.$route.name;
    this.$store.commit("setHomeScrollTop", 0);
  },
  beforeDestroy() {
    this.$refs.home.removeEventListener("scroll", this.handleScroll);
    this.$store.commit("setHomeScrollTop", 0);
  },
};
</script>

<style scoped>
.home {
  --padding: 50px;
  padding: var(--padding);
}
.home::-webkit-scrollbar {
  display: none;
}
@media screen and (min-width: 700px) and (max-width: 1080px) {
  .home {
    --padding: 20px;
  }
}
@media screen and (max-width: 700px) {
  .home {
    --padding: 10px;
  }
}
.home-with-bg {
  padding-top: 10px;
}
.blocks {
  box-sizing: border-box;
  display: grid;
  grid-template-columns: repeat(4, 1fr);

  grid-auto-rows: minmax(300px, auto);
  gap: 1.5vw;
  height: unset;
  overflow: unset;
  transition: opacity 0.3s ease;
}
.blocks-hide {
  opacity: 0.4;
}
@media screen and (min-width: 1080px) {
  .blocks {
    grid-template-rows: repeat(
      2,
      calc((100vh - var(--head-height) - var(--padding)) / 3)
    );
  }
}
@media screen and (min-width: 700px) and (max-width: 1080px) {
  .blocks {
    grid-template-rows: unset, 300px;
    grid-auto-rows: minmax(100px, auto);
  }
}
@media screen and (max-width: 700px) {
  .blocks {
    grid-template-rows: unset;
    grid-auto-rows: minmax(100px, auto);
  }
}

.card {
  box-sizing: border-box;
  background: var(--card-color);
  border-radius: var(--card-radius);
  overflow-x: hidden;
  /* overflow-y: scroll; */
}
.card-no-bg {
  background: transparent;
}
.card-blurred {
  background: var(--blurred-card-color);
  backdrop-filter: blur(var(--blur-width)) saturate(280%);
}

.card-main {
  grid-row: 1 / 3;
  grid-column: 1 / 3;
}
.card-sub1 {
  grid-column: 1 / 3;
}
.card-sub2 {
  grid-column: 3 / 5;
}
.card-more {
  grid-column: 1 / 5;
}
.card-long {
  grid-row: 1 / 3;
}
.card-new-1 {
  grid-column-start: span 1;
}
.card-new-2 {
  grid-column-start: span 2;
}
@media screen and (min-width: 1000px) and (max-width: 1200px) {
  .card-new-1 {
    grid-column-start: span 2;
  }
}
@media screen and (min-width: 700px) and (max-width: 1000px) {
  .card-main,
  .card-small {
    grid-column: 1 / 5;
  }
  .card-long {
    grid-row: unset;
    grid-column: 1 / 5;
  }
  .card-sub1 {
    grid-column: 1 / 3;
  }

  .card-sub2 {
    grid-column: 3 / 5;
  }
  .card-more {
    grid-row: unset;
    grid-column: 1 / 5;
  }
  .card-new-1 {
    grid-column-start: span 4;
  }
  .card-new-2 {
    grid-column-start: span 4;
  }
}
@media screen and (max-width: 700px) {
  .card-sub1,
  .card-sub2,
  .card-main,
  .card-small,
  .card-long,
  .card-more {
    grid-row: unset;
    grid-column: 1 / 5;
  }
  .card-new-1 {
    grid-column-start: span 4;
  }
  .card-new-2 {
    grid-column-start: span 4;
  }
}
</style>
