Page({

  /**
   * 页面的初始数据
   */
  data: {
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
    array: ['美国', '中国', '巴西', '日本'],
    objectArray: [{
        id: 0,
        name: '美国'
      },
      {
        id: 1,
        name: '中国'
      },
      {
        id: 2,
        name: '巴西'
      },
      {
        id: 3,
        name: '日本'
      }
    ],
    index: 0,
    multiArray: [
      ['1号楼', '2号楼'],
      ['1层', '2层', '3层', '4层', '5层'],
      ['103', '206']
    ],
    objectMultiArray: [
      [{
          id: 0,
          name: '1号楼'
        },
        {
          id: 1,
          name: '2号楼'
        }
      ],
      [{
          id: 0,
          name: '1层'
        },
        {
          id: 1,
          name: '2层'
        },
        {
          id: 2,
          name: '3层'
        },
        {
          id: 3,
          name: '4层'
        },
        {
          id: 3,
          name: '5层'
        }
      ],
      [{
          id: 0,
          name: '103'
        },
        {
          id: 1,
          name: '206'
        }
      ]
    ],
    multiIndex: [0, 0, 0],
    date: '2016-09-01',
    time: '12:01',
    region: ['广东省', '广州市', '海珠区'],
    customItem: '全部',
    details: ''
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
          wx.uploadFile({
            url: that.data.url +
              'svr=MP_00000&fsession=' +
              app.globalData.fsession +
              "&username=" +
              app.globalData.username,
            filePath: tempFilePaths[i],
            name: 'pic',
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
              //'content-type': 'application/json' // 默认值
            },
            formData: {},
            success: function(res) {
              console.log(1);
            }
          })
        }
      }
    })
  },
  fail: function(res) {
    console.log(res.errMsg)
  },
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  bindMultiPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
  },
  bindMultiPickerColumnChange: function(e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex[0]) {
          case 0:
            data.multiArray[1] = ['扁性动物', '线形动物', '环节动物', '软体动物', '节肢动物'];
            data.multiArray[2] = ['猪肉绦虫', '吸血虫'];
            break;
          case 1:
            data.multiArray[1] = ['鱼', '两栖动物', '爬行动物'];
            data.multiArray[2] = ['鲫鱼', '带鱼'];
            break;
        }
        data.multiIndex[1] = 0;
        data.multiIndex[2] = 0;
        break;
      case 1:
        switch (data.multiIndex[0]) {
          case 0:
            switch (data.multiIndex[1]) {
              case 0:
                data.multiArray[2] = ['猪肉绦虫', '吸血虫'];
                break;
              case 1:
                data.multiArray[2] = ['蛔虫'];
                break;
              case 2:
                data.multiArray[2] = ['蚂蚁', '蚂蟥'];
                break;
              case 3:
                data.multiArray[2] = ['河蚌', '蜗牛', '蛞蝓'];
                break;
              case 4:
                data.multiArray[2] = ['昆虫', '甲壳动物', '蛛形动物', '多足动物'];
                break;
            }
            break;
          case 1:
            switch (data.multiIndex[1]) {
              case 0:
                data.multiArray[2] = ['鲫鱼', '带鱼'];
                break;
              case 1:
                data.multiArray[2] = ['青蛙', '娃娃鱼'];
                break;
              case 2:
                data.multiArray[2] = ['蜥蜴', '龟', '壁虎'];
                break;
            }
            break;
        }
        data.multiIndex[2] = 0;
        console.log(data.multiIndex);
        break;
    }
    this.setData(data);
  },
  bindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },
  bindRegionChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  bindTextAreaBlur: function(e) {
    var that = this;
    that.setData({
      details: e.detail.value
    });
    console.log(that.data.details);
  }
})