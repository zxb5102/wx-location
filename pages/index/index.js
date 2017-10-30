//index.js
//获取应用实例
const app = getApp()
import testData from '../../utils/testData.json.js';
Page({
  data: {
    items: [],
    total: 0,
    page: 1,
    pageSize: 10,
    hasMore: true,
    once: false,
    loadding: false,
    urlAddress: '',
    latitude: '',
    longitude: ''
  },
  onLoad: function () {

    var page = this;

    var app = getApp();
    page.setData({
      urlAddress: app.globalData.urlAddress
    });

    //获取用户的经纬度
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        page.setData({
          latitude: latitude,
          longitude: longitude
        });
      },
      fail: function () {
        //获取用户的信息失败   默认设置
        page.setData({
          latitude: 28.6046480209,
          longitude: 115.9149456024
        });
      }, complete: function () {
        //请求等待的时候显示等待加载中.....
        wx.showLoading({
          title: '加载中....',
          icon: 'loading',
          mask: true
        });
        //请求后台数据
        wx.request({
          url: page.data.urlAddress, //仅为示例，并非真实的接口地址
          data: {
            pageSize: page.data.pageSize,
            page: page.data.page,
            fdLatitude: page.data.latitude,
            fdLongitude: page.data.longitude
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {

          },
          complete: function () {
            var res = new Object();
            res.data = testData;
            //渲染完成 解除等待显示
            wx.hideLoading();
            ;
            //解析后台返回的 json  数据
            page.setData({
              items: res.data.items,
              total: res.data.total,
              once: true,
              page: page.data.page + 1
            });
            //判断是否还有数据
            if (page.data.total == page.data.items.length) {
              page.setData({
                hasMore: false
              });
            }
          }
        })
      }
    });

  },
  //快速拨打电话号码
  quickCall: function (event) {
    var phone = event.currentTarget.dataset.phone;
    //判断电话号码是否可用
    if (phone != null) {
      wx.makePhoneCall({
        phoneNumber: phone
      })
    }

  },

  loadMore: function (event) {

    if ((!this.data.loadding) && this.data.hasMore) {

      //防止多次触底 触发多次
      this.setData({
        loadding: true
      });
      var page = this;

      //请求后台数据
      wx.request({
        url: page.data.urlAddress, //仅为示例，并非真实的接口地址
        data: {
          pageSize: page.data.pageSize,
          page: page.data.page,
          fdLatitude: page.data.latitude,
          fdLongitude: page.data.longitude
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {

        },
        fail: function () {

        },
        complete: function (res) {

          var res = new Object();
          res.data = testData;
          //解析后台返回的 json  数据
          var items = page.data.items.concat(res.data.items);//拼接上原来的数据
          page.setData({
            items: items,
            all: res.data.total,
            loadding: false,
            page: page.data.page + 1
          });

          //判断是否还有数据
          if (page.data.total == page.data.items.length) {
            page.setData({
              hasMore: false
            });
          }

        }
      })


    }
  },
  //点击跳转到详细页面
  tapItem: function (event) {

    var dataset = event.currentTarget.dataset;
    var url = '/pages/detail/detail?';
    var ary = new Array();
    if (dataset.fdname != null) {
      ary.push("fdBaseName=" + dataset.fdname);
    }

    if (dataset.fdaddress != null) {
      ary.push("fdAddress=" + dataset.fdaddress);
    }

    if (dataset.fdheadteacher != null) {
      ary.push("fdHeadTeacher=" + dataset.fdheadteacher);
    }

    if (dataset.fdheadteacherphone != null) {
      ary.push("fdHeadTeacherPhone=" + dataset.fdheadteacherphone);
    }

    if (dataset.paintingphotos.length > 0) {
      ary.push("paintingPhotos=" + dataset.paintingphotos);
    }

    if (dataset.basephotos.length > 0) {
      ary.push("basePhotos=" + dataset.basephotos);
    }


    if (dataset.fdlongitude != null) {
      ary.push("fdLongitude=" + dataset.fdlongitude);
    }

    if (dataset.fdlatitude != null) {
      ary.push("fdLatitude=" + dataset.fdlatitude);
    }



    if (dataset.fdbasethumbimg != null) {
      ary.push("fdBaseThumbImg=" + dataset.fdbasethumbimg);
    }

    ary.forEach(function (val, index, ary) {
      url += val + '&';
    });
    url = url.substring(0, url.lastIndexOf('&'));

    wx.navigateTo({
      url: url
    })
  },
  scroll: function (event) {

  }
})
