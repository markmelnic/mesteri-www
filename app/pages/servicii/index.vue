<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <UBreadcrumb :items="[{ label: $t('breadcrumb.home'), to: '/' }, { label: $t('breadcrumb.services') }]" class="mb-6" />

    <h1 class="text-3xl font-bold text-gray-900 mb-2">
      {{ $t('servicesPage.title') }}
    </h1>
    <p class="text-gray-500 mb-8">{{ $t('servicesPage.subtitle') }}</p>

    <div class="mb-8">
      <UInput
        v-model="search"
        :placeholder="$t('search.searchCategory')"
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
      :title="$t('categories.notFound')"
      :description="$t('categories.notFoundDesc')"
    />

    <SharedBackToTop />
  </div>
</template>

<script setup lang="ts">
import { categories } from '~/data/categories'

const { t } = useI18n()
useHead({ title: `${t('servicesPage.title')} — mesteri.md` })

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
