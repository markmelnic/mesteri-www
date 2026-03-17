<template>
  <div class="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
    <div class="flex items-start gap-3 mb-3">
      <UAvatar :src="review.reviewerAvatar" :alt="review.reviewerName" size="sm" />
      <div class="flex-1 min-w-0">
        <div class="flex items-center justify-between">
          <p class="font-medium text-gray-900 text-sm">{{ review.reviewerName }}</p>
          <span class="text-xs text-gray-400">{{ formatDate(review.date) }}</span>
        </div>
        <SharedRatingStars :rating="review.rating" class="mt-0.5" />
      </div>
    </div>
    <p class="text-sm text-gray-600 leading-relaxed">{{ review.text }}</p>
    <div v-if="review.reply" class="mt-3 pl-4 border-l-2 border-blue-200">
      <p class="text-xs font-medium text-blue-600 mb-1">{{ $t('reviews.providerReply') }}</p>
      <p class="text-sm text-gray-600">{{ review.reply }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Review } from '~/data/reviews'

defineProps<{ review: Review }>()

const { locale } = useI18n()

function formatDate(date: string) {
  const loc = locale.value === 'ru' ? 'ru-RU' : locale.value === 'en' ? 'en-US' : 'ro-RO'
  return new Date(date).toLocaleDateString(loc, { day: 'numeric', month: 'long', year: 'numeric' })
}
</script>
