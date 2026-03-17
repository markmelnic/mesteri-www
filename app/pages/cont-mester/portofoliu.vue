<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold text-gray-900" style="font-family: 'Plus Jakarta Sans', sans-serif;">Portofoliu</h1>
      <UButton color="primary" icon="i-heroicons-plus" @click="modalOpen = true">Adaugă proiect</UButton>
    </div>

    <div v-if="portfolioItems.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="item in portfolioItems" :key="item.id" class="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm group">
        <div class="aspect-[3/2] overflow-hidden">
          <img :src="item.image" :alt="item.caption" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        </div>
        <div class="p-4">
          <p class="font-medium text-gray-900 text-sm">{{ item.caption }}</p>
          <div class="flex items-center justify-between mt-2">
            <UBadge variant="subtle" color="neutral">{{ item.category }}</UBadge>
            <UButton variant="ghost" size="xs" icon="i-heroicons-trash" color="error" />
          </div>
        </div>
      </div>
    </div>

    <SharedEmptyState
      v-else
      icon="i-heroicons-photo"
      title="Portofoliul tău este gol"
      description="Adaugă proiecte finalizate pentru a atrage mai mulți clienți."
    />

    <UModal v-model:open="modalOpen">
      <template #content>
        <div class="p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Adaugă proiect</h3>
          <form class="space-y-4" @submit.prevent="addProject">
            <div class="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
              <UIcon name="i-heroicons-photo" class="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p class="text-sm text-gray-500">Încarcă o fotografie</p>
              <p class="text-xs text-gray-400 mt-1">Funcționalitate demo</p>
            </div>
            <UFormField label="Descriere">
              <UInput v-model="newProject.caption" placeholder="Descrie proiectul..." />
            </UFormField>
            <UFormField label="Categorie">
              <UInput v-model="newProject.category" placeholder="Ex: Renovări" />
            </UFormField>
            <div class="flex justify-end gap-3">
              <UButton variant="ghost" color="neutral" @click="modalOpen = false">Anulează</UButton>
              <UButton type="submit" color="primary">Adaugă</UButton>
            </div>
          </form>
        </div>
      </template>
    </UModal>
  </div>
</template>

<script setup lang="ts">
import { providers } from '~/data/providers'
import type { PortfolioItem } from '~/data/providers'

definePageMeta({ layout: 'dashboard', middleware: ['role'] })
useHead({ title: 'Portofoliu — mesteri.md' })

const { user } = useAuth()
const toast = useToast()

const provider = providers.find(p => p.id === user.value?.providerId)
const portfolioItems = ref<PortfolioItem[]>([...(provider?.portfolio || [])])

const modalOpen = ref(false)
const newProject = reactive({ caption: '', category: '' })

function addProject() {
  portfolioItems.value.push({
    id: `new-${Date.now()}`,
    image: `https://picsum.photos/seed/${Date.now()}/600/400`,
    caption: newProject.caption,
    category: newProject.category
  })
  modalOpen.value = false
  Object.assign(newProject, { caption: '', category: '' })
  toast.add({ title: 'Proiect adăugat!', icon: 'i-heroicons-check-circle', color: 'success' })
}
</script>
