Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: 'http://192.168.5.85:42485/miniprogram/?',
    rnd: '',
    std: '获取验证码',
    mobile: '',
    pwd: '',
    tip: '',
    tips: '',
    yzmBtnClick: 'yzmBtnClick',
    //存储计时器
    num: '',
    change: '>>手机号登录',
    style: 'none',
    style1: 'block',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    clearInterval(this.data.num);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  change: function() {
    if (this.data.change == '>>手机号登录') {
      this.setData({
        style: 'block',
        style1: 'none',
        change: '>>工号登录'
      })
    } else {
      this.setData({
        style: 'none',
        style1: 'block',
        change: '>>手机号登录'
      })
    }
  },
  //获取用户输入的手机号
  mobileInput: function(e) {
    this.setData({
      mobile: e.detail.value,
    })
  },
  //获取验证码
  yzmBtnClick: function(e) {
    this.setData({
      rnd: Math.floor(Math.random() * 100000),
      num: 60
    })
    var that = this;
    wx.request({
      url: this.data.url + 'svr=MP_00001&rnd=' + this.data.rnd + '&mobile=' + this.data.mobile,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        if (res.data.ret.active == '0') {
          that.setData({
            tip: '不存在的手机号'
          })
        } else if (res.data.ret.active == '1') {
          that.setData({
            tip: '未激活的手机号'
          })
          wx.navigateTo({
            url: '../login/login-set?cell_no=' + that.data.mobile + '&fsession=' + res.data.ret.fsession
          })
        } else {
          var app = getApp();
          setInterval(function() {
            var numVal = that.data.num - 1;
            if (numVal > 0) {
              that.setData({
                num: numVal,
                std: '(' + numVal + ')' + '秒后可再次获取',
                yzmBtnClick: '',
              });
            } else {
              that.setData({
                std: '获取验证码',
                yzmBtnClick: 'yzmBtnClick',
              })
              clearInterval(that.data.num)
            }
          }, 1000);
          app.globalData.fsession = res.data.ret.fsession;
          that.setData({
            tip: '成功获取验证码，收到短信后请输入'
          })
        }
      },
      fail: function(res) {}
    });
  },
  //获取用户输入的验证码
  psdInput: function(e) {
    this.setData({
      pwd: e.detail.value,
    })
  },



  //获取用户输入的手机号
  mobileInputs: function(e) {
    this.setData({
      mobile: e.detail.value,
    })
  },

  //获取用户输入的验证码
  psdInputs: function(e) {
    this.setData({
      pwd: e.detail.value,
    })
  },
  //登录
  loginBtnClicks: function(e) {
    var that = this;
    var app = getApp();
    wx.request({
      url: this.data.url + 'svr=MP_00000&mobile=' +
        this.data.mobile + '&smscode=' + this.data.pwd +
        '&fsession=' + '1',
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        if (res.data.ret.id == '3') {
          that.setData({
            tips: '工号或密码不正确！'
          })
        } else if (res.data.ret.active == '1') {
          that.setData({
            tips: '未激活的用户'
          })
          wx.navigateTo({
            url: '../ login / login - set ? cell_no = ' + this.data.mobile
          })
        } else {
          app.globalData.fsession = res.data.ret.session;
          app.globalData.username = res.data.ret.username;
          app.globalData.cell_no = res.data.ret.cell_no;
          that.setData({
            tips: '登陆成功'
          })
          wx.switchTab({
            url: '../home/home'
          })
        }
      }
    })
  },
  //登录
  loginBtnClick: function(e) {
    var that = this;
    var app = getApp();
    wx.request({
      url: this.data.url + 'svr=MP_00000&mobile=' +
        this.data.mobile + '&smscode=' + this.data.pwd +
        '&fsession=' + getApp().globalData.fsession,
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        if (res.data.status == 'err') {
          that.setData({
            tip: '密码不正确！'
          })
        } else {
          app.globalData.fsession = res.data.ret.session;
          app.globalData.username = res.data.ret.username;
          app.globalData.cell_no = res.data.ret.cell_no;
          that.setData({
            tip: '登陆成功'
          })
          wx.switchTab({
            url: '../home/home'
          })
        }
      }
    })
  }
})