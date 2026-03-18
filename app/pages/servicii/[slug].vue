<template>
  <div v-if="category">
    <!-- Category header -->
    <section class="relative overflow-hidden py-16 lg:py-20 bg-[#0A0A0A]">
      <div class="absolute top-0 right-1/4 w-[400px] h-[300px] bg-[#0D9373]/[0.06] rounded-full blur-[140px] pointer-events-none" />
      <div class="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <UBreadcrumb :items="breadcrumbs" class="mb-6" />
        <div class="flex items-center gap-4 mb-4">
          <span class="text-4xl animate-fade-up">{{ category.icon }}</span>
          <div>
            <h1 class="animate-fade-up delay-100 text-[30px] sm:text-[36px] font-bold text-white tracking-tight">
              {{ category.name }}
            </h1>
            <p class="animate-fade-up delay-200 text-[#A1A1AA] mt-2 max-w-2xl">{{ category.description }}</p>
          </div>
        </div>
        <span class="animate-fade-up delay-300 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.06] text-[#A1A1AA] text-sm font-medium mt-4">
          <UIcon name="i-heroicons-user-group" class="w-4 h-4" />
          {{ categoryProviders.length }} {{ $t('categories.providers') || 'mesteri' }}
        </span>
      </div>
    </section>

    <!-- Providers grid -->
    <section class="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <div v-if="categoryProviders.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="(provider, i) in categoryProviders"
          :key="provider.id"
          class="animate-fade-up"
          :style="{ animationDelay: `${i * 0.06}s` }"
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
