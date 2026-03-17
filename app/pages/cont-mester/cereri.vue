<template>
  <div>
    <h1 class="text-2xl font-bold text-gray-900 mb-6">{{ $t('providerDashboard.requestsTitle') }}</h1>

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
          <UButton color="primary" size="sm" @click="sendOffer(req)">{{ $t('providerDashboard.sendOffer') }}</UButton>
          <UButton variant="ghost" color="neutral" size="sm">{{ $t('providerDashboard.decline') }}</UButton>
        </div>
      </div>
    </div>

    <SharedEmptyState
      v-else
      icon="i-heroicons-inbox"
      :title="$t('providerDashboard.noRequests')"
      :description="$t('providerDashboard.noRequestsDesc')"
    />
  </div>
</template>

<script setup lang="ts">
import { serviceRequests } from '~/data/requests'

const { t, locale } = useI18n()
definePageMeta({ layout: 'dashboard', middleware: ['role'] })
useHead({ title: t('providerDashboard.requestsPageTitle') })

const toast = useToast()

const incomingRequests = serviceRequests.filter(r => r.status === 'new' || r.status === 'offers_received')

function urgencyLabel(urgency: string) {
  const map: Record<string, string> = {
    urgent: t('providerDashboard.urgentLabel'),
    this_week: t('providerDashboard.thisWeekLabel'),
    flexible: t('providerDashboard.flexibleLabel')
  }
  return map[urgency] || urgency
}

function formatDate(date: string) {
  const loc = locale.value === 'ru' ? 'ru-RU' : locale.value === 'en' ? 'en-US' : 'ro-RO'
  return new Date(date).toLocaleDateString(loc, { day: 'numeric', month: 'long', year: 'numeric' })
}

function sendOffer(req: any) {
  toast.add({ title: t('providerDashboard.offerSent'), description: t('providerDashboard.offerSentDesc', { title: req.title }), icon: 'i-heroicons-check-circle', color: 'success' })
}
</script>
