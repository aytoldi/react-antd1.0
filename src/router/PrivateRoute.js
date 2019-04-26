import React from 'react';
import {Route, Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux'

import history from '../router/history'

class PrivateRoute extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        let isAuthenticated = this.props.token;
        this.setState({isAuth: isAuthenticated});
        if (!isAuthenticated) {
            setTimeout(() => {
                history.replace('/login');
            }, 500)
        }
    }

    render() {
        let {component: Component, path = "/login", exact = false, strict = false} = this.props;
        return this.state.isAuth ? (
            <Route path={path} exact={exact} strict={strict} render={(props) => (<Component {...props} />)}/>
        ) : ("请重新登录");
    }
}

export default connect(//将react与redux关联起来
    state => ({...state}),//获取redux中的状态，指定对应的接收props名字
    {}//绑定action中更新状态的方法
)(PrivateRoute);
