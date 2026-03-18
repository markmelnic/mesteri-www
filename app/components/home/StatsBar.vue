<template>
  <section class="relative py-16 overflow-hidden">
    <!-- Subtle glow -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] bg-indigo-500/5 rounded-full blur-[80px]" />
    </div>

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        <div
          v-for="(stat, i) in stats"
          :key="stat.key"
          class="animate-fade-up text-center p-6 rounded-2xl bg-white border border-gray-100 shadow-sm"
          :style="{ animationDelay: `${i * 0.1}s` }"
        >
          <div class="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 mb-4">
            <UIcon :name="stat.icon" class="w-6 h-6" />
          </div>
          <p class="text-3xl sm:text-4xl font-extrabold tracking-tight gradient-text mb-1">
            {{ stat.value }}
          </p>
          <p class="text-sm text-gray-500 font-medium">{{ stat.label }}</p>
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
