<template>
  <div class="bg-stone-50 min-h-screen">
    <section class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
      <!-- Success state -->
      <div v-if="submitted" class="animate-fade-up text-center py-12">
        <div class="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto mb-6">
          <UIcon name="i-heroicons-check" class="w-8 h-8 text-emerald-600" />
        </div>
        <h1 class="font-display text-3xl font-bold text-stone-900 tracking-tight mb-3">
          {{ $t('newRequest.successTitle') }}
        </h1>
        <p class="text-stone-500 max-w-md mx-auto mb-8">{{ $t('newRequest.successDesc') }}</p>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-3">
          <NuxtLink
            v-if="isAuthenticated && !isProvider"
            :to="localePath('/cont/cereri')"
            class="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-orange-600 hover:bg-orange-700 rounded-xl transition-colors"
          >
            {{ $t('newRequest.viewMyRequests') }}
            <UIcon name="i-heroicons-arrow-right" class="w-4 h-4" />
          </NuxtLink>
          <NuxtLink
            :to="localePath('/')"
            class="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-stone-600 bg-white border border-stone-200 hover:bg-stone-50 rounded-xl transition-colors"
          >
            {{ $t('newRequest.backHome') }}
          </NuxtLink>
        </div>
      </div>

      <template v-else>
        <!-- Header -->
        <div class="text-center mb-10">
          <h1 class="animate-fade-up font-display text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight mb-3">
            {{ $t('newRequest.title') }}
          </h1>
          <p class="animate-fade-up delay-100 text-stone-500">{{ $t('newRequest.subtitle') }}</p>
        </div>

        <!-- Stepper -->
        <div class="animate-fade-up delay-200 flex items-center justify-center gap-0 mb-10">
          <template v-for="(label, i) in stepLabels" :key="i">
            <div class="flex flex-col items-center gap-2 w-24">
              <div
                class="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors"
                :class="step > i ? 'bg-orange-600 border-orange-600 text-white'
                  : step === i ? 'bg-white border-orange-600 text-orange-600'
                  : 'bg-white border-stone-200 text-stone-400'"
              >
                <UIcon v-if="step > i" name="i-heroicons-check" class="w-4 h-4" />
                <span v-else>{{ i + 1 }}</span>
              </div>
              <span class="text-xs font-medium text-center" :class="step >= i ? 'text-stone-900' : 'text-stone-400'">
                {{ label }}
              </span>
            </div>
            <div v-if="i < stepLabels.length - 1" class="w-12 sm:w-20 h-0.5 -mt-6 rounded" :class="step > i ? 'bg-orange-600' : 'bg-stone-200'" />
          </template>
        </div>

        <!-- Step card -->
        <div class="animate-fade-up delay-300 p-6 sm:p-8 rounded-2xl bg-white border border-stone-200 shadow-sm">
          <!-- STEP 1: What -->
          <div v-if="step === 0" class="space-y-6">
            <UFormField :label="$t('newRequest.category')" required>
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                <button
                  v-for="cat in topCategories"
                  :key="cat.slug"
                  type="button"
                  class="p-3 rounded-xl border text-left transition-all"
                  :class="form.category === cat.slug
                    ? 'border-orange-500 bg-orange-50 ring-2 ring-orange-500/20'
                    : 'border-stone-200 hover:border-stone-300 hover:bg-stone-50'"
                  @click="form.category = cat.slug"
                >
                  <span class="text-lg block mb-1">{{ cat.icon }}</span>
                  <span class="text-xs font-medium leading-tight block" :class="form.category === cat.slug ? 'text-orange-800' : 'text-stone-700'">
                    {{ cat.name }}
                  </span>
                </button>
              </div>
              <USelect
                v-model="form.category"
                :items="allCategoryOptions"
                :placeholder="$t('newRequest.otherCategory')"
                size="lg"
                class="w-full mt-3"
              />
            </UFormField>

            <UFormField :label="$t('newRequest.requestTitle')" required>
              <UInput v-model="form.title" :placeholder="$t('newRequest.titlePlaceholder')" size="lg" class="w-full" />
            </UFormField>

            <UFormField :label="$t('newRequest.description')" :hint="$t('newRequest.descriptionHint')">
              <UTextarea v-model="form.description" :rows="4" :placeholder="$t('newRequest.descriptionPlaceholder')" class="w-full" />
            </UFormField>
          </div>

          <!-- STEP 2: Where & when -->
          <div v-else-if="step === 1" class="space-y-6">
            <UFormField :label="$t('newRequest.city')" required>
              <USelect v-model="form.city" :items="cities" :placeholder="$t('newRequest.cityPlaceholder')" size="lg" class="w-full" />
            </UFormField>

            <UFormField :label="$t('newRequest.urgency')">
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  v-for="option in urgencyOptions"
                  :key="option.value"
                  type="button"
                  class="p-4 rounded-xl border text-center transition-all"
                  :class="form.urgency === option.value
                    ? 'border-orange-500 bg-orange-50 ring-2 ring-orange-500/20'
                    : 'border-stone-200 hover:border-stone-300'"
                  @click="form.urgency = option.value"
                >
                  <UIcon :name="option.icon" class="w-5 h-5 mx-auto mb-2" :class="form.urgency === option.value ? 'text-orange-600' : 'text-stone-400'" />
                  <p class="text-sm font-semibold" :class="form.urgency === option.value ? 'text-orange-800' : 'text-stone-700'">{{ option.label }}</p>
                  <p class="text-xs text-stone-400 mt-0.5">{{ option.hint }}</p>
                </button>
              </div>
            </UFormField>

            <UFormField :label="$t('newRequest.budget')" :hint="$t('newRequest.budgetHint')">
              <div class="grid grid-cols-2 gap-4">
                <UInput v-model.number="form.budgetMin" type="number" :min="0" placeholder="500" size="lg" class="w-full">
                  <template #trailing><span class="text-xs text-stone-400">MDL</span></template>
                </UInput>
                <UInput v-model.number="form.budgetMax" type="number" :min="0" placeholder="5000" size="lg" class="w-full">
                  <template #trailing><span class="text-xs text-stone-400">MDL</span></template>
                </UInput>
              </div>
            </UFormField>
          </div>

          <!-- STEP 3: Review -->
          <div v-else class="space-y-5">
            <h2 class="font-display text-lg font-semibold text-stone-900">{{ $t('newRequest.reviewTitle') }}</h2>
            <dl class="divide-y divide-stone-100 rounded-xl border border-stone-200 overflow-hidden">
              <div class="flex items-start justify-between gap-4 px-4 py-3 bg-stone-50">
                <dt class="text-sm text-stone-500">{{ $t('newRequest.category') }}</dt>
                <dd class="text-sm font-semibold text-stone-900 text-right">{{ selectedCategoryName }}</dd>
              </div>
              <div class="flex items-start justify-between gap-4 px-4 py-3">
                <dt class="text-sm text-stone-500">{{ $t('newRequest.requestTitle') }}</dt>
                <dd class="text-sm font-semibold text-stone-900 text-right">{{ form.title }}</dd>
              </div>
              <div v-if="form.description" class="px-4 py-3 bg-stone-50">
                <dt class="text-sm text-stone-500 mb-1">{{ $t('newRequest.description') }}</dt>
                <dd class="text-sm text-stone-700">{{ form.description }}</dd>
              </div>
              <div class="flex items-start justify-between gap-4 px-4 py-3">
                <dt class="text-sm text-stone-500">{{ $t('newRequest.city') }}</dt>
                <dd class="text-sm font-semibold text-stone-900">{{ form.city }}</dd>
              </div>
              <div class="flex items-start justify-between gap-4 px-4 py-3 bg-stone-50">
                <dt class="text-sm text-stone-500">{{ $t('newRequest.urgency') }}</dt>
                <dd class="text-sm font-semibold text-stone-900">{{ urgencyOptions.find(o => o.value === form.urgency)?.label }}</dd>
              </div>
              <div v-if="form.budgetMin || form.budgetMax" class="flex items-start justify-between gap-4 px-4 py-3">
                <dt class="text-sm text-stone-500">{{ $t('newRequest.budget') }}</dt>
                <dd class="text-sm font-semibold text-stone-900">{{ form.budgetMin || 0 }}–{{ form.budgetMax || '∞' }} MDL</dd>
              </div>
            </dl>
            <div class="flex items-start gap-2.5 p-3.5 rounded-xl bg-sky-50 border border-sky-100 text-sm text-sky-800">
              <UIcon name="i-heroicons-information-circle" class="w-5 h-5 shrink-0 mt-px text-sky-500" />
              {{ $t('newRequest.reviewNote') }}
            </div>
          </div>

          <!-- Nav buttons -->
          <div class="flex items-center justify-between mt-8 pt-6 border-t border-stone-100">
            <button
              v-if="step > 0"
              type="button"
              class="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-xl transition-colors"
              @click="step--"
            >
              <UIcon name="i-heroicons-arrow-left" class="w-4 h-4" />
              {{ $t('newRequest.back') }}
            </button>
            <span v-else />

            <button
              v-if="step < 2"
              type="button"
              class="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-orange-600 hover:bg-orange-700 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl transition-colors"
              :disabled="!canContinue"
              @click="step++"
            >
              {{ $t('newRequest.continue') }}
              <UIcon name="i-heroicons-arrow-right" class="w-4 h-4" />
            </button>
            <button
              v-else
              type="button"
              class="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-orange-600 hover:bg-orange-700 rounded-xl transition-colors shadow-lg shadow-orange-600/20"
              @click="submitRequest"
            >
              {{ $t('newRequest.submit') }}
              <UIcon name="i-heroicons-paper-airplane" class="w-4 h-4" />
            </button>
          </div>
        </div>
      </template>
    </section>
  </div>
