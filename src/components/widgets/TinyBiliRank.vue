<template>
  <div class="bilirank">
    <div class="header">
      <span class="title">热门视频</span>
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
    <div class="bilirank-content fix-scrollbar card-list-height">
      <div
        class="bilirank-area"
        v-for="(tabItem, tabIndex) in data"
        :key="tabIndex"
      >
        <transition-group name="fade">
          <div class="bilirank-list" v-if="currTabIndex == tabIndex && !loading" :key="tabIndex">
            <a
              class="bilirank-item"
              v-for="(listItem, listIndex) in tabItem"
              :key="listIndex"
              :href="listItem.short_link"
              target="_blank"
            >
              <span class="rank" v-text="listIndex + 1 + ' '"></span>

              <div class="bilirank-cover-box">
                <img
                  v-lazy="listItem.pic"
                  alt=""
                  srcset=""
                  class="bilirank-cover"
                />
              </div>
              <div class="bilirank-details">
                <span class="bilirank-title">
                  {{ listItem.title }}
                </span>
                <span class="bilirank-stats">
                  <span class="stat-content">{{ listItem.owner.name }}</span><br/>
                  <span class="stat-content">{{ " 时长："+getDuration(listItem.duration)+ " | " }}</span>
                  <span class="iconfont icon-youtube"></span>
                  <span class="stat-content">{{ parseNumber(listItem.stat.view) }}</span>
                  <span class="iconfont icon-heart"></span>
                  <span class="stat-content">{{ parseNumber(listItem.stat.like) }}</span><br/>
                  <span class="stat-content rcmd-reason" v-if="testReason(listItem.rcmd_reason)">{{ listItem.rcmd_reason.content }}</span>
                </span>
              </div>
            </a>
          </div>
          <!-- <div class="loading-skeleton">

          </div> -->
          <Loading v-if="loading"  key="loading"/>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from '@/components/utils/Loading.vue'
