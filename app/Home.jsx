import {
  View,
  Text,
  Image,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { theme } from "../theme/index";
import {
  CalendarDaysIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import { MapPinIcon } from "react-native-heroicons/solid";
export default function Home() {
  const [shownSearch, toggleSearch] = React.useState(false);
  const [locations, setLocations] = React.useState([1, 2, 3]);
  const handleLocation = (location) => {
    console.log(location);
  };
  return (
    <View className="flex-1 relative ">
      <StatusBar style="auto" />
      <Image
        blurRadius={60}
        source={require("../assets/images/bg.png")}
        className="w-full absolute h-full"
      />

      <SafeAreaView className="flex flex-1  pt-16">
        {/* Search BAr */}

        <View style={{ height: "7%" }} className="mx-4 relative z-50">
          <View
            className="flex-row justify-end items-center rounded-full "
            style={{
              backgroundColor: shownSearch ? theme.bgWhite(0.2) : "transparent",
            }}
          >
            {shownSearch ? (
              <TextInput
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
                      London, United Kingdom
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
            style={{ fontFamily: "Poppins-Bold" }}
          >
            London,
            <Text
              className=" text-lg text-gray-300"
              style={{ fontFamily: "Poppins-SemiBold" }}
            >
              United Kingdom
            </Text>
          </Text>
          <View className="flex-row justify-center">
            <Image
              source={require("../assets/images/partlycloudy.png")}
              className="w-52 h-52"
            />
          </View>

          {/* Degree Celcius */}

          <View className="space-y-2 ">
            <Text
              className="text-6xl py-4  text-white text-center"
              style={{ fontFamily: "Poppins-SemiBold" }}
            >
              23&#176;
            </Text>
            <Text
              className="text-xl py-4  text-white text-center tracking-widest"
              style={{ fontFamily: "Poppins-Medium" }}
            >
              Partly Cloudy
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
              22km
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
              23%
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
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
}
