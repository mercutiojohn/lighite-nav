<template>
<div class="tiny-music-charts">
    <div class="header">
        <span class="title">音乐榜单</span>
        <div class="right">
          <a :href="'https://music.163.com/#/playlist?id='+this.charts[this.currChart].id"><button class="play-all icon-button"><span class="iconfont icon-play"></span><span class="tip">播放全部</span></button></a>
          <router-link to="/music">
          <button class="icon-button">
              <span class="label">更多</span>
              <span class="iconfont icon-chevron-right"></span>
          </button>
          </router-link>
        </div>
    </div>
    <div class="tabs">
        <div :class="{'tab':true,'tab-active':currChart == index,'ef-fadein':true}" v-for="(item,index) in charts" @click="changeChart(index)" :key="index">
            <span class="title fix-text-overflow" v-text="item.title"></span>
        </div>
    </div>
    <!-- <div class="funcs">
    </div> -->
    <transition-group name="fade" type="out-in">
    <Loading v-if="loading"  key="loading"/>
    <div class="list fix-scrollbar card-list-height" v-if="!loading"  key="content">
        <a class="list-item ef-fadein" v-for="(item,index) in tracks" :key="index" :href="'https://music.163.com/#/song?id='+item.id" target="_blank">
            <span class="rank" v-text="(index+1)+' '"></span>
            <img v-lazy="item.al.picUrl" alt="" srcset="" class="album-cover">
            <div class="song-info">
                <span class="title fix-text-overflow" v-text="item.name"></span>
                <span class="alias" v-for="(item_1,index_1) in item.alia" :key="index_1">
                    <span v-text="item_1"></span>
                </span>
                <!-- <span class="album-name fix-text-overflow" v-text="item.al.name"></span> -->
                <!-- </span> -->
                <span class="artists fix-text-overflow">
                    <span v-for="(item_1,index_1) in item.ar" :key="index_1">{{item_1.name + (((index_1 + 1) !== item.ar.length) ? ' / ':'')}}</span>
                </span>
            </div>
        </a>
    </div>
    </transition-group>
</div>
</template>

<script>
import Loading from "@/components/utils/Loading.vue";
export default {
  name: "TinyMusicChart",
  components: {
    Loading
  },
  data() {
    return {
      charts: [
        {
          title: "UK榜",
          id: "180106",
        },
        {
          title: "Billboard榜",
          id: "60198",
        },
        {
          title: "Oricon榜",
          id: "60131",
        },
      ],
      tracks: [],
      currChart: 0,
      loading: false,
    };
  },
  computed: {},
  watch: {},
  methods: {
    getChart() {
      this.$axios
        .get(
          "https://musicapi.mercutio.club/playlist/detail?id=" +
            this.charts[this.currChart].id
        )
        .then((response) => {
          console.log(response.data);
          // this.tracks = response.data.playlist.tracks.splice(0, 10);
          this.tracks = response.data.playlist.tracks;
          this.loading = false;
        });
    },
    changeChart(index) {
      this.currChart = index;
      this.loading = true;
      this.getChart();
    },
  },
  created() {},
  mounted() {
    this.loading = true;
    this.getChart();
  },
  beforeDestroy() {},
};
</script>

<style lang="css" src="../../styles/card.css" scoped>
</style>
<style lang="css" scoped>
.list-item {
  padding: 8px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  border-bottom: 1px solid var(--line-color);
}
.list-item:last-child {
  border-bottom: none;
}
.list {
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  padding: 10px;
  box-sizing: border-box;
}
.album-cover {
  width: 45px;
  height: 45px;
  border-radius: 2px;
}
.song-info {
  width: calc(100% - 40px - 30px - 5px);
  display: flex;
  flex-direction: column;
  color: var(--content-color);
  font-size: 14px;
  gap: 3px;
}
.artists {
  font-size: 12px;
  color: var(--subtitle-color);
}
.alias {
  color: var(--subtitle-color);
  font-size: 10px;
}
/* .funcs{
  margin: 5px var(--card-inset-big);
  text-align: right;
} */
.list-item .rank {
  flex-shrink: 0;
  color: var(--subtitle-color);
  width: 10px;
  display: block;
}
</style>