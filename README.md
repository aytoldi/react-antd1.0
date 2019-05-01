# react-antd1.0
react


import React from 'react';
import {Table, Pagination, Button} from 'table'

export default class PageList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //thead
            _columns1: [
                {
                    title: 'Id',
                    key: 'Id',
                    dataIndex: 'Id',
                },
                {
                    title: '姓名',
                    key: 'name',
                    dataIndex: 'name',
                }, {
                    title: '日期',
                    key: 'date',
                    dataIndex: 'date',
                },
                {
                    title: '操作',
                    key: '4',
                    dataIndex: 'operation',
                    render: (text, record, index) => {

                    }
                }
            ],
            _dataSource1: [],//数据源
            _classname1: '',//class名称
            _pageNum: 1,  /*翻页查询*/
            _pageSize: 10,  /*分页查询*/
            _activePage: 1,  /*默认显示一页*/
            _selectedRowKeys: [],  // 这里配置默认勾选列
            _loading: false,  /*antd*/
            _selectedRow: [],
            current1: 1,
        }
    }


    render() {
        let _paginationProps = {
            total: this.state._dataSource1.length,
            current: this.state.current1,
            onChange: (page, pageSize) => {
                console.log('current page: ', page)
                this.setState({
                    current: page
                })
            }
        }

        return (
            <div>
                <Table
                    //表格数据
                    dataSource={this._dataSource1}
                    //表格列名
                    columns={this._columns1}
                    //行的类名
                    rowClassName={this._classname1}
                    //单击行事件
                    onRowClick={(record, index, event) => {
                        //如果是最后一行数据即"加载更多"，不执行该事件
                        if (index !== this.state._dataSource1.length - 1)
                            this.clickRow(record, index, event, this.state._dataSource1.length)
                    }}
                    //双击行事件
                    onRowDoubleClick={(record, index, event) => {
                        //如果是最后一行数据即"加载更多"，不执行该事件
                        if (index !== dataSource.length)
                            this.doubleClickRow(record, index, event)
                    }}
                   // pagination={..._paginationProps }
                    bordered={true}
                    rowKey={record => record.id}
                />
            </div>
        )
    }
}