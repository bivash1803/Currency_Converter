import React from "react"; // we also import JSX here. Импортируем из модуля
// где экспортируется один объект
import { SafeAreaView, ScrollView, Linking, Alert } from "react-native"; // Импорт по именам
// SafaAreaView - зона без верхней шторки и нижней. На андроиде работает странно
import { Entypo } from "@expo/vector-icons";
import { RowItem, RowSeparator } from "../components/RowItem";
import colors from "../constants/colors";

// const styles = StyleSheet.create({});

const openLink = url => {
  Linking.openURL(url).catch( () => {
    Alert.alert("Sorry, something went wrong", "Please try again later.")
  })
}

export default () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        <RowItem
          title="Themes"
          onPress={() => alert("Todo!")}
          rightIcon={
            <Entypo name="chevron-right" size={20} color={colors.blue} />
          }
        />

        <RowSeparator />

        <RowItem
          title="Themes"
          onPress={() => openLink("https://learn.reactnativeschool.com/p/react-native-basics-build-a-currency-converter")}
          rightIcon={
            <Entypo name="chevron-right" size={20} color={colors.blue} />
          }
        />

        <RowSeparator />

        <RowItem
          title="Themes"
          onPress={() => openLink("https://reactnativebyexample.com")}
          rightIcon={
            <Entypo name="chevron-right" size={20} color={colors.blue} />
          }
        />
      </ScrollView>
    </SafeAreaView>
  );
};
