import React, { Component } from 'react'
import './App.css';
import Form from './Form'
import Result from './Result'


//API KEY 
const APIKey = '8168a4c8854af88f50ca9cac1374c07e'
const APItimeZoneKey = '7PBO7M68F8PW'

export default class App extends Component {

  state={
    value: '',
    date:'',
    location:'',
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

  clicked=()=>{
    console.log('clicked')
  }
  inputChangeHandler=(e)=>{
    this.setState({value: e.target.value})
  }

  // gmtCheck=()=>{
  //   const APItimeZone = `http://api.timezonedb.com/v2.1/get-time-zone?key=${APItimeZoneKey}&format=json&by=position&lat=${this.state.coord.lat}&lng=${this.state.coord.lng}`;
  //   fetch(APItimeZone)
  //     .then(res => { return res.json() })
  //     .then(res => console.log(res))
            
  // }

  // handleCitySubmit=(e)=>{
  //   e.preventDefault();
  //   console.log('form submitted');
  //   // initialize API request
    
  //   const API = `http://api.openweathermap.org/data/2.5/weather?q=${this.state.value}&APPID=${APIKey}&units=metric`;
  //  // const APItimeZone = `http://api.timezonedb.com/v2.1/get-time-zone?key=${APItimeZoneKey}&format=json&by=position&lat=${this.state.coord.lat}&lng=${this.state.coord.lng}`;
    
  //   fetch(API).then(res=>{
  //     if(res.ok){
  //      return res
  //     }
  //    throw Error(res.statusText)
  //   })
  //   .then(res =>{
  //     // console.log('res.json ',res.json())
  //     // console.log('status' + res.statusText)
  //      return res.json() 
  //   })
  //   .then(data => {
  //     // console.log('res.data.temp ', data.main.temp)
  //     const date = new Date().toLocaleString()
  //     this.setState(prevState => ({
  //       err: false,
  //       temp: data.main.temp,
  //       pressure: data.main.pressure,
  //       wind: data.wind.speed,
  //       city: prevState.value,
  //       country: data.sys.country,
  //       sunrise: data.sys.sunrise,
  //       sunset: data.sys.sunset,
  //       date: date,
  //       fetched: true,
  //       gmtOffset: null

  //     }))
  //     console.log(data)
  //     //Fetch for additional information
  //     const APItimeZone = `http://api.timezonedb.com/v2.1/get-time-zone?key=${APItimeZoneKey}&format=json&by=position&lat=${data.coord.lat}&lng=${data.coord.lon}`;
  //     fetch(APItimeZone).then(res=>{if(res.ok){
  //                 return res
  //                 }
  //                 throw Error(res.statusText)
  //               }).then(res=>{return res.json()}).then(res=>{
  //                 console.log(res)
  //                 let offset = ''
  //                 if(res.gmtOffset>=0){
  //                   offset = '+' +(res.gmtOffset / 3600).toString()
  //                 }else{offset=res.gmtOffset / 3600}
  //                 this.setState(prevState=>({
  //                     gmtOffset: offset
  //                 }))
  //               })
                
  //               .catch(err=>console.log(err))
  //   })
  //   .catch(err=>{
  //     console.log(err);
  //     this.setState(prevState=>({
  //       err: true,
  //       city: prevState.value
  //     }))
  //   })
  // }
  checkError(){
    this.state.err ? this.setState({err: false}) : console.log('err: false')
  }
  componentDidUpdate(prevProps, prevState){
    console.log(this.state)

    if(this.state.value.length === 0){this.checkError()}
    if (prevState.value !== this.state.value){
    
    // initialize API request
      const API = `http://api.openweathermap.org/data/2.5/weather?q=${this.state.value}&APPID=${APIKey}&units=metric`;

    fetch(API).then(res=>{
      if(res.ok){
       return res
      }
     throw Error(res.statusText)
    })
    .then(res =>{
      // console.log('res.json ',res.json())
      // console.log('status' + res.statusText)
       return res.json() 
    })
    .then(data => {
      // console.log('res.data.temp ', data.main.temp)
      const date = new Date().toLocaleString()
      this.setState(prevState => ({
        err: false,
        temp: data.main.temp,
        pressure: data.main.pressure,
        wind: data.wind.speed,
        city: prevState.value,
        country: data.sys.country,
        sunrise: data.sys.sunrise,
        sunset: data.sys.sunset,
        date: date,
        fetched: true,
        gmtOffset: null,
        icon: data.weather[0].icon,
        coord: {lat: data.coord.lat , lng: data.coord.lon}

      }))
      return data;
     
      
    }) // console.log("data from open weather" , data.weather[0].icon)

      //Fetch for additional information for GMT Offset
    .then(data=>{
        const APItimeZone = `http://api.timezonedb.com/v2.1/get-time-zone?key=${APItimeZoneKey}&format=json&by=position&lat=${data.coord.lat}&lng=${data.coord.lon}`;
        setTimeout(()=>{fetch(APItimeZone).then(res=>{if(res.ok){
                    return res
                    }
                    throw Error(res.statusText)
                  }).then(res=>{return res.json()}).then(res=>{
                    console.log(res)
                    let offset = ''
                    if(res.gmtOffset>=0){
                      offset = '+' +(res.gmtOffset / 3600).toString()
                    }else{offset=res.gmtOffset / 3600}
                    this.setState(prevState=>({
                        gmtOffset: offset
                    }))
                  })

                  .catch(err=>console.log(err))}, 1000)
    })
    .catch(err=>{
      console.log(err);
      this.setState(prevState=>({
        err: true,
        city: prevState.value
      }))
    })
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
        
        <Form clicked={this.clicked}
         value={this.state.value} 
         changed={this.inputChangeHandler} ></Form>
        <Result props={this.state} />
      </div>
    )
  }
}

