import { StyleSheet } from "react-native";
export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
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
});
