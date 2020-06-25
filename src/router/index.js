import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children:[
      {
        path:'/Home/combined',
        name:'combined',
        component:() => import('../views/children/combined.vue'),
      },
      {
        path:'/Home/author',
        name:'author',
        component:() => import('../views/children/author.vue')
      },
      {
        path:'/Home/publiaction',
        name:'publiaction',
        component:() => import('../views/children/publiaction.vue')
      },
      {
        path:'/Home/searchAut',
        name:'searchAut',
        component:() => import('../views/children/searchAut.vue')
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
