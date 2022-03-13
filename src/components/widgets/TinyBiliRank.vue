<template>
  <div class="bilirank">
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
          'fix-text-overflow': true,
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
        <transition name="fade">
          <div class="bilianime-list" v-show="currTabIndex == tabIndex">
            <a
              class="bilianime-item"
              v-for="(listItem, listIndex) in tabItem"
              :key="listIndex"
              :href="listItem.short_link"
              target="_blank"
            >
              <span class="rank" v-text="listIndex + 1 + ' '"></span>

              <img
                v-lazy="listItem.pic"
                alt=""
                srcset=""
                class="bilianime-cover"
              />
              <div class="bilianime-details">
                <span class="bilianime-title">
                  {{ listItem.title }}
                </span>
                <span class="bilianime-stats">
                  {{ listItem.owner.name }}<br/>
                  {{ " 观看："+listItem.stat.view }}
                  {{ " 点赞："+listItem.stat.like }}
                  {{ " 时长："+listItem.duration }}
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
        all: [
          {
            title: "全站排行",
            url: "",
          },
        ],
        // timeline: [
        //   {
        //     title: "叔叔的推荐",
        //     url: "",
        //   },
        // ],
        // rankcn: [
        //   {
        //     title: "国创排行",
        //     url: "",
        //   },
        // ],
      },
      tabs: [
        {
          name: "全站排行",
          index: "all",
        },
        // {
        //   name: "叔叔的推荐",
        //   index: "timeline",
        // },
        // {
        //   name: "国创排行",
        //   index: "rankcn",
        // },
      ],
      timer: "",
      loading: true,
      currTabIndex: "all",
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
        .get("https://api.mercutio.club/bilibili/rank/"+index)
        .then(({ data }) => {
          console.log(data);
          this.data[index] = data.content.data.list;
          this.data[index].forEach((element, id) => {
            // console.log(index,element)
            // console.log(index,id)
            this.getCover(element.pic, index, id);
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
      let coverUrl = encodeURIComponent(url + "@143w_80h_1c_50q.webp");
      let base;
      this.data[type][
        index
      ].pic = require("@/assets/images/video/bili-loading.png");
      this.$axios
        .get(
          "https://api.mercutio.club" + "/bilibili/get-cover?url=" + coverUrl
        )
        .then(({ data }) => {
          base = "data:image/jpg;base64," + data;
          this.data[type][index].pic = base;
        })
        .catch(console.error);
      return this.data[type][index].pic;
    }
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
.bilirank {
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
  width: calc(100% - 50px - 20px - 10px);
  display: flex;
  flex-direction: column;
  margin-left: 10px;
}
.bilianime-cover {
  border-radius: 2px;
  width: 143px;
  height: 80px;
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
.bilianime-item .rank {
  flex-shrink: 0;
  color: var(--subtitle-color);
  width: 10px;
  display: block;
}
</style>