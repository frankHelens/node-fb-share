const express = require('express');
const app = express()
const request = require('./utils/request')

app.set('view engine', 'pug')

app.get('/', async (req, res) => {
  const shareData = await request({
    url: 'https://www.hzmra.com/web/live/get/205695763420807168'
  })
  res.render('index', {
    title: shareData.title,
    imageUrl: shareData.imageUrl,
    content: shareData.introduce,
    link: shareData.shareLink
  })
})

app.listen(8888, () => {
  console.log('服务已启动，端口号8888')
})
