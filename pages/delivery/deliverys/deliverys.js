Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: 'https://jxetyy.wytdev.com/miniprogram/?',
    serialno: '',
    status: '',
    operator: '',
    opt_no: '',
    optime: '',
    arrtime: '',
    accepter: '',
    del_no: '',
    acctime: '',
    dept: '',
    level: '',
    items: [],
    imgstyle: '',
    qty:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      serialno: options.serialno,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
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
        success: function(res) {
          var sampleno;
          var qty;
          var color;
          if (!res.data.ret[0].id) {
            var num = res.data.ret[0].sampleno.length;
            var arr = [];
            for (var i = 0; i < num; i++) {
              if (i % 2 != 0) {
                arr.push({
                  color: '#0ca6e2',
                  sampleno: res.data.ret[0].sampleno[i],
                  qty: res.data.ret[0].qty[i],
                })
              } else {
                arr.push({
                  color: '',
                  sampleno: res.data.ret[0].sampleno[i],
                  qty: res.data.ret[0].qty[i],
                })
              }
            }
            console.log(arr);
            that.setData({
              items: arr,
              status: res.data.ret[0].status,
              operator: res.data.ret[0].operator,
              opt_no: res.data.ret[0].opt_no,
              optime: res.data.ret[0].optime,
              arrtime: res.data.ret[0].arrtime,
              accepter: res.data.ret[0].accepter,
              del_no: res.data.ret[0].del_no,
              deliver: res.data.ret[0].deliver,
              dept: res.data.ret[0].dept,
              level: res.data.ret[0].level,
            })
          }
        }
      }),
      wx.request({
        url: that.data.url +
          'svr=MP_00006&fsession=' +
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
        success: function(res) {
          that.setData({
            imgsrc: res.data.ret[0].qrcode,
            // style: 'flex',
            // imgstyle: 'none'
          })
        }
      })
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
  //拨号
  opt_no: function() {
    wx.makePhoneCall({
      phoneNumber: this.data.opt_no,
    })
  },
  acc_no: function() {
    wx.makePhoneCall({
      phoneNumber: this.data.acc_no,
    })
  }
})