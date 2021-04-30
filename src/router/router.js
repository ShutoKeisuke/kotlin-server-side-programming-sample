import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import BookList from '../views/BookList.vue'
import BookDetail from '../views/BookDetail.vue'
import AdminBookRegister from '../views/AdminBookRegister.vue'
import AdminBookUpdate from '../views/AdminBookUpdate.vue'
import AdminBookRegisterCompleted from '../views/AdminBookRegisterCompleted.vue'
import AdminBookUpdateCompleted from '../views/AdminBookUpdateCompleted.vue'
import AdminBookDeleteCompleted from '../views/AdminBookDeleteCompleted.vue'

Vue.use(Router)

export default new Router({
    mode: "history",
    routes: [
        {
            path: '/',
            component: Home
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/book/list',
            component: BookList
        },
        {
            path: '/book/detail/:id(\\d+)',
            component: BookDetail
        },
        {
            path: '/admin/book/register',
            component: AdminBookRegister
        },
        {
            name: 'adminUpdate',
            path: '/admin/book/update/:id(\\d+)',
            component: AdminBookUpdate
        },
        {
            path: '/admin/book/register/completed',
            component: AdminBookRegisterCompleted
        },
        {
            path: '/admin/book/update/completed',
            component: AdminBookUpdateCompleted
        },
        {
            path: '/admin/book/delete/completed',
            component: AdminBookDeleteCompleted
        }
    ]
})