import React from "react";
import { StyleSheet, View, Text, StatusBar } from "react-native";
import PropTypes from "prop-types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const weatherConditions = {
  Thunderstorm: {
    iconName: "weather-lightning",
    colors: ["#373b44", "#4286f4"],
    title: "Thunderstorm",
    subTitle: "번개번개",
  },
  Drizzle: {
    iconName: "weather-pouring",
    colors: ["#757f9a", "#928dab"],
    title: "Drizzle",
    subTitle: "이슬비",
  },
  Rain: {
    iconName: "weather-pouring",
    colors: ["#1f1c2c", "#928dab"],
    title: "Rain",
    subTitle: "비가 주륵주륵",
  },
  Snow: {
    iconName: "snowflake",
    colors: ["#c9d6ff", "#cfdef3"],
    title: "Snow",
    subTitle: "눈이 송송",
  },
  Clear: {
    iconName: "weather-sunny",
    colors: ["#2980b9", "#6dd5fa", "#ffffff"],
    title: "Clear",
    subTitle: "깨끗하고 맑은 하늘",
  },
  Clouds: {
    iconName: "weather-cloudy",
    colors: ["#c9d6ff", "#cfdef3"],
    title: "Clouds",
    subTitle: "구름이 뭉게뭉게",
  },
  Others: {
    iconName: "weather-hail",
    colors: ["#4DA0B0", "#D39D38"],
    title: "Others",
    subTitle: "What?",
  },
};

export default function Weather({ temperature, condition, location }) {
  const getWeatherConditions = (condition, field) => {
    return weatherConditions[condition]
      ? weatherConditions[condition][field]
      : weatherConditions["Others"][field];
  };

  return (
    <LinearGradient
      colors={getWeatherConditions(condition, "colors")}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />
      <View style={styles.halfContainer}>
        <MaterialCommunityIcons
          name={getWeatherConditions(condition, "iconName")}
          size={130}
          color="white"
        />
        <Text style={styles.temperature}>{temperature}º</Text>
      </View>
      <View style={{ ...styles.halfContainer, ...styles.textContainer }}>
        <Text style={styles.title}>
          {getWeatherConditions(condition, "title")}
        </Text>
        <Text style={styles.subTitle}>{location}은</Text>
        <Text style={styles.subTitle}>
          {getWeatherConditions(condition, "subTitle")}
        </Text>
      </View>
    </LinearGradient>
  );
}

Weather.propTypes = {
  temperature: PropTypes.number.isRequired,
  condition: PropTypes.oneOf([
    "Thunderstorm",
    "Drizzle",
    "Rain",
    "Snow",
    "Mist",
    "Smoke",
    "Haze",
    "Dust",
    "Fog",
    "Sand",
    "Dust",
    "Ash",
    "Squall",
    "Tornado",
    "Clear",
    "Clouds",
  ]).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  halfContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  temperature: {
    fontSize: 36,
    color: "white",
  },
  textContainer: {
    paddingHorizontal: 20,
    alignItems: "flex-start",
  },
  title: {
    fontSize: 45,
    color: "white",
    fontWeight: "300",
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 30,
    color: "white",
    fontWeight: "600",
  },
});
