import { createRouter, createWebHistory } from 'vue-router'
import store from '../store';

import Home from '../views/Home/index.vue'
import Dashboard from '../views/Dashboard/index.vue'
import Login from '../views/Auth/Login.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
        meta: { layout: 'default' }
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard,
        meta: { auth: true, layout: 'dashboard' }
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: { guest: true, layout: 'auth' }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach(async (to, from, next) => {
    const validate = () => {
        if(to.meta.auth && !store.state.user) {
            next({ name: 'login', query: { redirect: to.name }})
        } else if (to.meta.guest && store.state.user) {
            next({ name: 'home'});
        }
        else next()
    }

    if(!store.state.initialLoad) {
        return await new Promise((resolve, reject) => {
            store.watch((state) => state.initialLoad, () => {
                resolve(validate());
            })
        })
    } else {
        validate();
    }
})

export default router;