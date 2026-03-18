<template>
  <div>
    <HomeHeroSection />
    <HomeStatsBar />
    <HomeCategoriesGrid />
    <HomeHowItWorks />
    <HomeFeaturedProviders />
    <HomeRecentReviews />
    <HomeCtaBanner />
    <SharedBackToTop />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
useHead({ title: t('site.title') })
</script>
