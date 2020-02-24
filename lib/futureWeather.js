const fetch = require('node-fetch');

async function futureWeather(location){
    const url = `http://api.openweathermap.org/data/2.5/forecast?id=${location}&appid=${process.env.APPID}`
    // https://api.openweathermap.org/data/2.5/weather?q=${location},uk&appid=${process.env.APPID}
    let data = await fetch(url,{method: 'GET'})    
    return await data.json()
    
}
// getWeather()
module.exports = futureWeather