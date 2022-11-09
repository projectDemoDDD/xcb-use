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
                        <div>财务管理</div>
                        <div>用户名:guoyan</div>
                    </div>
                </div>

            </div>

        </div>
        <div class="bodyContainer">
            <!-- <div>
                <div class="icon"></div>
                <div class="text" @click="classEditor">类别维护</div>
            </div> -->
            <div>
                <div class="icon"></div>
                <div class="text" @click="detailEdetorAdd">收入明细维护</div>
            </div>
            <div>
                <div class="icon"></div>
                <div class="text" @click="detailEdetorOutCome">支出明细维护</div>
            </div>
            <div>
                <div class="icon"></div>
                <div class="text" @click="moneyStatic">财务统计</div>
            </div>
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
            <div @click="dataEditor">
                <div class="icon"></div>
                <div class="text">数据维护</div>
            </div>
        </div>
    </div>
</template>
  
<script>

export default {
    name: 'moneyManagerMainwindow',
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
        //数据维护
        dataEditor() {
            let url = 'dataEditor';
            this.$router.push({
                name: url
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
        imageClick() {
            this.$router.replace({
                name: "login"
            })
        },
        classEditor() {
            this.$router.push({
                name: "classManager"
            })
        },
        //支出
        detailEdetorOutCome() {
            this.$router.push({
                name: "outComeDetail"
            })
        },
        detailEdetorAdd() {
            this.$router.push({
                name: "inComeDetaiManager"
            })
        },
        detailEdetor() {
            this.$router.push({
                name: "detailManager",
                query: {
                    detailType: 'decrease'
                }
            })
        },
        moneyStatic() {
            this.$router.push({
                name: "moneyStatic"
            })
        }
    },
    data() {
        return {
        }
    },
    mounted() {
    }
}
</script>
  
<style scoped>

</style>
  