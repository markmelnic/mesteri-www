<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <template v-if="provider">
      <UBreadcrumb :items="[{ label: $t('breadcrumb.home'), to: '/' }, { label: $t('breadcrumb.providers'), to: '/mesteri' }, { label: provider.name }]" class="mb-6" />

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Content -->
        <div class="lg:col-span-2 space-y-8">
          <!-- Profile Header -->
          <div class="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
            <div class="flex flex-col sm:flex-row items-start gap-6">
              <UAvatar :src="provider.avatar" :alt="provider.name" size="3xl" />
              <div class="flex-1">
                <div class="flex items-center gap-3 mb-2">
                  <h1 class="text-2xl font-bold text-gray-900">
                    {{ provider.name }}
                  </h1>
                  <SharedVerifiedBadge v-if="provider.verified" />
                </div>
                <p class="text-gray-600 mb-3">{{ provider.specialty }}</p>
                <div class="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
                  <SharedRatingStars :rating="provider.rating" show-value :count="provider.reviewCount" />
                  <span class="flex items-center gap-1">
                    <UIcon name="i-heroicons-map-pin" class="w-4 h-4" />
                    {{ provider.city }}
                  </span>
                  <span class="flex items-center gap-1">
                    <UIcon name="i-heroicons-briefcase" class="w-4 h-4" />
                    {{ provider.completedJobs }} {{ $t('providerCard.jobs') }}
                  </span>
                  <span class="flex items-center gap-1">
                    <UIcon name="i-heroicons-calendar" class="w-4 h-4" />
                    {{ $t('providerCard.memberSince') }} {{ formatDate(provider.memberSince) }}
                  </span>
                </div>
                <div class="flex gap-3">
                  <UButton color="primary" icon="i-heroicons-paper-airplane" @click="scrollToQuote">
                    {{ $t('providerProfile.requestQuote') }}
                  </UButton>
                  <SharedFavoriteButton :provider-id="provider.id" />
                </div>
              </div>
            </div>
          </div>

          <!-- About -->
          <div class="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">{{ $t('providerProfile.aboutMe') }}</h2>
            <p class="text-gray-600 leading-relaxed">{{ provider.bio }}</p>
          </div>

          <!-- Services & Pricing -->
          <div class="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">{{ $t('providerProfile.servicesPricing') }}</h2>
            <div class="space-y-4">
              <div v-for="service in provider.services" :key="service.name" class="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p class="font-medium text-gray-900">{{ service.name }}</p>
                  <p class="text-sm text-gray-500 mt-0.5">{{ service.description }}</p>
                </div>
                <div class="text-right flex-shrink-0 ml-4">
                  <p class="font-semibold text-gray-900">{{ $t('providerProfile.priceFrom') }} {{ service.priceFrom }} {{ service.currency }}</p>
                  <p v-if="service.priceTo" class="text-xs text-gray-500">{{ $t('providerProfile.priceTo') }} {{ service.priceTo }} {{ service.currency }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Portfolio -->
          <div v-if="provider.portfolio.length > 0" class="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">{{ $t('providerProfile.portfolio') }}</h2>
            <ProvidersPortfolioGallery :items="provider.portfolio" />
          </div>

          <!-- Reviews -->
          <div class="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-lg font-semibold text-gray-900">{{ $t('providerProfile.reviews') }}</h2>
              <div class="flex items-center gap-2">
                <SharedRatingStars :rating="provider.rating" show-value />
                <span class="text-sm text-gray-500">({{ providerReviews.length }} {{ $t('reviews.count') }})</span>
              </div>
            </div>

            <!-- Rating breakdown -->
            <div class="mb-6 space-y-2">
              <div v-for="stars in [5, 4, 3, 2, 1]" :key="stars" class="flex items-center gap-3">
                <span class="text-sm text-gray-500 w-16">{{ stars }} {{ $t('reviews.stars') }}</span>
                <div class="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div class="h-full bg-amber-400 rounded-full" :style="{ width: `${getStarPercentage(stars)}%` }" />
                </div>
                <span class="text-sm text-gray-500 w-8 text-right">{{ getStarCount(stars) }}</span>
              </div>
            </div>

            <div class="space-y-4">
              <ProvidersReviewCard
                v-for="review in providerReviews"
                :key="review.id"
                :review="review"
              />
            </div>
          </div>

          <!-- Verification Info -->
          <div v-if="provider.verified" class="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">{{ $t('providerProfile.verifications') }}</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div v-for="check in verifications" :key="check.label" class="flex items-center gap-3 p-3 bg-emerald-50 rounded-lg">
                <UIcon :name="check.icon" class="w-5 h-5 text-emerald-600" />
                <span class="text-sm font-medium text-emerald-800">{{ check.label }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar - Quote Form -->
        <div class="lg:col-span-1">
          <div ref="quoteRef" class="bg-white rounded-xl border border-gray-100 p-6 shadow-sm sticky top-24">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">{{ $t('providerProfile.freeQuote') }}</h3>
            <form class="space-y-4" @submit.prevent="submitQuote">
              <UFormField :label="$t('providerProfile.describeWork')">
                <UTextarea v-model="quoteForm.description" :placeholder="$t('providerProfile.workPlaceholder')" :rows="4" />
              </UFormField>
              <UFormField :label="$t('providerProfile.preferredDate')">
                <UInput v-model="quoteForm.date" type="date" />
              </UFormField>
              <UFormField :label="$t('providerProfile.phone')">
                <UInput v-model="quoteForm.phone" placeholder="+373 ..." type="tel" />
              </UFormField>
              <UButton type="submit" color="primary" block size="lg">
                {{ $t('providerProfile.sendRequest') }}
              </UButton>
            </form>
          </div>
        </div>
      </div>
    </template>

    <SharedEmptyState
      v-else
      icon="i-heroicons-exclamation-triangle"
      :title="$t('providerProfile.notFound')"
      :description="$t('providerProfile.notFoundDesc')"
      :action-label="$t('providerProfile.backToProviders')"
      action-to="/mesteri"
    />

    <SharedBackToTop />
  </div>
</template>

<script setup lang="ts">
import { providers } from '~/data/providers'
import { reviews } from '~/data/reviews'

const { t, locale } = useI18n()
const route = useRoute()
const toast = useToast()

const provider = providers.find(p => p.id === route.params.id)

useHead({ title: provider ? `${provider.name} — mesteri.md` : `${t('providerProfile.notFound')} — mesteri.md` })

const providerReviews = computed(() =>
  provider ? reviews.filter(r => r.providerId === provider.id) : []
)

const quoteRef = ref<HTMLElement>()
const quoteForm = reactive({ description: '', date: '', phone: '' })

function scrollToQuote() {
  quoteRef.value?.scrollIntoView({ behavior: 'smooth' })
}

function submitQuote() {
  toast.add({ title: t('providerProfile.requestSent'), description: t('providerProfile.requestSentDesc'), icon: 'i-heroicons-check-circle', color: 'success' })
  Object.assign(quoteForm, { description: '', date: '', phone: '' })
}

function getStarCount(stars: number) {
  return providerReviews.value.filter(r => Math.round(r.rating) === stars).length
}

function getStarPercentage(stars: number) {
  const total = providerReviews.value.length
  return total ? (getStarCount(stars) / total) * 100 : 0
}

function formatDate(date: string) {
  const loc = locale.value === 'ru' ? 'ru-RU' : locale.value === 'en' ? 'en-US' : 'ro-RO'
  return new Date(date).toLocaleDateString(loc, { month: 'long', year: 'numeric' })
}

const verifications = computed(() => [
  { icon: 'i-heroicons-identification', label: t('providerProfile.identityVerified') },
  { icon: 'i-heroicons-phone', label: t('providerProfile.phoneVerified') },
  { icon: 'i-heroicons-photo', label: t('providerProfile.portfolioVerified') },
  { icon: 'i-heroicons-shield-check', label: t('providerProfile.docsVerified') }
])
</script>
