<template>
  <div>
    <h1 class="text-2xl font-bold text-gray-900 mb-6" style="font-family: 'Plus Jakarta Sans', sans-serif;">Profilul meu</h1>

    <div class="bg-white rounded-xl border border-gray-100 p-6 shadow-sm max-w-2xl">
      <div class="flex items-center gap-4 mb-6">
        <UAvatar :src="user?.avatar" :alt="user?.name" size="3xl" />
        <div>
          <p class="font-semibold text-gray-900">{{ user?.name }}</p>
          <p class="text-sm text-gray-500">{{ user?.email }}</p>
        </div>
      </div>

      <form class="space-y-4" @submit.prevent="saveProfile">
        <UFormField label="Nume complet">
          <UInput v-model="form.name" />
        </UFormField>
        <UFormField label="Email">
          <UInput v-model="form.email" type="email" />
        </UFormField>
        <UFormField label="Telefon">
          <UInput v-model="form.phone" type="tel" />
        </UFormField>
        <UFormField label="Oraș">
          <USelect v-model="form.city" :items="cities" />
        </UFormField>
        <UButton type="submit" color="primary">Salvează modificările</UButton>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'dashboard', middleware: ['role'] })
useHead({ title: 'Profil — mesteri.md' })

const { user } = useAuth()
const toast = useToast()

const form = reactive({
  name: user.value?.name || '',
  email: user.value?.email || '',
  phone: user.value?.phone || '',
  city: user.value?.city || ''
})

const cities = ['Chișinău', 'Bălți', 'Cahul', 'Comrat', 'Orhei', 'Soroca', 'Ungheni']

function saveProfile() {
  toast.add({ title: 'Profil actualizat!', icon: 'i-heroicons-check-circle', color: 'success' })
}
</script>
