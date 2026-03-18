<template>
  <div v-if="provider">
    <!-- Profile hero -->
    <section class="relative overflow-hidden py-16 lg:py-20" style="background: var(--gradient-dark-section)">
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute top-0 right-1/3 w-[500px] h-[400px] bg-indigo-600/10 rounded-full blur-[120px]" />
      </div>
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <UBreadcrumb :items="breadcrumbs" class="mb-8 text-indigo-200/50" />

        <div class="flex flex-col sm:flex-row items-start gap-6">
          <img
            :src="provider.avatar"
            :alt="provider.name"
            class="animate-fade-up w-24 h-24 rounded-2xl object-cover ring-4 ring-white/10 shadow-xl"
          />
          <div class="animate-fade-up delay-100">
            <div class="flex items-center gap-3 mb-2">
              <h1 class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">{{ provider.name }}</h1>
              <SharedVerifiedBadge v-if="provider.verified" />
            </div>
            <p class="text-lg text-indigo-200/60 mb-4">{{ provider.specialty }}</p>

            <!-- Stats pills -->
            <div class="flex flex-wrap gap-3">
              <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-sm text-indigo-200">
                <UIcon name="i-heroicons-star-solid" class="w-4 h-4 text-amber-400" />
                {{ provider.rating.toFixed(1) }} ({{ provider.reviewCount }})
              </span>
              <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-sm text-indigo-200">
                <UIcon name="i-heroicons-check-badge-solid" class="w-4 h-4 text-emerald-400" />
                {{ provider.completedJobs }} {{ $t('provider.completedJobs') || 'lucrari' }}
              </span>
              <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-sm text-indigo-200">
                <UIcon name="i-heroicons-map-pin" class="w-4 h-4" />
                {{ provider.city }}
              </span>
              <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-sm text-indigo-200">
                <UIcon name="i-heroicons-calendar" class="w-4 h-4" />
                {{ $t('provider.memberSince') || 'Membru din' }} {{ provider.memberSince.split('-')[0] }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Content -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main content -->
        <div class="lg:col-span-2 space-y-10">
          <!-- Bio -->
          <div class="animate-fade-up">
            <h2 class="text-xl font-bold text-gray-900 mb-4">{{ $t('provider.about') || 'Despre' }}</h2>
            <p class="text-gray-600 leading-relaxed">{{ provider.bio }}</p>
          </div>

          <!-- Services -->
          <div class="animate-fade-up delay-100">
            <h2 class="text-xl font-bold text-gray-900 mb-4">{{ $t('provider.services') || 'Servicii' }}</h2>
            <div class="space-y-3">
              <div
                v-for="service in provider.services"
                :key="service.name"
                class="p-4 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div class="flex items-start justify-between gap-4">
                  <div>
                    <h3 class="font-semibold text-gray-900 text-sm">{{ service.name }}</h3>
                    <p class="text-xs text-gray-500 mt-1">{{ service.description }}</p>
                  </div>
                  <span class="flex-shrink-0 text-sm font-bold text-indigo-600 whitespace-nowrap">
                    {{ service.priceFrom }} - {{ service.priceTo }} {{ service.currency }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Portfolio -->
          <div v-if="provider.portfolio.length > 0" class="animate-fade-up delay-200">
            <h2 class="text-xl font-bold text-gray-900 mb-4">{{ $t('provider.portfolio') || 'Portofoliu' }}</h2>
            <ProvidersPortfolioGallery :items="provider.portfolio" />
          </div>

          <!-- Reviews -->
          <div v-if="providerReviews.length > 0" class="animate-fade-up delay-300">
            <h2 class="text-xl font-bold text-gray-900 mb-4">
              {{ $t('provider.reviews') || 'Recenzii' }}
              <span class="text-sm font-normal text-gray-400 ml-2">({{ providerReviews.length }})</span>
            </h2>
            <div class="space-y-6">
              <div
                v-for="review in providerReviews"
                :key="review.id"
                class="p-5 rounded-xl bg-white border border-gray-100 shadow-sm"
              >
                <ProvidersReviewCard :review="review" />
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="lg:col-span-1">
          <div class="sticky top-24 space-y-4">
            <!-- Contact card -->
            <div class="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
              <h3 class="font-bold text-gray-900 mb-4">{{ $t('provider.contactTitle') || 'Contacteaza mesterul' }}</h3>
              <div class="space-y-3 mb-6">
                <div class="flex items-center gap-3 text-sm text-gray-600">
                  <UIcon name="i-heroicons-phone" class="w-5 h-5 text-gray-400" />
                  <span>{{ $t('provider.showPhone') || 'Afiseaza telefon' }}</span>
                </div>
                <div class="flex items-center gap-3 text-sm text-gray-600">
                  <UIcon name="i-heroicons-banknotes" class="w-5 h-5 text-gray-400" />
                  <span>{{ provider.priceRange }}</span>
                </div>
              </div>
              <UButton
                to="/cerere-noua"
                color="primary"
                block
                size="lg"
                class="font-semibold bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-500/20"
                trailing-icon="i-heroicons-arrow-right"
              >
                {{ $t('provider.requestQuote') || 'Solicita oferta' }}
              </UButton>
            </div>

            <!-- Categories -->
            <div class="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
              <h3 class="font-bold text-gray-900 mb-3 text-sm">{{ $t('provider.categories') || 'Categorii' }}</h3>
              <div class="flex flex-wrap gap-2">
                <NuxtLink
                  v-for="catSlug in provider.categories"
                  :key="catSlug"
                  :to="`/servicii/${catSlug}`"
                  class="inline-flex items-center px-3 py-1.5 rounded-lg bg-gray-50 text-xs font-medium text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                >
                  {{ getCategoryName(catSlug) }}
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <SharedBackToTop />
  </div>
</template>

<script setup lang="ts">
import { providers } from '~/data/providers'
import { reviews } from '~/data/reviews'
import { categories } from '~/data/categories'

const { t } = useI18n()
const route = useRoute()

const provider = providers.find(p => p.id === route.params.id)

if (!provider) {
  navigateTo('/mesteri', { replace: true })
}

useHead({ title: provider ? `${provider.name} — mesteri.md` : '' })

const providerReviews = computed(() =>
  reviews.filter(r => r.providerId === provider?.id)
)

const breadcrumbs = computed(() => [
  { label: t('breadcrumb.home'), to: '/' },
  { label: t('breadcrumb.providers'), to: '/mesteri' },
  { label: provider?.name || '' }
])

function getCategoryName(slug: string) {
  return categories.find(c => c.slug === slug)?.name || slug
}
</script>
