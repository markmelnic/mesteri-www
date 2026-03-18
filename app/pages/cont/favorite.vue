<template>
  <div>
    <h1 class="text-2xl font-bold text-white tracking-tight mb-8">{{ $t('clientFavorites.title') }}</h1>

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
      :title="$t('clientFavorites.noFavorites')"
      :description="$t('clientFavorites.noFavoritesDesc')"
      :action-label="$t('clientFavorites.exploreCategories')"
      action-to="/servicii"
    />
  </div>
</template>

<script setup lang="ts">
import { providers } from '~/data/providers'

const { t } = useI18n()
definePageMeta({ layout: 'dashboard', middleware: ['role'] })
useHead({ title: t('clientFavorites.pageTitle') })

const { favorites } = useFavorites()

const favoriteProviders = computed(() =>
  providers.filter(p => favorites.value.includes(p.id))
)
</script>
