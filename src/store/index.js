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
        getSettings: (state) => {
            if (localStorage.getItem("settings")) {
                state.todoList = JSON.parse(decodeURIComponent(localStorage.getItem('settings')));
            }
            return state.settings;
        }
    }
})