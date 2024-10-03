import React from 'react'
import { StyleProp, TouchableOpacity, ViewStyle, StyleSheet, Text } from 'react-native';

type Props = {
  onPress: () => void
  children: React.ReactNode | string,
  disabled?: boolean
  style?: StyleProp<ViewStyle>
}

function Button({ onPress, children, disabled }: Props) {
  return (
    <TouchableOpacity
      style={!disabled ? styles.button : {
        ...styles.button,
        ...styles.disabled
      }}
      onPress={onPress}
      disabled={disabled}>
      <Text style={styles.text}>
        { children }
      </Text>
    </TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create({
  button: {
    borderRadius: 6,
    padding: 8,
    backgroundColor: "rgb(47, 48, 55)",
    borderColor: "rgb(47, 48, 55)",
    borderWidth: 1,
    fontSize: 14,
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "rgba(0, 0, 0, 0.07)",
    shadowOffset: {
      height: 1,
      width: 1
    },
    shadowRadius: 5
  },
  disabled: {
    opacity: 0.4,
    borderColor: "rgba(47, 48, 55, 0.5)",
  },
  text: {
    color: "white",
    fontWeight: "bold",
    display: "flex",
    gap: 2,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  }
});