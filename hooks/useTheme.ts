import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { MD3DarkTheme, MD3LightTheme } from "react-native-paper";

export function useTheme() {
	const colorScheme = useColorScheme();

	const customTheme =
		colorScheme === "dark"
			? {
					...MD3DarkTheme,
					colors: { ...MD3DarkTheme.colors, ...Colors.dark },
			  }
			: {
					...MD3LightTheme,
					colors: { ...MD3LightTheme.colors, ...Colors.light },
			  };

	return customTheme;
}
