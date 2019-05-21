import React from 'react';
import {Card, Button, Modal, Form, Select, Table} from 'antd'
import utils from '../../utils/tool'

const Option = Select.Option;

let FormItem = Form.Item;
// 时间选择汉化
import moment from 'moment/moment'
import 'moment/locale/zh-cn'

moment.locale('zh-cn')
import service from '../../utils/service'

export default class Buttons extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal1: false,
            _dataSource: [],
            current: 1,//当前页数
            _getTotal: 0,
            columns: [
                {
                    'title': '城市id',
                    dataIndex: 'id'
                },
                {
                    'title': '城市名称',
                    dataIndex: 'city_name'
                },
                {
                    'title': '用车模式',
                    dataIndex: 'mode'
                },
                {
                    'title': '营运模式',
                    dataIndex: 'open_mode'
                },
                {
                    title: '加盟商授权状态',
                    dataIndex: 'auth_status'
                },
                {
                    title: '城市管理员',
                    dataIndex: 'city_admin'
                },
                {
                    title: '城市开通时间',
                    dataIndex: 'open_time'
                },
                {
                    title: '操作时间',
                    dataIndex: 'update_time'
                },
                {
                    title: '操作人',
                    dataIndex: 'sys_user_name'
                }
            ]
        }
    }

    componentDidMount() {
        this.getData({page: 1, pageSize: 10});
    }


    handleOpenCity = () => {
        let obj = {
            id: '', //城市
            tMode: '', //用车模式
            sMode: '', //营运模式
            sTips: '' //加盟商授权状态
        }

        // this.getData({});
    }


    getData = (params) => {
        service.city({...params}).then((res) => {
            let setKey = res.data.list.map((item, index) => {
                item.key = item.id;
                return item;
            })
            this.setState({
                _dataSource: setKey,
                _getTotal: res.data.total//获取总数
            })
        })
    }

    _handleTableChange1 = (page, pageSize) => {
        this.setState({
            current: page
        }, () => {
            this.getData({page: page, pageSize: 10});
        })
    }

    handleSearch = () => {
        this.getData(values, {page: 1, pageSize: 10});
        this.setState({
            _pagination1: {
                ...this.state._pagination1,
                current: 1
            }
        })
    }


    render() {
        return (
            <div>
                <Card>
                    <FilterForm mySrarch={this.handleSearch}></FilterForm>
                </Card>
                <Card>
                    <Button type={'primary'} onClick={this.handleOpenCity}>开通城市</Button>
                </Card>
                <Table
                    columns={this.state.columns}
                    dataSource={this.state._dataSource}
                    bordered={true}
                    rowKey={record => record.id}
                    pagination={{
                        total: this.state._getTotal,
                        current: this.state.current,
                        onChange: this._handleTableChange1
                    }}
                />
            </div>
        );
    }
}


class FilterForm extends React.Component {

    handleSearch = () => {
        let userInfo = this.props.form.getFieldsValue();
        this.props.form.validateFields((err, values) => {

            if (!err) {
                values ? this.props.mySrarch(values) : false;
            } else {
                return;
            }
        })
    }

    render() {
        let {getFieldDecorator} = this.props.form;
        return (
            <Form layout={'inline'}>
                <FormItem label={'城市'}>
                    {
                        getFieldDecorator('id')(
                            <Select
                                style={{width: '110px'}}
                                placeholder={"请选择"}
                            >
                                <Option value={''}>全部</Option>
                                <Option value={'1'}>北京市</Option>
                                <Option value={'2'}>天津市</Option>
                                <Option value={'3'}>深圳市</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label={'用车模式'}>
                    {
                        getFieldDecorator('tMode')(
                            <Select
                                style={{width: '110px'}}
                                placeholder={"请选择"}
                            >
                                <Option value={''}>全部</Option>
                                <Option value={'1'}>制定停车点模式</Option>
                                <Option value={'2'}>进禁区模式</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label={'营运模式'}>
                    {
                        getFieldDecorator('sMode')(
                            <Select
                                style={{width: '110px'}}
                                placeholder={"请选择"}
                            >
                                <Option value={''}>全部</Option>
                                <Option value={'1'}>自用</Option>
                                <Option value={'2'}>加盟</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label={'加盟商授权状态'}>
                    {
                        getFieldDecorator('sTips')(
                            <Select
                                style={{width: '110px'}}
                                placeholder={"请选择"}
                            >
                                <Option value={''}>全部</Option>
                                <Option value={'1'}>已授权</Option>
                                <Option value={'2'}>未授权</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem>
                    <Button type={'primary'} style={{marginRight: '30px'}} onClick={this.handleSearch}>查询</Button>
                    <Button>重置</Button>
                </FormItem>
            </Form>
        )
    }
}

FilterForm = Form.create({})(FilterForm)
