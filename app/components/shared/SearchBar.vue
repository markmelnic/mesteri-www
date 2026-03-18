<template>
  <div class="flex flex-col sm:flex-row gap-3 w-full max-w-2xl">
    <div class="flex-1">
      <UInput
        v-model="query"
        :placeholder="placeholder"
        icon="i-heroicons-magnifying-glass"
        size="lg"
        class="w-full"
        @keyup.enter="$emit('search', query, city)"
      />
    </div>
    <USelect
      v-if="showLocation"
      v-model="city"
      :items="cities"
      :placeholder="$t('search.cityPlaceholder')"
      size="lg"
      class="w-full sm:w-44"
    />
    <button
      class="px-5 py-2.5 text-sm font-semibold text-white bg-[#0D9373] hover:bg-[#0FAA84] rounded-lg transition-colors duration-150"
      @click="$emit('search', query, city)"
    >
      {{ $t('search.button') }}
    </button>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

defineProps<{
  placeholder?: string
  showLocation?: boolean
}>()

defineEmits<{
  search: [query: string, city: string]
}>()

const query = defineModel<string>('modelValue', { default: '' })
const city = ref('')

const cities = computed(() => [
  t('search.allCities'),
  'Chișinău',
  'Bălți',
  'Cahul',
  'Comrat',
  'Orhei',
  'Soroca',
  'Ungheni',
  'Edineț',
  'Hîncești',
  'Strășeni'
])
</script>
