<template>
<div class="header">
    <div class="title-box">
    <span class="title" v-text="title"></span>
    </div>
    <TinyClock />
</div>
</template>

<script>
import TinyClock from '@/components/widgets/TinyClock.vue'
export default {
name: "Header",
components: {
    TinyClock
},
data() {
return {
    title:'Lightie'
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

<style scoped>
.header{
    height:80px;
    width:100vw;
    background: var(--bg-color);
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top:0;
}
.title-box{
    height: 100%;
    width: 150px;
    /* background: rgb(128, 128, 128); */
    display: flex;
    align-items: center;
    justify-content: center;
}
.title{
    font-size: 30px;
    font-weight: 900;
}
</style>