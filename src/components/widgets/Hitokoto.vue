<template>
  <div class="hitokoto">
    <transition name="fade">
      <div
        class="hitokoto-box"
        v-if="display && !loading"
        @click="getHitokoto()"
      >
        <span
          :class="{
            'hitokoto-content': true,
          }"
          v-html="data.hitokoto"
        >
          
        </span>
        <span :class="{ 'hitokoto-from': true }"> ——{{ data.from }} </span>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "Hitokoto",
  props: {
    darkStyle: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      data: {
        id: 5244,
        uuid: "da22aded-e58b-4b9d-8e2d-55d302ea95ed",
        hitokoto: "",
        type: "k",
        from: "Mercutio",
        from_who: null,
        creator: "a632079",
        creator_uid: 1044,
        reviewer: 1,
        commit_from: "web",
        created_at: "1583784351",
        length: 26,
      },
      display: true,
      loading: true,
      // hitoKind:"a&c=b&c=c&c=d&c=e&c=f&c=g&c=h&c=i&c=j&c=k"
      hitoKind: "",
      // a	动画
      // b	漫画
      // c	游戏
      // d	文学
      // e	原创
      // f	来自网络
      // g	其他
      // h	影视
      // i	诗词
      // j	网易云
      // k	哲学
      // l	抖机灵
      // 其他	作为 动画 类型处理
    };
  },

  methods: {
    formatLines(){
        var reg = /[，,]/g;
        this.data.hitokoto = this.data.hitokoto.replace(reg,"，<br>");
        reg = /[。.]/g;
        this.data.hitokoto = this.data.hitokoto.replace(reg,"。<br>");
        reg = /[；;]/g;
        this.data.hitokoto = this.data.hitokoto.replace(reg,"；<br>");
        reg = /[？?]/g;
        this.data.hitokoto = this.data.hitokoto.replace(reg,"？<br>");
        reg = /[！!]/g;
        this.data.hitokoto = this.data.hitokoto.replace(reg,"！<br>");
        reg = /[:：]/g;
        this.data.hitokoto = this.data.hitokoto.replace(reg,"：<br>");
        var reg = /[“”"]/g;
        this.data.hitokoto = this.data.hitokoto.replace(reg,"");
        var reg = /……/g;
        this.data.hitokoto = this.data.hitokoto.replace(reg,"……<br>");
    },
    getHitokoto() {
      this.loading = true;
      let qstring = '?';
      let index = 0;
      for(let item in this.hitokotoKind){
        
        if(this.hitokotoKind[item]){
          if(index){
            qstring +='&'
          }
          qstring +='c='+item
          index++;
        }
      }
      console.log(qstring);
      this.$axios
        .get("https://v1.hitokoto.cn" + qstring)
        .then(({ data }) => {
          this.data = data;
          this.formatLines();
          this.loading = false;
        })
        .catch(console.error);
    },
  },
  computed: {
    // display: function () {
    //   return this.$store.state.settings.showHitokoto;
    // },
    hitokotoKind:function(){
      return this.$store.state.settings.hitokotoSource;
    }
  },
  created() {

  },
  mounted() {
    this.getHitokoto();
  },
};
</script>

<style>
.hitokoto{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-sizing: border-box;
}
.hitokoto-box {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-direction: column;
  /* border: 1px solid var(--line-color); */
  border-radius: var(--item-radius);
}

.hitokoto-content {
  width: 93%;
  display: flex;
  justify-content: flex-start;
  font-size: 1.5em;
  font-weight: 900;
}
.hitokoto-from {
  margin-top: 20px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  font-size: 10px;
}
</style>