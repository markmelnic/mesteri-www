<template>
  <div class="min-h-screen flex flex-col bg-[#fafbfc]">
    <LayoutAppHeader />
    <main class="flex-1">
      <slot />
    </main>
    <LayoutAppFooter />
  </div>
</template>
