<template>
  <div class="max-w-4xl">
    <h1 class="font-display text-2xl font-bold text-stone-900 tracking-tight mb-8">{{ $t('clientReviews.title') }}</h1>

    <div v-if="myReviews.length > 0" class="space-y-4">
      <div v-for="review in myReviews" :key="review.id" class="p-6 rounded-2xl bg-white border border-stone-200">
        <div class="flex items-start justify-between gap-3 mb-3">
          <div>
            <NuxtLink :to="localePath(`/mesteri/${review.providerId}`)" class="font-display font-semibold text-stone-900 hover:text-orange-700 transition-colors">
              {{ getProviderName(review.providerId) }}
            </NuxtLink>
            <SharedRatingStars :rating="review.rating" class="mt-1" />
          </div>
          <span class="text-sm text-stone-400 shrink-0">{{ formatDate(review.date) }}</span>
        </div>
        <p class="text-sm text-stone-600 leading-relaxed">{{ review.text }}</p>
      </div>
    </div>

    <SharedEmptyState
      v-else
      icon="i-heroicons-star"
      :title="$t('clientReviews.noReviews')"
      :description="$t('clientReviews.noReviewsDesc')"
    />
  </div>
</template>

<script setup lang="ts">
import { reviews } from '~/data/reviews'
import { providers } from '~/data/providers'

const { t, locale } = useI18n()
const localePath = useLocalePath()
definePageMeta({ layout: 'dashboard', middleware: ['role'] })
useHead({ title: t('clientReviews.pageTitle') })

const myReviews = reviews.slice(0, 3)

function getProviderName(providerId: string) {
  return providers.find(p => p.id === providerId)?.name || t('dashboard.provider')
}

function formatDate(date: string) {
  const loc = locale.value === 'ru' ? 'ru-RU' : locale.value === 'en' ? 'en-US' : 'ro-RO'
  return new Date(date).toLocaleDateString(loc, { day: 'numeric', month: 'long', year: 'numeric' })
}
</script>
