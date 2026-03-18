<template>
  <div>
    <!-- Hero -->
    <section class="relative overflow-hidden py-12 lg:py-16 bg-[#0A0A0A]">
      <div class="absolute top-0 left-1/2 w-[400px] h-[200px] bg-[#0D9373]/[0.06] rounded-full blur-[120px] pointer-events-none" />
      <div class="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="animate-fade-up text-[30px] sm:text-[36px] font-bold text-white tracking-tight mb-3">
          {{ $t('newRequest.title') }}
        </h1>
        <p class="animate-fade-up delay-100 text-[#A1A1AA]">{{ $t('newRequest.subtitle') }}</p>
      </div>
    </section>

    <!-- Form -->
    <section class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <div class="animate-fade-up p-8 rounded-xl bg-[#141416] border border-white/[0.06]">
        <form class="space-y-6" @submit.prevent="submitRequest">
          <UFormField :label="$t('newRequest.category')">
            <USelect
              v-model="form.category"
              :items="categoryOptions"
              :placeholder="$t('newRequest.categoryPlaceholder')"
              size="lg"
            />
          </UFormField>

          <UFormField :label="$t('newRequest.requestTitle')">
            <UInput v-model="form.title" :placeholder="$t('newRequest.titlePlaceholder')" size="lg" />
          </UFormField>

          <UFormField :label="$t('newRequest.description')">
            <UTextarea v-model="form.description" :rows="4" :placeholder="$t('newRequest.descriptionPlaceholder')" />
          </UFormField>

          <UFormField :label="$t('newRequest.city')">
            <USelect v-model="form.city" :items="cities" :placeholder="$t('newRequest.cityPlaceholder')" size="lg" />
          </UFormField>

          <UFormField :label="$t('newRequest.urgency')">
            <div class="grid grid-cols-3 gap-3">
              <button
                v-for="option in urgencyOptions"
                :key="option.value"
                type="button"
                class="p-3 rounded-lg border text-center transition-all duration-150"
                :class="form.urgency === option.value ? 'border-[#0D9373] bg-[#0D9373]/10' : 'border-white/[0.06] hover:border-white/[0.12]'"
                @click="form.urgency = option.value"
              >
                <p class="text-sm font-semibold" :class="form.urgency === option.value ? 'text-[#2AB673]' : 'text-white'">{{ option.label }}</p>
              </button>
            </div>
          </UFormField>

          <div class="grid grid-cols-2 gap-4">
            <UFormField :label="$t('newRequest.budgetMin')">
              <UInput v-model.number="form.budgetMin" type="number" placeholder="500" />
            </UFormField>
            <UFormField :label="$t('newRequest.budgetMax')">
              <UInput v-model.number="form.budgetMax" type="number" placeholder="5000" />
            </UFormField>
          </div>

          <button
            type="submit"
            class="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-white bg-[#0D9373] hover:bg-[#0FAA84] rounded-lg transition-colors duration-150"
          >
            {{ $t('newRequest.submit') }}
            <UIcon name="i-heroicons-paper-airplane" class="w-4 h-4" />
          </button>
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
