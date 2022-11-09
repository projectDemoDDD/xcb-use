<template>
    <div class="carCountFanliangStaticRoot">
        <button class="previewBtn" @click="privewClick">上一页</button>
        <div class="table">
            <div class="row">
                <div class="cell">
                    <div>项目</div>
                </div>
                <div class="cell">
                    <div>车次</div>
                </div>
                <div class="cell">
                    <div>票面方量</div>
                </div>
                <div class="cell">
                    <div>结算方量(补方)</div>
                </div>
            </div>
            <div v-for="(item, i) in list" class="row">
                <div class="table">
                    <div class="row" @click="rowClick(item)">
                        <div class="cell">
                            <div>{{ item.projectName }}</div>
                        </div>
                        <div class="cell">
                            <div>{{ item.sum1 }}</div>
                        </div>
                        <div class="cell">
                            <div>{{ item.sum2 }}</div>
                        </div>
                        <div class="cell">
                            <div>{{ item.finalSumFangliang }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    name: 'carCountStaticPage',
    methods: {
        privewClick() {
            this.startLocation = '';
            this.groupName = ''
            this.refresh();
        },
        rowClick(item) {
            if (this.startLocation != undefined && this.startLocation != '') {
                this.$router.push({
                    name: 'transInfoDetail',
                    query: {
                        DestinatLocation: item.projectName
                    }
                })
                return;
            }

            this.startLocation = item.projectName;
            this.groupName = 'DestinatLocation'
            this.refresh();
            // this.$router.push({
            //     name: 'carCountStaticPage',
            //     query: {
            //         groupName: 'DestinatLocation',
            //         startLocation: item.projectName
            //     }
            // })
        },
        groupTransInfo(data) {
            let map = new Map();
            let c = 1;
            let f = 0;
            let sumCount = 0;
            let sumFangliang = 0;
            let finalSumFangliang = 0;

            let gName = this.groupName
            if (gName === '' || gName === undefined) {
                gName = this.$route.query.groupName
            }


            data.forEach(element => {
                sumCount++;
                let realFanlgiang = parseFloat(element.RealFangliang)

                //获取最小方量值以及结算方量
                let destiante = this.$destination.get(element.DestinatLocation)
                let minFangliang = 0
                if (destiante != undefined && destiante.minFangliang != undefined) {
                    minFangliang = parseFloat(destiante.minFangliang)
                }
                let jiesuanFl = minFangliang > realFanlgiang ? minFangliang : realFanlgiang
                finalSumFangliang = finalSumFangliang + jiesuanFl

                sumFangliang = sumFangliang + realFanlgiang

                if (map.has(element[gName])) {

                    let obj = map.get(element[gName]);
                    obj.sum1++;
                    obj.sum2 = obj.sum2 + realFanlgiang;
                    obj.finalSumFangliang = obj.finalSumFangliang + jiesuanFl;

                } else {

                    map.set(element[gName], {
                        sum1: c,
                        sum2: realFanlgiang,
                        finalSumFangliang: jiesuanFl,
                        project: element[gName],
                        projectName: `${element[gName]}`,
                        items: []
                    })
                }
            });

            this.list = [...map.values()]

            this.list.sort((p1, p2) => {
                return p2.sum2 - p1.sum2
            })


            this.list.push({
                sum1: sumCount,
                sum2: sumFangliang,
                finalSumFangliang: finalSumFangliang,
                project: '合计',
                projectName: `合计`
            })

        },
        refresh() {


            this.$store.commit('showLoading')

            let user = JSON.parse(window.localStorage.getItem(this.$UserInfoKey));
            let cars = [];
            user.cars.forEach(element => {
                cars.push({ CarNumber: element })
            })
            //定义条件
            let where = {
                $or: cars
            };

            if (this.startLocation != undefined && this.startLocation != '') {
                where.StartLocation = this.startLocation
            }

            let url = `/transInfoQuery?where=${JSON.stringify(where)}`
            //let url = `/transInfoQuery?where={}`
            //发送请求
            this.$http
                .get(url)
                .then((info) => {
                    this.$handleRequest(info.data).then(
                        sucess => {
                            this.groupTransInfo(sucess);
                            this.$store.commit('hideLoading')
                        },
                        fail => {
                            console.log(`fail:${fail}`)
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
            startLocation: '',
            groupName: ''
        }
    },
    mounted() {
        this.refresh();
    },
    activated() {
        this.refresh();
    }
}
</script>
  
<style>
.previewBtn {
    background-color: red;
    width: 20vw;
    height: 8vw;
    margin-left: 5vw;
    margin-top: 5vw;
    margin-bottom: 5vw;
}

.carCountFanliangStaticRoot .row .cell {
    flex: 1;
    justify-content: center;
}

.carCountFanliangStaticRoot .row .preview {
    width: 20vw;
    height: 8vw;
    margin-left: 10vw;
    margin-top: 2vw;
    background-color: red;
    color: snow;
}

.carCountFanliangStaticRoot .row .table {
    width: 100vw;
}
</style>
  