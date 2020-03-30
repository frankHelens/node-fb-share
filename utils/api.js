const request = require('./request')
class api {
  constructor (namespace, id) {
    return this[`${namespace}Api`](id)
  }
  liveApi (id) {
    return request({
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
}


module.exports = api
