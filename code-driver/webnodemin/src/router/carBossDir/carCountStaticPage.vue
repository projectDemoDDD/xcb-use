<template>
    <div class="carCountFanliangStaticRoot">
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
            <div v-for="(item, i) in list" class="row">
                <div class="table">
                    <div class="row">
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
                    <div v-for="(itemNex, j) in item.items" class="row">
                        <div class="cell">
                            <div>{{ itemNex.projectName }}</div>
                        </div>
                        <div class="cell">
                            <div>{{ itemNex.sum1 }}</div>
                        </div>
                        <div class="cell">
                            <div>{{ itemNex.sum2 }}</div>
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
        groupTransInfo(data) {
            let map = new Map();
            let c = 1;
            let f = 0;
            let sumCount = 0;
            let sumFangliang = 0;


            //不用传参 所有的记录 按年分组
            data.forEach(element => {
                f = element.RealFangliang
                sumCount++;
                sumFangliang = sumFangliang + parseInt(element.RealFangliang)
                if (map.has(element[this.$route.query.groupName])) {
                    let obj = map.get(element[this.$route.query.groupName]);
                    obj.sum1++;
                    obj.sum2 = parseInt(obj.sum2) + parseInt(element.RealFangliang);

                    if (obj.itemsMap.has(element.startMonth)) {
                        let nexItem = obj.itemsMap.get(element.startMonth);
                        nexItem.sum1++;
                        nexItem.sum2 = parseInt(nexItem.sum2) + parseInt(element.RealFangliang);
                    } else {
                        obj.itemsMap = new Map();
                        obj.itemsMap.set(element.startMonth, {
                            sum1: 1,
                            sum2: f,
                            project: element.startMonth,
                            projectName: `${element.startMonth}月份`,
                        })
                    }

                } else {

                    map.set(element[this.$route.query.groupName], {
                        sum1: c,
                        sum2: f,
                        project: element[this.$route.query.groupName],
                        projectName: `${element[this.$route.query.groupName]}`,
                        itemsMap: new Map().set(element.startMonth, {
                            sum1: 1,
                            sum2: f,
                            project: element.startMonth,
                            projectName: `${element.startMonth}月份`,
                        }),
                        items: []
                    })
                }
            });

            map.forEach((item,index)=>{
                item.items=[...item.itemsMap.values()]
            })

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
            let cars = [];
            user.cars.forEach(element => {
                cars.push({ CarNumber: element })
            })
            //定义条件
            let where = {
                $or: cars
            };

            let url = `/transInfoQuery?where=${JSON.stringify(where)}`
            //let url = `/transInfoQuery?where={}`
            //发送请求
            this.$http
                .get(url)
                .then((info) => {
                    this.$handleRequest(info.data).then(
                        sucess => {
                            this.groupTransInfo(sucess);
                        },
                        fail => {
                            console.log(`fail:${fail}`)
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
            list: []
        }
    },
    mounted() {
        console.log('mounted')
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

.carCountFanliangStaticRoot .row .table{
    width: 100vw;
}
</style>
  