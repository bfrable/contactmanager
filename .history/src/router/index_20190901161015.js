import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login'
import SignUp from '@/views/sign-up'
import Home from '@/views/home'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '*',
            redirect: '/login'
        }
        {
            path: '/home',
            name: 'Home',
            component: Home,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/',
            name: 'Sign Up',
            component: SignUp
        },
    ]
})