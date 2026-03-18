<template>
  <NuxtLink
    :to="`/mesteri/${provider.id}`"
    class="group block rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-lg hover:shadow-indigo-500/5 hover:border-indigo-200/50 overflow-hidden transition-all duration-300 hover:-translate-y-1"
  >
    <!-- Header with gradient -->
    <div class="relative h-20 bg-gradient-to-r from-indigo-500 to-violet-500">
      <!-- Favorite button -->
      <div class="absolute top-3 right-3 z-10">
        <SharedFavoriteButton :provider-id="provider.id" />
      </div>
    </div>

    <div class="relative px-5 pb-5">
      <!-- Avatar overlapping header -->
      <div class="-mt-8 mb-3">
        <img
          :src="provider.avatar"
          :alt="provider.name"
          class="w-16 h-16 rounded-xl object-cover ring-4 ring-white shadow-sm"
        />
      </div>

      <!-- Name & specialty -->
      <div class="flex items-start justify-between gap-2 mb-2">
        <div class="min-w-0">
          <div class="flex items-center gap-2">
            <h3 class="font-bold text-gray-900 truncate group-hover:text-indigo-600 transition-colors">{{ provider.name }}</h3>
            <SharedVerifiedBadge v-if="provider.verified" />
          </div>
          <p class="text-sm text-gray-500 truncate">{{ provider.specialty }}</p>
        </div>
      </div>

      <!-- Rating & Location -->
      <div class="flex items-center gap-4 text-sm text-gray-500 mb-4">
        <div class="flex items-center gap-1">
          <UIcon name="i-heroicons-star-solid" class="w-4 h-4 text-amber-400" />
          <span class="font-semibold text-gray-900">{{ provider.rating.toFixed(1) }}</span>
          <span class="text-gray-400">({{ provider.reviewCount }})</span>
        </div>
        <div class="flex items-center gap-1 text-gray-400">
          <UIcon name="i-heroicons-map-pin" class="w-3.5 h-3.5" />
          {{ provider.city }}
        </div>
      </div>

      <!-- Tags -->
      <div class="flex items-center gap-2">
        <span class="inline-flex items-center px-2.5 py-1 rounded-lg bg-gray-50 text-xs font-medium text-gray-600">
          {{ provider.completedJobs }} {{ $t('provider.jobs') || 'lucrari' }}
        </span>
        <span class="inline-flex items-center px-2.5 py-1 rounded-lg bg-indigo-50 text-xs font-medium text-indigo-600">
          {{ provider.priceRange }}
        </span>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { Provider } from '~/data/providers'

defineProps<{
  provider: Provider
}>()
</script>
