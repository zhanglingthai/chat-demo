import Vue from 'vue'
import VueRouter from 'vue-router'

import Entry from '../views/Entry.vue'
import Chat from '../views/Chat.vue'

Vue.use(VueRouter)

const routes = [
    { path: '/', redirect: 'entry' },
    {
        path: '/entry',
        name: 'Entry',
        component: Entry
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import( /* webpackChunkName: "login" */ '../views/Login.vue')
    },
    {
        path: '/reg',
        name: 'Reg',
        component: () => import( /* webpackChunkName: "reg" */ '../views/Reg.vue')
    },
    {
        path: '/main',
        component: () => import( /* webpackChunkName: "main" */ '../views/Main.vue'),
        children: [{
            path: 'chat',
            component: () => import( /* webpackChunkName: "chat" */ '../views/Chat.vue')
        }, {
            path: 'friends',
            component: () => import( /* webpackChunkName: "friends" */ '../views/Friends.vue')
        }, {
            path: 'shows',
            component: () => import( /* webpackChunkName: "shows" */ '../views/Shows.vue')
        }, {
            path: 'setting',
            component: () => import( /* webpackChunkName: "setting" */ '../views/Setting.vue')
        }, {
            path: '',
            component: () => import( /* webpackChunkName: "chat" */ '../views/Chat.vue')
        }, {
            path: '*',
            component: () => import( /* webpackChunkName: "chat" */ '../views/Chat.vue')
        }]
    },
    {
        path: '*',
        component: () => import( /* webpackChunkName: "404" */ '../views/404.vue')
    }
]

const router = new VueRouter({
    routes,
    mode: "hash"
})

export default router