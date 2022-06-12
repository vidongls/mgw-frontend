import React from "react"
import { Route, Routes } from "react-router-dom"
import Home from "../Screen/Home"
import { Login } from "../Screen/Login"
import Product from "../Screen/Product"
import { Register } from "../Screen/Register"
import RequireAuth from "../Util/RequireAuth"

type Props = {}

const Router = (props: Props) => {
	return (
		<Routes>
			<Route element={<RequireAuth  allowedRoles={['customer']}/>}>
				<Route path="/" element={<Home />} />
				<Route path={"/test"} element={<Product />} />
			</Route>
			<Route path={"/login"} element={<Login />} />
			<Route path={"/register"} element={<Register />} />
		</Routes>
	)
}

export default Router
