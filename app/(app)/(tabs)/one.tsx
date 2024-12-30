import ThemedView from "@/components/ThemedView";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import DateTimePicker, { DateType } from "react-native-ui-datepicker";

export default function One() {
	const [date2, setDate2] = useState<DateType | undefined>();

	return (
		<ThemedView style={[styles.container]}>
			<Text style={{ textAlign: "center" }}>
				Edit app/(tabs)/one.tsx to edit this screen.
			</Text>
			<DateTimePicker
				mode="single"
				date={date2}
				onChange={(params: { date: DateType }) => setDate2(params.date)}
				timePicker={true}
				timePickerDecelerationRate={10}
			/>
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});
