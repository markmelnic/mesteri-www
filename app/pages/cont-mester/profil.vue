<template>
  <div class="max-w-3xl">
    <div class="flex items-center justify-between mb-8">
      <h1 class="font-display text-2xl font-bold text-stone-900 tracking-tight">{{ $t('providerDashboard.profileTitle') }}</h1>
      <NuxtLink
        v-if="provider"
        :to="localePath(`/mesteri/${provider.id}`)"
        class="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-stone-700 bg-white border border-stone-200 hover:bg-stone-50 rounded-xl transition-colors"
      >
        <UIcon name="i-heroicons-eye" class="w-4 h-4" />
        {{ $t('providerDashboard.previewProfile') }}
      </NuxtLink>
    </div>

    <!-- Quick stats -->
    <div v-if="provider" class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
      <div class="p-4 rounded-2xl bg-white border border-stone-200 text-center">
        <p class="font-display text-2xl font-bold text-stone-900 flex items-center justify-center gap-1">
          {{ provider.rating.toFixed(1) }}
          <UIcon name="i-heroicons-star-solid" class="w-4 h-4 text-amber-400" />
        </p>
        <p class="text-xs text-stone-500 mt-1">{{ $t('providerDashboard.ratingLabel') }}</p>
      </div>
      <div class="p-4 rounded-2xl bg-white border border-stone-200 text-center">
        <p class="font-display text-2xl font-bold text-stone-900">{{ provider.reviewCount }}</p>
        <p class="text-xs text-stone-500 mt-1">{{ $t('providerDashboard.reviews') }}</p>
      </div>
      <div class="p-4 rounded-2xl bg-white border border-stone-200 text-center">
        <p class="font-display text-2xl font-bold text-stone-900">{{ provider.completedJobs }}</p>
        <p class="text-xs text-stone-500 mt-1">{{ $t('provider.completedJobs') }}</p>
      </div>
      <div class="p-4 rounded-2xl bg-white border border-stone-200 text-center">
        <p class="font-display text-2xl font-bold text-stone-900">{{ provider.services.length }}</p>
        <p class="text-xs text-stone-500 mt-1">{{ $t('dashboard.services') }}</p>
      </div>
    </div>

    <div v-if="provider" class="p-6 lg:p-8 rounded-2xl bg-white border border-stone-200">
      <div class="flex items-center gap-4 mb-8 pb-6 border-b border-stone-100">
        <UAvatar :src="provider.avatar" :alt="provider.name" size="3xl" />
        <div>
          <p class="font-display font-semibold text-stone-900 text-lg">{{ provider.name }}</p>
          <p class="text-sm text-stone-500">{{ provider.specialty }}</p>
          <SharedVerifiedBadge v-if="provider.verified" class="mt-2" />
        </div>
      </div>

      <form class="space-y-5" @submit.prevent="saveProfile">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <UFormField :label="$t('providerDashboard.name')">
            <UInput v-model="form.name" class="w-full" />
          </UFormField>
          <UFormField :label="$t('providerDashboard.specialty')">
            <UInput v-model="form.specialty" class="w-full" />
          </UFormField>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <UFormField :label="$t('providerDashboard.city')">
            <USelect v-model="form.city" :items="cities" class="w-full" />
          </UFormField>
          <UFormField :label="$t('providerDashboard.phone')">
            <UInput v-model="form.phone" type="tel" class="w-full" />
          </UFormField>
        </div>
        <UFormField :label="$t('providerDashboard.aboutMe')">
          <UTextarea v-model="form.bio" :rows="5" class="w-full" />
        </UFormField>
        <button type="submit" class="px-5 py-2.5 text-sm font-semibold text-white bg-orange-600 hover:bg-orange-700 rounded-xl transition-colors">
          {{ $t('providerDashboard.save') }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { providers } from '~/data/providers'

const { t } = useI18n()
const localePath = useLocalePath()
definePageMeta({ layout: 'dashboard', middleware: ['role'] })
useHead({ title: t('providerDashboard.profilePageTitle') })

const { user } = useAuth()
const toast = useToast()

const provider = providers.find(p => p.id === user.value?.providerId)

const form = reactive({
  name: provider?.name || '',
  specialty: provider?.specialty || '',
  city: provider?.city || '',
  phone: user.value?.phone || '',
  bio: provider?.bio || ''
})

const cities = ['Chișinău', 'Bălți', 'Cahul', 'Comrat', 'Orhei', 'Soroca', 'Ungheni']

function saveProfile() {
  toast.add({ title: t('providerDashboard.saved'), icon: 'i-heroicons-check-circle', color: 'success' })
}
</script>
