<template>
  <div class="weather" 
          :style="{ 'background': backgroundColorTrans(briefNew) }"
  >
    <transition name="fade" type="out-in">
    <!-- </transition> -->
          <!-- <transition name="fade" type="out-in">
      <div class="warning-details" v-if="warningLookup">
        <div class="header" :style="{ 'background-color': aqiLevelColorTrans(airInfo.level) }">
          <span class="title">{{ item.typeName }}{{item.level}}</span>
          <button @click="warningLookup = false">确定</button>
        </div>
        <span class="content"></span>
      </div>
    </transition> -->
    <!-- <transition name="fade" type="out-in"> -->
      <div class="weather-content">
        <span class="city" @click="weatherRefresh">{{ city }}</span>
        <div class="weather-loading" v-if="loading">
          <span>天气加载中</span>
        </div>
        <div class="tmp-n-brief" v-if="!loading">
          <span class="temprature">{{ tmpNew }}°</span>
          <span class="brief">{{ briefNew }}</span>
        </div>
        <div
          class="air-info"
          v-if="!loading"
        >
          <div class="color-line" 
            :style="{ 'background-color': aqiLevelColorTrans(airInfo.level) }"
            ></div>
          <span class="aqi">{{ airInfo.aqi }}</span>
          <span class="level">{{ airInfo.category }}</span>
        </div>
        <div class="warning-info" v-if="!loading">
          <div class="info-item" v-for="(item, index) in warning" :key="index">
            <div
              class="label"
            >
              <div class="color-dot" 
              :style="{ 'background-color': warningColorTrans(item.level) }"
              ></div>
              <span class="type">{{ item.typeName }}</span>
              <span class="level">{{ item.level }}</span>
              <span>预警</span>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "weather",
  components: {},
  data() {
    return {
      loading: true,
      city: "北京",
      tmpNew: "0",
      briefNew: "加载中",
      tmpOld: "",
      briefOld: "",
      resOld: "",
      resWeatherContent: "",
      expand:true,
      airInfo: {
        pubTime: "2021-05-13T11:00+08:00",
        aqi: "0",
        level: "1",
        category: "加载中",
        primary: "NA",
        pm10: "22",
        pm2p5: "10",
        no2: "11",
        so2: "8",
        co: "0.4",
        o3: "95",
      },
      resGeo: "",
      cityTemp: "",
      aqi: "",
      aqiLevel: "",
      warning: [
        // {
        //   id: "1010601202006202220000501",
        //   pubTime: "2020-06-20T22:20+08:00",
        //   title: "吉林省长春市气象台发布大风蓝色预警",
        //   startTime: "",
        //   endTime: "",
        //   status: "预警中",
        //   level: "蓝色",
        //   type: "大风",
        //   text:
        //     "长春市气象台2020年6月20日22时20分发布大风蓝色预警信号:预计未来24小时内，我市有5-6级西南风，瞬间风力可达7-8级，市应急管理局、市气象局联合提醒，注意做好防范。（预警信息来源：国家预警信息发布中心）",
        // },
        // {
        //   id: "1010601202006202220000501",
        //   pubTime: "2020-06-20T22:20+08:00",
        //   title: "吉林省长春市气象台发布大风蓝色预警",
        //   startTime: "",
        //   endTime: "",
        //   status: "预警中",
        //   level: "红色",
        //   type: "暴雨",
        //   text:
        //     "长春市气象台2020年6月20日22时20分发布大风蓝色预警信号:预计未来24小时内，我市有5-6级西南风，瞬间风力可达7-8级，市应急管理局、市气象局联合提醒，注意做好防范。（预警信息来源：国家预警信息发布中心）",
        // },
      ],
      warningLookup: false,
      timer:''
    };
  },
  computed: {
    remoteCity: function(){
      return this.$store.getters.getSettings.weatherCity;
    }
  },
  watch: {
  },
  methods: {
    searchWeather: async function () {
      this.loading = true;
      //注意：这里有 async 用来完成异步操作
      //由于调用api是异步操作
      //在请求的时候需要用async+await让它同步，否则数据不好取出
      //如果没有await返回的是一个Promise 对象，我学术短浅，暂时没学到，不会取

      let key = "0ae07031c52c4d448cb26af87903d648"; //引号中放入前面保存的key

      //获取城市的ID
      let locUrl = `https://geoapi.qweather.com/v2/city/lookup?location=${this.city}&key=${key}`;
      let locRes = await fetch(locUrl);
      let locResult = await locRes.json();
      // console.log(locResult);
      let id = locResult.location[0].id;
      this.resGeo = locResult;
      //根据城市id获取具体的天气
      let httpUrl1 = `https://devapi.qweather.com/v7/weather/now?location=${id}&key=${key}`;
      let weatherRes = await fetch(httpUrl1);
      let weatherResult = await weatherRes.json();
      // console.log(weatherResult);
      this.resWeatherContent = weatherResult.now;

      let nowWeather = weatherResult.now;
      this.tmpNew = nowWeather.temp;
      this.briefNew = nowWeather.text;
      //根据城市id获取空气指数
      let airUrl = `https://devapi.qweather.com/v7/air/now?location=${id}&key=${key}`;
      let airRes = await fetch(airUrl);
      let airResult = await airRes.json();
      // console.log(airResult);
      this.airInfo = airResult.now;

      let nowAir = airResult.now;
      this.aqi = nowAir.aqi;
      this.aqiLevel = nowAir.category;
      //根据城市id获取预警信息
      let warnUrl = `https://devapi.qweather.com/v7/warning/now?location=${id}&key=${key}`;
      let warnRes = await fetch(warnUrl);
      let warnResult = await warnRes.json();
      // console.log(warnResult);
      this.warning = warnResult.warning;
      this.loading = false;
    },
    weatherRefresh() {
        this.searchWeather()
    },
    backgroundColorTrans(colorName){
    switch (colorName) {
        case "晴":
          return "linear-gradient(45deg, transparent, transparent 40%, rgb(252, 239, 173))";
        case "晴转多云":
          return "linear-gradient(45deg, transparent,transparent 40%, rgb(252, 239, 173))";
        case "多云":
          return "linear-gradient(45deg, transparent,transparent 40%, rgb(173, 220, 252))";
        case "阴":
            return "linear-gradient(45deg, transparent,transparent 40%, rgb(173, 220, 252))";
        case "小雨":
            return "linear-gradient(45deg, transparent,transparent 40%, rgb(173, 220, 252))";
        case "中雨":
          return "linear-gradient(45deg, transparent,transparent 40%, rgb(173, 220, 252))";
        case "大雨":
          return "linear-gradient(45deg, transparent,transparent 40%, rgb(173, 220, 252))";
        case "霾":
          return "linear-gradient(45deg, transparent,transparent 40%, rgb(192, 183, 209))";
        case "雾":
          return "linear-gradient(45deg, transparent,transparent 40%, rgb(172, 197, 219))";
        case "沙尘暴":
          return "linear-gradient(45deg, transparent,transparent 40%, rgb(225, 188, 133))";
        default:
          return "linear-gradient(45deg, transparent,transparent 40%, rgb(235, 235, 235));";
        }
    },
    warningColorTrans(colorName) {
      switch (colorName) {
        case "蓝色":
          return "#00b7ff";
        case "黄色":
          return "#f78d02";
        case "橙色":
          return "#e95500";
        case "红色":
          return "#d61857";
        default:
          return "#6e6e6e";
      }
    },
    aqiLevelColorTrans(level) {
      switch (level) {
        case "1":
          return "#00be7f";
        case "2":
          return "#00b7ff";
        case "3":
          return "#f1ba02";
        case "4":
          return "#e95500";
        case "5":
          return "#d61857";
        case "6":
          return "#430091";
        default:
          return "#6e6e6e";
      }
    },
  },
  created() {},
  mounted() {
     this.city = this.remoteCity;
    // if (localStorage.weather_city)
    //   this.city = localStorage.weather_city;
    this.searchWeather();
    let _this = this;
    this.timer = setInterval(()=>{
      _this.searchWeather();
    },3600000);
  },
  beforeDestroy() {},
};
</script>

