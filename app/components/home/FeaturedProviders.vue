<template>
  <section class="relative py-20 lg:py-28 overflow-hidden">
    <!-- Subtle glow -->
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section header -->
      <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
        <div>
          <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-semibold uppercase tracking-wider mb-4">
            <UIcon name="i-heroicons-check-badge-solid" class="w-3.5 h-3.5" />
            {{ $t('featuredProviders.badge') || 'Top mesteri' }}
          </span>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            {{ $t('featuredProviders.title') }}
          </h2>
        </div>
        <UButton
          to="/mesteri"
          variant="outline"
          color="neutral"
          trailing-icon="i-heroicons-arrow-right"
          class="hidden sm:flex font-semibold"
        >
          {{ $t('featuredProviders.viewAll') }}
        </UButton>
      </div>

      <!-- Provider cards horizontal scroll -->
      <div class="flex gap-6 overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory scrollbar-hide">
        <div
          v-for="(provider, i) in featuredProviders"
          :key="provider.id"
          class="min-w-[300px] max-w-[340px] snap-start flex-shrink-0 animate-fade-up"
          :style="{ animationDelay: `${i * 0.1}s` }"
        >
          <ProvidersProviderCard :provider="provider" />
        </div>
      </div>

      <div class="text-center mt-8 sm:hidden">
        <UButton to="/mesteri" variant="outline" color="neutral" trailing-icon="i-heroicons-arrow-right" class="font-semibold">
          {{ $t('featuredProviders.viewAll') }}
        </UButton>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { providers } from '~/data/providers'

const featuredProviders = providers.filter(p => p.verified).slice(0, 6)
</script>
