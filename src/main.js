import React from 'react';
import ReactDOM from 'react-dom';
import reduxStore from './store'
import {Provider} from 'react-redux'
import App from './router'
import 'antd/dist/antd.css';//引入ant-design样式
window._store = reduxStore;

import {createHashHistory} from 'history'//引入历史
const history = createHashHistory();

let getToken=reduxStore.getState();
console.log(getToken,'get token ...');
if(getToken.token){

}

ReactDOM.render(
    <Provider store={reduxStore}>
        <App/>
    </Provider>, document.getElementById('root'));

