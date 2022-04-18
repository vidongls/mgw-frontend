import { Layout } from "antd"
import React from "react"
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons"

interface Props {
	handleOpenSidebar: () => void
	handleCloseSidebar: () => void
	collapsed: boolean
}

const { Header: HeaderAntd } = Layout

const Header: React.FC<Props> = ({ handleOpenSidebar, handleCloseSidebar, collapsed }) => {
	return (
		<HeaderAntd className="header">
			{collapsed ? <MenuUnfoldOutlined onClick={handleOpenSidebar} /> : <MenuFoldOutlined onClick={handleCloseSidebar} />}
		</HeaderAntd>
	)
}

export default Header
