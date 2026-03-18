<template>
  <div class="min-h-[calc(100vh-64px)] flex items-center justify-center py-12 px-4" style="background: var(--gradient-hero)">
    <!-- Gradient orbs -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-1/4 left-1/3 w-[400px] h-[400px] rounded-full bg-indigo-600/15 blur-[120px]" />
      <div class="absolute bottom-1/4 right-1/3 w-[300px] h-[300px] rounded-full bg-violet-600/15 blur-[100px]" />
    </div>

    <div class="relative w-full max-w-md animate-fade-up">
      <div class="p-8 rounded-2xl bg-white/95 backdrop-blur-xl border border-white/50 shadow-2xl">
        <!-- Logo -->
        <div class="text-center mb-8">
          <SharedAppLogo :width="150" :height="34" class="mx-auto" />
          <p class="text-sm text-gray-500 mt-3">{{ $t('auth.loginSubtitle') }}</p>
        </div>

        <!-- Form -->
        <form class="space-y-5" @submit.prevent="handleLogin">
          <UFormField :label="$t('auth.email')">
            <UInput v-model="form.email" type="email" :placeholder="$t('auth.emailPlaceholder')" size="lg" />
          </UFormField>
          <UFormField :label="$t('auth.password')">
            <UInput v-model="form.password" type="password" :placeholder="$t('auth.passwordPlaceholder')" size="lg" />
          </UFormField>

          <UButton
            type="submit"
            color="primary"
            block
            size="lg"
            class="font-semibold bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-500/20"
          >
            {{ $t('auth.loginButton') }}
          </UButton>
        </form>

        <!-- Divider -->
        <div class="flex items-center gap-3 my-6">
          <div class="flex-1 h-px bg-gray-200" />
          <span class="text-xs text-gray-400">{{ $t('auth.or') || 'sau' }}</span>
          <div class="flex-1 h-px bg-gray-200" />
        </div>

        <!-- Demo accounts -->
        <div class="space-y-2">
          <button
            v-for="demo in demoAccounts"
            :key="demo.email"
            class="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-200 hover:border-indigo-200 hover:bg-indigo-50/50 transition-all duration-200 text-left"
            @click="loginAs(demo)"
          >
            <UAvatar :src="demo.avatar" size="xs" />
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-900 truncate">{{ demo.name }}</p>
              <p class="text-xs text-gray-500">{{ demo.role }}</p>
            </div>
            <UIcon name="i-heroicons-arrow-right" class="w-4 h-4 text-gray-400" />
          </button>
        </div>

        <!-- Register link -->
        <p class="text-center text-sm text-gray-500 mt-6">
          {{ $t('auth.noAccount') }}
          <NuxtLink to="/inregistrare" class="text-indigo-600 font-semibold hover:text-indigo-700">
            {{ $t('auth.registerLink') }}
          </NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const router = useRouter()
const { login, loginAsDemo } = useAuth()
const toast = useToast()

useHead({ title: `${t('auth.loginTitle')} — mesteri.md` })

const form = reactive({ email: '', password: '' })

const demoAccounts = [
  { email: 'client@mesteri.md', name: t('auth.demoClient'), role: t('auth.clientRole'), avatar: 'https://i.pravatar.cc/150?img=44' },
  { email: 'mester@mesteri.md', name: t('auth.demoProvider'), role: t('auth.providerRole'), avatar: 'https://i.pravatar.cc/150?img=1' }
]

function handleLogin() {
  if (!form.email || !form.password) {
    toast.add({ title: t('auth.fillFields'), icon: 'i-heroicons-exclamation-triangle', color: 'warning' })
    return
  }
  login(form.email, form.password)
  toast.add({ title: t('auth.loginSuccess'), icon: 'i-heroicons-check-circle', color: 'success' })
  router.push('/')
}

function loginAs(demo: { email: string }) {
  loginAsDemo(demo.email)
  toast.add({ title: t('auth.loginSuccess'), icon: 'i-heroicons-check-circle', color: 'success' })
  router.push('/')
}
</script>
