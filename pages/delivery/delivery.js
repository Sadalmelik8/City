Page({

  /**
   * 页面的初始数据
   */
  data: {
    background: 'block',
    color: '#1bf4df',
    url: 'http://192.168.5.58:42485/miniprogram/?',
    items: [],
    jiedan: '',
    funcjiedan: 'jiedan',
    imgsrc: '',
    style: 'none',
    imgstyle: ''
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
      url: this.data.url + 'svr=MP_00002&fsession=' +
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
        if (!res.data.ret[0].id) {
          var num = res.data.ret.length;
          var arr = [];
          for (var i = 0; i < num; i++) {
            arr.push(res.data.ret[i]);
          }
          if (res.data.ret[0].status == '已提交') {
            that.setData({
              jiedan: '接单'
            })
          } else {
            that.setData({
              jiedan: '二维码',
              funcjiedan: 'goscan',
              color: '#cfc9c9',
            })
          }
          that.setData({
            background: 'none',
            items: arr,
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

  },
  //查看详情
  deliverys: function(e) {
    wx.navigateTo({
      url: '../delivery/deliverys/deliverys?serialno=' + e.currentTarget.id,
    })
  },
  //接单
  jiedan: function(e) {
    var that = this;
    var app = getApp();
    wx.request({
      url: this.data.url + 'svr=MP_00004&fsession=' +
        app.globalData.fsession +
        "&username=" +
        app.globalData.username,
      data: {
        serialno: e.target.id,
        cell_no: app.globalData.cell_no,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        if (res.data.ret.id == 1) {
          wx.showToast({
              title: '接单成功',
            }),
            that.setData({
              jiedan: '二维码',
              funcjiedan: 'goscan',
              color: '#cfc9c9',
            })
        } else {
          wx.showToast({
            title: '已被其他配送人员接单',
          })
          wx.redirectTo({
            url: '../delivery/delivery',
          })
        }
      }
    })
  },
  //扫码
  scan: function() {
    var that = this;
    var app = getApp();
    wx.scanCode({
      success: function(res) {
        var num = res.result;
        wx.request({
          url: that.data.url +
            'svr=MP_00005&fsession=' +
            app.globalData.fsession +
            "&username=" +
            app.globalData.username,
          data: {
            serialno: num,
            cell_no: app.globalData.cell_no,
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function(res) {
            if (res.data.ret[0].id == 1) {
              wx.showToast({
                  title: '扫码成功',
                }),
                wx.navigateTo({
                  url: '../deliverys/deliverys?serialno=' + num,
                })
            } else {
              wx.showToast({
                title: '该标本不存在你的接单任务中',
                icon: 'none',
              })
            }
          }
        })
      }
    })
  },
  //生成二维码
  goscan: function(e) {
    var that = this;
    var app = getApp();
    wx.request({
      url: that.data.url +
        'svr=MP_00006&fsession=' +
        app.globalData.fsession +
        "&username=" +
        app.globalData.username,
      data: {
        serialno: e.target.id,
        cell_no: app.globalData.cell_no,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        that.setData({
          imgsrc: res.data.ret[0].qrcode,
          style: 'block',
          imgstyle: 'none'
        })
      }
    })
  },
  //点击二维码消失
  onscan: function() {
    var that = this;
    var app = getApp();
    that.setData({
      style: 'none',
      imgstyle: 'block'
    })
  }
})