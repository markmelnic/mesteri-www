<template>
  <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <UBreadcrumb :items="[{ label: $t('breadcrumb.home'), to: '/' }, { label: $t('breadcrumb.newRequest') }]" class="mb-6" />

    <h1 class="text-3xl font-bold text-gray-900 mb-2">
      {{ $t('newRequest.title') }}
    </h1>
    <p class="text-gray-500 mb-8">{{ $t('newRequest.subtitle') }}</p>

    <!-- Progress -->
    <div class="flex items-center gap-2 mb-8">
      <template v-for="i in 5" :key="i">
        <div
          class="flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold transition-all"
          :class="i <= step ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'"
        >
          {{ i }}
        </div>
        <div v-if="i < 5" class="flex-1 h-0.5" :class="i < step ? 'bg-blue-600' : 'bg-gray-200'" />
      </template>
    </div>

    <div class="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
      <!-- Step 1: Category -->
      <div v-if="step === 1">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">{{ $t('newRequest.chooseCategory') }}</h2>
        <UInput v-model="catSearch" :placeholder="$t('newRequest.searchCategory')" icon="i-heroicons-magnifying-glass" class="mb-4" />
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-96 overflow-y-auto">
          <button
            v-for="cat in filteredCategories"
            :key="cat.id"
            class="p-4 rounded-lg border text-center transition-all text-sm"
            :class="form.category === cat.slug ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-200 hover:border-gray-300'"
            @click="form.category = cat.slug"
          >
            <span class="text-2xl block mb-1">{{ cat.icon }}</span>
            {{ cat.name }}
          </button>
        </div>
      </div>

      <!-- Step 2: Description -->
      <div v-if="step === 2">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">{{ $t('newRequest.describeWork') }}</h2>
        <div class="space-y-4">
          <UFormField :label="$t('newRequest.workTitle')">
            <UInput v-model="form.title" :placeholder="$t('newRequest.workTitlePlaceholder')" size="lg" />
          </UFormField>
          <UFormField :label="$t('newRequest.detailedDescription')">
            <UTextarea v-model="form.description" :placeholder="$t('newRequest.detailedDescPlaceholder')" :rows="5" />
          </UFormField>
          <div class="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
            <UIcon name="i-heroicons-photo" class="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p class="text-sm text-gray-500">{{ $t('newRequest.addPhotos') }}</p>
            <p class="text-xs text-gray-400 mt-1">{{ $t('newRequest.demoFeature') }}</p>
          </div>
        </div>
      </div>

      <!-- Step 3: Location & Timing -->
      <div v-if="step === 3">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">{{ $t('newRequest.locationTiming') }}</h2>
        <div class="space-y-4">
          <UFormField :label="$t('auth.city')">
            <USelect v-model="form.city" :items="cities" :placeholder="$t('auth.cityPlaceholder')" size="lg" />
          </UFormField>
          <UFormField :label="$t('newRequest.addressOptional')">
            <UInput v-model="form.address" :placeholder="$t('newRequest.addressPlaceholder')" />
          </UFormField>
          <UFormField :label="$t('newRequest.urgency')">
            <div class="flex flex-col sm:flex-row gap-3">
              <button
                v-for="opt in urgencyOptions"
                :key="opt.value"
                class="flex-1 p-3 rounded-lg border text-sm font-medium transition-all"
                :class="form.urgency === opt.value ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-200 hover:border-gray-300 text-gray-700'"
                @click="form.urgency = opt.value"
              >
                {{ opt.label }}
              </button>
            </div>
          </UFormField>
        </div>
      </div>

      <!-- Step 4: Budget -->
      <div v-if="step === 4">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">{{ $t('newRequest.budget') }}</h2>
        <div class="space-y-4">
          <label class="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <input v-model="form.noBudget" type="checkbox" class="rounded border-gray-300 text-blue-600" />
            {{ $t('newRequest.noBudget') }}
          </label>
          <template v-if="!form.noBudget">
            <div class="grid grid-cols-2 gap-4">
              <UFormField :label="$t('newRequest.budgetMin')">
                <UInput v-model.number="form.budgetMin" type="number" placeholder="500" />
              </UFormField>
              <UFormField :label="$t('newRequest.budgetMax')">
                <UInput v-model.number="form.budgetMax" type="number" placeholder="2000" />
              </UFormField>
            </div>
          </template>
        </div>
      </div>

      <!-- Step 5: Review -->
      <div v-if="step === 5">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">{{ $t('newRequest.reviewSubmit') }}</h2>
        <div class="space-y-4">
          <div class="p-4 bg-gray-50 rounded-lg">
            <div class="flex justify-between items-start">
              <div>
                <p class="text-sm text-gray-500">{{ $t('newRequest.categoryLabel') }}</p>
                <p class="font-medium text-gray-900">{{ selectedCategoryName }}</p>
              </div>
              <UButton variant="ghost" size="xs" @click="step = 1">{{ $t('newRequest.edit') }}</UButton>
            </div>
          </div>
          <div class="p-4 bg-gray-50 rounded-lg">
            <div class="flex justify-between items-start">
              <div>
                <p class="text-sm text-gray-500">{{ $t('newRequest.workLabel') }}</p>
                <p class="font-medium text-gray-900">{{ form.title }}</p>
                <p class="text-sm text-gray-600 mt-1">{{ form.description }}</p>
              </div>
              <UButton variant="ghost" size="xs" @click="step = 2">{{ $t('newRequest.edit') }}</UButton>
            </div>
          </div>
          <div class="p-4 bg-gray-50 rounded-lg">
            <div class="flex justify-between items-start">
              <div>
                <p class="text-sm text-gray-500">{{ $t('newRequest.locationTimingLabel') }}</p>
                <p class="font-medium text-gray-900">{{ form.city }}</p>
                <p class="text-sm text-gray-600">{{ urgencyLabel }}</p>
              </div>
              <UButton variant="ghost" size="xs" @click="step = 3">{{ $t('newRequest.edit') }}</UButton>
            </div>
          </div>
          <div class="p-4 bg-gray-50 rounded-lg">
            <div class="flex justify-between items-start">
              <div>
                <p class="text-sm text-gray-500">{{ $t('newRequest.budgetLabel') }}</p>
                <p class="font-medium text-gray-900">{{ budgetDisplay }}</p>
              </div>
              <UButton variant="ghost" size="xs" @click="step = 4">{{ $t('newRequest.edit') }}</UButton>
            </div>
          </div>
        </div>
      </div>

      <!-- Confirmation -->
      <div v-if="step === 6" class="text-center py-8">
        <div class="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
          <UIcon name="i-heroicons-check" class="w-8 h-8 text-emerald-600" />
        </div>
        <h2 class="text-xl font-bold text-gray-900 mb-2">{{ $t('newRequest.confirmation') }}</h2>
        <p class="text-gray-500 mb-6">{{ $t('newRequest.confirmationDesc') }}</p>
        <div class="flex gap-3 justify-center">
          <UButton to="/" variant="outline" color="neutral">{{ $t('newRequest.home') }}</UButton>
          <UButton to="/cont/cereri" color="primary">{{ $t('newRequest.myRequests') }}</UButton>
        </div>
      </div>

      <!-- Navigation -->
      <div v-if="step <= 5" class="flex justify-between mt-8 pt-6 border-t border-gray-100">
        <UButton v-if="step > 1" variant="ghost" color="neutral" @click="step--">
          {{ $t('newRequest.back') }}
        </UButton>
        <div v-else />
        <UButton v-if="step < 5" color="primary" :disabled="!canProceed" @click="step++">
          {{ $t('newRequest.continue') }}
        </UButton>
        <UButton v-else color="primary" @click="submitRequest">
          {{ $t('newRequest.submitRequest') }}
        </UButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { categories } from '~/data/categories'

