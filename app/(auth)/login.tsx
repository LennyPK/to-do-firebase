import TextInput from "@/components/TextInput";
import ThemedView from "@/components/ThemedView";
import { useTheme } from "@/hooks/useTheme";
import auth from "@react-native-firebase/auth";
import { useRouter } from "expo-router";
// import {
// 	createUserWithEmailAndPassword,
// 	getAuth,
// 	signInWithEmailAndPassword,
// } from "firebase/auth";
import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { isEmail, isEmpty, isLength } from "validator";

export default function Login() {
	const theme = useTheme();
	const router = useRouter();
	// const auth = getAuth();

	const [email, setEmail] = useState({ value: "", error: "" });
	const [password, setPassword] = useState({ value: "", error: "" });

	const validateEmail = (email: string) => {
		if (!isEmail(email)) return "Email address is invalid.";
		if (isEmpty(email)) return "Email cannot be empty.";
		return "";
	};

	const validatePassword = (password: string, isRegistering: boolean) => {
		if (isEmpty(password)) return "Password cannot be empty.";
		if (isRegistering && !isLength(password, { min: 6 }))
			return "Password must be at least 6 characters long.";
		return "";
	};

	const onLogin = async () => {
		// Error if invalid email or empty value
		const emailError = validateEmail(email.value);
		const passwordError = validatePassword(password.value, false);

		// Show the error and break
		if (emailError || passwordError) {
			setEmail({ ...email, error: emailError });
			setPassword({ ...password, error: passwordError });
			return;
		}

		// Sign in with email and password using firebase auth
		auth()
			.signInWithEmailAndPassword(email.value, password.value)
			.then((userCred) => {
				Alert.alert(
					"Login Success",
					`User signed in with UID: ${userCred.user.uid}`
				);
			})
			.catch((error) => {
				if (error.code === "auth/invalid-email") {
					Alert.alert("Login Error", "The email address is invalid.");
				} else {
					Alert.alert(
						"Login Error",
						"Incorrect email or password. Please check your credentials."
					);
				}
				// Alert.alert("Login Error", error.message);
			});
	};

	const onRegister = () => {
		// Error if invalid email/password or empty value
		const emailError = validateEmail(email.value);
		const passwordError = validatePassword(password.value, true);

		// Show the error and break
		if (emailError || passwordError) {
			setEmail({ ...email, error: emailError });
			setPassword({ ...password, error: passwordError });
			return;
		}

		// Create user with email and password using firebase auth
		auth()
			.createUserWithEmailAndPassword(email.value, password.value)
			.then((userCred) => {
				Alert.alert(
					"Registration Success",
					`User signed in with UID: ${userCred.user.uid}`
				);
			})
			.catch((error) => {
				if (error.code === "auth/invalid-email") {
					Alert.alert(
						"Registration Error",
						"The email address is invalid."
					);
				} else {
					Alert.alert(
						"Registration Error",
						"An unexpected error has occurred. Please try again later."
					);
				}
				// Alert.alert("Registration Error", error.message);
			});
	};

	const onForgotPassword = () => {};

	return (
		<ThemedView style={styles.background}>
			<Text style={{ textAlign: "center" }}>Welcome Back!</Text>

			{/* Email Input */}
			<TextInput
				style={styles.input}
				label="Email"
				returnKeyType="next"
				value={email.value}
				onChangeText={(text) => setEmail({ value: text, error: "" })}
				error={!!email.error}
				errorText={email.error}
				autoCapitalize="none"
				autoComplete="email"
				textContentType="emailAddress"
				keyboardType="email-address"
			/>

			{/* Password Input */}
			<TextInput
				style={styles.input}
				label="Password"
				returnKeyType="done"
				value={password.value}
				onChangeText={(text) => setPassword({ value: text, error: "" })}
				error={!!password.error}
				errorText={password.error}
				secureTextEntry
			/>

			{/* Forgot Password */}
			<View style={styles.forgotPassword}>
				<Button mode="text" onPress={onForgotPassword}>
					Forgot your password?
				</Button>
			</View>

			{/* Login Button */}
			<View style={styles.buttonContainer}>
				<Button
					style={styles.button}
					mode="contained"
					onPress={onLogin}
				>
					LOGIN
				</Button>
			</View>

			{/* Register Button */}
			<View style={styles.buttonContainer}>
				<Button
					style={styles.button}
					mode="contained"
					onPress={onRegister}
				>
					REGISTER
				</Button>
			</View>
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	background: {
		justifyContent: "center",
		alignItems: "center",
	},
	input: {
		paddingHorizontal: 10,
		marginTop: 20,
	},
	forgotPassword: {
		width: "100%",
		paddingHorizontal: 20,
		alignItems: "flex-end",
		marginBottom: 30,
	},
	buttonContainer: {
		width: "100%",
		paddingHorizontal: 20,
		marginBottom: 10,
	},
	button: {
		borderRadius: 5,
	},
	switcher: {
		flexDirection: "row",
		marginTop: 10,
	},
	link: {
		fontWeight: "bold",
	},
});
