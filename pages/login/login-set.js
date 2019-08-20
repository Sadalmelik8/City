Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: 'http://39.106.134.196/miniprogram/?',
    pwd: '',
    pwds: '',
    smscode: '',
    tip: '',
    mobile: '',
    fsession:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      mobile: options.cell_no,
      fsession: options.fsession,
    })
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
  mobileInput: function(e) {
    this.setData({
      pwd: e.detail.value,
    })
  },
  psdInput: function(e) {
    this.setData({
      pwds: e.detail.value,
    })
  },
  smcode: function(e) {
    this.setData({
      smscode: e.detail.value,
    })
  },
  loginBtnClick: function(e) {
    var that = this;
    var app = getApp();
    if (this.data.pwd == this.data.pwds) {
      wx.request({
        url: this.data.url + 'svr=MP_00038&cell_no=' +
          this.data.mobile + '&smscode=' + this.data.smscode +
          '&password=' + this.data.pwd + '&fsession=' + this.data.fsession,
        data: {},
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function(res) {
          if (res.data.id == 0) {
            that.setData({
              tip: '验证码不正确！'
            })
          } else {
            that.setData({
              tip: '登陆成功'
            })
            wx.navigateTo({
              url: '../login/login'
            })
          }
        }
      })
    } else {
      this.setData({
        tip: '两次输入的密码不同！'
      })
    }
  }
})