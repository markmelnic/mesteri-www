<template>
  <div class="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-12">
    <div class="w-full max-w-md">
      <div class="text-center mb-8">
        <NuxtLink to="/" class="inline-block">
          <SharedAppLogo :width="200" :height="44" />
        </NuxtLink>
        <p class="text-gray-500 mt-2">{{ $t('auth.registerSubtitle') }}</p>
      </div>

      <div class="bg-white rounded-xl border border-gray-100 p-8 shadow-sm">
        <!-- Account type toggle -->
        <div class="flex rounded-lg bg-gray-100 p-1 mb-6">
          <button
            class="flex-1 py-2 text-sm font-medium rounded-md transition-all"
            :class="accountType === 'client' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'"
            @click="accountType = 'client'"
          >
            {{ $t('auth.lookingForProvider') }}
          </button>
          <button
            class="flex-1 py-2 text-sm font-medium rounded-md transition-all"
            :class="accountType === 'provider' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'"
            @click="accountType = 'provider'"
          >
            {{ $t('auth.iAmProvider') }}
          </button>
        </div>

        <form class="space-y-4" @submit.prevent="handleRegister">
          <div class="grid grid-cols-2 gap-4">
            <UFormField :label="$t('auth.lastName')">
              <UInput v-model="form.lastName" :placeholder="$t('auth.lastNamePlaceholder')" />
            </UFormField>
            <UFormField :label="$t('auth.firstName')">
              <UInput v-model="form.firstName" :placeholder="$t('auth.firstNamePlaceholder')" />
            </UFormField>
          </div>

          <UFormField :label="$t('auth.emailLabel')">
            <UInput v-model="form.email" type="email" :placeholder="$t('contact.emailPlaceholder')" />
          </UFormField>

          <UFormField :label="$t('providerProfile.phone')">
            <UInput v-model="form.phone" :placeholder="$t('auth.phonePlaceholder')" type="tel" />
          </UFormField>

          <template v-if="accountType === 'provider'">
            <UFormField :label="$t('auth.specialty')">
              <USelect v-model="form.specialty" :items="specialties" :placeholder="$t('auth.specialtyPlaceholder')" />
            </UFormField>
            <UFormField :label="$t('auth.city')">
              <USelect v-model="form.city" :items="cities" :placeholder="$t('auth.cityPlaceholder')" />
            </UFormField>
            <UFormField :label="$t('auth.shortDescription')">
              <UTextarea v-model="form.description" :placeholder="$t('auth.descriptionPlaceholder')" :rows="3" />
            </UFormField>
          </template>

          <UFormField :label="$t('auth.passwordField')">
            <UInput v-model="form.password" type="password" :placeholder="$t('auth.passwordMinChars')" />
          </UFormField>

          <UFormField :label="$t('auth.confirmPassword')">
            <UInput v-model="form.confirmPassword" type="password" :placeholder="$t('auth.repeatPassword')" />
          </UFormField>

          <label class="flex items-start gap-2 text-sm text-gray-600">
            <input v-model="form.terms" type="checkbox" class="rounded border-gray-300 text-blue-600 mt-0.5" />
            <span>{{ $t('auth.acceptTerms') }} <NuxtLink to="/termeni" class="text-blue-600 hover:underline">{{ $t('auth.termsLink') }}</NuxtLink></span>
          </label>

          <UButton type="submit" color="primary" block size="lg">
            {{ $t('auth.createAccount') }}
          </UButton>
        </form>

        <p class="text-center text-sm text-gray-500 mt-6">
          {{ $t('auth.hasAccount') }}
          <NuxtLink to="/autentificare" class="text-blue-600 font-medium hover:text-blue-700">{{ $t('auth.loginLink') }}</NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
definePageMeta({ layout: 'default' })
useHead({ title: t('auth.registerTitle') })

const router = useRouter()
const toast = useToast()

const accountType = ref<'client' | 'provider'>('client')
const form = reactive({
  firstName: '', lastName: '', email: '', phone: '',
  specialty: '', city: '', description: '',
  password: '', confirmPassword: '', terms: false
})

const specialties = [
  'Instalator sanitar', 'Electrician', 'Constructor', 'Zugrav',
  'Designer interior', 'Specialist HVAC', 'Grădinar', 'Montator mobilier',
  'Specialist securitate', 'Reparații electrocasnice', 'Transport & Mutări'
]

const cities = ['Chișinău', 'Bălți', 'Cahul', 'Comrat', 'Orhei', 'Soroca', 'Ungheni', 'Edineț', 'Hîncești', 'Strășeni']

function handleRegister() {
  if (!form.terms) {
    toast.add({ title: t('auth.mustAcceptTerms'), icon: 'i-heroicons-exclamation-circle', color: 'error' })
    return
  }
  if (form.password !== form.confirmPassword) {
    toast.add({ title: t('auth.passwordsMismatch'), icon: 'i-heroicons-exclamation-circle', color: 'error' })
    return
  }
  toast.add({ title: t('auth.accountCreated'), description: t('auth.accountCreatedDesc'), icon: 'i-heroicons-check-circle', color: 'success' })
  router.push('/autentificare')
}
</script>
