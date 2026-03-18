<template>
  <div>
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-2xl font-extrabold text-gray-900 tracking-tight">{{ $t('providerDashboard.servicesTitle') }}</h1>
      <UButton color="primary" icon="i-heroicons-plus" class="font-semibold bg-indigo-600 hover:bg-indigo-700" @click="modalOpen = true">{{ $t('providerDashboard.addService') }}</UButton>
    </div>

    <div v-if="services.length > 0" class="space-y-4">
      <div v-for="(service, i) in services" :key="i" class="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
        <div class="flex items-start justify-between">
          <div>
            <h3 class="font-bold text-gray-900">{{ service.name }}</h3>
            <p class="text-sm text-gray-500 mt-1">{{ service.description }}</p>
            <p class="text-sm font-semibold text-indigo-600 mt-3">
              {{ service.priceFrom }} - {{ service.priceTo || '...' }} {{ service.currency }}
            </p>
          </div>
          <div class="flex items-center gap-2 flex-shrink-0">
            <UBadge color="success" variant="subtle">{{ $t('providerDashboard.active') }}</UBadge>
            <UButton variant="ghost" size="xs" icon="i-heroicons-pencil-square" />
            <UButton variant="ghost" size="xs" icon="i-heroicons-trash" color="error" />
          </div>
        </div>
      </div>
    </div>

    <SharedEmptyState
      v-else
      icon="i-heroicons-wrench-screwdriver"
      :title="$t('providerDashboard.noServices')"
      :description="$t('providerDashboard.noServicesDesc')"
    />

    <UModal v-model:open="modalOpen">
      <template #content>
        <div class="p-6">
          <h3 class="text-lg font-bold text-gray-900 mb-6">{{ $t('providerDashboard.addServiceModal') }}</h3>
          <form class="space-y-4" @submit.prevent="addService">
            <UFormField :label="$t('providerDashboard.serviceName')">
              <UInput v-model="newService.name" :placeholder="$t('providerDashboard.serviceNamePlaceholder')" />
            </UFormField>
            <UFormField :label="$t('providerDashboard.description')">
              <UTextarea v-model="newService.description" :placeholder="$t('providerDashboard.descriptionPlaceholder')" :rows="3" />
            </UFormField>
            <div class="grid grid-cols-2 gap-4">
              <UFormField :label="$t('providerDashboard.priceFrom')">
                <UInput v-model.number="newService.priceFrom" type="number" />
              </UFormField>
              <UFormField :label="$t('providerDashboard.priceTo')">
                <UInput v-model.number="newService.priceTo" type="number" />
              </UFormField>
            </div>
            <div class="flex justify-end gap-3 pt-2">
              <UButton variant="ghost" color="neutral" @click="modalOpen = false">{{ $t('providerDashboard.cancel') }}</UButton>
              <UButton type="submit" color="primary" class="bg-indigo-600 hover:bg-indigo-700">{{ $t('providerDashboard.add') }}</UButton>
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

const { t } = useI18n()
definePageMeta({ layout: 'dashboard', middleware: ['role'] })
useHead({ title: t('providerDashboard.servicesPageTitle') })

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
  toast.add({ title: t('providerDashboard.serviceAdded'), icon: 'i-heroicons-check-circle', color: 'success' })
}
</script>
