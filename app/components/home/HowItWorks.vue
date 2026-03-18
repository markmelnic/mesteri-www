<template>
  <section class="relative py-20 lg:py-28 section-dark overflow-hidden">
    <!-- Glow effects -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden">
      <div class="absolute top-0 left-1/4 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[120px]" />
      <div class="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-violet-600/10 rounded-full blur-[100px]" />
    </div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section header -->
      <div class="text-center max-w-2xl mx-auto mb-16">
        <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-4">
          <UIcon name="i-heroicons-sparkles-solid" class="w-3.5 h-3.5" />
          {{ $t('howItWorks.badge') || 'Simplu' }}
        </span>
        <h2 class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
          {{ $t('howItWorks.title') }}
        </h2>
        <p class="text-lg text-indigo-200/60 leading-relaxed">
          {{ $t('howItWorks.subtitle') || 'Trei pasi simpli pentru a gasi mesterul perfect.' }}
        </p>
      </div>

      <!-- Steps -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
          v-for="(step, i) in steps"
          :key="i"
          class="animate-fade-up relative group"
          :style="{ animationDelay: `${i * 0.15}s` }"
        >
          <!-- Connector line (desktop) -->
          <div v-if="i < 2" class="hidden md:block absolute top-12 left-[calc(50%+48px)] w-[calc(100%-96px)] h-px bg-gradient-to-r from-indigo-500/30 to-transparent" />

          <div class="relative p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm text-center hover:bg-white/[0.08] transition-colors duration-300">
            <!-- Step number -->
            <div class="relative inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white mb-6 shadow-lg shadow-indigo-500/20">
              <UIcon :name="step.icon" class="w-7 h-7" />
              <span class="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-white text-indigo-600 text-xs font-bold flex items-center justify-center shadow-md">
                {{ i + 1 }}
              </span>
            </div>

            <h3 class="text-lg font-bold text-white mb-3">{{ step.title }}</h3>
            <p class="text-sm text-indigo-200/60 leading-relaxed">{{ step.description }}</p>
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
