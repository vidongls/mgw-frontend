import React, { useContext, useEffect } from "react"
import { Button, Form, Input, Spin, Typography, Divider } from "antd"
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons"
import { useSearchParams } from "react-router-dom"
import loginImg from "../../resources/images/auth-bg.jpg"

import logo from "../../resources/images/logo.svg"

const { Title } = Typography

export const Login = () => {
	const [searchParams] = useSearchParams()

	// useEffect(() => {
	//     localStore.setItem('redirectBackUrl', searchParams.get('redirectBackUrl') || '/');

	//     setTimeout(() => {

	//         // @ts-ignore
	//         window.location.href = appConfig.loginUrl + '?redirect_uri=' + appConfig.authenticationUrl;
	//     }, 1000);
	// })
	const onFinish = (values: any) => {
		console.log("Success:", values)
	}

	const onFinishFailed = (errorInfo: any) => {
		console.log("Failed:", errorInfo)
	}
	return (
		<div className="login">
			<div className="login-wrapper">
				{/* <div className="login-bg">
					<img src={loginImg} alt="" />
				</div> */}
				<div className="login-left">
					<h1>
						Welcome to <span>MGW</span>
					</h1>
					<p>
						Duis aute irure dolor in reprehenderit in voluptate, qui in ea voluptate velit esse, quam
						<br />
						nihil molestiae consequatur, vel illum, obcaecati cupiditate nons.
					</p>
				</div>

				<div className="login-right">
					<div className="login-panel">
						<div className="login-panel__wrapper">
							<div className="login-panel__content">
								<div className="login-panel__header">
									<div className="login-panel__logo">
										<img src={logo} alt="" />
										<div>MGW</div>
									</div>
									<div className="login-panel__sub">Please login to your account.</div>
								</div>
							</div>
							<div className="login-content">
								<Form onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
									<Form.Item name="Mail" rules={[{ required: true, message: "Please input your mail!" }]}>
										<Input size="large" placeholder="Email" prefix={<MailOutlined />} className="login-content__input" />
									</Form.Item>

									<Form.Item name="password" rules={[{ required: true, message: "Please input your password!" }]}>
										<Input.Password size="large" prefix={<LockOutlined />} />
									</Form.Item>

									<Form.Item>
										<Button type="primary" htmlType="submit" className="btn-login">
											Login
										</Button>
									</Form.Item>
								</Form>
							</div>

							<Divider>MGW</Divider>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
