import utilService from "./util.service.js"

const APIKey = 'K8AdnAijb1LA9mVK7UDUZ3jGedN24gXX'

const APIPhotoKey = '8bb66eaa263d92bbc7d4c63ecfdc5b3e'

const locationAPI = `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${APIKey}&q=`;
const conditionAPI = 'http://dataservice.accuweather.com/currentconditions/v1/';
const fiveDaysForecastAPI = 'http://dataservice.accuweather.com/forecasts/v1/daily/5day/'
const flickrURL = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${APIPhotoKey}`



export default {
    findLocation,
    getLocationPhotos
}

async function findLocation(query) {
    try {
        const res = await axios.get(locationAPI+query)
        const weather = await getCurrWeather(res.data[0].Key);
        const forecast = await getFiveDaysForecast(res.data[0].Key);
        const cityName = res.data[0].LocalizedName
        weather[0].isFavorite = null;
        weather[0]._id = utilService.makeId()
        return {weather, forecast, cityName}
    }
    catch (err) {
        console.warn('something went wrong', err);
        throw err 
    }
}

async function getCurrWeather (locKey=215854) {
    try {
        const res =  await axios.get(`${conditionAPI}${locKey}?apikey=${APIKey}`)
        return res.data
    }
    catch (err) {
        console.warn('something went wrong', err)
        throw err
    }    

}

async function getFiveDaysForecast(locKey=215854) {
    try {
        const res = await axios.get(`${fiveDaysForecastAPI}${locKey}?apikey=${APIKey}&details=false&metric=true`)
        return res.data;
    }
    catch (err) {
        console.warn('No forecast from server', err);
        throw err
    }

}

async function getLocationPhotos(query = "tel aviv") {
    try {
        const res = await axios.get(`${flickrURL}&tags=${query}&format=json&nojsoncallback=1`)
        return res.data.photos.photo
    }
    catch (err) {
        console.warn("something went wrong");
        throw err        
    }
}