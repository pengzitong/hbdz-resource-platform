module.exports = {
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = '湖北省地质博物馆'
      return args
    })
  }
}
