<template>
    <div class="destinationEditorRoot">
        <div><button class="btnHead" @click="addItem(item)">添加</button></div>
        <ul>
            <li>
                <div>规格名称</div>
                <div>操作</div>
            </li>
            <li v-for="itemName in list">
                <div>{{ itemName.content }}</div>
                <div>
                    <div><button @click="deleteItem(itemName)">删除</button></div>
                </div>
            </li>
        </ul>
        <van-popup v-model:show="inputBoxShow" position="bottom" :style="{ height: '40%' }">
            <van-field v-model="currentItem.content" label="规格名称" placeholder="请输入要添加的规格名称" />
            <div class="btnContainer">
                <button class="btn" @click="btnOk">确定</button>
                <button class="btn" @click="btnCancel">取消</button>
            </div>
        </van-popup>
    </div>
</template>
  
<script>
export default {
    name: 'hntTypeEditor',
    data() {
        return {
            list: [],
            inputBoxShow: false,
            currentItem: {
                content: '',
                content1: '',
                isAdd: true
            }
        }
    },
    methods: {
        clearItem() {
            this.currentItem.content = ''
            this.currentItem.content1 = ''
            this.currentItem.isAdd = true;
        },
        btnCancel() {
            this.clearItem();
            this.inputBoxShow = false;
        },
        btnOk() {
            if (this.currentItem.isAdd) {
                //添加
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
            this.currentItem.content = ''
            this.currentItem.content1 = ''
            this.currentItem.type = 'type'
            this.currentItem.isAdd = true;
        },
        deleteItem(item) {

            let where = {
                content: item.content,
                type: "type"
            }

            this.$http.get(`/dicInfoDelete?where=${JSON.stringify(where)}`).then(
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
        add() {
            let dictInfo = this.currentItem;

            this.$http.post("/insertDictInfo", dictInfo).then(
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
                type: 'type'
            };
            //发送请求
            this.$http
                .get(`/dicInfoQuerys?where=${JSON.stringify(where)}`)
                .then((info) => {
                    //服务器只要接到请求就会返回200成功
                    this.$handleRequest(info.data).then(
                        success => {
                            console.log("获取车辆状态列表成功了！")
                            this.list = [];
                            this.list = success
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

.destinationEditorRoot {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    font-size: 3.5vw;
}

.destinationEditorRoot ul {
    width: 100vw;
}

.destinationEditorRoot ul li {
    margin-top: 2vw;
    display: flex;
    justify-content: space-around;
}

.destinationEditorRoot ul li button {
    flex: 1;
    background-color: red;
}


.destinationEditorRoot ul li div {
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
  