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
            'ef-fadein':true
          }"
          v-for="(item, index) in tabs"
          :key="index"
          @click="changeTab(item.index)"
        >
          {{ item.name }}
        </li>
      </ul>
    <div class="bilianime-content">
      <div
        class="bilianime-area"
        v-for="(tabItem, tabIndex) in data"
        :key="tabIndex"
      >
        <transition name="fade">
          <div class="bilianime-list" v-show="currTabIndex == tabIndex">
            <a
              class="bilianime-item"
              v-for="(listItem, listIndex) in tabItem"
              :key="listIndex"
              :href="listItem.url"
              target="_blank"
            >
              <img
                :src="listItem.cover"
                alt=""
                srcset=""
                class="bilianime-cover"
              />
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
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
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
      loading: true,
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
            this.data[index] = data.content.result.latest.splice(0,10);
          } else if (index == "rankjp") {
            this.data[index] = data.content.result.list.splice(0,10);
          } else if (index == "rankcn") {
            this.data[index] = data.content.data.list.splice(0,10);
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
      // tthis.data[type][index].cover = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABHCAMAAAB4UkqjAAAAh1BMVEUAAADd3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d0UCIZXAAAALHRSTlMAoJDx4OYL/DcGF+6+JNi4ycSIT2k6LPeWfRzTVPXPszEQrV0hpo12cEZAZFpRNIQAAAJVSURBVFjD7dbZcpswGIbhHwwSi81q8Ib33fnu//oatRIpmliDhQ/aaZ+TKInnjVgkhb4RJMhP9Fzo8PiD+vEA+JPnqS0+1dRHBJhibAzh2HNeekxP9Z8XBSMZM6SmRBYx65QeM6XsY3rKPqanLGMWqeDmOh0b/Io9+YHi3gKtdExgLznSlyjFMGnUphIMlcgY22C4DSPBxTu4IrXDe+yI6IDWbPSqGVoHoohDyip6XZVB4hFN1TgPyUaYQ5rSWQ0nZGcC6UyJukKypa4yIXX3HLLlqCdHX++HLRfS/9bbWvvHLSLNR3N6tRXdFwdxejekiYF4fDnWYa/WqSm2PqRCSy0hrbP5RxAaW8141N17tVbZ+S1fFYbWFF2+1lqg62BoBdAsqWOLroWhxTh+M8vmWuuaxp1WaWjRSn43yl35sHTLUjxiaWlqnYE4LZoJme3v13MibqepFZRL6otV5V+/Hv+xVvi+FsvZG1qh/LQ7uFXnF/HlwcEfYlDktW2r5EARUiXWc1xRWAC8tGwxsdJ9dcRnYrddMdtrjDZyAy3kXrSJ7O89u8zEZAIKxBRnFzbonWD3ZkfCrrmzP+6979nicjAnW3NZ4OS1R6GtVBa8drTek539up3NAgMvcv51WNZQitCiFBZQaqIMSrx1XrWNoWTy/w1r+hk+xjuMSVjGGC6WZ3S1xlDriqTKxzB+Ra3I4bDHne62drqmied57QR9z0D94dHnOEmvJ/pWAMm4ovL2TTcJ5cRyMlHrbkdG5c/5r82fYqt+K/iR89m2JrP9PEZyI80PsPxVT0P3FAEAAAAASUVORK5CYII=";
      this.$axios
        .get("https://api.mercutio.club" + "/bilibili/get-cover?url=" + coverUrl)
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
  height: 100%;
  padding: 5px 20px;
  margin: 0 0 20px;
}

.bilianime-item {
  display: flex;
  width: 100%;
  /* padding: 3px 3px; */
  margin: 5px 0;
  border-radius: 5px;
  transition: all 0.2s ease;
  cursor: pointer;
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

.bilianime-area {
}

.bilianime-details {
  display: flex;
  flex-direction: column;
  margin-left: 10px;
}
.bilianime-cover {
  border-radius: 5px;
  width: 50px;
  height: 67.171px;
}
.bilianime-stats,
.bilianime-detail {
  color: var(--content-color);
  font-size: 10px;
}
.bilianime-title {
  color: var(--content-color);
  /* display: flex; */
  justify-content: flex-start;
  font-size: 15px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
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
</style>