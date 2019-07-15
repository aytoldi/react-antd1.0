import React from 'react';


import {Table} from 'antd';
import service from "../../utils/service";


export default class MenuCom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
                }
            ],
            _dataSource1: []
        }
    }


    componentDidMount() {
        this.getData({page: 1});
    }


    getData = (initParams) => {
        service.menuList({...initParams, pageSize: 10}).then((res) => {
            console.log(res, "res9")
            this.setState({
                _dataSource1: res.data.list
            })
        })
    }

    expandedRowRender(record) {
        const columns = [
            {title: 'url', dataIndex: 'url', key: 'url'},
            {title: 'email', dataIndex: 'email', key: 'email'},
            {title: 'address', dataIndex: 'address', key: 'address'}
        ];
        //<p>{record.description[0].url}</p>
        return (<Table columns={columns} dataSource={record.description} pagination={false}/>)
    };

    render() {
        return (
            <Table
                className="components-table-demo-nested"
                //表格数据
                dataSource={this.state._dataSource1}
                //表格列名
                columns={this.state._columns1}
                // expandedRowRender={record => <p style={{ margin: 0 }}>{record.description[0].url}</p>}
                expandedRowRender={(record) => this.expandedRowRender(record)}
            />
        );
    }

}
