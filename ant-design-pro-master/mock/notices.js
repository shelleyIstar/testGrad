export default {
  getNotices(req, res) {
    res.json([{
      id: '000000001',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
      title: '你收到了 14 份新信息',
      datetime: '2018-05-09',
      type: '通知',
    }]);
  },
};
