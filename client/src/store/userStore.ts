import { getDataAPI, patchDataAPI, postDataAPI } from '../utils/fetchData'
import { GlobalStoreState, IUserState } from './../utils/interface'

interface ILoginData {
  username: string
  password: string
}

const userState: IUserState = {
  data: {},
  followings: [],
  loading: true
}

const userStore = (set: any) => {
  return {
    userState,
    login: async(data: ILoginData) => {
      set((state: GlobalStoreState) => {
        state.userState.loading = true
      }, false, 'login/loading')

      try {
        const res = await postDataAPI('/api/v1/users/login', data)

        set((state: GlobalStoreState) => {
          state.userState.data = {
            user: res.data.user,
            accessToken: res.data.accessToken
          }
          state.userState.followings = res.data.followings
          state.userState.loading = false
          state.alertState.message = res.data.msg
          state.alertState.type = 'success'
        }, false, 'login/success')

        localStorage.setItem('ss_auth_status', 'Y')
      } catch (err: any) {
        set((state: GlobalStoreState) => {
          state.userState.loading = false
          state.userState.data = {}
          state.userState.followings = []
          state.alertState.message = err.response.data.msg
          state.alertState.type = 'error'
        }, false, 'login/error')
      }
    },
    refreshToken: async() => {
      set((state: GlobalStoreState) => {
        state.userState.loading = true
      }, false, 'refresh_token/loading')

      const getLsAuth = localStorage.getItem('ss_auth_status')
      if (!getLsAuth || getLsAuth !== 'Y') {
        set((state: GlobalStoreState) => {
          state.userState.loading = false
        }, false, 'refresh_token/done_loading')
        return
      }

      try {
        const res = await getDataAPI('/api/v1/users/refresh_token')

        set((state: GlobalStoreState) => {
          state.userState.data = {
            accessToken: res.data.accessToken,
            user: res.data.user
          }
          state.userState.followings = res.data.followings
        }, false, 'refresh_token/success')
      } catch (err: any) {
        set((state: GlobalStoreState) => {
          state.userState.data = {}
          state.userState.followings = []
          state.alertState.message = err.response.data.msg
          state.alertState.type = 'error'
        }, false, 'refresh_token/error')
      }

      set((state: GlobalStoreState) => {
        state.userState.loading = false
      }, false, 'refresh_token/done_loading')
    },
    logout: async() => {
      try {
        const res = await getDataAPI('/api/v1/users/logout')

        set((state: GlobalStoreState) => {
          state.userState.data = {}
          state.userState.followings = []
          state.alertState.message = res.data.msg
          state.alertState.type = 'success'
        }, false, 'logout/success')

        localStorage.removeItem('ss_auth_status')
      } catch (err: any) {
        set((state: GlobalStoreState) => {
          state.alertState.message = err.response.data.msg
          state.alertState.type = 'error'
        }, false, 'logout/error')
      }
    },
    follow: async(id: string, token: string) => {
      try {
        const res = await patchDataAPI(`/api/v1/users/${id}/follow`, {}, token)
        
        set((state: GlobalStoreState) => {
          state.userState.followings = res.data.followings
        }, false, 'follow/success')
      } catch (err: any) {
        set((state: GlobalStoreState) => {
          state.alertState.message = err.response.data.msg
          state.alertState.type = 'error'
        }, false, 'follow/error')
      }
    },
    unfollow: async(id: string, token: string) => {
      try {
        const res = await patchDataAPI(`/api/v1/users/${id}/unfollow`, {}, token)

        set((state: GlobalStoreState) => {
          state.userState.followings = res.data.followings
        }, false, 'unfollow/success')
      } catch (err: any) {
        set((state: GlobalStoreState) => {
          state.alertState.message = err.response.data.msg
          state.alertState.type = 'error'
        }, false, 'unfollow/error')
      }
    }
  }
}

export default userStore