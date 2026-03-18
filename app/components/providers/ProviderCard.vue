<template>
  <NuxtLink
    :to="`/mesteri/${provider.id}`"
    class="group block rounded-xl bg-[#141416] border border-white/[0.06] hover:border-white/[0.12] overflow-hidden transition-all duration-150"
  >
    <!-- Header with accent gradient -->
    <div class="relative h-16 bg-gradient-to-r from-[#0D9373]/20 to-[#0D9373]/5">
      <!-- Favorite button -->
      <div class="absolute top-3 right-3 z-10">
        <SharedFavoriteButton :provider-id="provider.id" />
      </div>
    </div>

    <div class="relative px-5 pb-5">
      <!-- Avatar overlapping header -->
      <div class="-mt-7 mb-3">
        <img
          :src="provider.avatar"
          :alt="provider.name"
          class="w-14 h-14 rounded-xl object-cover ring-2 ring-[#141416]"
        />
      </div>

      <!-- Name & specialty -->
      <div class="flex items-start justify-between gap-2 mb-2">
        <div class="min-w-0">
          <div class="flex items-center gap-2">
            <h3 class="font-semibold text-white truncate group-hover:text-[#2AB673] transition-colors duration-150">{{ provider.name }}</h3>
            <SharedVerifiedBadge v-if="provider.verified" />
          </div>
          <p class="text-sm text-[#A1A1AA] truncate">{{ provider.specialty }}</p>
        </div>
      </div>

      <!-- Rating & Location -->
      <div class="flex items-center gap-4 text-sm text-[#A1A1AA] mb-4">
        <div class="flex items-center gap-1">
          <UIcon name="i-heroicons-star-solid" class="w-4 h-4 text-amber-400" />
          <span class="font-semibold text-white">{{ provider.rating.toFixed(1) }}</span>
          <span class="text-[#63636E]">({{ provider.reviewCount }})</span>
        </div>
        <div class="flex items-center gap-1 text-[#63636E]">
          <UIcon name="i-heroicons-map-pin" class="w-3.5 h-3.5" />
          {{ provider.city }}
        </div>
      </div>

      <!-- Tags -->
      <div class="flex items-center gap-2">
        <span class="inline-flex items-center px-2.5 py-1 rounded-md bg-white/[0.04] text-xs font-medium text-[#A1A1AA]">
          {{ provider.completedJobs }} {{ $t('provider.jobs') || 'lucrari' }}
        </span>
        <span class="inline-flex items-center px-2.5 py-1 rounded-md bg-[#0D9373]/10 text-xs font-medium text-[#2AB673]">
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
