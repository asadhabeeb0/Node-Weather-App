// Mine 
const http = require("http");
const fs = require("fs");
var request = require("request");
const homeFile = fs.readFileSync("home.html","utf-8");
const replaceVal = (tempVal, orgVal) => {
    let temperature = tempVal.replace("{%tempval%}", orgVal.main.temp);  
    temperature = temperature.replace("{%tempmin%}", orgVal.main.temp_min);  
    temperature = temperature.replace("{%tempmax%}", orgVal.main.temp_max);  
    temperature = temperature.replace("{%location%}", orgVal.name);  
    temperature = temperature.replace("{%country%}", orgVal.sys.country);
    temperature = temperature.replace("{%tempstatus%}", orgVal.weather[0].main);
    return temperature;   
};

const server = http.createServer((req, res) => {
    if (req.url === '/') {
    request (
        `https://api.openweathermap.org/data/2.5/weather?q=Faisalabad&appid=ab0f63a2217a74280faa771753c0851e`
    )
    .on("data", (chunk) => {
        const objdata = JSON.parse(chunk);
        const arrData = [objdata];
        // console.log(arrData[0]);
        const realTimeData = arrData.map((val) => replaceVal(homeFile, val));
        const joinedData = realTimeData.join();
        // console.log(joinedData); 
        res.write(joinedData);
    })
    .on("end", (err) => {
        if (err) 
            return console.log("Connection closed due to errors", err);
    }); 
}});
server.listen(9800, "127.0.0.1", () => {
    console.log("Listening to the port number 9800");
});



// Irfan's
// const http = require("http");

// var requests = require('requests');

// const fs = require("fs");

// const homeFile = fs.readFileSync("home.html");  

// const replaceVal =(tempval, orgVal)=>{
//     let temperature =tempval.toString().replace("{%tempval%}",orgVal.main.temp);
//     temperature =temperature.replace("{%tempmin%}",orgVal.main.temp_min);
//     temperature =temperature.replace("{%tempmax%}",orgVal.main.temp_max);
//     temperature =temperature.replace("{%location%}",orgVal.name);
//     temperature =temperature.replace("{%country%}",orgVal.sys.country);
//     temperature =temperature.replace("{%tempstatus%}",orgVal.weather[0].main);
  
//     return temperature;
// };

// const server = http.createServer((req,res)=>{

//     if(req.url=="/"){

//         requests("http://api.openweathermap.org/data/2.5/weather?q=London&units=metric&appid=9f14c9bf9d674d54de16ad7cb886fe26")
//         .on('data', (chunk)=> {
//       //  console.log(chunk);
//             const  objdata = JSON.parse(chunk);
//             const arrData =[objdata];
//          // console.log(arrData[0].main.temp)
//      const reatTimeData = arrData
//      .map((val) => replaceVal(homeFile, val))
//      .join(""); 
//   res.write(reatTimeData);
//   // console.log(reatTimeData);

// })

//         .on('end',  (err)=> {
//           if (err) return console.log('connection closed due to errors', err);
//          res.end();
//           //console.log('end');
//         });
    

//     }

// });


// server.listen(8000,"127.0.0.1",()=>{
//     console.log("Go to the port 8000");

// });
