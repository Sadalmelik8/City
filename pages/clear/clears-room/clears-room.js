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
        if (res.data.ret[1].id == 1 || res.data.ret[1].id == 2) {
          var num = res.data.ret[0].length;
          if (num == that.data.items.length) {
            if (that.data.flag == 0) {
              that.setData({
                menu: 'block',
              })
            } else {
              that.setData({
                menu: 'none',
              })
            }
          } else {
            if (that.data.flag == 0) {
              that.setData({
                menu: 'block',
              })
            } else {
              that.setData({
                menu: 'none',
              })
            }
            wx.showLoading({
              title: '玩命加载中',
            })
            var i = '';
            for (i = that.data.nums + i; i < num; i++) {
              if ((i + 1) % 10 != 0) {
                if (res.data.ret[0][i].status == '待接收') {
                  res.data.ret[0][i].deliver = '待接单';
                  //res.data.ret[0][i].a = 'jeidan';
                  res.data.ret[0][i].b = '#cfc9c9'
                } else if (res.data.ret[0][i].status == '已接单') {
                  res.data.ret[0][i].deliver = '取件';
                  res.data.ret[0][i].a = 'jiedan';
                  res.data.ret[0][i].b = '#1bf4df'
                } else if (res.data.ret[0][i].status == '已取件') {
                  res.data.ret[0][i].deliver = '待验收';
                  //res.data.ret[0][i].a = 'jeidan';
                  res.data.ret[0][i].b = '#cfc9c9'
                } else if (res.data.ret[0][i].status == '验收') {
                  res.data.ret[0][i].deliver = '已验收';
                  // res.data.ret[0][i].a = 'jeidan';
                  res.data.ret[0][i].b = '#cfc9c9'
                } else {
                  res.data.ret[0][i].deliver = '已完成';
                  // res.data.ret[0][i].acc_no = 'goscan';
                  res.data.ret[0][i].b = '#cfc9c9'
                }
                that.data.items.push(res.data.ret[0][i]);
                that.setData({
                  background: 'none',
                  items: that.data.items,
                })
              } else {
                if (res.data.ret[0][i].status == '待接收') {
                  res.data.ret[0][i].deliver = '待接单';
                  //res.data.ret[0][i].a = 'jeidan';
                  res.data.ret[0][i].b = '#cfc9c9'
                } else if (res.data.ret[0][i].status == '已接单') {
                  res.data.ret[0][i].deliver = '取件';
                  res.data.ret[0][i].a = 'jiedan';
                  res.data.ret[0][i].b = '#1bf4df'
                } else if (res.data.ret[0][i].status == '已取件') {
                  res.data.ret[0][i].deliver = '待验收';
                  //res.data.ret[0][i].a = 'jeidan';
                  res.data.ret[0][i].b = '#cfc9c9'
                } else if (res.data.ret[0][i].status == '验收') {
                  res.data.ret[0][i].deliver = '已验收';
                  // res.data.ret[0][i].a = 'jeidan';
                  res.data.ret[0][i].b = '#cfc9c9'
                } else {
                  res.data.ret[0][i].deliver = '已完成';
                  // res.data.ret[0][i].acc_no = 'goscan';
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
          if (that.data.flag == 0) {
            that.setData({
              menu: 'block',
            })
          } else {
            that.setData({
              menu: 'none',
            })
          }
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
      url: '../clear?serialno=' + e.currentTarget.id + '&flag=' + 1,
    })
  },
  //接单
  jiedan: function(e) {
    var that = this;
    var app = getApp();
    wx.request({
      url: this.data.url + 'svr=MP_00058&fsession=' +
        app.globalData.fsession +
        "&username=" +
        app.globalData.username,
      data: {
        packno: e.currentTarget.id,
        cell_no: app.globalData.cell_no,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        if (res.data.ret.id == 1) {
          wx.showToast({
              title: '取件成功',
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
                if (isNaN(res.data.ret[0].id)) {
                  var num = res.data.ret[0].length;
                  var arr = [];
                  for (var i = 0; i < num; i++) {
                    if (res.data.ret[0][i].status == '待接收') {
                      res.data.ret[0][i].deliver = '待接单';
                      //res.data.ret[0][i].a = 'jeidan';
                      res.data.ret[0][i].b = '#cfc9c9'
                    } else if (res.data.ret[0][i].status == '已接单') {
                      res.data.ret[0][i].deliver = '取件';
                      res.data.ret[0][i].a = 'jiedan';
                      res.data.ret[0][i].b = '#1bf4df'
                    } else if (res.data.ret[0][i].status == '已取件') {
                      res.data.ret[0][i].deliver = '待验收';
                      //res.data.ret[0][i].a = 'jeidan';
                      res.data.ret[0][i].b = '#cfc9c9'
                    } else if (res.data.ret[0][i].status == '验收') {
                      res.data.ret[0][i].deliver = '已验收';
                      // res.data.ret[0][i].a = 'jeidan';
                      res.data.ret[0][i].b = '#cfc9c9'
                    } else {
                      res.data.ret[0][i].deliver = '已完成';
                      // res.data.ret[0][i].acc_no = 'goscan';
                      res.data.ret[0][i].b = '#cfc9c9'
                    }
                    arr.push(res.data.ret[0][i]);
                  }
                  that.setData({
                    background: 'none',
                    items: arr,
                  })
                  console.log(arr);
                  console.log(that.data.items);
                } else {
                  that.setData({
                    background: 'block',
                  })
                }
              }
            })
        } else {
          wx.showToast({
            title: '你没有取件权限',
            icon: 'none'
          })
        }
      }
    })
  },
  my: function() {
    this.setData({
      items: [],
      flag: 2,
      menu: 'none',
    })
    this.onReady();
  }
  //扫码
  // scan: function () {
  //   var that = this;
  //   var app = getApp();
  //   wx.scanCode({
  //     success: function (res) {
  //       var num = res.result;
  //       wx.request({
  //         url: that.data.url +
  //           'svr=MP_00005&fsession=' +
  //           app.globalData.fsession +
  //           "&username=" +
  //           app.globalData.username,
  //         data: {
  //           serialno: num,
  //           cell_no: app.globalData.cell_no,
  //         },
  //         header: {
  //           'content-type': 'application/json' // 默认值
  //         },
  //         success: function (res) {
  //           if (res.data.ret[0].id == 1) {
  //             wx.showToast({
  //               title: '扫码成功',
  //             }),
  //               wx.navigateTo({
  //                 url: '../clear/clear?serialno=' + num,
  //               })
  //           } else {
  //             wx.showToast({
  //               title: '该标本不存在你的接单任务中',
  //               icon: 'none',
  //             })
  //           }
  //         }
  //       })
  //     }
  //   })
  // },
  //生成二维码
  // goscan: function(e) {
  //   var that = this;
  //   var app = getApp();
  //   wx.request({
  //     url: that.data.url +
  //       'svr=MP_00006&fsession=' +
  //       app.globalData.fsession +
  //       "&username=" +
  //       app.globalData.username,
  //     data: {
  //       serialno: e.target.id,
  //       cell_no: app.globalData.cell_no,
  //     },
  //     header: {
  //       'content-type': 'application/json' // 默认值
  //     },
  //     success: function(res) {
  //       that.setData({
  //         imgsrc: res.data.ret[0].qrcode,
  //         style: 'flex',
  //         imgstyle: 'none'
  //       })
  //     }
  //   })
  // },
  //点击二维码消失
  // onscan: function() {
  //   var that = this;
  //   var app = getApp();
  //   that.setData({
  //     style: 'none',
  //     imgstyle: 'block'
  //   })
  // },
})