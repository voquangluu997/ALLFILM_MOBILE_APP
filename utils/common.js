import AsyncStorage from "@react-native-async-storage/async-storage";

export const getUser = async () => {
  const userStr = await AsyncStorage.getItem("user");
  if (userStr) return JSON.parse(userStr);
  else return null;
};

export const getToken = () => {
  return AsyncStorage.getItem("token") || null;
};

export const setUserSession = (token, user) => {
  AsyncStorage.setItem("token", token);
  AsyncStorage.setItem("user", JSON.stringify(user));
};

export const removeUserSession = () => {
  AsyncStorage.removeItem("token");
  AsyncStorage.removeItem("user");
};
