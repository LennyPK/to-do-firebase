import { useTheme } from "@/hooks/useTheme";
import { ComponentProps } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { TextInput as Input, Text } from "react-native-paper";

type Props = {
	errorText?: string;
	style?: StyleProp<ViewStyle>;
} & ComponentProps<typeof Input>;

export default function TextInput({ errorText, style, ...inputProps }: Props) {
	const theme = useTheme();
	return (
		<View style={[styles.container, style]}>
			<Input style={styles.input} mode="outlined" {...inputProps} />
			{errorText ? (
				<Text style={[styles.error, { color: theme.colors.error }]}>
					{errorText}
				</Text>
			) : null}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		// flexDirection: "row",
		width: "100%",
		// paddingHorizontal: 40,
		// backgroundColor: "#FFFFFF",
		// alignItems: "center",
	},
	input: {
		marginHorizontal: 10,
		marginTop: 5,
	},
	error: {
		fontSize: 14,
		paddingHorizontal: 10,
		paddingTop: 4,
	},
});
