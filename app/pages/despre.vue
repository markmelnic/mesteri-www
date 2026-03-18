<template>
  <div>
    <!-- Hero -->
    <section class="relative overflow-hidden py-16 lg:py-24" style="background: var(--gradient-dark-section)">
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-indigo-600/10 rounded-full blur-[120px]" />
      </div>
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span class="animate-fade-up inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-indigo-200 text-xs font-semibold uppercase tracking-wider mb-6">
          {{ $t('about.badge') || 'Despre noi' }}
        </span>
        <h1 class="animate-fade-up delay-100 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-6">
          {{ $t('about.title') }}
        </h1>
        <p class="animate-fade-up delay-200 text-lg text-indigo-200/60 max-w-2xl mx-auto leading-relaxed">
          {{ $t('about.subtitle') }}
        </p>
      </div>
    </section>

    <!-- Mission -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      <div class="max-w-3xl mx-auto text-center">
        <h2 class="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mb-6">{{ $t('about.missionTitle') }}</h2>
        <p class="text-lg text-gray-500 leading-relaxed">{{ $t('about.missionText') }}</p>
      </div>
    </section>

    <!-- Values -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 lg:pb-24">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          v-for="(value, i) in values"
          :key="i"
          class="animate-fade-up p-8 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300"
          :style="{ animationDelay: `${i * 0.1}s` }"
        >
          <div class="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-5">
            <UIcon :name="value.icon" class="w-6 h-6" />
          </div>
          <h3 class="text-lg font-bold text-gray-900 mb-3">{{ value.title }}</h3>
          <p class="text-sm text-gray-500 leading-relaxed">{{ value.description }}</p>
        </div>
      </div>
    </section>

    <!-- Stats -->
    <section class="py-16 lg:py-20 section-dark">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div v-for="stat in aboutStats" :key="stat.label">
            <p class="text-3xl sm:text-4xl font-extrabold text-white mb-2">{{ stat.value }}</p>
            <p class="text-sm text-indigo-200/50">{{ stat.label }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 text-center">
      <h2 class="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mb-4">{{ $t('about.ctaTitle') }}</h2>
      <p class="text-gray-500 max-w-xl mx-auto mb-8">{{ $t('about.ctaText') }}</p>
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
        <UButton to="/inregistrare" color="primary" size="lg" class="font-semibold bg-indigo-600 hover:bg-indigo-700" trailing-icon="i-heroicons-arrow-right">
          {{ $t('about.ctaButton') || $t('cta.button') }}
        </UButton>
        <UButton to="/cum-functioneaza" variant="outline" color="neutral" size="lg" class="font-semibold">
          {{ $t('about.learnMore') || 'Afla mai multe' }}
        </UButton>
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
