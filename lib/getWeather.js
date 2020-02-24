// const request = require('request');
// const {promisify} = require('util');
// require('dotenv').config() //www.npmjs.com/package/envdot


// //make it look like a json format 

// const promisifiedRequest = promisify(request);
// const getWeather = async () => {
//     let data = await promisifiedRequest({
        // uri: `https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=${process.env.APPID}`,
//         json: true
//     });
//     return data.body


// }
// getWeather()

const fetch = require('node-fetch');

async function getWeather(location){
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location},uk&appid=${process.env.APPID}`

    let data = await fetch(url,{method: 'GET'})    
    return await data.json()
    
}
// getWeather()
module.exports = getWeather