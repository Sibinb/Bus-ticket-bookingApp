import React, { useEffect, useState } from "react";
import "../../styles/admin/admin-sidebar.css";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UnorderedListOutlined,
  LogoutOutlined,
  CarryOutOutlined
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { GET_BUS_DATA, LOG_OUT,USER_ROLE } from "../../redux/actions/types";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/actions/auth/login";

const OwnerSidebar = () => {
  const dispatch=useDispatch();
  const navigate = useNavigate();
  const [page, setpage] = useState("services");
  const { Header, Sider, Content } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  function log_out() {
    console.log("log_out");
    dispatch(logout());
    dispatch({type:GET_BUS_DATA,payload:[]})
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
              key: "services",
              icon: <UnorderedListOutlined />,
              label: "Services",
              onClick: (e) => {
                navigate('/owner/services')
              },
            },
            {
              key: "trips",
              icon: <CarryOutOutlined /> ,
              label: "Trips",
              onClick: (e) => {
                navigate('/owner/trips')
              },
            },
            {
              key: "logout",
              icon: <LogoutOutlined />,
              label: "Logout",
              onClick: (e) => {
                log_out()
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
            <h5 className="text-center d-flex">Owner-Home</h5>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            background: colorBgContainer,
            overflow:'auto',
            maxHeight:'80vh',
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default OwnerSidebar;
