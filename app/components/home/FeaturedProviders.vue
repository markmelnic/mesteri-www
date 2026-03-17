<template>
  <section class="py-16 lg:py-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between mb-8">
        <h2 class="text-2xl sm:text-3xl font-bold text-gray-900">
          {{ $t('featuredProviders.title') }}
        </h2>
        <UButton to="/mesteri" variant="ghost" color="primary" trailing-icon="i-heroicons-arrow-right" class="hidden sm:flex">
          {{ $t('featuredProviders.viewAll') }}
        </UButton>
      </div>
      <div class="flex gap-6 overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory scrollbar-hide">
        <div
          v-for="provider in featuredProviders"
          :key="provider.id"
          class="min-w-[300px] max-w-[340px] snap-start flex-shrink-0"
        >
          <ProvidersProviderCard :provider="provider" />
        </div>
      </div>
      <div class="text-center mt-6 sm:hidden">
        <UButton to="/mesteri" variant="ghost" color="primary" trailing-icon="i-heroicons-arrow-right">
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
