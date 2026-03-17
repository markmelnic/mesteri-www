<template>
  <section class="py-12 bg-white border-y border-gray-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-8">
        <div v-for="stat in stats" :key="stat.key" class="text-center">
          <p class="text-3xl sm:text-4xl font-bold text-blue-600 mb-1">
            {{ stat.value }}
          </p>
          <p class="text-sm text-gray-500">{{ stat.label }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()

const stats = computed(() => [
  { key: 'providers', value: '500+', label: t('stats.providers') },
  { key: 'jobs', value: '2,000+', label: t('stats.completedJobs') },
  { key: 'rating', value: '4.8', label: t('stats.avgRating') },
  { key: 'categories', value: '50+', label: t('stats.categoriesCount') }
])
</script>
