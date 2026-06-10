<template>
  <NuxtLink
    :to="localePath(`/servicii/${category.slug}`)"
    class="group relative block h-full p-5 rounded-2xl bg-white border border-stone-200 hover:border-orange-200 hover:shadow-lg hover:shadow-stone-900/5 transition-all duration-200 hover:-translate-y-0.5"
  >
    <!-- Icon -->
    <div class="flex items-center justify-center w-11 h-11 rounded-xl bg-orange-50 border border-orange-100 text-xl mb-4 group-hover:scale-105 transition-transform">
      {{ category.icon }}
    </div>

    <!-- Content -->
    <h3 class="font-display font-semibold text-stone-900 text-[15px] mb-1 group-hover:text-orange-700 transition-colors">
      {{ category.name }}
    </h3>

    <p v-if="showDescription" class="text-sm text-stone-500 leading-relaxed mb-3 line-clamp-2">
      {{ category.description }}
    </p>

    <div class="flex items-center gap-1 text-xs text-stone-400 font-medium">
      <UIcon name="i-heroicons-user-group" class="w-3.5 h-3.5" />
      {{ category.providerCount }} {{ $t('categories.providers') }}
    </div>

    <!-- Hover arrow -->
    <div class="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity">
      <UIcon name="i-heroicons-arrow-up-right" class="w-4 h-4 text-orange-600" />
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { Category } from '~/data/categories'

defineProps<{
  category: Category
  showDescription?: boolean
}>()

const localePath = useLocalePath()
</script>
