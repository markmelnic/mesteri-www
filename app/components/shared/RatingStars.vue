<template>
  <div class="flex items-center gap-1">
    <UIcon
      v-for="i in 5"
      :key="i"
      :name="i <= Math.round(rating) ? 'i-heroicons-star-solid' : 'i-heroicons-star'"
      class="w-4 h-4"
      :class="i <= Math.round(rating) ? 'text-amber-400' : 'text-[#63636E]'"
    />
    <span v-if="showValue" class="ml-1 text-sm font-medium text-white">{{ rating.toFixed(1) }}</span>
    <span v-if="count !== undefined" class="text-sm text-[#63636E]">({{ count }})</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  rating: number
  showValue?: boolean
  count?: number
}>()
</script>
