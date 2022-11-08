<template>
    <div class="classManagerRoot">
        <ul>
            <li>
                <div>月份</div>
                <div>收入</div>
                <div>支出</div>
                <div>余额</div>
            </li>
            <li v-for="(item, i) in list">
                <div>{{ item.month }}</div>
                <div>{{ item.income }}</div>
                <div>{{ item.outcome }}</div>
                <div>{{ item.sum }}</div>
            </li>
        </ul>
    </div>
</template>
  
<script>
export default {
    name: 'moneyStatic',
    data() {
        return {
            list: []
        }
    },
    methods: {
        getList() {
            //定义条件
            let where = {
            };
            //发送请求
            this.$http
                .get(`/moneyDetailInfoQuerys?where=${JSON.stringify(where)}`)
                .then((info) => {
                    //服务器只要接到请求就会返回200成功
                    this.$handleRequest(info.data).then(
                        success => {
                            this.list = [];
                            let map = new Map();

                            success.forEach(element => {

                                if (map.has(element.MM)) {

                                    let obj = map.get(element.MM);

                                    if (element.type === 'in') {
                                        //收入
                                        obj.income = obj.income + parseInt(element.money)
                                    } else {
                                        //支出
                                        obj.outcome = obj.outcome + parseInt(element.money)
                                    }

                                } else {

                                    let obj = {
                                        month: element.MM,
                                        income: 0,
                                        outcome: 0
                                    }


                                    if (element.type === 'in') {
                                        //收入
                                        obj.income = parseInt(element.money)
                                    } else {
                                        //支出
                                        obj.outcome = parseInt(element.money)
                                    }

                                    map.set(element.MM, obj)

                                }

                            });

                            let incomeSum = 0;
                            let outcomeSum = 0;
                            let sumSum = 0;

                            this.list = [...map.values()]
                            this.list.forEach(item => {
                                item.sum = item.income - item.outcome
                                incomeSum = incomeSum + item.income
                                outcomeSum = outcomeSum + item.outcome
                                sumSum = sumSum + item.sum
                            })


                            this.list.push('合计', {
                                month: '合计',
                                income: incomeSum,
                                outcome: outcomeSum,
                                sum: sumSum
                            })


                        },
                        fail => {
                            this.list = [];
                        }
                    )
                },
                    (fail) => { console.log(fail) })
                .catch((err) => {
                    console.log(`网络请求超时！${err}`);
                });
        }
    },
    mounted() {
        this.getList();
    }
}
</script>
  
<style scoped>
.classManagerRoot {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
}

.classManagerRoot button {
    color: white;
    background-color: red;
}

.classManagerRoot ul {
    width: 100vw;
}

.classManagerRoot ul li {
    margin-top: 2vw;
    display: flex;
    justify-content: space-around;
}

.classManagerRoot ul li div {
    flex: 1;
}

.classManagerRoot ul li div {
    display: flex;
    justify-content: center;
    align-items: center;
}

.classManagerRoot ul li input {
    width: 90%;
}

.van-picker {
    flex-direction: column;
}

.pickerContainer button {
    width: 12vw;
    height: 6vw;
}
</style>
  