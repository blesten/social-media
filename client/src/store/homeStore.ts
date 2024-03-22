import { getDataAPI, postDataAPI } from '../utils/fetchData'
import { uploadImages } from '../utils/image'
import { GlobalStoreState, IHomeState } from './../utils/interface'

const homeState: IHomeState = {
  posts: [],
  loading: false
}

const homeStore = (set: any) => {
  return {
    homeState,
    readPosts: async(token: string) => {
      set((state: GlobalStoreState) => {
        state.homeState.loading = true
      }, false, 'readPosts/loading')

      try {
        const res = await getDataAPI(`/api/v1/posts`, token)

        set((state: GlobalStoreState) => {
          state.homeState.loading = false
          state.homeState.posts = res.data.posts
        }, false, 'readPosts/success')
      } catch (err: any) {
        set((state: GlobalStoreState) => {
          state.alertState.message = err.response.data.msg
          state.alertState.type = 'error'
        }, false, 'readPosts/error')
      }
    },
    createPost: async(caption: string, images: File[], token: string) => {
      try {
        const imagesUrl = await uploadImages(images, 'post')

        const res = await postDataAPI('/api/v1/posts', {
          caption,
          images: imagesUrl
        }, token)

        set((state: GlobalStoreState) => {
          state.alertState.message = res.data.msg
          state.alertState.type = 'success'
          state.homeState.posts = [res.data.post, ...state.homeState.posts]
        }, false, 'createPost/success')
      } catch (err: any) {
        set((state: GlobalStoreState) => {
          state.alertState.message = err.response.data.msg
          state.alertState.type = 'error'
        }, false, 'createPost/error')
      }
    }
  }
}

export default homeStore