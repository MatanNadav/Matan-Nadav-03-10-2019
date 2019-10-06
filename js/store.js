import weatherService from './services/weather.service.js'

const store = new Vuex.Store({
    strict: true,
    state: {
        isFavorite: null,
        isDarkMode: false,
        filterBy: {
            txt:'Tel Aviv'
        },
        currWeather:{},
        currForecast: {},
        currCity: '',
        cityPhotos: [],
        cityFavorites:[]
      
    },
    getters: {
        weatherForDisplay(state) {
            return state.currWeather;
        },
        forecastForDisplay(state) {
            return state.currForecast
        },
        getCityName(state) {
            return state.currCity;
        },
        getCityPhotos(state) {
            return state.cityPhotos
        },
        getFavorites(state) {
            return state.cityFavorites
        },
        getIsFavorite(state) {
            return state.isFavorite
        },
        getTheme(state) {
            return state.isDarkMode
        }
    },
    mutations: {
        setStoreFilter(state, txt) {
            state.filterBy = {txt}
        },
        setCurrWeather(state, {weather}) {
            state.currWeather = weather;
        },
        setCurrforecast(state, {forecast}) {
            state.currForecast = forecast;
        },
        setCurrCity(state, {cityName}) {
            state.currCity = cityName
        },
        setCityPhotos(state, {photos}) {
            state.cityPhotos = photos 
        },
        addFavorite(state, city) {
            state.isFavorite = true;
            state.cityFavorites.unshift(city)
        },
        removeFavorite(state, {favoriteId}) {
            state.isFavorite = false
            const idx = state.cityFavorites.findIndex(favorite => favorite._id === favoriteId)
            state.cityFavorites.splice(idx, 1)
        },
        setTheme(state) {
            state.isDarkMode = !state.isDarkMode
        }
    },
    actions: {
        async loadWeather(context) {
            const res = await weatherService.findLocation(context.state.filterBy.txt);
            const {weather, forecast, cityName} = res
            context.commit({ type: 'setCurrWeather', weather })
            context.commit({ type: 'setCurrforecast', forecast })
            context.commit({ type: 'setCurrCity', cityName })
        },
        async fetchPhotos(context) {
            const photos = await weatherService.getLocationPhotos(context.state.filterBy.txt)
            context.commit({type: "setCityPhotos", photos})
        }

    }
})
export default store;

