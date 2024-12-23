import React from "react";
import { View } from "react-native";
import { Modal, TextInput } from "react-native-paper";

type Props = {
	isVisible: boolean;
};

export default function BottomSheet({ isVisible }: Props) {
	return (
		<Modal visible={isVisible}>
			<View>
				<TextInput label="Task Name"></TextInput>
				<TextInput label="Task Name"></TextInput>
			</View>
		</Modal>
	);
}
