import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    picked: {

    }
  },
  getters: {
    doneSaves: state => {
      return state.picked
    }
  },
  mutations: {
    saveData (state, picked) {
      Vue.set(state, 'picked', { ...picked })
    },
  },
  actions: {
    saveData (context, picked) {
      context.commit('saveData', picked)
    }
  }
})
