const express = require('express');
const app = express()
// const request = require('./utils/request')
const api = require('./utils/api')

app.set('view engine', 'pug')

app.get('/', async (req, res) => {
  const {type, id} = req.query
  const { module } = api
  if (module[type]) {
    const data = await module[type](id)
    res.render('index', {
      ...data,
      id,
      type
    })
  } else {
    res.render('index', {
      id,
      type,
      title: 'test',
      imageUrl: 'https://www.baidu.com/img/bd_logo1.png',
      content: 'test-content'
    })
  }
})

app.listen(8888, () => {
  console.log('服务已启动，端口号8888')
})
