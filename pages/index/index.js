//index.js
//获取应用实例
var app = getApp();
var url = 'https://test.genwoshua.com/alpha/api/article/query';
Page({
   data: {
      articles:null
    }, 
   onReady: function () {
    //初始加载
    refresh(this);
  } ,
    
    onPullDownRefresh: function() {
        // Do something when pull down.
        console.log('刷新');
    },
    onReachBottom: function() {
        // Do something when page reach bottom.
        refresh(this);
    },

    area:function(){
  	    wx.showModal({
            title: '提示',
            content: '暂时只支持成都地区',
            success: function(res) {
                if (res.confirm) {
                console.log('用户点击确定')
                }
            }
        })
    },
    detailLoad:function(){

    },
    toDetail:function(event){
      //  var url = event.currentTarget.dataset.article.origin;
      //  var that = this;
      // console.log(url)
    },
  //事件处理函数
  bindViewTap: function() {
    console.log('bindViewTap')
  }
})

function refresh(that){
 var queryObject = new Object({
   size:3
 });
 console.log(that.data.articles);
      if(that.data.articles!=null){
        queryObject.fromId = that.data.articles[that.data.articles.length-1].id;
      }
        wx.request({
          url: url,
          method: 'post',
          header: {
            'content-type': 'application/json'
          },
          data:queryObject,
          success: function(res) {
            var articles = res.data.content;
            var lastPage = res.data.lastPage;//根据页码判断是否显示
            //console.log(articles)
            var newArticles = that.data.articles;
                if(newArticles == null){
                  newArticles = articles;
                }
            for(let index in articles){
                var article = articles[index];
                if(article.tags){
                  article.tags = article.tags.split(',');
                }else{
                  article.tags =""
                }
                if(that.data.articles!=null){
                  newArticles.push(article);
                }
              }
              that.setData({articles:newArticles})
            if(lastPage){
              console.log('没有更多消息了')
            }
            
          }
       })
}