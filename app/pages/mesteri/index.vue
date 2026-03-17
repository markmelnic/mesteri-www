<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <UBreadcrumb :items="[{ label: 'Acasă', to: '/' }, { label: 'Meșteri' }]" class="mb-6" />

    <h1 class="text-3xl font-bold text-gray-900 mb-2" style="font-family: 'Plus Jakarta Sans', sans-serif;">
      Toți meșterii
    </h1>
    <p class="text-gray-500 mb-8">Găsește meșterul potrivit pentru lucrarea ta</p>

    <!-- Filters -->
    <div class="flex flex-wrap items-center gap-3 mb-8 p-4 bg-white rounded-xl border border-gray-100">
      <UInput
        v-model="search"
        placeholder="Caută meșter..."
        icon="i-heroicons-magnifying-glass"
        size="sm"
        class="w-60"
      />
      <USelect v-model="filterCity" :items="cityOptions" placeholder="Oraș" size="sm" class="w-40" />
      <USelect v-model="filterCategory" :items="categoryOptions" placeholder="Categorie" size="sm" class="w-52" />
      <label class="flex items-center gap-2 text-sm text-gray-600 ml-2">
        <input v-model="verifiedOnly" type="checkbox" class="rounded border-gray-300 text-blue-600" />
        Doar verificați
      </label>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <ProvidersProviderCard
        v-for="provider in paginatedProviders"
        :key="provider.id"
        :provider="provider"
      />
    </div>

    <SharedEmptyState
      v-if="filtered.length === 0"
      icon="i-heroicons-users"
      title="Niciun meșter găsit"
      description="Încercați să modificați filtrele de căutare."
    />

    <div v-if="totalPages > 1" class="flex justify-center mt-10">
      <UPagination v-model="page" :total="filtered.length" :items-per-page="perPage" />
    </div>

    <SharedBackToTop />
  </div>
</template>

<script setup lang="ts">
import { providers } from '~/data/providers'
import { categories } from '~/data/categories'

useHead({ title: 'Meșteri — mesteri.md' })

const search = ref('')
const filterCity = ref('')
const filterCategory = ref('')
const verifiedOnly = ref(false)
const page = ref(1)
const perPage = 9

const cityOptions = ['Toate orașele', 'Chișinău', 'Bălți', 'Cahul', 'Comrat', 'Orhei', 'Soroca', 'Ungheni']
const categoryOptions = ['Toate categoriile', ...categories.map(c => c.name)]

const filtered = computed(() => {
  let list = [...providers]

  if (search.value) {
    const q = search.value.toLowerCase()
    list = list.filter(p => p.name.toLowerCase().includes(q) || p.specialty.toLowerCase().includes(q))
  }

  if (filterCity.value && filterCity.value !== 'Toate orașele') {
    list = list.filter(p => p.city === filterCity.value)
  }

  if (filterCategory.value && filterCategory.value !== 'Toate categoriile') {
    const cat = categories.find(c => c.name === filterCategory.value)
    if (cat) list = list.filter(p => p.categories.includes(cat.slug))
  }

  if (verifiedOnly.value) {
    list = list.filter(p => p.verified)
  }

  return list.sort((a, b) => b.rating - a.rating)
})

const totalPages = computed(() => Math.ceil(filtered.value.length / perPage))
const paginatedProviders = computed(() => {
  const start = (page.value - 1) * perPage
  return filtered.value.slice(start, start + perPage)
})
</script>
