import { Avatar, Dropdown, Layout, Menu } from "antd";
import React from "react";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import useAuth from "../../hooks/useAuth";
import UserApi from "../../Api/UserApi";
import localStore from "../../Util/localStore";
import { useNavigate } from "react-router-dom";

interface Props {
	handleOpenSidebar: () => void;
	handleCloseSidebar: () => void;
	collapsed: boolean;
}

const { Header: HeaderAntd } = Layout;

const Header: React.FC<Props> = ({ handleOpenSidebar, handleCloseSidebar, collapsed }) => {
	const { auth }: any = useAuth();
    let navigate = useNavigate()
	const handleLogout = (): void => {
		UserApi.logout({})
			.then((res) => {
                localStore.removeItem("loginSession")
				localStore.removeItem("loggedUser")
                navigate("/")
            })
			.catch(() => {})
			.finally(() => {});
	};

	const menu = (
		<Menu>
			<Menu.Item key={"1"} onClick={handleLogout}>
				Logout
			</Menu.Item>
		</Menu>
	);

	return (
		<HeaderAntd className="header flex justify-between items-center">
			{collapsed ? (
				<MenuUnfoldOutlined onClick={handleOpenSidebar} />
			) : (
				<MenuFoldOutlined onClick={handleCloseSidebar} />
			)}

			<Dropdown overlay={menu} trigger={["click"]} className="cursor-pointer">
				<Avatar style={{ backgroundColor: "#f56a00", verticalAlign: "middle" }} size="large">
					User
				</Avatar>
			</Dropdown>
		</HeaderAntd>
	);
};

export default Header;
