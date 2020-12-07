import axios from "axios"
import {getCookie, setCookie} from "@/lib/cookies";

const settings = {
	baseURL: process.env.VUE_APP_API_URL,
	withCredentials: true,
}

const api = axios.create(settings)

const jwt = getCookie('jwt')
api.defaults.headers['Authorization'] = jwt

export default api

export function setJWT(jwt: string) {
	setCookie('jwt', jwt)
	api.defaults.headers['Authorization'] = jwt
}
