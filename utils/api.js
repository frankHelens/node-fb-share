const request = require('./request')

exports.module = {
  live: id => request({
    url: `https://test.ebuyhouse.com:8070/web/live/get/${id}`
  }).then(res => {
    console.log(res)
    return {
      title: res.title,
      imageUrl: res.imageUrl,
      content: res.introduce,
      link: res.shareLink
    }
  })
}
