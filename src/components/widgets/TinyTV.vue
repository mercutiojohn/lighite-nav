<template>
  <div
    class="television"
    @click="play"
    @mouseenter="ctrlDisplay = true"
    @mouseleave="ctrlDisplay = false"
  >
    <!-- <VideoPlayer
      :options="videoOptions"
      :key="timer"
      @sendPlayerItem="updatePlayerItem"
    /> -->
    <div class="header">
      <span class="title">Spinnin Records Live</span>
    </div>
    <div class="video-window">
      <div :class="{ poster: true, 'poster-hided': playing }">
        <img
          :src="
            require('@/assets/images/video/posters/' +
              flvUrls[currUrl].poster +
              '.png')
          "
          alt=""
        />
      </div>
      <video id="videoElement" controls :class="{ 'video-element-hided': !playing }"></video>
    </div>
  </div>
</template>

<script>
import flvjs from "flv.js";

export default {
  name: "Television",
  data() {
    return {
      timer: "",
      videooObj: null,
      currUrl: 0,
      flvUrls: [
        {
          title: "Spinnin Records Live",
          url:
            "https://flv67a4fdc7.live.126.net/live/77b43eec6d994802928c13746a45d909.flv?netease=flv67a4fdc7.live.126.net",
          poster: "spinnin",
        },
      ],
      playing: false,
      ctrlDisplay: false,
      flvPlayer: null,
      // videoOptions: {
      //   flvjs: {
      //     mediaDataSource: {
      //       isLive: false,
      //       cors: true,
      //       withCredentials: false,
      //     },
      //   },
      //   autoplay: false,
      //   controls: true,
      //   sources: [
      //     {
      //       src:
      //         "https://flv67a4fdc7.live.126.net/live/77b43eec6d994802928c13746a45d909.flv?netease=flv67a4fdc7.live.126.net",
      //       type: "video/flv",
      //     },
      //   ],
      // },
    };
  },
  computed: {},
  watch: {},
  methods: {
    updatePlayerItem(playerItem) {
      this.videoObj = playerItem;
    },
    loadVideo() {
      if (flvjs.isSupported()) {
        var videoElement = document.getElementById("videoElement");
        this.flvPlayer = flvjs.createPlayer({
          type: "flv",
          isLive: true,
          hasAudio: true,
          url: this.flvUrls[this.currUrl].url,
        });
        this.flvPlayer.attachMediaElement(videoElement);
        this.flvPlayer.load();
      }
    },
    unloadVideo() {
      this.flvPlayer.pause();
      this.flvPlayer.unload();
      this.flvPlayer.detachMediaElement();
      this.flvPlayer.destroy();
      this.flvPlayer = null;
    },
    play() {
      this.playing = true;
      if (this.flvPlayer == null) this.loadVideo();
      this.flvPlayer.play();
    },
    // pause() {
    //   this.playing = false;
    //   this.flvPlayer.pause();
    // },
  },
  created() {},
  mounted() {
    // this.loadVideo();
  },
  beforeDestroy() {
    this.unloadVideo();
  },
};
</script>
<style lang="css" src="../../styles/card.css" scoped>
</style>
<style>
.television {
  /* height: calc(380px / 16 * 9); */
  height: 100%;
  width: 100%;
  /* padding: 10px; */
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  /* background: #000; */
}
#videoElement {
  width: 100%;
  height: 100%;
  /* height: calc(380px / 16 * 9); */
}
.television .poster {
  filter: brightness(60%);
  width: 100%;
  height: 100%;
  transition: opacity 0.2s ease;
  cursor: pointer;
  transition: filter .2s ease;

}
.television .poster:hover{
    filter: brightness(100%);
}
.television .poster img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.video-window{
  width: calc(100% - 20px);
  height: calc(100% - 50px);
  margin: 0 10px 10px;
  box-sizing: border-box;
  background: #000;
  border-radius: var(--item-radius);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.television .poster-hided {
  /* opacity: 0; */
  /* height: 0; */
  display: none;
}
.television .controls {
  height: 40px;
  width: 100%;
  background: transparent;
  transition: height 0.2s ease;
  display: flex;
}
/* .television .controls-hided {
  height: 0;
} */
.video-element-hided{
    display:none;
}
</style>