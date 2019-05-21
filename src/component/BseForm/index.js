import React from 'react';
import {Button, Form, Select, Input, Radio, Checkbox} from 'antd'


const Option = Select.Option;
let FormItem = Form.Item;

/*
* 项目表单的封装
* 城市管理也有表单，订单管理也有表单，员工管理也有表单；
* 我们怎么做简化表单，因为表单很多地方重复了,重复的点包装起来
* */
class FilterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    initFormList = () => {
        let {getFieldDecorator} = this.props.form;
        let formList = this.props.formList;
        if (formList && formList.length > 0) {
            formList.forEach((item) => {
                let label = item.label;
                let field = item.field;
                let initialValue = item.initialValue || '';
                let placeholder = item.placeholder;
                let width = item.width;
                if (item.type === 'SELECT') {
                    let SELECT = <FormItem label={label} key={field}>
                        {
                            getFieldDecorator([field],{
                                initialValue:initialValue
                            })(
                                <Select
                                    style={{width: width}}
                                    placeholder={placeholder}
                                >
                                    <Option value={''}>
                                        全部
                                    </Option>
                                    <Option value={'1'}>
                                        西安
                                    </Option>
                                    <Option value={'2'}>
                                        深圳
                                    </Option>
                                    <Option value={'3'}>
                                        天津
                                    </Option>
                                </Select>
                            )
                        }
                    </FormItem>
                }
            })
        }
    }


    render() {

        return (
            <div>
                <Form>
                    <FormItem>

                    </FormItem>
                </Form>
            </div>
        );
    }
}

export default Form.create({})(FilterForm);//创建一个form
