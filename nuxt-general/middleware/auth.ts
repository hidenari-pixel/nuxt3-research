export default defineNuxtRouteMiddleware(async (to, from) => {
    const { currentUser } = useAuth()
    if (!currentUser.value && to.path !== '/login') {
        return navigateTo('/login')
    }
})