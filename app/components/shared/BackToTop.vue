<template>
  <Transition
    enter-active-class="transition-all duration-200 ease-out"
    enter-from-class="opacity-0 translate-y-4"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition-all duration-150 ease-in"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 translate-y-4"
  >
    <button
      v-if="visible"
      class="fixed bottom-6 right-6 z-40 w-10 h-10 rounded-lg bg-[#141416] border border-white/[0.06] hover:border-white/[0.12] flex items-center justify-center text-[#A1A1AA] hover:text-white transition-all duration-150"
      @click="scrollToTop"
    >
      <UIcon name="i-heroicons-arrow-up" class="w-4 h-4" />
    </button>
  </Transition>
</template>

<script setup lang="ts">
const visible = ref(false)

function onScroll() {
  visible.value = window.scrollY > 400
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>
