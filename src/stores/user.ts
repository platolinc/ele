import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { IUserInfo } from '@/types'

export interface IUserState {
  userInfo: IUserInfo
  token: string
}

const getDefaultUserInfo: () => IUserInfo = () => ({
  id: '',
  avatar: 'https://b.yzcdn.cn/vant/icon-demo-1126.png',
  nickname: '请登录',
})

export const useUserStore = defineStore('user', () => {
  const state = ref({
    userInfo: getDefaultUserInfo(),
    token: '',
  })
  const getUserInfo = computed(() => {
    // 为什么不直接读 localStorage 的值呢？
    // 因为读取 localStorage 是比较耗时的操作，所以这里先读 store
    // if (!state.value.userInfo || !state.value.userInfo.id) {
    //   state.value.userInfo = $userInfo.value
    // }
    return state.value.userInfo
  })
  const setInfo = ({ token, userInfo }: IUserState) => {
    state.value.userInfo = userInfo
    state.value.token = token
  }
  const removeInfo = () => {
    state.value.userInfo = getDefaultUserInfo()
    state.value.token = ''
    // $removeUserInfoItem()
    // $removeTokenItem()
  }

  return { state, getUserInfo, setInfo, removeInfo }
})
