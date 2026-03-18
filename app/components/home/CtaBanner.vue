<template>
  <section class="relative py-20 lg:py-28 bg-[#0F1117] overflow-hidden">
    <!-- Accent glow -->
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] bg-[#0D9373]/[0.08] rounded-full blur-[140px] pointer-events-none" />

    <div class="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 class="text-[30px] sm:text-[40px] font-bold text-white tracking-tight mb-4">
        {{ $t('cta.title') }}
      </h2>
      <p class="text-[#A1A1AA] max-w-xl mx-auto mb-10 leading-relaxed">
        {{ $t('cta.subtitle') }}
      </p>
      <NuxtLink
        to="/inregistrare"
        class="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-[#0D9373] hover:bg-[#0FAA84] rounded-[10px] transition-colors duration-150"
      >
        {{ $t('cta.button') }}
        <UIcon name="i-heroicons-arrow-right" class="w-4 h-4" />
      </NuxtLink>
    </div>
  </section>
</template>
