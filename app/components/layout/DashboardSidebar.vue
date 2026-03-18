<template>
  <div>
    <!-- Desktop Sidebar -->
    <aside class="hidden lg:flex flex-col w-64 border-r border-white/[0.06] bg-[#111113] min-h-[calc(100vh-64px)]">
      <div class="p-6">
        <div class="flex items-center gap-3 mb-8 p-3 rounded-xl bg-white/[0.04] border border-white/[0.06]">
          <UAvatar :src="user?.avatar" :alt="user?.name" size="lg" />
          <div class="min-w-0">
            <p class="font-semibold text-white truncate">{{ user?.name }}</p>
            <p class="text-xs text-[#63636E] font-medium">{{ isProvider ? $t('dashboard.provider') : $t('dashboard.client') }}</p>
          </div>
        </div>
        <nav class="space-y-1">
          <NuxtLink
            v-for="item in menuItems"
            :key="item.to"
            :to="item.to"
            class="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-[#A1A1AA] hover:text-white hover:bg-white/[0.06] rounded-xl transition-all duration-150"
            active-class="!text-[#2AB673] !bg-[#0D9373]/10"
          >
            <UIcon :name="item.icon" class="w-5 h-5" />
            {{ item.label }}
          </NuxtLink>
        </nav>
      </div>
      <div class="mt-auto p-6 border-t border-white/[0.06]">
        <UButton variant="ghost" color="neutral" block class="justify-start text-[#A1A1AA] hover:text-white" icon="i-heroicons-arrow-right-on-rectangle" @click="handleLogout">
          {{ $t('nav.logout') }}
        </UButton>
      </div>
    </aside>

    <!-- Mobile Bottom Tabs -->
    <nav class="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0A0A0A]/90 backdrop-blur-xl border-t border-white/[0.06] px-2 pb-safe">
      <div class="flex items-center justify-around">
        <NuxtLink
          v-for="item in menuItems.slice(0, 5)"
          :key="item.to"
          :to="item.to"
          class="flex flex-col items-center gap-1 py-2 px-3 text-[#63636E]"
          active-class="!text-[#2AB673]"
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
