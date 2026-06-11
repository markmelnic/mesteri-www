<template>
  <section class="border-y border-stone-200 bg-stone-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-8">
        <div
          v-for="(stat, i) in stats"
          :key="stat.key"
          class="animate-fade-up flex items-center justify-center gap-4"
          :style="{ animationDelay: `${i * 0.08}s` }"
        >
          <div class="w-11 h-11 rounded-xl bg-white border border-stone-200 flex items-center justify-center shrink-0">
            <UIcon :name="stat.icon" class="w-5 h-5 text-orange-600" />
          </div>
          <div>
            <p class="font-display text-2xl sm:text-[28px] font-bold text-stone-900 tracking-tight leading-none">
              {{ stat.value }}
            </p>
            <p class="text-sm text-stone-500 mt-1">{{ stat.label }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()

const stats = computed(() => [
  { key: 'providers', value: '500+', label: t('stats.providers'), icon: 'i-heroicons-user-group' },
  { key: 'jobs', value: '2 000+', label: t('stats.completedJobs'), icon: 'i-heroicons-check-badge' },
  { key: 'rating', value: '4.8', label: t('stats.avgRating'), icon: 'i-heroicons-star' },
  { key: 'categories', value: '18', label: t('stats.categoriesCount'), icon: 'i-heroicons-squares-2x2' }
])
</script>