export default {
  components: {
    Loading
  },
  name: "TinyBiliRank",
  data() {
    return {
      expand: true,
      data: {
        all: [
          {
                "aid": 254837741,
                "videos": 4,
                "tid": 172,
                "tname": "手机游戏",
                "copyright": 1,
                "pic": "http://i0.hdslb.com/bfs/archive/5e88f408b2066885756f4f9823419417f93fbb85.jpg",
                "title": "加载中",
                "pubdate": 1647403214,
                "ctime": 1647403255,
                "desc": "《明日方舟》新活动“吾导先路”GA关卡合集的平民攻略，包含了关卡中具有挑战性的关卡攻略，在允许的情况下，Zc将使用无精2、无6星的平民阵容；在要求偏高的关卡中，也尽量只使用单6星或者少6星的平民阵容——尽力帮助各位观众能以上位阵容替代。\r\n本攻略以清晰的思路、详细的讲解为大家认真解读新的关卡，漫谈各种乐趣，无论你是新玩家，还是老牌高手，甚至不玩明日方舟的朋友，都可以从视频中感受到快乐。\r\n如欲支持视频，还请在《明日方舟》视频征集活动中给本视频投一票~投票地址：https://www.bilibili",
                "state": 0,
                "duration": 701,
                "mission_id": 481446,
                "rights": {
                    "bp": 0,
                    "elec": 0,
                    "download": 0,
                    "movie": 0,
                    "pay": 0,
                    "hd5": 0,
                    "no_reprint": 1,
                    "autoplay": 1,
                    "ugc_pay": 0,
                    "is_cooperation": 0,
                    "ugc_pay_preview": 0,
                    "no_background": 0
                },
                "owner": {
                    "mid": 13164144,
                    "name": "加载中",
                    "face": "http://i0.hdslb.com/bfs/face/a84fa10f90f7060d0336384954ee1cde7a8e9bc6.jpg"
                },
                "stat": {
                    "aid": 254837741,
                    "view": 100,
                    "danmaku": 100,
                    "reply": 741,
                    "favorite": 100,
                    "coin": 100,
                    "share": 467,
                    "now_rank": 0,
                    "his_rank": 0,
                    "like": 100,
                    "dislike": 0
                },
                "dynamic": "",
                "cid": 550556278,
                "dimension": {
                    "width": 1920,
                    "height": 1080,
                    "rotate": 0
                },
                "short_link": "https://b23.tv/av10492",
                "short_link_v2": "https://b23.tv/BV1gY411n7xP",
                "first_frame": "http://i0.hdslb.com/bfs/storyff/n220316a22wx2hcj6vzbw236e7lxz586_firsti.jpg",
                "bvid": "BV1gY411n7xP",
                "season_type": 0,
                "is_ogv": false,
                "ogv_info": null,
                "rcmd_reason": {
                    "content": "",
                    "corner_mark": 0
                }
            }
        ],
        rcmd: [
          {
                "aid": 254837741,
                "videos": 4,
                "tid": 172,
                "tname": "手机游戏",
                "copyright": 1,
                "pic": "http://i0.hdslb.com/bfs/archive/5e88f408b2066885756f4f9823419417f93fbb85.jpg",
                "title": "加载中",
                "pubdate": 1647403214,
                "ctime": 1647403255,
                "desc": "《明日方舟》新活动“吾导先路”GA关卡合集的平民攻略，包含了关卡中具有挑战性的关卡攻略，在允许的情况下，Zc将使用无精2、无6星的平民阵容；在要求偏高的关卡中，也尽量只使用单6星或者少6星的平民阵容——尽力帮助各位观众能以上位阵容替代。\r\n本攻略以清晰的思路、详细的讲解为大家认真解读新的关卡，漫谈各种乐趣，无论你是新玩家，还是老牌高手，甚至不玩明日方舟的朋友，都可以从视频中感受到快乐。\r\n如欲支持视频，还请在《明日方舟》视频征集活动中给本视频投一票~投票地址：https://www.bilibili",
                "state": 0,
                "duration": 701,
                "mission_id": 481446,
                "rights": {
                    "bp": 0,
                    "elec": 0,
                    "download": 0,
                    "movie": 0,
                    "pay": 0,
                    "hd5": 0,
                    "no_reprint": 1,
                    "autoplay": 1,
                    "ugc_pay": 0,
                    "is_cooperation": 0,
                    "ugc_pay_preview": 0,
                    "no_background": 0
                },
                "owner": {
                    "mid": 13164144,
                    "name": "加载中",
                    "face": "http://i0.hdslb.com/bfs/face/a84fa10f90f7060d0336384954ee1cde7a8e9bc6.jpg"
                },
                "stat": {
                    "aid": 254837741,
                    "view": 100,
                    "danmaku": 100,
                    "reply": 741,
                    "favorite": 100,
                    "coin": 100,
                    "share": 467,
                    "now_rank": 0,
                    "his_rank": 0,
                    "like": 100,
                    "dislike": 0
                },
                "dynamic": "",
                "cid": 550556278,
                "dimension": {
                    "width": 1920,
                    "height": 1080,
                    "rotate": 0
                },
                "short_link": "https://b23.tv/av10492",
                "short_link_v2": "https://b23.tv/BV1gY411n7xP",
                "first_frame": "http://i0.hdslb.com/bfs/storyff/n220316a22wx2hcj6vzbw236e7lxz586_firsti.jpg",
                "bvid": "BV1gY411n7xP",
                "season_type": 0,
                "is_ogv": false,
                "ogv_info": null,
                "rcmd_reason": {
                    "content": "",
                    "corner_mark": 0
                }
            }
        ],
        // rankcn: [
        //   {
        //     title: "国创排行",
        //     url: "",
        //   },
        // ],
      },
      tabs: [
        {
          name: "综合热门",
          index: "rcmd",
        },
        {
          name: "全站排行",
          index: "all",
        },
        // {
        //   name: "国创排行",
        //   index: "rankcn",
        // },
      ],
      timer: "",
      loading: false,
      currTabIndex: "rcmd",
    };
  },
  watch: {},
  methods: {
    testReason(attrs) {
      try {
        if (attrs.content != "") return true;
        else return false;
      } catch (error) {
        console.info(error);
        return false;
      }
    },
    getDuration(time){
      return (Math.floor(Math.floor(time/60)/60)? Math.floor(Math.floor(time/60)/60)+':':'') + (Math.floor(time/60)%6) + ':' + (time%60 < 10 ? '0':'') + time%60;
    },
    parseNumber(num){
      if(Math.floor(num/10000))
        return Math.floor(num/10000) + '万'
      else
        return num
    },
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
          console.log("OK")
          this.data[index].forEach((element, id) => {
            this.getCover(element.pic, index, id);
          });
          this.loading = false;
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

.bilirank-content {
  box-sizing: border-box;
  width: 100%;
  /* height: 100%; */
  padding: 10px;
  /* margin: 0 0 20px; */
}

.bilirank-item {
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
.bilirank-item:hover {
  background: var(--hover-color);
}
.bilirank-item:active {
  background: var(--active-color);
}
.bilirank-item a {
  text-decoration: none;
}

.bilirank-details {
  width: calc(100% - 50px - 20px - 20px);
  display: flex;
  flex-direction: column;
  margin-left: 10px;
}
.bilirank-cover-box {
  background: var(--sub-card-color);
  border-radius: 4px;
  width: 130px;
  height: calc(130px / 16 * 8);
  overflow: hidden;
  /* height: 60px; */
}
.bilirank-cover {
  background: var(--sub-card-color);
  border-radius: 4px;
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* height: 60px; */
}
.bilirank-stats,
.bilirank-detail {
  color: var(--subtitle-color);
  font-size: 0.6em;
}
.bilirank-title {
  /* display: flex; */
  justify-content: flex-start;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  font-size: .9em;
}
.bilirank-title-end {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  color: var(--subtitle-color);
}
.bilirank-item .rank {
  flex-shrink: 0;
  color: var(--subtitle-color);
  width: 20px;
  display: block;
  font-size: .6em;
}
.bilirank-stats .iconfont{
  font-size: .8em;
  padding:0 3px 0 0;
}
.rcmd-reason{
  display: inline-block;
  margin: 3px 0 0 0;
  padding: 2px 5px;
  background: #ff9406;
  color:#fff;
  border-radius: 4px;
  text-align: right;
}
</style>