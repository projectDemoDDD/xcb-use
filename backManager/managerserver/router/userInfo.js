const {getDatas} = require('../db.js')
const express = require('express')
const router = express.Router()

//获取所有用户信息
router.get('/userInfos', (req, res) => {

    getDatas('userInfo', {}).then(
        data => {
            if (data == null || data == '') {
                res.status(500).send("没有数据");
                return;
            }
            res.send(data);
        },
        error => {
            res.status(500).send('报错了')
        })
})


module.exports = router;
