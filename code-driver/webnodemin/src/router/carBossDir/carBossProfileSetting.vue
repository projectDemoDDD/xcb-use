<template>
    <div class="profileSettingRoot">
        <div class="table">
            <div class="row">
                <div class="cell">
                    <div>用户名:</div>
                </div>
                <div class="cell">
                    <input />
                </div>
            </div>
            <div class="row">
                <div class="cell">
                    <div>密码:</div>
                </div>
                <div class="cell">
                    <input />
                </div>
            </div>
            <div class="row">
                <div class="cell">
                    <div>真实姓名:</div>
                </div>
                <div class="cell">
                    <input />
                </div>
            </div>
            <div class="row">
                <div class="cell">
                    <div>身份证号:</div>
                </div>
                <div class="cell">
                    <input />
                </div>
            </div>
            <div class="row">
                <div class="cell">
                    <button @click="updateProfile">修改</button>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>

export default {
    name: 'carBossProfileSetting',
    methods: {
        selectedQueue(){

        },
        updateProfile() {
            this.$router.back()
        },
        selecteCarNumber() {

        }
    }
}
</script>
  
<style>

</style>
  