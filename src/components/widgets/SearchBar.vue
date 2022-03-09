<template>
  <div class="search-bar">
    <div
      :class="{
        'search-box': true,
        'search-box-blurred': bgPrepared && settings.useBlur,
        'search-focus': focused,
        'search-box-hover': hovered,
      }"
    >
      <div class="select-engines ef-pudding" @click="moreChoose? moreChoose = false : moreChoose = true">
        <div class="search-icon-box" :style="{'background-color':chosenEngine.color}">
          <img
            class="search-icon"
            :src="getIcon(chosenEngine.icon)"
            alt=""
            srcset=""
          />
        </div>
        <div class="chevron"><span :class="{'iconfont':true, 'icon-chevron-down':!moreChoose, 'icon-chevron-up':moreChoose}"></span></div>
      </div>
      <form
        class="search-form"
        target="_blank"
        autocomplete="off"
        :action="chosenEngine.url + returnSearchItem(chosenEngine)"
        @click="focusToInput()"
        @mouseover="hovered = true"
        @mouseout="hovered = false"
      >
        <input
          type="text"
          class="search-input"
          ref="search"
          autocomplete="off"
          @focus="focused = true"
          @blur="focused = false"
          :name="chosenEngine.queryword"
          :placeholder="chosenEngine.placeholder"
        />
      </form>
    </div>
    <transition name="fade">
      <div class="more-engines fix-scrollbar" v-if="moreChoose">
        <div class="engines-list" v-for="(item, index) in moreEngines" :key="index">
          <span class="engines-list-title">{{ item.attributes.name }}</span>
          <div class="engine-items">
            <div class="engine-item ef-float" v-for="(item_1,index_1) in item.attributes.search_engines.data" :key="index_1" @click="changeEngine(index,index_1)">
              <div class="icon-bg" :style="{'background-color':item_1.attributes.color}"><img :src="getIcon(item_1.attributes.icon)" alt="" srcset="" class="icon"></div>
              <span class="title fix-text-overflow">{{item_1.attributes.title}}</span>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "SearchBar",
  components: {},
  data() {
    return {
      chosenEngine: {
        
      },
      focused: false,
      hovered: false,
      moreEngines: [],
      moreChoose:false
    };
  },
  computed: {
    remoteChosenEngine:function(){
      return this.$store.getters.getEngine;
    },
    bgPrepared: function () {
      return this.$store.getters.getBgPrepared;
    },
    settings: function(){
      return this.$store.getters.getSettings;
    }
  },
  watch: {
    chosenEngine(){
      this.$store.commit("setEngine", this.chosenEngine);
    }
  },
  methods: {
    focusToInput() {
      this.$refs.search.focus();
    },
    returnSearchItem(item) {
      if (item.suffix) {
        return this.searchItem;
      } else {
        return "";
      }
    },
    getIcon(icon) {
      try {
        let url = icon.data.attributes.url;
        return "https://navapi.mercutio.club" + url;
      } catch (error) {
        // console.log(error);
        // console.log(icon);
        return require("@/assets/images/webpage.svg");
      }
    },
    getRemoteEngines() {
      try {
        this.$api
          .get(
            "/search-engine-collections?populate[0]=search_engines&populate[1]=search_engines.icon"
          )
          .then((response) => {
            // console.log(response.data.data);
            this.moreEngines = response.data.data;
          });
      } catch (error) {
        console.info(error);
      }
    },
    changeEngine(index,index_1){
      this.chosenEngine = this.moreEngines[index].attributes.search_engines.data[index_1].attributes;
      this.focusToInput();
      this.moreChoose = false;
    }
  },
  created() {},
  mounted() {
    this.chosenEngine = this.remoteChosenEngine;
    this.getRemoteEngines();
  },
  beforeDestroy() {},
};
</script>

<style scoped>
.search-box {
  border-width: 3px;
  border-style: solid;
  border-color: transparent;
  border-radius: var(--card-radius);
  background: var(--sub-card-color);
  padding-left: 10px;
  /* overflow: hidden; */
  width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: var(--title-color);
  transition: border-color 0.2s ease;
  gap: 10px;
}
.search-box-blurred{
  background: var(--blurred-sub-card-color);
}
.search-box-hover {
  border-color: var(--accent-color);
}
.search-focus {
  border-color: var(--accent-color);
  background: var(--sub-card-color);
}
.search-input {
  /* height: 100%; */
  color: var(--content-color);
  width: 100%;
  background: none;
  outline: none;
  border: none;
  font-size: 18px;
  font-family: MiSans, "San Francisco", "SF Pro Display", "PingFang SC",
    Helvetica, Arial, sans-serif;
}
.select-engines{
  cursor: pointer;
  display: flex;
  align-items: center;
  gap:7px;
  border-radius: var(--item-radius);
}
.search-icon-box {
  border-radius: var(--item-radius);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: #fff;
}
.search-icon {
  box-sizing: border-box;
  padding: 4px;
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.search-form {
  width: calc(100% - 40px - 10px);
  padding: 15px 0;
  display: block;
  height: 100%;
  cursor: text;
  /* background: #000; */
}
.more-engines {
  /* position: absolute; */
  /* top:0; */
  /* width: 80px; */
  padding: 10px;
  background: var(--sub-card-color);
  height: 190px;
  border-radius: var(--card-radius);
  overflow-y: scroll;
  overflow-x: hidden;
  margin-top: 10px;
}

.engines-list{
  display: flex;
  flex-direction: column;
}
.engine-items{
  display: flex;
  flex-wrap: wrap;
  gap:5px;
  /* padding: 5px; */
  box-sizing: border-box;
}
.engine-item{
  display: flex;
  padding: 5px;
  align-items: center;
  background: var(--card-color);
  border-radius: var(--item-radius);
  cursor: pointer;
  gap:10px;
  overflow: hidden;
}
.engine-item .icon-bg{
  width: 40px;
  height: 40px;
  border-radius: var(--item-radius);
  box-shadow: 0 1px 7px 1px #00000012;
}
.engine-item .icon{
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 5px;
  box-sizing: border-box;
}
.engine-item .title{
  width: 100px;
  /* text-align: center; */
  font-size: 0.9em;
}
.engines-list-title{
  margin: 12px 0 5px 0;
  font-weight: 800;
}
</style>
