import React , {useState, useEffect} from 'react';
import 'antd/dist/antd.css';
import '../static/css/Login.css';
import { Card, Input, Button, Spin, message } from 'antd';
import {UserOutlined, KeyOutlined} from '@ant-design/icons'
import axios from 'axios'
import  servicePath  from '../config/apiUrl'

function Login(props){

    const [userName , setUserName] = useState('')
    const [password , setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)  

    const checkLogin = () => {
        setIsLoading(true)
        if (!userName) {
            message.error('用户名不能为空')
            return false
        } else if (!password) {
            message.error('密码不能为空')
            return false
        }
        let dataProps = {
            'userName': userName,
            'password': password
        }
        axios({
            method: 'post',
            url: servicePath.checkLogin,
            data: dataProps,
            header:{ 'Access-Control-Allow-Origin':'*' },
            // withCredentials: true
        }).then(
            res => {
                setIsLoading(false)
                if (res.data.data === '登录成功') {
                    props.history.push('/index')
                } else {
                    message.error('用户名密码错误')
                }
            }
        )

        setTimeout(() => {
            setIsLoading(false)
        }, 1000)
    }

    return (
        <div className="login-div">
            <Spin tip="Loading..." spinning={isLoading}>
                <Card title="K1302's Messy Space" bordered={true} style={{ width: 400 }} >
                    <Input
                        id="userName"
                        size="large"
                        placeholder="请输入用户名"
                        prefix={<UserOutlined  style={{color:'rgba(0,0,0,.25)'}} />}
                        onChange={(e)=>{setUserName(e.target.value)}}
                    /> 
                    <br/><br/>
                    <Input.Password
                        id="password"
                        size="large"
                        placeholder="请输入密码"
                        prefix={<KeyOutlined style={{color:'rgba(0,0,0,.25)'}} />}
                        onChange={(e)=>{setPassword(e.target.value)}}
                    />     
                    <br/><br/>
                    <Button type="primary" size="large" block onClick={checkLogin} > 登录 </Button>
                </Card>
            </Spin>
        </div>
    )
}
export default Login