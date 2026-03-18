<template>
  <div>
    <h1 class="text-2xl font-bold text-white tracking-tight mb-8">{{ $t('clientProfile.title') }}</h1>

    <div class="p-6 lg:p-8 rounded-xl bg-[#141416] border border-white/[0.06] max-w-2xl">
      <div class="flex items-center gap-4 mb-8 pb-6 border-b border-white/[0.06]">
        <UAvatar :src="user?.avatar" :alt="user?.name" size="3xl" />
        <div>
          <p class="font-semibold text-white text-lg">{{ user?.name }}</p>
          <p class="text-sm text-[#A1A1AA]">{{ user?.email }}</p>
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
        <button type="submit" class="px-5 py-2.5 text-sm font-semibold text-white bg-[#0D9373] hover:bg-[#0FAA84] rounded-lg transition-colors duration-150">
          {{ $t('clientProfile.save') }}
        </button>
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
