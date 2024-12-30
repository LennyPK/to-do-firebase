import { useTheme } from "@/hooks/useTheme";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";
import { en, registerTranslation } from "react-native-paper-dates";

export default function RootLayout() {
	registerTranslation("en", en);

	const router = useRouter();
	const theme = useTheme();
	const isAuthenticated = true;
	const authGroup = useSegments()[0] === "(auth)";

	useEffect(() => {
		if (isAuthenticated && authGroup) {
			router.replace("/(app)/(tabs)");
		} else if (!isAuthenticated && !authGroup) {
			router.replace("/(auth)/login");
		}
	});

	return (
		<>
			<GestureHandlerRootView style={{ flex: 1 }}>
				<BottomSheetModalProvider>
					<PaperProvider theme={theme}>
						<StatusBar hidden={false} />
						<Stack>
							<Stack.Screen
								name="(app)/(tabs)"
								options={{ headerShown: false }}
							/>
							<Stack.Screen
								name="(app)/add"
								options={{ headerShown: false }}
							/>

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
