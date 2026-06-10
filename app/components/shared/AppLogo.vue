<template>
  <svg :width="width" :height="height" viewBox="0 0 180 40" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="mesteri.md">
    <!-- M monogram in rounded tile -->
    <rect x="0" y="2" width="36" height="36" rx="10" fill="#EA580C" />
    <path d="M9 28V13.5L18 22.5L27 13.5V28" stroke="#FFFFFF" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" fill="none" />
    <!-- Wordmark -->
    <text x="44" y="28" :fill="textColor" font-family="'Bricolage Grotesque', 'Inter', sans-serif" font-weight="700" font-size="21" letter-spacing="-0.5">mesteri<tspan fill="#EA580C">.md</tspan></text>
  </svg>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  width?: number
  height?: number
  variant?: 'default' | 'white'
}>(), {
  width: 168,
  height: 40,
  variant: 'default'
})

const textColor = computed(() => props.variant === 'white' ? '#FFFFFF' : '#1C1917')
</script>
