<template>
    <div class="itemEditorRoot">
        <ul>
            <li>
                <div>内容</div>
                <div>内容1</div>
                <div>操作</div>
            </li>
            <li v-for="(item, i) in list">
                <div>{{ item.content }}</div>
                <div>{{ item.content1 }}</div>
                <div><button @click="deleteCurrent(item.content)">删除</button></div>
            </li>
        </ul>
        <ul>
            <li>
                <div><input type="text" v-model="currentEditorItem" /></div>
                <div><input type="text" v-model="currentEditorItemOther" /></div>
                <div><button @click="add">添加</button></div>
            </li>
        </ul>
        <!-- <button class="add">添加</button> -->
        <DialogView ref="myDialog"></DialogView>
    </div>
</template>
  
<script>
import DialogView from "../../components/dialogView";
export default {
    name: 'itemEditor',
    components: { DialogView },
    methods: {
        deleteCurrent(content) {
            switch (this.$route.query.type) {
                case "car":
                    this.deleteCar(content);
                    break;
                case "start":
                    this.deleteDict(content, 'start');
                    break;
                case "end":
                    this.deleteDict(content, 'end');
                    break;
                case "type":
                    this.deleteDict(content, 'type');
                    break;
            }
        },
        add() {
            switch (this.$route.query.type) {
                case "car":
                    this.addCar();
                    break;
                case "start":
                    this.addDict('start')
                    break;
                case "end":
                    this.addDict('end')
                    break;
                case "type":
                    this.addDict('type')
                    break;
            }
        },
        deleteDict(content, type) {
            let where = {
                content: content,
                type: type
            }

            this.$http.get(`/dicInfoDelete?where=${JSON.stringify(where)}`).then(
                (scucess) => {
                    switch (scucess.data) {
                        case "where-undefined":
                            console.log("where-undefined");
                            break;
                        case "success":
                            this.$refs.myDialog.show("删除成功！", {
                                type: 'alert',
                                confirmText: '确定',
                                cancelText: '取消',
                                titleText: '',
                                data: null
                            })
                            this.getDictList(type);
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
        deleteCar(content) {
            let where = {
                CarNumber: content
            }

            this.$http.get(`/transStateDelete?where=${JSON.stringify(where)}`).then(
                (scucess) => {
                    switch (scucess.data) {
                        case "where-undefined":
                            console.log("where-undefined");
                            break;
                        case "success":
                            this.$refs.myDialog.show("删除成功！", {
                                type: 'alert',
                                confirmText: '确定',
                                cancelText: '取消',
                                titleText: '',
                                data: null
                            })
                            this.getCarList();
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
        addCar() {
            let carInfo = {
                CarNumber: this.currentEditorItem,
                MaxFangliang: this.currentEditorItemOther,
                state:'rest',
                comment:'休息'
            }
            this.$http.post("/insertTransStateInfo", carInfo).then(
                (scucess) => {
                    switch (scucess.data) {
                        case "handleSucess":
                            this.$refs.myDialog.show("添加成功！", {
                                type: 'alert',
                                confirmText: '确定',
                                cancelText: '取消',
                                titleText: '',
                                data: null
                            })
                            this.getCarList();
                            this.currentEditorItem = '';
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
        addDict(type) {
            let dictInfo = {
                content: this.currentEditorItem,
                content1:this.currentEditorItemOther,
                type: type
            }
            this.$http.post("/insertDictInfo", dictInfo).then(
                (scucess) => {
                    switch (scucess.data) {
                        case "handleSucess":
                            this.$refs.myDialog.show("添加成功！", {
                                type: 'alert',
                                confirmText: '确定',
                                cancelText: '取消',
                                titleText: '',
                                data: null
                            })
                            this.getDictList(type);
                            this.currentEditorItem = '';
                            this.currentEditorItemOther = '';
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
        getCarList(type) {
            //定义条件
            let where = {
                type: type
            };
            //发送请求
            this.$http
                .get(`/transStateQuerys?where=${JSON.stringify(where)}`)
                .then((info) => {
                    //服务器只要接到请求就会返回200成功
                    this.$handleRequest(info.data).then(
                        success => {
                            console.log("获取车辆状态列表成功了！")
                            this.list = [];
                            success.forEach(element => {
                                let car = {
                                    content: element.CarNumber,
                                    content1:element.MaxFangliang
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
        getDictList(type) {
            //定义条件
            let where = {
                type: type
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
                            success.forEach(element => {
                                let car = {
                                    content: element.content,
                                    content1:element.content1
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
        }
    },
    data() {
        return {
            currentEditorItem: '',
            currentEditorItemOther: '',
            list: []
        }
    },
    mounted() {
        switch (this.$route.query.type) {
            case "car":
                this.getCarList();
                break;
            case "start":
                this.getDictList('start');
                break;
            case "end":
                this.getDictList('end');
                break;
            case "type":
                this.getDictList('type');
                break;
        }
    }
}
</script>
  
<style scoped>
.itemEditorRoot {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
}

.itemEditorRoot input{
    width: 30vw;
}

.itemEditorRoot button {
    color: white;
}

.itemEditorRoot ul {
    width: 100vw;
}

.itemEditorRoot ul li {
    margin-top: 2vw;
    width: 100vw;
    display: flex;
    justify-content: space-around;
}

.itemEditorRoot ul li .div {
    flex: 1;;
}

.itemEditorRoot ul li div button {
    width: 10vw;
    background-color: red;
}

.itemEditorRoot .add {
    margin-top: 5vw;
    width: 100vw;
    height: 10vw;
    background-color: red;
}
</style>
  