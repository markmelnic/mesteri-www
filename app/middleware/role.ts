export default defineNuxtRouteMiddleware((to) => {
  const { user, isAuthenticated } = useAuth()

  if (!isAuthenticated.value) {
    return navigateTo('/autentificare')
  }

  const path = to.path

  if (path.startsWith('/cont-mester') && user.value?.role !== 'provider') {
    return navigateTo('/cont/profil')
  }

  if (path.startsWith('/cont') && !path.startsWith('/cont-mester') && user.value?.role !== 'client') {
    return navigateTo('/cont-mester/profil')
  }
})
