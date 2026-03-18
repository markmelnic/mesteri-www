<template>
  <div class="flex flex-col items-center justify-center py-20 px-4 text-center">
    <div class="w-14 h-14 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center mb-5">
      <UIcon :name="icon" class="w-6 h-6 text-[#63636E]" />
    </div>
    <h3 class="text-lg font-semibold text-white mb-2">{{ title }}</h3>
    <p class="text-sm text-[#A1A1AA] max-w-sm mb-8">{{ description }}</p>
    <NuxtLink
      v-if="actionLabel"
      :to="actionTo"
      class="inline-flex items-center px-5 py-2.5 text-sm font-semibold text-white bg-[#0D9373] hover:bg-[#0FAA84] rounded-lg transition-colors duration-150"
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
</script>
