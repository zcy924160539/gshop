/*
通过mutation间接更新state的多个对象
*/

import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USERINFO,
  RESET_USER_INFO,
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  RECEIVE_INFO,
  INCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT,
  CLEAR_CART,
  RECEIVE_SEARCH_SHOPS
} from './mutation-types'
import {
  reqAddress,
  reqFoodCategorys,
  reqShops,
  reqUserInfo,
  reqLogout,
  reqShopGoods,
  reqShopInfo,
  reqShopRatings,
  reqSearchShop
} from '../api'
export default {
  // 异步获取地址
  async getAddress ({ commit, state }) {
    // 发送异步ajax请求
    const geohash = state.latitude + ',' + state.longitude
    const result = await reqAddress(geohash)
    // 根据结果提交一个mutation
    if (result.code === 0) {
      const address = result.data
      commit(RECEIVE_ADDRESS, { address })
    }
  },
  // 异步获取食品分类数组
  async getCategorys ({ commit }) {
    // 发送异步ajax请求
    const result = await reqFoodCategorys()
    // 根据结果提交一个mutation
    if (result.code === 0) {
      const categorys = result.data
      commit(RECEIVE_CATEGORYS, { categorys })
    }
  },
  // 异步获取商家列表
  async getShops ({ commit, state }) {
    // 发送异步ajax请求
    const { longitude, latitude } = state
    const result = await reqShops(longitude, latitude)
    // 提交一个mutation
    if (result.code === 0) {
      const shops = result.data
      commit(RECEIVE_SHOPS, { shops })
    }
  },

  // 同步记录用户信息
  recordUser ({ commit }, userInfo) {
    commit(RECEIVE_USERINFO, { userInfo })
  },
  // 异步记录用户信息
  async getUserInfo ({ commit }) {
    const result = await reqUserInfo()
    if (result.code === 0) {
      const userInfo = result.data
      commit(RECEIVE_USERINFO, { userInfo })
    }
  },

  // 异步退出登录
  async logout ({ commit }) {
    const result = await reqLogout()
    if (result.code === 0) {
      commit(RESET_USER_INFO)
    }
  },

  // 异步获取商品列表
  async getShopGoods ({ commit }, callback) {
    const result = await reqShopGoods()
    if (result.code === 0) {
      const goods = result.data
      commit(RECEIVE_GOODS, { goods })
      // 数据更新了,通知一下组件
      callback && callback() // callback可传可不传
    }
  },
  // 异步获取商家信息
  async getShopInfo ({ commit }) {
    const result = await reqShopInfo()
    if (result.code === 0) {
      const info = result.data
      commit(RECEIVE_INFO, { info })
    }
  },
  // 异步获取评论信息
  async getShopRatings ({ commit }, callback) {
    const result = await reqShopRatings()
    if (result.code === 0) {
      const ratings = result.data
      commit(RECEIVE_RATINGS, { ratings })
      callback && callback()
    }
  },

  // 同步更新food中的count值
  updateFoodCount ({ commit }, { isAdd, food }) {
    if (isAdd) {
      commit(INCREMENT_FOOD_COUNT, { food })
    } else {
      commit(DECREMENT_FOOD_COUNT, { food })
    }
  },

  // 同步清空购物车
  clearCart ({ commit }) {
    commit(CLEAR_CART)
  },

  async searchShops ({ commit, state }, keyword) {
    const geohash = state.latitude + ',' + state.longitude
    const result = await reqSearchShop(geohash, keyword)
    if (result.code === 0) {
      const searchShops = result.data
      commit(RECEIVE_SEARCH_SHOPS, {searchShops})
    }
  }
}
