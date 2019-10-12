import weatherService from './services/weather.service.js'

const store = new Vuex.Store({
    strict: true,
    state: {
        isFavorite: null,
        isDarkMode: false,
        isLoading: false,
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
        },
        getLoading(state) {
            return state.isLoading;
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
        },
        setLoading(state, {isLoading}) {
            state.isLoading = isLoading
        }
    },
    actions: {
        async loadWeather(context) {
            context.commit({ type: 'setLoading', isLoading:true })
            const res = await weatherService.findLocation(context.state.filterBy.txt);
            const {weather, forecast, cityName} = res
            // setTimeout(1500);
            context.commit({ type: 'setCurrWeather', weather })
            context.commit({ type: 'setCurrforecast', forecast })
            context.commit({ type: 'setCurrCity', cityName })
            context.commit({ type: 'setLoading', isLoading:false })
        },
        async fetchPhotos(context) {
            context.commit({type: 'setLoading', isLoading:true})
            const photos = await weatherService.getLocationPhotos(context.state.filterBy.txt)
            context.commit({type: "setCityPhotos", photos})
            context.commit({type: 'setLoading', isLoading: false})
        },
        

    }
})
export default store;

