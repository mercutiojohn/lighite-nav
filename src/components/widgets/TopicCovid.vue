<template>
  <div class="topic-covid">
    <div class="header">
      <span class="title">疫情信息</span>
      <div class="right"></div>
    </div>

    <div class="fix-scrollbar card-list-long-height covid-cntnt">
      <div class="risk-area">
        <span class="risk-header">疫情风险地区汇总</span>
        <span class="risk-title">高风险地区 · {{ risk.count["2"] }}个</span>
        <span class="time-stamp"
          >更新于{{ risk.dateline["2"] }} 数据来自夸克</span
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
        <span class="risk-title">中风险地区 · {{ risk.count["1"] }}个</span>
        <span class="time-stamp"
          >更新于{{ risk.dateline["1"] }} 数据来自夸克</span
        >
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
      </div>
      <div :class="{ 'tool-box': true, 'tool-box-expand': showTools }">
        <div class="handle-bar" @click="showTools = !showTools">
          <span class="handle-stick"></span>
        </div>
        <transition name="fade">
          <div class="content" v-if="showTools">
            <span class="risk-header">实时地图</span>
            <a href="https://2019ncov.chinacdc.cn/2019-nCoV/" target="_blank">
              <button class="common-button">国家卫健委</button>
            </a>
            <a href="https://www.tianditu.gov.cn/coronavirusmap/" target="_blank">
              <button class="common-button">天地图</button>
            </a>
            <span class="risk-header">常用查询</span>
            <a href="http://bmfw.www.gov.cn/yqfxdjcx/index.html" target="_blank">
              <button class="common-button">疫情风险等级查询</button>
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
      showTools: false,
    };
  },
  computed: {},
  watch: {},
  methods: {
    getCovidRisk() {
      this.$axios
        .get("https://m.sm.cn/api/rest?format=json&method=Huoshenshan.riskArea")
        .then((resp) => {
          this.risk = resp.data.data;
        });
    },
  },
  created() {},
  mounted() {
    this.getCovidRisk();
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
  gap: 10px;
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
.risk-area{
  padding: 0 15px;
  display: flex;
  flex-direction: column;
}
.risk-header {
  /* text-align: center; */
  font-weight: bold;
  font-size: 1.2em;
  padding-top: 10px;
}
.risk-title {
  font-weight: bold;
  background: var(--card-color);
  padding: 10px 0;
  position: sticky;
  top: 0;
  z-index: 10;
}
.time-stamp {
  font-size: 0.6em;
  color: var(--subtitle-color);
}
.tool-box {
  height: 30px;
  transition: height 0.2s ease, transform 0.2s ease;
  position: sticky;
  background: var(--card-color);
  box-shadow: 0 0 10px 4px #00000023;
  border-radius: var(--item-radius);
  bottom: 0;
  /* overflow: hidden; */
  display: flex;
  flex-direction: column;
}
.tool-box .content{
  padding: 0 10px;
  display: flex;
  flex-direction: column;
  gap:10px;
  align-items: stretch;
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
</style>