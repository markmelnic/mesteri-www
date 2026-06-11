<template>
  <div v-if="category" class="bg-stone-50 min-h-screen">
    <!-- Category header -->
    <section class="bg-white border-b border-stone-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <UBreadcrumb :items="breadcrumbs" class="mb-8" />
        <div class="flex items-start gap-5">
          <div class="animate-fade-up flex items-center justify-center w-16 h-16 rounded-2xl bg-orange-50 border border-orange-100 text-3xl shrink-0">
            {{ category.icon }}
          </div>
          <div>
            <h1 class="animate-fade-up delay-100 font-display text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight mb-2">
              {{ category.name }}
            </h1>
            <p class="animate-fade-up delay-200 text-stone-500 max-w-2xl">{{ category.description }}</p>
            <div class="animate-fade-up delay-300 flex flex-wrap items-center gap-3 mt-4">
              <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 border border-stone-200 text-stone-600 text-sm font-medium">
                <UIcon name="i-heroicons-user-group" class="w-4 h-4" />
                {{ categoryProviders.length }} {{ $t('categories.providers') }}
              </span>
              <NuxtLink
                :to="localePath(`/cerere-noua?category=${category.slug}`)"
                class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-600 text-white text-sm font-semibold hover:bg-orange-700 transition-colors"
              >
                {{ $t('categories.requestInCategory') }}
                <UIcon name="i-heroicons-arrow-right" class="w-3.5 h-3.5" />
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Providers grid -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
      <div v-if="categoryProviders.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <div
          v-for="(provider, i) in categoryProviders"
          :key="provider.id"
          class="animate-fade-up"
          :style="{ animationDelay: `${Math.min(i * 0.06, 0.4)}s` }"
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
const localePath = useLocalePath()

const category = categories.find(c => c.slug === route.params.slug)

if (!category) {
  navigateTo(localePath('/servicii'), { replace: true })
}

useHead({ title: category ? `${category.name} — mesteri.md` : '' })

const categoryProviders = computed(() =>
  providers
    .filter(p => p.categories.includes(route.params.slug as string))
    .sort((a, b) => b.rating - a.rating)
)

const breadcrumbs = computed(() => [
  { label: t('breadcrumb.home'), to: localePath('/') },
  { label: t('breadcrumb.services'), to: localePath('/servicii') },
  { label: category?.name || '' }
])
</script>
