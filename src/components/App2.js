import React, { Component } from "react";
import "./App.css";
import Form from "./Form";
import Result from "./Result";

//API KEY
const APIGeoNames = "rav260";
const APIKey = "8168a4c8854af88f50ca9cac1374c07e";
const APItimeZoneKey = "7PBO7M68F8PW";

export default class App extends Component {
  state = {
    value: "",
    date: "",
    location: "",
    verCity: "",
    city: "",
    country: "",
    sunrise: "",
    sunset: "",
    temp: "",
    pressure: "",
    wind: "",
    err: false,
    fetched: false,
    gmtOffset: null,
    icon: "",
    coord: { lat: null, lng: null }
  };

  inputChangeHandler = e => {
    this.setState({ value: e.target.value });
  };

  checkError() {
    this.state.err ? this.setState({ err: false }) : console.log("err: false");
  }

  

  async componentDidUpdate(prevProps, prevState) {
    
    // console.log(this.state)  
            
          
            if(prevState.value !== this.state.value){
                  let cityName = ''
                try {
                    const APICityValidation = `http://api.geonames.org/searchJSON?q=${this.state.value}&maxRows=10&username=${APIGeoNames}`;
                    let responseCityName = await fetch(APICityValidation);
                    let json = await responseCityName.json();
                    cityName = json.geonames[0].toponymName
                      if(!responseCityName.ok){
                      throw Error(responseCityName.statusText)
                    }
                    // console.log(json.geonames[0].toponymName);
                    this.setState({ verCity: json.geonames[0].toponymName });
                    console.log(this.state)
                }
                  catch(e) {
                  console.log('Error!', e);
                }
                try{
                  const API = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${APIKey}&units=metric`;
                  let responseWeather = await fetch(API);
                  let json = await responseWeather.json();
                  console.log(json)
                  this.setState(prevState => ({
                    err: false,
                    temp: json.main.temp,
                    pressure: json.main.pressure,
                    wind: json.wind.speed,
                    city: prevState.value,
                    country: json.sys.country,
                    sunrise: json.sys.sunrise,
                    sunset: json.sys.sunset,
                    date: '',
                    fetched: true,
                    gmtOffset: null,
                    icon: json.weather[0].icon,
                    coord: {
                      lat: json.coord.lat,
                      lng: json.coord.lon
                    }
                  }));
                }
                  catch(e){

                  }
                  
            }
            return
          

  }










  fetchTimeZone() {
    console.log("click", this);
    const APItimeZone = `http://api.timezonedb.com/v2.1/get-time-zone?key=${APItimeZoneKey}&format=json&by=position&lat=${
      this.state.coord.lat
    }&lng=${this.state.coord.lng}`;

    fetch(APItimeZone, { mode: "cors" })
      .then(res => {
        if (res.ok) {
          return res;
        }
        throw Error(res.statusText);
      })
      .then(res => {
        return res.json();
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => {});
  }

  render() {
    const stylized = {
      fontSize: "15px",
      textAlign: "center",
      margin: "100px"
    };
    return (
      <div className="App" style={stylized}>
        <Form
          clicked={this.clicked}
          value={this.state.value}
          changed={this.inputChangeHandler}
        />
        <Result props={this.state} />
        <button onClick={() => this.fetchTimeZone()}>Sprawdz API</button>
        <button onClick={() => this.checkProperNameOfCity()}>Sprawdz city</button>
      </div>
    );
  }
}