const { t } = useI18n()
definePageMeta({ middleware: ['auth'] })
useHead({ title: t('newRequest.pageTitle') })

const { user } = useAuth()
const { createRequest } = useRequests()
const toast = useToast()

const step = ref(1)
const catSearch = ref('')

const form = reactive({
  category: '',
  title: '',
  description: '',
  city: '',
  address: '',
  urgency: 'flexible' as 'urgent' | 'this_week' | 'flexible',
  budgetMin: undefined as number | undefined,
  budgetMax: undefined as number | undefined,
  noBudget: false
})

const cities = ['Chișinău', 'Bălți', 'Cahul', 'Comrat', 'Orhei', 'Soroca', 'Ungheni', 'Edineț', 'Hîncești', 'Strășeni']

const urgencyOptions = computed(() => [
  { value: 'urgent' as const, label: t('newRequest.urgent') },
  { value: 'this_week' as const, label: t('newRequest.thisWeek') },
  { value: 'flexible' as const, label: t('newRequest.flexible') }
])

const filteredCategories = computed(() => {
  if (!catSearch.value) return categories
  const q = catSearch.value.toLowerCase()
  return categories.filter(c => c.name.toLowerCase().includes(q))
})

const selectedCategoryName = computed(() =>
  categories.find(c => c.slug === form.category)?.name || ''
)

const urgencyLabel = computed(() =>
  urgencyOptions.value.find(o => o.value === form.urgency)?.label || ''
)

const budgetDisplay = computed(() => {
  if (form.noBudget) return t('newRequest.notSure')
  if (form.budgetMin && form.budgetMax) return `${form.budgetMin} - ${form.budgetMax} MDL`
  if (form.budgetMin) return `${t('newRequest.fromBudget')} ${form.budgetMin} MDL`
  return t('newRequest.notSpecified')
})

const canProceed = computed(() => {
  if (step.value === 1) return !!form.category
  if (step.value === 2) return !!form.title && !!form.description
  if (step.value === 3) return !!form.city
  return true
})

function submitRequest() {
  createRequest({
    clientId: user.value!.id,
    title: form.title,
    description: form.description,
    category: form.category,
    city: form.city,
    urgency: form.urgency,
    budgetMin: form.noBudget ? undefined : form.budgetMin,
    budgetMax: form.noBudget ? undefined : form.budgetMax
  })
  toast.add({ title: t('newRequest.requestCreated'), icon: 'i-heroicons-check-circle', color: 'success' })
  step.value = 6
}
</script>
