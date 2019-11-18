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
      url: that.data.url + 'svr=MP_00054&fsession=' +
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
                if (res.data.ret[i].status == '待验收') {
                  res.data.ret[i].deliver = '验收';
                  res.data.ret[i].a = 'jiedan';
                  res.data.ret[i].b = '#1bf4df'
                } else if (res.data.ret[i].status == '已验收') {
                  res.data.ret[i].deliver = '已验收';
                  // res.data.ret[i].acc_no = 'goscan';
                  res.data.ret[i].b = '#cfc9c9'
                } else if (res.data.ret[i].status == '已打包') {
                  res.data.ret[i].deliver = '已打包';
                  // res.data.ret[i].acc_no = 'goscan';
                  res.data.ret[i].b = '#cfc9c9'
                } else if (res.data.ret[i].status == '已送回') {
                  res.data.ret[i].deliver = '已送回';
                  // res.data.ret[i].acc_no = 'goscan';
                  res.data.ret[i].b = '#cfc9c9'
                } else {
                  res.data.ret[i].deliver = '未送回';
                  // res.data.ret[i].acc_no = 'goscan';
                  res.data.ret[i].b = '#cfc9c9'
                }
                that.data.items.push(res.data.ret[i]);
                that.setData({
                  background: 'none',
                  items: that.data.items,
                })
              } else {
                if (res.data.ret[i].status == '待验收') {
                  res.data.ret[i].deliver = '验收';
                  res.data.ret[i].a = 'jiedan';
                  res.data.ret[i].b = '#1bf4df'
                } else if (res.data.ret[i].status == '已验收') {
                  res.data.ret[i].deliver = '已验收';
                  // res.data.ret[i].acc_no = 'goscan';
                  res.data.ret[i].b = '#cfc9c9'
                } else if (res.data.ret[i].status == '已打包') {
                  res.data.ret[i].deliver = '已打包';
                  // res.data.ret[i].acc_no = 'goscan';
                  res.data.ret[i].b = '#cfc9c9'
                } else if (res.data.ret[i].status == '已送回') {
                  res.data.ret[i].deliver = '已送回';
                  // res.data.ret[i].acc_no = 'goscan';
                  res.data.ret[i].b = '#cfc9c9'
                } else {
                  res.data.ret[i].deliver = '未送回';
                  // res.data.ret[i].acc_no = 'goscan';
                  res.data.ret[i].b = '#cfc9c9'
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
  //
  sub: function() {
    wx.navigateTo({
      url: './sub/sub',
    })
  },
  //打包
  packs: function() {
    var that = this;
    var app = getApp();
    wx.showModal({
      title: '提示',
      content: '是否打包已验收的被服洗涤',
      success(res) {
        if (res.confirm) {
          wx.request({
            url: that.data.url + 'svr=MP_00051&fsession=' +
              app.globalData.fsession +
              "&username=" +
              app.globalData.username,
            data: {
              // serialno: e.currentTarget.id,
              cell_no: app.globalData.cell_no,
            },  
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: function(res) {
              if (res.data.ret.id == 1) {
                wx.showToast({
                  title: '打包成功',
                  icon: 'success', //当icon：'none'时，没有图标 只有文字
                  duration: 2000
                })
                wx.navigateTo({
                  url: './cleardept/cleardept',
                })
              } else if (res.data.ret.id == 2) {
                wx.showToast({
                  title: '没有权限，打包失败',
                  icon: 'none', //当icon：'none'时，没有图标 只有文字
                  duration: 2000
                })
              } else if (res.data.ret.id == 3) {
                wx.showToast({
                  title: '没有打包数据！',
                  icon: 'none', //当icon：'none'时，没有图标 只有文字
                  duration: 2000
                })
              } else {
                wx.showToast({
                  title: '打包失败，请重试',
                  icon: 'none', //当icon：'none'时，没有图标 只有文字
                  duration: 2000
                })
              }
            }
          })
        } else if (res.cancel) {

        }
      }
    })
  },
  //接单
  jiedan: function(e) {
    var that = this;
    var app = getApp();
    wx.request({
      url: this.data.url + 'svr=MP_00050&fsession=' +
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
              title: '验收成功',
            }),
            wx.request({
              url: that.data.url + 'svr=MP_00054&fsession=' +
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
                if (isNaN(res.data.ret[0].id)) {
                  console.log(isNaN(res.data.ret[0].id));
                  var num = res.data.ret.length;
                  var arr = [];
                  for (var i = 0; i < num; i++) {
                    if (res.data.ret[i].status == '待验收') {
                      res.data.ret[i].deliver = '验收';
                      res.data.ret[i].a = 'jiedan';
                      res.data.ret[i].b = '#1bf4df'
                    } else if (res.data.ret[i].status == '已验收') {
                      res.data.ret[i].deliver = '已验收';
                      // res.data.ret[i].acc_no = 'goscan';
                      res.data.ret[i].b = '#cfc9c9'
                    } else if (res.data.ret[i].status == '已打包') {
                      res.data.ret[i].deliver = '已打包';
                      // res.data.ret[i].acc_no = 'goscan';
                      res.data.ret[i].b = '#cfc9c9'
                    } else if (res.data.ret[i].status == '已送回') {
                      res.data.ret[i].deliver = '已送回';
                      // res.data.ret[i].acc_no = 'goscan';
                      res.data.ret[i].b = '#cfc9c9'
                    } else {
                      res.data.ret[i].deliver = '未送回';
                      // res.data.ret[i].acc_no = 'goscan';
                      res.data.ret[i].b = '#cfc9c9'
                    }
                    arr.push(res.data.ret[i]);
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
            title: '验收失败',
            icon: 'none'
          })
        }
      }
    })
  },
  pack: function() {

  }
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