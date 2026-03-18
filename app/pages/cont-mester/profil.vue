<template>
  <div>
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-2xl font-bold text-white tracking-tight">{{ $t('providerDashboard.profileTitle') }}</h1>
      <NuxtLink v-if="provider" :to="`/mesteri/${provider.id}`" class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#A1A1AA] border border-white/[0.06] hover:border-white/[0.12] hover:text-white rounded-lg transition-all duration-150">
        <UIcon name="i-heroicons-eye" class="w-4 h-4" />
        {{ $t('providerDashboard.previewProfile') }}
      </NuxtLink>
    </div>

    <div v-if="provider" class="p-6 lg:p-8 rounded-xl bg-[#141416] border border-white/[0.06] max-w-2xl">
      <div class="flex items-center gap-4 mb-8 pb-6 border-b border-white/[0.06]">
        <UAvatar :src="provider.avatar" :alt="provider.name" size="3xl" />
        <div>
          <p class="font-semibold text-white text-lg">{{ provider.name }}</p>
          <p class="text-sm text-[#A1A1AA]">{{ provider.specialty }}</p>
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
        <button type="submit" class="px-5 py-2.5 text-sm font-semibold text-white bg-[#0D9373] hover:bg-[#0FAA84] rounded-lg transition-colors duration-150">
          {{ $t('providerDashboard.save') }}
        </button>
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
