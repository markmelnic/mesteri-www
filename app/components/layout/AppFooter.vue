<template>
  <footer class="relative overflow-hidden section-dark mt-auto">
    <!-- Subtle glow -->
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[200px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-10 pb-10 border-b border-white/10">
        <!-- Brand -->
        <div class="md:col-span-1">
          <NuxtLink to="/" class="inline-block">
            <SharedAppLogo variant="white" />
          </NuxtLink>
          <p class="mt-4 text-sm text-indigo-200/40 leading-relaxed max-w-xs">
            {{ $t('footer.description') }}
          </p>
          <div class="mt-6 flex items-center gap-3">
            <a href="#" class="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-indigo-200/50 hover:text-white hover:bg-white/10 transition-all duration-200">
              <UIcon name="i-lucide-facebook" class="w-4 h-4" />
            </a>
            <a href="#" class="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-indigo-200/50 hover:text-white hover:bg-white/10 transition-all duration-200">
              <UIcon name="i-lucide-instagram" class="w-4 h-4" />
            </a>
          </div>
        </div>

        <!-- Categories -->
        <div>
          <h4 class="text-xs font-semibold text-white uppercase tracking-widest mb-5">{{ $t('footer.popularCategories') }}</h4>
          <ul class="space-y-3">
            <li v-for="cat in popularCategories" :key="cat.slug">
              <NuxtLink :to="`/servicii/${cat.slug}`" class="text-sm text-indigo-200/40 hover:text-white transition-colors duration-200">
                {{ cat.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Info -->
        <div>
          <h4 class="text-xs font-semibold text-white uppercase tracking-widest mb-5">{{ $t('footer.info') }}</h4>
          <ul class="space-y-3">
            <li><NuxtLink to="/despre" class="text-sm text-indigo-200/40 hover:text-white transition-colors duration-200">{{ $t('footer.aboutUs') }}</NuxtLink></li>
            <li><NuxtLink to="/cum-functioneaza" class="text-sm text-indigo-200/40 hover:text-white transition-colors duration-200">{{ $t('footer.howItWorks') }}</NuxtLink></li>
            <li><NuxtLink to="/contact" class="text-sm text-indigo-200/40 hover:text-white transition-colors duration-200">{{ $t('footer.contact') }}</NuxtLink></li>
            <li><NuxtLink to="/cerere-noua" class="text-sm text-indigo-200/40 hover:text-white transition-colors duration-200">{{ $t('footer.requestQuote') }}</NuxtLink></li>
          </ul>
        </div>

        <!-- Legal -->
        <div>
          <h4 class="text-xs font-semibold text-white uppercase tracking-widest mb-5">{{ $t('footer.legal') }}</h4>
          <ul class="space-y-3">
            <li><NuxtLink to="/termeni" class="text-sm text-indigo-200/40 hover:text-white transition-colors duration-200">{{ $t('footer.terms') }}</NuxtLink></li>
            <li><NuxtLink to="/confidentialitate" class="text-sm text-indigo-200/40 hover:text-white transition-colors duration-200">{{ $t('footer.privacy') }}</NuxtLink></li>
          </ul>
        </div>
      </div>

      <div class="pt-8 text-center text-xs text-indigo-200/30">
        {{ $t('footer.copyright') }}
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const { t } = useI18n()

const popularCategories = computed(() => [
  { name: t('footer.catPlumbing'), slug: 'instalatii-sanitare' },
  { name: t('footer.catElectrical'), slug: 'electricitate' },
  { name: t('footer.catRenovation'), slug: 'renovari-constructii' },
  { name: t('footer.catCleaning'), slug: 'curatenie' },
  { name: t('footer.catPainting'), slug: 'zugravit-vopsit' }
])
</script>
