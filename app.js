//const http=require('http')
//const url=`http://api.openweathermap.org/data/2.5/weather?id=524901&appid=54b11596cd74a0a155f55e55ed110a7e`

//const request=require('request')


const express= require ('express')
const app= express()
const bodyParser=require('body-parser')
const request = require('request');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index', {weather: null, error: null});
})

app.post('/',function(req,res){
  let city=req.body.city
  var weather
  const url=`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=54b11596cd74a0a155f55e55ed110a7e`
  request(url,function(err,response,body){
    if(err){
      res.render('index',{weather: null,error: 'Error,please try again'});
    }
    else{
       weather= JSON.parse(body)
      if(weather.main == undefined){
        res.render('index',{weather: null,error: 'Error,please try again'});
      }
      else{
        let weatherText= `It's ${weather.main.temp} degrees in ${weather.name}`
        res.render('index',{weather: weatherText,error:null})
      }
    }
  })
  
})

app.listen(3009,function(){
  console.log('server is up at 3000')
})































// http.get(url, (res) => {
//   const { statusCode } = res;
//   const contentType = res.headers['content-type'];

//   let error;
//   // Any 2xx status code signals a successful response but
//   // here we're only checking for 200.
//   if (statusCode !== 200) {
//     error = new Error('Request Failed.\n' +
//                       `Status Code: ${statusCode}`);
//   } else if (!/^application\/json/.test(contentType)) {
//     error = new Error('Invalid content-type.\n' +
//                       `Expected application/json but received ${contentType}`);
//   }
//   if (error) {
//     console.error(error.message);
//     // Consume response data to free up memory
//     res.resume();
//     return;
//   }

//   res.setEncoding('utf8');
//   let rawData = '';
//   res.on('data', (chunk) => { rawData += chunk; });
//   res.on('end', () => {
//     try {
//       const parsedData = JSON.parse(rawData);
//       console.log(parsedData);
//     } catch (e) {
//       console.error(e.message);
//     }
//   });
// }).on('error', (e) => {
//   console.error(`Got error: ${e.message}`);
// })