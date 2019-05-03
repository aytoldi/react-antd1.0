import React from 'react';
import {Table, Button, Row, Col, Input, Icon, Modal, DatePicker, Card, Checkbox} from 'antd'
import service from '../../../utils/service'
import {createHashHistory} from 'history'//引入历史
const history = createHashHistory();
const confirm = Modal.confirm;
// 默认语言为 en-US，如果你需要设置其他语言，推荐在入口文件全局设置 locale
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');

//https://blog.csdn.net/qq_42120254/article/details/80842402


class RowEdit extends React.Component {

    handleAllStatus = (flag) => {
        return flag
    }

    constructor(props) {
        super(props);
        this.state = {
            editIndex: -1,
            editVal: '',
            flag: false,
            dateState: '',
            nameState: '',
            resultSum: 0,
            flagStatus: false,
            footerStatus: false,
            //thead
            _columns1: [
                {
                    // title:'选项',
                    title: () => {
                        return <Checkbox onChange={this.allChangeHandle}
                                         checked={this.state.flagStatus}></Checkbox>
                        // return <Checkbox onChange={this.allChangeHandle}
                        //                  checked={this.state.flagStatus}></Checkbox>
                    },
                    type: 'Checkbox',
                    key: 'flag',
                    dataIndex: 'flag',
                    render: (text, record, index) => {
                        return (<Checkbox onChange={(e) => this.itemHandleChange(e, record, index)}
                                          checked={record.flag}></Checkbox>)
                    }
                },
                {
                    title: 'Id',
                    key: 'id',
                    dataIndex: 'id',
                },
                {
                    title: '姓名',
                    key: 'name',
                    dataIndex: 'name'
                }, {
                    title: '单价',
                    key: 'price',
                    dataIndex: 'price',
                    align: 'center'
                },
                {
                    title: '数量',
                    dataIndex: 'number',
                    key: 'number',
                    align: 'center',
                    render: (text, record, index) => {
                        return (
                            <Row>
                                <Col span={8}>
                                    <Button onClick={() => this.plusHandle(text, record, index)} block>+</Button>
                                </Col>
                                <Col span={3}>{record.number}</Col>
                                <Col span={8}>
                                    <Button block onClick={() => this.minusHandle(text, record, index)}>-</Button>
                                </Col>
                            </Row>
                        );
                    }
                },
                {
                    title: '计算',
                    dataIndex: 'sum',
                    key: 'sum',
                    align: 'center'
                },
                {
                    title: '操作',
                    key: '4',
                    align: 'center',
                    dataIndex: 'operation'
                }
            ],
            _dataSource1: [],//数据源
            selectedRowKeys: []
        }
    }

    componentDidMount() {
        this.getData();
    }


    getData = (initParams) => {
        service.cart().then((res) => {
            let newData = res.data.data.list.map((item, index) => {
                item.key = item.id;
                item.flag = false;
                return item;
            });

            this.setState({
                _dataSource1: newData
            })
        })
    }

    changeHandle(date, record, index) {
        //Moment {_isAMomentObject: true, _i: "1985-08-11", _f: "YYYY-MM-DD", _isUTC: false, _pf: {…}, …}
        this.setState({
            dateState: date.format("YYYY-MM-DD")
        })
    }

    handleInput(e) {
        console.log(e, 123);
        this.setState({
            nameState: e.target.value
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


    plusHandle(text, record, index) {
        this.state._dataSource1[index].number++;
        this.setState({})
    }

    minusHandle(text, record, index) {
        this.state._dataSource1[index].number--;
        this.setState({})
    }

    allChangeHandle = (e) => {
        this.setState({
            flagStatus: e.target.checked
        })
    }

    itemHandleChange = (e, record, index) => {
        console.log(e, record, index, 'world ...');
        this.state._dataSource1[index].flag = e.target.checked
        this.setState({})
    }

    render() {

        return (
            <div>
                <Table
                    //表格数据
                    dataSource={this.state._dataSource1}
                    //表格列名
                    columns={this.state._columns1}
                    bordered={true}
                    rowKey={record => record.id}
                    pagination={false}
                />
                <Card title="Card title" bordered={false} span={24}>
                    <Col span={4}>
                        <Checkbox checked={this.state.flagStatus} onChange={this.allChangeHandle}>Checkbox</Checkbox>,
                    </Col>
                    <Col span={6}>取消全选</Col>
                    <Col span={6}>计算总价</Col>
                    <Col span={6}>计算总数 {this.state.resultSum}</Col>
                    <Col span={2}>
                        <Button>结账</Button>
                    </Col>
                </Card>
            </div>
        )
    }
}


export default RowEdit;