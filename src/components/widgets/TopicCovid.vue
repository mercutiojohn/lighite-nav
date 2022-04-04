<template>
  <div class="topic-covid">
    <div class="header">
      <span class="title">疫情信息</span>
      <div class="right"></div>
    </div>

    <div class="fix-scrollbar card-list-long-height covid-cntnt">
      <span class="risk-header">{{ remoteCity }}疫情概况</span>
      <div class="covid-status">
        <div class="city">
          <span class="count">
            <span class="badge">本土新增确诊</span>
            {{ covidStats.chinaTopCity[0].sure_new_loc }}
          </span>
          <span class="count">
            <span class="badge">无症状</span>
            {{ covidStats.chinaTopCity[0].sure_new_hid }}
          </span>
          <span class="count" v-if="covidStats.chinaTopCity[0].danger['1']">
            <span class="badge">高风险</span>
            {{ covidStats.chinaTopCity[0].danger["1"] }}
          </span>
          <span class="count" v-if="covidStats.chinaTopCity[0].danger['2']"
            ><span class="badge">中风险</span>
            {{ covidStats.chinaTopCity[0].danger["2"] }}
          </span>
        </div>
        <div class="local-report">
          <p class="message" v-html="covidStats.localReport.report"></p>
          <p class="time-stamp">
            {{ covidStats.localReport.dateline }} 数据来自夸克
          </p>
        </div>
      </div>
      <span class="risk-header">周边城市</span>
      <div class="statistics">
        <div
          class="city"
          v-for="(item, index) in covidStats.nearbyTopCity"
          :key="index"
        >
          <span class="city-name">{{ item.city }}</span>
          <span class="count"
            ><span class="badge">本土新增确诊</span
            >{{ item.sure_new_loc }}</span
          >
          <span class="count"
            ><span class="badge">无症状</span>{{ item.sure_new_hid }}</span
          >
          <span class="count" v-if="item.danger['1']"
            ><span class="badge">高风险</span>{{ item.danger["1"] }}</span
          >
          <span class="count" v-if="item.danger['2']"
            ><span class="badge">中风险</span>{{ item.danger["2"] }}</span
          >
        </div>
      </div>
      <span class="risk-header">疫情风险地区汇总</span>
      <div class="risk-area">
        <span class="risk-title" id="gaofx"
          >高风险地区 · {{ risk.count["2"] }}个
          <a href="#zhong">中风险地区 · {{ risk.count["1"] }}个</a></span
        >
        <div
          class="province-box"
          v-for="(item, index) in risk.map['2']"
          :key="index + parseInt(Math.random() * 100)"
        >
          <span class="province-header">{{ index }}</span>
          <div class="community-box">
            <div
              class="community"
              v-for="(CommItem, CommIndex) in item"
              :key="CommIndex"
            >
              <span class="content"
                >{{ CommItem.city }} · {{ CommItem.addr }}</span
              >
            </div>
          </div>
        </div>
        <span class="risk-title" id="zhong"
          ><a href="#gaofx">高风险地区 · {{ risk.count["2"] }}个 </a> 中风险地区
          · {{ risk.count["1"] }}个
        </span>

        <div
          class="province-box"
          v-for="(item, index) in risk.map['1']"
          :key="index + parseInt(Math.random() * 100)"
        >
          <span class="province-header">{{ index }}</span>
          <div class="community-box">
            <div
              class="community"
              v-for="(CommItem, CommIndex) in item"
              :key="CommIndex"
            >
              <span class="content"
                >{{ CommItem.city }} · {{ CommItem.addr }}</span
              >
            </div>
          </div>
        </div>
        <span class="time-stamp">
          高风险地区信息更新于{{ risk.dateline["2"] }}
        </span>
        <span class="time-stamp">
          中风险地区信息更新于{{ risk.dateline["1"] }}
        </span>
        <span class="time-stamp"> 数据来自夸克</span>
      </div>
      <div :class="{ 'tool-box': true, 'tool-box-expand': showTools }">
        <div class="handle-bar" @click="showTools = !showTools">
          <span class="handle-stick"></span>
        </div>
        <transition name="fade">
          <div class="content" v-if="showTools">
            <!-- <span class="risk-header">实时地图</span>
            <a href="https://2019ncov.chinacdc.cn/2019-nCoV/" target="_blank">
              <button class="common-button">国家卫健委</button>
            </a>
            <a
              href="https://www.tianditu.gov.cn/coronavirusmap/"
              target="_blank"
            >
              <button class="common-button">天地图</button>
            </a> -->
            <span class="risk-header">常用查询</span>
            <a
              href="http://bmfw.www.gov.cn/yqfxdjcx/index.html"
              target="_blank"
            >
              <button class="common-button">卫健委·中高风险地区查询</button>
            </a>
            <a href="http://ncov.dxy.cn/ncovh5/view/pneumonia" target="_blank">
              <button class="common-button">丁香园·疫情综合数据</button>
            </a>
            <a href="https://vt.sm.cn/api/QuarkGo/home" target="_blank">
              <button class="common-button">夸克·疫情出行政策查询</button>
            </a>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TopicCovid",
  components: {},
  data() {
    return {
      risk: {},
      covidStats: {},
      showTools: false,
    };
  },
  computed: {
    remoteCity: function () {
      return this.$store.getters.getSettings.weatherCity;
    },
  },
  watch: {},
  methods: {
    testData(data) {
      try {
        if (data.cityData !== []) {
          console.log(data.cityData);
          return true;
        } else return false;
      } catch (error) {
        return false;
      }
    },
    getCovid() {
      this.$axios
        .get(
          "https://api.mercutio.club/covid-sm?city=" +
            encodeURIComponent(this.remoteCity)
        )
        .then((resp) => {
          this.covidStats = resp.data.content;
        });
    },
    getCovidRisk() {
      this.$axios
        .get("https://api.mercutio.club/covid-risk-sm")
        .then((resp) => {
          this.risk = resp.data.content.data;
        });
    },
  },
  created() {},
  mounted() {
    this.getCovidRisk();
    this.getCovid();
  },
  beforeDestroy() {},
};
</script>

