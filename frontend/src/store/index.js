import { createStore } from 'vuex'

export default createStore({
  state: {
    totalFromVueX: 10
  },
  getters: {
    doubleDuTotal(state){
      return state.totalFromVueX * 2;
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
