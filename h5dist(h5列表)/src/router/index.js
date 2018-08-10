import Vue from 'vue'
import Router from 'vue-router'

const List = (resolve) => {
  import('components/list/list').then((module) => {
    resolve(module)
  })
}

const Detail = (resolve) => {
  import('components/list/detail').then((module) => {
    resolve(module)
  })
}


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: 'listview',
      component: List
    },
    {
      path: '/listview',
      name: 'listview',
      component: List,
      children: [
        {
          path: ':id',
          component: Detail
        }
      ]
    }
  ]
})
