
var express=require('express')
var app = express();
//var fs = require('fs');
//var https = require('https');
//var privateKey = fs.readFileSync('./server.key', 'utf8');
//var certificate = fs.readFileSync('./server.crt', 'utf8');
//var credentials = {key: privateKey, cert: certificate};

//var httpsServer = https.createServer(credentials, app);

const userInfoRounter=require('./router/userInfo')
const transInfo=require('./router/transInfo')
const transState=require('./router/transState')
const dicInfo=require('./router/dicInfo')
const collectionManager=require('./router/collectionManager')


app.use(express.static('static'))
app.use(express.json())
app.use(userInfoRounter)
app.use(transInfo)
app.use(transState)
app.use(dicInfo)
app.use(collectionManager)



app.listen(5002, (err) => {
    console.log('后台管理系统,5002')
})

// httpsServer.listen(5001, function() {
//     console.log('HTTPS Server is running');
//     });
