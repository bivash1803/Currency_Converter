import React, { useContext, useState } from "react";
import { format } from "date-fns";
import {
  View,
  StyleSheet,
  StatusBar,
  Image,
  Dimensions,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";
import { ConversionInput } from "../components/ConversionInput";
import { Button } from "../components/Button";
import colors from "../constants/colors";
import { KeyboardSpacer } from "../components/KeyboardSpacer";
import { ConversionContext } from "../util/ConversionContext";

const screen = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.blue,
    justifyContent: "center",
  },
  content: {
    paddingTop: screen.width * 0.1,
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
  header: {
    alignItems: "flex-end",
    marginHorizontal: 20,
  },
  inputContainer: {
    marginBottom: 10,
  },
});

export default ({ navigation }) => {
  const {
    baseCurrency,
    quoteCurrency,
    swapCurrencies,
    date,
    rates,
    isLoading,
  } = useContext(ConversionContext);

  const [value, setValue] = useState("1");
  const conversionRate = rates[quoteCurrency];

  const [scrollEbabled, setScrollEnabled] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar // не элемент а просто найстройка
        barStyle="light-content"
        backgroundColor={colors.blue}
      />
      <SafeAreaView style={styles.header}>
        <TouchableOpacity onPress={() => navigation.push("Options")}>
          <Entypo name="cog" size={32} color={colors.white} />
        </TouchableOpacity>
      </SafeAreaView>
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
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <>
              <View style={styles.inputContainer}>
                <ConversionInput
                  text={baseCurrency}
                  value={`${value}`} // by default is 1 but we change it when we type
                  onChangeText={(text) => setValue(text)} // we set value
                  onButtonPress={() =>
                    navigation.push("CurrencyList", {
                      title: "Base currency",
                      isBaseCurrency: true,
                    })
                  }
                  keyboardType="numeric"
                />

                <ConversionInput
                  text={quoteCurrency}
                  value={
                    value &&
                    `${(parseFloat(value) * conversionRate).toFixed(2)}`
                  }
                  onButtonPress={() =>
                    navigation.push("CurrencyList", {
                      title: "Quote currency",
                      isBaseCurrency: false,
                    })
                  }
                  editable={false} // отключает ввод
                />
              </View>

              <Text style={styles.text}>
                {`1 ${baseCurrency} = ${conversionRate} ${quoteCurrency} as of ${
                  date && format(new Date(date), "MMMM do, yyyy")
                }`}
              </Text>

              <Button text="reverse" onPress={swapCurrencies} />
            </>
          )}

          <KeyboardSpacer onToggle={(visible) => setScrollEnabled(visible)} />
        </View>
      </ScrollView>
    </View>
  );
};
