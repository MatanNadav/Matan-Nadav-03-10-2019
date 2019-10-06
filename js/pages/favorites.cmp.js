import appHeader from "../cmps/app-header.cmp.js"
import favoritePreview from "../cmps/favorite-preview.cmp.js"
import eventBus from "../event-bus.js"

export default {
    name: 'favorite-page',
    template: `
   
    <section class="favorite-container max-width">
        <app-header></app-header>
        <section class="preview-container flex row space-between max-width">
            <favorite-preview v-for="favorite in favorites" :favorite="favorite" @emitFavorite="removeFavorite" :cityName="cityNameToRender"
            @emitWeather="setWeather"></favorite-preview>
            <h5 v-if="!favorites.length">No favorites to show</h5>
        </section>
    </section>
    `,

    data() {
        return {
            favorites:[]
        }
    },

    props: [],
    computed: {
        cityNameToRender() {
            return this.$store.getters.getCityName
        }
    },

    methods: {
        removeFavorite(favoriteId) {
            this.$store.commit({type: "removeFavorite", favoriteId})
        },
        setWeather(cityName) {
            let filterBy = {txt:cityName}
            eventBus.$emit('setWeather', filterBy),
            this.$router.push("/")
        }

    },
    created() {
       this.favorites = this.$store.getters.getFavorites
    },
    components: {
        appHeader,
        favoritePreview
    }
}