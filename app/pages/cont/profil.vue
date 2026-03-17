<template>
  <div>
    <h1 class="text-2xl font-bold text-gray-900 mb-6">{{ $t('clientProfile.title') }}</h1>

    <div class="bg-white rounded-xl border border-gray-100 p-6 shadow-sm max-w-2xl">
      <div class="flex items-center gap-4 mb-6">
        <UAvatar :src="user?.avatar" :alt="user?.name" size="3xl" />
        <div>
          <p class="font-semibold text-gray-900">{{ user?.name }}</p>
          <p class="text-sm text-gray-500">{{ user?.email }}</p>
        </div>
      </div>

      <form class="space-y-4" @submit.prevent="saveProfile">
        <UFormField :label="$t('clientProfile.fullName')">
          <UInput v-model="form.name" />
        </UFormField>
        <UFormField :label="$t('clientProfile.email')">
          <UInput v-model="form.email" type="email" />
        </UFormField>
        <UFormField :label="$t('clientProfile.phone')">
          <UInput v-model="form.phone" type="tel" />
        </UFormField>
        <UFormField :label="$t('clientProfile.city')">
          <USelect v-model="form.city" :items="cities" />
        </UFormField>
        <UButton type="submit" color="primary">{{ $t('clientProfile.save') }}</UButton>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
definePageMeta({ layout: 'dashboard', middleware: ['role'] })
useHead({ title: t('clientProfile.pageTitle') })

const { user } = useAuth()
const toast = useToast()

const form = reactive({
  name: user.value?.name || '',
  email: user.value?.email || '',
  phone: user.value?.phone || '',
  city: user.value?.city || ''
})

const cities = ['Chișinău', 'Bălți', 'Cahul', 'Comrat', 'Orhei', 'Soroca', 'Ungheni']

function saveProfile() {
  toast.add({ title: t('clientProfile.saved'), icon: 'i-heroicons-check-circle', color: 'success' })
}
</script>
