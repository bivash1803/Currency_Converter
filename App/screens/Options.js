import React from "react"; // we also import JSX here. Импортируем из модуля
// где экспортируется один объект
import { SafeAreaView} from "react-native"; // Импорт по именам
// SafaAreaView - зона без верхней шторки и нижней. На андроиде работает странно
import { Entypo } from "@expo/vector-icons";
import { RowItem, RowSeparator } from "../components/RowItem";
import colors from "../constants/colors";

// const styles = StyleSheet.create({});

export default () => {
  return (
    <SafeAreaView>
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
        onPress={() => alert("Todo!")}
        rightIcon={
          <Entypo name="chevron-right" size={20} color={colors.blue} />
        }
      />

      <RowSeparator />

      <RowItem
        title="Themes"
        onPress={() => alert("Todo!")}
        rightIcon={
          <Entypo name="chevron-right" size={20} color={colors.blue} />
        }
      />
    </SafeAreaView>
  )
}
