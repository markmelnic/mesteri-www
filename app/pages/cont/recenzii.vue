<template>
  <div>
    <h1 class="text-2xl font-bold text-white tracking-tight mb-8">{{ $t('clientReviews.title') }}</h1>

    <div v-if="myReviews.length > 0" class="space-y-4">
      <div v-for="review in myReviews" :key="review.id" class="p-6 rounded-xl bg-[#141416] border border-white/[0.06]">
        <div class="flex items-start justify-between mb-3">
          <div>
            <p class="font-semibold text-white">{{ getProviderName(review.providerId) }}</p>
            <SharedRatingStars :rating="review.rating" class="mt-1" />
          </div>
          <div class="flex items-center gap-3">
            <span class="text-sm text-[#63636E]">{{ formatDate(review.date) }}</span>
            <UButton variant="ghost" size="xs" icon="i-heroicons-pencil-square" class="text-[#0D9373]">{{ $t('clientReviews.editReview') }}</UButton>
          </div>
        </div>
        <p class="text-sm text-[#A1A1AA] leading-relaxed">{{ review.text }}</p>
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
