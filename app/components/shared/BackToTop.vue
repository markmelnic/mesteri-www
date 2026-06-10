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
      type="button"
      aria-label="Back to top"
      class="fixed bottom-6 right-6 z-40 w-10 h-10 rounded-xl bg-white border border-stone-200 shadow-lg shadow-stone-900/5 flex items-center justify-center text-stone-500 hover:text-stone-900 hover:border-stone-300 transition-all duration-150"
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

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>
