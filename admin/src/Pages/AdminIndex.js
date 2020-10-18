import React,{useState} from 'react';
import { Layout, Menu, Breadcrumb, message} from 'antd';
import {PieChartOutlined, DesktopOutlined, FileOutlined, LogoutOutlined } from '@ant-design/icons'
import { Route } from "react-router-dom";
import AddArticle from './AddArticle'
import ArticleList from './ArticleList'
import '../static/css/AdminIndex.css'
import axios from 'axios'
import  servicePath  from '../config/apiUrl'

const { Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;


function AdminIndex(props){

  const [collapsed,setCollapsed] = useState(false)
  const [title,setTitle] = useState("K1302's Messy Space")

  const onCollapse = collapsed => {
    setCollapsed(collapsed)
    if(!collapsed) {
      setTitle("K1302's Messy Space")
    }else{
      setTitle("")
    }
    
  };

  const handleClickArticle = e=>{
    if(e.key=='addArticle'){
      props.history.push('/index/add')
    }else{
      props.history.push('/index/list')
    }
  }

  return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider  collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <div className="logo">{title}</div>
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="default">
              <PieChartOutlined />
              <span>工作台</span>
            </Menu.Item>
            <SubMenu
              onClick={handleClickArticle}
              title={
                <span>
                  <DesktopOutlined />
                  <span>文章管理</span>
                </span>
              }
            >
              <Menu.Item key="addArticle" >添加文章</Menu.Item>
              <Menu.Item key="listArticle" >文章列表</Menu.Item>

            </SubMenu>

            <Menu.Item key="messageBoard">
              <FileOutlined />
              <span>留言管理</span>
            </Menu.Item>

            <Menu.Item key="logoff" >
              <LogoutOutlined />
              <span>退出登录</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>后台管理</Breadcrumb.Item>
              <Breadcrumb.Item>工作台</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}> 
                <div>
                  <Route path="/index/" exact component={AddArticle} />
                  <Route path="/index/add/" exact component={AddArticle} />
                  <Route path="/index/add/:id" exact component={AddArticle} />
                  <Route path="/index/list/"  component={ArticleList} />
                </div>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>K1302.fun</Footer>
        </Layout>
      </Layout>
    )

}

export default AdminIndex