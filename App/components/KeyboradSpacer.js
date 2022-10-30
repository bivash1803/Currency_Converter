import React, { useState, useEffect } from "react";
import { View, StyleSheet, Keyboard, Dimensions, Platform } from "react-native";

const styles = StyleSheet.create({
  container: {
    top: 0,
    left: 0,
    bottom: 0,
  },
});

export const KeyboardSpacer = ({ style, onToggle = () => null }) => {
  const [keyboardSpace, setKeyboardSpace] = useState(0);

  useEffect(() => {
    // useEffect выполняется при рендеринге страницы и выполняет функцию в return после выхода с экрана

    const updateKeyboardSpace = (event) => {
      if (!event.endCordinates) {
        return;
      }
      const screenHeight = Dimensions.get("screen").height;
      const newKeyboardSpace = screenHeight - event.endCordinates.screenY;
      setKeyboardSpace(newKeyboardSpace);
      onToggle(true, newKeyboardSpace);
    };
    const showEvt =
      Platform.OS === "android" ? "keyboardDidShow" : "keyboardWillShow";
    const showListener = Keyboard.addListener(showEvt, updateKeyboardSpace);

    const resetKeyboardSpace = () => {
      setKeyboardSpace(0);
      onToggle(false, 0);
    };
    const hideEvt =
      Platform.OS === "android" ? "keyboradDidHide" : "keyboardWillHide";
    const hideListener = Keyboard.addListener(hideEvt, resetKeyboardSpace);

    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, []); // [] - это зависимости, задают когда активироваться помимо рендера

  return <View style={[styles.container, { height: keyboardSpace }, style]} />;
};
