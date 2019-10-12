
import myRouter from './routes.js'
import myStore from './store.js'

new Vue({
    el: '#app',
    template: `
        <section>
            <router-view></router-view>
        </section>
    `,
    computed: {
        isLoading() {
            this.$store.getters.getIsLoading;
        }
    },
    created() {
        this.$store.dispatch('setLoader')
    },
    router: myRouter,
    store: myStore

})