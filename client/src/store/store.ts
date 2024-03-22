import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import alertStore from './alertStore'
import userStore from './userStore'
import homeStore from './homeStore'

let combineStores  = (set: any) => ({
  ...alertStore(set),
  ...userStore(set),
  ...homeStore(set)
})

export default create(devtools(combineStores))