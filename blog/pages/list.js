import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import {Row, Col, List, Breadcrumb } from 'antd'
import { CalendarOutlined, FolderOutlined, FireOutlined } from '@ant-design/icons'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import axios from 'axios'
import servicePath from '../config/apiUrl'
import Link from 'next/link'

const MyList = (list) =>{

  const [mylist, setMylist] = useState(list.data);
  const [myItem , setmyItem ] = useState();
  const [myType , setMyType ] = useState();

  useEffect(() => {
    setMylist(list.data)

    if(myItem!==undefined){
      let data = {}
      data.id = myItem.id
      data.view_count = '' + (parseInt(myItem.view_count) + 1)
      axios({
        url:servicePath.addViewCount,
        data:data,
        method:'post'
      }).then(
        (res)=>{
        }
      )
    }
  })
  
  return (
    <div>
      <Head>
        <link rel="icon" href="/static/k1302.svg" sizes="32x32" />
        <title>K1302</title>
      </Head>
      <Header />
      <Row className="comm-main" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={18}  >
            <div>
              {/* <div className="bread-div">
                <Breadcrumb>
                  <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                  <Breadcrumb.Item>视频列表</Breadcrumb.Item>
                </Breadcrumb>
              </div> */}

              <List
                itemLayout="vertical"
                dataSource={mylist}
                renderItem={item => (
                  <List.Item>
                    <div className="list-title" >
                    <Link href={{ pathname: '/detailed', query: { id: item.id } }}>
                      <a onClick={()=>{setmyItem(item)}}>{item.title}</a>
                    </Link>
                   </div>
                    <div className="list-icon">
                      <span><CalendarOutlined />{item.addTime}</span>
                      <span><FolderOutlined /> {item.typeName}</span>
                      <span><FireOutlined /> {item.view_count}人</span>
                    </div>
                    <div className="list-context">{item.introduce}</div>  
                  </List.Item>
                )}
              />  

            </div>
        </Col>

        <Col className="comm-right" xs={0} sm={0} md={6} >
          <Author />
          <Advert />
        </Col>
      </Row>
      <Footer/>

    </div>
  )
}

MyList.getInitialProps = async (context) => {
  let id = context.query.id
  const promise = new Promise((resolve) => {
    axios(servicePath.getListById +id).then(
      (res) => {
        resolve(res.data)
      }
    )
  })
  return await promise
}

export default MyList
