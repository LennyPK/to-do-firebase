import ThemedView from "@/components/ThemedView";
import auth from "@react-native-firebase/auth";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";

export default function One() {
	const onLogout = () => {
		auth().signOut();
	};

	return (
		<ThemedView style={[styles.container]}>
			<Button mode="text" onPress={onLogout}>
				Logout
			</Button>
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	container: {
		justifyContent: "center",
		alignItems: "center",
	},
});
