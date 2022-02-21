<template>
<div class="tiny-book">
    <div class="header">
        <span class="title">我的书架</span>
        <router-link to="/books">
        <button class="icon-button">
            <span class="label">更多</span>
            <span class="iconfont icon-chevron-right"></span>
        </button>
        </router-link>
    </div>
    <ul class="book-shelf tiny-cube">
        <li class="book-item ef-pudding tiny-cube-item" v-for="(item,index) in books" :key="index">
            <div class="cover-mask"></div>
            <img class="cover" :src="getBookCover(item.cover)" alt="" srcset="">
            <span class="title" v-text="item.name"></span>
        </li>
    </ul>
    <div class="sub-header">
        <span class="title">收藏文章</span>
    </div>
    <ul class="articles tiny-list">
        <li class="article-item ef-fadein tiny-list-item" v-for="(item,index) in articles" :key="index">
            <div class="cover-mask"></div>
            <img class="cover" :src="getBookCover(item.cover)" alt="" srcset="">
            <span class="title" v-text="item.name"></span>
        </li>
    </ul>
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
        }
    ],
    articles:[
        {
            name:"CSS世界",
            cover:"parsecover.jpg",
            meta:""
        },{
            name:"CSS世界",
            cover:"parsecover.jpg",
            meta:""
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
}
.book-shelf .book-item{

}
.cover{
    height: 80px;
    /* mask-image: linear-gradient(90deg,hsla(0,0%,63.1%,.25),rgba(21,21,20,.1) 1%,hsla(0,0%,100%,.15) .4%,hsla(0,0%,58%,.1) .8%,hsla(0,0%,89%,0) 5.7%,rgba(223,218,218,.03) 9.1%,rgba(223,218,218,.05) 9.8%,hsla(0,0%,100%,.1) 1%,rgba(179, 128, 128, 0) 100%); */
}
</style>