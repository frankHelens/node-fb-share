const request = require('./request')

exports.module = {
  live: id => request({
    url: `web/live/get/${id}`
  }).then(res => {
    return {
      title: res.title,
      imageUrl: res.imageUrl,
      content: res.introduce,
      link: res.shareLink
    }
  }),
  redPacket: id => request({
    url: `town/web/lucky/detail/${id}`
  }).then(res => {
    return {
      title: res.title,
      imageUrl: 'https://lfshz.oss-cn-shenzhen.aliyuncs.com/lfshz_images/hongbao.png',
      content: res.remark,
      link: res.shareUrl + id
    }
  })
}
