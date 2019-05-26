import React, { Component } from 'react'
import './App.css';
import Form from './Form'
import Result from './Result'


//API KEY 
const APIGeoNames = 'rav260'
const APIKey = '8168a4c8854af88f50ca9cac1374c07e'


export default class App extends Component {

  state={
    value: '',
    date:'',
    location:'',
    verCity:'',
    city:'',
    country: '',
    sunrise:'',
    sunset:'',
    temp:'',
    pressure:'',
    wind:'',
    err:false,
    fetched: false,
    gmtOffset: null,
    icon: '',
    coord: {lat: null ,lng: null}
  }

  
  inputChangeHandler=(e)=>{
    console.log(e.target.value)
    this.setState({value: e.target.value})
  }

calculateOffset(offset){
      if (offset >= 0) {return   '+' + (offset / 3600).toString()
      } else { return  offset / 3600 };
  }

async gettinData(city){
    const API = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${APIKey}&units=metric`;
    let data={}
    const date = new Date().toLocaleString();
    console.log(date )
    try{
      const response = await fetch(API);
      const json = await response.json()
      data = json
       this.setState({
                  err: false,
                  temp: data.main.temp,
                  pressure: data.main.pressure,
                  wind: data.wind.speed,
                  city: city,
                  country: data.sys.country,
                  sunrise: data.sys.sunrise,
                  sunset: data.sys.sunset,
                  date: date,
                  fetched: true,
                  gmtOffset: this.calculateOffset(data.timezone),
                  icon: data.weather[0].icon,
                  coord: { lat: data.coord.lat, lng: data.coord.lon }
     });
    }
    catch(err){
      this.setState({err: true})
    }
    console.log(data)
    return data
}

async validateCityName(){
    let city= ''
    const APICityValidation = `http://api.geonames.org/searchJSON?q=${this.state.value}&maxRows=10&username=${APIGeoNames}`;
  console.log("check api get", APICityValidation)
    try{
        const response =  await fetch(APICityValidation) 
        const json = await response.json()
        console.log(json)
        city = await json.geonames[0].toponymName;
    }
    catch(e){
      this.setState({err:true})
    }
    console.log(city)
    return city
}

  checkError(){
    this.state.err ? this.setState({err: false}) : console.log('err: false')
}


async componentDidUpdate(prevProps, prevState){

    if(this.state.value.length === 0){this.checkError()}
    if (prevState.value !== this.state.value){
    
    // initialize API request for validation City
      
    
    //initialize API request for weather data
    let city = await this.validateCityName()
    console.log(city)
    let data =   await this.gettinData(city)
  // await console.log(data.main.pressure)
    const date = new Date().toLocaleString();
    // if(data){
    //   this.setState(prevState => ({
    //               err: false,
    //               temp: data.main.temp,
    //               pressure: data.main.pressure,
    //               wind: data.wind.speed,
    //               city: prevState.value,
    //               country: data.sys.country,
    //               sunrise: data.sys.sunrise,
    //               sunset: data.sys.sunset,
    //               date: date,
    //               fetched: true,
    //               gmtOffset: this.calculateOffset(data.timezone),
    //               icon: data.weather[0].icon,
    //               coord: { lat: data.coord.lat, lng: data.coord.lon }
    //  }));
    // } 
    
  //   fetch(APICityValidation).then(res=>{
  //       if(res.ok){
  //         return res
  //       }throw Error(res.statusText)
  //     }).then(
  //       res=>{return res.json()}
  //     ).then(data=>{
  //       this.setState({
  //         verCity: data.geonames[0].toponymName
  //       })
  //       console.log('zwrotka  z geonames' , data.geonames[0].toponymName)
  //       const API = `http://api.openweathermap.org/data/2.5/weather?q=${this.state.verCity}&APPID=${APIKey}&units=metric`;
      
  //           fetch(API).then(res => {
  //             if (res.ok) {
  //               return res
  //             }
  //             throw Error(res.statusText)
  //           })
  //             .then(res => {
  //               return res.json()
  //             })
  //             .then(data => {
  //               console.log('ZAPYTANIE DO API weather', data)
  //               const date = new Date().toLocaleString()
                
                
  //               this.setState(prevState => ({
  //                 err: false,
  //                 temp: data.main.temp,
  //                 pressure: data.main.pressure,
  //                 wind: data.wind.speed,
  //                 city: prevState.value,
  //                 country: data.sys.country,
  //                 sunrise: data.sys.sunrise,
  //                 sunset: data.sys.sunset,
  //                 date: date,
  //                 fetched: true,
  //                 gmtOffset: this.calculateOffset(data.timezone),
  //                 icon: data.weather[0].icon,
  //                 coord: { lat: data.coord.lat, lng: data.coord.lon }

  //               }))
  //               return data;

  //             }) 
  //               .catch(err => {
  //                 console.log(err);
  //                 this.setState(prevState => ({
  //                   err: true,
  //                   city: prevState.value
  //                 }))
  //               })
  //     }
  //     )
  //       .catch(err => {
  //         console.log(err);
       
    
  // })
}
}




  render() {
    
  const stylized = {
    fontSize: '15px',
    textAlign: 'center',
    margin: '100px'
  };
    return (
      <div className="App" style={stylized}>
        <Form
          clicked={this.clicked}
          value={this.state.value}
          changed={this.inputChangeHandler}
        />
        <Result props={this.state} />
        
        <button className="btn" onClick={()=>console.log(this.state)}>Sprawdz State</button>
      </div>
    );
  }
}

