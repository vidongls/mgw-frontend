import { get } from "lodash"
import { createContext, useEffect, useState } from "react"
import SecurityService from "../Util/SecurityService"

const AuthContext = createContext({})

export const AuthProvider = (props: any) => {
	const [auth, setAuth] = useState({})
	useEffect(() => {
		const Auth = () => {
			const auth = SecurityService.isLogged()
			if (auth) {
				// const user = SecurityService.getUser()
				// setAuth({ user: user, accessToken: auth, role: get(user, "roles") })
			}
		}
        Auth()
	}, [])

	return <AuthContext.Provider value={{ auth, setAuth }}>{props.children}</AuthContext.Provider>
}

export default AuthContext
