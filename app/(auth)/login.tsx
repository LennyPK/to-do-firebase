import ThemedView from "@/components/ThemedView";
import { StyleSheet } from "react-native";
import { Text } from "react-native-paper";

export default function Login() {
	return (
		<ThemedView style={styles.background}>
			<Text style={{ textAlign: "center" }}>Hello World</Text>
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	background: {
		justifyContent: "center",
		alignItems: "center",
		height: "100%",
		width: "100%",
	},
	container: {
		width: "100%",
	},
});
