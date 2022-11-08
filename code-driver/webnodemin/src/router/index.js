import VueRouter from "vue-router";
import Login from "./login";
import DriverMainWindow from "./driverMainWindow";
import WorkerPage from "./workerPage";
import Register from "./register";
import DriverProfileSetting from "./driverProfileSetting";
import CarCountFanliangStatic from "./carCountFanliangStatic";
import DriverQueueAplly from "./driverQueueAplly";
import DriverQueueView from "./driverQueueView";
import CarBossMainWindow from "./carBossDir/carBossMainWindow";
import CarBossProfileSetting from "./carBossDir/carBossProfileSetting";
import CarBossQueueManager from "./carBossDir/carBossQueueManager";
import SelectionITemPage from "./selectionITemPage";
import DispatcherWorkPage from "./dispatcher/dispatcherWorkPage";
import CarBossCarStateStatic from "./carBossDir/carBossCarStateStatic";
import TransInfoDetail from "./transInfoDetail";
import AdminMainWindow from "./admin/adminMainWindow";
import ItemEditor from "./admin/itemEditor";
import CarCountStaticPage from "./carBossDir/carCountStaticPage";
import MoneyManagerMainwindow from "./moneyManager/moneyManagerMainwindow";
import ClassManager from "./moneyManager/classManager";
import DetailManager from "./moneyManager/detailManager";
import MoneyStatic from "./moneyManager/moneyStatic";
import QueueManagerMaiwindow from "./queueManager/queueManagerMaiwindow";
import DestinationList from "./queueManager/destinationList";
import OutComeDetail from "./moneyManager/outComeDetail";
import InComeDetaiManager from "./moneyManager/inComeDetaiManager";
import DriverCarQueueManager from "./driverCarQueueManager";
import CreateQueue from "./queueManager/createQueue";
import FangliangEditor from "./queueManager/fangliangEditor";

export default new VueRouter({
    routes: [
        {
            name: 'login',
            path: "/",
            component: Login
        },
        {
            name: "driverMainWindow",
            path: "/driverMainWindow",
            component: DriverMainWindow
        },
        {
            name: "workerPage",
            path: "/workerPage",
            component: WorkerPage
        },
        {
            name: "register",
            path: "/register",
            component: Register
        },
        {
            name: "driverProfileSetting",
            path: "/driverProfileSetting",
            component: DriverProfileSetting
        },
        {
            name: "carCountFanliangStatic",
            path: "/carCountFanliangStatic",
            component: CarCountFanliangStatic
        },
        {
            name: "driverQueueAplly",
            path: "/driverQueueAplly",
            component: DriverQueueAplly
        },
        {
            name: "driverQueueView",
            path: "/driverQueueView",
            component: DriverQueueView
        },
        {
            name: "carBossMainWindow",
            path: "/carBossMainWindow",
            component: CarBossMainWindow
        },
        {
            name: "carBossProfileSetting",
            path: "/carBossProfileSetting",
            component: CarBossProfileSetting
        },
        {
            name: "carBossQueueManager",
            path: "/carBossQueueManager",
            component: CarBossQueueManager
        },
        {
            name: "selectionITemPage",
            path: "/selectionITemPage",
            component: SelectionITemPage
        },
        {
            name: "dispatcherWorkPage",
            path: "/dispatcherWorkPage",
            component: DispatcherWorkPage
        },
        {
            name: "carBossCarStateStatic",
            path: "/carBossCarStateStatic",
            component: CarBossCarStateStatic
        },
        {
            name: "transInfoDetail",
            path: "/transInfoDetail",
            component: TransInfoDetail
        },
        {
            name: "adminMainWindow",
            path: "/adminMainWindow",
            component: AdminMainWindow
        },
        {
            name: "itemEditor",
            path: "/itemEditor",
            component: ItemEditor
        },
        {
            name: "carCountStaticPage",
            path: "/carCountStaticPage",
            component: CarCountStaticPage
        },
        {
            name: "moneyManagerMainwindow",
            path: "/moneyManagerMainwindow",
            component: MoneyManagerMainwindow
        },
        {
            name: "classManager",
            path: "/classManager",
            component: ClassManager
        },
        {
            name: "detailManager",
            path: "/detailManager",
            component: DetailManager
        },
        {
            name: "moneyStatic",
            path: "/moneyStatic",
            component: MoneyStatic
        },
        {
            name: "queueManagerMaiwindow",
            path: "/queueManagerMaiwindow",
            component: QueueManagerMaiwindow
        },
        {
            name: "destinationList",
            path: "/destinationList",
            component: DestinationList
        },
        {
            name: "outComeDetail",
            path: "/outComeDetail",
            component: OutComeDetail
        },
        {
            name: "inComeDetaiManager",
            path: "/inComeDetaiManager",
            component: InComeDetaiManager
        },
        {
            name: "driverCarQueueManager",
            path: "/driverCarQueueManager",
            component: DriverCarQueueManager
        },
        {
            name: "createQueue",
            path: "/createQueue",
            component: CreateQueue
        },
        {
            name: "fangliangEditor",
            path: "/fangliangEditor",
            component: FangliangEditor
        }
    ]
})