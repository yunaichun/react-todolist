import Vue from 'vue'
import Router from 'vue-router'
import main from '@/components/main'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: main,
      children: [
          { path: '/completed', component: main},
          { path: '/active', component: main},
      ]
    }
  ]
})
