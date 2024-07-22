import { Text, View } from "react-native";
import Home from "./Home";
import { useFonts } from "expo-font";
export default function Index() {
  const [loadFonts] = useFonts({
    poppins: require("../assets/fonts/Poppins-Regular.ttf"),
    "poppins-bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "poppins-semibold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "poppins-medium": require("../assets/fonts/Poppins-Medium.ttf"),
  });
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Home />
    </View>
  );
}
