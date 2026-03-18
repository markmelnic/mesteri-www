<template>
  <div>
    <h1 class="text-2xl font-extrabold text-gray-900 tracking-tight mb-8">{{ $t('clientProfile.title') }}</h1>

    <div class="p-6 lg:p-8 rounded-2xl bg-white border border-gray-100 shadow-sm max-w-2xl">
      <div class="flex items-center gap-4 mb-8 pb-6 border-b border-gray-100">
        <UAvatar :src="user?.avatar" :alt="user?.name" size="3xl" class="ring-4 ring-indigo-50" />
        <div>
          <p class="font-bold text-gray-900 text-lg">{{ user?.name }}</p>
          <p class="text-sm text-gray-500">{{ user?.email }}</p>
        </div>
      </div>

      <form class="space-y-5" @submit.prevent="saveProfile">
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
        <UButton type="submit" color="primary" class="font-semibold bg-indigo-600 hover:bg-indigo-700">{{ $t('clientProfile.save') }}</UButton>
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
