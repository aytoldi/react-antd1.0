import React from 'react';
import {Table, Button} from 'antd'
import service from '../../utils/service'

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
            // _loading: false,  /*antd*/
            // pageSize: 10,//每页条数(每列10行数据)
            // current: 1,//当前页数
            // total: 0,//数据总数
        }
    }

    paramPage = {
        page: 1
    }

    componentDidMount() {
        this.getData({page: 1});
    }

    // pageHandle(res, callback) {
    //     let page = {
    //         onChange: (current) => {
    //             callback(current);
    //         },
    //         current: res.data.page,
    //         pageSize: res.data.result.pageSize,
    //         total:  res.data.result.total,
    //         showTotal: () => {
    //             return `共${ res.data.total}跳`
    //         }
    //     }
    //     return page;
    // }

    getData = (initParams) => {
        service.renderPageList({...initParams, pageSize: 10}).then((res) => {
            let newData = res.data.list.map((item, index) => {
                item.key = item.id;
                return item;
            });
            // let page = initParams.page;
            let self = this;
            // this._pagination1.total=res.data.total;
            this.setState({
                // total: res.data.total,
                _dataSource1: newData,
                pagination: {
                    onChange: (page) => {
                        console.log(page);
                        self.getData({page: page});
                    },
                    total: res.data.total
                }
            })
        })
    }

    // //每一次分页按钮点击的时候，改变当前的页数
    // _handleTableChange1 = (page) => {
    //     this.paramPage.page = page;
    //     //更新state
    //     this.setState({
    //         current: this.paramPage.page,
    //     }, () => {
    //         this.getData(this.paramPage.page);//改变请求接口的页码
    //     })
    // }

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
                    pagination={this.state.pagination}
                />
            </React.Fragment>
        )
    }
}
