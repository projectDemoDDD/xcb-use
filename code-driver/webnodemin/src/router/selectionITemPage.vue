<template>
    <div class="selectionRoot">
        <div class="table">
            <div class="row">
                <div class="cell" v-for="(item, i) in lists">
                    <input type="radio" :id="i" v-model="selectedValue" :value="item.value" name="c" />
                    <label :for="i">{{ item.value }}</label>
                </div>
            </div>
            <div class="row">
                <div class="cell">
                    <div @click="btnOk">确定</div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
const PubSub = require('pubsub-js')
export default {
    name: 'selectionITemPage',
    data() {
        return {
            selectedValue: '',
            lists: []
        }
    },
    mounted() {
        let user = JSON.parse(window.localStorage.getItem(this.$UserInfoKey));
        //根据类型获取相映的列表
        let url = null;
        let where = {};
        switch (this.$route.query.type) {
            case 'carNumber':
                url = '/transStateQuerys';
                where.state = 'rest'
                break;
            case 'start':
                url = '/dicInfoQuerys';
                where.type = 'start'
                break;
            case 'end':
                url = '/dicInfoQuerys';
                where.type = 'end';
                where.content1 = this.$route.query.currentStartLocation;
                break;
            case 'type':
                url = '/dicInfoQuerys';
                where.type = 'type'
                break;
            case 'fangliang':
                url = '/dicInfoQuerys';
                where.type = 'fangliang'
                this.$store.commit('hideLoading')
                break;
                // for (let i = 1; i <= 21; i++) {
                //     let item = {}
                //     item.value = i.toString();
                //     this.lists.push(item)
                //     url = null
                // }
                this.$store.commit('hideLoading')
                break;
            case 'carCount':
                for (let i = 1; i <= 100; i++) {
                    let item = {}
                    item.value = i.toString();
                    this.lists.push(item)
                    url = null
                }
                this.$store.commit('hideLoading')
                break;
        }

        this.selectedValue = this.$route.query.currentValue;

        if (url === null || where === null) {
            return;
        }

        //alert(`${url}?where=${JSON.stringify(where)}`);
        //发送请求
        this.$http
            .get(`${url}?where=${JSON.stringify(where)}`)
            .then((info) => {
                console.log(info.data)
                //服务器只要接到请求就会返回200成功
                this.handleRequest(info.data);
            }, (fail) => {
                console.log(fail)
                this.$store.commit('hideLoading')
            })
            .catch((err) => {
                console.log(`网络请求超时！${err}`);
                this.$store.commit('hideLoading')
            });
    },
    methods: {
        btnOk() {
            switch (this.$route.query.type) {
                case 'carNumber':
                    PubSub.publish('selectedValue', {
                        type: 'carNumber',
                        value: this.selectedValue
                    });
                    break;
                case 'start':
                    PubSub.publish('selectedValue', {
                        type: 'start',
                        value: this.selectedValue
                    });
                    break;
                case 'end':
                    PubSub.publish('selectedValue', {
                        type: 'end',
                        value: this.selectedValue
                    });
                    break;
                case 'type':
                    PubSub.publish('selectedValue', {
                        type: 'type',
                        value: this.selectedValue
                    });
                    break;
                case 'fangliang':
                    PubSub.publish('selectedValue', {
                        type: 'fangliang',
                        value: this.selectedValue
                    });
                    break;
                case 'carCount':
                    PubSub.publish('selectedValue', {
                        type: 'carCount',
                        value: this.selectedValue
                    });
                    break;
            }
            this.selectedValue = ''
            this.$router.back();
        },
        handleRequest(data) {
            switch (data) {
                case "where-undefined":
                    //where条件为undefined
                    console.log("where-undefined  where条件为undefined");
                    break;
                case "data-null":
                    window.alert('没有获取到数据')
                    //根据where条件没有查找到用户数据
                    console.log("data-null 根据where条件没有查找到用户数据");
                    break;
                case "dataBase-error":
                    //服务器数据库操作报错
                    console.log("dataBase-error 服务器数据库操作报错");
                    break;
                case "server-undefinedError":
                    //服务器未知错误
                    console.log("server-undefinedError 服务器未知错误");
                    break;
                default:
                    //获取到了数据
                    this.lists = [];
                    switch (this.$route.query.type) {
                        case 'fangliang':
                            data.forEach(element => {
                                let item = {}
                                item.value = element.content;
                                this.lists.push(item)
                            });
                            break;
                        case 'carNumber':
                            data.forEach(element => {
                                let item = {}
                                item.value = element.CarNumber;
                                this.lists.push(item)
                            });
                            break;
                        case 'start':
                            data.forEach(element => {
                                let item = {}
                                item.value = element.content;
                                this.lists.push(item)
                            });
                            break;
                        case 'end':
                            data.forEach(element => {
                                let item = {}
                                item.value = element.content;
                                this.lists.push(item)
                            });
                            break;
                        case 'type':
                            data.forEach(element => {
                                let item = {}
                                item.value = element.content;
                                this.lists.push(item)
                            });
                            break;

                    }
                    break;
            }
            this.$store.commit('hideLoading')
        }
    }
}
</script>
  
<style scoped>
.selectionRoot .table {
    height: 100vh;
    align-items: center;
    font-size: 5vw;
}

.selectionRoot .table .row {
    flex-wrap: wrap;
}

.selectionRoot .table .row .cell {
    margin-left: 2vw;
}
</style>
  