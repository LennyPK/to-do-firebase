import ThemedView from "@/components/ThemedView";
import {
	BottomSheetBackdrop,
	BottomSheetBackdropProps,
	BottomSheetModal,
	BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useRouter } from "expo-router";
import { useCallback, useRef, useState } from "react";
import { StyleSheet } from "react-native";
import { Button, FAB, Text, TextInput, useTheme } from "react-native-paper";

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
		setModalVisible(true);
	};
	const hideEditModal = () => {
		setModalVisible(false);
	};

	return (
		<ThemedView style={[styles.container]}>
			<Text style={{ textAlign: "center" }}>
				Edit app/(tabs)/index.tsx to edit this screen.
			</Text>
			<Button onPress={handlePresentModalPress}>Present Modal</Button>
			<FAB icon="plus" style={styles.fab} onPress={openEditModal} />

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
					<TextInput style={styles.input} label="Task Name" />
				</BottomSheetView>
			</BottomSheetModal>
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	fab: {
		position: "absolute",
		margin: 20,
		bottom: 0,
		end: 0,
	},
	input: {
		marginBottom: 10,
		width: "100%",
	},
	modalContainer: {
		flex: 1,
		padding: 36,
		alignItems: "center",
	},
});
