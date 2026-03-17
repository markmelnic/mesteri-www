<template>
  <NuxtLink :to="`/servicii/${category.slug}`" class="block group">
    <div class="bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all duration-200 text-center h-full">
      <div class="text-4xl mb-3">{{ category.icon }}</div>
      <h3 class="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-1">{{ category.name }}</h3>
      <p v-if="showDescription" class="text-sm text-gray-500 mb-2 line-clamp-2">{{ category.description }}</p>
      <p class="text-xs text-gray-400">{{ category.providerCount }} meșteri</p>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { Category } from '~/data/categories'

defineProps<{
  category: Category
  showDescription?: boolean
}>()
</script>
