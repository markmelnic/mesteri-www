<template>
  <UDropdownMenu :items="localeItems" :content="{ align: 'end' }">
    <button
      type="button"
      class="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm font-medium text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors"
    >
      <UIcon name="i-heroicons-language" class="w-4 h-4" />
      <span class="text-xs font-semibold uppercase">{{ locale }}</span>
      <UIcon name="i-heroicons-chevron-down-20-solid" class="w-3.5 h-3.5" />
    </button>
  </UDropdownMenu>
</template>

<script setup lang="ts">
const { locale, setLocale } = useI18n()

const labels: Record<string, string> = { ro: 'Română', en: 'English', ru: 'Русский' }

const localeItems = computed(() => [
  Object.entries(labels).map(([code, label]) => ({
    label,
    type: 'checkbox' as const,
    checked: locale.value === code,
    onSelect: () => setLocale(code as 'ro' | 'en' | 'ru')
  }))
])
</script>
