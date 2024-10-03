import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderRadius: 6,
    borderColor: "rgba(0, 0, 0, 0.11)"
  },
  screen: {
    padding: 10,
    display: "flex",
    gap: 8,
  },
  authScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  authForm: {
    padding: 18,
    display: "flex",
    gap: 8,
    width: "100%"
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  }
})