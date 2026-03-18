<template>
  <div v-if="provider">
    <!-- Profile hero -->
    <section class="relative overflow-hidden py-16 lg:py-20 bg-[#0A0A0A]">
      <div class="absolute top-0 right-1/3 w-[400px] h-[300px] bg-[#0D9373]/[0.06] rounded-full blur-[140px] pointer-events-none" />
      <div class="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <UBreadcrumb :items="breadcrumbs" class="mb-8" />

        <div class="flex flex-col sm:flex-row items-start gap-6">
          <img
            :src="provider.avatar"
            :alt="provider.name"
            class="animate-fade-up w-20 h-20 rounded-xl object-cover ring-2 ring-white/[0.06]"
          />
          <div class="animate-fade-up delay-100">
            <div class="flex items-center gap-3 mb-2">
              <h1 class="text-[30px] sm:text-[36px] font-bold text-white tracking-tight">{{ provider.name }}</h1>
              <SharedVerifiedBadge v-if="provider.verified" />
            </div>
            <p class="text-lg text-[#A1A1AA] mb-4">{{ provider.specialty }}</p>

            <!-- Stats pills -->
            <div class="flex flex-wrap gap-3">
              <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-sm text-[#A1A1AA]">
                <UIcon name="i-heroicons-star-solid" class="w-4 h-4 text-amber-400" />
                {{ provider.rating.toFixed(1) }} ({{ provider.reviewCount }})
              </span>
              <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-sm text-[#A1A1AA]">
                <UIcon name="i-heroicons-check-badge-solid" class="w-4 h-4 text-[#0D9373]" />
                {{ provider.completedJobs }} {{ $t('provider.completedJobs') || 'lucrari' }}
              </span>
              <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-sm text-[#A1A1AA]">
                <UIcon name="i-heroicons-map-pin" class="w-4 h-4" />
                {{ provider.city }}
              </span>
              <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-sm text-[#A1A1AA]">
                <UIcon name="i-heroicons-calendar" class="w-4 h-4" />
                {{ $t('provider.memberSince') || 'Membru din' }} {{ provider.memberSince.split('-')[0] }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Content -->
    <section class="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main content -->
        <div class="lg:col-span-2 space-y-10">
          <!-- Bio -->
          <div class="animate-fade-up">
            <h2 class="text-xl font-semibold text-white mb-4">{{ $t('provider.about') || 'Despre' }}</h2>
            <p class="text-[#A1A1AA] leading-relaxed">{{ provider.bio }}</p>
          </div>

          <!-- Services -->
          <div class="animate-fade-up delay-100">
            <h2 class="text-xl font-semibold text-white mb-4">{{ $t('provider.services') || 'Servicii' }}</h2>
            <div class="space-y-3">
              <div
                v-for="service in provider.services"
                :key="service.name"
                class="p-4 rounded-xl bg-[#141416] border border-white/[0.06] hover:border-white/[0.12] transition-all duration-150"
              >
                <div class="flex items-start justify-between gap-4">
                  <div>
                    <h3 class="font-semibold text-white text-sm">{{ service.name }}</h3>
                    <p class="text-xs text-[#A1A1AA] mt-1">{{ service.description }}</p>
                  </div>
                  <span class="flex-shrink-0 text-sm font-bold text-[#0D9373] whitespace-nowrap">
                    {{ service.priceFrom }} - {{ service.priceTo }} {{ service.currency }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Portfolio -->
          <div v-if="provider.portfolio.length > 0" class="animate-fade-up delay-200">
            <h2 class="text-xl font-semibold text-white mb-4">{{ $t('provider.portfolio') || 'Portofoliu' }}</h2>
            <ProvidersPortfolioGallery :items="provider.portfolio" />
          </div>

          <!-- Reviews -->
          <div v-if="providerReviews.length > 0" class="animate-fade-up delay-300">
            <h2 class="text-xl font-semibold text-white mb-4">
              {{ $t('provider.reviews') || 'Recenzii' }}
              <span class="text-sm font-normal text-[#63636E] ml-2">({{ providerReviews.length }})</span>
            </h2>
            <div class="space-y-4">
              <div
                v-for="review in providerReviews"
                :key="review.id"
                class="p-5 rounded-xl bg-[#141416] border border-white/[0.06]"
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
            <div class="p-6 rounded-xl bg-[#141416] border border-white/[0.06]">
              <h3 class="font-semibold text-white mb-4">{{ $t('provider.contactTitle') || 'Contacteaza mesterul' }}</h3>
              <div class="space-y-3 mb-6">
                <div class="flex items-center gap-3 text-sm text-[#A1A1AA]">
                  <UIcon name="i-heroicons-phone" class="w-4 h-4 text-[#63636E]" />
                  <span>{{ $t('provider.showPhone') || 'Afiseaza telefon' }}</span>
                </div>
                <div class="flex items-center gap-3 text-sm text-[#A1A1AA]">
                  <UIcon name="i-heroicons-banknotes" class="w-4 h-4 text-[#63636E]" />
                  <span>{{ provider.priceRange }}</span>
                </div>
              </div>
              <NuxtLink
                to="/cerere-noua"
                class="flex items-center justify-center gap-2 w-full px-4 py-3 text-sm font-semibold text-white bg-[#0D9373] hover:bg-[#0FAA84] rounded-lg transition-colors duration-150"
              >
                {{ $t('provider.requestQuote') || 'Solicita oferta' }}
                <UIcon name="i-heroicons-arrow-right" class="w-4 h-4" />
              </NuxtLink>
            </div>

            <!-- Categories -->
            <div class="p-6 rounded-xl bg-[#141416] border border-white/[0.06]">
              <h3 class="font-semibold text-white mb-3 text-sm">{{ $t('provider.categories') || 'Categorii' }}</h3>
              <div class="flex flex-wrap gap-2">
                <NuxtLink
                  v-for="catSlug in provider.categories"
                  :key="catSlug"
                  :to="`/servicii/${catSlug}`"
                  class="inline-flex items-center px-3 py-1.5 rounded-md bg-white/[0.04] text-xs font-medium text-[#A1A1AA] hover:bg-[#0D9373]/10 hover:text-[#2AB673] transition-colors duration-150"
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
