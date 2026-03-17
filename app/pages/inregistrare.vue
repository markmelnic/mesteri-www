<template>
  <div class="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-12">
    <div class="w-full max-w-md">
      <div class="text-center mb-8">
        <NuxtLink to="/" class="text-3xl font-bold text-blue-600" style="font-family: 'Plus Jakarta Sans', sans-serif;">
          mesteri.md
        </NuxtLink>
        <p class="text-gray-500 mt-2">Creează un cont nou</p>
      </div>

      <div class="bg-white rounded-xl border border-gray-100 p-8 shadow-sm">
        <!-- Account type toggle -->
        <div class="flex rounded-lg bg-gray-100 p-1 mb-6">
          <button
            class="flex-1 py-2 text-sm font-medium rounded-md transition-all"
            :class="accountType === 'client' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'"
            @click="accountType = 'client'"
          >
            Caut un meșter
          </button>
          <button
            class="flex-1 py-2 text-sm font-medium rounded-md transition-all"
            :class="accountType === 'provider' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'"
            @click="accountType = 'provider'"
          >
            Sunt meșter
          </button>
        </div>

        <form class="space-y-4" @submit.prevent="handleRegister">
          <div class="grid grid-cols-2 gap-4">
            <UFormField label="Nume">
              <UInput v-model="form.lastName" placeholder="Nume" />
            </UFormField>
            <UFormField label="Prenume">
              <UInput v-model="form.firstName" placeholder="Prenume" />
            </UFormField>
          </div>

          <UFormField label="Email">
            <UInput v-model="form.email" type="email" placeholder="email@exemplu.md" />
          </UFormField>

          <UFormField label="Telefon">
            <UInput v-model="form.phone" placeholder="+373 ..." type="tel" />
          </UFormField>

          <template v-if="accountType === 'provider'">
            <UFormField label="Specialitate">
              <USelect v-model="form.specialty" :items="specialties" placeholder="Alege specialitatea" />
            </UFormField>
            <UFormField label="Oraș">
              <USelect v-model="form.city" :items="cities" placeholder="Alege orașul" />
            </UFormField>
            <UFormField label="Descriere scurtă">
              <UTextarea v-model="form.description" placeholder="Descrie experiența și serviciile tale..." :rows="3" />
            </UFormField>
          </template>

          <UFormField label="Parolă">
            <UInput v-model="form.password" type="password" placeholder="Minimum 6 caractere" />
          </UFormField>

          <UFormField label="Confirmă parola">
            <UInput v-model="form.confirmPassword" type="password" placeholder="Repetă parola" />
          </UFormField>

          <label class="flex items-start gap-2 text-sm text-gray-600">
            <input v-model="form.terms" type="checkbox" class="rounded border-gray-300 text-blue-600 mt-0.5" />
            <span>Accept <NuxtLink to="/termeni" class="text-blue-600 hover:underline">termenii și condițiile</NuxtLink></span>
          </label>

          <UButton type="submit" color="primary" block size="lg">
            Creează cont
          </UButton>
        </form>

        <p class="text-center text-sm text-gray-500 mt-6">
          Ai deja cont?
          <NuxtLink to="/autentificare" class="text-blue-600 font-medium hover:text-blue-700">Autentifică-te →</NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default' })
useHead({ title: 'Înregistrare — mesteri.md' })

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
    toast.add({ title: 'Trebuie să accepți termenii și condițiile', icon: 'i-heroicons-exclamation-circle', color: 'error' })
    return
  }
  if (form.password !== form.confirmPassword) {
    toast.add({ title: 'Parolele nu coincid', icon: 'i-heroicons-exclamation-circle', color: 'error' })
    return
  }
  toast.add({ title: 'Cont creat cu succes!', description: 'Te poți autentifica acum.', icon: 'i-heroicons-check-circle', color: 'success' })
  router.push('/autentificare')
}
</script>
