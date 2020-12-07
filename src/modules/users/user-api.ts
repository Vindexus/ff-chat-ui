import {LoginResponse, Session, UserResponse} from "@/modules/users/user-types"
import axios from "@/lib/axios"

export async function  getUsers () : Promise<UserResponse> {
	const res = await axios.get('/users')
	return res.data
}

export async function getSession () : Promise<Session> {
	const res = await axios.get('/session')
	return res.data
}

export async function login (data: any) : Promise<LoginResponse> {
	const res = await axios.post('/login', data)
	return res.data
}
