Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: 'https://jxetyy.wytdev.com/miniprogram/?',
    array: [],
    arr: [],
    arraylevel: ['普通', '紧急'],
    arraytype: ['血样', '大小便', '药品', '其他'],
    index1: 0,
    index2: 0,
    index3: 0,
    index4: 0,
    add: [],
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
    detail: '',
    details: [],
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
    var array = [];
    var arr = [];
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
        array.push('配送中心');
        for (var i = 0; i < res.data.ret.deliver.length; i++) {
          array.push(res.data.ret.deliver[i]);
        }
        that.setData({
          array: array,
        })
      },
      fail: function(res) {
        console.log(res);
      }
    })
    wx.request({
      url: this.data.url + 'svr=MP_00071&fsession=' +
        app.globalData.fsession +
        "&username=" +
        app.globalData.username,
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'get',
      success: function(res) {
        for (var i = 0; i < res.data.ret.length; i++) {
          arr.push(res.data.ret[i].dept)
        }
        console.log(arr);
        that.setData({
          arr: arr,
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
  onHide: function() {},

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
  num: function(e) {
    var that = this;
    var app = getApp();
    that.data.add[e.currentTarget.id] = e.detail.value;
    console.log(e.currentTarget.id)
    console.log(e.detail.value)
    this.setData({
      add: that.data.add,
    })
    console.log(that.data.add);
  },
  // setValue: function(e) {
  //   var that = this;
  //   that.setData({
  //     iptValue: e.detail.value
  //   })
  // },
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
  bindPickerChange4: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index4: e.detail.value,
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
  expInput: function(e) {
    this.setData({
      detail: e.detail.value
    })
  },
  //手工录入
  onclick: function(e) {
    var app = getApp();
    if (this.data.detail != '') {
      if (app.globalData.sccode.length == 0) {
        app.globalData.sccode.push(this.data.detail);
        var a = [];
        for (var i = 0; i < app.globalData.sccode.length; i++) {
          a.push(app.globalData.sccode[i]);
        }
        var s = this.data.add.length;
        this.data.add[s] = "1";
        this.setData({
          details: a,
          detail: '',
          add: this.data.add
        })
        wx.showToast({
          title: '录入成功',
        })
        console.log(this.data.add);
      } else if (app.globalData.sccode.length != 0) {
        for (var i = 0; i < app.globalData.sccode.length; i++) {
          if (app.globalData.sccode[i] == this.data.detail) {
            wx.showToast({
              title: '已添加此标本号',
              icon: 'none'
            })
            this.setData({
              detail: '',
            })
            break;
          } else {
            if (i == app.globalData.sccode.length - 1) {
              app.globalData.sccode.push(this.data.detail);
              var a = [];
              for (var i = 0; i < app.globalData.sccode.length; i++) {
                a.push(app.globalData.sccode[i]);
              }
              var s = this.data.add.length;
              this.data.add[s] = "1";
              this.setData({
                details: a,
                detail: '',
                add: this.data.add
              })
              i = app.globalData.sccode.length;
              wx.showToast({
                title: '录入成功',
              })
              console.log(this.data.add);
            }

          }
        }
      }
    } else {
      console.log(app.globalData.sccode.length);
      wx.showToast({
        title: '标本号不能为空',
        icon: 'none'
      })
    }
  },
  reset: function() {
    var that = this;
    var app = getApp();
    app.globalData.sccode = [];
    this.setData({
      detail: '',
      details: [],
      add:[],
    })
    console.log(this.data.details);
    wx.showToast({
      title: '已重置',
    })
    console.log(app.globalData.sccode.length);
  },
  //扫码
  pic: function() {
    var that = this;
    var app = getApp();
    wx.scanCode({
      success: function(res) {
        if (app.globalData.sccode.length == 0) {
          app.globalData.sccode.push(res.result);
        } else if (app.globalData.sccode.length != 0) {
          for (var i = 0; i < app.globalData.sccode.length; i++) {
            if (app.globalData.sccode[i] != res.result && i == app.globalData.sccode.length - 1) {
              app.globalData.sccode.push(res.result);
              i = app.globalData.sccode.length;
              var s = this.data.add.length;
              this.data.add[s] = "1";
              this.setData({
                add: this.data.add
              })
            } else {
              wx.showToast({
                title: '已添加此标本号',
                icon: 'none'
              })
              this.setData({
                detail: '',
              })
            }
          }
        }
        that.pic();
      }
    })
    that.setData({
      details: app.globalData.sccode,
    })
  },
  //删除
  deliverys: function(e) {
    var app = getApp();
    var that = this;
    console.log(e);
    wx.showModal({
      title: '是否删除该标本号',
      content: e.currentTarget.id,
      success(res) {
        if (res.confirm) {
          for (var i = 0; i < app.globalData.sccode.length; i++) {
            if (app.globalData.sccode[i] == e.currentTarget.id) {
              app.globalData.sccode.splice(i, 1);
              that.data.add.splice(i,1);
              that.setData({
                details: app.globalData.sccode,
                add:that.data.add
              })
            }
          }
        } else if (res.cancel) {

        }
      }
    })
  },

  //提交
  submit: function() {
    var that = this;
    var app = getApp();
    if (that.data.details != '') {
      wx.request({
        url: this.data.url + 'svr=MP_00010&fsession=' +
          app.globalData.fsession +
          "&username=" +
          app.globalData.username,
        data: {
          cell_no: app.globalData.cell_no, //手机号
          sampleno: that.data.details, //标本号
          qty: this.data.add,//数量
          sampletype: that.data.arraytype[that.data.index1], //类别
          level: that.data.arraylevel[that.data.index2], //紧急度
          deliver: that.data.array[that.data.index3], //配送人
          rec_dept: that.data.arr[that.data.index4], //收件科室
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        method: 'post',
        success: function(res) {
          app.globalData.sccode = [];
          if(res.data.ret.id == 1){
            wx.showToast({
              title: '提交成功',
            })
            wx.redirectTo({
              url: '../deliverytj',
            })
          }else{
            wx.showToast({
              title: '提交失败，请重试！',
            })
          }
        },
        fail: function(res) {
          console.log(res);
        }
      })
      // if (that.data.lock.length == 0) {
      //   wx.request({
      //     url: this.data.url + 'svr=MP_00012&fsession=' +
      //       app.globalData.fsession +
      //       "&username=" +
      //       app.globalData.username,
      //     data: {
      //       cell_no: app.globalData.cell_no, //手机号
      //       detail: that.data.details, //故障描述
      //       location: that.data.multiArrayss[0][that.data.multiIndex[0]] + '  ' +
      //         that.data.multiArrayss[1][that.data.multiIndex[1]] + '  ' +
      //         that.data.multiArrayss[2][that.data.multiIndex[2]], //地点
      //       category: that.data.arraytype[that.data.index1], //故障类别
      //       level: that.data.arraylevel[that.data.index2], //紧急度
      //       repairman: that.data.array[that.data.index3], //维修人
      //       bfpic: '', //图片
      //     },
      //     header: {
      //       'content-type': 'application/json' // 默认值
      //     },
      //     method: 'post',
      //     success: function(res) {
      //       wx.showToast({
      //         title: '提交成功',
      //       })
      //       wx.redirectTo({
      //         url: '../repair',
      //       })
      //     },
      //     fail: function(res) {
      //       console.log(res);
      //     }
      //   })
      // }
    } else {
      wx.showToast({
        title: '标本号不能为空',
        icon: 'none',
      })
    }
  }
})