'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body='hi home index'
  }

  async getArticleList(){

    let sql = 'SELECT article.id as id,'+
              'article.title as title,'+
              'article.introduce as introduce,'+
              "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime,"+
              'article.view_count as view_count ,'+
              '.type.typeName as typeName '+
              'FROM article LEFT JOIN type ON article.type_id = type.Id order by article.id desc'
 
     const results = await this.app.mysql.query(sql)
 
     this.ctx.body={
         data:results
     }
  }

  async getArticleById(){
    //先配置路由的动态传值，然后再接收值
    let id = this.ctx.params.id

    let sql1 = "UPDATE article SET view_count = (view_Count+1) WHERE id ="+id 
    let updateResult = await this.app.mysql.query(sql1);
    const updateSuccess = updateResult.affectedRows === 1
    if(updateSuccess){
      let sql2 = 'SELECT article.id as id,'+
      'article.title as title,'+
      'article.introduce as introduce,'+
      'article.article_content as article_content,'+
      "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime,"+
      'article.view_count as view_count ,'+
      'type.typeName as typeName ,'+
      'type.id as typeId '+
      'FROM article LEFT JOIN type ON article.type_id = type.Id '+
      'WHERE article.id='+id

      let result = await this.app.mysql.query(sql2)
      this.ctx.body={data:result}
    }else{
      this.ctx.body={data:'view_count更新错误'} 
    }
  }

  //得到类别名称和编号
  // async getTypeInfo(){
  //   const result = await this.app.mysql.select('type')
  //   this.ctx.body = {data:result}
  // }

  //根据类别ID获得文章列表
  async getListById(){
    let id = this.ctx.params.id
    let sql = 'SELECT article.id as id,'+
    'article.title as title,'+
    'article.introduce as introduce,'+
    "FROM_UNIXTIME(article.addTime,'%Y-%m-%d') as addTime,"+
    'article.view_count as view_count ,'+
    'type.typeName as typeName '+
    'FROM article LEFT JOIN type ON article.type_id = type.Id '+
    'WHERE type_id='+id
    const result = await this.app.mysql.query(sql)
    this.ctx.body={data:result}
  }
}

module.exports = HomeController;
