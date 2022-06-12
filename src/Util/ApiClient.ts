import { notification } from "antd"
import axios, { AxiosInstance, AxiosRequestConfig } from "axios"
import lodash from "lodash"
// import appConfig from '../Config/App';
import localStore from "./localStore"

class ApiClient {
	static instance: AxiosInstance

	static getInstance = () => {
		if (!ApiClient.instance) {
			ApiClient.initialize()
		}

		return ApiClient.instance
	}

	get = (url: string, config: AxiosRequestConfig) => {
		return ApiClient.getInstance().get(url, config)
	}

	put = (url: string, config: AxiosRequestConfig) => {
		return ApiClient.getInstance().put(url, config)
	}

	post = (url: string, config: AxiosRequestConfig) => {
		return ApiClient.getInstance().post(url, config)
	}

	patch = (url: string, config: AxiosRequestConfig) => {
		return ApiClient.getInstance().patch(url, config)
	}

	delete = (url: string, config: AxiosRequestConfig) => {
		return ApiClient.getInstance().delete(url, config)
	}

	static initialize = () => {
		const instance = axios.create({
			baseURL: "https://mgw-backend-nestjs.herokuapp.com/api/v2/auth/",
		})

		instance.defaults.headers.common["Authorization"] = "Bearer " + lodash.get(localStore.getJson("loginSession"), "accessToken")
		// instance.defaults.headers.common['X-Tenant'] = lodash.get(localStore.getJson('loggedUser'), 'tenant');

		instance.defaults.timeout = 30000

		instance.interceptors.response.use(
			function (response: any) {
				// Any status code that lie within the range of 2xx cause this function to trigger
				// Do something with response data
				return response
			},
			function (error) {
				// Any status codes that falls outside the range of 2xx cause this function to trigger
				// Do something with response error
				if (lodash.get(error, "response.status") === 401) {
					notification.error({
						message: "Phiên làm việc hết hạn. Vui lòng làm mới trình duyệt",
						key: "TOKEN_EXPIRED",
					})

					if (
						!lodash.startsWith(window.location.pathname, "/login")
						// !lodash.startsWith(window.location.pathname, "/authentication")
					) {
						// setTimeout(() => {
						// 	window.location.href = "/login?redirectBackUrl=" + window.location.href
						// }, 1000)
					}
				} else if (lodash.get(error, "response.status") === 403) {
					notification.error({
						message: "Bạn không có quyền thực hiện thao tác này",
						key: "unauthorized",
					})
				} else if (lodash.get(error, "response.status") >= 500) {
					notification.error({
						message: "Máy chủ gặp sự cố. Vui lòng thử lại sau",
						key: "server_error",
					})
				}

				return Promise.reject(error)
			}
		)

		ApiClient.instance = instance

		// return this.instance;
	}
}

const apiClient = ApiClient.getInstance()

export default apiClient

