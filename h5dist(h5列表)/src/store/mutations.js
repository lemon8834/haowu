import * as types from './mutation-types'
const mutations = {
  [types.SET_ITEM](state, item) {
    state.item = item
  }
}

export default mutations