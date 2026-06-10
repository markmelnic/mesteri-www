<template>
  <div class="max-w-4xl">
    <div class="flex items-center justify-between mb-8">
      <h1 class="font-display text-2xl font-bold text-stone-900 tracking-tight">{{ $t('providerDashboard.servicesTitle') }}</h1>
      <button
        type="button"
        class="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-orange-600 hover:bg-orange-700 rounded-xl transition-colors"
        @click="modalOpen = true"
      >
        <UIcon name="i-heroicons-plus" class="w-4 h-4" />
        {{ $t('providerDashboard.addService') }}
      </button>
    </div>

    <div v-if="services.length > 0" class="space-y-4">
      <div v-for="(service, i) in services" :key="i" class="p-6 rounded-2xl bg-white border border-stone-200 hover:border-stone-300 transition-colors">
        <div class="flex items-start justify-between gap-3">
          <div>
            <h3 class="font-display font-semibold text-stone-900">{{ service.name }}</h3>
            <p class="text-sm text-stone-500 mt-1">{{ service.description }}</p>
            <p class="text-sm font-bold text-stone-900 mt-3">
              {{ service.priceFrom }}<template v-if="service.priceTo">–{{ service.priceTo }}</template> {{ service.currency }}
            </p>
          </div>
          <div class="flex items-center gap-2 shrink-0">
            <UBadge color="success" variant="subtle">{{ $t('providerDashboard.active') }}</UBadge>
            <button
              type="button"
              class="w-8 h-8 rounded-lg flex items-center justify-center text-stone-400 hover:text-red-500 hover:bg-red-50 transition-colors"
              :aria-label="$t('providerDashboard.cancel')"
              @click="removeService(i)"
            >
              <UIcon name="i-heroicons-trash" class="w-4 h-4" />
            </button>
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
        <div class="p-6 bg-white rounded-xl">
          <h3 class="font-display text-lg font-semibold text-stone-900 mb-6">{{ $t('providerDashboard.addServiceModal') }}</h3>
          <form class="space-y-4" @submit.prevent="addService">
            <UFormField :label="$t('providerDashboard.serviceName')">
              <UInput v-model="newService.name" :placeholder="$t('providerDashboard.serviceNamePlaceholder')" class="w-full" />
            </UFormField>
            <UFormField :label="$t('providerDashboard.description')">
              <UTextarea v-model="newService.description" :placeholder="$t('providerDashboard.descriptionPlaceholder')" :rows="3" class="w-full" />
            </UFormField>
            <div class="grid grid-cols-2 gap-4">
              <UFormField :label="$t('providerDashboard.priceFrom')">
                <UInput v-model.number="newService.priceFrom" type="number" :min="0" class="w-full" />
              </UFormField>
              <UFormField :label="$t('providerDashboard.priceTo')">
                <UInput v-model.number="newService.priceTo" type="number" :min="0" class="w-full" />
              </UFormField>
            </div>
            <div class="flex justify-end gap-3 pt-2">
              <button type="button" class="px-4 py-2 text-sm font-medium text-stone-600 hover:bg-stone-100 rounded-xl transition-colors" @click="modalOpen = false">
                {{ $t('providerDashboard.cancel') }}
              </button>
              <button type="submit" class="px-4 py-2 text-sm font-semibold text-white bg-orange-600 hover:bg-orange-700 rounded-xl transition-colors">
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
  if (!newService.name) return
  services.value.push({
    name: newService.name,
    description: newService.description,
    priceFrom: newService.priceFrom,
    priceTo: newService.priceTo || undefined,
    currency: 'MDL'
  })
  modalOpen.value = false
  Object.assign(newService, { name: '', description: '', priceFrom: 0, priceTo: 0 })
  toast.add({ title: t('providerDashboard.serviceAdded'), icon: 'i-heroicons-check-circle', color: 'success' })
}

function removeService(index: number) {
  services.value.splice(index, 1)
}
</script>
