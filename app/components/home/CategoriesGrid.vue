<template>
  <section class="relative py-20 lg:py-28 overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section header -->
      <div class="text-center max-w-2xl mx-auto mb-14">
        <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-semibold uppercase tracking-wider mb-4">
          <UIcon name="i-heroicons-squares-2x2-solid" class="w-3.5 h-3.5" />
          {{ $t('categories.badge') || 'Categorii' }}
        </span>
        <h2 class="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
          {{ $t('categories.title') }}
        </h2>
        <p class="text-lg text-gray-500 leading-relaxed">
          {{ $t('categories.subtitle') || 'Gaseste exact serviciul de care ai nevoie din gama noastra larga de categorii.' }}
        </p>
      </div>

      <!-- Bento grid -->
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        <ServicesCategoryCard
          v-for="(cat, i) in displayCategories"
          :key="cat.id"
          :category="cat"
          class="animate-fade-up"
          :style="{ animationDelay: `${i * 0.05}s` }"
        />
      </div>

      <div class="text-center mt-10">
        <UButton
          to="/servicii"
          color="neutral"
          variant="outline"
          size="lg"
          trailing-icon="i-heroicons-arrow-right"
          class="font-semibold"
        >
          {{ $t('categories.viewAll') }}
        </UButton>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { categories } from '~/data/categories'

const displayCategories = categories.slice(0, 12)
</script>
