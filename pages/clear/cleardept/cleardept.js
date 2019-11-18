Page({

  /**
   * 页面的初始数据
   */
  data: {
    background: 'block',
    url: 'https://jxetyy.wytdev.com/miniprogram/?',
    items: [],
    style: 'none',
    imgstyle: '',
    nums: 0,
    flag: 3,
    serialno: '',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.flag) {
      this.setData({
        flag: options.flag,
        // serialno: options.serialno,
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    var that = this;
    var app = getApp();
    if (that.data.flag == 2) {
      this.setData({
        menu: 'none',
      })
    }
    wx.request({
      url: that.data.url + 'svr=MP_00056&fsession=' +
        app.globalData.fsession +
        "&username=" +
        app.globalData.username,
      data: {
        cell_no: app.globalData.cell_no,
        flag: that.data.flag,
        serialno: that.data.serialno,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'get',
      success: function(res) {
        if (res.data.ret[1].id == 1) {
          var num = res.data.ret[0].length;
          if (num == that.data.items.length) {

          } else {
            wx.showLoading({
              title: '玩命加载中',
            })
            var i = '';
            for (i = that.data.nums + i; i < num; i++) {
              if ((i + 1) % 10 != 0) {
                if (res.data.ret[0][i].status == '待接收') {
                  res.data.ret[0][i].deliver = '待接单';
                  res.data.ret[0][i].b = '#cfc9c9'
                } else if (res.data.ret[0][i].status == '已接单') {
                  res.data.ret[0][i].deliver = '已接单';
                  res.data.ret[0][i].b = '#cfc9c9'
                } else if (res.data.ret[0][i].status == '已取件') {
                  res.data.ret[0][i].deliver = '验收';
                  res.data.ret[0][i].a = 'jiedan';
                  res.data.ret[0][i].b = '#1bf4df'
                } else if (res.data.ret[0][i].status == '验收') {
                  res.data.ret[0][i].deliver = '已送回';
                  res.data.ret[0][i].b = '#cfc9c9'
                } else {
                  res.data.ret[0][i].deliver = '完成';
                  res.data.ret[0][i].b = '#cfc9c9'
                }
                that.data.items.push(res.data.ret[0][i]);
                that.setData({
                  background: 'none',
                  items: that.data.items,
                })
                if (i + 1 == num) {
                  that.setData({
                    nums: that.data.nums + 10,
                  })
                }
              } else {
                if (res.data.ret[0][i].status == '待接收') {
                  res.data.ret[0][i].deliver = '待接单';
                  res.data.ret[0][i].b = '#cfc9c9'
                } else if (res.data.ret[0][i].status == '已接单') {
                  res.data.ret[0][i].deliver = '已接单';
                  res.data.ret[0][i].b = '#cfc9c9'
                } else if (res.data.ret[0][i].status == '已取件') {
                  res.data.ret[0][i].deliver = '验收';
                  res.data.ret[0][i].a = 'jiedan';
                  res.data.ret[0][i].b = '#1bf4df'
                } else if (res.data.ret[0][i].status == '验收') {
                  res.data.ret[0][i].deliver = '已送回';
                  res.data.ret[0][i].b = '#cfc9c9'
                } else {
                  res.data.ret[0][i].deliver = '完成';
                  res.data.ret[0][i].b = '#cfc9c9'
                }
                that.data.items.push(res.data.ret[0][i]);
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
    wx.stopPullDownRefresh();
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
      url: '../clear/clears/clears?serialno=' + e.currentTarget.id,
    })
  },
  //验收
  jiedan: function(e) {
    var that = this;
    var app = getApp();
    wx.request({
      url: this.data.url + 'svr=MP_00059&fsession=' +
        app.globalData.fsession +
        "&username=" +
        app.globalData.username + '&cell_no=' + app.globalData.cell_no,
      data: {
        packno: e.currentTarget.id,
      },
      method: 'post',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        if (res.data.ret.id == 1) {
          wx.showToast({
              title: '验收成功',
            }),
            wx.request({
              url: that.data.url + 'svr=MP_00056&fsession=' +
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
                if (res.data.ret[1].id == 1) {
                  that.setData({
                    items: [],
                    nums: 0,
                  })
                  var num = res.data.ret[0].length;
                  var arr = [];
                  var i = '';
                  for (i = that.data.nums + i; i < num; i++) {
                    if ((i + 1) % 10 != 0) {
                      if (res.data.ret[0][i].status == '待接收') {
                        res.data.ret[0][i].deliver = '待接单';
                        res.data.ret[0][i].b = '#cfc9c9'
                      } else if (res.data.ret[0][i].status == '已接单') {
                        res.data.ret[0][i].deliver = '已接单';
                        res.data.ret[0][i].b = '#cfc9c9'
                      } else if (res.data.ret[0][i].status == '已取件') {
                        res.data.ret[0][i].deliver = '验收';
                        res.data.ret[0][i].a = 'jiedan';
                        res.data.ret[0][i].b = '#1bf4df'
                      } else if (res.data.ret[0][i].status == '验收') {
                        res.data.ret[0][i].deliver = '已送回';
                        res.data.ret[0][i].b = '#cfc9c9'
                      } else {
                        res.data.ret[0][i].deliver = '完成';
                        res.data.ret[0][i].b = '#cfc9c9'
                      }
                      that.data.items.push(res.data.ret[0][i]);
                      that.setData({
                        background: 'none',
                        items: that.data.items,
                      })
                      if (i + 1 == num) {
                        that.setData({
                          nums: that.data.nums + 10,
                        })
                      }
                    } else {
                      if (res.data.ret[0][i].status == '待接收') {
                        res.data.ret[0][i].deliver = '待接单';
                        res.data.ret[0][i].b = '#cfc9c9'
                      } else if (res.data.ret[0][i].status == '已接单') {
                        res.data.ret[0][i].deliver = '已接单';
                        res.data.ret[0][i].b = '#cfc9c9'
                      } else if (res.data.ret[0][i].status == '已取件') {
                        res.data.ret[0][i].deliver = '验收';
                        res.data.ret[0][i].a = 'jiedan';
                        res.data.ret[0][i].b = '#1bf4df'
                      } else if (res.data.ret[0][i].status == '验收') {
                        res.data.ret[0][i].deliver = '已送回';
                        res.data.ret[0][i].b = '#cfc9c9'
                      } else {
                        res.data.ret[0][i].deliver = '完成';
                        res.data.ret[0][i].b = '#cfc9c9'
                      }
                      that.data.items.push(res.data.ret[0][i]);
                      that.setData({
                        nums: that.data.nums + 10,
                        background: 'none',
                        items: that.data.items,
                      })
                      break;
                    }
                  }
                  // that.setData({
                  //   background: 'none',
                  //   items: arr,
                  // })
                } else {
                  that.setData({
                    background: 'block',
                  })
                }
              }
            })
        } else {
          wx.showToast({
            title: '验收失败',
            icon: 'none'
          })
        }
      }
    })
  },
  //科室提交记录
  scan: function(e) {
    wx.navigateTo({
      url: '../clear',
    })
    return;
  },
  my: function(e) {
    wx.navigateTo({
      url: '../clear?flag=' + 2,
    })
    return;
  }
})