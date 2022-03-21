import {
	AppstoreOutlined,
	CloseOutlined,
	DoubleLeftOutlined,
	DoubleRightOutlined,
	DashboardOutlined,
	ThunderboltOutlined,
} from "@ant-design/icons"
import {Image, Layout, Menu} from "antd"
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint"
import React, {useEffect, useState} from "react"
import {Link, useLocation} from "react-router-dom"
import TriggerInImg from "../../resources/images/icon-trigger.png"
import SecurityService from "../../Util/SecurityService"
const { Sider } = Layout
interface IMenuItem {
	key: string
	title: string
	icon: any
	url: string
	permissions: Array<string>
	children?: Array<IMenuItem>
}

interface Props {
	collapsed: boolean
	history: any
	match: any
	showSideBar: boolean
	onShowSideBar: (val: boolean) => void
	onChangeTitle: (val: string) => void
	onCollapsed: (val: boolean) => void
}

export const SideBar = (props: Props) => {
	const [items] = useState<IMenuItem[]>([
		{
			key: "APP",
			title: "Dashboard",
			permissions: [],
			icon: <DashboardOutlined />,
			url: "/apps",
		},

		{
			key: "ADMIN-APP",
			title: "Table",
			permissions: [],
			icon: <AppstoreOutlined />,
			url: "/admin/apps",
		},

		{
			key: "BLACKLIST",
			title: "Table",
			permissions: [],
			icon: <ThunderboltOutlined />,
			url: "/admin/blacklists",
		},
	])

	const [openKeys] = useState<Array<any>>([])
	const [currentKey, setCurrentKey] = useState<Array<string>>(["DASHBOARD"])
	const location = useLocation()
	const { xs } = useBreakpoint()

	useEffect(() => {
		setCurrentKey(["APP"])
		props.onChangeTitle("Quản lí app")

		if (location.pathname.startsWith('/apps')) {
			setCurrentKey(["APP"])
			props.onChangeTitle("Quản lí app")
		}
		else if (location.pathname.startsWith('/admin/apps')) {
			setCurrentKey(["ADMIN-APP"])
			props.onChangeTitle("Quản lí app (Admin)")
		}
		else if (location.pathname.startsWith('/admin/blacklists')) {
			setCurrentKey(["BLACKLIST"])
			props.onChangeTitle("BLACKLIST")
		}
	}, [location, props])

	const isShowItem = (item: IMenuItem) => {
		if (!item.permissions.length) {
			return true
		}

		for (let perm of item.permissions) {
			if (SecurityService.can(perm)) {
				return true
			}
		}

		return false
	}

	const { collapsed } = props

	const renderMenuItem = (item: IMenuItem) => {
		if (isShowItem(item)) {
			if (item.children) {
				return (
					<Menu.SubMenu
						key={item.key}
						className={"sidebar-item-has-children"}
						title={item.title}
						icon={item.icon}
					>
						{item.children.map((childItem) => (
							<Menu.Item
								key={childItem.key}
								className={`_sidebar_menu_${childItem.key.toLowerCase()} ${
									!isShowItem(childItem) ? "d-none" : ""
								}`}
							>
								{item.icon}
								<span className="_link-menu-dashboard sidebar-item">
									<span className="sidebar-item__url">
										<Link className={"sidebar-item__url__a"} to={childItem.url}>
											{childItem.title}
										</Link>
									</span>
								</span>
							</Menu.Item>
						))}
					</Menu.SubMenu>
				)
			} else {
				return (
					<Menu.Item
						key={item.key}
						className={`_sidebar_menu_${item.key.toLowerCase()}`}
						onClick={() => props.onChangeTitle(item.title)}
					>
						{item.icon}
						<span className="_link-menu-dashboard sidebar-item">
							<span className="sidebar-item__url">
								<Link className={"sidebar-item__url__a"} to={item.url}>
									{item.title}
								</Link>
							</span>
						</span>
					</Menu.Item>
				)
			}
		}
	}

	const handleCloseSideBar = () => {
		props.onShowSideBar(false)
		props.onCollapsed(true)
	}

	return (
		<>
			<Sider
				collapsible
				collapsed={collapsed}
				className={`sidebar ${props.showSideBar ? "showed" : ""} ${collapsed ? "width-72" : ""}`}
				trigger={
					!collapsed ? (
						<Image
							preview={false}
							src={TriggerInImg}
							onClick={() => {
								props.onCollapsed(true)
							}}
						/>
					) : null
				}
			>
               
				<div className={`sidebar__trigger-top ${xs ? "closable" : ""}`}>
					{collapsed ? (
						<DoubleRightOutlined onClick={() => props.onCollapsed(false)} />
					) : (
						<>
							<DoubleLeftOutlined onClick={() => props.onCollapsed(true)} />
							{xs && <CloseOutlined onClick={handleCloseSideBar} />}
						</>
					)}
				</div>
				<Menu mode="inline" openKeys={openKeys} selectedKeys={currentKey}>
					{items.map((item) => renderMenuItem(item))}
				</Menu>
			</Sider>
		</>
	)
}

export default SideBar
