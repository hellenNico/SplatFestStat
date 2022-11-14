import { createStore  } from 'vuex'

export default createStore({
  state () {
    return {
      currentTeam: "",
      fesData: [],
    }
  },
  mutations: {
    setFesData(state, payload) {
      state.fesData = payload
    },
    setCurrentTeam(state, payload) {
      state.currentTeam = payload
    },
  },
  actions: {
    setFesData(context, payload){
      context.commit('setFesData', payload)
    },
    setCurrentTeam(context, payload){
      context.commit('setCurrentTeam', payload)
    },
  }
})