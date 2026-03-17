<template>
  <div>
    <HomeHeroSection />
    <HomeCategoriesGrid />
    <HomeHowItWorks />
    <HomeFeaturedProviders />
    <HomeRecentReviews />
    <HomeCtaBanner />
    <HomeStatsBar />
    <SharedBackToTop />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
useHead({ title: t('site.title') })
</script>
