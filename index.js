const hbs = require('express-handlebars');  
const path = require('path'); //Import handlebars and path
const express = require('express');
const bodyParser = require('body-parser')

const app = express();
//  Tell express that this path is static content for the client
//Use path to join these two paths
const getWeather =require('./lib/getWeather')
const futureWeather =require('./lib/futureWeather')

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.engine('.hbs', hbs({ //Set the view engine to handlebars
    defaultLayout: 'layout', //Set the layout file as layout.hbs
    extname:'.hbs' //Set the extension name to .hbs

}));
app.set('view engine', '.hbs'); //Tell express to use this engine

app.get('/', (req, res)=>{
    res.render('index')
})

app.post('/', async(req,res)=>{
    let location = req.body.location

    let data = await getWeather(location);
    let name = data.name
    console.log(data);
    
    let temp = data.main.temp
    let tempmin = data.main.temp_min
    let tempmax = data.main.temp_max
    let feelsLike = data.main.feels_like
    let pressure = data.main.pressure    

    res.render('index', {data:{name, temp, tempmin, tempmax, pressure, feelsLike}})
});

app.listen(3000, ()=>{
    console.log('server listening on port 3000')
})

app.get('/futureWeather', (req, res)=>{
    res.render('futureWeather')
})
app.post('/futureWeather', async(req,res)=>{
    let location = req.body.futureWeather

    let data = await futureWeather(location);
    console.log(data)
    let name = data.city.name
    let country = data.city.country
    let coord = data.city.coord.lat
    let coord1 = data.city.coord.lon
    let sunrise = data.city.sunrise
    let sunset = data.city.sunset
    // let feelsLike = data.main.feels_like
    // console.log(data);
    
    // let temp = data.main.temp
    // let pressure = data.main.pressure    

    res.render('futureWeather', {data:{name, country, coord, coord1, sunrise, sunset}})
 
});
