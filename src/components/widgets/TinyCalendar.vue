<template>
  <div class="tiny-calendar">
    <div class="left">
      <div class="day-box">
        <span class="day" v-text="day"></span>
      </div>
      <div class="yr-n-mo-box">
        <span class="yr" v-text="year"></span>
        <span>&nbsp;/&nbsp;</span>
        <span class="mo" v-text="month"></span>
      </div>
    </div>
    <div class="right">
      <div class="week">
        <span>周</span>
        <span class="mo" v-text="week"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TinyCalendar",
  components: {},
  data() {
    return {
      year: "",
      month: "",
      day: "",
      week: "",
      timer: "",
    };
  },
  computed: {},
  watch: {},
  methods: {
    showDate(objD, option) {
      var str;
      var yy = objD.getYear();
      if (yy < 1900) yy = yy + 1900;
      var MM = objD.getMonth() + 1;
      // if (MM == 0) MM = "一";
      // if (MM == 1) MM = "二";
      // if (MM == 2) MM = "三";
      // if (MM == 3) MM = "四";
      // if (MM == 4) MM = "五";
      // if (MM == 5) MM = "六";
      // if (MM == 6) MM = "七";
      // if (MM == 7) MM = "八";
      // if (MM == 8) MM = "九";
      // if (MM == 9) MM = "十";
      // if (MM == 10) MM = "十一";
      // if (MM == 11) MM = "十二";
      // if (MM < 10) MM = '0' + MM;
      var dd = objD.getDate();
      if (dd < 10) dd = "0" + dd;
      var ww = objD.getDay();
      if (ww == 0) ww = "日";
      if (ww == 1) ww = "一";
      if (ww == 2) ww = "二";
      if (ww == 3) ww = "三";
      if (ww == 4) ww = "四";
      if (ww == 5) ww = "五";
      if (ww == 6) ww = "六";
      if (option == "y") {
        str = yy;
      } else if (option == "m") {
        str = MM;
      } else if (option == "d") {
        str = dd;
      } else if (option == "w") {
        str = ww;
      } else {
        str = yy + "-" + MM + "-" + dd + " " + ww;
      }
      return str;
    },
    tick() {
      let today = new Date();
      //   this.localtime = this.showTime(today);
      this.year = this.showDate(today, "y");
      this.month = this.showDate(today, "m");
      this.day = this.showDate(today, "d");
      this.week = this.showDate(today, "w");
    },
  },
  created() {},
  mounted() {
    this.tick();
    this.timer = setInterval(() => {
      this.tick();
    }, 1000);
  },
  beforeDestroy() {},
};
</script>

<style scoped>
.tiny-calendar {
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}
.day {
  font-size: 3em;
}
.week {
  font-size: 2em;
}
</style>