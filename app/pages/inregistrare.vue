<template>
  <div class="min-h-[calc(100vh-64px)] flex items-center justify-center py-12 px-4 bg-stone-50 relative overflow-hidden">
    <div class="absolute inset-0 dot-grid opacity-40 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,black,transparent)]" />

    <div class="relative w-full max-w-lg animate-fade-up">
      <div class="p-8 rounded-3xl bg-white border border-stone-200 shadow-xl shadow-stone-900/5">
        <!-- Heading -->
        <div class="text-center mb-8">
          <h1 class="font-display text-2xl font-bold text-stone-900 tracking-tight">{{ $t('auth.registerTitle') }}</h1>
          <p class="text-sm text-stone-500 mt-2">{{ $t('auth.registerSubtitle') }}</p>
        </div>

        <!-- Form -->
        <form class="space-y-5" @submit.prevent="handleRegister">
          <!-- Role selection first: it frames the rest -->
          <UFormField :label="$t('auth.roleLabel')">
            <div class="grid grid-cols-2 gap-3">
              <button
                type="button"
                class="p-4 rounded-xl border text-center transition-all"
                :class="form.role === 'client' ? 'border-orange-500 bg-orange-50 ring-2 ring-orange-500/20' : 'border-stone-200 hover:border-stone-300'"
                @click="form.role = 'client'"
              >
                <UIcon name="i-heroicons-home" class="w-5 h-5 mx-auto mb-2" :class="form.role === 'client' ? 'text-orange-600' : 'text-stone-400'" />
                <p class="text-sm font-semibold" :class="form.role === 'client' ? 'text-orange-800' : 'text-stone-700'">{{ $t('auth.clientRole') }}</p>
                <p class="text-xs text-stone-400 mt-1">{{ $t('auth.clientDesc') }}</p>
              </button>
              <button
                type="button"
                class="p-4 rounded-xl border text-center transition-all"
                :class="form.role === 'provider' ? 'border-orange-500 bg-orange-50 ring-2 ring-orange-500/20' : 'border-stone-200 hover:border-stone-300'"
                @click="form.role = 'provider'"
              >
                <UIcon name="i-heroicons-wrench-screwdriver" class="w-5 h-5 mx-auto mb-2" :class="form.role === 'provider' ? 'text-orange-600' : 'text-stone-400'" />
                <p class="text-sm font-semibold" :class="form.role === 'provider' ? 'text-orange-800' : 'text-stone-700'">{{ $t('auth.providerRole') }}</p>
                <p class="text-xs text-stone-400 mt-1">{{ $t('auth.providerDesc') }}</p>
              </button>
            </div>
          </UFormField>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <UFormField :label="$t('auth.fullName')">
              <UInput v-model="form.name" :placeholder="$t('auth.namePlaceholder')" class="w-full" />
            </UFormField>
            <UFormField :label="$t('auth.phone')">
              <UInput v-model="form.phone" type="tel" :placeholder="$t('auth.phonePlaceholder')" class="w-full" />
            </UFormField>
          </div>
          <UFormField :label="$t('auth.email')">
            <UInput v-model="form.email" type="email" :placeholder="$t('auth.emailPlaceholder')" class="w-full" />
          </UFormField>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <UFormField :label="$t('auth.city')">
              <USelect v-model="form.city" :items="cities" :placeholder="$t('auth.cityPlaceholder')" class="w-full" />
            </UFormField>
            <UFormField :label="$t('auth.password')">
              <UInput v-model="form.password" type="password" :placeholder="$t('auth.passwordPlaceholder')" class="w-full" />
            </UFormField>
          </div>

          <button
            type="submit"
            class="w-full px-4 py-3 text-sm font-semibold text-white bg-orange-600 hover:bg-orange-700 rounded-xl transition-colors shadow-lg shadow-orange-600/20"
          >
            {{ $t('auth.registerButton') }}
          </button>
        </form>

        <!-- Login link -->
        <p class="text-center text-sm text-stone-500 mt-6">
          {{ $t('auth.hasAccount') }}
          <NuxtLink :to="localePath('/autentificare')" class="text-orange-600 font-semibold hover:text-orange-700">
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
const localePath = useLocalePath()
const { register } = useAuth()
const toast = useToast()

useHead({ title: `${t('auth.registerTitle')} — mesteri.md` })

const form = reactive({
  name: '',
  email: '',
  phone: '',
  city: '',
  password: '',
  role: 'client' as 'client' | 'provider'
})

const cities = ['Chișinău', 'Bălți', 'Cahul', 'Comrat', 'Orhei', 'Soroca', 'Ungheni']

function handleRegister() {
  if (!form.name || !form.email || !form.password) {
    toast.add({ title: t('auth.fillFields'), icon: 'i-heroicons-exclamation-triangle', color: 'warning' })
    return
  }
  const result = register({ ...form })
  if (!result.success) {
    toast.add({ title: t('auth.emailTaken'), icon: 'i-heroicons-exclamation-triangle', color: 'error' })
    return
  }
  toast.add({ title: t('auth.registerSuccess'), icon: 'i-heroicons-check-circle', color: 'success' })
  router.push(localePath('/'))
}
</script>
