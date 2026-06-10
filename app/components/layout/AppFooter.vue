<template>
  <footer class="mt-auto bg-stone-900 text-stone-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
        <!-- Brand -->
        <div class="md:col-span-1">
          <NuxtLink :to="localePath('/')" class="inline-block">
            <SharedAppLogo variant="white" />
          </NuxtLink>
          <p class="mt-4 text-sm text-stone-400 leading-relaxed max-w-xs">
            {{ $t('footer.description') }}
          </p>
          <div class="mt-6 flex items-center gap-3">
            <a href="#" aria-label="Facebook" class="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-stone-400 hover:text-white hover:border-white/25 transition-all duration-150">
              <UIcon name="i-lucide-facebook" class="w-4 h-4" />
            </a>
            <a href="#" aria-label="Instagram" class="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-stone-400 hover:text-white hover:border-white/25 transition-all duration-150">
              <UIcon name="i-lucide-instagram" class="w-4 h-4" />
            </a>
          </div>
        </div>

        <!-- Categories -->
        <div>
          <h4 class="text-xs font-semibold text-white uppercase tracking-widest mb-5">{{ $t('footer.popularCategories') }}</h4>
          <ul class="space-y-3">
            <li v-for="cat in popularCategories" :key="cat.slug">
              <NuxtLink :to="localePath(`/servicii/${cat.slug}`)" class="text-sm text-stone-400 hover:text-white transition-colors duration-150">
                {{ cat.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Info -->
        <div>
          <h4 class="text-xs font-semibold text-white uppercase tracking-widest mb-5">{{ $t('footer.info') }}</h4>
          <ul class="space-y-3">
            <li><NuxtLink :to="localePath('/despre')" class="text-sm text-stone-400 hover:text-white transition-colors duration-150">{{ $t('footer.aboutUs') }}</NuxtLink></li>
            <li><NuxtLink :to="localePath('/cum-functioneaza')" class="text-sm text-stone-400 hover:text-white transition-colors duration-150">{{ $t('footer.howItWorks') }}</NuxtLink></li>
            <li><NuxtLink :to="localePath('/contact')" class="text-sm text-stone-400 hover:text-white transition-colors duration-150">{{ $t('footer.contact') }}</NuxtLink></li>
            <li><NuxtLink :to="localePath('/cerere-noua')" class="text-sm text-stone-400 hover:text-white transition-colors duration-150">{{ $t('footer.requestQuote') }}</NuxtLink></li>
          </ul>
        </div>

        <!-- Legal -->
        <div>
          <h4 class="text-xs font-semibold text-white uppercase tracking-widest mb-5">{{ $t('footer.legal') }}</h4>
          <ul class="space-y-3">
            <li><NuxtLink :to="localePath('/termeni')" class="text-sm text-stone-400 hover:text-white transition-colors duration-150">{{ $t('footer.terms') }}</NuxtLink></li>
            <li><NuxtLink :to="localePath('/confidentialitate')" class="text-sm text-stone-400 hover:text-white transition-colors duration-150">{{ $t('footer.privacy') }}</NuxtLink></li>
          </ul>
        </div>
      </div>

      <div class="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500">
        <span>{{ $t('footer.copyright') }}</span>
        <span class="inline-flex items-center gap-1.5">
          <UIcon name="i-heroicons-map-pin-solid" class="w-3.5 h-3.5 text-orange-500" />
          {{ $t('footer.madeIn') }}
        </span>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

const popularCategories = computed(() => [
  { name: t('footer.catPlumbing'), slug: 'instalatii-sanitare' },
  { name: t('footer.catElectrical'), slug: 'electricitate' },
  { name: t('footer.catRenovation'), slug: 'renovari-constructii' },
  { name: t('footer.catCleaning'), slug: 'curatenie' },
  { name: t('footer.catPainting'), slug: 'zugravit-vopsit' }
])
</script>
