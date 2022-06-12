import { useLocation, Navigate, Outlet } from "react-router-dom"
import DefaultLayout from "../Component/Layout/Default"
import useAuth from "../hooks/useAuth"

interface Props {}

// { allowedRoles }
const RequireAuth = ({ allowedRoles }: any) => {
	const { auth }: any = useAuth()
	const location = useLocation()
	//
	console.log("auth", auth)
	return auth?.user ? (
		<DefaultLayout>
			<Outlet />
		</DefaultLayout>
	) : (
		<Navigate to="/login" state={{ from: location }} replace />
	)
	// auth?.roles?.find((role: any) => allowedRoles?.includes(role)) ? (
	// 	<DefaultLayout>
	// 		<Outlet />
	// 	</DefaultLayout>
	// ) :
}

export default RequireAuth