</template>

<script setup lang="ts">
import { categories } from '~/data/categories'

const { t } = useI18n()
const route = useRoute()
const localePath = useLocalePath()
const toast = useToast()
const { user, isAuthenticated, isProvider } = useAuth()
const { createRequest } = useRequests()

useHead({ title: `${t('newRequest.title')} — mesteri.md` })

const step = ref(0)
const submitted = ref(false)

const form = reactive({
  category: (route.query.category as string) || '',
  title: '',
  description: '',
  city: '',
  urgency: 'flexible' as 'urgent' | 'this_week' | 'flexible',
  budgetMin: undefined as number | undefined,
  budgetMax: undefined as number | undefined
})

const stepLabels = computed(() => [
  t('newRequest.step1'),
  t('newRequest.step2'),
  t('newRequest.step3')
])

const topCategories = categories.slice(0, 6).map(c => ({ slug: c.slug, name: c.name, icon: c.icon }))

const allCategoryOptions = categories.map(c => ({
  label: `${c.icon} ${c.name}`,
  value: c.slug
}))

const cities = ['Chișinău', 'Bălți', 'Cahul', 'Comrat', 'Orhei', 'Soroca', 'Ungheni']

const urgencyOptions = computed(() => [
  { value: 'urgent' as const, label: t('newRequest.urgent'), hint: t('newRequest.urgentHint'), icon: 'i-heroicons-bolt' },
  { value: 'this_week' as const, label: t('newRequest.thisWeek'), hint: t('newRequest.thisWeekHint'), icon: 'i-heroicons-calendar-days' },
  { value: 'flexible' as const, label: t('newRequest.flexible'), hint: t('newRequest.flexibleHint'), icon: 'i-heroicons-clock' }
])

const selectedCategoryName = computed(() => {
  const cat = categories.find(c => c.slug === form.category)
  return cat ? `${cat.icon} ${cat.name}` : ''
})

const canContinue = computed(() => {
  if (step.value === 0) return !!form.category && form.title.trim().length >= 3
  if (step.value === 1) return !!form.city
  return true
})

function submitRequest() {
  createRequest({
    clientId: user.value?.id || 'guest',
    title: form.title,
    description: form.description,
    category: form.category,
    city: form.city,
    urgency: form.urgency,
    budgetMin: form.budgetMin || undefined,
    budgetMax: form.budgetMax || undefined
  })
  submitted.value = true
  toast.add({ title: t('newRequest.submittedToast'), icon: 'i-heroicons-check-circle', color: 'success' })
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>
