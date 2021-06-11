//jshint esversion:6
const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");
//we do not install https module because it already comes with native node module
//https module is used for making get request with external server node(api)

const app=express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){

res.sendFile(__dirname+"/index.html");

})
app.post("/",function(req,res){

const query=req.body.cityName;
// we want that we get back the temperature of that city which i want so that we break the url and put a variable by string
//concatenation
const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=c9c4e5d0b8e8209dff88eda272541e28&units=metric#downloadJSON=true"
//it is important that the url contains "https://" at the start
https.get(url,function(response){
//firstly make a url using endpoint(start of url),path,parameters and apiid authentication
//inside app.post() we use https.get() and after check the api url in postman that this url return data ,we copy and paste url in
//a constant variable i.e url after that pass as a parameter in https.get()
//https takes two parameter first is url and second is callback function which gives us back a response
//another response is might confusing so we use full name response
//after console.log("response")you can check what we return back from external server using api
//after console.log("response"),you are now able to see a lot of a lot of information which we get from external server
// console.log(response.statusCode); by using this we print statuscode in hyper terminal which is 200 means connection is ok
console.log(response.statusCode)

response.on("data",function(data){ //this method response.on() is used to search some 'data' which is sent actual data sent back by external Server
  //console.log(data); we can check the data back us by extrenal server in hyper terminal
  //but this data is in hexadecimal code ,so for converting this data we use JSON.parse()
const weatherData=JSON.parse(data);
  //json parse to convert data from hexadecial code to json format
  //one more method called JSON.stringify(data) .this method converts the data in a single string
  //console.log(weatherData);//by console log we check the data sent gy external server in json format



//after console.log(weatherData); now you understand which object is inside which object so that see hyper terminal or you
//can use JSON awesome viewer extension to copy path of each propert/attribute like temp from browser particularly and write
// code for retrieve specific information from the bunch of information
const temp=weatherData.main.temp;
//console.log(temp);//by console.log you confirm in hyper terminal what you recieve in this case you recieve TEMPERATURE
const weatherDescription=weatherData.weather[0].description;
// console.log(weatherDescription);
const icon=weatherData.weather[0].icon;
//open weathermap.org then go to weather condition codes then you able to see that icon is used to show images of how weather is
//in weathermap.org then go to weather condition codes copy and paste the url of icon "http://openweathermap.org/img/wn/10d@2x.png"
//don't forget to change '10d' in url to your icon
const imageUrl="http://openweathermap.org/img/wn/"+icon+"@2x.png"


res.write("<h1>THE WEATHER DESCRIPTION IS "+weatherDescription+".</h1>")
res.write("<h1>THE TEMPERATURE IS " +temp+"DEGREE CELCIUS</h1><br>");
//then we use img tag of html to print icon using imageurl copied from website weathermap.org
res.write("<img src="+imageUrl+">");
res.send();//this is necessary to write after all res.write()
})


  })
// res.send("server is up and running");//we only have one res.send() in app.get() but we have multiple res.write()




})

//when we deploy our app on heroku server then heroku doesn't want to port it to 3000
//so we create a dynamic port where heroku wll define on the go
//after this our app not anymore run locally
app.listen(process.env.PORT||3000,function(){
  //if we want that our app work on both heroku and local server then use or symbol
  console.log("server is running on port 3000");
})



//
// app.listen(3000,function(){
//   console.log("Server is running on port 3000");
// })
