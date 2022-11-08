<template>
    <div class="driverCarQueueManagerRoot">
        <van-button class="btn" plain type="primary">加入车队</van-button>
        <van-button class="btn" plain type="primary" @click="createQueue">创建车队</van-button>
    </div>
</template>
    
<script>

export default {
    name: "driverCarQueueManager",
    methods: {
        createQueue() {
            this.$router.push({
                name: 'createQueue'
            })
        },
    },
    created() {
    },
    mounted() {
        let user = JSON.parse(window.localStorage.getItem(this.$UserInfoKey));
    },
    data() {
        return {
        };
    },
};
</script>
    
<style scoped>
.driverCarQueueManagerRoot {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.driverCarQueueManagerRoot .btn {
    margin: 5vw;
    width: 60vw;
}
</style>
    