import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/ahcha/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/ahcha/trade',
            name: 'trade',
            component: () => import('../views/TradeListView.vue'),
        },
        {
            path: '/ahcha/challenge',
            name: 'ahcha challenge',
            component: () => import('../views/ChallengeView.vue'),
        },
        {
            path: '/ahcha/mypage',
            name: 'mypage',
            component: () => import('../views/MyPageView.vue'),
        },
        {
            path: '/ahcha/login',
            name: 'login',
            component: () => import('../views/LoginView.vue'),
        },
    ],
});
router.beforeEach((to, from) => {
    //라우터 링크를 하면 이동전에 여기를 먼저 지나간다. 살짝 미들웨어 느낌.
    console.log(`router : ${from.path} ===> ${to.path}`);
    let userid = sessionStorage.getItem('userid');

    if (to.meta.requireAuth && !userid) {
        return { path: '/ahcha/login', query: { to: to.path } };
    }
});

export default router;
