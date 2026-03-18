<template>
  <section class="relative py-20 bg-[#0A0A0A]">
    <div class="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
        <div
          v-for="(stat, i) in stats"
          :key="stat.key"
          class="animate-fade-up text-center"
          :style="{ animationDelay: `${i * 0.1}s` }"
        >
          <p class="text-[36px] sm:text-[44px] font-bold text-white tracking-tight mb-1">
            {{ stat.value }}
          </p>
          <p class="text-sm text-[#63636E] font-medium">{{ stat.label }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()

const stats = computed(() => [
  { key: 'providers', value: '500+', label: t('stats.providers'), icon: 'i-heroicons-user-group-solid' },
  { key: 'jobs', value: '2,000+', label: t('stats.completedJobs'), icon: 'i-heroicons-check-badge-solid' },
  { key: 'rating', value: '4.8', label: t('stats.avgRating'), icon: 'i-heroicons-star-solid' },
  { key: 'categories', value: '50+', label: t('stats.categoriesCount'), icon: 'i-heroicons-squares-2x2-solid' }
])
</script>
