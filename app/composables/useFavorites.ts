const favorites = ref<string[]>([])
const initialized = ref(false)

export function useFavorites() {
  function init() {
    if (initialized.value) return
    if (import.meta.client) {
      const stored = localStorage.getItem('mesteri_favorites')
      if (stored) {
        try {
          favorites.value = JSON.parse(stored)
        } catch {
          localStorage.removeItem('mesteri_favorites')
        }
      }
    }
    initialized.value = true
  }

  function save() {
    if (import.meta.client) {
      localStorage.setItem('mesteri_favorites', JSON.stringify(favorites.value))
    }
  }

  function toggleFavorite(providerId: string) {
    const index = favorites.value.indexOf(providerId)
    if (index === -1) {
      favorites.value.push(providerId)
    } else {
      favorites.value.splice(index, 1)
    }
    save()
  }

  function isFavorite(providerId: string): boolean {
    return favorites.value.includes(providerId)
  }

  init()

  return { favorites, toggleFavorite, isFavorite }
}
