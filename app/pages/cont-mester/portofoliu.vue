<template>
  <div class="max-w-5xl">
    <div class="flex items-center justify-between mb-8">
      <h1 class="font-display text-2xl font-bold text-stone-900 tracking-tight">{{ $t('providerDashboard.portfolioTitle') }}</h1>
      <button
        type="button"
        class="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-orange-600 hover:bg-orange-700 rounded-xl transition-colors"
        @click="modalOpen = true"
      >
        <UIcon name="i-heroicons-plus" class="w-4 h-4" />
        {{ $t('providerDashboard.addProject') }}
      </button>
    </div>

    <div v-if="portfolioItems.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      <div v-for="(item, i) in portfolioItems" :key="item.id" class="group rounded-2xl bg-white border border-stone-200 overflow-hidden hover:border-stone-300 transition-colors">
        <div class="aspect-[3/2] overflow-hidden">
          <img :src="item.image" :alt="item.caption" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
        </div>
        <div class="p-4">
          <p class="font-semibold text-stone-900 text-sm">{{ item.caption }}</p>
          <div class="flex items-center justify-between mt-3">
            <UBadge variant="subtle" color="neutral">{{ item.category }}</UBadge>
            <button
              type="button"
              class="w-8 h-8 rounded-lg flex items-center justify-center text-stone-400 hover:text-red-500 hover:bg-red-50 transition-colors"
              aria-label="Delete"
              @click="removeItem(i)"
            >
              <UIcon name="i-heroicons-trash" class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <SharedEmptyState
      v-else
      icon="i-heroicons-photo"
      :title="$t('providerDashboard.emptyPortfolio')"
      :description="$t('providerDashboard.emptyPortfolioDesc')"
    />

    <UModal v-model:open="modalOpen">
      <template #content>
        <div class="p-6 bg-white rounded-xl">
          <h3 class="font-display text-lg font-semibold text-stone-900 mb-6">{{ $t('providerDashboard.addProjectModal') }}</h3>
          <form class="space-y-4" @submit.prevent="addProject">
            <div class="border-2 border-dashed border-stone-200 rounded-2xl p-8 text-center hover:border-orange-300 transition-colors">
              <UIcon name="i-heroicons-photo" class="w-8 h-8 text-stone-300 mx-auto mb-2" />
              <p class="text-sm text-stone-500">{{ $t('providerDashboard.uploadPhoto') }}</p>
              <p class="text-xs text-stone-400 mt-1">{{ $t('providerDashboard.demoFeature') }}</p>
            </div>
            <UFormField :label="$t('providerDashboard.projectCaption')">
              <UInput v-model="newProject.caption" :placeholder="$t('providerDashboard.captionPlaceholder')" class="w-full" />
            </UFormField>
            <UFormField :label="$t('providerDashboard.projectCategory')">
              <UInput v-model="newProject.category" :placeholder="$t('providerDashboard.categoryPlaceholder')" class="w-full" />
            </UFormField>
            <div class="flex justify-end gap-3 pt-2">
              <button type="button" class="px-4 py-2 text-sm font-medium text-stone-600 hover:bg-stone-100 rounded-xl transition-colors" @click="modalOpen = false">
                {{ $t('providerDashboard.cancel') }}
              </button>
              <button type="submit" class="px-4 py-2 text-sm font-semibold text-white bg-orange-600 hover:bg-orange-700 rounded-xl transition-colors">
                {{ $t('providerDashboard.add') }}
              </button>
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

const { t } = useI18n()
definePageMeta({ layout: 'dashboard', middleware: ['role'] })
useHead({ title: t('providerDashboard.portfolioPageTitle') })

const { user } = useAuth()
const toast = useToast()

const provider = providers.find(p => p.id === user.value?.providerId)
const portfolioItems = ref<PortfolioItem[]>([...(provider?.portfolio || [])])

const modalOpen = ref(false)
const newProject = reactive({ caption: '', category: '' })

function addProject() {
  if (!newProject.caption) return
  portfolioItems.value.push({
    id: `new-${Date.now()}`,
    image: `https://picsum.photos/seed/${Date.now()}/600/400`,
    caption: newProject.caption,
    category: newProject.category
  })
  modalOpen.value = false
  Object.assign(newProject, { caption: '', category: '' })
  toast.add({ title: t('providerDashboard.projectAdded'), icon: 'i-heroicons-check-circle', color: 'success' })
}

function removeItem(index: number) {
  portfolioItems.value.splice(index, 1)
}
</script>
