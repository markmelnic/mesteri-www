<template>
  <section class="relative py-20 lg:py-28 bg-[#0A0A0A]">
    <div class="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section header -->
      <div class="text-center max-w-2xl mx-auto mb-14">
        <p class="text-sm font-semibold text-[#0D9373] uppercase tracking-wider mb-4">
          {{ $t('categories.badge') || 'Categorii' }}
        </p>
        <h2 class="text-[30px] sm:text-[36px] font-bold text-white tracking-tight mb-4">
          {{ $t('categories.title') }}
        </h2>
        <p class="text-[#A1A1AA] leading-relaxed">
          {{ $t('categories.subtitle') || 'Gaseste exact serviciul de care ai nevoie din gama noastra larga de categorii.' }}
        </p>
      </div>

      <!-- Grid -->
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        <ServicesCategoryCard
          v-for="(cat, i) in displayCategories"
          :key="cat.id"
          :category="cat"
          class="animate-fade-up"
          :style="{ animationDelay: `${i * 0.04}s` }"
        />
      </div>

      <div class="text-center mt-10">
        <NuxtLink
          to="/servicii"
          class="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-[#A1A1AA] border border-white/[0.06] hover:border-white/[0.12] hover:text-white rounded-lg transition-all duration-150"
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

const displayCategories = categories.slice(0, 12)
</script>
