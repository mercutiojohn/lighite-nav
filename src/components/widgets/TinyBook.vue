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
        <a :href="item.link" v-for="(item,index) in books" :key="index" class="book-item ef-pudding tiny-cube-item">
            <div class="cover-mask"></div>
            <div class="cover-box"><img class="cover" :src="item.cover" v-if="!item.noCover" alt="" srcset=""></div>
            <span class="title fix-text-overflow" v-text="item.name"></span>
        </a>
    </ul>
    <div class="sub-header">
        <span class="title">收藏文章</span>
    </div>
    <ul class="articles tiny-list card-list-height fix-scrollbar">
        <a :href="item.link" v-for="(item,index) in articles" :key="index" class="article-item ef-fadein tiny-list-item">
                <div class="cover-mask"></div>
                <div class="cover-box"><img class="cover" :src="item.cover" alt="" srcset="" v-if="!item.noCover"></div>
                <div class="info">
                    <span class="title" v-text="item.name"></span>
                    <span class="site-name" v-text="item.siteName"></span>
                </div>
        </a>
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
            name:"JavaScript高级程序设计",
            cover:"https://wfqqreader-1252317822.image.myqcloud.com/cover/683/34336683/t6_34336683.jpg",
            link:"https://weread.qq.com/web/reader/751326d0720befab7514782"
        },
        {
            name:"CSS世界",
            cover:"https://res.weread.qq.com/wrepub/CB_0S8DRIDOF6pZ6Uv6UI_parsecover",
            link:"https://weread.qq.com/web/reader/cc1420f2a43425f38416f38457738436b415346365764365535d57"
        },
        {
            name:"CSS新世界",
            cover:"https://wfqqreader-1252317822.image.myqcloud.com/cover/13/40870013/t6_40870013.jpg",
            link:"https://weread.qq.com/web/reader/13c32c9072https://weread.qq.com/web/reader/d1b32290718ff65fd1befcc6fa07d13c0072"
        },{
            name:"深入浅出Node.js",
            cover:"https://wfqqreader-1252317822.image.myqcloud.com/cover/935/26211935/t6_26211935.jpg",
            link:"https://weread.qq.com/web/reader/d1b32290718ff65fd1befcc"
        },

    ],
    articles:[
        {
            name:"剑指Offer",
            cover:"https://uploadfiles.nowcoder.com/files/20220114/805539847_1642128449973/offerbanner200_268.png",
            link:"https://www.nowcoder.com/exam/oj/ta?tpId=13",
            siteName:"牛客网"
        },{
            name:"前端面试宝典",
            cover:"https://uploadfiles.nowcoder.com/images/20210311/510094950_1615444559106/CC9B1D335442AF03F0CFA6F5125AC89E",
            link:"https://www.nowcoder.com/tutorial/10072/index",
            siteName:"牛客网"
        },{
            name:"面试高频算法",
            link:"https://www.nowcoder.com/exam/oj?tab=%E7%AE%97%E6%B3%95%E7%AF%87&topicId=117",
            noCover:true,
            siteName:"牛客网"
        },{
            name:"前端面试手撕题",
            link:"https://www.nowcoder.com/exam/oj?tab=%E5%89%8D%E7%AB%AF%E7%AF%87&topicId=274&page=1",
            noCover:true,
            siteName:"牛客网"
        },{
            name:"前端春招手册",
            cover:"https://uploadfiles.nowcoder.com/images/20220214/4107856_1644821201514/35A5BCDC441F366D7252FCAA9E8CFB5C",
            link:"https://www.nowcoder.com/discuss/837249",
            siteName:"牛客网"
        },{
            name:"初级算法",
            cover:"https://assets.leetcode-cn.com/aliyun-lc-upload/leetbook/cover/200731021736/Questions-Easy.jpeg?x-oss-process=image%2Fformat%2Cwebp",
            link:"https://leetcode-cn.com/leetbook/detail/top-interview-questions-easy/",
            siteName:"LeetCode"
        },{
            name:"前端面试之道",
            cover:"https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/12/25/167e14942f2dcf44~tplv-t2oaga2asx-image.image",
            link:"https://juejin.cn/book/6844733763675488269",
            siteName:"稀土掘金"
        },{
            name:"面试算法汇总",
            cover:"https://assets.leetcode-cn.com/aliyun-lc-upload/leetbook/cover/200731021727/Top_Interview_Questions.jpeg?x-oss-process=image%2Fformat%2Cwebp",
            link:"https://leetcode-cn.com/leetbook/detail/top-interview-questions/",
            siteName:"LeetCode"

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
.book-item,
.article-item{
    color:var(--title-color)
}
.book-item .title{
    font-size: .8em;
}
.article-item .site-name{
    font-size: .8em;
    color: var(--subtitle-color);
}
.cover{
    height: 100%;
    width: 100%;
    object-fit: cover;
    /* mask-image: linear-gradient(90deg,hsla(0,0%,63.1%,.25),rgba(21,21,20,.1) 1%,hsla(0,0%,100%,.15) .4%,hsla(0,0%,58%,.1) .8%,hsla(0,0%,89%,0) 5.7%,rgba(223,218,218,.03) 9.1%,rgba(223,218,218,.05) 9.8%,hsla(0,0%,100%,.1) 1%,rgba(179, 128, 128, 0) 100%); */
}
.cover-box{
    border-radius: 4px;
    overflow: hidden;
    background: var(--sub-card-color);
}
.article-item .cover-box{
    height:80px;
    width: 56px;
}
.book-item .cover-box{
    height:123.3px;
    width: 90px;
}
.article-item .info{
    display: flex;
    flex-direction: column;
}
</style>