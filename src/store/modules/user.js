import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    role: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_ROLE: (state, role) => {
    state.role = role
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    console.log(JSON.stringify(userInfo))
    const { studentId, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ studentId: studentId.trim(), password: password }).then(response => {
        console.log(JSON.stringify(response))
        const { data } = response
        commit('SET_TOKEN', response.data)
        setToken(response.data)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    /**
     * {"code":200,"message":"success","requestId":"3e989343d7654d0badfb2e258284a43c","data":{"id":"1810212128","name":"学生一","role":1}}
     */
    return new Promise((resolve, reject) => {
      /**
       * const ddd = { roles: ['admin'], introduction: 'I am a super administrator', avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif', name: '管理员' }
       * commit('SET_NAME', ddd.name)
       * commit('SET_AVATAR', ddd.avatar)
       * resolve(ddd) 
       */
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const { name, role } = data

        // eslint-disable-next-line no-unused-vars
        let role_name

        switch (role) {
          case 1:
            role_name = 'student'
            break
          case 2:
            role_name = 'teacher'
            break
          case 3:
            role_name = 'supervisor'
            break
          case 4:
            role_name = 'main'
            break
          default:
            role_name = 'other'
            break
        }

        commit('SET_NAME', name)
        commit('SET_ROLE', role_name)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    /**
     * removeToken() // must remove  token  first
     * resetRouter()
     * commit('RESET_STATE')
     * resolve()
     */
    return new Promise((resolve, reject) => {
      logout(state.token).then(response => {
        console.log(response)
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

