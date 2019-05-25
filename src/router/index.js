/*
路由器对象模块
*/
// 一级路由
import Vue from 'vue'
import VueRouter from 'vue-router'

// import MSite from '../pages/MSite/MSite.vue'
// import Order from '../pages/Order/Order.vue'
// import Profile from '../pages/Profile/Profile.vue'
// import Search from '../pages/Search/Search.vue'

import Login from '../pages/Login/Login.vue'
import Register from '../pages/Register/Register.vue'
import Shop from '../pages/Shop/Shop.vue'
import ShopGoods from '../pages/Shop/ShopGoods/ShopGoods.vue'
import ShopInfo from '../pages/Shop/ShopInfo/ShopInfo.vue'
import ShopRatings from '../pages/Shop/ShopRatings/ShopRatings.vue'

// 路由组件写成函数，在打开对应组件才加载对应路由，实现路由组件的懒加载
const MSite = () => import('../pages/MSite/MSite.vue')
const Order = () => import('../pages/Order/Order.vue')
const Profile = () => import('../pages/Profile/Profile.vue')
const Search = () => import('../pages/Search/Search.vue')

// 声明使用插件
Vue.use(VueRouter)

export default new VueRouter({
  // 所有路由
  routes: [
    {
      path: '/msite',
      component: MSite, //  返回路由组件的函数,只有执行此函数时才会加载此路由，这个函数在请求对应的路由路径时才会执行
      meta: {
        showFooter: true
      }
    },
    {
      path: '/order',
      component: Order,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/profile',
      component: Profile,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/search',
      component: Search,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/',
      redirect: '/msite'
    },
    {
      path: '/login',
      component: Login,
      meta: {
        showFooter: false
      }
    },
    {
      path: '/register',
      component: Register,
      meta: {
        showFooter: false // 这里的meta可以不写，不写默认为false
      }
    },
    {
      path: '/shop',
      component: Shop,
      showFooter: true,
      children: [{
        path: '/shop/goods',
        component: ShopGoods
      }, {
        path: '/shop/info',
        component: ShopInfo
      }, {
        path: '/shop/ratings',
        component: ShopRatings
      }, {
        path: '',
        redirect: '/shop/goods'
      }
      ]
    }
  ]
})
