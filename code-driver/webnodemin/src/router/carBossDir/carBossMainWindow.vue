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
            <div @click="startLocationStatic">
                <div class="icon"></div>
                <div class="text">各搅拌站车次方量统计</div>
            </div>
        </div>
    </div>
</template>
  
<script>

export default {
    name: 'carBossMainWindow',
    methods: {
        //各搅拌站车次方量统计
        startLocationStatic() {
            this.$router.push({
                name: 'carCountStaticPage',
                query: {
                    where: {},
                    groupName: 'StartLocation'
                }
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
                name: 'fangliangEditor'
            })
        }
    },
    data() {
        return {
            UserInfo: {}
        }
    },
    mounted() {
        let user = JSON.parse(window.localStorage.getItem(this.$UserInfoKey));
        this.UserInfo = user
    }
}
</script>
  
<style scoped>

</style>
  