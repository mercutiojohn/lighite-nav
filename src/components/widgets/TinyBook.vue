<template>
<div class="tiny-book">
    <div class="header">
        <span class="title">我的书架</span>
    </div>
    <ul class="book-shelf">
        <li class="book-item" v-for="(item,index) in books" :key="index">
            <div class="cover-mask"></div>
            <img class="cover" :src="getBookCover(item.cover)" alt="" srcset="">
            <span class="title" v-text="item.name"></span>
        </li>
    </ul>
    <div class="articles">

    </div>
</div>
</template>

<script>
export default {
name: "TinyBook",
components: {},
data() {
return {
    books:[
        {
            name:"CSS世界",
            cover:"parsecover.jpg"
        },{
            name:"CSS世界",
            cover:"parsecover.jpg"
        },{
            name:"CSS世界",
            cover:"parsecover.jpg"
        },{
            name:"CSS世界",
            cover:"parsecover.jpg"
        },{
            name:"CSS世界",
            cover:"parsecover.jpg"
        },{
            name:"CSS世界",
            cover:"parsecover.jpg"
        },{
            name:"CSS世界",
            cover:"parsecover.jpg"
        },{
            name:"CSS世界",
            cover:"parsecover.jpg"
        },{
            name:"CSS世界",
            cover:"parsecover.jpg"
        },{
            name:"CSS世界",
            cover:"parsecover.jpg"
        },{
            name:"CSS世界",
            cover:"parsecover.jpg"
        },{
            name:"CSS世界",
            cover:"parsecover.jpg"
        },{
            name:"CSS世界",
            cover:"parsecover.jpg"
        },{
            name:"CSS世界",
            cover:"parsecover.jpg"
        },{
            name:"CSS世界",
            cover:"parsecover.jpg"
        },{
            name:"CSS世界",
            cover:"parsecover.jpg"
        },{
            name:"CSS世界",
            cover:"parsecover.jpg"
        },{
            name:"CSS世界",
            cover:"parsecover.jpg"
        },{
            name:"CSS世界",
            cover:"parsecover.jpg"
        },{
            name:"CSS世界",
            cover:"parsecover.jpg"
        },{
            name:"CSS世界",
            cover:"parsecover.jpg"
        },{
            name:"CSS世界",
            cover:"parsecover.jpg"
        },{
            name:"CSS世界",
            cover:"parsecover.jpg"
        }
    ]
};
},
computed: {},
watch: {},
methods: {
    getBookCover(src){
        return require("@/assets/images/books/"+src)
    }
},
created(){},
mounted(){},
beforeDestroy(){}
};
</script>
<style lang="css" src="../../styles/card.css" scoped>
</style>
<style scoped>
.book-shelf{
    display: grid;
    grid-template-columns: repeat(auto-fill,100px);
    grid-auto-rows: 120px;
    gap: 10px;
}
.book-shelf .book-item{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px;
    border-radius: var(--card-radius);
    /* background: #000; */
    gap:5px;
}
.book-item:hover{
    background: var(--bg-color);
}
.book-item:active{
    background: var(--accent-color);
}
.book-item .cover{
    height: 80%;
    /* mask-image: linear-gradient(90deg,hsla(0,0%,63.1%,.25),rgba(21,21,20,.1) 1%,hsla(0,0%,100%,.15) .4%,hsla(0,0%,58%,.1) .8%,hsla(0,0%,89%,0) 5.7%,rgba(223,218,218,.03) 9.1%,rgba(223,218,218,.05) 9.8%,hsla(0,0%,100%,.1) 1%,rgba(179, 128, 128, 0) 100%); */
}
</style>