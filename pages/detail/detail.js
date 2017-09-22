// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 点击图片 进行展示
   */
  clickImg:function(event){

    wx.previewImage({
      current: 'http://img0.imgtn.bdimg.com/it/u=1053739338,2409833064&fm=27&gp=0.jpg', // 当前显示图片的http链接
      urls: ['http://h.hiphotos.baidu.com/zhidao/pic/item/d6ca7bcb0a46f21f69c1011ef5246b600d33ae82.jpg', 'http://img0.imgtn.bdimg.com/it/u=1053739338,2409833064&fm=27&gp=0.jpg','http://c.hiphotos.baidu.com/lvpics/h=800/sign=2380758a504e9258b9348beeac83d1d1/1ad5ad6eddc451daab689105b0fd5266d1163245.jpg'] // 需要预览的图片http链接列表
    })

    console.log(event.currentTarget);
  },
  /**
   * 点击位置 显示地图的信息
   */
  showLocation:function(event){
    console.log('location');
    wx.openLocation({
      latitude: 28.6040216343,
      longitude: 115.9084439278,
      name: '八大山人基地',
      address: '自定义的基地说明',
      scale: 15,
      complete: function () {
        wx.hideLoading();
      }
    });
  },
  /**
   * 点击电话 调用电话
   */
  callPhone:function(event){
    wx.makePhoneCall({
      phoneNumber: '13684870424' //仅为示例，并非真实的电话号码
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})