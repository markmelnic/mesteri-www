<template>
  <div>
    <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
      <div
        v-for="(item, index) in items"
        :key="item.id"
        class="relative group cursor-pointer rounded-xl overflow-hidden aspect-[3/2]"
        @click="openIndex = index"
      >
        <img
          :src="item.image"
          :alt="item.caption"
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div class="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-200 flex items-end">
          <p class="text-white text-sm font-medium p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {{ item.caption }}
          </p>
        </div>
      </div>
    </div>

    <UModal v-model:open="modalOpen">
      <template #content>
        <div class="p-2">
          <img
            v-if="currentItem"
            :src="currentItem.image"
            :alt="currentItem.caption"
            class="w-full rounded-lg"
          />
          <p v-if="currentItem" class="text-sm text-gray-600 mt-3 px-2 pb-2">{{ currentItem.caption }}</p>
        </div>
      </template>
    </UModal>
  </div>
</template>

<script setup lang="ts">
import type { PortfolioItem } from '~/data/providers'

const props = defineProps<{ items: PortfolioItem[] }>()

const openIndex = ref(-1)
const modalOpen = computed({
  get: () => openIndex.value >= 0,
  set: (v) => { if (!v) openIndex.value = -1 }
})
const currentItem = computed(() => openIndex.value >= 0 ? props.items[openIndex.value] : null)
</script>
