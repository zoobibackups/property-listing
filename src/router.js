import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      name: 'Login',
      path: '/login',
      component: () => import('@/views/login/index'),
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: '/',
      component: () => import('@/views/dashboard/Index'),
      meta: {
        requiresAuth: true,
      },
      children: [
        // Dashboard
        {
          name: 'Users',
          path: '',
          component: () => import('@/views/users/Users'),

          // component: () => import('@/views/dashboard/Dashboard'),
        },
        {
          name: 'Users',
          path: '/users',
          component: () => import('@/views/users/Users'),
        },
        {
          name: 'Properties',
          path: '/properties',
          component: () => import('@/views/properties'),
        },
        {
          name: 'Property Details',
          path: '/properties/:id',
          component: () => import('@/views/properties/view_property'),
        },
      ],
    },
  ],
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!localStorage.getItem('token')) {
      next({
        path: '/login',
        query: { redirect: to.fullPath },
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})
export default router
