<template>
    <div class="destinationEditorRoot">
        <div><button class="btnHead" @click="addItem(item)">添加</button></div>
        <ul>
            <li>
                <div>工地名称</div>
                <div>所属搅拌站</div>
                <div>公里数</div>
                <div>操作</div>
            </li>
            <li v-for="itemName in list">
                <div>{{ itemName.content }}</div>
                <div>{{ itemName.content1 }}</div>
                <div>{{ itemName.content2 }}</div>
                <div>
                    <div><button @click="deleteItem(itemName)">删除</button></div>
                    <div><button @click="modifyItem(itemName)">修改</button></div>
                </div>
            </li>
        </ul>
        <van-popup v-model:show="inputBoxShow" position="bottom" :style="{ height: '40%' }">
            <van-field v-model="currentItem.content" label="工地名称" placeholder="请输入工地名称" />
            <van-field v-model="currentItem.content1" label="所属搅拌站" placeholder="请输入所属搅拌站" />
            <van-field v-model="currentItem.content2" label="公里数" placeholder="请输入公里数" />
            <div class="btnContainer">
                <button class="btn" @click="btnOk">确定</button>
                <button class="btn" @click="btnCancel">取消</button>
            </div>
        </van-popup>
    </div>
</template>
  
<script>
export default {
    name: 'destinationEditor',
    data() {
        return {
            list: [],
            inputBoxShow: false,
            oragionSelectedItem: {},
            currentItem: {
                content: '',
                content1: '',
                content2: '',
                isAdd: true
            }
        }
    },
    methods: {
        clearItem() {
            this.currentItem.content = ''
            this.currentItem.content1 = ''
            this.currentItem.content2 = ''
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

                let stateInfo = {
                    collectionName: 'dicInfo',
                    where: {
                        content: this.oragionSelectedItem.content,
                        content1: this.oragionSelectedItem.content1,
                        content2: this.oragionSelectedItem.content2,
                        type: 'end'
                    },
                    content: {
                        $set: {
                            content: this.currentItem.content,
                            content1: this.currentItem.content1,
                            content2: this.currentItem.content2
                        }
                    }
                };

                this.$http.post("/updateInfo", stateInfo).then((scucess) => {
                    this.getList();
                }, (fail) => {
                    console.log(fail);
                });

            }
        },
        addItem() {
            this.inputBoxShow = true;
            this.currentItem.content = ''
            this.currentItem.content1 = ''
            this.currentItem.content2 = ''
            this.currentItem.minFangliang = '10'
            this.currentItem.type = 'end'
            this.currentItem.isAdd = true;
        },
        deleteItem(item) {

            let stateInfo = {
                collectionName: 'dicInfo',
                where: {
                    content: item.content,
                    content1: item.content1,
                    content2: item.content2,
                    type: 'end'
                },
                content: {
                    $set: {
                        delete: 'true'
                    }
                }
            };

            this.$http.post("/updateInfo", stateInfo).then((scucess) => {
                this.getList();
            }, (fail) => {
                console.log(fail);
            });



            // let where = {
            //     content: item.content,
            //     content1: item.content1,
            //     content2: item.content2
            // }

            // this.$http.get(`/dicInfoDelete?where=${JSON.stringify(where)}`).then(
            //     (scucess) => {
            //         switch (scucess.data) {
            //             case "where-undefined":
            //                 console.log("where-undefined");
            //                 break;
            //             case "success":
            //                 this.getList();
            //                 break;
            //             case "dataBase-error":
            //                 console.log("dataBase-error");
            //                 break;
            //             case "server-undefinedError":
            //                 console.log("server-undefinedError");
            //                 break;
            //         }
            //     },
            //     (fail) => {
            //         console.log("网络请求超时！");
            //     }
            // );
        },
        modifyItem(item) {
            this.oragionSelectedItem = item;
            this.inputBoxShow = true;
            this.currentItem.content = item.content
            this.currentItem.content1 = item.content1
            this.currentItem.content2 = item.content2
            this.currentItem.type = 'end'
            this.currentItem.isAdd = false;
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
                type: 'end'
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
                            let map = new Map();
                            success.forEach(element => {
                                if (element.delete != 'true') {
                                    if (map.has(element.content1)) {
                                        let obj = map.get(element.content1);
                                        obj.push({
                                            content: element.content,
                                            content1: element.content1,
                                            content2: element.content2
                                        })
                                    } else {
                                        let obj = [
                                            {
                                                content: element.content,
                                                content1: element.content1,
                                                content2: element.content2
                                            }
                                        ]
                                        map.set(element.content1, obj);
                                    }
                                }


                            });
                            map.forEach(key => {
                                let array = [...key];
                                array.forEach(item => {
                                    this.list.push(item);
                                })
                            })

                            //alert(JSON.stringify(this.list))
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
  