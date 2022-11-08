<template>
    <div class="dispatcherRoot">


        <!-- 任务编辑 -->
        <div class="taskContent" :class="taskVisible">


            <ul class="tablePC">

                <ul class="rowPC">
                    <li class="cellPC">
                        序号
                    </li>
                    <li class="cellPC">
                        {{ currentSelectedItem.index }}
                    </li>
                </ul>

                <ul class="rowPC">
                    <li class="cellPC">
                        车牌号
                    </li>
                    <li class="cellPC">
                        {{ currentSelectedItem.CarNumber }}
                    </li>
                </ul>

                <ul class="rowPC">
                    <li class="cellPC">
                        司机姓名
                    </li>
                    <li class="cellPC">
                        {{ currentSelectedItem.RealName }}
                    </li>
                </ul>

                <ul class="rowPC">
                    <li class="cellPC">
                        司机电话
                    </li>
                    <li class="cellPC">

                    </li>
                </ul>

            </ul>


            <ul class="tablePC">

                <ul class="rowPC">
                    <li class="cellPC">
                        起运地
                    </li>
                    <li class="cellPC">
                        <input v-model="currentSelectedItem.StartLocation" />
                    </li>
                </ul>

                <ul class="rowPC">
                    <li class="cellPC">
                        目的地
                    </li>
                    <li class="cellPC">
                        <input v-model="currentSelectedItem.DestinatLocation" />
                    </li>
                </ul>

                <ul class="rowPC">
                    <li class="cellPC">
                        方量
                    </li>
                    <li class="cellPC">
                        <input v-model="currentSelectedItem.RealFangliang" />
                    </li>
                </ul>


                <ul class="rowPC">
                    <li class="cellPC">
                        车次
                    </li>
                    <li class="cellPC">
                        <input v-model="currentSelectedItem.CarCount" />
                    </li>
                </ul>

            </ul>


            <ul class="tablePC">

                <ul class="rowPC">
                    <li class="cellPC">
                        混凝土型号
                    </li>
                    <li class="cellPC">
                        <input v-model="currentSelectedItem.type" />
                    </li>
                </ul>

                <ul class="rowPC">
                    <li class="cellPC">
                        倒车入口
                    </li>
                    <li class="cellPC">
                        <input v-model="currentSelectedItem.LoadLocation" />
                    </li>
                </ul>

                <ul class="rowPC">
                    <button @click="dispathTask">发车</button>
                </ul>
                <ul class="rowPC">
                    <button @click="dispathTaskCancel">取消</button>
                </ul>
            </ul>


        </div>


        <div>
            <button @click="startTask" :disabled="btnDisabled">开启任务</button>
            <button @click="endTask">结束任务</button>
        </div>



        <!-- 任务状态统计 -->
        <div class="sayStationList">
            <ul class="tablePC">
                <ul class="rowPC title">
                    <p>任务状态统计</p>
                </ul>
                <ul class="rowPC">
                    <li class="cellPC">
                        工地
                    </li>
                    <li class="cellPC">
                        已完成
                    </li>
                    <li class="cellPC">
                        排队中
                    </li>
                    <li class="cellPC">
                        在路上
                    </li>
                    <li class="cellPC">
                        在工地
                    </li>
                </ul>


                <ul v-for="(item, i) in taskStateList" class="rowPC">
                    <li class="cellPC">
                        {{ item.name }}
                    </li>
                    <li class="cellPC">
                        {{ item.completeCount }}车/{{ item.completeFangliang }}方
                    </li>
                    <li class="cellPC">
                        {{ item.queueCount }}车/{{ item.queueFangliang }}方
                    </li>
                    <li class="cellPC">
                        {{ item.onRoadCount }}车/{{ item.onRoadFangliang }}方
                    </li>
                    <li class="cellPC">
                        {{ item.onWorkCount }}车/{{ item.onWorkFangliang }}方
                    </li>
                </ul>

            </ul>
        </div>


        <!-- 待命车辆列表 -->
        <div class="sayStationList">
            <ul class="tablePC">
                <ul class="rowPC title">
                    <p>待命车辆列表</p>
                </ul>
                <ul class="rowPC">
                    <li class="cellPC">
                        序号
                    </li>
                    <li class="cellPC">
                        车牌号
                    </li>
                    <li class="cellPC">
                        最大方量
                    </li>
                    <li class="cellPC">
                        司机姓名
                    </li>
                    <li class="cellPC">
                        司机电话
                    </li>
                    <li class="cellPC">
                        任务接收状态
                    </li>
                    <li class="cellPC">
                        起运地
                    </li>
                    <li class="cellPC">
                        目的地
                    </li>
                    <li class="cellPC">
                        车次
                    </li>
                    <li class="cellPC">
                        实装方量
                    </li>
                    <li class="cellPC">
                        混凝土规格
                    </li>
                    <li class="cellPC">
                        倒车入口
                    </li>
                    <li class="cellPC">
                        操作
                    </li>
                </ul>


                <ul v-for="(item, i) in sayStationList" class="rowPC" @click="selectedItem(item)">
                    <li class="cellPC">
                        {{ item.index }}
                    </li>
                    <li class="cellPC">
                        {{ item.CarNumber }}
                    </li>
                    <li class="cellPC">
                        {{ item.MaxFangliang }}
                    </li>
                    <li class="cellPC">
                        {{ item.RealName }}
                    </li>
                    <li class="cellPC">
                        司机电话
                    </li>
                    <li class="cellPC">
                        {{ item.comment }}
                    </li>
                    <li class="cellPC">
                        {{ item.StartLocation }}
                    </li>
                    <li class="cellPC">
                        {{ item.DestinatLocation }}
                    </li>
                    <li class="cellPC">
                        {{ item.CarCount }}
                    </li>
                    <li class="cellPC">
                        {{ item.RealFangliang }}
                    </li>
                    <li class="cellPC">
                        {{ item.type }}
                    </li>
                    <li class="cellPC">
                        {{ item.LoadLocation }}
                    </li>
                    <li class="cellPC">
                        <button @click="editorTask('')">编辑</button>
                    </li>
                </ul>

            </ul>
        </div>



        <!-- 待接收任务车辆列表 -->
        <div class="sayStationList">
            <ul class="tablePC">
                <ul class="rowPC title">
                    <p>待接收任务车辆列表</p>
                </ul>
                <ul class="rowPC">
                    <li class="cellPC">
                        序号
                    </li>
                    <li class="cellPC">
                        车牌号
                    </li>
                    <li class="cellPC">
                        最大方量
                    </li>
                    <li class="cellPC">
                        司机姓名
                    </li>
                    <li class="cellPC">
                        司机电话
                    </li>
                    <li class="cellPC">
                        任务接收状态
                    </li>
                    <li class="cellPC">
                        起运地
                    </li>
                    <li class="cellPC">
                        目的地
                    </li>
                    <li class="cellPC">
                        车次
                    </li>
                    <li class="cellPC">
                        实装方量
                    </li>
                    <li class="cellPC">
                        规格
                    </li>
                    <li class="cellPC">
                        倒车入口
                    </li>
                </ul>


                <ul v-for="(item, i) in waitAcceptCarList" class="rowPC" @click="selectedItem(item)">
                    <li class="cellPC">
                        {{ item.index }}
                    </li>
                    <li class="cellPC">
                        {{ item.CarNumber }}
                    </li>
                    <li class="cellPC">
                        {{ item.MaxFangliang }}
                    </li>
                    <li class="cellPC">
                        {{ item.RealName }}
                    </li>
                    <li class="cellPC">
                        司机电话
                    </li>
                    <li class="cellPC">
                        {{ item.comment }}
                    </li>
                    <li class="cellPC">
                        {{ item.StartLocation }}
                    </li>
                    <li class="cellPC">
                        {{ item.DestinatLocation }}
                    </li>
                    <li class="cellPC">
                        {{ item.CarCount }}
                    </li>
                    <li class="cellPC">
                        {{ item.RealFangliang }}
                    </li>
                    <li class="cellPC">
                        {{ item.type }}
                    </li>
                    <li class="cellPC">
                        {{ item.LoadLocation }}
                    </li>
                </ul>

            </ul>
        </div>


        <!-- 倒车列表 -->
        <div class="loadThingList">
            <!-- 1号线倒车列表 -->
            <div class="sayStationList">
                <ul class="tablePC">
                    <ul class="rowPC title">
                        <p>1号线倒车列表</p>
                    </ul>
                    <ul class="rowPC">
                        <li class="cellPC">
                            序号
                        </li>
                        <li class="cellPC">
                            车牌号
                        </li>
                        <li class="cellPC">
                            车辆状态
                        </li>
                        <li class="cellPC">
                            司机姓名
                        </li>
                        <li class="cellPC">
                            司机电话
                        </li>
                        <li class="cellPC">
                            目的地
                        </li>
                        <li class="cellPC">
                            车次
                        </li>
                        <li class="cellPC">
                            实装方量
                        </li>
                        <li class="cellPC">
                            规格
                        </li>
                    </ul>


                    <ul v-for="(item, i) in firstLoadThingList" class="rowPC" @click="selectedItem(item)">
                        <li class="cellPC">
                            {{ item.index }}
                        </li>
                        <li class="cellPC">
                            {{ item.CarNumber }}
                        </li>
                        <li class="cellPC">
                            {{ item.comment }}
                        </li>
                        <li class="cellPC">
                            {{ item.RealName }}
                        </li>
                        <li class="cellPC">
                            司机电话
                        </li>
                        <li class="cellPC">
                            {{ item.DestinatLocation }}
                        </li>
                        <li class="cellPC">
                            {{ item.CarCount }}
                        </li>
                        <li class="cellPC">
                            {{ item.RealFangliang }}
                        </li>
                        <li class="cellPC">
                            {{ item.type }}
                        </li>
                    </ul>

                </ul>
            </div>


            <!-- 2号线倒车列表 -->
            <div class="sayStationList">
                <ul class="tablePC">
                    <ul class="rowPC title">
                        <p>2号线倒车列表</p>
                    </ul>
                    <ul class="rowPC">
                        <li class="cellPC">
                            序号
                        </li>
                        <li class="cellPC">
                            车牌号
                        </li>
                        <li class="cellPC">
                            车辆状态
                        </li>
                        <li class="cellPC">
                            司机姓名
                        </li>
                        <li class="cellPC">
                            司机电话
                        </li>
                        <li class="cellPC">
                            目的地
                        </li>
                        <li class="cellPC">
                            车次
                        </li>
                        <li class="cellPC">
                            实装方量
                        </li>
                        <li class="cellPC">
                            规格
                        </li>
                    </ul>


                    <ul v-for="(item, i) in secondLoadThingList" class="rowPC" @click="selectedItem(item)">
                        <li class="cellPC">
                            {{ item.index }}
                        </li>
                        <li class="cellPC">
                            {{ item.CarNumber }}
                        </li>
                        <li class="cellPC">
                            {{ item.comment }}
                        </li>
                        <li class="cellPC">
                            {{ item.RealName }}
                        </li>
                        <li class="cellPC">
                            司机电话
                        </li>
                        <li class="cellPC">
                            {{ item.DestinatLocation }}
                        </li>
                        <li class="cellPC">
                            {{ item.CarCount }}
                        </li>
                        <li class="cellPC">
                            {{ item.RealFangliang }}
                        </li>
                        <li class="cellPC">
                            {{ item.type }}
                        </li>
                    </ul>

                </ul>
            </div>


        </div>


        <div class="bottomContainer">

            <!-- 车辆状态列表 -->
            <div class="carStateList">
                <ul class="tablePC">
                    <ul class="rowPC title">
                        <p>车辆状态列表</p>
                    </ul>
                    <ul class="rowPC">
                        <li class="cellPC">
                            车牌号
                        </li>
                        <li class="cellPC">
                            车辆状态
                        </li>
                        <li class="cellPC">
                            司机姓名
                        </li>
                        <li class="cellPC">
                            司机电话
                        </li>
                        <li class="cellPC">
                            起运地
                        </li>
                        <li class="cellPC">
                            目的地
                        </li>
                        <li class="cellPC">
                            车次
                        </li>
                        <li class="cellPC">
                            最大方量
                        </li>
                        <li class="cellPC">
                            实装方量
                        </li>
                        <li class="cellPC">
                            混凝土规格
                        </li>
                        <li class="cellPC">
                            倒车入口
                        </li>
                    </ul>


                    <ul v-for="(item, i) in carStateList" class="rowPC">
                        <li class="cellPC">
                            {{ item.CarNumber }}
                        </li>
                        <li class="cellPC">
                            {{ item.comment }}
                        </li>
                        <li class="cellPC">
                            {{ item.RealName }}
                        </li>
                        <li class="cellPC">
                            司机电话
                        </li>
                        <li class="cellPC">
                            {{ item.StartLocation }}
                        </li>
                        <li class="cellPC">
                            {{ item.DestinatLocation }}
                        </li>
                        <li class="cellPC">
                            {{ item.CarCount }}
                        </li>
                        <li class="cellPC">
                            {{ item.MaxFangliang }}
                        </li>
                        <li class="cellPC">
                            {{ item.RealFangliang }}
                        </li>
                        <li class="cellPC">
                            {{ item.type }}
                        </li>
                        <li class="cellPC">
                            {{ item.LoadLocation }}
                        </li>
                    </ul>

                </ul>
            </div>

        </div>





    </div>
