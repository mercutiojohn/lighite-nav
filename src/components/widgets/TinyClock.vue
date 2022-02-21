<template>
  <div class="tiny-clock">
    <div class="clock-content">
      <span class="apm" v-text="apm" v-if="settings.twelveFormat"></span>
      <span class="time" v-text="formatted"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TinyClock",
  components: {},
  data() {
    return {
      apm: "",
      formatted: "",
      settings: {
        twelveFormat: true,
        showSeconds: false,
      },
    };
  },
  computed: {
    remoteSettings: function () {
      return this.$store.getters.getSettings;
    },
  },
  watch: {
    settings() {
      this.$store.commit("setSettings", this.settings);
    },
  },
  methods: {
    getTime() {
      var today = new Date();
      var h = today.getHours();
      var m = today.getMinutes();
      var s = today.getSeconds();
      // add a zero in front of numbers<10
      m = this.checkTime(m);
      s = this.checkTime(s);

      if (this.settings.twelveFormat) {
        // h = '下午' + (h % 12);
        if (h / 12 >= 1) {
          this.apm = "下午";
        } else {
          this.apm = "上午";
        }
        h = h % 12;
        // TODO
      }

      var result = h + ":" + m;

      if (this.settings.showSeconds) {
        result = h + ":" + m + ":" + s;
      }
      this.formatted = result;
    },
    checkTime(i) {
      if (i < 10) {
        i = "0" + i;
      }
      return i;
    },
  },
  created() {},
  mounted() {
    this.settings = this.remoteSettings;
    this.date = this.getTime();
    this.timer = setInterval(() => {
      this.date = this.getTime();
    }, 100);
  },
  beforeDestroy() {},
};
</script>

<style>
.tiny-clock {
  display: flex;
  align-items: center;
  justify-content: center;
  /* padding:20px; */
  height: 100%;
  box-sizing: border-box;
}
.clock-content {
  display: flex;
  align-items: baseline;
}
.clock-content .time {
  font-size: 30px;
}
.apm {
  font-size: 14px;
}
</style>