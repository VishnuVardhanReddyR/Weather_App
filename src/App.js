import React from 'react';
import './App.css';
import "./weather-icons/css/weather-icons.css";
import Weather from "./components/weather.component";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "./components/form.component";

const API_KEY = "your api key"; //place your api-key here

class App extends React.Component {
  constructor(){
    super();
    this.state={
      lat: undefined,
      long: undefined,
      city: undefined,
      country: undefined,
      icon: undefined,
      main: undefined,
      celsius: undefined,
      temp_max: undefined,
      temp_min: undefined,
      description: "",
      err: false 
    };
    this.weatherIcon={
      Thunderstorm: "wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog"
    };
  }

  get_WeatherIcon(icons,rangeId){
    switch(true){
      case rangeId >= 200 && rangeId <= 232:
        this.setState({icon: this.weatherIcon.Thunderstorm});
        break;
      case rangeId >= 300 && rangeId <= 321:
        this.setState({icon: this.weatherIcon.Drizzle});
        break;
      case rangeId >= 500 && rangeId <= 531:
        this.setState({icon: this.weatherIcon.Rain});
        break;
      case rangeId >= 600 && rangeId <= 622:
        this.setState({icon: this.weatherIcon.Snow});
        break;
      case rangeId >= 701 && rangeId <= 781:
        this.setState({icon: this.weatherIcon.Atmosphere});
        break;
      case rangeId === 800:
        this.setState({icon: this.weatherIcon.Clear});
        break;
      case rangeId >= 801 && rangeId <= 804:
        this.setState({icon: this.weatherIcon.Clouds});
        break;
      default:
        this.setState({icon: this.weatherIcon.clouds});

    }
  }

  calCelsius(temp){
    let cel = Math.floor(temp - 273.15);
    return cel;
  }

  getWeather = async(e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value; 
    if( city && country ) {
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}`);
    const response= await api_call.json();
    console.log(response);

    this.setState({
      city: `${response.name},${response.sys.country}`,
      lat: response.coord.lat,
      long: response.coord.lon,
      celsius: this.calCelsius(response.main.temp),
      temp_min: this.calCelsius(response.main.temp_min),
      temp_max: this.calCelsius(response.main.temp_max),
      description: response.weather[0].description,
      error: false
    });
      this.get_WeatherIcon(this.weatherIcon,response.weather[0].id);
  }
    else{
      this.setState({error: true});
    }

  };

  render(){
    return(
      <div className="App">
        <h1 className="App-header">  Weather App</h1>
        <Form loadWeather={this.getWeather} error={this.state.error}/>
        <Weather 
        city={this.state.city} 
        country={this.state.country}
        lat={this.state.lat} 
        long={this.state.long}
        temp_celsius={this.state.celsius}
        temp_min={this.state.temp_min}
        temp_max={this.state.temp_max}
        description={this.state.description}
        weatherIcon={this.state.icon}
        />  
      </div>
    );
  }
}


export default App;
