<template>
  <div class="bangumi-calendar fix-scrollbar">
    <h1>番组放送</h1>
    <div class="bangumi-list">
      <div
        class="bangumi-item"
        v-for="(item, index) in onAirItems"
        :key="index"
      >
        <div class="header">
          <div class="zh-test" v-if="item.titleTranslate['zh-Hans']">
            <span
              class="title-zh"
              v-for="(item_1, index_1) in item.titleTranslate['zh-Hans']"
              :key="index_1"
            >
              {{ item_1 }}
            </span>
          </div>
          <span class="title-zh" v-else>
            {{ item.title }}
          </span>
          <!-- <span class="title-jp">{{ item.title }}</span> -->
        </div>
        <div class="functions">
          <a
            class="function-link ef-fadein officialSite"
            :href="item.officialSite"
            target="_blank"
            >官网</a
          >
          <!-- <span
            class="sites"
          > -->
          <a
            class="function-link ef-fadein"
            v-for="(item_1, index_1) in item.sites"
            :key="index_1"
            :href="
              siteMeta[item_1.site].urlTemplate.replace('{{id}}', item_1.id)
            "
            target="_blank"
            >{{ siteMeta[item_1.site].title }}</a
          >
          <!-- </span> -->
        </div>
      </div>
    </div>
    <!-- {{ onAirItems }} -->
    <!-- <button class="get_data" @click="getData()">getData</button> -->
  </div>
</template>

<script>
import { getNowOnAirBangumiData } from "./utils/bangumiCalendar/data-getter";
import {
  getEventsFromData,
  getBangumiName,
} from "./utils/bangumiCalendar/data-processor";
import moment from "moment";
export default {
  name: "",
  components: {},
  data() {
    return {
      dataUrl: "https://unpkg.com/bangumi-data@0.3/dist/data.json",
      bangumiData: "",
      resultFileName: "bangumi.ics",
      //   resultPath: path.join(__dirname, "../result"),
      //   likeFilePath: path.join(__dirname, "like.json"),
      defaultLikeList: [
        "サマータイムレンダ",
        "継母の連れ子が元カノだった",
        "それでも歩は寄せてくる",
        "リコリス・リコイル",
      ],
      onAirItems: [],
      siteMeta: {},
    };
  },
  computed: {},
  watch: {},
  methods: {
    getData() {
      this.$api
        .get("https://unpkg.com/bangumi-data@0.3/dist/data.json")
        .then((response) => {
          console.log(response.data);
          this.bangumiData = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getNowOnAirData(items) {
      const timeNow = moment();
      this.$api
        .get("https://unpkg.com/bangumi-data@0.3/dist/data.json")
        .then((response) => {
          this.bangumiData = response.data;
          this.siteMeta = response.data.siteMeta;
          this.onAirItems = getNowOnAirBangumiData(
            timeNow,
            response.data.items
          );
          console.log(this.onAirItems);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  created() {},
  mounted() {
    this.getNowOnAirData();
  },
  beforeDestroy() {},
};
</script>

<style>
.bangumi-calendar {
  height: 100%;
  overflow: scroll;
  padding: 30px;
  box-sizing: border-box;
}
.bangumi-list {
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
}
.bangumi-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 20px;
  /* border: 1px solid #000; */
  box-sizing: border-box;
  border-radius: var(--card-radius);
  background: var(--sub-card-color);
}
.bangumi-item .header {
  display: flex;
  flex-direction: column;
}
.bangumi-item .functions {
  display: flex;
  gap: 3px;
  flex-wrap: wrap;
}
.title-zh {
  display:flex;
  flex-direction:column;
  font-size: 1.2em;
}
.title-jp {
  font-size: 0.8em;
  color: var(--subtitle-color);
}
.function-link {
  padding: 5px;
  border-radius: var(--card-radius);
}
</style>