import { ref } from 'vue'
import store from '@/store'
import { defineStore } from 'pinia'
import { useTagsViewStore } from './tags-view'
import { useSettingsStore } from './settings'
import { getToken, removeToken, setToken } from '@/utils/cache/cookies'
import { resetRouter } from '@/router'
import { loginApi, getUserInfoApi } from '@/api/login'
import { type LoginRequestData } from '@/api/login/types/login'
import routeSettings from '@/config/route'

export const useUserStore = defineStore('user', () => {
  const token = ref<string>(getToken() || '')
  const roles = ref<string[]>([])
  const name = ref<string>('')
  const userId = ref<number>(0)

  const tagsViewStore = useTagsViewStore()
  const settingsStore = useSettingsStore()

  /** 登录 */
  const login = async ({ name, password, code, captchaKey }: LoginRequestData) => {
    const resData: any = await loginApi({ name, password, code, captchaKey })
    setToken(resData.token)
    token.value = resData.token
    userId.value = resData?.data?.id
    sessionStorage.setItem('userId', resData?.data?.id)
  }
  /** 获取用户详情 */
  const getInfo = async () => {
    const id = userId.value || Number(sessionStorage.getItem('userId'))
    const { data } = await getUserInfoApi(id)
    name.value = data.name
    // 验证返回的 roles 是否为一个非空数组，否则塞入一个没有任何作用的默认角色，防止路由守卫逻辑进入无限循环
    roles.value = data.roles?.length > 0 ? data.roles : routeSettings.defaultRoles
  }
  /** 模拟角色变化 */
  const changeRoles = async (role: string) => {
    const newToken = 'token-' + role
    token.value = newToken
    setToken(newToken)
    // 用刷新页面代替重新登录
    window.location.reload()
  }
  /** 登出 */
  const logout = () => {
    removeToken()
    token.value = ''
    roles.value = []
    resetRouter()
    _resetTagsView()
  }
  /** 重置 Token */
  const resetToken = () => {
    removeToken()
    token.value = ''
    roles.value = []
  }
  /** 重置 Visited Views 和 Cached Views */
  const _resetTagsView = () => {
    if (!settingsStore.cacheTagsView) {
      tagsViewStore.delAllVisitedViews()
      tagsViewStore.delAllCachedViews()
    }
  }

  return { token, roles, name, login, getInfo, changeRoles, logout, resetToken }
})

/** 在 setup 外使用 */
export function useUserStoreHook() {
  return useUserStore(store)
}
