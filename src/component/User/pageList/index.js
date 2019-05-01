import React from 'react';
import {Table, Button} from 'antd'
import service from '../../../utils/service'

export default class PageList extends React.Component {
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
                    title: '日期',
                    key: 'date',
                    dataIndex: 'date',
                    align: 'center'
                },
                {
                    title: '数量',
                    key: 'num',
                    dataIndex: 'num',
                },
                {
                    title: '操作',
                    key: '4',
                    dataIndex: 'operation',
                    render: (text, record, index) => {
                        if (record.num > 4) {
                            return (<Button type="primary">游戏中</Button>)
                        } else {
                            return (<Button>空闲中</Button>)
                        }
                    }
                }
            ],
            _dataSource1: [],//数据源
            _loading: false,  /*antd*/
            _pagination1: {
                pageSize: 10,//每页条数(每列10行数据)
                current: 1,//当前页数
                total: 0,//数据总数
                onChange: this._handleTableChange1
            }
        }
    }


    componentDidMount() {
        let initParams = {
            page: 1
        }
        this.getData(initParams);
    }

    getData = (initParams) => {
        service.renderPageList({...initParams, pageSize: this.state._pagination1.pageSize}).then((res) => {
            let newData = res.data.list.map((item, index) => {
                item.key = item.id;
                return item;
            });
            let getTotal = res.data.total
            // this._pagination1.total=res.data.total;
            this.setState({
                _pagination1: {
                    ...this.state._pagination1,
                    total: getTotal
                },
                _dataSource1: newData
            })
        })
    }

    //每一次分页按钮点击的时候，改变当前的页数
    _handleTableChange1 = (page, pageSize) => {
        console.log(page, pageSize, 55);
        this.getData({page});//改变请求接口的页码
        //更新state
        this.setState({
            _pagination1: {
                ...this.state._pagination1,
                current: page,
            }
        })
    }

    render() {
        return (
            <React.Fragment>
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
            </React.Fragment>
        )
    }
}