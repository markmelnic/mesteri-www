<template>
  <div class="min-h-[calc(100vh-64px)] flex items-center justify-center py-12 px-4 bg-stone-50 relative overflow-hidden">
    <div class="absolute inset-0 dot-grid opacity-40 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,black,transparent)]" />

    <div class="relative w-full max-w-md animate-fade-up">
      <div class="p-8 rounded-3xl bg-white border border-stone-200 shadow-xl shadow-stone-900/5">
        <!-- Heading -->
        <div class="text-center mb-8">
          <h1 class="font-display text-2xl font-bold text-stone-900 tracking-tight">{{ $t('auth.loginTitle') }}</h1>
          <p class="text-sm text-stone-500 mt-2">{{ $t('auth.loginSubtitle') }}</p>
        </div>

        <!-- Form -->
        <form class="space-y-5" @submit.prevent="handleLogin">
          <UFormField :label="$t('auth.email')">
            <UInput v-model="form.email" type="email" :placeholder="$t('auth.emailPlaceholder')" size="lg" icon="i-heroicons-envelope" class="w-full" />
          </UFormField>
          <UFormField :label="$t('auth.password')">
            <UInput v-model="form.password" type="password" :placeholder="$t('auth.passwordPlaceholder')" size="lg" icon="i-heroicons-lock-closed" class="w-full" />
          </UFormField>

          <button
            type="submit"
            class="w-full px-4 py-3 text-sm font-semibold text-white bg-orange-600 hover:bg-orange-700 rounded-xl transition-colors shadow-lg shadow-orange-600/20"
          >
            {{ $t('auth.loginButton') }}
          </button>
        </form>

        <!-- Divider -->
        <div class="flex items-center gap-3 my-6">
          <div class="flex-1 h-px bg-stone-200" />
          <span class="text-xs text-stone-400">{{ $t('auth.demoLabel') }}</span>
          <div class="flex-1 h-px bg-stone-200" />
        </div>

        <!-- Demo accounts -->
        <div class="space-y-2">
          <button
            v-for="demo in demoAccounts"
            :key="demo.email"
            type="button"
            class="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-stone-200 hover:border-orange-200 hover:bg-orange-50/50 transition-all duration-150 text-left"
            @click="loginAs(demo)"
          >
            <UAvatar :src="demo.avatar" size="sm" />
            <div class="flex-1 min-w-0">
              <p class="text-sm font-semibold text-stone-900 truncate">{{ demo.name }}</p>
              <p class="text-xs text-stone-400">{{ demo.role }}</p>
            </div>
            <UIcon name="i-heroicons-arrow-right" class="w-4 h-4 text-stone-300" />
          </button>
        </div>

        <!-- Register link -->
        <p class="text-center text-sm text-stone-500 mt-6">
          {{ $t('auth.noAccount') }}
          <NuxtLink :to="localePath('/inregistrare')" class="text-orange-600 font-semibold hover:text-orange-700">
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
const localePath = useLocalePath()
const { login, loginAsDemo } = useAuth()
const toast = useToast()

useHead({ title: `${t('auth.loginTitle')} — mesteri.md` })

const form = reactive({ email: '', password: '' })

const demoAccounts = computed(() => [
  { email: 'client@mesteri.md', name: t('auth.demoClient'), role: t('auth.clientRole'), avatar: 'https://i.pravatar.cc/150?img=60' },
  { email: 'mester@mesteri.md', name: t('auth.demoProvider'), role: t('auth.providerRole'), avatar: 'https://i.pravatar.cc/150?img=1' }
])

function handleLogin() {
  if (!form.email || !form.password) {
    toast.add({ title: t('auth.fillFields'), icon: 'i-heroicons-exclamation-triangle', color: 'warning' })
    return
  }
  const result = login(form.email, form.password)
  if (!result.success) {
    toast.add({ title: t('auth.invalidCredentials'), icon: 'i-heroicons-exclamation-triangle', color: 'error' })
    return
  }
  toast.add({ title: t('auth.loginSuccess'), icon: 'i-heroicons-check-circle', color: 'success' })
  router.push(localePath('/'))
}

function loginAs(demo: { email: string }) {
  loginAsDemo(demo.email)
  toast.add({ title: t('auth.loginSuccess'), icon: 'i-heroicons-check-circle', color: 'success' })
  router.push(localePath('/'))
}
</script>
