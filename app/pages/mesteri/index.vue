<template>
  <div>
    <!-- Page header -->
    <section class="relative overflow-hidden py-16 lg:py-20" style="background: var(--gradient-dark-section)">
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute bottom-0 left-1/4 w-[500px] h-[300px] bg-indigo-600/10 rounded-full blur-[120px]" />
      </div>
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="animate-fade-up text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
          {{ $t('providersPage.title') }}
        </h1>
        <p class="animate-fade-up delay-100 text-lg text-indigo-200/60 max-w-2xl">{{ $t('providersPage.subtitle') }}</p>
      </div>
    </section>

    <!-- Filters -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10 mb-8">
      <div class="animate-fade-up delay-200 bg-white rounded-2xl border border-gray-100 shadow-lg p-4 flex flex-col sm:flex-row gap-3">
        <UInput
          v-model="search"
          :placeholder="$t('search.searchProvider')"
          icon="i-heroicons-magnifying-glass"
          size="lg"
          class="flex-1"
        />
        <USelect
          v-model="city"
          :items="cities"
          :placeholder="$t('search.cityPlaceholder')"
          size="lg"
          class="w-full sm:w-44"
        />
        <USelect
          v-model="sort"
          :items="sortOptions"
          size="lg"
          class="w-full sm:w-44"
        />
      </div>
    </section>

    <!-- Providers grid -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      <div v-if="filteredProviders.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="(provider, i) in filteredProviders"
          :key="provider.id"
          class="animate-fade-up"
          :style="{ animationDelay: `${i * 0.06}s` }"
        >
          <ProvidersProviderCard :provider="provider" />
        </div>
      </div>

      <SharedEmptyState
        v-else
        icon="i-heroicons-magnifying-glass"
        :title="$t('providersPage.notFound')"
        :description="$t('providersPage.notFoundDesc')"
      />
    </section>

    <SharedBackToTop />
  </div>
</template>

<script setup lang="ts">
import { providers } from '~/data/providers'

const { t } = useI18n()
useHead({ title: `${t('providersPage.title')} — mesteri.md` })

const search = ref('')
const city = ref('')
const sort = ref('rating')

const cities = computed(() => [
  t('search.allCities'),
  'Chișinău', 'Bălți', 'Cahul', 'Comrat', 'Orhei', 'Soroca', 'Ungheni'
])

const sortOptions = computed(() => [
  { label: t('providersPage.sortRating'), value: 'rating' },
  { label: t('providersPage.sortReviews'), value: 'reviews' },
  { label: t('providersPage.sortJobs'), value: 'jobs' }
])

const filteredProviders = computed(() => {
  let result = [...providers]

  if (search.value) {
    const q = search.value.toLowerCase()
    result = result.filter(p =>
      p.name.toLowerCase().includes(q) || p.specialty.toLowerCase().includes(q)
    )
  }

  if (city.value && city.value !== t('search.allCities')) {
    result = result.filter(p => p.city === city.value)
  }

  if (sort.value === 'rating') result.sort((a, b) => b.rating - a.rating)
  else if (sort.value === 'reviews') result.sort((a, b) => b.reviewCount - a.reviewCount)
  else if (sort.value === 'jobs') result.sort((a, b) => b.completedJobs - a.completedJobs)

  return result
})
</script>
