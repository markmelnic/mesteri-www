import { users } from '~/data/users'
import type { User } from '~/data/users'

const authUser = ref<User | null>(null)
const initialized = ref(false)

export interface RegisterData {
  name: string
  email: string
  phone: string
  city: string
  password: string
  role: 'client' | 'provider'
}

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

  function persist() {
    if (import.meta.client) {
      if (authUser.value) {
        localStorage.setItem('mesteri_user', JSON.stringify(authUser.value))
      } else {
        localStorage.removeItem('mesteri_user')
      }
    }
  }

  function login(email: string, password: string): { success: boolean; error?: string } {
    const user = users.find(u => u.email === email && u.password === password)
    if (!user) {
      return { success: false, error: 'invalid_credentials' }
    }
    authUser.value = user
    persist()
    return { success: true }
  }

  function loginAsDemo(email: string): { success: boolean } {
    const user = users.find(u => u.email === email)
    if (!user) return { success: false }
    authUser.value = user
    persist()
    return { success: true }
  }

  function register(data: RegisterData): { success: boolean; error?: string } {
    if (users.some(u => u.email === data.email)) {
      return { success: false, error: 'email_taken' }
    }
    const newUser: User = {
      id: `u-${Date.now()}`,
      email: data.email,
      password: data.password,
      name: data.name,
      phone: data.phone,
      city: data.city,
      avatar: `https://i.pravatar.cc/150?u=${encodeURIComponent(data.email)}`,
      role: data.role,
      ...(data.role === 'provider' ? { providerId: '1' } : {})
    }
    users.push(newUser)
    authUser.value = newUser
    persist()
    return { success: true }
  }

  function logout() {
    authUser.value = null
    persist()
  }

  const isAuthenticated = computed(() => !!authUser.value)
  const isProvider = computed(() => authUser.value?.role === 'provider')
  const user = computed(() => authUser.value)

  init()

  return { user, isAuthenticated, isProvider, login, loginAsDemo, register, logout }
}
