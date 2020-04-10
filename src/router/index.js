import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login'
import Container from '../views/Container'
import Products from '../views/Products'
import Users from '../views/Users'

Vue.use(VueRouter)
const routes = [

  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/container',
    name: 'container',
    component: Container,
    children: [
      {
        path: '',
        name: 'products',
        component: Products
      },
      {
        path: 'users',
        name: 'users',
        component: Users
      }
    ]
  }

]

const router = new VueRouter({
  routes
})

export default router
