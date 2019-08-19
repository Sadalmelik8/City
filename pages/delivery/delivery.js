Page({

  /**
   * 页面的初始数据
   */
  data: {
    background: 'block',
    url: 'https://dev.wytsoft.com/miniprogram/?',
    items: [],
    imgsrc: '',
    style: 'none',
    imgstyle: '',
    nums: 0,
    flag: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.flag) {
      this.setData({
        flag: options.flag,
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    var that = this;
    var app = getApp();
    wx.request({
      url: that.data.url + 'svr=MP_00002&fsession=' +
        app.globalData.fsession +
        "&username=" +
        app.globalData.username,
      data: {
        cell_no: app.globalData.cell_no,
        flag: that.data.flag,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'get',
      success: function(res) {
        if (isNaN(res.data.ret[0].id)) {
          var num = res.data.ret.length;
          if (num == that.data.items.length) {

          } else {
            wx.showLoading({
              title: '玩命加载中',
            })
            var i = '';
            for (i = that.data.nums + i; i < num; i++) {
              if ((i + 1) % 10 != 0) {
                if (res.data.ret[i].status == '已提交') {
                  res.data.ret[i].deliver = '接单';
                  res.data.ret[i].acc_no = 'jiedan';
                  res.data.ret[i].del_no = '#1bf4df'
                } else {
                  res.data.ret[i].deliver = '二维码';
                  res.data.ret[i].acc_no = 'goscan';
                  res.data.ret[i].del_no = '#cfc9c9'
                }
                that.data.items.push(res.data.ret[i]);
                that.setData({
                  background: 'none',
                  items: that.data.items,
                })
              } else {
                if (res.data.ret[i].status == '已提交') {
                  res.data.ret[i].deliver = '接单';
                  res.data.ret[i].acc_no = 'jiedan';
                  res.data.ret[i].del_no = '#1bf4df'
                } else {
                  res.data.ret[i].deliver = '二维码';
                  res.data.ret[i].acc_no = 'goscan';
                  res.data.ret[i].del_no = '#cfc9c9'
                }
                that.data.items.push(res.data.ret[i]);
                that.setData({
                  nums: that.data.nums + 10,
                  background: 'none',
                  items: that.data.items,
                })
                break;
              }
            }
          }
        } else {
          that.setData({
            background: 'block',
          })
        }
        wx.hideLoading();
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
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    wx.showLoading({
      title: '玩命加载中',
    })
    this.setData({
      nums: 0,
      items: [],
    })
    this.onReady();
    wx.hideLoading();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.onReady();
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
    var idx = e.target.dataset.index;
    wx.request({
      url: this.data.url + 'svr=MP_00004&fsession=' +
        app.globalData.fsession +
        "&username=" +
        app.globalData.username,
      data: {
        serialno: e.currentTarget.id,
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
            wx.request({
              url: that.data.url + 'svr=MP_00002&fsession=' +
                app.globalData.fsession +
                "&username=" +
                app.globalData.username,
              data: {
                cell_no: app.globalData.cell_no,
                flag: that.data.flag,
              },
              header: {
                'content-type': 'application/json' // 默认值
              },
              method: 'get',
              success: function(res) {
                if (isNaN(res.data.ret[0].id)) {
                  var num = res.data.ret.length;
                  var arr = [];
                  for (var i = 0; i < num; i++) {
                    if (res.data.ret[i].status == '已提交') {
                      res.data.ret[i].deliver = '接单';
                      res.data.ret[i].acc_no = 'jiedan';
                      res.data.ret[i].del_no = '#1bf4df'
                    } else {
                      res.data.ret[i].deliver = '二维码';
                      res.data.ret[i].acc_no = 'goscan';
                      res.data.ret[i].del_no = '#cfc9c9'
                    }
                    arr.push(res.data.ret[i]);
                  }
                  that.setData({
                    background: 'none',
                    items: arr,
                  })
                }
              }
            })
        } else {
          wx.showToast({
            title: '已被其他配送人员接单',
            icon: 'none'
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
          style: 'flex',
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
  },
})