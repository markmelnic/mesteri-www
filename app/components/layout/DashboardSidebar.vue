<template>
  <div>
    <!-- Desktop Sidebar -->
    <aside class="hidden lg:flex flex-col w-64 border-r border-gray-200 bg-white min-h-[calc(100vh-64px)]">
      <div class="p-6">
        <div class="flex items-center gap-3 mb-6">
          <UAvatar :src="user?.avatar" :alt="user?.name" size="lg" />
          <div>
            <p class="font-semibold text-gray-900">{{ user?.name }}</p>
            <p class="text-sm text-gray-500">{{ isProvider ? 'Meșter' : 'Client' }}</p>
          </div>
        </div>
        <nav class="space-y-1">
          <NuxtLink
            v-for="item in menuItems"
            :key="item.to"
            :to="item.to"
            class="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-200"
            active-class="!text-blue-600 !bg-blue-50"
          >
            <UIcon :name="item.icon" class="w-5 h-5" />
            {{ item.label }}
          </NuxtLink>
        </nav>
      </div>
      <div class="mt-auto p-6 border-t border-gray-100">
        <UButton variant="ghost" color="neutral" block class="justify-start" icon="i-heroicons-arrow-right-on-rectangle" @click="handleLogout">
          Deconectare
        </UButton>
      </div>
    </aside>

    <!-- Mobile Bottom Tabs -->
    <nav class="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 px-2 pb-safe">
      <div class="flex items-center justify-around">
        <NuxtLink
          v-for="item in menuItems.slice(0, 5)"
          :key="item.to"
          :to="item.to"
          class="flex flex-col items-center gap-1 py-2 px-3 text-gray-500"
          active-class="!text-blue-600"
        >
          <UIcon :name="item.icon" class="w-5 h-5" />
          <span class="text-[10px] font-medium">{{ item.shortLabel || item.label }}</span>
        </NuxtLink>
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
const { user, isProvider, logout } = useAuth()
const router = useRouter()

const clientMenu = [
  { label: 'Profil', shortLabel: 'Profil', to: '/cont/profil', icon: 'i-heroicons-user-circle' },
  { label: 'Cererile mele', shortLabel: 'Cereri', to: '/cont/cereri', icon: 'i-heroicons-clipboard-document-list' },
  { label: 'Favorite', shortLabel: 'Favorite', to: '/cont/favorite', icon: 'i-heroicons-heart' },
  { label: 'Recenzii', shortLabel: 'Recenzii', to: '/cont/recenzii', icon: 'i-heroicons-star' }
]

const providerMenu = [
  { label: 'Profil', shortLabel: 'Profil', to: '/cont-mester/profil', icon: 'i-heroicons-user-circle' },
  { label: 'Servicii', shortLabel: 'Servicii', to: '/cont-mester/servicii', icon: 'i-heroicons-wrench-screwdriver' },
  { label: 'Cereri', shortLabel: 'Cereri', to: '/cont-mester/cereri', icon: 'i-heroicons-inbox' },
  { label: 'Portofoliu', shortLabel: 'Portofoliu', to: '/cont-mester/portofoliu', icon: 'i-heroicons-photo' },
  { label: 'Recenzii', shortLabel: 'Recenzii', to: '/cont-mester/recenzii', icon: 'i-heroicons-star' }
]

const menuItems = computed(() => isProvider.value ? providerMenu : clientMenu)

function handleLogout() {
  logout()
  router.push('/')
}
</script>
