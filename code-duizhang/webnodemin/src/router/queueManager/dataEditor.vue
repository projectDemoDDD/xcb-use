<template>
    <div class="mainWindowRoot">
        <div class="bodyContainer">
            <!-- <div @click="endLocationList">
                <div class="icon"></div>
                <div class="text">目的地列表</div>
            </div> -->
            <div @click="startLocationListEditor">
                <div class="icon"></div>
                <div class="text">始发地列表维护</div>
            </div>
            <div @click="endLocationListEditor">
                <div class="icon"></div>
                <div class="text">目的地列表维护</div>
            </div>
            <div @click="hntTypeListEditor">
                <div class="icon"></div>
                <div class="text">混凝土规格列表维护</div>
            </div>
            <div @click="fangLiangListEditor">
                <div class="icon"></div>
                <div class="text">方量列表维护</div>
            </div>
        </div>
    </div>
</template>
  
<script>

export default {
    name: 'dataEditor',
    methods: {
        //始发地列表维护
        startLocationListEditor(){
            let url = 'startLocationEditor';
            this.$router.push({
                name: url
            })
        },
        //混凝土规格维护
        hntTypeListEditor() {
            let url = 'hntTypeEditor';
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
    },
    data() {
        return {
            UserInfo: {}
        }
    }
}
</script>
  
<style scoped>

</style>
  