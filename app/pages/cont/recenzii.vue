<template>
  <div>
    <h1 class="text-2xl font-bold text-gray-900 mb-6" style="font-family: 'Plus Jakarta Sans', sans-serif;">Recenziile mele</h1>

    <div v-if="myReviews.length > 0" class="space-y-4">
      <div v-for="review in myReviews" :key="review.id" class="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
        <div class="flex items-start justify-between mb-2">
          <div>
            <p class="font-medium text-gray-900">{{ getProviderName(review.providerId) }}</p>
            <SharedRatingStars :rating="review.rating" class="mt-1" />
          </div>
          <div class="flex items-center gap-2">
            <span class="text-sm text-gray-400">{{ formatDate(review.date) }}</span>
            <UButton variant="ghost" size="xs" icon="i-heroicons-pencil-square">Editează</UButton>
          </div>
        </div>
        <p class="text-sm text-gray-600">{{ review.text }}</p>
      </div>
    </div>

    <SharedEmptyState
      v-else
      icon="i-heroicons-star"
      title="Nu ai scris recenzii încă"
      description="După finalizarea unei lucrări, poți lăsa o recenzie meșterului."
    />
  </div>
</template>

<script setup lang="ts">
import { reviews } from '~/data/reviews'
import { providers } from '~/data/providers'

definePageMeta({ layout: 'dashboard', middleware: ['role'] })
useHead({ title: 'Recenziile mele — mesteri.md' })

// Mock: show first 3 reviews as if written by current user
const myReviews = reviews.slice(0, 3)

function getProviderName(providerId: string) {
  return providers.find(p => p.id === providerId)?.name || 'Meșter'
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('ro-RO', { day: 'numeric', month: 'long', year: 'numeric' })
}
</script>
