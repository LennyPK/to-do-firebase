import { useTheme } from "@/hooks/useTheme";
import { useColorScheme, View, ViewProps } from "react-native";

export type ThemedViewProps = ViewProps & {
	overrideLight?: string;
	overrideDark?: string;
};

export default function ThemedView({
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
			style={[{ backgroundColor: backgroundColor }, style]}
			{...props}
		/>
	);
}
