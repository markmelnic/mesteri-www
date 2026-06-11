<template>
  <div class="max-w-4xl">
    <h1 class="font-display text-2xl font-bold text-stone-900 tracking-tight mb-8">{{ $t('providerDashboard.requestsTitle') }}</h1>

    <div v-if="incomingRequests.length > 0" class="space-y-4">
      <div v-for="req in incomingRequests" :key="req.id" class="p-6 rounded-2xl bg-white border border-stone-200 hover:border-stone-300 transition-colors">
        <div class="flex items-start justify-between gap-3 mb-3">
          <div>
            <h3 class="font-display font-semibold text-stone-900">{{ req.title }}</h3>
            <p class="text-sm text-stone-500 mt-1">{{ req.description }}</p>
          </div>
          <UBadge :color="req.urgency === 'urgent' ? 'error' : req.urgency === 'this_week' ? 'warning' : 'info'" variant="subtle" class="shrink-0">
            {{ urgencyLabel(req.urgency) }}
          </UBadge>
        </div>
        <div class="flex flex-wrap items-center gap-4 text-sm text-stone-500 mb-5">
          <span class="flex items-center gap-1.5">
            <UIcon name="i-heroicons-map-pin" class="w-4 h-4 text-stone-400" />
            {{ req.city }}
          </span>
          <span class="flex items-center gap-1.5">
            <UIcon name="i-heroicons-calendar" class="w-4 h-4 text-stone-400" />
            {{ formatDate(req.createdAt) }}
          </span>
          <span v-if="req.budgetMin" class="flex items-center gap-1.5">
            <UIcon name="i-heroicons-banknotes" class="w-4 h-4 text-stone-400" />
            {{ req.budgetMin }}–{{ req.budgetMax }} MDL
          </span>
        </div>
        <div class="flex gap-3">
          <button
            type="button"
            class="px-4 py-2 text-sm font-semibold text-white bg-orange-600 hover:bg-orange-700 rounded-xl transition-colors"
            @click="sendOffer(req)"
          >
            {{ $t('providerDashboard.sendOffer') }}
          </button>
          <button type="button" class="px-4 py-2 text-sm font-medium text-stone-500 hover:bg-stone-100 rounded-xl transition-colors">
            {{ $t('providerDashboard.decline') }}
          </button>
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
import type { ServiceRequest } from '~/data/requests'

const { t, locale } = useI18n()
definePageMeta({ layout: 'dashboard', middleware: ['role'] })
useHead({ title: t('providerDashboard.requestsPageTitle') })

const toast = useToast()
const { requests } = useRequests()

const incomingRequests = computed(() =>
  requests.value.filter(r => r.status === 'new' || r.status === 'offers_received')
)

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

function sendOffer(req: ServiceRequest) {
  toast.add({
    title: t('providerDashboard.offerSent'),
    description: t('providerDashboard.offerSentDesc', { title: req.title }),
    icon: 'i-heroicons-check-circle',
    color: 'success'
  })
}
</script>
