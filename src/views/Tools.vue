<template>
  <div class="tools common-page">
    <div class="tools-list fix-scrollbar">
      <div
        class="tools-category"
        v-for="(sublist, index) in toolsList"
        :key="index"
      >
        <span class="tools-category-title">{{ sublist.title }}</span>
        <div class="tools-category-list">
          <div
            :class="{
              'tool-item': true,
              'tool-item-active': ifCurrTab(index, toolItemIndex),
            }"
            v-for="(item, toolItemIndex) in sublist.items"
            :key="toolItemIndex"
            @click="updateIndex(index, toolItemIndex)"
          >
            <!-- <i></i> -->
            <span>{{ item.title }}</span>
          </div>
        </div>
      </div>
      <div class="navs">
        <div class="header"><span class="header-title">功能</span></div>
        <div class="navs-list">
          <router-link
            class="nav-item ef-float"
            v-for="(item, index) in navs"
            :key="index"
            :to="item.link"
          >
            <span :class="'icon iconfont icon-' + item.icon"></span>
            <span class="title" v-text="item.title"></span>
          </router-link>
        </div>
      </div>
    </div>
    <div class="tool-page">
      <transition name="fade" mode="out-in">
        <keep-alive>
          <component v-bind:is="currentTabComponent" class="tab"></component>
        </keep-alive>
      </transition>
    </div>
  </div>
</template>

<script>
import UrlEncode from "@/components/tools/UrlEncode.vue";
import Base64 from "@/components/tools/Base64.vue";
import Typing from "@/components/tools/Typing.vue";
import MbtiTest from "@/components/tools/MbtiTest.vue";
import RegexTest from "@/components/tools/RegexTest.vue";
import BangumiCalendar from "@/components/tools/BangumiCalendar.vue";
export default {
  name: "Tools",
  components: {
    Base64,
    UrlEncode,
    Typing,
    MbtiTest,
    RegexTest,
    BangumiCalendar
  },
  data() {
    return {
      toolsList: [
        {
          title: "影音",
          items: [
            {
              title: "番组放送",
              component: "BangumiCalendar",
            },
          ]
        },{
          title: "编码转换",
          items: [
            {
              title: "URL 编码",
              component: "UrlEncode",
            },
            {
              title: "Base64 编码",
              component: "Base64",
            },
            {
              title: "正则表达式可视化",
              component: "RegexTest",
            },
          ],
        },
        {
          title: "实验室",
          items: [
            {
              title: "打字训练",
              component: "Typing",
            },{
              title: "MBTI测试",
              component: "MbtiTest",
            },
          ],
        },
      ],
      current: {
        list: 0,
        tab: 0,
      },
      navs: [
        // {
        //   title: "音乐",
        //   icon: "musicbox",
        //   link: "/music",
        // },
        // {
        //   title: "视频",
        //   icon: "VideoClip-1",
        //   link: "/video",
        // },
        // {
        //   title: "书籍和文章",
        //   icon: "book",
        //   link: "/books",
        // },
        // {
        //   title: "待办事项",
        //   icon: "richeng",
        //   link: "/todo",
        // },
        {
          title: "网址导航",
          icon: "zhinanzhen",
          link: "/navigation",
        },
      ],
    };
  },
  computed: {
    currentTabComponent: function () {
      let a =
        this.toolsList[this.current.list].items[this.current.tab].component;
      console.log(a);
      return a;
    },
  },
  watch: {},
  methods: {
    updateIndex(list, item) {
      this.current.list = list;
      this.current.tab = item;
    },
    ifCurrTab(list, item) {
      if (this.current.list == list && this.current.tab == item) {
        return true;
      } else {
        return false;
      }
    },
  },
  created() {},
  mounted() {},
  beforeDestroy() {},
};
</script>

<style scoped>
.tools {
  padding: 0;
  display: flex;
}
.header {
  margin: 10px 0;
}
.navs-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.nav-item {
  padding: 10px;
  display: flex;
  background: var(--sub-card-color);
  border-radius: var(--card-radius);
  align-items: center;
  justify-content: center;
  /* flex-direction: column; */
  gap: 10px;
  color: var(--content-color);
}
.nav-item .icon {
  font-size: var(--icon-size);
}
/*  */
.tools-list {
  box-sizing: border-box;
  padding: 20px;
  height: 100%;
  width: 300px;
  /* background: var(--elem-color); */
  position: sticky;
  top: 0;
  overflow-y: scroll;
  user-select: none;
}
.tool-page {
  width: calc(100% - 300px);
  /* background: var(--sub-card-color); */
  /* border-radius: var(--item-radius) 0 0 0; */
  border-left: 1px solid var(--line-color);
  overflow: hidden;
}
.tools-category {
  margin-bottom: 10px;
}
.tools-category-title {
  display: flex;
  padding: 10px 0;
}
.tools-category-list {
  border-radius: var(--item-radius);
  background: var(--sub-card-color);
  overflow: hidden;
}
.tool-item {
  /* border-radius: var(--item-radius); */
  padding: 10px 8px;
  border-bottom: 1px solid #00000012;
  transition: all 0.2s ease;
  cursor: pointer;
}
.tool-item:last-child {
  border-bottom: none;
}
.tool-item:hover {
  background: var(--hover-color);
  /* color: #fff; */
}
.tool-item:active {
  background: var(--accent-color);
  color: #fff;
}
.tool-item-active {
  background: var(--accent-color) !important;
  color: #fff;
  cursor: unset;
}
</style>