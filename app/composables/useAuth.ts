import { users } from '~/data/users'
import type { User } from '~/data/users'

const authUser = ref<User | null>(null)
const initialized = ref(false)

export function useAuth() {
  function init() {
    if (initialized.value) return
    if (import.meta.client) {
      const stored = localStorage.getItem('mesteri_user')
      if (stored) {
        try {
          authUser.value = JSON.parse(stored)
        } catch {
          localStorage.removeItem('mesteri_user')
        }
      }
    }
    initialized.value = true
  }

  function login(email: string, password: string): { success: boolean; error?: string } {
    const user = users.find(u => u.email === email && u.password === password)
    if (!user) {
      return { success: false, error: 'Email sau parolă incorectă' }
    }
    authUser.value = user
    if (import.meta.client) {
      localStorage.setItem('mesteri_user', JSON.stringify(user))
    }
    return { success: true }
  }

  function logout() {
    authUser.value = null
    if (import.meta.client) {
      localStorage.removeItem('mesteri_user')
    }
  }

  const isAuthenticated = computed(() => !!authUser.value)
  const isProvider = computed(() => authUser.value?.role === 'provider')
  const user = computed(() => authUser.value)

  init()

  return { user, isAuthenticated, isProvider, login, logout }
}
