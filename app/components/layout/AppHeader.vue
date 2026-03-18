<template>
  <header class="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-gray-200/50 transition-all duration-300" :class="{ '!bg-white/95 shadow-sm': scrolled }">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-2 group">
          <SharedAppLogo />
        </NuxtLink>

        <!-- Desktop Nav -->
        <nav class="hidden md:flex items-center gap-1">
          <NuxtLink
            v-for="item in navItems"
            :key="item.key"
            :to="item.to"
            class="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-900 rounded-lg transition-all duration-200 hover:bg-gray-50"
            active-class="!text-indigo-600 !bg-indigo-50"
          >
            {{ item.label }}
          </NuxtLink>
        </nav>

        <!-- Auth / User + Language -->
        <div class="hidden md:flex items-center gap-3">
          <SharedLanguageSwitcher />
          <template v-if="isAuthenticated">
            <UDropdownMenu :items="userMenuItems">
              <UButton variant="ghost" color="neutral" class="flex items-center gap-2">
                <UAvatar :src="user?.avatar" :alt="user?.name" size="xs" />
                <span class="text-sm font-medium">{{ user?.name }}</span>
                <UIcon name="i-heroicons-chevron-down-20-solid" class="w-4 h-4" />
              </UButton>
            </UDropdownMenu>
          </template>
          <template v-else>
            <UButton to="/autentificare" variant="ghost" color="neutral" size="sm" class="font-medium">
              {{ $t('nav.login') }}
            </UButton>
            <UButton to="/inregistrare" color="primary" size="sm" class="font-semibold bg-indigo-600 hover:bg-indigo-700">
              {{ $t('nav.register') }}
            </UButton>
          </template>
        </div>

        <!-- Mobile Menu Button -->
        <UButton
          class="md:hidden"
          variant="ghost"
          color="neutral"
          :icon="mobileOpen ? 'i-heroicons-x-mark-20-solid' : 'i-heroicons-bars-3-20-solid'"
          @click="mobileOpen = !mobileOpen"
        />
      </div>
    </div>

    <!-- Mobile Menu -->
    <Transition
      enter-active-class="transition-all duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div v-if="mobileOpen" class="md:hidden border-t border-gray-100 bg-white/95 backdrop-blur-xl pb-4">
        <nav class="px-4 pt-3 space-y-1">
          <NuxtLink
            v-for="item in navItems"
            :key="item.key"
            :to="item.to"
            class="block px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg"
            active-class="!text-indigo-600 !bg-indigo-50"
            @click="mobileOpen = false"
          >
            {{ item.label }}
          </NuxtLink>
        </nav>
        <div class="px-4 pt-3">
          <SharedLanguageSwitcher />
        </div>
        <div class="px-4 pt-3 flex flex-col gap-2">
          <template v-if="isAuthenticated">
            <UButton :to="dashboardLink" color="primary" block class="bg-indigo-600" @click="mobileOpen = false">
              {{ $t('nav.myAccount') }}
            </UButton>
            <UButton variant="ghost" color="neutral" block @click="handleLogout">
              {{ $t('nav.logout') }}
            </UButton>
          </template>
          <template v-else>
            <UButton to="/autentificare" color="primary" block class="bg-indigo-600" @click="mobileOpen = false">
              {{ $t('nav.login') }}
            </UButton>
            <UButton to="/inregistrare" variant="outline" color="neutral" block @click="mobileOpen = false">
              {{ $t('nav.register') }}
            </UButton>
          </template>
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
const { t } = useI18n()
const { user, isAuthenticated, isProvider, logout } = useAuth()
const router = useRouter()
const mobileOpen = ref(false)
const scrolled = ref(false)

onMounted(() => {
  window.addEventListener('scroll', () => {
    scrolled.value = window.scrollY > 10
  })
})

const navItems = computed(() => [
  { key: 'services', label: t('nav.services'), to: '/servicii' },
  { key: 'providers', label: t('nav.providers'), to: '/mesteri' },
  { key: 'howItWorks', label: t('nav.howItWorks'), to: '/cum-functioneaza' },
  { key: 'about', label: t('nav.about'), to: '/despre' }
])

const dashboardLink = computed(() =>
  isProvider.value ? '/cont-mester/profil' : '/cont/profil'
)

const userMenuItems = computed(() => [
  [{
    label: t('nav.myAccount'),
    icon: 'i-heroicons-user-circle',
    to: dashboardLink.value
  }],
  [{
    label: t('nav.logout'),
    icon: 'i-heroicons-arrow-right-on-rectangle',
    click: handleLogout
  }]
])

function handleLogout() {
  logout()
  mobileOpen.value = false
  router.push('/')
}
</script>
