//const fs = require('fs')
//const xlsx = require('node-xlsx')
// //导出运输明细excel格式  
// app.get('/exportTransInfo', (req, res) => {

//     // if (req.query.where === undefined) {
//     //     res.status(500).send('报错了')
//     //     return;
//     // }
//     let where ={
//         queueName:'梦之队'
//     }
//     getDatas('transInfo', where).then(
//         data => {
//             var excelData = [
//                 {
//                     name: 'sheet1',
//                     data: [
//                         [
//                             '搅拌站',
//                             '日期',
//                             '工程名',
//                             '司机',
//                             '车号',
//                             '车次',
//                             '票面方量',
//                             '等待时间'
//                         ]
//                     ]
//                 }
//             ]
//             //console.log(excelData[0].data)
//             data.forEach(item => {
//                 let itemArray = []
//                 itemArray.push(item.StartLocation)
//                 itemArray.push(item.startTime)
//                 itemArray.push(item.DestinateLocation)
//                 itemArray.push(item.RealName)
//                 itemArray.push(item.CarNumber)
//                 itemArray.push(item.carCount)
//                 itemArray.push(item.FangLiang)
//                 itemArray.push(item.waitTime)
//                 excelData[0].data.push(itemArray)
//             })
//             //console.log(excelData[0].data)
//              var buffer = xlsx.build(excelData);
//             fs.writeFile('./result.xlsx', buffer, function (err) {
//                 if (err) {
//                     console.log('123')
//                 }
//             })
//             res.send('导出成功！');
//         },
//         error => { res.status(500).send('报错了') })

// })