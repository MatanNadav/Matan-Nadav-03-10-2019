
export default {
    name: 'favorite-preview',
    template: `
        <div class="favorite-weather" v-if="favorite" @click="emitWeather">
            <div class="card favorite-card" style="width: 15rem; height: 25rem">
                <img :src="getDayIcon" class="card-img-top" alt="weather-icon">
                <div class="card-body">
                    <h5 class="card-title">{{cityName}}</h5>
                    <h5 class="card-title">{{favorite.WeatherText}}</h5>
                    <p class="card-text">{{getTime}}</p>
                    <p class="card-text">Temperature is: {{favorite.Temperature.Metric.Value}} Celsius</p>
                    <button class="btn btn-primary" @click="emitFavorite(favorite._id)">Remove</button>
                </div>
            </div>
        </div>
    `,

    data() {
        return {
        }
    },

    props: {
        favorite: Object,
        cityName: String
    },
    computed: {
        getTime() {
            let toMilliseconds = this.favorite.EpochTime * 1000;
            let date =  new Date(toMilliseconds).toUTCString()
            return date.substring(0 , date.length - 12);
        },
        getDayIcon() {
          let desc = this.favorite.WeatherText.toLowerCase()
          if(desc.includes("sunny")) return "animated/day.svg"
          else if(desc.includes("cloud")) return "animated/cloudy.svg"
          else if(desc.includes("rain") || desc.includes("showers")) return "animated/rainy-5.svg"
          else return "animated/weather.svg"
        },
    },

    methods: {
        emitFavorite(favoriteId) {
            this.$emit("emitFavorite", favoriteId)
        },
        emitWeather() {
            this.$emit("emitWeather", this.cityName)
        }
        
    },

    created() {
    },
    components: {
    }
}