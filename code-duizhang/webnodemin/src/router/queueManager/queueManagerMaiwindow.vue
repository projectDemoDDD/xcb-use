<template>
    <div class="mainWindowRoot">
        <div class="navContainer">
            <span>首页</span>
        </div>
        <div class="headerContainer">
            <div class="table">

                <div class="headerImageRow">
                    <div class="headerImage" @click="imageClick"></div>
                    <div class="headerInfomation">
                        <div>{{ UserInfo.RealName }}</div>
                        <div>用户名:{{ UserInfo.UserName }}</div>
                    </div>
                </div>

            </div>

        </div>
        <div class="bodyContainer">
            <div @click="carStateView">
                <div class="icon"></div>
                <div class="text">车辆状态统计</div>
            </div>
            <div @click="carCountFangliangStatic">
                <div class="icon"></div>
                <div class="text">车次方量统计</div>
            </div>
            <div @click="dataEditor">
                <div class="icon"></div>
                <div class="text">数据维护</div>
            </div>
            <!-- <div @click="endLocationList">
                <div class="icon"></div>
                <div class="text">目的地列表</div>
            </div>
            <div @click="endLocationListEditor">
                <div class="icon"></div>
                <div class="text">目的地列表维护</div>
            </div>
            <div @click="fangLiangListEditor">
                <div class="icon"></div>
                <div class="text">方量列表维护</div>
            </div> -->
        </div>
    </div>
</template>
  
<script>

export default {
    name: 'queueManagerMaiwindow',
    methods: {
        //数据维护
        dataEditor(){
            let url = 'dataEditor';
            this.$router.push({
                name: url
            })
        },
        fangLiangListEditor() {
            let url = 'fangLiangEditor';
            this.$router.push({
                name: url
            })
        },
        endLocationListEditor() {
            let url = 'destinationEditor';
            this.$router.push({
                name: url
            })
        },
        endLocationList() {
            let url = 'destinationList';
            this.$router.push({
                name: url
            })
        },
        imageClick() {
            this.$router.replace({
                name: 'login'
            })
        },
        //车辆状态统计
        carStateView() {
            this.$router.push({ name: 'carBossCarStateStatic' })
        },
        //车次方量统计
        carCountFangliangStatic() {
            this.$router.push({
                name: 'carCountFanliangStatic'
            })
        },
        handleRequest(data) {
            switch (data) {
                case "where-undefined":
                    //where条件为undefined
                    console.log("where-undefined  where条件为undefined");
                    break;
                case "data-null":
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
                    window.localStorage.setItem(
                        this.$UserInfoKey,
                        JSON.stringify(data)
                    );
                    this.UserInfo = data
                    break;
            }
        },
        getUserInfo(userName) {
            //定义条件
            let where = {
                UserName: userName
            };
            //发送请求
            this.$http
                .get(`/userInfo?where=${JSON.stringify(where)}`)
                .then((info) => {
                    //服务器只要接到请求就会返回200成功
                    this.handleRequest(info.data);
                },
                    (fail) => {
                        console.log(fail)
                    })
                .catch((err) => {
                    console.log(`网络请求超时！${err}`);
                });
        }
    },
    data() {
        return {
            UserInfo: {}
        }
    },
    mounted() {
        let url = window.location.href;
        let str = url.split("=");
        if (str.length > 1) {
            //传参跳转过来的
            let userName = str[1].split("/")[0]
            this.getUserInfo(userName);
        } else {
            let user = JSON.parse(window.localStorage.getItem(this.$UserInfoKey));
            this.UserInfo = user
        }
    }
}
</script>
  
<style scoped>

</style>
  