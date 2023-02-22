const express  = require('express')
const https = require('https')
const bp=require('body-parser')

const app= express()

app.use(bp.urlencoded({extended:true})) 

app.listen(3000,()=>{
    console.log("server running on port 3000")
})

app.get('/',(req,res)=>{
    res.sendFile(__dirname +'/index.html')

})

app.post('/', (req,res)=>{
    const query = req.body.cityName
    const apiKey='0c260e52d2240710f6c5cf33a2be6d0c'
    const unit= 'metric'
    let url = ('https://api.openweathermap.org/data/2.5/weather?q='+query+'&appid='+apiKey+'&units='+unit)
    https.get(url,(response)=>{
        console.log(response.statusCode)
        response.on('data',(data)=>{
            const jsonData=JSON.parse(data)
            try{
                const temp = jsonData.main.temp
                const weather = jsonData.weather[0].description
                const iconUrl=jsonData.weather[0].icon
                const icon = (`http://openweathermap.org/img/wn/${iconUrl}.png`)
                res.write(`<h1>${query} weather report: </h1>`)
                res.write(`<h2>today weather are ${weather}, the temperature is ${temp} celcius</h2>`)
                res.write(`<img src="${icon}" style="width:100px;height:100px;"</img>`)
                res.send()
            }
            catch(err){
                res.send('location not found')
            }
        })
    })
})

