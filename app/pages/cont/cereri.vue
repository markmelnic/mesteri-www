<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold text-gray-900">{{ $t('clientRequests.title') }}</h1>
      <UButton to="/cerere-noua" color="primary" icon="i-heroicons-plus">{{ $t('clientRequests.newRequest') }}</UButton>
    </div>

    <div v-if="myRequests.length > 0" class="space-y-4">
      <div
        v-for="req in myRequests"
        :key="req.id"
        class="bg-white rounded-xl border border-gray-100 p-6 shadow-sm"
      >
        <div class="flex items-start justify-between mb-3">
          <div>
            <h3 class="font-semibold text-gray-900">{{ req.title }}</h3>
            <p class="text-sm text-gray-500 mt-1">{{ req.description }}</p>
          </div>
          <UBadge :color="statusColor(req.status)" variant="subtle">
            {{ statusLabel(req.status) }}
          </UBadge>
        </div>
        <div class="flex flex-wrap items-center gap-4 text-sm text-gray-500">
          <span class="flex items-center gap-1">
            <UIcon name="i-heroicons-tag" class="w-4 h-4" />
            {{ getCategoryName(req.category) }}
          </span>
          <span class="flex items-center gap-1">
            <UIcon name="i-heroicons-map-pin" class="w-4 h-4" />
            {{ req.city }}
          </span>
          <span class="flex items-center gap-1">
            <UIcon name="i-heroicons-calendar" class="w-4 h-4" />
            {{ formatDate(req.createdAt) }}
          </span>
        </div>

        <!-- Offers -->
        <div v-if="req.offers.length > 0" class="mt-4 pt-4 border-t border-gray-100">
          <p class="text-sm font-medium text-gray-700 mb-3">{{ req.offers.length }} {{ $t('clientRequests.offersReceived') }}</p>
          <div class="space-y-2">
            <div v-for="offer in req.offers" :key="offer.id" class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p class="text-sm font-medium text-gray-900">{{ offer.providerName }}</p>
                <p class="text-xs text-gray-500">{{ offer.message }}</p>
              </div>
              <div class="text-right">
                <p class="font-semibold text-gray-900">{{ offer.price }} MDL</p>
                <p class="text-xs text-gray-500">~{{ offer.estimatedDays }} {{ $t('clientRequests.days') }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <SharedEmptyState
      v-else
      icon="i-heroicons-clipboard-document-list"
      :title="$t('clientRequests.noRequests')"
      :description="$t('clientRequests.noRequestsDesc')"
      :action-label="$t('clientRequests.newRequest')"
      action-to="/cerere-noua"
    />
  </div>
</template>

<script setup lang="ts">
import { categories } from '~/data/categories'

const { t, locale } = useI18n()
definePageMeta({ layout: 'dashboard', middleware: ['role'] })
useHead({ title: t('clientRequests.pageTitle') })

const { user } = useAuth()
const { getMyRequests } = useRequests()

const myRequests = getMyRequests(user.value!.id)

function getCategoryName(slug: string) {
  return categories.find(c => c.slug === slug)?.name || slug
}

function statusLabel(status: string) {
  const map: Record<string, string> = {
    new: t('clientRequests.statusNew'),
    offers_received: t('clientRequests.statusOffers'),
    in_progress: t('clientRequests.statusInProgress'),
    completed: t('clientRequests.statusCompleted')
  }
  return map[status] || status
}

function statusColor(status: string) {
  const map: Record<string, 'info' | 'warning' | 'primary' | 'success'> = {
    new: 'info',
    offers_received: 'warning',
    in_progress: 'primary',
    completed: 'success'
  }
  return map[status] || 'neutral' as any
}

function formatDate(date: string) {
  const loc = locale.value === 'ru' ? 'ru-RU' : locale.value === 'en' ? 'en-US' : 'ro-RO'
  return new Date(date).toLocaleDateString(loc, { day: 'numeric', month: 'long', year: 'numeric' })
}
</script>
