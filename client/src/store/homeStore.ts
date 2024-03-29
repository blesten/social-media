import { deleteDataAPI, getDataAPI, patchDataAPI, postDataAPI } from '../utils/fetchData'
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
    },
    likePost: async(id: string, userId: string, token: string) => {
      try {
        await patchDataAPI(`/api/v1/posts/${id}/like`, {}, token)
        set((state: GlobalStoreState) => {
          state.homeState.posts = state.homeState.posts.map(item => item._id === id ? { ...item, likes: [...item.likes, userId] } : item)
        }, false, 'likePost/success')
      } catch (err: any) {
        set((state: GlobalStoreState) => {
          state.alertState.message = err.response.data.msg
          state.alertState.type = 'error'
        }, false, 'likePost/error')
      }
    },
    unlikePost: async(id: string, userId: string, token: string) => {
      try {
        await patchDataAPI(`/api/v1/posts/${id}/unlike`, {}, token)
        set((state: GlobalStoreState) => {
          state.homeState.posts = state.homeState.posts.map(item => item._id === id ? { ...item, likes: item.likes.filter(u => u !== userId) } : item)
        }, false, 'unlikePost/success')
      } catch (err: any) {
        set((state: GlobalStoreState) => {
          state.alertState.message = err.response.data.msg
          state.alertState.type = 'error'
        }, false, 'unlikePost/error')
      }
    },
    deletePost: async(id: string, token: string) => {
      try {
        const res = await deleteDataAPI(`/api/v1/posts/${id}`, token)
        set((state: GlobalStoreState) => {
          state.homeState.posts = state.homeState.posts.filter(item => item._id !== id)
          state.alertState.message = res.data.msg
          state.alertState.type = 'success'
        }, false, 'deletePost/success')
      } catch (err: any) {
        set((state: GlobalStoreState) => {
          state.alertState.message = err.response.data.msg
          state.alertState.type = 'eerror'
        }, false, 'deletePost/error')
      }
    },
    updatePost: async(id: string, token: string, caption: string, images: (File | String)[]) => {
      try {
        const newImages = images.filter(item => item instanceof File)
        const oldImages = images.filter(item => !(item instanceof File))

        let newImagesUrl = []

        if (newImages.length > 0) {
          newImagesUrl = await uploadImages(newImages as File[], 'post')
        }

        const res = await patchDataAPI(`/api/v1/posts/${id}`, {
          caption,
          images: [ ...oldImages, ...newImagesUrl ]
        }, token)

        set((state: GlobalStoreState) => {
          state.alertState.message = res.data.msg
          state.alertState.type = 'success'
          state.homeState.posts = state.homeState.posts.map(item => item._id === id ? { ...item, caption, images: res.data.post.images } : item)
        }, false, 'updatePost/success')
      } catch (err: any) {
        set((state: GlobalStoreState) => {
          state.alertState.message = err.response.data.msg
          state.alertState.type = 'error'
        }, false, 'updatePost/error')
      }
    }
  }
}

export default homeStore