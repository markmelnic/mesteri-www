<template>
  <section class="relative py-20 lg:py-28 bg-[#0A0A0A] overflow-hidden">
    <div class="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section header -->
      <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
        <div>
          <p class="text-sm font-semibold text-[#0D9373] uppercase tracking-wider mb-4">
            {{ $t('featuredProviders.badge') || 'Top mesteri' }}
          </p>
          <h2 class="text-[30px] sm:text-[36px] font-bold text-white tracking-tight">
            {{ $t('featuredProviders.title') }}
          </h2>
        </div>
        <NuxtLink
          to="/mesteri"
          class="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#A1A1AA] border border-white/[0.06] hover:border-white/[0.12] hover:text-white rounded-lg transition-all duration-150"
        >
          {{ $t('featuredProviders.viewAll') }}
          <UIcon name="i-heroicons-arrow-right" class="w-4 h-4" />
        </NuxtLink>
      </div>

      <!-- Provider cards horizontal scroll -->
      <div class="flex gap-6 overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory scrollbar-hide">
        <div
          v-for="(provider, i) in featuredProviders"
          :key="provider.id"
          class="min-w-[300px] max-w-[340px] snap-start flex-shrink-0 animate-fade-up"
          :style="{ animationDelay: `${i * 0.08}s` }"
        >
          <ProvidersProviderCard :provider="provider" />
        </div>
      </div>

      <div class="text-center mt-8 sm:hidden">
        <NuxtLink
          to="/mesteri"
          class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#A1A1AA] border border-white/[0.06] hover:border-white/[0.12] hover:text-white rounded-lg transition-all duration-150"
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

const featuredProviders = providers.filter(p => p.verified).slice(0, 6)
</script>
