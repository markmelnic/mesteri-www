<template>
  <section class="py-20 lg:py-28 bg-stone-50 border-y border-stone-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section header -->
      <div class="text-center max-w-2xl mx-auto mb-16">
        <p class="text-sm font-semibold text-orange-600 uppercase tracking-wider mb-3">
          {{ $t('howItWorks.badge') }}
        </p>
        <h2 class="font-display text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight mb-4">
          {{ $t('howItWorks.title') }}
        </h2>
        <p class="text-stone-500 leading-relaxed">
          {{ $t('howItWorks.subtitle') }}
        </p>
      </div>

      <!-- Steps -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        <div
          v-for="(step, i) in steps"
          :key="i"
          class="animate-fade-up relative"
          :style="{ animationDelay: `${i * 0.1}s` }"
        >
          <!-- Connector arrow (desktop) -->
          <div v-if="i < 2" class="hidden md:flex absolute top-10 -right-4 lg:-right-5 z-10 w-8 lg:w-10 items-center justify-center text-stone-300">
            <UIcon name="i-heroicons-arrow-long-right" class="w-6 h-6" />
          </div>

          <div class="relative h-full p-8 rounded-2xl bg-white border border-stone-200 shadow-sm">
            <div class="flex items-center gap-4 mb-5">
              <div class="w-12 h-12 rounded-xl bg-orange-50 border border-orange-100 text-orange-600 flex items-center justify-center">
                <UIcon :name="step.icon" class="w-6 h-6" />
              </div>
              <span class="font-display text-sm font-bold text-stone-300">0{{ i + 1 }}</span>
            </div>

            <h3 class="font-display text-lg font-semibold text-stone-900 mb-2">{{ step.title }}</h3>
            <p class="text-sm text-stone-500 leading-relaxed">{{ step.description }}</p>
          </div>
        </div>
      </div>

      <div class="text-center mt-12">
        <NuxtLink
          :to="localePath('/cerere-noua')"
          class="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-orange-600 hover:bg-orange-700 rounded-xl transition-colors shadow-lg shadow-orange-600/20"
        >
          {{ $t('howItWorks.cta') }}
          <UIcon name="i-heroicons-arrow-right" class="w-4 h-4" />
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

const steps = computed(() => [
  {
    icon: 'i-heroicons-clipboard-document-list',
    title: t('howItWorks.step1Title'),
    description: t('howItWorks.step1Desc')
  },
  {
    icon: 'i-heroicons-chat-bubble-left-right',
    title: t('howItWorks.step2Title'),
    description: t('howItWorks.step2Desc')
  },
  {
    icon: 'i-heroicons-hand-thumb-up',
    title: t('howItWorks.step3Title'),
    description: t('howItWorks.step3Desc')
  }
])
</script>
