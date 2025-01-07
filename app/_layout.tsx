import ThemedView from "@/components/ThemedView";
import { useTheme } from "@/hooks/useTheme";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ActivityIndicator, PaperProvider } from "react-native-paper";
import { en, registerTranslation } from "react-native-paper-dates";

export default function RootLayout() {
	registerTranslation("en", en);
	const theme = useTheme();
	const router = useRouter();
	const segments = useSegments();

	const [initializing, setInitializing] = useState(true);
	const [user, setUser] = useState<FirebaseAuthTypes.User | null>();

	const onAuthStateChanged = (user: FirebaseAuthTypes.User | null) => {
		console.log("onAuthStateChanged", user);
		setUser(user);
		if (initializing) setInitializing(false);
	};

	useEffect(() => {
		const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
		return subscriber;
	}, []);

	useEffect(() => {
		if (initializing) return;
		const inHomeGroup = segments[0] === "(app)";

		if (user && !inHomeGroup) {
			router.replace("/(app)/(tabs)");
		} else if (!user && inHomeGroup) {
			router.replace("/(auth)/login");
		}
	});

	const isAuthenticated = auth().currentUser?.uid != null;
	// const isAuthenticated = false;
	const authGroup = segments[0] === "(auth)";

	// useEffect(() => {
	// 	if (!initializing) {
	// 		if (isAuthenticated && authGroup) {
	// 			router.replace("/(app)/(tabs)");
	// 		} else if (!isAuthenticated && !authGroup) {
	// 			router.replace("/(auth)/login");
	// 		}
	// 	}
	// });

	if (initializing)
		return (
			<ThemedView
				style={{
					backgroundColor: theme.colors.background,
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<StatusBar hidden={false} />
				<ActivityIndicator
					color={theme.colors.primary}
					size={"large"}
				/>
			</ThemedView>
		);

	return (
		<>
			<GestureHandlerRootView style={{ flex: 1 }}>
				<BottomSheetModalProvider>
					<PaperProvider theme={theme}>
						<StatusBar hidden={false} />
						<Stack>
							<Stack.Screen
								name="(app)"
								options={{ headerShown: false }}
							/>
							{/* <Stack.Screen
								name="(app)/add"
								options={{ headerShown: false }}
							/> */}

							<Stack.Screen
								name="(auth)/login"
								options={{ headerShown: false }}
							/>

							<Stack.Screen
								name="+not-found"
								options={{ headerShown: false }}
							/>
						</Stack>
					</PaperProvider>
				</BottomSheetModalProvider>
			</GestureHandlerRootView>
		</>
	);
}
