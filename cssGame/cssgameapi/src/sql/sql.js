//使用mysql中间件连接MySQL数据库
const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'localhost',           //数据库地址
  user: 'root',               //用户名
  password: 'cangtian02mysql',           //密码
  port: '3306',              //端口
  database: 'css game',           //库名
  multipleStatements: true,     //允许执行多条语句
})

module.exports = connection