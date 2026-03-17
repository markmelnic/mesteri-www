<template>
  <div>
    <h1 class="text-2xl font-bold text-gray-900 mb-6" style="font-family: 'Plus Jakarta Sans', sans-serif;">Cereri primite</h1>

    <div v-if="incomingRequests.length > 0" class="space-y-4">
      <div v-for="req in incomingRequests" :key="req.id" class="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
        <div class="flex items-start justify-between mb-3">
          <div>
            <h3 class="font-semibold text-gray-900">{{ req.title }}</h3>
            <p class="text-sm text-gray-500 mt-1">{{ req.description }}</p>
          </div>
          <UBadge :color="req.urgency === 'urgent' ? 'error' : req.urgency === 'this_week' ? 'warning' : 'info'" variant="subtle">
            {{ urgencyLabel(req.urgency) }}
          </UBadge>
        </div>
        <div class="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
          <span class="flex items-center gap-1">
            <UIcon name="i-heroicons-map-pin" class="w-4 h-4" />
            {{ req.city }}
          </span>
          <span class="flex items-center gap-1">
            <UIcon name="i-heroicons-calendar" class="w-4 h-4" />
            {{ formatDate(req.createdAt) }}
          </span>
          <span v-if="req.budgetMin" class="flex items-center gap-1">
            <UIcon name="i-heroicons-banknotes" class="w-4 h-4" />
            {{ req.budgetMin }} - {{ req.budgetMax }} MDL
          </span>
        </div>
        <div class="flex gap-3">
          <UButton color="primary" size="sm" @click="sendOffer(req)">Trimite ofertă</UButton>
          <UButton variant="ghost" color="neutral" size="sm">Refuză</UButton>
        </div>
      </div>
    </div>

    <SharedEmptyState
      v-else
      icon="i-heroicons-inbox"
      title="Nicio cerere nouă"
      description="Cererile de la clienți din categoriile tale vor apărea aici."
    />
  </div>
</template>

<script setup lang="ts">
import { serviceRequests } from '~/data/requests'

definePageMeta({ layout: 'dashboard', middleware: ['role'] })
useHead({ title: 'Cereri primite — mesteri.md' })

const toast = useToast()

// Show all requests as potential leads
const incomingRequests = serviceRequests.filter(r => r.status === 'new' || r.status === 'offers_received')

function urgencyLabel(urgency: string) {
  const map: Record<string, string> = { urgent: 'Urgent', this_week: 'Săptămâna aceasta', flexible: 'Flexibil' }
  return map[urgency] || urgency
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('ro-RO', { day: 'numeric', month: 'long', year: 'numeric' })
}

function sendOffer(req: any) {
  toast.add({ title: 'Ofertă trimisă!', description: `Oferta ta pentru "${req.title}" a fost trimisă clientului.`, icon: 'i-heroicons-check-circle', color: 'success' })
}
</script>
