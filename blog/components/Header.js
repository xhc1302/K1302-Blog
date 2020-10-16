import React, { useState, useEffect } from 'react'
import Router from 'next/router'
import axios from 'axios'
import { HomeOutlined } from '@ant-design/icons'
import  servicePath  from '../config/apiUrl'
import { Row, Col, Menu } from 'antd'
import '../styles/components/header.css'

const Header = (props) => {
    const [navArray , setNavArray] = useState([])
    useEffect(()=>{
        const fetchData = async ()=>{
            await axios(servicePath.getTypeInfo).then(
                (res)=>{
                    setNavArray(res.data.data)
                }
            )
        }
        fetchData()
    },[])

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
            <Row type="flex" justify="center">
                <Col xs={24} sm={24} md={13}>
                    <span className="header-logo">K1302</span>
                    <span className="header-txt">Don't say so much。</span>
                </Col>

                <Col className="memu-div" xs={0} sm={0} md={11}>
                    <Menu  mode="horizontal" onClick={handleClick}>
                        <Menu.Item key="home" icon={<HomeOutlined />}>
                            首页
                        </Menu.Item>
                        {
                            navArray.map((item) => {
                                return (
                                    <Menu.Item key={item.id} >
                                        {item.typeName}
                                    </Menu.Item>
                                )
                            })
                        }
                    </Menu>
                </Col>
            </Row>
        </div>
    </div>
    )
}

export default Header