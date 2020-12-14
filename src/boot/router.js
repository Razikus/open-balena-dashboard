import { boot } from 'quasar/wrappers'

export default boot(async ({ app, router, store, Vue }) => {
    router.beforeEach((to, from, next) => {
        if (to.matched.some(record => record.meta.requiresAuth)) {
            if (!store.state.main.loggedIn) {
                next({
                    path: '/login',
                    query: { redirect: to.fullPath }
                })
            } else {
                next()
            }
        } else {
            next() 
        }
    })
})
