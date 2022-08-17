import { notification } from "antd";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import lodash from "lodash";
// import appConfig from '../Config/App';
import localStore from "./localStore";

class ApiClient {
	static instance: AxiosInstance;

	static getInstance = () => {
		// if (!ApiClient.instance) {
			ApiClient.initialize();
		// }
		return ApiClient.instance;
	};

	get = (url: string, config: AxiosRequestConfig) => {
		return ApiClient.getInstance().get(url, config);
	};

	put = (url: string, config: AxiosRequestConfig) => {
		return ApiClient.getInstance().put(url, config);
	};

	post = (url: string, config: AxiosRequestConfig) => {
		return ApiClient.getInstance().post(url, config);
	};

	patch = (url: string, config: AxiosRequestConfig) => {
		return ApiClient.getInstance().patch(url, config);
	};

	delete = (url: string, config: AxiosRequestConfig) => {
		return ApiClient.getInstance().delete(url, config);
	};

	static initialize = () => {
		const instance = axios.create({
			baseURL: "https://mgw-backend-nestjs.herokuapp.com/api/v1/auth/",
		});

		instance.defaults.headers.common["Authorization"] = "Bearer " + localStore.getItem("loginSession");

		instance.defaults.timeout = 30000;

		instance.interceptors.response.use(
			function (response: any) {
				return response;
			}
		);
		ApiClient.instance = instance;

	};
}

const apiClient = ApiClient.getInstance();

export default apiClient;
