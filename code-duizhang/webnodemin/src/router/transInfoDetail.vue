<template>
    <div class="carCountFanliangStaticRoot">
        <button class="btnTop" @click="switchDisplayContent">切换显示内容</button>
        <div class="table">
            <div class="row">
                <div class="cell">
                    <div>姓名</div>
                </div>
                <div class="cell">
                    <div>车牌号</div>
                </div>


                <div class="cell" :class="firstContentVisibleCompute">
                    <div>起运地</div>
                </div>
                <div class="cell" :class="firstContentVisibleCompute">
                    <div>目的地</div>
                </div>
                <div class="cell" :class="firstContentVisibleCompute">
                    <div>方量</div>
                </div>


                <div class="cell" :class="scondContentVisibleCompute">
                    <div>规格</div>
                </div>
                <div class="cell" :class="scondContentVisibleCompute">
                    <div>出站时间</div>
                </div>
                <div class="cell" :class="scondContentVisibleCompute">
                    <div>到工地时间</div>
                </div>


                <div class="cell" :class="thirdContentVisibleCompute">
                    <div>卸车时间</div>
                </div>
                <div class="cell" :class="thirdContentVisibleCompute">
                    <div>卸完时间</div>
                </div>
                <div class="cell" :class="thirdContentVisibleCompute">
                    <div>回站时间</div>
                </div>

            </div>
            <div v-for="(item, i) in list" class="row" @click="rowClickHandler(item)">
                <div class="cell">
                    <div>{{ item.RealName }}</div>
                </div>
                <div class="cell">
                    <div>{{ item.CarNumber }}</div>
                </div>
                <div class="cell" :class="firstContentVisibleCompute">
                    <div>{{ item.StartLocation }}</div>
                </div>
                <div class="cell" :class="firstContentVisibleCompute">
                    <div>{{ item.DestinatLocation }}</div>
                </div>
                <div class="cell" :class="firstContentVisibleCompute">
                    <div>{{ item.RealFangliang }}</div>
                </div>


                <div class="cell" :class="scondContentVisibleCompute">
                    <div>{{ item.type }}</div>
                </div>
                <div class="cell" :class="scondContentVisibleCompute">
                    <!-- <div>
                        {{ item.leaveStationTime === '' || item.leaveStationTime === undefined ? '' :
                                item.leaveStationTime.substring(9)
                        }}</div> -->
                        <div>{{ item.leaveStationTime }}</div>
                </div>
                <div class="cell" :class="scondContentVisibleCompute">
                    <!-- <div>{{ item.arrivalTime === '' || item.arrivalTime === undefined ? '' :
                            item.arrivalTime.substring(9)
                    }}</div> -->
                    <div>{{ item.arrivalTime }}</div>
                </div>


                <div class="cell" :class="thirdContentVisibleCompute">
                    <!-- <div>{{ item.startOffTime === '' || item.startOffTime === undefined ? '' :
                            item.startOffTime.substring(9)
                    }}</div> -->
                    <!-- <div>{{ item.startOffTime.substring(9) }}</div> -->
                    <div>{{ item.startOffTime }}</div>
                </div>
                <div class="cell" :class="thirdContentVisibleCompute">
                    <!-- <div>{{ item.offCompleteTime === '' || item.offCompleteTime === undefined ? '' :
                            item.offCompleteTime.substring(9)
                    }}</div> -->
                    <!-- <div>{{ item.offCompleteTime.substring(9) }}</div> -->
                    <div>{{ item.offCompleteTime }}</div>
                </div>
                <div class="cell" :class="thirdContentVisibleCompute">
                    <!-- <div>{{ item.backTime === '' || item.backTime === undefined ? '' : item.backTime.substring(9) }}
                    </div> -->
                    <!-- <div>{{ item.backTime.substring(9) }}</div> -->
                    <div>{{ item.backTime }}</div>
                </div>

            </div>
        </div>
    </div>
</template>
  
<script>

export default {
    name: 'carCountFanliangStatic',
    computed: {
        firstContentVisibleCompute() {
            return this.displayArray[this.displayCurrentIndex].firstContentVisible
        },
        scondContentVisibleCompute() {
            return this.displayArray[this.displayCurrentIndex].scondContentVisible
        },
        thirdContentVisibleCompute() {
            return this.displayArray[this.displayCurrentIndex].thirdContentVisible
        }
    },
    methods: {
        switchDisplayContent() {
            this.displayContentIndexCount++;
            this.displayCurrentIndex = this.displayContentIndexCount % 3;
            console.log(this.displayCurrentIndex)
        },
        refresh() {

            this.$store.commit('showLoading')

            let where = {};

            if (this.$route.query.DestinatLocation != '' && this.$route.query.DestinatLocation != undefined) {
                where = {
                    DestinatLocation: this.$route.query.DestinatLocation
                }
            } else {
                where = {
                    startYear: this.$route.query.year,
                    startMonth: this.$route.query.month,
                    startDay: this.$route.query.day,
                    UserName: this.$route.query.UserName
                }
            }

            //判断所属车辆
            let user = JSON.parse(window.localStorage.getItem(this.$UserInfoKey));
            let cars = [];
            if (user.cars != undefined && user.cars != null) {
                user.cars.forEach(element => {
                    cars.push({ CarNumber: element })
                })
            }

            if (cars.length > 0) {
                where.$or = cars;
            }


            //发送请求
            this.$http
                .get(`/transInfoQuery?where=${JSON.stringify(where)}`)
                .then((info) => {
                    this.$handleRequest(info.data).then(
                        sucess => {
                            this.list = sucess
                            this.$store.commit('hideLoading')
                        },
                        fail => {
                            this.$store.commit('hideLoading')
                        }
                    )
                },
                    (fail) => {
                        console.log(fail)
                        this.$store.commit('hideLoading')
                    })
                .catch((err) => {
                    console.log(`网络请求超时！${err}`);
                    this.$store.commit('hideLoading')
                });
        }
    },
    data() {
        return {
            list: [],
            displayArray: [
                {
                    firstContentVisible: '',
                    scondContentVisible: 'hideHtml',
                    thirdContentVisible: 'hideHtml'
                },
                {
                    firstContentVisible: 'hideHtml',
                    scondContentVisible: '',
                    thirdContentVisible: 'hideHtml'
                },
                {
                    firstContentVisible: 'hideHtml',
                    scondContentVisible: 'hideHtml',
                    thirdContentVisible: ''
                }
            ],
            displayContentIndexCount: 0,
            displayCurrentIndex: 0
        }
    },
    mounted() {

    },
    activated() {
        this.refresh();
    }
}
</script>
  
<style>
.hideHtml {
    display: none;
}


.carCountFanliangStaticRoot .btnTop {
    background-color: red;
    color: white;
    margin-left: 10vw;
    margin-top: 5vw;
    margin-bottom: 5vw;
    height: 7vw;
}

.carCountFanliangStaticRoot .row .cell {
    flex: 1;
    justify-content: center;
}
</style>
  