<template>
  <div>
    <!-- Hero -->
    <section class="relative overflow-hidden py-16 lg:py-24 bg-[#0A0A0A]">
      <div class="absolute top-1/3 left-1/3 w-[400px] h-[300px] bg-[#0D9373]/[0.06] rounded-full blur-[140px] pointer-events-none" />
      <div class="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p class="animate-fade-up text-sm font-semibold text-[#0D9373] uppercase tracking-wider mb-6">
          {{ $t('howItWorksPage.badge') || 'Ghid' }}
        </p>
        <h1 class="animate-fade-up delay-100 text-[32px] sm:text-[40px] lg:text-[48px] font-bold text-white tracking-tight mb-6">
          {{ $t('howItWorksPage.title') }}
        </h1>
        <p class="animate-fade-up delay-200 text-lg text-[#A1A1AA] max-w-2xl mx-auto">
          {{ $t('howItWorksPage.subtitle') }}
        </p>
      </div>
    </section>

    <!-- Steps -->
    <section class="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      <div class="max-w-3xl mx-auto space-y-6">
        <div
          v-for="(step, i) in steps"
          :key="i"
          class="animate-fade-up flex gap-6"
          :style="{ animationDelay: `${i * 0.1}s` }"
        >
          <div class="flex-shrink-0">
            <div class="w-10 h-10 rounded-full bg-[#0D9373]/10 border border-[#0D9373]/20 text-[#0D9373] flex items-center justify-center font-bold text-sm">
              {{ i + 1 }}
            </div>
          </div>
          <div class="pt-1">
            <h3 class="text-lg font-semibold text-white mb-2">{{ step.title }}</h3>
            <p class="text-[#A1A1AA] leading-relaxed">{{ step.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Benefits -->
    <section class="py-16 lg:py-20 bg-[#111113]">
      <div class="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-[24px] sm:text-[30px] font-bold text-white tracking-tight text-center mb-12">
          {{ $t('howItWorksPage.benefitsTitle') }}
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            v-for="(benefit, i) in benefits"
            :key="i"
            class="animate-fade-up p-8 rounded-xl bg-[#141416] border border-white/[0.06] text-center hover:border-white/[0.12] transition-all duration-150"
            :style="{ animationDelay: `${i * 0.1}s` }"
          >
            <div class="w-10 h-10 rounded-lg bg-[#0D9373]/10 text-[#0D9373] flex items-center justify-center mx-auto mb-5">
              <UIcon :name="benefit.icon" class="w-5 h-5" />
            </div>
            <h3 class="font-semibold text-white mb-2">{{ benefit.title }}</h3>
            <p class="text-sm text-[#A1A1AA] leading-relaxed">{{ benefit.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      <h2 class="text-[24px] sm:text-[30px] font-bold text-white tracking-tight text-center mb-12">
        {{ $t('howItWorksPage.faqTitle') }}
      </h2>
      <UAccordion :items="faqItems" class="space-y-3" />
    </section>

    <!-- CTA -->
    <section class="py-16 lg:py-20 bg-[#0F1117] text-center">
      <div class="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[200px] bg-[#0D9373]/[0.06] rounded-full blur-[120px] pointer-events-none" />
        <div class="relative z-10">
          <h2 class="text-[24px] sm:text-[30px] font-bold text-white tracking-tight mb-4">{{ $t('howItWorksPage.ctaTitle') }}</h2>
          <p class="text-[#A1A1AA] max-w-xl mx-auto mb-8">{{ $t('howItWorksPage.ctaText') }}</p>
          <NuxtLink
            to="/cerere-noua"
            class="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-[#0D9373] hover:bg-[#0FAA84] rounded-[10px] transition-colors duration-150"
          >
            {{ $t('howItWorksPage.ctaButton') }}
            <UIcon name="i-heroicons-arrow-right" class="w-4 h-4" />
          </NuxtLink>
        </div>
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
