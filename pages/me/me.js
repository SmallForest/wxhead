const app = getApp()

Page({
  jump: function () {
      wx.navigateTo({
          url: '/pages/us/us',
      })

  },

  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  }
})