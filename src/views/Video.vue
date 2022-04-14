<template>
<div class="video">
    <div class="side">
        <div class="pinned"></div>
        <div class="favors">
            <div class="favor-header">
                <span class="title">我的收藏</span>
            </div>
            <div class="favor">默认收藏夹</div>
            <div class="favor">其他收藏夹</div>
        </div>
        <div class="tags">
            <div class="tags-header">
                <span class="title">标签</span>
            </div>
            <div class="favor">默认收藏夹</div>
            <div class="favor">其他收藏夹</div>
        </div>
        <button class="import">导入B站收藏夹</button>
    </div>
    <div class="main">
        <div class="video-list">
            <div class="video">
                <span class="title"></span>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
name: "Video",
components: {},
data() {
return {
    tags:[
        "日常",
        "JavaScript",
        "CSS",
        "Vue"
    ],
    favorsFolders:[
        "默认收藏夹",
        "前端",
    ]
};
},
computed: {},
watch: {},
methods: {
    
},
created(){},
mounted(){},
beforeDestroy(){}
};
</script>

<style>
</style>