import React, { useState } from "react";
import { Button, Form, Input, Divider, notification } from "antd";
import { Link, useNavigate } from "react-router-dom";

import logo from "../../resources/images/logo.svg";
import UserApi from "../../Api/UserApi";

interface IUser {
	email: string;
	firstName: string;
	lastName: string;
	password: string;
	re_password?: string;
}

export const Register = () => {
	let navigate = useNavigate();

	const [loading, setLoading] = useState(false);
	// useEffect(() => {
	//     localStore.setItem('redirectBackUrl', searchParams.get('redirectBackUrl') || '/');

	//     setTimeout(() => {

	//         // @ts-ignore
	//         window.location.href = appConfig.loginUrl + '?redirect_uri=' + appConfig.authenticationUrl;
	//     }, 1000);
	// })

	const onFinish = (values: IUser) => {
		setLoading(true);
        delete values.re_password
		UserApi.register(values)
			.then((res) => {
				navigate("/login");
				notification.success({ message: "Đăng ký thành công!" });
			})
			.catch((err) => {
				notification.error({ message: "Đăng ký thất bại!" });
			})
			.finally(() => {
				setLoading(false);
			});
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log("Failed:", errorInfo);
	};

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

				<div className="login-right register">
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
								<Form onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off" layout="vertical">
									<Form.Item
										label="FirstName"
										name="firstName"
										rules={[{ required: true, message: "Please input your FirstName!" }]}
									>
										<Input size="large" placeholder="FirstName" className="login-content__input" />
									</Form.Item>
									<Form.Item
										label="LastName"
										name="lastName"
										rules={[{ required: true, message: "Please input your LastName!" }]}
									>
										<Input size="large" placeholder="LastName" className="login-content__input" />
									</Form.Item>
									<Form.Item
										label="Email"
										name="email"
										rules={[{ required: true, message: "Please input your mail!" }]}
									>
										<Input size="large" placeholder="Email" className="login-content__input" />
									</Form.Item>

									<Form.Item
										label="Password"
										name="password"
										rules={[
											// {
											// 	min: 6,
											// 	message: "Tu 6 ky tu",
											// },
											{
												required: true,
												message: "Please input your password!",
											},
											{
												pattern: new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})"),
												message: `Sai cmn dinh dang`,
											},
										]}
									>
										<Input.Password size="large" placeholder="Password" />
									</Form.Item>

									<Form.Item
										label="Retype password"
										name="re_password"
										dependencies={["password"]}
										rules={[
											{
												required: true,
												message: "Required",
											},
											({ getFieldValue }) => ({
												validator(_, value) {
													if (!value || getFieldValue("password") === value) {
														return Promise.resolve();
													}
													return Promise.reject(new Error("Pass khong trung"));
												},
											}),
										]}
									>
										<Input.Password placeholder={"Nhap lai pass"} />
									</Form.Item>

									<Form.Item>
										<Button type="primary" htmlType="submit" className="btn-login" loading={loading}>
											Register
										</Button>
									</Form.Item>
								</Form>
							</div>
							<Link to={"/login"}>Login</Link>
							<Divider>MGW</Divider>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
