import React, { useEffect, useState } from "react";
import "../../styles/admin/admin-sidebar.css";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UnorderedListOutlined,
  UserOutlined,
  UsergroupAddOutlined,
  LogoutOutlined
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { LOG_OUT,USER_ROLE } from "../../redux/actions/types";
import { useDispatch } from "react-redux";

const AdminSideBar = () => {
  const dispatch=useDispatch();
  const navigate = useNavigate();
  const [page, setpage] = useState("user");
  const { Header, Sider, Content } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  function logout() {
    dispatch({type:LOG_OUT,payload:"LOGOUT"})
    navigate('/home')
    dispatch({type:USER_ROLE,payload:"user"})
  }
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  useEffect(() => {
    navigate(page);
  }, [page]);

  return (
    <Layout style={{ minHeight: "100vh", padding: "0px" }}>
      <Sider trigger={null} collapsible collapsed={collapsed} style={{paddingTop:'7%'}}>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "user",
              icon: <UserOutlined />,
              label: "User",
              onClick: (e) => {
                setpage(e.key);
              },
            },
            {
              key: "owner",
              icon: <UsergroupAddOutlined />,
              label: "Owners",
              onClick: (e) => {
                setpage(e.key);
              },
            },
            {
              key: "request",
              icon: <UnorderedListOutlined />,
              label: "Requests",
              onClick: (e) => {
                setpage(e.key);
              },
            },
            {
              key: "logout",
              icon: <LogoutOutlined />,
              label: "Logout",
              onClick: (e) => {
                logout();
              },
            },
          ]}
          style={{margin:'3% 0px'}}
        />
      </Sider>
      <Layout className="site-layout" style={{ padding: "10px" }}>
        <Header
          className="row"
          style={{ padding: 0, background: colorBgContainer }}
        >
          <div className="col-1">
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: () => setCollapsed(!collapsed),
              }
            )}
          </div>
          <div className="col-11 justify-content-center d-flex align-items-center">
            <h5 className="text-center d-flex">AdminHome</h5>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            background: colorBgContainer,
            overflow:'auto'
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminSideBar;
