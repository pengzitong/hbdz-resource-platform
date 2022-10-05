# hbdz-resource-platform

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### 测试阶段部署
构建完前端代码之后（npm run build:prod构建dist后）：
1.激活ip:https://fortress-machine.leqi.us/ （邮箱rongsuo.pan@leqi.ai)
2.把id_rsa文件保存到电脑里后,在命令行执行 chmod 600 id_rsa
  然后再执行下面的命令,其中-i id_rsa为id_rsa文件的路径
  dist/* 为要上传的前段代码路径
3.执行scp -i /Users/pzt/Desktop/id_rsa -r -v /Users/pzt/Desktop/hbdz-resource-platform/dist/* panso@61.160.99.52:/home/panso/HuBeiMuseum/webs/
