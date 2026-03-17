<template>
  <svg :width="width" :height="height" viewBox="0 0 180 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <!-- M monogram icon -->
    <rect x="1" y="7" width="4" height="26" rx="2" :fill="iconColor" />
    <rect x="27" y="7" width="4" height="26" rx="2" :fill="iconColor" />
    <path d="M5 10L16 22.5L27 10" :stroke="iconColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none" />
    <!-- Wordmark -->
    <text x="38" y="28" :fill="textColor" font-family="'Inter', sans-serif" font-weight="700" font-size="22" letter-spacing="-0.5">mesteri</text>
    <text x="131" y="28" :fill="accentColor" font-family="'Inter', sans-serif" font-weight="700" font-size="22" letter-spacing="-0.5">.md</text>
  </svg>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  width?: number
  height?: number
  variant?: 'default' | 'white'
}>(), {
  width: 180,
  height: 40,
  variant: 'default'
})

const iconColor = computed(() => props.variant === 'white' ? '#ffffff' : '#2563eb')
const textColor = computed(() => props.variant === 'white' ? '#ffffff' : '#111827')
const accentColor = computed(() => props.variant === 'white' ? '#93c5fd' : '#2563eb')
</script>
