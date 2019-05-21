import React from 'react';
import {Table, Button, Row, Col, Input, Icon, Modal, DatePicker} from 'antd'
import service from '../../utils/service'
import {createHashHistory} from 'history'//引入历史
const history = createHashHistory();
const confirm = Modal.confirm;
// 默认语言为 en-US，如果你需要设置其他语言，推荐在入口文件全局设置 locale
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');

//https://blog.csdn.net/qq_42120254/article/details/80842402

class EditLine extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editIndex: -1,
            editVal: '',
            flag: false,
            dateState: '',
            nameState: '',
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
                            <Col span={24}>
                                <span>{record.name}</span>
                                {this.state._dataSource1[index].flag ?
                                    <Input value={this.state.nameState} onChange={(e) => this.handleInput(e)}/> : ''}
                            </Col>
                        </Row>)
                    }
                }, {
                    title: '日期',
                    key: 'date',
                    dataIndex: 'date',
                    align: 'center',
                    render: (text, record, index) => {
                        return (
                            <Row>
                                <span>{record.date}</span>
                                {this.state._dataSource1[index].flag ? <DatePicker
                                    format="YYYY-MM-DD"
                                    defaultValue={moment(record.date || new Date(), 'YYYY-MM-DD')}
                                    onChange={(date) => this.changeHandle(date, record, index)}
                                /> : ''}

                            </Row>
                        )
                    }
                },
                {
                    title: '操作',
                    key: '4',
                    align: 'center',
                    dataIndex: 'operation',
                    render: (text, record, index) => {
                        return (
                            <Row>
                                {
                                    !this.state._dataSource1[index].flag ?
                                        (<Button onClick={() => this.editHandle(text, record, index)}>修改</Button>) :
                                        (<Row>
                                            <Button onClick={() => this.saveHandle(text, record, index)}>保存</Button>
                                            <Button onClick={() => this.closeHandle(text, record, index)}>取消</Button>
                                        </Row>)
                                }

                            </Row>
                        );
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
        // this.state._dataSource1[paramsIndex].flag = true;
        // //如果输入框的值为空, val===null
        // if (!this.state.editVal) {
        //     this.state._dataSource1[paramsIndex].name = record.name;
        // }
        // //遍历操作，意思是：除了被点击的元素的input输入框要隐藏，input值也空
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


export default EditLine;
