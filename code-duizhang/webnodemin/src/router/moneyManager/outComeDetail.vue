<template>
    <div class="outComeDetailRoot">
        <div><button class="btnHead" @click="addItem(item)">添加</button></div>
        <ul>
            <li>
                <div>日期</div>
                <div>姓名</div>
                <div>车号</div>
                <div>类别</div>
                <div>事项</div>
                <div>出账</div>
                <div>操作</div>
            </li>
            <li v-for="(item, i) in list">
                <div>{{ item.recordTime }}</div>
                <div>{{ item.name }}</div>
                <div>{{ item.carNumber }}</div>
                <div>{{ item.content }}</div>
                <div>{{ item.project }}</div>
                <div>{{ item.money }}</div>
                <div>
                    <div><button @click="deleteItem(item)">删除</button></div>
                    <div><button @click="modifyItem(item)">修改</button></div>
                </div>
            </li>
        </ul>
        <van-popup v-model:show="inputBoxShow" position="bottom" :style="{ height: '50%' }">
            <van-field v-model="currentItem.content" label="内容" placeholder="请输入内容" />
            <van-field v-model="currentItem.carNumber" label="车号" placeholder="请输入车号" />
            <van-field v-model="currentItem.name" label="姓名" placeholder="请输入姓名" />
            <van-field v-model="currentItem.project" label="事项" placeholder="请输入事项" />
            <van-field v-model="currentItem.money" label="出账" placeholder="请输入入账金额" />
            <div class="btnContainer">
                <button class="btn" @click="btnOk">确定</button>
                <button class="btn" @click="btnCancel">取消</button>
            </div>
        </van-popup>
    </div>
</template>
  
<script>
export default {
    name: 'outComeDetail',
    data() {
        return {
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
        clearItem() {
            this.currentItem.name = ''
            this.currentItem.carNumber = ''
            this.currentItem.content = ''
            this.currentItem.project = ''
            this.currentItem.money = ''
            this.currentItem.recordTime = ''
            this.currentItem.isAdd = true;
        },
        btnCancel() {
            this.clearItem();
            this.inputBoxShow = false;
        },
        btnOk() {
            if (this.currentItem.isAdd) {
                //添加
                this.currentItem.recordTime = this.$getCurrentTime().time
                this.add()
                this.inputBoxShow = false;
            } else {
                //修改
                this.inputBoxShow = false;
                this.updateItem();
            }
        },
        addItem() {
            this.inputBoxShow = true;
            this.clearItem();
        },
        deleteItem(item) {

            let where = {
                recordTime: item.recordTime
            }

            this.$http.get(`/moneyDetailInfoDelete?where=${JSON.stringify(where)}`).then(
                (scucess) => {
                    switch (scucess.data) {
                        case "where-undefined":
                            console.log("where-undefined");
                            break;
                        case "success":
                            this.getList();
                            break;
                        case "dataBase-error":
                            console.log("dataBase-error");
                            break;
                        case "server-undefinedError":
                            console.log("server-undefinedError");
                            break;
                    }
                },
                (fail) => {
                    console.log("网络请求超时！");
                }
            );
        },
        modifyItem(item) {

            this.inputBoxShow = true;
            this.currentItem.name = item.name
            this.currentItem.carNumber = item.carNumber
            this.currentItem.content = item.content
            this.currentItem.project = item.project
            this.currentItem.money = item.money
            this.currentItem.recordTime = item.recordTime
            this.currentItem.type = item.type
            this.currentItem.YY = item.YY
            this.currentItem.MM = item.MM
            this.currentItem.MM = item.MM
            this.currentItem.isAdd = false;
        },
        updateItem() {
            let moneyDetailInfo = {
                where: {
                    recordTime: this.currentItem.recordTime
                },
                body: {
                    $set: {
                        name: this.currentItem.name,
                        carNumber: this.currentItem.carNumber,
                        content: this.currentItem.content,
                        project: this.currentItem.project,
                        money: this.currentItem.money
                    }
                }
            };

            this.$http.post("/moneyDetailInfoUpdate", moneyDetailInfo).then((scucess) => {

                this.$handleRequest(scucess.data).then(
                    suc => {
                        console.log(suc)
                        this.clearItem();
                        this.getList();
                    },
                    fai => {
                        console.log(fai)
                    }
                )
            }, (fail) => {
                console.log(fail)
            }
            );
        },
        add() {
            let t = this.$getCurrentTime();
            let dictInfo = this.currentItem;
            dictInfo.YY = t.yy;
            dictInfo.MM = t.mm;
            dictInfo.DD = t.dd;
            dictInfo.recordTime = t.time

            this.$http.post("/insertMoneyDetaiInfo", dictInfo).then(
                (scucess) => {
                    switch (scucess.data) {
                        case "handleSucess":
                            this.clearItem();
                            this.getList();
                            break;
                        case "server-undefinedError":
                            console.log("服务器端报错！");
                            break;
                    }
                },
                (fail) => {
                    console.log(fail);
                }
            );
        },
        getList() {
            //定义条件
            let where = {
                type: 'out'
            };
            //发送请求
            this.$http
                .get(`/moneyDetailInfoQuerys?where=${JSON.stringify(where)}`)
                .then((info) => {
                    //服务器只要接到请求就会返回200成功
                    this.$handleRequest(info.data).then(
                        success => {
                            console.log("获取车辆状态列表成功了！")
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
</style>
  