import React, { useContext} from "react";
import { StatusBar, FlatList, View, StyleSheet } from "react-native";
import { useSafeArea } from "react-native-safe-area-context";
import { Entypo} from "@expo/vector-icons"

import currencies from "../data/currencies.json";
import colors from "../constants/colors";
import { RowItem, RowSeparator } from "../components/RowItem";
import { ConversionContext } from "../util/ConversionContext";

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.blue
  }
})

export default ({ navigation, route }) => {
  const insets = useSafeArea()

  const params = route.params || {} // if no params set {}
  const { baseCurrency, quoteCurrency, setBaseCurrency, setQuoteCurrency  } = useContext(ConversionContext)

  return (
    <View>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      <FlatList
        data={currencies}
        renderItem={({ item }) => {
          let selected = false
          if (params.isBaseCurrency && baseCurrency === item) {
            selected = true
          } else if(!params.isBaseCurrency && quoteCurrency === item) {
            selected = true
          }
          return (
            <RowItem
              title={item}
              onPress={() => {
                if(params.isBaseCurrency) {
                  setBaseCurrency(item)
                }
                else {
                  setQuoteCurrency(item)
                }
                navigation.pop();
              }}
              rightIcon={
                selected && ( // if selected
                  <View style={styles.icon}>
                    <Entypo name="check" size={20} color={colors.white} />
                  </View>
                )
              }
            />
          );
        }}
        keyExtractor={(item) => item} // установим ключ для динамического списка как саму строку item
        ItemSeparatorComponent={() => <RowSeparator />}
        ListFooterComponent={() => (
          <View style={{ paddingBottom: insets.bottom }} />
        )}
      />
    </View>
  );
};
