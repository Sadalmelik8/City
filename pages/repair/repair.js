Page({

  /**
   * 页面的初始数据
   */
  data: {
    background: 'block',
    color: '#1bf4df',
    url: 'http://39.106.134.196/miniprogram/?',
    items: [],
    jiedan: '',
    funcjiedan: 'jiedan',
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
        flag: 1,
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
      url: this.data.url + 'svr=MP_00013&fsession=' +
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
                if (res.data.ret[i].status == '已报修') {
                  res.data.ret[i].amount = '接修';
                  res.data.ret[i].rectime = 'jiedan';
                  res.data.ret[i].repairman = '#1bf4df';
                } else if (res.data.ret[i].status == '已受理') {
                  res.data.ret[i].amount = '已受理';
                  res.data.ret[i].rectime = 'doit';
                  res.data.ret[i].repairman = '#cfc9c9';
                } else if (res.data.ret[i].status == '已维修') {
                  res.data.ret[i].amount = '待验收';
                  res.data.ret[i].rectime = 'over';
                  res.data.ret[i].repairman = '#cfc9c9';
                }
                that.data.items.push(res.data.ret[i]);
                that.setData({
                  background: 'none',
                  items: that.data.items,
                })
              } else {
                if (res.data.ret[i].status == '已报修') {
                  res.data.ret[i].amount = '接修';
                  res.data.ret[i].rectime = 'jiedan';
                  res.data.ret[i].repairman = '#1bf4df';
                } else if (res.data.ret[i].status == '已受理') {
                  res.data.ret[i].amount = '已受理';
                  res.data.ret[i].rectime = 'doit';
                  res.data.ret[i].repairman = '#cfc9c9';
                } else if (res.data.ret[i].status == '已维修') {
                  res.data.ret[i].amount = '待验收';
                  res.data.ret[i].rectime = 'over';
                  res.data.ret[i].repairman = '#cfc9c9';
                } else {
                  res.data.ret[i].amount = '完成';
                  res.data.ret[i].rectime = 'hi';
                  res.data.ret[i].repairman = '#cfc9c9';
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
        console.log(that.data.items);
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
  onUnload: function() {

  },

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
      url: '../repair/repair-del/repair-del?serialno=' + e.currentTarget.id,
    })
  },
  //接单
  jiedan: function(e) {
    var that = this;
    var app = getApp();
    wx.request({
      url: this.data.url + 'svr=MP_00017&fsession=' +
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
              title: '接修成功',
            }),
            wx.request({
              url: that.data.url + 'svr=MP_00013&fsession=' +
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
                    if (res.data.ret[i].status == '已报修') {
                      res.data.ret[i].amount = '接修';
                      res.data.ret[i].rectime = 'jiedan';
                      res.data.ret[i].repairman = '#1bf4df';
                    } else if (res.data.ret[i].status == '已受理') {
                      res.data.ret[i].amount = '已受理';
                      res.data.ret[i].rectime = 'doit';
                      res.data.ret[i].repairman = '#cfc9c9';
                    } else if (res.data.ret[i].status == '已维修') {
                      res.data.ret[i].amount = '待验收';
                      res.data.ret[i].rectime = 'over';
                      res.data.ret[i].repairman = '#cfc9c9';
                    }
                    arr.push(res.data.ret[i]);
                  }
                  that.setData({
                    background: 'none',
                    items: arr,
                  })
                } else {
                  that.setData({
                    background: 'block',
                  })
                }
              }
            })
        } else if (res.data.ret.id == 2) {
          wx.showToast({
            title: '你不是维修人员，无法接单',
            icon: 'none',
          })
        } else {
          wx.showToast({
            title: '已被其他维修人员接单',
            icon: 'none',
          })
        }
      }
    })
  },
  //已完成
  doit: function(e) {
    var that = this;
    var app = getApp();
    wx.request({
      //7777777
      //7777777
      //7777777
      url: this.data.url + 'svr=MP_00018&fsession=' +
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
              title: '维修成功',
            }),
            wx.request({
              url: that.data.url + 'svr=MP_00013&fsession=' +
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
                    if (res.data.ret[i].status == '已报修') {
                      res.data.ret[i].amount = '接修';
                      res.data.ret[i].rectime = 'jiedan';
                      res.data.ret[i].repairman = '#1bf4df';
                    } else if (res.data.ret[i].status == '已受理') {
                      res.data.ret[i].amount = '已受理';
                      res.data.ret[i].rectime = 'doit';
                      res.data.ret[i].repairman = '#cfc9c9';
                    } else if (res.data.ret[i].status == '已维修') {
                      res.data.ret[i].amount = '待验收';
                      res.data.ret[i].rectime = 'over';
                      res.data.ret[i].repairman = '#cfc9c9';
                    }
                    arr.push(res.data.ret[i]);
                  }
                  that.setData({
                    background: 'none',
                    items: arr,
                  })
                } else {
                  that.setData({
                    background: 'block',
                  })
                }
              }
            })
        } else if (res.data.ret.id == 2) {
          wx.showToast({
            title: '你不是维修人员，无法变更',
            icon: 'none',
          })
        } else {
          wx.showToast({
            title: '已被其他维修人员接单',
            icon: 'none',
          })
        }
      }
    })
  },
  //验收
  over: function(e) {
    var that = this;
    var app = getApp();
    wx.request({
      //7777777
      //7777777
      //7777777
      url: this.data.url + 'svr=MP_00019&fsession=' +
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
              title: '验收成功',
            }),
            wx.request({
              url: that.data.url + 'svr=MP_00013&fsession=' +
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
                    if (res.data.ret[i].status == '已报修') {
                      res.data.ret[i].amount = '接修';
                      res.data.ret[i].rectime = 'jiedan';
                      res.data.ret[i].repairman = '#1bf4df';
                    } else if (res.data.ret[i].status == '已受理') {
                      res.data.ret[i].amount = '已受理';
                      res.data.ret[i].rectime = 'doit';
                      res.data.ret[i].repairman = '#cfc9c9';
                    } else if (res.data.ret[i].status == '已维修') {
                      res.data.ret[i].amount = '待验收';
                      res.data.ret[i].rectime = 'over';
                      res.data.ret[i].repairman = '#cfc9c9';
                    }
                    arr.push(res.data.ret[i]);
                  }
                  that.setData({
                    background: 'none',
                    items: arr,
                  })
                } else {
                  that.setData({
                    background: 'block',
                  })
                }
              }
            })
        } else if (res.data.ret.id == 2) {
          wx.showToast({
            title: '你不是报修人，无法验收',
            icon: 'none',
          })
        }
      }
    })
  },
  //报修
  scan: function() {
    wx.navigateTo({
      url: '../repair/repair-acc/repair-acc',
    })
  }
})