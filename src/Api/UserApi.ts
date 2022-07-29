import { RegisterCommand } from "../Command/RegisterCommand";
import apiClient from "../Util/ApiClient";
import localStore from "../Util/localStore";

export default class UserApi {
	static register = (data: RegisterCommand) => {
		return apiClient.post("/register", data);
	};

	static login = (data: any) => {
		return apiClient.post("/login", data);
	};

	static logout = (data: any) => {
		let config = {
			headers: {
				Authorization: "Bearer " + localStore.getItem("loginSession"),
			},
		};

		return apiClient.post("/logout", data, config);
	};
}
