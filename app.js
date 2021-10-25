// 載入 express 並建構應用程式伺服器
const express = require('express')
const exphbs = require('express-handlebars')



const app = express()
const routes = require('./routes')
const port = 3000

// 連線資料庫
require('./config/mongoose')

app.engine('hbs', exphbs({ defaultlayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(express.static('public'))

app.use(routes)

app.listen(port, () => {
  console.log('server is running')
})