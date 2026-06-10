<template>
  <header
    class="sticky top-0 z-50 bg-white/90 backdrop-blur-xl transition-shadow duration-200"
    :class="scrolled ? 'shadow-sm border-b border-stone-200' : 'border-b border-transparent'"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <NuxtLink :to="localePath('/')" class="flex items-center shrink-0" aria-label="mesteri.md">
          <SharedAppLogo :width="150" :height="36" />
        </NuxtLink>

        <!-- Desktop Nav -->
        <nav class="hidden md:flex items-center gap-1">
          <NuxtLink
            v-for="item in navItems"
            :key="item.key"
            :to="localePath(item.to)"
            class="px-3.5 py-2 text-sm font-medium text-stone-600 hover:text-stone-900 rounded-lg transition-colors hover:bg-stone-100"
            active-class="!text-orange-700 !bg-orange-50"
          >
            {{ item.label }}
          </NuxtLink>
        </nav>

        <!-- Auth / User + Language -->
        <div class="hidden md:flex items-center gap-2">
          <SharedLanguageSwitcher />
          <template v-if="isAuthenticated">
            <UDropdownMenu :items="userMenuItems" :content="{ align: 'end' }">
              <button type="button" class="flex items-center gap-2 pl-1.5 pr-2.5 py-1.5 rounded-full border border-stone-200 hover:border-stone-300 hover:bg-stone-50 transition-colors">
                <UAvatar :src="user?.avatar" :alt="user?.name" size="2xs" />
                <span class="text-sm font-medium text-stone-700 max-w-[120px] truncate">{{ user?.name }}</span>
                <UIcon name="i-heroicons-chevron-down-20-solid" class="w-4 h-4 text-stone-400" />
              </button>
            </UDropdownMenu>
          </template>
          <template v-else>
            <NuxtLink
              :to="localePath('/autentificare')"
              class="px-3.5 py-2 text-sm font-medium text-stone-600 hover:text-stone-900 rounded-lg transition-colors hover:bg-stone-100"
            >
              {{ $t('nav.login') }}
            </NuxtLink>
            <NuxtLink
              :to="localePath('/inregistrare')"
              class="inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-stone-900 hover:bg-stone-700 rounded-xl transition-colors"
            >
              {{ $t('nav.register') }}
            </NuxtLink>
          </template>
        </div>

        <!-- Mobile Menu Button -->
        <button
          type="button"
          class="md:hidden w-10 h-10 rounded-lg flex items-center justify-center text-stone-600 hover:bg-stone-100 transition-colors"
          :aria-label="mobileOpen ? 'Close menu' : 'Open menu'"
          @click="mobileOpen = !mobileOpen"
        >
          <UIcon :name="mobileOpen ? 'i-heroicons-x-mark-20-solid' : 'i-heroicons-bars-3-20-solid'" class="w-5 h-5" />
        </button>
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
      <div v-if="mobileOpen" class="md:hidden border-t border-stone-200 bg-white pb-4 shadow-lg">
        <nav class="px-4 pt-3 space-y-1">
          <NuxtLink
            v-for="item in navItems"
            :key="item.key"
            :to="localePath(item.to)"
            class="block px-4 py-2.5 text-sm font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg"
            active-class="!text-orange-700 !bg-orange-50"
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
              :to="localePath(dashboardLink)"
              class="block w-full text-center px-4 py-2.5 text-sm font-semibold text-white bg-stone-900 hover:bg-stone-700 rounded-xl transition-colors"
              @click="mobileOpen = false"
            >
              {{ $t('nav.myAccount') }}
            </NuxtLink>
            <button
              type="button"
              class="block w-full text-center px-4 py-2.5 text-sm font-medium text-stone-600 border border-stone-200 hover:bg-stone-50 rounded-xl transition-colors"
              @click="handleLogout"
            >
              {{ $t('nav.logout') }}
            </button>
          </template>
          <template v-else>
            <NuxtLink
              :to="localePath('/inregistrare')"
              class="block w-full text-center px-4 py-2.5 text-sm font-semibold text-white bg-stone-900 hover:bg-stone-700 rounded-xl transition-colors"
              @click="mobileOpen = false"
            >
              {{ $t('nav.register') }}
            </NuxtLink>
            <NuxtLink
              :to="localePath('/autentificare')"
              class="block w-full text-center px-4 py-2.5 text-sm font-medium text-stone-600 border border-stone-200 hover:bg-stone-50 rounded-xl transition-colors"
              @click="mobileOpen = false"
            >
              {{ $t('nav.login') }}
            </NuxtLink>
          </template>
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const { user, isAuthenticated, isProvider, logout } = useAuth()
const router = useRouter()
const mobileOpen = ref(false)
const scrolled = ref(false)

function onScroll() {
  scrolled.value = window.scrollY > 10
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))

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
    onSelect: () => router.push(localePath(dashboardLink.value))
  }],
  [{
    label: t('nav.logout'),
    icon: 'i-heroicons-arrow-right-on-rectangle',
    onSelect: handleLogout
  }]
])

function handleLogout() {
  logout()
  mobileOpen.value = false
  router.push(localePath('/'))
}
</script>
