<template>
  <div>
    <!-- Hero -->
    <section class="relative overflow-hidden py-12 lg:py-16 bg-[#0A0A0A]">
      <div class="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="animate-fade-up text-[30px] sm:text-[36px] font-bold text-white tracking-tight mb-3">
          {{ $t('privacy.title') }}
        </h1>
        <p class="animate-fade-up delay-100 text-sm text-[#63636E]">{{ $t('privacy.lastUpdated') }}</p>
      </div>
    </section>

    <!-- Content -->
    <section class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <div class="animate-fade-up p-8 lg:p-10 rounded-xl bg-[#141416] border border-white/[0.06]">
        <div v-for="(section, i) in sections" :key="i" class="mb-8 last:mb-0">
          <h2 class="text-lg font-semibold text-white mb-3">{{ section.title }}</h2>
          <p class="text-sm text-[#A1A1AA] leading-relaxed whitespace-pre-line">{{ section.content }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
useHead({ title: `${t('privacy.title')} — mesteri.md` })

const sections = computed(() => [
  { title: t('privacy.section1Title'), content: t('privacy.section1Text') },
  { title: t('privacy.section2Title'), content: t('privacy.section2Text') },
  { title: t('privacy.section3Title'), content: t('privacy.section3Text') },
  { title: t('privacy.section4Title'), content: t('privacy.section4Text') },
  { title: t('privacy.section5Title'), content: t('privacy.section5Text') }
])
</script>
