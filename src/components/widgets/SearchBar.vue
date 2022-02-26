<template>
  <div class="search-bar">
    <div
      :class="{
        'search-box': true,
        'search-focus': focused,
        'search-box-hover': hovered,
      }"
    >
      <div class="search-icon-box ef-pudding">
        <img
          class="search-icon"
          :src="require('@/assets/images/webpage.svg')"
          alt=""
          srcset=""
        />
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
          :name="chosenEngine.queryWord"
          :placeholder="chosenEngine.placeholder"
        />
      </form>
    </div>
    <transition name="fade">
    
    <div class="more-engines" v-if="focused">

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
        title: "必应",
        url: "https://cn.bing.com/search",
        queryWord: "q",
        placeholder: "Microsoft Bing 必应搜索",
      },
      focused: false,
      hovered: false,
    };
  },
  computed: {},
  watch: {},
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
  },
  created() {},
  mounted() {},
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
  overflow: hidden;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: var(--title-color);
  transition: border-color 0.2s ease,border-radius 0.2s ease 0.2s;
  gap: 10px;
}
.search-box-hover {
  border-color: var(--accent-color);
}
.search-focus {
  border-radius: var(--card-radius) var(--card-radius) 0 0;
  border-color: var(--accent-color);
  transition: border-radius 0s ease;
}
.search-input {
  /* height: 100%; */
  width: 100%;
  background: none;
  outline: none;
  border: none;
  font-size: 18px;
  font-family: MiSans, "San Francisco", "SF Pro Display", "PingFang SC",
    Helvetica, Arial, sans-serif;
}
.search-icon-box {
  border-radius: var(--item-radius);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: #fff;
  cursor: pointer;
}
.search-icon {
  box-sizing: border-box;
  padding: 5px;
  width: 100%;
  max-height: 100%;
}
.search-form {
  width: 100%;
  padding: 15px 0;
  display: block;
  height: 100%;
  cursor: text;
  /* background: #000; */
}
.more-engines{
    background: var(--sub-card-color);
    height: 200px;
    border-radius:0 0 var(--card-radius) var(--card-radius);
}
</style>
