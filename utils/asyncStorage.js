import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value); // Store the data
  } catch (error) {
    console.log("Error storing data: ", error);
  }
};

export const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key); // Get the data
    if (value !== null) {
      return value;
    }
  } catch (error) {
    console.log("Error getting data: ", error);
  }
};
