import { useLocation, Navigate, Outlet } from "react-router-dom"
import DefaultLayout from "../Component/Layout/Default"
import useAuth from "../hooks/useAuth"

interface Props {}

// { allowedRoles }
const RequireAuth = (props: Props) => {
	const { auth }: any = useAuth()
	const location = useLocation()
	// auth?.roles?.find(role => allowedRoles?.includes(role))
	return (
		<DefaultLayout>
			<Outlet />
		</DefaultLayout>

		// : auth?.user
		//     ? <Navigate to="/unauthorized" state={{ from: location }} replace />
		//     : <Navigate to="/login" state={{ from: location }} replace />
	)
}

export default RequireAuth
