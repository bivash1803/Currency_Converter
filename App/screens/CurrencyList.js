import React from "react";
import { StatusBar, FlatList, View } from "react-native";
import { useSafeArea } from "react-native-safe-area-context";

import currencies from "../data/currencies.json";
import colors from "../constants/colors";
import { RowItem, RowSeparator } from "../components/RowItem";

export default ({ navigation }) => {
  const insets = useSafeArea();

  return (
    <View>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      <FlatList
        data={currencies}
        renderItem={({ item }) => {
          return (
            <RowItem
              title={item}
              onPress={() => {
                navigation.pop();
              }}
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
