Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: 'https://jxetyy.wytdev.com/miniprogram/?',
    ress: [],
    add: [],
    nums: 0,
    a: [],
    x: [],
    y: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    var that = this;
    var app = getApp();
    wx.request({
      url: that.data.url + 'svr=MP_00046&fsession=' +
        app.globalData.fsession +
        "&username=" +
        app.globalData.username,
      data: {
        cell_no: app.globalData.cell_no,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'get',
      success: function(res) {
        that.setData({
          nums: res.data.ret.length
        })
        if (res.data.ret.length == 0) {
          wx.showToast({
            title: '暂无洗涤字典',
          })
        } else {
          for (var i = 0; i < res.data.ret.length; i++) {
            that.data.ress.push(res.data.ret[i])
          }
          that.setData({
            ress: that.data.ress,
            // x:that.data.ress,
          })
          // console.log(that.data.depts);
        }
      },
    })
  },
  num: function(e) {
    var that = this;
    var app = getApp();
    that.data.add[e.currentTarget.id] = e.detail.value;
    this.setData({
      add: that.data.add,
    })
  },
  sub: function() {
    var that = this;
    var app = getApp();
    if (that.data.add.length < that.data.nums) {
      for (var i = 0; i < that.data.nums; i++) {
        if (that.data.add[i] == undefined) {
          that.data.add[i] = '0';
        }
      }
    }
    for (var i = 0; i < that.data.add.length; i++) {
      that.data.y.push(that.data.ress[i]);
    }
    wx.request({

      url: that.data.url + 'svr=MP_00043&fsession=' +
        app.globalData.fsession +
        "&username=" +
        app.globalData.username,

      data: {
        detail: this.data.y,
        num: this.data.add,
        cell_no: app.globalData.cell_no,
      },
      method: 'get',
      success: function(res) {
        if (res.data.ret.id == 1) {
          wx.showToast({
            title: '提交成功',
            icon: 'success'
          })
        }
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

  }
})