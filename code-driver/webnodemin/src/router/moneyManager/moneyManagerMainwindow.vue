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
        </div>
    </div>
</template>
  
<script>

export default {
    name: 'moneyManagerMainwindow',
    methods: {
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
  