<style scoped>
hello {
  color: #f1ba02;
}
.weather {
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, transparent,transparent 40%, rgb(235, 235, 235));
  box-sizing: border-box;
  transition: background .2s ease;
  overflow: hidden;
}
.weather-content {
  min-height: 100%;
  padding: 20px;
  /* color: var(--main-color); */
  /* color: #fff; */
  box-sizing: border-box;
}
.weather-loading {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.city{
  padding: 3px;
  cursor: pointer;
}
.city:active {
  border-radius: 5px;
  background: #00000034;
}
.tmp-n-brief {
  /* display: flex; */
  /* flex-direction: column; */
}
.tmp-n-brief > .temprature {
  font-size: 60px;
  /* font-family: Mitype2018-70,ProximaNova, Politica, Palatino, Caecilia,
    Bookerly; */
  font-weight: 500;
  /* padding: 0 0 10px 0; */
}
.tmp-n-brief > .brief {
  font-size: 18px;
}
.change-city {
  /* position: relative; */
  /* top:0;  */
  width: 100%;
  box-sizing: border-box;
  background: var(--elem-color);
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-evenly;
  padding: 20px;
  /* height: 100%; */
  /* border-radius: 0 0 10px 10px; */
}
.change-city > .title {
  /* text-align: center; */
  font-size: 18px;
  font-weight: 800;
  color: var(--main-color);
}
.change-city > input {
  background: var(--first-assist-color);
  transition: all 0.2s ease;
  border: 3px solid transparent;
  padding: 10px 5px;
  margin: 10px 0;
  font-size: 16px;
  border-radius: 10px;
  color: var(--main-color);
}

.change-city > input:focus {
  border-color: var(--accent-color);
}
.change-city > .options {
  display: flex;
  justify-content: center;
}
.air-info {
  display: flex;
  width: max-content;
  /* background: var(--bg-color); */
  /* border-radius: 5px; */
  /* padding: 2px 5px; */
  align-items: center;
  margin: 0 0 5px 0;
  /* color: #fff; */

  /* justify-content: baseline; */
}
.air-info > .aqi {
  /* font-family: ProximaNova, Mitype2018-90; */
  font-size: 20px;
  padding-right: 5px;
  /* background: var(--bg-color); */
  /* border-radius: 5px; */
  /* padding: 2px 5px; */

}
.info-item{
  display: flex;
  gap:10px;
  flex-wrap: wrap;
}
.info-item > .label > .level {
}
.info-item > .label {
  display: flex;
  font-size: 14px;
  width: max-content;
  background: var(--bg-color);
  padding: 2px 5px;
  border-radius: 5px;
  align-items: center;
  margin: 5px 0;
}
.color-dot{
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 5px;
}
.color-line{
  width: 6px;
  height: 20px;
  border-radius: 3px;
  margin-right: 5px;
}
</style>