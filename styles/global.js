import { SIZES } from "../constants";
import { StyleSheet } from "react-native";
export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    // backgroundColor: "#fff",
  },
  titleText: {
    margin: 5,
    // fontFamily: "Nunito_700Bold",
    fontSize: 18,
    color: "#333",
  },
  paragraph: {
    marginVertical: 8,
    lineHeight: 20,
  },
  input: {
    borderColor: "#eee",
    borderBottomWidth: 1,
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
    marginTop: 10,
    marginBottom: 10,
  },
  errorText: {
    color: "crimson",
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 6,
    textAlign: "center",
  },
  centerContext: {
    flexDirection: "column",
    justifyContent: "center",
  },
  centerItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  h1: {
    fontWeight: "bold",
    fontSize: SIZES.h1,
    textTransform: "uppercase",
    textAlign: "center"
  },
  h2: {
    fontWeight: "bold",
    fontSize: SIZES.h2,
    textTransform: "uppercase",
    textAlign: "center"
  },
  h3: {
    fontWeight: "bold",
    fontSize: SIZES.h3,
    textTransform: "uppercase",
    textAlign: "center",
    color : "#fff"
  },
  h4: {
    fontWeight: "bold",
    fontSize: SIZES.h4,
    textTransform: "uppercase",
    textAlign: "center"
  },
  body1: {
    fontSize: SIZES.body1,
  },
  body2: {
    fontSize: SIZES.body2,
  },
  body3: {
    fontSize: SIZES.body3,
  },
  body4: {
    fontSize: SIZES.body4,
  },
});
