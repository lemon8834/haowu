import * as types from './mutation-types'
export const setItem = function({commit}, item) {
  commit(types.SET_ITEM, item)
}