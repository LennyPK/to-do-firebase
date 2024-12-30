import { CalendarDate } from "react-native-paper-dates/lib/typescript/Date/Calendar";

export interface Task {
	id: string;
	name: string;
	due: CalendarDate;
	category: string;
	// createdAt: ;
}
