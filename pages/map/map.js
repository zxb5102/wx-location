//location.js
//获取应用实例
var app = getApp();
import testData from '../../utils/testData.json.js';
Page({
  onReady: function (e) {
    // 使用 wx.createMapContext 获取 map 上下文
    this.mapCtx = wx.createMapContext('mapList');
    var page = this;

    //查询page  的Map 的宽高
    wx.createSelectorQuery().select('#mapList').fields({
      size: true,
    }, function (res) {

      //定义一个 地图指示针在地图的中央
      var needle = [
        {
          id: 'move-center',
          iconPath: '/images/location3.jpg',
          position: {
            left: res.width / 2 - 10,
            top: res.height / 2 - 40,
            width: 20,
            height: 40
          },
          clickable: false
        }
      ];

      //设置地图的控件
      page.setData({
        controls: page.data.controls.concat(needle)
      });
    }).exec();

  },
  data: {
    lastLatitude: 0,
    lastLongitude: 0,
    latitude: 39.8965675777,
    longitude: 116.4028930664,
    urlAddress: '',
    markers: [],
    limit: 15,
    controls: [{
      id: 'move-center',
      iconPath: '/images/map-location.png',
      position: {
        left: 10,
        top: 10,
        width: 40,
        height: 40
      },
      clickable: true
    }],
    items: [],
    isLoading: false
  },

  changeMarks: function (res, page) {//统一调用的设置坐标点的方法

    //解析后台json数据 添加 markers
    var dex = 0;
    var items = res.data;
    //保存数据
    page.items = items;
    page.setData({
      items: items,
      isLoading: false
    });
    var ary = new Array();

    for (dex; dex < items.length; dex++) {
      var base = items[dex];
      var item = {
        id: dex,
        name: base.fdName,
        latitude: base.fdLatitude,
        longitude: base.fdLongitude,
        iconPath: '/images/location2.png',//橙色的效果
        width: 35,
        height: 35
      }
      ary.push(item);
    }
    page.setData({
      markers: ary
    });
  },
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
  onLoad: function () {
    var page = this;

    var app = getApp();

    page.setData({
      urlAddress: app.globalData.urlAddress,
      /*设置加载中 的状态 */
      isLoading: true,
      items: []
    });

    //设置地图的中心点
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude;
        var longitude = res.longitude;
        page.setData({
          latitude: latitude,
          longitude: longitude
        });

        //请求周围的数据点
        wx.request({
          url: page.data.urlAddress,
          data: {
            fdLatitude: page.data.latitude,
            fdLongitude: page.data.longitude,
            limit: page.data.limit
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {

          },
          complete: function () {
            var res = new Object();
            res.data = testData.items;
            //改变坐标时候调用
            page.changeMarks(res, page);
          }

        })

      }
    });

  },
  onShow: function () {

  },
  //点击 瞄准的控件 地图视野回归初始的中心位置
  controltap: function (event) {
    if (event.controlId == 'move-center') {
      wx.createMapContext('mapList').moveToLocation();
    }
  },
  markertap: function (event) {

  },
  //气泡的点击事件 当前版本注释掉点击事件
  callouttap: function (event) {
    var base = this.items[parseInt(event.markerId)];

    //拼接URL 和 参数 
    wx.navigateTo({
      url: '/pages/detail/detail?fdBaseThumbImg=' + base.fdBaseThumbImg + '&fdBaseName=' + base.fdName + '&fdAddress=' + base.fdAddress + '&fdHeadTeacher=' + base.fdHeadTeacher + '&fdHeadTeacherPhone=' + base.fdHeadTeacherPhone + '&paintingPhotos=' + base.paintingPhotos + '&basePhotos=' + base.basePhotos + '&fdLongitude=' + base.fdLongitude + '&fdLatitude=' + base.fdLatitude
    })
  },
  //视野发生改变调用
  regionchange: function (event) {

    var page = this;
    if (event.type == 'end') {
      var map = wx.createMapContext("mapList");
      var items = [];
      map.getCenterLocation({
        success: function (res) {

          //视野发生改变确定经纬度是否改变
          if (res.latitude != page.data.lastLatitude && res.longitude != page.data.lastLongitude) {
            //记录本次移动的经纬度
            page.setData({
              lastLatitude: res.latitude,
              lastLongitude: res.longitude,
              /* 设置加载状态*/
              isLoading: true,
              items: []
            });


            //请求周围的基地信息
            wx.request({
              url: page.data.urlAddress,
              data: {
                fdLatitude: page.data.lastLatitude,
                fdLongitude: page.data.lastLongitude,
                limit: page.data.limit
              },
              header: {
                'content-type': 'application/json' // 默认值
              },
              success: function (res) {

              },
              complete: function () {
                //改变坐标时候调用
                var res = new Object();
                res.data = testData.items;
                page.changeMarks(res, page);
              }
            })

          }

        },
        complete: function () {
        }
      });
    }
  }
})
