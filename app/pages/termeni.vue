<template>
  <div class="bg-stone-50 min-h-screen">
    <!-- Header -->
    <section class="bg-white border-b border-stone-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14 text-center">
        <h1 class="animate-fade-up font-display text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight mb-3">
          {{ $t('terms.title') }}
        </h1>
        <p class="animate-fade-up delay-100 text-sm text-stone-400">{{ $t('terms.lastUpdated') }}</p>
      </div>
    </section>

    <!-- Content -->
    <section class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
      <div class="animate-fade-up p-8 lg:p-10 rounded-2xl bg-white border border-stone-200">
        <div v-for="(section, i) in sections" :key="i" class="mb-8 last:mb-0">
          <h2 class="font-display text-lg font-semibold text-stone-900 mb-3">{{ section.title }}</h2>
          <p class="text-sm text-stone-600 leading-relaxed whitespace-pre-line">{{ section.content }}</p>
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
