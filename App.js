import React from "react";
import { Alert } from "react-native";
import Loading from "./Loading";
import * as Location from "expo-location";
import axios from "axios";
import Weather from "./Weather";
import API_KEY from "./develop.json";

const KEY = API_KEY.API_KEY;

export default class extends React.Component {
  state = {
    isLoading: true,
  };

  getWeather = async (latitude, longitude) => {
    const url = `http://api.openweathermap.org/data/2.5/weather?appid=${KEY}&units=metric&&lat=${latitude}&lon=${longitude}`;
    const {
      data: {
        main: { temp },
        weather,
        name,
      },
    } = await axios.get(url);

    this.setState({
      isLoading: false,
      temperature: temp,
      condition: weather[0].main,
      location: name,
    });
  };

  getLocation = async () => {
    try {
      await Location.requestPermissionsAsync();
      const location = await Location.getCurrentPositionAsync();
      //console.log(location);
      const {
        coords: { latitude, longitude },
      } = location;

      this.getWeather(latitude, longitude);
    } catch (e) {
      Alert.alert("Err");
    }
  };

  componentDidMount() {
    this.getLocation();
  }
  render() {
    const { isLoading, temperature, condition, location } = this.state;
    return isLoading ? (
      <Loading />
    ) : (
      <Weather
        temperature={Math.round(temperature)}
        condition={condition}
        location={location}
      />
    );
  }
}
