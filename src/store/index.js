import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        bgPrepared: false,
        wallpaperDescHided: false,
        ifScrolled: false,
        homeScrollTop: 0,
        settings: {
            twelveFormat: true,
            showSeconds: false,
            mode: true,
            customWallpaper: false,
            useBlur: true,
            showTips: true,
            weatherCity: '北京',
        },
        chosenEngine: {
            title: "必应",
            url: "https://cn.bing.com/search",
            queryword: "q",
            placeholder: "Microsoft Bing 必应搜索",
            color: "#ffffff",
            icon: {
                data: {
                    id: 1,
                    attributes: {
                        url: "/uploads/bing_7da187597a.svg",
                    },
                },
            },
        },
        todoList: [{
                text: '在上面输入待办事项',
                createdAt: '',
                doneAt: '',
                checked: false
            },
            {
                text: '轻敲回车以添加',
                createdAt: '',
                doneAt: '',
                checked: true
            },
            {
                text: '点击对勾可以划掉此条',
                createdAt: '',
                doneAt: '',
                checked: false
            },
            {
                text: '点击垃圾桶可以删除此条',
                createdAt: '',
                doneAt: '',
                checked: false
            }
        ],
        tokens: {
            biliblli: '',
            netease: ''
        },
        navs: {
            favorites: [{
                "id": 13,
                "attributes": {
                    "title": "掘金",
                    "url": "https://juejin.cn/",
                    "desc": null,
                    "createdAt": "2022-02-25T15:19:02.027Z",
                    "updatedAt": "2022-02-25T15:23:28.855Z",
                    "publishedAt": "2022-02-25T15:19:24.898Z",
                    "color": "#006cff",
                    "subsites": { "data": [{ "id": 3, "attributes": { "title": "小册", "url": "https://juejin.cn/my-course", "createdAt": "2022-02-25T15:17:15.095Z", "updatedAt": "2022-02-25T15:17:16.291Z", "publishedAt": "2022-02-25T15:17:16.289Z" } }] },
                    "icon": { "data": { "id": 66, "attributes": { "name": "juejin.svg", "alternativeText": "juejin.svg", "caption": "juejin.svg", "width": null, "height": null, "formats": null, "hash": "juejin_a04d807744", "ext": ".svg", "mime": "image/svg+xml", "size": 0.83, "url": "/uploads/juejin_a04d807744.svg", "previewUrl": null, "provider": null, "provider_metadata": null, "createdAt": "2022-02-25T15:18:57.076Z", "updatedAt": "2022-02-25T15:18:57.076Z" } } }
                }
            }, {
                "id": 43,
                "attributes": {
                    "title": "百度网盘",
                    "url": "https://pan.baidu.com/disk/main#/index",
                    "desc": null,
                    "createdAt": "2022-02-25T16:13:28.102Z",
                    "updatedAt": "2022-02-25T16:13:29.247Z",
                    "publishedAt": "2022-02-25T16:13:29.245Z",
                    "color": "#ffffff",
                    "subsites": { "data": [] },
                    "icon": { "data": { "id": 10, "attributes": { "name": "baidunetdisk.svg", "alternativeText": "baidunetdisk.svg", "caption": "baidunetdisk.svg", "width": null, "height": null, "formats": null, "hash": "baidunetdisk_38102e848f", "ext": ".svg", "mime": "image/svg+xml", "size": 1.55, "url": "/uploads/baidunetdisk_38102e848f.svg", "previewUrl": null, "provider": null, "provider_metadata": null, "createdAt": "2022-02-25T14:36:29.086Z", "updatedAt": "2022-02-25T14:36:29.086Z" } } }
                }
            }, {
                "id": 17,
                "attributes": {
                    "title": "微信",
                    "url": "https://wx.qq.com/",
                    "desc": null,
                    "createdAt": "2022-02-25T15:35:05.303Z",
                    "updatedAt": "2022-02-25T15:35:06.352Z",
                    "publishedAt": "2022-02-25T15:35:06.347Z",
                    "color": "#28c445",
                    "subsites": { "data": [] },
                    "icon": { "data": { "id": 70, "attributes": { "name": "微信.svg", "alternativeText": "微信.svg", "caption": "微信.svg", "width": null, "height": null, "formats": null, "hash": "_828734da8b", "ext": ".svg", "mime": "image/svg+xml", "size": 0.84, "url": "/uploads/_828734da8b.svg", "previewUrl": null, "provider": null, "provider_metadata": null, "createdAt": "2022-02-25T15:34:46.775Z", "updatedAt": "2022-02-25T15:34:46.775Z" } } }
                }
            }, {
                "id": 44,
                "attributes": {
                    "title": "哔哩哔哩",
                    "url": "https://www.bilibili.com/",
                    "desc": null,
                    "createdAt": "2022-02-25T16:14:24.091Z",
                    "updatedAt": "2022-02-25T16:14:25.366Z",
                    "publishedAt": "2022-02-25T16:14:25.362Z",
                    "color": "#00a1d6",
                    "subsites": { "data": [] },
                    "icon": { "data": { "id": 7, "attributes": { "name": "bilibili.svg", "alternativeText": "bilibili.svg", "caption": "bilibili.svg", "width": null, "height": null, "formats": null, "hash": "bilibili_14b7645a15", "ext": ".svg", "mime": "image/svg+xml", "size": 4.65, "url": "/uploads/bilibili_14b7645a15.svg", "previewUrl": null, "provider": null, "provider_metadata": null, "createdAt": "2022-02-25T14:36:28.914Z", "updatedAt": "2022-02-25T14:36:28.914Z" } } }
                }
            }, {
                "id": 14,
                "attributes": {
                    "title": "网易云音乐",
                    "url": "https://music.163.com",
                    "desc": null,
                    "createdAt": "2022-02-25T15:21:34.923Z",
                    "updatedAt": "2022-02-25T15:21:36.407Z",
                    "publishedAt": "2022-02-25T15:21:36.405Z",
                    "color": "#dd001b",
                    "subsites": { "data": [] },
                    "icon": {
                        "data": {
                            "id": 67,
                            "attributes": { "name": "网易云音乐.svg", "alternativeText": "网易云音乐.svg", "caption": "网易云音乐.svg", "width": null, "height": null, "formats": null, "hash": "_9e771556cf", "ext": ".svg", "mime": "image/svg+xml", "size": 2.57, "url": "/uploads/_9e771556cf.svg", "previewUrl": null, "provider": null, "provider_metadata": null, "createdAt": "2022-02-25T15:20:56.091Z", "updatedAt": "2022-02-25T15:20:56.091Z" }
                        }
                    }
                }
            }, {
                "id": 61,
                "attributes": {
                    "title": "实习僧",
                    "url": "https://www.shixiseng.com/",
                    "desc": null,
                    "createdAt": "2022-02-26T02:37:32.164Z",
                    "updatedAt": "2022-02-26T03:33:11.963Z",
                    "publishedAt": "2022-02-26T02:37:33.725Z",
                    "color": "#ffffff",
                    "subsites": { "data": [{ "id": 12, "attributes": { "title": "我的投递", "url": "https://resume.shixiseng.com/my/delivered", "createdAt": "2022-02-26T02:37:07.113Z", "updatedAt": "2022-02-26T03:08:04.661Z", "publishedAt": "2022-02-26T02:37:08.304Z" } }] },
                    "icon": { "data": { "id": 82, "attributes": { "name": "logo-shixiseng.ea8da47.png", "alternativeText": "logo-shixiseng.ea8da47.png", "caption": "logo-shixiseng.ea8da47.png", "width": 100, "height": 32, "formats": null, "hash": "logo_shixiseng_ea8da47_31249262c1", "ext": ".png", "mime": "image/png", "size": 1.18, "url": "/uploads/logo_shixiseng_ea8da47_31249262c1.png", "previewUrl": null, "provider": "local", "provider_metadata": null, "createdAt": "2022-02-26T03:33:06.168Z", "updatedAt": "2022-02-26T03:33:06.168Z" } } }
                }
            }, {
                "id": 60,
                "attributes": {
                    "title": "牛客网",
                    "url": "https://www.nowcoder.com",
                    "desc": null,
                    "createdAt": "2022-02-26T02:34:52.328Z",
                    "updatedAt": "2022-02-26T03:33:44.425Z",
                    "publishedAt": "2022-02-26T02:34:53.538Z",
                    "color": "#ffffff",
                    "subsites": { "data": [{ "id": 10, "attributes": { "title": "春招", "url": "https://nowpick.nowcoder.com/w/school/schedule", "createdAt": "2022-02-26T02:36:25.082Z", "updatedAt": "2022-02-26T02:36:26.437Z", "publishedAt": "2022-02-26T02:36:26.435Z" } }, { "id": 11, "attributes": { "title": "面试真题", "url": "https://www.nowcoder.com/interview/ai/index", "createdAt": "2022-02-26T02:36:49.779Z", "updatedAt": "2022-02-26T03:07:33.970Z", "publishedAt": "2022-02-26T02:36:51.012Z" } }] },
                    "icon": { "data": { "id": 83, "attributes": { "name": "1636944252254TIDXY.png", "alternativeText": "1636944252254TIDXY.png", "caption": "1636944252254TIDXY.png", "width": 208, "height": 48, "formats": null, "hash": "1636944252254_TIDXY_6ddb55e40c", "ext": ".png", "mime": "image/png", "size": 1.61, "url": "/uploads/1636944252254_TIDXY_6ddb55e40c.png", "previewUrl": null, "provider": "local", "provider_metadata": null, "createdAt": "2022-02-26T03:33:24.413Z", "updatedAt": "2022-02-26T03:33:24.413Z" } } }
                }
            }, { "id": 55, "attributes": { "title": "LeetCode", "url": "https://leetcode-cn.com/", "desc": null, "createdAt": "2022-02-25T16:28:17.492Z", "updatedAt": "2022-02-25T16:28:18.882Z", "publishedAt": "2022-02-25T16:28:18.880Z", "color": "#ffffff", "subsites": { "data": [{ "id": 1, "attributes": { "title": "笔记", "url": "https://leetcode-cn.com/notes/", "createdAt": "2022-02-25T15:01:19.975Z", "updatedAt": "2022-02-25T15:57:29.410Z", "publishedAt": "2022-02-25T15:01:21.260Z" } }, { "id": 7, "attributes": { "title": "学习计划", "url": "https://leetcode-cn.com/study-plan/", "createdAt": "2022-02-25T16:28:48.423Z", "updatedAt": "2022-02-25T16:28:50.047Z", "publishedAt": "2022-02-25T16:28:50.030Z" } }, { "id": 8, "attributes": { "title": "书架", "url": "https://leetcode-cn.com/leetbook/library/", "createdAt": "2022-02-25T16:29:11.762Z", "updatedAt": "2022-02-25T16:29:13.350Z", "publishedAt": "2022-02-25T16:29:13.349Z" } }, { "id": 9, "attributes": { "title": "题库", "url": "https://leetcode-cn.com/problemset/", "createdAt": "2022-02-25T16:29:34.835Z", "updatedAt": "2022-02-25T16:29:36.521Z", "publishedAt": "2022-02-25T16:29:36.508Z" } }] }, "icon": { "data": { "id": 78, "attributes": { "name": "leetcode.svg", "alternativeText": "leetcode.svg", "caption": "leetcode.svg", "width": null, "height": null, "formats": null, "hash": "leetcode_9853cf3bb4", "ext": ".svg", "mime": "image/svg+xml", "size": 2.25, "url": "/uploads/leetcode_9853cf3bb4.svg", "previewUrl": null, "provider": null, "provider_metadata": null, "createdAt": "2022-02-25T16:27:58.611Z", "updatedAt": "2022-02-25T16:27:58.611Z" } } } } }, {
                "id": 2,
                "attributes": {
                    "title": "语雀",
                    "url": "https://www.yuque.com/dashboard",
                    "desc": null,
                    "createdAt": "2022-02-25T14:52:25.991Z",
                    "updatedAt": "2022-02-25T14:54:00.504Z",
                    "publishedAt": "2022-02-25T14:52:30.814Z",
                    "color": "#ffffff",
                    "subsites": { "data": [] },
                    "icon": {
                        "data": {
                            "id": 59,
                            "attributes": {
                                "name": "yuque.svg",
                                "alternativeText": "yuque.svg",
                                "caption": "yuque.svg",
                                "width": null,
                                "height": null,
                                "formats": null,
                                "hash": "yuque_6c80ee5bb6",
                                "ext": ".svg",
                                "mime": "image/svg+xml",
                                "size": 1.86,
                                "url": "/uploads/yuque_6c80ee5bb6.svg",
                                "previewUrl": null,
                                "provider": null,
                                "provider_metadata": null,
                                "createdAt": "2022-02-25T14:36:31.246Z",
                                "updatedAt": "2022-02-25T14:36:31.246Z"
                            }
                        }
                    }
                }
            }],
            others: []
        },
        wallpaperData: {

        },
        mainPageData: [{
            component: "TinyBiliRank",
            title: "热门视频",
            card: "new-1",
            hide: false,
        }, {
            component: "WeiboHot",
            title: "微博热搜",
            card: "new-1",
            hide: false,

        }, {
            component: "TinyMusicChart",
            title: "音乐排行",
            card: "new-1",
            hide: false,

        }, {
            component: "TinyAnimeChart",
            title: "番剧排行",
            card: "new-1",
            hide: false,
        }]
    },
    mutations: {
        update(state, [key, value]) {
            state[key] = value;
            // console.log(key)
        },
        setTodoList(state, todoList) {
            localStorage.setItem('todoList', encodeURIComponent(JSON.stringify(todoList)));
            state.todoList = todoList;
        },
        setEngine(state, chosenEngine) {
            localStorage.setItem('chosenEngine', encodeURIComponent(JSON.stringify(chosenEngine)));
            state.chosenEngine = chosenEngine;
        },
        setSettings(state, settings) {
            localStorage.setItem('settings', encodeURIComponent(JSON.stringify(settings)));
            state.settings = settings;
        },
        setNavs(state, navs) {
            localStorage.setItem('navs', encodeURIComponent(JSON.stringify(navs)));
            state.navs = navs;
        },
        setBgPrepared(state, bgPrepared) {
            state.bgPrepared = bgPrepared;
        },
        setWallpaperData(state, data) {
            state.wallpaperData = data;
        },
        setShowTips(state, showTips) {
            state.settings.showTips = showTips;
            localStorage.setItem('settings', encodeURIComponent(JSON.stringify(state.settings)));
        },
        setWallpaperDescHided(state, wallpaperDescHided) {
            localStorage.setItem('wallpaperDescHided', encodeURIComponent(JSON.stringify(wallpaperDescHided)));
            state.wallpaperDescHided = wallpaperDescHided;
        },
        setIfScrolled(state, ifScrolled) {
            state.ifScrolled = ifScrolled;
        },
        setHomeScrollTop(state, homeScrollTop) {
            state.homeScrollTop = homeScrollTop;
        },
        setMainPageData(state, mainPageData) {
            localStorage.setItem('mainPageData', encodeURIComponent(JSON.stringify(mainPageData)));
            state.mainPageData = mainPageData;
        },
    },
    actions: {},
    modules: {},
    getters: {
        getTodoList: (state) => {
            if (localStorage.getItem("todoList")) {
                state.todoList = JSON.parse(decodeURIComponent(localStorage.getItem('todoList')));
            }
            return state.todoList;
        },
        getNavs: (state) => {
            if (localStorage.getItem("navs")) {
                state.navs = JSON.parse(decodeURIComponent(localStorage.getItem('navs')));
            }
            return state.navs;
        },
        getSettings: (state) => {
            if (localStorage.getItem("settings")) {
                state.settings = JSON.parse(decodeURIComponent(localStorage.getItem('settings')));
            }
            return state.settings;
        },
        getMode: (state) => {
            return state.settings.mode;
        },
        getBgPrepared: (state) => {
            return state.bgPrepared;
        },
        getWallpaperData: (state) => {
            return state.wallpaperData;
        },
        getWallpaperDescHided: (state) => {
            if (localStorage.getItem("wallpaperDescHided")) {
                state.wallpaperDescHided = JSON.parse(decodeURIComponent(localStorage.getItem('wallpaperDescHided')));
            }
            return state.wallpaperDescHided;
        },
        getEngine: (state) => {
            if (localStorage.getItem("chosenEngine")) {
                state.chosenEngine = JSON.parse(decodeURIComponent(localStorage.getItem('chosenEngine')));
            }
            return state.chosenEngine;
        },
        getIfScrolled: (state) => {
            return state.ifScrolled;
        },
        getHomeScrollTop: (state) => {
            return state.homeScrollTop;
        },
        getMainPageData: (state) => {
            if (localStorage.getItem("mainPageData")) {
                state.mainPageData = JSON.parse(decodeURIComponent(localStorage.getItem('mainPageData')));
            }
            return state.mainPageData;
        }
    }
})