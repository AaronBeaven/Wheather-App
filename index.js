const hbs = require('express-handlebars');  
const path = require('path'); //Import handlebars and path
const express = require('express');
const bodyParser = require('body-parser')

const app = express();
//  Tell express that this path is static content for the client
//Use path to join these two paths

const getWeather =require('./lib/getWeather')

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
app.get('/visibility', (req, res)=>{
    res.render('visibility')
})

app.post('/', async(req,res)=>{
    let location = req.location
    console.log(location);

app.post('/visibility', async(req,res)=>{
    // let visibility = data.visibility
    let visibility = req.visibility
    console.log(visibility);
    
})
    let data = await getWeather();
    let name = data.name
    console.log(data);
    
    let temp = data.main.temp
    // let pressure = data.main.pressure
    // console.log(visibility);
    
    // console.log("searching for the weather in" , name)
    // console.log(temp)
    // console.log(pressure)
    // console.log(visibility)
    // console.log(data)
    // res.render('index', { name, temp, pressure, visibility})
    // console.log(data)
    console.log(name)
    res.render('index', {data:{name, temp}})
    console.log(name)
    res.render('visibility', {data:{name, visibility}})
    
});
app.listen(3000, ()=>{
    console.log('server listening on port 3000')
})

