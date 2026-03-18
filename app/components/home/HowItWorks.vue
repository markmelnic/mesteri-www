<template>
  <section class="relative py-20 lg:py-28 bg-[#111113] overflow-hidden">
    <!-- Subtle accent glow -->
    <div class="absolute top-0 left-1/3 w-[400px] h-[300px] bg-[#0D9373]/[0.06] rounded-full blur-[140px] pointer-events-none" />

    <div class="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section header -->
      <div class="text-center max-w-2xl mx-auto mb-16">
        <p class="text-sm font-semibold text-[#0D9373] uppercase tracking-wider mb-4">
          {{ $t('howItWorks.badge') || 'Simplu' }}
        </p>
        <h2 class="text-[30px] sm:text-[36px] font-bold text-white tracking-tight mb-4">
          {{ $t('howItWorks.title') }}
        </h2>
        <p class="text-[#A1A1AA] leading-relaxed">
          {{ $t('howItWorks.subtitle') || 'Trei pasi simpli pentru a gasi mesterul perfect.' }}
        </p>
      </div>

      <!-- Steps -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
          v-for="(step, i) in steps"
          :key="i"
          class="animate-fade-up relative"
          :style="{ animationDelay: `${i * 0.12}s` }"
        >
          <!-- Connector line (desktop) -->
          <div v-if="i < 2" class="hidden md:block absolute top-8 left-[calc(50%+40px)] w-[calc(100%-80px)] h-px border-t border-dashed border-white/[0.08]" />

          <div class="relative p-8 rounded-xl bg-white/[0.02] border border-white/[0.06] text-center hover:border-white/[0.12] transition-all duration-150">
            <!-- Step number -->
            <div class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#0D9373]/10 text-[#0D9373] text-sm font-bold mb-5 border border-[#0D9373]/20">
              {{ i + 1 }}
            </div>

            <h3 class="text-lg font-semibold text-white mb-3">{{ step.title }}</h3>
            <p class="text-sm text-[#A1A1AA] leading-relaxed">{{ step.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()

const steps = computed(() => [
  {
    icon: 'i-heroicons-clipboard-document-list',
    title: t('howItWorks.step1Title'),
    description: t('howItWorks.step1Desc')
  },
  {
    icon: 'i-heroicons-inbox',
    title: t('howItWorks.step2Title'),
    description: t('howItWorks.step2Desc')
  },
  {
    icon: 'i-heroicons-star',
    title: t('howItWorks.step3Title'),
    description: t('howItWorks.step3Desc')
  }
])
</script>
