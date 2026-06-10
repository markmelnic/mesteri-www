<template>
  <div class="max-w-4xl">
    <h1 class="font-display text-2xl font-bold text-stone-900 tracking-tight mb-8">{{ $t('providerDashboard.reviewsTitle') }}</h1>

    <!-- Average Rating -->
    <div v-if="providerReviews.length > 0" class="p-6 rounded-2xl bg-white border border-stone-200 mb-6">
      <div class="flex items-center gap-8">
        <div class="text-center">
          <p class="font-display text-5xl font-bold text-stone-900 tracking-tight">{{ provider?.rating.toFixed(1) }}</p>
          <SharedRatingStars :rating="provider?.rating || 0" class="mt-2 justify-center" />
          <p class="text-sm text-stone-400 mt-2">{{ providerReviews.length }} {{ $t('providerDashboard.reviews') }}</p>
        </div>
        <div class="flex-1 space-y-1.5">
          <div v-for="stars in [5, 4, 3, 2, 1]" :key="stars" class="flex items-center gap-3">
            <span class="text-xs font-medium text-stone-500 w-3">{{ stars }}</span>
            <UIcon name="i-heroicons-star-solid" class="w-3.5 h-3.5 text-amber-400" />
            <div class="flex-1 h-2 rounded-full bg-stone-100 overflow-hidden">
              <div class="h-full rounded-full bg-amber-400" :style="{ width: `${breakdown[stars] || 0}%` }" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="providerReviews.length > 0" class="space-y-4">
      <div v-for="review in providerReviews" :key="review.id" class="p-6 rounded-2xl bg-white border border-stone-200">
        <ProvidersReviewCard :review="review" />
        <div v-if="!review.reply" class="mt-5 pt-5 border-t border-stone-100">
          <div v-if="replyingTo === review.id" class="space-y-3">
            <UTextarea v-model="replyText" :placeholder="$t('providerDashboard.replyPlaceholder')" :rows="2" class="w-full" />
            <div class="flex gap-2">
              <button
                type="button"
                class="px-4 py-2 text-sm font-semibold text-white bg-orange-600 hover:bg-orange-700 rounded-xl transition-colors"
                @click="submitReply(review.id)"
              >
                {{ $t('providerDashboard.sendReply') }}
              </button>
              <button type="button" class="px-4 py-2 text-sm font-medium text-stone-500 hover:bg-stone-100 rounded-xl transition-colors" @click="replyingTo = ''">
                {{ $t('providerDashboard.cancelReply') }}
              </button>
            </div>
          </div>
          <button
            v-else
            type="button"
            class="inline-flex items-center gap-1.5 text-sm font-semibold text-orange-600 hover:text-orange-700 transition-colors"
            @click="replyingTo = review.id"
          >
            <UIcon name="i-heroicons-chat-bubble-left" class="w-4 h-4" />
            {{ $t('providerDashboard.reply') }}
          </button>
        </div>
      </div>
    </div>

    <SharedEmptyState
      v-else
      icon="i-heroicons-star"
      :title="$t('providerDashboard.noReviews')"
      :description="$t('providerDashboard.noReviewsDesc')"
    />
  </div>
</template>

<script setup lang="ts">
import { providers } from '~/data/providers'
import { reviews } from '~/data/reviews'

const { t } = useI18n()
definePageMeta({ layout: 'dashboard', middleware: ['role'] })
useHead({ title: t('providerDashboard.reviewsPageTitle') })

const { user } = useAuth()
const toast = useToast()

const provider = providers.find(p => p.id === user.value?.providerId)
const providerReviews = reviews.filter(r => r.providerId === provider?.id)

const breakdown = computed<Record<number, number>>(() => {
  const total = providerReviews.length
  if (!total) return {}
  const counts: Record<number, number> = {}
  for (const r of providerReviews) {
    counts[r.rating] = (counts[r.rating] || 0) + 1
  }
  const pct: Record<number, number> = {}
  for (const [stars, count] of Object.entries(counts)) {
    pct[Number(stars)] = (count / total) * 100
  }
  return pct
})

const replyingTo = ref('')
const replyText = ref('')

function submitReply(_reviewId: string) {
  toast.add({ title: t('providerDashboard.replySent'), icon: 'i-heroicons-check-circle', color: 'success' })
  replyingTo.value = ''
  replyText.value = ''
}
</script>
