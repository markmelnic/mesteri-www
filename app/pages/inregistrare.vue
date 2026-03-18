<template>
  <div class="min-h-[calc(100vh-64px)] flex items-center justify-center py-12 px-4 bg-[#0A0A0A] relative">
    <!-- Accent glow -->
    <div class="absolute top-1/3 right-1/3 w-[400px] h-[300px] bg-[#0D9373]/[0.06] rounded-full blur-[140px] pointer-events-none" />

    <div class="relative w-full max-w-lg animate-fade-up">
      <div class="p-8 rounded-xl bg-[#141416] border border-white/[0.06]">
        <!-- Logo -->
        <div class="text-center mb-8">
          <SharedAppLogo :width="150" :height="34" class="mx-auto" />
          <p class="text-sm text-[#A1A1AA] mt-3">{{ $t('auth.registerSubtitle') }}</p>
        </div>

        <!-- Form -->
        <form class="space-y-5" @submit.prevent="handleRegister">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <UFormField :label="$t('auth.fullName')">
              <UInput v-model="form.name" :placeholder="$t('auth.namePlaceholder')" />
            </UFormField>
            <UFormField :label="$t('auth.phone')">
              <UInput v-model="form.phone" type="tel" :placeholder="$t('auth.phonePlaceholder')" />
            </UFormField>
          </div>
          <UFormField :label="$t('auth.email')">
            <UInput v-model="form.email" type="email" :placeholder="$t('auth.emailPlaceholder')" />
          </UFormField>
          <UFormField :label="$t('auth.city')">
            <USelect v-model="form.city" :items="cities" :placeholder="$t('auth.cityPlaceholder')" />
          </UFormField>
          <UFormField :label="$t('auth.password')">
            <UInput v-model="form.password" type="password" :placeholder="$t('auth.passwordPlaceholder')" />
          </UFormField>

          <!-- Role selection -->
          <UFormField :label="$t('auth.roleLabel')">
            <div class="grid grid-cols-2 gap-3">
              <button
                type="button"
                class="p-4 rounded-lg border text-center transition-all duration-150"
                :class="form.role === 'client' ? 'border-[#0D9373] bg-[#0D9373]/10' : 'border-white/[0.06] hover:border-white/[0.12]'"
                @click="form.role = 'client'"
              >
                <UIcon name="i-heroicons-user" class="w-5 h-5 mx-auto mb-2" :class="form.role === 'client' ? 'text-[#0D9373]' : 'text-[#63636E]'" />
                <p class="text-sm font-semibold" :class="form.role === 'client' ? 'text-[#2AB673]' : 'text-white'">{{ $t('auth.clientRole') }}</p>
                <p class="text-xs text-[#63636E] mt-1">{{ $t('auth.clientDesc') }}</p>
              </button>
              <button
                type="button"
                class="p-4 rounded-lg border text-center transition-all duration-150"
                :class="form.role === 'provider' ? 'border-[#0D9373] bg-[#0D9373]/10' : 'border-white/[0.06] hover:border-white/[0.12]'"
                @click="form.role = 'provider'"
              >
                <UIcon name="i-heroicons-wrench-screwdriver" class="w-5 h-5 mx-auto mb-2" :class="form.role === 'provider' ? 'text-[#0D9373]' : 'text-[#63636E]'" />
                <p class="text-sm font-semibold" :class="form.role === 'provider' ? 'text-[#2AB673]' : 'text-white'">{{ $t('auth.providerRole') }}</p>
                <p class="text-xs text-[#63636E] mt-1">{{ $t('auth.providerDesc') }}</p>
              </button>
            </div>
          </UFormField>

          <button
            type="submit"
            class="w-full px-4 py-3 text-sm font-semibold text-white bg-[#0D9373] hover:bg-[#0FAA84] rounded-lg transition-colors duration-150"
          >
            {{ $t('auth.registerButton') }}
          </button>
        </form>

        <!-- Login link -->
        <p class="text-center text-sm text-[#A1A1AA] mt-6">
          {{ $t('auth.hasAccount') }}
          <NuxtLink to="/autentificare" class="text-[#0D9373] font-semibold hover:text-[#2AB673]">
            {{ $t('auth.loginLink') }}
          </NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const router = useRouter()
const { register } = useAuth()
const toast = useToast()

useHead({ title: `${t('auth.registerTitle')} — mesteri.md` })

const form = reactive({
  name: '',
  email: '',
  phone: '',
  city: '',
  password: '',
  role: 'client'
})

const cities = ['Chișinău', 'Bălți', 'Cahul', 'Comrat', 'Orhei', 'Soroca', 'Ungheni']

function handleRegister() {
  if (!form.name || !form.email || !form.password) {
    toast.add({ title: t('auth.fillFields'), icon: 'i-heroicons-exclamation-triangle', color: 'warning' })
    return
  }
  register(form)
  toast.add({ title: t('auth.registerSuccess'), icon: 'i-heroicons-check-circle', color: 'success' })
  router.push('/')
}
</script>
