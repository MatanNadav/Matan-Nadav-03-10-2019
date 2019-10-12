import weatherFilter from "./weather-filter.cmp.js"
import forecastPreview from "./forecast-preview.cmp.js"

export default {
    name: 'weather-preview',
    template: `
    <section v-if="weather" class="preview-container flex column">
        <h2 class="weather-head">Current Weather For {{cityName}} </h2>
    <div class="card weather-card" style="width: 65rem; height: 43rem;">
        <img :src="getWeatherIcon" class="card-img-top" alt="weather-icon">
        <div class="card-body">
            <h5 class="card-title">{{weather.WeatherText}}</h5>
            <h5 class="card-title">{{getTime}}</h5>
            <p class="card-text">Temperature is: {{weather.Temperature.Metric.Value}} Celsius</p>
            <button class="btn btn-primary" @click="emitFavorite">{{favoriteText}}</button>
        </div>
    </div>
    <h5 class="forecast-head">Five Days Forecast:</h5>
        <div class="forecast-container max-width flex row space-between">
           <forecast-preview v-for="day in forecast.DailyForecasts" :day="day"></forecast-preview>
        </div>
        <h5 class="photos-head">Photos of People from {{cityName}}</h5>
    </section>
    `,

    data() {
        return {
            isFavorite: false
        }
    },

    props: {
        weather: Object,
        forecast: Object,
        cityName: String,
        isFavorite: Boolean
    },
    computed: {
        getTime() {
          var toMilliseconds = this.weather.EpochTime * 1000;
          return new Date(toMilliseconds).toLocaleTimeString()
        },
        getWeatherIcon() {
          let desc = this.weather.WeatherText.toLowerCase()
          if(desc.includes("sunny")) return "animated/day.svg"
          else if(desc.includes("cloud")) return "animated/cloudy.svg"
          else if(desc.includes("rain") || desc.includes("showers")) return "animated/rainy-5.svg"
          else return "animated/weather.svg"
        },
        favoriteText() {
            if(this.isFavorite) return "Already Favorite"
            else return "Add to favorites"
        }

    },
    methods: {
        emitFavorite() {
            this.$emit('emit-favorite', this.weather)
        }
    },
    components: {
        weatherFilter,
        forecastPreview
    }
}