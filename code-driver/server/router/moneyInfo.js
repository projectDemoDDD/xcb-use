const { getData, insertData, getDatas, updateData, getTime, deleteData } = require('../db.js')

const express = require('express')
const router = express.Router()

//新增车辆状态
router.post('/insertMoneyInfo', (req, res) => {

    try {
        const doc = req.body;
        if (req.body === undefined || req.body === null) {
            res.status(200).send('body-is-null')
            return;
        }
        insertData('moneyInfo', doc).then(
            su => {
                res.status(200).send('handleSucess')
            },
            fail => {
                res.status(200).send('dataBase-error')
            }
        )

    } catch (ex) {
        console.log(ex)
        res.status(200).send('server-undefinedError')
    }

})


//获取车辆状态
router.get('/moneyInfoQuerys', (req, res) => {

    try {
        if (req.query.where === undefined) {
            res.status(200).send('where-undefined')
            return;
        }
        getDatas('moneyInfo', JSON.parse(req.query.where)).then(
            data => {
                if (data == null || data == '') {
                    res.status(200).send("data-null");
                    return;
                }
                res.status(200).send(data);
            },
            error => {
                res.status(200).send('dataBase-error')
            })
    } catch (ex) {
        res.status(200).send('server-undefinedError')
    }

})


//删除车辆状态
router.get('/moneyInfoDelete', (req, res) => {
    try {
        if (req.query.where === undefined) {
            res.status(200).send('where-undefined')
            return;
        }
        deleteData('moneyInfo', JSON.parse(req.query.where)).then(
            data => { res.status(200).send('success'); },
            error => { res.status(200).send('dataBase-error') })
    }
    catch (ex) {
        res.status(200).send('server-undefinedError')
    }

})


module.exports = router;