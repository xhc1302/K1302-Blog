import React,{useEffect, useState} from 'react'
import Head from 'next/head'
import Link from 'next/link'
import {Row, Col, List, Affix, Spin } from 'antd'
import { CalendarOutlined, FolderOutlined, FireOutlined, FileOutlined, RightOutlined} from '@ant-design/icons'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import axios from 'axios'
import servicePath  from '../config/apiUrl'
import marked from 'marked'
import hljs from "highlight.js";
import CountUp from 'react-countup'

const Home = (res) => {
  const [ mylist , setMylist ] = useState(res.data);
  const [ loading , setLoading ] = useState(false);

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

  const goLoading= ()=>{
    setLoading(true)
  }

  return (
    <div>
      <Head>
        <title>K1302</title>
        <meta name="description" content="K1302's Messy Place"></meta>
        <link rel="icon" href="/static/k1302.svg" sizes="32x32" type="image/x-icon" />
      </Head>
      <Affix offsetTop={0}>
        <Header />
      </Affix>
      
      <div>
          <Row className="comm-main" justify="center">
            <Col className="comm-left" xs={24} sm={24} md={18} >
              <List
                  header={<div>最新日志</div>}
                  itemLayout="vertical"
                  dataSource={mylist}
                  renderItem={item => (
                  <List.Item>
                      <Spin spinning={loading}>
                          <div className="list-title" >
                            <Link href={{pathname:'/detailed',query:{id:item.id}}} >
                                <a onClick={goLoading}>{item.title}</a>
                            </Link>
                          </div>
                          <div className="list-icon">
                            <span><CalendarOutlined /> {item.addTime}</span>
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
            </Col>

            <Col className="comm-right" xs={0} sm={0} md={6} >
              <Author />
              <Advert />
            </Col>
          </Row>
      </div>
      
    <Footer />
    </div>
  )
}

Home.getInitialProps = async (context)=>{

  let date=new Date();
  let time=date.getMonth()+1 + '/' + date.getDate() + ' ' +
           date.getHours() + ':' + date.getMinutes()+ ':' + date.getSeconds()
  console.log('----->' + time + ':visit the Index page')
  const promise = new Promise((resolve)=>{
    axios(servicePath.getArticleList).then(
      (res)=>{
        resolve(res.data)
      }
    )
  })

  return await promise
}


export default Home