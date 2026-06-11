<template>
  <div>
    <!-- Hero -->
    <section class="relative overflow-hidden bg-gradient-to-b from-orange-50/70 to-white">
      <div class="absolute inset-0 dot-grid opacity-40 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" />
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 text-center">
        <p class="animate-fade-up text-sm font-semibold text-orange-600 uppercase tracking-wider mb-4">
          {{ $t('about.badge') }}
        </p>
        <h1 class="animate-fade-up delay-100 font-display text-4xl sm:text-5xl font-bold text-stone-900 tracking-tight mb-6">
          {{ $t('about.title') }}
        </h1>
        <p class="animate-fade-up delay-200 text-lg text-stone-500 max-w-2xl mx-auto leading-relaxed">
          {{ $t('about.subtitle') }}
        </p>
      </div>
    </section>

    <!-- Mission -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      <div class="max-w-3xl mx-auto text-center">
        <h2 class="font-display text-3xl font-bold text-stone-900 tracking-tight mb-6">{{ $t('about.missionTitle') }}</h2>
        <p class="text-stone-500 leading-relaxed text-lg">{{ $t('about.missionText') }}</p>
      </div>
    </section>

    <!-- Values -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 lg:pb-24">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          v-for="(value, i) in values"
          :key="i"
          class="animate-fade-up p-8 rounded-2xl bg-stone-50 border border-stone-200"
          :style="{ animationDelay: `${i * 0.08}s` }"
        >
          <div class="w-11 h-11 rounded-xl bg-white border border-stone-200 text-orange-600 flex items-center justify-center mb-5">
            <UIcon :name="value.icon" class="w-5 h-5" />
          </div>
          <h3 class="font-display text-lg font-semibold text-stone-900 mb-3">{{ value.title }}</h3>
          <p class="text-sm text-stone-500 leading-relaxed">{{ value.description }}</p>
        </div>
      </div>
    </section>

    <!-- Stats -->
    <section class="py-16 lg:py-20 bg-stone-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div v-for="stat in aboutStats" :key="stat.label">
            <p class="font-display text-4xl sm:text-5xl font-bold text-white mb-2">{{ stat.value }}</p>
            <p class="text-sm text-stone-400">{{ stat.label }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 text-center">
      <h2 class="font-display text-3xl font-bold text-stone-900 tracking-tight mb-4">{{ $t('about.ctaTitle') }}</h2>
      <p class="text-stone-500 max-w-xl mx-auto mb-8">{{ $t('about.ctaText') }}</p>
      <div class="flex flex-col sm:flex-row items-center justify-center gap-3">
        <NuxtLink
          :to="localePath('/inregistrare')"
          class="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-orange-600 hover:bg-orange-700 rounded-xl transition-colors shadow-lg shadow-orange-600/20"
        >
          {{ $t('about.ctaButton') }}
          <UIcon name="i-heroicons-arrow-right" class="w-4 h-4" />
        </NuxtLink>
        <NuxtLink
          :to="localePath('/cum-functioneaza')"
          class="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-stone-700 bg-white border border-stone-200 hover:bg-stone-50 rounded-xl transition-colors"
        >
          {{ $t('about.learnMore') }}
        </NuxtLink>
      </div>
    </section>

    <SharedBackToTop />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
useHead({ title: `${t('about.title')} — mesteri.md` })

const values = computed(() => [
  { icon: 'i-heroicons-shield-check', title: t('about.value1Title'), description: t('about.value1Text') },
  { icon: 'i-heroicons-users', title: t('about.value2Title'), description: t('about.value2Text') },
  { icon: 'i-heroicons-light-bulb', title: t('about.value3Title'), description: t('about.value3Text') }
])

const aboutStats = computed(() => [
  { value: '500+', label: t('stats.providers') },
  { value: '2 000+', label: t('stats.completedJobs') },
  { value: '4.8', label: t('stats.avgRating') },
  { value: '18', label: t('stats.categoriesCount') }
])
</script>
