import ThemedView from "@/components/ThemedView";
import { useCallback, useState } from "react";
import { StyleSheet } from "react-native";
import { Button, Text } from "react-native-paper";
import { DatePickerModal, TimePickerModal } from "react-native-paper-dates";
import { CalendarDate } from "react-native-paper-dates/lib/typescript/Date/Calendar";

export default function Three() {
	const [date, setDate] = useState<CalendarDate>(new Date());
	const [open, setOpen] = useState(false);

	const onDismissSingle = useCallback(() => {
		setOpen(false);
	}, [setOpen]);

	const onConfirmSingle = useCallback(
		(params: { date: CalendarDate }) => {
			setOpen(false);
			setDate(params.date);
		},
		[setOpen, setDate]
	);

	const [visible, setVisible] = useState<boolean>(false);
	const onDismiss = useCallback(() => {
		setVisible(false);
	}, [setVisible]);

	const onConfirm = useCallback(
		({ hours, minutes }: { hours: number; minutes: number }) => {
			setVisible(false);
			console.log({ hours, minutes });
		},
		[setVisible]
	);

	return (
		<ThemedView style={styles.container}>
			<Text style={{ textAlign: "center" }}>
				Edit app/(tabs)/three.tsx to edit this screen.
			</Text>
			<Button
				onPress={() => setOpen(true)}
				uppercase={false}
				mode="outlined"
			>
				Pick Date
			</Button>
			<Button
				onPress={() => setVisible(true)}
				uppercase={false}
				mode="outlined"
			>
				Pick time
			</Button>

			<DatePickerModal
				locale="en"
				mode="single"
				visible={open}
				onDismiss={onDismissSingle}
				date={date}
				onConfirm={onConfirmSingle}
			/>

			<TimePickerModal
				visible={visible}
				onDismiss={onDismiss}
				onConfirm={onConfirm}
				hours={12}
				minutes={14}
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
