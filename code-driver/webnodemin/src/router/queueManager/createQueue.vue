<template>
    <div class="createQueueRoot">
        <van-field v-model="carQueueName" label="车队名称" placeholder="请输入车队名称" />
        <van-row>
            <van-col span="8"><button class="btnHead" @click="addItem()">添加车辆</button></van-col>
            <van-col span="8"><button class="btnHead" @click="submit">提交</button></van-col>
        </van-row>
        <ul>
            <li>
                <div>车牌号</div>
                <div>最大方量</div>
                <div>操作</div>
            </li>
            <li v-for="(item, i) in list">
                <div>{{ item.carNumber }}</div>
                <div>{{ item.maxFangliang }}</div>
                <div>
                    <div><button @click="deleteItem(item)">删除</button></div>
                </div>
            </li>
        </ul>
        <van-popup class="popup" v-model:show="inputBoxShow" position="bottom" :style="{ height: '40%' }">
            <van-field v-model="currentItem.carNumber" label="车牌号" placeholder="请输入车牌号" />
            <van-field v-model="currentItem.maxFangliang" label="最大方量" placeholder="请输入最大方量" />
            <div class="btnContainer">
                <button class="btn" @click="btnOk">确定</button>
                <button class="btn" @click="btnCancel">取消</button>
            </div>
        </van-popup>
    </div>
</template>
  
<script>
export default {
    name: 'createQueue',
    data() {
        return {
            carQueueName: '',
            list: [],
            inputBoxShow: false,
            currentItem: {
                carNumber: '',
                maxFangliang: '',
                isAdd: true
            }
        }
    },
    methods: {
        submit() {
            //修改用户信息
            this.updateUserInfo();
            //创建车队
            this.createQueue();
        },
        //修改用户信息
        updateUserInfo() {
            let user = JSON.parse(window.localStorage.getItem(this.$UserInfoKey));

            user.carQueueName = this.carQueueName

            window.localStorage.setItem(this.$UserInfoKey, JSON.stringify(user));

            let userInfo = {
                collectionName: 'userInfo',
                where: {
                    UserName: user.UserName
                },
                content: {
                    $set: {
                        carQueueName: this.carQueueName
                    }
                }
            };


            this.$http.post("/updateInfo", userInfo).then((scucess) => {

                this.$handleRequest(scucess.data).then(
                    suc => {
                        console.log(suc)
                    },
                    fai => {
                        console.log(fai)
                    }
                )
            }, (fail) => {
            }
            );
        },
        //创建车队
        createQueue() {
            let doc = {
                collectionName: 'queues',
                content: {
                    carQueueName: this.carQueueName
                }
            }

            this.$http.post("/insertInfo", doc).then(
                (scucess) => {
                    switch (scucess.data) {
                        case "handleSucess":
                            alert('车队创建成功！')
                            this.$router.replace({
                                name: 'driverMainWindow'
                            }
                            )
                            break;
                        case "server-undefinedError":
                            console.log("服务器端报错！");
                            break;
                    }
                },
                (fail) => {
                    console.log("网络请求超时！");
                }
            );
        },
        clearItem() {
            this.currentItem.carNumber = ''
            this.currentItem.maxFangliang = ''
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
            }
        },
        addItem() {
            this.inputBoxShow = true;
            this.currentItem.carNumber = ''
            this.currentItem.maxFangliang = ''
            this.currentItem.isAdd = true;
        },
        deleteItem(item) {
            this.list = this.list.filter(itemCurrent => {
                if (item.recordTime != itemCurrent.recordTime)
                    return itemCurrent
            })
        },
        add() {
            let dictInfo = {
                carNumber: this.currentItem.carNumber,
                maxFangliang: this.currentItem.maxFangliang,
                recordTime: this.currentItem.recordTime
            }
            this.list.push(dictInfo);
        },
        getList() {
            let user = JSON.parse(window.localStorage.getItem(this.$UserInfoKey));
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

.createQueueRoot {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
}

.createQueueRoot ul {
    width: 100vw;
}

.createQueueRoot ul li {
    margin-top: 2vw;
    display: flex;
    justify-content: space-around;
}

.createQueueRoot ul li button {
    flex: 1;
    background-color: red;
}


.createQueue ul li div {
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

.popup {
    display: flex;
    flex-direction: column;
    justify-content: center;
}
</style>
  