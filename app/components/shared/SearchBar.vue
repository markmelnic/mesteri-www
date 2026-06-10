<template>
  <form
    class="flex flex-col sm:flex-row items-stretch gap-2 w-full"
    @submit.prevent="$emit('search', query, city)"
  >
    <div class="relative flex-1">
      <UIcon name="i-heroicons-magnifying-glass" class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400 pointer-events-none" />
      <input
        v-model="query"
        type="search"
        :placeholder="placeholder"
        class="w-full h-12 pl-11 pr-4 rounded-xl bg-white border border-stone-200 text-stone-900 placeholder-stone-400 text-[15px] focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-shadow"
      />
    </div>

    <div v-if="showLocation" class="relative sm:w-48">
      <UIcon name="i-heroicons-map-pin" class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400 pointer-events-none z-10" />
      <select
        v-model="city"
        class="w-full h-12 pl-11 pr-9 rounded-xl bg-white border border-stone-200 text-[15px] appearance-none focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-shadow cursor-pointer"
        :class="city ? 'text-stone-900' : 'text-stone-400'"
      >
        <option value="">{{ $t('search.allCities') }}</option>
        <option v-for="c in cities" :key="c" :value="c" class="text-stone-900">{{ c }}</option>
      </select>
      <UIcon name="i-heroicons-chevron-down-20-solid" class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
    </div>

    <button
      type="submit"
      class="h-12 px-6 rounded-xl bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white text-[15px] font-semibold transition-colors inline-flex items-center justify-center gap-2 shrink-0"
    >
      <UIcon name="i-heroicons-magnifying-glass" class="w-4 h-4 sm:hidden" />
      {{ $t('search.button') }}
    </button>
  </form>
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
