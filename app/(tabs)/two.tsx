import ThemedView from "@/components/ThemedView";
import {
	DateTimePickerAndroid,
	DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { Button, Text } from "react-native-paper";

export default function Two() {
	const [date, setDate] = useState<Date>(new Date());

	const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
		if (selectedDate) {
			setDate(selectedDate);
		}
	};

	const showMode = (currentMode: "date" | "time") => {
		DateTimePickerAndroid.open({
			value: date,
			onChange: onDateChange,
			mode: currentMode,
			is24Hour: false,
		});
	};

	const showDatePicker = () => {
		showMode("date");
	};

	const showTimePicker = () => {
		showMode("time");
	};

	return (
		<ThemedView style={styles.container}>
			<Text style={{ textAlign: "center" }}>
				Edit app/(tabs)/two.tsx to edit this screen.
			</Text>
			<Button onPress={showDatePicker}>Show Date Picker</Button>
			<Button onPress={showTimePicker}>Show Time Picker</Button>
			<Text>selected:{date.toLocaleString()}</Text>
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
