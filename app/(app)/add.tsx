import ThemedView from "@/components/ThemedView";
import { dateFormat, to12HourFormat } from "@/utils/dateTime";
import { Task } from "@/utils/Task";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Alert, BackHandler, StyleSheet, View } from "react-native";
import { Appbar, Button, Text, TextInput } from "react-native-paper";
import { DatePickerModal, TimePickerModal } from "react-native-paper-dates";
import { CalendarDate } from "react-native-paper-dates/lib/typescript/Date/Calendar";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Add() {
	const router = useRouter();
	const currentDate = new Date();

	const [date, setDate] = useState<CalendarDate>(currentDate);
	const [time, setTime] = useState<{
		hours: number;
		minutes: number;
	}>({ hours: currentDate.getHours(), minutes: currentDate.getMinutes() });

	const [openDatePicker, setOpenDatePicker] = useState(false);
	const [openTimePicker, setOpenTimePicker] = useState<boolean>(false);

	const onDismissSingle = useCallback(() => {
		setOpenDatePicker(false);
	}, [setOpenDatePicker]);

	const onConfirmSingle = useCallback(
		(params: { date: CalendarDate }) => {
			setOpenDatePicker(false);
			setDate(params.date);
		},
		[setOpenDatePicker, setDate]
	);

	const onDismiss = useCallback(() => {
		setOpenTimePicker(false);
	}, [setOpenTimePicker]);

	const onConfirm = useCallback(
		({ hours, minutes }: { hours: number; minutes: number }) => {
			setOpenTimePicker(false);
			setTime({ hours, minutes });
			// console.log({ hours, minutes });
		},
		[setOpenTimePicker]
	);

	// Page starts here
	const insets = useSafeAreaInsets();

	const defaultTask: Task = {
		id: "",
		name: "",
		due: new Date(),
		category: "", //,createdAt:Date()
	};
	const [task, setTask] = useState<Task>(defaultTask);

	const onBackPress = () => {
		if (task.name.trim() !== "") {
			Alert.alert(
				"Discard Changes?",
				"You have unsaved changes. Are you sure you want to go back?",
				[
					{ text: "Cancel", onPress: () => null, style: "cancel" },
					{ text: "Discard", onPress: () => router.back() },
				]
			);
			return true;
		}
		router.back();
		return true;
	};

	useEffect(() => {
		const backHandler = BackHandler.addEventListener(
			"hardwareBackPress",
			onBackPress
		);
		return () => backHandler.remove();
	}, [task]);

	return (
		<ThemedView style={styles.background}>
			<View style={[styles.container, { marginTop: insets.top }]}></View>
			{/* Header */}
			<Appbar.Header style={{ width: "100%" }}>
				<Appbar.BackAction
					onPress={() => {
						onBackPress();
					}}
				/>
				<Appbar.Content title="Create Task" />
			</Appbar.Header>

			{/* Task Name Input */}
			<View style={styles.inputContainer}>
				<TextInput
					style={styles.input}
					mode="outlined"
					label="Task Name"
					value={task.name}
					onChangeText={(taskName: string) => {
						setTask((prevTask) => ({
							...prevTask,
							name: taskName,
						}));
					}}
				/>
			</View>

			{/* Date */}
			<View style={styles.timestampContainer}>
				<Text style={styles.timestampText}>{dateFormat(date)}</Text>
				<Button
					style={styles.button}
					onPress={() => setOpenDatePicker(true)}
					uppercase={false}
					mode="outlined"
				>
					Change Date
				</Button>
			</View>

			{/* Time */}
			<View style={styles.timestampContainer}>
				<Text style={styles.timestampText}>
					{to12HourFormat(time.hours, time.minutes)}
				</Text>
				<Button
					style={styles.button}
					onPress={() => setOpenTimePicker(true)}
					uppercase={false}
					mode="outlined"
				>
					Change Time
				</Button>
			</View>

			<DatePickerModal
				locale="en"
				mode="single"
				visible={openDatePicker}
				onDismiss={onDismissSingle}
				date={date}
				onConfirm={onConfirmSingle}
			/>

			<TimePickerModal
				visible={openTimePicker}
				onDismiss={onDismiss}
				onConfirm={onConfirm}
				// hours={startTime?.hours}
				// minutes={startTime?.minutes}
				animationType="none"
			/>
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	background: {
		height: "100%",
		width: "100%",
		alignItems: "center",
	},
	container: {
		width: "100%",
		// justifyContent: "center",
		// alignItems: "center",
		// padding: 20,
	},
	inputContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginHorizontal: 10,
		marginBottom: 10,
	},
	input: {
		flex: 1,
		// width: "100%",
	},
	timestampContainer: {
		// width: "100%",
		flexDirection: "row",
		alignItems: "center",
		marginHorizontal: 10,
	},
	timestampText: {
		flex: 1,
	},
	timestampButton: {},
	button: {
		marginBottom: 10,
	},
});
