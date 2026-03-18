<template>
  <div>
    <!-- Desktop Sidebar -->
    <aside class="hidden lg:flex flex-col w-64 border-r border-gray-200/50 bg-white/50 backdrop-blur-sm min-h-[calc(100vh-64px)]">
      <div class="p-6">
        <div class="flex items-center gap-3 mb-8 p-3 rounded-xl bg-gray-50 border border-gray-100">
          <UAvatar :src="user?.avatar" :alt="user?.name" size="lg" class="ring-2 ring-indigo-100" />
          <div class="min-w-0">
            <p class="font-semibold text-gray-900 truncate">{{ user?.name }}</p>
            <p class="text-xs text-gray-500 font-medium">{{ isProvider ? $t('dashboard.provider') : $t('dashboard.client') }}</p>
          </div>
        </div>
        <nav class="space-y-1">
          <NuxtLink
            v-for="item in menuItems"
            :key="item.to"
            :to="item.to"
            class="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all duration-200"
            active-class="!text-indigo-600 !bg-indigo-50 !font-semibold"
          >
            <UIcon :name="item.icon" class="w-5 h-5" />
            {{ item.label }}
          </NuxtLink>
        </nav>
      </div>
      <div class="mt-auto p-6 border-t border-gray-100">
        <UButton variant="ghost" color="neutral" block class="justify-start" icon="i-heroicons-arrow-right-on-rectangle" @click="handleLogout">
          {{ $t('nav.logout') }}
        </UButton>
      </div>
    </aside>

    <!-- Mobile Bottom Tabs -->
    <nav class="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-t border-gray-200/50 px-2 pb-safe">
      <div class="flex items-center justify-around">
        <NuxtLink
          v-for="item in menuItems.slice(0, 5)"
          :key="item.to"
          :to="item.to"
          class="flex flex-col items-center gap-1 py-2 px-3 text-gray-400"
          active-class="!text-indigo-600"
        >
          <UIcon :name="item.icon" class="w-5 h-5" />
          <span class="text-[10px] font-medium">{{ item.shortLabel || item.label }}</span>
        </NuxtLink>
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const { user, isProvider, logout } = useAuth()
const router = useRouter()

const clientMenu = computed(() => [
  { label: t('dashboard.profile'), shortLabel: t('dashboard.profile'), to: '/cont/profil', icon: 'i-heroicons-user-circle' },
  { label: t('dashboard.myRequests'), shortLabel: t('dashboard.requests'), to: '/cont/cereri', icon: 'i-heroicons-clipboard-document-list' },
  { label: t('dashboard.favorites'), shortLabel: t('dashboard.favorites'), to: '/cont/favorite', icon: 'i-heroicons-heart' },
  { label: t('dashboard.myReviews'), shortLabel: t('dashboard.myReviews'), to: '/cont/recenzii', icon: 'i-heroicons-star' }
])

const providerMenu = computed(() => [
  { label: t('dashboard.profile'), shortLabel: t('dashboard.profile'), to: '/cont-mester/profil', icon: 'i-heroicons-user-circle' },
  { label: t('dashboard.services'), shortLabel: t('dashboard.services'), to: '/cont-mester/servicii', icon: 'i-heroicons-wrench-screwdriver' },
  { label: t('dashboard.requests'), shortLabel: t('dashboard.requests'), to: '/cont-mester/cereri', icon: 'i-heroicons-inbox' },
  { label: t('dashboard.portfolio'), shortLabel: t('dashboard.portfolio'), to: '/cont-mester/portofoliu', icon: 'i-heroicons-photo' },
  { label: t('dashboard.myReviews'), shortLabel: t('dashboard.myReviews'), to: '/cont-mester/recenzii', icon: 'i-heroicons-star' }
])

const menuItems = computed(() => isProvider.value ? providerMenu.value : clientMenu.value)

function handleLogout() {
  logout()
  router.push('/')
}
</script>
