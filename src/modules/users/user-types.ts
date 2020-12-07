export type User = {
	Id: number
	Username: string
}

export type UserResponse = {
	Users: User[]
}

export type Session =  {
	LoggedIn: boolean
	UserId: number | null
}

export type LoginResponse = {
	jwt: string
}
