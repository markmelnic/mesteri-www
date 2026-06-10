<template>
  <section class="py-20 lg:py-28 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section header -->
      <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
        <div>
          <p class="text-sm font-semibold text-orange-600 uppercase tracking-wider mb-3">
            {{ $t('featuredProviders.badge') }}
          </p>
          <h2 class="font-display text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
            {{ $t('featuredProviders.title') }}
          </h2>
        </div>
        <NuxtLink
          :to="localePath('/mesteri')"
          class="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-stone-700 bg-white border border-stone-200 hover:border-stone-300 hover:bg-stone-50 rounded-xl transition-colors shrink-0"
        >
          {{ $t('featuredProviders.viewAll') }}
          <UIcon name="i-heroicons-arrow-right" class="w-4 h-4" />
        </NuxtLink>
      </div>

      <!-- Provider cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="(provider, i) in featuredProviders"
          :key="provider.id"
          class="animate-fade-up"
          :style="{ animationDelay: `${i * 0.06}s` }"
        >
          <ProvidersProviderCard :provider="provider" />
        </div>
      </div>

      <div class="text-center mt-8 sm:hidden">
        <NuxtLink
          :to="localePath('/mesteri')"
          class="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-stone-700 bg-white border border-stone-200 hover:bg-stone-50 rounded-xl transition-colors"
        >
          {{ $t('featuredProviders.viewAll') }}
          <UIcon name="i-heroicons-arrow-right" class="w-4 h-4" />
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { providers } from '~/data/providers'

const localePath = useLocalePath()

const featuredProviders = providers
  .filter(p => p.verified)
  .slice()
  .sort((a, b) => b.rating - a.rating)
  .slice(0, 6)
</script>
