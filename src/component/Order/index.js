import React from 'react'
import {Table, Button, Card, Checkbox} from 'antd'
import service from '../../utils/service'

export default class Order extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            _dataSource1: [],
            flagStatus: false,
            columns: [
                {
                    title: () => {
                        return (<Checkbox checked={this.state.flagStatus}></Checkbox>)
                    },
                    type: 'Checkbox',
                    key: 'flag',
                    dataIndex: 'flag',
                    render: (text, record, index) => {
                        return (<Checkbox checked={record.flag}></Checkbox>)
                    }
                },
                {
                    title: '订单编号',
                    key: 'orderId',
                    dataIndex: 'orderId'
                },
                {
                    title: '车辆编号',
                    key: 'orderNumber',
                    dataIndex: 'orderNumber'
                },
                {
                    title: '用户名',
                    key: 'userName',
                    dataIndex: 'userName'
                },
                {
                    title: '手机号码',
                    key: 'phoneNumber',
                    dataIndex: 'phoneNumber'
                },
                {
                    title: '里程',
                    key: 'resultCount',
                    dataIndex: 'resultCount'
                },
                {
                    title: '行程时长',
                    key: 'duration',
                    dataIndex: 'duration'
                },
                {
                    title: '状态',
                    key: 'orderStatus',
                    dataIndex: 'orderStatus'
                },
                {
                    title: '开始时间',
                    key: 'startTime',
                    dataIndex: 'startTime'
                },
                {
                    title: '结束时间',
                    key: 'endTime',
                    dataIndex: 'endTime'
                },
                {
                    title: '订单金额',
                    key: 'orderMoney',
                    dataIndex: 'orderMoney'
                },
                {
                    title: '实付金额',
                    key: 'orderPay',
                    dataIndex: 'orderPay'
                }
            ]
        }
    }


    componentDidMount() {
        this.getData({
            page: 1,
            pageSize: 10
        });
    }

    getData = (obj) => {
        service.order(obj).then((res) => {
            let newData = res.data.list.map((item, index) => {
                item.key = item.orderId;
                item.flag = false;
                return item;
            });
            this.setState({
                _dataSource1: newData,
            })
        })
    }

    /*
    *
    *
    * */
    render() {
        return (
            <React.Fragment>
                <Card>
                    <Button type={'primary'}>订单</Button>
                    <Button style={{marginLeft: '40px'}}>结束订单</Button>
                </Card>
                <Table
                    dataSource={this.state._dataSource1}
                    columns={this.state.columns}
                    bordered={true}
                    rowKey={record => record.orderId}
                    pagination={this.state.false}
                />
            </React.Fragment>
        );
    }
}


