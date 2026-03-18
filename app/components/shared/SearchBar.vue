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
    <UButton
      color="primary"
      size="lg"
      class="font-semibold bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-500/20 hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-200"
      @click="$emit('search', query, city)"
    >
      {{ $t('search.button') }}
    </UButton>
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
