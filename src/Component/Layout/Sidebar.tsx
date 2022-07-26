import React, { useEffect, useState } from "react"
import {
	UploadOutlined,
	UserOutlined,
	VideoCameraOutlined,
	CloseOutlined,
	AppstoreOutlined,
	DashboardOutlined,
	ThunderboltOutlined,
} from "@ant-design/icons"
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint"
import logo from "../../resources/images/logo.svg"
import { Layout, Menu } from "antd"
import { Link, useLocation } from "react-router-dom"

interface Props {
	collapsed: boolean
	setCollapsed: (val: boolean) => void
	handleCloseSidebar: () => void
}

const { Sider } = Layout

const Sidebar = ({ collapsed, setCollapsed, handleCloseSidebar }: Props) => {
	const [openKeys, setOpenKeys] = useState<string[]>([""])
	const { xs, sm } = useBreakpoint()
	const location = useLocation()

	useEffect(() => {
		switch (location.pathname) {
			case "/":
				setOpenKeys([location.pathname])
				break

			default:
				break
		}
	}, [location])

	const handleChangeKey = (e: any) => {
		console.log(e.keyPath)
		setOpenKeys(e.keyPath)
	}
    
	const menuList = [
		{
			name: "Dashboard",
			path: "/",
		},
		{
			name: "Test",
			path: "/test",
		},
	]

	const childrenMenu = (
		<>
			{menuList.map((item) => (
				<Menu.Item key={item.path} icon={<UserOutlined />}>
					<Link to={item.path}>{item.name}</Link>
				</Menu.Item>
			))}
		</>
	)

	return (
		<Sider
			breakpoint="lg"
			collapsedWidth={xs ? "0" : undefined}
			// collapsible={!xs && true}
			trigger={null}
			collapsed={collapsed}
			className={`sidebar ${xs && "sidebar-mobile"} ${xs ? (!collapsed ? "expand" : "") : "collapsed"}`}
		>
			{xs && (
				<div className="flex justify-between menu-collapse items-center">
					<div className="logo">
						<img src={logo} alt="logo" /> MGW
					</div>
					<div className="flexitems-center" onClick={handleCloseSidebar}>
						<CloseOutlined />
					</div>
				</div>
			)}
			{sm && (
				<div className="logo">
					<img src={logo} alt="logo" />
				</div>
			)}

			<Menu theme="light" mode="inline" selectedKeys={openKeys} onClick={handleChangeKey}>
				{childrenMenu}
			</Menu>
		</Sider>
	)
}

export default Sidebar
