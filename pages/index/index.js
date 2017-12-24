//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        happyImage:''
    },

    onLoad: function () {
        let headImage = wx.getStorageSync('happyImage');
        if(headImage){
            this.setData({
                happyImage:headImage
            })
        }else{
            console.log('再去获取处理过的头像路径');
        }
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
        } else if (this.data.canIUse){
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
    getUserInfo: function(e) {

        app.globalData.userInfo = e.detail.userInfo;

        wx.setStorageSync('happyImage' , e.detail.userInfo.avatarUrl);
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true,
            happyImage: wx.getStorageSync('happyImage')
        })

    },
    download: function () {
        wx.getSetting({
            success(res) {
                if (!res.authSetting['scope.writePhotosAlbum']) {
                    wx.authorize({
                        scope: 'scope.writePhotosAlbum',
                        success() {


                        }
                    })
                }
            }
        })
        if (!wx.saveImageToPhotosAlbum) {
            // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
            wx.showModal({
                title: '提示',
                content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
            })
        }


        wx.downloadFile({
            url: wx.getStorageSync('happyImage'),
            success: function(res){
                if (res.statusCode === 200) {

                    wx.saveImageToPhotosAlbum({
                        filePath:res.tempFilePath,
                        success:function(){
                            wx.showModal({
                                title: '提示',
                                content: '保存成功'
                            })
                        },
                        fail:function(){
                            wx.showModal({
                                title: '提示',
                                content: '保存失败'
                            })
                        }
                    })
                } else {
                    wx.showModal({
                        title: '提示',
                        content: '不知道！'
                    })
                }
            },
            fail: function(){

            }
        })
    }
})
