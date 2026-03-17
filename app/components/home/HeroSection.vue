<template>
  <section class="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-amber-50 py-20 lg:py-28">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
        {{ $t('hero.title') }}<br class="hidden sm:block" /> {{ $t('hero.titleLine2') }}
      </h1>
      <p class="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
        {{ $t('hero.subtitle') }}
      </p>
      <div class="flex justify-center">
        <SharedSearchBar
          v-model="searchQuery"
          :placeholder="$t('hero.searchPlaceholder')"
          show-location
          @search="handleSearch"
        />
      </div>
    </div>
    <!-- Decorative elements -->
    <div class="absolute top-10 left-10 w-72 h-72 bg-blue-200 rounded-full opacity-20 blur-3xl" />
    <div class="absolute bottom-10 right-10 w-96 h-96 bg-amber-200 rounded-full opacity-20 blur-3xl" />
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
