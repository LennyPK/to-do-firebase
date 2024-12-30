import { CalendarDate } from "react-native-paper-dates/lib/typescript/Date/Calendar";

export function to12HourFormat(hours: number, minutes: number): string {
	const ampm = hours >= 12 ? "PM" : "AM";
	let hours12 = hours % 12;
	if (hours12 === 0) hours12 = 12;
	const hoursFormatted = String(hours12).padStart(2, "0");
	const minutesFormatted = String(minutes).padStart(2, "0");
	return `${hoursFormatted}:${minutesFormatted} ${ampm}`;
}

export function dateFormat(date: CalendarDate): string {
	// Array of weekday names
	const days = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];

	// Extract day, month, and year
	const day = days[date!.getDay()]; // Get the name of the day
	const dd = String(date!.getDate()).padStart(2, "0"); // Ensure two digits for day
	const mm = String(date!.getMonth() + 1).padStart(2, "0"); // Ensure two digits for month (Months are 0-based)
	const yyyy = date!.getFullYear(); // Get full year

	return `${day}, ${dd}/${mm}/${yyyy}`;
}
