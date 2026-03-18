<template>
  <div>
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-2xl font-bold text-white tracking-tight">{{ $t('providerDashboard.servicesTitle') }}</h1>
      <button class="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-[#0D9373] hover:bg-[#0FAA84] rounded-lg transition-colors duration-150" @click="modalOpen = true">
        <UIcon name="i-heroicons-plus" class="w-4 h-4" />
        {{ $t('providerDashboard.addService') }}
      </button>
    </div>

    <div v-if="services.length > 0" class="space-y-4">
      <div v-for="(service, i) in services" :key="i" class="p-6 rounded-xl bg-[#141416] border border-white/[0.06] hover:border-white/[0.12] transition-all duration-150">
        <div class="flex items-start justify-between">
          <div>
            <h3 class="font-semibold text-white">{{ service.name }}</h3>
            <p class="text-sm text-[#A1A1AA] mt-1">{{ service.description }}</p>
            <p class="text-sm font-semibold text-[#0D9373] mt-3">
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
          <h3 class="text-lg font-semibold text-white mb-6">{{ $t('providerDashboard.addServiceModal') }}</h3>
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
              <button type="submit" class="px-4 py-2 text-sm font-semibold text-white bg-[#0D9373] hover:bg-[#0FAA84] rounded-lg transition-colors duration-150">
                {{ $t('providerDashboard.add') }}
              </button>
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
