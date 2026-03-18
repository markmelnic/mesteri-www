<template>
  <header
    class="sticky top-0 z-50 transition-all duration-200"
    :class="scrolled ? 'bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-white/[0.06]' : 'bg-transparent'"
  >
    <div class="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
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
            class="px-3.5 py-2 text-sm font-medium text-[#A1A1AA] hover:text-white rounded-lg transition-all duration-150 hover:bg-white/[0.06]"
            active-class="!text-white !bg-white/[0.06]"
          >
            {{ item.label }}
          </NuxtLink>
        </nav>

        <!-- Auth / User + Language -->
        <div class="hidden md:flex items-center gap-3">
          <SharedLanguageSwitcher />
          <template v-if="isAuthenticated">
            <UDropdownMenu :items="userMenuItems">
              <UButton variant="ghost" color="neutral" class="flex items-center gap-2 text-[#A1A1AA] hover:text-white">
                <UAvatar :src="user?.avatar" :alt="user?.name" size="xs" />
                <span class="text-sm font-medium">{{ user?.name }}</span>
                <UIcon name="i-heroicons-chevron-down-20-solid" class="w-4 h-4" />
              </UButton>
            </UDropdownMenu>
          </template>
          <template v-else>
            <UButton to="/autentificare" variant="ghost" color="neutral" size="sm" class="font-medium text-[#A1A1AA] hover:text-white">
              {{ $t('nav.login') }}
            </UButton>
            <NuxtLink
              to="/inregistrare"
              class="inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-[#0D9373] hover:bg-[#0FAA84] rounded-lg transition-colors duration-150"
            >
              {{ $t('nav.register') }}
            </NuxtLink>
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
      <div v-if="mobileOpen" class="md:hidden border-t border-white/[0.06] bg-[#0A0A0A]/95 backdrop-blur-xl pb-4">
        <nav class="px-4 pt-3 space-y-1">
          <NuxtLink
            v-for="item in navItems"
            :key="item.key"
            :to="item.to"
            class="block px-4 py-2.5 text-sm font-medium text-[#A1A1AA] hover:text-white hover:bg-white/[0.06] rounded-lg"
            active-class="!text-white !bg-white/[0.06]"
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
            <NuxtLink
              :to="dashboardLink"
              class="block w-full text-center px-4 py-2.5 text-sm font-semibold text-white bg-[#0D9373] hover:bg-[#0FAA84] rounded-lg transition-colors"
              @click="mobileOpen = false"
            >
              {{ $t('nav.myAccount') }}
            </NuxtLink>
            <UButton variant="ghost" color="neutral" block @click="handleLogout">
              {{ $t('nav.logout') }}
            </UButton>
          </template>
          <template v-else>
            <NuxtLink
              to="/autentificare"
              class="block w-full text-center px-4 py-2.5 text-sm font-semibold text-white bg-[#0D9373] hover:bg-[#0FAA84] rounded-lg transition-colors"
              @click="mobileOpen = false"
            >
              {{ $t('nav.login') }}
            </NuxtLink>
            <NuxtLink
              to="/inregistrare"
              class="block w-full text-center px-4 py-2.5 text-sm font-medium text-[#A1A1AA] border border-white/[0.06] hover:border-white/[0.12] rounded-lg transition-colors"
              @click="mobileOpen = false"
            >
              {{ $t('nav.register') }}
            </NuxtLink>
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
