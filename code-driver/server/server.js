const express = require('express')

const app = express()
app.use(express.static('static'))
app.use(express.json())

const userInfoRounter=require('./router/userInfo')
const transInfoRounter=require('./router/transInfo')
const transState=require('./router/transState')
const dictInfo=require('./router/dicInfo')
const moneyInfo=require('./router/moneyInfo')
const moneyDetailInfo=require('./router/moneyDetailInfo')
const collectionManager=require('./router/collectionManager')

app.use(userInfoRounter)
app.use(transInfoRounter)
app.use(transState)
app.use(dictInfo)
app.use(moneyInfo)
app.use(moneyDetailInfo)
app.use(collectionManager)


app.listen(5000, (err) => {
    console.log('服务启动成功！5000')
})