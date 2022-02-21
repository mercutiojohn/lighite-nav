import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        todoList: [{
                text: '示例内容',
                createdAt: '',
                checked: false
            },
            {
                text: 'hahaha',
                createdAt: '',
                checked: true
            },
            {
                text: 'todo-sample',
                createdAt: '',
                checked: false
            }
        ],
        settings: {

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
                    "title": "WolframAlpha",
                    "color": "#ffffff",
                    "icon": "airportal.svg",
                    "url": "https://www.wolframalpha.com/"
                },
                {
                    "title": "Markdown转公众号",
                    "color": "#000000",
                    "icon": "markdown.svg",
                    "url": "https://md.qikqiak.com/"
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