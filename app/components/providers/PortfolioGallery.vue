<template>
  <div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="item in items"
        :key="item.id"
        class="group relative aspect-[3/2] rounded-xl overflow-hidden cursor-pointer border border-white/[0.06] hover:border-white/[0.12] transition-all duration-150"
        @click="selectedItem = item"
      >
        <img
          :src="item.image"
          :alt="item.caption"
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div class="absolute bottom-0 left-0 right-0 p-4">
            <p class="text-sm font-medium text-white">{{ item.caption }}</p>
            <span class="text-xs text-white/60">{{ item.category }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Lightbox Modal -->
    <UModal v-model:open="modalOpen">
      <template #content>
        <div v-if="selectedItem" class="p-2">
          <img
            :src="selectedItem.image"
            :alt="selectedItem.caption"
            class="w-full rounded-xl"
          />
          <div class="p-4">
            <p class="font-semibold text-white">{{ selectedItem.caption }}</p>
            <p class="text-sm text-[#A1A1AA] mt-1">{{ selectedItem.category }}</p>
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
