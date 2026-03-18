<template>
  <section class="relative overflow-hidden min-h-[90vh] flex items-center" style="background: var(--gradient-hero)">
    <!-- Animated gradient orbs -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-indigo-600/20 blur-[128px] animate-float" />
      <div class="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-violet-600/20 blur-[128px] animate-float" style="animation-delay: -3s" />
      <div class="absolute top-1/2 left-1/2 w-[300px] h-[300px] rounded-full bg-cyan-500/10 blur-[96px] animate-float" style="animation-delay: -1.5s" />
    </div>

    <!-- Dot pattern overlay -->
    <div class="absolute inset-0 opacity-[0.03]" style="background-image: radial-gradient(circle, white 1px, transparent 1px); background-size: 32px 32px;" />

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 w-full">
      <div class="text-center max-w-4xl mx-auto">
        <!-- Badge -->
        <div class="animate-fade-up inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-indigo-200 text-sm font-medium mb-8">
          <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          {{ $t('hero.badge') || '500+ mesteri verificati' }}
        </div>

        <!-- Headline -->
        <h1 class="animate-fade-up delay-100 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] mb-6 tracking-tight">
          {{ $t('hero.title') }}
          <span class="block mt-1 bg-gradient-to-r from-indigo-300 via-violet-300 to-cyan-300 bg-clip-text text-transparent">
            {{ $t('hero.titleLine2') }}
          </span>
        </h1>

        <!-- Subtitle -->
        <p class="animate-fade-up delay-200 text-lg sm:text-xl text-indigo-200/80 max-w-2xl mx-auto mb-12 leading-relaxed font-light">
          {{ $t('hero.subtitle') }}
        </p>

        <!-- Search bar -->
        <div class="animate-fade-up delay-300 flex justify-center">
          <div class="w-full max-w-2xl bg-white/10 backdrop-blur-xl rounded-2xl p-2 border border-white/10">
            <SharedSearchBar
              v-model="searchQuery"
              :placeholder="$t('hero.searchPlaceholder')"
              show-location
              @search="handleSearch"
            />
          </div>
        </div>

        <!-- Trust indicators -->
        <div class="animate-fade-up delay-400 mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-indigo-300/60">
          <div class="flex items-center gap-2">
            <UIcon name="i-heroicons-shield-check-solid" class="w-5 h-5 text-emerald-400/70" />
            <span>{{ $t('hero.verified') || 'Mesteri verificati' }}</span>
          </div>
          <div class="flex items-center gap-2">
            <UIcon name="i-heroicons-star-solid" class="w-5 h-5 text-amber-400/70" />
            <span>{{ $t('hero.avgRating') || '4.8 rating mediu' }}</span>
          </div>
          <div class="flex items-center gap-2">
            <UIcon name="i-heroicons-bolt-solid" class="w-5 h-5 text-indigo-400/70" />
            <span>{{ $t('hero.fast') || 'Raspuns rapid' }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom fade -->
    <div class="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#fafbfc] to-transparent" />
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
