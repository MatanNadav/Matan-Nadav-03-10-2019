
import homepage from "./pages/homepage.cmp.js"
import favorites from "./pages/favorites.cmp.js"

const routes = [
    { path: '/', component: homepage },
    { path: '/favorites', component: favorites },
]

const router = new VueRouter({
    routes 
})

export default router;