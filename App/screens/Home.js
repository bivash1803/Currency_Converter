import React, {useState} from "react";
import { format } from "date-fns";
import {
  View,
  StyleSheet,
  StatusBar,
  Image,
  Dimensions,
  Text,
  ScrollView,
} from "react-native";
import { ConversionInput } from "../components/ConversionInput";
import { Button } from "../components/Button";
import colors from "../constants/colors";
import { KeyboardSpacer } from "../components/KeyboardSpacer";

const screen = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.blue,
    justifyContent: "center",
  },
  content: {
    paddingTop: screen.width * 0.2,
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  logoBackground: {
    width: screen.width * 0.45,
    height: screen.height * 0.45, // это строка ничего не меняет тк мы уже строго ограничили ширину и задали метод отрисовки contain у Image
  },
  logo: {
    position: "absolute",
    width: screen.width * 0.25,
    height: screen.width * 0.25, // это строка ничего не меняет тк мы уже строго ограничили ширину и задали метод отрисовки contain у Image
  },
  textHeader: {
    color: colors.white,
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  text: {
    color: colors.white,
    fontSize: 14,
    textAlign: "center",
  },
});

export default () => {
  const baseCurrency = "USD";
  const quoteCurrency = "GBP";
  const conversionRate = 0.845;
  const date = "2022-10-27";

  const [scrollEbabled, setScrollEnabled] = useState(false);



  return (
    <View style={styles.container}>
      <StatusBar // не элемент а просто найстройка
        barStyle="light-content"
        backgroundColor={colors.blue}
      />
      <ScrollView scrollEnabled={scrollEbabled}>
        <View style={styles.content}>
          <View style={styles.logoContainer}>
            <Image
              style={styles.logoBackground}
              source={require("../assets/images/background.png")} // автоматически подбирает 1х 2х или 3х
              resizeMode="contain"
            />
            <Image
              style={styles.logo}
              source={require("../assets/images/logo.png")} // автоматически подбирает 1х 2х или 3х
              resizeMode="contain" // рассчитать так чтобы вся иконка поместилась и не обрезлать одним из измерений шириной или высотой
            />
          </View>

          <Text style={styles.textHeader}>Currency Converter</Text>

          <ConversionInput
            text={baseCurrency}
            onButtonPress={() => alert("Hi")}
            keyboardType="numeric"
            onChangeText={(text) => console.log("text", text)}
          />

          <ConversionInput
            text={quoteCurrency}
            value="123"
            onButtonPress={() => alert("todo!")}
            editable={false} // отключает ввод
          />

          <Text style={styles.text}>
            {`1 ${baseCurrency} = ${conversionRate} ${quoteCurrency} as of ${format(
              new Date(date),
              "MMMM do, yyyy"
            )}`}
          </Text>

          <Button text="reverse" onPress={() => alert("TODO")} />
          <KeyboardSpacer onToggle={visible => setScrollEnabled(visible)} />
        </View>
      </ScrollView>
    </View>
  );
};
