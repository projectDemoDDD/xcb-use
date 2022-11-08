<template>
  <div class="logInRoot">
    <div class="title">
      <img src="../imgs/loginTitle.jpg" />
    </div>
    <div class="tableContainer">
      <div class="table">
        <div class="row">
          <div class="cell">
            <span>用户名:</span>
          </div>
          <div class="cell">
            <input v-model="userName" />
          </div>
        </div>
        <div class="row">
          <div class="cell">
            <span>密&#160;&#160;&#160;码:</span>
          </div>
          <div class="cell">
            <input v-model="password" />
          </div>
        </div>
        <div class="row">
          <div class="cellSpatial">
            <button @click="login">登录</button>
          </div>
          <div class="cellSpatial">
            <button @click="register">注册</button>
          </div>
        </div>
      </div>
    </div>
    <DialogView ref="myDialog"></DialogView>
  </div>
</template>
  
<script>
import DialogView from "../components/dialogView";
const PubSub = require('pubsub-js')
export default {
  name: "logIn",
  data() {
    return {
      userName: "",
      password: "",
    };
  },
  components: { DialogView },
  methods: {
    register() {
      this.$router.push({ name: "register" });
    },
    getUserInfoQuery(data) {
      let str = `?query=${data.UserName}`;
      return str;
    },
    handleRequest(data) {
      switch (data) {
        case "where-undefined":
          //where条件为undefined
          console.log("where-undefined  where条件为undefined");
          break;
        case "data-null":
          this.$refs.myDialog.show("用户名或密码不正确！", {
            type: 'alert',
            confirmText: '确定',
            cancelText: '取消',
            titleText: '',
            data: null
          })
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

          //alert(window.localStorage.getItem(this.$UserInfoKey))

          if (data.role === 'dz') {
            //队长
            // let ss = this.$StaticUrl + this.getUserInfoQuery(data) + "/#/queueManagerMaiwindow";
            // window.location.href = ss
            // window.location.href = this.$StaticUrl + "queueManagerMaiwindow/#/" + this.getUserInfoQuery(data);
            this.$router.replace({ name: "queueManagerMaiwindow" });
          } else if (data.role === 'boss') {
            //车老板
            //let ss = this.$StaticUrl + this.getUserInfoQuery(data) + "/#/carBossMainWindow";
            //window.location.href = ss
            this.$router.replace({ name: "carBossMainWindow" });
          } else {
            //司机
            this.$router.replace({ name: "driverMainWindow" });
          }
          break;
      }
    },
    validateNull() {


      if (this.userName.trim() === '') {
        this.$refs.myDialog.show("用户名不能未空！", {
          type: 'alert',
          confirmText: '确定',
          cancelText: '取消',
          titleText: '',
          data: null
        })
        return false;
      }

      if (this.password.trim() === '') {
        this.$refs.myDialog.show("密码不能未空！", {
          type: 'alert',
          confirmText: '确定',
          cancelText: '取消',
          titleText: '',
          data: null
        })
        return false;
      }

      this.userName = this.userName.trim();
      this.password = this.password.trim();

      return true;

    },
    getUserInfo() {
      //定义条件
      let where = {
        UserName: this.userName,
        Password: this.password,
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
    },
    login() {
      //this.$store.commit('showLoading')

      if (!this.validateNull()) {
        return;
      }

      if (this.userName === "duizhang" && this.password === "123") {
        this.$router.replace({ name: "carBossMainWindow" });
      } else if (this.userName === "jianhua" && this.password === "123") {
        this.$router.replace({ name: "dispatcherWorkPage" });
      } else if (this.userName === "admin" && this.password === "123") {
        this.$router.replace({ name: "adminMainWindow" });
      } else if (this.userName === "guoyan" && this.password === "123") {

        this.$router.replace({
          name: "moneyManagerMainwindow"
        })

      } else {
        this.getUserInfo();
      }
    }
  },
  mounted() {
    //window.location.href="http://39.108.73.140:5000/#/"
    let user = JSON.parse(window.localStorage.getItem(this.$UserInfoKey));
    PubSub.subscribe('register', (msg, data) => {
      this.$refs.myDialog.show("注册成功！", {
        type: 'alert',
        confirmText: '确定',
        cancelText: '取消',
        titleText: '',
        data: null
      })
      this.userName = data.UserName;
      this.password = data.Password;
    })
    if (user != null && user != undefined) {
      this.userName = user.UserName;
      this.password = user.Password;
    }
  }
};
</script>
  
<style>
.logInRoot {
  height: 100vh;
  font-weight: 700;
  font-size: 4vw;
}

.logInRoot img {
  width: 43vw;
}

.logInRoot .title {
  height: 30vh;
  display: flex;
  justify-content: center;
  align-items: flex-end;
}

.logInRoot .tableContainer {
  width: 100%;
  height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.tableContainer .cell:first-child {
  width: 16vw;
}

.tableContainer .table .row:last-child {
  justify-content: space-around;
}

.tableContainer .table .row:last-child .cellSpatial {
  flex: 1;
}

.tableContainer .table .row:last-child .cellSpatial button {
  width: 30vw;
  height: 8vw;
  margin: 0vw 3vw;
  background-color: red;
  color: white;
}



.logInRoot .cell input {
  width: 50vw;
}



#container {
  width: 100vw;
  height: 100%;
  background-color: orange;
}
</style>
  