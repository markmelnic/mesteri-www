<template>
  <div class="min-h-[calc(100vh-64px)] flex items-center justify-center py-12 px-4 bg-[#0A0A0A] relative">
    <!-- Accent glow -->
    <div class="absolute top-1/3 left-1/2 -translate-x-1/2 w-[400px] h-[300px] bg-[#0D9373]/[0.06] rounded-full blur-[140px] pointer-events-none" />

    <div class="relative w-full max-w-md animate-fade-up">
      <div class="p-8 rounded-xl bg-[#141416] border border-white/[0.06]">
        <!-- Logo -->
        <div class="text-center mb-8">
          <SharedAppLogo :width="150" :height="34" class="mx-auto" />
          <p class="text-sm text-[#A1A1AA] mt-3">{{ $t('auth.loginSubtitle') }}</p>
        </div>

        <!-- Form -->
        <form class="space-y-5" @submit.prevent="handleLogin">
          <UFormField :label="$t('auth.email')">
            <UInput v-model="form.email" type="email" :placeholder="$t('auth.emailPlaceholder')" size="lg" />
          </UFormField>
          <UFormField :label="$t('auth.password')">
            <UInput v-model="form.password" type="password" :placeholder="$t('auth.passwordPlaceholder')" size="lg" />
          </UFormField>

          <button
            type="submit"
            class="w-full px-4 py-3 text-sm font-semibold text-white bg-[#0D9373] hover:bg-[#0FAA84] rounded-lg transition-colors duration-150"
          >
            {{ $t('auth.loginButton') }}
          </button>
        </form>

        <!-- Divider -->
        <div class="flex items-center gap-3 my-6">
          <div class="flex-1 h-px bg-white/[0.06]" />
          <span class="text-xs text-[#63636E]">{{ $t('auth.or') || 'sau' }}</span>
          <div class="flex-1 h-px bg-white/[0.06]" />
        </div>

        <!-- Demo accounts -->
        <div class="space-y-2">
          <button
            v-for="demo in demoAccounts"
            :key="demo.email"
            class="w-full flex items-center gap-3 px-4 py-3 rounded-lg border border-white/[0.06] hover:border-white/[0.12] hover:bg-white/[0.02] transition-all duration-150 text-left"
            @click="loginAs(demo)"
          >
            <UAvatar :src="demo.avatar" size="xs" />
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-white truncate">{{ demo.name }}</p>
              <p class="text-xs text-[#63636E]">{{ demo.role }}</p>
            </div>
            <UIcon name="i-heroicons-arrow-right" class="w-4 h-4 text-[#63636E]" />
          </button>
        </div>

        <!-- Register link -->
        <p class="text-center text-sm text-[#A1A1AA] mt-6">
          {{ $t('auth.noAccount') }}
          <NuxtLink to="/inregistrare" class="text-[#0D9373] font-semibold hover:text-[#2AB673]">
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
