<template>
    <div class="classManagerRoot">
        <ul>
            <li>
                <div>类别</div>
                <div>姓名</div>
                <div>金额</div>
                <div>事项</div>
                <div>日期</div>
                <div>操作</div>
            </li>
            <li v-for="(item, i) in list">
                <div>{{ item.useType }}</div>
                <div>{{ item.Name }}</div>
                <div>{{ item.Money }}</div>
                <div>{{ item.Comment }}</div>
                <div>{{ item.Time }}</div>
                <div><button @click="deleteCurrent(item)">删除</button></div>
            </li>
            <li>
                <div class="pickerContainer">
                    <button @click="show">{{ useType }}</button>
                    <van-popup v-model:show="showPicker" round position="bottom">
                        <van-picker title="标题" :columns="columns" @cancel="onCancel" @confirm="onConfirm"
                            show-toolbar />
                    </van-popup>
                </div>
                <div><input type="text" v-model="name" /></div>
                <div><input type="text" v-model="money" /></div>
                <div><input type="text" v-model="comment" /></div>
                <div><button @click="add">添加</button></div>
            </li>
        </ul>
    </div>
</template>
  
<script>
export default {
    name: 'detailManager',
    data() {
        return {
            list: [],
            useType: '',
            name: '',
            money: '',
            comment: '',
            columns: [],
            showPicker: false
        }
    },
    methods: {
        show() {
            this.showPicker = !this.showPicker;
        },
        onCancel() {
            this.showPicker = false
        },
        onConfirm(value, index) {
            this.useType = value
            this.showPicker = false
        },
        add() {
            let t = this.$getCurrentTime()
            let dictInfo = {
                useType: this.useType,
                Name: this.name,
                Money: this.money,
                Comment: this.comment,
                Type: this.$route.query.detailType,
                Time: t.time,
                YY: t.yy,
                MM: t.mm,
                DD: t.dd
            }
            this.$http.post("/insertMoneyDetaiInfo", dictInfo).then(
                (scucess) => {
                    switch (scucess.data) {
                        case "handleSucess":
                            this.getList();
                            this.useType = ''
                            this.name = ''
                            this.money = ''
                            this.comment = ''
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
        getClassList() {
            //定义条件
            let where = {
            };
            //发送请求
            this.$http
                .get(`/moneyInfoQuerys?where=${JSON.stringify(where)}`)
                .then((info) => {
                    //服务器只要接到请求就会返回200成功
                    this.$handleRequest(info.data).then(
                        success => {
                            this.columns = [];
                            success.forEach(element => {
                                this.columns.push(element.content);
                            });
                        },
                        fail => {
                            this.columns = [];
                            console.log(fail)
                        }
                    )
                },
                    (fail) => { console.log(fail) })
                .catch((err) => {
                    console.log(`网络请求超时！${err}`);
                });
        },
        getList() {
            //定义条件
            let where = {
                Type: this.$route.query.detailType
            };
            //发送请求
            this.$http
                .get(`/moneyDetailInfoQuerys?where=${JSON.stringify(where)}`)
                .then((info) => {
                    //服务器只要接到请求就会返回200成功
                    this.$handleRequest(info.data).then(
                        success => {
                            console.log("获取车辆状态列表成功了！")
                            this.list = [];
                            success.forEach(element => {
                                let car = {
                                    useType: element.useType,
                                    Name: element.Name,
                                    Money: element.Money,
                                    Comment: element.Comment,
                                    Time: element.Time
                                }
                                this.list.push(car);
                            });
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
        },
        deleteCurrent(item) {

            let where = {
                Time: item.Time,
                Type: this.$route.query.detailType
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
        }
    },
    mounted() {
        this.getList();
        this.getClassList();
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
  