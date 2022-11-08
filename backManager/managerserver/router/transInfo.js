const {  getDatas,deleteData } = require('../db.js')

const express = require('express')
const router = express.Router()


router.get('/transInfos', (req, res) => {

    getDatas('transInfo', {}).then(
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


router.get('/deleteTransInfos', (req, res) => {
    try {
        if (req.query.where === undefined) {
            res.status(200).send('where-undefined')
            return;
        }
        deleteData('transInfo', JSON.parse(req.query.where)).then(
            data => { res.status(200).send('success'); },
            error => { res.status(200).send('dataBase-error') })
    }
    catch (ex) {
        res.status(200).send('server-undefinedError')
    }

})



module.exports = router;