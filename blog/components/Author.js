import {Avatar,Divider,Tooltip} from 'antd'
import { WechatOutlined, QqOutlined, GithubOutlined } from '@ant-design/icons'
import '../styles/components/author.css'

const Author =()=>{

    return (
        <div className="author-div comm-box">
            <div> <Avatar size={140} src="/static/tuxiang.jpg"  /></div>
            <div className="author-introduction">
                低级搬砖程序员，靠敲代码养家糊口。志向是开一家面馆。此地维权无门，此时无能为力，此心随波逐流。
                <Divider >社交账号</Divider>
                <Tooltip title="假的 :doge ( :">
                    <Avatar size={28} className="account" ><GithubOutlined /></Avatar>
                </Tooltip>
                <Tooltip title="假的 :doge ( :">
                    <Avatar size={28} className="account" ><QqOutlined /></Avatar>
                </Tooltip>
                <Tooltip title="假的 :doge ( :">
                    <Avatar size={28} className="account" ><WechatOutlined /></Avatar>
                </Tooltip>
            </div>
        </div>
    )

}

export default Author