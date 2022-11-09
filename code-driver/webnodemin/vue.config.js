const { defineConfig } = require('@vue/cli-service')

require('events').EventEmitter.defaultMaxListeners = 0; 

module.exports = defineConfig({
  transpileDependencies: true,
  //取消eslint语法检查
  lintOnSave: false,
  devServer: {
    host: '192.168.2.104',
    port: '8080',
    proxy: {
      '/userInfo': {
        target: 'http://localhost:5000',
      },
      '/updateUserInfo': {
        target: 'http://localhost:5000',
      },
      '/register': {
        target: 'http://localhost:5000',
      },
      '/carsInfoQuery': {
        target: 'http://localhost:5000',
      },
      '/transStateQuerys': {
        target: 'http://localhost:5000',
      },
      '/insertTransStateInfo': {
        target: 'http://localhost:5000',
      },
      '/updateTransStateInfo': {
        target: 'http://localhost:5000',
      },
      '/insertTransInfo': {
        target: 'http://localhost:5000',
      },
      '/transInfoQuery': {
        target: 'http://localhost:5000',
      },
      '/updateTaskInfo': {
        target: 'http://localhost:5000',
      },
      '/taskInfoStatic': {
        target: 'http://localhost:5000',
      },
      '/transStateDelete': {
        target: 'http://localhost:5000',
      },
      '/insertDictInfo': {
        target: 'http://localhost:5000',
      },
      '/dicInfoQuerys': {
        target: 'http://localhost:5000',
      },
      '/dicInfoDelete': {
        target: 'http://localhost:5000',
      },

      
      '/insertMoneyInfo': {
        target: 'http://localhost:5000',
      },
      '/moneyInfoQuerys': {
        target: 'http://localhost:5000',
      },
      '/moneyInfoDelete': {
        target: 'http://localhost:5000',
      },



      '/insertMoneyDetaiInfo': {
        target: 'http://localhost:5000',
      },
      '/moneyDetailInfoQuerys': {
        target: 'http://localhost:5000',
      },
      '/moneyDetailInfoDelete': {
        target: 'http://localhost:5000',
      },
      '/moneyDetailInfoUpdate': {
        target: 'http://localhost:5000',
      }


      ,
      '/insertInfo': {
        target: 'http://localhost:5000',
      },
      '/updateInfo': {
        target: 'http://localhost:5000',
      }


    }
  }
})
