import React from 'react';
import {Table, Button, Row, Col, Input, Icon, Modal} from 'antd'
import service from '../../utils/service'
import {createHashHistory} from 'history'//引入历史
const history = createHashHistory();
const confirm = Modal.confirm;

//https://blog.csdn.net/qq_42120254/article/details/80842402

class InnerEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editIndex: -1,
            editVal: '',
            flag: false,
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
                    render: (text, record, index) => {

                        let isShow
                        return (<Row>
                            <Col span={18}>
                                <span>{record.name}</span>
                                {
                                    this.state._dataSource1[index].flag ?
                                        <Input onChange={(e) => this.handleChange(e, index)}
                                               value={this.state.editVal}/> : ''
                                }
                            </Col>
                            <Col span={6}>
                                {
                                    this.state._dataSource1[index].flag ?
                                        (
                                            <Row>
                                                <Icon onClick={() => this.closeHandle(text, record, index)}
                                                      type={'close'}/>
                                                <Icon onClick={() => this.checkHandle(text, record, index)}
                                                      type={'check'}/>
                                            </Row>) :
                                        <Icon type={'edit'} onClick={() => this.editHandle(text, record, index)}/>
                                }

                            </Col>
                        </Row>)
                    }
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
                    title: '操作',
                    key: '4',
                    align: 'center',
                    dataIndex: 'operation',
                    render: (text, record, index) => {
                        return (<Button onClick={() => this.removeHandle(text, record, index)}>删除</Button>);
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
                item.flag = false;
                return item;
            });

            this.setState({
                _dataSource1: newData
            })
        })
    }

    editHandle(text, record, paramsIndex) {
        //编辑icon被点击的时候，显示input输入框
        this.state._dataSource1[paramsIndex].flag = true;
        //如果输入框的值为空, val===null
        if (!this.state.editVal) {
            this.state._dataSource1[paramsIndex].name = record.name;
        }
        //遍历操作，意思是：除了被点击的元素的input输入框要隐藏，input值也空
        this.state._dataSource1.forEach((item, index) => {
            if (paramsIndex !== index) {
                this.state._dataSource1[index].flag = false;
                this.state.editVal = '';
            }
        })
        this.setState({});
    }

    //取消
    closeHandle(text, record, index) {
        this.state._dataSource1[index].name = record.name;//初始化值，不会改变
        this.state._dataSource1[index].flag = false;
        this.setState({})
    }

    //正确
    checkHandle(text, record, index) {
        if(this.state.editVal){
            this.state._dataSource1[index].name = this.state.editVal;//会改变
            this.state._dataSource1[index].flag = false;
            this.setState({})
        }

    }

    handleChange(e, index) {
        // this.state._dataSource1[index].name = e.target.value;
        this.setState({
            editVal: e.target.value
        })
    }


    removeHandle(text, record, index) {
        let self = this;
        confirm({
            title: '删除操作',
            content: '你真的确定删除吗?',
            onOk() {
                self.state._dataSource1.splice(index, 1);
                self.setState({});
            },
            onCancel() {
            },
        });

    }


    render() {
        //destroyOnClose 非常重要的属性 ,编辑的时候请求输入框的值
        return (
            <div>
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


export default InnerEdit;
