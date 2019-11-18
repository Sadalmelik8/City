//获取应用实例
const app = getApp()

Page({
  data: {
    url: 'https://jxetyy.wytdev.com/miniprogram/?',
    motto: '你好',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    mobile: '',
    pwd: '',
    username: '',
    jscode: '',
  },
  onLoad: function () {
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
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  delivery: function (e) {
    var app = getApp();
    for (var i = 0; i < app.globalData.profession.length; i++) {
      if (app.globalData.profession[i] == 0 || app.globalData.profession[i] == 1 || app.globalData.profession[i] == 11) {
        wx.navigateTo({
          url: '../delivery/delivery?flag=' + 1,
        })
        return;
      } else if (i == app.globalData.profession.length - 1) {
        wx.showToast({
          title: '你无权进入此模块',
          icon: 'none',
        })
      }
    }
  },
  repair: function (e) {
    var app = getApp();
    for (var i = 0; i < app.globalData.profession.length; i++) {
      if (app.globalData.profession[i] == 0 || app.globalData.profession[i] == 1 || app.globalData.profession[i] == 2) {
        wx.navigateTo({
          url: '../repair/repair?flag=' + 1,
        })
        return;
      } else if (i == app.globalData.profession.length - 1) {
        wx.showToast({
          title: '你无权进入此模块',
          icon: 'none',
        })
      }
    }

  },
  send: function (e) {
    var app = getApp();
    for (var i = 0; i < app.globalData.profession.length; i++) {
      if (app.globalData.profession[i] == 0 || app.globalData.profession[i] == 3 || app.globalData.profession[i] == 33) {
        wx.navigateTo({
          url: '../send/send?flag=' + 1,
        })
        return;
      } else if (i == app.globalData.profession.length - 1) {
        wx.showToast({
          title: '你无权进入此模块',
          icon: 'none',
        })
      }
    }

  },
  clear: function (e) {
    var app = getApp();
    for (var i = 0; i < app.globalData.profession.length; i++) {
      if (app.globalData.profession[i] == 0 || app.globalData.profession[i] == 4 || app.globalData.profession[i] == 44) {
        wx.navigateTo({
          url: '../clear/clears-room/clears-room?flag=' + 1,
        })
        return;
      } else if (i == app.globalData.profession.length - 1) {
        wx.showToast({
          title: '你无权进入此模块',
          icon: 'none',
        })
      }
    }
  },
  logoff: function () {
    var that = this;
    var app = getApp()
    wx.login({
      success: res => {
        that.setData({
          jscode: res.code,
        })
        console.log('1');
        wx.request({
          url: this.data.url + 'svr=MP_22222&userid=' + app.globalData.userid + '&fsession=' + app.globalData.fsession,
          success: function (res) {
            if (res.data.ret.id == 1) {
              // app.globalData.fsession = res.data.ret.session;
              // app.globalData.username = res.data.ret.username;
              // app.globalData.cell_no = res.data.ret.cell_no;
              // app.globalData.type = res.data.ret.type;
              // app.globalData.profession = res.data.ret.profession;
              wx.showToast({
                title: '退出成功，请重新登录！',
                icon: 'none',
                duration: 2000,
                mask: true
              })
              wx.reLaunch({
                url: '../login/login'
              })
            } else {
              wx.showToast({
                title: '退出失败',
                icon: 'none',
                duration: 2000,
                mask: true
              })
            }
          }
        })
      }
    })
  }


  // delivery: function() {
  //   wx.navigateTo({
  //     url: '../delivery/delivery?flag=' + 1,
  //   })
  // },
  // repair: function() {
  //   wx.navigateTo({
  //     url: '../repair/repair?flag=' + 1,
  //   })
  // },
  // send: function() {
  //   wx.navigateTo({
  //     url: '../send/send?flag=' + 1,
  //   })
  // },
  // clear: function() {
  //   wx.navigateTo({
  //     url: '../clear/clears-room/clears-room?flag=' + 1,
  //   })
  // }
})