<style lang="css" src="../../styles/card.css" scoped>
</style>
<style scoped>
.covid-cntnt {
  margin: 0 5px;
  border-radius: var(--item-radius);
  display: flex;
  flex-direction: column;
  /* gap: 10px; */
  height: 450px;
  background: var(--card-color);
  position: relative;
}
.community {
  background: var(--sub-card-color);
  padding: 8px 10px;
  border-bottom: 1px solid var(--line-color);
}
.community:first-child {
  border-radius: var(--item-radius) var(--item-radius) 0 0;
  /* padding-top: 10px; */
}

.community:last-child {
  border-radius: 0 0 var(--item-radius) var(--item-radius);
  border-bottom: none;
  /* padding-bottom: 10px; */
}
.community:only-child {
  border-radius: var(--item-radius);
}
.community .content {
  font-size: 0.9em;
}
.province-box {
  display: flex;
  flex-direction: column;
}
.province-header {
  padding: 10px 0;
  position: sticky;
  top: calc(1em + 10px * 2);
  background: var(--card-color);
  padding: 5px 0;
}
.risk-area {
  padding: 0 15px;
  display: flex;
  flex-direction: column;
}
.risk-header {
  text-align: center;
  font-weight: light;
  font-size: 1em;
  padding-top: 5px;
}
.risk-title {
  text-align: center;
  font-weight: bold;
  font-size: 0.8em;
  background: var(--card-color);
  padding: 10px 0;
  position: sticky;
  top: 0;
  z-index: 10;
  color: var(--accent-color);
}
.risk-title a {
  color: var(--subtitle-color);
}
.time-stamp {
  font-size: 0.6em;
  color: var(--subtitle-color);
  text-align: right;
}
.tool-box {
  z-index: 11;
  height: 30px;
  transition: height 0.2s ease, transform 0.2s ease;
  position: sticky;
  background: var(--card-color);
  box-shadow: 0 0 10px 4px #00000023;
  border-radius: var(--item-radius) var(--item-radius) 0 0;
  bottom: 0;
  /* overflow: hidden; */
  display: flex;
  flex-direction: column;
}
.tool-box .content {
  padding: 0 10px 10px 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: stretch;
  overflow: hidden;
}
.handle-bar {
  height: 30px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.handle-stick {
  width: 50px;
  height: 5px;
  border-radius: 3px;
  background: var(--line-color);
}
.tool-box-expand {
  height: 300px;
  /* transform: translateY(-300px); */
}
.covid-status {
  border-radius: var(--item-radius);
  background: var(--sub-card-color);
  padding: 10px 20px;
  margin: 10px;
}
.statistics {
  width: 100%;
  padding: 10px;
  display: grid;
  flex-wrap: wrap;
  gap: 5px;
  grid-template-columns: repeat(auto-fill, minmax(100px, auto));
  justify-content: stretch;
  box-sizing: border-box;
}
.statistics > .city {
  border-radius: var(--item-radius);
  background: var(--sub-card-color);
  padding: 10px;
  display: flex;
  flex-direction: column;
}
.statistics > .city > .count > .badge {
  font-size: 0.4em;
  color: var(--subtitle-color);
  margin-right: 5px;
}
.local-report p {
  margin: 5px 0;
}
.local-report .message {
  font-size: 0.7em;
}
.covid-status > .city {
  display: flex;
  gap: 10px;
  justify-content: center;
}
.covid-status > .city > .count {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.covid-status > .city > .count > .badge {
  font-size: 0.4em;
  color: var(--subtitle-color);
}
</style>