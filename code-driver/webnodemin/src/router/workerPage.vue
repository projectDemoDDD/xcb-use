<template>
    <div class="workMainWindowRoot">
        <div class="workNavContainer">
            <span>工作台</span>
        </div>
        <div class="workHeaderContainer">
            <div class="table">
                <div class="row">
                    <div class="cell">
                        <div>车牌号:</div>
                    </div>
                    <div class="cell">
                        <input v-model="carNumber" disabled="true" />
                    </div>
                    <div class="cell">
                        <button @click="selectCarNumber" :disabled="firsIsDisabled">选择</button>
                    </div>
                </div>
                <div class="row">
                    <div class="cell">
                        <div>起运地:</div>
                    </div>
                    <div class="cell">
                        <input v-model="startLocation" :disabled="isDisabled" />
                    </div>
                    <div class="cell">
                        <button @click="selectStartLocation" :disabled="firsIsDisabled">选择</button>
                    </div>
                </div>
                <div class="row">
                    <div class="cell">
                        <div>目的地:</div>
                    </div>
                    <div class="cell">
                        <input v-model="destinatLocation" :disabled="isDisabled" />
                    </div>
                    <div class="cell">
                        <button @click="selectDestinatLocation" :disabled="secondIsDisabled">选择</button>
                    </div>
                </div>
                <div class="row">
                    <div class="cell">
                        <div>方量:</div>
                    </div>
                    <div class="cell">
                        <input v-model="realFangliang" :disabled="isDisabled" />
                    </div>
                    <div class="cell">
                        <button @click="selectRealFangliang" :disabled="secondIsDisabled">选择</button>
                    </div>
                </div>
                <div class="row">
                    <div class="cell">
                        <div>车次:</div>
                    </div>
                    <div class="cell">
                        <input v-model="carCount" :disabled="isDisabled" />
                    </div>
                    <div class="cell">
                        <button @click="selectCarCount" :disabled="secondIsDisabled">选择</button>
                    </div>
                </div>
                <div class="row">
                    <div class="cell">
                        <div>规格:</div>
                    </div>
                    <div class="cell">
                        <input v-model="thingType" :disabled="isDisabled" />
                    </div>
                    <div class="cell">
                        <button @click="selectType" :disabled="secondIsDisabled">选择</button>
                    </div>
                </div>
                <div class="row">
                    <div class="cell">
                        <div>备注:</div>
                    </div>
                    <div class="cell">
                        <input v-model="driverComment" />
                    </div>
                    <!-- <div class="cell">
                        <button @click="selectType" :disabled="secondIsDisabled"></button>
                    </div> -->
                </div>
                <!-- <div class="row">
                    <div class="cell">
                        <div>备注:</div>
                    </div>
                    <div class="cell">
                        <input v-model="comment" />
                    </div>
                    <div class="cell">
                        <button>选择</button>
                    </div>
                </div> -->
            </div>
        </div>
        <div class="workBodyContainer">
            <div class="funContainer">
                <button class="btn marginbottom" @click="sayStation" :disabled="SayStation">报站</button>
                <button class="btn marginbottom" @click="cancelStation" :disabled="Rest">取消报站</button>
                <button class="btn" @click="startHandler" :disabled="Start">出站</button>
                <img src="../imgs/downArrow.png" />
                <button class="btn" @click="arrivalHandler" :disabled="Arrive">到工地</button>
                <img src="../imgs/downArrow.png" />
                <button class="btn" @click="startOffHandler" :disabled="StartOff">开始卸车</button>
                <img src="../imgs/downArrow.png" />
                <button class="btn" @click="offCompleteHandler" :disabled="OffCompelete">卸完</button>
                <img src="../imgs/downArrow.png" />
                <button class="btn" @click="backHandler" :disabled="Back">到站</button>
            </div>


        </div>
        <DialogView ref="myDialog"></DialogView>
        <DialogView ref="myModelDialog" @userBehavior="changeData"></DialogView>

    </div>
</template>
  
<script>
const PubSub = require('pubsub-js')
import DialogView from "../components/dialogView";


