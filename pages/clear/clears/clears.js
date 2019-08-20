Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: 'http://39.106.134.196/miniprogram/?',
    serialno: '',
    status: '',
    operator: '',
    opt_no: '',
    optime: '',
    arrtime: '',
    accepter: '',
    acc_no: '',
    acctime: '',
    dept: '',
    level: '',
    items: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      serialno: options.serialno,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    var app = getApp();
    wx.request({
      url: this.data.url + 'svr=MP_00003&fsession=' +
        app.globalData.fsession +
        "&username=" +
        app.globalData.username,
      data: {
        serialno: that.data.serialno,
        cell_no: app.globalData.cell_no,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'get',
      success: function (res) {
        if (!res.data.ret[0].id) {
          var num = res.data.ret[0].sampleno.length;
          var arr = [];
          for (var i = 0; i < num; i++) {
            arr.push(res.data.ret[0].sampleno[i]);
          }
          that.setData({
            items: arr,
            status: res.data.ret[0].status,
            operator: res.data.ret[0].operator,
            opt_no: res.data.ret[0].opt_no,
            optime: res.data.ret[0].optime,
            arrtime: res.data.ret[0].arrtime,
            accepter: res.data.ret[0].accepter,
            acc_no: res.data.ret[0].acc_no,
            acctime: res.data.ret[0].acctime,
            dept: res.data.ret[0].dept,
            level: res.data.ret[0].level,
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //拨号
  opt_no: function () {
    wx.makePhoneCall({
      phoneNumber: this.data.opt_no,
    })
  },
  acc_no: function () {
    wx.makePhoneCall({
      phoneNumber: this.data.acc_no,
    })
  }
})