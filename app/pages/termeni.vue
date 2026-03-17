<template>
  <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <UBreadcrumb :items="[{ label: $t('breadcrumb.home'), to: '/' }, { label: $t('breadcrumb.terms') }]" class="mb-6" />

    <h1 class="text-3xl font-bold text-gray-900 mb-8">
      {{ $t('terms.title') }}
    </h1>

    <div class="prose prose-gray max-w-none">
      <p class="text-gray-500 text-sm mb-8">{{ $t('terms.lastUpdated') }}</p>

      <h2>{{ $t('terms.s1title') }}</h2>
      <p>{{ $t('terms.s1text') }}</p>

      <h2>{{ $t('terms.s2title') }}</h2>
      <p>{{ $t('terms.s2text') }}</p>

      <h2>{{ $t('terms.s3title') }}</h2>
      <p>{{ $t('terms.s3text') }}</p>

      <h2>{{ $t('terms.s4title') }}</h2>
      <p>{{ $t('terms.s4text') }}</p>

      <h2>{{ $t('terms.s5title') }}</h2>
      <p>{{ $t('terms.s5text') }}</p>

      <h2>{{ $t('terms.s6title') }}</h2>
      <p>{{ $t('terms.s6text') }}</p>

      <h2>{{ $t('terms.s7title') }}</h2>
      <p>{{ $t('terms.s7text') }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
useHead({ title: t('terms.pageTitle') })
</script>
