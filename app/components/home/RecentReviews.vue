<template>
  <section class="relative py-20 lg:py-28 overflow-hidden bg-gray-50/50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section header -->
      <div class="text-center max-w-2xl mx-auto mb-14">
        <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-600 text-xs font-semibold uppercase tracking-wider mb-4">
          <UIcon name="i-heroicons-star-solid" class="w-3.5 h-3.5" />
          {{ $t('reviews.badge') || 'Recenzii' }}
        </span>
        <h2 class="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
          {{ $t('reviews.title') }}
        </h2>
        <p class="text-lg text-gray-500 leading-relaxed">
          {{ $t('reviews.subtitle') || 'Ce spun clientii nostri despre mesteri.' }}
        </p>
      </div>

      <!-- Review cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          v-for="(review, i) in topReviews"
          :key="review.id"
          class="animate-fade-up"
          :style="{ animationDelay: `${i * 0.1}s` }"
        >
          <div class="h-full p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
            <!-- Stars -->
            <div class="flex items-center gap-1 mb-4">
              <UIcon v-for="s in 5" :key="s" name="i-heroicons-star-solid" class="w-4 h-4 text-amber-400" />
            </div>

            <!-- Quote -->
            <p class="text-gray-600 leading-relaxed mb-6 text-sm">
              "{{ review.text }}"
            </p>

            <!-- Author -->
            <div class="flex items-center gap-3 pt-4 border-t border-gray-100">
              <img
                :src="review.reviewerAvatar"
                :alt="review.reviewerName"
                class="w-10 h-10 rounded-full object-cover ring-2 ring-gray-100"
              />
              <div>
                <p class="text-sm font-semibold text-gray-900">{{ review.reviewerName }}</p>
                <p class="text-xs text-gray-500">{{ getCategoryName(review.category) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { reviews } from '~/data/reviews'
import { categories } from '~/data/categories'

const topReviews = reviews.filter(r => r.rating === 5).slice(0, 3)

function getCategoryName(slug: string) {
  return categories.find(c => c.slug === slug)?.name || slug
}
</script>
