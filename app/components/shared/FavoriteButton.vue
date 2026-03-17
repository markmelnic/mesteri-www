<template>
  <UButton
    :icon="isFav ? 'i-heroicons-heart-solid' : 'i-heroicons-heart'"
    :color="isFav ? 'red' : 'neutral'"
    :variant="isFav ? 'soft' : 'ghost'"
    size="sm"
    @click.prevent.stop="toggle"
  />
</template>

<script setup lang="ts">
const { t } = useI18n()
const props = defineProps<{ providerId: string }>()

const { toggleFavorite, isFavorite } = useFavorites()
const toast = useToast()

const isFav = computed(() => isFavorite(props.providerId))

function toggle() {
  toggleFavorite(props.providerId)
  toast.add({
    title: isFav.value ? t('favorites.added') : t('favorites.removed'),
    icon: isFav.value ? 'i-heroicons-heart-solid' : 'i-heroicons-heart',
    color: isFav.value ? 'error' : 'neutral'
  })
}
</script>
