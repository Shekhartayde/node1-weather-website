const request=require('request')

const forecast=(longitude,latitude,callback)=>{

    const url='http://api.weatherstack.com/current?access_key=c78bc520b7caa95c6da0bca19ddea416&query='+longitude+','+latitude+'&units=m'
    
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unbale to connect weather server',undefined)
        }
        else if(body.error){
            callback('Unable to find location ',undefined)
        }
        else{
            callback(undefined,'It is '+body.current.weather_descriptions+' out there with '+body.current.temperature+'°C temperature and '+body.current.precip+'% chance of rain.')
        }
    })
}

module.exports=forecast

