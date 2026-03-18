<template>
  <Transition
    enter-active-class="transition-all duration-300 ease-out"
    enter-from-class="opacity-0 translate-y-4"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition-all duration-200 ease-in"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 translate-y-4"
  >
    <button
      v-if="visible"
      class="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-xl bg-white border border-gray-200 shadow-lg hover:shadow-xl flex items-center justify-center text-gray-600 hover:text-indigo-600 transition-all duration-200 hover:-translate-y-0.5"
      @click="scrollToTop"
    >
      <UIcon name="i-heroicons-arrow-up" class="w-5 h-5" />
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
