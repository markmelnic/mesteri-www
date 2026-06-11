<template>
  <button
    type="button"
    class="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-150 border"
    :class="isFav
      ? 'bg-red-50 border-red-200 text-red-500'
      : 'bg-white/90 backdrop-blur border-stone-200 text-stone-400 hover:text-red-500 hover:border-red-200'"
    :aria-label="isFav ? $t('favorites.removed') : $t('favorites.added')"
    @click.prevent.stop="toggle"
  >
    <UIcon :name="isFav ? 'i-heroicons-heart-solid' : 'i-heroicons-heart'" class="w-4.5 h-4.5" />
  </button>
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
