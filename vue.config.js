module.exports = {
  // 解决ant-design less报错 https://blog.csdn.net/weixin_43641850/article/details/108296677
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true
        }
      }
    }
  },
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = '湖北省地质博物馆'
      return args
    })
  }
}
