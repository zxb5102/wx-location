//index.js
//获取应用实例
const app = getApp()
var data = require('./load');

Page({
  data: {
    items: [],
    all: 0,
    page: 0,
    pageSize: 10,
    hasMore: true,
    once: false,
    motto: 'Hello World',
    loadding: false,
    userInfo: {},
    hasUserInfo: false,
    testCount: 0,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {

    var page = this;

    wx.showLoading({
      title: '加载中....',
      icon: 'loading',
      mask: true
    });

    setTimeout(function () {

      //初次渲染数据
      wx.hideLoading();
      page.setData({
        items: data.items,
        all: 10,
        once: true,
        loadding: false
      });

    }, 1000);










    //console.log(123);
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  loadMore: function (event) {

    //console.log(this.data.hasMore);
    if ((!this.data.loadding) && this.data.hasMore) {
      this.setData({
        loadding: true
      });

//      console.log(1);

      var page = this;

      /*wx.showLoading({
        title: '加载中....',
        icon: 'loading',
        mask: true
      });*/

      setTimeout(function () {


        wx.hideLoading();
        var items = page.data.items.concat(data.items);
        //设置数据
        page.setData({
          items: items,
          all: 10,
          loadding: false
        });
        //设置数据次数

        var testCount2 = page.data.testCount;
        page.setData({
          testCount: testCount2 + 1
        });
        //判断是否还有数据
        if (page.data.testCount == 2) {
          page.setData({
            hasMore: false
          });
        }

      }, 1000);

    }
  },
  scroll: function (event) {

  }
})
