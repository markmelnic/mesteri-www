<template>
  <NuxtLink
    :to="`/servicii/${category.slug}`"
    class="group relative p-5 rounded-xl bg-[#141416] border border-white/[0.06] hover:border-white/[0.12] transition-all duration-150"
  >
    <!-- Icon -->
    <div class="flex items-center justify-center w-10 h-10 rounded-lg bg-[#0D9373]/10 text-xl mb-4">
      {{ category.icon }}
    </div>

    <!-- Content -->
    <h3 class="font-semibold text-white text-sm mb-1 group-hover:text-[#2AB673] transition-colors duration-150">
      {{ category.name }}
    </h3>

    <p v-if="showDescription" class="text-xs text-[#A1A1AA] leading-relaxed mb-3 line-clamp-2">
      {{ category.description }}
    </p>

    <div class="flex items-center gap-1 text-xs text-[#63636E] font-medium">
      <UIcon name="i-heroicons-user-group" class="w-3.5 h-3.5" />
      {{ category.providerCount }} {{ $t('categories.providers') || 'mesteri' }}
    </div>

    <!-- Hover arrow -->
    <div class="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
      <UIcon name="i-heroicons-arrow-up-right" class="w-4 h-4 text-[#0D9373]" />
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
