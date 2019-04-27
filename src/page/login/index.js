import React from 'react';
import {connect} from 'react-redux'
import {
    Form,
    Input,
    Checkbox,
    Button, message,
    Row,
    Col,
    Icon
} from 'antd';

import axios from "axios";
import qs from 'qs';
import Banner from '../../assets/img/logo.png'
import history from '../../router/history'
import apiUrl from '../../utils/request'
import request from '../../utils/url'
import styles from './index.less'

class Login extends React.Component {

    //Form是子类，所以使用子组件到父组件传递值，所以使用回调函数s
    handleValue = (value) => {
        this.props.submitHandle(value).then((res) => {
            console.log(res,62);
            if(res.data.code===0){
                console.log(1512);
                history.replace('/home');
           }
        })
    }

    render() {
        return (
            <React.Fragment>
                <div className={styles.container}>
                    <Row>
                        <Col className={styles.list} span={7} offset={13}>
                            <Row span={24} className={styles.logo}>
                                <img src={Banner}/>
                            </Row>
                            <Row>
                                <Col span={18} offset={3}>
                                    <FormContainer handleValue={this.handleValue}
                                                   tokenHandleProps={this.tokenHandleProps}/>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </React.Fragment>
        )
    }
}

class FormContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    handleForm = () => {
        let self = this;
        console.log(this.props, 'qqkkll');
        this.props.form.validateFields((err, value) => {
            if (!err) {
                self.props.handleValue(value);
                // self.props.handleValue(value);
                // axios.post(request.loginUrl, qs.stringify(value)).then((res) => {
                //     console.log(res.data.data, 'ss');
                //     let {data: {data}} = res;
                //     if (res.data.code === 0) {
                //         history.replace('/home');
                //         window.localStorage.setItem('token', data.token);
                //     } else {
                //         message.info(res.data.error);
                //     }
                // })
            }
        })
    }

    _userValidator = (rule, value, callback) => {
        let reg = /^1\d{10}$/;
        if (!value) {
            callback('请输入手机号码');
        } else if (value && !reg.test(value)) {
            callback('你输入的手机号码不正确');
        } else {
            callback();
        }
    }

    _userPassword = (rule, value, callback) => {
        let reg = /^[a-z]{5}$/;
        if (!value) {
            callback("请输入密码");
        } else if (value && !reg.test(value)) {
            callback('你输入的密码不正确');
        } else {
            callback();
        }
    }

    render() {
        let {getFieldDecorator} = this.props.form;
        return (
            <Form>
                <Form.Item>
                    {
                        getFieldDecorator('username', {
                            rules: [
                                {
                                    validator: this._userValidator
                                }
                            ]
                        })(<Row>
                            <Col span={3}>
                                <Icon type={'user'}/>
                            </Col>
                            <Col span={21}>
                                <Input placeholder={'请输入用户名'}/>
                            </Col>
                        </Row>)
                    }
                </Form.Item>
                <Form.Item>
                    {
                        getFieldDecorator('password', {
                            initialValue: '',
                            rules: [
                                {
                                    validator: this._userPassword
                                }
                            ]
                        })(<Row>
                            <Col span={3}>
                                <Icon type={'lock'}/>
                            </Col>
                            <Col span={21}>
                                <Input placeholder={'请输入用密码'}/>
                            </Col>
                        </Row>)
                    }
                </Form.Item>
                <Form.Item>
                    {
                        getFieldDecorator('isChecked', {initialValue: true, valuePropName: 'checked',})(
                            <Checkbox><span className={styles.save}>记住密码</span></Checkbox>)
                    }
                </Form.Item>
                <Form.Item>
                    <Row className={styles.btn}>
                        <Button type="primary" block onClick={this.handleForm}>提交</Button>
                    </Row>
                </Form.Item>
            </Form>
        )
    }
}

FormContainer = Form.create()(FormContainer);

let putAction = {
    //提交按钮点击的之后派发action
    submitHandle: (value) => {
        return (dispatch) => {
            return new Promise((resolve) => {
                axios.post(apiUrl.userLogin, qs.stringify(value)).then((res) => {
                    let token = res.data.data.token;
                    window.localStorage.setItem('token', token);
                    axios.defaults.headers.common['Authorization'] = token;
                    //reducer做的事情，改变state
                    dispatch({ //真正派发
                        type: 'auth_success',
                        token: token
                    })
                    resolve(res);
                })
            })
        }
    }
}

// rodipay: uyghur lar ning yalikisga qikwalgan tayyar tap

export default connect(//将react与redux关联起来
    state => ({...state}),//获取redux中的状态，指定对应的接收props名字
    {...putAction}//绑定action中更新状态的方法
)(Login);
