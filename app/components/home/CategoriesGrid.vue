<template>
  <section class="py-16 lg:py-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">
        {{ $t('categories.title') }}
      </h2>
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        <ServicesCategoryCard
          v-for="cat in displayCategories"
          :key="cat.id"
          :category="cat"
        />
      </div>
      <div class="text-center mt-8">
        <UButton to="/servicii" variant="ghost" color="primary" trailing-icon="i-heroicons-arrow-right">
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
