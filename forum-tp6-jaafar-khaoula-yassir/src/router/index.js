import { createRouter, createWebHistory } from 'vue-router';

import AuthView from '../views/authView.vue';
import DashboardView from '../views/MainDiscussionView.vue';
import DiscussionView from '../views/discussionView.vue';
import ProfileView from '../views/profileView.vue';
import CreateThread from '../views/createdDiscussion.vue';
import HomeView from '../views/homeView.vue';

import { isLogged, waitForAuthInit } from '@/firebase/Authentification/getUser'; 

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'AuthPage',
      component: AuthView,
      meta: { requiresAuth: false } 
    },
    {
      path: '/home',
      name: 'Home',
      component: HomeView,
      meta: { requiresAuth: false }}
       ,
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: DashboardView,
      meta: { requiresAuth: true } 
    },
    {
      path: '/discussion/:id',
      name: 'Discussion',
      component: DiscussionView,
      meta: { requiresAuth: true } // Authentication required for discussions
    },
    {
      path: '/profile/:id',
      name: 'Profile',
      component: ProfileView,
      meta: { requiresAuth: true } // Authentication required for profiles
    },
    {
      path: '/create',
      name: 'CreateThread',
      component: CreateThread,
      meta: { requiresAuth: true } // Authentication required for creating threads
    }
  ]
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  waitForAuthInit().then(() => {
    const isAuthenticated = isLogged();

    if (requiresAuth && !isAuthenticated) {
      next({ path: '/auth' });
    } else {
      next();
    }

  });
});

export default router;
