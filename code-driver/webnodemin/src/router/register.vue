<template>
  <div class="registerRoot">
    <div class="table">
      <div class="row">
        <div class="cell">
          <div>用户名:</div>
        </div>
        <div class="cell">
          <input v-model="UserInfo.UserName" />
        </div>
      </div>
      <div class="row">
        <div class="cell">
          <div>密码:</div>
        </div>
        <div class="cell">
          <input v-model="UserInfo.Password" />
        </div>
      </div>
      <!-- <div class="row">
        <div class="cell">
          <div>姓名:</div>
        </div>
        <div class="cell">
          <input v-model="UserInfo.RealName" />
        </div>
      </div>
      <div class="row">
        <div class="cell">
          <div>身份证号:</div>
        </div>
        <div class="cell">
          <input v-model="UserInfo.IDNumber" />
        </div>
      </div> -->
      <div class="row">
        <div class="cell">
          <button @click="registerDriver">注册</button>
        </div>
      </div>
    </div>
    <DialogView ref="myDialog"></DialogView>
  </div>
</template>
  
<script>

const PubSub = require('pubsub-js')
import DialogView from "../components/dialogView";

export default {
  name: "workerPage",
  components: { DialogView },
  methods: {
    validateUserNameIsExist() {
      return new Promise((resolve, rejects) => {


        let where = {
          UserName: this.UserInfo.UserName.trim()
        };
        //发送请求
        this.$http
          .get(`/userInfo?where=${JSON.stringify(where)}`)
          .then((info) => {
            //服务器只要接到请求就会返回200成功
            this.$handleRequest(info.data).then(
              scucess => {
                resolve(scucess);
              },
              fail => {
                rejects();
              }
            )
          },
            (fail) => {
              rejects();
            })
          .catch((err) => {
            rejects();
          });


      })
    },
    validateNullFunction() {


      if (this.UserInfo.UserName.trim() === '') {
        this.$refs.myDialog.show("用户名不能未空！", {
          type: 'alert',
          confirmText: '确定',
          cancelText: '取消',
          titleText: '',
          data: null
        })
        return false;
      }

      if (this.UserInfo.Password.trim() === '') {
        this.$refs.myDialog.show("密码不能未空！", {
          type: 'alert',
          confirmText: '确定',
          cancelText: '取消',
          titleText: '',
          data: null
        })
        return false;
      }

      // if (this.UserInfo.RealName.trim() === '') {
      //   this.$refs.myDialog.show("姓名不能未空！", {
      //     type: 'alert',
      //     confirmText: '确定',
      //     cancelText: '取消',
      //     titleText: '',
      //     data: null
      //   })
      //   return false;
      // }

      // if (this.UserInfo.IDNumber.trim() === '') {
      //   this.$refs.myDialog.show("身份证号不能未空！", {
      //     type: 'alert',
      //     confirmText: '确定',
      //     cancelText: '取消',
      //     titleText: '',
      //     data: null
      //   })
      //   return false;
      // }


      this.UserInfo.UserName = this.UserInfo.UserName.trim();
      this.UserInfo.Password = this.UserInfo.Password.trim();
      // this.UserInfo.RealName = this.UserInfo.RealName.trim();
      // this.UserInfo.IDNumber = this.UserInfo.IDNumber.trim();


      return true;

    },
    register() {

      if (this.UserInfo.UserName === 'ghj' ||
        this.UserInfo.UserName === 'wy') {
        this.UserInfo.role = 'tj'
        this.UserInfo.cars = ['冀FT6389', '冀FR7741', '冀FQ3231', '冀FS7871', '冀FM5486', '冀FQ6612',
          '冀FS0754', '冀FR7643', '冀FT5842', '冀FU4407', '冀FT5140', '冀FT0850', '冀FS2433', '冀Fv7238',
          '冀Fv9353', '冀Fw8970', '冀Fv1463'];
      } else if (this.UserInfo.UserName === 'mds') {
        this.UserInfo.role = 'tj'
        this.UserInfo.cars = ['冀FR4531', '冀FQ8126', '冀FT3330', '冀FX3881'];
      } else {
        this.UserInfo.role = 'driver'
        this.UserInfo.cars = [];
      }

      this.$http.post("/register", this.UserInfo).then(
        (scucess) => {
          switch (scucess.data) {
            case "handleSucess":
              PubSub.publish('register', this.UserInfo);
              window.localStorage.setItem(
                this.$UserInfoKey,
                JSON.stringify(this.UserInfo)
              );
              this.$router.replace({ name: "login" });
              break;
            case "server-undefinedError":
              console.log("服务器端报错！");
              break;
          }
        },
        (fail) => {
          console.log("网络请求超时！");
        }
      );
    },
    registerDriver() {

      //验证是否为空
      if (!this.validateNullFunction()) return;

      //验证用户名是否存在
      this.validateUserNameIsExist().then(
        scucess => {
          //成功，代表用户名已占用
          this.$refs.myDialog.show("用户名已被占用，请使用其他名称！", {
            type: 'alert',
            confirmText: '确定',
            cancelText: '取消',
            titleText: '',
            data: null
          })
          return;
        },
        fail => {
          this.register();
        }
      )

    },
  },
  created() {
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
  
<style>
.registerRoot .table {
  align-items: center;
  height: 100vh;
}

.registerRoot .table button {
  visibility: hidden;
}

.registerRoot .table .row:last-child button {
  visibility: visible;
}

.registerRoot .table .row:nth-child(3) button {
  visibility: visible;
}

.registerRoot .table .row:not(.row:last-child)>.cell:first-child {
  width: 15vw;
  align-items: center;
}

.registerRoot .table .row:last-child {
  justify-content: end;
}

.registerRoot .table .row:last-child .cell button {
  width: 30vw;
  height: 7vw;
  background-color: red;
}

.registerRoot .table .row:last-child .cell {
  width: 30vw;
}

.registerRoot .cell input {
  width: 50vw;
  height: 5vw;
}
</style>
  