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
            flagStatus: false,
            footerStatus: false,
            handleNum:0,
            allNum:0,
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
                    align: 'center',
                    render: (text, record) => {
                        return record.price.toFixed(2)
                    }
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
                    align: 'center',
                    render: (text, record) => {
                        return record.sum.toFixed(2)
                    }
                },
                {
                    title: '操作',
                    key: '4',
                    align: 'center',
                    dataIndex: 'operation',
                    render: (text, record,index) => {
                        return (<Button onClick={()=>this.removeHandle(text, record,index)}>删除</Button>)
                    }
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



    removeHandle(text, record, index) {
        console.log(record);
        let self = this;
        confirm({
            title: '删除操作',
            content: '你真的确定删除吗?',
            onOk() {
                if(self.state._dataSource1[index].sum>0){
                    self.state.resultSum-=self.state._dataSource1[index].sum;
                    self.state.allNum-=self.state._dataSource1[index].number;
                    self.state.handleNum--;
                }
                self.state._dataSource1.splice(index, 1);
                self.setState({});
            },
            onCancel() {
            },
        });
    }

    // 累加
    plusHandle(text, record,index) {
        //真是项目中不要使用index，使用record.id
        this.state._dataSource1[index].number++;
        this.state.allNum++;
        this.state._dataSource1[index].flag=true;
        this.state._dataSource1[index].sum= this.state._dataSource1[index].number*this.state._dataSource1[index].price;
        let newArr=this.state._dataSource1.every((item)=>{
            return item.flag===true
        })
        this.state.flagStatus= newArr;
        this.state.resultSum+=this.state._dataSource1[index].price;
        this.setState({})
    }

    // 减少
    minusHandle(text, record, index) {
        if(this.state._dataSource1[index].number<=0){
            return;
        }
        console.log(record);
        //真是项目中不要使用index，使用record.id
        this.state._dataSource1[index].number>0?this.state._dataSource1[index].number--:0;
        if(this.state._dataSource1[index].number>0){
            this.state._dataSource1[index].sum= this.state._dataSource1[index].number*this.state._dataSource1[index].price;
        }else{
            this.state._dataSource1[index].sum=0;
            this.state.handleNum--;
            this.state._dataSource1[index].flag=false;
        }
        this.state.allNum--;
        //如果一个false
        this.state._dataSource1.forEach((item)=>{
            if(!item.flag){
                this.state.flagStatus= false;
            }
        })
        this.state.resultSum-=this.state._dataSource1[index].price;
        this.setState({})
    }

    // 全选
    allChangeHandle = (e) => {
        this.state.flagStatus= e.target.checked;

        if(e.target.checked){
            this.state.handleNum=this.state._dataSource1.length;
            this.state.allNum=this.state._dataSource1.length;
            this.state.resultSum=0;
            this.state._dataSource1.forEach((item)=>{
                item.number=1;
                item.flag=true
                item.sum= item.number*item.price;
                this.state.resultSum+=item.sum
            })
        }else{
            this.state.flagStatus= e.target.checked;
            this.state.handleNum=0;
            this.state.allNum=0
            this.state._dataSource1.forEach((item)=>{
                item.number=0;
                item.flag=false;
                item.sum= item.number*item.price;
                this.state.resultSum=0;
            })
        }

        this.setState({
            flagStatus: e.target.checked,

        })
    }

    itemHandleChange = (e, record, index) => {
        console.log(record,56);
        if(!e.target.checked){
            // this.state._dataSource1[index].number=0;
            this.state.handleNum--;
            this.state.allNum-=this.state._dataSource1[index].number;
            this.state.resultSum-=this.state._dataSource1[index].sum
        }else{
            this.state.handleNum++;
            this.state.allNum++
            this.state._dataSource1[index].number=1;
            this.state.resultSum+=this.state._dataSource1[index].price
        }

        if(this.state.handleNum===this.state._dataSource1.length){
            this.state.flagStatus= true;
        }else{
            this.state.flagStatus= false;
        }

        // let newData=this.state._dataSource1.filter((item)=>{
        //     return item.flag===true
        // });
        // console.log(newData,149);

        // this.state._dataSource1=newState
        this.state._dataSource1[index].flag = e.target.checked;
        this.state._dataSource1[index].sum= this.state._dataSource1[index].number*this.state._dataSource1[index].price;
        this.setState((prevState)=>{
            console.log(prevState,1);
            return{
                _dataSource1:prevState._dataSource1,
                handleNum:prevState.handleNum,
                resultSum:prevState.resultSum,
                flagStatus:prevState.flagStatus,
            }
        })

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
                    <Col span={6}><span>点击的商品</span> <strong>{this.state.handleNum}</strong></Col>
                    <Col span={6}><span>计算总价</span> <strong>{this.state.resultSum.toFixed(2)}</strong></Col>
                    <Col span={6}><span>计算总数</span> <strong>{this.state.allNum}</strong> </Col>
                    <Col span={2}>
                        <Button>结账</Button>
                    </Col>
                </Card>
            </div>
        )
    }
}


export default RowEdit;
