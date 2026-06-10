<template>
  <section class="py-20 lg:py-28 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="relative overflow-hidden rounded-3xl bg-stone-900 px-6 py-16 sm:px-12 lg:px-16">
        <!-- Texture & glow -->
        <div class="absolute inset-0 dot-grid-dark opacity-30" />
        <div class="absolute -top-24 -right-24 w-96 h-96 bg-orange-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div class="absolute -bottom-32 -left-24 w-80 h-80 bg-orange-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div class="relative grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <!-- For clients -->
          <div>
            <h2 class="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
              {{ $t('cta.title') }}
            </h2>
            <p class="text-stone-400 leading-relaxed mb-8 max-w-md">
              {{ $t('cta.subtitle') }}
            </p>
            <NuxtLink
              :to="localePath('/cerere-noua')"
              class="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-stone-900 bg-white hover:bg-stone-100 rounded-xl transition-colors"
            >
              {{ $t('cta.button') }}
              <UIcon name="i-heroicons-arrow-right" class="w-4 h-4" />
            </NuxtLink>
          </div>

          <!-- For providers -->
          <div class="lg:border-l lg:border-white/10 lg:pl-20">
            <p class="text-sm font-semibold text-orange-400 uppercase tracking-wider mb-3">
              {{ $t('cta.providerBadge') }}
            </p>
            <h3 class="font-display text-2xl sm:text-[28px] font-bold text-white tracking-tight mb-4">
              {{ $t('cta.providerTitle') }}
            </h3>
            <ul class="space-y-3 mb-8">
              <li v-for="(perk, i) in providerPerks" :key="i" class="flex items-start gap-2.5 text-sm text-stone-300">
                <UIcon name="i-heroicons-check-circle-solid" class="w-5 h-5 text-orange-500 shrink-0 mt-px" />
                {{ perk }}
              </li>
            </ul>
            <NuxtLink
              :to="localePath('/inregistrare')"
              class="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-orange-600 hover:bg-orange-500 rounded-xl transition-colors"
            >
              {{ $t('cta.providerButton') }}
              <UIcon name="i-heroicons-arrow-right" class="w-4 h-4" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

const providerPerks = computed(() => [
  t('cta.providerPerk1'),
  t('cta.providerPerk2'),
  t('cta.providerPerk3')
])
</script>
