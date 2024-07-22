import {
  View,
  Text,
  Image,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { theme } from "../theme/index";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
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
      </SafeAreaView>
    </View>
  );
}
