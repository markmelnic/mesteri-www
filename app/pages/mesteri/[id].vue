<template>
  <div v-if="provider" class="bg-stone-50">
    <!-- Profile hero -->
    <section class="bg-white border-b border-stone-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <UBreadcrumb :items="breadcrumbs" class="mb-8" />

        <div class="flex flex-col sm:flex-row items-start gap-6">
          <img
            :src="provider.avatar"
            :alt="provider.name"
            class="animate-fade-up w-24 h-24 rounded-3xl object-cover ring-1 ring-stone-200 shadow-sm"
          />
          <div class="animate-fade-up delay-100 flex-1">
            <div class="flex flex-wrap items-center gap-3 mb-1.5">
              <h1 class="font-display text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">{{ provider.name }}</h1>
              <SharedVerifiedBadge v-if="provider.verified" />
            </div>
            <p class="text-lg text-stone-500 mb-4">{{ provider.specialty }}</p>

            <!-- Stats pills -->
            <div class="flex flex-wrap gap-2.5">
              <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-sm font-medium text-stone-700">
                <UIcon name="i-heroicons-star-solid" class="w-4 h-4 text-amber-400" />
                {{ provider.rating.toFixed(1) }} · {{ provider.reviewCount }} {{ $t('provider.reviewsShort') }}
              </span>
              <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-100 border border-stone-200 text-sm text-stone-600">
                <UIcon name="i-heroicons-briefcase" class="w-4 h-4 text-stone-400" />
                {{ provider.completedJobs }} {{ $t('provider.completedJobs') }}
              </span>
              <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-100 border border-stone-200 text-sm text-stone-600">
                <UIcon name="i-heroicons-map-pin" class="w-4 h-4 text-stone-400" />
                {{ provider.city }}
              </span>
              <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-100 border border-stone-200 text-sm text-stone-600">
                <UIcon name="i-heroicons-calendar" class="w-4 h-4 text-stone-400" />
                {{ $t('provider.memberSince') }} {{ provider.memberSince.split('-')[0] }}
              </span>
            </div>
          </div>
          <div class="hidden sm:block">
            <SharedFavoriteButton :provider-id="provider.id" />
          </div>
        </div>
      </div>
    </section>

    <!-- Content -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main content -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Bio -->
          <div class="animate-fade-up p-6 sm:p-8 rounded-2xl bg-white border border-stone-200">
            <h2 class="font-display text-xl font-semibold text-stone-900 mb-4">{{ $t('provider.about') }}</h2>
            <p class="text-stone-600 leading-relaxed">{{ provider.bio }}</p>
          </div>

          <!-- Services -->
          <div class="animate-fade-up delay-100 p-6 sm:p-8 rounded-2xl bg-white border border-stone-200">
            <h2 class="font-display text-xl font-semibold text-stone-900 mb-5">{{ $t('provider.services') }}</h2>
            <div class="divide-y divide-stone-100">
              <div
                v-for="service in provider.services"
                :key="service.name"
                class="py-4 first:pt-0 last:pb-0 flex items-start justify-between gap-4"
              >
                <div>
                  <h3 class="font-semibold text-stone-900 text-sm">{{ service.name }}</h3>
                  <p class="text-sm text-stone-500 mt-1">{{ service.description }}</p>
                </div>
                <span class="shrink-0 text-sm font-bold text-stone-900 whitespace-nowrap">
                  {{ service.priceFrom }}<template v-if="service.priceTo">–{{ service.priceTo }}</template> {{ service.currency }}
                </span>
              </div>
            </div>
          </div>

          <!-- Portfolio -->
          <div v-if="provider.portfolio.length > 0" class="animate-fade-up delay-200 p-6 sm:p-8 rounded-2xl bg-white border border-stone-200">
            <h2 class="font-display text-xl font-semibold text-stone-900 mb-5">{{ $t('provider.portfolio') }}</h2>
            <ProvidersPortfolioGallery :items="provider.portfolio" />
          </div>

          <!-- Reviews -->
          <div v-if="providerReviews.length > 0" class="animate-fade-up delay-300 p-6 sm:p-8 rounded-2xl bg-white border border-stone-200">
            <h2 class="font-display text-xl font-semibold text-stone-900 mb-6">
              {{ $t('provider.reviews') }}
              <span class="text-sm font-normal text-stone-400 ml-1">({{ providerReviews.length }})</span>
            </h2>

            <!-- Rating summary -->
            <div class="flex flex-col sm:flex-row gap-8 mb-8 pb-8 border-b border-stone-100">
              <div class="text-center sm:text-left">
                <p class="font-display text-5xl font-bold text-stone-900">{{ provider.rating.toFixed(1) }}</p>
                <SharedRatingStars :rating="provider.rating" class="mt-2 justify-center sm:justify-start" />
                <p class="text-sm text-stone-400 mt-1">{{ providerReviews.length }} {{ $t('provider.reviewsShort') }}</p>
              </div>
              <div class="flex-1 space-y-1.5">
                <div v-for="stars in [5, 4, 3, 2, 1]" :key="stars" class="flex items-center gap-3">
                  <span class="text-xs font-medium text-stone-500 w-3">{{ stars }}</span>
                  <UIcon name="i-heroicons-star-solid" class="w-3.5 h-3.5 text-amber-400" />
                  <div class="flex-1 h-2 rounded-full bg-stone-100 overflow-hidden">
                    <div
                      class="h-full rounded-full bg-amber-400"
                      :style="{ width: `${ratingBreakdown[stars] || 0}%` }"
                    />
                  </div>
                  <span class="text-xs text-stone-400 w-8 text-right">{{ Math.round(ratingBreakdown[stars] || 0) }}%</span>
                </div>
              </div>
            </div>

            <div class="space-y-6">
              <div
                v-for="review in providerReviews"
                :key="review.id"
                class="pb-6 border-b border-stone-100 last:border-0 last:pb-0"
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
            <div class="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm">
              <h3 class="font-display font-semibold text-stone-900 mb-5">{{ $t('provider.contactTitle') }}</h3>

              <div class="space-y-3 mb-6">
                <button
                  type="button"
                  class="flex items-center gap-3 w-full p-3 rounded-xl border border-stone-200 hover:border-stone-300 hover:bg-stone-50 transition-colors text-left"
                  @click="phoneRevealed = true"
                >
                  <div class="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center shrink-0">
                    <UIcon name="i-heroicons-phone" class="w-4 h-4 text-orange-600" />
                  </div>
                  <div class="min-w-0">
                    <p class="text-xs text-stone-400">{{ $t('provider.phoneLabel') }}</p>
                    <p class="text-sm font-semibold text-stone-900">
                      {{ phoneRevealed ? '+373 69 123 456' : $t('provider.showPhone') }}
                    </p>
                  </div>
                </button>
                <div class="flex items-center gap-3 p-3 rounded-xl bg-stone-50 border border-stone-100">
                  <div class="w-9 h-9 rounded-lg bg-white border border-stone-200 flex items-center justify-center shrink-0">
                    <UIcon name="i-heroicons-banknotes" class="w-4 h-4 text-stone-500" />
                  </div>
                  <div>
                    <p class="text-xs text-stone-400">{{ $t('provider.priceRange') }}</p>
                    <p class="text-sm font-semibold text-stone-900">{{ provider.priceRange }}</p>
                  </div>
                </div>
              </div>

              <NuxtLink
                :to="localePath(`/cerere-noua?category=${provider.categories[0]}`)"
                class="flex items-center justify-center gap-2 w-full px-4 py-3 text-sm font-semibold text-white bg-orange-600 hover:bg-orange-700 rounded-xl transition-colors shadow-lg shadow-orange-600/20"
              >
                {{ $t('provider.requestQuote') }}
                <UIcon name="i-heroicons-arrow-right" class="w-4 h-4" />
              </NuxtLink>
              <p class="text-xs text-stone-400 text-center mt-3 flex items-center justify-center gap-1">
                <UIcon name="i-heroicons-shield-check" class="w-3.5 h-3.5 text-emerald-500" />
                {{ $t('provider.freeQuote') }}
              </p>
            </div>

            <!-- Categories -->
            <div class="p-6 rounded-2xl bg-white border border-stone-200">
              <h3 class="font-semibold text-stone-900 mb-3 text-sm">{{ $t('provider.categories') }}</h3>
              <div class="flex flex-wrap gap-2">
                <NuxtLink
                  v-for="catSlug in provider.categories"
                  :key="catSlug"
                  :to="localePath(`/servicii/${catSlug}`)"
                  class="inline-flex items-center px-3 py-1.5 rounded-lg bg-stone-100 text-xs font-medium text-stone-600 hover:bg-orange-50 hover:text-orange-700 transition-colors"
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
const localePath = useLocalePath()

const provider = providers.find(p => p.id === route.params.id)

if (!provider) {
  navigateTo(localePath('/mesteri'), { replace: true })
}

useHead({ title: provider ? `${provider.name} — mesteri.md` : '' })

const phoneRevealed = ref(false)

const providerReviews = computed(() =>
  reviews.filter(r => r.providerId === provider?.id)
)

const ratingBreakdown = computed<Record<number, number>>(() => {
  const total = providerReviews.value.length
  if (!total) return {}
  const counts: Record<number, number> = {}
  for (const r of providerReviews.value) {
    counts[r.rating] = (counts[r.rating] || 0) + 1
  }
  const pct: Record<number, number> = {}
  for (const [stars, count] of Object.entries(counts)) {
    pct[Number(stars)] = (count / total) * 100
  }
  return pct
})

const breadcrumbs = computed(() => [
  { label: t('breadcrumb.home'), to: localePath('/') },
  { label: t('breadcrumb.providers'), to: localePath('/mesteri') },
  { label: provider?.name || '' }
])

function getCategoryName(slug: string) {
  return categories.find(c => c.slug === slug)?.name || slug
}
</script>
