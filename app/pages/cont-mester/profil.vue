<template>
  <div>
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-2xl font-extrabold text-gray-900 tracking-tight">{{ $t('providerDashboard.profileTitle') }}</h1>
      <UButton v-if="provider" :to="`/mesteri/${provider.id}`" variant="outline" color="neutral" icon="i-heroicons-eye" class="font-medium">
        {{ $t('providerDashboard.previewProfile') }}
      </UButton>
    </div>

    <div v-if="provider" class="p-6 lg:p-8 rounded-2xl bg-white border border-gray-100 shadow-sm max-w-2xl">
      <div class="flex items-center gap-4 mb-8 pb-6 border-b border-gray-100">
        <UAvatar :src="provider.avatar" :alt="provider.name" size="3xl" class="ring-4 ring-indigo-50" />
        <div>
          <p class="font-bold text-gray-900 text-lg">{{ provider.name }}</p>
          <p class="text-sm text-gray-500">{{ provider.specialty }}</p>
          <SharedVerifiedBadge v-if="provider.verified" class="mt-2" />
        </div>
      </div>

      <form class="space-y-5" @submit.prevent="saveProfile">
        <UFormField :label="$t('providerDashboard.name')">
          <UInput v-model="form.name" />
        </UFormField>
        <UFormField :label="$t('providerDashboard.specialty')">
          <UInput v-model="form.specialty" />
        </UFormField>
        <UFormField :label="$t('providerDashboard.city')">
          <USelect v-model="form.city" :items="cities" />
        </UFormField>
        <UFormField :label="$t('providerDashboard.phone')">
          <UInput v-model="form.phone" type="tel" />
        </UFormField>
        <UFormField :label="$t('providerDashboard.aboutMe')">
          <UTextarea v-model="form.bio" :rows="5" />
        </UFormField>
        <UButton type="submit" color="primary" class="font-semibold bg-indigo-600 hover:bg-indigo-700">{{ $t('providerDashboard.save') }}</UButton>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { providers } from '~/data/providers'

const { t } = useI18n()
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
