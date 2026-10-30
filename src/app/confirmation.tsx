import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

const Confirmation = () => {
  const { name } = useLocalSearchParams();
  return (
    <View style={styles.container}>
      <Text style={[{ fontSize: 30 }]}>{name}'s account was created!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Confirmation;
