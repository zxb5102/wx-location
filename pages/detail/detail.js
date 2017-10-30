// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fdBaseName: '',
    fdAddress: '',
    fdBaseThumbImg: '',
    fdHeadTeacherPhone: '',
    fdHeadTeacher: '',
    basePhotos: [],
    paintingPhotos: [],
    fdLongitude:0,
    fdLatitude:0,
    urlAddress:'',
    marginValue:0
  },

  /**
   * 点击图片 进行展示
   */
  clickImg: function (event) {

    //获取图片 的url 
    var imgId = event.currentTarget.id;
    var imgSrc = '';
    var srcAry = [];
    var ary = imgId.split('-');

    if (imgId.indexOf('paintingPhotos') > -1) {
      //作品照片 获取照片的url
      srcAry = this.data.paintingPhotos;
    } else {
      //基地照片 获取照片的url
      srcAry = this.data.basePhotos;
    }
    var dex = parseInt(ary[ary.length - 1]);

    imgSrc = srcAry[dex];

    //console.log(imgSrc);

    wx.previewImage({
      current: imgSrc, // 当前显示图片的http链接
      urls: srcAry
    })
  },
  /*设置分享页面的信息 */
  onShareAppMessage: function () {
    return {
      title: this.data.fdBaseName
    };
  },
  /**
   * 点击位置 显示地图的信息
   */
  showLocation: function (event) {
    var page = this;

    wx.openLocation({
      latitude: page.data.fdLatitude,
      longitude: page.data.fdLongitude,
      name: page.data.fdBaseName,
      address: page.data.fdAddress,
      scale: 15,
      complete: function () {
        wx.hideLoading();
      }
    });
  },
  /**
   * 点击电话 调用电话
   */
  callPhone: function (event) {
    var fdHeadTeacherPhone = this.data.fdHeadTeacherPhone;
    
    //判断电话是否可用
    if (fdHeadTeacherPhone != null){
      wx.makePhoneCall({
        phoneNumber: fdHeadTeacherPhone
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var page = this;
    var query = wx.createSelectorQuery()
    query.select('#img').boundingClientRect(function(rect){
      
      var r = 1242/rect.width;
      var h = 520/r;
      
      
      page.setData({
        marginValue:h
      });
      
    }).exec();

    //动态的设置页面的标题
    wx.setNavigationBarTitle({
      title: decodeURIComponent(options.fdBaseName)//页面标题为基地的名称
    })
    

    var app = getApp();
    this.setData({
      urlAddress: app.globalData.urlAddress
    });

    this.setData({
      fdBaseName: decodeURIComponent(options.fdBaseName),
      fdAddress: decodeURIComponent(options.fdAddress),
      fdLongitude: parseFloat(options.fdLongitude),
      fdLatitude: parseFloat(options.fdLatitude),
      fdBaseThumbImg: decodeURIComponent(options.fdBaseThumbImg),
      fdHeadTeacherPhone:options.fdHeadTeacherPhone,
      fdHeadTeacher: decodeURIComponent(options.fdHeadTeacher),
      
      basePhotos: options.basePhotos ? decodeURIComponent(options.basePhotos).split(',') : new Array(),
      paintingPhotos:options.paintingPhotos ? decodeURIComponent(options.paintingPhotos).split(',') : new Array()

    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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

  }
})