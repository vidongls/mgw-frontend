import React, { useContext, useEffect } from "react"
import { Button, Form, Input, Spin, Typography } from "antd"

import { useSearchParams } from "react-router-dom"
import appConfig from "../../Config/App"
import localStore from "../../Util/localStore"
import loginImg from "../../resources/images/login-tree.jpg"
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
		<div className="login-layout">
			<div className="header-login">
				<img src={logo} alt="" width={40} />
			</div>
			<div className="login">
				<div className="login-wrapper">
					<div className="login-left">
						<img src={loginImg} alt="loginImg" />
					</div>
					<div className="login-right">
						<div className="login-right__header flex items-center flex-col justify-center">
							<img src={logo} alt="" width={70} />
							<Title level={4}>Chào mừng bạn tới với MGW</Title>
							<p>
								Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi unde nisi asperiores expedita consectetur
								fugiat
							</p>
						</div>
						<Form
							name="basic"
							initialValues={{ remember: true }}
							onFinish={onFinish}
							onFinishFailed={onFinishFailed}
							autoComplete="off"
							className="login-form"
							layout="vertical"
						>
							<Form.Item
								label="Email"
								name="username"
								className="login-form__email"
								rules={[{ required: true, message: "Please input your username!" }]}
							>
								<Input />
							</Form.Item>
							<Form.Item
								label="Mật khẩu"
								name="password"
								className="login-form__password"
								rules={[{ required: true, message: "Please input your password!" }]}
							>
								<Input.Password />
							</Form.Item>
							<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
								<Button type="primary" htmlType="submit">
									Đăng nhập
								</Button>
							</Form.Item>
						</Form>
					</div>
				</div>
			</div>
		</div>
	)
}
