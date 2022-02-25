<template>
<div class="search-bar">
    <input type="text" class="search-input" placeholder="搜索"/>
</div>
</template>

<script>
export default {
name: "SearchBar",
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

<style scoped>
.search-input{
    border-width: 3px;
    border-radius: var(--card-radius);
    padding: 15px;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: var(--title-color);
    font-size: 18px;
    transition: border-color .2s ease;
}
.search-input:hover{
    border-color:var(--accent-color);
}
.search-input:focus{
    border-color:var(--accent-color);
}
</style>