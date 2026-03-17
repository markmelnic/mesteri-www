<template>
  <div class="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-12">
    <div class="w-full max-w-md">
      <div class="text-center mb-8">
        <NuxtLink to="/" class="inline-block">
          <SharedAppLogo :width="200" :height="44" />
        </NuxtLink>
        <p class="text-gray-500 mt-2">{{ $t('auth.loginSubtitle') }}</p>
      </div>

      <div class="bg-white rounded-xl border border-gray-100 p-8 shadow-sm">
        <form class="space-y-5" @submit.prevent="handleLogin">
          <UFormField :label="$t('auth.emailLabel')">
            <UInput v-model="email" type="email" :placeholder="$t('contact.emailPlaceholder')" size="lg" icon="i-heroicons-envelope" />
          </UFormField>
          <UFormField :label="$t('auth.passwordLabel')">
            <UInput v-model="password" type="password" :placeholder="$t('auth.passwordPlaceholder')" size="lg" icon="i-heroicons-lock-closed" />
          </UFormField>

          <div class="flex items-center justify-between">
            <label class="flex items-center gap-2 text-sm text-gray-600">
              <input type="checkbox" class="rounded border-gray-300 text-blue-600" />
              {{ $t('auth.rememberMe') }}
            </label>
            <a href="#" class="text-sm text-blue-600 hover:text-blue-700">{{ $t('auth.forgotPassword') }}</a>
          </div>

          <UButton type="submit" color="primary" block size="lg" :loading="loading">
            {{ $t('auth.loginButton') }}
          </UButton>
        </form>

        <div class="relative my-6">
          <div class="absolute inset-0 flex items-center"><div class="w-full border-t border-gray-200" /></div>
          <div class="relative flex justify-center"><span class="px-3 bg-white text-sm text-gray-400">{{ $t('auth.or') }}</span></div>
        </div>

        <div class="space-y-3">
          <UButton variant="outline" color="neutral" block size="lg" icon="i-lucide-chrome" disabled>
            {{ $t('auth.continueGoogle') }}
          </UButton>
          <UButton variant="outline" color="neutral" block size="lg" icon="i-lucide-facebook" disabled>
            {{ $t('auth.continueFacebook') }}
          </UButton>
        </div>

        <p class="text-center text-sm text-gray-500 mt-6">
          {{ $t('auth.noAccount') }}
          <NuxtLink to="/inregistrare" class="text-blue-600 font-medium hover:text-blue-700">{{ $t('auth.registerLink') }}</NuxtLink>
        </p>
      </div>

      <!-- Demo credentials hint -->
      <div class="mt-4 p-4 bg-blue-50 rounded-xl text-sm text-blue-700">
        <p class="font-medium mb-1">{{ $t('auth.demoAccounts') }}</p>
        <p>{{ $t('auth.demoClient') }}</p>
        <p>{{ $t('auth.demoProvider') }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
definePageMeta({ layout: 'default' })
useHead({ title: t('auth.loginTitle') })

const { login, isProvider } = useAuth()
const router = useRouter()
const toast = useToast()

const email = ref('')
const password = ref('')
const loading = ref(false)

async function handleLogin() {
  loading.value = true
  await new Promise(r => setTimeout(r, 300))

  const result = login(email.value, password.value)

  if (result.success) {
    toast.add({ title: t('auth.loginSuccess'), icon: 'i-heroicons-check-circle', color: 'success' })
    router.push(isProvider.value ? '/cont-mester/profil' : '/cont/profil')
  } else {
    toast.add({ title: result.error!, icon: 'i-heroicons-exclamation-circle', color: 'error' })
  }

  loading.value = false
}
</script>
