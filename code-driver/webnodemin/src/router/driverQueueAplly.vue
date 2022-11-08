<template>
    <div class="driverQueueApllyRoot">
        <div class="table">
            <div class="row">
                <div class="cell">
                    <div>车队名称</div>
                </div>
                <div class="cell">
                    <div>车队管理</div>
                </div>
                <div class="cell">
                    <div>搅拌站</div>
                </div>
                <div class="cell">
                    <div>
                        操作
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="cell">
                    <div>车队1</div>
                </div>
                <div class="cell">
                    <div>admin1</div>
                </div>
                <div class="cell">
                    <div>建华</div>
                </div>
                <div class="cell">
                    <div>
                        <button @click="applyHandler">申请</button>
                    </div>
                </div>
            </div>


            <div class="row">
                <div class="cell">
                    <div>车队2</div>
                </div>
                <div class="cell">
                    <div>admin2</div>
                </div>
                <div class="cell">
                    <div>振东</div>
                </div>
                <div class="cell">
                    <div>
                        <button @click="applyHandler">申请</button>
                    </div>
                </div>
            </div>


            <div class="row">
                <div class="cell">
                    <div>车队3</div>
                </div>
                <div class="cell">
                    <div>admin3</div>
                </div>
                <div class="cell">
                    <div>雄飞</div>
                </div>
                <div class="cell">
                    <div>
                        <button @click="applyHandler">申请</button>
                    </div>
                </div>
            </div>
            
        </div>
    
        <div class="operateRow">
            <input/>
            <button>搜索</button>
            <button @click="okHandler">确认</button>
        </div>
    </div>
</template>
  
<script>
import pubsub from "pubsub-js";
export default {
    name: 'driverQueueAplly',
    methods: {
        applyHandler(){
            
        },
        okHandler(){
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
  