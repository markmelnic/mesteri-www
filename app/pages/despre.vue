<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <UBreadcrumb :items="[{ label: 'Acasă', to: '/' }, { label: 'Despre noi' }]" class="mb-6" />

    <!-- Hero -->
    <div class="text-center py-12">
      <h1 class="text-4xl font-bold text-gray-900 mb-4" style="font-family: 'Plus Jakarta Sans', sans-serif;">
        Despre mesteri.md
      </h1>
      <p class="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
        Misiunea noastră este să conectăm proprietarii de case din Moldova cu cei mai buni meșteri și profesioniști în servicii pentru locuințe.
      </p>
    </div>

    <!-- Value Props -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
      <div v-for="item in values" :key="item.title" class="bg-white rounded-xl border border-gray-100 p-6 shadow-sm text-center">
        <div class="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-4">
          <UIcon :name="item.icon" class="w-6 h-6 text-blue-600" />
        </div>
        <h3 class="font-semibold text-gray-900 mb-2">{{ item.title }}</h3>
        <p class="text-sm text-gray-500 leading-relaxed">{{ item.description }}</p>
      </div>
    </div>

    <!-- Team -->
    <div class="text-center mb-16">
      <h2 class="text-2xl font-bold text-gray-900 mb-8" style="font-family: 'Plus Jakarta Sans', sans-serif;">
        Echipa noastră
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
        <div v-for="member in team" :key="member.name" class="text-center">
          <UAvatar :src="member.avatar" :alt="member.name" size="3xl" class="mx-auto mb-3" />
          <h4 class="font-semibold text-gray-900">{{ member.name }}</h4>
          <p class="text-sm text-gray-500">{{ member.role }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({ title: 'Despre noi — mesteri.md' })

const values = [
  { icon: 'i-heroicons-shield-check', title: 'Meșteri verificați', description: 'Fiecare meșter trece printr-un proces de verificare riguros.' },
  { icon: 'i-heroicons-currency-dollar', title: 'Prețuri transparente', description: 'Prețuri clare și corecte, fără costuri ascunse.' },
  { icon: 'i-heroicons-star', title: 'Recenzii reale', description: 'Recenzii autentice de la clienți verificați.' },
  { icon: 'i-heroicons-bolt', title: 'Răspuns rapid', description: 'Primești oferte de la meșteri în mai puțin de 24 de ore.' }
]

const team = [
  { name: 'Andrei Lungu', role: 'Fondator & CEO', avatar: 'https://i.pravatar.cc/150?img=55' },
  { name: 'Elena Moraru', role: 'Director Operațiuni', avatar: 'https://i.pravatar.cc/150?img=56' },
  { name: 'Victor Cebotari', role: 'Director Tehnologie', avatar: 'https://i.pravatar.cc/150?img=57' }
]
</script>
