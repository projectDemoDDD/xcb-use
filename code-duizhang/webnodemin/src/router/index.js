import VueRouter from "vue-router";
import LogIn from "./login";
import CarCountFanliangStatic from "./carCountFanliangStatic";
import CarBossMainWindow from "./carBossDir/carBossMainWindow";
import CarBossProfileSetting from "./carBossDir/carBossProfileSetting";
import CarBossQueueManager from "./carBossDir/carBossQueueManager";
import DispatcherWorkPage from "./dispatcher/dispatcherWorkPage";
import CarBossCarStateStatic from "./carBossDir/carBossCarStateStatic";
import TransInfoDetail from "./transInfoDetail";
import CarCountStaticPage from "./carBossDir/carCountStaticPage";
import MoneyManagerMainwindow from "./moneyManager/moneyManagerMainwindow";
import ClassManager from "./moneyManager/classManager";
import DetailManager from "./moneyManager/detailManager";
import MoneyStatic from "./moneyManager/moneyStatic";
import QueueManagerMaiwindow from "./queueManager/queueManagerMaiwindow";
import DestinationList from "./queueManager/destinationList";
import OutComeDetail from "./moneyManager/outComeDetail";
import InComeDetaiManager from "./moneyManager/inComeDetaiManager";
import DestinationEditor from "./queueManager/destinationEditor";
import FangLiangEditor from "./queueManager/fangLiangEditor";
import DataEditor from "./queueManager/dataEditor";
import HntTypeEditor from "./queueManager/hntTypeEditor";
import StartLocationEditor from "./queueManager/startLocationEditor";
import OutInGroupDetailStatic from "./moneyManager/outInGroupDetailStatic";

export default new VueRouter({
    routes: [
        {
            name:"login",
            path: "/",
            component: LogIn
        },
        {
            name: "carCountFanliangStatic",
            path: "/carCountFanliangStatic",
            component: CarCountFanliangStatic
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
            name: "destinationEditor",
            path: "/destinationEditor",
            component: DestinationEditor
        },
        {
            name: "fangLiangEditor",
            path: "/fangLiangEditor",
            component: FangLiangEditor
        },
        {
            name: "dataEditor",
            path: "/dataEditor",
            component: DataEditor
        },
        {
            name: "hntTypeEditor",
            path: "/hntTypeEditor",
            component: HntTypeEditor
        },
        {
            name: "startLocationEditor",
            path: "/startLocationEditor",
            component: StartLocationEditor
        },
        {
            name: "outInGroupDetailStatic",
            path: "/outInGroupDetailStatic",
            component: OutInGroupDetailStatic
        }
    ]
})