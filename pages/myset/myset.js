//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '你好',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    mobile: '',
    pwd: '',
    username: '',
  },
  onLoad: function() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
        username: app.globalData.username
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  delivery: function() {
    wx.navigateTo({
      url: '../delivery/delivery?flag=' + 1,
    })
  },
  repair: function() {
    wx.navigateTo({
      url: '../repair/repair?flag=' + 1,
    })
  },
  send: function() {
    wx.navigateTo({
      url: '../send/send?flag=' + 1,
    })
  },
  clear: function() {
    wx.navigateTo({
      url: '../clear/clear?flag' + 1,
    })
  }
})