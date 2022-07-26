import { RegisterCommand } from "../Command/RegisterCommand"
import apiClient from "../Util/ApiClient"

export default class UserApi {
	static register = (data: RegisterCommand) => {
		return apiClient.post("/register", data)
	}

    static login = (data: any) => {
		return apiClient.post("/login", data)
	}

    static logout = (data: any) => {
		return apiClient.post("/logout", data)
	}
}