export default {
    name: 'workerPage',
    components: { DialogView },
    data() {
        return {



            //起运地 与车牌号
            firsIsDisabled: false,
            secondIsDisabled: true,

            //方量 车次 规格 起运地 始终编辑框始终不可用
            isDisabled: true,

            UserInfo: {},

            carNumber: '',
            startLocation: '',
            destinatLocation: '',
            realFangliang: '',
            carCount: '',
            thingType: '',
            comment: '',
            driverComment: '',


            SayStation: false,
            Rest: true,
            Start: true,
            Arrive: true,
            StartOff: true,
            OffCompelete: true,
            Back: true
        }
    },
    methods: {
        recordError(error, relate) {
            let user = JSON.parse(window.localStorage.getItem(this.$UserInfoKey));

            let doc = {
                collectionName: 'errorInfo',
                content: {
                    UserName: user.UserName,
                    RealName: user.RealName,
                    content: error,
                    relate: relate,
                    operationTime: this.$getCurrentTime().time
                }
            }

            this.$http.post("/insertInfo", doc).then(
                (scucess) => {
                    switch (scucess.data) {
                        case "handleSucess":
                            break;
                        case "server-undefinedError":
                            console.log("服务器端报错！");
                            break;
                    }
                },
                (fail) => {
                    console.log("网络请求超时！");
                }
            );
        },
        recordOperation(info) {

            let user = JSON.parse(window.localStorage.getItem(this.$UserInfoKey));

            let doc = {
                collectionName: 'operationInfo',
                content: {
                    UserName: user.UserName,
                    RealName: user.RealName,
                    content: info,
                    operationTime: this.$getCurrentTime().time
                }
            }

            this.$http.post("/insertInfo", doc).then(
                (scucess) => {
                    switch (scucess.data) {
                        case "handleSucess":
                            break;
                        case "server-undefinedError":
                            console.log("服务器端报错！");
                            break;
                    }
                },
                (fail) => {
                    console.log("网络请求超时！");
                }
            );
        },
        clearState() {
            this.SayStation = true
            this.Rest = true
            this.Start = true
            this.Arrive = true
            this.StartOff = true
            this.OffCompelete = true
            this.Back = true
        },
        //选择车牌号
        selectCarNumber() {
            this.$store.commit('showLoading')
            this.$router.push({
                name: 'selectionITemPage',
                query: {
                    type: 'carNumber',
                    currentValue: this.carNumber
                }
            })
        },
        //选择始发地
        selectStartLocation() {
            this.$store.commit('showLoading')
            this.$router.push({
                name: 'selectionITemPage',
                query: {
                    type: 'start',
                    currentValue: this.startLocation
                }
            })
        },
        //选择目的地
        selectDestinatLocation() {
            this.$store.commit('showLoading')
            this.$router.push({
                name: 'selectionITemPage',
                query: {
                    type: 'end',
                    currentValue: this.destinatLocation,
                    currentStartLocation: this.startLocation
                }
            })
        },
        //选择方量
        selectRealFangliang() {
            this.$store.commit('showLoading')
            this.$router.push({
                name: 'selectionITemPage',
                query: {
                    type: 'fangliang',
                    currentValue: this.realFangliang
                }
            })
        },
        //选择车次
        selectCarCount() {
            this.$store.commit('showLoading')
            this.$router.push({
                name: 'selectionITemPage',
                query: {
                    type: 'carCount',
                    currentValue: this.carCount
                }
            })
        },
        //选择规格
        selectType() {
            this.$store.commit('showLoading')
            this.$router.push({
                name: 'selectionITemPage',
                query: {
                    type: 'type',
                    currentValue: this.thingType
                }
            })
        },
        //处理选择的回调值
        handleSelectedValue(msg, data) {
            switch (data.type) {
                case 'carNumber':
                    this.carNumber = data.value;
                    break;
                case 'start':
                    this.startLocation = data.value;
                    break;
                case 'end':
                    this.destinatLocation = data.value;
                    break;
                case 'type':
                    this.thingType = data.value;
                    break;
                case 'fangliang':
                    this.realFangliang = data.value;
                    break;
                case 'carCount':
                    this.carCount = data.value;
                    break;
            }
        },
        //出站时验证以下内容是否为空
        startValidNull() {

            if (this.destinatLocation === '' || this.destinatLocation.trim() === '') {
                this.$refs.myDialog.show("目的地不能为空！", {
                    type: 'alert',
                    confirmText: '确定',
                    cancelText: '取消',
                    titleText: '',
                    data: null
                })
                return false;
            }

            if (this.realFangliang === '' || this.realFangliang.trim() === '') {
                this.$refs.myDialog.show("方量不能为空！", {
                    type: 'alert',
                    confirmText: '确定',
                    cancelText: '取消',
                    titleText: '',
                    data: null
                })
                return false;
            }

            if (this.carCount === '' || this.carCount.trim() === '') {
                this.$refs.myDialog.show("车次不能为空！", {
                    type: 'alert',
                    confirmText: '确定',
                    cancelText: '取消',
                    titleText: '',
                    data: null
                })
                return false;
            }

            if (this.thingType === '' || this.thingType.trim() === '') {
                this.$refs.myDialog.show("型号不能为空！", {
                    type: 'alert',
                    confirmText: '确定',
                    cancelText: '取消',
                    titleText: '',
                    data: null
                })
                return false;
            }


            this.destinatLocation = this.destinatLocation.trim();
            this.realFangliang = this.realFangliang.trim();
            this.carCount = this.carCount.trim();
            this.thingType = this.thingType.trim();

            return true;
        },
        //报站时验证输入数据是否为空
        validateNull() {

            //验证车牌号是否空
            if (this.carNumber === '' || this.carNumber.trim() === '') {
                this.$refs.myDialog.show("车牌号不能为空！", {
                    type: 'alert',
                    confirmText: '确定',
                    cancelText: '取消',
                    titleText: '',
                    data: null
                })
                return false;
            }

            //验证始发地是否为空
            if (this.startLocation === '' || this.startLocation.trim() === '') {
                this.$refs.myDialog.show("起运地不能为空！", {
                    type: 'alert',
                    confirmText: '确定',
                    cancelText: '取消',
                    titleText: '',
                    data: null
                })
                return false;
            }

            this.carNumber = this.carNumber.trim();
            this.startLocation = this.startLocation.trim();

            return true;
        },
        //更新报站数据
        sayStationUpdateData() {
            this.$store.commit('showLoading')
            
            let user = JSON.parse(window.localStorage.getItem(this.$UserInfoKey));
            let stateInfo = {
                where: {
                    CarNumber: this.carNumber
                },
                body: {
                    $set: {
                        StartLocation: this.startLocation,
                        UserName: user.UserName,
                        RealName: user.RealName,
                        sayStationTime: this.$getCurrentTime().time,
                        state: 'waitTask',
                        comment: '待命',
                        RecordTime: this.$getCurrentTime().time,
                        driverComment: this.driverComment
                    }
                }
            };

            this.$http.post("/updateTransStateInfo", stateInfo).then((scucess) => {

                this.$handleRequest(scucess.data).then(success => {
                    this.clearState();
                    this.firsIsDisabled = true;
                    this.secondIsDisabled = false;
                    this.$store.commit('hideLoading')
                    this.$refs.myDialog.show("报站成功！", {
                        type: 'alert',
                        confirmText: '确定',
                        cancelText: '取消',
                        titleText: '',
                        data: null
                    })


                    let timer = setTimeout(() => {
                        this.Rest = false;
                        this.Start = false;
                        console.log(timer)
                        clearTimeout(timer)
                    }, 10000)




                },
                    fail => {
                        this.$store.commit('hideLoading')
                    }
                )

            }, (fail) => {
                console.log(fail);
                this.$store.commit('hideLoading')
            }
            );
        },
        //报站
        sayStation() {

            this.recordOperation("点击了报站按钮")

            //判断输入内容是否为空 车牌号 与 始发地
            if (!this.validateNull()) return;

            //判断所选车辆是否已被占用
            this.getCurrentUserCarStatData({
                CarNumber: this.carNumber,
                state: { $ne: 'rest' }
            }).then(
                success => {
                    //能够取得数据，说明车辆已经被占用了，提示占用信息
                    this.$refs.myDialog.show(`${this.carNumber}正在被${success.RealName}使用，请与队长联系，协调车辆使用！`, {
                        type: 'alert',
                        confirmText: '确定',
                        cancelText: '取消',
                        titleText: '',
                        data: null
                    })
                },
                fail => {
                    //没有被占用，则进行报站
                    this.sayStationUpdateData();
                }
            );

        },
        //取消报站
        cancelStation() {

            this.recordOperation("点击了取消报站按钮")

            this.$store.commit('showLoading')

            let user = JSON.parse(window.localStorage.getItem(this.$UserInfoKey));

            let stateInfo = {
                where: {
                    CarNumber: this.carNumber,
                    UserName: user.UserName
                },
                body: {
                    $set: {
                        StartLocation: '',
                        UserName: '',
                        RealName: '',
                        DestinatLocation: '',
                        CarCount: '',
                        RealFangliang: '',
                        type: '',
                        state: 'rest',
                        comment: '休息',
                        RecordTime: this.$getCurrentTime().time,
                        driverComment: ''
                    }
                }
            };

            this.$http.post("/updateTransStateInfo", stateInfo).then((scucess) => {
                this.$handleRequest(scucess.data).then(success => {
                    this.clearState();
                    this.firsIsDisabled = false;
                    this.secondIsDisabled = true
                    this.SayStation = false;
                    this.$refs.myDialog.show("取消报站成功！", {
                        type: 'alert',
                        confirmText: '确定',
                        cancelText: '取消',
                        titleText: '',
                        data: null
                    })


                    //除车牌号，其他内容都置为空
                    this.startLocation = ''
                    this.destinatLocation = ''
                    this.realFangliang = ''
                    this.carCount = ''
                    this.thingType = ''
                    this.driverComment = ''


                    this.$store.commit('hideLoading')
                }, fail => {
                    this.recordError(JSON.stringify(fail), "/updateTransStateInfo-handleRequest")
                    this.$store.commit('hideLoading')
                }
                )
            }, (fail) => {
                this.recordError(JSON.stringify(fail), "/updateTransStateInfo")
                console.log("网络请求超时！");
                this.$store.commit('hideLoading')
            }
            );
        },
        changeData(type, data) {

            if (type === 'clickConfirm') {

                this.$store.commit('showLoading')

                let tm = this.$getCurrentTime();
                let user = JSON.parse(window.localStorage.getItem(this.$UserInfoKey));
                let stateInfo = {
                    where: {
                        CarNumber: this.carNumber,
                        UserName: user.UserName
                    },
                    body: {
                        $set: {
                            leaveStationTime: tm.time,
                            startYear: tm.yy,
                            startMonth: tm.mm,
                            startDay: tm.dd,
                            state: 'start',
                            comment: '在去工地的路上',

                            DestinatLocation: this.destinatLocation,
                            CarCount: this.carCount,
                            RealFangliang: this.realFangliang,
                            type: this.thingType,
                            RecordTime: this.$getCurrentTime().time,
                            driverComment: this.driverComment
                        }
                    }
                };

                this.$http.post("/updateTransStateInfo", stateInfo).then((scucess) => {
                    this.$handleRequest(scucess.data).then(
                        sc => {
                            this.clearState();

                            let timer = setTimeout(() => {
                                this.Arrive = false;
                                clearTimeout(timer)
                            }, 10000)


                            this.firsIsDisabled = true;
                            this.secondIsDisabled = true;
                            this.$store.commit('hideLoading')
                        }, fl => {
                            this.$store.commit('hideLoading')
                        }
                    )
                }, (fail) => {
                    console.log(fail);
                    this.$store.commit('hideLoading')
                }
                );
            }
        },
        //出站
        startHandler() {
            this.recordOperation("点击了出站按钮")

            //验证 目的地 方量 车次 规格是否为空
            if (!this.startValidNull()) return;

            let text = `
            车牌号:${this.carNumber}
            起运地:${this.startLocation}
            目的地:${this.destinatLocation}
            方量:${this.realFangliang}
            车次:${this.carCount}
            规格:${this.thingType}
            请确认以上内容填写是否正确！`;
            this.$refs.myModelDialog.show(text, {
                type: 'confirm',
                confirmText: '确定',
                cancelText: '取消',
                titleText: '',
                data: '123'
            })

        },
        //到达工地
        arrivalHandler() {

            this.recordOperation("点击了到达工地按钮")

            this.$store.commit('showLoading')

            let user = JSON.parse(window.localStorage.getItem(this.$UserInfoKey));

            let stateInfo = {
                where: {
                    CarNumber: this.carNumber,
                    UserName: user.UserName
                },
                body: {
                    $set: {
                        arrivalTime: this.$getCurrentTime().time,
                        state: 'arrival',
                        comment: '到工地,等待卸车',
                        RecordTime: this.$getCurrentTime().time,
                        driverComment: this.driverComment
                    }
                }
            };


            this.$http.post("/updateTransStateInfo", stateInfo).then((scucess) => {

                this.$handleRequest(scucess.data).then(
                    sc => {
                        this.clearState();

                        let timer = setTimeout(() => {
                            this.StartOff = false;
                            clearTimeout(timer)
                        }, 10000)

                        //this.StartOff = false;
                        this.$refs.myDialog.show("到达工地时间记录成功！", {
                            type: 'alert',
                            confirmText: '确定',
                            cancelText: '取消',
                            titleText: '',
                            data: null
                        })
                        this.$store.commit('hideLoading')
                    },
                    fai => {
                        this.$store.commit('hideLoading')
                    }
                )
            }, (fail) => {
                this.$store.commit('hideLoading')
                console.log("网络请求超时！");
            }
            );
        },
        //开始卸车
        startOffHandler() {


            this.recordOperation("点击了开始卸车按钮")

            this.$store.commit('showLoading')

            let user = JSON.parse(window.localStorage.getItem(this.$UserInfoKey));

            let stateInfo = {
                where: {
                    CarNumber: this.carNumber,
                    UserName: user.UserName
                },
                body: {
                    $set: {
                        startOffTime: this.$getCurrentTime().time,
                        state: 'startOff',
                        comment: '卸车中',
                        RecordTime: this.$getCurrentTime().time,
                        driverComment: this.driverComment
                    }
                }
            };


            this.$http.post("/updateTransStateInfo", stateInfo).then((scucess) => {

                this.$handleRequest(scucess.data).then(
                    suc => {
                        this.clearState();

                        let timer = setTimeout(() => {
                            this.OffCompelete = false;
                            clearTimeout(timer)
                        }, 10000)

                        //this.OffCompelete = false;
                        this.$refs.myDialog.show("开始卸车时间记录成功！", {
                            type: 'alert',
                            confirmText: '确定',
                            cancelText: '取消',
                            titleText: '',
                            data: null
                        })
                        this.$store.commit('hideLoading')
                    },
                    fai => {
                        this.$store.commit('hideLoading')
                    }
                )
            }, (fail) => {
                console.log("网络请求超时！");
                this.$store.commit('hideLoading')
            }
            );
        },
        //卸完
        offCompleteHandler() {


            this.recordOperation("点击了卸完按钮")

            this.$store.commit('showLoading')

            let user = JSON.parse(window.localStorage.getItem(this.$UserInfoKey));

            let stateInfo = {
                where: {
                    CarNumber: this.carNumber,
                    UserName: user.UserName
                },
                body: {
                    $set: {
                        offCompleteTime: this.$getCurrentTime().time,
                        state: 'offComplete',
                        comment: '卸完,在回站的路上',
                        RecordTime: this.$getCurrentTime().time,
                        driverComment: this.driverComment
                    }
                }
            };


            this.$http.post("/updateTransStateInfo", stateInfo).then((scucess) => {

                this.$handleRequest(scucess.data).then(
                    suc => {
                        this.clearState();
                        //this.Back = false;

                        let timer = setTimeout(() => {
                            this.Back = false;
                            clearTimeout(timer)
                        }, 10000)

                        this.$refs.myDialog.show("卸完时间记录成功！", {
                            type: 'alert',
                            confirmText: '确定',
                            cancelText: '取消',
                            titleText: '',
                            data: null
                        })
                        this.$store.commit('hideLoading')
                    },
                    fai => {
                        this.$store.commit('hideLoading')
                    }
                )
            }, (fail) => {
                console.log("网络请求超时！");
                this.$store.commit('hideLoading')
            }
            );
        },
        //回站
        backHandler() {

            this.recordOperation("点击了回站按钮")

            this.$store.commit('showLoading')

            //更新行车状态
            let timeObj = this.$getCurrentTime();
            let user = JSON.parse(window.localStorage.getItem(this.$UserInfoKey));
            let stateInfo = {
                where: {
                    CarNumber: this.carNumber,
                    UserName: user.UserName
                },
                body: {
                    $set: {
                        backTime: timeObj.time,
                        state: 'waitTask',
                        comment: '待命',
                        DestinatLocation: '',
                        CarCount: '',
                        RealFangliang: '',
                        type: '',
                        RecordTime: this.$getCurrentTime().time,

                        sayStationTime:'',
                        leaveStationTime:'',
                        arrivalTime:'',
                        startOffTime:'',
                        offCompleteTime:'',
                        backTime:''
                    }
                }
            };

            //获取当前车辆状态信息
            this.getCurrentUserCarStatData({ UserName: user.UserName }).then(success => {

                success.backTime = timeObj.time
                let insertData = {
                    StartLocation: success.StartLocation,
                    CarNumber: success.CarNumber,
                    MaxFangliang: success.MaxFangliang,
                    UserName: success.UserName,
                    RealName: success.RealName,
                    sayStationTime: success.sayStationTime,
                    leaveStationTime: success.leaveStationTime,
                    startYear: success.startYear,
                    startMonth: success.startMonth,
                    startDay: success.startDay,
                    arrivalTime: success.arrivalTime,
                    startOffTime: success.startOffTime,
                    offCompleteTime: success.offCompleteTime,
                    backTime: success.backTime,
                    CarCount: success.CarCount,
                    DestinatLocation: success.DestinatLocation,
                    RealFangliang: success.RealFangliang,
                    type: success.type,
                    Commont: this.comment,
                    driverComment: this.driverComment
                }

                this.$http.post("/insertTransInfo", insertData).then((scucess) => {

                    this.$handleRequest(scucess.data).then(
                        suc => {
                            //然后再更新行车状态
                            this.updateCarStateInfo(stateInfo)
                        },
                        fai => {
                            this.recordError(JSON.stringify(fail), "/insertTransInfo-handleRequest")
                            this.$store.commit('hideLoading')
                        }
                    )

                }, (fail) => {
                    this.recordError(JSON.stringify(fail), "/insertTransInfo")
                    this.$store.commit('hideLoading')
                    //alert(fail) 
                }
                );


            },
                fail => {
                    this.recordError(JSON.stringify(fail), "getCurrentUserCarStatData")
                    this.$store.commit('hideLoading')
                    //alert(fail) 
                }
            )

        },
        //点击回站后的更新行车状态
        updateCarStateInfo(stateInfo) {

            this.$http.post("/updateTransStateInfo", stateInfo).then((scucess) => {

                this.$handleRequest(scucess.data).then(success => {
                    this.clearState();
                    this.firsIsDisabled = true;
                    this.secondIsDisabled = false;
                    this.Rest = false;
                    this.Start = false;
                    this.$store.commit('hideLoading')



                    this.$refs.myDialog.show("回站时间记录成功！", {
                        type: 'alert',
                        confirmText: '确定',
                        cancelText: '取消',
                        titleText: '',
                        data: null
                    })

                }, fail => {
                    this.recordError(JSON.stringify(fail), "updateTransStateInfo-handleRequest")
                    this.$store.commit('hideLoading')
                }
                )

            }, (fail) => {
                this.recordError(JSON.stringify(fail), "updateTransStateInfo")
                console.log("网络请求超时！");
                this.$store.commit('hideLoading')
            }
            );
        },
        //根据传入条件，获取行车状态
        getCurrentUserCarStatData(where) {

            return new Promise((resolve, rejects) => {

                //发送请求
                this.$http.get(`/transStateQuerys?where=${JSON.stringify(where)}`)
                    .then((info) => {
                        //服务器只要接到请求就会返回200成功
                        this.$handleRequest(info.data).then(
                            success => {
                                let db = success[0];
                                resolve(db);
                            },
                            fail => {
                                rejects(fail);
                            }
                        )
                    },
                        (fail) => {
                            //alert(fail) 
                            console.log(fail)
                        })
                    .catch((err) => {
                        console.log(`网络请求超时！${err}`);
                        //alert(err) 
                    });
            })
        },
        refresh() {
            this.$store.commit('showLoading')

            let user = JSON.parse(window.localStorage.getItem(this.$UserInfoKey));
            if (user == null || user == undefined) {
                alert('还没有登录的情况!')
                return;
            }

            //重新获取用户信息
            this.UserInfo.UserName = user.UserName;
            this.UserInfo.Password = user.Password;
            this.UserInfo.CarNumber = user.CarNumber;
            this.UserInfo.RealName = user.RealName;
            this.UserInfo.IDNumber = user.IDNumber;

            //进行默认值设置
            this.clearState();
            this.SayStation = false;
            this.firsIsDisabled = false;
            this.secondIsDisabled = true;
            this.carNumber = this.UserInfo.CarNumber;


            //获取当前用户的行车状态 如果存在的话 则根据行车状态进行界面更新
            this.getCurrentUserCarStatData({ UserName: user.UserName }).then(
                success => {
                    //根据用户的行车状态初始化数据
                    this.clearState();
                    //console.log(success)
                    this.carNumber = success.CarNumber;
                    this.startLocation = success.StartLocation;
                    this.destinatLocation = success.DestinatLocation;
                    this.realFangliang = success.RealFangliang;
                    this.carCount = success.CarCount;
                    this.thingType = success.type;
                    this.driverComment = success.driverComment;

                    switch (success.state) {
                        case "rest":
                            this.SayStation = false;
                            this.firsIsDisabled = false;
                            this.secondIsDisabled = true;
                            break;
                        case "waitTask":
                            this.Rest = false;
                            this.Start = false;
                            this.firsIsDisabled = true;
                            this.secondIsDisabled = false;
                            break;
                        case "start":
                            this.Arrive = false;
                            this.firsIsDisabled = true;
                            this.secondIsDisabled = true;
                            break;
                        case "arrival":
                            this.StartOff = false;
                            this.firsIsDisabled = true;
                            this.secondIsDisabled = true;
                            break;
                        case "startOff":
                            this.OffCompelete = false;
                            this.firsIsDisabled = true;
                            this.secondIsDisabled = true;
                            break;
                        case "offComplete":
                            this.Back = false;
                            this.firsIsDisabled = true;
                            this.secondIsDisabled = true;
                            break;
                        case "back":
                            this.Rest = false;
                            this.firsIsDisabled = true;
                            this.secondIsDisabled = true;
                            break;
                    }

                    this.$store.commit('hideLoading')

                },
                fail => {
                    //没有行车状态则保持默认初始化
                    this.$store.commit('hideLoading')
                    //alert(fail) 
                })
        }
    },
    created() {
        console.log("created")
        //订阅选择器  执行一次即可
        PubSub.subscribe('selectedValue', this.handleSelectedValue)

        //进行初始化操作
        this.refresh();
    },
    activated() {
        console.log("activated")
        let user = JSON.parse(window.localStorage.getItem(this.$UserInfoKey));
        if (user.UserName === this.UserInfo.UserName) return;

        //如果切换用户登录的话，则重新进行默认值初始化操作
        this.refresh();
    },
    deactivated() {
        console.log("deactivated")
    }
}

