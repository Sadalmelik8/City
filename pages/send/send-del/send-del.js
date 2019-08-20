Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: 'http://39.106.134.196/miniprogram/?',
    src: [],
    display: [{
        display: 'none'
      },
      {
        display: 'none'
      },
      {
        display: 'none'
      },
      {
        display: 'none'
      },
      {
        display: 'none'
      },
      {
        display: 'none'
      },
      {
        display: 'none'
      },
      {
        display: 'none'
      },
      {
        display: 'none'
      }
    ],
    serialno: '',
    detail: '',
    map: '',
    category: '',
    level: '',
    applicant: '',
    aplcell: '',
    apltime: '',
    repairman: '',
    imgsrc: '',
    style: 'none',
    styles: 'none',
    imgstyle: '',
    height: '',
    width: '',
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
      url: this.data.url + 'svr=MP_00028&fsession=' +
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
        if (!res.data.ret[0].id) {
          that.setData({
            detail: res.data.ret[0].detail, //故障描述
            map: res.data.ret[0].location, //地点
            // category: res.data.ret[0].category, //类别
            level: res.data.ret[0].level, //紧急度
            apltime: res.data.ret[0].spotime, //报修时间
            applicant: res.data.ret[0].spoter, //报修人
            // cell_no: res.data.ret[0].aplcell, //维修人联系方式
            src: res.data.ret[0].bfpic, //图片
            repairman: res.data.ret[0].disposer, //接修人
          })
          for (var i = 0; i < res.data.ret[0].bfpic.length; i++) {
            if (i == 0) {
              that.setData({
                'src[0]': res.data.ret[0].bfpic[i],
                'display[0].display': 'inline-block'
              })
            }
            if (i == 1) {
              that.setData({
                'src[1]': res.data.ret[0].bfpic[i],
                'display[1].display': 'inline-block'
              })
            }
            if (i == 2) {
              that.setData({
                'src[2]': res.data.ret[0].bfpic[i],
                'display[2].display': 'inline-block'
              })
            }
            if (i == 3) {
              that.setData({
                'src[3]': res.data.ret[0].bfpic[i],
                'display[3].display': 'inline-block'
              })
            }
            if (i == 4) {
              that.setData({
                'src[4]': res.data.ret[0].bfpic[i],
                'display[4].display': 'inline-block'
              })
            }
            if (i == 5) {
              that.setData({
                'src[5]': res.data.ret[0].bfpic[i],
                'display[5].display': 'inline-block'
              })
            }
            if (i == 6) {
              that.setData({
                'src[6]': res.data.ret[0].bfpic[i],
                'display[6].display': 'inline-block'
              })
            }
            if (i == 7) {
              that.setData({
                'src[7]': res.data.ret[0].bfpic[i],
                'display[7].display': 'inline-block'
              })
            }
            if (i == 8) {
              that.setData({
                'src[8]': res.data.ret[0].bfpic[i],
                'display[8].display': 'inline-block'
              })
            }
          }
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
  //拨号
  acc_no: function() {
    wx.makePhoneCall({
      phoneNumber: this.data.cell_no,
    })
  },
  //预览图片
  goscan: function(e) {
    // this.setData({
    //   imgsrc: e.target.dataset.imgsrc,
    //   style: 'block',
    //   styles: 'flex',
    //   imgstyle: 'none',
    // })
    var src = e.currentTarget.dataset.imgsrc;
    var imglist = [];
    for (var i = 0; i < this.data.src.length; i++) {
      imglist.push('data:image/jpeg;base64,' + this.data.src[i]);
    }
    wx.previewImage({
      current: 'data:image/jpeg;base64,' + src, // 当前显示图片的http链接
      urls: imglist, // 需要预览的图片http链接列表
      success: function(res) {
        console.log(res);
      },
      fail: function(res) {
        console.log(res);
      },
      complete: function(res) {
        console.log(res);
      },
    })
  },
  // imgs: function(e) {
  //   console.log(e.detail);
  //   this.setData({
  //     width: 750,
  //     height: e.detail.height / e.detail.width * 750,
  //   })
  // },
  //取消预览
  onscan: function() {
    this.setData({
      style: 'none',
      imgstyle: 'block',
    })
  }
})