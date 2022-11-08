<template>
    <div class="carBossCarStateStaticRoot">

        <!-- 车辆状态信息汇总 -->
        <ul class="table">
            <li class="row">
                <div class="cell">共计{{ sumCount }}辆车</div>
            </li>
            <li class="row">
                <div class="cell">有{{ restCount }}辆车休息中</div>
                <div class="cell">有{{ waitTaskCount }}辆车等待发车</div>
                <div class="cell">有{{ startCount }}辆车在去工地的路上</div>
            </li>
            <li class="row">
                <div class="cell">有{{ arrivalCount }}辆车在等待卸车</div>
                <div class="cell">有{{ startOffCount }}辆车正在卸车</div>
                <div class="cell">有{{ offCompleteCount }}辆车在回站的路上</div>
            </li>
        </ul>


        <!-- 车辆状态明细 -->
        <ul class="table">
            <li class="row">
                <!-- <div class="cell">序号</div> -->
                <div class="cell">车牌号</div>
                <div class="cell">起运地</div>
                <div class="cell">目的地</div>
                <div class="cell">方量</div>
                <div class="cell">司机</div>
                <div class="cell">状态</div>
            </li>

            <li v-for="(item, i) in  carRestList" class="row">
                <!-- <div class="cell">{{ item.index }}</div> -->
                <div class="cell">{{ item.CarNumber }}</div>
                <div class="cell">{{ item.StartLocation }}</div>
                <div class="cell">{{ item.DestinatLocation }}</div>
                <div class="cell">{{ item.RealFangliang }}</div>
                <div class="cell">{{ item.RealName }}</div>
                <div class="cell">{{ item.comment }}</div>
            </li>
            <hr/>
            <li v-for="(item, i) in  carWaitList" class="row">
                <!-- <div class="cell">{{ item.index }}</div> -->
                <div class="cell">{{ item.CarNumber }}</div>
                <div class="cell">{{ item.StartLocation }}</div>
                <div class="cell">{{ item.DestinatLocation }}</div>
                <div class="cell">{{ item.RealFangliang }}</div>
                <div class="cell">{{ item.RealName }}</div>
                <div class="cell">{{ item.comment }}</div>
            </li>
            <hr/>
            <li v-for="(item, i) in  carToGongdiList" class="row">
                <!-- <div class="cell">{{ item.index }}</div> -->
                <div class="cell">{{ item.CarNumber }}</div>
                <div class="cell">{{ item.StartLocation }}</div>
                <div class="cell">{{ item.DestinatLocation }}</div>
                <div class="cell">{{ item.RealFangliang }}</div>
                <div class="cell">{{ item.RealName }}</div>
                <div class="cell">{{ item.comment }}</div>
            </li>
            <hr/>
            <li v-for="(item, i) in  carWaitOffList" class="row">
                <!-- <div class="cell">{{ item.index }}</div> -->
                <div class="cell">{{ item.CarNumber }}</div>
                <div class="cell">{{ item.StartLocation }}</div>
                <div class="cell">{{ item.DestinatLocation }}</div>
                <div class="cell">{{ item.RealFangliang }}</div>
                <div class="cell">{{ item.RealName }}</div>
                <div class="cell">{{ item.comment }}</div>
            </li>
            <hr/>
            <li v-for="(item, i) in  carOffingList" class="row">
                <!-- <div class="cell">{{ item.index }}</div> -->
                <div class="cell">{{ item.CarNumber }}</div>
                <div class="cell">{{ item.StartLocation }}</div>
                <div class="cell">{{ item.DestinatLocation }}</div>
                <div class="cell">{{ item.RealFangliang }}</div>
                <div class="cell">{{ item.RealName }}</div>
                <div class="cell">{{ item.comment }}</div>
            </li>
            <hr/>
            <li v-for="(item, i) in  carBackList" class="row">
                <!-- <div class="cell">{{ item.index }}</div> -->
                <div class="cell">{{ item.CarNumber }}</div>
                <div class="cell">{{ item.StartLocation }}</div>
                <div class="cell">{{ item.DestinatLocation }}</div>
                <div class="cell">{{ item.RealFangliang }}</div>
                <div class="cell">{{ item.RealName }}</div>
                <div class="cell">{{ item.comment }}</div>
            </li>
        </ul>
    </div>
</template>
  
<script>

