/*
通过mutation间接更新state的多个对象
*/

import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USERINFO,
  RESET_USER_INFO
} from './mutation-types'
import {
  reqAddress,
  reqFoodCategorys,
  reqShops,
  reqUserInfo,
  reqLogout
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
  async logout ({commit}) {
    const result = await reqLogout()
    if (result.code === 0) {
      const reqLogout = result.data
      commit(RESET_USER_INFO, { reqLogout })
    }
  }
}
