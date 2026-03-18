<template>
  <div v-if="category">
    <!-- Category header -->
    <section class="relative overflow-hidden py-16 lg:py-20" style="background: var(--gradient-dark-section)">
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute top-0 right-1/4 w-[400px] h-[400px] bg-violet-600/10 rounded-full blur-[120px]" />
      </div>
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <UBreadcrumb :items="breadcrumbs" class="mb-6 text-indigo-200/50" />
        <div class="flex items-center gap-4 mb-4">
          <span class="text-5xl animate-fade-up">{{ category.icon }}</span>
          <div>
            <h1 class="animate-fade-up delay-100 text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {{ category.name }}
            </h1>
            <p class="animate-fade-up delay-200 text-indigo-200/60 mt-2 max-w-2xl">{{ category.description }}</p>
          </div>
        </div>
        <span class="animate-fade-up delay-300 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-indigo-200 text-sm font-medium mt-4">
          <UIcon name="i-heroicons-user-group" class="w-4 h-4" />
          {{ categoryProviders.length }} {{ $t('categories.providers') || 'mesteri' }}
        </span>
      </div>
    </section>

    <!-- Providers grid -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <div v-if="categoryProviders.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="(provider, i) in categoryProviders"
          :key="provider.id"
          class="animate-fade-up"
          :style="{ animationDelay: `${i * 0.08}s` }"
        >
          <ProvidersProviderCard :provider="provider" />
        </div>
      </div>

      <SharedEmptyState
        v-else
        icon="i-heroicons-user-group"
        :title="$t('categories.noProviders')"
        :description="$t('categories.noProvidersDesc')"
        :action-label="$t('categories.viewAll')"
        action-to="/servicii"
      />
    </section>

    <SharedBackToTop />
  </div>
</template>

<script setup lang="ts">
import { categories } from '~/data/categories'
import { providers } from '~/data/providers'

const { t } = useI18n()
const route = useRoute()

const category = categories.find(c => c.slug === route.params.slug)

if (!category) {
  navigateTo('/servicii', { replace: true })
}

useHead({ title: category ? `${category.name} — mesteri.md` : '' })

const categoryProviders = computed(() =>
  providers.filter(p => p.categories.includes(route.params.slug as string))
)

const breadcrumbs = computed(() => [
  { label: t('breadcrumb.home'), to: '/' },
  { label: t('breadcrumb.services'), to: '/servicii' },
  { label: category?.name || '' }
])
</script>
