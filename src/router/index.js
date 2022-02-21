import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/music',
        name: 'Music',
        component: () =>
            import ( /* webpackChunkName: "music" */ '../views/Music.vue')
    }, {
        path: '/video',
        name: 'Video',
        component: () =>
            import ( /* webpackChunkName: "video" */ '../views/Video.vue')
    }, {
        path: '/books',
        name: 'Books',
        component: () =>
            import ( /* webpackChunkName: "books" */ '../views/Books.vue')
    }, {
        path: '/navigation',
        name: 'Navigation',
        component: () =>
            import ( /* webpackChunkName: "navigation" */ '../views/Navigation.vue')
    },
    {
        path: '/tools',
        name: 'Tools',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "tools" */ '../views/Tools.vue')
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/settings',
        name: 'Settings',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/Settings.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router