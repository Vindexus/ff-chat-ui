import Vue from 'vue'
import Vuex from 'vuex'
import {getSession, login} from "@/modules/users/user-api";
import {setCookie} from "@/lib/cookies";
import {setJWT} from "@/lib/axios"

Vue.use(Vuex)

type State = {
  session: {
    isLoggedIn: boolean
    currentUserId: number | null
    loading: boolean
  },

}

export default new Vuex.Store({
  state: {
    session: {
      isLoggedIn: false,
      currentUserId: null,
      loading: true
    }
  },
  mutations: {
    setCurrentUserId (state: State, newId: number) {
      state.session.loading = false
      state.session.currentUserId = newId
      state.session.isLoggedIn = newId > 0
    }
  },
  actions: {
    async login ({commit, dispatch}, {username, password}) {
      const res = await login({
        Username: username,
        Password: password,
      })
      setJWT(res.jwt)
      await dispatch('loadSession')
    },
    async loadSession ({commit}) {
      const res = await getSession()
      commit('setCurrentUserId', res.UserId)
    }
  },
  modules: {
  }
})
