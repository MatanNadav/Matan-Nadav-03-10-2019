

export default {
    template: `
        <nav class="nav-container flex row space-between">
            <li class="nav-item flex align-center"><router-link class="nav-link" to="/">WeatherTip</router-link> </li>
            <li class="nav-item flex align-center"><router-link class="nav-link" to="/favorites">Favorites</router-link></li>
            <li class="nav-item flex align-center"><h5 class="theme-head" @click="toggleTheme">{{chooseTheme}}</h5></li>
        </nav>
    `,

    data() {
        return {
            theme: null
        }
    },

    props:[],
    computed: {
        chooseTheme() {
            if(this.theme) return 'Light Mode'
            else return 'Dark Mode'
        }
    },
    methods: {
        toggleTheme() {
            this.theme = !this.theme
            this.$store.commit('setTheme', this.theme)   
        }
    },

    created() {
        this.theme = this.$store.getters.getTheme
    }
}