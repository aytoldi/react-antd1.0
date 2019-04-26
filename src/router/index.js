import React from 'react';
import {Router, Route, Switch, Redirect} from 'react-router-dom'
import ContainerPage from '../page'
import Home from '../page/home'
import Login from '../page/login'
import Todo from '../component/todo'
import User from '../view/user'
import PrivateRoute from './PrivateRoute'
import {createHashHistory} from 'history'

let history = createHashHistory();

class App extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Router history={history}>
                    <ContainerPage>
                        <Switch>
                            <Route exact path={'/login'} component={Login}/>

                            <Route path="/home">
                                <Home>
                                    <PrivateRoute path={'/home'} component={User}/>
                                    <PrivateRoute exact path={'/home/todo'} component={Todo}/>
                                </Home>
                            </Route>
                            <Redirect to={'/login'}/>
                        </Switch>
                    </ContainerPage>
                </Router>
            </React.Fragment>
        )
    }
}

export default App;