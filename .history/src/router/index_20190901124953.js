import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login'
import SignUp from '@/views/sign-up'
import Profile from '@/views/profile'
import Home from '@/views/home'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
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
            path: '/sign-up',
            name: 'Sign Up',
            component: SignUp
        },
        {
            path: '/profile',
            name: 'Profile',
            component: Profile
        }
    ]
})