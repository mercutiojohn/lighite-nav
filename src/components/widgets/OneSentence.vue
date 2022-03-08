<template>
<div class="one-sentence">
    <!-- {{currTip}} -->
    <div :class="{'tip-box':true,'tip-box-blurred':bgPrepared && settings.useBlur}" v-if="settings.showTips">
        <div class="left">
            <transition name="fade"><span :class="{'tip':true}" v-if="transShowTip">{{tips[currTip]}}</span></transition>
        </div>
        <button class="icon-button" @click="closeTips()"><span class="iconfont icon-cross"></span></button>
    </div>
</div>
</template>

<script>
export default {
name: "OneSentence",
components: {},
data() {
return {
    transShowTip:false,
    tips:[
        "快捷键 Ctrl+D 可以将本站保存到收藏夹哦",
        "点击左下角设置可以开启模糊效果, 效果更赞哦",
        "如果不需要壁纸, 点击左下角设置可以关闭哦",
        "点击搜索引擎左边图标可以切换搜索引擎哦",
        "若想自定义导航可以点击下方的更多 - 右上角编辑, 点击加号添加哦",
    ],
    currTip:0
};
},
computed: {
    settings:function(){
        return this.$store.getters.getSettings
    },
    bgPrepared:function(){
        return this.$store.getters.getBgPrepared
    },
},
watch: {},
methods: {
    changeTip(){
        this.transShowTip = false;
        this.currTip++
        this.currTip = this.currTip % this.tips.length
        setTimeout(()=>{
            this.transShowTip = true;
        },1)
    },
    closeTips(){
        this.$store.commit("setShowTips",false);
    }
},
created(){},
mounted(){
    this.transShowTip = true;
    setInterval(()=>{
        this.changeTip()
    },10000)
},
beforeDestroy(){}
};
</script>

<style scoped>
.tip-box{
    display: flex;
    justify-content: space-between;
    background: var(--sub-card-color);
    align-items: center;
    padding: 5px 10px;
    border-radius: var(--item-radius);
}
.tip-box-blurred{
    background: var(--blurred-sub-card-color);
}
</style>