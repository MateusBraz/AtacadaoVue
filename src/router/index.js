import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Produto from '@/components/Produto'
import Categoria from '@/components/Categoria'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/categorias',
      name: 'Categorias',
      component: Categoria
    },
    {
      path: '/produtos',
      name: 'Produto',
      component: Produto
    }

  ]
})
