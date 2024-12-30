import { Task } from "@/components/Task";
import ThemedView from "@/components/ThemedView";
import {
	BottomSheetBackdrop,
	BottomSheetBackdropProps,
	BottomSheetModal,
	BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useRouter } from "expo-router";
import { useCallback, useRef, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { FAB, IconButton, Text, TextInput, useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Home() {
	const router = useRouter();
	const theme = useTheme();
	const bottomSheetRef = useRef<BottomSheetModal>(null);
	const snapPoints = ["50%", "90%"];

	const handlePresentModalPress = useCallback(() => {
		bottomSheetRef.current?.present();
	}, []);
	const handleSheetChanges = useCallback((index: number) => {
		console.log("handleSheetChanges", index);
	}, []);

	const renderBackdrop = useCallback(
		(props: BottomSheetBackdropProps) => (
			<BottomSheetBackdrop
				{...props}
				disappearsOnIndex={-1}
				appearsOnIndex={0}
				pressBehavior="close"
			/>
		),
		[]
	);

	const [isModalVisible, setModalVisible] = useState(false);

	const openEditModal = () => {
		// setModalVisible(true);
		router.push("/(app)/add");
	};
	const hideEditModal = () => {
		setModalVisible(false);
	};

	// ToDo App starts here
	const insets = useSafeAreaInsets();

	const [tasks, setTasks] = useState<string[]>([]);
	const [task, setTask] = useState("");

	// Function to add a new task
	const addTask = () => {
		if (task.trim() !== "") {
			setTasks([...tasks, task]);
			setTask("");
		}
	};

	// Function to delete a task by its index
	const deleteTask = (index: number) => {
		const newTasks = [...tasks];
		newTasks.splice(index, 1);
		setTasks(newTasks);
	};

	return (
		<ThemedView style={[styles.background]}>
			<View style={[styles.container, { marginTop: insets.top }]}>
				{/* ToDo List starts here */}
				{/* Header */}
				<View style={styles.headerContainer}>
					<Text style={styles.header}>To-Do List</Text>
				</View>

				{/* Task Name Input */}
				<View style={styles.inputContainer}>
					<TextInput
						style={styles.input}
						mode="outlined"
						label="Task Name"
						value={task}
						onChangeText={(taskName) => setTask(taskName)}
					/>
					<IconButton icon="plus-circle" onPress={addTask} />
				</View>

				{/* Task List */}
				<ScrollView style={styles.tasksList}>
					{tasks.map((text, index) => (
						<Task
							key={index}
							text={text}
							onDelete={() => deleteTask(index)}
						/>
					))}
				</ScrollView>
			</View>

			{/* FAB add button */}
			<FAB icon="plus" style={styles.fab} onPress={openEditModal} />

			{/* Task Modal */}
			<BottomSheetModal
				ref={bottomSheetRef}
				index={0}
				onChange={handleSheetChanges}
				snapPoints={snapPoints}
				backdropComponent={renderBackdrop}
				backgroundStyle={{ backgroundColor: theme.colors.surface }}
				handleIndicatorStyle={{
					backgroundColor: theme.colors.onSurface,
				}}
			>
				<BottomSheetView style={[styles.modalContainer]}>
					{/* <TextInput style={styles.input} label="Task Name" /> */}
					<Text>Text here</Text>
				</BottomSheetView>
			</BottomSheetModal>
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	background: {
		height: "100%",
		width: "100%",
		// justifyContent: "center",
		alignItems: "center",
	},
	container: {
		width: "100%",
	},
	headerContainer: {
		marginVertical: 20,
		alignItems: "center",
	},
	header: {
		fontSize: 30,
		fontWeight: "bold",
	},
	inputContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginHorizontal: 10,
		marginBottom: 10,
	},
	input: {
		flex: 1,
		width: "100%",
	},
	tasksList: {
		width: "100%",
	},
	fab: {
		position: "absolute",
		margin: 20,
		bottom: 0,
		end: 0,
	},
	modalContainer: {
		flex: 1,
		padding: 36,
		alignItems: "center",
	},
});
