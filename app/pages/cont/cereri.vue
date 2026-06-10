<template>
  <div class="max-w-4xl">
    <div class="flex items-center justify-between mb-8">
      <h1 class="font-display text-2xl font-bold text-stone-900 tracking-tight">{{ $t('clientRequests.title') }}</h1>
      <NuxtLink :to="localePath('/cerere-noua')" class="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-orange-600 hover:bg-orange-700 rounded-xl transition-colors">
        <UIcon name="i-heroicons-plus" class="w-4 h-4" />
        {{ $t('clientRequests.newRequest') }}
      </NuxtLink>
    </div>

    <div v-if="myRequests.length > 0" class="space-y-4">
      <div
        v-for="req in myRequests"
        :key="req.id"
        class="p-6 rounded-2xl bg-white border border-stone-200 hover:border-stone-300 transition-colors"
      >
        <div class="flex items-start justify-between gap-3 mb-3">
          <div>
            <h3 class="font-display font-semibold text-stone-900">{{ req.title }}</h3>
            <p class="text-sm text-stone-500 mt-1">{{ req.description }}</p>
          </div>
          <UBadge :color="statusColor(req.status)" variant="subtle" class="shrink-0">
            {{ statusLabel(req.status) }}
          </UBadge>
        </div>
        <div class="flex flex-wrap items-center gap-4 text-sm text-stone-500">
          <span class="flex items-center gap-1.5">
            <UIcon name="i-heroicons-tag" class="w-4 h-4 text-stone-400" />
            {{ getCategoryName(req.category) }}
          </span>
          <span class="flex items-center gap-1.5">
            <UIcon name="i-heroicons-map-pin" class="w-4 h-4 text-stone-400" />
            {{ req.city }}
          </span>
          <span class="flex items-center gap-1.5">
            <UIcon name="i-heroicons-calendar" class="w-4 h-4 text-stone-400" />
            {{ formatDate(req.createdAt) }}
          </span>
        </div>

        <div v-if="req.offers.length > 0" class="mt-5 pt-5 border-t border-stone-100">
          <p class="text-sm font-semibold text-stone-900 mb-3">
            {{ req.offers.length }} {{ $t('clientRequests.offersReceived') }}
          </p>
          <div class="space-y-2">
            <div v-for="offer in req.offers" :key="offer.id" class="flex items-center justify-between gap-3 p-3.5 bg-stone-50 rounded-xl border border-stone-100">
              <div class="min-w-0">
                <p class="text-sm font-semibold text-stone-900">{{ offer.providerName }}</p>
                <p class="text-xs text-stone-500 mt-0.5">{{ offer.message }}</p>
              </div>
              <div class="text-right shrink-0">
                <p class="font-bold text-stone-900">{{ offer.price }} MDL</p>
                <p class="text-xs text-stone-400">~{{ offer.estimatedDays }} {{ $t('clientRequests.days') }}</p>
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
const localePath = useLocalePath()
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

function statusColor(status: string): 'info' | 'warning' | 'primary' | 'success' | 'neutral' {
  const map: Record<string, 'info' | 'warning' | 'primary' | 'success'> = {
    new: 'info',
    offers_received: 'warning',
    in_progress: 'primary',
    completed: 'success'
  }
  return map[status] || 'neutral'
}

function formatDate(date: string) {
  const loc = locale.value === 'ru' ? 'ru-RU' : locale.value === 'en' ? 'en-US' : 'ro-RO'
  return new Date(date).toLocaleDateString(loc, { day: 'numeric', month: 'long', year: 'numeric' })
}
</script>
