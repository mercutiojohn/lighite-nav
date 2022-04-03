<template>
<div class="timeline">
    {{timeline}}
</div>
</template>

<script>
export default {
name: "AnimeTimeline",
components: {},
data() {
return {
    timeline:''
};
},
computed: {},
watch: {},
methods: {
    getTimeline(){
        let res = ''
        this.$axios.get("https://api.mercutio.club" + "/bilibili/anime/timeline-legacy")
        .then((resp)=>{
            res = resp.data;
        })
        return res;
    }
},
created(){},
mounted(){
    this.timeline = this.getTimeline();
},
beforeDestroy(){}
};
</script>

<style>
</style>