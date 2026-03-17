<template>
  <div>
    <h1 class="text-2xl font-bold text-gray-900 mb-6" style="font-family: 'Plus Jakarta Sans', sans-serif;">Meșteri favoriți</h1>

    <div v-if="favoriteProviders.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <ProvidersProviderCard
        v-for="provider in favoriteProviders"
        :key="provider.id"
        :provider="provider"
      />
    </div>

    <SharedEmptyState
      v-else
      icon="i-heroicons-heart"
      title="Nu ai meșteri favoriți încă"
      description="Explorează categoriile și adaugă meșteri la favorite pentru a-i găsi mai ușor."
      action-label="Explorează categoriile"
      action-to="/servicii"
    />
  </div>
</template>

<script setup lang="ts">
import { providers } from '~/data/providers'

definePageMeta({ layout: 'dashboard', middleware: ['role'] })
useHead({ title: 'Favorite — mesteri.md' })

const { favorites } = useFavorites()

const favoriteProviders = computed(() =>
  providers.filter(p => favorites.value.includes(p.id))
)
</script>
