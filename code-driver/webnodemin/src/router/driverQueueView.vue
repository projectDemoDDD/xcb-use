<template>
    <div class="driverQueueApllyRoot">
        <div class="table">
            <div class="row">
                <div class="cell">
                    <div>用户名</div>
                </div>
                <div class="cell">
                    <div>姓名</div>
                </div>
                <div class="cell">
                    <div>累计车次</div>
                </div>
                <div class="cell">
                    <div>累计方量</div>
                </div>
                <div class="cell">
                    <div>进入时间</div>
                </div>
            </div>

           
            <div class="row">
                <div class="cell">
                    <div>guojian</div>
                </div>
                <div class="cell">
                    <div>郭建</div>
                </div>
                <div class="cell">
                    <div>130</div>
                </div>
                <div class="cell">
                    <div>1000</div>
                </div>
                <div class="cell">
                    <div>2021.6.3</div>
                </div>
            </div>
            
        </div>
    
  
    </div>
</template>
  
<script>
import pubsub from "pubsub-js";
export default {
    name: 'driverQueueView',
    methods: {
        applyHandler(){
            
        },
        okHandler(){
            this.isBelongQueue=!this.isBelongQueue;
            pubsub.publish('queue',this.isBelongQueue);
            this.$router.back();
        }
    },
    data(){
        return{
            isBelongQueue:false
        }
    }
}
</script>
  
<style>
.driverQueueApllyRoot {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
}
.driverQueueApllyRoot .operateRow{
    margin: 2vw;
}
.operateRow input{
    height: 5vw;
}
.operateRow button{
    width: 15vw;
}
.driverQueueApllyRoot .operateRow img{
    width: 5vw;
    height: 5vw;

}
.driverQueueApllyRoot .table{
    min-height: 80vh;
    border: 1px solid black;
    margin: 2vw;
}
.driverQueueApllyRoot .table .cell{
    flex: 1;
    justify-content: center;
}
</style>
  