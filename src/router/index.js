import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: '',
        component: Home
    },
    {
        path: '/music',
        name: '音乐',
        component: () =>
            import ( /* webpackChunkName: "music" */ '../views/Music.vue')
    }, {
        path: '/video',
        name: '视频',
        component: () =>
            import ( /* webpackChunkName: "video" */ '../views/Fallback.vue')
    }, {
        path: '/books',
        name: '书籍和文章',
        component: () =>
            import ( /* webpackChunkName: "books" */ '../views/Fallback.vue')
    }, {
        path: '/navigation',
        name: '导航',
        component: () =>
            import ( /* webpackChunkName: "navigation" */ '../views/Navigation.vue')
    },
    {
        path: '/tools',
        name: '百宝箱',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "tools" */ '../views/Tools.vue')
    },
    {
        path: '/tutorial',
        name: '指南',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/Tutorial.vue')
    },
    {
        path: '/settings',
        name: '设置',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/Settings.vue')
    }
]

const router = new VueRouter({
    // mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router