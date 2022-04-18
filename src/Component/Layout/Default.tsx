import { Layout, Menu } from "antd"
import React, { useState } from "react"
import Header from "./Header"
import Sidebar from "./Sidebar"

interface Props {
	children: React.ReactChild
}

const { Content } = Layout

const DefaultLayout = (props: Props) => {
	const [collapsed, setCollapsed] = useState(false)

	const handleOpenSidebar = () => {
		setCollapsed(false)
	}

	const handleCloseSidebar = () => {
		setCollapsed(true)
	}

	return (
		<Layout className="layout">
			<Sidebar collapsed={collapsed} setCollapsed={setCollapsed} handleCloseSidebar={handleCloseSidebar} />

			<Layout>
                <Header handleOpenSidebar={handleOpenSidebar} handleCloseSidebar={handleCloseSidebar} collapsed={collapsed} />
                <Content>{props.children}</Content>
            </Layout>
		</Layout>
	)
}

export default DefaultLayout
