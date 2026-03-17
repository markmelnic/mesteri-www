<template>
  <section class="py-16 lg:py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-10" style="font-family: 'Plus Jakarta Sans', sans-serif;">
        Ce spun clienții noștri
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ProvidersReviewCard
          v-for="review in topReviews"
          :key="review.id"
          :review="review"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { reviews } from '~/data/reviews'

const topReviews = reviews.filter(r => r.rating === 5).slice(0, 3)
</script>
