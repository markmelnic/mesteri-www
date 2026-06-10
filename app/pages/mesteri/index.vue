<template>
  <div class="bg-stone-50 min-h-screen">
    <!-- Page header -->
    <section class="bg-white border-b border-stone-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <UBreadcrumb :items="breadcrumbs" class="mb-6" />
        <h1 class="animate-fade-up font-display text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight mb-3">
          {{ $t('providersPage.title') }}
        </h1>
        <p class="animate-fade-up delay-100 text-lg text-stone-500 max-w-2xl">{{ $t('providersPage.subtitle') }}</p>
      </div>
    </section>

    <!-- Filters -->
    <section class="sticky top-16 z-30 bg-white/95 backdrop-blur border-b border-stone-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex flex-col lg:flex-row gap-3">
          <UInput
            v-model="search"
            :placeholder="$t('search.searchProvider')"
            icon="i-heroicons-magnifying-glass"
            size="lg"
            class="flex-1"
          />
          <div class="grid grid-cols-2 sm:flex gap-3">
            <USelect
              v-model="category"
              :items="categoryOptions"
              :placeholder="$t('providersPage.category')"
              size="lg"
              class="w-full sm:w-52"
            />
            <USelect
              v-model="city"
              :items="cityOptions"
              :placeholder="$t('search.cityPlaceholder')"
              size="lg"
              class="w-full sm:w-44"
            />
            <USelect
              v-model="sort"
              :items="sortOptions"
              size="lg"
              class="w-full sm:w-48"
            />
            <button
              type="button"
              class="inline-flex items-center justify-center gap-2 h-10 px-4 rounded-lg border text-sm font-medium transition-colors whitespace-nowrap"
              :class="verifiedOnly
                ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                : 'bg-white border-stone-200 text-stone-600 hover:border-stone-300'"
              @click="verifiedOnly = !verifiedOnly"
            >
              <UIcon name="i-heroicons-check-badge-solid" class="w-4 h-4" :class="verifiedOnly ? 'text-emerald-600' : 'text-stone-400'" />
              {{ $t('providersPage.verifiedOnly') }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Results -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-16">
      <div class="flex items-center justify-between mb-6">
        <p class="text-sm text-stone-500">
          {{ $t('providersPage.resultsCount', { count: filteredProviders.length }) }}
        </p>
        <button
          v-if="hasActiveFilters"
          type="button"
          class="text-sm font-medium text-orange-600 hover:text-orange-700 inline-flex items-center gap-1"
          @click="resetFilters"
        >
          <UIcon name="i-heroicons-x-mark" class="w-4 h-4" />
          {{ $t('providersPage.clearFilters') }}
        </button>
      </div>

      <div v-if="filteredProviders.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <div
          v-for="(provider, i) in filteredProviders"
          :key="provider.id"
          class="animate-fade-up"
          :style="{ animationDelay: `${Math.min(i * 0.05, 0.4)}s` }"
        >
          <ProvidersProviderCard :provider="provider" />
        </div>
      </div>

      <SharedEmptyState
        v-else
        icon="i-heroicons-magnifying-glass"
        :title="$t('providersPage.noResults')"
        :description="$t('providersPage.noResultsDesc')"
      />
    </section>

    <SharedBackToTop />
  </div>
</template>

<script setup lang="ts">
import { providers } from '~/data/providers'
import { categories } from '~/data/categories'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
useHead({ title: `${t('providersPage.title')} — mesteri.md` })

const ALL = '__all__'

const search = ref((route.query.q as string) || '')
const city = ref((route.query.city as string) || ALL)
const category = ref((route.query.category as string) || ALL)
const sort = ref('rating')
const verifiedOnly = ref(false)

const cityOptions = computed(() => [
  { label: t('search.allCities'), value: ALL },
  ...['Chișinău', 'Bălți', 'Cahul', 'Comrat', 'Orhei', 'Soroca', 'Ungheni'].map(c => ({ label: c, value: c }))
])

const categoryOptions = computed(() => [
  { label: t('categories.allCategories'), value: ALL },
  ...categories.map(c => ({ label: `${c.icon} ${c.name}`, value: c.slug }))
])

const sortOptions = computed(() => [
  { label: t('providersPage.sortRating'), value: 'rating' },
  { label: t('providersPage.sortReviews'), value: 'reviews' },
  { label: t('providersPage.sortJobs'), value: 'jobs' }
])

const hasActiveFilters = computed(() =>
  !!search.value || city.value !== ALL || category.value !== ALL || verifiedOnly.value
)

function resetFilters() {
  search.value = ''
  city.value = ALL
  category.value = ALL
  verifiedOnly.value = false
}

// Keep URL shareable
watch([search, city, category], () => {
  const query: Record<string, string> = {}
  if (search.value) query.q = search.value
  if (city.value !== ALL) query.city = city.value
  if (category.value !== ALL) query.category = category.value
  router.replace({ query })
})

const filteredProviders = computed(() => {
  let result = [...providers]

  if (search.value) {
    const q = search.value.toLowerCase()
    result = result.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.specialty.toLowerCase().includes(q) ||
      p.bio.toLowerCase().includes(q)
    )
  }

  if (city.value !== ALL) {
    result = result.filter(p => p.city === city.value)
  }

  if (category.value !== ALL) {
    result = result.filter(p => p.categories.includes(category.value))
  }

  if (verifiedOnly.value) {
    result = result.filter(p => p.verified)
  }

  if (sort.value === 'rating') result.sort((a, b) => b.rating - a.rating)
  else if (sort.value === 'reviews') result.sort((a, b) => b.reviewCount - a.reviewCount)
  else if (sort.value === 'jobs') result.sort((a, b) => b.completedJobs - a.completedJobs)

  return result
})

const localePath = useLocalePath()
const breadcrumbs = computed(() => [
  { label: t('breadcrumb.home'), to: localePath('/') },
  { label: t('breadcrumb.providers') }
])
</script>
