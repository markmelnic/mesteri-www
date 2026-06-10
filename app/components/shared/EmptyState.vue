<template>
  <div class="flex flex-col items-center justify-center py-20 px-4 text-center">
    <div class="w-14 h-14 rounded-2xl bg-stone-100 border border-stone-200 flex items-center justify-center mb-5">
      <UIcon :name="icon" class="w-6 h-6 text-stone-400" />
    </div>
    <h3 class="text-lg font-semibold text-stone-900 mb-2">{{ title }}</h3>
    <p class="text-sm text-stone-500 max-w-sm mb-8">{{ description }}</p>
    <NuxtLink
      v-if="actionLabel && actionTo"
      :to="localePath(actionTo)"
      class="inline-flex items-center px-5 py-2.5 text-sm font-semibold text-white bg-orange-600 hover:bg-orange-700 rounded-xl transition-colors"
    >
      {{ actionLabel }}
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  icon: string
  title: string
  description: string
  actionLabel?: string
  actionTo?: string
}>()

const localePath = useLocalePath()
</script>
