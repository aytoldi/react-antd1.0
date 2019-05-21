//首页
import Home from "../component/Home";
//ui
import Buttons from '../component/Ui/Buttons'
//商品
import Goods from "../component/Goods";
//订单
import Order from "../component/Order";
//编辑
import SingleBasic from "../component/Edit/singleBasic";
import EditLine from "../component/Edit/editLine";
//表单
import BasicForm from '../component/Form/basicForm'
import EditForm from '../component/Form/basicForm/edit'
import WatchForm from '../component/Form/basicForm/watch'
import AddForm from '../component/Form/basicForm/add'
//全部表单
import AllForm from '../component/Form/allForm'
//列表
import Cart from '../component/List/cart'
import Todo from '../component/List/todo'
//富文本
import RichText from '../component/RichText'
// 城市管理
import City from '../component/City'
//可视化
import LineChart from "../component/Chart/line";
import Histogram from "../component/Chart/box";
import CircleChart from "../component/Chart/circle";
//权限
import UserController from "../component/userController";


let requestRouter = [
    {
        title: '首页',
        key: '/home'
    },
    {
        title: 'UI',
        key: '/home/ui',
        children: [
            {
                title: 'Buttons',
                key: '/home/ui'
            }
        ]
    },
    {
        title: '商品',
        key: '/home/goods'
    },
    {
        title: '订单',
        key: '/home/order'
    },
    {
        title: '编辑内容',
        key: '/home/singleBasic',
        children: [
            {
                title: '基本修改',
                key: '/home/singleBasic'
            },
            {
                title: '修改一行',
                key: '/home/editLine'
            }
        ]
    },
    {
        title: '员工管理',
        key: '/home/basicForm',
        children: [
            {
                title: '基本管理',
                key: '/home/basicForm',
                detail: [
                    {
                        key: '/home/editForm/:id',
                    },
                    {
                        key: '/home/watchForm/:id',
                    },
                    {
                        key: '/home/addForm',
                    }
                ]
            },
            {
                title: '模态框',
                key: '/home/allForm'
            }
        ]
    },
    {
        title: '列表',
        key: '/home/cart',
        children: [
            {
                title: '购物车',
                key: '/home/cart'
            },
            {
                title: 'todo',
                key: '/home/todo'
            }
        ]
    },
    {
        title: '编辑文本',
        key: '/home/richText'
    },
    {
        title: '城市管理',
        key: '/home/city'
    },
    {
        title: '可视化',
        key: '/home/lineChart',
        children: [
            {
                title: '折线图',
                key: '/home/lineChart'
            },
            {
                title: '柱形图',
                key: '/home/histogram'
            },
            {
                title: '柱形图',
                key: '/home/circleChart'
            }
        ]
    },
    {
        title: '权限控制',
        key: '/home/userController'
    }
]

let config = [
    {
        title: '首页',
        key: '/home',
        component: Home,
        exact: true,
    },
    {
        title: 'UI',
        key: '/home/ui',
        children: [
            {
                title: 'Buttons',
                key: '/home/ui',
                component: Buttons
            }
        ]
    },
    {
        title: '商品',
        key: '/home/goods',
        component: Goods
    },
    {
        title: '订单',
        key: '/home/order',
        component: Order
    },
    {
        title: '编辑内容',
        key: '/home/singleBasic',
        children: [
            {
                title: '基本修改',
                key: '/home/singleBasic',
                component: SingleBasic
            },
            {
                title: '修改一行',
                key: '/home/editLine',
                component: EditLine
            }
        ]
    },
    {
        title: '员工管理',
        key: '/home/basicForm',
        children: [
            {
                title: '基础表单',
                key: '/home/basicForm',
                component: BasicForm,
                detail: [
                    {
                        key: '/home/editForm/:id',
                        component: EditForm,
                    },
                    {
                        key: '/home/watchForm/:id',
                        component: WatchForm,
                    },
                    {
                        key: '/home/addForm',
                        component: AddForm,
                    },
                ]
            },
            {
                title: '模态框',
                key: '/home/allForm',
                component: AllForm
            }
        ]
    },
    {
        title: '列表',
        key: '/home/cart',
        children: [
            {
                title: '购物车',
                key: '/home/cart',
                component: Cart
            },
            {
                title: 'todo',
                key: '/home/todo',
                component: Todo
            }
        ]
    },
    {
        title: '编辑文本',
        key: '/home/richText',
        component: RichText
    },
    {
        title: '城市管理',
        key: '/home/city',
        component: City
    },
    {
        title: '可视化',
        key: '/home/lineChart',
        children: [
            {
                title: '折线图',
                key: '/home/lineChart',
                component: LineChart
            },
            {
                title: '柱形图',
                key: '/home/histogram',
                component: Histogram
            },
            {
                title: '柱形图',
                key: '/home/circleChart',
                component: CircleChart
            }
        ]
    },
    {
        title: '地图',
        key: '/map',
        children: [
            {
                title: '基础地图',
                key: '/map/basic'
            },
            {
                title: '复杂地图',
                key: '/map'
            }
        ]
    },
    {
        title: '城市管理',
        key: '/city'
    },
    {
        title: '支付',
        key: '/pay',
        children: [
            {
                title: '微信支付',
                key: '/pay/wechat'
            },
            {
                title: '支付宝支付',
                key: '/pay/alipay'
            }
        ]
    },
    {
        title: '权限控制',
        key: '/home/userController',
        component: UserController
    }
]

//去掉children

function allRouter(arr) {
    let res = [];
    if (Array.isArray(arr)) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].children) {
                res = res.concat(allRouter(arr[i].children));
            } else {
                res.push(arr[i]);
            }
        }
        return res;
    } else {
        return [];
    }
}

let result = allRouter(config);
console.log(result, 'result..');
let all = result;
result = null;

function repet(config) {
    let add = [];
    for (let i = 0; i < config.length; i++) {
        for (let j = 0; j < requestRouter.length; j++) {
            if (config[i].key === requestRouter[j].key) {
                if (requestRouter[j].children) {
                    if (requestRouter[j].children[0].detail) {
                        add = add.concat(config[i].children[0].detail)
                    }
                    add = add.concat(config[i].children)
                } else {
                    add.push(config[i]);
                }
            }
        }
    }
    return add;
}

let route = repet(config);
console.log(route, '...route');
let routerConfig = route;
route = null;
export default {
    routerConfig,
    requestRouter
};


