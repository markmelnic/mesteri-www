<template>
  <NuxtLink
    :to="`/servicii/${category.slug}`"
    class="group relative p-5 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-lg hover:shadow-indigo-500/5 hover:border-indigo-200/50 transition-all duration-300 hover:-translate-y-1"
  >
    <!-- Icon -->
    <div class="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-50 to-violet-50 text-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
      {{ category.icon }}
    </div>

    <!-- Content -->
    <h3 class="font-semibold text-gray-900 text-sm mb-1 group-hover:text-indigo-600 transition-colors duration-200">
      {{ category.name }}
    </h3>

    <p v-if="showDescription" class="text-xs text-gray-500 leading-relaxed mb-3 line-clamp-2">
      {{ category.description }}
    </p>

    <div class="flex items-center gap-1 text-xs text-gray-400 font-medium">
      <UIcon name="i-heroicons-user-group" class="w-3.5 h-3.5" />
      {{ category.providerCount }} {{ $t('categories.providers') || 'mesteri' }}
    </div>

    <!-- Hover arrow -->
    <div class="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
      <UIcon name="i-heroicons-arrow-up-right" class="w-4 h-4 text-indigo-400" />
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
