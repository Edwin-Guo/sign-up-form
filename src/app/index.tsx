import { Text, View, StyleSheet } from "react-native";
import SignupForm from "../../components/SignupForm";


export default function Index() {
  return (
    <View style={styles.container}>
      <SignupForm />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
