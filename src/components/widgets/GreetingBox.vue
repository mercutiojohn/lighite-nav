<template>
<div class="greeting-box">
    <TinyCalendar />
    <OneSentence />
    <SearchBar />
    <!-- <TinyNavigation /> -->
</div>
</template>

<script>
import SearchBar from '@/components/widgets/SearchBar.vue'
import OneSentence from '@/components/widgets/OneSentence.vue'
import TinyCalendar from '@/components/widgets/TinyCalendar.vue';
import TinyNavigation from '@/components/widgets/TinyNavigation.vue';
export default {
name: "GreetingBox",
components: {
    SearchBar,
    OneSentence,
    TinyCalendar,
    TinyNavigation
},
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
.greeting-box{
    display: flex;
    flex-direction: column;
    gap:15px;
    padding: 20px;
}
</style>