<template>
  <div class="min-h-screen flex flex-col bg-stone-50">
    <LayoutAppHeader />
    <div class="flex flex-1">
      <LayoutDashboardSidebar />
      <main class="flex-1 p-5 sm:p-6 lg:p-10 pb-24 lg:pb-10 min-w-0">
        <slot />
      </main>
    </div>
  </div>
</template>
