<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <template v-if="category">
      <UBreadcrumb :items="[{ label: 'Acasă', to: '/' }, { label: 'Servicii', to: '/servicii' }, { label: category.name }]" class="mb-6" />

      <div class="flex items-center gap-4 mb-8">
        <span class="text-4xl">{{ category.icon }}</span>
        <div>
          <h1 class="text-3xl font-bold text-gray-900" style="font-family: 'Plus Jakarta Sans', sans-serif;">
            {{ category.name }}
          </h1>
          <p class="text-gray-500 mt-1">{{ category.description }}</p>
        </div>
      </div>

      <!-- Filters -->
      <div class="flex flex-wrap items-center gap-3 mb-8 p-4 bg-white rounded-xl border border-gray-100">
        <USelect v-model="sortBy" :items="sortOptions" placeholder="Sortare" size="sm" class="w-40" />
        <USelect v-model="filterCity" :items="cityOptions" placeholder="Oraș" size="sm" class="w-40" />
        <label class="flex items-center gap-2 text-sm text-gray-600 ml-2">
          <input v-model="verifiedOnly" type="checkbox" class="rounded border-gray-300 text-blue-600" />
          Doar verificați
        </label>
      </div>

      <!-- Provider list -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProvidersProviderCard
          v-for="provider in paginatedProviders"
          :key="provider.id"
          :provider="provider"
        />
      </div>

      <SharedEmptyState
        v-if="filteredProviders.length === 0"
        icon="i-heroicons-users"
        title="Niciun meșter găsit"
        description="Încercați să modificați filtrele sau să căutați în altă categorie."
      />

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="flex justify-center mt-10">
        <UPagination v-model="page" :total="filteredProviders.length" :items-per-page="perPage" />
      </div>
    </template>

    <SharedEmptyState
      v-else
      icon="i-heroicons-exclamation-triangle"
      title="Categorie negăsită"
      description="Categoria căutată nu există."
      action-label="Înapoi la categorii"
      action-to="/servicii"
    />

    <SharedBackToTop />
  </div>
</template>

<script setup lang="ts">
import { categories } from '~/data/categories'
import { providers } from '~/data/providers'

const route = useRoute()
const slug = route.params.slug as string

const category = categories.find(c => c.slug === slug)

useHead({ title: category ? `${category.name} — mesteri.md` : 'Categorie negăsită — mesteri.md' })

const sortBy = ref('rating')
const filterCity = ref('')
const verifiedOnly = ref(false)
const page = ref(1)
const perPage = 6

const sortOptions = ['Rating', 'Recenzii', 'Lucrări']
const cityOptions = ['Toate orașele', 'Chișinău', 'Bălți', 'Cahul', 'Comrat', 'Orhei', 'Soroca', 'Ungheni']

const filteredProviders = computed(() => {
  let list = providers.filter(p => p.categories.includes(slug))

  if (filterCity.value && filterCity.value !== 'Toate orașele') {
    list = list.filter(p => p.city === filterCity.value)
  }

  if (verifiedOnly.value) {
    list = list.filter(p => p.verified)
  }

  const sort = sortBy.value
  if (sort === 'Rating') list.sort((a, b) => b.rating - a.rating)
  else if (sort === 'Recenzii') list.sort((a, b) => b.reviewCount - a.reviewCount)
  else if (sort === 'Lucrări') list.sort((a, b) => b.completedJobs - a.completedJobs)

  return list
})

const totalPages = computed(() => Math.ceil(filteredProviders.value.length / perPage))
const paginatedProviders = computed(() => {
  const start = (page.value - 1) * perPage
  return filteredProviders.value.slice(start, start + perPage)
})
</script>
