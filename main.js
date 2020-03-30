const express = require('express');
const app = express()
// const request = require('./utils/request')
const api = require('./utils/api')

app.set('view engine', 'pug')

app.get('/', async (req, res) => {
  const {type, id} = req.query
  const data = await new api(type, id)
  res.render('index', data)
})

app.listen(8888, () => {
  console.log('服务已启动，端口号8888')
})
