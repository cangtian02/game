const express = require('express')
const app = express()
// CORS模块，处理web端跨域问题
const cors = require('cors')
app.use(cors())

const index = require('./src/router/index');
app.use('/', index);

//body-parser 解析表单
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// 启动服务，端口3001
app.listen(3001, () => {
  console.log('服务启动成功:' + `http://localhost:3001/`)
})
