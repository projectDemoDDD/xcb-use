const { defineConfig } = require('@vue/cli-service')

require('events').EventEmitter.defaultMaxListeners = 0; 

module.exports = defineConfig({
  transpileDependencies: true,
  //取消eslint语法检查
  lintOnSave: false,
  devServer: {
    //host: '192.168.43.95',
     host: '192.168.2.104',
    port: '8080',
    proxy: {
      '/userInfo': {
        target: 'http://localhost:5001',
      },
      '/updateUserInfo': {
        target: 'http://localhost:5001',
      },
      '/register': {
        target: 'http://localhost:5001',
      },
      '/carsInfoQuery': {
        target: 'http://localhost:5001',
      },
      '/transStateQuerys': {
        target: 'http://localhost:5001',
      },
      '/insertTransStateInfo': {
        target: 'http://localhost:5001',
      },
      '/updateTransStateInfo': {
        target: 'http://localhost:5001',
      },
      '/insertTransInfo': {
        target: 'http://localhost:5001',
      },
      '/transInfoQuery': {
        target: 'http://localhost:5001',
      },
      '/updateTaskInfo': {
        target: 'http://localhost:5001',
      },
      '/taskInfoStatic': {
        target: 'http://localhost:5001',
      },
      '/transStateDelete': {
        target: 'http://localhost:5001',
      },


      '/insertDictInfo': {
        target: 'http://localhost:5001',
      },
      '/dicInfoQuerys': {
        target: 'http://localhost:5001',
      },
      '/dicInfoDelete': {
        target: 'http://localhost:5001',
      },

      
      '/insertMoneyInfo': {
        target: 'http://localhost:5001',
      },
      '/moneyInfoQuerys': {
        target: 'http://localhost:5001',
      },
      '/moneyInfoDelete': {
        target: 'http://localhost:5001',
      },



      '/insertMoneyDetaiInfo': {
        target: 'http://localhost:5001',
      },
      '/moneyDetailInfoQuerys': {
        target: 'http://localhost:5001',
      },
      '/moneyDetailInfoDelete': {
        target: 'http://localhost:5001',
      },
      '/moneyDetailInfoUpdate': {
        target: 'http://localhost:5001',
      },


      '/updateInfo': {
        target: 'http://127.0.0.1:5001',
      },
      '/getInfo': {
        target: 'http://127.0.0.1:5001',
      },
      '/insertInfo': {
        target: 'http://127.0.0.1:5001',
      }

    }
  }
})
