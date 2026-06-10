<template>
  <section class="py-20 lg:py-28 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section header -->
      <div class="text-center max-w-2xl mx-auto mb-14">
        <p class="text-sm font-semibold text-orange-600 uppercase tracking-wider mb-3">
          {{ $t('categories.badge') }}
        </p>
        <h2 class="font-display text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight mb-4">
          {{ $t('categories.title') }}
        </h2>
        <p class="text-stone-500 leading-relaxed">
          {{ $t('categories.subtitle') }}
        </p>
      </div>

      <!-- Grid -->
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        <ServicesCategoryCard
          v-for="(cat, i) in displayCategories"
          :key="cat.id"
          :category="cat"
          class="animate-fade-up"
          :style="{ animationDelay: `${Math.min(i * 0.04, 0.4)}s` }"
        />
      </div>

      <div class="text-center mt-10">
        <NuxtLink
          :to="localePath('/servicii')"
          class="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-stone-700 bg-white border border-stone-200 hover:border-stone-300 hover:bg-stone-50 rounded-xl transition-colors"
        >
          {{ $t('categories.viewAll') }}
          <UIcon name="i-heroicons-arrow-right" class="w-4 h-4" />
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { categories } from '~/data/categories'

const localePath = useLocalePath()
const displayCategories = categories.slice(0, 12)
</script>
