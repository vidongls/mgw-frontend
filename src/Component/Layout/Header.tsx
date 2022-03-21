import { DownOutlined, LogoutOutlined, MenuOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons"
import { Avatar, Badge, Dropdown, Image, Layout, Menu } from "antd"
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint"
import lodash from "lodash"
import { useState } from "react"
import { Link } from "react-router-dom"
import DefaultAvatarImg from "../../resources/images/avatar.png"
import NotificationImg from "../../resources/images/notify-icon.png"

interface Props {
	collapsed: boolean
	title: string
	toggle: () => void
	onCollapsed: (val: boolean) => void
	onShowSideBar: (val: boolean) => void
}

export const Header: React.FC<Props> = (props) => {
	const [showUserActions, setShowUserActions] = useState(false)

	const renderDropDownUser = () => {
		return (
			<Menu className="user__actions">
				<Menu.Item key="1" icon={<UserOutlined />}>
					<Link to={"/"}>Profile</Link>
				</Menu.Item>
				<Menu.Item key="2" icon={<SettingOutlined />}>
					<Link to={"/"}>Settings</Link>
				</Menu.Item>
				<Menu.Item key="3" icon={<LogoutOutlined />}>
					<Link to={"/logout"}>Thoát</Link>
				</Menu.Item>
			</Menu>
		)
	}

	const { xs } = useBreakpoint()

	const toggleSidBar = () => {
		props.onShowSideBar(true)
		props.onCollapsed(false)
	}

	const handleShowUserActions = () => {
		setShowUserActions(!showUserActions)
	}
	return (
		<Layout.Header className={`header fixed`}>
			<div className="header-inner">
				<div className="header-inner-inner h-100pc">
					<div className="flex items-center toggle-mobile">
						<MenuOutlined className="flex items-center font-size-20" onClick={toggleSidBar} />
					</div>
					<div className="left__header">
						<b className="title">{props.title}</b>
					</div>
					<div className="right-header flr">
						<Link to="/" className="notify">
							<Badge count={5}>
								<Image src={NotificationImg} preview={false} />
							</Badge>
						</Link>
						<div className="line-1 mg-l-26 mg-r-26"></div>
						<span className="user pointer item">
							{xs && showUserActions && renderDropDownUser()}
							{!xs && (
								<Dropdown overlay={renderDropDownUser} className={`user__actions`} placement="bottomCenter">
									<div>{/* {lodash.get(user, "name")} <DownOutlined /> */}</div>
								</Dropdown>
							)}

							<div onClick={handleShowUserActions}>
								{!xs && <Avatar shape="square" size="large" src={DefaultAvatarImg} />}
								{xs && (
									<Dropdown overlay={renderDropDownUser} trigger={["click"]} placement="bottomCenter">
										<Avatar shape="square" size="large" src={DefaultAvatarImg} />
									</Dropdown>
								)}
							</div>
						</span>
					</div>
				</div>
			</div>
		</Layout.Header>
	)
}
