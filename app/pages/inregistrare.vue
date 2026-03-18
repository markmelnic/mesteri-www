<template>
  <div class="min-h-[calc(100vh-64px)] flex items-center justify-center py-12 px-4" style="background: var(--gradient-hero)">
    <!-- Gradient orbs -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-1/3 right-1/3 w-[400px] h-[400px] rounded-full bg-violet-600/15 blur-[120px]" />
      <div class="absolute bottom-1/3 left-1/4 w-[300px] h-[300px] rounded-full bg-indigo-600/15 blur-[100px]" />
    </div>

    <div class="relative w-full max-w-lg animate-fade-up">
      <div class="p-8 rounded-2xl bg-white/95 backdrop-blur-xl border border-white/50 shadow-2xl">
        <!-- Logo -->
        <div class="text-center mb-8">
          <SharedAppLogo :width="150" :height="34" class="mx-auto" />
          <p class="text-sm text-gray-500 mt-3">{{ $t('auth.registerSubtitle') }}</p>
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
                class="p-4 rounded-xl border-2 text-center transition-all duration-200"
                :class="form.role === 'client' ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:border-gray-300'"
                @click="form.role = 'client'"
              >
                <UIcon name="i-heroicons-user" class="w-6 h-6 mx-auto mb-2" :class="form.role === 'client' ? 'text-indigo-600' : 'text-gray-400'" />
                <p class="text-sm font-semibold" :class="form.role === 'client' ? 'text-indigo-600' : 'text-gray-700'">{{ $t('auth.clientRole') }}</p>
                <p class="text-xs text-gray-500 mt-1">{{ $t('auth.clientDesc') }}</p>
              </button>
              <button
                type="button"
                class="p-4 rounded-xl border-2 text-center transition-all duration-200"
                :class="form.role === 'provider' ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:border-gray-300'"
                @click="form.role = 'provider'"
              >
                <UIcon name="i-heroicons-wrench-screwdriver" class="w-6 h-6 mx-auto mb-2" :class="form.role === 'provider' ? 'text-indigo-600' : 'text-gray-400'" />
                <p class="text-sm font-semibold" :class="form.role === 'provider' ? 'text-indigo-600' : 'text-gray-700'">{{ $t('auth.providerRole') }}</p>
                <p class="text-xs text-gray-500 mt-1">{{ $t('auth.providerDesc') }}</p>
              </button>
            </div>
          </UFormField>

          <UButton
            type="submit"
            color="primary"
            block
            size="lg"
            class="font-semibold bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-500/20"
          >
            {{ $t('auth.registerButton') }}
          </UButton>
        </form>

        <!-- Login link -->
        <p class="text-center text-sm text-gray-500 mt-6">
          {{ $t('auth.hasAccount') }}
          <NuxtLink to="/autentificare" class="text-indigo-600 font-semibold hover:text-indigo-700">
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
