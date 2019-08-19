Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: 'https://dev.wytsoft.com/miniprogram/?',
    src: [{
        src: ''
      },
      {
        src: ''
      },
      {
        src: ''
      },
      {
        src: ''
      },
      {
        src: ''
      },
      {
        src: ''
      },
      {
        src: ''
      },
      {
        src: ''
      },
      {
        src: ''
      }
    ],
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
    array: [],
    arraylevel: ['普通', '紧急'],
    arraytype: ['血样', '其他'],
    index1: 0,
    index2: 0,
    index3: 0,
    multiArrayss: [
      [],
      [],
      []
    ],
    multiArray: [
      [],
      [],
      []
    ],
    multiArrays: [
      [],
      [],
      []
    ],
    multi: [
      [],
      [],
      []
    ],
    multiIndex: [0, 0, 0],
    last: '',
    date: '2016-09-01',
    time: '12:01',
    details: '',
    lock: [],
    res: '',
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
        url: this.data.url + 'svr=MP_00008&fsession=' +
          app.globalData.fsession +
          "&username=" +
          app.globalData.username,
        header: {
          'content-type': 'application/json' // 默认值
        },
        method: 'get',
        success: function(res) {
          that.setData({
            array: res.data.ret.deliver
          })
        },
        fail: function(res) {
          console.log(res);
        }
      }),
      wx.request({
        url: this.data.url + 'svr=MP_00015&fsession=' +
          app.globalData.fsession +
          "&username=" +
          app.globalData.username,
        header: {
          'content-type': 'application/json' // 默认值
        },
        method: 'get',
        success: function(res) {
          var arr1 = [];
          var arr2 = [];
          var arr3 = [];
          var arrs1 = [];
          var arrs2 = [];
          var arrs3 = [];
          var len1 = res.data.ret.a.length;
          var len2 = res.data.ret.b.length;
          var len3 = res.data.ret.c.length;
          for (var i = 0; i < len1; i++) {
            arr1.push(res.data.ret.a[i].name);
            arrs1.push(res.data.ret.a[i].bm);
          }


          for (var i = 0; i < len2; i++) {
            arr2.push(res.data.ret.b[i].name);
            arrs2.push(res.data.ret.b[i].bm);
          }

          for (var i = 0; i < len3; i++) {
            arr3.push(res.data.ret.c[i].name);
            arrs3.push(res.data.ret.c[i].bm);
          }
          that.setData({
            'multiArrayss[0]': arr1,
            'multiArrayss[1]': arr2,
            'multiArrayss[2]': arr3,
            'multiArray[0]': arr1,
            'multiArray[1]': arr2,
            'multiArray[2]': arr3,
            'multiArrays[0]': arrs1,
            'multiArrays[1]': arrs2,
            'multiArrays[2]': arrs3
          })
        },
        fail: function(res) {
          console.log(res);
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
  //图片上传
  pic: function(options) {
    var that = this;
    var app = getApp();
    wx.chooseImage({
      count: 9, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        var arr = [];
        that.setData({
          'display[0].display': 'none',
          'display[1].display': 'none',
          'display[2].display': 'none',
          'display[3].display': 'none',
          'display[4].display': 'none',
          'display[5].display': 'none',
          'display[6].display': 'none',
          'display[7].display': 'none',
          'display[8].display': 'none',
        })
        for (var i = 0; i < tempFilePaths.length; i++) {
          if (i == 0) {
            that.setData({
              'src[0].src': tempFilePaths[i],
              'display[0].display': 'inline-block'
            })
          }
          if (i == 1) {
            that.setData({
              'src[1].src': tempFilePaths[i],
              'display[1].display': 'inline-block'
            })
          }
          if (i == 2) {
            that.setData({
              'src[2].src': tempFilePaths[i],
              'display[2].display': 'inline-block'
            })
          }
          if (i == 3) {
            that.setData({
              'src[3].src': tempFilePaths[i],
              'display[3].display': 'inline-block'
            })
          }
          if (i == 4) {
            that.setData({
              'src[4].src': tempFilePaths[i],
              'display[4].display': 'inline-block'
            })
          }
          if (i == 5) {
            that.setData({
              'src[5].src': tempFilePaths[i],
              'display[5].display': 'inline-block'
            })
          }
          if (i == 6) {
            that.setData({
              'src[6].src': tempFilePaths[i],
              'display[6].display': 'inline-block'
            })
          }
          if (i == 7) {
            that.setData({
              'src[7].src': tempFilePaths[i],
              'display[7].display': 'inline-block'
            })
          }
          if (i == 8) {
            that.setData({
              'src[8].src': tempFilePaths[i],
              'display[8].display': 'inline-block'
            })
          }
          arr.push(tempFilePaths[i]);
          that.setData({
            lock: arr,
            res: res,
          })
        }
      }
    })
  },
  fail: function(res) {
    console.log(res.errMsg)
  },
  bindPickerChange1: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index1: e.detail.value,
    })
  },
  bindPickerChange2: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index2: e.detail.value,
    })
  },
  bindPickerChange3: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index3: e.detail.value,
    })
  },
  bindMultiPickerColumnChange: function(e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    if (e.detail.column == 0) {

      var arr = [];
      var arrs = [];
      var arrbm = [];
      var arrbms = [];
      //二级目录
      for (var i = 0; i < this.data.multiArrays[1].length; i++) {
        if (this.data.multiArrays[1][i].substring(0, 2) == this.data.multiArrays[0][e.detail.value]) {
          arr.push(this.data.multiArray[1][i]); //name
          arrbm.push(this.data.multiArrays[1][i]); //bm
        }
      }

      //三级目录
      for (var i = 0; i < this.data.multiArrays[2].length; i++) {
        if (this.data.multiArrays[2][i].substring(0, 4) == arrbm[0]) {
          arrs.push(this.data.multiArray[2][i]); //name
          arrbms.push(this.data.multiArrays[2][i]); //bm
        }
      }
      this.setData({
        'multiArrayss[1]': arr,
        'multiArrayss[2]': arrs,
        last: e.detail.value,
        'multiIndex[0]': e.detail.value,
      })
      console.log(arrs);
    }

    if (e.detail.column == 1) {
      var arr = [];
      var arrs = [];
      var arrbm = [];
      var arrbms = [];
      //二级目录
      for (var i = 0; i < this.data.multiArrays[1].length; i++) {
        if (this.data.multiArrays[1][i].substring(0, 2) == this.data.multiArrays[0][this.data.last]) {
          arr.push(this.data.multiArray[1][i]); //name
          arrbm.push(this.data.multiArrays[1][i]); //bm
        }
      }

      for (var i = 0; i < this.data.multiArrays[2].length; i++) {
        if (this.data.multiArrays[2][i].substring(0, 4) == arrbm[e.detail.value]) {
          arrs.push(this.data.multiArray[2][i]);
        }
      }
      this.setData({
        'multiArrayss[2]': arrs,
        'multiIndex[1]': e.detail.value,
      })
      console.log(arrs);
    }
    if (e.detail.column == 2) {
      this.setData({
        'multiIndex[2]': e.detail.value,
      })
    }
  },
  bindTextAreaBlur: function(e) {
    var that = this;
    that.setData({
      details: e.detail.value
    });
  },
  reset: function() {
    this.setData({
      details: '',
      'src[0].src': '',
      'src[1].src': '',
      'src[2].src': '',
      'src[3].src': '',
      'src[4].src': '',
      'src[5].src': '',
      'src[6].src': '',
      'src[7].src': '',
      'src[8].src': '',
      'display[0].display': 'none',
      'display[1].display': 'none',
      'display[2].display': 'none',
      'display[3].display': 'none',
      'display[4].display': 'none',
      'display[5].display': 'none',
      'display[6].display': 'none',
      'display[7].display': 'none',
      'display[8].display': 'none',
    })
    wx.showToast({
      title: '已重置',
    })
  },
  //提交
  submit: function() {
    var that = this;
    var app = getApp();
    var bases = [];
    if (that.data.details != '' && that.data.multiArrayss[0][that.data.multiIndex[0]] +
      that.data.multiArrayss[1][that.data.multiIndex[1]] +
      that.data.multiArrayss[2][that.data.multiIndex[2]] != '') {
      for (var i = 0; i < that.data.lock.length; i++) {
        wx.getFileSystemManager().readFile({
          filePath: that.data.res.tempFilePaths[i], //选择图片返回的相对路径
          encoding: 'base64', //编码格式
          success: res => { //成功的回调
            bases.push('data:image/png;base64,' + res.data);
            if (bases.length == that.data.lock.length) {
              wx.request({
                url: this.data.url + 'svr=MP_00012&fsession=' +
                  app.globalData.fsession +
                  "&username=" +
                  app.globalData.username,
                data: {
                  cell_no: app.globalData.cell_no, //手机号
                  detail: that.data.details, //故障描述
                  location: that.data.multiArrayss[0][that.data.multiIndex[0]] + '  ' +
                    that.data.multiArrayss[1][that.data.multiIndex[1]] + '  ' +
                    that.data.multiArrayss[2][that.data.multiIndex[2]], //地点

                  category: that.data.arraytype[that.data.index1], //故障类别
                  level: that.data.arraylevel[that.data.index2], //紧急度
                  repairman: that.data.array[that.data.index3], //维修人
                  bfpic: bases, //图片
                },
                header: {
                  'content-type': 'application/json' // 默认值
                },
                method: 'post',
                success: function(res) {
                  wx.showToast({
                    title: '报修成功',
                  })
                  wx.redirectTo({
                    url: '../repair',
                  })
                },
                fail: function(res) {
                  console.log(res);
                }
              })
            }
          }
        })
      }
      if (that.data.lock.length == 0) {
        wx.request({
          url: this.data.url + 'svr=MP_00012&fsession=' +
            app.globalData.fsession +
            "&username=" +
            app.globalData.username,
          data: {
            cell_no: app.globalData.cell_no, //手机号
            detail: that.data.details, //故障描述
            location: that.data.multiArrayss[0][that.data.multiIndex[0]] + '  ' +
              that.data.multiArrayss[1][that.data.multiIndex[1]] + '  ' +
              that.data.multiArrayss[2][that.data.multiIndex[2]], //地点

            category: that.data.arraytype[that.data.index1], //故障类别
            level: that.data.arraylevel[that.data.index2], //紧急度
            repairman: that.data.array[that.data.index3], //维修人
            bfpic: '', //图片
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          method: 'post',
          success: function(res) {
            wx.showToast({
              title: '报修成功',
            })
            wx.redirectTo({
              url: '../repair',
            })
          },
          fail: function(res) {
            console.log(res);
          }
        })
      }
    } else {
      wx.showToast({
        title: '报修内容或报修地点不能为空',
        icon: 'none'
      })
    }
  }
})