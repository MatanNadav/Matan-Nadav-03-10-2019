import appHeader from "../cmps/app-header.cmp.js"
import weatherPreview from "../cmps/weather-preview.cmp.js"
import eventBus from "../event-bus.js"

const options = {
    root: null,
    rootMargins: "0px",
    threshold: 0.5 
};

export default {
    name: 'home-page',
    template: `
   
    <section class="home-container max-width":class="{dark: isDark}">
        <span>{{getTheme}}</span>
        <app-header></app-header>
        <weather-preview :weather="weatherForDisplay" :forecast="forecastForDisplay" :cityName="cityNameToRender" @emit-filter="setFilter" @emit-favorite="setFavorite" :isFavorite="getIsFavorite"></weather-preview>
        <section class="scroll-container" ref="scroll">
        </section>
        <footer ref="footer" class="footer"></footer>
    </section>
    `,

    data() {
        return {
            observer:null,
            isDark: false
        }
    },

    props: [],
    computed: {
        weatherForDisplay() {
            let weather =  this.$store.getters.weatherForDisplay;
            return weather[0]
        },
        forecastForDisplay() {
            return this.$store.getters.forecastForDisplay;
        },
        cityNameToRender() {
            return this.$store.getters.getCityName;
        },
        getIsFavorite() {
            return this.$store.getters.getIsFavorite;
        },
        getTheme() {
            let theme = this.$store.getters.getTheme
            if(theme) this.isDark = true;
            else this.isDark = false;
        }
    },

    methods: {
        loadWeather() {
            this.$store.dispatch({ type: "loadWeather" });
            this.$store.dispatch({type: "fetchPhotos"})
        },
        setFilter(filterBy) {
            this.$store.commit('setStoreFilter', filterBy.txt)
            this.loadWeather()
            this.$refs.scroll.innerHTML = ''
        },
        setFavorite(city) {
            this.$store.commit('addFavorite', city)
        },
        handleIntersect(entries) {
            if (entries[0].isIntersecting) {
                let photos =  this.$store.getters.getCityPhotos;
                let randNum = Math.floor(Math.random()*100)
                if(randNum < 5 ) randNum =+ 5;
                let photosToRender = Array.from(photos).slice(randNum - 5, randNum)
                let scrollContainer = this.$refs.scroll
                photosToRender.forEach(photo => {
                    let URL = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`
                    let img = document.createElement("img");
                    img.src = URL;
                    img.alt = photo.title
                    img.className = "city-image"
                    scrollContainer.appendChild(img)
                })
            }
        }
    },
    mounted() {
        this.observer = new IntersectionObserver(this.handleIntersect, options);
        this.observer.observe(this.$refs.footer);
    },
    created() {
        eventBus.$on('setWeather', (filterBy)=>{
            this.setFilter(filterBy)
        })
        this.loadWeather()
    },
    components: {
        weatherPreview,
        appHeader
    }
}