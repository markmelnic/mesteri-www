<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold text-gray-900" style="font-family: 'Plus Jakarta Sans', sans-serif;">Serviciile mele</h1>
      <UButton color="primary" icon="i-heroicons-plus" @click="modalOpen = true">Adaugă serviciu</UButton>
    </div>

    <div v-if="services.length > 0" class="space-y-4">
      <div v-for="(service, i) in services" :key="i" class="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
        <div class="flex items-start justify-between">
          <div>
            <h3 class="font-semibold text-gray-900">{{ service.name }}</h3>
            <p class="text-sm text-gray-500 mt-1">{{ service.description }}</p>
            <p class="text-sm font-medium text-gray-700 mt-2">
              {{ service.priceFrom }} - {{ service.priceTo || '...' }} {{ service.currency }}
            </p>
          </div>
          <div class="flex items-center gap-2">
            <UBadge color="success" variant="subtle">Activ</UBadge>
            <UButton variant="ghost" size="xs" icon="i-heroicons-pencil-square" />
            <UButton variant="ghost" size="xs" icon="i-heroicons-trash" color="error" />
          </div>
        </div>
      </div>
    </div>

    <SharedEmptyState
      v-else
      icon="i-heroicons-wrench-screwdriver"
      title="Nu ai servicii adăugate"
      description="Adaugă serviciile pe care le oferi pentru a fi vizibil pentru clienți."
    />

    <!-- Add Service Modal -->
    <UModal v-model:open="modalOpen">
      <template #content>
        <div class="p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Adaugă serviciu nou</h3>
          <form class="space-y-4" @submit.prevent="addService">
            <UFormField label="Nume serviciu">
              <UInput v-model="newService.name" placeholder="Ex: Montaj aer condiționat" />
            </UFormField>
            <UFormField label="Descriere">
              <UTextarea v-model="newService.description" placeholder="Descrie serviciul..." :rows="3" />
            </UFormField>
            <div class="grid grid-cols-2 gap-4">
              <UFormField label="Preț de la (MDL)">
                <UInput v-model.number="newService.priceFrom" type="number" />
              </UFormField>
              <UFormField label="Preț până la (MDL)">
                <UInput v-model.number="newService.priceTo" type="number" />
              </UFormField>
            </div>
            <div class="flex justify-end gap-3">
              <UButton variant="ghost" color="neutral" @click="modalOpen = false">Anulează</UButton>
              <UButton type="submit" color="primary">Adaugă</UButton>
            </div>
          </form>
        </div>
      </template>
    </UModal>
  </div>
</template>

<script setup lang="ts">
import { providers } from '~/data/providers'
import type { Service } from '~/data/providers'

definePageMeta({ layout: 'dashboard', middleware: ['role'] })
useHead({ title: 'Serviciile mele — mesteri.md' })

const { user } = useAuth()
const toast = useToast()

const provider = providers.find(p => p.id === user.value?.providerId)
const services = ref<Service[]>([...(provider?.services || [])])

const modalOpen = ref(false)
const newService = reactive({ name: '', description: '', priceFrom: 0, priceTo: 0 })

function addService() {
  services.value.push({
    name: newService.name,
    description: newService.description,
    priceFrom: newService.priceFrom,
    priceTo: newService.priceTo,
    currency: 'MDL'
  })
  modalOpen.value = false
  Object.assign(newService, { name: '', description: '', priceFrom: 0, priceTo: 0 })
  toast.add({ title: 'Serviciu adăugat!', icon: 'i-heroicons-check-circle', color: 'success' })
}
</script>
