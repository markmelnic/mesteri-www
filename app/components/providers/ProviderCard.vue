<template>
  <NuxtLink
    :to="localePath(`/mesteri/${provider.id}`)"
    class="group relative block h-full rounded-2xl bg-white border border-stone-200 hover:border-orange-200 hover:shadow-lg hover:shadow-stone-900/5 p-5 transition-all duration-200 hover:-translate-y-0.5"
  >
    <!-- Favorite button -->
    <div class="absolute top-4 right-4 z-10">
      <SharedFavoriteButton :provider-id="provider.id" />
    </div>

    <!-- Avatar + identity -->
    <div class="flex items-start gap-4 mb-4">
      <img
        :src="provider.avatar"
        :alt="provider.name"
        class="w-14 h-14 rounded-2xl object-cover ring-1 ring-stone-200"
        loading="lazy"
      />
      <div class="min-w-0 pr-8">
        <h3 class="font-display font-semibold text-stone-900 truncate group-hover:text-orange-700 transition-colors">
          {{ provider.name }}
        </h3>
        <p class="text-sm text-stone-500 truncate">{{ provider.specialty }}</p>
        <div class="flex items-center gap-1 mt-1.5 text-sm">
          <UIcon name="i-heroicons-star-solid" class="w-4 h-4 text-amber-400" />
          <span class="font-semibold text-stone-900">{{ provider.rating.toFixed(1) }}</span>
          <span class="text-stone-400">({{ provider.reviewCount }})</span>
        </div>
      </div>
    </div>

    <!-- Meta row -->
    <div class="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-stone-500 mb-4">
      <span class="flex items-center gap-1">
        <UIcon name="i-heroicons-map-pin" class="w-4 h-4 text-stone-400" />
        {{ provider.city }}
      </span>
      <span class="flex items-center gap-1">
        <UIcon name="i-heroicons-briefcase" class="w-4 h-4 text-stone-400" />
        {{ provider.completedJobs }} {{ $t('provider.jobs') }}
      </span>
    </div>

    <!-- Footer -->
    <div class="flex items-center justify-between pt-4 border-t border-stone-100">
      <span class="text-sm font-semibold text-stone-900">{{ provider.priceRange }}</span>
      <SharedVerifiedBadge v-if="provider.verified" />
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { Provider } from '~/data/providers'

defineProps<{
  provider: Provider
}>()

const localePath = useLocalePath()
</script>
