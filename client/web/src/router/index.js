import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Main from '../views/Main.vue'
import Chat from '../views/Chat.vue'

Vue.use(VueRouter)

const routes = [
    { path: '/', redirect: 'main' },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/reg',
        name: 'Reg',
        component: () => import( /* webpackChunkName: "reg" */ '../views/Reg.vue')
    },
    {
        path: '/main',
        component: Main,
        children: [{
            path: 'chat',
            component: Chat
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
            component: Chat
        }, {
            path: '*',
            component: Chat
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