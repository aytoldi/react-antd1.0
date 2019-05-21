import React from 'react';
import {Router, Route, Switch, Redirect} from 'react-router-dom'
//路由权限组件
import PrivateRoute from './PrivateRoute'
//引入历史
import {createHashHistory} from 'history'

let history = createHashHistory();
//全局组件
import ContainerPage from '../page'
import Home from '../page/home'
import Login from '../page/login'

//路由配置
import menuConfig from '../config/menuConfig'

let {routerConfig} = menuConfig;

class App extends React.Component {

    render() {
        /*
        <PrivateRoute path={'/home/linkEdit/:id'} component={LinkEdit}/>
        http://localhost:8080/#/home/linkEdit/2

        <PrivateRoute path={'/home/linkWatch/:id'} component={LinkWatch}/>
          http://localhost:8080/#/home/linkWatch/3
        */
        return (
            <React.Fragment>
                <Router history={history}>
                    <ContainerPage>
                        <Switch>
                            <Route exact path={'/'} component={Login}/>
                            <Route path="/home" render={() => {
                                return (<Home>
                                    <Switch>
                                        {
                                            routerConfig.map((item, index) => {
                                                if (item.exact) {
                                                    return <PrivateRoute key={index} exact path={item.key}
                                                                         component={item.component}/>
                                                } else {
                                                    return <PrivateRoute key={index} path={item.key}
                                                                         component={item.component}/>
                                                }
                                            })
                                        }
                                        <Redirect to={'/home'}/>
                                    </Switch>
                                </Home>)
                            }}/>
                            <Redirect to={'/'}/>
                        </Switch>
                    </ContainerPage>
                </Router>
            </React.Fragment>
        )
    }
}

export default App
