<template>
  <div class="RegexTest">
    <h1>正则表达式可视化</h1>
    <input type="text" name="" id="" v-model="re" class="better-input" @keyup.enter="update()" @focus="hide()" @blur="update()" @click="hide()">
    <iframe frameborder="0" :src="getSource()" ref="regexFrame" v-if="show" class="fix-scrollbar"></iframe>
    <div class="frame-placeholder" v-else>
      <span class="tip">在上方输入框输入表达式,之后点击回车</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "RegexTest",
  components: {},
  data() {
    return {
      re:
        "^(a|b)*?$",
      show:false
    };
  },
  computed: {},
  watch: {
    re: function(){
      // this.updateFrame()
    }
  },
  methods: {
    update(){
      this.show = true;
      // this.$forceUpdate();
      // this.updateFrame()
    },
    hide(){
      this.show = false;
    },
    getSource(){
      return 'https://jex.im/regulex/#!embed=true&flags=&re='+encodeURIComponent(this.re)
    },
    updateFrame(){
      this.$refs.regexFrame.contentWindow.location.reload();
    }
  },
  created() {
    
  },
  mounted() {},
  beforeDestroy() {},
};
</script>

<style scoped>
.RegexTest{
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap:20px;
}
iframe,
.frame-placeholder {
  width: 100%;
  /* padding: 20px; */
  border-radius: var(--item-radius);
  height: 300px;
  overflow: hidden;
}
.frame-placeholder{
  background: var(--sub-card-color);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>