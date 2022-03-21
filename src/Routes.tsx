import React, { Component } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { AuthenticateRoute } from "./Component/AuthenticateRoute"

import { Authentication } from "./Screen/Authentication"
import { Home } from "./Screen/Home"
import { Login } from "./Screen/Login"

export default class AppRoutes extends Component {
	render() {
		return (
			<BrowserRouter basename={"/"}>
				<Routes>
					<Route
						path="/"
						element={
							// <AuthenticateRoute>
								<Home />
							// </AuthenticateRoute>
						}
					/>
                    <Route path={"/login"} element={<Login />} />
                    <Route path={"/authentication"} element={<Authentication />} />
					{/* <Route path={"/login"} element={<Login />} />
					<Route path={"/logout"} element={<Logout />} />
					<Route path={"/authentication"} element={<Authentication />} />
					<Route path={"*"} element={<Notfound />} /> */}
				</Routes>
			</BrowserRouter>
		)
	}
}
