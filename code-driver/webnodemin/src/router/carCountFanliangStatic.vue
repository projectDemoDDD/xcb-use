<template>
    <div class="carCountFanliangStaticRoot">
        <div class="row">
            <button @click="previewPage" class="preview">上一页</button>
        </div>
        <div class="table">
            <div class="row">
                <div class="cell">
                    <div>项目</div>
                </div>
                <div class="cell">
                    <div>车次</div>
                </div>
                <div class="cell">
                    <div>方量</div>
                </div>
            </div>
            <div v-for="(item, i) in list" class="row" @click="rowClickHandler(item)">
                <div class="cell">
                    <div>{{ item.projectName }}</div>
                </div>
                <div class="cell">
                    <div>{{ item.sum1 }}</div>
                </div>
                <div class="cell">
                    <div>{{ item.sum2 }}</div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>

export default {
    name: 'carCountFanliangStatic',
    methods: {
        previewPage() {
            let currentType = this.type
            switch (currentType) {
                case "yy":
                    break;
                case "mm":
                    this.type = 'yy'
                    break;
                case "dd":
                    this.type = 'mm'
                    break;
                case "sj":
                    this.type = 'dd'
                    break;
            }
            this.refresh();
        },
        rowClickHandler(item) {
            let project = item.project;
            let currentType = this.type
            switch (currentType) {
                case "yy":
                    this.type = 'mm'
                    this.year = project
                    break;
                case "mm":
                    this.type = 'dd'
                    this.month = project
                    break;
                case "dd":
                    this.type = 'sj'
                    this.day = project
                    break;
                case "sj":
                    this.$router.push({
                        name: 'transInfoDetail',
                        query: {
                            year: this.year,
                            month: this.month,
                            day: this.day,
                            UserName: project
                        }
                    })
                    break;
            }
            this.refresh();
        },
        groupTransInfo(data) {
            let map = new Map();
            let c = 1;
            let f = 0;
            let sumCount = 0;
            let sumFangliang = 0;
            switch (this.type) {
                case "yy":
                    //不用传参 所有的记录 按年分组
                    data.forEach(element => {
                        sumCount++;
                        sumFangliang = sumFangliang + parseInt(element.RealFangliang)
                        if (map.has(element.startYear)) {
                            let obj = map.get(element.startYear);
                            obj.sum1++;
                            obj.sum2 = parseInt(obj.sum2) + parseInt(element.RealFangliang);
                        } else {
                            f = element.RealFangliang
                            map.set(element.startYear, {
                                sum1: c,
                                sum2: f,
                                project: element.startYear,
                                projectName: `${element.startYear}年`
                            })
                        }
                    });

                    break;
                case "mm":
                    //需要一个年份的参数

                    data.forEach(element => {
                        sumCount++;
                        sumFangliang = sumFangliang + parseInt(element.RealFangliang)
                        if (map.has(element.startMonth)) {
                            let obj = map.get(element.startMonth);
                            obj.sum1++;
                            obj.sum2 = parseInt(obj.sum2) + parseInt(element.RealFangliang);
                        } else {
                            f = element.RealFangliang
                            map.set(element.startMonth, {
                                sum1: c,
                                sum2: f,
                                project: element.startMonth,
                                projectName: `${element.startMonth}月`
                            })
                        }
                    });

                    break;
                case "dd":
                    // 需要年份与月份参数

                    data.forEach(element => {
                        sumCount++;
                        sumFangliang = sumFangliang + parseInt(element.RealFangliang)
                        if (map.has(element.startDay)) {
                            let obj = map.get(element.startDay);
                            obj.sum1++;
                            obj.sum2 = parseInt(obj.sum2) + parseInt(element.RealFangliang);
                        } else {
                            f = element.RealFangliang
                            map.set(element.startDay, {
                                sum1: c,
                                sum2: f,
                                project: element.startDay,
                                projectName: `${element.startDay}号`
                            })
                        }
                    });

                    break;
                case "sj":
                    // 需要年月日参数

                    data.forEach(element => {
                        sumCount++;
                        sumFangliang = sumFangliang + parseInt(element.RealFangliang)
                        if (map.has(element.UserName)) {
                            let obj = map.get(element.UserName);
                            obj.sum1++;
                            obj.sum2 = parseInt(obj.sum2) + parseInt(element.RealFangliang);
                        } else {
                            f = element.RealFangliang
                            map.set(element.UserName, {
                                sum1: c,
                                sum2: f,
                                project: element.UserName,
                                projectName: `${element.RealName}`
                            })
                        }
                    });

                    break;
            }

            map.set('合计', {
                sum1: sumCount,
                sum2: sumFangliang,
                project: '合计',
                projectName: `合计`
            })

            this.list = [...map.values()]

        },
        refresh() {
            let user = JSON.parse(window.localStorage.getItem(this.$UserInfoKey));

            let where = {};

            if (this.type === 'mm') {
                where = {
                    startYear: this.year
                }
            }
            if (this.type === 'dd') {
                where = {
                    startYear: this.year,
                    startMonth: this.month
                }
            }
            if (this.type === 'sj') {
                where = {
                    startYear: this.year,
                    startMonth: this.month,
                    startDay: this.day
                }
            }

            if (this.$route.query.role === 'sj') {
                where.UserName = user.UserName
            }

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
                            this.groupTransInfo(sucess);
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
    },
    data() {
        return {
            list: [],
            type: 'yy',
            year: 0,
            month: 0,
            day: 0
        }
    },
    mounted() {
        this.refresh();
    }
}
</script>
  
<style>
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
</style>
  