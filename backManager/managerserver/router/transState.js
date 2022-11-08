const express = require('express')
const router=express.Router()
const { getDatas} = require('../db.js')


router.get('/transStates', (req, res) => {

    getDatas('transState', {}).then(
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