</template>
    
<script>
export default {
    name: "dispatcherWorkPage",
    data() {
        return {
            btnDisabled: false,
            currentGuid: '',
            timer: null,
            taskStateList: [],//任务状态列表
            sayStationList: [],//待命车辆列表
            waitAcceptCarList: [],//待接收任务的车辆列表
            carStateList: [],//车辆状态列表
            firstLoadThingList: [],//1号线倒车列表
            secondLoadThingList: [],//2号线倒车列表
            currentSelectedItem: {},
            taskVisible: 'noneStyle'
        };
    },
    components: {},
    methods: {
        S4() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        },
        guid() {
            return (this.S4() + this.S4() + '-' + this.S4() + '-' + this.S4() + '-' + this.S4() + '-' + this.S4() + this.S4() + this.S4())
        },
        startTask() {
            let user = JSON.parse(window.localStorage.getItem(this.$UserInfoKey));
            this.btnDisabled = true;
            this.currentGuid = this.guid();
            let task = {
                guid: this.currentGuid,
                state: 'start',
                userName: user.UserName,
                startTime: this.$getCurrentTime().time
            }
            this.$http.post("/insertTaskInfo", task).then(
                (scucess) => {
                    switch (scucess.data) {
                        case "handleSucess":
                            console.log("handleSucess");
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
        endTask() {
            let stateInfo = {
                where: {
                    guid: this.currentGuid
                },
                info: {
                    $set: {
                        state: 'end',
                        endTime: this.$getCurrentTime().time
                    }
                }
            };

            this.$http.post("/updateTaskInfo", stateInfo).then(
                (scucess) => {
                    switch (scucess.data) {
                        case "where-undefined":
                            console.log("服务器端报错！");
                            break;
                        case "info-undefined":
                            console.log("服务器端报错！");
                            break;
                        case "handleSucess":
                            this.btnDisabled = false;
                            this.currentGuid = '';
                            console.log("handleSucess");
                            break;
                        case "server-error":
                            console.log("服务器端数据库报错！");
                            break;
                    }
                },
                (fail) => {
                    console.log(fail);
                }
            );


        },
        dispathTaskCancel() {
            this.editorTask('noneStyle')
        },
        dispathTask() {

            let stateInfo = {
                where: {
                    CarNumber: this.currentSelectedItem.CarNumber,
                    UserName: this.currentSelectedItem.UserName
                },
                body: {
                    $set: {
                        state: 'waitAccept',
                        comment: '等待接收',
                        StartLocation: this.currentSelectedItem.StartLocation,
                        DestinatLocation: this.currentSelectedItem.DestinatLocation,
                        CarCount: this.currentSelectedItem.CarCount,
                        RealFangliang: this.currentSelectedItem.RealFangliang,
                        type: this.currentSelectedItem.type,
                        LoadLocation: this.currentSelectedItem.LoadLocation
                    }
                }
            };


            this.$http.post("/updateTransStateInfo", stateInfo).then(
                (scucess) => {
                    switch (scucess.data) {
                        case "body-is-null":
                            console.log("服务器端报错！");
                            break;
                        case "body-where-is-null":
                            console.log("服务器端报错！");
                            break;
                        case "body-body-is-null":
                            console.log("服务器端报错！");
                            break;
                        case "handleSucess":
                            this.editorTask('noneStyle')
                            break;
                        case "dataBase-error":
                            console.log("服务器端数据库报错！");
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
        editorTask(value) {
            this.taskVisible = value
        },
        getCarStateList() {
            //定义条件
            let where = {
            };
            //发送请求
            this.$http
                .get(`/transStateQuerys?where=${JSON.stringify(where)}`)
                .then((info) => {
                    //服务器只要接到请求就会返回200成功
                    this.$handleRequest(info.data).then(
                        success => {
                            console.log("获取车辆状态列表成功了！")
                            this.carStateList = [];
                            this.waitAcceptCarList = [];
                            this.sayStationList = [];
                            this.firstLoadThingList = [];
                            this.secondLoadThingList = [];
                            this.SelfComponent = [];
                            let firstLoadThingCount = 0;
                            let secondLoadThingCount = 0;
                            let sayIndex = 0;
                            let weitAcceptIndex = 0;
                            success.forEach(element => {
                                if (element.state === 'waitTask') {
                                    sayIndex++;
                                    element.index = sayIndex;
                                    this.sayStationList.push(element)
                                } else if (element.state === 'waitAccept') {
                                    weitAcceptIndex++;
                                    element.index = weitAcceptIndex;
                                    this.waitAcceptCarList.push(element)
                                } else if (element.state === 'accept' || element.state === 'loadThing') {
                                    if (element.LoadLocation === '1号线') {
                                        firstLoadThingCount++;
                                        element.index = firstLoadThingCount
                                        this.firstLoadThingList.push(element);
                                    } else {
                                        secondLoadThingCount++;
                                        element.index = secondLoadThingCount
                                        this.secondLoadThingList.push(element);
                                    }
                                }
                                else {
                                    this.carStateList.push(element)
                                }
                            });
                        },
                        fail => {
                            this.carStateList = [];
                            console.log("获取车辆状态列表失败了！")
                        }
                    )
                },
                    (fail) => { console.log(fail) })
                .catch((err) => {
                    console.log(`网络请求超时！${err}`);
                });
        },
        selectedItem(item) {
            this.currentSelectedItem = item;
        },
        refresh() {
            //this.refreshSayStationList();
            this.getCarStateList();
            this.getTaskStateList();
        },
        beforeDestroy() {
            clearInterval(this.timer)
            this.timer = null;
        }
    },
    mounted() {
        this.refresh()
        this.timer = setInterval(this.refresh, 2000);
    },
    created() {
        //初始化界面
        let user = JSON.parse(window.localStorage.getItem(this.$UserInfoKey));
        let where = {
            userName: user.UserName,
            state: 'start'
        }
        this.$http
            .get(`/taskInfo?where=${JSON.stringify(where)}`)
            .then((info) => {
                this.$handleRequest(info.data).then(
                    success => {
                        this.guid = success.guid;
                        this.btnDisabled = true;
                    },
                    fail => {

                    }
                )
            },
                (fail) => {
                    console.log(fail)
                })
            .catch((err) => {
                console.log(`网络请求超时！${err}`);
            });
    }
};
</script>
    
<style>
.dispatcherRoot .title {
    justify-content: center;
    margin-bottom: 20px;
}


.dispatcherRoot {
    font-size: 13px;
    display: flex;
    flex-direction: column;
}

.dispatcherRoot button {
    font-size: 13px;
}


/* 报站列表 */

.sayStationList .tablePC {
    border: 1px solid black;
    height: 50vh;
    padding: 10px;
    margin: 5px;
}

.sayStationList .tablePC .rowPC .cellPC {
    width: 100px;
    justify-content: center;
    align-items: center;
}



/* 任务列表 */
.taskContent {
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.9);
    border-right: 1px solid black;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    margin: auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
}

.noneStyle {
    display: none;
}

.taskContent input {
    width: 100px;
    border: 1px solid black;
}

.taskContent .tablePC {
    width: 200px;
    display: flex;
    justify-content: flex-start;
    height: 150px;
}

.taskContent .tablePC .rowPC {
    display: flex;
    flex-direction: row;
    height: 1.5em;
    margin-left: 10px;
}

.taskContent .tablePC .cellPC:first-child {
    width: 70px;
}

.taskContent .tablePC .cellPC:nth-child(2) {
    width: 100px;
}


.taskContent button {
    height: 25px;
    width: 177px;
    font-size: 13px;
}


/* 倒车列表 */
.loadThingList {
    display: flex;
    flex-direction: row;
}

.loadThingList .sayStationList {
    width: 50%;
}


/* 车辆状态列表 */
/* .bottomContainer .carStateList{
    background-color: red;
} */

.carStateList .tablePC {
    border: 1px solid black;
    height: 50vh;
    margin: 5px;
    margin-top: 0;
}

.carStateList .tablePC .rowPC .cellPC {
    width: 100px;
    justify-content: center;
    align-items: center;
}
</style>
    