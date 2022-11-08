
const { deleteDatas } = require('../db.js')


function deleteAllData() {

    //清空userInfo
    deleteDatas('userInfo', {}).then(
        data => {
            console.log("userInfo删除成功")
        },
        error => {
            console.log("userInfo删除成功删除失败")
        })


    deleteDatas('carInfo', {}).then(
        data => {
            console.log("carInfo删除成功")
        },
        error => {
            console.log("carInfo删除失败")
        })


    deleteDatas('DestinateLocationInfo', {}).then(
        data => {
            console.log("DestinateLocationInfo删除成功")
        },
        error => {
            console.log("DestinateLocationInfo删除失败")
        })


    deleteDatas('recordInfo', {}).then(
        data => {
            console.log("recordInfo删除成功")
        },
        error => {
            console.log("recordInfo删除失败")
        })


    deleteDatas('StartLocationInfo', {}).then(
        data => {
            console.log("StartLocationInfo删除成功")
        },
        error => {
            console.log("StartLocationInfo删除失败")
        })


    deleteDatas('transInfo', {}).then(
        data => {
            console.log("transInfo删除成功")
        },
        error => {
            console.log("transInfo删除失败")
        })


    deleteDatas('transState', {}).then(
        data => {
            console.log("transState删除成功")
        },
        error => {
            console.log("transState删除失败")
        })

}

module.exports = deleteAllData;
