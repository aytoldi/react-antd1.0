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
    constructor(props) {
        super(props);
        this.state = {
            editIndex: -1,
            editVal: '',
            flag: false,
            dateState: '',
            nameState: '',
            resultSum: 0,
            //thead
            _columns1: [
                {
                    title: <Checkbox>Checkbox</Checkbox>,
                    onHeaderCell: text => <Checkbox>Checkbox</Checkbox>,
                    key: 'flag',
                    dataIndex: 'flag',
                    render: text => <Checkbox>Checkbox</Checkbox>
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

    editHandle(text, record, paramsIndex) {
        //编辑icon被点击的时候，显示input输入框
        this.state._dataSource1[paramsIndex].flag = true;
        this.state._dataSource1.forEach((item, index) => {
            if (paramsIndex !== index) {
                this.state._dataSource1[index].flag = false;
                this.state.nameState = '';
                this.state.dateState = '';
            }
        })
        this.setState({});
    }

    //取消
    closeHandle(text, record, index) {
        this.state._dataSource1[index].flag = false;
        this.setState({})
    }

    //正确
    saveHandle(text, record, index) {
        if (this.state.nameState || this.state.dateState) {
            this.state._dataSource1[index].flag = false;
            this.state._dataSource1[index].name = this.state.nameState;
            this.state._dataSource1[index].date = this.state.dateState;
            this.setState({})
        }

    }

    changeHandle(date, record, index) {
        //Moment {_isAMomentObject: true, _i: "1985-08-11", _f: "YYYY-MM-DD", _isUTC: false, _pf: {…}, …}
        this.setState({
            dateState: date.format("YYYY-MM-DD")
        })
    }

    handleInput(e) {
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
        this._onSelect(record, true, [record]);
        this.state._dataSource1[index].number++;
        this.setState({})
    }

    minusHandle(text, record, index) {
        this.state._dataSource1[index].number--;
        this.setState({})
    }

    _onSelectChange = (selectedRowKeys, selectedItems) => {
        let res = 0;
        console.log('selectedRowKeys changed: ', selectedRowKeys, selectedItems);
        selectedItems.forEach((item) => {
            if (item.number === 0) {
                item.number = 1;
            }
            res += item.price;
        })
        this.setState({
            selectedRowKeys,
            resultSum: res
        });
    }

    _onSelect(record, selected, selectedRows) {
        console.log(record, selected, selectedRows, 11);
    }

    _onSelectAll(selected, selectedRows, changeRows) {
        console.log(selected, selectedRows, changeRows, 22);
    }

    render() {
        //destroyOnClose 非常重要的属性 ,编辑的时候请求输入框的值
        //表格行是否可选择，配置项	rowSelection:Function(record, index):string
        //表格行 key 的取值，可以是字符串或一个函数 rowKey:string|Function(record):string

        const rowSelection = {
            onChange: this._onSelectChange,
            onSelect: this._onSelect,
            onSelectAll: this._onSelectAll
        };
        return (
            <div>
                <Table
                    rowSelection={rowSelection}
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
                        <Checkbox onChange={(e) => this.onChange(e)}>Checkbox</Checkbox>,

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