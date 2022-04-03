<template>
  <div class="bilianime">
    <div class="header">
      <span class="title">番剧排行</span>
      <router-link to="/video">
        <button class="icon-button">
          <span class="label">更多</span>
          <span class="iconfont icon-chevron-right"></span>
        </button>
      </router-link>
    </div>
    <ul class="tabs">
      <li
        :class="{
          tab: true,
          'tab-active': ifTabActive(item.index),
          'ef-fadein': true,
          'fix-text-overflow': true
        }"
        v-for="(item, index) in tabs"
        :key="index"
        @click="changeTab(item.index)"
      >
        {{ item.name }}
      </li>
    </ul>
    <div class="bilianime-content fix-scrollbar card-list-height">
      <div
        class="bilianime-area"
        v-for="(tabItem, tabIndex) in data"
        :key="tabIndex"
      >
        <transition-group name="fade" type="out-in">
          <Loading v-if="loading" key="loading"/>
          <div class="bilianime-list" v-if="currTabIndex == tabIndex && !loading"  :key="tabIndex">
            <a
              class="bilianime-item"
              v-for="(listItem, listIndex) in tabItem"
              :key="listIndex"
              :href="listItem.url"
              target="_blank"
            >
              <span class="rank" v-text="listIndex + 1 + ' '"></span>

              <div class="bilianime-cover-box">
                <img
                  v-lazy="listItem.cover"
                  alt=""
                  srcset=""
                  class="bilianime-cover"
                />
              </div>
              <div class="bilianime-details">
                <span class="bilianime-title">
                  {{ listItem.title }}
                </span>
                <span class="bilianime-stats">
                  {{ listItem.follows ? listItem.follows + " " : "" }}
                  {{ listItem.plays ? listItem.plays + "播放" : "" }}
                  {{ listItem.rating ? listItem.rating : "" }}
                </span>
                <span class="bilianime-detail">
                  {{ listItem.pub_index ? listItem.pub_index : "" }}
                  {{ listItem.new_ep ? listItem.new_ep.index_show : "" }}
                </span>
              </div>
            </a>
          </div>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from "@/components/utils/Loading.vue";
