<template>
  <section class="py-20 lg:py-28 bg-stone-50 border-y border-stone-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section header -->
      <div class="text-center max-w-2xl mx-auto mb-14">
        <p class="text-sm font-semibold text-orange-600 uppercase tracking-wider mb-3">
          {{ $t('reviews.badge') }}
        </p>
        <h2 class="font-display text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight mb-4">
          {{ $t('reviews.title') }}
        </h2>
        <p class="text-stone-500 leading-relaxed">
          {{ $t('reviews.subtitle') }}
        </p>
      </div>

      <!-- Review cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          v-for="(review, i) in topReviews"
          :key="review.id"
          class="animate-fade-up"
          :style="{ animationDelay: `${i * 0.08}s` }"
        >
          <figure class="relative h-full flex flex-col p-7 rounded-2xl bg-white border border-stone-200 shadow-sm">
            <!-- Stars -->
            <div class="flex items-center gap-0.5 mb-4">
              <UIcon v-for="s in 5" :key="s" name="i-heroicons-star-solid" class="w-4 h-4 text-amber-400" />
            </div>

            <!-- Quote -->
            <blockquote class="text-stone-700 leading-relaxed mb-6 text-[15px] flex-1">
              „{{ review.text }}"
            </blockquote>

            <!-- Author -->
            <figcaption class="flex items-center gap-3 pt-5 border-t border-stone-100">
              <img
                :src="review.reviewerAvatar"
                :alt="review.reviewerName"
                class="w-10 h-10 rounded-full object-cover"
                loading="lazy"
              />
              <div>
                <p class="text-sm font-semibold text-stone-900">{{ review.reviewerName }}</p>
                <p class="text-xs text-stone-400">{{ getCategoryName(review.category) }}</p>
              </div>
            </figcaption>
          </figure>
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
