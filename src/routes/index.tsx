import React from "react"
import { Route, Routes } from "react-router-dom"
import Home from "../Screen/Home"
import { Login } from "../Screen/Login"
import Product from "../Screen/Product"
import RequireAuth from "../Util/RequireAuth"

type Props = {}

const Router = (props: Props) => {
	return (
		<Routes>
			<Route element={<RequireAuth />}>
				<Route path="/" element={<Home />} />
				<Route path={"/login"} element={<Login />} />
				<Route path={"/test"} element={<Product />} />
			</Route>
		</Routes>
	)
}

export default Router
