import React from 'react'


const Result=({props}) =>{

    const {value,date,temp,wind,pressure,sunrise,sunset,err,fetched, gmtOffset, city, country,icon} = props
    // let timeToGMT = (offSet)=>{
    //      if (offSet>=0){
    //    return('+' + offSet.toString())
    // } else {return offSet}
    // }
    // const weatherIcon = `http://openweathermap.org/img/w/${icon}`;
   

    if (fetched && !err && value.length !== 0){   
        const sunriseTime= new Date(sunrise*1000).toLocaleTimeString()  
        const sunsetTime = new Date(sunset*1000).toLocaleTimeString() 
            return(
            <div className="result">
                <h1>{city}</h1>
                <p>Country code : {country}</p>
                <p>GMT offset: <strong>{gmtOffset}</strong></p>
                <p>Today is <strong>{date}</strong> </p>
                <p>Temperature : <strong>{temp} &#176;C</strong></p>
                <p>Wind speed: <strong>{wind}</strong> m/s</p>
                <p>Pressure: <strong>{pressure}</strong> hPa</p>
                <p>Sunrise at: <strong>{sunriseTime}</strong></p>
                <p>Sunset at: <strong>{sunsetTime}</strong></p>
                <img src={"http://openweathermap.org/img/w/"+icon+".png"} alt="weatherIcon" />
            </div>
        )    
    }else{
        if(err){
            return (<div className="result">City not found We dont have <strong>{value}</strong> in database.</div>)
        }else{
            return(
            <div className="result">Pease type city to check current weather info</div>
        )   
        }    
    }
}
// const Result=({props}) =>{
//     if (props.fetched && !props.err){   
//         const sunriseTime= new Date(props.sunrise*1000).toLocaleTimeString()  
//         const sunsetTime = new Date(props.sunset*1000).toLocaleTimeString() 
//             return(
//             <div className="result">
//                 <h1>{props.value}</h1>
//                 <p>Today is <strong>{props.date}</strong></p>
//                 <p>Temperature is <strong>{props.temp}</strong></p>
//                 <p>Wind speed <strong>{props.wind}</strong> m/s</p>
//                 <p>Pressure <strong>{props.pressure}</strong> hPa</p>
//                 <p>Sunrise at <strong>{sunriseTime}</strong></p>
//                 <p>Sunset at <strong>{sunsetTime}</strong></p>
//             </div>
//         )    
//     }else{
//         if(props.err){
//             return (<div className="result">City not found We dont have <strong>{props.value}</strong> in database.</div>)
//         }else{
//             return(
//             <div className="result">Type city</div>
//         )   
//         }    
//     }
// }

export default Result