
import myRouter from './routes.js'
import myStore from './store.js'

new Vue({
    el: '#app',
    template: `
        <section>
            <router-view></router-view>
        </section>
    `,
    router: myRouter,
    store: myStore

})