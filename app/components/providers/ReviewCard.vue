<template>
  <div class="space-y-3">
    <div class="flex items-start gap-3">
      <img
        :src="review.reviewerAvatar"
        :alt="review.reviewerName"
        class="w-10 h-10 rounded-full object-cover ring-2 ring-gray-100 flex-shrink-0"
      />
      <div class="flex-1 min-w-0">
        <div class="flex items-center justify-between gap-2">
          <p class="font-semibold text-sm text-gray-900">{{ review.reviewerName }}</p>
          <span class="text-xs text-gray-400 flex-shrink-0">{{ review.date }}</span>
        </div>
        <SharedRatingStars :rating="review.rating" class="mt-0.5" />
      </div>
    </div>
    <p class="text-sm text-gray-600 leading-relaxed">{{ review.text }}</p>
    <div v-if="review.reply" class="ml-6 pl-4 border-l-2 border-indigo-100">
      <p class="text-xs font-semibold text-indigo-600 mb-1">{{ $t('reviews.providerReply') || 'Raspunsul mesterului' }}</p>
      <p class="text-sm text-gray-500">{{ review.reply }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Review } from '~/data/reviews'

defineProps<{
  review: Review
}>()
</script>
