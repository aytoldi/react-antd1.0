import React from 'react';
import {Table, Button, Modal, Form, Icon, Input, Row, Col, DatePicker, Radio, Select} from 'antd'
// 时间选择汉化
import moment from 'moment'
import 'moment/locale/zh-cn'

moment.locale('zh-cn')
import service from '../../../utils/service'
import styles from "../../../page/login/index.less";
import {createHashHistory} from 'history'//引入历史
const history = createHashHistory();


let defValue = {};


class RowAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //thead
            _columns1: [
                {
                    title: 'Id',
                    key: 'id',
                    dataIndex: 'id',
                },
                {
                    title: '姓名',
                    key: 'name',
                    dataIndex: 'name',
                }, {
                    title: '城市',
                    key: 'city',
                    dataIndex: 'city',
                    render: (index, row) => {
                        if (row.city === 1) {
                            return ('span', 'New York')
                        } else if (row.city === 2) {
                            return ('span', 'London')
                        } else if (row.city === 3) {
                            return ('span', 'America')
                        }
                    }
                }, {
                    title: '日期',
                    key: 'date',
                    dataIndex: 'date',
                    align: 'center'
                },
                {
                    title: '性别',
                    key: 'sex',
                    dataIndex: 'sex',
                    render: (text, record) => {
                        if (record.sex === 0) {
                            return ('男')
                        } else {
                            return ('女')
                        }
                    }
                },
                {
                    title: '操作',
                    key: '4',
                    dataIndex: 'operation',
                    render: (text, record, index) => {
                        return (<Button onClick={() => this.handleEdit(text, record, index)}>编辑</Button>)
                    }
                }
            ],
            _dataSource1: [],//数据源
            _loading: false,  /*antd*/
            _pagination1: false,
            _visible1: false,
            _visible2: false,
            _initValue1: {}

        }
    }


    componentDidMount() {
        this.getData({
            page: 1,
            pageSize: 10
        });
    }

    getData = (initParams) => {
        service.renderPageList({...initParams}).then((res) => {
            let newData = res.data.list.map((item, index) => {
                item.key = item.id;
                return item;
            });

            this.setState({
                _dataSource1: newData
            })
        })
    }

    handleEdit(text, record, index) {
        this._showModal1(record);
    }

    //1.

    //获取数据的时候showModal中监听的
    _showModal1 = (record) => {
        this.setState({
            _visible1: true,
            _initValue1: record
        });
    }

    _handleOk1 = (e) => {
        console.log(e);
        this.setState({
            _visible1: false,
        });
    }

    _handleCancel1 = (e) => {
        console.log(e);
        this.setState({
            _visible1: false,
            _initValue1: {}//隐藏以后初始化
        });
    }


    //2.
    //获取数据的时候showModal中监听的
    _showModal2 = () => {
        this.setState({
            _visible2: true,
        });
    }

    _handleOk2 = (e) => {
        console.log(e);
        this.setState({
            _visible2: false,
        });
    }

    _handleCancel2 = (e) => {
        console.log(e);
        this.setState({
            _visible2: false,
            _initValue1: {}//隐藏以后初始化
        });
    }

    addHandle() {
        this._showModal2();
    }

    hideModal = (state, num) => {
        if (num === 1) {
            this.setState({
                _visible1: false,
                _initValue1: {}
            });
        } else {
            this.setState({
                _visible2: false,
                _initValue1: {}
            });
        }

    }


    render() {
        //destroyOnClose 非常重要的属性
        return (
            <div>
                <Button onClick={() => this.addHandle()} style={{'marginBottom': '20px'}} type={"primary"}>添加</Button>
                <Modal
                    title="Basic Modal"
                    visible={this.state._visible1}
                    onOk={this._handleOk1}
                    onCancel={this._handleCancel1}
                    destroyOnClose={true}
                    footer={null}
                >
                    <div>
                        <FormContainer hideModal={this.hideModal} formContent={this.state._initValue1}/>
                    </div>
                </Modal>
                <Modal
                    title="Basic Modal"
                    visible={this.state._visible2}
                    onOk={this._handleOk2}
                    onCancel={this._handleCancel2}
                    destroyOnClose={true}
                    footer={null}
                >
                    <div>
                        <FormContainer hideModal={this.hideModal} formContent={this.state._initValue1}/>
                    </div>
                </Modal>
                <Table
                    //表格数据
                    dataSource={this.state._dataSource1}
                    //表格列名
                    columns={this.state._columns1}
                    //行的类名
                    rowClassName={this.state._classname1}
                    bordered={true}
                    rowKey={record => record.id}
                    pagination={this.state._pagination1}
                />
            </div>
        )
    }
}


class FormContainer extends React.Component {

    constructor(props) {
        super(props);
        console.log(this.props.formContent, 91);
        this.state = {}

    }

    componentWillMount() {
        this.setState({
            _formContent1: this.props.formContent,
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
                        history.replace('/home/rowAdd');
                        self.props.hideModal(false, 1);
                        self.props.form.resetFields();
                    }
                })
            }
        })
    }

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


    CancelHanlde() {
        this.props.hideModal(false, 1);
        this.props.hideModal(false, 2);
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
                    <Col span={22} offset={1}>
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
                                        // {
                                        //     pattern: /^\w+$/,
                                        //     message: '用户名必须为字母或数字'
                                        // }
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
                                    <Button type="primary" block onClick={() => this.CancelHanlde()}>取消</Button>
                                </Col>
                            </Row>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        )
    }
}

function mapPropsToFields(props) {
    console.log(props, 666);
}

FormContainer = Form.create()(FormContainer);

export default RowAdd;