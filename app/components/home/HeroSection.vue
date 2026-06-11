<template>
  <section class="relative overflow-hidden bg-gradient-to-b from-orange-50/70 via-white to-white">
    <!-- Dot texture -->
    <div class="absolute inset-0 dot-grid opacity-40 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" />

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 lg:pt-24 lg:pb-28">
      <div class="text-center max-w-3xl mx-auto">
        <!-- Badge -->
        <div class="animate-fade-up inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-stone-200 shadow-sm text-stone-600 text-sm font-medium mb-8">
          <span class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          {{ $t('hero.badge') }}
        </div>

        <!-- Headline -->
        <h1 class="animate-fade-up delay-100 font-display text-4xl sm:text-5xl lg:text-[56px] font-bold text-stone-900 leading-[1.08] tracking-tight mb-6">
          {{ $t('hero.title') }}
          <span class="relative inline-block text-orange-600">
            {{ $t('hero.titleHighlight') }}
            <svg class="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 9" fill="none" preserveAspectRatio="none" aria-hidden="true">
              <path d="M2 7C50 2 150 2 198 6" stroke="#FDBA74" stroke-width="4" stroke-linecap="round" />
            </svg>
          </span>
        </h1>

        <!-- Subtitle -->
        <p class="animate-fade-up delay-200 text-lg sm:text-xl text-stone-500 max-w-2xl mx-auto mb-10 leading-relaxed">
          {{ $t('hero.subtitle') }}
        </p>

        <!-- Search card -->
        <div class="animate-fade-up delay-300 max-w-2xl mx-auto">
          <div class="bg-white rounded-2xl p-2.5 border border-stone-200 shadow-xl shadow-stone-900/5">
            <SharedSearchBar
              v-model="searchQuery"
              :placeholder="$t('hero.searchPlaceholder')"
              show-location
              @search="handleSearch"
            />
          </div>
        </div>

        <!-- Popular categories quick chips -->
        <div class="animate-fade-up delay-400 mt-6 flex flex-wrap items-center justify-center gap-2">
          <span class="text-sm text-stone-400 mr-1">{{ $t('hero.popular') }}:</span>
          <NuxtLink
            v-for="chip in popularChips"
            :key="chip.slug"
            :to="localePath(`/servicii/${chip.slug}`)"
            class="px-3 py-1.5 rounded-full bg-white border border-stone-200 text-sm font-medium text-stone-600 hover:border-orange-300 hover:text-orange-700 hover:bg-orange-50 transition-colors"
          >
            {{ chip.icon }} {{ chip.name }}
          </NuxtLink>
        </div>

        <!-- Trust strip -->
        <div class="animate-fade-up delay-500 mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
          <div class="flex items-center gap-3">
            <div class="flex -space-x-2.5">
              <img
                v-for="(avatar, i) in trustAvatars"
                :key="i"
                :src="avatar"
                alt=""
                class="w-9 h-9 rounded-full ring-2 ring-white object-cover"
                loading="lazy"
              />
            </div>
            <div class="text-left">
              <p class="text-sm font-semibold text-stone-900">500+ {{ $t('hero.verifiedShort') }}</p>
              <div class="flex items-center gap-1">
                <UIcon v-for="s in 5" :key="s" name="i-heroicons-star-solid" class="w-3.5 h-3.5 text-amber-400" />
                <span class="text-xs text-stone-500 ml-1">4.8 / 5</span>
              </div>
            </div>
          </div>
          <div class="hidden sm:block w-px h-10 bg-stone-200" />
          <div class="flex items-center gap-6 text-sm text-stone-500">
            <span class="flex items-center gap-1.5">
              <UIcon name="i-heroicons-shield-check-solid" class="w-4 h-4 text-emerald-500" />
              {{ $t('hero.verified') }}
            </span>
            <span class="flex items-center gap-1.5">
              <UIcon name="i-heroicons-bolt-solid" class="w-4 h-4 text-orange-500" />
              {{ $t('hero.fast') }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { categories } from '~/data/categories'

const router = useRouter()
const localePath = useLocalePath()
const searchQuery = ref('')

const popularChips = computed(() =>
  categories
    .slice()
    .sort((a, b) => b.providerCount - a.providerCount)
    .slice(0, 4)
    .map(c => ({ slug: c.slug, name: c.name, icon: c.icon }))
)

const trustAvatars = [
  'https://i.pravatar.cc/72?img=1',
  'https://i.pravatar.cc/72?img=5',
  'https://i.pravatar.cc/72?img=12',
  'https://i.pravatar.cc/72?img=16',
  'https://i.pravatar.cc/72?img=13'
]

function handleSearch(query: string, city: string) {
  const params = new URLSearchParams()
  if (query) params.set('q', query)
  if (city) params.set('city', city)
  const qs = params.toString()
  router.push(localePath(`/mesteri${qs ? `?${qs}` : ''}`))
}
</script>
