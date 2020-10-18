import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import {Row, Col, List, Breadcrumb, Spin } from 'antd'
import { CalendarOutlined, FolderOutlined, FireOutlined, FileOutlined, RightOutlined } from '@ant-design/icons'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import axios from 'axios'
import servicePath from '../config/apiUrl'
import Link from 'next/link'
import marked from 'marked'
import hljs from "highlight.js";
import CountUp from 'react-countup'

const MyList = (list) =>{

  const [mylist, setMylist] = useState(list.data);
  const [ loading,setLoading] =useState(false);
  const [ type,setType] =useState();

  const goLoading= ()=>{
    setLoading(true)
  }

  const renderer = new marked.Renderer();
  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    sanitize:false,
    xhtml: false,
    highlight: function (code) {
      return hljs.highlightAuto(code).value;
    }

  }); 

  useEffect(()=>{
    setMylist(list.data)
    // if(list.data[0] !== undefined) {
    //   setType(list.data[0].typeName)
    // }
  })
  
  return (
    <div>
      <Head>
        <title>K1302</title>
        <meta name="description" content="K1302's Messy Place"></meta>
        <link rel="icon" href="/static/k1302.svg" sizes="32x32" type="image/x-icon" />
      </Head>
      <Header />
      <Row className="comm-main" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={18}  >
            <div>
              {/* <div className="bread-div">
                <Breadcrumb>
                  <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                  <Breadcrumb.Item>{type}</Breadcrumb.Item>
                </Breadcrumb>
              </div> */}

              <List
                itemLayout="vertical"
                dataSource={mylist}
                renderItem={item => (
                  <List.Item>
                    <Spin spinning={loading}>
                        <div className="list-title" >
                        <Link href={{ pathname: '/detailed', query: { id: item.id } }}>
                          <a onClick={goLoading}>{item.title}</a>
                        </Link>
                      </div>
                        <div className="list-icon">
                          <span><CalendarOutlined />{item.addTime}</span>
                          <span><FolderOutlined /> {item.typeName}</span>
                          <span><FireOutlined /> <CountUp end={item.view_count}/>人</span>
                        </div>
                        <div className="list-context" 
                             dangerouslySetInnerHTML={{__html:marked(item.introduce)}}>
                        </div>  
                        <div className="list-go">
                            <FileOutlined />
                            <span  onClick={goLoading} >&nbsp;
                              <Link href={{pathname:'/detailed',query:{id:item.id}}} >
                                <a>查看全文 <RightOutlined /></a>
                              </Link>
                            </span>
                        </div>
                    </Spin>
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
