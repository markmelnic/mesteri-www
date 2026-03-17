<template>
  <footer class="bg-gray-900 text-gray-300 mt-auto">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Brand -->
        <div class="md:col-span-1">
          <NuxtLink to="/" class="inline-block">
            <SharedAppLogo variant="white" />
          </NuxtLink>
          <p class="mt-3 text-sm text-gray-400 leading-relaxed">
            {{ $t('footer.description') }}
          </p>
        </div>

        <!-- Categories -->
        <div>
          <h4 class="text-sm font-semibold text-white uppercase tracking-wider mb-4">{{ $t('footer.popularCategories') }}</h4>
          <ul class="space-y-2.5">
            <li v-for="cat in popularCategories" :key="cat.slug">
              <NuxtLink :to="`/servicii/${cat.slug}`" class="text-sm text-gray-400 hover:text-white transition-colors duration-200">
                {{ cat.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Info -->
        <div>
          <h4 class="text-sm font-semibold text-white uppercase tracking-wider mb-4">{{ $t('footer.info') }}</h4>
          <ul class="space-y-2.5">
            <li>
              <NuxtLink to="/despre" class="text-sm text-gray-400 hover:text-white transition-colors duration-200">{{ $t('footer.aboutUs') }}</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/cum-functioneaza" class="text-sm text-gray-400 hover:text-white transition-colors duration-200">{{ $t('footer.howItWorks') }}</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/contact" class="text-sm text-gray-400 hover:text-white transition-colors duration-200">{{ $t('footer.contact') }}</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/cerere-noua" class="text-sm text-gray-400 hover:text-white transition-colors duration-200">{{ $t('footer.requestQuote') }}</NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Legal -->
        <div>
          <h4 class="text-sm font-semibold text-white uppercase tracking-wider mb-4">{{ $t('footer.legal') }}</h4>
          <ul class="space-y-2.5">
            <li>
              <NuxtLink to="/termeni" class="text-sm text-gray-400 hover:text-white transition-colors duration-200">{{ $t('footer.terms') }}</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/confidentialitate" class="text-sm text-gray-400 hover:text-white transition-colors duration-200">{{ $t('footer.privacy') }}</NuxtLink>
            </li>
          </ul>
          <div class="mt-6 flex items-center gap-4">
            <a href="#" class="text-gray-400 hover:text-white transition-colors duration-200">
              <UIcon name="i-lucide-facebook" class="w-5 h-5" />
            </a>
            <a href="#" class="text-gray-400 hover:text-white transition-colors duration-200">
              <UIcon name="i-lucide-instagram" class="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      <div class="mt-10 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
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
