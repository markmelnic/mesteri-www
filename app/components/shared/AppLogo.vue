<template>
  <svg :width="width" :height="height" viewBox="0 0 180 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <!-- House icon mark -->
    <path d="M10 8L3 14.5V28H17V14.5L10 8Z" :stroke="iconColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none" />
    <path d="M8 28V21H12V28" :stroke="iconColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    <circle cx="10" cy="16.5" r="1.5" :fill="iconColor" />
    <!-- Wordmark -->
    <text x="24" y="27" :fill="textColor" font-family="'Inter', sans-serif" font-weight="700" font-size="20" letter-spacing="-0.5">mesteri</text>
    <text x="117" y="27" :fill="accentColor" font-family="'Inter', sans-serif" font-weight="700" font-size="20" letter-spacing="-0.5">.md</text>
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
