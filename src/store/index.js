import { createStore  } from 'vuex'

export default createStore({
  state () {
    return {
      currentFest: "",
      currentTeam: "",
      festList: [],
      festData: [],
    }
  },
  mutations: {
    setFestList(state, payload) {
      state.festList = payload
    },
    setFestData(state, payload) {
      state.festData = payload
    },
    setCurrentFest(state, payload) {
      state.currentFest = payload
    },
    setCurrentTeam(state, payload) {
      state.currentTeam = payload
    },
  },
  actions: {
    setFestList(context, payload){
      context.commit('setFestList', payload)
    },
    setFestData(context, payload){
      context.commit('setFestData', payload)
    },
    setCurrentFest(context, payload){
      context.commit('setCurrentFest', payload)
    },
    setCurrentTeam(context, payload){
      context.commit('setCurrentTeam', payload)
    },
  }
})