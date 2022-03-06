<template>
  <div class="background">
    <div class="bg-box" v-if="bgPrepared == true">
      <img class="bg-image" :src="srcs.regular" alt="" srcset="" />
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  data() {
    return {
      token: "vdcCmgpn-IyPPE2GJhMX4eL-9O65LJ6XxDpZHZiensE",
      srcs: {
        // full: "https://images.unsplash.com/photo-1644952720775-c769200e6b67?crop=entropy&cs=srgb&fm=jpg&ixid=MnwzMDU3MzR8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NDU5NjA2NjU&ixlib=rb-1.2.1&q=85",
        // raw: "https://images.unsplash.com/photo-1644952720775-c769200e6b67?ixid=MnwzMDU3MzR8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NDU5NjA2NjU&ixlib=rb-1.2.1",
        // regular:
        //   "https://images.unsplash.com/photo-1644952720775-c769200e6b67?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMDU3MzR8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NDU5NjA2NjU&ixlib=rb-1.2.1&q=80&w=1080",
        // small:
        //   "https://images.unsplash.com/photo-1644952720775-c769200e6b67?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMDU3MzR8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NDU5NjA2NjU&ixlib=rb-1.2.1&q=80&w=400",
        // small_s3:
        //   "https://s3.us-west-2.amazonaws.com/images.unsplash.com/photo-1644952720775-c769200e6b67",
        // thumb:
        //   "https://images.unsplash.com/photo-1644952720775-c769200e6b67?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMDU3MzR8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NDU5NjA2NjU&ixlib=rb-1.2.1&q=80&w=200",
      },
      data: {},
    };
  },
  computed: {
    mode: function () {
      return this.$store.getters.getMode;
    },
    bgPrepared: function () {
      return this.$store.getters.getBgPrepared;
    },
  },
  watch: {
    mode(newStat) {
      if (newStat) {
        this.getPic();
      } else {
        this.setBgState(false);
      }
    },
    data() {
      this.$store.commit("setWallpaperData", this.data);
    },
  },
  methods: {
    setBgState(state) {
      this.$store.commit("setBgPrepared", state);
    },
    getPic() {
      this.setBgState(false);
      this.$axios({
        baseURL: "https://api.unsplash.com",
        url: "/photos/random",
        method: "get",
        headers: { Authorization: "Client-ID " + this.token },
      }).then((response) => {
        this.setBgState(true);
        console.log(response.data);
        this.data = response.data;
        this.srcs = response.data.urls;
      });
    },
  },
  created() {},
  mounted() {
    // setTimeout(() => {
      if (this.mode) {
        this.getPic();
      }
    // }, 10);
  },
  beforeDestroy() {},
};
</script>

<style scoped>
.bg-box {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: -1;
  background: #00000056;
  overflow: hidden;
}
.bg-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>