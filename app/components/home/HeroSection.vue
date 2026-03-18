<template>
  <section class="relative overflow-hidden min-h-[90vh] flex items-center bg-[#0A0A0A]">
    <!-- Accent glow behind hero -->
    <div class="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#0D9373]/[0.08] rounded-full blur-[150px] pointer-events-none" />

    <!-- Dot pattern overlay -->
    <div class="absolute inset-0 opacity-[0.03]" style="background-image: radial-gradient(circle, white 1px, transparent 1px); background-size: 32px 32px;" />

    <div class="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 w-full">
      <div class="text-center max-w-3xl mx-auto">
        <!-- Badge -->
        <div class="animate-fade-up inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-[#A1A1AA] text-sm font-medium mb-8">
          <span class="w-2 h-2 rounded-full bg-[#0D9373]" />
          {{ $t('hero.badge') || '500+ mesteri verificati' }}
        </div>

        <!-- Headline -->
        <h1 class="animate-fade-up delay-100 text-[40px] sm:text-[48px] md:text-[56px] font-bold text-white leading-[1.1] mb-6" style="letter-spacing: -0.03em;">
          {{ $t('hero.title') }}
          <span class="block mt-1 text-[#0D9373]">
            {{ $t('hero.titleLine2') }}
          </span>
        </h1>

        <!-- Subtitle -->
        <p class="animate-fade-up delay-200 text-lg sm:text-xl text-[#A1A1AA] max-w-2xl mx-auto mb-10 leading-relaxed">
          {{ $t('hero.subtitle') }}
        </p>

        <!-- CTA Buttons -->
        <div class="animate-fade-up delay-300 flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <NuxtLink
            to="/cerere-noua"
            class="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-[#0D9373] hover:bg-[#0FAA84] rounded-[10px] transition-colors duration-150"
          >
            {{ $t('cta.button') }}
            <UIcon name="i-heroicons-arrow-right" class="w-4 h-4" />
          </NuxtLink>
          <NuxtLink
            to="/cum-functioneaza"
            class="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-[#A1A1AA] border border-white/[0.06] hover:border-white/[0.12] hover:text-white rounded-[10px] transition-all duration-150"
          >
            {{ $t('cta.learnMore') || 'Afla mai multe' }}
          </NuxtLink>
        </div>

        <!-- Search bar -->
        <div class="animate-fade-up delay-400 flex justify-center">
          <div class="w-full max-w-2xl bg-[#141416] rounded-xl p-2 border border-white/[0.06]">
            <SharedSearchBar
              v-model="searchQuery"
              :placeholder="$t('hero.searchPlaceholder')"
              show-location
              @search="handleSearch"
            />
          </div>
        </div>

        <!-- Trust indicators -->
        <div class="animate-fade-up delay-500 mt-10 flex flex-wrap items-center justify-center gap-8 text-sm text-[#63636E]">
          <div class="flex items-center gap-2">
            <UIcon name="i-heroicons-shield-check-solid" class="w-4 h-4 text-[#0D9373]/70" />
            <span>{{ $t('hero.verified') || 'Mesteri verificati' }}</span>
          </div>
          <div class="flex items-center gap-2">
            <UIcon name="i-heroicons-star-solid" class="w-4 h-4 text-[#0D9373]/70" />
            <span>{{ $t('hero.avgRating') || '4.8 rating mediu' }}</span>
          </div>
          <div class="flex items-center gap-2">
            <UIcon name="i-heroicons-bolt-solid" class="w-4 h-4 text-[#0D9373]/70" />
            <span>{{ $t('hero.fast') || 'Raspuns rapid' }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()
const router = useRouter()
const searchQuery = ref('')

function handleSearch(query: string, city: string) {
  const params = new URLSearchParams()
  if (query) params.set('q', query)
  if (city && city !== t('search.allCities')) params.set('city', city)
  router.push(`/servicii?${params.toString()}`)
}
</script>
