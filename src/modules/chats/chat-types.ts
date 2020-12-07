import {User} from "@/modules/users/user-types";

export type Message = {
	Time: Date
	From: string
	FromYou: boolean
}

export type Chat = {
	OtherUser: User,
	Messages: Message[]
}
