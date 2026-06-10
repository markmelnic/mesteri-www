<template>
  <div class="max-w-3xl">
    <h1 class="font-display text-2xl font-bold text-stone-900 tracking-tight mb-8">{{ $t('clientProfile.title') }}</h1>

    <!-- Quick stats -->
    <div class="grid grid-cols-3 gap-4 mb-6">
      <div class="p-4 rounded-2xl bg-white border border-stone-200 text-center">
        <p class="font-display text-2xl font-bold text-stone-900">{{ myRequestsCount }}</p>
        <p class="text-xs text-stone-500 mt-1">{{ $t('dashboard.requests') }}</p>
      </div>
      <div class="p-4 rounded-2xl bg-white border border-stone-200 text-center">
        <p class="font-display text-2xl font-bold text-stone-900">{{ favorites.length }}</p>
        <p class="text-xs text-stone-500 mt-1">{{ $t('dashboard.favorites') }}</p>
      </div>
      <div class="p-4 rounded-2xl bg-white border border-stone-200 text-center">
        <p class="font-display text-2xl font-bold text-stone-900">3</p>
        <p class="text-xs text-stone-500 mt-1">{{ $t('dashboard.myReviews') }}</p>
      </div>
    </div>

    <div class="p-6 lg:p-8 rounded-2xl bg-white border border-stone-200">
      <div class="flex items-center gap-4 mb-8 pb-6 border-b border-stone-100">
        <UAvatar :src="user?.avatar" :alt="user?.name" size="3xl" />
        <div>
          <p class="font-display font-semibold text-stone-900 text-lg">{{ user?.name }}</p>
          <p class="text-sm text-stone-500">{{ user?.email }}</p>
        </div>
      </div>

      <form class="space-y-5" @submit.prevent="saveProfile">
        <UFormField :label="$t('clientProfile.fullName')">
          <UInput v-model="form.name" class="w-full" />
        </UFormField>
        <UFormField :label="$t('clientProfile.email')">
          <UInput v-model="form.email" type="email" class="w-full" />
        </UFormField>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <UFormField :label="$t('clientProfile.phone')">
            <UInput v-model="form.phone" type="tel" class="w-full" />
          </UFormField>
          <UFormField :label="$t('clientProfile.city')">
            <USelect v-model="form.city" :items="cities" class="w-full" />
          </UFormField>
        </div>
        <button type="submit" class="px-5 py-2.5 text-sm font-semibold text-white bg-orange-600 hover:bg-orange-700 rounded-xl transition-colors">
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
const { favorites } = useFavorites()
const { getMyRequests } = useRequests()
const toast = useToast()

const myRequestsCount = computed(() => getMyRequests(user.value?.id || '').value.length)

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
