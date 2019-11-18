Page({

  /**
   * 页面的初始数据
   */
  data: {

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
    var app = getApp();
    console.log(app.globalData.profession)
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
  delivery: function(e) {
    var app = getApp();
    for (var i = 0; i < app.globalData.profession.length; i++) {
      if (app.globalData.profession[i] == 1 || app.globalData.profession[i] == 11) {
        wx.navigateTo({
          url: '../delivery/delivery',
        })
        return;
      } 
      else if (app.globalData.profession[i]==0){

        wx.navigateTo({
          url: '../delivery/deliverytj/deliverytj',
        })
        return;
      }
      else{
        wx.showToast({
          title: '你无权进入此模块',
          icon: 'none',
        })
      }
    }
  },
  repair: function(e) {
    var app = getApp();
    for (var i = 0; i < app.globalData.profession.length; i++) {
      if (app.globalData.profession[i] == 0 || app.globalData.profession[i] == 2 || app.globalData.profession[i] == 22) {
        wx.navigateTo({
          url: '../repair/repair',
        })
        return;
      } else if (i == app.globalData.profession.length - 1) {
        wx.showToast({
          title: '你无权进入此模块',
          icon: 'none',
        })
      }
    }

  },
  send: function(e) {
    var app = getApp();
    for (var i = 0; i < app.globalData.profession.length; i++) {
      if (app.globalData.profession[i] == 0 || app.globalData.profession[i] == 3 || app.globalData.profession[i] == 33) {
        wx.navigateTo({
          url: '../send/send',
        })
        return;
      } else if (i == app.globalData.profession.length - 1) {
        wx.showToast({
          title: '你无权进入此模块',
          icon: 'none',
        })
      }
    }

  },
  clear: function(e) {
    var app = getApp();
    for (var i = 0; i < app.globalData.profession.length; i++) {
      if (app.globalData.profession[i] == 0 || app.globalData.profession[i] == 4 || app.globalData.profession[i] == 44) {
        if (app.globalData.type == 0) {
          wx.navigateTo({
            url: '../clear/cleardept/cleardept',
          })
        } else if (app.globalData.type == 1) {
          wx.navigateTo({
            url: '../clear/clears-room/clears-room',
          })
        }
        return;
      } else if (i == app.globalData.profession.length - 1) {
        wx.showToast({
          title: '你无权进入此模块',
          icon: 'none',
        })
      }
    }
  }
})