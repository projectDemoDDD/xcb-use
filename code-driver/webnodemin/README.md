

### 进度
司机端，需要定时任务查看任务，以及获得任务之后的处理操作等
司机端工作台，刷新页面时的加载逻辑，第一次加载窗口的逻辑
司机端，货运完成的明细记录
调度端倒车状态的查看
注册页面无法选择车牌号的问题
队长司机每日明细统计
司机统计
司机工作台，输入项目的选择功能
后台管理用户，登录，主界面以及数据维护的功能
司机个人设置功能
司机工作台，模态对话框
郭汉军(ghj)一个账号，王义(wy)一个账号,马东升(mds)一个账号
车次方量统计，每次切页面时会从第一页开始，改为可以记录
司机明细都是郭建的明细的问题
nodejs realese版本如何做 服务端代码，不用发布，用户不会下载服务端代码的
-------------------------------------------------------------------------------------
3.在微信里打开的问题如何解决
5.操作流畅的优化，动画过度效果
7.选择列表显示的优化问题
8.后台编辑功能的实现
9.司机个人设置页面，还需要再测试一下
10.主界面左侧图标
11.错误日志的收集
12.访问量的统计
13.服务端逻辑优化
14.选择UI库
16.车辆被选择之后其他人就不能选择了
17.OK改成确定
18.修改个人信息之后，没有缓存
21.韩庆民 7741 运输明细是 gggg这个账号，无法找到原因
22.boss的统计单独出来一个页面
23.后台管理系统
24.运输明细增加一个record字段

郭艳:
2.增加找回密码功能
5.方量为空时，统计无法使用的问题，，，以及这个0方是如何来的？？？
6.服务端，增加日志功能
7.目的地按搅拌站分组
8.司机与车老板如何做到开放平台，权限设计问题
9.按搅拌站统计的页面，查询条件传参问题
10.修改振东为镇东
11.不同浏览器，不同机型，显示效果不同，改为样式自定义


1.正在做高德地图



--------------------------------
11:58出的票
装完灰就第二天了，出站时间不正确，导致统计出错的问题






#### 任务

TaskState:"waitTask"
TaskStateComment:"待命"


TaskState:"waitAccept"
TaskStateComment:"等待接收"


TaskState:"accept"
TaskStateComment:"排队倒车中"



//车辆状态
state: rest 休息
state: waitTask 待命
state: waitAccept 等待接收

state: accept 排队倒车中
state: loadThing 倒车中
state: start 出站
state: arrival 到工地 等待卸车
state: startOff 开始卸车
state: offComplete 卸完
state: back 回站-待命状态