<template>
<div class="tiny-nav">
    <div class="nav-item" v-for="(item,index) in 5" :key="index">
        <img src="" alt="" srcset=""/>
        <span>名称</span>
    </div>
</div>
</template>

<script>
export default {
name: "",
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

<style>
.tiny-nav{
    height: 100%;
    display: grid;
    gap:10px;
    grid-template-columns: repeat(4,1fr);
    grid-auto-rows: minmax(33.33%,80px);
}
.nav-item{
    display: flex;
    flex-direction: column;
    border-radius: var(--card-radius);
    background: var(--bg-color);
    align-items: center;
    justify-content: space-evenly;
}
</style>