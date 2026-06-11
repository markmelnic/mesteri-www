<template>
  <div class="bg-stone-50 min-h-screen">
    <!-- Page header -->
    <section class="bg-white border-b border-stone-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <UBreadcrumb :items="breadcrumbs" class="mb-6" />
        <h1 class="animate-fade-up font-display text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight mb-3">
          {{ $t('servicesPage.title') }}
        </h1>
        <p class="animate-fade-up delay-100 text-lg text-stone-500 max-w-2xl mb-8">{{ $t('servicesPage.subtitle') }}</p>
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
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <ServicesCategoryCard
          v-for="(cat, i) in filtered"
          :key="cat.id"
          :category="cat"
          show-description
          class="animate-fade-up"
          :style="{ animationDelay: `${Math.min(i * 0.04, 0.4)}s` }"
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
const localePath = useLocalePath()
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

const breadcrumbs = computed(() => [
  { label: t('breadcrumb.home'), to: localePath('/') },
  { label: t('breadcrumb.services') }
])
</script>
