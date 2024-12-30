import { MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useColorScheme } from "react-native";
import { Text, useTheme } from "react-native-paper";

export default function TabLayout() {
	const scheme = useColorScheme();
	const theme = useTheme();
	// const inactiveBackground =

	return (
		<Tabs
			initialRouteName="index"
			screenOptions={{
				headerShown: false,
				tabBarInactiveBackgroundColor: theme.colors.elevation.level3,
				tabBarInactiveTintColor: theme.colors.onBackground,
				tabBarActiveBackgroundColor: theme.colors.primaryContainer,
				tabBarActiveTintColor: theme.colors.onPrimaryContainer,
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Home",
					tabBarIcon: ({ color, focused }) => (
						<MaterialIcons name="home-filled" color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="one"
				options={{
					title: "One",
					tabBarIcon: ({ color, focused }) => (
						<Text style={{ color: color }}>1</Text>
					),
				}}
			/>
			<Tabs.Screen
				name="two"
				options={{
					title: "Two",
					tabBarIcon: ({ color, focused }) => (
						<Text style={{ color: color }}>2</Text>
					),
				}}
			/>
			<Tabs.Screen
				name="three"
				options={{
					title: "Three",
					tabBarIcon: ({ color, focused }) => (
						<Text style={{ color: color }}>3</Text>
					),
				}}
			/>
		</Tabs>
	);
}
