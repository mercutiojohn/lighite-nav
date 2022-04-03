<template>
  <div class="weibo-hot">
    <div class="header">
      <span class="title">微博热搜</span>
      <div class="right"></div>
    </div>
    <!-- <div class="tabs">
      <div
        :class="{
          tab: true,
          'tab-active': currChart == index,
          'ef-fadein': true,
        }"
        v-for="(item, index) in charts"
        @click="changeChart(index)"
        :key="index"
      >
        <span class="title fix-text-overflow" v-text="item.title"></span>
      </div>
    </div> -->
    <!-- <div class="funcs">
    </div> -->
    <transition-group name="fade" type="out-in">
      <div class="list fix-scrollbar card-list-long-height" v-if="!loading" key="content">
        <a
          class="list-item ef-fadein"
          v-for="(item, index) in hot.realtime"
          :key="index"
          :href="'https://s.weibo.com/weibo?q=%23' + item.word + '%23'"
          target="_blank"
          v-show="!item.is_ad"
        >
          <span class="rank" v-text="index + 1 + ' '"></span>
          <div class="song-info">
            <span class="title fix-text-overflow" v-text="item.word"></span>
          </div>
          <span
            class="sticker"
            v-text="item.icon_desc"
            :style="'background:' + item.icon_desc_color"
          ></span>
        </a>
      </div>
      <Loading v-if="loading"  key="loading"/>
    </transition-group>
  </div>
</template>

<script>
import Loading from "@/components/utils/Loading.vue";
export default {
  name: "WeiboHot",
  components: {
    Loading,
  },
  data() {
    return {
      charts: [
        {
          title: "微博",
          url: "https://api.mercutio.club/weibo",
        },
        // {
        //   title: "知乎",
        //   url: "https://api.mercutio.club/zhihu",
        // },
        // {
        //   title: "Bilibili",
        //   url: "https://api.bilibili.com/x/web-interface/search/square?limit=10",
        // },
      ],
      hot: [],
      currChart: 0,
      loading: false,
    };
  },
  computed: {},
  watch: {},
  methods: {
    getChart() {
      this.$axios.get(this.charts[this.currChart].url).then((response) => {
        console.log(response.data);
        this.hot = response.data.content.data;
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
  width: calc(100% - 20px - 40px);
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
  width: 20px;
  display: block;
  text-align: right;
}
.list-item .sticker {
  width: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  color: #fff;
  font-size: 0.8em;
  height: 20px;
}
</style>