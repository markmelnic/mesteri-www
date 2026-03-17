<template>
  <div class="min-h-screen flex flex-col bg-[#FAFAFA]">
    <LayoutAppHeader />
    <div class="flex flex-1">
      <LayoutDashboardSidebar />
      <main class="flex-1 p-6 lg:p-8 pb-24 lg:pb-8">
        <slot />
      </main>
    </div>
  </div>
</template>
