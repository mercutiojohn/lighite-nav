<template>
  <div
    ref="home"
    :class="{ home: true, 'home-with-bg': bgPrepared, 'fix-scrollbar': true }"
  >
    <WallpaperShow />
    <div :class="{ blocks: true }">
      <div
        v-for="(item, index) in fixedCards"
        :key="'s'+index"
        :class="{
          card: true,
          'fix-scrollbar': item.ifFixScrollbar,
          'card-blurred': bgPrepared && settings.useBlur,
          'card-no-bg': item.nobg == true,
          'card-w-2-h-1': item.card == 'w-2-h-1',
          'card-w-1-h-2': item.card == 'w-1-h-2',
          'card-w-1-h-1': item.card == 'w-1-h-1',
          'card-w-1-h-auto': item.card == 'w-1-h-auto',
          'card-w-2-h-auto': item.card == 'w-2-h-auto',
          'card-w-4-h-auto': item.card == 'w-4-h-auto'
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
          'card-no-bg': item.nobg == true,
          'card-w-2-h-1': item.card == 'w-2-h-1',
          'card-w-1-h-2': item.card == 'w-1-h-2',
          'card-w-1-h-1': item.card == 'w-1-h-1',
          'card-w-1-h-auto': item.card == 'w-1-h-auto',
          'card-w-2-h-auto': item.card == 'w-2-h-auto',
          'card-w-4-h-auto': item.card == 'w-4-h-auto'
        }"
        v-if="!item.hide"
        :ref="item.component"
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
import TinyNavigation from "@/components/widgets/TinyNavigation.vue";
import TinyMusic from "@/components/widgets/TinyMusic.vue";
import TinyMusicChart from "@/components/widgets/TinyMusicChart.vue";
import WeiboHot from "@/components/widgets/WeiboHot.vue";
import GreetingBox from "@/components/widgets/GreetingBox.vue";
import Weather from "@/components/widgets/Weather.vue";
import TinyToDo from "@/components/widgets/TinyToDo.vue";
import TopicCovid from "@/components/widgets/TopicCovid.vue";
import WallpaperShow from "@/components/utils/WallpaperShow.vue";
import Loading from '@/components/utils/Loading.vue'
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
    TinyNavigation,
    GreetingBox,
    Weather,
    TinyToDo,
    WallpaperShow,
    TinyBiliRank,
    WeiboHot,
    Loading,
    TopicCovid
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
          title: "欢迎",
          card:"w-2-h-1"
        },{ 
          component: "Weather", 
          title: "天气",
          card:"w-1-h-1"
        },{ 
          component: "TinyMusic", 
          title: "歌词",
          card:"w-1-h-1"
        },{ 
          component: "TinyNavigation", 
          title: "导航",
          card:"w-4-h-auto",
          // nobg:true
        }
      ],
      cards: [

        ],
        cardTop:{},
        cardBottom:{}
    };
  },
  computed: {
    docHeight: function(){
      return document.body.clientHeight;
    },
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
      // this.cards.forEach(element => {
      //   this.$refs[element.component][0].style.transform = `scale(${(1 - (
      //       (this.$refs[element.component][0].getBoundingClientRect().bottom - this.docHeight)  / 1000 / 10
      //     ).toFixed(2))>1?1:(1 - (
      //       (this.$refs[element.component][0].getBoundingClientRect().bottom - this.docHeight)  / 1000 / 10
      //     ).toFixed(2))}) `
          
      //   this.$refs[element.component][0].style.opacity = (1 - (
      //       (this.$refs[element.component][0].getBoundingClientRect().bottom - this.docHeight)  / 1000 
      //     ).toFixed(2))>1?1:(1 - (
      //       (this.$refs[element.component][0].getBoundingClientRect().bottom - this.docHeight)  / 1000 
      //     ).toFixed(2));
      // });
/*
          translateY(${
            0 - ((
            (this.$refs[element.component][0].getBoundingClientRect().bottom - this.docHeight)  
          ).toFixed(2)<0?0:(
            (this.$refs[element.component][0].getBoundingClientRect().bottom - this.docHeight) 
          ).toFixed(2))
          }px)
          */

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
    /* grid-template-rows: repeat(
      1,
      calc((100vh - var(--head-height) - var(--padding)) / 3)
    ); */
    /* grid-template-rows: 220px; */
    grid-template-rows: repeat(2,auto);
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
  overflow: hidden;
  /* overflow-y: scroll; */
}
.card::-webkit-scrollbar{
  width:0;
  height:0;
}
.card-no-bg {
  background: transparent!important;
  backdrop-filter: none!important;
  border-radius: 0;
  overflow: unset;
}
.card-blurred {
  background: var(--blurred-card-color);
  backdrop-filter: blur(var(--blur-width)) saturate(280%);
}

.card-w-2-h-1 {
  grid-column-start: span 2;
  grid-row-start:span 1;
}
.card-sub1 {
  grid-row-start:span 1;
}
.card-sub2 {
  grid-row-start:span 1;
}
.card-whole {
  grid-row-start:span 4;
}
.card-w-1-h-2 {
  grid-row-start:span 1;
  grid-column-start: span 2;
}
.card-w-1-h-auto {
  grid-column-start: span 1;
  /* grid-row-start:span 2; */
}
.card-w-2-h-auto {
  grid-column-start: span 2;
  /* grid-row-start:span 2; */
}
.card-w-4-h-auto{
  grid-column-start: span 4;
}
@media screen and (min-width: 1000px) and (max-width: 1200px) {
  .card-w-1-h-auto {
    grid-column-start: span 2;
  }
}
@media screen and (min-width: 700px) and (max-width: 1000px) {
  .card-w-2-h-1,
  .card-w-1-h-1 {
    grid-column-start: span 4;
  }
  .card-w-1-h-2 {
    grid-row: unset;
    grid-column-start: span 4;
  }
  .card-sub1 {
    grid-column-start: span 4;
  }

  .card-sub2 {
    grid-column-start: span 4;
  }
  .card-more {
    grid-row: unset;
    grid-column-start: span 4;
  }
  .card-w-1-h-auto {
    grid-column-start: span 4;
  }
  .card-w-2-h-auto {
    grid-column-start: span 4;
  }
}
@media screen and (max-width: 700px) {
  .card-sub1,
  .card-sub2,
  .card-w-2-h-1,
  .card-w-1-h-1,
  .card-w-1-h-2,
  .card-more {
    grid-row: unset;
    grid-column-start: span 4;
  }
  .card-w-1-h-auto {
    grid-column-start: span 4;
  }
  .card-w-2-h-auto {
    grid-column-start: span 4;
  }
}
</style>