</script>
  
<style>
.marginbottom {
    margin-bottom: 5vw;
}


.workMainWindowRoot button:disabled {
    background-color: gray;
}

.workMainWindowRoot input:disabled {
    background-color: gray;
}

.workMainWindowRoot button {
    background-color: greenyellow;
}

.workMainWindowRoot input {
    background-color: greenyellow;
}


.workMainWindowRoot .workNavContainer {
    text-align: center;
}

.workMainWindowRoot .workHeaderContainer {
    display: flex;
    justify-content: space-around;
}

.workMainWindowRoot .workHeaderContainer .cell:first-child {
    width: 15vw;
}

.workNavContainer .cell div {
    width: 20vw;
}



.workBodyContainer {
    display: flex;
    justify-content: center;
}

.workBodyContainer .taskList {
    color: red;
}

.workBodyContainer .funContainer {
    width: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 70vh;
}

.workBodyContainer .funContainer button {
    width: 80vw;
    line-height: 10vw;
    border: 1px solid orange;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: greenyellow;
}

.workBodyContainer .funContainer button:active {
    background-color: orange;
}

.workBodyContainer .funContainer button:disabled {
    background-color: gray;
}

.workBodyContainer .funContainer img {
    width: 10vw;
    height: 5vh;
}
</style>
  