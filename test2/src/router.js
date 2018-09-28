import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/CalculerX.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path:'/meview',
      name: 'me',
      component: () => import('./views/Me.vue')
    },
    {
      path:'/options',
      name: 'options',
      component: () => import('./views/Options.vue')
    }
  ]
})
