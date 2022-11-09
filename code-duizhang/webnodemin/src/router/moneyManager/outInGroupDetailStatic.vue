<template>
    <div class="classManagerRoot">
        <ul>
            <li v-for="(item, i) in list" class="row">
                <div>{{ item.projectName }}</div>
                <ul>
                    <li>
                        <div>类别</div>
                        <div>数量</div>
                        <div>金额</div>
                    </li>
                    <li v-for="next in item.items" @click="detailEnd(item, next)">
                        <div>{{ next.projectName }}</div>
                        <div>{{ next.count }}</div>
                        <div>{{ next.sum }}</div>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>
  
<script>
export default {
    name: 'outInGroupDetailStatic',
    data() {
        return {
            list: []
        }
    },
    methods: {
        detailEnd(item, next) {
            this.$router.push({
                name: 'detailView',
                query: {
                    type: item.type,
                    projectName: next.projectName
                }
            })
        },
        getList() {

            //定义条件
            let where = {
                MM: parseInt(this.$route.query.month)
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

                                if (map.has(element.type)) {

                                    let obj = map.get(element.type)

                                    //添加项目
                                    if (obj.itemsMap.has(element.content)) {

                                        let project = obj.itemsMap.get(element.content)
                                        project.sum = parseFloat(project.sum) + parseFloat(element.money)
                                        project.count = project.count + 1

                                    } else {

                                        let project = {
                                            projectName: element.content,
                                            sum: element.money,
                                            count: 1
                                        }
                                        obj.itemsMap.set(element.content, project);
                                    }

                                } else {

                                    //添加收入支出分组
                                    let obj = {
                                        type: element.type,
                                        itemsMap: new Map()
                                    }

                                    //添加项目
                                    if (obj.itemsMap.has(element.content)) {

                                        let project = obj.itemsMap.get(element.content)
                                        project.sum = parseFloat(project.sum) + parseFloat(element.money)
                                        project.count = project.count + 1

                                    } else {

                                        let project = {
                                            projectName: element.content,
                                            sum: element.money,
                                            count: 1
                                        }
                                        obj.itemsMap.set(element.content, project);
                                    }

                                    map.set(element.type, obj)

                                }

                            });


                            map.forEach(key => {
                                let projectName = ''
                                let type = key.type
                                if (key.type === 'in') projectName = '收入'
                                else projectName = '支出'

                                let sumMoney = 0;
                                let nextList = []
                                key.itemsMap.forEach(nextKey => {
                                    sumMoney = parseFloat(sumMoney) + parseFloat(nextKey.sum)
                                    nextList.push(nextKey)
                                })


                                nextList.sort((p1, p2) => {
                                    return p2.sum - p1.sum
                                })

                                nextList.push({
                                    projectName: '合计',
                                    sum: sumMoney
                                })

                                this.list.push({
                                    projectName: projectName,
                                    items: nextList,
                                    type: type
                                })
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
.row {
    display: flex;
    flex-direction: column;
}

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
  