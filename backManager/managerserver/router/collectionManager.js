const { getData, insertData, getDatas, updateData, getTime, deleteData } = require('../db.js')
const express = require('express')
const router = express.Router()


router.post('/getInfo', (req, res) => {

    try {

        const doc = req.body;

        if (doc === undefined || doc === null) {
            res.status(200).send('body-is-null')
            return;
        }

        if (doc.collectionName === undefined || doc.collectionName === null) {
            res.status(200).send('collectionName-is-null')
            return;
        }

        if (doc.content === undefined || doc.content === null) {
            res.status(200).send('content-is-null')
            return;
        }


        getDatas(doc.collectionName, doc.content).then(
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
        console.log(JSON.stringify(ex))
        res.status(200).send('server-undefinedError')
    }

})

router.post('/insertInfo', (req, res) => {
    try {
        const doc = req.body;

        if (doc === undefined || doc === null) {
            res.status(200).send('body-is-null')
            return;
        }

        if (doc.collectionName === undefined || doc.collectionName === null) {
            res.status(200).send('collectionName-is-null')
            return;
        }

        if (doc.content === undefined || doc.content === null) {
            res.status(200).send('content-is-null')
            return;
        }

        insertData(doc.collectionName, doc.content).then(
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

router.post('/updateInfo', (req, res) => {
    try {
        const doc = req.body;

        if (doc === undefined || doc === null) {
            res.status(200).send('body-is-null')
            return;
        }

        if (doc.collectionName === undefined || doc.collectionName === null) {
            res.status(200).send('collectionName-is-null')
            return;
        }

        if (doc.where === undefined || doc.where === null) {
            res.status(200).send('where-is-null')
            return;
        }

        if (doc.content === undefined || doc.content === null) {
            res.status(200).send('content-is-null')
            return;
        }

        updateData(doc.collectionName, doc.where, doc.content)
        
        res.status(200).send('handleSucess')
    }
    catch (ex) {
        res.status(200).send('server-error')
    }
})




router.delete('/deleteInfo', (req, res) => {

    deleteData('userInfo', {}).then(
        data => {
            console.log("????????????")
            res.status(200).json('data');
        },
        error => {
            console.log("????????????")
            res.status(500).json('??????')
        })
})




module.exports = router;
