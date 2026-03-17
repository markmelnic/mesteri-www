<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <UBreadcrumb :items="[{ label: 'Acasă', to: '/' }, { label: 'Servicii' }]" class="mb-6" />

    <h1 class="text-3xl font-bold text-gray-900 mb-2" style="font-family: 'Plus Jakarta Sans', sans-serif;">
      Toate categoriile de servicii
    </h1>
    <p class="text-gray-500 mb-8">Găsește categoria de servicii de care ai nevoie</p>

    <div class="mb-8">
      <UInput
        v-model="search"
        placeholder="Caută o categorie..."
        icon="i-heroicons-magnifying-glass"
        size="lg"
        class="max-w-md"
      />
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <ServicesCategoryCard
        v-for="cat in filtered"
        :key="cat.id"
        :category="cat"
        show-description
      />
    </div>

    <SharedEmptyState
      v-if="filtered.length === 0"
      icon="i-heroicons-magnifying-glass"
      title="Nicio categorie găsită"
      description="Încearcă un alt termen de căutare."
    />

    <SharedBackToTop />
  </div>
</template>

<script setup lang="ts">
import { categories } from '~/data/categories'

useHead({ title: 'Categorii de servicii — mesteri.md' })

const route = useRoute()
const search = ref((route.query.q as string) || '')

const filtered = computed(() => {
  if (!search.value) return categories
  const q = search.value.toLowerCase()
  return categories.filter(c =>
    c.name.toLowerCase().includes(q) || c.description.toLowerCase().includes(q)
  )
})
</script>
