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
                        <div>管理员</div>
                        <div>用户名:admin</div>
                    </div>
                </div>

            </div>

        </div>
        <div class="bodyContainer">
            <div @click="editor('car')">
                <div class="icon"></div>
                <div class="text">车辆编辑</div>
            </div>
            <div @click="editor('start')">
                <div class="icon"></div>
                <div class="text">始发地编辑</div>
            </div>
            <div @click="editor('end')">
                <div class="icon"></div>
                <div class="text">目的地编辑</div>
            </div>
            <div @click="editor('type')">
                <div class="icon"></div>
                <div class="text">规格编辑</div>
            </div>
        </div>
    </div>
</template>
  
<script>

export default {
    name: 'adminMainWindow',
    methods: {
        imageClick() {
            this.$router.replace({
                name: 'login'
            })
        },
        editor(name) {
            let url = 'itemEditor';
            switch (name) {
                case "car":
                    this.$router.push({
                        name: url,
                        query: {
                            type: 'car'
                        }
                    })
                    break;
                case "start":
                    this.$router.push({
                        name: url,
                        query: {
                            type: 'start'
                        }
                    })
                    break;
                case "end":
                    this.$router.push({
                        name: url,
                        query: {
                            type: 'end'
                        }
                    })
                    break;
                case "type":
                    this.$router.push({
                        name: url,
                        query: {
                            type: 'type'
                        }
                    })
                    break;
            }
        }
    },
    data() {
        return {
        }
    }
}
</script>
  
<style scoped>

</style>
  