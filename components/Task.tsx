import { StyleSheet, View } from "react-native";
import { IconButton, Text, useTheme } from "react-native-paper";
import ThemedView from "./ThemedView";

export type TaskProps = {
	text: string;
	onDelete: () => void;
};

export const Task = ({ text, onDelete }: TaskProps) => {
	const theme = useTheme();
	return (
		<ThemedView
			style={[
				styles.task,
				{ backgroundColor: theme.colors.elevation.level5 },
			]}
		>
			<View style={styles.textWrapper}>
				<Text>{text}</Text>
			</View>
			<IconButton icon="delete" iconColor="red" onPress={onDelete} />
		</ThemedView>
	);
};

const styles = StyleSheet.create({
	task: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		borderRadius: 10,
		marginHorizontal: 10,
		marginBottom: 10,
	},
	textWrapper: {
		flex: 1,
		margin: 15,
	},
	text: {
		fontSize: 18,
	},
	delete: {
		color: "red",
	},
});
