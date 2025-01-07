import { useTheme } from "@/hooks/useTheme";
import {
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	StyleSheet,
	TouchableWithoutFeedback,
	useColorScheme,
	View,
	ViewProps,
} from "react-native";

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
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
		>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<View
					style={[
						{ backgroundColor: backgroundColor },
						style,
						styles.container,
					]}
					{...props}
				/>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
		width: "100%",
		height: "100%",
	},
});
