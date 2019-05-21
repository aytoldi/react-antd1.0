import React from 'react';
import {Button, Form, Input, Row, Col, DatePicker, Radio, Select} from 'antd/lib/index'
// 时间选择汉化
import moment from 'moment/moment'
import 'moment/locale/zh-cn'

moment.locale('zh-cn')
import service from '../../../utils/service'
import {createHashHistory} from 'history'//引入历史
const history = createHashHistory();


class FormContainer extends React.Component {

    constructor(props) {
        super(props);
        console.log(this.props.formContent, 91);
        this.state = {
            _formContent1: {
                name: '',
                city: 0,
                date: new Date(),
                sex: 0,
            }
        }

    }

    componentWillMount() {
        this.setState({
            _formContent1: this.state._formContent1,
        })
    }

    _userValidator = (rule, value, callback) => {
        let reg = /^[\u4E00-\u9FA5]+$/;

        if (!value) {
            return callback("请输入名称");
        } else if (!reg.test(value)) {
            return callback("请输入正确的名称")
        } else {
            callback();
        }
    }

    handleForm() {
        let self = this;
        this.props.form.validateFields((err, value) => {
            if (!err) {
                let d = new Date(value.date);
                let youWant = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
                let addApply = {...value, date: youWant};

                service.linkAdd(addApply).then((res) => {
                    if (res.data.code === 0) {
                        history.replace('/home/basicForm');
                        self.props.form.resetFields();
                    }
                })
            }
        })
    }

    //设置日期
    disabledEndDate = (endValue) => {
        let me = this;
        const startValue = this.state.currentTime;
        if (!endValue || !startValue) {
            return false;
        }
        return endValue.valueOf() <= startValue.valueOf();
    }
    handleEndOpenChange = (open) => {
        let self = this
        if (open) {
            self.currentTime = moment();
        }
        this.setState({currentTime: moment()});
    }

    restForm() {
        this.props.form.resetFields();
    }


    render() {

        let {
            city,
            date,
            name,
            sex,
        } = this.state._formContent1;

        if (city === 1) {
            city = 'New York';
        } else if (city === 2) {
            city = 'London'
        } else if (city === 3) {
            city = 'America';
        } else {
            city = '';
        }


        let {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 4},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 20},
            },
        };
        let self = this;


        return (
            <Form {...formItemLayout} layout="vertical">
                <Row>
                    <Col span={10} offset={1}>
                        <Form.Item label="姓名">
                            {
                                getFieldDecorator('name',
                                    {
                                        rules: [
                                            {
                                                required: true, message: '请输入正确的姓名'
                                            },
                                            {
                                                validator: this._userValidator
                                            }
                                        ],
                                        initialValue: name || ''
                                    })(
                                    <Input placeholder="Username"/>
                                )}
                        </Form.Item>
                        <Form.Item label="城市">
                            {getFieldDecorator('city',

                                {
                                    rules: [
                                        {
                                            required: true,
                                            message: '城市不能为空'
                                        },
                                        // {
                                        //     min:5, max: 10,
                                        //     message: '长度不在范围内'
                                        // },
                                        {
                                            pattern: /^\w+$/,
                                            message: '用户名必须为字母或数字'
                                        }
                                    ],
                                    initialValue: city || ''
                                })(
                                <Select>
                                    <Select.Option value="1">New York</Select.Option>
                                    <Select.Option value="2">London</Select.Option>
                                    <Select.Option value="3">America</Select.Option>
                                </Select>
                            )}
                        </Form.Item>
                        <Form.Item label="日期">
                            {getFieldDecorator('date',
                                {
                                    rules: [
                                        {
                                            required: true,
                                            message: '日期不能为空'
                                        }
                                    ],
                                    initialValue: moment(date || new Date(), 'YYYY-MM-DD') || moment()
                                })(
                                <DatePicker
                                    disabledDate={this.disabledEndDate}
                                    onOpenChange={this.handleEndOpenChange}
                                    format={'YYYY-MM-DD'}
                                />
                            )}
                        </Form.Item>
                        <Form.Item label="性别">
                            {
                                getFieldDecorator(
                                    'sex',
                                    {
                                        rules: [{required: true, message: '性别不能为空'}],
                                        initialValue: sex || 0
                                    }
                                )
                                (
                                    <Radio.Group>
                                        <Radio value={0}>男</Radio>
                                        <Radio value={1}>女</Radio>
                                    </Radio.Group>
                                )
                            }
                        </Form.Item>
                        <Form.Item>
                            <Row>
                                <Col span={10}>
                                    <Button type="primary" block onClick={() => this.handleForm()}>提交</Button>
                                </Col>
                                <Col span={10} offset={4}>
                                    <Button type="primary" block onClick={() => this.restForm()}>重置</Button>
                                </Col>
                            </Row>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        )
    }
}

FormContainer = Form.create()(FormContainer);

export default FormContainer;
