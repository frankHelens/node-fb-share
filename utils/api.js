const request = require('./request')

exports.module = {
  live: id => request({
    url: `https://www.hzmra.com/web/live/get/${id}`
  }).then(res => {
    return {
      title: res.title,
      imageUrl: res.imageUrl,
      content: res.introduce,
      link: res.shareLink
    }
  })
}
