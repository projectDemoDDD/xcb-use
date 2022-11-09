<template>
  <div id="app">
    <KeepAlive include="workerPage,dispatcherWorkPage,driverProfileSetting,carCountFanliangStatic">
      <router-view></router-view>
    </KeepAlive>
    <div class="loadingUI" :class="isShow">
      <van-loading size="20vw" color="Black" vertical>加载中...</van-loading>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  computed: {
    isShow() {
      return this.$store.state.isShow;
    }
  },
  methods: {
    getDictList(type) {
      //定义条件
      let where = {
        type: type
      };
      //发送请求
      this.$http
        .get(`/dicInfoQuerys?where=${JSON.stringify(where)}`)
        .then((info) => {
          //服务器只要接到请求就会返回200成功
          this.$handleRequest(info.data).then(
            success => {
              // DestinateInfoKey
              //window.localStorage.setItem(this.$DestinateInfoKey, JSON.stringify(success));
             
              success.forEach(element => {
                this.$destination.set(element.content, element);
              });
              //alert(JSON.stringify(...this.$destination.values()))
            },
            fail => {
              this.list = [];
              console.log("获取车辆状态列表失败了！")
            }
          )
        },
          (fail) => { console.log(fail) })
        .catch((err) => {
          console.log(`网络请求超时！${err}`);
        });
    }
  },
  created() {
    //获取目的地信息
    this.getDictList('end')
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}


#app,
button {
  font-size: 3vw;
}


/* 表格 */
.table {
  display: flex;
  flex-direction: column;
}

.row {
  display: flex;
  margin: 1.5vw 0vw;
}

.cell {
  padding: 1vw;
  display: flex;
}



/* PC端表格 */
.tablePC {
  display: flex;
  flex-direction: column;
}

.rowPC {
  display: flex;
  margin: 5px 0vw;
}

.cellPC {
  padding: 1px;
  display: flex;
}



/* 首页样式 */

.mainWindowRoot {
  background-color: lightgray;
  height: 100vh;
}

.mainWindowRoot .navContainer {
  background-color: snow;
  display: flex;
  justify-content: center;
  font-size: 5vw;
  height: 25vw;
  align-items: center;
}

.mainWindowRoot .headerImageRow {
  display: flex;
  flex-direction: row;
  padding: 0vw 5vw;
  background-color: snow;
}

.mainWindowRoot .headerImageRow .headerInfomation {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 5vw;
}

.mainWindowRoot .headerImageRow .headerInfomation>div:first-child {
  font-weight: 700;
  font-size: 4vw;
}

.mainWindowRoot .headerImageRow .headerInfomation>div:last-child {
  font-size: 3vw;
  color: gray;
}

.mainWindowRoot .headerImageRow .headerImage {
  background-image: url('./imgs/header.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  width: 20vw;
  height: 20vw;
}

.mainWindowRoot .bodyContainer {
  display: flex;
  flex-direction: column;
  height: 100vw;
}

.mainWindowRoot .bodyContainer .icon {
  height: 5vw;
  width: 5vw;
  background-color: red;
}


.mainWindowRoot .bodyContainer .text {
  margin-left: 3vw;
}

.mainWindowRoot .bodyContainer>div {
  font-size: 3vw;
  background-color: white;
  height: 20vw;
  display: flex;
  align-items: center;
  padding: 0 5vw;
}


.mainWindowRoot .bodyContainer>div:first-child {
  margin-top: 2vw;
  margin-bottom: 2vw;
}



/* 个人设置模板 */
.profileSettingRoot .table {
  align-items: center;
  height: 100vh;
}

.profileSettingRoot .table .row:not(.row:last-child)>.cell:first-child {
  width: 15vw;
}

.profileSettingRoot .table .row:last-child .cell button {
  height: 7vw;
  flex: 1;
}

.profileSettingRoot .table .row:last-child .cell {
  width: 100vw;
}


.loadingUI {
  background-color: rgba(255, 155, 0, 0.8);
  width: 100vw;
  height: 120vh;
  display: flex;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  justify-content: center;
  align-items: center;
}

.loadingHidden {
  display: none;
}


/* #app{
} */
</style>
