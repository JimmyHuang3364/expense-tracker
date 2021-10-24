// 載入 express 並建構應用程式伺服器
const express = require('express')


const app = express()
const routes = require('./routes')
const port = 3000

app.use(routes)

app.listen(port, () => {
  console.log('server is running')
})