<template>
  <section class="py-16 lg:py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-12" style="font-family: 'Plus Jakarta Sans', sans-serif;">
        Cum funcționează?
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
        <div v-for="(step, i) in steps" :key="i" class="text-center">
          <div class="relative inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 text-blue-600 mb-5">
            <UIcon :name="step.icon" class="w-7 h-7" />
            <span class="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">
              {{ i + 1 }}
            </span>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ step.title }}</h3>
          <p class="text-sm text-gray-500 leading-relaxed max-w-xs mx-auto">{{ step.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const steps = [
  {
    icon: 'i-heroicons-clipboard-document-list',
    title: 'Descrie lucrarea',
    description: 'Spune-ne ce lucrare ai nevoie și vom găsi meșterii potriviți pentru tine.'
  },
  {
    icon: 'i-heroicons-inbox',
    title: 'Primește oferte',
    description: 'Meșterii verificați îți vor trimite oferte personalizate cu prețuri și termene.'
  },
  {
    icon: 'i-heroicons-star',
    title: 'Alege meșterul',
    description: 'Compară ofertele, citește recenziile și alege meșterul care ți se potrivește cel mai bine.'
  }
]
</script>
