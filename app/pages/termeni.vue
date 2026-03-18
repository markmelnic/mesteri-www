<template>
  <div>
    <!-- Hero -->
    <section class="relative overflow-hidden py-12 lg:py-16" style="background: var(--gradient-dark-section)">
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="animate-fade-up text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
          {{ $t('terms.title') }}
        </h1>
        <p class="animate-fade-up delay-100 text-sm text-indigo-200/50">{{ $t('terms.lastUpdated') }}</p>
      </div>
    </section>

    <!-- Content -->
    <section class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <div class="animate-fade-up p-8 lg:p-10 rounded-2xl bg-white border border-gray-100 shadow-sm prose prose-gray max-w-none">
        <div v-for="(section, i) in sections" :key="i" class="mb-8 last:mb-0">
          <h2 class="text-lg font-bold text-gray-900 mb-3">{{ section.title }}</h2>
          <p class="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{{ section.content }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
useHead({ title: `${t('terms.title')} — mesteri.md` })

const sections = computed(() => [
  { title: t('terms.section1Title'), content: t('terms.section1Text') },
  { title: t('terms.section2Title'), content: t('terms.section2Text') },
  { title: t('terms.section3Title'), content: t('terms.section3Text') },
  { title: t('terms.section4Title'), content: t('terms.section4Text') },
  { title: t('terms.section5Title'), content: t('terms.section5Text') }
])
</script>
