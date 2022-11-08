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
            <div>{{ this.UserInfo.RealName }}</div>
            <div>用户名:{{ this.UserInfo.UserName }}</div>
            <div>行使车辆:{{ this.UserInfo.CarNumber }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="bodyContainer">
      <div @click="profileSetting">
        <div class="icon"></div>
        <div class="text">个人设置</div>
      </div>
      <!-- <div @click="driverCarQueueManager">
        <div class="icon"></div>
        <div class="text">车队管理</div>
      </div> -->
      <div @click="carCountFangliangStatic">
        <div class="icon"></div>
        <div class="text">车次方量统计</div>
      </div>
      <div @click="navWorkPage">
        <div class="icon"></div>
        <div class="text">工作台</div>
      </div>
    </div>
  </div>
</template>
  
<script>
import pubsub from "pubsub-js";

export default {
  name: "driverMainWindow",
  methods: {
    //车队管理
    driverCarQueueManager(){
      let user = JSON.parse(window.localStorage.getItem(this.$UserInfoKey));
      if(user.carQueueName)
      this.$router.push({ name: "driverCarQueueManager" });
    },
    //退出登录
    imageClick() {
      this.$router.replace({ name: "login" });
    },
    driverQueueSetting() {
      //console.log(`isBelongQueue${this.isBelongQueue}`)
      this.isBelongQueue = !this.isBelongQueue;
      if (this.isBelongQueue) {
        this.$router.push({ name: "driverQueueView" });
      } else {
        this.$router.push({ name: "driverQueueAplly" });
      }
    },
    navWorkPage() {
      this.$router.push({ name: "workerPage" });
    },
    profileSetting() {
      this.$router.push({ name: "driverProfileSetting" });
    },
    carCountFangliangStatic() {
      this.$router.push({
        name: "carCountFanliangStatic",
        query: {
          role: 'sj'
        }
      });
    },
  },
  created() {
    pubsub.subscribe("queue", (name, value) => {
      //console.log(1);
      this.isBelongQueue = value;
      //console.log(this.isBelongQueue)
    });
  },
  mounted() {
    let user = JSON.parse(window.localStorage.getItem(this.$UserInfoKey));
    this.UserInfo.UserName = user.UserName;
    this.UserInfo.Password = user.Password;
    this.UserInfo.CarNumber = user.CarNumber;
    this.UserInfo.RealName = user.RealName;
    this.UserInfo.IDNumber = user.IDNumber;
    
  },
  data() {
    return {
      isBelongQueue: false,
      UserInfo: {
        UserName: "",
        Password: "",
        CarNumber: "",
        RealName: "",
        IDNumber: "",
      },
    };
  },
};
</script>
  
<style>

</style>
  