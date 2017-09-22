//location.js
//获取应用实例
var app = getApp()
Page({
  onReady: function (e) {
    // 使用 wx.createMapContext 获取 map 上下文
    this.mapCtx = wx.createMapContext('myMap');
    var page = this;

    wx.createSelectorQuery().select('#mapList').fields({
      size: true,
    }, function (res) {


      var needle = [
        {
          id: 'move-center',
          iconPath: '/images/needle.png',
          position: {
            left: res.width / 2,
            top: res.height / 2,
            width: 40,
            height: 40
          },
          clickable: false
        }
      ];

      page.setData({
        controls: page.data.controls.concat(needle)
      });
    }).exec();

  },
  data: {
    latitude: 23.099994,
    longitude: 113.324520,
    markers: [{
      latitude: 23.099994,
      longitude: 113.324520
    }],
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
    markers: [

    ]

  },
  onLoad: function () {






    var map = this;



    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude;
        var longitude = res.longitude;
        map.setData({
          latitude: latitude,
          longitude: longitude
        });

        map.mapCtx.moveToLocation();

      }
    });

    //.moveToLocation();
  },
  onShow: function () {
    /*
        this.mapCtx = wx.createMapContext('mapList');
        this.mapCtx.includePoints({
          padding: [100, 100, 100, 100],
          points: [
            {
              id: 0,
              title: '八大三人基地',
              latitude: 28.6806500000,
              longitude: 115.8804600000
            },
            {
              id: 1,
              title: '八大三人基地',
              latitude: 28.6740972263,
              longitude: 115.9044957161
            },
            {
              id: 2,
              title: '八大三人基地',
              latitude: 28.6615582459,
              longitude: 115.9000325203
            },
            {
              id: 3,
              title: '八大三人基地',
              latitude: 28.5768338024,
              longitude: 115.7852554321
            }
          ]
        }
        );
    */
  },
  controltap: function (event) {
    if (event.controlId == 'move-center') {
      wx.createMapContext('mapList').moveToLocation();
    }
  },
  markertap: function (event) {
    console.log(event);
  },
  callouttap: function (event) {
    wx.navigateTo({
      url: '/pages/detail/detail'
    })
  },
  regionchange: function (event) {
    var page = this;
    if (event.type == 'end') {
      var map = wx.createMapContext("mapList");
      var items = [];
      map.getCenterLocation({
        success: function (res) {
          console.log(res.longitude);
          console.log(res.latitude);
          for (var i = 1; i <= 4; i++) {
            var id = i;
            var name = '八大三人基地'+i;
            var latitude = res.latitude + (i*0.01) ;
            var longitude = res.longitude + (i*0.01);
            var item = {
              id:id,
              name:name,
              latitude: latitude,
              longitude: longitude
            }
            items.push(item);
          }
          page.setData({
            markers:items
          });
        },
        complete: function () {
        }
      });
    }
  }
})
