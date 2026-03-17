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
      placeholder="Oraș"
      size="lg"
      class="w-full sm:w-44"
    />
    <UButton color="primary" size="lg" @click="$emit('search', query, city)">
      Caută
    </UButton>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  placeholder?: string
  showLocation?: boolean
}>()

defineEmits<{
  search: [query: string, city: string]
}>()

const query = defineModel<string>('modelValue', { default: '' })
const city = ref('')

const cities = [
  'Toate orașele',
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
]
</script>
