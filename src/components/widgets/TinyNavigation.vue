<template>
<div class="tiny-nav">
    <div class="nav-item ef-float" v-for="(item,index) in 5" :key="index">
        <img :src="require('@/assets/images/webpage.svg')" alt="" srcset=""/>
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
    grid-auto-rows: minmax(33.33%,90px);
}
.nav-item{
    display: flex;
    flex-direction: column;
    border-radius: var(--card-radius);
    background: var(--bg-color);
    align-items: center;
    justify-content: space-evenly;
    transition: all 0.2s ease;
    cursor:pointer;
    border-width: 2px;
    border-style: solid;
    border-color: transparent;
    gap:5px;
}
.nav-item:active {
  border-color: var(--accent-color);
}
.nav-item img{
    height: 50%;
}
</style>