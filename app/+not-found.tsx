import ThemedView from "@/components/ThemedView";
import { Link, Stack, useSegments } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";
import { Text, useTheme } from "react-native-paper";

export default function NotFoundScreen() {
	const theme = useTheme();
	const isAuthenticated = false;
	const authGroup = useSegments()[0] === "(auth)";

	const route = isAuthenticated && authGroup ? "/(app)/(tabs)" : "/login";

	return (
		<>
			<Stack.Screen options={{ title: "Oops! Not Found" }} />
			<ThemedView style={styles.container}>
				<Text>This screen doesn't exist.</Text>
				<Link href="/" style={styles.link}>
					<Text>Go to home screen!</Text>
				</Link>
			</ThemedView>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		padding: 20,
	},
	link: {
		marginTop: 15,
		paddingVertical: 15,
	},
});
