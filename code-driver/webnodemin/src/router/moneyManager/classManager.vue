<template>
    <div class="classManagerRoot">
        <div><button class="btnHead" @click="addItem(item)">添加</button></div>
        <ul>
            <li>
                <div>类别</div>
                <div>所属</div>
                <div>操作</div>
            </li>
            <li v-for="(item, i) in list">
                <div>{{ item.className }}</div>
                <div>{{ item.belong }}</div>
                <div>
                    <div><button @click="deleteItem(item)">删除</button></div>
                    <div><button @click="modifyItem(item)">修改</button></div>
                </div>
            </li>
        </ul>
        <van-popup v-model:show="inputBoxShow" position="bottom" :style="{ height: '40%' }">
            <van-field v-model="currentItem.className" label="类别" placeholder="请输入类别" />
            <van-field v-model="currentItem.belong" label="所属" placeholder="请输入所属" />
            <div class="btnContainer">
                <button class="btn" @click="btnOk">确定</button>
                <button class="btn" @click="btnCancel">取消</button>
            </div>
        </van-popup>
    </div>
</template>
  
<script>
export default {
    name: 'classManager',
    data() {
        return {
            list: [],
            inputBoxShow: false,
            currentItem: {
                className: '',
                belong: '',
                recordTime: '',
                isAdd: true
            }
        }
    },
    methods: {
        clearItem() {
            this.currentItem.className = ''
            this.currentItem.belong = ''
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
                this.add();
                this.clearItem();
                this.inputBoxShow = false;
            } else {
                //修改
                this.inputBoxShow = false;
            }
        },
        addItem() {
            this.inputBoxShow = true;
            this.currentItem.className = ''
            this.currentItem.belong = ''
            this.currentItem.isAdd = true;
        },
        deleteItem(item) {

            let where = {
                recordTime: item.recordTime
            }

            this.$http.get(`/moneyInfoDelete?where=${JSON.stringify(where)}`).then(
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
            this.currentItem.className = item.className
            this.currentItem.belong = item.belong
            this.currentItem.recordTime = item.recordTime
            this.currentItem.isAdd = false;
        },
        add() {
            let dictInfo = this.currentItem;

            this.$http.post("/insertMoneyInfo", dictInfo).then(
                (scucess) => {
                    switch (scucess.data) {
                        case "handleSucess":
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
            };
            //发送请求
            this.$http
                .get(`/moneyInfoQuerys?where=${JSON.stringify(where)}`)
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

.classManagerRoot {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
}

.classManagerRoot ul {
    width: 100vw;
}

.classManagerRoot ul li {
    margin-top: 2vw;
    display: flex;
    justify-content: space-around;
}

.classManagerRoot ul li button {
    flex: 1;
    background-color: red;
}


.classManagerRoot ul li div {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
}

.btnHead{
    width: 28vw;
    background-color: red;
    height: 6vw;
    margin: 2vw;
}
</style>
  