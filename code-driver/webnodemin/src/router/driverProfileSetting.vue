<template>
  <div class="profileSettingRoot">
    <div class="table">
      <div class="row">
        <div class="cell">
          <div>用户名:</div>
        </div>
        <div class="cell">
          <input v-model="UserInfo.UserName" disabled='true' />
        </div>
        <div class="cell">
          <button>选择</button>
        </div>
      </div>
      <div class="row">
        <div class="cell">
          <div>密码:</div>
        </div>
        <div class="cell">
          <input v-model="UserInfo.Password" />
        </div>
        <div class="cell">
          <button>选择</button>
        </div>
      </div>
      <div class="row">
        <div class="cell">
          <div>车牌号:</div>
        </div>
        <div class="cell">
          <input v-model="UserInfo.CarNumber" />
        </div>
        <div class="cell">
          <button @click="selectCarNumber">选择</button>
        </div>
      </div>
      <div class="row">
        <div class="cell">
          <div>姓名:</div>
        </div>
        <div class="cell">
          <input v-model="UserInfo.RealName" />
        </div>
        <div class="cell">
          <button>选择</button>
        </div>
      </div>
      <div class="row">
        <div class="cell">
          <div>身份证号:</div>
        </div>
        <div class="cell">
          <input v-model="UserInfo.IDNumber" />
        </div>
        <div class="cell">
          <button>选择</button>
        </div>
      </div>
      <div class="row">
        <div class="cell">
          <button @click="updateProfile" class="modifyBtn">修改</button>
        </div>
      </div>
    </div>
    <DialogView ref="myDialog"></DialogView>
  </div>
</template>
  
<script>
import DialogView from "../components/dialogView";
export default {
  name: "driverProfileSetting",
  components: { DialogView },
  methods: {
    selectedQueue() { },
    updateProfile() {
      let body = {
        where: {
          UserName: this.UserInfo.UserName
        },
        userInfo: {
          $set: {
            ...this.UserInfo,
          }
        }
      };
      this.$http.post("/updateUserInfo", body).then(
        (scucess) => {
          switch (scucess.data) {
            case "where-undefined":
              console.log("服务器端报错！");
              break;
            case "userInfo-undefined":
              console.log("服务器端报错！");
              break;
            case "handleSucess":
              // this.$refs.myDialog.show("修改成功！", {
              //   type: 'alert',
              //   confirmText: '确定',
              //   cancelText: '取消',
              //   titleText: '',
              //   data: null
              // })
              this.$router.back();
              break;
            case "server-error":
              console.log("服务器端报错！");
              break;
          }
        },
        (fail) => {
          console.log("网络请求超时！");
        }
      );
    },
    //选择车牌号
    selectCarNumber() {
      this.$router.push({
        name: 'selectionITemPage',
        query: {
          type: 'carNumber',
          currentValue: this.UserInfo.CarNumber
        }
      })
    },
    //处理选择的回调值
    handleSelectedValue(msg, data) {
      switch (data.type) {
        case 'carNumber':
          this.UserInfo.CarNumber = data.value;
          break;
      }
    },
  },
  mounted() {
    let user = JSON.parse(window.localStorage.getItem(this.$UserInfoKey));
    this.UserInfo.UserName = user.UserName;
    this.UserInfo.Password = user.Password;
    this.UserInfo.CarNumber = user.CarNumber;
    this.UserInfo.RealName = user.RealName;
    this.UserInfo.IDNumber = user.IDNumber;
  },
  created() {
    PubSub.subscribe('selectedValue', this.handleSelectedValue)
  },
  data() {
    return {
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
  
<style scoped>
.profileSettingRoot .table button {
  visibility: hidden;
}

.profileSettingRoot .table .row:last-child button {
  visibility: visible;
}

.modifyBtn{
  background-color: red;
  color: white;
}

/* .profileSettingRoot .table .row:nth-child(3) button {
  visibility: visible;
} */
</style>
  