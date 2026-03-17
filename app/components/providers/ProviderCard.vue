<template>
  <NuxtLink :to="`/mesteri/${provider.id}`" class="block group">
    <div class="bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all duration-200 h-full">
      <div class="flex items-start justify-between mb-4">
        <div class="flex items-center gap-3">
          <UAvatar :src="provider.avatar" :alt="provider.name" size="lg" />
          <div>
            <div class="flex items-center gap-2">
              <h3 class="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{{ provider.name }}</h3>
              <SharedVerifiedBadge v-if="provider.verified" />
            </div>
            <p class="text-sm text-gray-500">{{ provider.specialty }}</p>
          </div>
        </div>
        <SharedFavoriteButton :provider-id="provider.id" />
      </div>
      <div class="flex items-center gap-4 mb-3">
        <SharedRatingStars :rating="provider.rating" show-value :count="provider.reviewCount" />
      </div>
      <div class="flex items-center gap-2 text-sm text-gray-500 mb-3">
        <UIcon name="i-heroicons-map-pin" class="w-4 h-4" />
        <span>{{ provider.city }}</span>
      </div>
      <p class="text-sm text-gray-600 line-clamp-2">{{ provider.bio }}</p>
      <div class="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
        <span class="text-sm font-medium text-gray-700">{{ provider.priceRange }}</span>
        <span class="text-sm text-blue-600 font-medium group-hover:underline">Vezi profil →</span>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { Provider } from '~/data/providers'

defineProps<{ provider: Provider }>()
</script>
