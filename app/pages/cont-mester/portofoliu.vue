<template>
  <div>
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-2xl font-extrabold text-gray-900 tracking-tight">{{ $t('providerDashboard.portfolioTitle') }}</h1>
      <UButton color="primary" icon="i-heroicons-plus" class="font-semibold bg-indigo-600 hover:bg-indigo-700" @click="modalOpen = true">{{ $t('providerDashboard.addProject') }}</UButton>
    </div>

    <div v-if="portfolioItems.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="item in portfolioItems" :key="item.id" class="group rounded-2xl bg-white border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
        <div class="aspect-[3/2] overflow-hidden">
          <img :src="item.image" :alt="item.caption" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        </div>
        <div class="p-4">
          <p class="font-semibold text-gray-900 text-sm">{{ item.caption }}</p>
          <div class="flex items-center justify-between mt-3">
            <UBadge variant="subtle" color="neutral">{{ item.category }}</UBadge>
            <UButton variant="ghost" size="xs" icon="i-heroicons-trash" color="error" />
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
        <div class="p-6">
          <h3 class="text-lg font-bold text-gray-900 mb-6">{{ $t('providerDashboard.addProjectModal') }}</h3>
          <form class="space-y-4" @submit.prevent="addProject">
            <div class="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-indigo-300 transition-colors">
              <UIcon name="i-heroicons-photo" class="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p class="text-sm text-gray-500">{{ $t('providerDashboard.uploadPhoto') }}</p>
              <p class="text-xs text-gray-400 mt-1">{{ $t('providerDashboard.demoFeature') }}</p>
            </div>
            <UFormField :label="$t('providerDashboard.projectCaption')">
              <UInput v-model="newProject.caption" :placeholder="$t('providerDashboard.captionPlaceholder')" />
            </UFormField>
            <UFormField :label="$t('providerDashboard.projectCategory')">
              <UInput v-model="newProject.category" :placeholder="$t('providerDashboard.categoryPlaceholder')" />
            </UFormField>
            <div class="flex justify-end gap-3 pt-2">
              <UButton variant="ghost" color="neutral" @click="modalOpen = false">{{ $t('providerDashboard.cancel') }}</UButton>
              <UButton type="submit" color="primary" class="bg-indigo-600 hover:bg-indigo-700">{{ $t('providerDashboard.add') }}</UButton>
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
</script>
