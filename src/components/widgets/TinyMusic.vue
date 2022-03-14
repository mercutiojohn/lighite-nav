<template>
<div class="tiny-music">
    <div class="header">
        <span class="title">我的音乐</span>
        <router-link to="/music">
        <button class="icon-button">
            <span class="label">更多</span>
            <span class="iconfont icon-chevron-right"></span>
        </button>
        </router-link>
    </div>
    <div class="placeholder">
        <span class="line">永远相信</span>
        <span class="line">美好的事情</span>
        <span class="line">即将发生</span>
    </div>
</div>
</template>

<script>
export default {
name: "TinyMusic",
components: {},
data() {
return {

};
},
computed: {},
watch: {},
methods: {},
created(){},
mounted(){},
beforeDestroy(){}
};
</script>

<style lang="css" src="../../styles/card.css" scoped>
</style>
<style lang="css">
    .placeholder{
        display: flex;
        flex-direction: column;
        font-size: 1.3em;
        opacity: .2;
        font-weight: bold;
        padding: 20px;
    }
</style>