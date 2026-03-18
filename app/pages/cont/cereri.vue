<template>
  <div>
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-2xl font-bold text-white tracking-tight">{{ $t('clientRequests.title') }}</h1>
      <NuxtLink to="/cerere-noua" class="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-[#0D9373] hover:bg-[#0FAA84] rounded-lg transition-colors duration-150">
        <UIcon name="i-heroicons-plus" class="w-4 h-4" />
        {{ $t('clientRequests.newRequest') }}
      </NuxtLink>
    </div>

    <div v-if="myRequests.length > 0" class="space-y-4">
      <div
        v-for="req in myRequests"
        :key="req.id"
        class="p-6 rounded-xl bg-[#141416] border border-white/[0.06] hover:border-white/[0.12] transition-all duration-150"
      >
        <div class="flex items-start justify-between mb-3">
          <div>
            <h3 class="font-semibold text-white">{{ req.title }}</h3>
            <p class="text-sm text-[#A1A1AA] mt-1">{{ req.description }}</p>
          </div>
          <UBadge :color="statusColor(req.status)" variant="subtle" class="flex-shrink-0">
            {{ statusLabel(req.status) }}
          </UBadge>
        </div>
        <div class="flex flex-wrap items-center gap-4 text-sm text-[#A1A1AA]">
          <span class="flex items-center gap-1.5">
            <UIcon name="i-heroicons-tag" class="w-4 h-4 text-[#63636E]" />
            {{ getCategoryName(req.category) }}
          </span>
          <span class="flex items-center gap-1.5">
            <UIcon name="i-heroicons-map-pin" class="w-4 h-4 text-[#63636E]" />
            {{ req.city }}
          </span>
          <span class="flex items-center gap-1.5">
            <UIcon name="i-heroicons-calendar" class="w-4 h-4 text-[#63636E]" />
            {{ formatDate(req.createdAt) }}
          </span>
        </div>

        <div v-if="req.offers.length > 0" class="mt-5 pt-5 border-t border-white/[0.06]">
          <p class="text-sm font-semibold text-white mb-3">{{ req.offers.length }} {{ $t('clientRequests.offersReceived') }}</p>
          <div class="space-y-2">
            <div v-for="offer in req.offers" :key="offer.id" class="flex items-center justify-between p-3 bg-white/[0.02] rounded-lg border border-white/[0.04]">
              <div>
                <p class="text-sm font-medium text-white">{{ offer.providerName }}</p>
                <p class="text-xs text-[#A1A1AA]">{{ offer.message }}</p>
              </div>
              <div class="text-right">
                <p class="font-bold text-white">{{ offer.price }} MDL</p>
                <p class="text-xs text-[#63636E]">~{{ offer.estimatedDays }} {{ $t('clientRequests.days') }}</p>
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
