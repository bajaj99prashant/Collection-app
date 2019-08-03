import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import AddSmoothies from '@/components/AddSmoothies'
import EditSmoothie from '@/components/EditSmoothie'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/add-smoothie',
      name: 'AddSmoothies',
      component: AddSmoothies
    },
    {
      path: '/edit-smoothie/:smoothie_slug',
      name: 'EditSmoothie',
      component: EditSmoothie
    }
  ]
})
