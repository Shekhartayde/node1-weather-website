const path=require('path')
const express=require('express')
const hbs=require('hbs');
const geocode=require('./utils/geocode.js')
const forecast=require('./utils/forecast.js')
const request=require('request')

const app=express()

//Define paths forexpress config
const viewsPath=path.join(__dirname,'../templates/views')
const publicDirectoryPath=path.join(__dirname,'../public')
const partialsPath=path.join(__dirname,'../templates/partials')

//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)


//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Andrew Mead'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Andrew Mead'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Andrew Mead'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error:'Please provide address'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){return res.send({error})}
        else{
            forecast(latitude,longitude,(error,forecastData)=>{
                if(error){return res.send({error})}
                else{
                    return res.send({
                        forecast:forecastData,
                        location,
                        address:req.query.address
                    })
                }
            })
        }
    })
    
})

app.get('/product',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'Please enter serch value'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Page not found.'
    })
})


app.listen(3000,()=>{
    console.log('server is up on port 3000')
})