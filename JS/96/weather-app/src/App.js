
import './App.css';
import React, { Component } from 'react';
import Weather from './weather';

const key = ;

export default class App extends Component {

  state = {
    temp: "",
    loc: ""
  }


  componentDidMount() {
    getWeather(11218).then((x) => {
      this.setState({ temp: x.main.temp });
      this.setState({ loc: x.name });

    })

  }
  render() {
    return (
      <Weather temp={this.state.temp} loc={this.state.loc} />
    );
  }
}

async function getWeather(zip) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${key}&units=imperial&lang=en`);
    const weatherData = await response.json();

    return weatherData;
  }
  catch (e) {
    return "Weather not available";
  }
}


