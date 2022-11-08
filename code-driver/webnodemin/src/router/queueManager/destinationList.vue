<template>
    <ul>
        <li v-for="group in list" class="group">
            <div>{{ group.groupName }}</div>
            <div class="groupContent">
                <div v-for="item in group.list">
                    <div>{{ item }}</div>
                </div>
            </div>
        </li>
    </ul>
</template>
  
<script>
export default {
    name: 'destinationList',
    methods: {

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
                            let map = new Map();
                            success.forEach(element => {
                                if (map.has(element.content1)) {
                                    let obj = map.get(element.content1)
                                    obj.list.push(element.content)
                                } else {
                                    let obj = {
                                        groupName: element.content1,
                                        list: []
                                    }
                                    obj.list.push(element.content)
                                    map.set(element.content1, obj)
                                }
                            });
                            this.list = [...map.values()]
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
            list: []
        }
    },
    mounted() {
        this.getDictList('end');
    }
}
</script>
  
<style scoped>
.group{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border-bottom: 1px solid black;
}
.groupContent{
    width: 100vw;
    display: flex;
    flex-wrap: wrap;
}
.groupContent>div{
    padding: 2vw;
    width: 28vw;
}
</style>
  