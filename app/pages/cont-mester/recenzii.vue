<template>
  <div>
    <h1 class="text-2xl font-bold text-gray-900 mb-6">{{ $t('providerDashboard.reviewsTitle') }}</h1>

    <!-- Average Rating -->
    <div v-if="providerReviews.length > 0" class="bg-white rounded-xl border border-gray-100 p-6 shadow-sm mb-6">
      <div class="flex items-center gap-4">
        <div class="text-center">
          <p class="text-4xl font-bold text-gray-900">{{ provider?.rating.toFixed(1) }}</p>
          <SharedRatingStars :rating="provider?.rating || 0" class="mt-1" />
          <p class="text-sm text-gray-500 mt-1">{{ providerReviews.length }} {{ $t('providerDashboard.reviews') }}</p>
        </div>
      </div>
    </div>

    <div v-if="providerReviews.length > 0" class="space-y-4">
      <div v-for="review in providerReviews" :key="review.id" class="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
        <ProvidersReviewCard :review="review" />
        <div v-if="!review.reply" class="mt-4 pt-4 border-t border-gray-100">
          <div v-if="replyingTo === review.id" class="flex gap-3">
            <UTextarea v-model="replyText" :placeholder="$t('providerDashboard.replyPlaceholder')" :rows="2" class="flex-1" />
            <div class="flex flex-col gap-2">
              <UButton size="sm" color="primary" @click="submitReply(review.id)">{{ $t('providerDashboard.sendReply') }}</UButton>
              <UButton size="sm" variant="ghost" color="neutral" @click="replyingTo = ''">{{ $t('providerDashboard.cancelReply') }}</UButton>
            </div>
          </div>
          <UButton v-else variant="ghost" size="sm" icon="i-heroicons-chat-bubble-left" @click="replyingTo = review.id">
            {{ $t('providerDashboard.reply') }}
          </UButton>
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

const replyingTo = ref('')
const replyText = ref('')

function submitReply(reviewId: string) {
  toast.add({ title: t('providerDashboard.replySent'), icon: 'i-heroicons-check-circle', color: 'success' })
  replyingTo.value = ''
  replyText.value = ''
}
</script>
