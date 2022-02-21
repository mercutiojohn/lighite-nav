<template>
<div class="tiny-clock">
    <div class="clock-content">
        <span class="apm" v-text="apm"></span>
        <span class="time" v-text="formatted"></span>
    </div>
</div>
</template>

<script>
export default {
name: "TinyClock",
components: {},
data() {
return {
    hour:'18',
    minute:'10',
    second:'01',
    apm:'上午',
    formatted:'18:10:01'
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
.tiny-clock{
    display: flex;
    align-items: center;
    justify-content: center;
    /* padding:20px; */
    height: 100%;
    box-sizing: border-box;
}
.clock-content{
    display: flex;
    align-items: baseline;
}
.clock-content .time{
    font-size:30px;
}
.apm{
    font-size: 14px;
}
</style>