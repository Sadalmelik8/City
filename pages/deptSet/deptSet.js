Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: 'https://jxetyy.wytdev.com/miniprogram/?',
    depts:[],
    name: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    var app = getApp();
    wx.request({
      url: this.data.url + 'svr=MP_00071&fsession=' +
        app.globalData.fsession +
        "&username=" +
        app.globalData.username,
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'get',
      success: function (res) {
        if(res.data.ret.length == 0){
          wx.showToast({
            title: '暂无收件科室',
          })
        }else{
          for (var i = 0; i < res.data.ret.length; i++) {
            that.data.depts.push(res.data.ret[i])
          }
          that.setData({
            depts:that.data.depts,
          })
          // console.log(that.data.depts);
        }
      },
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
  inputWacth: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  //添加
  add: function(e){
    // this.setData({
    //   name: e.detail.value,
    // })
    // console.log(name);
    var that = this;
    var app = getApp();
    if(that.data.name == ''){
      wx.showToast({
        title: '请输入内容',
        icon: 'none',
      })
    }else{
      wx.request({
        url: this.data.url + 'svr=MP_00072&fsession=' +
          app.globalData.fsession +
          "&username=" +
          app.globalData.username,
        data: {
          dept: that.data.name,
          cell_no: app.globalData.cell_no,
        },
        method: 'get',
        success: function (res) {
          if (res.data.ret.id == 0) {
            wx.showToast({
              title: '添加失败，请重试',
              icon: 'none',
            })
          } else if (res.data.ret.id == 1) {
            wx.showToast({
              title: '添加成功！',
              icon: 'none',
            })
            wx.navigateTo({
              url: '../deptSet/deptSet'
            })
          }
        }
      })
    }
  },
//删除
  del: function (e) {
    var app = getApp();
    var that = this;
    wx.showModal({
      title: '是否删除该科室',
      content: '',
      success(res) {
        if (res.confirm) {
          wx.request({
            url: that.data.url + 'svr=MP_00073&fsession=' +
              app.globalData.fsession +
              "&username=" +
              app.globalData.username,
            data: {
              id: e.currentTarget.id,
              cell_no: app.globalData.cell_no,
            },
            method: 'get',
            success: function (res) {
              if (res.data.ret.id == 0) {
                wx.showToast({
                  title: '删除失败，请重试',
                  icon: 'none',
                })
              } else if (res.data.ret.id == 1) {
                wx.showToast({
                  title: '删除成功！',
                  icon: 'none',
                })
                wx.navigateTo({
                  url: '../deptSet/deptSet'
                })
              }
            }
          })
          // for (var i = 0; i < app.globalData.sccode.length; i++) {
          //   if (app.globalData.sccode[i] == e.currentTarget.id) {
          //     app.globalData.sccode.splice(i, 1);
          //     that.setData({
          //       details: app.globalData.sccode,
          //     })
          //   }
          // }
        } else if (res.cancel) {
          
        }
      }
    })
  },
})