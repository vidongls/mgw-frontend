import { get, startsWith } from "lodash"
import { useLocation, Navigate, Outlet } from "react-router-dom"
import DefaultLayout from "../Component/Layout/Default"
import useAuth from "../hooks/useAuth"
import SecurityService from "./SecurityService"

interface Props {}

// { allowedRoles }
const RequireAuth = ({ allowedRoles, children }: any) => {
	const { auth, setAuth }: any = useAuth()
	const location = useLocation()
	//

	if (!SecurityService.isLogged()) {
		return <Navigate to={"/login"} />
	}

	let component = (
		<DefaultLayout>
			<Outlet />
		</DefaultLayout>
	)

	if (auth?.roles?.find((role: any) => allowedRoles?.includes(role))) {
		// component = <AccessDenied />
	}

	return component
}

export default RequireAuth
