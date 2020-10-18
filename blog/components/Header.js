import React from 'react'
import Router from 'next/router'
import Link from 'next/link'
import { HomeOutlined, AppstoreOutlined, UserOutlined ,DollarCircleOutlined } from '@ant-design/icons'
import { Row, Col, Menu } from 'antd'
import '../styles/components/header.css'

const Header = () => {

    //跳转到列表页
   const handleClick = (e)=>{
        if(e.key==='home'){
            Router.push('/')
        }else{
            Router.push('/list?id='+e.key)
        }
    }
    return (
    <div className="header">
        <div className="header-center">
            <Row justify="center">
                <Col xs={24} sm={24} md={13}>
                    <span className="header-logo">
                        <Link href={{pathname:'/'}}>
                            <a>K1302</a>
                        </Link>
                    </span>
                    <span className="header-txt">Don't say so much</span>
                </Col>

                <Col className="memu-div" xs={0} sm={0} md={11}>
                    <Menu  mode="horizontal" onClick={handleClick}>
                        <Menu.Item key="home" icon={<HomeOutlined />}>
                            首页
                        </Menu.Item>
                        <Menu.Item key="0" icon={<AppstoreOutlined />}>
                            大杂烩
                        </Menu.Item>
                        <Menu.Item key="1" icon={<UserOutlined />}>
                            他人之长
                        </Menu.Item>
                        <Menu.Item key="2" icon={<DollarCircleOutlined />}>
                            白日梦
                        </Menu.Item>
                    </Menu>
                </Col>
            </Row>
        </div>
    </div>
    )
}

export default Header