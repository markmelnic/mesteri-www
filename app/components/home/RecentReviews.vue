<template>
  <section class="relative py-20 lg:py-28 bg-[#111113]">
    <div class="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section header -->
      <div class="text-center max-w-2xl mx-auto mb-14">
        <p class="text-sm font-semibold text-[#0D9373] uppercase tracking-wider mb-4">
          {{ $t('reviews.badge') || 'Recenzii' }}
        </p>
        <h2 class="text-[30px] sm:text-[36px] font-bold text-white tracking-tight mb-4">
          {{ $t('reviews.title') }}
        </h2>
        <p class="text-[#A1A1AA] leading-relaxed">
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
          <div class="relative h-full p-6 rounded-xl bg-[#141416] border border-white/[0.06] hover:border-white/[0.12] transition-all duration-150">
            <!-- Decorative quote mark -->
            <div class="absolute top-4 right-4 text-[48px] font-serif text-white/[0.04] leading-none pointer-events-none">"</div>

            <!-- Stars -->
            <div class="flex items-center gap-1 mb-4">
              <UIcon v-for="s in 5" :key="s" name="i-heroicons-star-solid" class="w-4 h-4 text-amber-400" />
            </div>

            <!-- Quote -->
            <p class="text-[#EDEDEF] leading-relaxed mb-6 text-sm">
              "{{ review.text }}"
            </p>

            <!-- Author -->
            <div class="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
              <img
                :src="review.reviewerAvatar"
                :alt="review.reviewerName"
                class="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p class="text-sm font-semibold text-white">{{ review.reviewerName }}</p>
                <p class="text-xs text-[#63636E]">{{ getCategoryName(review.category) }}</p>
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
