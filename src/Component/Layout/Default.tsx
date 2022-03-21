import { Layout, Spin } from "antd"
import React, { useState } from "react"
import DocumentTitle from "react-document-title"

import DefaultPropsInterface from "../../Interfaces/DefaultPropsInterface"
import SecurityService from "../../Util/SecurityService"
import { Header } from "./Header"
import SideBar from "./Sidebar"
import logo from "../../resources/images/logo.svg"

const { Content, Footer } = Layout

export const DefaultLayout: React.FC<DefaultPropsInterface> = (props) => {
	const [loading] = useState(false)
	const [collapsed, setCollapsed] = useState(true)
	const [showSideBar, setShowSideBar] = useState(false)
	const [title, setTitle] = useState("M29 Project")

	const toggle = () => {
		setCollapsed(!collapsed)
	}

	const onCollapsed = (collapsed: boolean) => {
		setCollapsed(collapsed)
	}

	const onShowSideBar = (val: boolean) => {
		setShowSideBar(val)
	}

	const handleChangeTitle = (title: string) => {
		setTitle(title)
	}

	return (
		<DocumentTitle title={props.hasOwnProperty("title") && props.title !== undefined ? props.title : "M29"}>
			<Layout className={"main-layout"}>
				{
					<SideBar
						collapsed={collapsed}
						history={props.history}
						match={props.match}
						onCollapsed={onCollapsed}
						showSideBar={showSideBar}
						onShowSideBar={onShowSideBar}
						onChangeTitle={handleChangeTitle}
					/>
				}
				<Layout>
					<Header
						title={title}
						collapsed={collapsed}
						toggle={toggle}
						{...props}
						onCollapsed={onCollapsed}
						onShowSideBar={onShowSideBar}
					/>
					<Content className={"main-content h-100pc"}>
						<div className={loading ? "loading-container h-100pc" : "main-inner h-100pc"}>
							<Spin tip={"Đang tải..."} spinning={loading} className={"h-100pc"}>
								{props.children}
							</Spin>
						</div>
					</Content>
					<Footer className="footer">
						<div className="flex justify-center">
							<div className="logo-mgw">
								<img src={logo} alt="logo" />
							</div>{" "}
							Powered By MGW.
						</div>
					</Footer>
				</Layout>
			</Layout>
		</DocumentTitle>
	)
}

export default DefaultLayout
