import {Chat} from "@/modules/chats/chat-types";
import axios from "@/lib/axios"

export async function getChat (userId: number) : Promise<Chat> {
	const res = await axios.get<Chat>(`/chat/${userId}`)
	return res.data
}
