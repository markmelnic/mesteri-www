<template>
  <UDropdownMenu :items="localeItems">
    <UButton variant="ghost" color="neutral" size="sm" class="gap-1.5 text-[#A1A1AA] hover:text-white">
      <span class="text-sm">{{ currentFlag }}</span>
      <span class="text-xs font-medium uppercase">{{ locale }}</span>
    </UButton>
  </UDropdownMenu>
</template>

<script setup lang="ts">
const { locale, setLocale } = useI18n()

const flags: Record<string, string> = { ro: '🇲🇩', en: '🇬🇧', ru: '🇷🇺' }
const labels: Record<string, string> = { ro: 'Română', en: 'English', ru: 'Русский' }

const currentFlag = computed(() => flags[locale.value] || '🌐')

const localeItems = computed(() => [
  Object.entries(labels).map(([code, label]) => ({
    label,
    icon: undefined,
    disabled: locale.value === code,
    click: () => setLocale(code)
  }))
])
</script>
