<template>
  <div>
    <!-- Hero -->
    <section class="relative overflow-hidden py-16 lg:py-24 bg-[#0A0A0A]">
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#0D9373]/[0.06] rounded-full blur-[140px] pointer-events-none" />
      <div class="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p class="animate-fade-up text-sm font-semibold text-[#0D9373] uppercase tracking-wider mb-6">
          {{ $t('about.badge') || 'Despre noi' }}
        </p>
        <h1 class="animate-fade-up delay-100 text-[32px] sm:text-[40px] lg:text-[48px] font-bold text-white tracking-tight mb-6">
          {{ $t('about.title') }}
        </h1>
        <p class="animate-fade-up delay-200 text-lg text-[#A1A1AA] max-w-2xl mx-auto leading-relaxed">
          {{ $t('about.subtitle') }}
        </p>
      </div>
    </section>

    <!-- Mission -->
    <section class="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      <div class="max-w-3xl mx-auto text-center">
        <h2 class="text-[24px] sm:text-[30px] font-bold text-white tracking-tight mb-6">{{ $t('about.missionTitle') }}</h2>
        <p class="text-[#A1A1AA] leading-relaxed text-lg">{{ $t('about.missionText') }}</p>
      </div>
    </section>

    <!-- Values -->
    <section class="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pb-16 lg:pb-24">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          v-for="(value, i) in values"
          :key="i"
          class="animate-fade-up p-8 rounded-xl bg-[#141416] border border-white/[0.06] hover:border-white/[0.12] transition-all duration-150"
          :style="{ animationDelay: `${i * 0.1}s` }"
        >
          <div class="w-10 h-10 rounded-lg bg-[#0D9373]/10 text-[#0D9373] flex items-center justify-center mb-5">
            <UIcon :name="value.icon" class="w-5 h-5" />
          </div>
          <h3 class="text-lg font-semibold text-white mb-3">{{ value.title }}</h3>
          <p class="text-sm text-[#A1A1AA] leading-relaxed">{{ value.description }}</p>
        </div>
      </div>
    </section>

    <!-- Stats -->
    <section class="py-16 lg:py-20 bg-[#111113]">
      <div class="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div v-for="stat in aboutStats" :key="stat.label">
            <p class="text-[36px] sm:text-[44px] font-bold text-white mb-2">{{ stat.value }}</p>
            <p class="text-sm text-[#63636E]">{{ stat.label }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 text-center">
      <h2 class="text-[24px] sm:text-[30px] font-bold text-white tracking-tight mb-4">{{ $t('about.ctaTitle') }}</h2>
      <p class="text-[#A1A1AA] max-w-xl mx-auto mb-8">{{ $t('about.ctaText') }}</p>
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
        <NuxtLink
          to="/inregistrare"
          class="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-[#0D9373] hover:bg-[#0FAA84] rounded-[10px] transition-colors duration-150"
        >
          {{ $t('about.ctaButton') || $t('cta.button') }}
          <UIcon name="i-heroicons-arrow-right" class="w-4 h-4" />
        </NuxtLink>
        <NuxtLink
          to="/cum-functioneaza"
          class="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-[#A1A1AA] border border-white/[0.06] hover:border-white/[0.12] hover:text-white rounded-[10px] transition-all duration-150"
        >
          {{ $t('about.learnMore') || 'Afla mai multe' }}
        </NuxtLink>
      </div>
    </section>

    <SharedBackToTop />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
useHead({ title: `${t('about.title')} — mesteri.md` })

const values = computed(() => [
  {
    icon: 'i-heroicons-shield-check-solid',
    title: t('about.value1Title'),
    description: t('about.value1Text')
  },
  {
    icon: 'i-heroicons-users-solid',
    title: t('about.value2Title'),
    description: t('about.value2Text')
  },
  {
    icon: 'i-heroicons-light-bulb-solid',
    title: t('about.value3Title'),
    description: t('about.value3Text')
  }
])

const aboutStats = computed(() => [
  { value: '500+', label: t('stats.providers') },
  { value: '2,000+', label: t('stats.completedJobs') },
  { value: '4.8', label: t('stats.avgRating') },
  { value: '50+', label: t('stats.categoriesCount') }
])
</script>