export default {
    name: 'carBossCarStateStatic',
    methods: {
        refresh() {
            this.getCarStateList();
        },
        getCarStateList() {
            let user = JSON.parse(window.localStorage.getItem(this.$UserInfoKey));
            let cars = [];
            user.cars.forEach(element => {
                cars.push({ CarNumber: element })
            })
            //定义条件
            let where = {
                $or: cars
            };
            //发送请求
            this.$http
                .get(`/transStateQuerys?where=${JSON.stringify(where)}`)
                .then((info) => {
                    //服务器只要接到请求就会返回200成功
                    this.$handleRequest(info.data).then(
                        success => {
                            console.log("获取车辆状态列表成功了！")
                            let carStateIndex = 0;
                            //this.carStateList = [];
                            this.carRestList = [];
                            this.carWaitList = [];
                            this.carToGongdiList = [];
                            this.carWaitOffList = [];
                            this.carOffingList = [];
                            this.carBackList = [];

                            this.sumCount = success.length;
                            let rest = 0;
                            let waitTask = 0;
                            let waitAccept = 0;
                            let accept = 0;
                            let loadThing = 0;
                            let start = 0;
                            let arrival = 0;
                            let startOff = 0;
                            let offComplete = 0;

                            success.forEach(success => {
                                carStateIndex++
                                success.index = carStateIndex
                                //this.carStateList.push(success)

                                switch (success.state) {
                                    case "rest":
                                        this.carRestList.push(success)
                                        rest++;
                                        break;
                                    case "waitTask":
                                        this.carWaitList.push(success)
                                        waitTask++
                                        break;
                                    case "start":
                                        this.carToGongdiList.push(success)
                                        start++
                                        break;
                                    case "arrival":
                                        this.carWaitOffList.push(success)
                                        arrival++
                                        break;
                                    case "startOff":
                                        this.carOffingList.push(success)
                                        startOff++
                                        break;
                                    case "offComplete":
                                        this.carBackList.push(success)
                                        offComplete++
                                        break;
                                }

                            });

                            this.restCount = rest;
                            this.waitTaskCount = waitTask;
                            this.waitAcceptCount = waitAccept;
                            this.acceptCount = accept;
                            this.loadThingCount = loadThing;
                            this.startCount = start;
                            this.arrivalCount = arrival;
                            this.startOffCount = startOff;
                            this.offCompleteCount = offComplete;


                            this.carRestList.sort((p1, p2) => {
                                if (p1.RecordTime === undefined) return 1;
                                if (p2.RecordTime === undefined) return -1;
                                return Date.parse(p1.RecordTime) - Date.parse(p2.RecordTime)
                            })

                            this.carWaitList.sort((p1, p2) => {
                                if (p1.RecordTime === undefined) return 1;
                                if (p2.RecordTime === undefined) return -1;
                                return Date.parse(p1.RecordTime) - Date.parse(p2.RecordTime)
                            })

                            this.carToGongdiList.sort((p1, p2) => {
                                if (p1.RecordTime === undefined) return 1;
                                if (p2.RecordTime === undefined) return -1;
                                return Date.parse(p1.RecordTime) - Date.parse(p2.RecordTime)
                            })

                            this.carWaitOffList.sort((p1, p2) => {
                                if (p1.RecordTime === undefined) return 1;
                                if (p2.RecordTime === undefined) return -1;
                                return Date.parse(p1.RecordTime) - Date.parse(p2.RecordTime)
                            })

                            this.carOffingList.sort((p1, p2) => {
                                if (p1.RecordTime === undefined) return 1;
                                if (p2.RecordTime === undefined) return -1;
                                return Date.parse(p1.RecordTime) - Date.parse(p2.RecordTime)
                            })

                            this.carBackList.sort((p1, p2) => {
                                if (p1.RecordTime === undefined) return 1;
                                if (p2.RecordTime === undefined) return -1;
                                return Date.parse(p1.RecordTime) - Date.parse(p2.RecordTime)
                            })

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
        }
    },
    data() {
        return {
            sumCount: 0,
            restCount: 0,
            waitTaskCount: 0,
            waitAcceptCount: 0,
            acceptCount: 0,
            loadThingCount: 0,
            startCount: 0,
            arrivalCount: 0,
            startOffCount: 0,
            offCompleteCount: 0,
            timer: null,
            carStateList: [],

            carRestList: [],
            carWaitList: [],
            carToGongdiList: [],
            carWaitOffList: [],
            carOffingList: [],
            carBackList: []
        }
    },
    created() {
        this.refresh()
        this.timer = setInterval(this.refresh, 2000);
    },
    beforeDestroy() {
        clearInterval(this.timer)
        this.timer = null;
    }
}
</script>
  
<style scoped>
.carBossCarStateStaticRoot .table {
    width: 100vw;
}

.carBossCarStateStaticRoot .table .row {
    justify-content: center;
}


.carBossCarStateStaticRoot .table:nth-child(2) .cell {
    flex: 1;
    justify-content: center;
    align-items: center;
}




/* .carBossCarStateStaticRoot .table:first-child .row>div {
    background-color: orange;
} */
.carBossCarStateStaticRoot .table:first-child {
    border-bottom: 1px solid black;
}

.carBossCarStateStaticRoot .table:first-child .row {
    display: flex;
    justify-content: flex-start;
}

.carBossCarStateStaticRoot .table:first-child .row .cell {
    flex: 1;
}
</style>
  