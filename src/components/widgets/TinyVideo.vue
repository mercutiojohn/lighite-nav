<template>
  <div class="tiny-video">
    <div class="header">
      <span class="title">正在直播</span>
    </div>
    <ul class="live-list tiny-cube">
      <li
        class="live-item ef-pudding tiny-cube-item"
        v-for="(item, index) in liveList"
        :key="index"
      >
        <div class="cover-shape">
          <img class="cover" :src="getBookCover(item.cover)" alt="" srcset="" />
        </div>
        <span class="title" v-text="item.name"></span>
      </li>
    </ul>
    <div class="sub-header">
      <span class="title">视频更新</span>
    </div>
    <ul class="video-list tiny-row">
      <li
        class="video-item ef-fadein tiny-row-item"
        v-for="(item, index) in videoList"
        :key="index"
      >
        <div class="cover-mask"></div>
        <img class="cover" :src="getBookCover(item.cover)" alt="" srcset="" />
        <span class="title" v-text="item.name"></span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "TinyVideo",
  components: {},
  data() {
    return {
      liveList: [
        {
          name: "CSS世界",
          cover: "parsecover.jpg",
        },
        {
          name: "CSS世界",
          cover: "parsecover.jpg",
        },
        {
          name: "CSS世界",
          cover: "parsecover.jpg",
        },
        {
          name: "CSS世界",
          cover: "parsecover.jpg",
        },
        {
          name: "CSS世界",
          cover: "parsecover.jpg",
        },
      ],
      videoList: [
        {
          name: "CSS世界",
          cover: "parsecover.jpg",
        },
        {
          name: "CSS世界",
          cover: "parsecover.jpg",
        },
        {
          name: "CSS世界",
          cover: "parsecover.jpg",
        },
        {
          name: "CSS世界",
          cover: "parsecover.jpg",
        },
      ],
    };
  },
  computed: {},
  watch: {},
  methods: {
    getBookCover(src) {
      return require("@/assets/images/books/" + src);
    },
  },
  created() {},
  mounted() {},
  beforeDestroy() {},
};
</script>

<style lang="css" src="../../styles/card.css" scoped>
</style>
<style scoped>
.live-item .cover {
  /* width: 100%; */
  /* mask-image: linear-gradient(90deg,hsla(0,0%,63.1%,.25),rgba(21,21,20,.1) 1%,hsla(0,0%,100%,.15) .4%,hsla(0,0%,58%,.1) .8%,hsla(0,0%,89%,0) 5.7%,rgba(223,218,218,.03) 9.1%,rgba(223,218,218,.05) 9.8%,hsla(0,0%,100%,.1) 1%,rgba(179, 128, 128, 0) 100%); */
}
.live-item .cover-shape{
    display: flex;
    align-items: stretch;
    justify-content: stretch;
  border: 3px solid var(--accent-color);
  overflow: hidden;
  width: 60px;
  height: 60px;
  border-radius: 40px;
}
.cover {
  height: 80px;
  /* mask-image: linear-gradient(90deg,hsla(0,0%,63.1%,.25),rgba(21,21,20,.1) 1%,hsla(0,0%,100%,.15) .4%,hsla(0,0%,58%,.1) .8%,hsla(0,0%,89%,0) 5.7%,rgba(223,218,218,.03) 9.1%,rgba(223,218,218,.05) 9.8%,hsla(0,0%,100%,.1) 1%,rgba(179, 128, 128, 0) 100%); */
}
</style>