import React,{useEffect, useState} from 'react'
import Head from 'next/head'
import Link from 'next/link'
import {Row, Col, List} from 'antd'
import { CalendarOutlined, FolderOutlined, FireOutlined } from '@ant-design/icons'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import axios from 'axios'
import servicePath  from '../config/apiUrl'
import marked from 'marked'
import hljs from "highlight.js";

const Home = (list) => {
  const [ mylist , setMylist ] = useState(list.data);
  const [ myItem , setmyItem ] = useState();

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

  useEffect(() => {
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
      <div>
          <Row className="comm-main" justify="center">
            <Col className="comm-left" xs={24} sm={24} md={18} >
              <List
                  header={<div>最新日志</div>}
                  itemLayout="vertical"
                  dataSource={mylist}
                  renderItem={item => (
                  <List.Item>
                      <div className="list-title" >
                        <Link href={{pathname:'/detailed',query:{id:item.id}}} >
                            <a onClick={()=>{setmyItem(item)}}>{item.title}</a>
                        </Link>
                      </div>
                      <div className="list-icon">
                        <span><CalendarOutlined /> {item.addTime}</span>
                        <span><FolderOutlined /> {item.typeName}</span>
                        <span><FireOutlined /> {item.view_count}</span>
                      </div>
                      <div className="list-context" dangerouslySetInnerHTML={{__html:marked(item.introduce)}}></div>  
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

Home.getInitialProps = async ()=>{
  const promise = new Promise((resolve)=>{
    axios(servicePath.getArticleList).then(
      (res)=>{
        // console.log('远程获取数据结果:',res.data)
        resolve(res.data)
      }
    )
  })

  return await promise
}


export default Home