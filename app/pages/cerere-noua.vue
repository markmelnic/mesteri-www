<template>
  <div>
    <!-- Hero -->
    <section class="relative overflow-hidden py-12 lg:py-16" style="background: var(--gradient-dark-section)">
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute top-0 left-1/2 w-[400px] h-[300px] bg-indigo-600/10 rounded-full blur-[120px]" />
      </div>
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="animate-fade-up text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
          {{ $t('newRequest.title') }}
        </h1>
        <p class="animate-fade-up delay-100 text-indigo-200/60">{{ $t('newRequest.subtitle') }}</p>
      </div>
    </section>

    <!-- Form -->
    <section class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <div class="animate-fade-up p-8 rounded-2xl bg-white border border-gray-100 shadow-sm">
        <form class="space-y-6" @submit.prevent="submitRequest">
          <!-- Category -->
          <UFormField :label="$t('newRequest.category')">
            <USelect
              v-model="form.category"
              :items="categoryOptions"
              :placeholder="$t('newRequest.categoryPlaceholder')"
              size="lg"
            />
          </UFormField>

          <!-- Title -->
          <UFormField :label="$t('newRequest.requestTitle')">
            <UInput v-model="form.title" :placeholder="$t('newRequest.titlePlaceholder')" size="lg" />
          </UFormField>

          <!-- Description -->
          <UFormField :label="$t('newRequest.description')">
            <UTextarea v-model="form.description" :rows="4" :placeholder="$t('newRequest.descriptionPlaceholder')" />
          </UFormField>

          <!-- City -->
          <UFormField :label="$t('newRequest.city')">
            <USelect v-model="form.city" :items="cities" :placeholder="$t('newRequest.cityPlaceholder')" size="lg" />
          </UFormField>

          <!-- Urgency -->
          <UFormField :label="$t('newRequest.urgency')">
            <div class="grid grid-cols-3 gap-3">
              <button
                v-for="option in urgencyOptions"
                :key="option.value"
                type="button"
                class="p-3 rounded-xl border-2 text-center transition-all duration-200"
                :class="form.urgency === option.value ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:border-gray-300'"
                @click="form.urgency = option.value"
              >
                <p class="text-sm font-semibold" :class="form.urgency === option.value ? 'text-indigo-600' : 'text-gray-700'">{{ option.label }}</p>
              </button>
            </div>
          </UFormField>

          <!-- Budget -->
          <div class="grid grid-cols-2 gap-4">
            <UFormField :label="$t('newRequest.budgetMin')">
              <UInput v-model.number="form.budgetMin" type="number" placeholder="500" />
            </UFormField>
            <UFormField :label="$t('newRequest.budgetMax')">
              <UInput v-model.number="form.budgetMax" type="number" placeholder="5000" />
            </UFormField>
          </div>

          <UButton
            type="submit"
            color="primary"
            block
            size="lg"
            class="font-semibold bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-500/20"
            trailing-icon="i-heroicons-paper-airplane"
          >
            {{ $t('newRequest.submit') }}
          </UButton>
        </form>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { categories } from '~/data/categories'

const { t } = useI18n()
const router = useRouter()
const toast = useToast()
useHead({ title: `${t('newRequest.title')} — mesteri.md` })

const form = reactive({
  category: '',
  title: '',
  description: '',
  city: '',
  urgency: 'flexible',
  budgetMin: 0,
  budgetMax: 0
})

const categoryOptions = categories.map(c => ({
  label: `${c.icon} ${c.name}`,
  value: c.slug
}))

const cities = ['Chișinău', 'Bălți', 'Cahul', 'Comrat', 'Orhei', 'Soroca', 'Ungheni']

const urgencyOptions = computed(() => [
  { value: 'urgent', label: t('newRequest.urgent') },
  { value: 'this_week', label: t('newRequest.thisWeek') },
  { value: 'flexible', label: t('newRequest.flexible') }
])

function submitRequest() {
  if (!form.category || !form.title) {
    toast.add({ title: t('newRequest.fillRequired'), icon: 'i-heroicons-exclamation-triangle', color: 'warning' })
    return
  }
  toast.add({ title: t('newRequest.submitted'), description: t('newRequest.submittedDesc'), icon: 'i-heroicons-check-circle', color: 'success' })
  router.push('/')
}
</script>
