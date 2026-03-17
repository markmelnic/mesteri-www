<template>
  <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <UBreadcrumb :items="[{ label: $t('breadcrumb.home'), to: '/' }, { label: $t('breadcrumb.privacy') }]" class="mb-6" />

    <h1 class="text-3xl font-bold text-gray-900 mb-8">
      {{ $t('privacy.title') }}
    </h1>

    <div class="prose prose-gray max-w-none">
      <p class="text-gray-500 text-sm mb-8">{{ $t('privacy.lastUpdated') }}</p>

      <h2>{{ $t('privacy.s1title') }}</h2>
      <p>{{ $t('privacy.s1text') }}</p>

      <h2>{{ $t('privacy.s2title') }}</h2>
      <p>{{ $t('privacy.s2text') }}</p>

      <h2>{{ $t('privacy.s3title') }}</h2>
      <p>{{ $t('privacy.s3text') }}</p>

      <h2>{{ $t('privacy.s4title') }}</h2>
      <p>{{ $t('privacy.s4text') }}</p>

      <h2>{{ $t('privacy.s5title') }}</h2>
      <p>{{ $t('privacy.s5text') }}</p>

      <h2>{{ $t('privacy.s6title') }}</h2>
      <p>{{ $t('privacy.s6text') }}</p>

      <h2>{{ $t('privacy.s7title') }}</h2>
      <p>{{ $t('privacy.s7text') }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
useHead({ title: t('privacy.pageTitle') })
</script>
