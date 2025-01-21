import { createRouter, createWebHistory } from 'vue-router'
import LoginForm from './components/LoginForm.vue'
import RegistrationForm from './components/RegistrationForm.vue'
import WelcomeScreen from './components/WelcomeScreen.vue'

const routes = [
  {
    path: '/',
    name: 'WelcomeScreen',
    component: WelcomeScreen,
  },
  {
    path: '/login',
    name: 'LoginForm',
    component: LoginForm,
  },
  {
    path: '/register',
    name: 'RegistrationForm',
    component: RegistrationForm,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const ifUserExists = localStorage.getItem('user_email')
  const ifTokenExists = localStorage.getItem('auth_token')

  // Redirect to Login page if user is not logged in
  if (!ifUserExists && !ifTokenExists && to.name === 'WelcomeScreen') {
    next({ name: 'LoginForm' })
  } else if (ifUserExists && ifTokenExists && to.name === 'LoginForm') {
    next({ name: 'WelcomeScreen' })
  } else if (ifUserExists && ifTokenExists && to.name === 'RegistrationForm') {
    next({ name: 'WelcomeScreen' })
  } else {
    next()
  }
})

export default router
