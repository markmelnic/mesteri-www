<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <UBreadcrumb :items="[{ label: $t('breadcrumb.home'), to: '/' }, { label: $t('breadcrumb.howItWorks') }]" class="mb-6" />

    <h1 class="text-4xl font-bold text-gray-900 text-center mb-4">
      {{ $t('howItWorksPage.title') }}
    </h1>
    <p class="text-lg text-gray-500 text-center max-w-2xl mx-auto mb-16">
      {{ $t('howItWorksPage.subtitle') }}
    </p>

    <!-- For Homeowners -->
    <div class="mb-16">
      <h2 class="text-2xl font-bold text-gray-900 mb-8">
        {{ $t('howItWorksPage.forHomeowners') }}
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div v-for="(step, i) in homeownerSteps" :key="i" class="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <div class="w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center mb-4">
            {{ i + 1 }}
          </div>
          <h3 class="font-semibold text-gray-900 mb-2">{{ step.title }}</h3>
          <p class="text-sm text-gray-500 leading-relaxed">{{ step.description }}</p>
        </div>
      </div>
    </div>

    <!-- For Providers -->
    <div class="mb-16">
      <h2 class="text-2xl font-bold text-gray-900 mb-8">
        {{ $t('howItWorksPage.forProviders') }}
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div v-for="(step, i) in providerSteps" :key="i" class="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <div class="w-10 h-10 rounded-full bg-amber-500 text-white font-bold flex items-center justify-center mb-4">
            {{ i + 1 }}
          </div>
          <h3 class="font-semibold text-gray-900 mb-2">{{ step.title }}</h3>
          <p class="text-sm text-gray-500 leading-relaxed">{{ step.description }}</p>
        </div>
      </div>
    </div>

    <!-- FAQ -->
    <div class="max-w-3xl mx-auto">
      <h2 class="text-2xl font-bold text-gray-900 text-center mb-8">
        {{ $t('howItWorksPage.faqTitle') }}
      </h2>
      <UAccordion :items="faqItems" />
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
useHead({ title: t('howItWorksPage.pageTitle') })

const homeownerSteps = computed(() => [
  { title: t('howItWorksPage.ho_step1Title'), description: t('howItWorksPage.ho_step1Desc') },
  { title: t('howItWorksPage.ho_step2Title'), description: t('howItWorksPage.ho_step2Desc') },
  { title: t('howItWorksPage.ho_step3Title'), description: t('howItWorksPage.ho_step3Desc') }
])

const providerSteps = computed(() => [
  { title: t('howItWorksPage.pr_step1Title'), description: t('howItWorksPage.pr_step1Desc') },
  { title: t('howItWorksPage.pr_step2Title'), description: t('howItWorksPage.pr_step2Desc') },
  { title: t('howItWorksPage.pr_step3Title'), description: t('howItWorksPage.pr_step3Desc') }
])

const faqItems = computed(() => [
  { label: t('howItWorksPage.faq1q'), content: t('howItWorksPage.faq1a') },
  { label: t('howItWorksPage.faq2q'), content: t('howItWorksPage.faq2a') },
  { label: t('howItWorksPage.faq3q'), content: t('howItWorksPage.faq3a') },
  { label: t('howItWorksPage.faq4q'), content: t('howItWorksPage.faq4a') },
  { label: t('howItWorksPage.faq5q'), content: t('howItWorksPage.faq5a') },
  { label: t('howItWorksPage.faq6q'), content: t('howItWorksPage.faq6a') },
  { label: t('howItWorksPage.faq7q'), content: t('howItWorksPage.faq7a') },
  { label: t('howItWorksPage.faq8q'), content: t('howItWorksPage.faq8a') }
])
</script>