export default {
  components: {
    Loading
  },
  name: "bilianime",
  data() {
    return {
      expand: true,
      data: {
        rankjp: [
          {
            title: "番剧排行",
            url: "",
          },
        ],
        timeline: [
          {
            title: "叔叔的推荐",
            url: "",
          },
        ],
        rankcn: [
          {
            title: "国创排行",
            url: "",
          },
        ],
      },
      tabs: [
        {
          name: "番剧排行",
          index: "rankjp",
        },
        {
          name: "叔叔的推荐",
          index: "timeline",
        },
        {
          name: "国创排行",
          index: "rankcn",
        },
      ],
      timer: "",
      loading: false,
      currTabIndex: "rankjp",
    };
  },
  watch: {},
  methods: {
    ifTabActive(index) {
      if (index == this.currTabIndex) return true;
      else return false;
    },
    changeTab(tabIndex) {
      this.currTabIndex = tabIndex;
    },
    getBiliAnimeContent(index) {
      this.$axios
        .get("https://api.mercutio.club" + "/bilibili/anime/" + index)
        .then(({ data }) => {
          // console.log(index,data);
          if (index == "timeline") {
            // this.data[index] = data.content.result.latest.splice(0, 10);
            this.data[index] = data.content.result.latest;
          } else if (index == "rankjp") {
            // this.data[index] = data.content.result.list.splice(0, 10);
            this.data[index] = data.content.result.list;
          } else if (index == "rankcn") {
            // this.data[index] = data.content.data.list.splice(0, 10);
            this.data[index] = data.content.data.list;
          }
          this.data[index].forEach((element, id) => {
            // console.log(index,element)
            // console.log(index,id)
            this.getCover(element.cover, index, id);
          });
          this.loading = false;
          // this.$forceUpdate();
        })
        .catch(console.error);
    },
    refresh() {
      this.tabs.forEach((element) => {
        // console.log(element);
        this.getBiliAnimeContent(element.index);
      });
    },
    getCover(url, type, index) {
      let coverUrl = encodeURIComponent(url + "@99w_133h_1c_50q.webp");
      let base;
      this.data[type][
        index
      ].cover = require("@/assets/images/video/bili-loading.png");
      // this.data[type][index].cover = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABHCAMAAAB4UkqjAAAAh1BMVEUAAADd3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d0UCIZXAAAALHRSTlMAoJDx4OYL/DcGF+6+JNi4ycSIT2k6LPeWfRzTVPXPszEQrV0hpo12cEZAZFpRNIQAAAJVSURBVFjD7dbZcpswGIbhHwwSi81q8Ib33fnu//oatRIpmliDhQ/aaZ+TKInnjVgkhb4RJMhP9Fzo8PiD+vEA+JPnqS0+1dRHBJhibAzh2HNeekxP9Z8XBSMZM6SmRBYx65QeM6XsY3rKPqanLGMWqeDmOh0b/Io9+YHi3gKtdExgLznSlyjFMGnUphIMlcgY22C4DSPBxTu4IrXDe+yI6IDWbPSqGVoHoohDyip6XZVB4hFN1TgPyUaYQ5rSWQ0nZGcC6UyJukKypa4yIXX3HLLlqCdHX++HLRfS/9bbWvvHLSLNR3N6tRXdFwdxejekiYF4fDnWYa/WqSm2PqRCSy0hrbP5RxAaW8141N17tVbZ+S1fFYbWFF2+1lqg62BoBdAsqWOLroWhxTh+M8vmWuuaxp1WaWjRSn43yl35sHTLUjxiaWlqnYE4LZoJme3v13MibqepFZRL6otV5V+/Hv+xVvi+FsvZG1qh/LQ7uFXnF/HlwcEfYlDktW2r5EARUiXWc1xRWAC8tGwxsdJ9dcRnYrddMdtrjDZyAy3kXrSJ7O89u8zEZAIKxBRnFzbonWD3ZkfCrrmzP+6979nicjAnW3NZ4OS1R6GtVBa8drTek539up3NAgMvcv51WNZQitCiFBZQaqIMSrx1XrWNoWTy/w1r+hk+xjuMSVjGGC6WZ3S1xlDriqTKxzB+Ra3I4bDHne62drqmied57QR9z0D94dHnOEmvJ/pWAMm4ovL2TTcJ5cRyMlHrbkdG5c/5r82fYqt+K/iR89m2JrP9PEZyI80PsPxVT0P3FAEAAAAASUVORK5CYII=";
      this.$axios
        .get(
          "https://api.mercutio.club" + "/bilibili/get-cover?url=" + coverUrl
        )
        .then(({ data }) => {
          base = "data:image/jpg;base64," + data;
          this.data[type][index].cover = base;
        })
        .catch(console.error);
      return this.data[type][index].cover;
    },
    getAllCover() {
      let _this = this;
      for (var i = 0; i < this.data.length; i++) {
        // console.log("get the " + i + " cover")
        // this.covers[i] = this.getCover(_this.data[i].cover,i);
        this.getCover(_this.data[i].cover, i);
        // this.$forceUpdate();
      }
    },
  },
  created() {},
  mounted() {
    this.loading = true;
    let _this = this;
    _this.refresh();
    this.timer = setInterval(() => {
      _this.refresh();
      _this.$forceUpdate();
    }, 120000);
  },
};
</script>
<style lang="css" src="../../styles/card.css" scoped>
</style>
<style scoped>
.bilianime {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  /* height: 100%; */
}
.expand {
  padding: 3px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  cursor: pointer;
  flex-grow: 0;
}

.bilianime-content {
  box-sizing: border-box;
  width: 100%;
  /* height: 100%; */
  padding: 10px;
  /* margin: 0 0 20px; */
}

.bilianime-item {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px;
  transition: all 0.2s ease;
  cursor: pointer;
  color: var(--title-color);
  border-bottom: 1px solid var(--line-color);
  justify-content: space-between;
}
.bilianime-item:hover {
  background: var(--hover-color);
}
.bilianime-item:active {
  background: var(--active-color);
}
.bilianime-item a {
  text-decoration: none;
}

.bilianime-details {
  width: calc(100% - 50px - 20px - 20px);
  display: flex;
  flex-direction: column;
  margin-left: 10px;
}
.bilianime-cover-box {
  --cover-w:80px;
  background: var(--sub-card-color);
  border-radius: 4px;
  width: var(--cover-w);
  height: calc(var(--cover-w) / 3 * 4);
  overflow: hidden;
  /* height: 60px; */
}
.bilianime-cover {
  background: var(--sub-card-color);
  border-radius: 4px;
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* height: 60px; */
}
.bilianime-stats,
.bilianime-detail {
  color: var(--subtitle-color);
  font-size: 0.8em;
}
.bilianime-title {
  /* display: flex; */
  justify-content: flex-start;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.bilianime-title-end {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  color: var(--subtitle-color);
}
.bilianime-item .rank{
  flex-shrink: 0;
  color: var(--subtitle-color);
  width: 20px;
  display: block;
}
</style>