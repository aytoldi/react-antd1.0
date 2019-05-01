import React from 'react';
import {Router, Route, Switch, Redirect} from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import {createHashHistory} from 'history'//引入历史
import ContainerPage from '../page'
import Home from '../page/home'
import Login from '../page/login'
import PageList from "../component/User/pageList";
import InnerEdit from "../component/User/innerEdit";
import RowEdit from "../component/User/rowEdit";
import RowAdd from "../component/User/rowAdd";
import RowLink from "../component/User/rowLink";
import BoxChart from "../component/Chart/box";
import LineChart from "../component/Chart/line";
import CircleChart from "../component/Chart/circle";
import Todo from '../component/todo'

let history = createHashHistory();

class App extends React.Component {

    render() {

        return (
            <React.Fragment>
                <Router history={history}>
                    <ContainerPage>
                        <Switch>
                            <Route exact path={'/'} component={Login}/>
                            <Route path="/home">
                                <Home>
                                    <Switch>
                                        <PrivateRoute exact path={'/home'} component={PageList}/>
                                        <PrivateRoute path={'/home/innerEdit'} component={InnerEdit}/>
                                        <PrivateRoute path={'/home/rowEdit'} component={RowEdit}/>
                                        <PrivateRoute path={'/home/rowAdd'} component={RowAdd}/>
                                        <PrivateRoute path={'/home/rowLink'} component={RowLink}/>
                                        <PrivateRoute path={'/home/box'} component={BoxChart}/>
                                        <PrivateRoute path={'/home/line'} component={LineChart}/>
                                        <PrivateRoute path={'/home/circle'} component={CircleChart}/>
                                        <PrivateRoute path={'/home/todo'} component={Todo}/>
                                        <Redirect to={'/home/pageList'}/>
                                    </Switch>
                                </Home>
                            </Route>
                            <Redirect to={'/'}/>
                        </Switch>
                    </ContainerPage>
                </Router>
            </React.Fragment>
        )
    }
}

export default App