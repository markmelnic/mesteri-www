<template>
  <div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <button
        v-for="item in items"
        :key="item.id"
        type="button"
        class="group relative aspect-[3/2] rounded-2xl overflow-hidden cursor-pointer border border-stone-200 hover:border-stone-300 transition-all duration-150 text-left"
        @click="selectedItem = item"
      >
        <img
          :src="item.image"
          :alt="item.caption"
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-stone-900/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div class="absolute bottom-0 left-0 right-0 p-4">
            <p class="text-sm font-medium text-white">{{ item.caption }}</p>
          </div>
        </div>
      </button>
    </div>

    <!-- Lightbox Modal -->
    <UModal v-model:open="modalOpen">
      <template #content>
        <div v-if="selectedItem" class="p-2 bg-white rounded-xl">
          <img
            :src="selectedItem.image"
            :alt="selectedItem.caption"
            class="w-full rounded-lg"
          />
          <div class="p-4">
            <p class="font-semibold text-stone-900">{{ selectedItem.caption }}</p>
          </div>
        </div>
      </template>
    </UModal>
  </div>
</template>

<script setup lang="ts">
import type { PortfolioItem } from '~/data/providers'

defineProps<{
  items: PortfolioItem[]
}>()

const selectedItem = ref<PortfolioItem | null>(null)

const modalOpen = computed({
  get: () => !!selectedItem.value,
  set: (val: boolean) => { if (!val) selectedItem.value = null }
})
</script>
