import { useTheme } from "@/hooks/useTheme";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";
import { en, registerTranslation } from "react-native-paper-dates";

export default function RootLayout() {
	const theme = useTheme();
	registerTranslation("en", en);

	return (
		<>
			<GestureHandlerRootView style={{ flex: 1 }}>
				<BottomSheetModalProvider>
					<PaperProvider theme={theme}>
						<StatusBar hidden={false} />
						<Stack>
							<Stack.Screen
								name="(tabs)"
								options={{ headerShown: false }}
							/>
							<Stack.Screen name="+not-found" />
						</Stack>
					</PaperProvider>
				</BottomSheetModalProvider>
			</GestureHandlerRootView>
		</>
	);
}
