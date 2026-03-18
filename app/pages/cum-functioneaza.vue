<template>
  <div>
    <!-- Hero -->
    <section class="relative overflow-hidden py-16 lg:py-24" style="background: var(--gradient-dark-section)">
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute top-1/3 left-1/3 w-[500px] h-[400px] bg-indigo-600/10 rounded-full blur-[120px]" />
      </div>
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span class="animate-fade-up inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-indigo-200 text-xs font-semibold uppercase tracking-wider mb-6">
          <UIcon name="i-heroicons-sparkles-solid" class="w-3.5 h-3.5" />
          {{ $t('howItWorksPage.badge') || 'Ghid' }}
        </span>
        <h1 class="animate-fade-up delay-100 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-6">
          {{ $t('howItWorksPage.title') }}
        </h1>
        <p class="animate-fade-up delay-200 text-lg text-indigo-200/60 max-w-2xl mx-auto">
          {{ $t('howItWorksPage.subtitle') }}
        </p>
      </div>
    </section>

    <!-- Steps -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      <div class="max-w-3xl mx-auto space-y-8">
        <div
          v-for="(step, i) in steps"
          :key="i"
          class="animate-fade-up flex gap-6"
          :style="{ animationDelay: `${i * 0.1}s` }"
        >
          <div class="flex-shrink-0">
            <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white flex items-center justify-center font-bold text-lg shadow-lg shadow-indigo-500/20">
              {{ i + 1 }}
            </div>
          </div>
          <div class="pt-1">
            <h3 class="text-lg font-bold text-gray-900 mb-2">{{ step.title }}</h3>
            <p class="text-gray-500 leading-relaxed">{{ step.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Benefits -->
    <section class="py-16 lg:py-20 bg-gray-50/50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight text-center mb-12">
          {{ $t('howItWorksPage.benefitsTitle') }}
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            v-for="(benefit, i) in benefits"
            :key="i"
            class="animate-fade-up p-8 rounded-2xl bg-white border border-gray-100 shadow-sm text-center"
            :style="{ animationDelay: `${i * 0.1}s` }"
          >
            <div class="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-5">
              <UIcon :name="benefit.icon" class="w-6 h-6" />
            </div>
            <h3 class="font-bold text-gray-900 mb-2">{{ benefit.title }}</h3>
            <p class="text-sm text-gray-500 leading-relaxed">{{ benefit.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      <h2 class="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight text-center mb-12">
        {{ $t('howItWorksPage.faqTitle') }}
      </h2>
      <UAccordion :items="faqItems" class="space-y-3" />
    </section>

    <!-- CTA -->
    <section class="py-16 lg:py-20 section-dark text-center">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-4">{{ $t('howItWorksPage.ctaTitle') }}</h2>
        <p class="text-indigo-200/60 max-w-xl mx-auto mb-8">{{ $t('howItWorksPage.ctaText') }}</p>
        <UButton to="/cerere-noua" size="xl" color="white" class="font-semibold px-8" trailing-icon="i-heroicons-arrow-right">
          {{ $t('howItWorksPage.ctaButton') }}
        </UButton>
      </div>
    </section>

    <SharedBackToTop />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
useHead({ title: `${t('howItWorksPage.title')} — mesteri.md` })

const steps = computed(() => [
  { title: t('howItWorksPage.step1Title'), description: t('howItWorksPage.step1Desc') },
  { title: t('howItWorksPage.step2Title'), description: t('howItWorksPage.step2Desc') },
  { title: t('howItWorksPage.step3Title'), description: t('howItWorksPage.step3Desc') }
])

const benefits = computed(() => [
  { icon: 'i-heroicons-shield-check-solid', title: t('howItWorksPage.benefit1Title'), description: t('howItWorksPage.benefit1Desc') },
  { icon: 'i-heroicons-clock-solid', title: t('howItWorksPage.benefit2Title'), description: t('howItWorksPage.benefit2Desc') },
  { icon: 'i-heroicons-currency-dollar-solid', title: t('howItWorksPage.benefit3Title'), description: t('howItWorksPage.benefit3Desc') }
])

const faqItems = computed(() => [
  { label: t('howItWorksPage.faq1Q'), content: t('howItWorksPage.faq1A') },
  { label: t('howItWorksPage.faq2Q'), content: t('howItWorksPage.faq2A') },
  { label: t('howItWorksPage.faq3Q'), content: t('howItWorksPage.faq3A') },
  { label: t('howItWorksPage.faq4Q'), content: t('howItWorksPage.faq4A') }
])
</script>
