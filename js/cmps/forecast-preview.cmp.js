
export default {
    name: 'forecast-preview',
    template: `
        <div class="forecast-weather">
                <div class="card forecast-card" style="width: 15rem; height: 25rem">
                    <img :src="getDayIcon" class="card-img-top" alt="weather-icon">
                    <div class="card-body">
                        <h5 class="card-title">{{day.Day.IconPhrase}}</h5>
                        <p class="card-text">{{getDate}}</p>
                        <p class="card-text">High: {{day.Temperature.Maximum.Value}} C</p>
                        <p class="card-text">Low: {{day.Temperature.Minimum.Value}} C</p>
                    </div>
                </div>
        </div>
        
    `,

    data() {
        return {
        }
    },

    props: ['day'],
    computed: {
        getDate() {
            let date =  new Date(this.day.Date).toUTCString()
            return date.substring(0 , date.length - 12);
            
        },
        getDayIcon() {
           let desc = this.day.Day.IconPhrase.toLowerCase()
          if(desc.includes("sunny")) return "animated/day.svg"
          else if(desc.includes("cloud")) return "animated/cloudy.svg"
          else if(desc.includes("rain") || desc.includes("showers")) return "animated/rainy-5.svg"
          else return "animated/weather.svg"
        },
    },

    methods: {
        
    },

    created() {
        
    },
    components: {
    }
}