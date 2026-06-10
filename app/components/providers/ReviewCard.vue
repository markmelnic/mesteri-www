<template>
  <div class="space-y-3">
    <div class="flex items-start gap-3">
      <img
        :src="review.reviewerAvatar"
        :alt="review.reviewerName"
        class="w-10 h-10 rounded-full object-cover shrink-0"
        loading="lazy"
      />
      <div class="flex-1 min-w-0">
        <div class="flex items-center justify-between gap-2">
          <p class="font-semibold text-sm text-stone-900">{{ review.reviewerName }}</p>
          <span class="text-xs text-stone-400 shrink-0">{{ formattedDate }}</span>
        </div>
        <SharedRatingStars :rating="review.rating" class="mt-0.5" />
      </div>
    </div>
    <p class="text-sm text-stone-600 leading-relaxed">{{ review.text }}</p>
    <div v-if="review.reply" class="ml-6 p-3 rounded-xl bg-stone-50 border border-stone-100">
      <p class="text-xs font-semibold text-orange-700 mb-1 flex items-center gap-1">
        <UIcon name="i-heroicons-arrow-uturn-left" class="w-3 h-3" />
        {{ $t('reviews.providerReply') }}
      </p>
      <p class="text-sm text-stone-600">{{ review.reply }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Review } from '~/data/reviews'

const props = defineProps<{
  review: Review
}>()

const { locale } = useI18n()

const formattedDate = computed(() => {
  const loc = locale.value === 'ru' ? 'ru-RU' : locale.value === 'en' ? 'en-US' : 'ro-RO'
  return new Date(props.review.date).toLocaleDateString(loc, { day: 'numeric', month: 'long', year: 'numeric' })
})
</script>
