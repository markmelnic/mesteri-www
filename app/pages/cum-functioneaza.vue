<template>
  <div>
    <!-- Hero -->
    <section class="relative overflow-hidden bg-gradient-to-b from-orange-50/70 to-white">
      <div class="absolute inset-0 dot-grid opacity-40 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" />
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 text-center">
        <p class="animate-fade-up text-sm font-semibold text-orange-600 uppercase tracking-wider mb-4">
          {{ $t('howItWorksPage.badge') }}
        </p>
        <h1 class="animate-fade-up delay-100 font-display text-4xl sm:text-5xl font-bold text-stone-900 tracking-tight mb-6">
          {{ $t('howItWorksPage.title') }}
        </h1>
        <p class="animate-fade-up delay-200 text-lg text-stone-500 max-w-2xl mx-auto">
          {{ $t('howItWorksPage.subtitle') }}
        </p>
      </div>
    </section>

    <!-- Two audiences -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- For clients -->
        <div class="animate-fade-up p-8 rounded-3xl bg-stone-50 border border-stone-200">
          <div class="flex items-center gap-3 mb-8">
            <div class="w-11 h-11 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
              <UIcon name="i-heroicons-home" class="w-5 h-5" />
            </div>
            <h2 class="font-display text-xl font-bold text-stone-900">{{ $t('howItWorksPage.forClients') }}</h2>
          </div>
          <ol class="space-y-6">
            <li v-for="(s, i) in clientSteps" :key="i" class="flex gap-4">
              <div class="shrink-0 w-8 h-8 rounded-full bg-white border-2 border-orange-200 text-orange-600 flex items-center justify-center font-bold text-sm">
                {{ i + 1 }}
              </div>
              <div>
                <h3 class="font-semibold text-stone-900 mb-1">{{ s.title }}</h3>
                <p class="text-sm text-stone-500 leading-relaxed">{{ s.description }}</p>
              </div>
            </li>
          </ol>
          <NuxtLink
            :to="localePath('/cerere-noua')"
            class="mt-8 inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-orange-600 hover:bg-orange-700 rounded-xl transition-colors"
          >
            {{ $t('howItWorksPage.clientCta') }}
            <UIcon name="i-heroicons-arrow-right" class="w-4 h-4" />
          </NuxtLink>
        </div>

        <!-- For providers -->
        <div class="animate-fade-up delay-100 p-8 rounded-3xl bg-stone-900 text-white relative overflow-hidden">
          <div class="absolute -top-20 -right-20 w-64 h-64 bg-orange-600/20 rounded-full blur-[100px] pointer-events-none" />
          <div class="relative">
            <div class="flex items-center gap-3 mb-8">
              <div class="w-11 h-11 rounded-xl bg-orange-600/20 text-orange-400 flex items-center justify-center">
                <UIcon name="i-heroicons-wrench-screwdriver" class="w-5 h-5" />
              </div>
              <h2 class="font-display text-xl font-bold text-white">{{ $t('howItWorksPage.forProviders') }}</h2>
            </div>
            <ol class="space-y-6">
              <li v-for="(s, i) in providerSteps" :key="i" class="flex gap-4">
                <div class="shrink-0 w-8 h-8 rounded-full bg-white/10 border-2 border-orange-500/40 text-orange-400 flex items-center justify-center font-bold text-sm">
                  {{ i + 1 }}
                </div>
                <div>
                  <h3 class="font-semibold text-white mb-1">{{ s.title }}</h3>
                  <p class="text-sm text-stone-400 leading-relaxed">{{ s.description }}</p>
                </div>
              </li>
            </ol>
            <NuxtLink
              :to="localePath('/inregistrare')"
              class="mt-8 inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-stone-900 bg-white hover:bg-stone-100 rounded-xl transition-colors"
            >
              {{ $t('howItWorksPage.providerCta') }}
              <UIcon name="i-heroicons-arrow-right" class="w-4 h-4" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Benefits -->
    <section class="py-16 lg:py-24 bg-stone-50 border-y border-stone-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="font-display text-3xl font-bold text-stone-900 tracking-tight text-center mb-12">
          {{ $t('howItWorksPage.benefitsTitle') }}
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            v-for="(benefit, i) in benefits"
            :key="i"
            class="animate-fade-up p-8 rounded-2xl bg-white border border-stone-200 text-center"
            :style="{ animationDelay: `${i * 0.08}s` }"
          >
            <div class="w-11 h-11 rounded-xl bg-orange-50 border border-orange-100 text-orange-600 flex items-center justify-center mx-auto mb-5">
              <UIcon :name="benefit.icon" class="w-5 h-5" />
            </div>
            <h3 class="font-display font-semibold text-stone-900 mb-2">{{ benefit.title }}</h3>
            <p class="text-sm text-stone-500 leading-relaxed">{{ benefit.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      <h2 class="font-display text-3xl font-bold text-stone-900 tracking-tight text-center mb-10">
        {{ $t('howItWorksPage.faqTitle') }}
      </h2>
      <UAccordion :items="faqItems" />
    </section>

    <SharedBackToTop />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
useHead({ title: `${t('howItWorksPage.title')} — mesteri.md` })

const clientSteps = computed(() => [
  { title: t('howItWorksPage.clientStep1Title'), description: t('howItWorksPage.clientStep1Desc') },
  { title: t('howItWorksPage.clientStep2Title'), description: t('howItWorksPage.clientStep2Desc') },
  { title: t('howItWorksPage.clientStep3Title'), description: t('howItWorksPage.clientStep3Desc') }
])

const providerSteps = computed(() => [
  { title: t('howItWorksPage.providerStep1Title'), description: t('howItWorksPage.providerStep1Desc') },
  { title: t('howItWorksPage.providerStep2Title'), description: t('howItWorksPage.providerStep2Desc') },
  { title: t('howItWorksPage.providerStep3Title'), description: t('howItWorksPage.providerStep3Desc') }
])

const benefits = computed(() => [
  { icon: 'i-heroicons-shield-check', title: t('howItWorksPage.benefit1Title'), description: t('howItWorksPage.benefit1Desc') },
  { icon: 'i-heroicons-clock', title: t('howItWorksPage.benefit2Title'), description: t('howItWorksPage.benefit2Desc') },
  { icon: 'i-heroicons-banknotes', title: t('howItWorksPage.benefit3Title'), description: t('howItWorksPage.benefit3Desc') }
])

const faqItems = computed(() => [
  { label: t('howItWorksPage.faq1Q'), content: t('howItWorksPage.faq1A') },
  { label: t('howItWorksPage.faq2Q'), content: t('howItWorksPage.faq2A') },
  { label: t('howItWorksPage.faq3Q'), content: t('howItWorksPage.faq3A') },
  { label: t('howItWorksPage.faq4Q'), content: t('howItWorksPage.faq4A') }
])
</script>
