import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/ahcha/trade',
      name: 'trade',
      component: () => import('../views/TradeListView.vue')
   
    },
    // {
    //   path: '/ahcha/challenge',
    //   name: 'ahcha challenge',
    //   component: () => import('../views/ChallengeView.vue')
   
    // },
    {
      path: '/ahcha/mypage/:user_id',
      name: 'mypage',
      component: () => import('../components/challenge/SavingChallenge.vue')
   
    }

  ]
})

export default router
