const { getDatas} = require('../db.js')

const express = require('express')
const router = express.Router()

router.get('/dicInfos', (req, res) => {

    getDatas('dicInfo', {}).then(
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