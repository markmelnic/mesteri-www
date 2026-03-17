<template>
  <footer class="bg-gray-900 text-gray-300 mt-auto">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Brand -->
        <div class="md:col-span-1">
          <NuxtLink to="/" class="text-2xl font-bold text-white" style="font-family: 'Plus Jakarta Sans', sans-serif;">
            mesteri.md
          </NuxtLink>
          <p class="mt-3 text-sm text-gray-400 leading-relaxed">
            Conectăm proprietarii de case cu cei mai buni meșteri și companii de servicii din Moldova.
          </p>
        </div>

        <!-- Categories -->
        <div>
          <h4 class="text-sm font-semibold text-white uppercase tracking-wider mb-4">Categorii populare</h4>
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
          <h4 class="text-sm font-semibold text-white uppercase tracking-wider mb-4">Informații</h4>
          <ul class="space-y-2.5">
            <li>
              <NuxtLink to="/despre" class="text-sm text-gray-400 hover:text-white transition-colors duration-200">Despre noi</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/cum-functioneaza" class="text-sm text-gray-400 hover:text-white transition-colors duration-200">Cum funcționează</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/contact" class="text-sm text-gray-400 hover:text-white transition-colors duration-200">Contact</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/cerere-noua" class="text-sm text-gray-400 hover:text-white transition-colors duration-200">Solicită ofertă</NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Legal -->
        <div>
          <h4 class="text-sm font-semibold text-white uppercase tracking-wider mb-4">Legal</h4>
          <ul class="space-y-2.5">
            <li>
              <NuxtLink to="/termeni" class="text-sm text-gray-400 hover:text-white transition-colors duration-200">Termeni și condiții</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/confidentialitate" class="text-sm text-gray-400 hover:text-white transition-colors duration-200">Politica de confidențialitate</NuxtLink>
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
        © 2026 mesteri.md — Toate drepturile rezervate
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const popularCategories = [
  { name: 'Instalații sanitare', slug: 'instalatii-sanitare' },
  { name: 'Electricitate', slug: 'electricitate' },
  { name: 'Renovări & Construcții', slug: 'renovari-constructii' },
  { name: 'Curățenie', slug: 'curatenie' },
  { name: 'Zugrăvit & Vopsit', slug: 'zugravit-vopsit' }
]
</script>
