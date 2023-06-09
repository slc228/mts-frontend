import { createRouter, createWebHistory } from 'vue-router'
import IndexView from '../views/Index.vue'
import PlanView from '../views/Plan.vue'
import SensitivekeywordsView from '../views/SensitiveKeywords.vue'
import ReportView from '../views/Report.vue'
import SearchView from '../views/Search.vue'
import SystemView from '../views/System.vue'
import WarningView from '../views/Warning.vue'
import DefaultView from '../views/Default.vue'
import CommentView from '../views/Comment.vue'

const routes = [
  /*{
    path: '/',
    name: 'home',
    component: HomeView
  },*/
   /* {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */   /*'../views/AboutView.vue')
 },*/
  {
    path: '/comment',
    name: 'comment',
    component: CommentView
  }, 
  {
    path: '/',
    name: 'root',
    component: DefaultView
  }, 
  {
    path: '/default',
    name: 'default',
    component: DefaultView
  }, 
  {
    path: '/index',
    name: 'index',
   component: IndexView
  },
 {
  path: '/warning',
  name: 'warning',
  component: WarningView
},  
 {
  path: '/system',
  name: 'system',
  component: SystemView
},  
  {
    path: '/search',
    name: 'search',
    component: SearchView
  },  
  {
    path: '/report',
    name: 'report',
    component: ReportView
  },  
  {
    path: '/sensitivekeywords',
    name: 'sensitivekeywords',
    component: SensitivekeywordsView
  }, 
  {
    path: '/plan',
    name: 'plan',
    component: PlanView
  },
]

const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  history: createWebHistory('/publicSentiment/'),
  routes
})


export default router
