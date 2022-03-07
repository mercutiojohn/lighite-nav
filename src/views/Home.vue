<template>
  <div ref="home" :class="{ home: true, 'home-with-bg': bgPrepared }">
    <WallpaperShow />
    <div :class="{'blocks':true}">
      <div
        :class="{ card: true, 'card-blurred': bgPrepared, 'card-main': true }"
      >
        <GreetingBox />
      </div>
      <div
        :class="{ card: true, 'card-blurred': bgPrepared, 'card-small': true }"
      >
        <Weather />
      </div>
      <div
        :class="{ card: true, 'card-blurred': bgPrepared, 'card-long': true }"
      >
        <TinyToDo />
      </div>
      <div
        :class="{ card: true, 'card-blurred': bgPrepared, 'card-small': true }"
      ></div>
      <!-- <div class="card card-sub1'}"><TinyVideo /></div> -->
      <!-- <div class="card card-sub2'}"><TinyBook /></div> -->
      <div
        :class="{ card: true, 'card-blurred': bgPrepared, 'card-new': true }"
      >
        <TinyMusicChart />
      </div>
      <div
        :class="{ card: true, 'card-blurred': bgPrepared, 'card-new': true }"
      >
        <TinyAnimeChart />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import TinyBook from "@/components/widgets/TinyBook.vue";
import TinyVideo from "@/components/widgets/TinyVideo.vue";
import TinyAnimeChart from "@/components/widgets/TinyAnimeChart.vue";
import TinyMusic from "@/components/widgets/TinyMusic.vue";
import TinyMusicChart from "@/components/widgets/TinyMusicChart.vue";
import GreetingBox from "@/components/widgets/GreetingBox.vue";
import Weather from "@/components/widgets/Weather.vue";
import TinyToDo from "@/components/widgets/TinyToDo.vue";
import WallpaperShow from "@/components/utils/WallpaperShow.vue";

export default {
  name: "Home",
  components: {
    TinyBook,
    TinyVideo,
    TinyMusic,
    TinyMusicChart,
    TinyAnimeChart,
    GreetingBox,
    Weather,
    TinyToDo,
    WallpaperShow,
  },
  data(){
    return {
      ifScrolled:false
    }
  },
  computed: {
    mode: function () {
      return this.$store.getters.getMode;
    },
    bgPrepared: function () {
      console.log(this.$store.getters.getBgPrepared);
      return this.$store.getters.getBgPrepared;
    },
  },
  methods: {
    handleScroll() {
      // console.log(this.$refs.home)
      // console.log(document.querySelector("body > div").scrollTop +', '+ document.documentElement.scrollTop);
      if (this.$refs.home.scrollTop)
        this.ifScrolled = true;
      else this.ifScrolled = false;
      console.log(this.ifScrolled);
    },
  },
  created() {},
  mounted() {
    this.$refs.home
      .addEventListener("scroll", this.handleScroll);
    this.title = this.$route.name;
  },
  beforeDestroy() {
    this.$refs.home
      .removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<style scoped>
.home {
  --padding: 50px;
  padding: var(--padding);
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
  transition: opacity .3s ease;
}
.blocks-hide{
  opacity: .4;
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
.card::-webkit-scrollbar {
  width: 5px;
  /* background: #000; */
}
.card::-webkit-scrollbar-thumb {
  border-radius: 3px;
  background: var(--bg-color);
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
.card-new {
  grid-column-start: span 2;
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
  .card-new {
    grid-column-start: span 2;
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
  .card-new {
    grid-column-start: span 4;
  }
}
</style>
