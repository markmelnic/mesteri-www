<template>
  <section class="py-16 lg:py-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8 lg:p-12 text-center border border-amber-100">
        <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
          {{ $t('cta.title') }}
        </h2>
        <p class="text-gray-600 max-w-xl mx-auto mb-8 leading-relaxed">
          {{ $t('cta.subtitle') }}
        </p>
        <UButton to="/inregistrare" color="primary" size="lg" trailing-icon="i-heroicons-arrow-right">
          {{ $t('cta.button') }}
        </UButton>
      </div>
    </div>
  </section>
</template>
