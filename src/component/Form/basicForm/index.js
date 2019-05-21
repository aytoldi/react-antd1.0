import React from 'react';
import {Table, Button, Row} from 'antd/lib/index'
import service from '../../../utils/service'
import {createHashHistory} from 'history'//引入历史
const history = createHashHistory();
class RowLink extends React.Component {
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
                    align:'center',
                    dataIndex: 'operation',
                    render: (text, record, index) => {
                        return (<Row><Button onClick={()=>this.editHandle(record)}>编辑</Button><Button  onClick={()=>this.watchHandle(record)} style={{marginLeft:'20px'}}>查看</Button></Row>)
                    }
                }
            ],
            _dataSource1: [],//数据源
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

    addHandle(){
        history.push('/home/addForm')
    }

    editHandle(record){
        history.push(`/home/editForm/${record.id}`)
    }

    watchHandle(record){
        history.push(`/home/watchForm/${record.id}`)
    }



    render() {
        //destroyOnClose 非常重要的属性 ,编辑的时候请求输入框的值
        return (
            <div>
                <Button onClick={() => this.addHandle()} style={{'marginBottom': '20px'}} type={"primary"}>添加</Button>
                <Table
                    //表格数据
                    dataSource={this.state._dataSource1}
                    //表格列名
                    columns={this.state._columns1}
                    bordered={true}
                    rowKey={record => record.id}
                />
            </div>
        )
    }
}


export default RowLink;
