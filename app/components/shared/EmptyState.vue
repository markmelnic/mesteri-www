<template>
  <div class="flex flex-col items-center justify-center py-20 px-4 text-center">
    <div class="w-16 h-16 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center mb-5">
      <UIcon :name="icon" class="w-7 h-7 text-gray-400" />
    </div>
    <h3 class="text-lg font-bold text-gray-900 mb-2">{{ title }}</h3>
    <p class="text-sm text-gray-500 max-w-sm mb-8">{{ description }}</p>
    <UButton v-if="actionLabel" :to="actionTo" color="primary" class="font-semibold bg-indigo-600 hover:bg-indigo-700">
      {{ actionLabel }}
    </UButton>
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
</script>
