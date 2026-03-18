<template>
  <div class="min-h-screen flex flex-col bg-[#0A0A0A]">
    <LayoutAppHeader />
    <main class="flex-1">
      <slot />
    </main>
    <LayoutAppFooter />
  </div>
</template>
