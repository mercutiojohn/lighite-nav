import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
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
        settings: {
            twelveFormat: true,
            showSeconds: false
        },
        tokens: {
            biliblli: '',
            netease: ''
        },
        navs: {
            favorites: [{
                    "title": "空投AirPortal",
                    "color": "#ffffff",
                    "icon": "airportal.svg",
                    "url": "https://airportal.cn/"
                },
                {
                    "title": "LeetCode笔记",
                    "color": "#ffffff",
                    "icon": "leetcode.svg",
                    "url": "https://leetcode-cn.com/notes/"
                },
                {
                    "title": "牛客网",
                    "color": "#ffffff",
                    "icon": "airportal.svg",
                    "url": "https://www.nowcoder.com/"
                },
                {
                    "title": "实习僧",
                    "color": "#000000",
                    "icon": "markdown.svg",
                    "url": "https://resume.shixiseng.com/my/delivered"
                },
                // {
                //     "title": "牛客春招",
                //     "color": "#000000",
                //     "icon": "markdown.svg",
                //     "url": "https://mnowpick.nowcoder.com/m/school/schedule"
                // },
                {
                    "title": "牛客春招-Web",
                    "color": "#000000",
                    "icon": "markdown.svg",
                    "url": "https://nowpick.nowcoder.com/w/school/schedule"
                }
            ]
        }
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
        setSettings(state, settings) {
            localStorage.setItem('settings', encodeURIComponent(JSON.stringify(settings)));
            state.settings = settings;
        },
        setNavs(state, settings) {
            localStorage.setItem('navs', encodeURIComponent(JSON.stringify(navs)));
            state.navs = navs;
        }
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
                state.todoList = JSON.parse(decodeURIComponent(localStorage.getItem('settings')));
            }
            return state.settings;
        }
    }
})