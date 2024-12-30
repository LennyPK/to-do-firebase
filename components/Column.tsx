import { useTheme } from "@/hooks/useTheme";
import { useColorScheme, View } from "react-native";
import { ThemedViewProps } from "./ThemedView";

export default function Column({
	style,
	overrideLight,
	overrideDark,
	...props
}: ThemedViewProps) {
	const colorScheme = useColorScheme();
	const { colors } = useTheme();

	const overrideColor = colorScheme === "dark" ? overrideDark : overrideLight;

	const backgroundColor = overrideColor || colors.background;

	return (
		<View
			style={[
				{
					// flex: 1,
					flexDirection: "column",
					backgroundColor: backgroundColor,
				},
				style,
			]}
			{...props}
		/>
	);
}
