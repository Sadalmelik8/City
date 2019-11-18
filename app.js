//app.js
App({
  onLaunch: function() {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    var that = this;
    wx.qy.login({
      success: res => {
        console.log(res)
        this.globalData.jscode = res.code;
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: this.globalData.url + 'svr=MP_11111&js_code=' + this.globalData.jscode,
          success: function(res) {
            if (res.data.ret.id == 1) {
              console.log(res.data.ret.userid);
              that.globalData.fsession = res.data.ret.session;
              that.globalData.username = res.data.ret.username;
              that.globalData.cell_no = res.data.ret.cell_no;
              that.globalData.type = res.data.ret.type;
              that.globalData.profession = res.data.ret.profession;
              that.globalData.userid = res.data.ret.userid;
              // wx.request({
              //   url: 'https://qyapi.weixin.qq.com/cgi-bin/message/send?access_token=0rRndAdBrcbvIkH82eynr5rk9xQP9v3GAJbPSGGqtNzM12ad56g8MilyTpgqBPlyp9ZlkUmHiaIlWdh-HhsgErMSoHIyolIdVXdiKk3sxwSMW8mKKzagzD_qPJxdC331k-6NLi-SXxrBbnucbfBdbNx1KjwWoxS_5Vg8ewUCHLPLkCX7-WSz3yKv5gVUSYKHu_6Q_WEkOZkvH7CSzUwnuA',
              //   method: 'post',
              //   data: {
              //     "touser": "nick",
              //     "msgtype": "miniprogram_notice",
              //     "miniprogram_notice": {
              //       "appid": "wxc8eab3994a7bdb73",
              //       "title": "会议室预订成功通知",
              //       "description": "4月27日 16:16",
              //       "emphasis_first_item": true,
              //       "content_item": [
              //         {
              //           "key": "会议室",
              //           "value": "402"
              //         },
              //         {
              //           "key": "会议地点",
              //           "value": "广州TIT-402会议室"
              //         },
              //         {
              //           "key": "会议时间",
              //           "value": "2018年8月1日 09:00-09:30"
              //         },
              //         {
              //           "key": "参与人员",
              //           "value": "周剑轩"
              //         }
              //       ]
              //     },
              //     "enable_id_trans": 0
              //   },
              //   success: function(res) {
              //     console.log(res);
              //   }
              // })
              wx.switchTab({
                url: '../home/home'
              })
            } else {
              console.log(res.data.ret.userid);
              that.globalData.userid = res.data.ret.userid;
              wx.showToast({
                title: '请登录',
              })
            }
          }
        })
      }
    })
    //

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },

  globalData: {
    userInfo: null,
    fsession: '',
    username: '',
    cell_no: '',
    type: '',
    profession: [],
    sccode: [],
    url: 'https://jxetyy.wytdev.com/miniprogram/?',
    jscode: '',
    userid: '',
  },
})