<template>
  <div>
    <!-- Page header -->
    <section class="relative overflow-hidden py-16 lg:py-20" style="background: var(--gradient-dark-section)">
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute top-0 left-1/3 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[120px]" />
      </div>
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <UBreadcrumb :items="[{ label: $t('breadcrumb.home'), to: '/' }, { label: $t('breadcrumb.services') }]" class="mb-6 text-indigo-200/50" />
        <h1 class="animate-fade-up text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
          {{ $t('servicesPage.title') }}
        </h1>
        <p class="animate-fade-up delay-100 text-lg text-indigo-200/60 max-w-2xl mb-8">{{ $t('servicesPage.subtitle') }}</p>
        <div class="animate-fade-up delay-200 max-w-md">
          <UInput
            v-model="search"
            :placeholder="$t('search.searchCategory')"
            icon="i-heroicons-magnifying-glass"
            size="lg"
          />
        </div>
      </div>
    </section>

    <!-- Categories grid -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <ServicesCategoryCard
          v-for="(cat, i) in filtered"
          :key="cat.id"
          :category="cat"
          show-description
          class="animate-fade-up"
          :style="{ animationDelay: `${i * 0.05}s` }"
        />
      </div>

      <SharedEmptyState
        v-if="filtered.length === 0"
        icon="i-heroicons-magnifying-glass"
        :title="$t('categories.notFound')"
        :description="$t('categories.notFoundDesc')"
      />
    </section>

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
