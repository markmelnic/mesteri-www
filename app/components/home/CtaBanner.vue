<template>
  <section class="relative py-20 lg:py-28 overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="relative rounded-3xl overflow-hidden" style="background: var(--gradient-cta)">
        <!-- Decorative elements -->
        <div class="absolute inset-0 pointer-events-none overflow-hidden">
          <div class="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/10 blur-3xl" />
          <div class="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-white/5 blur-2xl" />
          <div class="absolute inset-0 opacity-[0.03]" style="background-image: radial-gradient(circle, white 1px, transparent 1px); background-size: 24px 24px;" />
        </div>

        <div class="relative z-10 px-8 py-16 lg:px-16 lg:py-20 text-center">
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            {{ $t('cta.title') }}
          </h2>
          <p class="text-lg text-indigo-100/80 max-w-xl mx-auto mb-10 leading-relaxed">
            {{ $t('cta.subtitle') }}
          </p>
          <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
            <UButton
              to="/inregistrare"
              size="xl"
              color="white"
              class="font-semibold px-8 shadow-lg hover:shadow-xl transition-shadow"
              trailing-icon="i-heroicons-arrow-right"
            >
              {{ $t('cta.button') }}
            </UButton>
            <UButton
              to="/cum-functioneaza"
              size="xl"
              variant="outline"
              class="font-semibold px-8 text-white border-white/30 hover:bg-white/10"
            >
              {{ $t('cta.learnMore') || 'Afla mai multe' }}
            </UButton>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
