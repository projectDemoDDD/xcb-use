<template>
    <div class="outComeDetailRoot">
        <ul>
            <li>
                <div>日期</div>
                <div>姓名</div>
                <div :class="carNumberVisible">车号</div>
                <div>类别</div>
                <div>事项</div>
                <div>出账</div>
            </li>
            <li v-for="(item, i) in list">
                <div>{{ item.recordTime }}</div>
                <div>{{ item.name }}</div>
                <div :class="carNumberVisible">{{ item.carNumber }}</div>
                <div>{{ item.content }}</div>
                <div>{{ item.project }}</div>
                <div>{{ item.money }}</div>
            </li>
        </ul>
    </div>
</template>
  
<script>
export default {
    name: 'detailView',
    data() {
        return {
            carNumberVisible: '',
            list: [],
            inputBoxShow: false,
            currentItem: {
                recordTime: '',
                name: '',
                carNumber: '',
                content: '',
                project: '',
                money: '',
                type: 'out',
                isAdd: true
            }
        }
    },
    methods: {
        getList() {
            //定义条件
            let where = {
                type: this.$route.query.type,
                content: this.$route.query.projectName
            };

            if (where.type === 'in') {
                this.carNumberVisible = 'hiddenStyle'
            } else {
                this.carNumberVisible = ''
            }

            //alert(`type:${where.type},visible:${this.carNumberVisible}`)

            //alert(JSON.stringify(this.$route.query.projectName))
            //发送请求
            this.$http
                .get(`/moneyDetailInfoQuerys?where=${JSON.stringify(where)}`)
                .then((info) => {
                    //服务器只要接到请求就会返回200成功
                    this.$handleRequest(info.data).then(
                        success => {
                            console.log("获取车辆状态列表成功了！")

                            success.sort((p1, p2) => {
                                return p2.money - p1.money
                            })

                            this.list = success;
                        },
                        fail => {
                            this.list = [];
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
    mounted() {
        this.getList();
    }
}
</script>
  
<style scoped>
.btnContainer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 5vw;
    margin-left: 4vw;
    margin-right: 4vw;
}

.btnContainer .btn {
    width: 30vw;
    height: 8vw;
    background-color: red;
}

.outComeDetailRoot {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
}

.outComeDetailRoot ul {
    width: 100vw;
}

.outComeDetailRoot ul li {
    margin-top: 2vw;
    display: flex;
    justify-content: space-around;
}

.outComeDetailRoot ul li button {
    flex: 1;
    background-color: red;
}


.outComeDetailRoot ul li div {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
}

.btnHead {
    width: 28vw;
    background-color: red;
    height: 6vw;
    margin: 2vw;
}

.hiddenStyle {
    display: none !important;
}
</style>
  