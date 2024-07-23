import {
  View,
  Text,
  Image,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useCallback, useEffect } from "react";
import { fetchLocations, fetchForecast } from "../api/weather";
import { StatusBar } from "expo-status-bar";
import { theme } from "../theme/index";
import * as Progress from "react-native-progress";
import {
  CalendarDaysIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import { MapPinIcon } from "react-native-heroicons/solid";
import { debounce } from "lodash";
import { weatherImages } from "@/constants";
export default function Home() {
  const [shownSearch, toggleSearch] = React.useState(false);
  const [locations, setLocations] = React.useState([]);
  const [weather, setWeather] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const handleLocation = (location) => {
    // console.log(location);
    setLocations([]);
    toggleSearch(false);
    setLoading(true);
    fetchForecast({ cityName: location.name, days: "7" }).then((data) => {
      setWeather(data);
      setLoading(false);
    });
  };

  const handleSearch = (value) => {
    if (value.length > 2) {
      fetchLocations({ cityName: value }).then((data) => {
        setLocations(data);
      });
    }
  };
  const handleTextDebounce = useCallback(debounce(handleSearch, 1200), []);
  const { current, location } = weather;

  useEffect(() => {
    fetchMyWeather();
  }, []);

  const fetchMyWeather = async () => {
    fetchForecast({ cityName: "Gujrat", days: "7" }).then((data) => {
      setWeather(data);
      setLoading(false);
    });
  };

  return (
    <View className="flex-1 relative ">
      <StatusBar style="auto" />
      <Image
        blurRadius={60}
        source={require("../assets/images/bg.png")}
        className="w-full absolute h-full"
      />
      {loading ? (
        <View className="flex-1 flex-row justify-center items-center">
          <Progress.CircleSnail size={140} thickness={10} color="#0bb3b2" />
        </View>
      ) : (
        <SafeAreaView className="flex flex-1  pt-16">
          {/* Search BAr */}

          <View style={{ height: "7%" }} className="mx-4 relative z-50">
            <View
              className="flex-row justify-end items-center rounded-full "
              style={{
                backgroundColor: shownSearch
                  ? theme.bgWhite(0.2)
                  : "transparent",
              }}
            >
              {shownSearch ? (
                <TextInput
                  onChangeText={handleTextDebounce}
                  placeholder="Search City"
                  placeholderTextColor={"lightgray"}
                  className="flex-1 pl-6 h-10 text-base text-white"
                  style={{ fontFamily: "Poppins" }}
                />
              ) : null}

              <TouchableOpacity
                onPress={() => toggleSearch(!shownSearch)}
                style={{ backgroundColor: theme.bgWhite(0.3) }}
                className="p-3 m-1 rounded-full"
              >
                <MagnifyingGlassIcon size={25} color={"white"} />
              </TouchableOpacity>
            </View>

            {/* Suggested Locations */}

            {locations.length > 0 && shownSearch ? (
              <View className=" absolute w-full bg-gray-300 top-16 rounded-3xl">
                {locations.map((location, index) => {
                  let showenBorder = index + 1 != locations.length;
                  let borderClass = showenBorder
                    ? "border-b-2 border-b-gray-400"
                    : "";
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        handleLocation(location);
                      }}
                      key={index}
                      className={
                        "flex-row items-center border-0 p-3 px-4 mb-1  " +
                        borderClass
                      }
                    >
                      <MapPinIcon size={20} color={"gray"} />
                      <Text
                        style={{ fontFamily: "Poppins" }}
                        className="text-black text-lg ml-2"
                      >
                        {location?.name},{location?.country}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            ) : null}
          </View>

          {/* Forcaste Section */}
          <View className="mx-4 flex justify-around flex-1 mb-2">
            {/* Location */}
            <Text
              className="text-center text-white text-2xl "
              style={{ fontFamily: "Poppins-SemiBold" }}
            >
              {location?.name},
              <Text
                className=" text-xl text-gray-300"
                style={{ fontFamily: "Poppins-Medium" }}
              >
                {" " + location?.country}
              </Text>
            </Text>
            <View className="flex-row justify-center">
              <Image
                source={
                  weatherImages[current?.condition?.text] || weatherImages.other
                }
                className="w-52 h-52"
              />
            </View>

            {/* Degree Celcius */}

            <View className="space-y-2 ">
              <Text
                className="text-6xl py-4  text-white text-center"
                style={{ fontFamily: "Poppins-SemiBold" }}
              >
                {current?.temp_c}&#176;
              </Text>
              <Text
                className="text-xl py-4  text-white text-center tracking-widest"
                style={{ fontFamily: "Poppins-Medium" }}
              >
                {current?.condition?.text}
              </Text>
            </View>
          </View>
          {/* Other Stats */}

          <View className="flex-row justify-between mx-4">
            <View className="flex-row space-x-2 items-center">
              <Image
                source={require("../assets/icons/wind.png")}
                className="h-6 w-6"
              />
              <Text
                className="text-white text-base"
                style={{ fontFamily: "Poppins-SemiBold" }}
              >
                {current?.wind_kph}km
              </Text>
            </View>
            <View className="flex-row space-x-2 items-center">
              <Image
                source={require("../assets/icons/drop.png")}
                className="h-6 w-6"
              />
              <Text
                className="text-white text-base"
                style={{ fontFamily: "Poppins-SemiBold" }}
              >
                {current?.humidity}%
              </Text>
            </View>
            <View className="flex-row space-x-2 items-center">
              <Image
                source={require("../assets/icons/sun.png")}
                className="h-6 w-6"
              />
              <Text
                className="text-white text-base"
                style={{ fontFamily: "Poppins-SemiBold" }}
              >
                6:05 AM
              </Text>
            </View>
          </View>

          {/* Forcast for Next Days */}

          <View className="mb-2 space-y-3">
            <View className="flex-row items-center space-x-2 mx-5">
              <CalendarDaysIcon size={22} color="white" />
              <Text className="text-white text-base">Daily forcast</Text>
            </View>
            <ScrollView
              horizontal
              contentContainerStyle={{ paddingHorizontal: 15 }}
              showsHorizontalScrollIndicator={false}
            >
              {weather.forecast?.forecastday.map((day, index) => {
                let date = new Date(day.date);
                let options = { weekday: "long" };
                let dayName = date.toLocaleDateString("en-US", options);
                return (
                  <View
                    key={index}
                    className="justify-center items-center flex w-24 rounded-3xl py-3 space-y-1 mr-4"
                    style={{ backgroundColor: theme.bgWhite(0.15) }}
                  >
                    <Image
                      source={
                        weatherImages[day?.day?.condition?.text] ||
                        weatherImages.other
                      }
                      className="w-11 h-11"
                    />
                    <Text className="text-white">{dayName}</Text>
                    <Text
                      className="text-white text-xl"
                      style={{ fontFamily: "Poppins-SemiBold" }}
                    >
                      {day?.day?.avgtemp_c}&#176;
                    </Text>
                  </View>
                );
              })}

              {/* <View
                  className="justify-center items-center flex w-24 rounded-3xl py-3 space-y-1 mr-4"
                  style={{ backgroundColor: theme.bgWhite(0.15) }}
                >
                  <Image
                    source={require("../assets/images/heavyrain.png")}
                    className="w-11 h-11"
                  />
                  <Text className="text-white">Monday</Text>
                  <Text
                    className="text-white text-xl"
                    style={{ fontFamily: "Poppins-SemiBold" }}
                  >
                    13&#176;
                  </Text>
                </View>
                <View
                  className="justify-center items-center flex w-24 rounded-3xl py-3 space-y-1 mr-4"
                  style={{ backgroundColor: theme.bgWhite(0.15) }}
                >
                  <Image
                    source={require("../assets/images/heavyrain.png")}
                    className="w-11 h-11"
                  />
                  <Text className="text-white">Monday</Text>
                  <Text
                    className="text-white text-xl"
                    style={{ fontFamily: "Poppins-SemiBold" }}
                  >
                    13&#176;
                  </Text>
                </View>
                <View
                  className="justify-center items-center flex w-24 rounded-3xl py-3 space-y-1 mr-4"
                  style={{ backgroundColor: theme.bgWhite(0.15) }}
                >
                  <Image
                    source={require("../assets/images/heavyrain.png")}
                    className="w-11 h-11"
                  />
                  <Text className="text-white">Monday</Text>
                  <Text
                    className="text-white text-xl"
                    style={{ fontFamily: "Poppins-SemiBold" }}
                  >
                    13&#176;
                  </Text>
                </View>
                <View
                  className="justify-center items-center flex w-24 rounded-3xl py-3 space-y-1 mr-4"
                  style={{ backgroundColor: theme.bgWhite(0.15) }}
                >
                  <Image
                    source={require("../assets/images/heavyrain.png")}
                    className="w-11 h-11"
                  />
                  <Text className="text-white">Monday</Text>
                  <Text
                    className="text-white text-xl"
                    style={{ fontFamily: "Poppins-SemiBold" }}
                  >
                    13&#176;
                  </Text>
                </View> */}
            </ScrollView>
          </View>
        </SafeAreaView>
      )}
    </View>
  );
}
